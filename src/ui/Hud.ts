/* =============================================
   Park Tycoon – HUD & Management UI
   Pure DOM overlay on top of WebGL canvas.
   Shows budget, visitor count, satisfaction,
   build tools, attraction shop, and entrance
   ticket configuration.
   ============================================= */

import { type SimExports, BuildTool } from '../game/types';
import { type BuildController, type EmployeeKind } from '../input/BuildController';
import ATTRACTIONS from '../game/config/attractions';
import { getSceneryDef, SCENERY_CATALOG } from '../game/config/scenery';
import { getTreeDef, TREE_CATALOG } from '../game/config/trees';
import { type GameTime } from '../game/GameTime';
import { type WeatherSystem } from '../game/Weather';
import {
  type CoasterTrackSystem,
  type RollerCoasterTrackData,
  TrackPieceType,
  TRACK_PIECE_DEFS,
} from '../game/RollerCoasterTrack';
import { isTrackAttraction, getTrackConfig } from '../game/config/tracks';
import { type UiMode } from '../game/uiMode';
import { createHudMarkup } from './hud/template';
import {
  BALLOON_STAND_TEMPLATE_ID,
  DEFAULT_ENGAGEMENT_SNAPSHOT,
  INFORMATION_STAND_TEMPLATE_ID,
  SHOP_TEMPLATE_IDS,
} from './hud/constants';
import { getStallCategory, STALL_PRODUCTS } from './hud/stallCatalog';
import type { AttractionTab, EngagementSnapshot } from './hud/types';
import {
  clearInstanceRuntimeState,
  getBuildDate,
  getMetadataSnapshot,
  instanceNames,
  recordBuildDate,
  restoreMetadataSnapshot,
  stallProductPricesByInstance,
  stoppedAttractionCapacities,
  type HudMetadataSnapshot,
} from './hud/metadataStore';
import {
  showAllGuestsDialog as showAllGuestsDialogImpl,
  showGuestDialog as showGuestDialogImpl,
} from './hud/dialogs/guestDialogs';
import { HudEmployeeDialogs } from './hud/dialogs/employeeDialogs';
import {
  showAttractionDialog as showAttractionDialogImpl,
  showAttractionsOverviewDialog as showAttractionsOverviewDialogImpl,
  showDemolishAttractionConfirm as showDemolishAttractionConfirmImpl,
} from './hud/dialogs/attractionDialogs';

export { recordBuildDate };

export class HUD {
  private static readonly COLLAPSE_STORAGE_KEY = 'rct.hud.panelsCollapsed';
  private static readonly BOTTOM_PANEL_STATE_STORAGE_KEY = 'rct.hud.bottomPanelState';
  private static readonly TOUCH_HINT_SEEN_KEY = 'rct.hud.touchHintSeen';

  private root: HTMLDivElement;
  private budgetEl!: HTMLSpanElement;
  private visitorsEl!: HTMLSpanElement;
  private satisfactionEl!: HTMLSpanElement;
  private hungerEl!: HTMLSpanElement;
  private thirstEl!: HTMLSpanElement;
  private bladderEl!: HTMLSpanElement;
  private incomeEl!: HTMLSpanElement;
  private expenseEl!: HTMLSpanElement;
  private toolIndicatorEl!: HTMLSpanElement;
  private levelIndicatorEl!: HTMLSpanElement;
  private attractionPanel!: HTMLDivElement;
  private tabBar!: HTMLDivElement;
  private buildTabBar!: HTMLDivElement;
  private activeBuildTab: 'land' | 'path' | 'trees' | 'scenery' | 'tools' = 'path';
  private speedBtn!: HTMLButtonElement;
  private pauseBtn!: HTMLButtonElement;
  private dateEl!: HTMLSpanElement;
  private weatherEl!: HTMLSpanElement;
  private missionEl!: HTMLSpanElement;
  private weeklyChallengeEl!: HTMLSpanElement;
  private eventEl!: HTMLSpanElement;
  private streakEl!: HTMLSpanElement;
  private engagementDetailsBtn!: HTMLButtonElement;
  private dayBadgeEl!: HTMLSpanElement;
  private weekBadgeEl!: HTMLSpanElement;
  private feedbackAlertEl!: HTMLDivElement;
  private mechanicsEl!: HTMLSpanElement;
  private cleanersEl!: HTMLSpanElement;
  private securityEl!: HTMLSpanElement;
  private entertainersEl!: HTMLSpanElement;
  private brokenEl!: HTMLSpanElement;
  private attractivenessEl!: HTMLSpanElement;
  private crimeEl!: HTMLSpanElement;
  private guestsBtn!: HTMLButtonElement;
  private mechanicsBtn!: HTMLButtonElement;
  private attractionsOverviewBtn!: HTMLButtonElement;
  private saveBtn!: HTMLButtonElement;
  private loadBtn!: HTMLButtonElement;
  private activeTab: AttractionTab = 'thrill';
  private dialogOverlay: HTMLDivElement | null = null;
  private trackDialogPosition: { left: number; top: number } | null = null;
  private readonly employeeNamesByUid: Map<string, string> = new Map();
  private readonly employeeHiredDateByUid: Map<string, string> = new Map();
  private readonly employeeDialogs: HudEmployeeDialogs;
  private buildDialogOpen = false;
  private buildDialogStatusEl: HTMLSpanElement | null = null;
  private buildDialogRotationEl: HTMLSpanElement | null = null;
  private uiMode: UiMode = 'desktop';
  private touchCameraControlsEnabled = false;
  private mobilePanelsCollapsed = false;
  private mobileToggleBtn: HTMLButtonElement | null = null;
  private mobileLaunchersEl: HTMLDivElement | null = null;
  private openBuildDialogBtn: HTMLButtonElement | null = null;
  private openCameraDialogBtn: HTMLButtonElement | null = null;
  private openPanelsDialogBtn: HTMLButtonElement | null = null;
  private toolsToggleBtn: HTMLButtonElement | null = null;
  private cameraToggleBtn: HTMLButtonElement | null = null;
  private attractionsToggleBtn: HTMLButtonElement | null = null;
  private peekPanelEl: HTMLDivElement | null = null;
  private peekBudgetEl: HTMLSpanElement | null = null;
  private peekVisitorsEl: HTMLSpanElement | null = null;
  private peekSatisfactionEl: HTMLSpanElement | null = null;
  private peekWeatherEl: HTMLSpanElement | null = null;
  private cameraControlsPanel: HTMLDivElement | null = null;
  private toolsPanelEl: HTMLDivElement | null = null;
  private attractionsPanelEl: HTMLDivElement | null = null;
  private toolsPanelCollapsed = false;
  private cameraPanelCollapsed = false;
  private attractionsPanelCollapsed = false;
  private touchHintEl: HTMLDivElement | null = null;
  private touchHintTimer: number | null = null;
  private feedbackHideTimer: number | null = null;
  private celebrationAudioContext: AudioContext | null = null;
  private cameraControls: {
    panByScreenDelta: (dx: number, dy: number) => void;
    zoomByStep: (direction: 1 | -1) => void;
    recenter: () => void;
  } | null = null;

  // Speed state
  onSpeedChange?: (speed: number) => void;
  onPauseChange?: (paused: boolean) => void;
  onSaveRequest?: () => void;
  onLoadRequest?: () => void;
  onEngagementPanelViewed?: () => void;
  onWeeklyChallengeRerollRequest?: () => { ok: boolean; message: string };
  private speed = 1;
  private paused = false;
  private engagementSnapshot: EngagementSnapshot = { ...DEFAULT_ENGAGEMENT_SNAPSHOT };

  constructor(
    private sim: SimExports,
    private controller: BuildController,
    container: HTMLElement,
    private gameTime: GameTime,
    private weather: WeatherSystem,
    private coasterTracks: CoasterTrackSystem,
  ) {
    this.employeeDialogs = new HudEmployeeDialogs({
      sim: this.sim,
      formatDate: () => this.gameTime.formatDate(),
      openDialog: (title, bodyHtml) => this.openDialog(title, bodyHtml),
      closeDialog: () => this.closeDialog(),
      refresh: () => this.refresh(),
      startEmployeeAreaAssignment: (callback) => this.controller.startEmployeeAreaAssignment(callback),
      cancelEmployeeAreaAssignment: () => this.controller.cancelEmployeeAreaAssignment(),
      showEmployeeDialog: (type, index) => this.showEmployeeDialog(type, index),
      showEmployeesDialog: () => this.showEmployeesDialog(),
      employeeNamesByUid: this.employeeNamesByUid,
      employeeHiredDateByUid: this.employeeHiredDateByUid,
    });
    this.root = document.createElement('div');
    this.root.id = 'hud';
    container.appendChild(this.root);
    this.build();
    this.bindController();
  }

  setUiMode(mode: UiMode): void {
    const wasTouchMode = this.isTouchMode();
    this.uiMode = mode;
    this.root.dataset.uiMode = mode;

    if (this.isTouchMode()) {
      const persisted = this.readPersistedCollapseState();
      const defaultCollapsed = mode === 'mobile';
      const shouldCollapse = mode === 'mobile' ? true : (persisted ?? defaultCollapsed);
      this.applyPanelCollapsedState(shouldCollapse);
    } else {
      this.applyPanelCollapsedState(false);
      this.hideTouchHint();
    }

    this.updateMobileToggleLabel();
    this.updateMobileLaunchersVisibility();
    this.updateCameraControlsVisibility();

    if (!wasTouchMode && this.isTouchMode()) {
      this.maybeShowTouchHint();
    }
  }

  setTouchCameraControlsEnabled(enabled: boolean): void {
    this.touchCameraControlsEnabled = enabled;
    this.updateCameraControlsVisibility();
  }

  setCameraControls(controls: {
    panByScreenDelta: (dx: number, dy: number) => void;
    zoomByStep: (direction: 1 | -1) => void;
    recenter: () => void;
  }): void {
    this.cameraControls = controls;
  }

  setEngagementStatus(status: EngagementSnapshot): void {
    const missionJustCompleted = !this.engagementSnapshot.missionCompleted && status.missionCompleted;
    const weeklyJustCompleted = !this.engagementSnapshot.weeklyCompleted && status.weeklyCompleted;

    this.engagementSnapshot = {
      ...status,
      eventHistory: status.eventHistory.slice(-7),
    };

    if (this.missionEl) {
      this.missionEl.textContent = status.missionCompleted
        ? `${status.missionTitle} (${status.missionGoal}/${status.missionGoal}) 🎉`
        : `${status.missionTitle} (${Math.min(status.missionProgress, status.missionGoal)}/${status.missionGoal})`;
      this.missionEl.className = status.missionCompleted ? 'hud-engagement-complete' : 'hud-engagement-active';
    }
    if (this.weeklyChallengeEl) {
      this.weeklyChallengeEl.textContent = status.weeklyCompleted
        ? `${status.weeklyTitle} (${status.weeklyGoal}/${status.weeklyGoal}) 🎉`
        : `${status.weeklyTitle} (${Math.min(status.weeklyProgress, status.weeklyGoal)}/${status.weeklyGoal})`;
      this.weeklyChallengeEl.className = status.weeklyCompleted ? 'hud-engagement-complete' : 'hud-engagement-active';
    }
    if (this.eventEl) {
      this.eventEl.textContent = status.eventText;
      this.eventEl.className = status.eventText === 'No event' || status.eventText === 'No special event today'
        ? 'hud-event-muted'
        : 'hud-event-active';
    }
    if (this.streakEl) {
      this.streakEl.textContent = `${status.streakDays} day${status.streakDays === 1 ? '' : 's'}`;
      this.streakEl.className = status.streakDays >= 3 ? 'val-good' : '';
    }

    if (this.dayBadgeEl) {
      this.dayBadgeEl.hidden = !status.dayBadgeActive;
    }
    if (this.weekBadgeEl) {
      this.weekBadgeEl.hidden = !status.weekBadgeActive;
    }

    if (missionJustCompleted && weeklyJustCompleted) {
      this.showObjectiveFeedback('🎉 Objective streak! Daily + Weekly completed!');
    } else if (missionJustCompleted) {
      this.showObjectiveFeedback('🎉 Daily objective completed!');
    } else if (weeklyJustCompleted) {
      this.showObjectiveFeedback('🎉 Weekly objective completed!');
    }
  }

  private showObjectiveFeedback(message: string): void {
    if (!this.feedbackAlertEl) return;

    this.feedbackAlertEl.textContent = message;
    this.feedbackAlertEl.hidden = false;
    this.feedbackAlertEl.classList.add('visible');

    this.playCelebrationSound();

    if (this.feedbackHideTimer !== null) {
      window.clearTimeout(this.feedbackHideTimer);
    }
    this.feedbackHideTimer = window.setTimeout(() => {
      this.feedbackAlertEl.classList.remove('visible');
      this.feedbackAlertEl.hidden = true;
      this.feedbackHideTimer = null;
    }, 3200);
  }

  private playCelebrationSound(): void {
    const AudioCtor = globalThis.AudioContext
      || (globalThis as typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    if (!this.celebrationAudioContext) {
      this.celebrationAudioContext = new AudioCtor();
    }
    const ctx = this.celebrationAudioContext;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    gain.connect(ctx.destination);

    const notes = [523.25, 659.25, 783.99];
    for (let i = 0; i < notes.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(notes[i], t + i * 0.05);
      osc.connect(gain);
      osc.start(t + i * 0.05);
      osc.stop(t + 0.25 + i * 0.05);
    }

    window.setTimeout(() => {
      gain.disconnect();
    }, 520);
  }

  private showEngagementDetailsDialog(): void {
    const s = this.engagementSnapshot;
    const missionProgress = Math.min(s.missionProgress, s.missionGoal);
    const weeklyProgress = Math.min(s.weeklyProgress, s.weeklyGoal);
    const missionPct = Math.min(100, Math.round((missionProgress / Math.max(1, s.missionGoal)) * 100));
    const weeklyPct = Math.min(100, Math.round((weeklyProgress / Math.max(1, s.weeklyGoal)) * 100));
    const objectiveStatus = s.missionCompleted || s.weeklyCompleted ? 'Completed 🎉' : 'In progress';
    const missionSteps = this.describeObjectiveSteps(s.missionTitle);
    const weeklySteps = this.describeObjectiveSteps(s.weeklyTitle);

    const objectiveMeters = `
      <div class="engagement-objective-card">
        <div class="dialog-row"><span class="label">Daily Objective</span><span class="${s.missionCompleted ? 'val-good' : ''}">${s.missionCompleted ? 'Completed 🎉' : 'In progress'}</span></div>
        <div class="dialog-row"><span>${s.missionTitle}</span></div>
        <div class="engagement-progress-track"><div class="engagement-progress-fill ${s.missionCompleted ? 'is-complete' : ''}" style="width:${missionPct}%"></div></div>
        <div class="dialog-row"><span class="label">Progress:</span><span>${missionProgress} / ${s.missionGoal}</span></div>
        <div class="dialog-row"><span class="label">Reward:</span><span>$${s.missionReward}</span></div>
      </div>
      <div class="engagement-objective-card">
        <div class="dialog-row"><span class="label">Weekly Objective</span><span class="${s.weeklyCompleted ? 'val-good' : ''}">${s.weeklyCompleted ? 'Completed 🎉' : 'In progress'}</span></div>
        <div class="dialog-row"><span>${s.weeklyTitle}</span></div>
        <div class="engagement-progress-track"><div class="engagement-progress-fill ${s.weeklyCompleted ? 'is-complete' : ''}" style="width:${weeklyPct}%"></div></div>
        <div class="dialog-row"><span class="label">Progress:</span><span>${weeklyProgress} / ${s.weeklyGoal}</span></div>
        <div class="dialog-row"><span class="label">Reward:</span><span>$${s.weeklyReward}</span></div>
      </div>
    `;

    const historyRows = s.eventHistory.length > 0
      ? `<ul class="engagement-event-list">${s.eventHistory.map((row) => {
        const sign = row.delta >= 0 ? '+' : '-';
        const amount = `$${Math.abs(row.delta)}`;
        return `<li><span class="label">Day ${row.day}</span><span>${row.text}</span><span class="${row.delta >= 0 ? 'val-good' : 'val-warn'}">${sign}${amount}</span></li>`;
      }).join('')}</ul>`
      : '<div class="guest-empty">No event history yet.</div>';

    const rerollDisabled = s.weeklyRerollsLeft <= 0 || s.weeklyCompleted;
    const showcase = [
      `Daily Missions Completed: ${s.missionsCompletedTotal}`,
      `Weekly Challenges Completed: ${s.weeklyChallengesCompletedTotal}`,
      `Peak Visitors This Run: ${s.peakVisitors}`,
    ];
    const seasonalBadgeRows = s.seasonalBadges.length > 0
      ? `<ul class="engagement-showcase-list">${s.seasonalBadges.map((badge) => `<li>${badge}</li>`).join('')}</ul>`
      : '<div class="guest-empty">No seasonal badges yet.</div>';

    const box = this.openDialog('🎯 Objectives & Events', `
      <div class="dialog-tabs">
        <button class="dialog-tab-btn objective-tab-btn" data-objective-tab="guide">Mission Guide</button>
        <button class="dialog-tab-btn objective-tab-btn" data-objective-tab="progress">Progress</button>
        <button class="dialog-tab-btn objective-tab-btn" data-objective-tab="stats">Stats</button>
      </div>

      <div class="objective-tab-panel" data-objective-panel="guide">
        <div class="dialog-row"><span class="label">Objective Status:</span><span class="${s.missionCompleted || s.weeklyCompleted ? 'val-good' : ''}">${objectiveStatus}</span></div>
        <div class="dialog-row"><span class="label">Daily Mission:</span><span>${s.missionTitle}</span></div>
        <div class="dialog-row"><span class="label">How to complete it:</span></div>
        <ul class="guest-item-list">${missionSteps.map((step) => `<li>${step}</li>`).join('')}</ul>
        <div class="dialog-row"><span class="label">Daily Progress:</span><span>${missionProgress} / ${s.missionGoal}</span></div>

        <div class="dialog-row" style="margin-top:8px;"><span class="label">Weekly Challenge:</span><span>${s.weeklyTitle}</span></div>
        <div class="dialog-row"><span class="label">How to complete it:</span></div>
        <ul class="guest-item-list">${weeklySteps.map((step) => `<li>${step}</li>`).join('')}</ul>
        <div class="dialog-row"><span class="label">Weekly Progress:</span><span>${weeklyProgress} / ${s.weeklyGoal}</span></div>
      </div>

      <div class="objective-tab-panel" data-objective-panel="progress" hidden>
        <div class="engagement-objective-grid">
          ${objectiveMeters}
        </div>
        <div class="dialog-row" style="justify-content:space-between;align-items:center;gap:8px;">
          <button class="dialog-save-btn" id="dlg-weekly-reroll" ${rerollDisabled ? 'disabled' : ''}>🔁 Reroll Weekly (${s.weeklyRerollsLeft} left)</button>
          <span id="dlg-weekly-reroll-status" class="label"></span>
        </div>
        <div class="dialog-row"><span class="label">Current Event:</span><span>${s.eventText}</span></div>
        <div class="dialog-row"><span class="label">Satisfaction Streak:</span><span>${s.streakDays} day${s.streakDays === 1 ? '' : 's'}</span></div>
        <div class="dialog-row"><span class="label">Mission Win Streak:</span><span>${s.missionCompletionStreak} day${s.missionCompletionStreak === 1 ? '' : 's'}</span></div>
        <div class="dialog-row"><span class="label">Pacing Mode:</span><span>${s.recoveryModeActive ? 'Recovery Day Active' : 'Standard Challenge'}</span></div>
      </div>

      <div class="objective-tab-panel" data-objective-panel="stats" hidden>
        <div class="dialog-row"><span class="label">Veteran Tier:</span><span>${s.veteranTier}</span></div>
        <div class="dialog-row"><span class="label">Prestige:</span><span>Level ${s.prestigeLevel}</span></div>
        <div class="dialog-row"><span class="label">Prestige Points:</span><span>${s.prestigePoints} / ${s.prestigePointsToNext}</span></div>
        <div class="dialog-row"><span class="label">Specialization:</span><span>${s.specialization}</span></div>
        <div class="dialog-row"><span class="label">Spec Progress:</span><span>${Math.min(s.specializationProgress, s.specializationGoal)} / ${s.specializationGoal}</span></div>
        <div class="dialog-row"><span class="label">Spec Bonus:</span><span>${s.specializationBonusLabel}</span></div>
        <div class="dialog-row"><span class="label">Assist Mode:</span><span>${s.assistModeActive ? 'Active (comeback support)' : 'Inactive'}</span></div>
        <div class="dialog-row"><span class="label">Failed Missions:</span><span>${s.failedMissionStreak}</span></div>
        <div class="dialog-row"><span class="label">Weekly Grace:</span><span>${s.weeklyFailGraceUsed ? 'Used' : 'Available'}</span></div>
        <div class="dialog-row"><span class="label">Stability Score:</span><span>${s.stabilityScore}/100</span></div>
        <div class="dialog-row"><span class="label">Momentum Score:</span><span>${s.momentumScore}/100</span></div>
        <div class="dialog-row"><span class="label">Momentum Surge:</span><span>x${s.momentumSurgeMultiplier.toFixed(2)}</span></div>
        <div class="dialog-row"><span class="label">Resilience Bonus:</span><span>$${s.resilienceBonusEstimate}</span></div>
        <div class="dialog-row"><span class="label">Mentor Level:</span><span>${s.mentorLevel}</span></div>
        <div class="dialog-row"><span class="label">Mentor Points:</span><span>${s.mentorPoints} / ${s.mentorPointsToNext}</span></div>
        <div class="dialog-row"><span class="label">Missions Completed:</span><span>${s.missionsCompletedTotal}</span></div>
        <div class="dialog-row"><span class="label">Weekly Challenges:</span><span>${s.weeklyChallengesCompletedTotal}</span></div>
        <div class="dialog-row"><span class="label">Peak Visitors:</span><span>${s.peakVisitors}</span></div>
        <div class="dialog-row"><span class="label">Season Showcase:</span></div>
        <ul class="engagement-showcase-list">${showcase.map((item) => `<li>${item}</li>`).join('')}</ul>
        <div class="dialog-row"><span class="label">Seasonal Badges:</span></div>
        ${seasonalBadgeRows}
        <div class="dialog-row"><span class="label">Personal Bests:</span></div>
        <div class="dialog-row"><span class="label">Peak Visitors:</span><span>${s.peakVisitors} / best ${s.bestPeakVisitors}</span></div>
        <div class="dialog-row"><span class="label">Best Streak:</span><span>${s.streakDays} / best ${s.bestSatisfactionStreak}</span></div>
        <div class="dialog-row"><span class="label">Missions:</span><span>${s.missionsCompletedTotal} / best ${s.bestMissionsCompleted}</span></div>
        <div class="dialog-row"><span class="label">Weekly Wins:</span><span>${s.weeklyChallengesCompletedTotal} / best ${s.bestWeeklyChallengesCompleted}</span></div>
        <div class="dialog-row"><span class="label">Last 7-Day Events:</span></div>
        ${historyRows}
      </div>
    `);

    this.wireDialogTabs(box, '.objective-tab-btn', '.objective-tab-panel', 'objectiveTab', 'objectivePanel', 'guide');

    box.querySelector('#dlg-weekly-reroll')?.addEventListener('click', () => {
      const result = this.onWeeklyChallengeRerollRequest?.();
      const statusEl = box.querySelector('#dlg-weekly-reroll-status') as HTMLSpanElement | null;
      if (statusEl && result) {
        statusEl.textContent = result.message;
        statusEl.className = result.ok ? 'val-good' : 'val-warn';
      }
      if (result?.ok) {
        this.showEngagementDetailsDialog();
      }
    });

    this.onEngagementPanelViewed?.();
  }

  private describeObjectiveSteps(title: string): string[] {
    const normalized = title.toLowerCase();
    const steps: string[] = [];

    if (normalized.includes('build')) {
      steps.push('Open Build and place the required attraction or decoration types.');
      steps.push('Check mission progress in this dialog after each placement.');
    }
    if (normalized.includes('visitor') || normalized.includes('guest')) {
      steps.push('Increase appeal and capacity to attract more guests into the park.');
      steps.push('Use Attractions and Staff dialogs to remove bottlenecks and keep queues moving.');
    }
    if (normalized.includes('satisfaction') || normalized.includes('happy')) {
      steps.push('Keep hunger, thirst, bladder, and nausea low by adding utilities and paths.');
      steps.push('Fix broken rides quickly and avoid long queue times to maintain happiness.');
    }
    if (normalized.includes('revenue') || normalized.includes('profit') || normalized.includes('income')) {
      steps.push('Adjust ticket and stall prices, then monitor monthly revenue in attraction stats.');
      steps.push('Limit operating costs by removing underperforming rides.');
    }

    if (steps.length === 0) {
      steps.push('Follow the objective title exactly and target the required count shown in progress.');
      steps.push('Use the relevant management dialog to track what is missing before day end.');
    }

    return steps;
  }

  private showStatisticsDialog(): void {
    const wi = this.weather.info;
    const box = this.openDialog('📊 Park Statistics', `
      <div class="dialog-row"><span class="label">Budget:</span><span>$${this.sim.getBudget()}</span></div>
      <div class="dialog-row"><span class="label">Visitors:</span><span>${this.sim.getActiveVisitors()} / 100</span></div>
      <div class="dialog-row"><span class="label">Satisfaction:</span><span>${this.sim.getAvgSatisfaction()}%</span></div>
      <div class="dialog-row"><span class="label">Hunger:</span><span>${this.sim.getAvgHunger()}%</span></div>
      <div class="dialog-row"><span class="label">Thirst:</span><span>${this.sim.getAvgThirst()}%</span></div>
      <div class="dialog-row"><span class="label">Bladder:</span><span>${this.sim.getAvgBladder()}%</span></div>
      <div class="dialog-row"><span class="label">Mechanics:</span><span>${this.sim.getMechanicCount()}</span></div>
      <div class="dialog-row"><span class="label">Cleaners:</span><span>${this.sim.getCleanerCount()}</span></div>
      <div class="dialog-row"><span class="label">Security:</span><span>${this.sim.getSecurityCount()}</span></div>
      <div class="dialog-row"><span class="label">Entertainers:</span><span>${this.sim.getEntertainerCount()}</span></div>
      <div class="dialog-row"><span class="label">Broken:</span><span>${this.sim.getBrokenAttractionCount()}</span></div>
      <div class="dialog-row"><span class="label">Attractiveness:</span><span>${this.sim.getParkAttractiveness()}%</span></div>
      <div class="dialog-row"><span class="label">Crime:</span><span>${this.sim.getTheftCount()} theft / ${this.sim.getVandalismCount()} vandal</span></div>
      <div class="dialog-row"><span class="label">Income:</span><span>$${this.sim.getTotalIncome()}</span></div>
      <div class="dialog-row"><span class="label">Expenses:</span><span>$${this.sim.getTotalExpense()}</span></div>
      <div class="dialog-row"><span class="label">Date:</span><span>${this.gameTime.formatDate()}</span></div>
      <div class="dialog-row"><span class="label">Weather:</span><span>${wi.icon} ${wi.label}</span></div>
      <div class="dialog-row" style="margin-top:8px;flex-wrap:wrap;gap:6px;">
        <button class="dialog-save-btn" id="dlg-stats-guests" type="button">Guests</button>
        <button class="dialog-save-btn" id="dlg-stats-employees" type="button">Employees</button>
        <button class="dialog-save-btn" id="dlg-stats-attractions" type="button">Attractions</button>
      </div>
    `);

    box.querySelector('#dlg-stats-guests')?.addEventListener('click', () => this.showAllGuestsDialog());
    box.querySelector('#dlg-stats-employees')?.addEventListener('click', () => this.showEmployeesDialog());
    box.querySelector('#dlg-stats-attractions')?.addEventListener('click', () => this.showAttractionsOverviewDialog());
  }

  private selectToolFromDialog(tool: string, variantRaw: string | undefined): void {
    const variant = parseInt(variantRaw ?? '0', 10);
    if (tool === 'path') this.controller.selectTool(BuildTool.Path, -1, variant);
    else if (tool === 'land') this.controller.selectTool(BuildTool.Land, -1, variant);
    else if (tool === 'tree') this.controller.selectTool(BuildTool.Tree, -1, variant);
    else if (tool === 'scenery') this.controller.selectTool(BuildTool.Scenery, -1, variant);
    else if (tool === 'terrain') this.controller.selectTool(BuildTool.Terrain);
    else if (tool === 'water') this.controller.selectTool(BuildTool.Water);
    else if (tool === 'pickup') this.controller.selectTool(BuildTool.Pickup);
    else if (tool === 'bench') this.controller.selectTool(BuildTool.Bench);
    else if (tool === 'trashcan') this.controller.selectTool(BuildTool.TrashCan);
    else if (tool === 'demolish') this.controller.selectTool(BuildTool.Demolish);
    else if (tool === 'select') this.controller.selectTool(BuildTool.Select);
    else this.controller.selectTool(BuildTool.None);
  }

  private showBuildToolsDialog(): void {
    const treeButtons = TREE_CATALOG
      .map((item) => `<button class="tool-btn hud-dialog-tool-btn" data-tool="tree" data-variant="${item.id}" type="button">${item.icon} ${item.name}</button>`)
      .join('');
    const sceneryButtons = SCENERY_CATALOG
      .map((item) => `<button class="tool-btn hud-dialog-tool-btn" data-tool="scenery" data-variant="${item.id}" type="button">${item.icon} ${item.name}</button>`)
      .join('');

    const box = this.openDialog('🛠 Build', `
      <div class="hud-build-tabs" id="hud-dialog-build-tabs">
        <button class="build-tab-btn active" data-build-tab="land" type="button">Land</button>
        <button class="build-tab-btn" data-build-tab="path" type="button">Path</button>
        <button class="build-tab-btn" data-build-tab="trees" type="button">Trees</button>
        <button class="build-tab-btn" data-build-tab="scenery" type="button">Scenery</button>
        <button class="build-tab-btn" data-build-tab="tools" type="button">Tools</button>
      </div>
      <div class="hud-build-groups" id="hud-dialog-build-groups" style="margin-top:8px;">
        <div class="build-group" data-build-group="land">
          <button class="tool-btn hud-dialog-tool-btn" data-tool="land" data-variant="0" type="button">🟩 Grass</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="land" data-variant="1" type="button">🟨 Desert</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="land" data-variant="2" type="button">🟫 Mud</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="land" data-variant="3" type="button">🟩 Dark Grass</button>
        </div>
        <div class="build-group" data-build-group="path" hidden>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="path" data-variant="0" type="button">🟫 Mud Path</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="path" data-variant="1" type="button">🟨 Desert Path</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="path" data-variant="2" type="button">⬜ Concrete Path</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="path" data-variant="3" type="button">🟪 Queue Path</button>
        </div>
        <div class="build-group" data-build-group="trees" hidden>
          ${treeButtons}
        </div>
        <div class="build-group" data-build-group="scenery" hidden>
          ${sceneryButtons}
        </div>
        <div class="build-group" data-build-group="tools" hidden>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="terrain" type="button">⛰ Terrain</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="water" type="button">💧 Water</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="pickup" type="button">✋ Pickup</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="bench" type="button">🪑 Bench</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="trashcan" type="button">🗑 Trash Can</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="demolish" type="button">🔨 Demolish</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="select" type="button">🔍 Select</button>
          <button class="tool-btn hud-dialog-tool-btn" data-tool="none" type="button">❌ Cancel</button>
        </div>
      </div>
    `);

    box.querySelectorAll<HTMLButtonElement>('.build-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.buildTab;
        if (!tab) return;
        box.querySelectorAll<HTMLButtonElement>('.build-tab-btn').forEach((it) => {
          it.classList.toggle('active', it === btn);
        });
        box.querySelectorAll<HTMLElement>('.build-group').forEach((group) => {
          group.hidden = group.dataset.buildGroup !== tab;
        });
      });
    });

    box.querySelectorAll<HTMLButtonElement>('.hud-dialog-tool-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if (!tool) return;
        this.selectToolFromDialog(tool, btn.dataset.variant);
        this.closeDialog();
      });
    });
  }

  private showCameraDialog(): void {
    const panStep = 44;
    const box = this.openDialog('🎥 Camera', `
      <div class="hud-camera-grid" style="margin-top:2px;">
        <button class="tool-btn" id="dlg-cam-up" type="button">↑</button>
        <button class="tool-btn" id="dlg-cam-left" type="button">←</button>
        <button class="tool-btn" id="dlg-cam-recenter" type="button">◎</button>
        <button class="tool-btn" id="dlg-cam-right" type="button">→</button>
        <button class="tool-btn" id="dlg-cam-down" type="button">↓</button>
        <button class="tool-btn" id="dlg-cam-zoom-in" type="button">＋</button>
        <button class="tool-btn" id="dlg-cam-zoom-out" type="button">－</button>
      </div>
    `);

    box.querySelector('#dlg-cam-up')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(0, -panStep));
    box.querySelector('#dlg-cam-down')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(0, panStep));
    box.querySelector('#dlg-cam-left')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(-panStep, 0));
    box.querySelector('#dlg-cam-right')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(panStep, 0));
    box.querySelector('#dlg-cam-zoom-in')?.addEventListener('click', () => this.cameraControls?.zoomByStep(1));
    box.querySelector('#dlg-cam-zoom-out')?.addEventListener('click', () => this.cameraControls?.zoomByStep(-1));
    box.querySelector('#dlg-cam-recenter')?.addEventListener('click', () => this.cameraControls?.recenter());
  }

  private showPanelsDialog(): void {
    const box = this.openDialog('📋 Panels', `
      <div class="dialog-row" style="flex-wrap:wrap;gap:6px;">
        <button class="dialog-save-btn" id="dlg-panels-guests" type="button">Guests</button>
        <button class="dialog-save-btn" id="dlg-panels-employees" type="button">Employees</button>
        <button class="dialog-save-btn" id="dlg-panels-attractions" type="button">Attractions</button>
      </div>
      <div class="dialog-row" style="flex-wrap:wrap;gap:6px;">
        <button class="dialog-save-btn" id="dlg-panels-save" type="button">Save</button>
        <button class="dialog-save-btn" id="dlg-panels-load" type="button">Load</button>
        <button class="dialog-save-btn" id="dlg-panels-objectives" type="button">Objectives</button>
      </div>
    `);

    box.querySelector('#dlg-panels-guests')?.addEventListener('click', () => this.showAllGuestsDialog());
    box.querySelector('#dlg-panels-employees')?.addEventListener('click', () => this.showEmployeesDialog());
    box.querySelector('#dlg-panels-attractions')?.addEventListener('click', () => this.showAttractionsOverviewDialog());
    box.querySelector('#dlg-panels-save')?.addEventListener('click', () => this.onSaveRequest?.());
    box.querySelector('#dlg-panels-load')?.addEventListener('click', () => this.onLoadRequest?.());
    box.querySelector('#dlg-panels-objectives')?.addEventListener('click', () => this.showEngagementDetailsDialog());
  }

  private updateMobileToggleLabel(): void {
    if (!this.mobileToggleBtn) return;
    if (this.uiMode === 'mobile') {
      this.mobileToggleBtn.hidden = true;
      return;
    }
    this.mobileToggleBtn.hidden = false;
    this.mobileToggleBtn.textContent = this.mobilePanelsCollapsed ? 'Show Panels' : 'Hide Panels';
  }

  private updateMobileLaunchersVisibility(): void {
    if (!this.mobileLaunchersEl) return;
    this.mobileLaunchersEl.hidden = this.uiMode !== 'mobile';
  }

  private updatePanelToggleLabel(button: HTMLButtonElement | null, collapsed: boolean): void {
    if (!button) return;
    button.textContent = collapsed ? 'Show' : 'Hide';
    button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  }

  private updatePeekVisibility(): void {
    if (!this.peekPanelEl) return;
    const show = this.uiMode === 'mobile';
    this.peekPanelEl.hidden = !show;
    this.peekPanelEl.classList.toggle('visible', show);
  }

  private updateCameraControlsVisibility(): void {
    if (!this.cameraControlsPanel) return;
    const show = this.touchCameraControlsEnabled && this.uiMode !== 'desktop';
    this.cameraControlsPanel.hidden = !show;

    if (show) {
      this.maybeShowTouchHint();
    } else {
      this.hideTouchHint();
    }
  }

  private isTouchMode(): boolean {
    return this.uiMode === 'mobile' || this.uiMode === 'tablet';
  }

  private applyPanelCollapsedState(collapsed: boolean): void {
    this.mobilePanelsCollapsed = collapsed;
    this.root.classList.toggle('hud-panels-collapsed', collapsed);
    this.updateMobileToggleLabel();
    this.updateMobileLaunchersVisibility();
    this.updatePeekVisibility();
  }

  private applyBottomPanelCollapsedState(panel: 'tools' | 'camera' | 'attractions', collapsed: boolean): void {
    if (panel === 'tools') {
      this.toolsPanelCollapsed = collapsed;
      this.toolsPanelEl?.classList.toggle('is-collapsed', collapsed);
      this.updatePanelToggleLabel(this.toolsToggleBtn, collapsed);
    } else if (panel === 'camera') {
      this.cameraPanelCollapsed = collapsed;
      this.cameraControlsPanel?.classList.toggle('is-collapsed', collapsed);
      this.updatePanelToggleLabel(this.cameraToggleBtn, collapsed);
    } else {
      this.attractionsPanelCollapsed = collapsed;
      this.attractionsPanelEl?.classList.toggle('is-collapsed', collapsed);
      this.updatePanelToggleLabel(this.attractionsToggleBtn, collapsed);
    }
  }

  private readPersistedCollapseState(): boolean | null {
    try {
      const raw = window.localStorage.getItem(HUD.COLLAPSE_STORAGE_KEY);
      if (raw === null) return null;
      return raw === 'true';
    } catch {
      return null;
    }
  }

  private readPersistedBottomPanelCollapseState(): {
    tools?: boolean;
    camera?: boolean;
    attractions?: boolean;
  } | null {
    try {
      const raw = window.localStorage.getItem(HUD.BOTTOM_PANEL_STATE_STORAGE_KEY);
      if (raw === null) return null;
      const parsed = JSON.parse(raw) as unknown;
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed as { tools?: boolean; camera?: boolean; attractions?: boolean };
    } catch {
      return null;
    }
  }

  private persistCollapseState(): void {
    try {
      window.localStorage.setItem(HUD.COLLAPSE_STORAGE_KEY, this.mobilePanelsCollapsed ? 'true' : 'false');
    } catch {
      // Ignore storage errors (private mode / disabled storage).
    }
  }

  private persistBottomPanelCollapseState(): void {
    try {
      window.localStorage.setItem(
        HUD.BOTTOM_PANEL_STATE_STORAGE_KEY,
        JSON.stringify({
          tools: this.toolsPanelCollapsed,
          camera: this.cameraPanelCollapsed,
          attractions: this.attractionsPanelCollapsed,
        }),
      );
    } catch {
      // Ignore storage errors (private mode / disabled storage).
    }
  }

  private wireDialogTabs(
    container: ParentNode,
    buttonSelector: string,
    panelSelector: string,
    buttonDataAttr: string,
    panelDataAttr: string,
    defaultTab: string,
  ): void {
    const tabButtons = Array.from(container.querySelectorAll<HTMLButtonElement>(buttonSelector));
    const tabPanels = Array.from(container.querySelectorAll<HTMLElement>(panelSelector));
    if (tabButtons.length === 0 || tabPanels.length === 0) return;

    const activateTab = (tab: string): void => {
      for (const btn of tabButtons) {
        const isActive = btn.dataset[buttonDataAttr] === tab;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.tabIndex = isActive ? 0 : -1;
      }
      for (const panel of tabPanels) {
        panel.hidden = panel.dataset[panelDataAttr] !== tab;
      }
    };

    for (const btn of tabButtons) {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.tabIndex = -1;
      btn.addEventListener('click', () => {
        const tab = btn.dataset[buttonDataAttr];
        if (tab) {
          activateTab(tab);
        }
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
        e.preventDefault();
        const currentIndex = tabButtons.indexOf(btn);
        if (currentIndex < 0) return;

        let nextIndex = currentIndex;
        if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabButtons.length;
        else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        else if (e.key === 'Home') nextIndex = 0;
        else if (e.key === 'End') nextIndex = tabButtons.length - 1;

        const nextButton = tabButtons[nextIndex];
        const tab = nextButton.dataset[buttonDataAttr];
        if (!tab) return;
        activateTab(tab);
        nextButton.focus();
      });
    }

    tabButtons[0].closest('.dialog-tabs')?.setAttribute('role', 'tablist');
    activateTab(defaultTab);
  }

  private hasSeenTouchHint(): boolean {
    try {
      return window.localStorage.getItem(HUD.TOUCH_HINT_SEEN_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private markTouchHintSeen(): void {
    try {
      window.localStorage.setItem(HUD.TOUCH_HINT_SEEN_KEY, 'true');
    } catch {
      // Ignore storage errors.
    }
  }

  private hideTouchHint(markSeen: boolean = false): void {
    if (this.touchHintTimer !== null) {
      window.clearTimeout(this.touchHintTimer);
      this.touchHintTimer = null;
    }
    if (this.touchHintEl) {
      this.touchHintEl.classList.remove('visible');
      this.touchHintEl.hidden = true;
    }
    if (markSeen) {
      this.markTouchHintSeen();
    }
  }

  private maybeShowTouchHint(): void {
    if (!this.touchHintEl) return;
    if (!this.isTouchMode() || !this.touchCameraControlsEnabled) return;
    if (this.hasSeenTouchHint()) return;

    this.touchHintEl.hidden = false;
    this.touchHintEl.classList.add('visible');
    if (this.touchHintTimer !== null) {
      window.clearTimeout(this.touchHintTimer);
    }
    this.touchHintTimer = window.setTimeout(() => {
      this.hideTouchHint(true);
    }, 8500);
  }

  private build(): void {
    this.root.innerHTML = createHudMarkup(TREE_CATALOG, SCENERY_CATALOG);

    // Cache DOM refs
    this.budgetEl = this.root.querySelector('#hud-budget')!;
    this.visitorsEl = this.root.querySelector('#hud-visitors')!;
    this.satisfactionEl = this.root.querySelector('#hud-satisfaction')!;
    this.hungerEl = this.root.querySelector('#hud-hunger')!;
    this.thirstEl = this.root.querySelector('#hud-thirst')!;
    this.bladderEl = this.root.querySelector('#hud-bladder')!;
    this.incomeEl = this.root.querySelector('#hud-income')!;
    this.expenseEl = this.root.querySelector('#hud-expense')!;
    this.toolIndicatorEl = this.root.querySelector('#hud-tool-indicator')!;
    this.levelIndicatorEl = this.root.querySelector('#hud-level-indicator')!;
    this.buildTabBar = this.root.querySelector('#hud-build-tabs')!;
    this.attractionPanel = this.root.querySelector('#hud-attractions')!;
    this.tabBar = this.root.querySelector('#hud-tabs')!;
    this.speedBtn = this.root.querySelector('#hud-speed')!;
    this.pauseBtn = this.root.querySelector('#hud-pause')!;
    this.dateEl = this.root.querySelector('#hud-date')!;
    this.weatherEl = this.root.querySelector('#hud-weather')!;
    this.feedbackAlertEl = this.root.querySelector('#hud-feedback-alert')!;
    this.missionEl = this.root.querySelector('#hud-mission')!;
    this.weeklyChallengeEl = this.root.querySelector('#hud-weekly')!;
    this.eventEl = this.root.querySelector('#hud-event')!;
    this.streakEl = this.root.querySelector('#hud-streak')!;
    this.engagementDetailsBtn = this.root.querySelector('#hud-engagement-details')!;
    this.dayBadgeEl = this.root.querySelector('#hud-day-badge')!;
    this.weekBadgeEl = this.root.querySelector('#hud-week-badge')!;
    this.mechanicsEl = this.root.querySelector('#hud-mechanics')!;
    this.cleanersEl = this.root.querySelector('#hud-cleaners')!;
    this.securityEl = this.root.querySelector('#hud-security')!;
    this.entertainersEl = this.root.querySelector('#hud-entertainers')!;
    this.brokenEl = this.root.querySelector('#hud-broken')!;
    this.attractivenessEl = this.root.querySelector('#hud-attractiveness')!;
    this.crimeEl = this.root.querySelector('#hud-crime')!;
    this.guestsBtn = this.root.querySelector('#hud-guests')!;
    this.mechanicsBtn = this.root.querySelector('#hud-mechanics-btn')!;
    this.attractionsOverviewBtn = this.root.querySelector('#hud-attractions-overview')!;
    this.saveBtn = this.root.querySelector('#hud-save')!;
    this.loadBtn = this.root.querySelector('#hud-load')!;
    this.mobileToggleBtn = this.root.querySelector('#hud-mobile-toggle');
    this.mobileLaunchersEl = this.root.querySelector('#hud-mobile-launchers');
    this.openBuildDialogBtn = this.root.querySelector('#hud-open-build-dialog');
    this.openCameraDialogBtn = this.root.querySelector('#hud-open-camera-dialog');
    this.openPanelsDialogBtn = this.root.querySelector('#hud-open-panels-dialog');
    this.toolsToggleBtn = this.root.querySelector('#hud-tools-toggle');
    this.cameraToggleBtn = this.root.querySelector('#hud-camera-toggle');
    this.attractionsToggleBtn = this.root.querySelector('#hud-attractions-toggle');
    this.peekPanelEl = this.root.querySelector('#hud-peek-panel');
    this.peekBudgetEl = this.root.querySelector('#hud-peek-budget');
    this.peekVisitorsEl = this.root.querySelector('#hud-peek-visitors');
    this.peekSatisfactionEl = this.root.querySelector('#hud-peek-satisfaction');
    this.peekWeatherEl = this.root.querySelector('#hud-peek-weather');
    this.toolsPanelEl = this.root.querySelector('#hud-tools-panel');
    this.cameraControlsPanel = this.root.querySelector('#hud-camera-controls');
    this.attractionsPanelEl = this.root.querySelector('#hud-attractions-panel');
    this.touchHintEl = this.root.querySelector('#hud-touch-hint');

    // Tool buttons
    this.root.querySelectorAll('.tool-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const t = (btn as HTMLElement).dataset.tool;
        const variant = parseInt((btn as HTMLElement).dataset.variant || '0', 10);
        if (t === 'path') this.controller.selectTool(BuildTool.Path, -1, variant);
        else if (t === 'land') this.controller.selectTool(BuildTool.Land, -1, variant);
        else if (t === 'tree') this.controller.selectTool(BuildTool.Tree, -1, variant);
        else if (t === 'scenery') this.controller.selectTool(BuildTool.Scenery, -1, variant);
        else if (t === 'terrain') this.controller.selectTool(BuildTool.Terrain);
        else if (t === 'water') this.controller.selectTool(BuildTool.Water);
        else if (t === 'pickup') this.controller.selectTool(BuildTool.Pickup);
        else if (t === 'bench') this.controller.selectTool(BuildTool.Bench);
        else if (t === 'trashcan') this.controller.selectTool(BuildTool.TrashCan);
        else if (t === 'demolish') this.controller.selectTool(BuildTool.Demolish);
        else if (t === 'select') this.controller.selectTool(BuildTool.Select);
        else this.controller.selectTool(BuildTool.None);
      });
    });

    this.buildTabBar.addEventListener('click', (e) => {
      const tabBtn = (e.target as HTMLElement).closest<HTMLButtonElement>('.build-tab-btn');
      if (!tabBtn) return;
      const tab = tabBtn.dataset.buildTab;
      if (tab === 'land' || tab === 'path' || tab === 'trees' || tab === 'scenery' || tab === 'tools') {
        this.setBuildTab(tab);
      }
    });
    this.setBuildTab(this.activeBuildTab);

    // Build tabs
    const tabs: { key: AttractionTab; label: string; icon: string }[] = [
      { key: 'thrill', label: 'Rides', icon: '🎢' },
      { key: 'fun', label: 'Fun', icon: '🎠' },
      { key: 'relax', label: 'Calm', icon: '🧘' },
      { key: 'shops', label: 'Shops', icon: '🛍️' },
      { key: 'food', label: 'Food', icon: '🍔' },
      { key: 'drink', label: 'Drinks', icon: '🥤' },
      { key: 'toilet', label: 'Toilets', icon: '🚻' },
    ];
    for (const tab of tabs) {
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (tab.key === this.activeTab ? ' active' : '');
      btn.setAttribute('data-testid', `tab-${tab.key}`);
      btn.dataset.tab = tab.key;
      btn.innerHTML = `${tab.icon} ${tab.label}`;
      btn.addEventListener('click', () => {
        this.activeTab = tab.key;
        this.tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderAttractionButtons();
      });
      this.tabBar.appendChild(btn);
    }

    // Initial attraction buttons
    this.renderAttractionButtons();

    this.guestsBtn.addEventListener('click', () => {
      this.showAllGuestsDialog();
    });

    this.mechanicsBtn.addEventListener('click', () => {
      this.showEmployeesDialog();
    });

    this.attractionsOverviewBtn.addEventListener('click', () => {
      this.showAttractionsOverviewDialog();
    });

    this.saveBtn.addEventListener('click', () => {
      this.onSaveRequest?.();
    });

    this.loadBtn.addEventListener('click', () => {
      this.onLoadRequest?.();
    });

    this.engagementDetailsBtn.addEventListener('click', () => {
      this.showEngagementDetailsDialog();
    });

    // Speed / pause
    this.speedBtn.addEventListener('click', () => {
      this.speed = this.speed >= 3 ? 1 : this.speed + 1;
      this.speedBtn.textContent = `${this.speed}x`;
      this.onSpeedChange?.(this.speed);
    });

    this.pauseBtn.addEventListener('click', () => {
      this.paused = !this.paused;
      this.pauseBtn.textContent = this.paused ? '▶' : '⏸';
      this.onPauseChange?.(this.paused);
    });

    this.mobileToggleBtn?.addEventListener('click', () => {
      if (this.uiMode === 'mobile') return;
      this.applyPanelCollapsedState(!this.mobilePanelsCollapsed);
      this.persistCollapseState();
    });

    this.openBuildDialogBtn?.addEventListener('click', () => {
      this.showBuildToolsDialog();
    });

    this.openCameraDialogBtn?.addEventListener('click', () => {
      this.showCameraDialog();
    });

    this.openPanelsDialogBtn?.addEventListener('click', () => {
      this.showPanelsDialog();
    });

    this.toolsToggleBtn?.addEventListener('click', () => {
      this.applyBottomPanelCollapsedState('tools', !this.toolsPanelCollapsed);
      this.persistBottomPanelCollapseState();
    });

    this.cameraToggleBtn?.addEventListener('click', () => {
      this.applyBottomPanelCollapsedState('camera', !this.cameraPanelCollapsed);
      this.persistBottomPanelCollapseState();
    });

    this.attractionsToggleBtn?.addEventListener('click', () => {
      this.applyBottomPanelCollapsedState('attractions', !this.attractionsPanelCollapsed);
      this.persistBottomPanelCollapseState();
    });

    this.peekPanelEl?.addEventListener('click', () => {
      if (this.uiMode !== 'mobile') return;
      this.showStatisticsDialog();
    });

    this.root.querySelector('#hud-touch-hint-dismiss')?.addEventListener('click', () => {
      this.hideTouchHint(true);
    });

    const panStep = 44;
    this.root.querySelector('#hud-cam-up')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(0, -panStep));
    this.root.querySelector('#hud-cam-down')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(0, panStep));
    this.root.querySelector('#hud-cam-left')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(-panStep, 0));
    this.root.querySelector('#hud-cam-right')?.addEventListener('click', () => this.cameraControls?.panByScreenDelta(panStep, 0));
    this.root.querySelector('#hud-cam-zoom-in')?.addEventListener('click', () => this.cameraControls?.zoomByStep(1));
    this.root.querySelector('#hud-cam-zoom-out')?.addEventListener('click', () => this.cameraControls?.zoomByStep(-1));
    this.root.querySelector('#hud-cam-recenter')?.addEventListener('click', () => this.cameraControls?.recenter());

    this.updateMobileToggleLabel();
    this.updateMobileLaunchersVisibility();
    const persistedBottomPanelState = this.readPersistedBottomPanelCollapseState();
    this.applyBottomPanelCollapsedState('tools', persistedBottomPanelState?.tools ?? false);
    this.applyBottomPanelCollapsedState('camera', persistedBottomPanelState?.camera ?? false);
    this.applyBottomPanelCollapsedState('attractions', persistedBottomPanelState?.attractions ?? false);
    this.updateCameraControlsVisibility();
    this.updatePeekVisibility();
    if (this.isTouchMode()) {
      this.maybeShowTouchHint();
    }
  }

  private renderAttractionButtons(): void {
    this.attractionPanel.innerHTML = '';
    const filtered = ATTRACTIONS.filter((a) => {
      if (this.activeTab === 'shops') return SHOP_TEMPLATE_IDS.has(a.id);
      if (SHOP_TEMPLATE_IDS.has(a.id)) return false;
      return a.category === this.activeTab;
    });
    for (const attr of filtered) {
      const btn = document.createElement('button');
      btn.className = 'attr-btn';
      btn.dataset.attrId = String(attr.id);
      btn.setAttribute('data-testid', `attr-${attr.id}`);
      btn.title = `${attr.name} (${attr.footprint.w}x${attr.footprint.h}) — $${attr.buildPrice}`;
      btn.innerHTML = `<span class="attr-icon">${attr.icon}</span><span class="attr-name">${attr.name}</span><span class="attr-price">$${attr.buildPrice}</span>`;
      btn.addEventListener('click', () => {
        this.showAttractionBuildDialog(attr.id);
      });
      this.attractionPanel.appendChild(btn);
    }
  }

  private showAttractionBuildDialog(templateId: number): void {
    const attr = ATTRACTIONS.find((a) => a.id === templateId);
    if (!attr) return;

    const isStall = attr.category === 'food' || attr.category === 'drink' || attr.category === 'toilet';

    const box = this.openDialog(`${attr.icon} Build ${attr.name}`, `
      <div class="dialog-row"><span class="label">Footprint:</span> <span>${attr.footprint.w} x ${attr.footprint.h}</span></div>
      <div class="dialog-row"><span class="label">Build Cost:</span> <span>$${attr.buildPrice}</span></div>
      <div class="dialog-row" style="margin-top:6px;">
        <button class="dialog-save-btn" data-testid="attr-build-rotate-btn" id="dlg-attr-build-rotate">Rotate</button>
      </div>
      <div class="dialog-row" style="margin-top:6px;">
        <span class="label">Status:</span> <span data-testid="attr-build-status" id="dlg-build-status">Click on the map to place</span>
      </div>
      <span data-testid="attr-build-rotation" id="dlg-attr-build-rotation" style="display:none;">0</span>
    `, { passthrough: true });
    box.classList.add('dialog-box-build-preview');

    this.buildDialogStatusEl = box.querySelector('#dlg-build-status') as HTMLSpanElement;
    this.buildDialogRotationEl = box.querySelector('#dlg-attr-build-rotation') as HTMLSpanElement;
    this.buildDialogOpen = true;

    // Override close button to also cancel the build
    box.querySelector('.dialog-close')!.addEventListener('click', () => this.closeBuildDialog());

    box.querySelector('#dlg-attr-build-rotate')?.addEventListener('click', () => {
      const newRot = this.controller.rotateAttractionRotation();
      if (this.buildDialogRotationEl) {
        this.buildDialogRotationEl.textContent = `${newRot}`;
      }
    });

    // Activate the attraction tool immediately
    this.controller.selectTool(BuildTool.Attraction, templateId);
  }

  private setBuildTab(tab: 'land' | 'path' | 'trees' | 'scenery' | 'tools'): void {
    this.activeBuildTab = tab;
    this.buildTabBar.querySelectorAll('.build-tab-btn').forEach((btn) => {
      const isActive = (btn as HTMLElement).dataset.buildTab === tab;
      btn.classList.toggle('active', isActive);
    });

    this.root.querySelectorAll<HTMLElement>('.build-group').forEach((group) => {
      group.hidden = group.dataset.buildGroup !== tab;
    });

    const attractionsContainer = this.root.querySelector<HTMLElement>('.hud-attractions-container');
    if (attractionsContainer) {
      attractionsContainer.hidden = tab === 'trees' || tab === 'scenery';
    }
  }

  /* ── Dialogs ── */

  private closeDialog(): void {
    if (this.dialogOverlay) {
      this.dialogOverlay.remove();
      this.dialogOverlay = null;
    }
    if (this.buildDialogOpen) {
      this.buildDialogOpen = false;
      this.buildDialogStatusEl = null;
      this.buildDialogRotationEl = null;
      if (this.controller.tool === BuildTool.Attraction) {
        this.controller.selectTool(BuildTool.None);
      }
    }
  }

  private closeBuildDialog(): void {
    if (!this.buildDialogOpen) return;
    this.buildDialogOpen = false;
    this.buildDialogStatusEl = null;
    this.buildDialogRotationEl = null;
    this.closeDialog();
    if (this.controller.tool === BuildTool.Attraction) {
      this.controller.selectTool(BuildTool.None);
    }
  }

  closeTransientDialogs(): void {
    this.closeDialog();
  }

  private makeDialogDraggable(
    overlay: HTMLDivElement,
    box: HTMLDivElement,
    initialPosition: { left: number; top: number } | null,
    onPositionChange?: (pos: { left: number; top: number }) => void,
  ): void {
    const header = box.querySelector('.dialog-header') as HTMLDivElement | null;
    if (!header) return;

    box.classList.add('is-draggable');

    if (initialPosition) {
      overlay.style.alignItems = 'flex-start';
      overlay.style.justifyContent = 'flex-start';
      box.style.position = 'absolute';
      box.style.left = `${initialPosition.left}px`;
      box.style.top = `${initialPosition.top}px`;
    }

    let dragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

    header.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      const boxRect = box.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();

      dragging = true;
      dragOffsetX = e.clientX - boxRect.left;
      dragOffsetY = e.clientY - boxRect.top;

      overlay.style.alignItems = 'flex-start';
      overlay.style.justifyContent = 'flex-start';
      box.style.position = 'absolute';
      box.style.left = `${boxRect.left - overlayRect.left}px`;
      box.style.top = `${boxRect.top - overlayRect.top}px`;
      e.preventDefault();
    });

    overlay.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const overlayRect = overlay.getBoundingClientRect();
      const maxLeft = Math.max(0, overlayRect.width - box.offsetWidth);
      const maxTop = Math.max(0, overlayRect.height - box.offsetHeight);

      const left = clamp(e.clientX - overlayRect.left - dragOffsetX, 0, maxLeft);
      const top = clamp(e.clientY - overlayRect.top - dragOffsetY, 0, maxTop);

      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      onPositionChange?.({ left, top });
    });

    overlay.addEventListener('mouseup', () => {
      dragging = false;
    });
  }

  private openDialog(
    title: string,
    bodyHtml: string,
    options?: {
      draggable?: boolean;
      passthrough?: boolean;
      initialPosition?: { left: number; top: number } | null;
      onPositionChange?: (pos: { left: number; top: number }) => void;
    },
  ): HTMLDivElement {
    this.closeDialog();
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.setAttribute('data-testid', 'dialog-overlay');
    if (options?.passthrough) {
      overlay.classList.add('dialog-overlay--passthrough');
    } else {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeDialog();
      });
    }
    overlay.innerHTML = `
      <div class="dialog-box" data-testid="dialog-box">
        <div class="dialog-header">
          <span class="dialog-title" data-testid="dialog-title">${title}</span>
          <button class="dialog-close" data-testid="dialog-close">&times;</button>
        </div>
        <div class="dialog-body" data-testid="dialog-body">${bodyHtml}</div>
      </div>
    `;
    overlay.querySelector('.dialog-close')!.addEventListener('click', () => this.closeDialog());
    this.root.appendChild(overlay);
    this.dialogOverlay = overlay;
    const box = overlay.querySelector('.dialog-box') as HTMLDivElement;
    const draggable = options?.draggable ?? true;
    if (draggable) {
      this.makeDialogDraggable(overlay, box, options?.initialPosition ?? null, options?.onPositionChange);
    }
    return box;
  }

  showAttractionDialog(instanceId: number): void {
    showAttractionDialogImpl({
      sim: this.sim,
      weather: this.weather,
      coasterTracks: this.coasterTracks,
      openDialog: (title, bodyHtml, options) => this.openDialog(title, bodyHtml, options),
      closeDialog: () => this.closeDialog(),
      wireDialogTabs: (container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab) =>
        this.wireDialogTabs(container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab),
      showAttractionDialog: (id) => this.showAttractionDialog(id),
      showDemolishAttractionConfirm: (id) => this.showDemolishAttractionConfirm(id),
      showCoasterTrackDialog: (id, x, y, templateId) => this.showCoasterTrackDialog(id, x, y, templateId),
      startEndpointEdit: (id) => this.controller.startEndpointEdit(id),
      demolishAttractionByInstance: (id) => this.controller.demolishAttractionByInstance(id),
    }, instanceId);
  }

  private showCoasterTrackDialog(instanceId: number, stationX: number, stationY: number, templateId: number = 1): void {
    if (!this.coasterTracks.activeBuild || this.coasterTracks.activeBuild.instanceId !== instanceId) {
      this.coasterTracks.startBuild(instanceId, stationX, stationY, templateId);
    }
    const trackCfg = getTrackConfig(templateId);
    const dirNames = ['North', 'East', 'South', 'West'];

    const refreshDialog = () => {
      const build = this.coasterTracks.activeBuild;
      if (!build) return;

      const allowedPieces = trackCfg?.allowedPieces ?? [
        TrackPieceType.Station,
        TrackPieceType.Straight,
        TrackPieceType.TurnLeft,
        TrackPieceType.TurnRight,
        TrackPieceType.HillUp,
        TrackPieceType.HillDown,
        TrackPieceType.LargeTurnLeft,
        TrackPieceType.LargeTurnRight,
      ];
      const pieceBtns = allowedPieces.map(t => {
        const def = TRACK_PIECE_DEFS[t as TrackPieceType];
        const canPlace = this.coasterTracks.canPlacePiece(t);
        return `<button class="dialog-save-btn coaster-piece-btn" data-piece="${t}" ${canPlace ? '' : 'disabled'} style="margin:2px;padding:4px 8px;opacity:${canPlace ? '1' : '0.4'};font-size:13px;">${def.icon} ${def.name}</button>`;
      }).join('');

      const canFinish = this.coasterTracks.canComplete();
      const canUndo = build.pieces.length > 0;

      // Preview stats
      const previewTrack: RollerCoasterTrackData = {
        instanceId: build.instanceId,
        trackStyleId: build.trackStyleId,
        stationX: build.stationX,
        stationY: build.stationY,
        trackColor: build.trackColor,
        cartColor: build.cartColor,
        stationLength: build.stationLength,
        pieces: [...build.pieces],
        complete: false,
        excitement: 0,
        nausea: 0,
        satisfaction: 0,
      };
      this.coasterTracks.calculateStats(previewTrack);
      const baseCapacity = this.sim.getTmplCapacity(this.sim.getInstTemplateId(build.instanceId));
      const previewCapacity = Math.max(1, baseCapacity * build.stationLength);

      const box = this.openDialog(`${trackCfg?.icon ?? '🎢'} ${trackCfg?.dialogTitle ?? 'Track Builder'}`, `
        <div style="margin-bottom:6px;font-size:12px;color:#aaa;">
          Pieces: <b>${build.pieces.length}</b> &nbsp;|&nbsp;
          Station: <b>${build.stationLength}</b> &nbsp;|&nbsp;
          Capacity: <b>${previewCapacity}</b> &nbsp;|&nbsp;
          Direction: <b>${dirNames[build.nextDir]}</b> &nbsp;|&nbsp;
          Height: <b>${build.nextHeight}</b> &nbsp;|&nbsp;
          Next: <b>(${build.nextX}, ${build.nextY})</b>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:2px;margin-bottom:8px;">
          ${pieceBtns}
        </div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
          <label style="font-size:12px;">🎨 Track:
            <input type="color" id="dlg-track-color" value="${build.trackColor}" style="width:28px;height:20px;border:none;cursor:pointer;" />
          </label>
          <label style="font-size:12px;">🚃 Cart:
            <input type="color" id="dlg-cart-color" value="${build.cartColor}" style="width:28px;height:20px;border:none;cursor:pointer;" />
          </label>
        </div>
        <div style="font-size:12px;color:#ccc;margin-bottom:6px;">
          ⚡ Excitement: <b>${previewTrack.excitement}</b> &nbsp;
          🤢 Nausea: <b>${previewTrack.nausea}</b> &nbsp;
          😊 Satisfaction: <b>${previewTrack.satisfaction}</b>
        </div>
        <div style="display:flex;gap:4px;justify-content:flex-end;">
          <button class="dialog-save-btn" id="dlg-track-undo" ${canUndo ? '' : 'disabled'} style="opacity:${canUndo ? '1' : '0.4'};">↩️ Undo</button>
          <button class="dialog-save-btn" id="dlg-track-complete" ${canFinish ? '' : 'disabled'} style="opacity:${canFinish ? '1' : '0.4'};">✅ Complete</button>
          <button class="dialog-save-btn" id="dlg-track-cancel">❌ Cancel</button>
        </div>
        ${!canFinish && build.pieces.length >= 4 ? '<div style="font-size:11px;color:#f44336;margin-top:4px;">Track must reach/touch the opposite station end at height 1 (corner entry is allowed)</div>' : ''}
      `, {
        draggable: true,
        initialPosition: this.trackDialogPosition,
        onPositionChange: (pos) => {
          this.trackDialogPosition = pos;
        },
      });

      // Piece buttons
      box.querySelectorAll('.coaster-piece-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pieceType = parseInt((btn as HTMLElement).dataset.piece!, 10) as TrackPieceType;
          this.coasterTracks.placePiece(pieceType);
          refreshDialog();
        });
      });

      // Color pickers
      box.querySelector('#dlg-track-color')!.addEventListener('input', (e) => {
        this.coasterTracks.setTrackColor((e.target as HTMLInputElement).value);
      });
      box.querySelector('#dlg-cart-color')!.addEventListener('input', (e) => {
        this.coasterTracks.setCartColor((e.target as HTMLInputElement).value);
      });

      // Undo
      box.querySelector('#dlg-track-undo')!.addEventListener('click', () => {
        this.coasterTracks.undoLastPiece();
        refreshDialog();
      });

      // Complete
      box.querySelector('#dlg-track-complete')!.addEventListener('click', () => {
        this.coasterTracks.completeBuild();
        this.closeDialog();
      });

      // Cancel
      box.querySelector('#dlg-track-cancel')!.addEventListener('click', () => {
        this.coasterTracks.cancelBuild();
        this.closeDialog();
      });
    };

    refreshDialog();
  }

  showGuestDialog(visitorIndex: number): void {
    showGuestDialogImpl({
      sim: this.sim,
      openDialog: (title, bodyHtml) => this.openDialog(title, bodyHtml),
      wireDialogTabs: (container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab) =>
        this.wireDialogTabs(container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab),
      showGuestDialog: (index) => this.showGuestDialog(index),
    }, visitorIndex);
  }

  showAllGuestsDialog(): void {
    showAllGuestsDialogImpl({
      sim: this.sim,
      openDialog: (title, bodyHtml) => this.openDialog(title, bodyHtml),
      wireDialogTabs: (container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab) =>
        this.wireDialogTabs(container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab),
      showGuestDialog: (index) => this.showGuestDialog(index),
    });
  }

  private showEmployeeDialog(type: EmployeeKind, index: number): void {
    this.employeeDialogs.showEmployeeDialog(type, index);
  }

  private showEmployeesDialog(): void {
    this.employeeDialogs.showEmployeesDialog();
  }

  private showAttractionsOverviewDialog(): void {
    showAttractionsOverviewDialogImpl({
      sim: this.sim,
      weather: this.weather,
      coasterTracks: this.coasterTracks,
      openDialog: (title, bodyHtml, options) => this.openDialog(title, bodyHtml, options),
      closeDialog: () => this.closeDialog(),
      wireDialogTabs: (container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab) =>
        this.wireDialogTabs(container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab),
      showAttractionDialog: (id) => this.showAttractionDialog(id),
      showDemolishAttractionConfirm: (id) => this.showDemolishAttractionConfirm(id),
      showCoasterTrackDialog: (id, x, y, templateId) => this.showCoasterTrackDialog(id, x, y, templateId),
      startEndpointEdit: (id) => this.controller.startEndpointEdit(id),
      demolishAttractionByInstance: (id) => this.controller.demolishAttractionByInstance(id),
    });
  }

  private showDemolishAttractionConfirm(instanceId: number): void {
    showDemolishAttractionConfirmImpl({
      sim: this.sim,
      weather: this.weather,
      coasterTracks: this.coasterTracks,
      openDialog: (title, bodyHtml, options) => this.openDialog(title, bodyHtml, options),
      closeDialog: () => this.closeDialog(),
      wireDialogTabs: (container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab) =>
        this.wireDialogTabs(container, buttonSelector, panelSelector, buttonDataAttr, panelDataAttr, defaultTab),
      showAttractionDialog: (id) => this.showAttractionDialog(id),
      showDemolishAttractionConfirm: (id) => this.showDemolishAttractionConfirm(id),
      showCoasterTrackDialog: (id, x, y, templateId) => this.showCoasterTrackDialog(id, x, y, templateId),
      startEndpointEdit: (id) => this.controller.startEndpointEdit(id),
      demolishAttractionByInstance: (id) => this.controller.demolishAttractionByInstance(id),
    }, instanceId);
  }

  private bindController(): void {
    this.controller.onToolChange = () => this.updateToolIndicator();
    this.controller.onBudgetChange = () => this.refresh();
    this.controller.onSelectAttraction = (instId) => this.showAttractionDialog(instId);
    this.controller.onSelectVisitor = (vi) => this.showGuestDialog(vi);
    this.controller.onSelectEmployee = (kind, employeeIndex) => this.showEmployeeDialog(kind, employeeIndex);
    this.controller.onSelectEntrance = () => this.showEntranceDialog();
    this.controller.onRequestDemolishAttraction = (instanceId) => this.showDemolishAttractionConfirm(instanceId);
    this.controller.onAttractionPlaced = (instanceId, templateId, x, y) => {
      if (isTrackAttraction(templateId)) {
        this.showCoasterTrackDialog(instanceId, x, y, templateId);
      }
    };
    this.controller.onAttractionDemolished = (instanceId, templateId) => {
      clearInstanceRuntimeState(instanceId);
      if (isTrackAttraction(templateId)) {
        this.coasterTracks.clearBuildIfInstance(instanceId);
        this.coasterTracks.removeTrack(instanceId);
      }
    };
  }

  private showEntranceDialog(): void {
    const current = this.sim.getEntranceTicket();
    const box = this.openDialog('🎟 Park Entrance', `
      <div class="dialog-row"><span class="label">Entrance Ticket: $</span><input class="dialog-input" id="dlg-entrance-ticket" data-testid="dlg-entrance-ticket" type="number" min="0" max="200" value="${current}" /></div>
      <div class="dialog-row" style="justify-content:flex-end;margin-top:6px;"><button class="dialog-save-btn" id="dlg-entrance-save" data-testid="dlg-entrance-save">Save</button></div>
    `);
    box.querySelector('#dlg-entrance-save')?.addEventListener('click', () => {
      const input = box.querySelector('#dlg-entrance-ticket') as HTMLInputElement;
      const value = parseInt(input.value, 10);
      if (!Number.isNaN(value) && value >= 0) {
        this.sim.setEntranceTicket(value);
        this.refresh();
      }
      this.closeDialog();
    });
  }

  private updateToolIndicator(): void {
    const t = this.controller.tool;
    const selectedTree = getTreeDef(this.controller.selectedTreeVariant) ?? TREE_CATALOG[0];
    const treeLabel = selectedTree
      ? `${selectedTree.icon} ${selectedTree.name} ($${selectedTree.cost})`
      : '🌲 Tree';
    const selectedScenery = getSceneryDef(this.controller.selectedSceneryVariant) ?? SCENERY_CATALOG[0];
    const sceneryLabel = selectedScenery
      ? `${selectedScenery.icon} ${selectedScenery.name} ($${selectedScenery.cost})`
      : '🌸 Scenery';
    const names: Record<number, string> = {
      [BuildTool.None]: 'No tool',
      [BuildTool.Path]: this.controller.selectedPathVariant === 1
        ? '🟨 Desert Path ($10)'
        : this.controller.selectedPathVariant === 2
          ? '⬜ Concrete Path ($14)'
          : this.controller.selectedPathVariant === 3
            ? '🟪 Queue Path ($12)'
          : '🟫 Mud Path ($8)',
      [BuildTool.Land]: this.controller.selectedLandVariant === 1
        ? '🟨 Desert Paint ($2)'
        : this.controller.selectedLandVariant === 2
          ? '🟫 Mud Paint ($2)'
          : this.controller.selectedLandVariant === 3
            ? '🟩 Dark Grass Paint ($2)'
            : '🟩 Grass Paint ($2)',
      [BuildTool.Tree]: treeLabel,
      [BuildTool.Scenery]: sceneryLabel,
      [BuildTool.Pickup]: `✋ Pickup (${this.controller.getCarryStatus()})`,
      [BuildTool.Terrain]: '⛰ Terrain (drag up=raise, down=lower)',
      [BuildTool.Water]: '💧 Water ($25)',
      [BuildTool.Bench]: '🪑 Bench ($30)',
      [BuildTool.TrashCan]: '🗑 Trash Can ($40)',
      [BuildTool.Demolish]: '🔨 Demolish',
      [BuildTool.Select]: '🔍 Select',
    };
    if (t === BuildTool.Attraction) {
      const attr = ATTRACTIONS.find(a => a.id === this.controller.selectedAttractionId);
      const status = this.controller.getAttractionBuildStatus();
      const rotation = this.controller.getAttractionRotation();
      this.toolIndicatorEl.textContent = attr
        ? `${attr.icon} ${attr.name} ($${attr.buildPrice})${status ? ` - ${status}` : ''}`
        : 'Attraction';

      // Update build dialog status and rotation display
      if (this.buildDialogOpen) {
        if (this.buildDialogStatusEl) {
          this.buildDialogStatusEl.textContent = status || 'Click on the map to place';
        }
        if (this.buildDialogRotationEl) {
          this.buildDialogRotationEl.textContent = `${rotation}`;
        }
      }
    } else {
      // Auto-close build dialog when tool changes away from Attraction
      if (this.buildDialogOpen) {
        this.buildDialogOpen = false;
        this.buildDialogStatusEl = null;
        this.buildDialogRotationEl = null;
        this.closeDialog();
      }

      let label = names[t] || 'Unknown';
      if (t === BuildTool.Path && this.controller.buildHeight >= 0) {
        label += ` [H:${this.controller.buildHeight}]`;
      }
      this.toolIndicatorEl.textContent = label;
    }

    // Highlight active button
    this.root.querySelectorAll('.tool-btn, .attr-btn').forEach(b => b.classList.remove('active'));
    if (t === BuildTool.Path) this.root.querySelector(`[data-tool="path"][data-variant="${this.controller.selectedPathVariant}"]`)?.classList.add('active');
    else if (t === BuildTool.Land) this.root.querySelector(`[data-tool="land"][data-variant="${this.controller.selectedLandVariant}"]`)?.classList.add('active');
    else if (t === BuildTool.Tree) this.root.querySelector(`[data-tool="tree"][data-variant="${this.controller.selectedTreeVariant}"]`)?.classList.add('active');
    else if (t === BuildTool.Scenery) this.root.querySelector(`[data-tool="scenery"][data-variant="${this.controller.selectedSceneryVariant}"]`)?.classList.add('active');
    else if (t === BuildTool.Pickup) this.root.querySelector('[data-tool="pickup"]')?.classList.add('active');
    else if (t === BuildTool.Terrain) this.root.querySelector('[data-tool="terrain"]')?.classList.add('active');
    else if (t === BuildTool.Water) this.root.querySelector('[data-tool="water"]')?.classList.add('active');
    else if (t === BuildTool.Bench) this.root.querySelector('[data-tool="bench"]')?.classList.add('active');
    else if (t === BuildTool.TrashCan) this.root.querySelector('[data-tool="trashcan"]')?.classList.add('active');
    else if (t === BuildTool.Demolish) this.root.querySelector('[data-tool="demolish"]')?.classList.add('active');
    else if (t === BuildTool.Select) this.root.querySelector('[data-tool="select"]')?.classList.add('active');
  }

  refresh(): void {
    const budget = this.sim.getBudget();
    const visitors = this.sim.getActiveVisitors();
    const satisfaction = this.sim.getAvgSatisfaction();
    const hunger = this.sim.getAvgHunger();
    const thirst = this.sim.getAvgThirst();
    const bladder = this.sim.getAvgBladder();
    this.budgetEl.textContent = `$${budget}`;
    this.visitorsEl.textContent = `${visitors} / 100`;
    this.satisfactionEl.textContent = `${satisfaction}%`;
    this.hungerEl.textContent = `${hunger}%`;
    this.thirstEl.textContent = `${thirst}%`;
    this.bladderEl.textContent = `${bladder}%`;
    this.incomeEl.textContent = `$${this.sim.getTotalIncome()}`;
    this.expenseEl.textContent = `$${this.sim.getTotalExpense()}`;
    this.mechanicsEl.textContent = `${this.sim.getMechanicCount()}`;
    this.cleanersEl.textContent = `${this.sim.getCleanerCount()}`;
    this.securityEl.textContent = `${this.sim.getSecurityCount()}`;
    this.entertainersEl.textContent = `${this.sim.getEntertainerCount()}`;
    this.brokenEl.textContent = `${this.sim.getBrokenAttractionCount()}`;
    this.attractivenessEl.textContent = `${this.sim.getParkAttractiveness()}%`;
    this.crimeEl.textContent = `${this.sim.getTheftCount()} theft / ${this.sim.getVandalismCount()} vandal`;
    this.dateEl.textContent = this.gameTime.formatDate();
    const wi = this.weather.info;
    this.weatherEl.textContent = `${wi.icon} ${wi.label}`;

    if (this.peekBudgetEl) {
      this.peekBudgetEl.textContent = `${budget}`;
      this.peekBudgetEl.className = budget < 500 ? 'val-danger' : budget < 2000 ? 'val-warn' : 'val-good';
    }
    if (this.peekVisitorsEl) {
      this.peekVisitorsEl.textContent = `${visitors}/100`;
    }
    if (this.peekSatisfactionEl) {
      this.peekSatisfactionEl.textContent = `${satisfaction}%`;
      this.peekSatisfactionEl.className = satisfaction < 40 ? 'val-danger' : satisfaction < 65 ? 'val-warn' : 'val-good';
    }
    if (this.peekWeatherEl) {
      this.peekWeatherEl.textContent = `${wi.icon} ${wi.label}`;
    }

    // Colour-code budget
    this.budgetEl.className = budget < 500 ? 'val-danger' : budget < 2000 ? 'val-warn' : 'val-good';

    // Color-code needs (high = danger)
    this.hungerEl.className = hunger > 60 ? 'val-danger' : hunger > 35 ? 'val-warn' : 'val-good';
    this.thirstEl.className = thirst > 60 ? 'val-danger' : thirst > 35 ? 'val-warn' : 'val-good';
    this.bladderEl.className = bladder > 60 ? 'val-danger' : bladder > 35 ? 'val-warn' : 'val-good';

    // Terrain level indicator for hovered tile
    const hx = this.controller.hoverTileX;
    const hy = this.controller.hoverTileY;
    if (hx >= 0 && hy >= 0) {
      const h = this.sim.getTileHeight(hx, hy);
      const base = this.sim.getBaseHeight();
      const rel = h - base;
      this.levelIndicatorEl.textContent = `Level: ${rel >= 0 ? '+' : ''}${rel}`;
    } else {
      this.levelIndicatorEl.textContent = '';
    }

    // Update attraction button states (affordability only — no per-type limit)
    const attrBtns = this.attractionPanel.querySelectorAll('.attr-btn');
    attrBtns.forEach((btn) => {
      const attrId = parseInt((btn as HTMLElement).dataset.attrId || '-1', 10);
      const attr = ATTRACTIONS.find(a => a.id === attrId);
      if (!attr) return;
      btn.classList.remove('placed', 'unaffordable');
      if (attr.buildPrice > this.sim.getBudget()) {
        btn.classList.add('unaffordable');
        (btn as HTMLElement).title = `${attr.name} — Can't afford ($${attr.buildPrice})`;
      } else {
        (btn as HTMLElement).title = `${attr.name} (${attr.footprint.w}x${attr.footprint.h}) — $${attr.buildPrice}`;
      }
    });
  }

  getMetadataSnapshot(): HudMetadataSnapshot {
    return getMetadataSnapshot(this.employeeNamesByUid, this.employeeHiredDateByUid);
  }

  restoreMetadataSnapshot(snapshot: HudMetadataSnapshot): void {
    restoreMetadataSnapshot(snapshot, this.employeeNamesByUid, this.employeeHiredDateByUid);
  }

}
