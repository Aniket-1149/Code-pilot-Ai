import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronDown, File as FileIcon, Folder, FolderOpen,
  GitBranch, Bot, Store, Database, Puzzle, FolderTree, Plus, FilePlus, FolderPlus
} from "lucide-react";
import { useIDE, type FileNode } from "@/store/ide";
import { cn } from "@/lib/utils";

const PANELS = [
  { id: "explorer", icon: FolderTree, label: "Explorer" },
  { id: "git", icon: GitBranch, label: "Git" },
  { id: "agents", icon: Bot, label: "AI Agents" },
  { id: "templates", icon: Store, label: "Templates" },
  { id: "db", icon: Database, label: "Database" },
  { id: "plugins", icon: Puzzle, label: "Plugins" },
];

const FileTree = ({ nodes, depth = 0, parentId = null }: { nodes: FileNode[]; depth?: number, parentId?: string | null }) => {
  const [open, setOpen] = useState<Record<string, boolean>>({ src: true, components: true });
  const { openTab, activeTabId, addFileNode } = useIDE();

  const handleAdd = (type: "file" | "folder", targetParentId: string | null) => {
    const name = prompt(`Enter ${type} name:`);
    if (name?.trim()) {
      addFileNode(targetParentId, type, name.trim());
      if (targetParentId) {
        setOpen(o => ({ ...o, [targetParentId]: true }));
      }
    }
  };

  return (
    <div>
      {depth === 0 && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70">ROOT</span>
          <div className="flex gap-1">
            <button onClick={() => handleAdd("file", null)} className="p-1 hover:bg-primary/20 rounded text-primary" title="New File"><FilePlus className="h-3.5 w-3.5" /></button>
            <button onClick={() => handleAdd("folder", null)} className="p-1 hover:bg-primary/20 rounded text-primary" title="New Folder"><FolderPlus className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      )}
      {nodes.map((n) => {
        const isOpen = open[n.id];
        if (n.type === "folder") {
          return (
            <div key={n.id}>
              <div className="w-full flex items-center group py-1 pr-2 hover:bg-primary/5 rounded text-xs text-foreground/80">
                <button
                  onClick={() => setOpen((o) => ({ ...o, [n.id]: !o[n.id] }))}
                  className="flex flex-1 items-center gap-1"
                  style={{ paddingLeft: depth * 12 + 8 }}
                >
                  {isOpen ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />}
                  {isOpen ? <FolderOpen className="h-3.5 w-3.5 text-primary shrink-0" /> : <Folder className="h-3.5 w-3.5 text-primary/70 shrink-0" />}
                  <span className="font-mono truncate">{n.name}</span>
                </button>
                <div className="hidden group-hover:flex gap-1 ml-auto">
                   <button onClick={() => handleAdd("file", n.id)} className="hover:text-primary"><FilePlus className="h-3 w-3" /></button>
                   <button onClick={() => handleAdd("folder", n.id)} className="hover:text-primary"><FolderPlus className="h-3 w-3" /></button>
                </div>
              </div>
              <AnimatePresence>
                {isOpen && n.children && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <FileTree nodes={n.children} depth={depth + 1} parentId={n.id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }
        return (
          <button
            key={n.id}
            onClick={() =>
              openTab({
                id: n.id,
                name: n.name,
                language: n.language || "plaintext",
                content: n.content || "",
              })
            }
            className={cn(
              "w-full flex items-center gap-2 py-1 px-2 rounded text-xs font-mono hover:bg-primary/5",
              activeTabId === n.id ? "bg-primary/10 text-primary" : "text-foreground/70"
            )}
            style={{ paddingLeft: depth * 12 + 22 }}
          >
            <FileIcon className="h-3 w-3" />
            {n.name}
          </button>
        );
      })}
    </div>
  );
};

const GitPanel = () => (
  <div className="text-xs space-y-2">
    <div className="flex items-center gap-2 text-accent">
      <GitBranch className="h-3.5 w-3.5" />
      <span className="font-mono">main</span>
      <span className="ml-auto text-[10px] text-muted-foreground">↑ 3 ↓ 0</span>
    </div>
    <div className="space-y-1.5">
      {[
        { f: "NeonButton.tsx", t: "M", c: "text-warning" },
        { f: "neon.css", t: "M", c: "text-warning" },
        { f: "agents.ts", t: "A", c: "text-accent" },
        { f: "deprecated.ts", t: "D", c: "text-destructive" },
      ].map((r) => (
        <div key={r.f} className="flex items-center gap-2 hover:bg-primary/5 rounded px-2 py-1">
          <span className={cn("font-mono w-4", r.c)}>{r.t}</span>
          <span className="font-mono truncate">{r.f}</span>
        </div>
      ))}
    </div>
  </div>
);

const AgentsMini = () => {
  const agents = useIDE((s) => s.agents);
  return (
    <div className="space-y-2">
      {agents.map((a) => (
        <div key={a.id} className="p-2 rounded-lg glass border-primary/10">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                a.status === "running" && "bg-accent animate-pulse shadow-glow-accent",
                a.status === "thinking" && "bg-secondary animate-pulse shadow-glow-secondary",
                a.status === "done" && "bg-primary",
                a.status === "idle" && "bg-muted-foreground/40",
                a.status === "error" && "bg-destructive"
              )}
            />
            <span className="font-semibold">{a.name}</span>
            <span className="ml-auto text-[10px] text-muted-foreground capitalize">{a.status}</span>
          </div>
          {a.task && <div className="text-[10px] text-muted-foreground mt-1 font-mono truncate">{a.task}</div>}
          {a.progress > 0 && a.progress < 100 && (
            <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${a.progress}%` }}
                className="h-full bg-gradient-neon"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Templates = () => (
  <div className="grid gap-2">
    {["SaaS Landing", "Dashboard", "AI Chat App", "E-commerce", "Blog CMS"].map((t) => (
      <div key={t} className="p-2 rounded-lg glass hover:border-primary/40 transition cursor-pointer">
        <div className="text-xs font-semibold">{t}</div>
        <div className="text-[10px] text-muted-foreground">Tap to scaffold</div>
      </div>
    ))}
  </div>
);

const DB = () => (
  <div className="space-y-2 text-xs">
    <div className="font-mono text-primary">public.users</div>
    <div className="pl-3 space-y-1 font-mono text-muted-foreground">
      <div>id <span className="text-secondary">uuid</span></div>
      <div>email <span className="text-secondary">text</span></div>
      <div>created_at <span className="text-secondary">timestamptz</span></div>
    </div>
    <div className="font-mono text-primary mt-3">public.projects</div>
    <div className="pl-3 space-y-1 font-mono text-muted-foreground">
      <div>id <span className="text-secondary">uuid</span></div>
      <div>name <span className="text-secondary">text</span></div>
      <div>owner_id <span className="text-secondary">uuid</span></div>
    </div>
  </div>
);

const Plugins = () => (
  <div className="space-y-2 text-xs">
    {[
      { n: "Prettier++", on: true },
      { n: "Tailwind IntelliSense", on: true },
      { n: "Vim Mode", on: false },
      { n: "Neon Theme", on: true },
    ].map((p) => (
      <div key={p.n} className="flex items-center justify-between p-2 glass rounded-lg">
        <span>{p.n}</span>
        <span className={cn("text-[10px] font-mono", p.on ? "text-accent" : "text-muted-foreground")}>
          {p.on ? "ENABLED" : "OFF"}
        </span>
      </div>
    ))}
  </div>
);

export const LeftSidebar = () => {
  const [active, setActive] = useState("explorer");
  const files = useIDE((s) => s.files);

  return (
    <div className="h-full flex glass-strong border-r border-primary/20">
      {/* icon strip */}
      <div className="w-12 flex flex-col items-center py-3 gap-1 border-r border-primary/10 bg-background/40">
        {PANELS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-lg transition relative",
              active === p.id
                ? "bg-primary/15 text-primary shadow-glow-sog"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
            )}
            title={p.label}
          >
            <p.icon className="h-4 w-4" />
            {active === p.id && (
              <motion.span
                layoutId="leftactive"
                className="absolute left-0 top-1 bottom-1 w-[2px] bg-primary rounded-r shadow-glow-soft"
              />
            )}
          </button>
        ))}
      </div>

      <div className="w-60 p-3 overflow-y-auto">
        {active !== "explorer" && (
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary/70 mb-3">
            {PANELS.find((p) => p.id === active)?.label}
          </div>
        )}
        {active === "explorer" && <FileTree nodes={files} />}
        {active === "git" && <GitPanel />}
        {active === "agents" && <AgentsMini />}
        {active === "templates" && <Templates />}
        {active === "db" && <DB />}
        {active === "plugins" && <Plugins />}
      </div>
    </div>
  );
};
