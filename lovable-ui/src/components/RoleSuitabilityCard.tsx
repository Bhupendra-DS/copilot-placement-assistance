import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Star, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoleSuitability } from "@/types/evaluation";

interface RoleSuitabilityCardProps {
  suitability: RoleSuitability;
}

export function RoleSuitabilityCard({ suitability }: RoleSuitabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl">Role Suitability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recommended Roles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-success">
                <ThumbsUp className="w-5 h-5" />
                <h4 className="font-semibold text-lg">Recommended Roles</h4>
              </div>
              <div className="space-y-3">
                {suitability.recommended.map((role, index) => (
                  <motion.div
                    key={role.role}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-lg border border-success/20 bg-success/5 hover-lift"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{role.role}</h5>
                      <Badge className="bg-success/20 text-success border-success/30">
                        <Star className="w-3 h-3 mr-1" />
                        {role.matchScore}% Match
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {role.strengths.map((strength, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs bg-background"
                        >
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Not Recommended Roles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-destructive">
                <ThumbsDown className="w-5 h-5" />
                <h4 className="font-semibold text-lg">Not Recommended</h4>
              </div>
              <div className="space-y-3">
                {suitability.notRecommended.map((role, index) => (
                  <motion.div
                    key={role.role}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-lg border border-destructive/20 bg-destructive/5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold">{role.role}</h5>
                      <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Low Match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Skill Gaps: </span>
                      {role.gaps.join(", ")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
