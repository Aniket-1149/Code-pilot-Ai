import { create } from "zustand";

export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  language?: string;
  content?: string;
  children?: FileNode[];
};

export type OpenTab = {
  id: string;
  name: string;
  language: string;
  content: string;
  dirty?: boolean;
};

export type AgentStatus = "idle" | "thinking" | "running" | "done" | "error";
export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  task?: string;
  progress: number;
};

type IDEState = {
  files: FileNode[];
  tabs: OpenTab[];
  activeTabId: string | null;
  splitView: boolean;
  commandOpen: boolean;
  copilotTab: string;
  agents: Agent[];
  prompts: string[];
  terminalLines: string[];
  openTab: (tab: OpenTab) => void;
  closeTab: (id: string) => void;
  setActive: (id: string) => void;
  updateContent: (id: string, content: string) => void;
  toggleSplit: () => void;
  setCommandOpen: (v: boolean) => void;
  setCopilotTab: (t: string) => void;
  setAgentStatus: (id: string, status: AgentStatus, progress?: number) => void;
  addPrompt: (p: string) => void;
  addTerminalLine: (line: string) => void;
  addFileNode: (parentId: string | null, type: "file" | "folder", name: string) => void;
};

const sampleTSX = `// Welcome to CodePilot AI ✨
import { useState } from "react";
import { motion } from "framer-motion";

export default function NeonButton() {
  const [count, setCount] = useState(0);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setCount((c) => c + 1)}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-bold shadow-[0_0_30px_rgba(34,211,238,0.6)]"
    >
      🚀 Clicked {count} times
    </motion.button>
  );
}
`;

const sampleCSS = `/* neon.css */
.neon {
  color: #22d3ee;
  text-shadow:
    0 0 5px #22d3ee,
    0 0 10px #22d3ee,
    0 0 20px #0ea5e9;
}
`;

const sampleMD = `# CodePilot AI

> The AI operating system for developers.

- Autonomous agents
- Prompt-to-app builder
- Natural language terminal
`;

export const useIDE = create<IDEState>((set) => ({
  files: [],
  tabs: [],
  activeTabId: null,
  splitView: false,
  commandOpen: false,
  copilotTab: "chat",
  agents: [
    { id: "a1", name: "Architect", role: "Plans system architecture", status: "idle", progress: 0 },
    { id: "a2", name: "Debugger", role: "Hunts bugs autonomously", status: "running", task: "Tracing render loop", progress: 62 },
    { id: "a3", name: "Refactor", role: "Improves code quality", status: "thinking", task: "Analyzing duplication", progress: 28 },
    { id: "a4", name: "Reviewer", role: "Code review & best practices", status: "idle", progress: 0 },
    { id: "a5", name: "Tester", role: "Generates and runs tests", status: "done", task: "12 tests passing", progress: 100 },
    { id: "a6", name: "Docs", role: "Writes documentation", status: "idle", progress: 0 },
  ],
  prompts: [
    "Build a glassmorphic pricing page",
    "Refactor authentication to use OAuth",
    "Generate tests for cart checkout",
    "Find why the dashboard re-renders 3x",
  ],
  terminalLines: [
    "$ codepilot init my-app",
    "✓ Connected to CodePilot AI engine",
    "→ Try: 'generate a quicksort in js'"
  ],
  openTab: (tab) =>
    set((s) => {
      if (s.tabs.some((t) => t.id === tab.id)) return { activeTabId: tab.id };
      return { tabs: [...s.tabs, tab], activeTabId: tab.id };
    }),
  closeTab: (id) =>
    set((s) => {
      const tabs = s.tabs.filter((t) => t.id !== id);
      const activeTabId = s.activeTabId === id ? tabs[tabs.length - 1]?.id ?? null : s.activeTabId;
      return { tabs, activeTabId };
    }),
  setActive: (id) => set({ activeTabId: id }),
  updateContent: (id, content) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.id === id ? { ...t, content, dirty: true } : t)),
    })),
  toggleSplit: () => set((s) => ({ splitView: !s.splitView })),
  setCommandOpen: (v) => set({ commandOpen: v }),
  setCopilotTab: (t) => set({ copilotTab: t }),
  setAgentStatus: (id, status, progress) =>
    set((s) => ({
      agents: s.agents.map((a) => (a.id === id ? { ...a, status, progress: progress ?? a.progress } : a)),
    })),
  addPrompt: (p) => set((s) => ({ prompts: [p, ...s.prompts].slice(0, 12) })),
  addTerminalLine: (line) => set((s) => ({ terminalLines: [...s.terminalLines, line] })),
  addFileNode: (parentId, type, name) => set((s) => {
    const language = name.endsWith(".ts") || name.endsWith(".tsx") ? "typescript" 
                    : name.endsWith(".js") ? "javascript" 
                    : name.endsWith(".json") ? "json" 
                    : name.endsWith(".css") ? "css" : "plaintext";
    const newNode: FileNode = {
      id: `${type}-${Date.now()}`,
      name,
      type,
      ...(type === 'folder' ? { children: [] } : { language, content: '' })
    };

    if (!parentId) {
      return { files: [...s.files, newNode] };
    }

    const insertRecursive = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((n) => {
        if (n.id === parentId && n.type === 'folder') {
          return { ...n, children: [...(n.children || []), newNode] };
        }
        if (n.children) {
          return { ...n, children: insertRecursive(n.children) };
        }
        return n;
      });
    };

    return { files: insertRecursive(s.files) };
  }),
}));
