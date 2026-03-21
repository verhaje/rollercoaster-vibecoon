/* =============================================
   Park Tycoon – Game Loop & Integration
   Bridges WASM simulation ↔ PixiJS renderer
   ============================================= */

import { type SimExports, VisitorState } from './types';
import { Renderer } from '../render/Renderer';
import { BuildController } from '../input/BuildController';
import { HUD } from '../ui/Hud';
import ATTRACTIONS from './config/attractions';
import { ECONOMY } from './config/economy';
import { GameTime } from './GameTime';
import { WeatherSystem } from './Weather';
import { FurnitureSystem, type FurnitureSnapshot } from './Furniture';
import { ScenerySystem, type ScenerySnapshot } from './Scenery';
import { CoasterTrackSystem, type CoasterTrackSnapshot } from './RollerCoasterTrack';
import { BuildTool, TileType } from './types';
import { resolveGameProfile, type GameProfile } from './uiMode';
import {
  computeDynamicWeeklyRerollCap,
  computeMentorCatchupPoints,
  computeMentorPointGain,
  computeMentorRewardMultiplier,
  computeMomentumScore,
  computeMomentumSurgeMultiplier,
  computeResilienceBudgetBonus,
  computeWeeklyGraceThreshold,
  mentorPointsForNextLevel,
} from './engagementGamification';

const CATEGORY_MAP: Record<string, number> = { fun: 0, thrill: 1, relax: 2, food: 3, drink: 4, toilet: 5 };
const SAVE_VERSION = 1;
const MAP_W = ECONOMY.mapWidth;
const MAP_H = ECONOMY.mapHeight;
const BALLOON_STAND_TEMPLATE_ID = 17;
const INFORMATION_STAND_TEMPLATE_ID = 18;
const PARK_RECORDS_STORAGE_KEY = 'rct.engagement.records';

type SavedAttraction = {
  oldInstanceId: number;
  templateId: number;
  x: number;
  y: number;
  rotation: number;
  entryX: number;
  entryY: number;
  exitX: number;
  exitY: number;
  ticketPrice: number;
  capacity: number;
};

type SavedEmployee = {
  count: number;
  areas: Array<Array<{ x: number; y: number }>>;
};

type DailyMissionId = 'build_attractions' | 'reach_visitors' | 'park_beauty' | 'recovery_day';
type WeeklyChallengeId = 'weekly_visitors' | 'weekly_attractiveness' | 'weekly_missions';
type VeteranTier = 'Rookie' | 'Builder' | 'Tycoon' | 'Legend';
type Specialization = 'Operations' | 'Guest Delight' | 'Park Artist';

type DailyMissionState = {
  id: DailyMissionId;
  title: string;
  goal: number;
  progress: number;
  reward: number;
  dayAssigned: number;
  completed: boolean;
  rewardGranted: boolean;
};

type WeeklyChallengeState = {
  id: WeeklyChallengeId;
  title: string;
  goal: number;
  progress: number;
  reward: number;
  weekAssigned: number;
  completed: boolean;
  rewardGranted: boolean;
};

type EventHistoryEntry = {
  day: number;
  text: string;
  delta: number;
};

type EngagementState = {
  currentMission: DailyMissionState;
  currentWeeklyChallenge: WeeklyChallengeState;
  missionsCompleted: number;
  missionsCompletedThisWeek: number;
  weeklyChallengesCompleted: number;
  satisfactionStreakDays: number;
  lastMissionDay: number;
  lastWeeklyChallengeWeek: number;
  peakVisitors: number;
  lastEventText: string;
  lastEventDay: number;
  eventHistory: EventHistoryEntry[];
  dayBadgeActive: boolean;
  weekBadgeActive: boolean;
  weeklyRerollsUsedThisWeek: number;
  missionCompletionStreak: number;
  engagementCooldownUntilDay: number;
  veteranTier: VeteranTier;
  prestigeLevel: number;
  prestigePoints: number;
  specialization: Specialization;
  specializationProgress: number;
  specializationGoal: number;
  currentSeasonKey: string;
  seasonalBadges: string[];
  consecutiveFailedMissions: number;
  assistModeActive: boolean;
  weeklyFailGraceUsedThisWeek: boolean;
  stabilityScore: number;
  momentumScore: number;
  mentorLevel: number;
  mentorPoints: number;
};

type ParkRecords = {
  bestPeakVisitors: number;
  bestSatisfactionStreak: number;
  bestMissionsCompleted: number;
  bestWeeklyChallengesCompleted: number;
};

type SaveData = {
  version: number;
  createdAt: string;
  game: {
    speed: number;
    paused: boolean;
    tickAccum: number;
    vPrevState: number[];
    vPrevRideTarget: number[];
    gameTime: { startDateISO: string; totalTicks: number };
    weather: {
      current: 'average' | 'sunny' | 'rain' | 'snow' | 'heatwave';
      lastChangeDay: number;
      duration: number;
    };
  };
  sim: {
    levelsUp: number;
    levelsDown: number;
    budget: number;
    entranceTicket: number;
    rngState: number;
    tiles: number[];
    heights: number[];
    upperPaths: Array<{ x: number; y: number; height: number; variant: number }>;
    attractions: SavedAttraction[];
    mechanics: SavedEmployee;
    cleaners: SavedEmployee;
    security: SavedEmployee;
    entertainers?: SavedEmployee;
  };
  ts: {
    furniture: FurnitureSnapshot;
    scenery: ScenerySnapshot;
    coasterTracks: CoasterTrackSnapshot;
    hud: {
      instanceNames: Array<{ id: number; name: string }>;
      instanceBuildDates: Array<{ id: number; date: string }>;
      stallProductPrices: Array<{ id: number; prices: number[] }>;
      stoppedAttractionCapacities: Array<{ id: number; capacity: number }>;
      employeeNamesByUid: Array<{ key: string; name: string }>;
      employeeHiredDateByUid: Array<{ key: string; date: string }>;
    };
    controller: {
      tool: BuildTool;
      selectedAttractionId: number;
      selectedPathVariant: number;
      selectedTreeVariant: number;
      selectedLandVariant: number;
      selectedSceneryVariant: number;
      selectedAttractionRotation: number;
      buildHeight: number;
    };
    renderer: { camera: { x: number; y: number; zoom: number } };
    engagement: EngagementState;
  };
};

export class Game {
  private sim!: SimExports;
  private renderer!: Renderer;
  private controller!: BuildController;
  private hud!: HUD;
  private furniture!: FurnitureSystem;
  private scenery!: ScenerySystem;
  private coasterTracks!: CoasterTrackSystem;

  private speed = 1;
  private paused = false;
  private tickAccum = 0;
  private readonly TICK_RATE = 1000 / 3; // 6 sim ticks per real second at 1x

  // Track previous ride state to fire gameplay transitions.
  private vPrevState = new Uint8Array(100).fill(VisitorState.Inactive);
  private vPrevRideTarget = new Int16Array(100).fill(-1);

  readonly gameTime = new GameTime();
  readonly weather = new WeatherSystem();
  private profile: GameProfile | null = null;
  private engagement!: EngagementState;
  private parkRecords: ParkRecords = {
    bestPeakVisitors: 0,
    bestSatisfactionStreak: 0,
    bestMissionsCompleted: 0,
    bestWeeklyChallengesCompleted: 0,
  };

  private createMissionForDay(day: number): DailyMissionState {
    const missionPool: Array<Omit<DailyMissionState, 'progress' | 'dayAssigned' | 'completed' | 'rewardGranted'>> = [
      { id: 'build_attractions', title: 'Build 3 attractions', goal: 3, reward: 220 },
      { id: 'reach_visitors', title: 'Reach 60 visitors', goal: 60, reward: 180 },
      { id: 'park_beauty', title: 'Reach 75% attractiveness', goal: 75, reward: 160 },
    ];

    const shouldUseRecoveryMission = !!this.engagement
      && (this.engagement.satisfactionStreakDays >= 6 || this.engagement.missionsCompletedThisWeek >= 5);

    if (shouldUseRecoveryMission) {
      return {
        id: 'recovery_day',
        title: 'Recovery Day: Keep satisfaction at 55%',
        goal: 55,
        reward: 140,
        progress: 0,
        dayAssigned: day,
        completed: false,
        rewardGranted: false,
      };
    }

    const mission = missionPool[day % missionPool.length];
    const missionsCompleted = this.engagement?.missionsCompleted ?? 0;
    const streak = this.engagement?.missionCompletionStreak ?? 0;
    const avgSat = this.sim.getAvgSatisfaction();

    let difficultyMultiplier = 1 + Math.min(0.25, Math.floor(missionsCompleted / 8) * 0.05);
    if (streak >= 3) difficultyMultiplier += 0.08;
    if (avgSat < 55) difficultyMultiplier -= 0.15;
    if (this.engagement?.assistModeActive) difficultyMultiplier -= 0.2;
    difficultyMultiplier = Math.max(0.8, Math.min(1.35, difficultyMultiplier));

    const scaledGoal = Math.max(1, Math.round(mission.goal * difficultyMultiplier));
    const scaledReward = Math.max(100, Math.round(mission.reward * (0.92 + difficultyMultiplier * 0.12)));

    return {
      ...mission,
      goal: scaledGoal,
      reward: scaledReward,
      progress: 0,
      dayAssigned: day,
      completed: false,
      rewardGranted: false,
    };
  }

  private computeVeteranTier(): VeteranTier {
    const score = this.engagement.missionsCompleted + this.engagement.weeklyChallengesCompleted * 3;
    if (score >= 26) return 'Legend';
    if (score >= 16) return 'Tycoon';
    if (score >= 7) return 'Builder';
    return 'Rookie';
  }

  private prestigePointsForNextLevel(level: number = this.engagement.prestigeLevel): number {
    return 3 + level * 2;
  }

  private maxWeeklyRerolls(): number {
    return computeDynamicWeeklyRerollCap(this.engagement.prestigeLevel, this.engagement.momentumScore);
  }

  private mentorPointsToNextLevel(level: number = this.engagement.mentorLevel): number {
    return mentorPointsForNextLevel(level);
  }

  private grantMentorPoints(isWeekly: boolean): void {
    const gained = computeMentorPointGain(this.engagement.momentumScore, this.engagement.stabilityScore, isWeekly)
      + computeMentorCatchupPoints(this.engagement.consecutiveFailedMissions, this.engagement.assistModeActive);
    this.engagement.mentorPoints += gained;

    while (this.engagement.mentorPoints >= this.mentorPointsToNextLevel()) {
      this.engagement.mentorPoints -= this.mentorPointsToNextLevel();
      this.engagement.mentorLevel = Math.min(5, this.engagement.mentorLevel + 1);
      if (this.engagement.mentorLevel >= 5) {
        this.engagement.mentorPoints = Math.min(this.engagement.mentorPoints, this.mentorPointsToNextLevel());
        break;
      }
    }
  }

  private updateSpecializationArc(): void {
    const operationsScore = this.engagement.missionsCompletedThisWeek;
    const guestScore = this.engagement.satisfactionStreakDays;
    const artistScore = this.sim.getParkAttractiveness();

    if (artistScore >= Math.max(operationsScore * 10, guestScore * 10)) {
      this.engagement.specialization = 'Park Artist';
      this.engagement.specializationProgress = artistScore;
      this.engagement.specializationGoal = 90;
      return;
    }

    if (guestScore >= operationsScore) {
      this.engagement.specialization = 'Guest Delight';
      this.engagement.specializationProgress = guestScore;
      this.engagement.specializationGoal = 8;
      return;
    }

    this.engagement.specialization = 'Operations';
    this.engagement.specializationProgress = operationsScore;
    this.engagement.specializationGoal = 6;
  }

  private getCurrentSeasonKey(): string {
    return `${this.gameTime.formatYear()}-${this.gameTime.season}`;
  }

  private applySeasonTransitionIfNeeded(): void {
    const nextKey = this.getCurrentSeasonKey();
    const prevKey = this.engagement.currentSeasonKey;
    if (nextKey === prevKey) return;

    let badge: string | null = null;
    if (this.engagement.specialization === 'Guest Delight' && this.engagement.satisfactionStreakDays >= 8) {
      badge = `Guest Champion (${prevKey})`;
    } else if (this.engagement.specialization === 'Park Artist' && this.sim.getParkAttractiveness() >= 85) {
      badge = `Park Artist (${prevKey})`;
    } else if (this.engagement.peakVisitors >= 80) {
      badge = `Crowd Magnet (${prevKey})`;
    } else if (this.engagement.missionsCompletedThisWeek >= 4) {
      badge = `Steady Operator (${prevKey})`;
    }

    if (badge && !this.engagement.seasonalBadges.includes(badge)) {
      this.engagement.seasonalBadges = [...this.engagement.seasonalBadges, badge].slice(-8);
    }

    this.engagement.currentSeasonKey = nextKey;
  }

  private getSpecializationRewardMultiplier(isWeekly: boolean): number {
    if (this.engagement.specialization === 'Operations') {
      return isWeekly ? 1.08 : 1.04;
    }
    if (this.engagement.specialization === 'Guest Delight') {
      return this.sim.getAvgSatisfaction() >= 65 ? (isWeekly ? 1.1 : 1.05) : 1.0;
    }
    return this.sim.getParkAttractiveness() >= 80 ? (isWeekly ? 1.11 : 1.06) : 1.0;
  }

  private computeStabilityScore(): number {
    const sat = this.sim.getAvgSatisfaction();
    const brokenPenalty = this.sim.getBrokenAttractionCount() * 4;
    const budgetBonus = Math.min(20, Math.floor(this.sim.getBudget() / 1000));
    const raw = sat + budgetBonus - brokenPenalty;
    return Math.max(0, Math.min(100, raw));
  }

  private createWeeklyChallengeForWeek(week: number): WeeklyChallengeState {
    const challengePool: Array<Omit<WeeklyChallengeState, 'progress' | 'weekAssigned' | 'completed' | 'rewardGranted'>> = [
      { id: 'weekly_visitors', title: 'Weekly Peak: 85 Visitors', goal: 85, reward: 520 },
      { id: 'weekly_attractiveness', title: 'Weekly Beauty: 82%', goal: 82, reward: 460 },
      { id: 'weekly_missions', title: 'Complete 4 Daily Missions', goal: 4, reward: 600 },
    ];
    const challenge = challengePool[week % challengePool.length];
    return {
      ...challenge,
      progress: 0,
      weekAssigned: week,
      completed: false,
      rewardGranted: false,
    };
  }

  private createDefaultEngagementState(day: number): EngagementState {
    const week = Math.floor(day / 7);
    return {
      currentMission: this.createMissionForDay(day),
      currentWeeklyChallenge: this.createWeeklyChallengeForWeek(week),
      missionsCompleted: 0,
      missionsCompletedThisWeek: 0,
      weeklyChallengesCompleted: 0,
      satisfactionStreakDays: 0,
      lastMissionDay: day,
      lastWeeklyChallengeWeek: week,
      peakVisitors: 0,
      lastEventText: '',
      lastEventDay: -1,
      eventHistory: [],
      dayBadgeActive: false,
      weekBadgeActive: false,
      weeklyRerollsUsedThisWeek: 0,
      missionCompletionStreak: 0,
      engagementCooldownUntilDay: 0,
      veteranTier: 'Rookie',
      prestigeLevel: 0,
      prestigePoints: 0,
      specialization: 'Operations',
      specializationProgress: 0,
      specializationGoal: 6,
      currentSeasonKey: `${this.gameTime.formatYear()}-${this.gameTime.season}`,
      seasonalBadges: [],
      consecutiveFailedMissions: 0,
      assistModeActive: false,
      weeklyFailGraceUsedThisWeek: false,
      stabilityScore: 50,
      momentumScore: 50,
      mentorLevel: 0,
      mentorPoints: 0,
    };
  }

  private recordEvent(day: number, text: string, delta: number): void {
    this.engagement.lastEventText = text;
    this.engagement.lastEventDay = day;
    const withoutSameDay = this.engagement.eventHistory.filter((entry) => entry.day !== day);
    withoutSameDay.push({ day, text, delta });
    this.engagement.eventHistory = withoutSameDay.slice(-7);
  }

  private readParkRecords(): void {
    try {
      const raw = window.localStorage.getItem(PARK_RECORDS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<ParkRecords>;
      this.parkRecords = {
        bestPeakVisitors: Number.isFinite(parsed.bestPeakVisitors) ? Math.max(0, Math.floor(parsed.bestPeakVisitors!)) : 0,
        bestSatisfactionStreak: Number.isFinite(parsed.bestSatisfactionStreak) ? Math.max(0, Math.floor(parsed.bestSatisfactionStreak!)) : 0,
        bestMissionsCompleted: Number.isFinite(parsed.bestMissionsCompleted) ? Math.max(0, Math.floor(parsed.bestMissionsCompleted!)) : 0,
        bestWeeklyChallengesCompleted: Number.isFinite(parsed.bestWeeklyChallengesCompleted)
          ? Math.max(0, Math.floor(parsed.bestWeeklyChallengesCompleted!))
          : 0,
      };
    } catch {
      // Ignore invalid local storage payloads.
    }
  }

  private persistParkRecords(): void {
    try {
      window.localStorage.setItem(PARK_RECORDS_STORAGE_KEY, JSON.stringify(this.parkRecords));
    } catch {
      // Ignore storage errors.
    }
  }

  private updateParkRecords(): void {
    const next: ParkRecords = {
      bestPeakVisitors: Math.max(this.parkRecords.bestPeakVisitors, this.engagement.peakVisitors),
      bestSatisfactionStreak: Math.max(this.parkRecords.bestSatisfactionStreak, this.engagement.satisfactionStreakDays),
      bestMissionsCompleted: Math.max(this.parkRecords.bestMissionsCompleted, this.engagement.missionsCompleted),
      bestWeeklyChallengesCompleted: Math.max(this.parkRecords.bestWeeklyChallengesCompleted, this.engagement.weeklyChallengesCompleted),
    };
    if (
      next.bestPeakVisitors !== this.parkRecords.bestPeakVisitors
      || next.bestSatisfactionStreak !== this.parkRecords.bestSatisfactionStreak
      || next.bestMissionsCompleted !== this.parkRecords.bestMissionsCompleted
      || next.bestWeeklyChallengesCompleted !== this.parkRecords.bestWeeklyChallengesCompleted
    ) {
      this.parkRecords = next;
      this.persistParkRecords();
    }
  }

  private rerollWeeklyChallenge(): { ok: boolean; message: string } {
    const week = Math.floor(this.gameTime.day / 7);
    const maxRerolls = this.maxWeeklyRerolls();
    if (this.engagement.weeklyRerollsUsedThisWeek >= maxRerolls) {
      return { ok: false, message: `Reroll limit reached (${maxRerolls}/${maxRerolls}).` };
    }
    if (this.engagement.currentWeeklyChallenge.completed) {
      return { ok: false, message: 'Current weekly challenge already completed.' };
    }

    this.engagement.weeklyRerollsUsedThisWeek += 1;
    this.engagement.currentWeeklyChallenge = this.createWeeklyChallengeForWeek(week + 1);
    this.engagement.currentWeeklyChallenge.weekAssigned = week;
    this.engagement.currentWeeklyChallenge.progress = this.getWeeklyProgress(this.engagement.currentWeeklyChallenge.id);
    this.engagement.currentWeeklyChallenge.completed = this.engagement.currentWeeklyChallenge.progress >= this.engagement.currentWeeklyChallenge.goal;
    this.engagement.currentWeeklyChallenge.rewardGranted = false;
    this.engagement.weekBadgeActive = true;
    return { ok: true, message: 'Weekly challenge rerolled.' };
  }

  private getMissionProgress(missionId: DailyMissionId): number {
    if (missionId === 'build_attractions') {
      return this.sim.getPlacedAttractionCount();
    }
    if (missionId === 'reach_visitors') {
      return this.sim.getActiveVisitors();
    }
    if (missionId === 'recovery_day') {
      return this.sim.getAvgSatisfaction();
    }
    return this.sim.getParkAttractiveness();
  }

  private getWeeklyProgress(challengeId: WeeklyChallengeId): number {
    if (challengeId === 'weekly_visitors') return this.sim.getActiveVisitors();
    if (challengeId === 'weekly_attractiveness') return this.sim.getParkAttractiveness();
    return this.engagement.missionsCompletedThisWeek;
  }

  private triggerDailyEvent(day: number): void {
    const rng = this.sim.getRngState() >>> 0;
    const rollSeed = (rng ^ (day * 1103515245)) >>> 0;
    const roll = rollSeed % 100;
    if (roll >= 20) {
      this.recordEvent(day, 'No special event today', 0);
      return;
    }

    const eventRoll = (rollSeed ^ 0x9e3779b9) % 4;
    let delta = 0;
    let label = '';

    if (eventRoll === 0) {
      delta = 140;
      label = 'Local festival boost';
    } else if (eventRoll === 1) {
      delta = 110;
      label = 'Supplier discount';
    } else if (eventRoll === 2) {
      delta = -90;
      label = 'Minor maintenance issue';
    } else {
      delta = -120;
      label = 'Unexpected operating expense';
    }

    const nextBudget = Math.max(0, this.sim.getBudget() + delta);
    this.sim.setBudget(nextBudget);
    this.recordEvent(day, `${label} (${delta >= 0 ? '+' : '-'}$${Math.abs(delta)})`, delta);
  }

  private updateHudEngagement(): void {
    const mission = this.engagement.currentMission;
    const weekly = this.engagement.currentWeeklyChallenge;
    const momentumSurgeMultiplier = computeMomentumSurgeMultiplier(this.engagement.momentumScore, this.engagement.stabilityScore);
    const resilienceBonusEstimate = computeResilienceBudgetBonus(
      this.engagement.consecutiveFailedMissions,
      this.engagement.assistModeActive,
      false,
    );
    const eventText = this.engagement.lastEventDay === this.gameTime.day
      ? this.engagement.lastEventText
      : 'No event';
    this.hud.setEngagementStatus({
      missionTitle: mission.title,
      missionProgress: mission.progress,
      missionGoal: mission.goal,
      missionCompleted: mission.completed,
      missionReward: mission.reward,
      weeklyTitle: weekly.title,
      weeklyProgress: weekly.progress,
      weeklyGoal: weekly.goal,
      weeklyCompleted: weekly.completed,
      weeklyReward: weekly.reward,
      eventText,
      eventHistory: this.engagement.eventHistory,
      streakDays: this.engagement.satisfactionStreakDays,
      missionsCompletedTotal: this.engagement.missionsCompleted,
      weeklyChallengesCompletedTotal: this.engagement.weeklyChallengesCompleted,
      peakVisitors: this.engagement.peakVisitors,
      dayBadgeActive: this.engagement.dayBadgeActive,
      weekBadgeActive: this.engagement.weekBadgeActive,
      weeklyRerollsLeft: Math.max(0, this.maxWeeklyRerolls() - this.engagement.weeklyRerollsUsedThisWeek),
      bestPeakVisitors: this.parkRecords.bestPeakVisitors,
      bestSatisfactionStreak: this.parkRecords.bestSatisfactionStreak,
      bestMissionsCompleted: this.parkRecords.bestMissionsCompleted,
      bestWeeklyChallengesCompleted: this.parkRecords.bestWeeklyChallengesCompleted,
      missionCompletionStreak: this.engagement.missionCompletionStreak,
      veteranTier: this.engagement.veteranTier,
      recoveryModeActive: mission.id === 'recovery_day',
      prestigeLevel: this.engagement.prestigeLevel,
      prestigePoints: this.engagement.prestigePoints,
      prestigePointsToNext: this.prestigePointsForNextLevel(),
      specialization: this.engagement.specialization,
      specializationProgress: this.engagement.specializationProgress,
      specializationGoal: this.engagement.specializationGoal,
      seasonalBadges: this.engagement.seasonalBadges,
      specializationBonusLabel: this.engagement.specialization === 'Operations'
        ? 'Ops bonus: +4% daily / +8% weekly rewards'
        : this.engagement.specialization === 'Guest Delight'
          ? 'Guest bonus: up to +5% daily / +10% weekly at 65% satisfaction'
          : 'Artist bonus: up to +6% daily / +11% weekly at 80% attractiveness',
      assistModeActive: this.engagement.assistModeActive,
      failedMissionStreak: this.engagement.consecutiveFailedMissions,
      weeklyFailGraceUsed: this.engagement.weeklyFailGraceUsedThisWeek,
      stabilityScore: this.engagement.stabilityScore,
      momentumScore: this.engagement.momentumScore,
      momentumSurgeMultiplier,
      resilienceBonusEstimate,
      mentorLevel: this.engagement.mentorLevel,
      mentorPoints: this.engagement.mentorPoints,
      mentorPointsToNext: this.mentorPointsToNextLevel(),
    });
  }

  private updateEngagementState(): void {
    const day = this.gameTime.day;
    const week = Math.floor(day / 7);

    this.applySeasonTransitionIfNeeded();

    if (week !== this.engagement.lastWeeklyChallengeWeek) {
      this.engagement.currentWeeklyChallenge = this.createWeeklyChallengeForWeek(week);
      this.engagement.missionsCompletedThisWeek = 0;
      this.engagement.weeklyRerollsUsedThisWeek = 0;
      this.engagement.weeklyFailGraceUsedThisWeek = false;
      this.engagement.lastWeeklyChallengeWeek = week;
      this.engagement.weekBadgeActive = day >= this.engagement.engagementCooldownUntilDay;
    }

    if (day !== this.engagement.lastMissionDay) {
      if (this.engagement.currentMission.completed) {
        this.engagement.missionCompletionStreak++;
        this.engagement.consecutiveFailedMissions = 0;
        this.engagement.assistModeActive = false;
      } else {
        this.engagement.missionCompletionStreak = 0;
        if (!this.engagement.weeklyFailGraceUsedThisWeek) {
          this.engagement.weeklyFailGraceUsedThisWeek = true;
          this.recordEvent(day, 'Weekly grace used: mission failure ignored', 0);
        } else {
          this.engagement.consecutiveFailedMissions++;
        }
        if (this.engagement.consecutiveFailedMissions >= 2) {
          this.engagement.assistModeActive = true;
        }
      }
      const sat = this.sim.getAvgSatisfaction();
      this.engagement.satisfactionStreakDays = sat >= 65
        ? this.engagement.satisfactionStreakDays + 1
        : 0;
      this.engagement.currentMission = this.createMissionForDay(day);
      this.engagement.lastMissionDay = day;
      this.engagement.dayBadgeActive = day >= this.engagement.engagementCooldownUntilDay;
      this.triggerDailyEvent(day);
    }

    const mission = this.engagement.currentMission;
    mission.progress = Math.max(mission.progress, this.getMissionProgress(mission.id));
    mission.completed = mission.progress >= mission.goal;

    if (mission.completed && !mission.rewardGranted) {
      const mentorMultiplier = computeMentorRewardMultiplier(this.engagement.mentorLevel);
      const momentumSurgeMultiplier = computeMomentumSurgeMultiplier(this.engagement.momentumScore, this.engagement.stabilityScore);
      const reward = Math.round(mission.reward * this.getSpecializationRewardMultiplier(false) * mentorMultiplier * momentumSurgeMultiplier);
      const comebackBonus = this.engagement.assistModeActive ? 80 : 0;
      const resilienceBonus = computeResilienceBudgetBonus(
        this.engagement.consecutiveFailedMissions,
        this.engagement.assistModeActive,
        false,
      );
      this.sim.setBudget(this.sim.getBudget() + reward + comebackBonus + resilienceBonus);
      mission.rewardGranted = true;
      this.engagement.missionsCompleted++;
      this.engagement.missionsCompletedThisWeek++;
      this.grantMentorPoints(false);
      if (this.engagement.assistModeActive) {
        this.engagement.assistModeActive = false;
        this.engagement.consecutiveFailedMissions = 0;
      }
    }

    const weekly = this.engagement.currentWeeklyChallenge;
    this.engagement.stabilityScore = this.computeStabilityScore();
    this.engagement.momentumScore = computeMomentumScore({
      missionCompletionStreak: this.engagement.missionCompletionStreak,
      satisfactionStreakDays: this.engagement.satisfactionStreakDays,
      stabilityScore: this.engagement.stabilityScore,
      consecutiveFailedMissions: this.engagement.consecutiveFailedMissions,
      weeklyChallengesCompleted: this.engagement.weeklyChallengesCompleted,
      assistModeActive: this.engagement.assistModeActive,
    });
    weekly.progress = Math.max(weekly.progress, this.getWeeklyProgress(weekly.id));
    const weeklyGraceThreshold = computeWeeklyGraceThreshold(
      weekly.goal,
      this.engagement.momentumScore,
      this.engagement.stabilityScore,
      this.engagement.assistModeActive,
    );
    weekly.completed = weekly.progress >= weekly.goal || (day % 7 === 6 && weekly.progress >= weeklyGraceThreshold);
    if (weekly.completed && !weekly.rewardGranted) {
      const mentorMultiplier = computeMentorRewardMultiplier(this.engagement.mentorLevel);
      const momentumSurgeMultiplier = computeMomentumSurgeMultiplier(this.engagement.momentumScore, this.engagement.stabilityScore);
      const reward = Math.round(weekly.reward * this.getSpecializationRewardMultiplier(true) * mentorMultiplier * momentumSurgeMultiplier);
      const resilienceBonus = computeResilienceBudgetBonus(
        this.engagement.consecutiveFailedMissions,
        this.engagement.assistModeActive,
        true,
      );
      this.sim.setBudget(this.sim.getBudget() + reward + resilienceBonus);
      weekly.rewardGranted = true;
      this.engagement.weeklyChallengesCompleted++;
      this.grantMentorPoints(true);

      let prestigeGain = 1;
      if (this.engagement.veteranTier === 'Tycoon') prestigeGain = 2;
      if (this.engagement.veteranTier === 'Legend') prestigeGain = 3;
      this.engagement.prestigePoints += prestigeGain;

      while (this.engagement.prestigePoints >= this.prestigePointsForNextLevel()) {
        this.engagement.prestigePoints -= this.prestigePointsForNextLevel();
        this.engagement.prestigeLevel++;
        const levelBonus = 200 + this.engagement.prestigeLevel * 60;
        this.sim.setBudget(this.sim.getBudget() + levelBonus);
      }
    }

    this.engagement.peakVisitors = Math.max(this.engagement.peakVisitors, this.sim.getActiveVisitors());
    this.updateSpecializationArc();
    this.engagement.veteranTier = this.computeVeteranTier();
    this.updateParkRecords();
  }

  private sanitizeEngagementState(snapshot: EngagementState | undefined): EngagementState {
    if (!snapshot) return this.createDefaultEngagementState(this.gameTime.day);

    const base = this.createDefaultEngagementState(this.gameTime.day);
    const mission = snapshot.currentMission;
    const weekly = snapshot.currentWeeklyChallenge;
    const validMissionId = mission?.id === 'build_attractions'
      || mission?.id === 'reach_visitors'
      || mission?.id === 'park_beauty'
      || mission?.id === 'recovery_day';
    const validWeeklyId = weekly?.id === 'weekly_visitors'
      || weekly?.id === 'weekly_attractiveness'
      || weekly?.id === 'weekly_missions';

    return {
      currentMission: validMissionId
        ? {
          id: mission.id,
          title: typeof mission.title === 'string' ? mission.title : base.currentMission.title,
          goal: Number.isFinite(mission.goal) ? Math.max(1, Math.floor(mission.goal)) : base.currentMission.goal,
          progress: Number.isFinite(mission.progress) ? Math.max(0, Math.floor(mission.progress)) : 0,
          reward: Number.isFinite(mission.reward) ? Math.max(0, Math.floor(mission.reward)) : base.currentMission.reward,
          dayAssigned: Number.isFinite(mission.dayAssigned) ? Math.max(0, Math.floor(mission.dayAssigned)) : this.gameTime.day,
          completed: !!mission.completed,
          rewardGranted: !!mission.rewardGranted,
        }
        : base.currentMission,
      currentWeeklyChallenge: validWeeklyId
        ? {
          id: weekly.id,
          title: typeof weekly.title === 'string' ? weekly.title : base.currentWeeklyChallenge.title,
          goal: Number.isFinite(weekly.goal) ? Math.max(1, Math.floor(weekly.goal)) : base.currentWeeklyChallenge.goal,
          progress: Number.isFinite(weekly.progress) ? Math.max(0, Math.floor(weekly.progress)) : 0,
          reward: Number.isFinite(weekly.reward) ? Math.max(0, Math.floor(weekly.reward)) : base.currentWeeklyChallenge.reward,
          weekAssigned: Number.isFinite(weekly.weekAssigned) ? Math.max(0, Math.floor(weekly.weekAssigned)) : Math.floor(this.gameTime.day / 7),
          completed: !!weekly.completed,
          rewardGranted: !!weekly.rewardGranted,
        }
        : base.currentWeeklyChallenge,
      missionsCompleted: Number.isFinite(snapshot.missionsCompleted) ? Math.max(0, Math.floor(snapshot.missionsCompleted)) : 0,
      missionsCompletedThisWeek: Number.isFinite(snapshot.missionsCompletedThisWeek) ? Math.max(0, Math.floor(snapshot.missionsCompletedThisWeek)) : 0,
      weeklyChallengesCompleted: Number.isFinite(snapshot.weeklyChallengesCompleted) ? Math.max(0, Math.floor(snapshot.weeklyChallengesCompleted)) : 0,
      satisfactionStreakDays: Number.isFinite(snapshot.satisfactionStreakDays) ? Math.max(0, Math.floor(snapshot.satisfactionStreakDays)) : 0,
      lastMissionDay: Number.isFinite(snapshot.lastMissionDay) ? Math.max(0, Math.floor(snapshot.lastMissionDay)) : this.gameTime.day,
      lastWeeklyChallengeWeek: Number.isFinite(snapshot.lastWeeklyChallengeWeek) ? Math.max(0, Math.floor(snapshot.lastWeeklyChallengeWeek)) : Math.floor(this.gameTime.day / 7),
      peakVisitors: Number.isFinite(snapshot.peakVisitors) ? Math.max(0, Math.floor(snapshot.peakVisitors)) : 0,
      lastEventText: typeof snapshot.lastEventText === 'string' ? snapshot.lastEventText : '',
      lastEventDay: Number.isFinite(snapshot.lastEventDay) ? Math.floor(snapshot.lastEventDay) : -1,
      eventHistory: Array.isArray(snapshot.eventHistory)
        ? snapshot.eventHistory
          .filter((entry) => entry && typeof entry === 'object')
          .map((entry) => {
            const row = entry as Partial<EventHistoryEntry>;
            const day = typeof row.day === 'number' ? row.day : NaN;
            const delta = typeof row.delta === 'number' ? row.delta : NaN;
            return {
              day: Number.isFinite(day) ? Math.max(0, Math.floor(day)) : this.gameTime.day,
              text: typeof row.text === 'string' ? row.text : 'No special event today',
              delta: Number.isFinite(delta) ? Math.floor(delta) : 0,
            };
          })
          .slice(-7)
        : [],
      dayBadgeActive: !!snapshot.dayBadgeActive,
      weekBadgeActive: !!snapshot.weekBadgeActive,
      weeklyRerollsUsedThisWeek: Number.isFinite(snapshot.weeklyRerollsUsedThisWeek)
        ? Math.max(0, Math.min(3, Math.floor(snapshot.weeklyRerollsUsedThisWeek)))
        : 0,
      missionCompletionStreak: Number.isFinite(snapshot.missionCompletionStreak)
        ? Math.max(0, Math.floor(snapshot.missionCompletionStreak))
        : 0,
      engagementCooldownUntilDay: Number.isFinite(snapshot.engagementCooldownUntilDay)
        ? Math.max(0, Math.floor(snapshot.engagementCooldownUntilDay))
        : 0,
      veteranTier: snapshot.veteranTier === 'Builder'
        || snapshot.veteranTier === 'Tycoon'
        || snapshot.veteranTier === 'Legend'
        ? snapshot.veteranTier
        : 'Rookie',
      prestigeLevel: Number.isFinite(snapshot.prestigeLevel)
        ? Math.max(0, Math.floor(snapshot.prestigeLevel))
        : 0,
      prestigePoints: Number.isFinite(snapshot.prestigePoints)
        ? Math.max(0, Math.floor(snapshot.prestigePoints))
        : 0,
      specialization: snapshot.specialization === 'Guest Delight'
        || snapshot.specialization === 'Park Artist'
        ? snapshot.specialization
        : 'Operations',
      specializationProgress: Number.isFinite(snapshot.specializationProgress)
        ? Math.max(0, Math.floor(snapshot.specializationProgress))
        : 0,
      specializationGoal: Number.isFinite(snapshot.specializationGoal)
        ? Math.max(1, Math.floor(snapshot.specializationGoal))
        : 6,
      currentSeasonKey: typeof snapshot.currentSeasonKey === 'string'
        ? snapshot.currentSeasonKey
        : this.getCurrentSeasonKey(),
      seasonalBadges: Array.isArray(snapshot.seasonalBadges)
        ? snapshot.seasonalBadges
          .filter((row) => typeof row === 'string')
          .slice(-8)
        : [],
      consecutiveFailedMissions: Number.isFinite(snapshot.consecutiveFailedMissions)
        ? Math.max(0, Math.floor(snapshot.consecutiveFailedMissions))
        : 0,
      assistModeActive: !!snapshot.assistModeActive,
      weeklyFailGraceUsedThisWeek: !!snapshot.weeklyFailGraceUsedThisWeek,
      stabilityScore: Number.isFinite(snapshot.stabilityScore)
        ? Math.max(0, Math.min(100, Math.floor(snapshot.stabilityScore)))
        : 50,
      momentumScore: Number.isFinite(snapshot.momentumScore)
        ? Math.max(0, Math.min(100, Math.floor(snapshot.momentumScore)))
        : 50,
      mentorLevel: Number.isFinite(snapshot.mentorLevel)
        ? Math.max(0, Math.min(5, Math.floor(snapshot.mentorLevel)))
        : 0,
      mentorPoints: Number.isFinite(snapshot.mentorPoints)
        ? Math.max(0, Math.floor(snapshot.mentorPoints))
        : 0,
    };
  }

  private applyProfile(container: HTMLElement, profile: GameProfile): void {
    this.profile = profile;
    container.dataset.uiMode = profile.uiMode;
    this.renderer.setQualityProfile(profile.quality);
    this.controller.setInputProfile({ touchGesturesEnabled: profile.input.touchGesturesEnabled });
    this.hud.setUiMode(profile.uiMode);
    this.hud.setTouchCameraControlsEnabled(profile.input.showOnScreenCameraControls);
    this.hud.setCameraControls({
      panByScreenDelta: (dx, dy) => this.controller.panCameraByScreenDelta(dx, dy),
      zoomByStep: (direction) => this.controller.zoomCameraByStep(direction),
      recenter: () => this.controller.resetCameraToParkCenter(),
    });
  }

  private sameProfile(a: GameProfile | null, b: GameProfile): boolean {
    if (!a) return false;
    return a.uiMode === b.uiMode
      && a.input.touchGesturesEnabled === b.input.touchGesturesEnabled
      && a.input.showOnScreenCameraControls === b.input.showOnScreenCameraControls
      && a.quality.tier === b.quality.tier
      && a.quality.waterAnimationDivisor === b.quality.waterAnimationDivisor
      && a.quality.attractionAnimationDivisor === b.quality.attractionAnimationDivisor
      && a.quality.weatherDensity === b.quality.weatherDensity
      && a.quality.thunderEnabled === b.quality.thunderEnabled;
  }

  async start(container: HTMLElement): Promise<void> {
    // Load WASM module
    this.sim = await this.loadWasm();

    this.resetSimulation(
      Math.min(2, ECONOMY.terrainLevelsUp),
      0,
      ECONOMY.startBudget,
      ECONOMY.defaultEntranceTicket,
    );

    // Init renderer
    this.renderer = new Renderer(container);
    await this.renderer.init(this.sim);
    const initialProfile = resolveGameProfile();
    container.dataset.uiMode = initialProfile.uiMode;
    this.renderer.setQualityProfile(initialProfile.quality);
    this.renderer.setWeather(this.weather.current);
    this.sim.setIsRaining(this.weather.current === 'rain' ? 1 : 0);

    // Init furniture system
    this.furniture = new FurnitureSystem();
    this.renderer.setFurniture(this.furniture);

    // Init scenery system
    this.scenery = new ScenerySystem();
    this.renderer.setScenery(this.scenery);

    // Init coaster track system
    this.coasterTracks = new CoasterTrackSystem(this.sim);
    this.renderer.setCoasterTracks(this.coasterTracks);

    // Init input
    this.controller = new BuildController(this.sim, this.renderer, this.gameTime);
    this.controller.setInputProfile({ touchGesturesEnabled: initialProfile.input.touchGesturesEnabled });
    this.controller.setFurniture(this.furniture);
    this.controller.setScenery(this.scenery);

    // Init HUD
    this.hud = new HUD(this.sim, this.controller, container, this.gameTime, this.weather, this.coasterTracks);
    this.engagement = this.createDefaultEngagementState(this.gameTime.day);
    this.readParkRecords();
    this.applyProfile(container, initialProfile);
    this.hud.onSpeedChange = (s) => { this.speed = s; };
    this.hud.onPauseChange = (p) => { this.paused = p; };
    this.hud.onSaveRequest = () => {
      this.saveGameToFile().catch((err: unknown) => {
        console.error('Failed to save game:', err);
        window.alert('Save failed. See console for details.');
      });
    };
    this.hud.onLoadRequest = () => {
      this.loadGameFromFile().catch((err: unknown) => {
        console.error('Failed to load game:', err);
        window.alert('Load failed. See console for details.');
      });
    };
    this.hud.onEngagementPanelViewed = () => {
      this.engagement.dayBadgeActive = false;
      this.engagement.weekBadgeActive = false;
      this.engagement.engagementCooldownUntilDay = this.gameTime.day + 2;
      this.updateHudEngagement();
    };
    this.hud.onWeeklyChallengeRerollRequest = () => {
      const result = this.rerollWeeklyChallenge();
      this.updateHudEngagement();
      return result;
    };
    this.controller.onSaveRequest = () => this.hud.onSaveRequest?.();
    this.controller.onLoadRequest = () => this.hud.onLoadRequest?.();
    this.updateHudEngagement();

    // Expose test hooks for e2e automation.
    (globalThis as Record<string, unknown>).__parkTest = {
      sim: this.sim,
      controller: this.controller,
      renderer: this.renderer,
      hud: this.hud,
      coasterTracks: this.coasterTracks,
      profile: this.profile,
    };

    // Keep UI/input/quality aligned with viewport and capabilities.
    let resizeTimeout: number | null = null;
    const reapplyProfile = () => {
      const next = resolveGameProfile();
      if (this.sameProfile(this.profile, next)) return;
      this.applyProfile(container, next);
    };
    const scheduleProfileUpdate = () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        resizeTimeout = null;
        reapplyProfile();
      }, 120);
    };
    window.addEventListener('resize', scheduleProfileUpdate);
    window.addEventListener('orientationchange', scheduleProfileUpdate);

    // Start loop
    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      if (!this.paused) {
        this.coasterTracks.pruneInvalidTracks();
        this.tickAccum += dt * this.speed;
        while (this.tickAccum >= this.TICK_RATE) {
          this.sim.tick();
          this.trackVisitorRideTransitions();
          this.furniture.tick(this.sim);
          this.gameTime.tick();
          if (this.weather.update(this.gameTime.day, this.gameTime.season)) {
            this.weather.applyToSim(this.sim);
            this.renderer.setWeather(this.weather.current);
            this.sim.setIsRaining(this.weather.current === 'rain' ? 1 : 0);
          }
          this.updateEngagementState();
          this.tickAccum -= this.TICK_RATE;
        }
      }

      this.renderer.update(this.paused);
      this.hud.refresh();
      this.updateHudEngagement();

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private trackVisitorRideTransitions(): void {
    for (let i = 0; i < 100; i++) {
      const state = this.sim.getVisitorState(i);
      const target = this.sim.getVisitorTarget(i);
      const prevState = this.vPrevState[i];
      const prevRideTarget = this.vPrevRideTarget[i];

      if (prevState === VisitorState.Riding && state !== VisitorState.Riding) {
        const attractionId = prevRideTarget >= 0 ? prevRideTarget : target;
        if (attractionId >= 0) {
          const cat = this.sim.getInstCategory(attractionId);
          const templateId = this.sim.getInstTemplateId(attractionId);
          const isStallLike = cat === 3 || cat === 4
            || templateId === BALLOON_STAND_TEMPLATE_ID
            || templateId === INFORMATION_STAND_TEMPLATE_ID;
          if (isStallLike) {
            this.furniture.onFoodDrinkComplete(this.sim, i);
          }
        }
      }

      this.vPrevState[i] = state;
      this.vPrevRideTarget[i] = state === VisitorState.Riding && target >= 0 ? target : -1;
    }
  }

  private async loadWasm(): Promise<SimExports> {
    const wasmUrl = 'simulation.wasm';
    const response = await fetch(wasmUrl);
    const bytes = await response.arrayBuffer();
    const memory = new WebAssembly.Memory({ initial: 64, maximum: 256 });

    // AssemblyScript requires specific imports
    const importObject = {
      env: {
        memory,
        abort: (msg: number, file: number, line: number, col: number) => {
          console.error(`WASM abort at ${file}:${line}:${col} — ${msg}`);
        },
        seed: () => Math.random(),
      },
    };

    const { instance } = await WebAssembly.instantiate(bytes, importObject);
    return instance.exports as unknown as SimExports;
  }

  private configureAttractions(): void {
    for (const attr of ATTRACTIONS) {
      this.sim.configureAttraction(
        attr.id,
        attr.footprint.w,
        attr.footprint.h,
        attr.buildPrice,
        attr.ticketPrice,
        attr.capacity,
        CATEGORY_MAP[attr.category] ?? 0,
        attr.appeal,
        attr.rideTicks,
        attr.monthlyOperatingCost,
        attr.requiredExcitement,
        attr.nauseaGain,
      );
    }
  }

  private resetSimulation(levelsUp: number, levelsDown: number, budget: number, entranceTicket: number): void {
    this.sim.configureTerrain(levelsUp, levelsDown);
    this.sim.initSimulation();
    this.configureAttractions();
    this.sim.setBudget(budget);
    this.sim.setEntranceTicket(entranceTicket);
    this.weather.applyToSim(this.sim);
  }

  private isSupportedSaveData(data: unknown): data is SaveData {
    if (!data || typeof data !== 'object') return false;
    const maybe = data as Partial<SaveData>;
    return maybe.version === SAVE_VERSION && !!maybe.sim && !!maybe.game && !!maybe.ts;
  }

  private collectEmployees(kind: 'mechanic' | 'cleaner' | 'security' | 'entertainer'): SavedEmployee {
    let count = 0;
    const areas: Array<Array<{ x: number; y: number }>> = [];

    if (kind === 'mechanic') count = this.sim.getMechanicCount();
    if (kind === 'cleaner') count = this.sim.getCleanerCount();
    if (kind === 'security') count = this.sim.getSecurityCount();
    if (kind === 'entertainer') count = this.sim.getEntertainerCount();

    for (let i = 0; i < count; i++) {
      let areaCount = 0;
      if (kind === 'mechanic') areaCount = this.sim.getMechanicAreaCount(i);
      if (kind === 'cleaner') areaCount = this.sim.getCleanerAreaCount(i);
      if (kind === 'security') areaCount = this.sim.getSecurityAreaCount(i);
      if (kind === 'entertainer') areaCount = this.sim.getEntertainerAreaCount(i);

      const row: Array<{ x: number; y: number }> = [];
      for (let j = 0; j < areaCount; j++) {
        let x = -1;
        let y = -1;
        if (kind === 'mechanic') {
          x = this.sim.getMechanicAreaX(i, j);
          y = this.sim.getMechanicAreaY(i, j);
        }
        if (kind === 'cleaner') {
          x = this.sim.getCleanerAreaX(i, j);
          y = this.sim.getCleanerAreaY(i, j);
        }
        if (kind === 'security') {
          x = this.sim.getSecurityAreaX(i, j);
          y = this.sim.getSecurityAreaY(i, j);
        }
        if (kind === 'entertainer') {
          x = this.sim.getEntertainerAreaX(i, j);
          y = this.sim.getEntertainerAreaY(i, j);
        }
        row.push({ x, y });
      }
      areas.push(row);
    }

    return { count, areas };
  }

  private applyEmployees(kind: 'mechanic' | 'cleaner' | 'security' | 'entertainer', saved: SavedEmployee): void {
    for (let i = 0; i < saved.count; i++) {
      if (kind === 'mechanic') this.sim.hireMechanic();
      if (kind === 'cleaner') this.sim.hireCleaner();
      if (kind === 'security') this.sim.hireSecurity();
      if (kind === 'entertainer') this.sim.hireEntertainer();
    }

    for (let i = 0; i < saved.areas.length; i++) {
      for (const area of saved.areas[i]) {
        if (kind === 'mechanic') this.sim.setMechanicArea(i, area.x, area.y);
        if (kind === 'cleaner') this.sim.setCleanerArea(i, area.x, area.y);
        if (kind === 'security') this.sim.setSecurityArea(i, area.x, area.y);
        if (kind === 'entertainer') this.sim.setEntertainerArea(i, area.x, area.y);
      }
    }
  }

  private remapHudMetadata(
    hud: SaveData['ts']['hud'],
    instanceMap: Map<number, number>,
  ): SaveData['ts']['hud'] {
    return {
      instanceNames: hud.instanceNames
        .filter((entry) => instanceMap.has(entry.id))
        .map((entry) => ({ id: instanceMap.get(entry.id)!, name: entry.name })),
      instanceBuildDates: hud.instanceBuildDates
        .filter((entry) => instanceMap.has(entry.id))
        .map((entry) => ({ id: instanceMap.get(entry.id)!, date: entry.date })),
      stallProductPrices: hud.stallProductPrices
        .filter((entry) => instanceMap.has(entry.id))
        .map((entry) => ({ id: instanceMap.get(entry.id)!, prices: [...entry.prices] })),
      stoppedAttractionCapacities: hud.stoppedAttractionCapacities
        .filter((entry) => instanceMap.has(entry.id))
        .map((entry) => ({ id: instanceMap.get(entry.id)!, capacity: entry.capacity })),
      employeeNamesByUid: hud.employeeNamesByUid,
      employeeHiredDateByUid: hud.employeeHiredDateByUid,
    };
  }

  private remapCoasterSnapshot(
    coaster: CoasterTrackSnapshot,
    instanceMap: Map<number, number>,
  ): CoasterTrackSnapshot {
    return {
      tracks: coaster.tracks
        .filter((track) => instanceMap.has(track.instanceId))
        .map((track) => ({ ...track, instanceId: instanceMap.get(track.instanceId)! })),
      activeBuild: coaster.activeBuild && instanceMap.has(coaster.activeBuild.instanceId)
        ? { ...coaster.activeBuild, instanceId: instanceMap.get(coaster.activeBuild.instanceId)! }
        : null,
    };
  }

  private buildSaveData(): SaveData {
    const tiles: number[] = [];
    const heights: number[] = [];
    const upperPaths: Array<{ x: number; y: number; height: number; variant: number }> = [];

    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        tiles.push(this.sim.tileAt(x, y));
        heights.push(this.sim.getTileHeight(x, y));

        const levels = this.sim.getPathLevelCount(x, y);
        for (let i = 0; i < levels; i++) {
          const variant = this.sim.getPathAtHeight(x, y, i);
          if (variant >= 0) {
            upperPaths.push({ x, y, height: i, variant });
          }
        }
      }
    }

    const attractions: SavedAttraction[] = [];
    const instanceCount = this.sim.getInstanceCount();
    for (let i = 0; i < instanceCount; i++) {
      if (this.sim.isInstActive(i) !== 1) continue;
      attractions.push({
        oldInstanceId: i,
        templateId: this.sim.getInstTemplateId(i),
        x: this.sim.getInstX(i),
        y: this.sim.getInstY(i),
        rotation: this.sim.getInstRotation(i),
        entryX: this.sim.getInstEntranceX(i),
        entryY: this.sim.getInstEntranceY(i),
        exitX: this.sim.getInstExitX(i),
        exitY: this.sim.getInstExitY(i),
        ticketPrice: this.sim.getInstTicketPrice(i),
        capacity: this.sim.getInstCapacity(i),
      });
    }

    return {
      version: SAVE_VERSION,
      createdAt: new Date().toISOString(),
      game: {
        speed: this.speed,
        paused: this.paused,
        tickAccum: this.tickAccum,
        vPrevState: Array.from(this.vPrevState),
        vPrevRideTarget: Array.from(this.vPrevRideTarget),
        gameTime: this.gameTime.getSnapshot(),
        weather: this.weather.getSnapshot(),
      },
      sim: {
        levelsUp: this.sim.getLevelsUp(),
        levelsDown: this.sim.getLevelsDown(),
        budget: this.sim.getBudget(),
        entranceTicket: this.sim.getEntranceTicket(),
        rngState: this.sim.getRngState(),
        tiles,
        heights,
        upperPaths,
        attractions,
        mechanics: this.collectEmployees('mechanic'),
        cleaners: this.collectEmployees('cleaner'),
        security: this.collectEmployees('security'),
        entertainers: this.collectEmployees('entertainer'),
      },
      ts: {
        furniture: this.furniture.getSnapshot(),
        scenery: this.scenery.getSnapshot(),
        coasterTracks: this.coasterTracks.getSnapshot(),
        hud: this.hud.getMetadataSnapshot(),
        controller: this.controller.getSnapshot(),
        renderer: this.renderer.getSnapshot(),
        engagement: this.engagement,
      },
    };
  }

  private restoreSaveData(data: SaveData): void {
    const wasPaused = this.paused;
    this.paused = true;

    this.hud.closeTransientDialogs();
    this.controller.selectTool(BuildTool.None);

    this.weather.restoreSnapshot(data.game.weather);
    this.resetSimulation(data.sim.levelsUp, data.sim.levelsDown, data.sim.budget, data.sim.entranceTicket);

    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const idx = y * MAP_W + x;
        const tile = data.sim.tiles[idx] ?? TileType.Empty;
        const targetHeight = data.sim.heights[idx] ?? this.sim.getBaseHeight();

        const currentHeight = this.sim.getTileHeight(x, y);
        const delta = targetHeight - currentHeight;
        if (delta !== 0) {
          this.sim.adjustTerrain(x, y, delta);
        }

        if (tile === TileType.PathMuddy) this.sim.placePathVariant(x, y, 0);
        if (tile === TileType.PathDesert) this.sim.placePathVariant(x, y, 1);
        if (tile === TileType.PathConcrete) this.sim.placePathVariant(x, y, 2);
        if (tile === TileType.PathQueue) this.sim.placePathVariant(x, y, 3);
        if (tile === TileType.TreePine) this.sim.placeTreeVariant(x, y, 0);
        if (tile === TileType.TreeBig) this.sim.placeTreeVariant(x, y, 1);
        if (tile === TileType.TreeSmall) this.sim.placeTreeVariant(x, y, 2);
        if (tile === TileType.Water) this.sim.placeWater(x, y);
        if (tile === TileType.LandGrass) this.sim.placeLandVariant(x, y, 0);
        if (tile === TileType.LandDesert) this.sim.placeLandVariant(x, y, 1);
        if (tile === TileType.LandMud) this.sim.placeLandVariant(x, y, 2);
        if (tile === TileType.LandDarkGrass) this.sim.placeLandVariant(x, y, 3);
      }
    }

    for (const path of data.sim.upperPaths) {
      this.sim.placePathAtHeight(path.x, path.y, path.height, path.variant);
    }

    this.furniture.restoreSnapshot(data.ts.furniture);
    this.scenery.restoreSnapshot(data.ts.scenery);

    const instanceMap = new Map<number, number>();
    for (const attr of data.sim.attractions) {
      let newId = -1;
      if (attr.entryX >= 0 && attr.entryY >= 0 && attr.exitX >= 0 && attr.exitY >= 0) {
        newId = this.sim.placeAttractionWithEndpointsRotated(
          attr.templateId,
          attr.x,
          attr.y,
          attr.entryX,
          attr.entryY,
          attr.exitX,
          attr.exitY,
          attr.rotation,
        );
      } else {
        newId = this.sim.placeAttractionRotated(attr.templateId, attr.x, attr.y, attr.rotation);
      }
      if (newId >= 0) {
        this.sim.setInstTicketPrice(newId, attr.ticketPrice);
        this.sim.setInstCapacity(newId, attr.capacity);
        instanceMap.set(attr.oldInstanceId, newId);
      }
    }

    this.applyEmployees('mechanic', data.sim.mechanics);
    this.applyEmployees('cleaner', data.sim.cleaners);
    this.applyEmployees('security', data.sim.security);
    if (data.sim.entertainers) {
      this.applyEmployees('entertainer', data.sim.entertainers);
    }

    this.sim.setRngState(data.sim.rngState);
    this.sim.setBudget(data.sim.budget);
    this.sim.setEntranceTicket(data.sim.entranceTicket);

    this.gameTime.restoreSnapshot(data.game.gameTime);
    this.weather.applyToSim(this.sim);
    this.renderer.setWeather(this.weather.current);
    this.sim.setIsRaining(this.weather.current === 'rain' ? 1 : 0);

    this.hud.restoreMetadataSnapshot(this.remapHudMetadata(data.ts.hud, instanceMap));
    this.coasterTracks.restoreSnapshot(this.remapCoasterSnapshot(data.ts.coasterTracks, instanceMap));
    this.controller.restoreSnapshot(data.ts.controller);
    this.renderer.restoreSnapshot(data.ts.renderer);
    this.engagement = this.sanitizeEngagementState(data.ts.engagement);

    this.speed = data.game.speed;
    this.tickAccum = data.game.tickAccum;
    this.vPrevState = new Uint8Array(data.game.vPrevState.slice(0, 100));
    this.vPrevRideTarget = new Int16Array(data.game.vPrevRideTarget.slice(0, 100));

    this.coasterTracks.pruneInvalidTracks();
    this.hud.refresh();
    this.updateHudEngagement();

    this.paused = data.game.paused;
    if (!data.game.paused) this.paused = wasPaused ? false : data.game.paused;
  }

  private async chooseLoadFile(): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.style.display = 'none';
      input.addEventListener('change', () => {
        const file = input.files && input.files.length > 0 ? input.files[0] : null;
        input.remove();
        resolve(file);
      });
      document.body.appendChild(input);
      input.click();
    });
  }

  async saveGameToFile(): Promise<void> {
    const data = this.buildSaveData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `park-save-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async loadGameFromFile(): Promise<void> {
    const file = await this.chooseLoadFile();
    if (!file) return;

    const text = await file.text();
    const parsed = JSON.parse(text) as unknown;
    if (!this.isSupportedSaveData(parsed)) {
      throw new Error('Unsupported or invalid save file format.');
    }

    this.restoreSaveData(parsed);
  }
}
