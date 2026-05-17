import { useState, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SplitSquareHorizontal, Sparkles, Wand2, Lightbulb, Send, Play } from "lucide-react";
import { useIDE } from "@/store/ide";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiPost } from "@/lib/api";

const monacoTheme = {
  base: "vs-dark" as const,
  inherit: true,
  rules: [
    { token: "comment", foreground: "5c6e91", fontStyle: "italic" },
    { token: "keyword", foreground: "ff5cf3" },
    { token: "string", foreground: "5cffaa" },
    { token: "number", foreground: "ffb45c" },
    { token: "type", foreground: "5cf2ff" },
    { token: "function", foreground: "5cf2ff" },
  ],
  colors: {
    "editor.background": "#06081a",
    "editor.foreground": "#d4f7ff",
    "editorLineNumber.foreground": "#3a4a7a",
    "editorLineNumber.activeForeground": "#5cf2ff",
    "editor.selectionBackground": "#5cf2ff33",
    "editor.lineHighlightBackground": "#0f1530",
    "editorCursor.foreground": "#5cf2ff",
    "editorIndentGuide.background": "#1a2240",
    "scrollbarSlider.background": "#5cf2ff33",
    "scrollbarSlider.hoverBackground": "#5cf2ff66",
  },
};

const PromptPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [val, setVal] = useState("");
  const addPrompt = useIDE((s) => s.addPrompt);
  const addTerminalLine = useIDE((s) => s.addTerminalLine);
  const openTab = useIDE((s) => s.openTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="absolute top-3 left-1/2 -translate-x-1/2 w-[520px] z-30 glass-strong rounded-xl p-3 shadow-glow-primary border border-primary/40"
        >
          <div className="flex items-center gap-2 mb-2 text-xs">
            <Wand2 className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-secondary">PROMPT → CODE</span>
            <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Generate a glassmorphic pricing card with 3 tiers…"
              className="bg-background/60 border-primary/30 focus-visible:ring-primary"
            />
            <Button
              onClick={async () => {
                if (!val.trim()) return;
                try {
                  setLoading(true);
                  setError(null);
                  addPrompt(val);
                  const res = await apiPost<{ data: { output: string } }>("/ai/generate", {
                    prompt: val,
                    system: "You are a senior engineer. Return ONLY raw executable javascript code, without markdown backticks.",
                  });
                  let finalCode = res.data?.output || "// No output";
                  if (finalCode.startsWith("\`\`\`")) {
                    finalCode = finalCode.replace(/^\`\`\`[\w]*\n/, "").replace(/\n\`\`\`$/, "");
                  }
                  
                  const id = `gen-${Date.now()}`;
                  openTab({
                    id,
                    name: `Generated-${Date.now()}.js`,
                    language: "javascript",
                    content: finalCode
                  });
                  
                  addTerminalLine(`🤖 Executing generated code...`);
                  try {
                    const execRes = await apiPost<{ data: { output: string } }>("/execute", {
                      code: finalCode,
                      language: "javascript"
                    });
                    const outLines = execRes.data?.output.split('\n') || [];
                    outLines.forEach(l => addTerminalLine(`→ ${l}`));
                  } catch (e) {
                    addTerminalLine(`→ Execution failed. See console.`);
                  }

                  setVal("");
                  onClose();
                } catch (err) {
                  setError("Generation failed.");
                } finally {
                  setLoading(false);
                }
              }}
              className="bg-gradient-neon text-background"
              disabled={loading}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
          {error && <div className="text-[10px] text-destructive font-mono mt-2">{error}</div>}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Add dark mode", "Make responsive", "Convert to TS", "Add tests"].map((s) => (
              <button
                key={s}
                onClick={() => setVal(s)}
                className="text-[10px] px-2 py-1 rounded-full glass border border-primary/20 hover:border-primary/60 text-muted-foreground hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EditorWorkspace = () => {
  const { tabs, activeTabId, setActive, closeTab, updateContent, splitView, toggleSplit } = useIDE();
  const active = tabs.find((t) => t.id === activeTabId);
  const [promptOpen, setPromptOpen] = useState(false);
  const [showSuggest, setShowSuggest] = useState(true);
  const addTerminalLine = useIDE((s) => s.addTerminalLine);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const runCode = async () => {
    if (!active) return;
    addTerminalLine(`$ running ${active.name}...`);
    try {
      const execRes = await apiPost<{ data: { output: string } }>("/execute", {
         code: active.content,
         language: active.language
      });
      const outLines = execRes.data?.output.split('\n') || [];
      outLines.forEach(l => addTerminalLine(`→ ${l}`));
    } catch (e) {
      addTerminalLine(`→ Execution failed. Server might be unreachable.`);
    }
  };

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("codepilot-neon", monacoTheme);
    monaco.editor.setTheme("codepilot-neon");
  };

  return (
    <div className="h-full flex flex-col bg-background/60 relative overflow-hidden">
      {/* Tabs bar */}
      <div className="h-10 flex items-center border-b border-primary/15 bg-background/40 px-1">
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "group flex items-center gap-2 px-3 py-1.5 text-xs font-mono border-r border-primary/10 transition relative",
                activeTabId === t.id
                  ? "bg-background text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {t.name}
              {t.dirty && <span className="text-secondary">●</span>}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(t.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </span>
              {activeTabId === t.id && (
                <motion.span
                  layoutId="tabactive"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-neon shadow-glow-soft"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 px-2">
          {active && (
            <Button
              size="sm"
              variant="ghost"
              onClick={runCode}
              className="h-7 gap-1 text-xs hover:bg-accent/10 hover:text-accent"
            >
              <Play className="h-3.5 w-3.5" /> Run
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPromptOpen((v) => !v)}
            className="h-7 gap-1 text-xs hover:bg-primary/10 hover:text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" /> Prompt
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleSplit}
            className="h-7 hover:bg-primary/10 hover:text-primary"
          >
            <SplitSquareHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 relative">
        <PromptPanel open={promptOpen} onClose={() => setPromptOpen(false)} />

        {active ? (
          <div className={cn("h-full grid", splitView ? "grid-cols-2 divide-x divide-primary/15" : "grid-cols-1")}>
            <div className="relative">
              <Editor
                height="100%"
                language={active.language}
                value={active.content}
                onMount={onMount}
                onChange={(v) => updateContent(active.id, v ?? "")}
                options={{
                  fontFamily: "JetBrains Mono, Fira Code, monospace",
                  fontSize: 13,
                  fontLigatures: true,
                  minimap: { enabled: true, scale: 1, renderCharacters: false },
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  cursorSmoothCaretAnimation: "on",
                  padding: { top: 12 },
                  scrollBeyondLastLine: false,
                  renderLineHighlight: "all",
                }}
              />
              {/* AI suggestion overlay */}
              <AnimatePresence>
                {showSuggest && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute bottom-4 right-4 max-w-xs glass-strong rounded-lg p-3 border border-secondary/40 shadow-glow-secondary"
                  >
                    <div className="flex items-center gap-2 mb-1.5 text-xs">
                      <Lightbulb className="h-3.5 w-3.5 text-secondary" />
                      <span className="font-mono text-secondary">AI SUGGESTION</span>
                      <button
                        onClick={() => setShowSuggest(false)}
                        className="ml-auto text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-xs text-foreground/80">
                      Extract <span className="font-mono text-primary">setCount</span> into a custom hook for reusability.
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      <Button size="sm" className="h-6 text-[10px] bg-gradient-neon text-background" onClick={() => setShowSuggest(false)}>Apply</Button>
                      <Button size="sm" variant="ghost" className="h-6 text-[10px]" onClick={() => setShowSuggest(false)}>Dismiss</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {splitView && (
              <div>
                <Editor
                  height="100%"
                  language={active.language}
                  value={active.content}
                  onMount={onMount}
                  options={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 13,
                    minimap: { enabled: false },
                    readOnly: true,
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No file open — pick one from the explorer.
          </div>
        )}
      </div>
    </div>
  );
};
