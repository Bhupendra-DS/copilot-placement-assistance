export interface SkillScores {
  excel: number;
  sql: number;
  python: number;
  stats: number;
  ml: number;
  bi: number;
}

export interface EvaluationRequest extends SkillScores {
  feedback: string;
}

export interface ReadinessResult {
  status: "Ready" | "Almost Ready" | "Not Ready";
  score: number;
  reasoning: string[];
  improvements: string[];
  skillBreakdown: {
    skill: string;
    score: number;
    status: string;
  }[];
}

export interface RoleSuitability {
  recommended: {
    role: string;
    matchScore: number;
    strengths: string[];
  }[];
  notRecommended: {
    role: string;
    gaps: string[];
  }[];
}

export interface FeedbackAnalysis {
  strengths: string[];
  areasToImprove: string[];
}

export interface PreparationDay {
  day: number;
  focus: string;
  activities: string[];
}

export interface ActionSummary {
  priority: "High" | "Medium" | "Low";
  recommendation: string;
  actionItems: string[];
}

export interface SkillGap {
  skill: string;
  candidateScore: number;
  requiredScore: number;
  gap: number;
}

export interface RoleGap {
  role: string;
  gaps: SkillGap[];
  totalGap: number;
}

export interface EvaluationResponse {
  readiness: ReadinessResult;
  roleSuitability: RoleSuitability;
  feedbackAnalysis: FeedbackAnalysis;
  preparationPlan: PreparationDay[];
  actionSummary: ActionSummary;
  gapAnalysis?: RoleGap[];
  candidateScores?: Record<string, number>;
}

export interface RoleRequirement {
  role: string;
  description: string;
  requirements: {
    skill: string;
    minimum: number;
  }[];
}
