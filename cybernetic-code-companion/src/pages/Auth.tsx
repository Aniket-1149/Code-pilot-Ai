import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIOrb } from "@/components/AIOrb";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:flex items-center justify-center cyber-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="relative text-center">
          <AIOrb size={260} />
          <h2 className="font-display text-3xl font-bold mt-8">
            Welcome to <span className="gradient-text">CodePilot AI</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
            The AI operating system for developers. Build at the speed of thought.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-lg bg-gradient-neon shadow-glow-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <span className="font-display font-bold text-lg gradient-text">CodePilot AI</span>
          </Link>

          <h1 className="font-display text-3xl font-bold">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "signin" ? "Welcome back, developer." : "Start your AI dev journey."}
          </p>

          <div className="mt-6 space-y-3">
            <Button variant="outline" className="w-full glass border-primary/30 hover:border-primary justify-start gap-3">
              <Github className="h-4 w-4" /> Continue with GitHub
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-[10px] font-mono uppercase">
                <span className="px-2 bg-background text-muted-foreground">or with email</span>
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="you@codepilot.ai" className="pl-9 bg-background/60 border-primary/20" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="pl-9 bg-background/60 border-primary/20" />
            </div>

            <Link to="/dashboard">
              <Button className="w-full bg-gradient-neon text-background font-semibold shadow-glow-primary mt-2">
                {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already a member?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
