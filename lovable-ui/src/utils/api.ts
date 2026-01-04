import { EvaluationRequest, EvaluationResponse, RoleRequirement } from "@/types/evaluation";

const API_BASE_URL = "http://127.0.0.1:5000";

export async function evaluateCandidate(data: EvaluationRequest): Promise<EvaluationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getRoleRequirements(): Promise<RoleRequirement[]> {
  const response = await fetch(`${API_BASE_URL}/api/requirements`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getSkillWeights(): Promise<Record<string, number>> {
  const response = await fetch(`${API_BASE_URL}/api/skill-weights`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Mock data for demo purposes when API is unavailable
export function getMockEvaluationResponse(data: EvaluationRequest): EvaluationResponse {
  const avgScore = (data.excel + data.sql + data.python + data.stats + data.ml + data.bi) / 6;
  
  const getStatus = (score: number) => {
    if (score >= 70) return "Ready";
    if (score >= 50) return "Almost Ready";
    return "Not Ready";
  };

  const getSkillStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  return {
    readiness: {
      status: getStatus(avgScore) as "Ready" | "Almost Ready" | "Not Ready",
      score: Math.round(avgScore),
      reasoning: [
        "Strong foundation in data analysis fundamentals",
        "Demonstrated proficiency in core technical skills",
        "Shows potential for rapid skill development",
      ],
      improvements: [
        "Focus on strengthening machine learning concepts",
        "Practice more complex SQL queries",
        "Build portfolio projects showcasing skills",
      ],
      skillBreakdown: [
        { skill: "Excel", score: data.excel, status: getSkillStatus(data.excel) },
        { skill: "SQL", score: data.sql, status: getSkillStatus(data.sql) },
        { skill: "Python", score: data.python, status: getSkillStatus(data.python) },
        { skill: "Statistics", score: data.stats, status: getSkillStatus(data.stats) },
        { skill: "Machine Learning", score: data.ml, status: getSkillStatus(data.ml) },
        { skill: "BI Tools", score: data.bi, status: getSkillStatus(data.bi) },
      ],
    },
    roleSuitability: {
      recommended: [
        {
          role: "Data Analyst",
          matchScore: 85,
          strengths: ["Strong SQL skills", "Excel proficiency", "Analytical thinking"],
        },
        {
          role: "Business Intelligence Analyst",
          matchScore: 78,
          strengths: ["BI tool expertise", "Data visualization", "Report creation"],
        },
      ],
      notRecommended: [
        {
          role: "ML Engineer",
          gaps: ["Machine Learning", "Python (Advanced)", "Deep Learning"],
        },
        {
          role: "Data Scientist",
          gaps: ["Statistics (Advanced)", "ML Algorithms"],
        },
      ],
    },
    feedbackAnalysis: {
      strengths: [
        "Clear communication skills",
        "Problem-solving approach",
        "Technical knowledge demonstration",
        "Enthusiasm for learning",
      ],
      areasToImprove: [
        "Depth of technical explanations",
        "Real-world project examples",
        "Industry domain knowledge",
      ],
    },
    preparationPlan: [
      { day: 1, focus: "SQL Mastery", activities: ["Advanced joins", "Window functions", "Query optimization"] },
      { day: 2, focus: "Python Skills", activities: ["Pandas deep dive", "Data cleaning", "EDA techniques"] },
      { day: 3, focus: "Statistics Review", activities: ["Hypothesis testing", "Probability", "Distributions"] },
      { day: 4, focus: "ML Fundamentals", activities: ["Regression models", "Classification basics", "Model evaluation"] },
      { day: 5, focus: "BI & Visualization", activities: ["Dashboard creation", "Storytelling with data", "Best practices"] },
      { day: 6, focus: "Project Work", activities: ["End-to-end analysis", "Portfolio building", "Documentation"] },
      { day: 7, focus: "Interview Prep", activities: ["Mock interviews", "Case studies", "Behavioral questions"] },
    ],
    actionSummary: {
      priority: avgScore >= 70 ? "High" : avgScore >= 50 ? "Medium" : "Low",
      recommendation: avgScore >= 70 
        ? "Candidate is ready for placement. Schedule final interviews with partner companies."
        : avgScore >= 50
        ? "Candidate shows promise. Recommend 2-week intensive training before placement."
        : "Candidate needs foundational work. Enroll in 4-week bootcamp program.",
      actionItems: [
        "Complete the 7-day preparation plan",
        "Update resume with recent projects",
        "Practice mock interviews",
        "Build GitHub portfolio",
      ],
    },
  };
}

export function getMockRoleRequirements(): RoleRequirement[] {
  return [
    {
      role: "Data Analyst",
      description: "Analyze data to provide actionable business insights",
      requirements: [
        { skill: "Excel", minimum: 70 },
        { skill: "SQL", minimum: 75 },
        { skill: "Python", minimum: 60 },
        { skill: "Statistics", minimum: 65 },
        { skill: "BI Tools", minimum: 70 },
      ],
    },
    {
      role: "Business Intelligence Analyst",
      description: "Create dashboards and reports for business decision-making",
      requirements: [
        { skill: "Excel", minimum: 75 },
        { skill: "SQL", minimum: 80 },
        { skill: "BI Tools", minimum: 85 },
        { skill: "Statistics", minimum: 60 },
      ],
    },
    {
      role: "Data Scientist",
      description: "Build predictive models and derive insights from complex data",
      requirements: [
        { skill: "Python", minimum: 80 },
        { skill: "Statistics", minimum: 80 },
        { skill: "Machine Learning", minimum: 75 },
        { skill: "SQL", minimum: 70 },
      ],
    },
    {
      role: "ML Engineer",
      description: "Deploy and maintain machine learning models in production",
      requirements: [
        { skill: "Python", minimum: 85 },
        { skill: "Machine Learning", minimum: 85 },
        { skill: "SQL", minimum: 65 },
        { skill: "Statistics", minimum: 70 },
      ],
    },
  ];
}
