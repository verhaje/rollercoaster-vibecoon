import {
  MAP_H,
  MAP_W,
  MAX_PATH_LEVELS,
  TILE_EMPTY,
  TILE_ENTRANCE,
  TILE_LAND_DARK_GRASS,
  TILE_LAND_DESERT,
  TILE_LAND_GRASS,
  TILE_LAND_MUD,
  TILE_PATH_CONCRETE,
  TILE_PATH_DESERT,
  TILE_PATH_MUDDY,
  TILE_PATH_QUEUE,
} from '../constants';
import {
  cornerMaskData,
  gridData,
  heightData,
  pathLevelData,
  pathLevelRampData,
  rampDirData,
  TERRAIN_BASE_HEIGHT,
  TERRAIN_LEVELS_DOWN,
  TERRAIN_LEVELS_UP,
  TERRAIN_MAX_BUILD_HEIGHT,
  TERRAIN_MAX_HEIGHT,
  upperPathHeightData,
  upperPathVariantData,
  upperRampDirData,
} from '../state/gridState';

// ============== TILE HELPERS ==============

export function isPathTile(t: u8): bool {
  return t == TILE_PATH_MUDDY || t == TILE_PATH_DESERT || t == TILE_PATH_CONCRETE || t == TILE_PATH_QUEUE;
}

export function isLandTile(t: u8): bool {
  return t == TILE_EMPTY || t == TILE_LAND_GRASS || t == TILE_LAND_DESERT || t == TILE_LAND_MUD || t == TILE_LAND_DARK_GRASS;
}

export function isPathOrEntrance(x: i32, y: i32): bool {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return false;
  const t = unchecked(gridData[y * MAP_W + x]);
  return isPathTile(t) || t == TILE_ENTRANCE;
}

export function entranceX(): i32 { return MAP_W / 2; }
export function entranceY(): i32 { return MAP_H - 1; }

export function setTile(x: i32, y: i32, v: u8): void {
  if (x >= 0 && x < MAP_W && y >= 0 && y < MAP_H) {
    unchecked(gridData[y * MAP_W + x] = v);
  }
}

// ============== GRID READS ==============

export function tileAt(x: i32, y: i32): u8 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 255;
  return unchecked(gridData[y * MAP_W + x]);
}

export function getTileHeight(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 0;
  return unchecked(heightData[y * MAP_W + x]);
}

export function getTileSlopeMask(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 0;
  return unchecked(cornerMaskData[y * MAP_W + x]);
}

export function getUpperPathVariant(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return -1;
  return unchecked(upperPathVariantData[y * MAP_W + x]);
}

export function getUpperPathHeight(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 0;
  return unchecked(upperPathHeightData[y * MAP_W + x]);
}

export function getRampDirection(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 0;
  return unchecked(rampDirData[y * MAP_W + x]);
}

export function getUpperRampDirection(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 0;
  return unchecked(upperRampDirData[y * MAP_W + x]);
}

export function getBaseHeight(): i32 { return TERRAIN_BASE_HEIGHT; }
export function getMaxHeight(): i32 { return TERRAIN_MAX_HEIGHT; }
export function getLevelsUp(): i32 { return TERRAIN_LEVELS_UP; }
export function getLevelsDown(): i32 { return TERRAIN_LEVELS_DOWN; }

// ============== TERRAIN CONFIGURATION ==============

export function configureTerrain(levelsUp: i32, levelsDown: i32): void {
  TERRAIN_LEVELS_UP = max(1, levelsUp);
  TERRAIN_LEVELS_DOWN = max(0, levelsDown);
  TERRAIN_BASE_HEIGHT = TERRAIN_LEVELS_DOWN;
  TERRAIN_MAX_HEIGHT = TERRAIN_LEVELS_DOWN + TERRAIN_LEVELS_UP;
  TERRAIN_MAX_BUILD_HEIGHT = TERRAIN_MAX_HEIGHT - 1;
}

// ============== GRID RESET ==============

export function clearGrid(): void {
  for (let i = 0; i < MAP_W * MAP_H; i++) {
    unchecked(gridData[i] = TILE_EMPTY);
    unchecked(heightData[i] = <u8>TERRAIN_BASE_HEIGHT);
    unchecked(cornerMaskData[i] = 0);
    unchecked(upperPathVariantData[i] = -1);
    unchecked(upperPathHeightData[i] = 0);
    unchecked(rampDirData[i] = 0);
    unchecked(upperRampDirData[i] = 0);
  }
  const totalCells = MAP_W * MAP_H * MAX_PATH_LEVELS;
  for (let i = 0; i < totalCells; i++) {
    unchecked(pathLevelData[i] = -1);
    unchecked(pathLevelRampData[i] = 0);
  }
  setTile(MAP_W / 2, MAP_H - 1, TILE_ENTRANCE);
  setTile(MAP_W / 2 - 1, MAP_H - 1, TILE_ENTRANCE);
}

// ============== PLACEMENT CHECK ==============

export function canPlace(x: i32, y: i32, w: i32, h: i32): i32 {
  if (x < 0 || y < 0 || x + w > MAP_W || y + h > MAP_H) return 0;
  let minH: i32 = 1 << 30;
  let maxH: i32 = -1;
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const idx = (y + dy) * MAP_W + (x + dx);
      const tile = unchecked(gridData[idx]);
      if (!isLandTile(tile)) return 0;
      const hh = <i32>unchecked(heightData[idx]);
      minH = min(minH, hh);
      maxH = max(maxH, hh);
      if (hh > TERRAIN_MAX_BUILD_HEIGHT) return 0;
    }
  }
  if (maxH - minH > 1) return 0;
  return 1;
}

// ============== RAMP AUTO-DETECTION ==============
// Ramp direction: 0=none, 1=slopes-up-N, 2=slopes-up-E, 3=slopes-up-S, 4=slopes-up-W

export function recomputeRamp(x: i32, y: i32): void {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return;
  const idx = y * MAP_W + x;
  const tile = unchecked(gridData[idx]);
  if (!isPathTile(tile) && tile != TILE_ENTRANCE) {
    unchecked(rampDirData[idx] = 0);
    return;
  }
  const h = <i32>unchecked(heightData[idx]);
  let rampDir: i32 = 0;
  let higherCount: i32 = 0;
  if (y > 0 && isPathOrEntrance(x, y - 1)) {
    const nh = <i32>unchecked(heightData[(y - 1) * MAP_W + x]);
    if (nh == h + 1) { rampDir = 1; higherCount++; }
  }
  if (x < MAP_W - 1 && isPathOrEntrance(x + 1, y)) {
    const nh = <i32>unchecked(heightData[y * MAP_W + x + 1]);
    if (nh == h + 1) { rampDir = 2; higherCount++; }
  }
  if (y < MAP_H - 1 && isPathOrEntrance(x, y + 1)) {
    const nh = <i32>unchecked(heightData[(y + 1) * MAP_W + x]);
    if (nh == h + 1) { rampDir = 3; higherCount++; }
  }
  if (x > 0 && isPathOrEntrance(x - 1, y)) {
    const nh = <i32>unchecked(heightData[y * MAP_W + x - 1]);
    if (nh == h + 1) { rampDir = 4; higherCount++; }
  }
  unchecked(rampDirData[idx] = <i8>(higherCount == 1 ? rampDir : 0));
}

export function recomputeNeighborRamps(x: i32, y: i32): void {
  recomputeRamp(x, y - 1);
  recomputeRamp(x + 1, y);
  recomputeRamp(x, y + 1);
  recomputeRamp(x - 1, y);
}

// ============== UPPER PATH RAMP AUTO-DETECTION ==============

export function recomputeUpperRamp(x: i32, y: i32): void {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return;
  const idx = y * MAP_W + x;
  if (unchecked(upperPathVariantData[idx]) < 0) {
    unchecked(upperRampDirData[idx] = 0);
    return;
  }
  const h = <i32>unchecked(upperPathHeightData[idx]);
  let rampDir: i32 = 0;
  let higherCount: i32 = 0;
  if (y > 0) {
    const ni = (y - 1) * MAP_W + x;
    if (unchecked(upperPathVariantData[ni]) >= 0) {
      const nh = <i32>unchecked(upperPathHeightData[ni]);
      if (nh == h + 1) { rampDir = 1; higherCount++; }
    }
  }
  if (x < MAP_W - 1) {
    const ni = y * MAP_W + x + 1;
    if (unchecked(upperPathVariantData[ni]) >= 0) {
      const nh = <i32>unchecked(upperPathHeightData[ni]);
      if (nh == h + 1) { rampDir = 2; higherCount++; }
    }
  }
  if (y < MAP_H - 1) {
    const ni = (y + 1) * MAP_W + x;
    if (unchecked(upperPathVariantData[ni]) >= 0) {
      const nh = <i32>unchecked(upperPathHeightData[ni]);
      if (nh == h + 1) { rampDir = 3; higherCount++; }
    }
  }
  if (x > 0) {
    const ni = y * MAP_W + x - 1;
    if (unchecked(upperPathVariantData[ni]) >= 0) {
      const nh = <i32>unchecked(upperPathHeightData[ni]);
      if (nh == h + 1) { rampDir = 4; higherCount++; }
    }
  }
  unchecked(upperRampDirData[idx] = <i8>(higherCount == 1 ? rampDir : 0));
}

export function recomputeNeighborUpperRamps(x: i32, y: i32): void {
  recomputeUpperRamp(x, y - 1);
  recomputeUpperRamp(x + 1, y);
  recomputeUpperRamp(x, y + 1);
  recomputeUpperRamp(x - 1, y);
}

// ============== SLOPE MASK RECOMPUTATION ==============

export function recomputeSlopeMask(x: i32, y: i32): void {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return;
  const idx = y * MAP_W + x;
  const h = <i32>unchecked(heightData[idx]);
  let mask: i32 = 0;
  const nH = y > 0 ? <i32>unchecked(heightData[(y - 1) * MAP_W + x]) : h;
  const sH = y < MAP_H - 1 ? <i32>unchecked(heightData[(y + 1) * MAP_W + x]) : h;
  const wH = x > 0 ? <i32>unchecked(heightData[y * MAP_W + x - 1]) : h;
  const eH = x < MAP_W - 1 ? <i32>unchecked(heightData[y * MAP_W + x + 1]) : h;
  if (nH < h || wH < h) mask |= 1;
  if (nH < h || eH < h) mask |= 2;
  if (sH < h || eH < h) mask |= 4;
  if (sH < h || wH < h) mask |= 8;
  if (nH == h && sH == h && wH == h && eH == h) mask = 0;
  unchecked(cornerMaskData[idx] = <u8>mask);
}

// ============== MULTI-LEVEL PATH HELPERS ==============

export function pathLevelIndex(x: i32, y: i32, level: i32): i32 {
  return level * MAP_W * MAP_H + y * MAP_W + x;
}

export function recomputePathLevelRamp(x: i32, y: i32, level: i32): void {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return;
  if (level < 0 || level >= MAX_PATH_LEVELS) return;
  const pli = pathLevelIndex(x, y, level);
  if (unchecked(pathLevelData[pli]) < 0) {
    unchecked(pathLevelRampData[pli] = 0);
    return;
  }
  let rampDir: i32 = 0;
  let higherCount: i32 = 0;
  if (y > 0 && level + 1 < MAX_PATH_LEVELS) {
    if (unchecked(pathLevelData[pathLevelIndex(x, y - 1, level + 1)]) >= 0) { rampDir = 1; higherCount++; }
  }
  if (x < MAP_W - 1 && level + 1 < MAX_PATH_LEVELS) {
    if (unchecked(pathLevelData[pathLevelIndex(x + 1, y, level + 1)]) >= 0) { rampDir = 2; higherCount++; }
  }
  if (y < MAP_H - 1 && level + 1 < MAX_PATH_LEVELS) {
    if (unchecked(pathLevelData[pathLevelIndex(x, y + 1, level + 1)]) >= 0) { rampDir = 3; higherCount++; }
  }
  if (x > 0 && level + 1 < MAX_PATH_LEVELS) {
    if (unchecked(pathLevelData[pathLevelIndex(x - 1, y, level + 1)]) >= 0) { rampDir = 4; higherCount++; }
  }
  unchecked(pathLevelRampData[pli] = <i8>(higherCount == 1 ? rampDir : 0));
}

export function recomputeNeighborPathLevelRamps(x: i32, y: i32, level: i32): void {
  recomputePathLevelRamp(x, y - 1, level);
  recomputePathLevelRamp(x + 1, y, level);
  recomputePathLevelRamp(x, y + 1, level);
  recomputePathLevelRamp(x - 1, y, level);
  if (level > 0) {
    recomputePathLevelRamp(x, y - 1, level - 1);
    recomputePathLevelRamp(x + 1, y, level - 1);
    recomputePathLevelRamp(x, y + 1, level - 1);
    recomputePathLevelRamp(x - 1, y, level - 1);
  }
}
