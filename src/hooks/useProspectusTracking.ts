import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "prospectus_session";
const EMAIL_KEY = "prospectus_email";

interface ProspectusSession {
  id: string;
  email: string;
  startTime: number;
}

export function useProspectusGate() {
  const [email, setEmail] = useState<string | null>(() => {
    return sessionStorage.getItem(EMAIL_KEY);
  });
  const [sessionId, setSessionId] = useState<string | null>(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored).id : null;
  });

  const startSession = useCallback(async (inputEmail: string) => {
    const trimmed = inputEmail.trim().toLowerCase();
    
    const { data, error } = await (supabase.from("prospectus_sessions") as any)
      .insert({
        email: trimmed,
        session_start: new Date().toISOString(),
        user_agent: navigator.userAgent,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to start session:", error);
      // Still let them in
      sessionStorage.setItem(EMAIL_KEY, trimmed);
      setEmail(trimmed);
      return;
    }

    const session: ProspectusSession = {
      id: data.id,
      email: trimmed,
      startTime: Date.now(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem(EMAIL_KEY, trimmed);
    setSessionId(data.id);
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

    // Log the page view
    (supabase.from("prospectus_page_views") as any)
      .insert({
        session_id: sessionId,
        page_name: pageName,
        viewed_at: new Date().toISOString(),
      })
      .then(() => { trackedRef.current = true; });

    return () => {
      // Update time spent on unmount
      if (trackedRef.current && sessionId) {
        const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        // Fire and forget - update session duration
        (supabase.from("prospectus_sessions") as any)
          .update({ 
            duration_seconds: seconds,
            session_end: new Date().toISOString()
          })
          .eq("id", sessionId);
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
        .eq("id", sessionId);
    }, 30000); // update every 30s

    const handleUnload = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/prospectus_sessions?id=eq.${sessionId}`;
      navigator.sendBeacon(url); // best-effort
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      // Final update
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId);
    };
  }, [sessionId]);
}
