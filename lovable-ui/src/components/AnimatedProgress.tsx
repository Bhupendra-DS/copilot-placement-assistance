import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AnimatedProgress({ value, className, showLabel = true, size = "md" }: AnimatedProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 70) return "bg-primary";
    if (score >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const getHeight = () => {
    switch (size) {
      case "sm": return "h-1.5";
      case "lg": return "h-4";
      default: return "h-2.5";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", getHeight())}>
        <motion.div
          className={cn("h-full rounded-full", getColor(value))}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      {showLabel && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground mt-1 block text-right"
        >
          {value}%
        </motion.span>
      )}
    </div>
  );
}
