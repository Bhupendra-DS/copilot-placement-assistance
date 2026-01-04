import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedProgress } from "@/components/AnimatedProgress";
import { RoleRequirement } from "@/types/evaluation";
import { getMockRoleRequirements } from "@/utils/api";

const Requirements = () => {
  const [requirements, setRequirements] = useState<RoleRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/requirements");
        if (response.ok) {
          const data = await response.json();
          setRequirements(data);
        } else {
          throw new Error("API unavailable");
        }
      } catch {
        // Use mock data
        setRequirements(getMockRoleRequirements());
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  const skillIcons: Record<string, string> = {
    Excel: "📊",
    SQL: "🗄️",
    Python: "🐍",
    Statistics: "📐",
    "Machine Learning": "🤖",
    "BI Tools": "📈",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/">
              <Button variant="ghost" className="mb-6 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Evaluation
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl gradient-bg">
                <Briefcase className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Role Requirements</h1>
                <p className="text-muted-foreground">
                  Minimum skill thresholds for each placement role
                </p>
              </div>
            </div>
          </motion.div>

          {/* Role Cards Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-2/3 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-8 bg-muted rounded" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {requirements.map((role, index) => (
                <motion.div
                  key={role.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="glass-card hover-lift h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            {role.role}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {role.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {role.requirements.length} Skills
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {role.requirements.map((req) => (
                          <div key={req.skill} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <span>{skillIcons[req.skill] || "📊"}</span>
                                <span className="font-medium">{req.skill}</span>
                              </span>
                              <span className="text-muted-foreground">
                                Min: <span className="font-semibold text-foreground">{req.minimum}</span>
                              </span>
                            </div>
                            <AnimatedProgress value={req.minimum} showLabel={false} size="sm" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 rounded-xl bg-muted/50 border border-border/50"
          >
            <h3 className="font-semibold mb-4">Score Thresholds</h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success" />
                <span>80+ Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span>70-79 Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-warning" />
                <span>50-69 Average</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-destructive" />
                <span>&lt;50 Needs Improvement</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 Placement Operations Copilot. AI-Powered Decision Support System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Requirements;
