import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  findAnotherEmptyRect,
  findEmptyRect,
  loadSim,
  runTicks,
  type Sim,
} from '../helpers/simHarness';

let sim: Sim;

beforeAll(async () => {
  sim = await loadSim();

  // Template with low appeal to verify effective-appeal floor behavior.
  sim.configureAttraction(0, 1, 1, 100, 2, 4, 0, 12, 15, 0, 0, 0);
  sim.configureAttraction(1, 1, 1, 140, 3, 4, 1, 40, 20, 0, 0, 0);
});

beforeEach(() => {
  sim.initSimulation();
});

describe('attraction calculations', () => {
  it('calculates attraction age in months and applies effective-appeal floor', () => {
    const pos = findEmptyRect(sim, 1, 1);
    const idx = sim.placeAttraction(0, pos.x, pos.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    runTicks(sim, 9000);

    expect(sim.getInstAgeMonths(idx)).toBe(3);
    // base 12 - age 3 = 9, floored to max(10, base/2=6) => 10
    expect(sim.getInstEffectiveAppeal(idx)).toBe(10);
  });

  it('updates placed-attraction count after placement and demolish', () => {
    const first = findEmptyRect(sim, 1, 1);
    const second = findAnotherEmptyRect(sim, 1, 1, first.x, first.y);

    const a = sim.placeAttraction(0, first.x, first.y);
    const b = sim.placeAttraction(1, second.x, second.y);

    expect(a).toBeGreaterThanOrEqual(0);
    expect(b).toBeGreaterThanOrEqual(0);
    expect(sim.getPlacedAttractionCount()).toBe(2);

    expect(sim.demolish(first.x, first.y)).toBe(1);
    expect(sim.getPlacedAttractionCount()).toBe(1);
  });

  it('allows attractions to break down as they age', () => {
    const pos = findEmptyRect(sim, 1, 1);
    const idx = sim.placeAttraction(1, pos.x, pos.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    runTicks(sim, 18000);

    expect(sim.getInstBroken(idx)).toBe(1);
  });
});
