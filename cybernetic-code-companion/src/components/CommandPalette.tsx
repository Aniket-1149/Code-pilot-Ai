import { useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useIDE } from "@/store/ide";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, FileCode, Bot, Bug, GitBranch, Terminal as TerminalIcon,
  LayoutDashboard, Settings, Rocket, Wand2,
} from "lucide-react";

export const CommandPalette = () => {
  const { commandOpen, setCommandOpen } = useIDE();
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);

  const go = (path: string) => {
    setCommandOpen(false);
    nav(path);
  };

  return (
    <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
      <DialogContent className="p-0 max-w-2xl glass-strong border-primary/30 shadow-glow-primary">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command className="bg-transparent">
          <div className="flex items-center gap-2 px-4 pt-3">
            <Sparkles className="h-4 w-4 text-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary/80">CodePilot Command</span>
          </div>
          <CommandInput placeholder="Type a command, file, or AI prompt…" className="border-0" />
          <CommandList className="max-h-96">
            <CommandEmpty>No results — try a prompt.</CommandEmpty>
            <CommandGroup heading="AI Actions">
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <Wand2 className="mr-2 h-4 w-4 text-secondary" /> Generate component from prompt…
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <Bug className="mr-2 h-4 w-4 text-accent" /> Find & fix bugs in current file
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <Bot className="mr-2 h-4 w-4 text-primary" /> Ask Codebase Chat
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Navigate">
              <CommandItem onSelect={() => go("/")}>
                <Rocket className="mr-2 h-4 w-4" /> Landing
              </CommandItem>
              <CommandItem onSelect={() => go("/dashboard")}>
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </CommandItem>
              <CommandItem onSelect={() => go("/ide")}>
                <FileCode className="mr-2 h-4 w-4" /> IDE Workspace
              </CommandItem>
              <CommandItem onSelect={() => go("/agents")}>
                <Bot className="mr-2 h-4 w-4" /> AI Agents
              </CommandItem>
              <CommandItem onSelect={() => go("/projects")}>
                <GitBranch className="mr-2 h-4 w-4" /> Projects
              </CommandItem>
              <CommandItem onSelect={() => go("/settings")}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Tools">
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <TerminalIcon className="mr-2 h-4 w-4" /> Open natural-language terminal
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
