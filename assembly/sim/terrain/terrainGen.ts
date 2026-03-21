import {
  LAKE_MAX_COUNT,
  LAKE_MAX_SIZE,
  LAKE_MIN_SIZE,
  MAP_H,
  MAP_W,
  TILE_TREE_BIG,
  TILE_TREE_CACTUS,
  TILE_TREE_CHERRY,
  TILE_TREE_SHRUBBERY,
  TILE_TREE_APPLE,
  TILE_TREE_LEMON,
  TILE_TREE_PINE,
  TILE_TREE_SMALL,
  TILE_WATER,
  TREE_MAX_COUNT,
  TREE_MIN_COUNT,
  TREE_VARIANT_COUNT,
} from '../constants';
import { gridData, heightData, TERRAIN_BASE_HEIGHT, TERRAIN_MAX_HEIGHT } from '../state/gridState';
import { nextRand } from '../behavior/rng';
import { fractalNoise } from '../noise';
import { recomputeSlopeMask, setTile } from '../grid/gridOps';

function isTreeTile(t: u8): bool {
  return t == TILE_TREE_PINE
    || t == TILE_TREE_BIG
    || t == TILE_TREE_SMALL
    || t == TILE_TREE_CACTUS
    || t == TILE_TREE_CHERRY
    || t == TILE_TREE_SHRUBBERY
    || t == TILE_TREE_APPLE
    || t == TILE_TREE_LEMON;
}

function canPlaceNaturalTile(x: i32, y: i32): bool {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return false;
  if (unchecked(gridData[y * MAP_W + x]) != 0) return false; // TILE_EMPTY == 0
  const dx = x - MAP_W / 2;
  if (y >= MAP_H - 4 && dx >= -4 && dx <= 4) return false;
  return true;
}

function hasAdjacentWater(x: i32, y: i32): bool {
  if (x > 0 && unchecked(gridData[y * MAP_W + (x - 1)]) == TILE_WATER) return true;
  if (x + 1 < MAP_W && unchecked(gridData[y * MAP_W + (x + 1)]) == TILE_WATER) return true;
  if (y > 0 && unchecked(gridData[(y - 1) * MAP_W + x]) == TILE_WATER) return true;
  if (y + 1 < MAP_H && unchecked(gridData[(y + 1) * MAP_W + x]) == TILE_WATER) return true;
  return false;
}

function hasNearbyTree(x: i32, y: i32): bool {
  for (let oy: i32 = -1; oy <= 1; oy++) {
    for (let ox: i32 = -1; ox <= 1; ox++) {
      if (ox == 0 && oy == 0) continue;
      const nx = x + ox;
      const ny = y + oy;
      if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue;
      if (isTreeTile(unchecked(gridData[ny * MAP_W + nx]))) return true;
    }
  }
  return false;
}

function placeSparseTrees(targetCount: i32): void {
  let placed: i32 = 0;
  let attempts: i32 = 0;
  const maxAttempts = targetCount * 25;
  while (placed < targetCount && attempts < maxAttempts) {
    attempts++;
    const x = nextRand() % MAP_W;
    const y = nextRand() % MAP_H;
    if (!canPlaceNaturalTile(x, y)) continue;
    if (hasAdjacentWater(x, y)) continue;
    if (hasNearbyTree(x, y) && (nextRand() % 100) < 75) continue;
    const variant = nextRand() % TREE_VARIANT_COUNT;
    if (variant == 1) setTile(x, y, TILE_TREE_CACTUS);
    else if (variant == 2) setTile(x, y, TILE_TREE_CHERRY);
    else if (variant == 3) setTile(x, y, TILE_TREE_SHRUBBERY);
    else if (variant == 4) setTile(x, y, TILE_TREE_APPLE);
    else if (variant == 5) setTile(x, y, TILE_TREE_LEMON);
    else setTile(x, y, TILE_TREE_PINE);
    placed++;
  }
}

function growLake(seedX: i32, seedY: i32, targetSize: i32): i32 {
  if (!canPlaceNaturalTile(seedX, seedY)) return 0;
  if (<i32>unchecked(heightData[seedY * MAP_W + seedX]) > TERRAIN_BASE_HEIGHT - 1) return 0;

  let x = seedX;
  let y = seedY;
  let placed: i32 = 0;
  let attempts: i32 = 0;
  const maxAttempts = targetSize * 40;

  while (placed < targetSize && attempts < maxAttempts) {
    attempts++;
    if (canPlaceNaturalTile(x, y) && (placed == 0 || hasAdjacentWater(x, y))) {
      setTile(x, y, TILE_WATER);
      placed++;
    }
    const dir = nextRand() % 4;
    if (dir == 0) x += 1;
    else if (dir == 1) x -= 1;
    else if (dir == 2) y += 1;
    else y -= 1;
    if (x < 1) x = 1;
    if (x > MAP_W - 2) x = MAP_W - 2;
    if (y < 1) y = 1;
    if (y > MAP_H - 2) y = MAP_H - 2;
    if ((nextRand() % 100) < 20) {
      x = seedX + ((nextRand() % 3) - 1);
      y = seedY + ((nextRand() % 3) - 1);
      if (x < 1) x = 1;
      if (x > MAP_W - 2) x = MAP_W - 2;
      if (y < 1) y = 1;
      if (y > MAP_H - 2) y = MAP_H - 2;
    }
  }
  return placed;
}

export function populateNaturalScenery(): void {
  const lakeCount = 1 + (nextRand() % LAKE_MAX_COUNT);
  for (let li = 0; li < lakeCount; li++) {
    let placed = 0;
    for (let tries = 0; tries < 20 && placed == 0; tries++) {
      const x = 2 + (nextRand() % (MAP_W - 4));
      const y = 2 + (nextRand() % (MAP_H - 7));
      const size = LAKE_MIN_SIZE + (nextRand() % (LAKE_MAX_SIZE - LAKE_MIN_SIZE + 1));
      placed = growLake(x, y, size);
    }
  }
  const treeCount = TREE_MIN_COUNT + (nextRand() % (TREE_MAX_COUNT - TREE_MIN_COUNT + 1));
  placeSparseTrees(treeCount);
}

export function generateTerrain(seed: i32): void {
  const seedF = <f64>seed * 0.001;
  const hillAmplitude: i32 = 2;
  for (let y: i32 = 0; y < MAP_H; y++) {
    for (let x: i32 = 0; x < MAP_W; x++) {
      const idx = y * MAP_W + x;
      const dx = x - MAP_W / 2;
      if (y >= MAP_H - 3 && dx >= -4 && dx <= 4) continue;
      const nx = <f64>x / <f64>MAP_W * 4.0 + seedF;
      const ny = <f64>y / <f64>MAP_H * 4.0 + seedF * 1.37;
      const n = fractalNoise(nx, ny, 2, 0.5, 2.0);
      const delta = <i32>Math.round(n * <f64>hillAmplitude);
      let h = TERRAIN_BASE_HEIGHT + delta;
      if (h < 0) h = 0;
      if (h > TERRAIN_MAX_HEIGHT) h = TERRAIN_MAX_HEIGHT;
      unchecked(heightData[idx] = <u8>h);
    }
  }
  for (let y: i32 = 0; y < MAP_H; y++) {
    for (let x: i32 = 0; x < MAP_W; x++) {
      recomputeSlopeMask(x, y);
    }
  }
}
