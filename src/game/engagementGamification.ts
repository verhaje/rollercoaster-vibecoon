export type MomentumInputs = {
  missionCompletionStreak: number;
  satisfactionStreakDays: number;
  stabilityScore: number;
  consecutiveFailedMissions: number;
  weeklyChallengesCompleted: number;
  assistModeActive: boolean;
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function computeMomentumScore(input: MomentumInputs): number {
  const raw = 25
    + input.missionCompletionStreak * 6
    + input.satisfactionStreakDays * 4
    + Math.floor(input.stabilityScore / 2)
    + input.weeklyChallengesCompleted * 5
    - input.consecutiveFailedMissions * 12
    - (input.assistModeActive ? 10 : 0);

  return clamp(raw, 0, 100);
}

export function computeDynamicWeeklyRerollCap(prestigeLevel: number, momentumScore: number): number {
  const base = prestigeLevel >= 6
    ? 3
    : prestigeLevel >= 3
      ? 2
      : 1;

  const momentumBonus = momentumScore >= 82 ? 1 : 0;
  return clamp(base + momentumBonus, 1, 3);
}

export function computeWeeklyGraceThreshold(goal: number, momentumScore: number, stabilityScore: number, assistModeActive: boolean): number {
  const safeGoal = Math.max(1, Math.floor(goal));

  let ratio = 0.9;
  if (assistModeActive || stabilityScore < 45) {
    ratio = 0.82;
  } else if (momentumScore < 40) {
    ratio = 0.86;
  }

  return clamp(Math.floor(safeGoal * ratio), 1, safeGoal);
}

export function mentorPointsForNextLevel(level: number): number {
  return 4 + Math.max(0, Math.floor(level)) * 3;
}

export function computeMentorPointGain(momentumScore: number, stabilityScore: number, isWeekly: boolean): number {
  const base = isWeekly ? 3 : 1;
  const momentumBonus = momentumScore >= 70 ? 1 : 0;
  const stabilityBonus = stabilityScore >= 65 ? 1 : 0;
  return clamp(base + momentumBonus + stabilityBonus, 1, 6);
}

export function computeMentorRewardMultiplier(mentorLevel: number): number {
  const safeLevel = Math.max(0, Math.floor(mentorLevel));
  const bonus = Math.min(0.06, safeLevel * 0.012);
  return 1 + bonus;
}

export function computeMomentumSurgeMultiplier(momentumScore: number, stabilityScore: number): number {
  let bonus = 0;
  if (momentumScore >= 75) bonus += 0.03;
  if (momentumScore >= 90) bonus += 0.02;
  if (stabilityScore >= 70) bonus += 0.01;
  return 1 + clamp(bonus, 0, 0.08);
}

export function computeResilienceBudgetBonus(consecutiveFailedMissions: number, assistModeActive: boolean, isWeekly: boolean): number {
  if (!assistModeActive && consecutiveFailedMissions <= 0) {
    return 0;
  }

  const base = isWeekly ? 70 : 30;
  const streakBonus = clamp(Math.floor(consecutiveFailedMissions), 0, 4) * (isWeekly ? 18 : 10);
  const assistBonus = assistModeActive ? (isWeekly ? 20 : 12) : 0;
  return base + streakBonus + assistBonus;
}

export function computeMentorCatchupPoints(consecutiveFailedMissions: number, assistModeActive: boolean): number {
  let bonus = 0;
  if (assistModeActive) bonus += 1;
  if (consecutiveFailedMissions >= 3) bonus += 1;
  return clamp(bonus, 0, 2);
}
