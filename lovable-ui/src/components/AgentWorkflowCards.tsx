import { motion } from "framer-motion";
import { BarChart3, Target, MessageSquareText, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const workflows = [
  {
    icon: BarChart3,
    title: "Candidate Readiness Evaluation",
    description: "Comprehensive skill assessment and placement readiness scoring",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Target,
    title: "Role Suitability Recommendation",
    description: "AI-matched roles based on skill profile and market demand",
    gradient: "from-success to-success/70",
  },
  {
    icon: MessageSquareText,
    title: "Interview Feedback Analyzer",
    description: "NLP-powered analysis of interview performance and feedback",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: Rocket,
    title: "Placement Action Summary",
    description: "Prioritized action items and personalized preparation plans",
    gradient: "from-warning to-warning/70",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function AgentWorkflowCards() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">AI Agent Workflows</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our intelligent agents work together to provide comprehensive placement support
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {workflows.map((workflow, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-card hover-lift h-full group cursor-pointer border-transparent hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${workflow.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <workflow.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
