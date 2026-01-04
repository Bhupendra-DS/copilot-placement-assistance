import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckSquare, Clock, Users, Code, MessageSquare, FileText, Target, Lightbulb, TrendingUp, Award, BookOpen, Database, Briefcase, BarChart, PenTool } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PreparationDay } from "@/types/evaluation";

interface PreparationPlanCardProps {
  plan: PreparationDay[];
}

const dayColors = [
  "border-primary/30 bg-primary/5",
  "border-success/30 bg-success/5",
  "border-accent/30 bg-accent/5",
  "border-warning/30 bg-warning/5",
  "border-primary/30 bg-primary/5",
  "border-success/30 bg-success/5",
  "border-accent/30 bg-accent/5",
];

// Comprehensive roadmaps for ALL 7 days
const getDayRoadmap = (dayNum: number, focus: string, activities: string[]) => {
  const focusLower = focus.toLowerCase();
  
  // Day 1: Communication / Fundamentals
  if (dayNum === 1 || focusLower.includes("communication") || focusLower.includes("drills") || focusLower.includes("explain")) {
    return {
      title: "Day 1: Communication & Fundamentals Mastery",
      description: "Build a strong foundation in communication skills and core concepts. This day focuses on clarity, structure, and confidence in explaining technical concepts.",
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      sections: [
        {
          title: "Morning Session (9 AM - 12 PM)",
          icon: <Clock className="w-5 h-5" />,
          items: [
            {
              title: "Communication Fundamentals (2 hours)",
              details: [
                "Practice explaining technical concepts to a non-technical audience",
                "Record yourself explaining a project - review for clarity and structure",
                "Learn the 'Overview → Details → Example' framework",
                "Practice using analogies to simplify complex topics"
              ]
            },
            {
              title: "Core Concept Review (1 hour)",
              details: [
                "Review fundamental concepts in your target domain",
                "Create summary sheets for quick reference",
                "Identify areas where you need deeper understanding",
                "Set learning goals for the week"
              ]
            }
          ]
        },
        {
          title: "Afternoon Session (1 PM - 5 PM)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Hands-On Practice (2 hours)",
              details: [
                "Solve 3-5 basic to intermediate problems",
                "Practice explaining your approach out loud",
                "Focus on clear variable naming and code structure",
                "Time yourself to build efficiency"
              ]
            },
            {
              title: "Mock Explanation Session (2 hours)",
              details: [
                "Explain a project or concept to a friend/peer (or record yourself)",
                "Get feedback on clarity and structure",
                "Practice answering 'Tell me about yourself'",
                "Work on eliminating filler words and improving flow"
              ]
            }
          ]
        },
        {
          title: "Evening Review (6 PM - 7 PM)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Consolidation & Planning",
              details: [
                "Review what you learned today",
                "Note areas for improvement",
                "Plan Day 2 focus areas",
                "Prepare materials for tomorrow"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "Communication is a skill - it improves with practice",
        "It's okay to pause and think before answering",
        "Structure your thoughts: Introduction → Main Points → Conclusion",
        "Practice makes you more confident and natural"
      ],
      resources: [
        "Practice with peers or mentors",
        "Record and review your explanations",
        "Watch TED talks for presentation techniques",
        "Join technical communication communities"
      ]
    };
  }

  // Day 2: SQL / Database Skills
  if (dayNum === 2 || focusLower.includes("sql") || focusLower.includes("database") || focusLower.includes("joins")) {
    return {
      title: "Day 2: SQL Mastery & Database Skills",
      description: "Master SQL fundamentals and advanced querying techniques. Build confidence in handling complex database operations and optimization.",
      icon: <Database className="w-6 h-6 text-success" />,
      sections: [
        {
          title: "Morning Session (9 AM - 12 PM)",
          icon: <Clock className="w-5 h-5" />,
          items: [
            {
              title: "SQL Fundamentals Review (1.5 hours)",
              details: [
                "Review: SELECT, WHERE, JOINs (INNER, LEFT, RIGHT, FULL)",
                "Practice: GROUP BY, HAVING, ORDER BY clauses",
                "Master: Subqueries and CTEs (Common Table Expressions)",
                "Understand: Window functions (ROW_NUMBER, RANK, DENSE_RANK)"
              ]
            },
            {
              title: "Advanced Concepts (1.5 hours)",
              details: [
                "Learn: Query optimization techniques and indexing",
                "Practice: Complex joins with multiple tables",
                "Master: Aggregate functions and data transformation",
                "Study: Date/time functions and string manipulation"
              ]
            }
          ]
        },
        {
          title: "Afternoon Session (1 PM - 5 PM)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Hands-On Practice (3 hours)",
              details: [
                "Solve 10-15 SQL problems on LeetCode/HackerRank",
                "Practice: Write queries for real-world scenarios",
                "Focus: Query optimization and performance",
                "Build: A mini-project using complex SQL queries"
              ]
            },
            {
              title: "Project Work (1 hour)",
              details: [
                "Create a database schema for a sample project",
                "Write queries to analyze data",
                "Document your approach and solutions",
                "Push to GitHub with clear README"
              ]
            }
          ]
        },
        {
          title: "Evening Review (6 PM - 7 PM)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Consolidation",
              details: [
                "Review all queries you wrote today",
                "Identify patterns and common techniques",
                "Create a SQL cheat sheet for quick reference",
                "Plan Day 3 focus areas"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "Start with simple queries, then build complexity",
        "Break complex problems into smaller parts",
        "Practice reading and understanding existing queries",
        "Focus on understanding, not memorization"
      ],
      resources: [
        "LeetCode SQL problems",
        "HackerRank SQL challenges",
        "SQLZoo interactive tutorials",
        "Mode Analytics SQL tutorial"
      ]
    };
  }

  // Day 3: Python / Programming
  if (dayNum === 3 || focusLower.includes("python") || focusLower.includes("dsa") || focusLower.includes("debugging") || focusLower.includes("programming")) {
    return {
      title: "Day 3: Python & Problem-Solving Mastery",
      description: "Strengthen your Python skills and problem-solving abilities. Focus on data structures, algorithms, and clean code practices.",
      icon: <Code className="w-6 h-6 text-accent" />,
      sections: [
        {
          title: "Morning Session (9 AM - 12 PM)",
          icon: <Clock className="w-5 h-5" />,
          items: [
            {
              title: "Data Structures Review (1.5 hours)",
              details: [
                "Review: Lists, dictionaries, sets, tuples in Python",
                "Master: List comprehensions and generator expressions",
                "Practice: Working with nested data structures",
                "Understand: Time and space complexity basics"
              ]
            },
            {
              title: "Algorithm Fundamentals (1.5 hours)",
              details: [
                "Study: Arrays, strings, and basic algorithms",
                "Practice: Two-pointer technique, sliding window",
                "Learn: Sorting and searching algorithms",
                "Review: Recursion and dynamic programming basics"
              ]
            }
          ]
        },
        {
          title: "Afternoon Session (1 PM - 5 PM)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Coding Practice (3 hours)",
              details: [
                "Solve 8-10 problems on LeetCode (Easy to Medium)",
                "Focus: Arrays, strings, and basic algorithms",
                "Practice: Explaining your approach before coding",
                "Time yourself: Aim for 20-30 mins per problem"
              ]
            },
            {
              title: "Debugging & Code Review (1 hour)",
              details: [
                "Review your solutions - look for improvements",
                "Practice debugging techniques",
                "Learn Python best practices (PEP 8)",
                "Refactor code for better readability"
              ]
            }
          ]
        },
        {
          title: "Evening Review (6 PM - 7 PM)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Consolidation",
              details: [
                "Review all problems solved today",
                "Create a pattern recognition guide",
                "Note common mistakes and how to avoid them",
                "Plan Day 4 focus areas"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "Focus on problem-solving approach, not just solutions",
        "Practice thinking out loud while coding",
        "Start with brute force, then optimize",
        "Every problem teaches you something new"
      ],
      resources: [
        "LeetCode Python problems",
        "HackerRank Python challenges",
        "Python.org official documentation",
        "Real Python tutorials"
      ]
    };
  }

  // Day 4: Statistics / Probability
  if (dayNum === 4 || focusLower.includes("statistics") || focusLower.includes("probability") || focusLower.includes("distributions")) {
    return {
      title: "Day 4: Statistics & Probability Mastery",
      description: "Build strong statistical foundations and analytical thinking. Master probability concepts and their applications in data analysis.",
      icon: <BarChart className="w-6 h-6 text-warning" />,
      sections: [
        {
          title: "Morning Session (9 AM - 12 PM)",
          icon: <Clock className="w-5 h-5" />,
          items: [
            {
              title: "Core Statistics Concepts (2 hours)",
              details: [
                "Review: Mean, median, mode, variance, standard deviation",
                "Master: Probability basics and conditional probability",
                "Study: Common distributions (Normal, Binomial, Poisson)",
                "Understand: Hypothesis testing fundamentals"
              ]
            },
            {
              title: "Statistical Analysis (1 hour)",
              details: [
                "Learn: Correlation vs. causation",
                "Practice: Interpreting statistical results",
                "Study: Confidence intervals and p-values",
                "Review: A/B testing concepts"
              ]
            }
          ]
        },
        {
          title: "Afternoon Session (1 PM - 5 PM)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Hands-On Practice (3 hours)",
              details: [
                "Solve probability problems and case studies",
                "Practice statistical analysis on sample datasets",
                "Work through real-world statistical scenarios",
                "Apply concepts using Python (pandas, numpy, scipy)"
              ]
            },
            {
              title: "Case Study Analysis (1 hour)",
              details: [
                "Analyze a business case using statistics",
                "Practice explaining statistical findings",
                "Create visualizations to support your analysis",
                "Document your approach and insights"
              ]
            }
          ]
        },
        {
          title: "Evening Review (6 PM - 7 PM)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Consolidation",
              details: [
                "Review key statistical concepts learned",
                "Create a statistics reference guide",
                "Practice explaining statistical concepts simply",
                "Plan Day 5 focus areas"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "Statistics is about understanding data, not memorizing formulas",
        "Focus on interpretation and application",
        "Practice explaining statistical concepts in simple terms",
        "Real-world examples help solidify understanding"
      ],
      resources: [
        "Khan Academy Statistics course",
        "Khan Academy Probability course",
        "StatQuest YouTube channel",
        "Think Stats book (free online)"
      ]
    };
  }

  // Day 5: Machine Learning / Advanced Topics
  if (dayNum === 5 || focusLower.includes("machine learning") || focusLower.includes("ml") || focusLower.includes("model")) {
    return {
      title: "Day 5: Machine Learning & Advanced Skills",
      description: "Master ML fundamentals and practical applications. Build confidence in model development, evaluation, and deployment concepts.",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      sections: [
        {
          title: "Morning Session (9 AM - 12 PM)",
          icon: <Clock className="w-5 h-5" />,
          items: [
            {
              title: "ML Fundamentals (2 hours)",
              details: [
                "Review: Supervised vs. unsupervised learning",
                "Study: Regression and classification algorithms",
                "Learn: Model evaluation metrics (accuracy, precision, recall, F1)",
                "Understand: Overfitting, underfitting, and regularization"
              ]
            },
            {
              title: "Advanced Concepts (1 hour)",
              details: [
                "Study: Feature engineering techniques",
                "Learn: Cross-validation and train/test split",
                "Review: Model selection and hyperparameter tuning",
                "Understand: Bias-variance tradeoff"
              ]
            }
          ]
        },
        {
          title: "Afternoon Session (1 PM - 5 PM)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Hands-On ML Project (3 hours)",
              details: [
                "Build a complete ML pipeline: data → model → evaluation",
                "Use scikit-learn for a classification or regression task",
                "Practice: Feature selection and preprocessing",
                "Evaluate model performance and interpret results"
              ]
            },
            {
              title: "Project Documentation (1 hour)",
              details: [
                "Document your ML project approach",
                "Explain model choices and trade-offs",
                "Create visualizations of results",
                "Push to GitHub with comprehensive README"
              ]
            }
          ]
        },
        {
          title: "Evening Review (6 PM - 7 PM)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Consolidation",
              details: [
                "Review ML concepts learned today",
                "Create an ML concepts cheat sheet",
                "Practice explaining your ML project",
                "Prepare for Day 6 mock interview"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "Focus on understanding concepts, not memorizing algorithms",
        "Practice explaining ML concepts in simple terms",
        "Build projects to reinforce learning",
        "ML is iterative - improvement comes with practice"
      ],
      resources: [
        "Scikit-learn documentation",
        "Kaggle Learn courses",
        "Andrew Ng's ML course (Coursera)",
        "Hands-On Machine Learning book"
      ]
    };
  }

  // Day 6: Mock Interview (Technical + HR)
  if (dayNum === 6 || focusLower.includes("mock interview") || focusLower.includes("interview")) {
    return {
      title: "Day 6: Complete Mock Interview Preparation",
      description: "A comprehensive, confidence-building guide to excel in your technical + HR mock interview. This roadmap prepares you for real-world interview scenarios.",
      icon: <Briefcase className="w-6 h-6 text-success" />,
      sections: [
        {
          title: "Pre-Interview Preparation (Morning)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Technical Review Checklist (2 hours)",
              details: [
                "Review core concepts: Data structures, algorithms, SQL, Python fundamentals",
                "Practice 3-5 coding problems (focus on arrays, strings, SQL queries)",
                "Refresh knowledge of your projects - be ready to explain architecture and decisions",
                "Review common technical questions for your target role",
                "Practice explaining your code and thought process out loud"
              ]
            },
            {
              title: "HR & Behavioral Preparation (1.5 hours)",
              details: [
                "Prepare 5-7 STAR method stories (Situation, Task, Action, Result)",
                "Practice answers for: 'Tell me about yourself', 'Why this role?', 'Strengths/Weaknesses'",
                "Research the company/role - prepare thoughtful questions to ask",
                "Review your resume - be ready to discuss every point",
                "Practice storytelling - make your experiences compelling"
              ]
            },
            {
              title: "Environment Setup (30 mins)",
              details: [
                "Test your internet connection and video/audio equipment",
                "Prepare a quiet, well-lit space with professional background",
                "Have water, notebook, and pen ready",
                "Close unnecessary applications and notifications",
                "Dress professionally (even for video interviews)"
              ]
            }
          ]
        },
        {
          title: "Interview Day - Technical Round (60-90 mins)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Problem-Solving Approach (20-30 mins)",
              details: [
                "Listen carefully - ask clarifying questions before coding",
                "Think out loud - explain your thought process step-by-step",
                "Start with brute force, then optimize - show your thinking",
                "Write clean, readable code with proper variable names",
                "Test your solution with examples and edge cases",
                "Discuss time and space complexity"
              ]
            },
            {
              title: "Technical Discussion (20-30 mins)",
              details: [
                "Explain your projects in detail - architecture, challenges, solutions",
                "Discuss technologies you've used - be ready for deep dives",
                "Show enthusiasm for learning and problem-solving",
                "Admit when you don't know something - show willingness to learn",
                "Connect your technical skills to the role requirements"
              ]
            },
            {
              title: "System Design / Case Study (20-30 mins)",
              details: [
                "Break down the problem into components",
                "Discuss trade-offs (scalability vs. complexity)",
                "Think about edge cases and error handling",
                "Ask questions to understand requirements better",
                "Show your analytical and design thinking"
              ]
            }
          ]
        },
        {
          title: "Interview Day - HR Round (30-45 mins)",
          icon: <Users className="w-5 h-5" />,
          items: [
            {
              title: "Behavioral Questions",
              details: [
                "Use STAR method: Situation (context), Task (your role), Action (what you did), Result (outcome)",
                "Be specific with examples - avoid generic answers",
                "Show growth mindset - discuss what you learned from challenges",
                "Connect your experiences to the role requirements",
                "Practice active listening and thoughtful responses"
              ]
            },
            {
              title: "Communication & Fit",
              details: [
                "Show enthusiasm and genuine interest in the role",
                "Demonstrate cultural fit through your examples",
                "Ask thoughtful questions about team, projects, growth",
                "Express your long-term career goals and how this role fits",
                "Maintain positive body language and eye contact"
              ]
            },
            {
              title: "Salary & Expectations",
              details: [
                "Research market rates for the role and location",
                "Be prepared to discuss salary expectations (if asked)",
                "Focus on growth opportunities, not just compensation",
                "Show flexibility while knowing your worth",
                "Practice your negotiation approach"
              ]
            }
          ]
        },
        {
          title: "Post-Interview Actions",
          icon: <TrendingUp className="w-5 h-5" />,
          items: [
            {
              title: "Immediate Follow-up (Within 24 hours)",
              details: [
                "Send thank-you email to each interviewer",
                "Reference specific discussion points from the interview",
                "Reiterate your interest and fit for the role",
                "Keep it concise and professional (3-4 paragraphs max)",
                "Proofread carefully before sending"
              ]
            },
            {
              title: "Self-Reflection & Learning",
              details: [
                "Note what went well and what could be improved",
                "Identify areas where you struggled - create a learning plan",
                "Document questions asked - prepare better answers for next time",
                "Celebrate your effort regardless of outcome",
                "Use feedback to improve for future interviews"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "Remember: The interviewer wants you to succeed - they're evaluating fit, not trying to trick you",
        "It's okay to take a moment to think - silence is better than rushing",
        "Your past experiences and projects are valuable - share them confidently",
        "Every interview is practice - each one makes you better",
        "Focus on showing your problem-solving process, not just the answer",
        "Be yourself - authenticity is more valuable than perfection"
      ],
      commonQuestions: {
        technical: [
          "Explain a complex project you worked on",
          "How would you optimize this SQL query?",
          "What's the time complexity of this algorithm?",
          "How do you handle missing data in analysis?",
          "Walk me through your approach to a data analysis problem",
          "Explain the difference between supervised and unsupervised learning",
          "How would you approach this problem?"
        ],
        behavioral: [
          "Tell me about a time you faced a difficult challenge",
          "Describe a situation where you had to work in a team",
          "How do you handle tight deadlines?",
          "What's your biggest weakness and how are you working on it?",
          "Why are you interested in this role/company?",
          "Tell me about yourself",
          "Where do you see yourself in 5 years?"
        ]
      }
    };
  }

  // Day 7: Resume / Final Preparation
  if (dayNum === 7 || focusLower.includes("resume") || focusLower.includes("confidence") || focusLower.includes("refinement")) {
    return {
      title: "Day 7: Resume Refinement & Final Preparation",
      description: "Polish your resume, build confidence, and prepare for the next steps. This day focuses on presentation, portfolio, and mental preparation.",
      icon: <PenTool className="w-6 h-6 text-accent" />,
      sections: [
        {
          title: "Morning Session (9 AM - 12 PM)",
          icon: <Clock className="w-5 h-5" />,
          items: [
            {
              title: "Resume Enhancement (2 hours)",
              details: [
                "Update resume with recent projects and achievements",
                "Quantify your impact using numbers and metrics",
                "Use action verbs: Developed, Implemented, Optimized, Analyzed",
                "Tailor resume for target roles - highlight relevant skills",
                "Proofread for grammar, spelling, and formatting"
              ]
            },
            {
              title: "Portfolio & GitHub (1 hour)",
              details: [
                "Organize GitHub repositories - pin best projects",
                "Write comprehensive README files for projects",
                "Add live demos or deployment links where possible",
                "Ensure code is clean, documented, and professional"
              ]
            }
          ]
        },
        {
          title: "Afternoon Session (1 PM - 5 PM)",
          icon: <Code className="w-5 h-5" />,
          items: [
            {
              title: "Confidence Building (2 hours)",
              details: [
                "Review all your achievements and projects",
                "Practice your elevator pitch (30-60 seconds)",
                "Prepare answers to common interview questions",
                "Practice explaining your projects confidently",
                "Visualize successful interview scenarios"
              ]
            },
            {
              title: "Final Review & Planning (2 hours)",
              details: [
                "Review the entire 7-day preparation journey",
                "Identify your strongest areas and selling points",
                "Note areas for continued improvement",
                "Create a post-interview action plan",
                "Set goals for the next phase"
              ]
            }
          ]
        },
        {
          title: "Evening - Rest & Mental Preparation (6 PM+)",
          icon: <Target className="w-5 h-5" />,
          items: [
            {
              title: "Final Preparations",
              details: [
                "Get adequate rest - sleep is crucial for performance",
                "Review your notes one final time (light review only)",
                "Prepare your interview outfit and materials",
                "Set up your interview space",
                "Practice relaxation techniques if needed"
              ]
            },
            {
              title: "Mindset & Confidence",
              details: [
                "Remember: You've prepared well - trust your preparation",
                "Focus on showing your authentic self",
                "View the interview as a conversation, not an interrogation",
                "You're not just being evaluated - you're also evaluating them",
                "Celebrate how far you've come in 7 days!"
              ]
            }
          ]
        }
      ],
      confidenceTips: [
        "You've completed 7 days of focused preparation - that's an achievement!",
        "Your resume and portfolio showcase your skills - be proud of them",
        "Confidence comes from preparation - and you've prepared well",
        "Every expert was once a beginner - you're on your journey",
        "Focus on progress, not perfection"
      ],
      resources: [
        "Resume templates and examples",
        "GitHub profile optimization guides",
        "LinkedIn profile enhancement",
        "Interview preparation apps and tools"
      ]
    };
  }

  // Default comprehensive roadmap for any other day
  return {
    title: `Day ${dayNum}: ${focus} - Complete Roadmap`,
    description: "A comprehensive, structured approach to maximize your learning and preparation for this day.",
    icon: <Calendar className="w-6 h-6 text-primary" />,
    sections: [
      {
        title: "Morning Session (9 AM - 12 PM)",
        icon: <Clock className="w-5 h-5" />,
        items: [
          {
            title: "Learning & Concept Review (2 hours)",
            details: [
              "Study core concepts related to today's focus",
              "Take detailed notes and create summary sheets",
              "Watch video tutorials or read documentation",
              "Understand the 'why' behind each concept"
            ]
          },
          {
            title: "Initial Practice (1 hour)",
            details: [
              "Start with basic exercises and problems",
              "Build understanding through hands-on practice",
              "Identify areas that need more focus",
              "Set specific goals for the day"
            ]
          }
        ]
      },
      {
        title: "Afternoon Session (1 PM - 5 PM)",
        icon: <Code className="w-5 h-5" />,
        items: [
          {
            title: "Intensive Practice (3 hours)",
            details: [
              "Work through practice problems and exercises",
              "Apply concepts in mini-projects",
              "Time yourself to build efficiency",
              "Review solutions and learn from different approaches"
            ]
          },
          {
            title: "Project Application (1 hour)",
            details: [
              "Build a small project applying today's concepts",
              "Document your approach and learnings",
              "Push to GitHub to track progress",
              "Reflect on what you've accomplished"
            ]
          }
        ]
      },
      {
        title: "Evening Review (6 PM - 7 PM)",
        icon: <Target className="w-5 h-5" />,
        items: [
          {
            title: "Consolidation & Planning",
            details: [
              "Review all activities completed today",
              "Document key learnings and insights",
              "Identify areas for continued practice",
              "Plan tomorrow's focus areas",
              "Celebrate your progress!"
            ]
          }
        ]
      }
    ],
    confidenceTips: [
      "Consistency is key - daily practice compounds over time",
      "Focus on understanding, not just completing tasks",
      "Take breaks to maintain productivity and avoid burnout",
      "Track your progress and celebrate small wins",
      "Every day of preparation makes you more confident"
    ],
    resources: [
      "Online courses and tutorials",
      "Practice platforms (LeetCode, HackerRank, etc.)",
      "Community forums and study groups",
      "Documentation and official resources"
    ]
  };
};

export function PreparationPlanCard({ plan }: PreparationPlanCardProps) {
  const [selectedDay, setSelectedDay] = useState<PreparationDay | null>(null);

  // Ensure we have all 7 days, sorted by day number
  const ensureAllDays = (plan: PreparationDay[]): PreparationDay[] => {
    const daysMap = new Map<number, PreparationDay>();
    
    // Add existing days
    plan.forEach(day => {
      daysMap.set(day.day, day);
    });
    
    // Default plans for missing days
    const defaultPlans: Record<number, PreparationDay> = {
      1: { day: 1, focus: "Communication and fundamentals mastery", activities: ["Practice explaining technical concepts", "Review core fundamentals", "Build communication skills"] },
      2: { day: 2, focus: "SQL mastery and database skills", activities: ["Practice complex joins", "Work on query optimization", "Solve SQL problems"] },
      3: { day: 3, focus: "Python and problem-solving mastery", activities: ["Solve DSA problems", "Practice debugging", "Work on Python projects"] },
      4: { day: 4, focus: "Statistics and probability mastery", activities: ["Review statistical concepts", "Practice probability problems", "Work on case studies"] },
      5: { day: 5, focus: "Machine learning and advanced skills", activities: ["Review ML algorithms", "Work on ML project", "Practice model evaluation"] },
      6: { day: 6, focus: "Full mock interview (technical + HR)", activities: ["Review technical concepts", "Practice STAR method", "Prepare questions"] },
      7: { day: 7, focus: "Resume refinement and confidence preparation", activities: ["Update resume", "Prepare portfolio", "Practice confidence"] }
    };
    
    // Fill in missing days
    for (let dayNum = 1; dayNum <= 7; dayNum++) {
      if (!daysMap.has(dayNum)) {
        daysMap.set(dayNum, defaultPlans[dayNum]);
      }
    }
    
    // Return sorted array
    return Array.from(daysMap.values()).sort((a, b) => a.day - b.day);
  };

  const completePlan = ensureAllDays(plan);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              7-Day Preparation Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Click on any day card to see a comprehensive roadmap with detailed activities, schedules, and tips
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {completePlan.map((day, index) => {
                const roadmap = getDayRoadmap(day.day, day.focus, day.activities);
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setSelectedDay(day)}
                    className={`p-4 rounded-xl border ${dayColors[index]} hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group`}
                  >
                    <div className="text-center mb-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-bg text-primary-foreground font-bold group-hover:scale-110 transition-transform">
                        {day.day}
                      </span>
                    </div>
                    <h5 className="font-semibold text-sm text-center mb-3 group-hover:text-primary transition-colors">
                      {day.focus}
                    </h5>
                    <ul className="space-y-1.5 mb-3">
                      {day.activities.slice(0, 3).map((activity, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckSquare className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                          <span className="line-clamp-2">{activity}</span>
                        </li>
                      ))}
                      {day.activities.length > 3 && (
                        <li className="text-xs text-primary font-medium">
                          +{day.activities.length - 3} more activities
                        </li>
                      )}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <Badge variant="outline" className="w-full justify-center text-xs group-hover:border-primary group-hover:text-primary transition-colors">
                        View Full Roadmap →
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Day Detail Dialog */}
      {selectedDay && (
        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).icon}
                {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).title}
              </DialogTitle>
              <DialogDescription className="text-base">
                {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Sections */}
              {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-primary border-b border-border pb-2">
                    {section.icon}
                    {section.title}
                  </h3>
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        {item.title}
                      </h4>
                      <ul className="space-y-1.5 ml-6">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckSquare className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ))}

              {/* Confidence Tips */}
              {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).confidenceTips && (
                <div className="p-5 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Confidence-Building Tips
                  </h3>
                  <ul className="space-y-2">
                    {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).confidenceTips!.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Award className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Resources */}
              {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).resources && (
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    Recommended Resources
                  </h3>
                  <ul className="space-y-2">
                    {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).resources!.map((resource, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <FileText className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Questions (for mock interview day) */}
              {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).commonQuestions && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-accent" />
                      Common Technical Questions
                    </h3>
                    <ul className="space-y-1.5">
                      {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).commonQuestions!.technical.map((q, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent" />
                          <span>"{q}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-warning" />
                      Common Behavioral Questions
                    </h3>
                    <ul className="space-y-1.5">
                      {getDayRoadmap(selectedDay.day, selectedDay.focus, selectedDay.activities).commonQuestions!.behavioral.map((q, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-warning" />
                          <span>"{q}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
