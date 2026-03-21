/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * assembly/index/initSimulation
 */
export declare function initSimulation(): void;
/**
 * assembly/index/tick
 */
export declare function tick(): void;
/**
 * assembly/index/testBfsPath
 * @param sx `i32`
 * @param sy `i32`
 * @param tx `i32`
 * @param ty `i32`
 * @returns `i32`
 */
export declare function testBfsPath(sx: number, sy: number, tx: number, ty: number): number;
/**
 * assembly/index/testBfsNextStep
 * @param sx `i32`
 * @param sy `i32`
 * @param tx `i32`
 * @param ty `i32`
 * @returns `i32`
 */
export declare function testBfsNextStep(sx: number, sy: number, tx: number, ty: number): number;
/**
 * assembly/index/testRandomWalkStepLevel
 * @param cx `i32`
 * @param cy `i32`
 * @param cl `i32`
 * @returns `i32`
 */
export declare function testRandomWalkStepLevel(cx: number, cy: number, cl: number): number;
/**
 * assembly/index/testRandomRoamStepLevel
 * @param cx `i32`
 * @param cy `i32`
 * @param cl `i32`
 * @param goalX `i32`
 * @param goalY `i32`
 * @returns `i32`
 */
export declare function testRandomRoamStepLevel(cx: number, cy: number, cl: number, goalX: number, goalY: number): number;
/**
 * assembly/index/getRngStateForTest
 * @returns `i32`
 */
export declare function getRngStateForTest(): number;
/**
 * assembly/index/setRngStateForTest
 * @param state `i32`
 */
export declare function setRngStateForTest(state: number): void;
/**
 * assembly/index/getRngState
 * @returns `i32`
 */
export declare function getRngState(): number;
/**
 * assembly/index/setRngState
 * @param state `i32`
 */
export declare function setRngState(state: number): void;
/**
 * assembly/index/nextRandForTest
 * @returns `i32`
 */
export declare function nextRandForTest(): number;
/**
 * assembly/index/testFindAdjacentPath
 * @param instIdx `i32`
 * @returns `i32`
 */
export declare function testFindAdjacentPath(instIdx: number): number;
/**
 * assembly/index/testCalcRepairTicks
 * @param instIdx `i32`
 * @returns `i32`
 */
export declare function testCalcRepairTicks(instIdx: number): number;
/**
 * assembly/index/testHasSecurityNearby
 * @param x `i32`
 * @param y `i32`
 * @param radius `i32`
 * @returns `i32`
 */
export declare function testHasSecurityNearby(x: number, y: number, radius: number): number;
/**
 * assembly/sim/grid/gridOps/tileAt
 * @param x `i32`
 * @param y `i32`
 * @returns `u8`
 */
export declare function tileAt(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getTileHeight
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getTileHeight(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getTileSlopeMask
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getTileSlopeMask(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getUpperPathVariant
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getUpperPathVariant(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getUpperPathHeight
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getUpperPathHeight(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getRampDirection
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getRampDirection(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getUpperRampDirection
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getUpperRampDirection(x: number, y: number): number;
/**
 * assembly/sim/grid/gridOps/getBaseHeight
 * @returns `i32`
 */
export declare function getBaseHeight(): number;
/**
 * assembly/sim/grid/gridOps/getMaxHeight
 * @returns `i32`
 */
export declare function getMaxHeight(): number;
/**
 * assembly/sim/grid/gridOps/getLevelsUp
 * @returns `i32`
 */
export declare function getLevelsUp(): number;
/**
 * assembly/sim/grid/gridOps/getLevelsDown
 * @returns `i32`
 */
export declare function getLevelsDown(): number;
/**
 * assembly/sim/grid/gridOps/configureTerrain
 * @param levelsUp `i32`
 * @param levelsDown `i32`
 */
export declare function configureTerrain(levelsUp: number, levelsDown: number): void;
/**
 * assembly/sim/grid/gridOps/clearGrid
 */
export declare function clearGrid(): void;
/**
 * assembly/sim/grid/gridOps/canPlace
 * @param x `i32`
 * @param y `i32`
 * @param w `i32`
 * @param h `i32`
 * @returns `i32`
 */
export declare function canPlace(x: number, y: number, w: number, h: number): number;
/**
 * assembly/sim/terrain/terrainGen/generateTerrain
 * @param seed `i32`
 */
export declare function generateTerrain(seed: number): void;
/**
 * assembly/sim/attractions/attractions/configureAttraction
 * @param id `i32`
 * @param fw `i32`
 * @param fh `i32`
 * @param price `i32`
 * @param ticket `i32`
 * @param capacity `i32`
 * @param category `i32`
 * @param appeal `i32`
 * @param rideTicks `i32`
 * @param monthlyOperatingCost `i32`
 * @param requiredExcitement `i32`
 * @param nauseaGain `i32`
 */
export declare function configureAttraction(id: number, fw: number, fh: number, price: number, ticket: number, capacity: number, category: number, appeal: number, rideTicks: number, monthlyOperatingCost: number, requiredExcitement: number, nauseaGain: number): void;
/**
 * assembly/sim/attractions/attractions/getTemplateCount
 * @returns `i32`
 */
export declare function getTemplateCount(): number;
/**
 * assembly/sim/attractions/attractions/getTmplFootprintW
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplFootprintW(id: number): number;
/**
 * assembly/sim/attractions/attractions/getTmplFootprintH
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplFootprintH(id: number): number;
/**
 * assembly/sim/attractions/attractions/getTmplBuildPrice
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplBuildPrice(id: number): number;
/**
 * assembly/sim/attractions/attractions/getTmplTicketPrice
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplTicketPrice(id: number): number;
/**
 * assembly/sim/attractions/attractions/getTmplCapacity
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplCapacity(id: number): number;
/**
 * assembly/sim/attractions/attractions/getTmplCategory
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplCategory(id: number): number;
/**
 * assembly/sim/attractions/attractions/getTmplAppeal
 * @param id `i32`
 * @returns `i32`
 */
export declare function getTmplAppeal(id: number): number;
/**
 * assembly/sim/attractions/attractions/getInstanceCount
 * @returns `i32`
 */
export declare function getInstanceCount(): number;
/**
 * assembly/sim/attractions/attractions/getInstTemplateId
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstTemplateId(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstX(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstY(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstRotation
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstRotation(i: number): number;
/**
 * assembly/sim/attractions/attractions/isInstActive
 * @param i `i32`
 * @returns `u8`
 */
export declare function isInstActive(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstTicketPrice
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstTicketPrice(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstRiders
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstRiders(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstEntranceX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstEntranceX(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstEntranceY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstEntranceY(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstExitX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstExitX(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstExitY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstExitY(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstQueueLength
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstQueueLength(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstWaitTicks
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstWaitTicks(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstPopularity
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstPopularity(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstCapacity
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstCapacity(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstCategory
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstCategory(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstAppeal
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstAppeal(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstEffectiveAppeal
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstEffectiveAppeal(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstAgeMonths
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstAgeMonths(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstBroken
 * @param i `i32`
 * @returns `u8`
 */
export declare function getInstBroken(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstRepairTicks
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstRepairTicks(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstTotalVisitors
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstTotalVisitors(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstTotalRevenue
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstTotalRevenue(i: number): number;
/**
 * assembly/sim/attractions/attractions/getInstMonthlyRevenue
 * @param i `i32`
 * @returns `i32`
 */
export declare function getInstMonthlyRevenue(i: number): number;
/**
 * assembly/sim/attractions/attractions/setInstTicketPrice
 * @param i `i32`
 * @param price `i32`
 */
export declare function setInstTicketPrice(i: number, price: number): void;
/**
 * assembly/sim/attractions/attractions/setInstCapacity
 * @param i `i32`
 * @param capacity `i32`
 */
export declare function setInstCapacity(i: number, capacity: number): void;
/**
 * assembly/sim/attractions/attractions/setInstEndpoints
 * @param i `i32`
 * @param entryX `i32`
 * @param entryY `i32`
 * @param exitX `i32`
 * @param exitY `i32`
 * @returns `i32`
 */
export declare function setInstEndpoints(i: number, entryX: number, entryY: number, exitX: number, exitY: number): number;
/**
 * assembly/sim/attractions/attractions/instanceAtTile
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function instanceAtTile(x: number, y: number): number;
/**
 * assembly/sim/attractions/attractions/getBrokenAttractionCount
 * @returns `i32`
 */
export declare function getBrokenAttractionCount(): number;
/**
 * assembly/sim/attractions/attractions/getPlacedAttractionCount
 * @returns `i32`
 */
export declare function getPlacedAttractionCount(): number;
/**
 * assembly/sim/attractions/attractions/placeAttraction
 * @param templateId `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function placeAttraction(templateId: number, x: number, y: number): number;
/**
 * assembly/sim/attractions/attractions/placeAttractionRotated
 * @param templateId `i32`
 * @param x `i32`
 * @param y `i32`
 * @param rotation `i32`
 * @returns `i32`
 */
export declare function placeAttractionRotated(templateId: number, x: number, y: number, rotation: number): number;
/**
 * assembly/sim/attractions/attractions/placeAttractionWithEndpoints
 * @param templateId `i32`
 * @param x `i32`
 * @param y `i32`
 * @param entryX `i32`
 * @param entryY `i32`
 * @param exitX `i32`
 * @param exitY `i32`
 * @returns `i32`
 */
export declare function placeAttractionWithEndpoints(templateId: number, x: number, y: number, entryX: number, entryY: number, exitX: number, exitY: number): number;
/**
 * assembly/sim/attractions/attractions/placeAttractionWithEndpointsRotated
 * @param templateId `i32`
 * @param x `i32`
 * @param y `i32`
 * @param entryX `i32`
 * @param entryY `i32`
 * @param exitX `i32`
 * @param exitY `i32`
 * @param rotation `i32`
 * @returns `i32`
 */
export declare function placeAttractionWithEndpointsRotated(templateId: number, x: number, y: number, entryX: number, entryY: number, exitX: number, exitY: number, rotation: number): number;
/**
 * assembly/sim/attractions/attractions/demolish
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function demolish(x: number, y: number): number;
/**
 * assembly/sim/attractions/attractions/getAttractionCount
 * @returns `i32`
 */
export declare function getAttractionCount(): number;
/**
 * assembly/sim/employees/employees/getMechanicCount
 * @returns `i32`
 */
export declare function getMechanicCount(): number;
/**
 * assembly/sim/employees/employees/getCleanerCount
 * @returns `i32`
 */
export declare function getCleanerCount(): number;
/**
 * assembly/sim/employees/employees/getSecurityCount
 * @returns `i32`
 */
export declare function getSecurityCount(): number;
/**
 * assembly/sim/employees/employees/getEntertainerCount
 * @returns `i32`
 */
export declare function getEntertainerCount(): number;
/**
 * assembly/sim/employees/employees/getMechanicX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicX(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicY(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicTarget
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicTarget(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicRepairTimer
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicRepairTimer(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicUid
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicUid(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicHiredTick
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicHiredTick(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicRepairsCompleted
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicRepairsCompleted(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicAreaCount
 * @param i `i32`
 * @returns `i32`
 */
export declare function getMechanicAreaCount(i: number): number;
/**
 * assembly/sim/employees/employees/getMechanicAreaX
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getMechanicAreaX(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getMechanicAreaY
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getMechanicAreaY(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getCleanerX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerX(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerY(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerTargetX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerTargetX(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerTargetY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerTargetY(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerCleanTimer
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerCleanTimer(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerUid
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerUid(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerHiredTick
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerHiredTick(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerPathsCleaned
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerPathsCleaned(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerAreaCount
 * @param i `i32`
 * @returns `i32`
 */
export declare function getCleanerAreaCount(i: number): number;
/**
 * assembly/sim/employees/employees/getCleanerAreaX
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getCleanerAreaX(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getCleanerAreaY
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getCleanerAreaY(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getSecurityX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityX(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityY(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityTargetVisitor
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityTargetVisitor(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityUid
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityUid(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityHiredTick
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityHiredTick(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityIncidentsHandled
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityIncidentsHandled(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityAreaCount
 * @param i `i32`
 * @returns `i32`
 */
export declare function getSecurityAreaCount(i: number): number;
/**
 * assembly/sim/employees/employees/getSecurityAreaX
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getSecurityAreaX(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getSecurityAreaY
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getSecurityAreaY(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getEntertainerX(i: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getEntertainerY(i: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerUid
 * @param i `i32`
 * @returns `i32`
 */
export declare function getEntertainerUid(i: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerHiredTick
 * @param i `i32`
 * @returns `i32`
 */
export declare function getEntertainerHiredTick(i: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerGuestsCheered
 * @param i `i32`
 * @returns `i32`
 */
export declare function getEntertainerGuestsCheered(i: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerAreaCount
 * @param i `i32`
 * @returns `i32`
 */
export declare function getEntertainerAreaCount(i: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerAreaX
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getEntertainerAreaX(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getEntertainerAreaY
 * @param i `i32`
 * @param areaIndex `i32`
 * @returns `i32`
 */
export declare function getEntertainerAreaY(i: number, areaIndex: number): number;
/**
 * assembly/sim/employees/employees/getBudget
 * @returns `i32`
 */
export declare function getBudget(): number;
/**
 * assembly/sim/employees/employees/setBudget
 * @param b `i32`
 */
export declare function setBudget(b: number): void;
/**
 * assembly/sim/employees/employees/getEntranceTicket
 * @returns `i32`
 */
export declare function getEntranceTicket(): number;
/**
 * assembly/sim/employees/employees/setEntranceTicket
 * @param p `i32`
 */
export declare function setEntranceTicket(p: number): void;
/**
 * assembly/sim/employees/employees/getTotalIncome
 * @returns `i32`
 */
export declare function getTotalIncome(): number;
/**
 * assembly/sim/employees/employees/getTotalExpense
 * @returns `i32`
 */
export declare function getTotalExpense(): number;
/**
 * assembly/sim/employees/employees/getParkAttractiveness
 * @returns `i32`
 */
export declare function getParkAttractiveness(): number;
/**
 * assembly/sim/employees/employees/getCriminalRate
 * @returns `i32`
 */
export declare function getCriminalRate(): number;
/**
 * assembly/sim/employees/employees/setCriminalRate
 * @param ratePerThousand `i32`
 */
export declare function setCriminalRate(ratePerThousand: number): void;
/**
 * assembly/sim/employees/employees/getTheftCount
 * @returns `i32`
 */
export declare function getTheftCount(): number;
/**
 * assembly/sim/employees/employees/getVandalismCount
 * @returns `i32`
 */
export declare function getVandalismCount(): number;
/**
 * assembly/sim/employees/employees/hireMechanic
 * @returns `i32`
 */
export declare function hireMechanic(): number;
/**
 * assembly/sim/employees/employees/hireCleaner
 * @returns `i32`
 */
export declare function hireCleaner(): number;
/**
 * assembly/sim/employees/employees/hireSecurity
 * @returns `i32`
 */
export declare function hireSecurity(): number;
/**
 * assembly/sim/employees/employees/hireEntertainer
 * @returns `i32`
 */
export declare function hireEntertainer(): number;
/**
 * assembly/sim/employees/employees/fireMechanic
 * @param index `i32`
 * @returns `i32`
 */
export declare function fireMechanic(index: number): number;
/**
 * assembly/sim/employees/employees/fireCleaner
 * @param index `i32`
 * @returns `i32`
 */
export declare function fireCleaner(index: number): number;
/**
 * assembly/sim/employees/employees/fireSecurity
 * @param index `i32`
 * @returns `i32`
 */
export declare function fireSecurity(index: number): number;
/**
 * assembly/sim/employees/employees/fireEntertainer
 * @param index `i32`
 * @returns `i32`
 */
export declare function fireEntertainer(index: number): number;
/**
 * assembly/sim/employees/employees/setMechanicArea
 * @param i `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function setMechanicArea(i: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/clearMechanicAreas
 * @param i `i32`
 * @returns `i32`
 */
export declare function clearMechanicAreas(i: number): number;
/**
 * assembly/sim/employees/employees/setCleanerArea
 * @param i `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function setCleanerArea(i: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/clearCleanerAreas
 * @param i `i32`
 * @returns `i32`
 */
export declare function clearCleanerAreas(i: number): number;
/**
 * assembly/sim/employees/employees/setSecurityArea
 * @param i `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function setSecurityArea(i: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/clearSecurityAreas
 * @param i `i32`
 * @returns `i32`
 */
export declare function clearSecurityAreas(i: number): number;
/**
 * assembly/sim/employees/employees/setEntertainerArea
 * @param i `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function setEntertainerArea(i: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/clearEntertainerAreas
 * @param i `i32`
 * @returns `i32`
 */
export declare function clearEntertainerAreas(i: number): number;
/**
 * assembly/sim/employees/employees/relocateMechanic
 * @param index `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function relocateMechanic(index: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/relocateCleaner
 * @param index `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function relocateCleaner(index: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/relocateSecurity
 * @param index `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function relocateSecurity(index: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/relocateEntertainer
 * @param index `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function relocateEntertainer(index: number, x: number, y: number): number;
/**
 * assembly/sim/employees/employees/drownMechanic
 * @param index `i32`
 * @returns `i32`
 */
export declare function drownMechanic(index: number): number;
/**
 * assembly/sim/employees/employees/drownCleaner
 * @param index `i32`
 * @returns `i32`
 */
export declare function drownCleaner(index: number): number;
/**
 * assembly/sim/employees/employees/drownSecurity
 * @param index `i32`
 * @returns `i32`
 */
export declare function drownSecurity(index: number): number;
/**
 * assembly/sim/employees/employees/drownEntertainer
 * @param index `i32`
 * @returns `i32`
 */
export declare function drownEntertainer(index: number): number;
/**
 * assembly/sim/employees/employees/applyDrowningPenalty
 */
export declare function applyDrowningPenalty(): void;
/**
 * assembly/sim/visitors/visitors/getActiveVisitors
 * @returns `i32`
 */
export declare function getActiveVisitors(): number;
/**
 * assembly/sim/visitors/visitors/getTickCount
 * @returns `i32`
 */
export declare function getTickCount(): number;
/**
 * assembly/sim/visitors/visitors/getVisitorX
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorX(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorY
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorY(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorState
 * @param i `i32`
 * @returns `u8`
 */
export declare function getVisitorState(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorSatisfaction
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorSatisfaction(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorTarget
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorTarget(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorStuckTimer
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorStuckTimer(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorWallet
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorWallet(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorPathLevel
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorPathLevel(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorHunger
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorHunger(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorThirst
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorThirst(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorBladder
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorBladder(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorFun
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorFun(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorNausea
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorNausea(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorPukeTimer
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorPukeTimer(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorExcitement
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorExcitement(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorExcitementTolerance
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorExcitementTolerance(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorIsCriminal
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorIsCriminal(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorBalloonTimer
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorBalloonTimer(i: number): number;
/**
 * assembly/sim/visitors/visitors/getVisitorUmbrellaTimer
 * @param i `i32`
 * @returns `i32`
 */
export declare function getVisitorUmbrellaTimer(i: number): number;
/**
 * assembly/sim/visitors/visitors/setIsRaining
 * @param raining `i32`
 */
export declare function setIsRaining(raining: number): void;
/**
 * assembly/sim/visitors/visitors/getIsRaining
 * @returns `i32`
 */
export declare function getIsRaining(): number;
/**
 * assembly/sim/visitors/visitors/getPukeAt
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getPukeAt(x: number, y: number): number;
/**
 * assembly/sim/visitors/visitors/getDirtyPathCount
 * @returns `i32`
 */
export declare function getDirtyPathCount(): number;
/**
 * assembly/sim/visitors/visitors/getAvgSatisfaction
 * @returns `i32`
 */
export declare function getAvgSatisfaction(): number;
/**
 * assembly/sim/visitors/visitors/getAvgHunger
 * @returns `i32`
 */
export declare function getAvgHunger(): number;
/**
 * assembly/sim/visitors/visitors/getAvgThirst
 * @returns `i32`
 */
export declare function getAvgThirst(): number;
/**
 * assembly/sim/visitors/visitors/getAvgBladder
 * @returns `i32`
 */
export declare function getAvgBladder(): number;
/**
 * assembly/sim/visitors/visitors/applyCrimeShock
 * @param x `i32`
 * @param y `i32`
 * @param severity `i32`
 */
export declare function applyCrimeShock(x: number, y: number, severity: number): void;
/**
 * assembly/sim/visitors/visitors/reportVandalism
 * @param x `i32`
 * @param y `i32`
 */
export declare function reportVandalism(x: number, y: number): void;
/**
 * assembly/sim/visitors/visitors/triggerCriminalEscape
 * @param visitorIndex `i32`
 */
export declare function triggerCriminalEscape(visitorIndex: number): void;
/**
 * assembly/sim/visitors/visitors/relocateVisitor
 * @param visitorIndex `i32`
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function relocateVisitor(visitorIndex: number, x: number, y: number): number;
/**
 * assembly/sim/visitors/visitors/drownVisitor
 * @param visitorIndex `i32`
 * @returns `i32`
 */
export declare function drownVisitor(visitorIndex: number): number;
/**
 * assembly/sim/placement/placement/adjustTerrain
 * @param x `i32`
 * @param y `i32`
 * @param delta `i32`
 * @returns `i32`
 */
export declare function adjustTerrain(x: number, y: number, delta: number): number;
/**
 * assembly/sim/placement/placement/adjustTerrainCorners
 * @param x `i32`
 * @param y `i32`
 * @param cornerMask `i32`
 * @param delta `i32`
 * @returns `i32`
 */
export declare function adjustTerrainCorners(x: number, y: number, cornerMask: number, delta: number): number;
/**
 * assembly/sim/placement/placement/adjustTerrainZone
 * @param x `i32`
 * @param y `i32`
 * @param zone `i32`
 * @param delta `i32`
 * @returns `i32`
 */
export declare function adjustTerrainZone(x: number, y: number, zone: number, delta: number): number;
/**
 * assembly/sim/placement/placement/placePath
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function placePath(x: number, y: number): number;
/**
 * assembly/sim/placement/placement/placePathVariant
 * @param x `i32`
 * @param y `i32`
 * @param variant `i32`
 * @returns `i32`
 */
export declare function placePathVariant(x: number, y: number, variant: number): number;
/**
 * assembly/sim/placement/placement/placeElevatedPath
 * @param x `i32`
 * @param y `i32`
 * @param variant `i32`
 * @returns `i32`
 */
export declare function placeElevatedPath(x: number, y: number, variant: number): number;
/**
 * assembly/sim/placement/placement/placeLandVariant
 * @param x `i32`
 * @param y `i32`
 * @param variant `i32`
 * @returns `i32`
 */
export declare function placeLandVariant(x: number, y: number, variant: number): number;
/**
 * assembly/sim/placement/placement/placeTree
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function placeTree(x: number, y: number): number;
/**
 * assembly/sim/placement/placement/placeTreeVariant
 * @param x `i32`
 * @param y `i32`
 * @param variant `i32`
 * @returns `i32`
 */
export declare function placeTreeVariant(x: number, y: number, variant: number): number;
/**
 * assembly/sim/placement/placement/placeWater
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function placeWater(x: number, y: number): number;
/**
 * assembly/sim/placement/placement/placePathAtHeight
 * @param x `i32`
 * @param y `i32`
 * @param height `i32`
 * @param variant `i32`
 * @returns `i32`
 */
export declare function placePathAtHeight(x: number, y: number, height: number, variant: number): number;
/**
 * assembly/sim/placement/placement/removePathAtHeight
 * @param x `i32`
 * @param y `i32`
 * @param height `i32`
 * @returns `i32`
 */
export declare function removePathAtHeight(x: number, y: number, height: number): number;
/**
 * assembly/sim/placement/placement/getPathAtHeight
 * @param x `i32`
 * @param y `i32`
 * @param height `i32`
 * @returns `i32`
 */
export declare function getPathAtHeight(x: number, y: number, height: number): number;
/**
 * assembly/sim/placement/placement/getPathLevelRampDir
 * @param x `i32`
 * @param y `i32`
 * @param height `i32`
 * @returns `i32`
 */
export declare function getPathLevelRampDir(x: number, y: number, height: number): number;
/**
 * assembly/sim/placement/placement/getPathLevelCount
 * @param x `i32`
 * @param y `i32`
 * @returns `i32`
 */
export declare function getPathLevelCount(x: number, y: number): number;
/**
 * assembly/sim/placement/placement/isBridge
 * @param x `i32`
 * @param y `i32`
 * @param height `i32`
 * @returns `i32`
 */
export declare function isBridge(x: number, y: number, height: number): number;
/**
 * assembly/sim/placement/placement/isTunnel
 * @param x `i32`
 * @param y `i32`
 * @param height `i32`
 * @returns `i32`
 */
export declare function isTunnel(x: number, y: number, height: number): number;
