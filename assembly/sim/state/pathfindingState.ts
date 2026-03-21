import { MAP_H, MAP_W, MAX_PATH_LEVELS } from '../constants';

export const BFS_NODES: i32 = MAP_W * MAP_H * MAX_PATH_LEVELS;
export const bfsQueue = new StaticArray<i32>(BFS_NODES * 3);
export const bfsVisited = new StaticArray<u8>(BFS_NODES);
export const bfsDist = new StaticArray<i32>(BFS_NODES);
export const bfsParent = new StaticArray<i32>(BFS_NODES);
