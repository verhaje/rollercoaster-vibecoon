/* Economy & gameplay constants */
export const ECONOMY = {
  startBudget: 5000,
  defaultEntranceTicket: 5,
  pathCost: 10,
  treeCost: 20,
  demolishRefundRate: 0.7,
  maxVisitors: 200,
  mapWidth: 50,
  mapHeight: 50,
  tileSize: 16,           // px per tile in the sprite sheet / render
  terrainLevelsUp: 2,     // number of height levels above base
  terrainLevelsDown: 0,   // base level is 0 so new maps start fully flat
} as const;
