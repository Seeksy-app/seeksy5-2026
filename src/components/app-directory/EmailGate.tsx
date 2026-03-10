import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import productiveTeamBg from "@/assets/productive-team-bg.jpg";

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    await onSubmit(email);
    setLoading(false);
  };

  return (
    <section
      className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${productiveTeamBg})` }}
      />
      {/* Cool dark overlay like WorkReady reference */}
      <div className="absolute inset-0 bg-slate-900/50" />

      {/* Floating card - 30% card opacity with backdrop-blur-sm */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-[680px] w-full text-center rounded-2xl px-8 py-14 sm:px-14 sm:py-18 bg-slate-200/40 backdrop-blur-md shadow-2xl border border-white/10"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-bold uppercase text-xs tracking-[2px] text-primary mb-4"
        >
          Explore the platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-black text-white drop-shadow-sm"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
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
          className="text-base leading-relaxed text-white mt-3.5 max-w-[440px] mx-auto"
        >
          A suite of 35+ AI-first workplace applications — available for enterprise licensing, partnership, or strategic acquisition.
        </motion.p>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mx-auto mt-7 max-w-[440px]"
        >
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-[50px] text-base rounded-xl border-2 border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30"
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="rounded-xl font-semibold w-full sm:w-auto whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-shadow h-[50px] px-7 text-[15px]"
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
          className="text-xs text-white mt-3.5"
        >
          No signup required · We just want to know who's interested
        </motion.p>
      </motion.div>
    </section>
  );
}
