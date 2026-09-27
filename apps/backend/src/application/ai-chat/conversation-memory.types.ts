export type ConversationMemoryRole = 'USER' | 'ASSISTANT';

export type ConversationMemoryMessage = {
  id: string;
  role: ConversationMemoryRole;
  content: string;
  tokenCount: number | null;
  createdAt: Date;
};

export type ConversationSkillMemory = {
  name: string;
  status: 'EXPLICIT' | 'ASSUMED' | 'DEMONSTRATED';
  context: string;
};

export type ConversationResourceMemory = {
  type: 'COURSE' | 'POST' | 'FILE';
  name: string;
};

export type ConversationSalientFact = {
  fact: string;
  attribution: 'LEARNER' | 'ASSISTANT' | 'MIXED';
};

export type ConversationSummaryData = {
  summary: string;
  topics: string[];
  decisions: string[];
  openQuestions: string[];
  nextSteps: string[];
  salientFacts: ConversationSalientFact[];
  currentLearningPath: string[];
  interests: string[];
  learningGoals: string[];
  learnerPreferences: string[];
  skills: ConversationSkillMemory[];
  resourceReferences: ConversationResourceMemory[];
};

export type StoredConversationSummary = ConversationSummaryData & {
  summarizedThroughAt: Date | null;
  summarizedThroughMessageId: string | null;
  sourceMessageCount: number;
  summaryVersion: number;
  generatedAt: Date;
  updatedAt: Date;
};

export type ConversationMemoryState = {
  summary: StoredConversationSummary | null;
  messages: ConversationMemoryMessage[];
};

export type ConversationMemoryContext = {
  summary: ConversationSummaryData | null;
  recentConversation: Array<{
    role: ConversationMemoryRole;
    content: string;
  }>;
};

export type SaveConversationSummaryInput = {
  userId: string;
  conversationId: string;
  expectedSummarizedThroughMessageId: string | null;
  summarizedThroughMessage: {
    id: string;
    createdAt: Date;
  };
  sourceMessageCount: number;
  summary: ConversationSummaryData;
};

export type ConversationMemoryOptions = {
  summaryTriggerTokens: number;
  summaryTriggerMessages: number;
  recentTokenBudget: number;
  retainRecentTurns: number;
  summaryMaxOutputTokens: number;
};
