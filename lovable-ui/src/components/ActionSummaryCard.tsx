import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Flag, CheckCircle2, Calendar, Target, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ActionSummary } from "@/types/evaluation";
import { cn } from "@/lib/utils";

interface ActionSummaryCardProps {
  summary: ActionSummary;
}

// Detailed roadmaps for each action item
const actionRoadmaps: Record<string, {
  title: string;
  description: string;
  steps: { title: string; description: string; icon: React.ReactNode }[];
  tips: string[];
  resources?: string[];
}> = {
  "Delay placements and focus on skill improvement": {
    title: "Skill Improvement Roadmap",
    description: "A structured approach to building the foundational skills needed for successful placement.",
    steps: [
      {
        title: "Week 1-2: Assessment & Planning",
        description: "Identify specific skill gaps, create a personalized learning plan, and set measurable goals.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Week 3-6: Intensive Learning",
        description: "Focus on core technical skills through hands-on projects, coding practice, and concept mastery.",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        title: "Week 7-8: Project Portfolio",
        description: "Build 2-3 portfolio projects that demonstrate your skills and solve real-world problems.",
        icon: <Rocket className="w-5 h-5" />
      },
      {
        title: "Week 9-10: Mock Assessments",
        description: "Take practice tests, participate in mock interviews, and refine your problem-solving approach.",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    tips: [
      "Dedicate 4-6 hours daily to focused learning",
      "Join study groups or find a mentor for guidance",
      "Track your progress weekly and adjust your plan",
      "Focus on understanding concepts, not just memorization"
    ],
    resources: [
      "Online courses: Coursera, Udemy, edX",
      "Practice platforms: LeetCode, HackerRank, Kaggle",
      "Community: Stack Overflow, Reddit r/learnprogramming"
    ]
  },
  "Target roles: Data Analyst, Business Analyst": {
    title: "Role-Specific Preparation Guide",
    description: "Tailored preparation strategies for Data Analyst and Business Analyst positions.",
    steps: [
      {
        title: "Understand Role Requirements",
        description: "Research job descriptions, required skills, and industry expectations for each role.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Build Role-Specific Skills",
        description: "For Data Analyst: Excel, SQL, Tableau. For Business Analyst: Requirements gathering, process mapping, stakeholder management.",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        title: "Create Role-Focused Projects",
        description: "Develop projects that showcase skills relevant to each role (dashboards, analysis reports, case studies).",
        icon: <Rocket className="w-5 h-5" />
      },
      {
        title: "Practice Role-Specific Scenarios",
        description: "Prepare for common interview questions and case studies specific to these roles.",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    tips: [
      "Customize your resume for each role type",
      "Prepare STAR method stories for behavioral questions",
      "Understand the business context of data analysis",
      "Practice explaining technical concepts to non-technical audiences"
    ]
  },
  "Schedule mock interview after 7 days": {
    title: "Mock Interview Preparation Plan",
    description: "A comprehensive 7-day preparation strategy to maximize your mock interview performance.",
    steps: [
      {
        title: "Days 1-2: Technical Review",
        description: "Review core concepts, practice coding problems, and refresh your knowledge of key technologies.",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        title: "Days 3-4: Problem-Solving Practice",
        description: "Solve 5-10 problems daily, focus on explaining your approach, and practice time management.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Days 5-6: Behavioral Preparation",
        description: "Prepare STAR stories, practice common behavioral questions, and refine your communication.",
        icon: <Users className="w-5 h-5" />
      },
      {
        title: "Day 7: Final Review & Mindset",
        description: "Review key concepts, practice mock scenarios, and prepare mentally for the interview.",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    tips: [
      "Practice speaking your solutions out loud",
      "Time yourself to simulate real interview conditions",
      "Prepare questions to ask the interviewer",
      "Get adequate rest the night before"
    ]
  },
  "Complete the 7-day preparation plan": {
    title: "7-Day Preparation Execution Guide",
    description: "How to effectively complete and maximize the value of your 7-day preparation plan.",
    steps: [
      {
        title: "Day 1: Set Up & Planning",
        description: "Review the full plan, set up your workspace, gather resources, and create a daily schedule.",
        icon: <Calendar className="w-5 h-5" />
      },
      {
        title: "Days 2-6: Daily Execution",
        description: "Follow each day's plan, track your progress, and adjust based on your learning pace.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Day 7: Review & Consolidation",
        description: "Review all concepts, practice key skills, and prepare for the next steps.",
        icon: <CheckCircle2 className="w-5 h-5" />
      },
      {
        title: "Post-Plan: Continuous Improvement",
        description: "Identify areas for further development and create a long-term learning plan.",
        icon: <Rocket className="w-5 h-5" />
      }
    ],
    tips: [
      "Dedicate 6-8 hours daily to focused preparation",
      "Take breaks to maintain productivity",
      "Track your progress and celebrate small wins",
      "Stay consistent and maintain momentum"
    ]
  },
  "Update resume with recent projects": {
    title: "Resume Enhancement Guide",
    description: "Strategies to effectively showcase your projects and skills on your resume.",
    steps: [
      {
        title: "Project Selection",
        description: "Choose 3-5 most relevant projects that demonstrate diverse skills and real-world impact.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Quantify Achievements",
        description: "Use metrics and numbers to show the impact of your projects (e.g., 'Improved efficiency by 30%').",
        icon: <Rocket className="w-5 h-5" />
      },
      {
        title: "Use Action Verbs",
        description: "Start bullet points with strong action verbs (Developed, Implemented, Optimized, Analyzed).",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        title: "Tailor for Each Role",
        description: "Customize project descriptions to highlight skills most relevant to the target role.",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    tips: [
      "Include GitHub links or live project demos",
      "Highlight technologies and tools used",
      "Show problem-solving and impact, not just features",
      "Keep descriptions concise but impactful"
    ]
  },
  "Practice mock interviews": {
    title: "Mock Interview Mastery",
    description: "How to get the most value from mock interviews and improve your performance.",
    steps: [
      {
        title: "Find Practice Partners",
        description: "Connect with peers, mentors, or use platforms like Pramp, InterviewBit for mock interviews.",
        icon: <Users className="w-5 h-5" />
      },
      {
        title: "Simulate Real Conditions",
        description: "Practice in a quiet environment, use video calls, and time yourself to match real interviews.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Request Detailed Feedback",
        description: "Ask for specific feedback on communication, problem-solving approach, and technical accuracy.",
        icon: <CheckCircle2 className="w-5 h-5" />
      },
      {
        title: "Iterate and Improve",
        description: "Address feedback, practice weak areas, and repeat until you feel confident.",
        icon: <Rocket className="w-5 h-5" />
      }
    ],
    tips: [
      "Practice both technical and behavioral questions",
      "Record yourself to identify areas for improvement",
      "Focus on clear communication and structured thinking",
      "Build confidence through repeated practice"
    ]
  },
  "Build GitHub portfolio": {
    title: "GitHub Portfolio Development",
    description: "Create a compelling GitHub profile that showcases your skills and projects effectively.",
    steps: [
      {
        title: "Organize Your Repositories",
        description: "Create clear README files, organize projects by category, and ensure code is clean and documented.",
        icon: <Target className="w-5 h-5" />
      },
      {
        title: "Showcase Best Projects",
        description: "Pin your 4-6 best projects to your profile, ensuring they demonstrate diverse skills.",
        icon: <Rocket className="w-5 h-5" />
      },
      {
        title: "Write Comprehensive READMEs",
        description: "Include project descriptions, technologies used, setup instructions, and screenshots/demos.",
        icon: <BookOpen className="w-5 h-5" />
      },
      {
        title: "Maintain Active Contributions",
        description: "Regular commits, contributions to open source, and active engagement show dedication.",
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ],
    tips: [
      "Use consistent commit messages and good Git practices",
      "Include live demos or deployment links",
      "Add badges and visual elements to READMEs",
      "Keep your profile updated with recent work"
    ]
  }
};

export function ActionSummaryCard({ summary }: ActionSummaryCardProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "High":
        return {
          color: "text-success",
          bgColor: "bg-success/10",
          badgeClass: "bg-success text-success-foreground",
        };
      case "Medium":
        return {
          color: "text-warning",
          bgColor: "bg-warning/10",
          badgeClass: "bg-warning text-warning-foreground",
        };
      default:
        return {
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          badgeClass: "bg-destructive text-destructive-foreground",
        };
    }
  };

  const config = getPriorityConfig(summary.priority);

  const getActionRoadmap = (actionItem: string) => {
    // Try to find exact match first
    if (actionRoadmaps[actionItem]) {
      return actionRoadmaps[actionItem];
    }
    
    // Try partial matches
    for (const [key, roadmap] of Object.entries(actionRoadmaps)) {
      if (actionItem.toLowerCase().includes(key.toLowerCase().split(":")[0]) || 
          key.toLowerCase().includes(actionItem.toLowerCase().split(":")[0])) {
        return roadmap;
      }
    }
    
    // Default roadmap
    return {
      title: "Action Plan",
      description: "A structured approach to complete this action item successfully.",
      steps: [
        {
          title: "Understand the Goal",
          description: "Clearly define what success looks like for this action item.",
          icon: <Target className="w-5 h-5" />
        },
        {
          title: "Break Down into Steps",
          description: "Divide the action into smaller, manageable tasks with clear milestones.",
          icon: <BookOpen className="w-5 h-5" />
        },
        {
          title: "Execute with Focus",
          description: "Work systematically through each step, maintaining consistency and quality.",
          icon: <Rocket className="w-5 h-5" />
        },
        {
          title: "Review and Refine",
          description: "Assess your progress, gather feedback, and make necessary adjustments.",
          icon: <CheckCircle2 className="w-5 h-5" />
        }
      ],
      tips: [
        "Set specific, measurable goals",
        "Track your progress regularly",
        "Stay committed to the timeline",
        "Celebrate milestones along the way"
      ]
    };
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="glass-card overflow-hidden">
          <CardHeader className={cn("border-b border-border/50", config.bgColor)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                Placement Action Summary
              </CardTitle>
              <Badge className={cn("text-sm px-3 py-1", config.badgeClass)}>
                <Flag className="w-3.5 h-3.5 mr-1" />
                {summary.priority} Priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-5 rounded-xl bg-muted/50 border border-border/50"
            >
              <h4 className="font-semibold mb-2">Recommendation</h4>
              <p className="text-muted-foreground">{summary.recommendation}</p>
            </motion.div>

            {/* Action Items */}
            <div>
              <h4 className="font-semibold mb-4">Action Items</h4>
              <div className="space-y-3">
                {summary.actionItems.map((item, index) => {
                  const roadmap = getActionRoadmap(item);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      onClick={() => setSelectedAction(item)}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-medium text-sm shrink-0">
                        {index + 1}
                      </div>
                      <span className="flex-1">{item}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Item Detail Dialog */}
      {selectedAction && (
        <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                {getActionRoadmap(selectedAction).title}
              </DialogTitle>
              <DialogDescription className="text-base">
                {getActionRoadmap(selectedAction).description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Steps */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Step-by-Step Roadmap
                </h3>
                <div className="space-y-4">
                  {getActionRoadmap(selectedAction).steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-primary">
                            {step.icon}
                          </div>
                          <h4 className="font-semibold">{step.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Pro Tips
                </h3>
                <ul className="space-y-2">
                  {getActionRoadmap(selectedAction).tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              {getActionRoadmap(selectedAction).resources && (
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    Recommended Resources
                  </h3>
                  <ul className="space-y-2">
                    {getActionRoadmap(selectedAction).resources!.map((resource, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
