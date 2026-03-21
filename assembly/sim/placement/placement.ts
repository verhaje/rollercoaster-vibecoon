import {
  MAP_H,
  MAP_W,
  MAX_PATH_LEVELS,
  TILE_EMPTY,
  TILE_ENTRANCE,
  TILE_INSTANCE_BASE,
  TILE_LAND_DARK_GRASS,
  TILE_LAND_DESERT,
  TILE_LAND_GRASS,
  TILE_LAND_MUD,
  TILE_PATH_CONCRETE,
  TILE_PATH_DESERT,
  TILE_PATH_MUDDY,
  TILE_PATH_QUEUE,
  TILE_TREE_BIG,
  TILE_TREE_CACTUS,
  TILE_TREE_CHERRY,
  TILE_TREE_SHRUBBERY,
  TILE_TREE_APPLE,
  TILE_TREE_LEMON,
  TILE_TREE_PINE,
  TILE_TREE_SMALL,
  TILE_WATER,
} from '../constants';
import { zoneToCornerMask } from '../terrainZone';
import {
  TERRAIN_BASE_HEIGHT,
  TERRAIN_MAX_BUILD_HEIGHT,
  TERRAIN_MAX_HEIGHT,
  cornerMaskData,
  gridData,
  heightData,
  pathLevelData,
  pathLevelRampData,
  rampDirData,
  upperPathHeightData,
  upperPathVariantData,
  upperRampDirData,
} from '../state/gridState';
import { pukeData } from '../state/parkState';
import { earn, spend } from '../economy/economy';
import {
  isLandTile,
  isPathTile,
  pathLevelIndex,
  recomputeNeighborPathLevelRamps,
  recomputeNeighborRamps,
  recomputeNeighborUpperRamps,
  recomputePathLevelRamp,
  recomputeRamp,
  recomputeUpperRamp,
  setTile,
} from '../grid/gridOps';

// ============== TERRAIN ADJUSTMENT ==============

export function adjustTerrain(x: i32, y: i32, delta: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const idx = y * MAP_W + x;
  const tile = unchecked(gridData[idx]);
  if (tile == TILE_ENTRANCE) return 0;
  if (tile >= TILE_INSTANCE_BASE) return 0;

  const cur = <i32>unchecked(heightData[idx]);
  const next = cur + delta;
  if (next < 0 || next > TERRAIN_MAX_HEIGHT) return 0;

  const changeCost = 4;
  if (delta > 0 && !spend(changeCost)) return 0;
  if (delta < 0) earn(changeCost);

  unchecked(heightData[idx] = <u8>next);
  unchecked(cornerMaskData[idx] = 0);
  recomputeRamp(x, y);
  recomputeNeighborRamps(x, y);
  return 1;
}

export function adjustTerrainCorners(x: i32, y: i32, cornerMask: i32, delta: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const idx = y * MAP_W + x;
  const tile = unchecked(gridData[idx]);
  if (tile == TILE_ENTRANCE) return 0;
  if (tile >= TILE_INSTANCE_BASE) return 0;

  const base = <i32>unchecked(heightData[idx]);
  let mask = <i32>unchecked(cornerMaskData[idx]);
  const countBits = ((cornerMask & 1) != 0 ? 1 : 0) + ((cornerMask & 2) != 0 ? 1 : 0) + ((cornerMask & 4) != 0 ? 1 : 0) + ((cornerMask & 8) != 0 ? 1 : 0);
  if (countBits <= 0) return 0;

  if (delta > 0) {
    if (!spend(4)) return 0;
  } else {
    earn(4);
  }

  if (delta > 0) {
    if (cornerMask == 15) {
      if (base >= TERRAIN_MAX_HEIGHT) return 0;
      unchecked(heightData[idx] = <u8>(base + 1));
      unchecked(cornerMaskData[idx] = 0);
      recomputeRamp(x, y);
      recomputeNeighborRamps(x, y);
      return 1;
    }
    mask = mask | cornerMask;
    unchecked(cornerMaskData[idx] = <u8>mask);
    recomputeRamp(x, y);
    recomputeNeighborRamps(x, y);
    return 1;
  }

  if (cornerMask == 15) {
    if (mask == 0) {
      if (base <= 0) return 0;
      unchecked(heightData[idx] = <u8>(base - 1));
    } else {
      unchecked(cornerMaskData[idx] = 0);
    }
    recomputeRamp(x, y);
    recomputeNeighborRamps(x, y);
    return 1;
  }

  mask = mask & (~cornerMask);
  unchecked(cornerMaskData[idx] = <u8>mask);
  recomputeRamp(x, y);
  recomputeNeighborRamps(x, y);
  return 1;
}

export function adjustTerrainZone(x: i32, y: i32, zone: i32, delta: i32): i32 {
  if (zone == 0) return adjustTerrain(x, y, delta);
  const mask = zoneToCornerMask(zone);
  if (mask == 15) return adjustTerrain(x, y, delta);
  return adjustTerrainCorners(x, y, mask, delta);
}

// ============== PATH PLACEMENT ==============

export function placePath(x: i32, y: i32): i32 {
  return placePathVariant(x, y, 0);
}

export function placePathVariant(x: i32, y: i32, variant: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const idx = y * MAP_W + x;
  const current = unchecked(gridData[idx]);
  if (!isLandTile(current) && !isPathTile(current)) return 0;
  if (<i32>unchecked(heightData[idx]) > TERRAIN_MAX_BUILD_HEIGHT) return 0;
  let tile = TILE_PATH_MUDDY;
  let cost = 8;
  if (variant == 1) { tile = TILE_PATH_DESERT; cost = 10; }
  else if (variant == 2) { tile = TILE_PATH_CONCRETE; cost = 14; }
  else if (variant == 3) { tile = TILE_PATH_QUEUE; cost = 12; }

  if (isPathTile(current)) {
    setTile(x, y, tile);
    recomputeRamp(x, y);
    recomputeNeighborRamps(x, y);
    return 1;
  }

  if (!spend(cost)) return 0;
  setTile(x, y, tile);
  recomputeRamp(x, y);
  recomputeNeighborRamps(x, y);
  return 1;
}

export function placeElevatedPath(x: i32, y: i32, variant: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const idx = y * MAP_W + x;
  const current = unchecked(gridData[idx]);
  if (!isPathTile(current)) return 0;
  if (<i32>unchecked(heightData[idx]) >= TERRAIN_MAX_HEIGHT) return 0;
  let cost = 8;
  if (variant == 1) { cost = 10; }
  else if (variant == 2) { cost = 14; }
  else if (variant == 3) { cost = 12; }
  const upper = unchecked(upperPathVariantData[idx]);
  const upHeight = min(TERRAIN_MAX_HEIGHT, <i32>unchecked(heightData[idx]) + 1);
  if (upper >= 0) {
    unchecked(upperPathVariantData[idx] = <i8>variant);
    unchecked(pathLevelData[pathLevelIndex(x, y, upHeight)] = <i8>variant);
  } else {
    if (!spend(cost)) return 0;
    unchecked(upperPathVariantData[idx] = <i8>variant);
    unchecked(upperPathHeightData[idx] = <u8>upHeight);
    unchecked(pathLevelData[pathLevelIndex(x, y, upHeight)] = <i8>variant);
  }
  recomputeUpperRamp(x, y);
  recomputeNeighborUpperRamps(x, y);
  recomputePathLevelRamp(x, y, upHeight);
  recomputeNeighborPathLevelRamps(x, y, upHeight);
  return 1;
}

// ============== LAND / SCENERY PLACEMENT ==============

export function placeLandVariant(x: i32, y: i32, variant: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const idx = y * MAP_W + x;
  const current = unchecked(gridData[idx]);
  if (!isLandTile(current)) return 0;
  if (<i32>unchecked(heightData[idx]) > TERRAIN_MAX_BUILD_HEIGHT) return 0;

  let tile = TILE_LAND_GRASS;
  const cost = 2;
  if (variant == 1) tile = TILE_LAND_DESERT;
  else if (variant == 2) tile = TILE_LAND_MUD;
  else if (variant == 3) tile = TILE_LAND_DARK_GRASS;

  if (current == tile) return 1;
  if (current == TILE_EMPTY) {
    if (!spend(cost)) return 0;
  }
  setTile(x, y, tile);
  return 1;
}

export function placeTree(x: i32, y: i32): i32 {
  return placeTreeVariant(x, y, 0);
}

export function placeTreeVariant(x: i32, y: i32, variant: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  if (!isLandTile(unchecked(gridData[y * MAP_W + x]))) return 0;
  if (<i32>unchecked(heightData[y * MAP_W + x]) > TERRAIN_MAX_BUILD_HEIGHT) return 0;
  let tile = TILE_TREE_PINE;
  let cost = 20;
  if (variant == 1) { tile = TILE_TREE_CACTUS; cost = 18; }
  else if (variant == 2) { tile = TILE_TREE_CHERRY; cost = 26; }
  else if (variant == 3) { tile = TILE_TREE_SHRUBBERY; cost = 12; }
  else if (variant == 4) { tile = TILE_TREE_APPLE; cost = 24; }
  else if (variant == 5) { tile = TILE_TREE_LEMON; cost = 22; }
  else if (variant == 6) { tile = TILE_TREE_BIG; cost = 30; }
  else if (variant == 7) { tile = TILE_TREE_SMALL; cost = 12; }
  if (!spend(cost)) return 0;
  setTile(x, y, tile);
  return 1;
}

export function placeWater(x: i32, y: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  if (!isLandTile(unchecked(gridData[y * MAP_W + x]))) return 0;
  if (!spend(25)) return 0;
  setTile(x, y, TILE_WATER);
  return 1;
}

// ============== MULTI-LEVEL PATH ==============

export function placePathAtHeight(x: i32, y: i32, height: i32, variant: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  if (height < 0 || height >= MAX_PATH_LEVELS) return 0;
  const idx = y * MAP_W + x;
  const groundH = <i32>unchecked(heightData[idx]);

  if (height == groundH) {
    return placePathVariant(x, y, variant);
  }

  let baseCost: i32 = 8;
  if (variant == 1) { baseCost = 10; }
  else if (variant == 2) { baseCost = 14; }
  else if (variant == 3) { baseCost = 12; }

  const pli = pathLevelIndex(x, y, height);
  const existing = unchecked(pathLevelData[pli]);
  if (existing >= 0) {
    unchecked(pathLevelData[pli] = <i8>variant);
    return 1;
  }

  const heightDiff = abs(height - groundH);
  const cost = baseCost + heightDiff * 4;
  if (!spend(cost)) return 0;

  unchecked(pathLevelData[pli] = <i8>variant);
  recomputePathLevelRamp(x, y, height);
  recomputeNeighborPathLevelRamps(x, y, height);
  return 1;
}

export function removePathAtHeight(x: i32, y: i32, height: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  if (height < 0 || height >= MAX_PATH_LEVELS) return 0;
  const idx = y * MAP_W + x;
  const groundH = <i32>unchecked(heightData[idx]);

  if (height == groundH) {
    // Ground-level path/scenery removal (no attraction tiles handled here)
    const t = unchecked(gridData[idx]);
    if (t == TILE_EMPTY || t == TILE_ENTRANCE) return 0;
    if (t >= TILE_INSTANCE_BASE) return 0; // attraction tiles handled by demolish

    if (unchecked(upperPathVariantData[idx]) >= 0) {
      const upH = <i32>unchecked(upperPathHeightData[idx]);
      unchecked(upperPathVariantData[idx] = -1);
      unchecked(upperPathHeightData[idx] = 0);
      unchecked(upperRampDirData[idx] = 0);
      unchecked(pathLevelData[pathLevelIndex(x, y, upH)] = -1);
      unchecked(pathLevelRampData[pathLevelIndex(x, y, upH)] = 0);
      earn(5);
      recomputeRamp(x, y);
      recomputeNeighborRamps(x, y);
      recomputeNeighborUpperRamps(x, y);
      recomputeNeighborPathLevelRamps(x, y, upH);
      return 1;
    }
    setTile(x, y, TILE_EMPTY);
    unchecked(pukeData[y * MAP_W + x] = 0);
    unchecked(rampDirData[y * MAP_W + x] = 0);
    unchecked(upperRampDirData[y * MAP_W + x] = 0);
    earn(5);
    recomputeNeighborRamps(x, y);
    recomputeNeighborUpperRamps(x, y);
    return 1;
  }

  const pli = pathLevelIndex(x, y, height);
  if (unchecked(pathLevelData[pli]) < 0) return 0;

  unchecked(pathLevelData[pli] = -1);
  unchecked(pathLevelRampData[pli] = 0);
  earn(5);
  recomputeNeighborPathLevelRamps(x, y, height);
  return 1;
}

export function getPathAtHeight(x: i32, y: i32, height: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return -1;
  if (height < 0 || height >= MAX_PATH_LEVELS) return -1;
  const idx = y * MAP_W + x;
  const groundH = <i32>unchecked(heightData[idx]);

  if (height == groundH) {
    const t = unchecked(gridData[idx]);
    if (isPathTile(t)) return <i32>(t - TILE_PATH_MUDDY);
    if (t == TILE_ENTRANCE) return 0;
    return -1;
  }

  return unchecked(pathLevelData[pathLevelIndex(x, y, height)]);
}

export function getPathLevelRampDir(x: i32, y: i32, height: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  if (height < 0 || height >= MAX_PATH_LEVELS) return 0;
  const idx = y * MAP_W + x;
  const groundH = <i32>unchecked(heightData[idx]);
  if (height == groundH) return unchecked(rampDirData[idx]);
  return unchecked(pathLevelRampData[pathLevelIndex(x, y, height)]);
}

export function getPathLevelCount(x: i32, y: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  let count: i32 = 0;
  const idx = y * MAP_W + x;
  const t = unchecked(gridData[idx]);
  if (isPathTile(t) || t == TILE_ENTRANCE) count++;
  const groundH = <i32>unchecked(heightData[idx]);
  for (let l: i32 = 0; l < MAX_PATH_LEVELS; l++) {
    if (l == groundH) continue;
    if (unchecked(pathLevelData[pathLevelIndex(x, y, l)]) >= 0) count++;
  }
  return count;
}

// ============== BRIDGE / TUNNEL ==============

export function isBridge(x: i32, y: i32, height: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const groundH = <i32>unchecked(heightData[y * MAP_W + x]);
  return (height > groundH && getPathAtHeight(x, y, height) >= 0) ? 1 : 0;
}

export function isTunnel(x: i32, y: i32, height: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const groundH = <i32>unchecked(heightData[y * MAP_W + x]);
  return (height < groundH && getPathAtHeight(x, y, height) >= 0) ? 1 : 0;
}
