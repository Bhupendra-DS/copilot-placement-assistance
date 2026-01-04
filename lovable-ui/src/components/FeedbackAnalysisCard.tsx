import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackAnalysis } from "@/types/evaluation";

interface FeedbackAnalysisCardProps {
  analysis: FeedbackAnalysis;
}

export function FeedbackAnalysisCard({ analysis }: FeedbackAnalysisCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl">Interview Feedback Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-xl border border-success/20 bg-success/5"
            >
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Strengths Identified
              </h4>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Areas to Improve */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-xl border border-warning/20 bg-warning/5"
            >
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                Areas to Improve
              </h4>
              <ul className="space-y-3">
                {analysis.areasToImprove.map((area, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <span className="text-sm">{area}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
