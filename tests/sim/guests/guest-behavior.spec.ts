import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  findFirstActiveVisitor,
  findEmptyRect,
  loadSim,
  runTicks,
  type Sim,
  VisitorState,
} from '../helpers/simHarness';

let sim: Sim;

beforeAll(async () => {
  sim = await loadSim();

  // Basic attraction used to enable visitor spawning in tests.
  sim.configureAttraction(0, 1, 1, 120, 3, 4, 0, 60, 20, 0, 0, 0);
  sim.configureAttraction(17, 1, 1, 80, 0, 6, 0, 75, 6, 0, 0, 0);
  sim.configureAttraction(18, 1, 1, 80, 0, 6, 2, 75, 6, 0, 0, 0);
});

beforeEach(() => {
  sim.initSimulation();
});

describe('guest behavior', () => {
  it('spawns guests and charges entrance ticket when they enter', () => {
    const pos = findEmptyRect(sim, 1, 1);
    expect(sim.placeAttraction(0, pos.x, pos.y)).toBeGreaterThanOrEqual(0);

    const incomeBefore = sim.getTotalIncome();
    const ticket = sim.getEntranceTicket();

    sim.tick();

    expect(sim.getActiveVisitors()).toBeGreaterThan(0);
    const guest = findFirstActiveVisitor(sim);
    expect(guest).toBeGreaterThanOrEqual(0);
    expect(sim.getVisitorState(guest)).toBe(VisitorState.Walking);
    expect(sim.getTotalIncome()).toBe(incomeBefore + ticket);
  });

  it('marks guests as leaving when they cannot afford the entrance ticket', () => {
    const pos = findEmptyRect(sim, 1, 1);
    expect(sim.placeAttraction(0, pos.x, pos.y)).toBeGreaterThanOrEqual(0);

    sim.setEntranceTicket(500);
    sim.tick();

    const guest = findFirstActiveVisitor(sim);
    expect(guest).toBeGreaterThanOrEqual(0);
    expect(sim.getVisitorWallet(guest)).toBeLessThan(sim.getEntranceTicket());
    expect(sim.getVisitorState(guest)).toBe(VisitorState.Leaving);

    runTicks(sim, 40);
    expect(sim.getActiveVisitors()).toBe(0);
    expect(sim.getTotalIncome()).toBe(0);
  });

  it('enters rides, stays for ride duration, then exits back to walking', () => {
    // Short ride with free ticket makes the full ride cycle deterministic.
    sim.configureAttraction(14, 1, 1, 80, 0, 20, 0, 60, 4, 0, 0, 0);
    // Place right above the entrance tile so there is always a reachable adjacent path.
    const inst = sim.placeAttraction(14, 25, 48);
    expect(inst).toBeGreaterThanOrEqual(0);

    let rider = -1;
    for (let tick = 0; tick < 500; tick++) {
      sim.tick();
      for (let i = 0; i < 100; i++) {
        if (sim.getVisitorState(i) === VisitorState.Riding && sim.getVisitorTarget(i) === inst) {
          rider = i;
          break;
        }
      }
      if (rider >= 0) break;
    }

    expect(rider).toBeGreaterThanOrEqual(0);
    expect(sim.getInstRiders(inst)).toBeGreaterThan(0);

    for (let tick = 0; tick < 20; tick++) {
      sim.tick();
      if (sim.getVisitorState(rider) === VisitorState.Walking) break;
    }

    expect(sim.getVisitorState(rider)).toBe(VisitorState.Walking);
    expect(sim.getVisitorTarget(rider)).toBe(-1);
    expect(sim.getInstRiders(inst)).toBeGreaterThanOrEqual(0);
  });

  it('drops riders at the configured attraction exit tile', () => {
    sim.configureAttraction(19, 1, 1, 80, 0, 6, 0, 70, 8, 0, 0, 0);
    const inst = sim.placeAttractionWithEndpoints(19, 25, 48, 25, 49, 24, 49);
    expect(inst).toBeGreaterThanOrEqual(0);

    let rider = -1;
    let leftAtExit = false;
    let prevState = VisitorState.Inactive;

    for (let tick = 0; tick < 900 && !leftAtExit; tick++) {
      sim.tick();
      for (let i = 0; i < 100; i++) {
        const state = sim.getVisitorState(i);
        if (state === VisitorState.Riding && sim.getVisitorTarget(i) === inst) {
          rider = i;
        }
        if (i === rider && prevState === VisitorState.Riding && state === VisitorState.Walking) {
          leftAtExit = sim.getVisitorX(i) === 24 && sim.getVisitorY(i) === 49;
        }
        if (i === rider) prevState = state;
      }
    }

    expect(rider).toBeGreaterThanOrEqual(0);
    expect(leftAtExit).toBe(true);
  });

  it('reduces ride popularity when queue wait line grows', () => {
    sim.setEntranceTicket(0);
    sim.configureAttraction(13, 1, 1, 120, 0, 1, 0, 85, 90, 0, 0, 0);
    const inst = sim.placeAttractionWithEndpoints(13, 25, 48, 25, 49, 24, 49);
    expect(inst).toBeGreaterThanOrEqual(0);

    let sawQueue = false;
    for (let tick = 0; tick < 1400; tick++) {
      sim.tick();
      if (sim.getInstQueueLength(inst) > 0) {
        sawQueue = true;
      }
      if (sawQueue && sim.getInstWaitTicks(inst) > 0) {
        break;
      }
    }

    expect(sawQueue).toBe(true);
    expect(sim.getInstWaitTicks(inst)).toBeGreaterThan(0);
    expect(sim.getInstPopularity(inst)).toBeLessThan(sim.getInstEffectiveAppeal(inst));
  });

  it('walks directionally and eventually picks a goal based on needs', () => {
    sim.setCriminalRate(0);
    const inst = sim.placeAttraction(0, 25, 48);
    expect(inst).toBeGreaterThanOrEqual(0);

    sim.tick();
    const guest = findFirstActiveVisitor(sim);
    expect(guest).toBeGreaterThanOrEqual(0);

    const startX = sim.getVisitorX(guest);
    const startY = sim.getVisitorY(guest);
    let targetedAtLeastOnce = false;

    for (let tick = 0; tick < 30; tick++) {
      sim.tick();
      expect(sim.getVisitorState(guest)).not.toBe(VisitorState.Inactive);
      if (sim.getVisitorTarget(guest) >= 0) {
        targetedAtLeastOnce = true;
      }
    }

    expect(sim.getVisitorX(guest) !== startX || sim.getVisitorY(guest) !== startY).toBe(true);
    expect(targetedAtLeastOnce).toBe(true);
  });

  it('complains when crowded and reduces park attractiveness', () => {
    sim.setCriminalRate(0);
    const inst = sim.placeAttraction(0, 25, 48);
    expect(inst).toBeGreaterThanOrEqual(0);

    const startAttractiveness = sim.getParkAttractiveness();

    runTicks(sim, 1200);

    expect(sim.getActiveVisitors()).toBeGreaterThanOrEqual(8);
    expect(sim.getParkAttractiveness()).toBeLessThan(startAttractiveness);
  });

  it('buys balloons and eventually loses them', () => {
    const inst = sim.placeAttraction(17, 25, 48);
    expect(inst).toBeGreaterThanOrEqual(0);

    let rider = -1;
    for (let tick = 0; tick < 600; tick++) {
      sim.tick();
      for (let i = 0; i < 100; i++) {
        if (sim.getVisitorState(i) === VisitorState.Riding && sim.getVisitorTarget(i) === inst) {
          rider = i;
          break;
        }
      }
      if (rider >= 0) break;
    }

    expect(rider).toBeGreaterThanOrEqual(0);

    for (let tick = 0; tick < 60; tick++) {
      sim.tick();
      if (sim.getVisitorState(rider) === VisitorState.Walking && sim.getVisitorBalloonTimer(rider) > 0) break;
    }

    const balloonTicks = sim.getVisitorBalloonTimer(rider);
    expect(balloonTicks).toBeGreaterThan(0);

    // Prevent re-purchase refreshing the timer while we verify decay.
    sim.demolish(25, 48);
    runTicks(sim, 80);
    expect(sim.getVisitorBalloonTimer(rider)).toBeLessThan(balloonTicks);
  });

  it('buys umbrellas from information stand when raining', () => {
    sim.setIsRaining(1);
    const inst = sim.placeAttraction(18, 25, 48);
    expect(inst).toBeGreaterThanOrEqual(0);

    let rider = -1;
    for (let tick = 0; tick < 700; tick++) {
      sim.tick();
      for (let i = 0; i < 100; i++) {
        if (sim.getVisitorState(i) === VisitorState.Riding && sim.getVisitorTarget(i) === inst) {
          rider = i;
          break;
        }
      }
      if (rider >= 0) break;
    }

    expect(rider).toBeGreaterThanOrEqual(0);

    for (let tick = 0; tick < 60; tick++) {
      sim.tick();
      if (sim.getVisitorState(rider) === VisitorState.Walking && sim.getVisitorUmbrellaTimer(rider) > 0) break;
    }

    expect(sim.getVisitorUmbrellaTimer(rider)).toBeGreaterThan(0);
    sim.setIsRaining(0);
  });
});
