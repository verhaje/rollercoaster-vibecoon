import { TileType } from '../../game/types';

export function isPathTile(tile: number): boolean {
  return tile === TileType.PathMuddy
    || tile === TileType.PathDesert
    || tile === TileType.PathConcrete
    || tile === TileType.PathQueue;
}

export function connectionMaskAt(
  x: number,
  y: number,
  tileAt: (x: number, y: number) => number,
  connectFn: (tile: number) => boolean,
): number {
  let mask = 0;
  if (connectFn(tileAt(x, y - 1))) mask |= 1;
  if (connectFn(tileAt(x + 1, y))) mask |= 2;
  if (connectFn(tileAt(x, y + 1))) mask |= 4;
  if (connectFn(tileAt(x - 1, y))) mask |= 8;
  return mask;
}

export function pathAxisAt(
  x: number,
  y: number,
  tileAt: (x: number, y: number) => number,
): 'horizontal' | 'vertical' {
  const n = isPathTile(tileAt(x, y - 1));
  const e = isPathTile(tileAt(x + 1, y));
  const s = isPathTile(tileAt(x, y + 1));
  const w = isPathTile(tileAt(x - 1, y));
  const verticalScore = (n ? 1 : 0) + (s ? 1 : 0);
  const horizontalScore = (e ? 1 : 0) + (w ? 1 : 0);
  return verticalScore > horizontalScore ? 'vertical' : 'horizontal';
}

export function trashCanOffsetForPath(
  x: number,
  y: number,
  tileAt: (x: number, y: number) => number,
): { ox: number; oy: number } {
  const axis = pathAxisAt(x, y, tileAt);
  if (axis === 'vertical') {
    return { ox: 6, oy: 0 };
  }
  return { ox: 0, oy: -2 };
}
