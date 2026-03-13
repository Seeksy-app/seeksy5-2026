import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/homepage/hero-workspace.png";

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroBg;
    const signal = () => window.dispatchEvent(new CustomEvent("seeksy:hero-ready"));
    if (img.complete) signal();
    else { img.onload = signal; img.onerror = signal; }
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
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[640px] w-full text-center px-8 py-14 sm:px-14 sm:py-16"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xs font-bold uppercase tracking-[3px] text-blue-400 mb-4"
        >
          Explore the Platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4"
        >
          <span className="text-[#1a1f36]">Seeksy App </span>
          <span className="text-blue-500">Directory.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-sm sm:text-base leading-relaxed text-white/70 max-w-xl mx-auto mb-8"
        >
          A suite of 35+ AI-first workplace applications — available for
          enterprise licensing, partnership, or strategic acquisition.
        </motion.p>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-[480px] mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-slate-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-[52px] text-base rounded-xl border border-white/30 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400/40 transition-all"
                required
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="rounded-xl font-bold w-full sm:w-auto whitespace-nowrap text-white shadow-lg hover:shadow-xl transition-all h-[52px] px-8 text-sm bg-blue-400 hover:bg-blue-500 border-0"
              disabled={loading || !email.includes("@")}
            >
              {loading ? "Loading..." : "VIEW APPS"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.form>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-5 text-xs text-white/50"
        >
          No signup required · We just want to know who's interested.
        </motion.p>
      </motion.div>
    </section>
  );
}
