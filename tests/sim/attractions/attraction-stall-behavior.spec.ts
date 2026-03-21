import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { findEmptyRect, loadSim, type Sim } from '../helpers/simHarness';

const CAT_FOOD = 3;
const CAT_FUN = 0;
const QUEUING_STATE = 2;
const STALL_TEMPLATE_ID = 19;
const FUN_TEMPLATE_ID = 18;

let sim: Sim;
let stallInstanceId = -1;

function setupConnectedAttraction(templateId: number): number {
  const pos = findEmptyRect(sim, 1, 1);
  const pathX = pos.x;
  const pathY = pos.y < 49 ? pos.y + 1 : pos.y - 1;

  // Build a guaranteed connected path from the entrance to the stall-adjacent tile.
  let x = 25;
  let y = 49;
  while (x !== pathX) {
    x += x < pathX ? 1 : -1;
    sim.placePath(x, y);
  }
  while (y !== pathY) {
    y += y < pathY ? 1 : -1;
    sim.placePath(x, y);
  }

  const idx = sim.placeAttraction(templateId, pos.x, pos.y);
  return idx;
}

beforeAll(async () => {
  sim = await loadSim();
  sim.configureAttraction(
    STALL_TEMPLATE_ID,
    1,
    1,
    100,
    4,
    1,
    CAT_FOOD,
    95,
    180,
    0,
    0,
    0,
  );
  sim.configureAttraction(
    FUN_TEMPLATE_ID,
    1,
    1,
    100,
    4,
    3,
    CAT_FUN,
    95,
    40,
    0,
    0,
    0,
  );
});

beforeEach(() => {
  sim.initSimulation();
  sim.setBudget(100000);
  sim.setEntranceTicket(0);
  stallInstanceId = setupConnectedAttraction(STALL_TEMPLATE_ID);
  expect(stallInstanceId).toBeGreaterThanOrEqual(0);
});

describe('stall behavior and attraction metrics', () => {
  it('does not place visitors into queue state for food stalls', () => {
    let queuedForStall = false;

    for (let t = 0; t < 4000 && !queuedForStall; t++) {
      sim.tick();
      for (let i = 0; i < 100; i++) {
        if (sim.getVisitorState(i) === QUEUING_STATE && sim.getVisitorTarget(i) === stallInstanceId) {
          queuedForStall = true;
          break;
        }
      }
    }

    expect(queuedForStall).toBe(false);
  });

  it('tracks visitors and revenue per attraction', () => {
    const revenueInstanceId = setupConnectedAttraction(FUN_TEMPLATE_ID);
    expect(revenueInstanceId).toBeGreaterThanOrEqual(0);

    expect(sim.getInstTotalVisitors(revenueInstanceId)).toBe(0);
    expect(sim.getInstTotalRevenue(revenueInstanceId)).toBe(0);
    expect(sim.getInstMonthlyRevenue(revenueInstanceId)).toBe(0);

    for (let t = 0; t < 5000; t++) {
      sim.tick();
    }

    const visitors = sim.getInstTotalVisitors(revenueInstanceId);
    const totalRevenue = sim.getInstTotalRevenue(revenueInstanceId);
    const monthlyRevenue = sim.getInstMonthlyRevenue(revenueInstanceId);

    expect(visitors).toBeGreaterThanOrEqual(0);
    expect(totalRevenue).toBeGreaterThanOrEqual(0);
    expect(monthlyRevenue).toBeGreaterThanOrEqual(0);
    expect(monthlyRevenue).toBeLessThanOrEqual(totalRevenue);
    if (visitors > 0) {
      expect(totalRevenue).toBe(visitors * 4);
    }
  });
});
