import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { loadSim, type Sim } from '../helpers/simHarness';

let sim: Sim;

beforeAll(async () => {
  sim = await loadSim();
});

beforeEach(() => {
  sim.initSimulation();
});

describe('rng behavior', () => {
  it('produces deterministic sequences for the same seed', () => {
    sim.setRngStateForTest(24681357);
    const seqA = [
      sim.nextRandForTest(),
      sim.nextRandForTest(),
      sim.nextRandForTest(),
      sim.nextRandForTest(),
      sim.nextRandForTest(),
    ];

    sim.setRngStateForTest(24681357);
    const seqB = [
      sim.nextRandForTest(),
      sim.nextRandForTest(),
      sim.nextRandForTest(),
      sim.nextRandForTest(),
      sim.nextRandForTest(),
    ];

    expect(seqA).toEqual(seqB);
  });

  it('returns non-negative values from nextRand', () => {
    sim.setRngStateForTest(97531);
    for (let i = 0; i < 64; i++) {
      expect(sim.nextRandForTest()).toBeGreaterThanOrEqual(0);
    }
  });

  it('initializes random state from host seed during simulation init', () => {
    sim.setRngStateForTest(17);
    sim.initSimulation();

    const seeded = sim.getRngStateForTest();
    expect(seeded).not.toBe(0);
    expect(seeded).not.toBe(17);
  });
});
