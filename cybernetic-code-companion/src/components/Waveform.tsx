import { motion } from "framer-motion";

type Props = { active?: boolean; bars?: number };

export const Waveform = ({ active = true, bars = 24 }: Props) => {
  return (
    <div className="flex items-center gap-[3px] h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-primary to-secondary"
          animate={
            active
              ? { scaleY: [0.3, 1, 0.5, 0.9, 0.4] }
              : { scaleY: 0.3 }
          }
          transition={{
            duration: 1 + (i % 5) * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 7) * 0.05,
          }}
          style={{ height: "100%", originY: 0.5 }}
        />
      ))}
    </div>
  );
};
