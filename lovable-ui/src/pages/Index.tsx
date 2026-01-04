import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { AgentWorkflowCards } from "@/components/AgentWorkflowCards";
import { EvaluationForm } from "@/components/EvaluationForm";
import { ResultsSection } from "@/components/ResultsSection";
import { Navigation } from "@/components/Navigation";
import { EvaluationRequest, EvaluationResponse } from "@/types/evaluation";
import { getMockEvaluationResponse } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<EvaluationResponse | null>(null);

  const handleEvaluate = async (data: EvaluationRequest) => {
    setIsLoading(true);

    try {
      // Try to call the actual API first
      const response = await fetch("http://127.0.0.1:5000/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setResults(result);
      } else {
        throw new Error("API unavailable");
      }
    } catch {
      // Use mock data if API is unavailable
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay
      const mockResults = getMockEvaluationResponse(data);
      setResults(mockResults);

      toast({
        title: "Demo Mode",
        description: "Using simulated results. Connect to the backend API for real evaluations.",
      });
    } finally {
      setIsLoading(false);

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleReset = () => {
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <Hero />
        <AgentWorkflowCards />
        
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EvaluationForm onSubmit={handleEvaluate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              id="results"
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsSection results={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-muted/30">
        <div className="container text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © 2024 Placement Operations Copilot. AI-Powered Decision Support System.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Created by <span className="font-semibold text-primary">Bhupendra Singh</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
