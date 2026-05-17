import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Command as CmdIcon, LayoutDashboard, Rocket, Settings, Sparkles, FolderGit2, Code2 } from "lucide-react";
import { useIDE } from "@/store/ide";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/ide", label: "IDE", icon: Code2 },
  { to: "/agents", label: "Agents", icon: Bot },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const TopNav = () => {
  const setCommandOpen = useIDE((s) => s.setCommandOpen);
  const { pathname } = useLocation();
  if (pathname === "/" || pathname.startsWith("/auth")) return null;

  return (
    <header className="h-14 glass-strong border-b border-primary/20 sticky top-0 z-40 flex items-center px-4 gap-4">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ rotate: 90 }}
          className="h-8 w-8 rounded-lg bg-gradient-neon shadow-glow-primary flex items-center justify-center"
        >
          <Sparkles className="h-4 w-4 text-background" />
        </motion.div>
        <span className="font-display font-bold text-lg gradient-text">CodePilot</span>
        <span className="text-xs font-mono text-muted-foreground">/AI</span>
      </Link>

      <nav className="hidden md:flex items-center gap-1 ml-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <l.icon className="h-3.5 w-3.5" />
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="navactive"
                    className="absolute inset-0 -z-10 rounded-md bg-primary/10 border border-primary/30 shadow-glow-soft"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen(true)}
          className="glass border-primary/30 hover:border-primary hover:shadow-glow-soft text-xs gap-2"
        >
          <CmdIcon className="h-3.5 w-3.5" /> ⌘K
        </Button>
        <Link to="/ide">
          <Button size="sm" className="bg-gradient-neon text-background font-semibold shadow-glow-primary hover:opacity-90">
            <Rocket className="h-3.5 w-3.5 mr-1" /> Launch
          </Button>
        </Link>
      </div>
    </header>
  );
};
