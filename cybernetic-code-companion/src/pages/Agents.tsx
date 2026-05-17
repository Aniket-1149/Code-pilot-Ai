import { motion } from "framer-motion";
import { Bot, Play, Pause, RotateCcw, Plus, Sparkles } from "lucide-react";
import { useIDE } from "@/store/ide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AIOrb } from "@/components/AIOrb";

const colorMap: Record<string, string> = {
  running: "accent",
  thinking: "secondary",
  done: "primary",
  idle: "muted-foreground",
  error: "destructive",
};

const Agents = () => {
  const { agents, setAgentStatus } = useIDE();
  const live = agents.filter((a) => a.status === "running" || a.status === "thinking").length;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono text-primary mb-1">// CONTROL CENTER</div>
          <h1 className="font-display text-4xl font-bold">
            AI <span className="gradient-text">Agents</span>
          </h1>
          <p className="text-muted-foreground mt-1">{live} agents working · {agents.length - live} idle</p>
        </div>
        <Button className="bg-gradient-neon text-background font-semibold shadow-glow-primary">
          <Plus className="h-4 w-4 mr-2" /> Spawn Agent
        </Button>
      </div>

      {/* Hero orchestrator */}
      <div className="glass-strong border border-primary/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <AIOrb size={140} />
        <div className="relative flex-1">
          <div className="text-xs font-mono text-secondary mb-1">ORCHESTRATOR</div>
          <h2 className="font-display text-2xl font-bold">All systems nominal</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Agents are coordinating in parallel. The architect is queuing the next sprint.
          </p>
          <div className="mt-3 flex gap-3 text-xs font-mono">
            <span className="text-accent">● 6 online</span>
            <span className="text-primary">⚡ 12 ms latency</span>
            <span className="text-secondary">🧠 GPT-Neon</span>
          </div>
        </div>
      </div>

      {/* Agents grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((a, i) => {
          const c = colorMap[a.status];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-5 border border-primary/15 hover:border-primary/40 transition relative overflow-hidden"
            >
              <div className={cn("absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-30", `bg-${c}`)} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border", `bg-${c}/10 border-${c}/40`)}>
                    <Bot className={cn("h-5 w-5", `text-${c}`)} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold">{a.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground capitalize">{a.status}</div>
                  </div>
                  <span className={cn("h-2 w-2 rounded-full",
                    a.status === "running" && "bg-accent animate-pulse",
                    a.status === "thinking" && "bg-secondary animate-pulse",
                    a.status === "done" && "bg-primary",
                    a.status === "idle" && "bg-muted-foreground/40")}
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{a.role}</p>
                {a.task && (
                  <div className="text-[11px] font-mono p-2 rounded glass border border-primary/10 mb-3">
                    <Sparkles className="h-3 w-3 inline text-primary mr-1" /> {a.task}
                  </div>
                )}
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${a.progress}%` }}
                    className="h-full bg-gradient-neon"
                  />
                </div>
                <div className="flex gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setAgentStatus(a.id, a.status === "running" ? "idle" : "running", a.progress)
                    }
                    className="h-7 text-xs flex-1 hover:bg-primary/10"
                  >
                    {a.status === "running" ? <><Pause className="h-3 w-3 mr-1" /> Pause</> : <><Play className="h-3 w-3 mr-1" /> Run</>}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setAgentStatus(a.id, "idle", 0)}
                    className="h-7 text-xs hover:bg-primary/10"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Agents;
