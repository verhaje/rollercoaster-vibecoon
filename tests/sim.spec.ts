import { describe, expect, it, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Sim = {
  initSimulation(): void;
  clearGrid(): void;
  tileAt(x: number, y: number): number;
  placePath(x: number, y: number): number;
  placePathVariant(x: number, y: number, variant: number): number;
  placeAttraction(templateId: number, x: number, y: number): number;
  placeAttractionRotated(templateId: number, x: number, y: number, rotation: number): number;
  setInstEndpoints(i: number, entryX: number, entryY: number, exitX: number, exitY: number): number;
  instanceAtTile(x: number, y: number): number;
  getInstTemplateId(i: number): number;
  getInstX(i: number): number;
  getInstY(i: number): number;
  getInstTicketPrice(i: number): number;
  setInstTicketPrice(i: number, p: number): void;
  getInstanceCount(): number;
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
  ): void;
  getBudget(): number;
  setBudget(b: number): void;
  // Terrain
  getTileHeight(x: number, y: number): number;
  getTileSlopeMask(x: number, y: number): number;
  adjustTerrain(x: number, y: number, delta: number): number;
  adjustTerrainCorners(x: number, y: number, cornerMask: number, delta: number): number;
  adjustTerrainZone(x: number, y: number, zone: number, delta: number): number;
  // Levels
  getBaseHeight(): number;
  getMaxHeight(): number;
  getLevelsUp(): number;
  getLevelsDown(): number;
  configureTerrain(levelsUp: number, levelsDown: number): void;
  // Ramps
  getRampDirection(x: number, y: number): number;
  // Demolish
  demolish(x: number, y: number): number;
};

let sim: Sim;

function findEmptyTile(): { x: number; y: number } {
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      if (sim.tileAt(x, y) === 0) return { x, y };
    }
  }
  throw new Error('No empty tile found');
}

function findEmptyRect(w: number, h: number): { x: number; y: number } {
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

function findAnotherEmptyRect(
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

function findEmptyRectWithMargin(w: number, h: number, margin: number): { x: number; y: number } {
  for (let y = margin; y <= 50 - h - margin; y++) {
    for (let x = margin; x <= 50 - w - margin; x++) {
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
  throw new Error(`No empty ${w}x${h} area found with margin ${margin}`);
}

beforeAll(async () => {
  const wasmPath = resolve(process.cwd(), 'public', 'simulation.wasm');
  const bytes = readFileSync(wasmPath);
  const memory = new WebAssembly.Memory({ initial: 64, maximum: 256 });
  const imports = {
    env: {
      memory,
      abort: () => {
        throw new Error('WASM abort');
      },
      seed: () => Math.random(),
    },
  };

  const module = await WebAssembly.instantiate(bytes, imports);
  sim = module.instance.exports as unknown as Sim;

  // Mirror app categories: fun=0 thrill=1 relax=2 food=3 drink=4 toilet=5
  sim.configureAttraction(0, 2, 2, 500, 3, 8, 0, 60, 40);
  sim.configureAttraction(1, 1, 1, 700, 4, 10, 1, 75, 60);
  sim.configureAttraction(8, 1, 1, 200, 3, 4, 3, 60, 15);
  sim.configureAttraction(9, 1, 1, 350, 4, 6, 0, 55, 20);
});

describe('simulation wasm', () => {
  it('initializes entrance tiles correctly', () => {
    sim.initSimulation();
    expect(sim.tileAt(25, 49)).toBe(9);
    expect(sim.tileAt(24, 49)).toBe(9);
  });

  it('allows multiple instances of same attraction type', () => {
    sim.initSimulation();

    const a = findEmptyRect(1, 1);
    const b = findAnotherEmptyRect(1, 1, a.x, a.y);

    const first = sim.placeAttraction(8, a.x, a.y);
    const second = sim.placeAttraction(8, b.x, b.y);

    expect(first).toBeGreaterThanOrEqual(0);
    expect(second).toBeGreaterThanOrEqual(0);
    expect(second).not.toBe(first);

    expect(sim.getInstanceCount()).toBeGreaterThanOrEqual(2);
    expect(sim.getInstTemplateId(first)).toBe(8);
    expect(sim.getInstTemplateId(second)).toBe(8);
  });

  it('maps tiles back to attraction instances', () => {
    sim.initSimulation();
    const p = findEmptyRect(2, 2);
    const idx = sim.placeAttraction(0, p.x, p.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    expect(sim.instanceAtTile(p.x, p.y)).toBe(idx);
    expect(sim.instanceAtTile(p.x + 1, p.y + 1)).toBe(idx);
    expect(sim.instanceAtTile(p.x + 2, p.y + 2)).toBe(-1);

    expect(sim.getInstX(idx)).toBe(p.x);
    expect(sim.getInstY(idx)).toBe(p.y);
  });

  it('updates ticket price per instance', () => {
    sim.initSimulation();
    const p = findEmptyRect(1, 1);
    const idx = sim.placeAttraction(8, p.x, p.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    expect(sim.getInstTicketPrice(idx)).toBe(3);
    sim.setInstTicketPrice(idx, 11);
    expect(sim.getInstTicketPrice(idx)).toBe(11);
  });

  it('spends budget for paths and attractions', () => {
    sim.initSimulation();
    const startBudget = sim.getBudget();

    const pathPos = findEmptyTile();
    const attrPos = findAnotherEmptyRect(1, 1, pathPos.x, pathPos.y);

    expect(sim.placePath(pathPos.x, pathPos.y)).toBe(1);
    const attr = sim.placeAttraction(8, attrPos.x, attrPos.y);
    expect(attr).toBeGreaterThanOrEqual(0);

    expect(sim.getBudget()).toBeLessThan(startBudget);
  });

  it('blocks track endpoints across station start/end sides', () => {
    sim.initSimulation();
    const p = findEmptyRectWithMargin(1, 1, 2);
    const idx = sim.placeAttraction(1, p.x, p.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    const leftX = p.x - 1;
    const rightX = p.x + 1;
    const topY = p.y - 1;
    const bottomY = p.y + 1;

    // Track attractions can use side endpoints.
    expect(sim.setInstEndpoints(idx, leftX, p.y, rightX, p.y)).toBe(1);

    // But not the station front/back approach (top/bottom).
    expect(sim.setInstEndpoints(idx, p.x, topY, p.x, bottomY)).toBe(0);
    expect(sim.setInstEndpoints(idx, leftX, p.y, p.x, bottomY)).toBe(0);
  });

  it('still allows top/bottom endpoints for non-track attractions', () => {
    sim.initSimulation();
    const p = findEmptyRectWithMargin(1, 1, 2);
    const idx = sim.placeAttraction(9, p.x, p.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    expect(sim.setInstEndpoints(idx, p.x, p.y - 1, p.x, p.y + 1)).toBe(1);
  });
});

describe('terrain levels', () => {
  it('has configurable base height from configureTerrain', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    expect(sim.getBaseHeight()).toBe(4);
    expect(sim.getMaxHeight()).toBe(8);
    expect(sim.getLevelsUp()).toBe(4);
    expect(sim.getLevelsDown()).toBe(4);
  });

  it('initializes all tiles to base height', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const base = sim.getBaseHeight();
    // Check a few non-entrance tiles
    for (let y = 0; y < 48; y += 10) {
      for (let x = 0; x < 50; x += 10) {
        expect(sim.getTileHeight(x, y)).toBe(base);
      }
    }
  });

  it('allows different level configurations', () => {
    sim.configureTerrain(2, 3);
    sim.initSimulation();
    expect(sim.getBaseHeight()).toBe(3);
    expect(sim.getMaxHeight()).toBe(5);
    expect(sim.getLevelsUp()).toBe(2);
    expect(sim.getLevelsDown()).toBe(3);
  });
});

describe('terrain building', () => {
  it('raises terrain from base height', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const tile = findEmptyTile();
    const base = sim.getTileHeight(tile.x, tile.y);
    expect(base).toBe(4);

    expect(sim.adjustTerrain(tile.x, tile.y, 1)).toBe(1);
    expect(sim.getTileHeight(tile.x, tile.y)).toBe(base + 1);
  });

  it('lowers terrain from base height', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const tile = findEmptyTile();

    expect(sim.adjustTerrain(tile.x, tile.y, -1)).toBe(1);
    expect(sim.getTileHeight(tile.x, tile.y)).toBe(3);
  });

  it('respects max height (cannot raise above max)', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const tile = findEmptyTile();

    // Raise 4 times to reach max (4+4=8)
    for (let i = 0; i < 4; i++) {
      expect(sim.adjustTerrain(tile.x, tile.y, 1)).toBe(1);
    }
    expect(sim.getTileHeight(tile.x, tile.y)).toBe(8);
    // 5th raise should fail
    expect(sim.adjustTerrain(tile.x, tile.y, 1)).toBe(0);
    expect(sim.getTileHeight(tile.x, tile.y)).toBe(8);
  });

  it('respects min height (cannot lower below 0)', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const tile = findEmptyTile();

    // Lower 4 times to reach 0 (4-4=0)
    for (let i = 0; i < 4; i++) {
      expect(sim.adjustTerrain(tile.x, tile.y, -1)).toBe(1);
    }
    expect(sim.getTileHeight(tile.x, tile.y)).toBe(0);
    // 5th lower should fail
    expect(sim.adjustTerrain(tile.x, tile.y, -1)).toBe(0);
    expect(sim.getTileHeight(tile.x, tile.y)).toBe(0);
  });

  it('corner slope editing sets corner mask', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const tile = findEmptyTile();

    // Raise NW corner (mask bit 0 = 1)
    expect(sim.adjustTerrainCorners(tile.x, tile.y, 1, 1)).toBe(1);
    expect(sim.getTileSlopeMask(tile.x, tile.y)).toBe(1);
    // Raise NE corner (mask bit 1 = 2)
    expect(sim.adjustTerrainCorners(tile.x, tile.y, 2, 1)).toBe(1);
    expect(sim.getTileSlopeMask(tile.x, tile.y)).toBe(3); // 1 | 2
  });

  it('cannot adjust terrain on entrance tiles', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    // Entrance at (25, 49)
    expect(sim.adjustTerrain(25, 49, 1)).toBe(0);
  });

  it('cannot adjust terrain on attraction tiles', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const pos = findEmptyRect(2, 2);
    const idx = sim.placeAttraction(0, pos.x, pos.y);
    expect(idx).toBeGreaterThanOrEqual(0);

    expect(sim.adjustTerrain(pos.x, pos.y, 1)).toBe(0);
  });

  it('costs budget to raise, earns budget to lower', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    const tile = findEmptyTile();
    const before = sim.getBudget();

    sim.adjustTerrain(tile.x, tile.y, 1);
    expect(sim.getBudget()).toBe(before - 4);

    sim.adjustTerrain(tile.x, tile.y, -1);
    expect(sim.getBudget()).toBe(before); // restored
  });
});

describe('ramps', () => {
  it('detects ramp when two paths at height diff 1', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 2);

    // Place path at base height
    expect(sim.placePath(p.x, p.y)).toBe(1);
    // Raise neighbor tile, then place path at +1
    expect(sim.adjustTerrain(p.x, p.y + 1, 1)).toBe(1);
    expect(sim.placePath(p.x, p.y + 1)).toBe(1);

    // Lower tile has ramp pointing S (uphill neighbor is to the south)
    expect(sim.getRampDirection(p.x, p.y)).toBe(3); // 3 = up-S
  });

  it('does not set ramp for flat paths', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 2);

    sim.placePath(p.x, p.y);
    sim.placePath(p.x, p.y + 1);

    // Same height → no ramp
    expect(sim.getRampDirection(p.x, p.y)).toBe(0);
    expect(sim.getRampDirection(p.x, p.y + 1)).toBe(0);
  });

  it('does not set ramp when height diff > 1', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 2);

    sim.placePath(p.x, p.y);
    // Raise neighbor by 2 levels
    sim.adjustTerrain(p.x, p.y + 1, 1);
    sim.adjustTerrain(p.x, p.y + 1, 1);
    sim.placePath(p.x, p.y + 1);

    // Height diff = 2 → no ramp
    expect(sim.getRampDirection(p.x, p.y)).toBe(0);
  });

  it('updates ramp when terrain changes under existing path', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 2);

    // Place two flat paths first
    sim.placePath(p.x, p.y);
    sim.placePath(p.x, p.y + 1);
    expect(sim.getRampDirection(p.x, p.y)).toBe(0);

    // Now raise the south neighbor → ramp should auto-detect
    sim.adjustTerrain(p.x, p.y + 1, 1);
    expect(sim.getRampDirection(p.x, p.y)).toBe(3); // now slopes up-S
  });

  it('clears ramp when path is demolished', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 2);

    sim.placePath(p.x, p.y);
    sim.adjustTerrain(p.x, p.y + 1, 1);
    sim.placePath(p.x, p.y + 1);
    expect(sim.getRampDirection(p.x, p.y)).toBe(3);

    // Demolish the higher path → ramp on lower tile should clear
    sim.demolish(p.x, p.y + 1);
    expect(sim.getRampDirection(p.x, p.y)).toBe(0);
  });

  it('detects ramp in all 4 directions', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);

    // Use a 3x3 area: center at (cx,cy), test each direction
    const p = findEmptyRect(3, 3);
    const cx = p.x + 1;
    const cy = p.y + 1;

    // Place center path
    sim.placePath(cx, cy);

    // North neighbor higher
    sim.adjustTerrain(cx, cy - 1, 1);
    sim.placePath(cx, cy - 1);
    expect(sim.getRampDirection(cx, cy)).toBe(1); // up-N

    // Clean up: demolish the north path and lower it back
    sim.demolish(cx, cy - 1);
    sim.adjustTerrain(cx, cy - 1, -1);

    // East neighbor higher
    sim.adjustTerrain(cx + 1, cy, 1);
    sim.placePath(cx + 1, cy);
    expect(sim.getRampDirection(cx, cy)).toBe(2); // up-E

    sim.demolish(cx + 1, cy);
    sim.adjustTerrain(cx + 1, cy, -1);

    // South neighbor higher
    sim.adjustTerrain(cx, cy + 1, 1);
    sim.placePath(cx, cy + 1);
    expect(sim.getRampDirection(cx, cy)).toBe(3); // up-S

    sim.demolish(cx, cy + 1);
    sim.adjustTerrain(cx, cy + 1, -1);

    // West neighbor higher
    sim.adjustTerrain(cx - 1, cy, 1);
    sim.placePath(cx - 1, cy);
    expect(sim.getRampDirection(cx, cy)).toBe(4); // up-W
  });
});

describe('multi-level pathfinding', () => {
  /** Place a line of paths at increasing heights from (sx,sy) going south for `count` tiles. */
  function buildRampChain(sx: number, sy: number, count: number): void {
    for (let i = 0; i < count; i++) {
      if (i > 0) {
        sim.adjustTerrain(sx, sy + i, 1);
      }
      sim.placePath(sx, sy + i);
    }
  }

  it('paths at height diff 1 are traversable', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 3);

    // Build a 3-tile ramp chain going south
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < i; j++) {
        sim.adjustTerrain(p.x, p.y + i, 1);
      }
      sim.placePath(p.x, p.y + i);
    }

    // Heights should be: base, base+1, base+2
    const base = sim.getBaseHeight();
    expect(sim.getTileHeight(p.x, p.y)).toBe(base);
    expect(sim.getTileHeight(p.x, p.y + 1)).toBe(base + 1);
    expect(sim.getTileHeight(p.x, p.y + 2)).toBe(base + 2);
  });

  it('tiles at different heights are independently usable', () => {
    sim.configureTerrain(4, 4);
    sim.initSimulation();
    sim.setBudget(100000);
    const p = findEmptyRect(1, 2);

    // Lower first tile, keep second at base
    sim.adjustTerrain(p.x, p.y, -1);
    sim.placePath(p.x, p.y);
    sim.placePath(p.x, p.y + 1);

    expect(sim.getTileHeight(p.x, p.y)).toBe(3);
    expect(sim.getTileHeight(p.x, p.y + 1)).toBe(4);
    // Both should have paths
    expect(sim.tileAt(p.x, p.y)).toBe(1); // PathMuddy
    expect(sim.tileAt(p.x, p.y + 1)).toBe(1);
  });
});
