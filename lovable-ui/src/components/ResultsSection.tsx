import { motion } from "framer-motion";
import { ArrowUp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReadinessCard } from "./ReadinessCard";
import { RoleSuitabilityCard } from "./RoleSuitabilityCard";
import { FeedbackAnalysisCard } from "./FeedbackAnalysisCard";
import { PreparationPlanCard } from "./PreparationPlanCard";
import { ActionSummaryCard } from "./ActionSummaryCard";
import { RoleGapAnalysisCard } from "./RoleGapAnalysisCard";
import { EvaluationResponse } from "@/types/evaluation";

interface ResultsSectionProps {
  results: EvaluationResponse;
  onReset: () => void;
}

export function ResultsSection({ results, onReset }: ResultsSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Evaluation Results</h2>
          <p className="text-muted-foreground">
            Comprehensive assessment based on skill scores and interview feedback
          </p>
        </motion.div>

        <div className="space-y-8">
          <ReadinessCard readiness={results.readiness} />
          <RoleSuitabilityCard suitability={results.roleSuitability} />
          {results.gapAnalysis && results.gapAnalysis.length > 0 && results.candidateScores && (
            <RoleGapAnalysisCard 
              rejectedRoles={results.gapAnalysis} 
              candidateScores={results.candidateScores}
            />
          )}
          <FeedbackAnalysisCard analysis={results.feedbackAnalysis} />
          <PreparationPlanCard plan={results.preparationPlan} />
          <ActionSummaryCard summary={results.actionSummary} />
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Evaluate Another Candidate
          </Button>
          <Button
            size="lg"
            onClick={scrollToTop}
            className="w-full sm:w-auto gradient-bg text-primary-foreground"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
