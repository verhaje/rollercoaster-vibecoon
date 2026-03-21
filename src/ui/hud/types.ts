export type AttractionTab = 'thrill' | 'fun' | 'relax' | 'food' | 'drink' | 'toilet' | 'shops';

export type StallCategory = 'food' | 'drink' | 'toilet' | 'information' | 'balloon';

export type StallProduct = {
  name: string;
  price: number;
};

export type EngagementSnapshot = {
  missionTitle: string;
  missionProgress: number;
  missionGoal: number;
  missionCompleted: boolean;
  missionReward: number;
  weeklyTitle: string;
  weeklyProgress: number;
  weeklyGoal: number;
  weeklyCompleted: boolean;
  weeklyReward: number;
  eventText: string;
  eventHistory: Array<{ day: number; text: string; delta: number }>;
  streakDays: number;
  missionsCompletedTotal: number;
  weeklyChallengesCompletedTotal: number;
  peakVisitors: number;
  dayBadgeActive: boolean;
  weekBadgeActive: boolean;
  weeklyRerollsLeft: number;
  bestPeakVisitors: number;
  bestSatisfactionStreak: number;
  bestMissionsCompleted: number;
  bestWeeklyChallengesCompleted: number;
  missionCompletionStreak: number;
  veteranTier: 'Rookie' | 'Builder' | 'Tycoon' | 'Legend';
  recoveryModeActive: boolean;
  prestigeLevel: number;
  prestigePoints: number;
  prestigePointsToNext: number;
  specialization: 'Operations' | 'Guest Delight' | 'Park Artist';
  specializationProgress: number;
  specializationGoal: number;
  seasonalBadges: string[];
  specializationBonusLabel: string;
  assistModeActive: boolean;
  failedMissionStreak: number;
  weeklyFailGraceUsed: boolean;
  stabilityScore: number;
  momentumScore: number;
  momentumSurgeMultiplier: number;
  resilienceBonusEstimate: number;
  mentorLevel: number;
  mentorPoints: number;
  mentorPointsToNext: number;
};
