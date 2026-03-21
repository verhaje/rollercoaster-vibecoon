import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { findEmptyRect, findFirstActiveVisitor, loadSim, runTicks, type Sim } from '../helpers/simHarness';

let sim: Sim;

beforeAll(async () => {
  sim = await loadSim();
  // Compact ride templates used by employee-behavior unit checks.
  sim.configureAttraction(0, 1, 1, 120, 3, 4, 0, 60, 20, 0, 0, 0);
  sim.configureAttraction(1, 1, 1, 300, 3, 4, 0, 60, 20, 0, 0, 0);
});

beforeEach(() => {
  sim.initSimulation();
});

describe('employee behavior', () => {
  it('hires mechanic, cleaner, and security and charges hiring costs', () => {
    const startBudget = sim.getBudget();

    expect(sim.hireMechanic()).toBe(1);
    expect(sim.hireCleaner()).toBe(1);
    expect(sim.hireSecurity()).toBe(1);

    expect(sim.getMechanicCount()).toBe(1);
    expect(sim.getCleanerCount()).toBe(1);
    expect(sim.getSecurityCount()).toBe(1);

    // 350 + 300 + 420
    expect(sim.getBudget()).toBe(startBudget - 1070);
  });

  it('applies monthly salary costs for hired employees', () => {
    expect(sim.hireMechanic()).toBe(1);
    expect(sim.hireCleaner()).toBe(1);
    expect(sim.hireSecurity()).toBe(1);

    runTicks(sim, 3000);

    // Initial 10000 - hire costs 1070 - monthly salaries (75 + 55 + 80)
    expect(sim.getBudget()).toBe(8720);
  });

  it('prevents hiring when budget is too low', () => {
    sim.setBudget(100);

    expect(sim.hireMechanic()).toBe(0);
    expect(sim.hireCleaner()).toBe(0);
    expect(sim.hireSecurity()).toBe(0);

    expect(sim.getMechanicCount()).toBe(0);
    expect(sim.getCleanerCount()).toBe(0);
    expect(sim.getSecurityCount()).toBe(0);
  });

  it('can fire employees and update counts', () => {
    expect(sim.hireMechanic()).toBe(1);
    expect(sim.hireCleaner()).toBe(1);
    expect(sim.hireSecurity()).toBe(1);

    expect(sim.fireMechanic(0)).toBe(1);
    expect(sim.fireCleaner(0)).toBe(1);
    expect(sim.fireSecurity(0)).toBe(1);

    expect(sim.getMechanicCount()).toBe(0);
    expect(sim.getCleanerCount()).toBe(0);
    expect(sim.getSecurityCount()).toBe(0);
  });

  it('supports assigning cleaner patrol areas', () => {
    expect(sim.hireCleaner()).toBe(1);
    const x = sim.getCleanerX(0);
    const y = sim.getCleanerY(0);

    expect(sim.setCleanerArea(0, x, y)).toBe(1);
    expect(sim.getCleanerAreaCount(0)).toBe(1);
    expect(sim.getCleanerAreaX(0, 0)).toBe(x);
    expect(sim.getCleanerAreaY(0, 0)).toBe(y);
  });

  it('idle employees wander or patrol instead of staying still', () => {
    expect(sim.hireCleaner()).toBe(1);
    // Build a short path from the entrance so idle movement has reachable tiles.
    expect(sim.placePath(25, 48)).toBe(1);
    expect(sim.placePath(24, 48)).toBe(1);
    expect(sim.placePath(26, 48)).toBe(1);
    const startX = sim.getCleanerX(0);
    const startY = sim.getCleanerY(0);

    runTicks(sim, 60);

    const endX = sim.getCleanerX(0);
    const endY = sim.getCleanerY(0);
    expect(endX !== startX || endY !== startY).toBe(true);
  });

  it('finds adjacent queue path before regular path for repairs', () => {
    const area = findEmptyRect(sim, 3, 3);
    const cx = area.x + 1;
    const cy = area.y + 1;
    const inst = sim.placeAttraction(0, cx, cy);
    expect(inst).toBeGreaterThanOrEqual(0);

    expect(sim.placePath(cx - 1, cy)).toBe(1);
    expect(sim.placePathVariant(cx + 1, cy, 3)).toBe(1);

    const packed = sim.testFindAdjacentPath(inst);
    expect(packed).not.toBe(-1);
    expect(packed & 0xffff).toBe(cx + 1);
    expect((packed >>> 16) & 0xffff).toBe(cy);
  });

  it('calculates more repair time for older attractions', () => {
    const oldPos = findEmptyRect(sim, 1, 1);
    const oldInst = sim.placeAttraction(1, oldPos.x, oldPos.y);
    expect(oldInst).toBeGreaterThanOrEqual(0);
    const initialTicks = sim.testCalcRepairTicks(oldInst);

    runTicks(sim, 3000);

    const laterTicks = sim.testCalcRepairTicks(oldInst);
    expect(laterTicks).toBeGreaterThan(initialTicks);
  });

  it('reports whether security is nearby a tile', () => {
    expect(sim.hireSecurity()).toBe(1);
    const sx = sim.getSecurityX(0);
    const sy = sim.getSecurityY(0);

    expect(sim.testHasSecurityNearby(sx, sy, 0)).toBe(1);
    expect(sim.testHasSecurityNearby(0, 0, 1)).toBe(0);
  });

  it('hires entertainer and applies entertainer hiring cost', () => {
    const startBudget = sim.getBudget();
    expect(sim.hireEntertainer()).toBe(1);
    expect(sim.getEntertainerCount()).toBe(1);
    expect(sim.getBudget()).toBe(startBudget - 380);
  });

  it('entertainer cheers nearby guests and boosts satisfaction', () => {
    const rideSpot = findEmptyRect(sim, 1, 1);
    expect(sim.placeAttraction(0, rideSpot.x, rideSpot.y)).toBeGreaterThanOrEqual(0);
    expect(sim.hireEntertainer()).toBe(1);

    runTicks(sim, 200);
    const visitor = findFirstActiveVisitor(sim);
    expect(visitor).toBeGreaterThanOrEqual(0);

    const ex = sim.getEntertainerX(0);
    const ey = sim.getEntertainerY(0);
    expect(sim.relocateVisitor(visitor, ex, ey)).toBe(1);

    const before = sim.getVisitorSatisfaction(visitor);
    const currentTick = sim.getTickCount();
    let ticksToCheer = 12;
    for (let n = 1; n <= 24; n++) {
      const tick = currentTick + n;
      if (tick % 12 === 0 && tick % 8 !== 0 && tick % 10 !== 0) {
        ticksToCheer = n;
        break;
      }
    }
    runTicks(sim, ticksToCheer);

    const after = sim.getVisitorSatisfaction(visitor);
    expect(after).toBeGreaterThan(before);
    expect(sim.getEntertainerGuestsCheered(0)).toBeGreaterThan(0);
  });
});
