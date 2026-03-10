import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import productiveTeamBg from "@/assets/productive-team-bg.jpg";

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Preload the background image and signal main.tsx when ready
  useEffect(() => {
    const img = new Image();
    img.src = productiveTeamBg;
    const signal = () => window.dispatchEvent(new CustomEvent("seeksy:hero-ready"));
    if (img.complete) {
      signal();
    } else {
      img.onload = signal;
      img.onerror = signal; // reveal even on error
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    await onSubmit(email);
    setLoading(false);
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background image — full bleed, sharp */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${productiveTeamBg})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Frosted white glass card — light, airy, WorkReady-style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-[680px] w-full text-center rounded-3xl px-10 py-16 sm:px-16 sm:py-20"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 8px 60px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-bold uppercase text-xs tracking-[3px] text-primary mb-5"
        >
          Explore the platform
        </motion.p>

        {/* Headline — dark text on light glass */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-black text-foreground"
          style={{
            fontSize: "clamp(34px, 5vw, 54px)",
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
          }}
        >
          Seeksy App{" "}
          <span className="text-primary">Directory.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base leading-relaxed mt-4 max-w-[460px] mx-auto"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          A suite of 35+ AI-first workplace applications — available for
          enterprise licensing, partnership, or strategic acquisition.
        </motion.p>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mx-auto mt-8 max-w-[460px]"
        >
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-[52px] text-base rounded-xl border-2 border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 shadow-sm"
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="rounded-xl font-bold uppercase tracking-wide w-full sm:w-auto whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all h-[52px] px-8 text-sm"
            disabled={loading || !email.includes("@")}
          >
            {loading ? "Loading..." : "View Apps"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.form>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-xs mt-4"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          No signup required · We just want to know who's interested
        </motion.p>
      </motion.div>
    </section>
  );
}
