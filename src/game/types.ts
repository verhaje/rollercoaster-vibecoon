/* Shared TypeScript types for the game */

export const enum TileType {
  Empty = 0,
  PathMuddy = 1,
  PathDesert = 2,
  PathConcrete = 3,
  PathQueue = 4,
  TreePine = 5,
  TreeBig = 6,
  TreeSmall = 7,
  Water = 8,
  Entrance = 9,
  LandGrass = 10,
  LandDesert = 11,
  LandMud = 12,
  LandDarkGrass = 13,
  TreeCactus = 14,
  TreeCherry = 15,
  TreeShrubbery = 16,
  TreeApple = 17,
  TreeLemon = 18,
  // 32+ = attraction base
}

export const TILE_ATTRACTION_BASE = 32;

export const enum VisitorState {
  Entering = 0,
  Walking = 1,
  Queuing = 2,
  Riding = 3,
  Leaving = 4,
  Inactive = 255,
}

export const enum BuildTool {
  None = 0,
  Path = 1,
  Tree = 2,
  Attraction = 3,
  Demolish = 4,
  Select = 5,
  Water = 6,
  Terrain = 7,
  Bench = 8,
  TrashCan = 9,
  Land = 10,
  Scenery = 11,
  Pickup = 12,
}

export interface SimExports {
  // Grid
  clearGrid(): void;
  tileAt(x: number, y: number): number;

  // Attraction templates (type definitions)
  configureAttraction(
    id: number, fw: number, fh: number, price: number, ticket: number,
    capacity: number, category: number, appeal: number, rideTicks: number,
    monthlyOperatingCost: number, requiredExcitement: number, nauseaGain: number,
  ): void;
  getTmplFootprintW(id: number): number;
  getTmplFootprintH(id: number): number;
  getTmplBuildPrice(id: number): number;
  getTmplTicketPrice(id: number): number;
  getTmplCapacity(id: number): number;
  getTmplCategory(id: number): number;
  getTmplAppeal(id: number): number;
  getTemplateCount(): number;
  getAttractionCount(): number;
  getPlacedAttractionCount(): number;

  // Attraction instances (placed in world)
  getInstanceCount(): number;
  getInstTemplateId(i: number): number;
  getInstX(i: number): number;
  getInstY(i: number): number;
  getInstRotation(i: number): number;
  isInstActive(i: number): number;
  getInstTicketPrice(i: number): number;
  getInstRiders(i: number): number;
  getInstEntranceX(i: number): number;
  getInstEntranceY(i: number): number;
  getInstExitX(i: number): number;
  getInstExitY(i: number): number;
  getInstQueueLength(i: number): number;
  getInstWaitTicks(i: number): number;
  getInstPopularity(i: number): number;
  getInstCapacity(i: number): number;
  getInstCategory(i: number): number;
  getInstAppeal(i: number): number;
  getInstEffectiveAppeal(i: number): number;
  getInstAgeMonths(i: number): number;
  getInstBroken(i: number): number;
  getInstRepairTicks(i: number): number;
  getInstTotalVisitors(i: number): number;
  getInstTotalRevenue(i: number): number;
  getInstMonthlyRevenue(i: number): number;
  setInstTicketPrice(i: number, price: number): void;
  setInstCapacity(i: number, capacity: number): void;
  setInstEndpoints(i: number, entryX: number, entryY: number, exitX: number, exitY: number): number;
  instanceAtTile(x: number, y: number): number;

  // Placement
  canPlace(x: number, y: number, w: number, h: number): number;
  placePath(x: number, y: number): number;
  placePathVariant(x: number, y: number, variant: number): number;
  placeElevatedPath(x: number, y: number, variant: number): number;
  placeLandVariant(x: number, y: number, variant: number): number;
  placeTree(x: number, y: number): number;
  placeTreeVariant(x: number, y: number, variant: number): number;
  placeWater(x: number, y: number): number;
  adjustTerrain(x: number, y: number, delta: number): number;
  adjustTerrainCorners(x: number, y: number, cornerMask: number, delta: number): number;
  adjustTerrainZone(x: number, y: number, zone: number, delta: number): number;
  getTileHeight(x: number, y: number): number;
  getTileSlopeMask(x: number, y: number): number;
  getUpperPathVariant(x: number, y: number): number;
  getUpperPathHeight(x: number, y: number): number;
  getRampDirection(x: number, y: number): number;
  getUpperRampDirection(x: number, y: number): number;
  getBaseHeight(): number;
  getMaxHeight(): number;
  getLevelsUp(): number;
  getLevelsDown(): number;
  configureTerrain(levelsUp: number, levelsDown: number): void;
  generateTerrain(seed: number): void;
  placePathAtHeight(x: number, y: number, height: number, variant: number): void;
  removePathAtHeight(x: number, y: number, height: number): void;
  getPathAtHeight(x: number, y: number, height: number): number;
  getPathLevelRampDir(x: number, y: number, height: number): number;
  getPathLevelCount(x: number, y: number): number;
  isBridge(x: number, y: number, height: number): number;
  isTunnel(x: number, y: number, height: number): number;
  placeAttraction(templateId: number, x: number, y: number): number;
  placeAttractionRotated(templateId: number, x: number, y: number, rotation: number): number;
  placeAttractionWithEndpoints(templateId: number, x: number, y: number, entryX: number, entryY: number, exitX: number, exitY: number): number;
  placeAttractionWithEndpointsRotated(templateId: number, x: number, y: number, entryX: number, entryY: number, exitX: number, exitY: number, rotation: number): number;
  demolish(x: number, y: number): number;

  // Economy
  getBudget(): number;
  setBudget(b: number): void;
  getEntranceTicket(): number;
  setEntranceTicket(p: number): void;
  getTotalIncome(): number;
  getTotalExpense(): number;
  hireMechanic(): number;
  hireCleaner(): number;
  hireSecurity(): number;
  hireEntertainer(): number;
  fireMechanic(index: number): number;
  fireCleaner(index: number): number;
  fireSecurity(index: number): number;
  fireEntertainer(index: number): number;
  setMechanicArea(index: number, x: number, y: number): number;
  setCleanerArea(index: number, x: number, y: number): number;
  setSecurityArea(index: number, x: number, y: number): number;
  setEntertainerArea(index: number, x: number, y: number): number;
  clearMechanicAreas(index: number): number;
  clearCleanerAreas(index: number): number;
  clearSecurityAreas(index: number): number;
  clearEntertainerAreas(index: number): number;
  getMechanicCount(): number;
  getCleanerCount(): number;
  getSecurityCount(): number;
  getEntertainerCount(): number;
  getMechanicX(i: number): number;
  getMechanicY(i: number): number;
  getMechanicTarget(i: number): number;
  getMechanicRepairTimer(i: number): number;
  getMechanicUid(i: number): number;
  getMechanicHiredTick(i: number): number;
  getMechanicRepairsCompleted(i: number): number;
  getMechanicAreaCount(i: number): number;
  getMechanicAreaX(i: number, areaIndex: number): number;
  getMechanicAreaY(i: number, areaIndex: number): number;
  getCleanerX(i: number): number;
  getCleanerY(i: number): number;
  getCleanerTargetX(i: number): number;
  getCleanerTargetY(i: number): number;
  getCleanerCleanTimer(i: number): number;
  getCleanerUid(i: number): number;
  getCleanerHiredTick(i: number): number;
  getCleanerPathsCleaned(i: number): number;
  getCleanerAreaCount(i: number): number;
  getCleanerAreaX(i: number, areaIndex: number): number;
  getCleanerAreaY(i: number, areaIndex: number): number;
  getSecurityX(i: number): number;
  getSecurityY(i: number): number;
  getSecurityTargetVisitor(i: number): number;
  getSecurityUid(i: number): number;
  getSecurityHiredTick(i: number): number;
  getSecurityIncidentsHandled(i: number): number;
  getSecurityAreaCount(i: number): number;
  getSecurityAreaX(i: number, areaIndex: number): number;
  getSecurityAreaY(i: number, areaIndex: number): number;
  getEntertainerX(i: number): number;
  getEntertainerY(i: number): number;
  getEntertainerUid(i: number): number;
  getEntertainerHiredTick(i: number): number;
  getEntertainerGuestsCheered(i: number): number;
  getEntertainerAreaCount(i: number): number;
  getEntertainerAreaX(i: number, areaIndex: number): number;
  getEntertainerAreaY(i: number, areaIndex: number): number;
  getBrokenAttractionCount(): number;
  getDirtyPathCount(): number;
  getPukeAt(x: number, y: number): number;
  getParkAttractiveness(): number;
  getCriminalRate(): number;
  setCriminalRate(ratePerThousand: number): void;
  getTheftCount(): number;
  getVandalismCount(): number;
  reportVandalism(x: number, y: number): void;
  applyCrimeShock(x: number, y: number, severity: number): void;
  triggerCriminalEscape(visitorIndex: number): void;
  applyDrowningPenalty(): void;

  // Relocation / pickup tool
  relocateVisitor(visitorIndex: number, x: number, y: number): number;
  relocateMechanic(index: number, x: number, y: number): number;
  relocateCleaner(index: number, x: number, y: number): number;
  relocateSecurity(index: number, x: number, y: number): number;
  relocateEntertainer(index: number, x: number, y: number): number;
  drownVisitor(visitorIndex: number): number;
  drownMechanic(index: number): number;
  drownCleaner(index: number): number;
  drownSecurity(index: number): number;
  drownEntertainer(index: number): number;

  // Visitors
  getActiveVisitors(): number;
  getTickCount(): number;
  getVisitorX(i: number): number;
  getVisitorY(i: number): number;
  getVisitorState(i: number): number;
  getVisitorPathLevel(i: number): number;
  getVisitorSatisfaction(i: number): number;
  getVisitorTarget(i: number): number;
  getVisitorStuckTimer(i: number): number;
  getVisitorWallet(i: number): number;
  getVisitorHunger(i: number): number;
  getVisitorThirst(i: number): number;
  getVisitorBladder(i: number): number;
  getVisitorFun(i: number): number;
  getVisitorNausea(i: number): number;
  getVisitorPukeTimer(i: number): number;
  getVisitorExcitement(i: number): number;
  getVisitorExcitementTolerance(i: number): number;
  getVisitorIsCriminal(i: number): number;
  getVisitorBalloonTimer(i: number): number;
  getVisitorUmbrellaTimer(i: number): number;
  setIsRaining(raining: number): void;
  getIsRaining(): number;
  getAvgSatisfaction(): number;
  getAvgHunger(): number;
  getAvgThirst(): number;
  getAvgBladder(): number;

  // Sim
  initSimulation(): void;
  tick(): void;

  // Deterministic save/load
  getRngState(): number;
  setRngState(state: number): void;

  // AS runtime
  memory: WebAssembly.Memory;
}

export interface Camera {
  x: number;
  y: number;
  zoom: number;
}
