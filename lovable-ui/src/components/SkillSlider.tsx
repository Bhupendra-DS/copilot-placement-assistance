import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SkillSliderProps {
  label: string;
  icon: string;
  value: number;
  onChange: (value: number) => void;
}

export function SkillSlider({ label, icon, value, onChange }: SkillSliderProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Work";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 70) return "bg-primary";
    if (score >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn("text-2xl font-bold tabular-nums", getScoreColor(value))}
          >
            {value}
          </motion.span>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", 
            value >= 80 ? "bg-success/10 text-success" :
            value >= 70 ? "bg-primary/10 text-primary" :
            value >= 50 ? "bg-warning/10 text-warning" :
            "bg-destructive/10 text-destructive"
          )}>
            {getScoreLabel(value)}
          </span>
        </div>
      </div>

      <div className="relative">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          max={100}
          min={0}
          step={1}
          className="cursor-pointer"
        />
        {/* Color indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-full overflow-hidden pointer-events-none">
          <motion.div
            className={cn("h-full rounded-full transition-colors", getProgressColor(value))}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Score range indicators */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span className="text-warning">50</span>
        <span className="text-primary">70</span>
        <span className="text-success">80</span>
        <span>100</span>
      </div>
    </div>
  );
}
