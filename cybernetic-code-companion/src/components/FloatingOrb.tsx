import { motion } from "framer-motion";
import { AIOrb } from "@/components/AIOrb";

export const FloatingOrb = ({ onClick }: { onClick?: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing"
    >
      <div className="animate-orb-float">
        <AIOrb size={64} />
      </div>
      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-secondary text-secondary-foreground shadow-glow-secondary">
        AI
      </span>
    </motion.button>
  );
};
