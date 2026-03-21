// ──────────────────────────────────────────────────────
// Park Tycoon – AssemblyScript Simulation Core
// Entry point: re-exports sub-modules + initSimulation + tick
// ──────────────────────────────────────────────────────

import {
  MAP_W,
  MAP_H,
  MAX_VISITORS,
  MAX_INSTANCES,
  NEED_BLADDER,
  NEED_COUNT,
  NEED_HUNGER,
  VS_INACTIVE,
  VS_LEAVING,
  VS_RIDING,
} from './sim/constants';
import {
  TERRAIN_BASE_HEIGHT,
  TERRAIN_MAX_HEIGHT,
  TERRAIN_LEVELS_UP,
  TERRAIN_LEVELS_DOWN,
  TERRAIN_MAX_BUILD_HEIGHT,
} from './sim/state/gridState';
import {
  MAX_MECHANICS,
  MAX_CLEANERS,
  MAX_ENTERTAINERS,
  MAX_SECURITY,
  MAX_EMPLOYEE_AREAS,
  mechActive,
  mechX,
  mechY,
  mechTarget,
  mechRepairTimer,
  mechUid,
  mechHiredTick,
  mechRepairsCompleted,
  mechPatrolX,
  mechPatrolY,
  mechAreaCount,
  mechAreaX,
  mechAreaY,
  mechanicCount,
  cleanerActive,
  cleanerX,
  cleanerY,
  cleanerTargetX,
  cleanerTargetY,
  cleanerCleanTimer,
  cleanerUid,
  cleanerHiredTick,
  cleanerPathsCleaned,
  cleanerPatrolX,
  cleanerPatrolY,
  cleanerAreaCount,
  cleanerAreaX,
  cleanerAreaY,
  cleanerCount,
  entertainerActive,
  entertainerAreaCount,
  entertainerAreaX,
  entertainerAreaY,
  entertainerCount,
  entertainerGuestsCheered,
  entertainerHiredTick,
  entertainerPatrolX,
  entertainerPatrolY,
  entertainerUid,
  entertainerX,
  entertainerY,
  securityActive,
  securityX,
  securityY,
  securityTargetVisitor,
  securityPatrolX,
  securityPatrolY,
  securityUid,
  securityHiredTick,
  securityIncidentsHandled,
  securityAreaCount,
  securityAreaX,
  securityAreaY,
  securityCount,
  nextEmployeeUid,
} from './sim/state/employeeState';
import {
  TICKS_PER_MONTH,
  pukeData,
  parkAttractiveness,
  criminalRatePerThousand,
  theftCount,
  vandalismCount,
  isRainingNow,
  budget,
  entranceTicket,
  totalIncome,
  totalExpense,
} from './sim/state/parkState';
import {
  instActive,
  instCapacity,
  instCurrentRiders,
  instEntranceX,
  instEntranceY,
  instExitX,
  instExitY,
  instBuildTick,
  instBroken,
  instEstimatedWaitTicks,
  instPopularity,
  instQueueLength,
  instRepairTicks,
  instTotalVisitors,
  instTotalRevenue,
  instMonthlyRevenue,
  instanceCount,
} from './sim/state/attractionState';
import {
  activeVisitors,
  tickCount,
  spawnCooldown,
  rngState,
  vState,
  vNeeds,
  vSatisfaction,
  vExcitement,
  vTarget,
  vTimer,
} from './sim/state/visitorState';
import { clearGrid, entranceX, entranceY } from './sim/grid/gridOps';
import { initRandomSeed, nextRand } from './sim/behavior/rng';
import { populateNaturalScenery } from './sim/terrain/terrainGen';
import {
  resetVisitor,
  recomputeQueueStats,
  spawnVisitor,
  updateVisitor,
  getAvgSatisfaction,
  shouldLeave,
} from './sim/visitors/visitors';
import {
  countActiveInstances,
  resetMonthlyAttractionRevenue,
  updateAttractionBreakdowns,
} from './sim/attractions/attractions';
import { applyMonthlyOperatingCosts } from './sim/employees/employees';
import {
  updateCleaners,
  updateMechanics,
  updateSecurity,
  updateEntertainers,
  findAdjacentPath,
  calcRepairTicks,
  hasSecurityNearby,
} from './sim/behavior/employeeBehavior';
import {
  bfsNextStep,
  bfsPath,
  randomRoamStepLevel,
  randomWalkStepLevel,
} from './sim/behavior/navigation';

// ============== RE-EXPORTS ==============
// Grid
export {
  tileAt,
  getTileHeight,
  getTileSlopeMask,
  getUpperPathVariant,
  getUpperPathHeight,
  getRampDirection,
  getUpperRampDirection,
  getBaseHeight,
  getMaxHeight,
  getLevelsUp,
  getLevelsDown,
  configureTerrain,
  clearGrid,
  canPlace,
} from './sim/grid/gridOps';
// Terrain
export { generateTerrain } from './sim/terrain/terrainGen';
// Attractions
export {
  configureAttraction,
  getTemplateCount,
  getTmplFootprintW,
  getTmplFootprintH,
  getTmplBuildPrice,
  getTmplTicketPrice,
  getTmplCapacity,
  getTmplCategory,
  getTmplAppeal,
  getInstanceCount,
  getInstTemplateId,
  getInstX,
  getInstY,
  getInstRotation,
  isInstActive,
  getInstTicketPrice,
  getInstRiders,
  getInstEntranceX,
  getInstEntranceY,
  getInstExitX,
  getInstExitY,
  getInstQueueLength,
  getInstWaitTicks,
  getInstPopularity,
  getInstCapacity,
  getInstCategory,
  getInstAppeal,
  getInstEffectiveAppeal,
  getInstAgeMonths,
  getInstBroken,
  getInstRepairTicks,
  getInstTotalVisitors,
  getInstTotalRevenue,
  getInstMonthlyRevenue,
  setInstTicketPrice,
  setInstCapacity,
  setInstEndpoints,
  instanceAtTile,
  getBrokenAttractionCount,
  getPlacedAttractionCount,
  placeAttraction,
  placeAttractionRotated,
  placeAttractionWithEndpoints,
  placeAttractionWithEndpointsRotated,
  demolish,
  getAttractionCount,
} from './sim/attractions/attractions';
// Employees
export {
  getMechanicCount,
  getCleanerCount,
  getSecurityCount,
  getEntertainerCount,
  getMechanicX,
  getMechanicY,
  getMechanicTarget,
  getMechanicRepairTimer,
  getMechanicUid,
  getMechanicHiredTick,
  getMechanicRepairsCompleted,
  getMechanicAreaCount,
  getMechanicAreaX,
  getMechanicAreaY,
  getCleanerX,
  getCleanerY,
  getCleanerTargetX,
  getCleanerTargetY,
  getCleanerCleanTimer,
  getCleanerUid,
  getCleanerHiredTick,
  getCleanerPathsCleaned,
  getCleanerAreaCount,
  getCleanerAreaX,
  getCleanerAreaY,
  getSecurityX,
  getSecurityY,
  getSecurityTargetVisitor,
  getSecurityUid,
  getSecurityHiredTick,
  getSecurityIncidentsHandled,
  getSecurityAreaCount,
  getSecurityAreaX,
  getSecurityAreaY,
  getEntertainerX,
  getEntertainerY,
  getEntertainerUid,
  getEntertainerHiredTick,
  getEntertainerGuestsCheered,
  getEntertainerAreaCount,
  getEntertainerAreaX,
  getEntertainerAreaY,
  getBudget,
  setBudget,
  getEntranceTicket,
  setEntranceTicket,
  getTotalIncome,
  getTotalExpense,
  getParkAttractiveness,
  getCriminalRate,
  setCriminalRate,
  getTheftCount,
  getVandalismCount,
  hireMechanic,
  hireCleaner,
  hireSecurity,
  hireEntertainer,
  fireMechanic,
  fireCleaner,
  fireSecurity,
  fireEntertainer,
  setMechanicArea,
  clearMechanicAreas,
  setCleanerArea,
  clearCleanerAreas,
  setSecurityArea,
  clearSecurityAreas,
  setEntertainerArea,
  clearEntertainerAreas,
  relocateMechanic,
  relocateCleaner,
  relocateSecurity,
  relocateEntertainer,
  drownMechanic,
  drownCleaner,
  drownSecurity,
  drownEntertainer,
  applyDrowningPenalty,
} from './sim/employees/employees';
// Visitors
export {
  getActiveVisitors,
  getTickCount,
  getVisitorX,
  getVisitorY,
  getVisitorState,
  getVisitorSatisfaction,
  getVisitorTarget,
  getVisitorStuckTimer,
  getVisitorWallet,
  getVisitorPathLevel,
  getVisitorHunger,
  getVisitorThirst,
  getVisitorBladder,
  getVisitorFun,
  getVisitorNausea,
  getVisitorPukeTimer,
  getVisitorExcitement,
  getVisitorExcitementTolerance,
  getVisitorIsCriminal,
  getVisitorBalloonTimer,
  getVisitorUmbrellaTimer,
  setIsRaining,
  getIsRaining,
  getPukeAt,
  getDirtyPathCount,
  getAvgSatisfaction,
  getAvgHunger,
  getAvgThirst,
  getAvgBladder,
  applyCrimeShock,
  reportVandalism,
  triggerCriminalEscape,
  relocateVisitor,
  drownVisitor,
} from './sim/visitors/visitors';
// Placement
export {
  adjustTerrain,
  adjustTerrainCorners,
  adjustTerrainZone,
  placePath,
  placePathVariant,
  placeElevatedPath,
  placeLandVariant,
  placeTree,
  placeTreeVariant,
  placeWater,
  placePathAtHeight,
  removePathAtHeight,
  getPathAtHeight,
  getPathLevelRampDir,
  getPathLevelCount,
  isBridge,
  isTunnel,
} from './sim/placement/placement';

// ============== SIMULATION INIT ==============

export function initSimulation(): void {
  clearGrid();
  budget = 10000;
  entranceTicket = 5;
  totalIncome = 0;
  totalExpense = 0;
  activeVisitors = 0;
  tickCount = 0;
  spawnCooldown = 0;
  instanceCount = 0;
  initRandomSeed();

  for (let i = 0; i < MAX_VISITORS; i++) resetVisitor(i);
  for (let i = 0; i < MAP_W * MAP_H; i++) unchecked(pukeData[i] = 0);
  for (let i = 0; i < MAX_INSTANCES; i++) {
    unchecked(instActive[i] = 0);
    unchecked(instCapacity[i] = 0);
    unchecked(instCurrentRiders[i] = 0);
    unchecked(instEntranceX[i] = -1);
    unchecked(instEntranceY[i] = -1);
    unchecked(instExitX[i] = -1);
    unchecked(instExitY[i] = -1);
    unchecked(instBuildTick[i] = 0);
    unchecked(instBroken[i] = 0);
    unchecked(instQueueLength[i] = 0);
    unchecked(instEstimatedWaitTicks[i] = 0);
    unchecked(instPopularity[i] = 0);
    unchecked(instRepairTicks[i] = 0);
    unchecked(instTotalVisitors[i] = 0);
    unchecked(instTotalRevenue[i] = 0);
    unchecked(instMonthlyRevenue[i] = 0);
  }
  mechanicCount = 0;
  nextEmployeeUid = 1;
  for (let i = 0; i < MAX_MECHANICS; i++) {
    unchecked(mechActive[i] = 0);
    unchecked(mechX[i] = entranceX());
    unchecked(mechY[i] = entranceY());
    unchecked(mechTarget[i] = -1);
    unchecked(mechRepairTimer[i] = 0);
    unchecked(mechUid[i] = 0);
    unchecked(mechHiredTick[i] = 0);
    unchecked(mechRepairsCompleted[i] = 0);
    unchecked(mechPatrolX[i] = -1);
    unchecked(mechPatrolY[i] = -1);
    unchecked(mechAreaCount[i] = 0);
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const off = i * MAX_EMPLOYEE_AREAS + a;
      unchecked(mechAreaX[off] = -1);
      unchecked(mechAreaY[off] = -1);
    }
  }
  cleanerCount = 0;
  for (let i = 0; i < MAX_CLEANERS; i++) {
    unchecked(cleanerActive[i] = 0);
    unchecked(cleanerX[i] = entranceX());
    unchecked(cleanerY[i] = entranceY());
    unchecked(cleanerTargetX[i] = -1);
    unchecked(cleanerTargetY[i] = -1);
    unchecked(cleanerCleanTimer[i] = 0);
    unchecked(cleanerUid[i] = 0);
    unchecked(cleanerHiredTick[i] = 0);
    unchecked(cleanerPathsCleaned[i] = 0);
    unchecked(cleanerPatrolX[i] = -1);
    unchecked(cleanerPatrolY[i] = -1);
    unchecked(cleanerAreaCount[i] = 0);
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const off = i * MAX_EMPLOYEE_AREAS + a;
      unchecked(cleanerAreaX[off] = -1);
      unchecked(cleanerAreaY[off] = -1);
    }
  }
  securityCount = 0;
  for (let i = 0; i < MAX_SECURITY; i++) {
    unchecked(securityActive[i] = 0);
    unchecked(securityX[i] = entranceX());
    unchecked(securityY[i] = entranceY());
    unchecked(securityTargetVisitor[i] = -1);
    unchecked(securityPatrolX[i] = -1);
    unchecked(securityPatrolY[i] = -1);
    unchecked(securityUid[i] = 0);
    unchecked(securityHiredTick[i] = 0);
    unchecked(securityIncidentsHandled[i] = 0);
    unchecked(securityAreaCount[i] = 0);
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const off = i * MAX_EMPLOYEE_AREAS + a;
      unchecked(securityAreaX[off] = -1);
      unchecked(securityAreaY[off] = -1);
    }
  }
  entertainerCount = 0;
  for (let i = 0; i < MAX_ENTERTAINERS; i++) {
    unchecked(entertainerActive[i] = 0);
    unchecked(entertainerX[i] = entranceX());
    unchecked(entertainerY[i] = entranceY());
    unchecked(entertainerPatrolX[i] = -1);
    unchecked(entertainerPatrolY[i] = -1);
    unchecked(entertainerUid[i] = 0);
    unchecked(entertainerHiredTick[i] = 0);
    unchecked(entertainerGuestsCheered[i] = 0);
    unchecked(entertainerAreaCount[i] = 0);
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const off = i * MAX_EMPLOYEE_AREAS + a;
      unchecked(entertainerAreaX[off] = -1);
      unchecked(entertainerAreaY[off] = -1);
    }
  }
  parkAttractiveness = 100;
  criminalRatePerThousand = 2;
  theftCount = 0;
  vandalismCount = 0;
  isRainingNow = 0;
  populateNaturalScenery();
}

// ============== MAIN TICK ==============

export function tick(): void {
  tickCount++;
  rngState = rngState ^ tickCount;
  recomputeQueueStats();

  if (tickCount % TICKS_PER_MONTH == 0) {
    resetMonthlyAttractionRevenue();
    applyMonthlyOperatingCosts();
  }

  if (tickCount % 30 == 0) {
    updateAttractionBreakdowns();
  }

  spawnCooldown--;
  if (spawnCooldown <= 0) {
    const placed = countActiveInstances();
    const sat = getAvgSatisfaction();
    const crimePenalty = max(0, 100 - parkAttractiveness) / 3;
    const baseRate = max(5, 30 - sat / 4 - placed * 2 + crimePenalty);
    spawnCooldown = baseRate;
    if (activeVisitors < MAX_VISITORS && placed > 0) spawnVisitor();
  }

  for (let i = 0; i < MAX_VISITORS; i++) updateVisitor(i);
  recomputeQueueStats();

  if (tickCount % 10 == 0) {
    for (let i = 0; i < MAX_VISITORS; i++) {
      if (unchecked(vState[i]) != VS_INACTIVE && unchecked(vState[i]) != VS_RIDING) {
        for (let n = 0; n < 3; n++) {
          unchecked(vNeeds[i * NEED_COUNT + n] = min(100, unchecked(vNeeds[i * NEED_COUNT + n]) + 2));
        }
        unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 1));
      }
    }
  }

  if (tickCount % 8 == 0) {
    for (let i = 0; i < MAX_VISITORS; i++) {
      if (unchecked(vState[i]) != VS_INACTIVE && unchecked(vState[i]) != VS_LEAVING) {
        for (let n = NEED_HUNGER; n <= NEED_BLADDER; n++) {
          if (unchecked(vNeeds[i * NEED_COUNT + n]) >= 80) {
            unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 2));
          }
        }
      }
    }
  }

  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) != VS_INACTIVE && unchecked(vState[i]) != VS_LEAVING) {
      if (shouldLeave(i)) {
        unchecked(vState[i] = VS_LEAVING);
        unchecked(vTimer[i] = 20);
        const t = unchecked(vTarget[i]);
        if (t >= 0) {
          unchecked(instCurrentRiders[t] = max(0, unchecked(instCurrentRiders[t]) - 1));
        }
      }
    }
  }

  if (tickCount % 20 == 0) {
    for (let i = 0; i < MAX_VISITORS; i++) {
      if (unchecked(vState[i]) != VS_INACTIVE) {
        unchecked(vExcitement[i] = max(0, unchecked(vExcitement[i]) - 1));
      }
    }
    parkAttractiveness = min(100, parkAttractiveness + 1);
  }

  updateSecurity();
  updateMechanics();
  updateCleaners();
  updateEntertainers();
}

// ============== TEST WRAPPERS ==============

export function testBfsPath(sx: i32, sy: i32, tx: i32, ty: i32): i32 {
  return bfsPath(sx, sy, tx, ty);
}

export function testBfsNextStep(sx: i32, sy: i32, tx: i32, ty: i32): i32 {
  return bfsNextStep(sx, sy, tx, ty);
}

export function testRandomWalkStepLevel(cx: i32, cy: i32, cl: i32): i32 {
  return randomWalkStepLevel(cx, cy, cl);
}

export function testRandomRoamStepLevel(cx: i32, cy: i32, cl: i32, goalX: i32, goalY: i32): i32 {
  return randomRoamStepLevel(cx, cy, cl, goalX, goalY);
}

export function getRngStateForTest(): i32 {
  return rngState;
}

export function setRngStateForTest(state: i32): void {
  rngState = state;
}

export function getRngState(): i32 {
  return rngState;
}

export function setRngState(state: i32): void {
  setRngStateForTest(state);
}

export function nextRandForTest(): i32 {
  return nextRand();
}

export function testFindAdjacentPath(instIdx: i32): i32 {
  return findAdjacentPath(instIdx);
}

export function testCalcRepairTicks(instIdx: i32): i32 {
  return calcRepairTicks(instIdx);
}

export function testHasSecurityNearby(x: i32, y: i32, radius: i32): i32 {
  return hasSecurityNearby(x, y, radius) ? 1 : 0;
}
