import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, XCircle, TrendingUp, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedProgress } from "./AnimatedProgress";
import { ReadinessResult } from "@/types/evaluation";
import { cn } from "@/lib/utils";

interface ReadinessCardProps {
  readiness: ReadinessResult;
}

export function ReadinessCard({ readiness }: ReadinessCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Ready":
        return {
          icon: CheckCircle2,
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/20",
          badgeClass: "bg-success text-success-foreground",
        };
      case "Almost Ready":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20",
          badgeClass: "bg-warning text-warning-foreground",
        };
      default:
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20",
          badgeClass: "bg-destructive text-destructive-foreground",
        };
    }
  };

  const config = getStatusConfig(readiness.status);
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn("glass-card overflow-hidden border-2", config.borderColor)}>
        <CardHeader className={cn("pb-4", config.bgColor)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <StatusIcon className={cn("w-8 h-8", config.color)} />
              Readiness Assessment
            </CardTitle>
            <Badge className={cn("text-lg px-4 py-1", config.badgeClass)}>
              {readiness.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex flex-col items-center"
            >
              <span className={cn("text-6xl font-bold", config.color)}>
                {readiness.score}
              </span>
              <span className="text-muted-foreground">Overall Score</span>
            </motion.div>
            <div className="mt-4 max-w-md mx-auto">
              <AnimatedProgress value={readiness.score} size="lg" showLabel={false} />
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Skill Breakdown
            </h4>
            <div className="grid gap-3">
              {readiness.skillBreakdown.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-28 text-sm font-medium">{skill.skill}</span>
                  <div className="flex-1">
                    <AnimatedProgress value={skill.score} showLabel={false} size="sm" />
                  </div>
                  <span className="w-12 text-right text-sm font-medium">{skill.score}</span>
                  <Badge variant="outline" className="w-24 justify-center text-xs">
                    {skill.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reasoning & Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Key Strengths
              </h4>
              <ul className="space-y-2">
                {readiness.reasoning.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Improvement Areas
              </h4>
              <ul className="space-y-2">
                {readiness.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
