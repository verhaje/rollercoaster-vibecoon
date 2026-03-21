import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { loadSim, type Sim } from '../helpers/simHarness';

let sim: Sim;

beforeAll(async () => {
  sim = await loadSim();
});

beforeEach(() => {
  sim.initSimulation();
  sim.setBudget(500_000);
});

describe('generateTerrain', () => {
  it('produces varied tile heights', () => {
    sim.generateTerrain(12345);
    const base = sim.getBaseHeight();
    let hasAbove = false;
    let hasBelow = false;

    for (let y = 0; y < 48; y++) {
      for (let x = 0; x < 50; x++) {
        const h = sim.getTileHeight(x, y);
        if (h > base) hasAbove = true;
        if (h < base) hasBelow = true;
      }
    }

    expect(hasAbove).toBe(true);
    expect(hasBelow).toBe(true);
  });

  it('keeps entrance corridor flat at base height', () => {
    sim.generateTerrain(99);
    const base = sim.getBaseHeight();

    // Bottom 3 rows, center ±4 tiles
    const cx = 25;
    for (let y = 47; y < 50; y++) {
      for (let x = cx - 4; x <= cx + 4; x++) {
        expect(sim.getTileHeight(x, y)).toBe(base);
      }
    }
  });

  it('different seeds produce different terrain', () => {
    sim.generateTerrain(1);
    const heights1: number[] = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        heights1.push(sim.getTileHeight(x, y));
      }
    }

    sim.initSimulation();
    sim.generateTerrain(9999);
    let diffCount = 0;
    let i = 0;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (sim.getTileHeight(x, y) !== heights1[i]) diffCount++;
        i++;
      }
    }

    expect(diffCount).toBeGreaterThan(0);
  });

  it('clamps heights within valid range', () => {
    sim.generateTerrain(42);
    const max = 8; // levelsUp(4) + levelsDown(4)

    for (let y = 0; y < 50; y++) {
      for (let x = 0; x < 50; x++) {
        const h = sim.getTileHeight(x, y);
        expect(h).toBeGreaterThanOrEqual(0);
        expect(h).toBeLessThanOrEqual(max);
      }
    }
  });
});

describe('placePathAtHeight / getPathAtHeight', () => {
  it('places a non-ground path and retrieves it', () => {
    const x = 5, y = 5;
    const groundH = sim.getTileHeight(x, y);
    const elevated = groundH + 2;

    sim.placePathAtHeight(x, y, elevated, 0);
    expect(sim.getPathAtHeight(x, y, elevated)).toBe(0);
  });

  it('places paths with different variants', () => {
    const x = 6, y = 6;
    const groundH = sim.getTileHeight(x, y);
    const h = groundH + 1;

    sim.placePathAtHeight(x, y, h, 2); // concrete
    expect(sim.getPathAtHeight(x, y, h)).toBe(2);
  });

  it('returns -1 for empty level', () => {
    const x = 7, y = 7;
    const groundH = sim.getTileHeight(x, y);
    expect(sim.getPathAtHeight(x, y, groundH + 3)).toBe(-1);
  });

  it('returns -1 for out-of-bounds coordinates', () => {
    expect(sim.getPathAtHeight(-1, 0, 4)).toBe(-1);
    expect(sim.getPathAtHeight(0, 50, 4)).toBe(-1);
  });

  it('at ground level returns ground path variant', () => {
    const x = 8, y = 8;
    sim.placePath(x, y);
    const groundH = sim.getTileHeight(x, y);

    expect(sim.getPathAtHeight(x, y, groundH)).toBeGreaterThanOrEqual(0);
  });
});

describe('removePathAtHeight', () => {
  it('removes an elevated path', () => {
    const x = 10, y = 10;
    const groundH = sim.getTileHeight(x, y);
    const h = groundH + 2;

    sim.placePathAtHeight(x, y, h, 0);
    expect(sim.getPathAtHeight(x, y, h)).toBe(0);

    const result = sim.removePathAtHeight(x, y, h);
    expect(result).toBe(1);
    expect(sim.getPathAtHeight(x, y, h)).toBe(-1);
  });

  it('returns 0 when no path exists at that level', () => {
    const x = 11, y = 11;
    const groundH = sim.getTileHeight(x, y);
    expect(sim.removePathAtHeight(x, y, groundH + 3)).toBe(0);
  });
});

describe('getPathLevelCount', () => {
  it('returns 0 for an empty tile', () => {
    expect(sim.getPathLevelCount(5, 5)).toBe(0);
  });

  it('returns 1 for a tile with only a ground path', () => {
    const x = 12, y = 12;
    sim.placePath(x, y);
    expect(sim.getPathLevelCount(x, y)).toBe(1);
  });

  it('returns 2 for ground path plus one elevated path', () => {
    const x = 13, y = 13;
    sim.placePath(x, y);
    const groundH = sim.getTileHeight(x, y);
    sim.placePathAtHeight(x, y, groundH + 2, 0);
    expect(sim.getPathLevelCount(x, y)).toBe(2);
  });

  it('returns 3 for ground plus two elevated paths', () => {
    const x = 14, y = 14;
    sim.placePath(x, y);
    const groundH = sim.getTileHeight(x, y);
    sim.placePathAtHeight(x, y, groundH + 1, 0);
    sim.placePathAtHeight(x, y, groundH + 3, 1);
    expect(sim.getPathLevelCount(x, y)).toBe(3);
  });
});

describe('isBridge', () => {
  it('returns 1 for path above ground', () => {
    const x = 15, y = 15;
    const groundH = sim.getTileHeight(x, y);
    const h = groundH + 2;

    sim.placePathAtHeight(x, y, h, 0);
    expect(sim.isBridge(x, y, h)).toBe(1);
  });

  it('returns 0 for path at ground level', () => {
    const x = 16, y = 16;
    sim.placePath(x, y);
    const groundH = sim.getTileHeight(x, y);
    expect(sim.isBridge(x, y, groundH)).toBe(0);
  });

  it('returns 0 when no path exists at height', () => {
    const x = 17, y = 17;
    const groundH = sim.getTileHeight(x, y);
    expect(sim.isBridge(x, y, groundH + 2)).toBe(0);
  });
});

describe('isTunnel', () => {
  it('returns 1 for path below ground', () => {
    const x = 18, y = 18;
    const groundH = sim.getTileHeight(x, y);
    // Need ground height > 0 to go below
    expect(groundH).toBeGreaterThan(0);
    const h = groundH - 1;

    sim.placePathAtHeight(x, y, h, 0);
    expect(sim.isTunnel(x, y, h)).toBe(1);
  });

  it('returns 0 for path at ground level', () => {
    const x = 19, y = 19;
    sim.placePath(x, y);
    const groundH = sim.getTileHeight(x, y);
    expect(sim.isTunnel(x, y, groundH)).toBe(0);
  });

  it('returns 0 for path above ground', () => {
    const x = 20, y = 20;
    const groundH = sim.getTileHeight(x, y);
    const h = groundH + 1;

    sim.placePathAtHeight(x, y, h, 0);
    expect(sim.isTunnel(x, y, h)).toBe(0);
  });
});

describe('bridge and tunnel interaction', () => {
  it('same tile can be bridge at one height and tunnel at another', () => {
    const x = 22, y = 22;
    const groundH = sim.getTileHeight(x, y);
    expect(groundH).toBeGreaterThan(0);

    const aboveH = groundH + 2;
    const belowH = groundH - 1;

    sim.placePathAtHeight(x, y, aboveH, 0);
    sim.placePathAtHeight(x, y, belowH, 0);

    expect(sim.isBridge(x, y, aboveH)).toBe(1);
    expect(sim.isTunnel(x, y, belowH)).toBe(1);
    expect(sim.isBridge(x, y, belowH)).toBe(0);
    expect(sim.isTunnel(x, y, aboveH)).toBe(0);
  });

  it('removing elevated path clears bridge status', () => {
    const x = 23, y = 23;
    const groundH = sim.getTileHeight(x, y);
    const h = groundH + 1;

    sim.placePathAtHeight(x, y, h, 0);
    expect(sim.isBridge(x, y, h)).toBe(1);

    sim.removePathAtHeight(x, y, h);
    expect(sim.isBridge(x, y, h)).toBe(0);
  });

  it('getPathLevelCount decrements after removal', () => {
    const x = 24, y = 24;
    sim.placePath(x, y);
    const groundH = sim.getTileHeight(x, y);
    const h = groundH + 1;

    sim.placePathAtHeight(x, y, h, 0);
    expect(sim.getPathLevelCount(x, y)).toBe(2);

    sim.removePathAtHeight(x, y, h);
    expect(sim.getPathLevelCount(x, y)).toBe(1);
  });
});
