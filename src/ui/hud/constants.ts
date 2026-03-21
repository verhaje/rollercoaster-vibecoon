import type { EngagementSnapshot } from './types';

const GUEST_FIRST_NAMES = [
  'Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn',
  'Avery', 'Skylar', 'Dakota', 'Jamie', 'Reese', 'Sage', 'Finley', 'Robin',
  'Charlie', 'Emery', 'Rowan', 'Blair', 'Peyton', 'Hayden', 'Drew', 'Ash',
];
const GUEST_LAST_NAMES = [
  'Park', 'Hill', 'Stone', 'Lake', 'Vale', 'Brook', 'Meadow', 'Field',
  'Grove', 'Gate', 'Wood', 'Ridge', 'Glen', 'Dale', 'Hart', 'Lane',
];

export const EMPLOYEE_FIRST_NAMES = [
  'Maya', 'Leo', 'Nina', 'Owen', 'Iris', 'Ezra', 'Lena', 'Noah',
  'Jade', 'Theo', 'Aria', 'Miles', 'Zoe', 'Eli', 'Ruby', 'Finn',
  'Nora', 'Kai', 'Emma', 'Luca', 'Ivy', 'Milo', 'Lily', 'Cole',
];

export const EMPLOYEE_LAST_NAMES = [
  'Baker', 'Frost', 'Miller', 'Rivera', 'Woods', 'Stone', 'Hayes', 'Carter',
  'Reed', 'Cooper', 'Turner', 'Bailey', 'Diaz', 'Parker', 'Cook', 'Ward',
];

export const MECHANIC_MONTHLY_COST = 75;
export const CLEANER_MONTHLY_COST = 55;
export const SECURITY_MONTHLY_COST = 80;
export const ENTERTAINER_MONTHLY_COST = 70;

export const BALLOON_STAND_TEMPLATE_ID = 17;
export const INFORMATION_STAND_TEMPLATE_ID = 18;
export const SHOP_TEMPLATE_IDS = new Set<number>([BALLOON_STAND_TEMPLATE_ID, INFORMATION_STAND_TEMPLATE_ID]);

export function guestName(index: number): string {
  const first = GUEST_FIRST_NAMES[index % GUEST_FIRST_NAMES.length];
  const last = GUEST_LAST_NAMES[(index * 7 + 3) % GUEST_LAST_NAMES.length];
  return `${first} ${last}`;
}

export const DEFAULT_ENGAGEMENT_SNAPSHOT: EngagementSnapshot = {
  missionTitle: 'Build 3 attractions',
  missionProgress: 0,
  missionGoal: 3,
  missionCompleted: false,
  missionReward: 0,
  weeklyTitle: 'Weekly Peak: 85 Visitors',
  weeklyProgress: 0,
  weeklyGoal: 85,
  weeklyCompleted: false,
  weeklyReward: 0,
  eventText: 'No event',
  eventHistory: [],
  streakDays: 0,
  missionsCompletedTotal: 0,
  weeklyChallengesCompletedTotal: 0,
  peakVisitors: 0,
  dayBadgeActive: false,
  weekBadgeActive: false,
  weeklyRerollsLeft: 1,
  bestPeakVisitors: 0,
  bestSatisfactionStreak: 0,
  bestMissionsCompleted: 0,
  bestWeeklyChallengesCompleted: 0,
  missionCompletionStreak: 0,
  veteranTier: 'Rookie',
  recoveryModeActive: false,
  prestigeLevel: 0,
  prestigePoints: 0,
  prestigePointsToNext: 3,
  specialization: 'Operations',
  specializationProgress: 0,
  specializationGoal: 6,
  seasonalBadges: [],
  specializationBonusLabel: 'Ops bonus: +4% daily / +8% weekly rewards',
  assistModeActive: false,
  failedMissionStreak: 0,
  weeklyFailGraceUsed: false,
  stabilityScore: 50,
  momentumScore: 50,
  momentumSurgeMultiplier: 1,
  resilienceBonusEstimate: 0,
  mentorLevel: 0,
  mentorPoints: 0,
  mentorPointsToNext: 4,
};
