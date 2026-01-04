import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SkillSlider } from "./SkillSlider";
import { SkillScores, EvaluationRequest } from "@/types/evaluation";
import { useToast } from "@/hooks/use-toast";

interface EvaluationFormProps {
  onSubmit: (data: EvaluationRequest) => Promise<void>;
  isLoading: boolean;
}

const skills = [
  { key: "excel", label: "Excel", icon: "📊" },
  { key: "sql", label: "SQL", icon: "🗄️" },
  { key: "python", label: "Python", icon: "🐍" },
  { key: "stats", label: "Statistics & Probability", icon: "📐" },
  { key: "ml", label: "Machine Learning", icon: "🤖" },
  { key: "bi", label: "Tableau & Power BI", icon: "📈" },
] as const;

export function EvaluationForm({ onSubmit, isLoading }: EvaluationFormProps) {
  const { toast } = useToast();
  const [scores, setScores] = useState<SkillScores>({
    excel: 65,
    sql: 70,
    python: 55,
    stats: 60,
    ml: 45,
    bi: 72,
  });
  const [feedback, setFeedback] = useState("");

  const handleScoreChange = (skill: keyof SkillScores, value: number) => {
    setScores((prev) => ({ ...prev, [skill]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedback.trim().length < 20) {
      toast({
        title: "Feedback Required",
        description: "Please provide at least 20 characters of interview feedback.",
        variant: "destructive",
      });
      return;
    }

    await onSubmit({ ...scores, feedback });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="evaluation-form" className="py-16">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <CardTitle className="text-2xl">Candidate Evaluation</CardTitle>
              <CardDescription>
                Enter skill scores and interview feedback to generate a comprehensive assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Skill Scores Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-sm text-primary-foreground">1</span>
                    Skill Scores
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-6"
                  >
                    {skills.map((skill) => (
                      <motion.div key={skill.key} variants={itemVariants}>
                        <SkillSlider
                          label={skill.label}
                          icon={skill.icon}
                          value={scores[skill.key]}
                          onChange={(value) => handleScoreChange(skill.key, value)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Feedback Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-sm text-primary-foreground">2</span>
                    Interview Feedback
                  </h3>
                  <div className="space-y-2">
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Enter detailed interview feedback here. For example: 'Candidate demonstrated strong SQL skills, particularly with complex joins and aggregations. They showed good problem-solving abilities but could improve on explaining their thought process...'"
                      className="min-h-[160px] resize-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Minimum 20 characters required</span>
                      <span className={feedback.length < 20 ? "text-destructive" : "text-success"}>
                        {feedback.length} characters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-bg hover:opacity-90 text-primary-foreground font-semibold text-lg py-6 shadow-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Evaluating Candidate...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Evaluate Candidate
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
