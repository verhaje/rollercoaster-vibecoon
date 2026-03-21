import {
  CAT_DRINK,
  CAT_FOOD,
  CAT_TOILET,
  MAP_H,
  MAP_W,
  MAX_INSTANCES,
  MAX_TEMPLATES,
  TILE_EMPTY,
  TILE_ENTRANCE,
  TILE_INSTANCE_BASE,
} from '../constants';

const BALLOON_STAND_TEMPLATE: i32 = 17;
const INFO_STAND_TEMPLATE: i32 = 18;
import {
  instActive,
  instBroken,
  instBuildTick,
  instCapacity,
  instCurrentRiders,
  instEntranceX,
  instEntranceY,
  instExitX,
  instExitY,
  instMonthlyRevenue,
  instPopularity,
  instQueueLength,
  instEstimatedWaitTicks,
  instRepairTicks,
  instRotation,
  instTemplateId,
  instTicketPrice,
  instTotalRevenue,
  instTotalVisitors,
  instX,
  instY,
  instanceCount,
  tmplAppeal,
  tmplBuildPrice,
  tmplCapacity,
  tmplCategory,
  tmplFootprintH,
  tmplFootprintW,
  tmplMonthlyCost,
  tmplNauseaGain,
  tmplRequiredExcitement,
  tmplRideTicks,
  tmplTicketPrice,
  templateCount,
} from '../state/attractionState';
import {
  gridData,
  heightData,
  pathLevelData,
  pathLevelRampData,
  upperPathHeightData,
  upperPathVariantData,
  upperRampDirData,
  rampDirData,
} from '../state/gridState';
import { pukeData, TICKS_PER_MONTH } from '../state/parkState';
import { tickCount } from '../state/visitorState';
import { earn, spend } from '../economy/economy';
import { nextRand } from '../behavior/rng';
import {
  canPlace,
  pathLevelIndex,
  recomputeNeighborPathLevelRamps,
  recomputeNeighborRamps,
  recomputeNeighborUpperRamps,
  setTile,
} from '../grid/gridOps';
import { calcRepairTicks } from '../behavior/employeeBehavior';

// ============== ATTRACTION TEMPLATES ==============

export function configureAttraction(
  id: i32, fw: i32, fh: i32, price: i32, ticket: i32,
  capacity: i32, category: i32, appeal: i32, rideTicks: i32,
  monthlyOperatingCost: i32, requiredExcitement: i32, nauseaGain: i32,
): void {
  if (id < 0 || id >= MAX_TEMPLATES) return;
  unchecked(tmplFootprintW[id] = fw);
  unchecked(tmplFootprintH[id] = fh);
  unchecked(tmplBuildPrice[id] = price);
  unchecked(tmplTicketPrice[id] = ticket);
  unchecked(tmplCapacity[id] = capacity);
  unchecked(tmplCategory[id] = category);
  unchecked(tmplAppeal[id] = appeal);
  unchecked(tmplRideTicks[id] = rideTicks);
  unchecked(tmplMonthlyCost[id] = monthlyOperatingCost);
  unchecked(tmplRequiredExcitement[id] = requiredExcitement);
  unchecked(tmplNauseaGain[id] = max(0, nauseaGain));
  if (id >= templateCount) templateCount = id + 1;
}

// Template getters
export function getTmplFootprintW(id: i32): i32 { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplFootprintW[id]) : 0; }
export function getTmplFootprintH(id: i32): i32 { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplFootprintH[id]) : 0; }
export function getTmplBuildPrice(id: i32): i32  { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplBuildPrice[id]) : 0; }
export function getTmplTicketPrice(id: i32): i32 { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplTicketPrice[id]) : 0; }
export function getTmplCapacity(id: i32): i32    { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplCapacity[id]) : 0; }
export function getTmplCategory(id: i32): i32    { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplCategory[id]) : 0; }
export function getTmplAppeal(id: i32): i32      { return id >= 0 && id < MAX_TEMPLATES ? unchecked(tmplAppeal[id]) : 0; }
export function getTemplateCount(): i32 { return templateCount; }

// ============== ATTRACTION INSTANCES ==============

export function getInstanceCount(): i32 { return instanceCount; }
export function getInstTemplateId(i: i32): i32  { return i >= 0 && i < MAX_INSTANCES ? unchecked(instTemplateId[i]) : -1; }
export function getInstX(i: i32): i32           { return i >= 0 && i < MAX_INSTANCES ? unchecked(instX[i]) : -1; }
export function getInstY(i: i32): i32           { return i >= 0 && i < MAX_INSTANCES ? unchecked(instY[i]) : -1; }
export function getInstRotation(i: i32): i32    { return i >= 0 && i < MAX_INSTANCES ? unchecked(instRotation[i]) : 0; }
export function isInstActive(i: i32): u8        { return i >= 0 && i < MAX_INSTANCES ? unchecked(instActive[i]) : 0; }
export function getInstTicketPrice(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instTicketPrice[i]) : 0; }
export function getInstRiders(i: i32): i32      { return i >= 0 && i < MAX_INSTANCES ? unchecked(instCurrentRiders[i]) : 0; }
export function getInstEntranceX(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instEntranceX[i]) : -1; }
export function getInstEntranceY(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instEntranceY[i]) : -1; }
export function getInstExitX(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instExitX[i]) : -1; }
export function getInstExitY(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instExitY[i]) : -1; }
export function getInstQueueLength(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instQueueLength[i]) : 0; }
export function getInstWaitTicks(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instEstimatedWaitTicks[i]) : 0; }
export function getInstPopularity(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instPopularity[i]) : 0; }
export function getInstBroken(i: i32): u8       { return i >= 0 && i < MAX_INSTANCES ? unchecked(instBroken[i]) : 0; }
export function getInstRepairTicks(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instRepairTicks[i]) : 0; }
export function getInstTotalVisitors(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instTotalVisitors[i]) : 0; }
export function getInstTotalRevenue(i: i32): i32  { return i >= 0 && i < MAX_INSTANCES ? unchecked(instTotalRevenue[i]) : 0; }
export function getInstMonthlyRevenue(i: i32): i32 { return i >= 0 && i < MAX_INSTANCES ? unchecked(instMonthlyRevenue[i]) : 0; }

export function getInstCapacity(i: i32): i32 {
  if (i < 0 || i >= MAX_INSTANCES) return 0;
  return max(0, unchecked(instCapacity[i]));
}

export function getInstCategory(i: i32): i32 {
  if (i < 0 || i >= MAX_INSTANCES) return -1;
  const tid = unchecked(instTemplateId[i]);
  return tid >= 0 && tid < MAX_TEMPLATES ? unchecked(tmplCategory[tid]) : -1;
}

export function getInstAppeal(i: i32): i32 {
  if (i < 0 || i >= MAX_INSTANCES) return 0;
  const tid = unchecked(instTemplateId[i]);
  return tid >= 0 && tid < MAX_TEMPLATES ? unchecked(tmplAppeal[tid]) : 0;
}

export function getInstAgeMonths(i: i32): i32 {
  if (i < 0 || i >= MAX_INSTANCES || unchecked(instActive[i]) != 1) return 0;
  return max(0, (tickCount - unchecked(instBuildTick[i])) / TICKS_PER_MONTH);
}

export function getInstEffectiveAppeal(i: i32): i32 {
  if (i < 0 || i >= MAX_INSTANCES || unchecked(instActive[i]) != 1) return 0;
  const tid = unchecked(instTemplateId[i]);
  const baseAppeal = unchecked(tmplAppeal[tid]);
  const ageMonths = getInstAgeMonths(i);
  let agedAppeal = baseAppeal - ageMonths;
  const floor = max(10, baseAppeal / 2);
  if (agedAppeal < floor) agedAppeal = floor;
  return agedAppeal;
}

export function setInstQueueStats(i: i32, queueLen: i32, waitTicks: i32, popularity: i32): void {
  if (i < 0 || i >= MAX_INSTANCES) return;
  unchecked(instQueueLength[i] = max(0, queueLen));
  unchecked(instEstimatedWaitTicks[i] = max(0, waitTicks));
  unchecked(instPopularity[i] = max(0, min(100, popularity)));
}

function isPathOrEntranceTileAt(x: i32, y: i32): bool {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return false;
  const tile = unchecked(gridData[y * MAP_W + x]);
  return tile == TILE_ENTRANCE || tile == 1 || tile == 2 || tile == 3 || tile == 4;
}

function isEndpointAdjacentToFootprint(epX: i32, epY: i32, x: i32, y: i32, fw: i32, fh: i32): bool {
  if (epX >= x && epX < x + fw && epY >= y && epY < y + fh) return false;
  const left = epX == x - 1 && epY >= y && epY < y + fh;
  const right = epX == x + fw && epY >= y && epY < y + fh;
  const top = epY == y - 1 && epX >= x && epX < x + fw;
  const bottom = epY == y + fh && epX >= x && epX < x + fw;
  return left || right || top || bottom;
}

function isTrackAttractionTemplate(templateId: i32): bool {
  return templateId == 1 || templateId == 6 || templateId == 16;
}

function crossesTrackStationStartOrEnd(epX: i32, epY: i32, x: i32, y: i32, fw: i32, fh: i32, templateId: i32): bool {
  if (!isTrackAttractionTemplate(templateId)) return false;
  const stationFront = epY == y - 1 && epX >= x && epX < x + fw;
  const stationBack = epY == y + fh && epX >= x && epX < x + fw;
  return stationFront || stationBack;
}

function isEndpointValidForPlacement(epX: i32, epY: i32, x: i32, y: i32, fw: i32, fh: i32, templateId: i32): bool {
  if (!isEndpointAdjacentToFootprint(epX, epY, x, y, fw, fh)) return false;
  if (crossesTrackStationStartOrEnd(epX, epY, x, y, fw, fh, templateId)) return false;
  return true;
}

function findDefaultEndpoint(x: i32, y: i32, fw: i32, fh: i32): i32 {
  for (let py = y - 1; py <= y + fh; py++) {
    for (let px = x - 1; px <= x + fw; px++) {
      if (!isEndpointAdjacentToFootprint(px, py, x, y, fw, fh)) continue;
      if (isPathOrEntranceTileAt(px, py)) return px | (py << 16);
    }
  }
  const fx = max(0, min(MAP_W - 1, x - 1));
  const fy = max(0, min(MAP_H - 1, y));
  return fx | (fy << 16);
}

function applyInstanceEndpoints(instIdx: i32, entryX: i32, entryY: i32, exitX: i32, exitY: i32): void {
  unchecked(instEntranceX[instIdx] = entryX);
  unchecked(instEntranceY[instIdx] = entryY);
  unchecked(instExitX[instIdx] = exitX);
  unchecked(instExitY[instIdx] = exitY);
}

export function setInstEndpoints(i: i32, entryX: i32, entryY: i32, exitX: i32, exitY: i32): i32 {
  if (i < 0 || i >= MAX_INSTANCES || unchecked(instActive[i]) != 1) return 0;
  if (entryX == exitX && entryY == exitY) return 0;
  const x = unchecked(instX[i]);
  const y = unchecked(instY[i]);
  const fw = instFootprintW(i);
  const fh = instFootprintH(i);
  const templateId = unchecked(instTemplateId[i]);
  if (!isEndpointValidForPlacement(entryX, entryY, x, y, fw, fh, templateId)) return 0;
  if (!isEndpointValidForPlacement(exitX, exitY, x, y, fw, fh, templateId)) return 0;
  applyInstanceEndpoints(i, entryX, entryY, exitX, exitY);
  return 1;
}

export function setInstTicketPrice(i: i32, price: i32): void {
  if (i >= 0 && i < MAX_INSTANCES) unchecked(instTicketPrice[i] = price);
}

export function setInstCapacity(i: i32, capacity: i32): void {
  if (i < 0 || i >= MAX_INSTANCES) return;
  unchecked(instCapacity[i] = max(0, capacity));
  if (unchecked(instCurrentRiders[i]) > unchecked(instCapacity[i])) {
    unchecked(instCurrentRiders[i] = unchecked(instCapacity[i]));
  }
}

export function instanceAtTile(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return -1;
  const t = unchecked(gridData[y * MAP_W + x]);
  if (t < TILE_INSTANCE_BASE) return -1;
  const idx: i32 = <i32>(t - TILE_INSTANCE_BASE);
  if (idx >= 0 && idx < MAX_INSTANCES && unchecked(instActive[idx]) == 1) return idx;
  return -1;
}

export function isInstantServiceCategory(category: i32, templateId: i32 = -1): bool {
  if (templateId == BALLOON_STAND_TEMPLATE || templateId == INFO_STAND_TEMPLATE) return true;
  return category == CAT_FOOD || category == CAT_DRINK || category == CAT_TOILET;
}

function normalizeRotation(rotation: i32): i32 {
  let r = rotation % 360;
  if (r < 0) r += 360;
  if (r == 90 || r == 180 || r == 270) return r;
  return 0;
}

function footprintWForRotation(templateId: i32, rotation: i32): i32 {
  const w = unchecked(tmplFootprintW[templateId]);
  const h = unchecked(tmplFootprintH[templateId]);
  return rotation == 90 || rotation == 270 ? h : w;
}

function footprintHForRotation(templateId: i32, rotation: i32): i32 {
  const w = unchecked(tmplFootprintW[templateId]);
  const h = unchecked(tmplFootprintH[templateId]);
  return rotation == 90 || rotation == 270 ? w : h;
}

export function instFootprintW(i: i32): i32 {
  const tid = unchecked(instTemplateId[i]);
  const rot = unchecked(instRotation[i]);
  return footprintWForRotation(tid, rot);
}

export function instFootprintH(i: i32): i32 {
  const tid = unchecked(instTemplateId[i]);
  const rot = unchecked(instRotation[i]);
  return footprintHForRotation(tid, rot);
}

export function countActiveInstances(): i32 {
  let c: i32 = 0;
  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) == 1) c++;
  }
  return c;
}

export function getPlacedAttractionCount(): i32 { return countActiveInstances(); }

export function getBrokenAttractionCount(): i32 {
  let c: i32 = 0;
  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) == 1 && unchecked(instBroken[i]) == 1) c++;
  }
  return c;
}

export function recordAttractionVisitAndRevenue(instIdx: i32, amount: i32): void {
  if (instIdx < 0 || instIdx >= MAX_INSTANCES) return;
  unchecked(instTotalVisitors[instIdx] = unchecked(instTotalVisitors[instIdx]) + 1);
  if (amount <= 0) return;
  unchecked(instTotalRevenue[instIdx] = unchecked(instTotalRevenue[instIdx]) + amount);
  unchecked(instMonthlyRevenue[instIdx] = unchecked(instMonthlyRevenue[instIdx]) + amount);
}

export function resetMonthlyAttractionRevenue(): void {
  for (let i = 0; i < MAX_INSTANCES; i++) {
    unchecked(instMonthlyRevenue[i] = 0);
  }
}

export function updateAttractionBreakdowns(): void {
  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) != 1) continue;
    if (unchecked(instBroken[i]) == 1) continue;
    const ageMonths = getInstAgeMonths(i);
    const chancePerTenThousand = min(400, 8 + ageMonths * 6);
    const r = nextRand() % 10000;
    if (r < chancePerTenThousand) {
      unchecked(instBroken[i] = 1);
      unchecked(instRepairTicks[i] = calcRepairTicks(i));
    }
  }
}

// ============== ATTRACTION PLACEMENT ==============

export function placeAttraction(templateId: i32, x: i32, y: i32): i32 {
  return placeAttractionRotated(templateId, x, y, 0);
}

export function placeAttractionRotated(templateId: i32, x: i32, y: i32, rotation: i32): i32 {
  if (templateId < 0 || templateId >= templateCount) return -1;
  if (instanceCount >= MAX_INSTANCES) return -1;
  const rot = normalizeRotation(rotation);
  const fw = footprintWForRotation(templateId, rot);
  const fh = footprintHForRotation(templateId, rot);
  if (canPlace(x, y, fw, fh) == 0) return -1;
  const price = unchecked(tmplBuildPrice[templateId]);
  if (!spend(price)) return -1;

  const idx = instanceCount;
  instanceCount++;

  unchecked(instTemplateId[idx] = templateId);
  unchecked(instX[idx] = x);
  unchecked(instY[idx] = y);
  unchecked(instRotation[idx] = rot);
  unchecked(instActive[idx] = 1);
  unchecked(instTicketPrice[idx] = unchecked(tmplTicketPrice[templateId]));
  unchecked(instCapacity[idx] = unchecked(tmplCapacity[templateId]));
  unchecked(instCurrentRiders[idx] = 0);
  const defaultEntry = findDefaultEndpoint(x, y, fw, fh);
  const entryX = defaultEntry & 0xFFFF;
  const entryY = (defaultEntry >> 16) & 0xFFFF;
  applyInstanceEndpoints(idx, entryX, entryY, entryX, entryY);
  unchecked(instBuildTick[idx] = tickCount);
  unchecked(instBroken[idx] = 0);
  unchecked(instRepairTicks[idx] = 0);
  unchecked(instTotalVisitors[idx] = 0);
  unchecked(instTotalRevenue[idx] = 0);
  unchecked(instMonthlyRevenue[idx] = 0);
  unchecked(instQueueLength[idx] = 0);
  unchecked(instEstimatedWaitTicks[idx] = 0);
  unchecked(instPopularity[idx] = unchecked(tmplAppeal[templateId]));

  const tv: u8 = <u8>(TILE_INSTANCE_BASE + idx);
  for (let dy = 0; dy < fh; dy++) {
    for (let dx = 0; dx < fw; dx++) {
      setTile(x + dx, y + dy, tv);
    }
  }
  return idx;
}

export function placeAttractionWithEndpoints(templateId: i32, x: i32, y: i32, entryX: i32, entryY: i32, exitX: i32, exitY: i32): i32 {
  return placeAttractionWithEndpointsRotated(templateId, x, y, entryX, entryY, exitX, exitY, 0);
}

export function placeAttractionWithEndpointsRotated(templateId: i32, x: i32, y: i32, entryX: i32, entryY: i32, exitX: i32, exitY: i32, rotation: i32): i32 {
  if (templateId < 0 || templateId >= templateCount) return -1;
  const rot = normalizeRotation(rotation);
  const fw = footprintWForRotation(templateId, rot);
  const fh = footprintHForRotation(templateId, rot);
  if (!isEndpointValidForPlacement(entryX, entryY, x, y, fw, fh, templateId)) return -1;
  if (!isEndpointValidForPlacement(exitX, exitY, x, y, fw, fh, templateId)) return -1;
  if (entryX == exitX && entryY == exitY) return -1;
  const instIdx = placeAttractionRotated(templateId, x, y, rot);
  if (instIdx < 0) return -1;
  applyInstanceEndpoints(instIdx, entryX, entryY, exitX, exitY);
  return instIdx;
}

export function demolish(x: i32, y: i32): i32 {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  const t = unchecked(gridData[y * MAP_W + x]);
  if (t == TILE_EMPTY || (t == TILE_ENTRANCE)) return 0;
  if (t >= TILE_INSTANCE_BASE) {
    const idx: i32 = <i32>(t - TILE_INSTANCE_BASE);
    if (idx >= 0 && idx < MAX_INSTANCES && unchecked(instActive[idx]) == 1) {
      const ax = unchecked(instX[idx]);
      const ay = unchecked(instY[idx]);
      const fw = instFootprintW(idx);
      const fh = instFootprintH(idx);
      for (let dy = 0; dy < fh; dy++) {
        for (let dx = 0; dx < fw; dx++) {
          setTile(ax + dx, ay + dy, TILE_EMPTY);
        }
      }
      unchecked(instActive[idx] = 0);
      unchecked(instRotation[idx] = 0);
      unchecked(instCapacity[idx] = 0);
      unchecked(instCurrentRiders[idx] = 0);
      unchecked(instEntranceX[idx] = -1);
      unchecked(instEntranceY[idx] = -1);
      unchecked(instExitX[idx] = -1);
      unchecked(instExitY[idx] = -1);
      unchecked(instBroken[idx] = 0);
      unchecked(instRepairTicks[idx] = 0);
      unchecked(instTotalVisitors[idx] = 0);
      unchecked(instTotalRevenue[idx] = 0);
      unchecked(instMonthlyRevenue[idx] = 0);
      unchecked(instQueueLength[idx] = 0);
      unchecked(instEstimatedWaitTicks[idx] = 0);
      unchecked(instPopularity[idx] = 0);
      const tid = unchecked(instTemplateId[idx]);
      earn(unchecked(tmplBuildPrice[tid]) / 2);
    }
  } else {
    const idx = y * MAP_W + x;
    if (unchecked(upperPathVariantData[idx]) >= 0) {
      const upH = <i32>unchecked(upperPathHeightData[idx]);
      unchecked(upperPathVariantData[idx] = -1);
      unchecked(upperPathHeightData[idx] = 0);
      unchecked(upperRampDirData[idx] = 0);
      unchecked(pathLevelData[pathLevelIndex(x, y, upH)] = -1);
      unchecked(pathLevelRampData[pathLevelIndex(x, y, upH)] = 0);
      earn(5);
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
  }
  recomputeNeighborRamps(x, y);
  recomputeNeighborUpperRamps(x, y);
  return 1;
}

// Legacy compat export
export function getAttractionCount(): i32 { return templateCount; }
