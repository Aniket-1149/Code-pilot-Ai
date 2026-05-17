import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Palette, Bot, Keyboard, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "theme", label: "Appearance", icon: Palette },
  { id: "ai", label: "AI Agents", icon: Bot },
  { id: "shortcuts", label: "Shortcuts", icon: Keyboard },
  { id: "security", label: "Security", icon: Shield },
];

const THEMES = [
  { id: "cyber", name: "Cyberpunk Neon", colors: ["bg-primary", "bg-secondary", "bg-accent"] },
  { id: "hacker", name: "Hacker Green", colors: ["bg-accent", "bg-accent/60", "bg-accent/30"] },
  { id: "glass", name: "Dark Glass", colors: ["bg-foreground", "bg-muted-foreground", "bg-muted"] },
];

const Settings = () => {
  const [section, setSection] = useState("profile");
  const [theme, setTheme] = useState("cyber");

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-mono text-primary mb-1">// CONFIG</div>
        <h1 className="font-display text-4xl font-bold">
          <span className="gradient-text">Settings</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <nav className="space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition relative",
                section === s.id
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </nav>

        <motion.div
          key={section}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-primary/15 space-y-6"
        >
          {section === "profile" && (
            <>
              <div>
                <h2 className="font-display font-bold text-xl mb-1">Profile</h2>
                <p className="text-sm text-muted-foreground">Update how you appear in CodePilot.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground">DISPLAY NAME</label>
                  <Input defaultValue="Nova Dev" className="mt-1 bg-background/60 border-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground">EMAIL</label>
                  <Input defaultValue="nova@codepilot.ai" className="mt-1 bg-background/60 border-primary/20" />
                </div>
              </div>
              <Button className="bg-gradient-neon text-background font-semibold">Save</Button>
            </>
          )}

          {section === "theme" && (
            <>
              <div>
                <h2 className="font-display font-bold text-xl mb-1">Appearance</h2>
                <p className="text-sm text-muted-foreground">Pick your vibe.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "rounded-xl p-4 border text-left transition",
                      theme === t.id ? "border-primary shadow-glow-soft" : "border-primary/15 hover:border-primary/40"
                    )}
                  >
                    <div className="flex gap-1.5 mb-3">
                      {t.colors.map((c, i) => (
                        <span key={i} className={cn("h-6 w-6 rounded-full", c)} />
                      ))}
                    </div>
                    <div className="font-semibold text-sm">{t.name}</div>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { l: "Animated background", on: true },
                  { l: "Reduced motion", on: false },
                  { l: "Glassmorphism", on: true },
                  { l: "Scanlines", on: false },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between p-3 glass rounded-lg">
                    <span className="text-sm">{s.l}</span>
                    <Switch defaultChecked={s.on} />
                  </div>
                ))}
              </div>
            </>
          )}

          {section === "ai" && (
            <>
              <div>
                <h2 className="font-display font-bold text-xl mb-1">AI Agents</h2>
                <p className="text-sm text-muted-foreground">Configure how agents collaborate with you.</p>
              </div>
              <div className="space-y-3">
                {[
                  { l: "Inline autocomplete", on: true },
                  { l: "Auto-fix bugs on save", on: true },
                  { l: "Suggest refactors", on: true },
                  { l: "Voice coding", on: false },
                  { l: "Allow autonomous deploys", on: false },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between p-3 glass rounded-lg">
                    <span className="text-sm">{s.l}</span>
                    <Switch defaultChecked={s.on} />
                  </div>
                ))}
              </div>
            </>
          )}

          {section === "shortcuts" && (
            <>
              <div>
                <h2 className="font-display font-bold text-xl mb-1">Keyboard</h2>
                <p className="text-sm text-muted-foreground">Move at the speed of thought.</p>
              </div>
              <div className="space-y-2 font-mono text-sm">
                {[
                  ["Open command palette", "⌘ K"],
                  ["Toggle AI orb", "⌘ ."],
                  ["Generate from prompt", "⌘ ⇧ G"],
                  ["Toggle terminal", "⌘ `"],
                  ["Split editor", "⌘ \\"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between p-3 glass rounded-lg">
                    <span>{k}</span>
                    <kbd className="px-2 py-1 rounded bg-primary/10 border border-primary/30 text-primary text-xs">{v}</kbd>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === "security" && (
            <>
              <div>
                <h2 className="font-display font-bold text-xl mb-1">Security</h2>
                <p className="text-sm text-muted-foreground">Lock down your workspace.</p>
              </div>
              <div className="space-y-3">
                {[
                  { l: "Two-factor authentication", on: true },
                  { l: "Block agent network access", on: false },
                  { l: "Require confirm before deploy", on: true },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between p-3 glass rounded-lg">
                    <span className="text-sm">{s.l}</span>
                    <Switch defaultChecked={s.on} />
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
