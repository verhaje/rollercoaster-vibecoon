/* =============================================
   Park Tycoon – Game Time / Date System
   Tracks in-game date starting from March 10, 2026.
   1 game day = 100 simulation ticks.
   ============================================= */

import { type Season } from './Weather';

const TICKS_PER_DAY = 100;

export class GameTime {
  private startDate: Date;
  private totalTicks = 0;

  constructor(startDate: Date = new Date(2026, 2, 10)) { // March 10, 2026
    this.startDate = new Date(startDate);
  }

  /** Advance by one simulation tick */
  tick(): void {
    this.totalTicks++;
  }

  get day(): number {
    return Math.floor(this.totalTicks / TICKS_PER_DAY);
  }

  get currentDate(): Date {
    const d = new Date(this.startDate);
    d.setDate(d.getDate() + this.day);
    return d;
  }

  get season(): Season {
    const month = this.currentDate.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  formatDate(): string {
    const d = this.currentDate;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatYear(): string {
    return String(this.currentDate.getFullYear());
  }

  getSnapshot(): { startDateISO: string; totalTicks: number } {
    return {
      startDateISO: this.startDate.toISOString(),
      totalTicks: this.totalTicks,
    };
  }

  restoreSnapshot(snapshot: { startDateISO: string; totalTicks: number }): void {
    const nextStart = new Date(snapshot.startDateISO);
    this.startDate = Number.isNaN(nextStart.getTime()) ? new Date(2026, 2, 10) : nextStart;
    this.totalTicks = Math.max(0, Math.floor(snapshot.totalTicks));
  }
}
