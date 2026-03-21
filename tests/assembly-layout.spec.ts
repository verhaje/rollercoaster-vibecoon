import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

describe('assembly layout split', () => {
  it('keeps constants in dedicated module', () => {
    const constants = readFileSync('assembly/sim/constants.ts', 'utf8');
    expect(constants).toContain('export const MAP_W');
    expect(constants).toContain('export const TILE_PATH_MUDDY');
    expect(constants).toContain('export const VS_WALKING');
  });

  it('uses zone helper from dedicated module in placement', () => {
    const placement = readFileSync('assembly/sim/placement/placement.ts', 'utf8');
    expect(placement).toContain("from '../terrainZone'");
    expect(placement).toContain('const mask = zoneToCornerMask(zone);');
  });
});
