import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
  thinking?: boolean;
};

export const AIOrb = ({ size = 120, className, thinking = true }: Props) => {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      {/* outer halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(186 100% 55% / 0.6) 0%, hsl(300 100% 60% / 0.3) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: thinking ? [1, 1.15, 1] : 1, opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* rotating rings */}
      <motion.div
        className="absolute inset-2 rounded-full border border-primary/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ borderTopColor: "hsl(var(--primary))", borderRightColor: "transparent" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-secondary/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ borderBottomColor: "hsl(var(--secondary))", borderLeftColor: "transparent" }}
      />
      <motion.div
        className="absolute inset-7 rounded-full border border-accent/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ borderTopColor: "hsl(var(--accent))", borderRightColor: "transparent" }}
      />
      {/* core */}
      <motion.div
        className="absolute inset-[28%] rounded-full bg-gradient-neon shadow-glow-primary"
        animate={{ scale: thinking ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* inner highlight */}
      <div
        className="absolute inset-[35%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, hsl(0 0% 100% / 0.85), transparent 60%)",
        }}
      />
    </div>
  );
};
