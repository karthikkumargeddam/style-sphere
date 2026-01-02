
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovableCardProps {
  children: React.ReactNode;
  className?: string;
}

const MovableCard: React.FC<MovableCardProps> = ({ children, className }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default MovableCard;
