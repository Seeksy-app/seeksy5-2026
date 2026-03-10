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
      {/* Background image with lighter overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${productiveTeamBg})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Frosted glass card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-[620px] w-full text-center rounded-2xl px-8 py-12 sm:px-12 sm:py-16"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-bold uppercase"
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            color: "#2C6BED",
            marginBottom: "18px",
          }}
        >
          Explore the platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-black"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            color: "#0B1220",
          }}
        >
          Seeksy App{" "}
          <span style={{ color: "#2C6BED" }}>Directory.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#475569",
            marginTop: "14px",
            maxWidth: "440px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Enter your email to access 35+ AI-first productivity applications and 7 curated bundles designed for licensing, partnership, or acquisition.
        </motion.p>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mx-auto"
          style={{ marginTop: "28px", maxWidth: "440px" }}
        >
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px]" style={{ color: "#94A3B8" }} />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-[50px] text-base rounded-xl border-2 bg-white focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: "#E2E8F0", color: "#1E293B" }}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="rounded-xl font-semibold w-full sm:w-auto whitespace-nowrap text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{
              background: "linear-gradient(135deg, #2C6BED 0%, #1D4ED8 100%)",
              height: "50px",
              paddingLeft: "28px",
              paddingRight: "28px",
              fontSize: "15px",
            }}
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
          className="text-xs"
          style={{ color: "#94A3B8", marginTop: "14px" }}
        >
          No signup required · We just want to know who's interested
        </motion.p>
      </motion.div>
    </section>
  );
}
