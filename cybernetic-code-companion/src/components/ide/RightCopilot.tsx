import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Bug, Wand2, Building2, FlaskConical, FileText, ShieldCheck, Send, Sparkles, Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Waveform } from "@/components/Waveform";
import { AIOrb } from "@/components/AIOrb";
import { apiPost } from "@/lib/api";

const TABS = [
  { id: "chat", label: "Codebase", icon: MessageSquare, color: "primary" },
  { id: "debug", label: "Debug", icon: Bug, color: "destructive" },
  { id: "refactor", label: "Refactor", icon: Wand2, color: "secondary" },
  { id: "architect", label: "Architect", icon: Building2, color: "accent" },
  { id: "tests", label: "Tests", icon: FlaskConical, color: "warning" },
  { id: "docs", label: "Docs", icon: FileText, color: "primary" },
  { id: "review", label: "Review", icon: ShieldCheck, color: "accent" },
];

type Msg = { role: "user" | "ai"; text: string };

const ChatBody = ({ tab }: { tab: string }) => {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: `Hi — I'm your **${tab}** agent. Ask me anything about this codebase.` },
    { role: "user", text: "Where is the auth flow defined?" },
    { role: "ai", text: "Found it in `src/store/auth.ts` and used by 4 components. Want a refactor plan?" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [voice, setVoice] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const u = input;
    setMsgs((m) => [...m, { role: "user", text: u }]);
    setInput("");
    setThinking(true);
    try {
      const res = await apiPost<{ data: { output: string } }>("/ai/generate", {
        prompt: u,
        system: `You are the ${tab} agent. Provide concise guidance.`
      });
      setMsgs((m) => [...m, { role: "ai", text: res.data?.output || "No response." }]);
    } catch (err) {
      setMsgs((m) => [...m, { role: "ai", text: "Request failed. Check backend logs." }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex gap-2", m.role === "user" && "flex-row-reverse")}
          >
            {m.role === "ai" ? (
              <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-neon flex items-center justify-center shadow-glow-soft">
                <Sparkles className="h-3.5 w-3.5 text-background" />
              </div>
            ) : (
              <div className="h-7 w-7 shrink-0 rounded-full glass border-primary/30 flex items-center justify-center text-[10px] font-mono">
                YOU
              </div>
            )}
            <div
              className={cn(
                "rounded-xl px-3 py-2 text-xs max-w-[80%] leading-relaxed",
                m.role === "ai"
                  ? "glass border border-primary/20"
                  : "bg-primary/15 border border-primary/30 text-foreground"
              )}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {thinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 items-center"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-neon flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-background animate-pulse" />
              </div>
              <div className="glass rounded-xl px-3 py-2 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-primary/15 space-y-2">
        {voice && (
          <div className="glass rounded-lg p-2 flex items-center gap-3">
            <Waveform />
            <span className="text-[10px] font-mono text-primary">LISTENING…</span>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setVoice((v) => !v)}
            className={cn("h-9 w-9 shrink-0", voice && "text-secondary bg-secondary/10")}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={`Ask the ${tab} agent…`}
            className="bg-background/60 border-primary/20 focus-visible:ring-primary text-xs"
          />
          <Button onClick={send} className="h-9 bg-gradient-neon text-background">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const RightCopilot = () => {
  const [tab, setTab] = useState("chat");
  return (
    <div className="h-full flex flex-col glass-strong border-l border-primary/20">
      <div className="p-3 border-b border-primary/15 flex items-center gap-3">
        <AIOrb size={44} />
        <div>
          <div className="text-xs font-display font-bold gradient-text">COPILOT.AI</div>
          <div className="text-[10px] font-mono text-muted-foreground">7 agents online</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 p-2 border-b border-primary/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition relative",
              tab === t.id
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
            )}
          >
            <t.icon className="h-3 w-3" />
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="copiloactive"
                className="absolute inset-0 -z-10 rounded-md border border-primary/40 shadow-glow-soft"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <ChatBody tab={TABS.find((t) => t.id === tab)?.label || "Chat"} />
      </div>
    </div>
  );
};
