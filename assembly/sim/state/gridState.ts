import { MAP_H, MAP_W, MAX_PATH_LEVELS } from '../constants';

export const gridData = new StaticArray<u8>(MAP_W * MAP_H);
export const heightData = new StaticArray<u8>(MAP_W * MAP_H);
export const cornerMaskData = new StaticArray<u8>(MAP_W * MAP_H);
export const upperPathVariantData = new StaticArray<i8>(MAP_W * MAP_H);
export const upperPathHeightData = new StaticArray<u8>(MAP_W * MAP_H);
export const rampDirData = new StaticArray<i8>(MAP_W * MAP_H);
export const upperRampDirData = new StaticArray<i8>(MAP_W * MAP_H);

// Multi-level path system: indexed by level * MAP_W * MAP_H + y * MAP_W + x
// Value: path variant (0-3) or -1 (no path at this level)
export const pathLevelData = new StaticArray<i8>(MAP_W * MAP_H * MAX_PATH_LEVELS);
export const pathLevelRampData = new StaticArray<i8>(MAP_W * MAP_H * MAX_PATH_LEVELS);

export let TERRAIN_LEVELS_UP: i32 = 4;
export let TERRAIN_LEVELS_DOWN: i32 = 4;
export let TERRAIN_BASE_HEIGHT: i32 = TERRAIN_LEVELS_DOWN;
export let TERRAIN_MAX_HEIGHT: i32 = TERRAIN_LEVELS_DOWN + TERRAIN_LEVELS_UP;
export let TERRAIN_MAX_BUILD_HEIGHT: i32 = TERRAIN_MAX_HEIGHT - 1;
