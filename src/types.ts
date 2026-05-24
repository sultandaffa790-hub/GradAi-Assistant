export interface CvReviewResponse {
  score: number;
  weaknesses: string[];
  improvements: string[];
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface InterviewSimResponse {
  feedback: string;
  tips: string;
  nextQuestion: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  skillsToLearn: string[];
  actionPlan: string;
  resources: string[];
}

export interface SkillRoadmapResponse {
  gapAnalysis: string;
  roadmap: RoadmapPhase[];
}

export interface LinkedInOptimizeResponse {
  headlineOptions: string[];
  summary: string;
  keyKeywords: string[];
}

export type ActiveTool = "spec" | "cv" | "interview" | "roadmap" | "linkedin";
