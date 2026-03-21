import { describe, expect, it } from 'vitest';
import {
  computeMentorCatchupPoints,
  computeMentorPointGain,
  computeMentorRewardMultiplier,
  computeDynamicWeeklyRerollCap,
  computeMomentumSurgeMultiplier,
  computeMomentumScore,
  computeResilienceBudgetBonus,
  computeWeeklyGraceThreshold,
  mentorPointsForNextLevel,
} from '../src/game/engagementGamification';

describe('engagement gamification helpers', () => {
  it('computes a higher momentum score for healthier play patterns', () => {
    const struggling = computeMomentumScore({
      missionCompletionStreak: 0,
      satisfactionStreakDays: 0,
      stabilityScore: 35,
      consecutiveFailedMissions: 3,
      weeklyChallengesCompleted: 0,
      assistModeActive: true,
    });

    const thriving = computeMomentumScore({
      missionCompletionStreak: 4,
      satisfactionStreakDays: 6,
      stabilityScore: 82,
      consecutiveFailedMissions: 0,
      weeklyChallengesCompleted: 2,
      assistModeActive: false,
    });

    expect(struggling).toBeGreaterThanOrEqual(0);
    expect(thriving).toBeLessThanOrEqual(100);
    expect(thriving).toBeGreaterThan(struggling);
  });

  it('clamps momentum score at the boundaries', () => {
    const low = computeMomentumScore({
      missionCompletionStreak: 0,
      satisfactionStreakDays: 0,
      stabilityScore: 0,
      consecutiveFailedMissions: 99,
      weeklyChallengesCompleted: 0,
      assistModeActive: true,
    });

    const high = computeMomentumScore({
      missionCompletionStreak: 30,
      satisfactionStreakDays: 20,
      stabilityScore: 100,
      consecutiveFailedMissions: 0,
      weeklyChallengesCompleted: 10,
      assistModeActive: false,
    });

    expect(low).toBe(0);
    expect(high).toBe(100);
  });

  it('scales weekly reroll cap by prestige and momentum', () => {
    expect(computeDynamicWeeklyRerollCap(0, 30)).toBe(1);
    expect(computeDynamicWeeklyRerollCap(3, 40)).toBe(2);
    expect(computeDynamicWeeklyRerollCap(3, 90)).toBe(3);
    expect(computeDynamicWeeklyRerollCap(9, 95)).toBe(3);
  });

  it('uses softer weekly grace thresholds when a player is struggling', () => {
    const baseline = computeWeeklyGraceThreshold(100, 60, 60, false);
    const lowMomentum = computeWeeklyGraceThreshold(100, 20, 60, false);
    const assisted = computeWeeklyGraceThreshold(100, 60, 40, true);

    expect(baseline).toBe(90);
    expect(lowMomentum).toBe(86);
    expect(assisted).toBe(82);
  });

  it('keeps grace thresholds within valid mission bounds', () => {
    const tinyGoal = computeWeeklyGraceThreshold(1, 0, 0, true);
    const mediumGoal = computeWeeklyGraceThreshold(7, 0, 100, false);

    expect(tinyGoal).toBe(1);
    expect(mediumGoal).toBeGreaterThanOrEqual(1);
    expect(mediumGoal).toBeLessThanOrEqual(7);
  });

  it('awards more mentor points for stronger runs and weekly completions', () => {
    const dailyLow = computeMentorPointGain(25, 35, false);
    const dailyHigh = computeMentorPointGain(85, 75, false);
    const weeklyHigh = computeMentorPointGain(85, 75, true);

    expect(dailyLow).toBeGreaterThanOrEqual(1);
    expect(dailyHigh).toBeGreaterThan(dailyLow);
    expect(weeklyHigh).toBeGreaterThan(dailyHigh);
  });

  it('increases mentor level requirements progressively', () => {
    expect(mentorPointsForNextLevel(0)).toBe(4);
    expect(mentorPointsForNextLevel(1)).toBe(7);
    expect(mentorPointsForNextLevel(4)).toBe(16);
  });

  it('applies a capped mentor reward multiplier', () => {
    expect(computeMentorRewardMultiplier(0)).toBe(1);
    expect(computeMentorRewardMultiplier(1)).toBeCloseTo(1.012, 5);
    expect(computeMentorRewardMultiplier(5)).toBeCloseTo(1.06, 5);
    expect(computeMentorRewardMultiplier(99)).toBeCloseTo(1.06, 5);
  });

  it('adds momentum surge when momentum and stability are high', () => {
    const baseline = computeMomentumSurgeMultiplier(30, 40);
    const strong = computeMomentumSurgeMultiplier(80, 75);
    const peak = computeMomentumSurgeMultiplier(95, 90);

    expect(baseline).toBe(1);
    expect(strong).toBeGreaterThan(1);
    expect(peak).toBeCloseTo(1.06, 5);
  });

  it('awards larger resilience bonuses for weekly recoveries', () => {
    const none = computeResilienceBudgetBonus(0, false, false);
    const dailyAssist = computeResilienceBudgetBonus(2, true, false);
    const weeklyAssist = computeResilienceBudgetBonus(2, true, true);

    expect(none).toBe(0);
    expect(dailyAssist).toBeGreaterThan(0);
    expect(weeklyAssist).toBeGreaterThan(dailyAssist);
  });

  it('caps mentor catch-up points to prevent runaway bonuses', () => {
    expect(computeMentorCatchupPoints(0, false)).toBe(0);
    expect(computeMentorCatchupPoints(2, true)).toBe(1);
    expect(computeMentorCatchupPoints(3, true)).toBe(2);
    expect(computeMentorCatchupPoints(99, true)).toBe(2);
  });
});
