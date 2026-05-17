import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AIOrb } from "@/components/AIOrb";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center cyber-grid">
    <div className="text-center">
      <AIOrb size={160} />
      <div className="text-xs font-mono text-secondary mt-6">// ERROR 404</div>
      <h1 className="font-display text-6xl font-bold mt-2 gradient-text">Lost in the grid</h1>
      <p className="text-muted-foreground mt-2">This route doesn't exist in the matrix.</p>
      <Link to="/" className="inline-block mt-6">
        <Button className="bg-gradient-neon text-background font-semibold shadow-glow-primary">
          Return home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
