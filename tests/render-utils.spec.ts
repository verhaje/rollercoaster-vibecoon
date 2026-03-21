import { describe, expect, it } from 'vitest';
import { TileType } from '../src/game/types';
import {
  connectionMaskAt,
  isPathTile,
  pathAxisAt,
  trashCanOffsetForPath,
} from '../src/render/utils/tileConnections';
import {
  advanceCartProgress,
  cartTextureKey,
  resolveCornerRenderType,
  trackTextureKey,
} from '../src/render/utils/coasterRenderState';

describe('render tile connection utils', () => {
  const makeTileAt = (paths: Array<[number, number]>) => {
    const set = new Set(paths.map(([x, y]) => `${x},${y}`));
    return (x: number, y: number) => set.has(`${x},${y}`)
      ? TileType.PathMuddy
      : TileType.Empty;
  };

  it('detects path tiles', () => {
    expect(isPathTile(TileType.PathMuddy)).toBe(true);
    expect(isPathTile(TileType.PathConcrete)).toBe(true);
    expect(isPathTile(TileType.TreePine)).toBe(false);
  });

  it('builds 4-bit connection masks', () => {
    const tileAt = makeTileAt([[5, 4], [6, 5], [4, 5]]);
    const mask = connectionMaskAt(5, 5, tileAt, isPathTile);
    // N + E + W => 1 + 2 + 8
    expect(mask).toBe(11);
  });

  it('chooses vertical axis and matching trashcan offset', () => {
    const tileAt = makeTileAt([[8, 7], [8, 9]]);
    expect(pathAxisAt(8, 8, tileAt)).toBe('vertical');
    expect(trashCanOffsetForPath(8, 8, tileAt)).toEqual({ ox: 6, oy: 0 });
  });

  it('chooses horizontal axis and matching trashcan offset', () => {
    const tileAt = makeTileAt([[7, 8], [9, 8]]);
    expect(pathAxisAt(8, 8, tileAt)).toBe('horizontal');
    expect(trashCanOffsetForPath(8, 8, tileAt)).toEqual({ ox: 0, oy: -2 });
  });
});

describe('coaster render state utils', () => {
  it('advances cart progress and wraps around', () => {
    expect(advanceCartProgress(0.5, false, 0.1)).toBeCloseTo(0.6, 6);
    expect(advanceCartProgress(0.95, false, 0.1)).toBeCloseTo(0.05, 6);
  });

  it('does not advance while paused', () => {
    expect(advanceCartProgress(0.42, true, 0.2)).toBeCloseTo(0.42, 6);
  });

  it('builds stable texture cache keys', () => {
    expect(trackTextureKey(3, 2, '#ff0000', 1)).toBe('ct_rails_3_2_#ff0000_1');
    expect(cartTextureKey(1, '#00ff00')).toBe('cart_rails_1_#00ff00');
  });

  it('resolves small-turn render orientation from next anchor geometry', () => {
    // Entry: south(2), next anchor to east => right turn type(2).
    const rightType = resolveCornerRenderType(1, 10, 10, 2, 1, 11, 10);
    expect(rightType).toBe(2);

    // Entry: south(2), next anchor to west => left turn type(1).
    const leftType = resolveCornerRenderType(2, 10, 10, 2, 1, 9, 10);
    expect(leftType).toBe(1);
  });

  it('resolves large-turn render orientation from next anchor geometry', () => {
    // Entry: south(2), large right reaches x+2.
    const rightType = resolveCornerRenderType(5, 10, 10, 2, 1, 12, 10);
    expect(rightType).toBe(6);

    // Entry: south(2), large left reaches x-2.
    const leftType = resolveCornerRenderType(6, 10, 10, 2, 1, 8, 10);
    expect(leftType).toBe(5);
  });
});
