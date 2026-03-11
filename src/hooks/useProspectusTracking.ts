import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "prospectus_session";
const EMAIL_KEY = "prospectus_email";

interface ProspectusSession {
  id: string;
  email: string;
  startTime: number;
}

function clearStoredProspectusSession() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
}

export function useProspectusGate() {
  const [email, setEmail] = useState<string | null>(() => {
    return sessionStorage.getItem(EMAIL_KEY);
  });
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Restore any stored session locally without requiring public reads from the database
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as ProspectusSession;
      if (!parsed?.id || !parsed?.email) {
        clearStoredProspectusSession();
        setEmail(null);
        setSessionId(null);
        return;
      }

      setEmail(parsed.email);
      setSessionId(parsed.id);
    } catch {
      clearStoredProspectusSession();
      setEmail(null);
      setSessionId(null);
    }
  }, []);

  const startSession = useCallback(async (inputEmail: string) => {
    const trimmed = inputEmail.trim().toLowerCase();
    const newSessionId = crypto.randomUUID();

    const { error } = await (supabase.from("prospectus_sessions") as any)
      .insert({
        id: newSessionId,
        email: trimmed,
        session_start: new Date().toISOString(),
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error("Failed to start session:", error);
      // Still let them in
      sessionStorage.setItem(EMAIL_KEY, trimmed);
      setEmail(trimmed);
      return;
    }

    const session: ProspectusSession = {
      id: newSessionId,
      email: trimmed,
      startTime: Date.now(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem(EMAIL_KEY, trimmed);
    setSessionId(newSessionId);
    setEmail(trimmed);
  }, []);

  return { email, sessionId, startSession };
}

export function useProspectusPageView(sessionId: string | null, pageName: string) {
  const startTimeRef = useRef(Date.now());
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || !pageName) return;

    startTimeRef.current = Date.now();
    trackedRef.current = false;

    // Log the page view — must await or use .then() to execute
    (supabase.from("prospectus_page_views") as any)
      .insert({
        session_id: sessionId,
        page_name: pageName,
        viewed_at: new Date().toISOString(),
      })
      .then(({ error }: any) => {
        if (error) console.error("Failed to log page view:", error);
        else trackedRef.current = true;
      });

    return () => {
      // Update time spent on unmount
      if (trackedRef.current && sessionId) {
        const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        (supabase.from("prospectus_sessions") as any)
          .update({ 
            duration_seconds: seconds,
            session_end: new Date().toISOString()
          })
          .eq("id", sessionId)
          .then(({ error }: any) => {
            if (error) console.error("Failed to update session duration:", error);
          });
      }
    };
  }, [sessionId, pageName]);
}

export function useUpdateSessionDuration(sessionId: string | null) {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!sessionId) return;
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId)
        .then(({ error }: any) => {
          if (error) console.error("Failed to update duration:", error);
        });
    }, 30000);

    const handleUnload = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      // Final update on unload
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId)
        .then(() => {});
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      // Final update
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId)
        .then(() => {});
    };
  }, [sessionId]);
}
