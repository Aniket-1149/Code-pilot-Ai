import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Bot, Zap, Code2, Brain, Mic, Terminal, GitBranch, ArrowRight, Rocket, Command,
} from "lucide-react";
import { AIOrb } from "@/components/AIOrb";
import { Waveform } from "@/components/Waveform";
import { Button } from "@/components/ui/button";
import { useIDE } from "@/store/ide";

const FEATURES = [
  { icon: Bot, title: "Autonomous Agents", desc: "7 specialized AI agents that plan, code, debug, test, and ship." },
  { icon: Brain, title: "Codebase Intelligence", desc: "Chat with your entire repo. The AI understands every file." },
  { icon: Mic, title: "Voice Coding", desc: "Talk to your IDE. Natural-language terminal built-in." },
  { icon: Zap, title: "Prompt → App", desc: "Describe an idea. Get a deployable app in minutes." },
  { icon: GitBranch, title: "Live Collaboration", desc: "Multiplayer cursors, shared agents, instant sync." },
  { icon: Terminal, title: "Hacker-Grade DX", desc: "Glassmorphism, neon, and a Cmd+K launcher for everything." },
];

const Landing = () => {
  const setCommandOpen = useIDE((s) => s.setCommandOpen);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* nav */}
      <header className="absolute top-0 inset-x-0 z-30 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-neon shadow-glow-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-background" />
          </div>
          <span className="font-display font-bold text-lg gradient-text">CodePilot AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-primary transition">Features</a>
          <a href="#agents" className="hover:text-primary transition">Agents</a>
          <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
          <Link to="/auth" className="hover:text-primary transition">Sign in</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="glass border-primary/30 hidden sm:flex"
          >
            <Command className="h-3.5 w-3.5 mr-1" /> ⌘K
          </Button>
          <Link to="/ide">
            <Button size="sm" className="bg-gradient-neon text-background font-semibold shadow-glow-primary">
              Launch IDE
            </Button>
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 cyber-grid animate-grid-flow">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center pt-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-xs font-mono mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-primary">v2.0 — Now with Architect Agent</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              The AI <span className="gradient-text">operating system</span><br />
              for developers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              CodePilot AI fuses a futuristic IDE with autonomous agents that build, debug, refactor,
              test, and document — at the speed of thought.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/ide">
                <Button size="lg" className="bg-gradient-neon text-background font-semibold shadow-glow-primary hover:shadow-glow-secondary transition-all">
                  <Rocket className="h-4 w-4 mr-2" /> Launch the OS
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="glass border-primary/40 hover:border-primary">
                  Open Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-6 text-xs font-mono text-muted-foreground"
            >
              <div>⚡ 12ms response</div>
              <div>🧠 7 agents</div>
              <div>🔒 SOC2 ready</div>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* outer glow */}
              <div className="absolute inset-0 bg-gradient-neon rounded-full blur-3xl opacity-30" />

              {/* central orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AIOrb size={280} />
              </div>

              {/* Floating widgets */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-4 -left-4 glass-strong rounded-xl p-3 shadow-glow-primary border border-primary/30 w-48"
              >
                <div className="flex items-center gap-2 text-xs">
                  <Code2 className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-primary">Generating…</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 rounded-full bg-primary/20 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-neon"
                      animate={{ width: ["10%", "90%", "10%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">Hero.tsx · 142 lines</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-8 -right-4 glass-strong rounded-xl p-3 shadow-glow-secondary border border-secondary/30 w-52"
              >
                <div className="flex items-center gap-2 text-xs">
                  <Mic className="h-3.5 w-3.5 text-secondary" />
                  <span className="font-mono text-secondary">"Build a pricing page"</span>
                </div>
                <div className="mt-2"><Waveform bars={20} /></div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/2 -right-8 glass-strong rounded-xl p-2.5 shadow-glow-accent border border-accent/30"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent">DEBUG AGENT</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Fixed 3 issues</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-mono text-primary mb-3">// CAPABILITIES</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Everything you need to <span className="gradient-text-hacker">ship faster</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-2xl glass border border-primary/15 hover:border-primary/50 transition-all overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/30 transition" />
                <div className="relative">
                  <div className="h-10 w-10 rounded-lg bg-gradient-neon/20 border border-primary/30 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents preview */}
      <section id="agents" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs font-mono text-secondary mb-3">// AUTONOMOUS</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Meet your <span className="gradient-text">AI dev team</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Seven specialized agents, working in parallel inside your codebase. They plan, write, review, and ship.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Architect", "Coder", "Debugger", "Refactor", "Tester", "Reviewer", "Docs"].map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-full glass border border-primary/30 text-sm font-mono text-primary hover:shadow-glow-soft transition"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-2 animate-pulse" />
                {a}
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/ide">
              <Button size="lg" className="bg-gradient-neon text-background font-semibold shadow-glow-primary">
                Try the IDE <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary/10 py-8 px-6 text-center text-xs text-muted-foreground font-mono">
        © {new Date().getFullYear()} CodePilot AI · Built for the future of code
      </footer>
    </div>
  );
};

export default Landing;
