import {
  MAP_H,
  MAP_W,
  MAX_PATH_LEVELS,
  TILE_ENTRANCE,
  TILE_PATH_CONCRETE,
  TILE_PATH_DESERT,
  TILE_PATH_MUDDY,
  TILE_PATH_QUEUE,
} from '../constants';
import {
  gridData,
  heightData,
  upperPathHeightData,
  upperPathVariantData,
  pathLevelData,
} from '../state/gridState';
import {
  BFS_NODES,
  bfsDist,
  bfsParent,
  bfsQueue,
  bfsVisited,
} from '../state/pathfindingState';
import { nextRand } from './rng';

export function isWalkable(t: u8): bool {
  return t == TILE_PATH_MUDDY || t == TILE_PATH_DESERT || t == TILE_PATH_CONCRETE || t == TILE_PATH_QUEUE || t == TILE_ENTRANCE;
}

function nodeIndex(x: i32, y: i32, level: i32): i32 {
  return level * MAP_W * MAP_H + y * MAP_W + x;
}

function pathLevelIndex(x: i32, y: i32, level: i32): i32 {
  return level * MAP_W * MAP_H + y * MAP_W + x;
}

function isWalkableAtLevel(x: i32, y: i32, level: i32): bool {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return false;
  if (level < 0 || level >= MAX_PATH_LEVELS) return false;
  const idx = y * MAP_W + x;
  const groundH = <i32>unchecked(heightData[idx]);

  // At ground level, check the grid tile
  if (level == groundH) return isWalkable(unchecked(gridData[idx]));

  // At other levels, check the multi-level path data
  return unchecked(pathLevelData[pathLevelIndex(x, y, level)]) >= 0;
}

function heightAtLevel(_x: i32, _y: i32, level: i32): i32 {
  // In the multi-level system, the level IS the height
  return level;
}

function canSwitchLevelAt(x: i32, y: i32, fromLevel: i32): bool {
  // Check if there are any adjacent levels (±1) that are also walkable at this tile
  if (fromLevel > 0 && isWalkableAtLevel(x, y, fromLevel - 1)) return true;
  if (fromLevel < MAX_PATH_LEVELS - 1 && isWalkableAtLevel(x, y, fromLevel + 1)) return true;
  return false;
}

function bfsPathLevel(sx: i32, sy: i32, sl: i32, tx: i32, ty: i32, tl: i32): i32 {
  for (let i = 0; i < BFS_NODES; i++) {
    unchecked(bfsVisited[i] = 0);
    unchecked(bfsDist[i] = -1);
    unchecked(bfsParent[i] = -1);
  }
  let head = 0;
  let tail = 0;
  unchecked(bfsQueue[tail++] = sx);
  unchecked(bfsQueue[tail++] = sy);
  unchecked(bfsQueue[tail++] = sl);
  const src = nodeIndex(sx, sy, sl);
  unchecked(bfsVisited[src] = 1);
  unchecked(bfsDist[src] = 0);
  const dx4: StaticArray<i32> = [1, -1, 0, 0];
  const dy4: StaticArray<i32> = [0, 0, 1, -1];

  while (head < tail) {
    const cx = unchecked(bfsQueue[head++]);
    const cy = unchecked(bfsQueue[head++]);
    const cl = unchecked(bfsQueue[head++]);
    const cidx = nodeIndex(cx, cy, cl);
    const cd = unchecked(bfsDist[cidx]);
    if (cx == tx && cy == ty && cl == tl) return cd;

    for (let d = 0; d < 4; d++) {
      const nx = cx + unchecked(dx4[d]);
      const ny = cy + unchecked(dy4[d]);
      const nl = cl;
      if (!isWalkableAtLevel(nx, ny, nl)) continue;
      if (abs(heightAtLevel(nx, ny, nl) - heightAtLevel(cx, cy, cl)) > 1) continue;
      const ni = nodeIndex(nx, ny, nl);
      if (unchecked(bfsVisited[ni]) == 1) continue;
      unchecked(bfsVisited[ni] = 1);
      unchecked(bfsDist[ni] = cd + 1);
      unchecked(bfsParent[ni] = cidx);
      unchecked(bfsQueue[tail++] = nx);
      unchecked(bfsQueue[tail++] = ny);
      unchecked(bfsQueue[tail++] = nl);
    }

    if (canSwitchLevelAt(cx, cy, cl)) {
      // Try switching to adjacent levels (±1)
      for (let delta = -1; delta <= 1; delta += 2) {
        const nl = cl + delta;
        if (nl < 0 || nl >= MAX_PATH_LEVELS) continue;
        if (!isWalkableAtLevel(cx, cy, nl)) continue;
        const ni = nodeIndex(cx, cy, nl);
        if (unchecked(bfsVisited[ni]) == 0) {
          unchecked(bfsVisited[ni] = 1);
          unchecked(bfsDist[ni] = cd + 1);
          unchecked(bfsParent[ni] = cidx);
          unchecked(bfsQueue[tail++] = cx);
          unchecked(bfsQueue[tail++] = cy);
          unchecked(bfsQueue[tail++] = nl);
        }
      }
    }
  }
  return -1;
}

export function bfsPath(sx: i32, sy: i32, tx: i32, ty: i32): i32 {
  const sl = <i32>unchecked(heightData[sy * MAP_W + sx]);
  const tl = <i32>unchecked(heightData[ty * MAP_W + tx]);
  return bfsPathLevel(sx, sy, sl, tx, ty, tl);
}

export function bfsNextStep(sx: i32, sy: i32, tx: i32, ty: i32): i32 {
  const sl = <i32>unchecked(heightData[sy * MAP_W + sx]);
  const tl = <i32>unchecked(heightData[ty * MAP_W + tx]);
  const dist = bfsPathLevel(sx, sy, sl, tx, ty, tl);
  if (dist <= 0) return -1;
  let cur = nodeIndex(tx, ty, tl);
  const src = nodeIndex(sx, sy, sl);
  while (true) {
    const p = unchecked(bfsParent[cur]);
    if (p == src) break;
    if (p < 0) return -1;
    cur = p;
  }
  const flat = cur % (MAP_W * MAP_H);
  return (flat % MAP_W) | ((flat / MAP_W) << 16);
}

export function bfsNextStepLevel(sx: i32, sy: i32, sl: i32, tx: i32, ty: i32, tl: i32): i32 {
  const dist = bfsPathLevel(sx, sy, sl, tx, ty, tl);
  if (dist <= 0) return -1;
  let cur = nodeIndex(tx, ty, tl);
  const src = nodeIndex(sx, sy, sl);
  while (true) {
    const p = unchecked(bfsParent[cur]);
    if (p == src) break;
    if (p < 0) return -1;
    cur = p;
  }
  const level = cur / (MAP_W * MAP_H);
  const flat = cur % (MAP_W * MAP_H);
  const nx = flat % MAP_W;
  const ny = flat / MAP_W;
  return nx | (ny << 10) | (level << 20);
}

export function randomRoamStepLevel(cx: i32, cy: i32, cl: i32, goalX: i32, goalY: i32): i32 {
  const dx4: StaticArray<i32> = [1, -1, 0, 0];
  const dy4: StaticArray<i32> = [0, 0, 1, -1];
  const currentDist = abs(goalX - cx) + abs(goalY - cy);
  let bestPacked: i32 = -1;
  let bestScore: i32 = -1 << 30;

  for (let d = 0; d < 4; d++) {
    const nx = cx + unchecked(dx4[d]);
    const ny = cy + unchecked(dy4[d]);
    if (!isWalkableAtLevel(nx, ny, cl)) continue;
    if (abs(heightAtLevel(nx, ny, cl) - heightAtLevel(cx, cy, cl)) > 1) continue;

    const nextDist = abs(goalX - nx) + abs(goalY - ny);
    const towardGoal = currentDist - nextDist;
    const score = (nextRand() % 100) + towardGoal * 12;
    if (score > bestScore) {
      bestScore = score;
      bestPacked = nx | (ny << 10) | (cl << 20);
    }
  }

  return bestPacked;
}

export function randomWalkStepLevel(cx: i32, cy: i32, cl: i32): i32 {
  const dx4: StaticArray<i32> = [1, -1, 0, 0];
  const dy4: StaticArray<i32> = [0, 0, 1, -1];
  const start = nextRand() % 4;

  for (let offset = 0; offset < 4; offset++) {
    const d = (start + offset) % 4;
    const nx = cx + unchecked(dx4[d]);
    const ny = cy + unchecked(dy4[d]);
    if (!isWalkableAtLevel(nx, ny, cl)) continue;
    if (abs(heightAtLevel(nx, ny, cl) - heightAtLevel(cx, cy, cl)) > 1) continue;
    return nx | (ny << 10) | (cl << 20);
  }

  return -1;
}

// Returns packed x|(y<<16) of nearest tile that is walkable or the entrance.
// Returns -1 if none found.
export function findNearestWalkableTile(x: i32, y: i32): i32 {
  let bestPacked: i32 = -1;
  let bestDist: i32 = 1 << 30;
  for (let ty: i32 = 0; ty < MAP_H; ty++) {
    for (let tx: i32 = 0; tx < MAP_W; tx++) {
      const t = unchecked(gridData[ty * MAP_W + tx]);
      if (!isWalkable(t) && t != TILE_ENTRANCE) continue;
      const d = abs(tx - x) + abs(ty - y);
      if (d < bestDist) {
        bestDist = d;
        bestPacked = tx | (ty << 16);
      }
    }
  }
  return bestPacked;
}
