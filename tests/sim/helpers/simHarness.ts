import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const VisitorState = {
  Entering: 0,
  Walking: 1,
  Queuing: 2,
  Riding: 3,
  Leaving: 4,
  Inactive: 255,
} as const;

export type Sim = {
  initSimulation(): void;
  tick(): void;
  tileAt(x: number, y: number): number;
  getTickCount(): number;

  configureAttraction(
    id: number,
    fw: number,
    fh: number,
    price: number,
    ticket: number,
    capacity: number,
    category: number,
    appeal: number,
    rideTicks: number,
    monthlyOperatingCost: number,
    requiredExcitement: number,
    nauseaGain: number,
  ): void;

  placeAttraction(templateId: number, x: number, y: number): number;
  placeAttractionWithEndpoints(templateId: number, x: number, y: number, entryX: number, entryY: number, exitX: number, exitY: number): number;
  placePath(x: number, y: number): number;
  placePathVariant(x: number, y: number, variant: number): number;
  getPlacedAttractionCount(): number;
  demolish(x: number, y: number): number;

  setBudget(budget: number): void;
  getBudget(): number;
  setEntranceTicket(price: number): void;
  getEntranceTicket(): number;
  getTotalIncome(): number;

  hireMechanic(): number;
  hireCleaner(): number;
  hireSecurity(): number;
  hireEntertainer(): number;
  fireMechanic(index: number): number;
  fireCleaner(index: number): number;
  fireSecurity(index: number): number;
  fireEntertainer(index: number): number;
  setMechanicArea(index: number, x: number, y: number): number;
  setCleanerArea(index: number, x: number, y: number): number;
  setSecurityArea(index: number, x: number, y: number): number;
  setEntertainerArea(index: number, x: number, y: number): number;
  getMechanicCount(): number;
  getCleanerCount(): number;
  getSecurityCount(): number;
  getEntertainerCount(): number;
  getMechanicX(i: number): number;
  getMechanicY(i: number): number;
  getCleanerX(i: number): number;
  getCleanerY(i: number): number;
  getSecurityX(i: number): number;
  getSecurityY(i: number): number;
  getEntertainerX(i: number): number;
  getEntertainerY(i: number): number;
  getEntertainerGuestsCheered(i: number): number;
  getCleanerAreaCount(i: number): number;
  getCleanerAreaX(i: number, areaIndex: number): number;
  getCleanerAreaY(i: number, areaIndex: number): number;
  getVisitorSatisfaction(i: number): number;

  generateTerrain(seed: number): void;
  getTileHeight(x: number, y: number): number;
  getBaseHeight(): number;
  placePathAtHeight(x: number, y: number, height: number, variant: number): void;
  removePathAtHeight(x: number, y: number, height: number): void;
  getPathAtHeight(x: number, y: number, height: number): number;
  getPathLevelRampDir(x: number, y: number, height: number): number;
  getPathLevelCount(x: number, y: number): number;
  isBridge(x: number, y: number, height: number): number;
  isTunnel(x: number, y: number, height: number): number;

  getActiveVisitors(): number;
  getVisitorX(i: number): number;
  getVisitorY(i: number): number;
  getVisitorState(i: number): number;
  relocateVisitor(visitorIndex: number, x: number, y: number): number;
  getVisitorTarget(i: number): number;
  getVisitorWallet(i: number): number;
  getVisitorBalloonTimer(i: number): number;
  getVisitorUmbrellaTimer(i: number): number;
  setIsRaining(raining: number): void;
  getParkAttractiveness(): number;
  setCriminalRate(ratePerThousand: number): void;

  getInstAgeMonths(i: number): number;
  getInstEffectiveAppeal(i: number): number;
  getInstQueueLength(i: number): number;
  getInstWaitTicks(i: number): number;
  getInstPopularity(i: number): number;
  getInstEntranceX(i: number): number;
  getInstEntranceY(i: number): number;
  getInstExitX(i: number): number;
  getInstExitY(i: number): number;
  getInstBroken(i: number): number;
  getInstRiders(i: number): number;
  getInstTotalVisitors(i: number): number;
  getInstTotalRevenue(i: number): number;
  getInstMonthlyRevenue(i: number): number;

  // Behavior test wrappers
  testBfsPath(sx: number, sy: number, tx: number, ty: number): number;
  testBfsNextStep(sx: number, sy: number, tx: number, ty: number): number;
  testRandomWalkStepLevel(cx: number, cy: number, cl: number): number;
  testRandomRoamStepLevel(cx: number, cy: number, cl: number, goalX: number, goalY: number): number;
  getRngStateForTest(): number;
  setRngStateForTest(state: number): void;
  nextRandForTest(): number;
  testFindAdjacentPath(instIdx: number): number;
  testCalcRepairTicks(instIdx: number): number;
  testHasSecurityNearby(x: number, y: number, radius: number): number;
};

export async function loadSim(): Promise<Sim> {
  const wasmPath = resolve(process.cwd(), 'public', 'simulation.wasm');
  const bytes = readFileSync(wasmPath);
  const memory = new WebAssembly.Memory({ initial: 64, maximum: 256 });

  const imports = {
    env: {
      memory,
      abort: () => {
        throw new Error('WASM abort');
      },
      seed: () => 0.42,
    },
  };

  const module = await WebAssembly.instantiate(bytes, imports);
  return module.instance.exports as unknown as Sim;
}

export function runTicks(sim: Sim, count: number): void {
  for (let i = 0; i < count; i++) sim.tick();
}

export function findFirstActiveVisitor(sim: Sim): number {
  for (let i = 0; i < 100; i++) {
    if (sim.getVisitorState(i) !== VisitorState.Inactive) return i;
  }
  return -1;
}

export function findEmptyRect(sim: Sim, w: number, h: number): { x: number; y: number } {
  for (let y = 0; y <= 50 - h; y++) {
    for (let x = 0; x <= 50 - w; x++) {
      let ok = true;
      for (let dy = 0; dy < h && ok; dy++) {
        for (let dx = 0; dx < w; dx++) {
          if (sim.tileAt(x + dx, y + dy) !== 0) {
            ok = false;
            break;
          }
        }
      }
      if (ok) return { x, y };
    }
  }
  throw new Error(`No empty ${w}x${h} area found`);
}

export function findAnotherEmptyRect(
  sim: Sim,
  w: number,
  h: number,
  avoidX: number,
  avoidY: number,
): { x: number; y: number } {
  for (let y = 0; y <= 50 - h; y++) {
    for (let x = 0; x <= 50 - w; x++) {
      if (x === avoidX && y === avoidY) continue;

      let ok = true;
      for (let dy = 0; dy < h && ok; dy++) {
        for (let dx = 0; dx < w; dx++) {
          if (sim.tileAt(x + dx, y + dy) !== 0) {
            ok = false;
            break;
          }
        }
      }

      if (ok) return { x, y };
    }
  }

  throw new Error(`No second empty ${w}x${h} area found`);
}
