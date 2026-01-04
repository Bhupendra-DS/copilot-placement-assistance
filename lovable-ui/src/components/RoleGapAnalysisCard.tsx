import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Target, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SkillGap {
  skill: string;
  candidateScore: number;
  requiredScore: number;
  gap: number;
}

interface RoleGap {
  role: string;
  gaps: SkillGap[];
  totalGap: number;
}

interface RoleGapAnalysisCardProps {
  rejectedRoles: RoleGap[];
  candidateScores: Record<string, number>;
}

export function RoleGapAnalysisCard({ rejectedRoles, candidateScores }: RoleGapAnalysisCardProps) {
  if (!rejectedRoles || rejectedRoles.length === 0) {
    return null;
  }

  const getGapSeverity = (gap: number) => {
    if (gap >= 30) return { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" };
    if (gap >= 15) return { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" };
    return { color: "text-muted-foreground", bg: "bg-muted/50", border: "border-border" };
  };

  const getSkillIcon = (skill: string) => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes("excel")) return "📊";
    if (skillLower.includes("sql")) return "🗄️";
    if (skillLower.includes("python")) return "🐍";
    if (skillLower.includes("statistics") || skillLower.includes("probability")) return "📐";
    if (skillLower.includes("machine learning") || skillLower.includes("ml")) return "🤖";
    if (skillLower.includes("tableau") || skillLower.includes("power bi") || skillLower.includes("bi")) return "📈";
    return "📋";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass-card border-destructive/20">
        <CardHeader className="bg-destructive/5 border-b border-destructive/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">Role Gap Analysis</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed breakdown of why candidates are not suitable for specific roles
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {rejectedRoles.map((roleGap, roleIndex) => (
              <motion.div
                key={roleGap.role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + roleIndex * 0.1 }}
                className="p-5 rounded-xl border border-destructive/20 bg-destructive/5"
              >
                {/* Role Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-destructive" />
                    <h3 className="text-xl font-bold">{roleGap.role}</h3>
                  </div>
                  <Badge variant="outline" className="border-destructive/30 text-destructive">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Not Suitable
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  The candidate does not meet the minimum requirements for this role. Below are the specific skill gaps:
                </p>

                {/* Skill Gaps */}
                <div className="space-y-4">
                  {roleGap.gaps.map((gap, gapIndex) => {
                    const severity = getGapSeverity(gap.gap);
                    const percentage = (gap.candidateScore / gap.requiredScore) * 100;
                    
                    return (
                      <motion.div
                        key={gap.skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + roleIndex * 0.1 + gapIndex * 0.05 }}
                        className={`p-4 rounded-lg border ${severity.border} ${severity.bg}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getSkillIcon(gap.skill)}</span>
                            <div>
                              <h4 className="font-semibold text-base">{gap.skill}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Required: {gap.requiredScore}% | Your Score: {gap.candidateScore}%
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${severity.color} ${severity.border} font-semibold`}
                          >
                            -{gap.gap}%
                          </Badge>
                        </div>

                        {/* Progress Bars Comparison */}
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Your Score</span>
                              <span className="font-medium">{gap.candidateScore}%</span>
                            </div>
                            <Progress 
                              value={gap.candidateScore} 
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Required Score</span>
                              <span className="font-medium text-destructive">{gap.requiredScore}%</span>
                            </div>
                            <Progress 
                              value={gap.requiredScore} 
                              className="h-2 bg-destructive/20"
                            />
                          </div>
                        </div>

                        {/* Gap Analysis */}
                        <div className="mt-3 p-3 rounded-md bg-background/50 border border-border/50">
                          <div className="flex items-center gap-2 text-sm">
                            <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              <strong className="text-foreground">Gap:</strong> You need to improve by{" "}
                              <strong className={severity.color}>{gap.gap}%</strong> to meet the requirement
                              {gap.gap >= 30 && (
                                <span className="text-destructive ml-1">(Significant gap - focus area)</span>
                              )}
                              {gap.gap >= 15 && gap.gap < 30 && (
                                <span className="text-warning ml-1">(Moderate gap - improvement needed)</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Summary */}
                <div className="mt-4 p-4 rounded-lg bg-background/80 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold mb-1">Total Gap Analysis</p>
                      <p className="text-xs text-muted-foreground">
                        Average gap: {Math.round(roleGap.totalGap / roleGap.gaps.length)}% across {roleGap.gaps.length} skill{roleGap.gaps.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-destructive/30 text-destructive font-semibold">
                      {roleGap.gaps.length} Skill Gap{roleGap.gaps.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">How to Improve</h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Focus on skills with the largest gaps (30%+ difference) first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Use the 7-Day Preparation Plan to systematically improve weak areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Practice hands-on projects in the identified skill areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Re-evaluate after completing the preparation plan to track progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

