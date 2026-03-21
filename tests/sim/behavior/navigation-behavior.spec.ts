import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { findEmptyRect, loadSim, type Sim } from '../helpers/simHarness';

let sim: Sim;

beforeAll(async () => {
  sim = await loadSim();
});

beforeEach(() => {
  sim.initSimulation();
});

describe('navigation behavior', () => {
  function findSeparatedEmptyTile(minDistance: number, refX: number, refY: number): { x: number; y: number } {
    for (let y = 0; y < 50; y++) {
      for (let x = 0; x < 50; x++) {
        if (sim.tileAt(x, y) !== 0) continue;
        if (Math.abs(x - refX) + Math.abs(y - refY) <= minDistance) continue;
        return { x, y };
      }
    }
    throw new Error('No separated empty tile found');
  }

  it('computes BFS path distance along a straight path', () => {
    const area = findEmptyRect(sim, 6, 1);
    for (let dx = 0; dx < 6; dx++) {
      expect(sim.placePath(area.x + dx, area.y)).toBe(1);
    }

    expect(sim.testBfsPath(area.x, area.y, area.x + 5, area.y)).toBe(5);
  });

  it('returns first BFS step toward target', () => {
    const area = findEmptyRect(sim, 5, 1);
    for (let dx = 0; dx < 5; dx++) {
      expect(sim.placePath(area.x + dx, area.y)).toBe(1);
    }

    const packed = sim.testBfsNextStep(area.x, area.y, area.x + 4, area.y);
    expect(packed).not.toBe(-1);
    expect(packed & 0xffff).toBe(area.x + 1);
    expect((packed >>> 16) & 0xffff).toBe(area.y);
  });

  it('returns no route for disconnected path islands', () => {
    const first = findEmptyRect(sim, 1, 1);
    const second = findSeparatedEmptyTile(3, first.x, first.y);

    expect(sim.placePath(first.x, first.y)).toBe(1);
    expect(sim.placePath(second.x, second.y)).toBe(1);

    expect(sim.testBfsPath(first.x, first.y, second.x, second.y)).toBe(-1);
    expect(sim.testBfsNextStep(first.x, first.y, second.x, second.y)).toBe(-1);
  });

  it('returns no random walk step when no walkable neighbor exists', () => {
    const tile = findEmptyRect(sim, 1, 1);
    expect(sim.placePath(tile.x, tile.y)).toBe(1);
    const groundLevel = sim.getTileHeight(tile.x, tile.y);

    expect(sim.testRandomWalkStepLevel(tile.x, tile.y, groundLevel)).toBe(-1);
  });

  it('returns a valid adjacent random walk step when neighbors exist', () => {
    const area = findEmptyRect(sim, 3, 1);
    expect(sim.placePath(area.x, area.y)).toBe(1);
    expect(sim.placePath(area.x + 1, area.y)).toBe(1);
    expect(sim.placePath(area.x + 2, area.y)).toBe(1);
    const groundLevel = sim.getTileHeight(area.x + 1, area.y);

    const packed = sim.testRandomWalkStepLevel(area.x + 1, area.y, groundLevel);
    expect(packed).not.toBe(-1);

    const nx = packed & 0x3ff;
    const ny = (packed >>> 10) & 0x3ff;
    const manhattan = Math.abs(nx - (area.x + 1)) + Math.abs(ny - area.y);
    expect(manhattan).toBe(1);
  });
});
