/* =============================================
   Park Tycoon – Furniture System
   Manages benches & trash cans placed on paths,
   litter on ground, and guest interactions.
   ============================================= */

import { type SimExports, TileType, VisitorState } from './types';
import { ECONOMY } from './config/economy';

const MAP_W = ECONOMY.mapWidth;
const MAP_H = ECONOMY.mapHeight;

export const BENCH_COST = 30;
export const TRASHCAN_COST = 40;
const TRASHCAN_CAPACITY =  12;
const BENCH_MAX_GUESTS = 2;
const TRASHCAN_SEARCH_RADIUS = 5;
const CLEANER_NOTICE_RADIUS = 6;
const LITTER_SAT_INTERVAL = 6;          // ticks between litter satisfaction hits (mirrors puke)
const BENCH_REST_TICKS = 20;             // ticks a guest sits to rest
const BENCH_EAT_SPEEDUP = 2;            // food/drink ride ticks deducted bonus per tick sitting
const TRASH_THROW_ANIM_TICKS = 12;

export interface Bench {
  x: number;
  y: number;
  broken: boolean;
  seated: number[];  // visitor indices (max 2)
  restTimers: number[];
}

export interface TrashCan {
  x: number;
  y: number;
  broken: boolean;
  fill: number; // 0..TRASHCAN_CAPACITY
}

export interface LitterSpot {
  x: number;
  y: number;
  amount: number; // 1..4
}

/** Per-visitor animation state exposed for the renderer */
export interface VisitorFurnitureAnim {
  sittingOnBench: boolean;
  throwingTrash: number;  // countdown ticks (>0 = animating)
}

export interface FurnitureSnapshot {
  benches: Bench[];
  trashCans: TrashCan[];
  litter: Array<{ key: number; amount: number }>;
  visitorAnim: VisitorFurnitureAnim[];
}

function isPath(tile: number): boolean {
  return tile === TileType.PathMuddy ||
    tile === TileType.PathDesert ||
    tile === TileType.PathConcrete ||
    tile === TileType.PathQueue;
}

function tileKey(x: number, y: number): number {
  return y * MAP_W + x;
}

export class FurnitureSystem {
  benches: Bench[] = [];
  trashCans: TrashCan[] = [];
  litter: Map<number, number> = new Map();  // tileKey → amount (1-4)
  visitorAnim: VisitorFurnitureAnim[] = [];

  private benchMap: Map<number, number> = new Map(); // tileKey → bench index
  private trashMap: Map<number, number> = new Map(); // tileKey → trash index

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.visitorAnim.push({ sittingOnBench: false, throwingTrash: 0 });
    }
  }

  /* ── Placement ── */

  canPlaceBench(sim: SimExports, x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    if (!isPath(sim.tileAt(x, y))) return false;
    const k = tileKey(x, y);
    return !this.benchMap.has(k) && !this.trashMap.has(k);
  }

  canPlaceTrashCan(sim: SimExports, x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    if (!isPath(sim.tileAt(x, y))) return false;
    const k = tileKey(x, y);
    return !this.benchMap.has(k) && !this.trashMap.has(k);
  }

  placeBench(sim: SimExports, x: number, y: number): boolean {
    if (!this.canPlaceBench(sim, x, y)) return false;
    const bench: Bench = { x, y, broken: false, seated: [], restTimers: [] };
    const idx = this.benches.length;
    this.benches.push(bench);
    this.benchMap.set(tileKey(x, y), idx);
    return true;
  }

  placeTrashCan(sim: SimExports, x: number, y: number): boolean {
    if (!this.canPlaceTrashCan(sim, x, y)) return false;
    const tc: TrashCan = { x, y, broken: false, fill: 0 };
    const idx = this.trashCans.length;
    this.trashCans.push(tc);
    this.trashMap.set(tileKey(x, y), idx);
    return true;
  }

  removeFurnitureAt(x: number, y: number): boolean {
    const k = tileKey(x, y);
    if (this.benchMap.has(k)) {
      const idx = this.benchMap.get(k)!;
      // Unseat any guests
      this.benches[idx].seated = [];
      this.benches[idx].restTimers = [];
      this.benches.splice(idx, 1);
      this.rebuildMaps();
      return true;
    }
    if (this.trashMap.has(k)) {
      const idx = this.trashMap.get(k)!;
      this.trashCans.splice(idx, 1);
      this.rebuildMaps();
      return true;
    }
    return false;
  }

  hasFurnitureAt(x: number, y: number): boolean {
    const k = tileKey(x, y);
    return this.benchMap.has(k) || this.trashMap.has(k);
  }

  getBenchAt(x: number, y: number): Bench | null {
    const k = tileKey(x, y);
    if (!this.benchMap.has(k)) return null;
    return this.benches[this.benchMap.get(k)!];
  }

  getTrashCanAt(x: number, y: number): TrashCan | null {
    const k = tileKey(x, y);
    if (!this.trashMap.has(k)) return null;
    return this.trashCans[this.trashMap.get(k)!];
  }

  getLitterAt(x: number, y: number): number {
    return this.litter.get(tileKey(x, y)) ?? 0;
  }

  getLitterCount(): number {
    return this.litter.size;
  }

  /* ── Tick ── */

  tick(sim: SimExports): void {
    const tickCount = sim.getTickCount();

    for (let i = 0; i < 100; i++) {
      const state = sim.getVisitorState(i);
      if (state === VisitorState.Inactive) {
        this.unseatVisitor(i);
        this.visitorAnim[i].sittingOnBench = false;
        continue;
      }

      // Decrement throw animation
      if (this.visitorAnim[i].throwingTrash > 0) {
        this.visitorAnim[i].throwingTrash--;
      }

      const vx = sim.getVisitorX(i);
      const vy = sim.getVisitorY(i);

      if (state === VisitorState.Walking && sim.getVisitorIsCriminal(i) === 1) {
        const didVandalize = this.tryCriminalVandalism(sim, i, vx, vy);
        if (didVandalize) {
          continue;
        }
      }

      // Litter satisfaction penalty (mirrors puke logic in WASM)
      if (state === VisitorState.Walking && tickCount % LITTER_SAT_INTERVAL === 0) {
        if (this.litter.has(tileKey(vx, vy))) {
          // We can't directly decrease WASM satisfaction, but we mark the tile
          // as "dirty" so the HUD status label picks it up.
          // The visual tint in Renderer will also darken the guest.
        }
      }

      // Handle ride completion → trash / eating on bench
      if (state === VisitorState.Riding) {
        // While riding, check if on bench
        if (this.visitorAnim[i].sittingOnBench) {
          this.handleBenchSitting(sim, i);
        }
      }

      // Handle guests finishing food/drink (state transitions from Riding → Walking)
      // Trash generation happens in the previous frame via trackFoodCompletion
    }

    // Check for guests who should sit on benches (walking, tired/hungry)
    if (tickCount % 3 === 0) {
      this.checkBenchSitting(sim);
    }

    // Cleaners pick up litter (when idle with no puke to clean)
    this.updateCleanerLitter(sim);

    // Idle mechanics can repair vandalized furniture they reach.
    this.updateMechanicFurnitureRepairs(sim);
  }

  /** Called when a visitor finishes eating/drinking at a food/drink stall */
  onFoodDrinkComplete(sim: SimExports, visitorIdx: number): void {
    const vx = sim.getVisitorX(visitorIdx);
    const vy = sim.getVisitorY(visitorIdx);

    // Find nearest trash can within radius
    const tc = this.findNearestTrashCan(vx, vy);
    if (tc && !tc.broken && tc.fill < TRASHCAN_CAPACITY) {
      tc.fill++;
      this.visitorAnim[visitorIdx].throwingTrash = TRASH_THROW_ANIM_TICKS;
    } else {
      // No trash can nearby → litter on ground
      this.addLitter(vx, vy);
    }
  }

  /** Called by the cleaner to empty a full trash can */
  emptyTrashCan(tc: TrashCan): void {
    if (tc.broken) return;
    tc.fill = 0;
  }

  /* ── Internal ── */

  private findNearestTrashCan(x: number, y: number): TrashCan | null {
    let best: TrashCan | null = null;
    let bestDist = Infinity;
    for (const tc of this.trashCans) {
      if (tc.broken) continue;
      if (tc.fill >= TRASHCAN_CAPACITY) continue;
      const d = Math.abs(tc.x - x) + Math.abs(tc.y - y);
      if (d <= TRASHCAN_SEARCH_RADIUS && d < bestDist) {
        bestDist = d;
        best = tc;
      }
    }
    return best;
  }

  private addLitter(x: number, y: number): void {
    const k = tileKey(x, y);
    const cur = this.litter.get(k) ?? 0;
    if (cur < 4) {
      this.litter.set(k, cur + 1);
    }
  }

  private checkBenchSitting(sim: SimExports): void {
    for (const bench of this.benches) {
      if (bench.broken) continue;
      if (bench.seated.length >= BENCH_MAX_GUESTS) continue;
      // Find a walking visitor on or adjacent to the bench tile
      for (let i = 0; i < 100; i++) {
        if (bench.seated.length >= BENCH_MAX_GUESTS) break;
        if (sim.getVisitorState(i) !== VisitorState.Walking) continue;
        if (this.visitorAnim[i].sittingOnBench) continue;
        const vx = sim.getVisitorX(i);
        const vy = sim.getVisitorY(i);
        if (vx !== bench.x || vy !== bench.y) continue;

        // Only sit if hungry/thirsty or low satisfaction (resting)
        const hunger = sim.getVisitorHunger(i);
        const thirst = sim.getVisitorThirst(i);
        const sat = sim.getVisitorSatisfaction(i);
        if (hunger < 40 && thirst < 40 && sat > 50) continue;

        bench.seated.push(i);
        bench.restTimers.push(BENCH_REST_TICKS);
        this.visitorAnim[i].sittingOnBench = true;
      }
    }
  }

  private handleBenchSitting(sim: SimExports, visitorIdx: number): void {
    for (const bench of this.benches) {
      const seatIdx = bench.seated.indexOf(visitorIdx);
      if (seatIdx === -1) continue;
      bench.restTimers[seatIdx]--;
      if (bench.restTimers[seatIdx] <= 0) {
        this.unseatFromBench(bench, seatIdx, visitorIdx);
      }
      return;
    }
  }

  private unseatVisitor(visitorIdx: number): void {
    if (!this.visitorAnim[visitorIdx].sittingOnBench) return;
    for (const bench of this.benches) {
      const seatIdx = bench.seated.indexOf(visitorIdx);
      if (seatIdx !== -1) {
        this.unseatFromBench(bench, seatIdx, visitorIdx);
        return;
      }
    }
    this.visitorAnim[visitorIdx].sittingOnBench = false;
  }

  private unseatFromBench(bench: Bench, seatIdx: number, visitorIdx: number): void {
    bench.seated.splice(seatIdx, 1);
    bench.restTimers.splice(seatIdx, 1);
    this.visitorAnim[visitorIdx].sittingOnBench = false;
  }

  private updateCleanerLitter(sim: SimExports): void {
    const cleanerCount = sim.getCleanerCount();
    for (let c = 0; c < cleanerCount; c++) {
      // Only pick up litter if cleaner is idle (no puke target and not cleaning)
      const tx = sim.getCleanerTargetX(c);
      const ty = sim.getCleanerTargetY(c);
      const timer = sim.getCleanerCleanTimer(c);
      if (timer > 0) continue;
      if (tx >= 0 && ty >= 0 && sim.getPukeAt(tx, ty) > 0) continue;

      const cx = sim.getCleanerX(c);
      const cy = sim.getCleanerY(c);

      // Check current tile for litter
      const k = tileKey(cx, cy);
      if (this.litter.has(k)) {
        const cur = this.litter.get(k)!;
        if (cur <= 1) {
          this.litter.delete(k);
        } else {
          this.litter.set(k, cur - 1);
        }
        continue;
      }

      // Notice and clean the nearest litter spot in range while idle.
      let bestLitterKey = -1;
      let bestLitterDist = Number.MAX_SAFE_INTEGER;
      for (const lk of this.litter.keys()) {
        const lx = lk % MAP_W;
        const ly = Math.floor(lk / MAP_W);
        const d = Math.abs(lx - cx) + Math.abs(ly - cy);
        if (d <= CLEANER_NOTICE_RADIUS && d < bestLitterDist) {
          bestLitterDist = d;
          bestLitterKey = lk;
        }
      }
      if (bestLitterKey >= 0) {
        const cur = this.litter.get(bestLitterKey) ?? 0;
        if (cur <= 1) this.litter.delete(bestLitterKey);
        else this.litter.set(bestLitterKey, cur - 1);
        continue;
      }

      // Also empty nearby trash cans while idle.
      let bestTrash: TrashCan | null = null;
      let bestTrashDist = Number.MAX_SAFE_INTEGER;
      for (const tc of this.trashCans) {
        if (tc.broken) continue;
        if (tc.fill <= 0) continue;
        const d = Math.abs(tc.x - cx) + Math.abs(tc.y - cy);
        if (d <= CLEANER_NOTICE_RADIUS && d < bestTrashDist) {
          bestTrash = tc;
          bestTrashDist = d;
        }
      }
      if (bestTrash) {
        this.emptyTrashCan(bestTrash);
      }
    }
  }

  private updateMechanicFurnitureRepairs(sim: SimExports): void {
    const mechanicCount = sim.getMechanicCount();
    for (let m = 0; m < mechanicCount; m++) {
      // Skip mechanics actively assigned to attraction repairs.
      if (sim.getMechanicTarget(m) >= 0 || sim.getMechanicRepairTimer(m) > 0) continue;

      const mx = sim.getMechanicX(m);
      const my = sim.getMechanicY(m);

      let repaired = false;
      for (const bench of this.benches) {
        if (!bench.broken) continue;
        if (Math.abs(bench.x - mx) + Math.abs(bench.y - my) <= 1) {
          bench.broken = false;
          repaired = true;
          break;
        }
      }
      if (repaired) continue;

      for (const tc of this.trashCans) {
        if (!tc.broken) continue;
        if (Math.abs(tc.x - mx) + Math.abs(tc.y - my) <= 1) {
          tc.broken = false;
          break;
        }
      }
    }
  }

  private tryCriminalVandalism(sim: SimExports, visitorIdx: number, x: number, y: number): boolean {
    const bench = this.getBenchAt(x, y);
    if (bench && !bench.broken) {
      bench.broken = true;
      bench.seated = [];
      bench.restTimers = [];
      sim.reportVandalism(x, y);
      sim.triggerCriminalEscape(visitorIdx);
      return true;
    }

    const tc = this.getTrashCanAt(x, y);
    if (tc && !tc.broken) {
      tc.broken = true;
      sim.reportVandalism(x, y);
      sim.triggerCriminalEscape(visitorIdx);
      return true;
    }

    return false;
  }

  private rebuildMaps(): void {
    this.benchMap.clear();
    this.trashMap.clear();
    for (let i = 0; i < this.benches.length; i++) {
      this.benchMap.set(tileKey(this.benches[i].x, this.benches[i].y), i);
    }
    for (let i = 0; i < this.trashCans.length; i++) {
      this.trashMap.set(tileKey(this.trashCans[i].x, this.trashCans[i].y), i);
    }
  }

  getSnapshot(): FurnitureSnapshot {
    return {
      benches: this.benches.map((b) => ({
        x: b.x,
        y: b.y,
        broken: b.broken,
        seated: [...b.seated],
        restTimers: [...b.restTimers],
      })),
      trashCans: this.trashCans.map((t) => ({ x: t.x, y: t.y, broken: t.broken, fill: t.fill })),
      litter: Array.from(this.litter.entries()).map(([key, amount]) => ({ key, amount })),
      visitorAnim: this.visitorAnim.map((v) => ({
        sittingOnBench: v.sittingOnBench,
        throwingTrash: v.throwingTrash,
      })),
    };
  }

  restoreSnapshot(snapshot: FurnitureSnapshot): void {
    this.benches = snapshot.benches.map((b) => ({
      x: b.x,
      y: b.y,
      broken: b.broken,
      seated: [...b.seated],
      restTimers: [...b.restTimers],
    }));
    this.trashCans = snapshot.trashCans.map((t) => ({ x: t.x, y: t.y, broken: t.broken, fill: t.fill }));
    this.litter = new Map(snapshot.litter.map((entry) => [entry.key, entry.amount]));

    this.visitorAnim = [];
    for (let i = 0; i < 100; i++) {
      const src = snapshot.visitorAnim[i];
      this.visitorAnim.push(src
        ? { sittingOnBench: src.sittingOnBench, throwingTrash: src.throwingTrash }
        : { sittingOnBench: false, throwingTrash: 0 });
    }

    this.rebuildMaps();
  }
}
