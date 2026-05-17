import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ScrollText, FlaskConical, Activity, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIDE } from "@/store/ide";

const TABS = [
  { id: "terminal", label: "Terminal", icon: TerminalIcon },
  { id: "output", label: "Output", icon: ScrollText },
  { id: "logs", label: "Logs", icon: ScrollText },
  { id: "tests", label: "Tests", icon: FlaskConical },
  { id: "agents", label: "Agent Activity", icon: Activity },
];

const Terminal = () => {
  const terminalLines = useIDE(s => s.terminalLines);
  const addTerminalLine = useIDE(s => s.addTerminalLine);
  const [val, setVal] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [terminalLines]);

  const submit = async () => {
    if (!val.trim()) return;
    const command = val;
    addTerminalLine(`$ ${command}`);
    setVal("");
    
    // Simulate terminal command if wanted
  };

  return (
    <div className="h-full flex flex-col font-mono text-xs">
      <div ref={ref} className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {terminalLines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              l.startsWith("✓") && "text-accent",
              l.startsWith("→") && "text-secondary",
              l.startsWith("🤖") && "text-primary",
              l.startsWith("$") && "text-foreground"
            )}
          >
            {l}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-primary/15 px-3 py-2 bg-background/40">
        <Sparkles className="h-3 w-3 text-primary" />
        <span className="text-primary">~/codepilot</span>
        <span className="text-muted-foreground">$</span>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Type a command or natural-language instruction…"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
};

const Output = () => (
  <div className="p-3 font-mono text-xs space-y-1">
    <div className="text-accent">[BUILD] Compiled successfully in 842ms</div>
    <div className="text-muted-foreground">  ➜  Local:   http://localhost:5173/</div>
    <div className="text-muted-foreground">  ➜  Network: 192.168.1.42:5173</div>
    <div className="text-warning">[HMR] Updated NeonButton.tsx</div>
  </div>
);

const Tests = () => (
  <div className="p-3 font-mono text-xs space-y-1">
    {[
      { n: "renders the orb", ok: true },
      { n: "handles click events", ok: true },
      { n: "applies neon shadow", ok: true },
      { n: "passes a11y check", ok: false },
    ].map((t) => (
      <div key={t.n} className={cn("flex items-center gap-2", t.ok ? "text-accent" : "text-destructive")}>
        <span>{t.ok ? "✓" : "✗"}</span> {t.n}
      </div>
    ))}
  </div>
);

const AgentActivity = () => {
  const agents = useIDE((s) => s.agents);
  return (
    <div className="p-3 grid grid-cols-2 lg:grid-cols-3 gap-2">
      {agents.map((a) => (
        <div key={a.id} className="glass rounded-lg p-2.5">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                a.status === "running" && "bg-accent animate-pulse",
                a.status === "thinking" && "bg-secondary animate-pulse",
                a.status === "done" && "bg-primary",
                a.status === "idle" && "bg-muted-foreground/40"
              )}
            />
            <span className="font-semibold">{a.name}</span>
            <span className="ml-auto text-[10px] capitalize text-muted-foreground">{a.status}</span>
          </div>
          {a.task && <div className="text-[10px] text-muted-foreground font-mono mt-1">{a.task}</div>}
          <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-neon" style={{ width: `${a.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const BottomDock = () => {
  const [tab, setTab] = useState("terminal");
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("border-t border-primary/20 glass-strong flex flex-col transition-all", open ? "h-64" : "h-9")}>
      <div className="h-9 shrink-0 flex items-center px-2 border-b border-primary/10">
        <div className="flex items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setOpen(true);
              }}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition",
                tab === t.id && open
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="h-3 w-3" />
              {t.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 text-[10px] font-mono text-muted-foreground pr-2">
          <span className="text-accent">● 6 agents</span>
          <span>main</span>
          <span>UTF-8</span>
          <button onClick={() => setOpen((v) => !v)} className="hover:text-foreground">
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex-1 overflow-hidden">
          {tab === "terminal" && <Terminal />}
          {tab === "output" && <Output />}
          {tab === "logs" && <Output />}
          {tab === "tests" && <Tests />}
          {tab === "agents" && <AgentActivity />}
        </div>
      )}
    </div>
  );
};
