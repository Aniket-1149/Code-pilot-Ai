import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, GitBranch, Plus, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { apiGet, apiPost } from "@/lib/api";

type Project = {
  _id: string;
  name: string;
  description?: string;
};

const Projects = () => {
  const [q, setQ] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const colors = ["primary", "secondary", "accent", "warning"] as const;

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet<{ data: Project[] }>("/projects");
      setProjects(res.data ?? []);
    } catch (err) {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter(
      (p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.description?.toLowerCase().includes(q.toLowerCase())
    );
  }, [projects, q]);

  const createProject = async () => {
    if (!name.trim()) return;
    try {
      setCreating(true);
      await apiPost("/projects", { name, description });
      setName("");
      setDescription("");
      setDialogOpen(false);
      await loadProjects();
    } catch (err) {
      setError("Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono text-primary mb-1">// WORKSPACE</div>
          <h1 className="font-display text-4xl font-bold">
            Your <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-muted-foreground mt-1">{projects.length} repositories · all synced</p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-gradient-neon text-background font-semibold shadow-glow-primary"
        >
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects…"
          className="pl-9 bg-background/60 border-primary/30"
        />
      </div>

      {error && <div className="text-xs text-destructive font-mono">{error}</div>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => {
          const color = colors[i % colors.length];
          return (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <Link to="/ide" className="block glass rounded-2xl p-5 border border-primary/15 hover:border-primary/50 transition relative overflow-hidden h-full">
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 bg-${color}`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-${color}/10 border border-${color}/30`}>
                    <Code2 className={`h-5 w-5 text-${color}`} />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full glass border border-${color}/30 text-${color}`}>
                    Active
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4 line-clamp-2">
                  {p.description || "Project workspace"}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><GitBranch className="h-3 w-3" /> Repo</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> 0</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
        })}
        {!loading && filtered.length === 0 && (
          <div className="text-sm text-muted-foreground font-mono">No projects yet. Create one.</div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>Start a new workspace to generate and manage code.</DialogDescription>
          <div className="space-y-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={createProject} disabled={creating} className="bg-gradient-neon text-background">
                {creating ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
