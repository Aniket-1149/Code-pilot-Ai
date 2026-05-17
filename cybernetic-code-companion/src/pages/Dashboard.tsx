import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Code2, GitBranch, Activity, Clock, Zap, Bot, Plus, Rocket,
} from "lucide-react";
import { AIOrb } from "@/components/AIOrb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIDE } from "@/store/ide";
import { useState } from "react";

const recents = [
  { name: "neon-saas", lang: "TypeScript", updated: "2m ago", color: "primary" },
  { name: "ai-recipes", lang: "Python", updated: "1h ago", color: "secondary" },
  { name: "synth-dashboard", lang: "TSX", updated: "yesterday", color: "accent" },
  { name: "quantum-cli", lang: "Rust", updated: "3d ago", color: "warning" },
];

const stats = [
  { label: "Lines generated", value: "12,481", trend: "+18%", icon: Code2 },
  { label: "Bugs auto-fixed", value: "247", trend: "+32%", icon: Zap },
  { label: "Agent runs", value: "1,094", trend: "+9%", icon: Bot },
  { label: "Active projects", value: "8", trend: "+2", icon: GitBranch },
];

const Dashboard = () => {
  const prompts = useIDE((s) => s.prompts);
  const addPrompt = useIDE((s) => s.addPrompt);
  const [idea, setIdea] = useState("");

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono text-primary mb-1">// WELCOME BACK</div>
          <h1 className="font-display text-4xl font-bold">
            Hey, <span className="gradient-text">Developer</span>
          </h1>
          <p className="text-muted-foreground mt-1">Your AI dev team is online and ready.</p>
        </div>
        <Link to="/ide">
          <Button className="bg-gradient-neon text-background font-semibold shadow-glow-primary">
            <Rocket className="h-4 w-4 mr-2" /> Open IDE
          </Button>
        </Link>
      </motion.div>

      {/* Build from idea */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl glass-strong border border-primary/30 p-6 lg:p-8"
      >
        <div className="absolute -top-20 -right-20 opacity-50 pointer-events-none">
          <AIOrb size={240} />
        </div>
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-2">
            <Sparkles className="h-3.5 w-3.5" /> PROMPT-TO-APP BUILDER
          </div>
          <h2 className="font-display text-3xl font-bold mb-2">Build your app from an idea</h2>
          <p className="text-muted-foreground mb-5">
            Describe what you want — agents will plan, scaffold, code, and deploy it.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="A real-time AI flashcards app with spaced repetition…"
              className="flex-1 min-w-[260px] bg-background/60 border-primary/30 focus-visible:ring-primary"
            />
            <Button
              onClick={() => {
                if (idea) addPrompt(idea);
                setIdea("");
              }}
              className="bg-gradient-neon text-background font-semibold"
            >
              Build it <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["SaaS landing", "AI chatbot", "Dashboard", "Mobile-first blog"].map((s) => (
              <button
                key={s}
                onClick={() => setIdea(s)}
                className="text-xs px-3 py-1 rounded-full glass border border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="glass rounded-2xl p-5 border border-primary/15 hover:border-primary/40 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-mono text-accent">{s.trend}</span>
            </div>
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent projects */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-primary/15">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Recent projects</h3>
            <Link to="/projects" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {recents.map((p) => (
              <Link
                key={p.name}
                to="/ide"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition group"
              >
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center bg-${p.color}/10 border border-${p.color}/30`}>
                  <Code2 className={`h-4 w-4 text-${p.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-mono font-semibold text-sm">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.lang} · {p.updated}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
            <Link to="/projects" className="w-full flex items-center gap-2 p-3 rounded-xl border border-dashed border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/60 transition text-sm">
              <Plus className="h-4 w-4" /> New project
            </Link>
          </div>
        </div>

        {/* Productivity */}
        <div className="glass rounded-2xl p-6 border border-primary/15">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" /> Productivity
          </h3>
          <div className="flex items-end gap-1.5 h-32 mb-3">
            {[40, 65, 50, 80, 95, 70, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-secondary"
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground flex justify-between font-mono">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/10 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Focus time</span>
              <span className="font-mono text-primary">6h 42m</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">AI saves</span>
              <span className="font-mono text-accent">+3h 18m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt history */}
      <div className="glass rounded-2xl p-6 border border-primary/15">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-secondary" /> Recent prompts
        </h3>
        <div className="grid md:grid-cols-2 gap-2">
          {prompts.map((p, i) => (
            <div key={i} className="p-3 rounded-xl glass border border-primary/10 text-sm font-mono text-foreground/80 hover:border-primary/40 transition">
              <span className="text-secondary mr-2">›</span> {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
