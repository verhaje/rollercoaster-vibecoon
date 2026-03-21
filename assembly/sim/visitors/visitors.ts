import {
  CAT_DRINK,
  CAT_FOOD,
  CAT_FUN,
  CAT_RELAX,
  CAT_THRILL,
  CAT_TOILET,
  MAP_H,
  MAP_W,
  MAX_VISITORS,
  NEED_BLADDER,
  NEED_COUNT,
  NEED_FUN,
  NEED_HUNGER,
  NEED_RELAX,
  NEED_THIRST,
  TILE_ENTRANCE,
  TILE_PATH_QUEUE,
  VS_ENTERING,
  VS_INACTIVE,
  VS_LEAVING,
  VS_QUEUING,
  VS_RIDING,
  VS_WALKING,
} from '../constants';
import {
  vBalloonTimer,
  vCrimeCooldown,
  vCrimeTimer,
  vCriminal,
  vCrowdComplaintCooldown,
  vExcitement,
  vExcitementTolerance,
  vLevel,
  vNausea,
  vNeeds,
  vPaid,
  vPukeTimer,
  vQueueX,
  vQueueY,
  vQueueOrder,
  vSatisfaction,
  vState,
  vStuckTimer,
  vTarget,
  vTimer,
  vUmbrellaTimer,
  vWallet,
  vX,
  vY,
  activeVisitors,
  tickCount,
  spawnCooldown,
  rngState,
} from '../state/visitorState';
import {
  instActive,
  instBroken,
  instCapacity,
  instCurrentRiders,
  instEntranceX,
  instEntranceY,
  instExitX,
  instExitY,
  instEstimatedWaitTicks,
  instPopularity,
  instQueueLength,
  instTemplateId,
  instTicketPrice,
  instX,
  instY,
  instanceCount,
  tmplCategory,
  tmplNauseaGain,
  tmplRequiredExcitement,
  tmplRideTicks,
} from '../state/attractionState';
import {
  CRIMINAL_MAX_TIMER,
  CROWD_ATTRACTIVENESS_PENALTY,
  CROWD_COMPLAINT_CHANCE,
  CROWD_COMPLAINT_COOLDOWN,
  CROWD_NEARBY_THRESHOLD,
  CROWD_RADIUS,
  CROWD_SATISFACTION_PENALTY,
  HIGH_PRIORITY_NEED_THRESHOLD,
  NAUSEA_PUKE_THRESHOLD,
  criminalRatePerThousand,
  entranceTicket,
  isRainingNow,
  parkAttractiveness,
  pukeData,
  theftCount,
  vandalismCount,
} from '../state/parkState';
import { gridData, heightData } from '../state/gridState';
import { earn } from '../economy/economy';
import { bfsNextStepLevel, findNearestWalkableTile, isWalkable, randomRoamStepLevel } from '../behavior/navigation';
import { nextRand } from '../behavior/rng';
import { findAdjacentPath } from '../behavior/employeeBehavior';
import { applyDrowningPenalty } from '../employees/employees';
import { entranceX, entranceY, isPathTile } from '../grid/gridOps';
import {
  countActiveInstances,
  getInstEffectiveAppeal,
  instFootprintH,
  instFootprintW,
  isInstantServiceCategory,
  setInstQueueStats,
  recordAttractionVisitAndRevenue,
} from '../attractions/attractions';

const BALLOON_STAND_TEMPLATE: i32 = 17;
const INFO_STAND_TEMPLATE: i32 = 18;

// ============== PRIVATE HELPERS ==============

function simpleRand(seed: i32): i32 {
  let s = seed ^ (seed << 13);
  s = s ^ (s >> 17);
  s = s ^ (s << 5);
  return s < 0 ? -s : s;
}

function tryPukeAt(x: i32, y: i32): void {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return;
  const idx = y * MAP_W + x;
  const tile = unchecked(gridData[idx]);
  if (!isPathTile(tile) && tile != 2) return; // 2 == TILE_ENTRANCE
  const next = min(4, <i32>unchecked(pukeData[idx]) + 1);
  unchecked(pukeData[idx] = <u8>next);
}

function getUrgentNeed(vi: i32): i32 {
  let worstNeed: i32 = -1;
  let worstVal: i32 = 69;
  for (let n = NEED_HUNGER; n <= NEED_BLADDER; n++) {
    const val = unchecked(vNeeds[vi * NEED_COUNT + n]);
    if (val > worstVal) { worstVal = val; worstNeed = n; }
  }
  return worstNeed;
}

function getUrgentNeedValue(vi: i32): i32 {
  const hunger = unchecked(vNeeds[vi * NEED_COUNT + NEED_HUNGER]);
  const thirst = unchecked(vNeeds[vi * NEED_COUNT + NEED_THIRST]);
  const bladder = unchecked(vNeeds[vi * NEED_COUNT + NEED_BLADDER]);
  let worst = hunger;
  if (thirst > worst) worst = thirst;
  if (bladder > worst) worst = bladder;
  return worst;
}

function pickBestInstance(vi: i32): i32 {
  let bestIdx: i32 = -1;
  let bestScore: i32 = -999;
  const wallet = unchecked(vWallet[vi]);
  const urgentNeed = getUrgentNeed(vi);
  const excitement = unchecked(vExcitement[vi]);
  const tolerance = unchecked(vExcitementTolerance[vi]);

  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) != 1) continue;
    if (unchecked(instBroken[i]) == 1) continue;
    const tid = unchecked(instTemplateId[i]);
    const cap = unchecked(instCapacity[i]);
    if (unchecked(instCurrentRiders[i]) >= cap) continue;
    const cat = unchecked(tmplCategory[tid]);
    const ticket = unchecked(instTicketPrice[i]);
    const appeal = max(0, unchecked(instPopularity[i]));
    const queueLen = unchecked(instQueueLength[i]);
    const waitTicks = unchecked(instEstimatedWaitTicks[i]);
    const reqExcitement = unchecked(tmplRequiredExcitement[tid]);
    if (ticket > wallet) continue;
    if ((cat == CAT_FUN || cat == CAT_THRILL) && excitement < reqExcitement) continue;

    let score: i32 = 0;
    if (urgentNeed >= 0 && cat == urgentNeed) {
      score = 500 + unchecked(vNeeds[vi * NEED_COUNT + urgentNeed]) * 3 + appeal;
    } else if (cat <= CAT_RELAX) {
      score = unchecked(vNeeds[vi * NEED_COUNT + cat]) * 2 + appeal - ticket * 2;
      if (cat == CAT_RELAX && excitement > tolerance) {
        score -= (excitement - tolerance) * 2;
      }
      if ((cat == CAT_FUN || cat == CAT_THRILL) && excitement >= reqExcitement) {
        score += (excitement - reqExcitement) / 3;
      }
    } else {
      score = unchecked(vNeeds[vi * NEED_COUNT + cat]) - 20 + appeal / 2 - ticket;
    }
    score -= waitTicks / 8 + queueLen * 2;
    score += simpleRand(vi * 37 + i * 13 + tickCount) % 15;
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  return bestIdx;
}

function getQueueFrontTile(instIdx: i32): i32 {
  const ex = unchecked(instEntranceX[instIdx]);
  const ey = unchecked(instEntranceY[instIdx]);
  if (ex >= 0 && ex < MAP_W && ey >= 0 && ey < MAP_H && unchecked(gridData[ey * MAP_W + ex]) == TILE_PATH_QUEUE) {
    return ex | (ey << 16);
  }
  const dirs = [0, -1, 1, 0, 0, 1, -1, 0];
  for (let d = 0; d < 4; d++) {
    const nx = ex + dirs[d * 2];
    const ny = ey + dirs[d * 2 + 1];
    if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue;
    if (unchecked(gridData[ny * MAP_W + nx]) == TILE_PATH_QUEUE) return nx | (ny << 16);
  }
  const near = findAdjacentPath(instIdx);
  if (near < 0) return -1;
  const nx = near & 0xFFFF;
  const ny = (near >> 16) & 0xFFFF;
  if (unchecked(gridData[ny * MAP_W + nx]) == TILE_PATH_QUEUE) return near;
  return -1;
}

function resolveApproachTile(instIdx: i32, cat: i32, tid: i32): i32 {
  if (isInstantServiceCategory(cat, tid)) {
    return findAdjacentPath(instIdx);
  }

  const ex = unchecked(instEntranceX[instIdx]);
  const ey = unchecked(instEntranceY[instIdx]);
  if (ex >= 0 && ex < MAP_W && ey >= 0 && ey < MAP_H) {
    const tile = unchecked(gridData[ey * MAP_W + ex]);
    if (isWalkable(tile) || tile == TILE_ENTRANCE || tile == TILE_PATH_QUEUE) {
      return ex | (ey << 16);
    }
  }

  return findAdjacentPath(instIdx);
}

function findQueueSpotByPosition(instIdx: i32, queuePos: i32): i32 {
  const front = getQueueFrontTile(instIdx);
  if (front < 0) return -1;

  const maxTiles: i32 = 96;
  const qx = new StaticArray<i32>(maxTiles);
  const qy = new StaticArray<i32>(maxTiles);
  const qd = new StaticArray<i32>(maxTiles);
  const qh = new StaticArray<i32>(maxTiles);
  const seen = new StaticArray<u8>(MAP_W * MAP_H);
  const tileX = new StaticArray<i32>(maxTiles);
  const tileY = new StaticArray<i32>(maxTiles);
  const tileD = new StaticArray<i32>(maxTiles);
  let head: i32 = 0;
  let tail: i32 = 0;
  let count: i32 = 0;

  const fx = front & 0xFFFF;
  const fy = (front >> 16) & 0xFFFF;
  unchecked(qx[tail] = fx);
  unchecked(qy[tail] = fy);
  unchecked(qd[tail] = 0);
  unchecked(seen[fy * MAP_W + fx] = 1);
  tail++;

  const dirs = [0, -1, 1, 0, 0, 1, -1, 0];
  while (head < tail && count < maxTiles) {
    const cx = unchecked(qx[head]);
    const cy = unchecked(qy[head]);
    const cd = unchecked(qd[head]);
    head++;

    unchecked(tileX[count] = cx);
    unchecked(tileY[count] = cy);
    unchecked(tileD[count] = cd);
    count++;

    for (let d = 0; d < 4; d++) {
      const nx = cx + dirs[d * 2];
      const ny = cy + dirs[d * 2 + 1];
      if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue;
      const ni = ny * MAP_W + nx;
      if (unchecked(seen[ni]) == 1) continue;
      if (unchecked(gridData[ni]) != TILE_PATH_QUEUE) continue;
      if (tail >= maxTiles) continue;
      unchecked(seen[ni] = 1);
      unchecked(qx[tail] = nx);
      unchecked(qy[tail] = ny);
      unchecked(qd[tail] = cd + 1);
      tail++;
    }
  }

  // Stable sort by distance from ride entrance: closest tile is front of queue.
  for (let i = 1; i < count; i++) {
    const sx = unchecked(tileX[i]);
    const sy = unchecked(tileY[i]);
    const sd = unchecked(tileD[i]);
    let j = i - 1;
    while (j >= 0) {
      const jd = unchecked(tileD[j]);
      const jx = unchecked(tileX[j]);
      const jy = unchecked(tileY[j]);
      if (jd < sd) break;
      if (jd == sd && (jy < sy || (jy == sy && jx <= sx))) break;
      unchecked(tileD[j + 1] = jd);
      unchecked(tileX[j + 1] = jx);
      unchecked(tileY[j + 1] = jy);
      j--;
    }
    unchecked(tileD[j + 1] = sd);
    unchecked(tileX[j + 1] = sx);
    unchecked(tileY[j + 1] = sy);
  }

  if (count <= 0) return -1;
  const idx = min(count - 1, max(0, queuePos));
  return unchecked(tileX[idx]) | (unchecked(tileY[idx]) << 16);
}

function getQueuePosition(instIdx: i32, vi: i32): i32 {
  const myOrder = unchecked(vQueueOrder[vi]);
  let pos: i32 = 0;
  for (let j = 0; j < MAX_VISITORS; j++) {
    if (j == vi) continue;
    if (unchecked(vState[j]) != VS_QUEUING) continue;
    if (unchecked(vTarget[j]) != instIdx) continue;
    const other = unchecked(vQueueOrder[j]);
    if (other < myOrder || (other == myOrder && j < vi)) pos++;
  }
  return pos;
}

export function recomputeQueueStats(): void {
  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) != 1) {
      setInstQueueStats(i, 0, 0, 0);
      continue;
    }
    const base = getInstEffectiveAppeal(i);
    setInstQueueStats(i, 0, 0, base);
  }

  for (let vi = 0; vi < MAX_VISITORS; vi++) {
    if (unchecked(vState[vi]) != VS_QUEUING) continue;
    const target = unchecked(vTarget[vi]);
    if (target < 0 || target >= instanceCount || unchecked(instActive[target]) != 1) continue;
    unchecked(instQueueLength[target] = unchecked(instQueueLength[target]) + 1);
  }

  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) != 1) continue;
    const tid = unchecked(instTemplateId[i]);
    const cap = max(1, unchecked(instCapacity[i]));
    const queueLen = unchecked(instQueueLength[i]);
    const riders = unchecked(instCurrentRiders[i]);
    const cycle = max(6, unchecked(tmplRideTicks[tid]));
    const waitTicks = ((queueLen + riders) * cycle) / cap;
    const base = getInstEffectiveAppeal(i);
    const queuePenalty = min(45, waitTicks / 10 + queueLen * 2);
    const popularity = max(5, base - queuePenalty);
    setInstQueueStats(i, queueLen, waitTicks, popularity);
  }
}

export function shouldLeave(vi: i32): bool {
  if (unchecked(vSatisfaction[vi]) <= 5) return true;
  if (unchecked(vWallet[vi]) <= 0) return true;
  for (let n = NEED_HUNGER; n <= NEED_BLADDER; n++) {
    if (unchecked(vNeeds[vi * NEED_COUNT + n]) >= 90) {
      let found = false;
      for (let i = 0; i < instanceCount; i++) {
        if (unchecked(instActive[i]) == 1) {
          const tid = unchecked(instTemplateId[i]);
          if (unchecked(tmplCategory[tid]) == n) { found = true; break; }
        }
      }
      if (!found) return true;
    }
  }
  return false;
}

function pickRandomPathGoal(cx: i32, cy: i32, cl: i32): i32 {
  const radius: i32 = 10;
  for (let attempt = 0; attempt < 20; attempt++) {
    const gx = max(0, min(MAP_W - 1, cx + (nextRand() % (radius * 2 + 1)) - radius));
    const gy = max(0, min(MAP_H - 1, cy + (nextRand() % (radius * 2 + 1)) - radius));
    const gIdx = gy * MAP_W + gx;
    if (!isWalkable(unchecked(gridData[gIdx]))) continue;
    if (gx == cx && gy == cy) continue;
    const gH = <i32>unchecked(heightData[gIdx]);
    if (bfsNextStepLevel(cx, cy, cl, gx, gy, gH) >= 0) {
      return gx | (gy << 16);
    }
  }
  return -1;
}

function countNearbyVisitors(vi: i32, radius: i32): i32 {
  const cx = unchecked(vX[vi]);
  const cy = unchecked(vY[vi]);
  let count: i32 = 0;
  for (let j = 0; j < MAX_VISITORS; j++) {
    if (j == vi) continue;
    const state = unchecked(vState[j]);
    if (state == VS_INACTIVE || state == VS_LEAVING) continue;
    const d = abs(unchecked(vX[j]) - cx) + abs(unchecked(vY[j]) - cy);
    if (d <= radius) count++;
  }
  return count;
}

function maybeComplainCrowding(vi: i32): void {
  const cooldown = unchecked(vCrowdComplaintCooldown[vi]);
  if (cooldown > 0) {
    unchecked(vCrowdComplaintCooldown[vi] = cooldown - 1);
    return;
  }
  if (countNearbyVisitors(vi, CROWD_RADIUS) < CROWD_NEARBY_THRESHOLD) return;
  if ((nextRand() % 100) >= CROWD_COMPLAINT_CHANCE) return;
  unchecked(vSatisfaction[vi] = max(0, unchecked(vSatisfaction[vi]) - CROWD_SATISFACTION_PENALTY));
  parkAttractiveness = max(0, parkAttractiveness - CROWD_ATTRACTIVENESS_PENALTY);
  unchecked(vCrowdComplaintCooldown[vi] = CROWD_COMPLAINT_COOLDOWN);
}

function pickTheftVictim(vi: i32): i32 {
  const cx = unchecked(vX[vi]);
  const cy = unchecked(vY[vi]);
  let best: i32 = -1;
  let bestWallet: i32 = 0;
  for (let j = 0; j < MAX_VISITORS; j++) {
    if (j == vi) continue;
    if (unchecked(vState[j]) == VS_INACTIVE) continue;
    if (unchecked(vCriminal[j]) == 1) continue;
    const d = abs(unchecked(vX[j]) - cx) + abs(unchecked(vY[j]) - cy);
    if (d > 1) continue;
    const wallet = unchecked(vWallet[j]);
    if (wallet <= 0) continue;
    if (wallet > bestWallet) { bestWallet = wallet; best = j; }
  }
  return best;
}

// ============== VISITOR LIFECYCLE ==============

export function resetVisitor(i: i32): void {
  unchecked(vState[i] = VS_INACTIVE);
  unchecked(vTarget[i] = -1);
  unchecked(vTimer[i] = 0);
  unchecked(vSatisfaction[i] = 60);
  unchecked(vPaid[i] = 0);
  unchecked(vStuckTimer[i] = 0);
  unchecked(vWallet[i] = 20 + nextRand() % 101);
  unchecked(vQueueX[i] = -1);
  unchecked(vQueueY[i] = -1);
  unchecked(vQueueOrder[i] = 0);
  unchecked(vLevel[i] = 0);
  unchecked(vExcitement[i] = 20 + nextRand() % 40);
  unchecked(vExcitementTolerance[i] = 25 + nextRand() % 35);
  unchecked(vNausea[i] = nextRand() % 12);
  unchecked(vPukeTimer[i] = 0);
  unchecked(vCriminal[i] = 0);
  unchecked(vCrimeTimer[i] = 0);
  unchecked(vCrimeCooldown[i] = 0);
  unchecked(vCrowdComplaintCooldown[i] = 0);
  unchecked(vBalloonTimer[i] = 0);
  unchecked(vUmbrellaTimer[i] = 0);
  for (let n = 0; n < NEED_COUNT; n++) {
    unchecked(vNeeds[i * NEED_COUNT + n] = nextRand() % 40);
  }
}

export function spawnVisitor(): void {
  if (activeVisitors >= MAX_VISITORS) return;
  if (countActiveInstances() == 0) return;
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) == VS_INACTIVE) {
      resetVisitor(i);
      const ex = entranceX();
      const ey = entranceY();
      unchecked(vX[i] = ex);
      unchecked(vY[i] = ey);
      unchecked(vLevel[i] = <u8>unchecked(heightData[ey * MAP_W + ex]));
      unchecked(vState[i] = VS_ENTERING);
      unchecked(vTimer[i] = 0);
      if ((nextRand() % 1000) < criminalRatePerThousand) {
        unchecked(vCriminal[i] = 1);
        unchecked(vCrimeTimer[i] = CRIMINAL_MAX_TIMER);
        unchecked(vCrimeCooldown[i] = 3 + (nextRand() % 4));
      }
      activeVisitors++;
      return;
    }
  }
}

export function updateVisitor(i: i32): void {
  const state = unchecked(vState[i]);
  if (state == VS_INACTIVE) return;

  const balloonTimer = unchecked(vBalloonTimer[i]);
  if (balloonTimer > 0) {
    unchecked(vBalloonTimer[i] = balloonTimer - 1);
  }
  const umbrellaTimer = unchecked(vUmbrellaTimer[i]);
  if (umbrellaTimer > 0) {
    unchecked(vUmbrellaTimer[i] = umbrellaTimer - 1);
  }

  if (unchecked(vPukeTimer[i]) > 0) {
    unchecked(vPukeTimer[i] = unchecked(vPukeTimer[i]) - 1);
  }

  if (state == VS_ENTERING) {
    if (unchecked(vPaid[i]) == 0) {
      if (unchecked(vWallet[i]) >= entranceTicket) {
        unchecked(vWallet[i] = unchecked(vWallet[i]) - entranceTicket);
        earn(entranceTicket);
        unchecked(vPaid[i] = 1);
      } else {
        unchecked(vState[i] = VS_LEAVING);
        unchecked(vTimer[i] = 10);
        return;
      }
    }
    unchecked(vState[i] = VS_WALKING);
    unchecked(vTimer[i] = 0);
    unchecked(vTarget[i] = -1);
    return;
  }

  if (state == VS_WALKING) {
    maybeComplainCrowding(i);

    const cxNow = unchecked(vX[i]);
    const cyNow = unchecked(vY[i]);
    if (cxNow >= 0 && cxNow < MAP_W && cyNow >= 0 && cyNow < MAP_H) {
      if (!isWalkable(unchecked(gridData[cyNow * MAP_W + cxNow]))) {
        const nearest = findNearestWalkableTile(cxNow, cyNow);
        if (nearest >= 0) {
          const tx = nearest & 0xFFFF;
          const ty = (nearest >> 16) & 0xFFFF;
          let nx = cxNow;
          let ny = cyNow;
          if (abs(tx - cxNow) >= abs(ty - cyNow)) {
            if (tx > cxNow) nx++;
            else if (tx < cxNow) nx--;
            else if (ty > cyNow) ny++;
            else if (ty < cyNow) ny--;
          } else {
            if (ty > cyNow) ny++;
            else if (ty < cyNow) ny--;
            else if (tx > cxNow) nx++;
            else if (tx < cxNow) nx--;
          }
          if (nx >= 0 && nx < MAP_W && ny >= 0 && ny < MAP_H) {
            unchecked(vX[i] = nx);
            unchecked(vY[i] = ny);
            unchecked(vLevel[i] = <u8>unchecked(heightData[ny * MAP_W + nx]));
          }
          return;
        }
      }
    }

    if (tickCount % 25 == 0) {
      unchecked(vNausea[i] = max(0, unchecked(vNausea[i]) - 1));
    }
    if (cxNow >= 0 && cxNow < MAP_W && cyNow >= 0 && cyNow < MAP_H) {
      const cell = cyNow * MAP_W + cxNow;
      if (unchecked(pukeData[cell]) > 0 && tickCount % 6 == 0) {
        unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 2));
      }
    }

    if (unchecked(vNausea[i]) >= NAUSEA_PUKE_THRESHOLD) {
      tryPukeAt(cxNow, cyNow);
      unchecked(vNausea[i] = max(0, unchecked(vNausea[i]) - 55));
      unchecked(vPukeTimer[i] = 14);
      unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 18));
      unchecked(vTarget[i] = -1);
      unchecked(vQueueX[i] = -1);
      unchecked(vQueueY[i] = -1);
      return;
    }

    if (unchecked(vCriminal[i]) == 1) {
      const cooldown = unchecked(vCrimeCooldown[i]);
      if (cooldown > 0) {
        unchecked(vCrimeCooldown[i] = cooldown - 1);
      } else {
        const victim = pickTheftVictim(i);
        if (victim >= 0) {
          const stolen = unchecked(vWallet[victim]);
          if (stolen > 0) {
            unchecked(vWallet[victim] = 0);
            unchecked(vSatisfaction[victim] = max(0, unchecked(vSatisfaction[victim]) - 24));
            theftCount++;
            applyCrimeShock(cxNow, cyNow, 10);
            unchecked(vState[i] = VS_LEAVING);
            unchecked(vTimer[i] = 45);
            unchecked(vCrimeCooldown[i] = 4);
            return;
          }
        }
      }
      const remain = unchecked(vCrimeTimer[i]) - 1;
      unchecked(vCrimeTimer[i] = remain);
      if (remain <= 0) {
        unchecked(vState[i] = VS_LEAVING);
        unchecked(vTimer[i] = 40);
        return;
      }
    }

    if (tickCount % 5 == 0) {
      unchecked(vNeeds[i * NEED_COUNT + NEED_HUNGER] = min(100, unchecked(vNeeds[i * NEED_COUNT + NEED_HUNGER]) + 1));
      unchecked(vNeeds[i * NEED_COUNT + NEED_THIRST] = min(100, unchecked(vNeeds[i * NEED_COUNT + NEED_THIRST]) + 2));
      unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER] = min(100, unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]) + 1));
    }
    if (shouldLeave(i)) {
      unchecked(vState[i] = VS_LEAVING);
      unchecked(vTimer[i] = 25);
      return;
    }
    const urgentNeedValue = getUrgentNeedValue(i);
    if (unchecked(vTarget[i]) == -1) {
      let pickGoalChance: i32 = 35;
      if (urgentNeedValue >= HIGH_PRIORITY_NEED_THRESHOLD) pickGoalChance = 100;
      else if (urgentNeedValue >= 60) pickGoalChance = 75;
      else if (urgentNeedValue >= 50) pickGoalChance = 55;

      if ((nextRand() % 100) < pickGoalChance) {
        const best = pickBestInstance(i);
        if (best != -1) {
          unchecked(vTarget[i] = best);
          unchecked(vQueueX[i] = -1);
          unchecked(vQueueY[i] = -1);
          unchecked(vStuckTimer[i] = 0);
        } else {
          unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 1));
          if (unchecked(vSatisfaction[i]) <= 0) {
            unchecked(vState[i] = VS_LEAVING);
            unchecked(vTimer[i] = 30);
          }
        }
      }

      if (unchecked(vTarget[i]) == -1) {
        const cx = unchecked(vX[i]);
        const cy = unchecked(vY[i]);
        const cl = <i32>unchecked(vLevel[i]);
        let roamX = unchecked(vQueueX[i]);
        let roamY = unchecked(vQueueY[i]);

        if (roamX < 0 || roamY < 0 || (roamX == cx && roamY == cy) || (nextRand() % 100) < 15) {
          const roamGoal = pickRandomPathGoal(cx, cy, cl);
          if (roamGoal >= 0) {
            roamX = roamGoal & 0xFFFF;
            roamY = (roamGoal >> 16) & 0xFFFF;
            unchecked(vQueueX[i] = roamX);
            unchecked(vQueueY[i] = roamY);
          } else {
            roamX = entranceX();
            roamY = entranceY();
            unchecked(vQueueX[i] = roamX);
            unchecked(vQueueY[i] = roamY);
          }
        }

        let roamPacked = bfsNextStepLevel(cx, cy, cl, roamX, roamY, cl);
        if (roamPacked < 0) {
          roamPacked = randomRoamStepLevel(cx, cy, cl, roamX, roamY);
        }
        if (roamPacked >= 0) {
          unchecked(vX[i] = roamPacked & 0x3FF);
          unchecked(vY[i] = (roamPacked >> 10) & 0x3FF);
          unchecked(vLevel[i] = <u8>((roamPacked >> 20) & 0x1F));
          unchecked(vStuckTimer[i] = 0);
        } else {
          unchecked(vStuckTimer[i] = unchecked(vStuckTimer[i]) + 1);
        }
        return;
      }
    }

    const target = unchecked(vTarget[i]);
    if (target < 0 || unchecked(instActive[target]) != 1) {
      unchecked(vTarget[i] = -1);
      return;
    }
    const tid = unchecked(instTemplateId[target]);
    const cat = unchecked(tmplCategory[tid]);
    const adjPacked = resolveApproachTile(target, cat, tid);
    if (adjPacked == -1) {
      unchecked(vStuckTimer[i] = unchecked(vStuckTimer[i]) + 1);
      if (unchecked(vStuckTimer[i]) > 10) {
        unchecked(vTarget[i] = -1);
        unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 3));
        unchecked(vStuckTimer[i] = 0);
      }
      return;
    }
    let adjX: i32 = adjPacked & 0xFFFF;
    let adjY: i32 = (adjPacked >> 16) & 0xFFFF;
    if (adjX < 0 || adjX >= MAP_W || adjY < 0 || adjY >= MAP_H) {
      unchecked(vTarget[i] = -1);
      return;
    }
    const cx = unchecked(vX[i]);
    const cy = unchecked(vY[i]);
    const cl = <i32>unchecked(vLevel[i]);
    if (cx == adjX && cy == adjY) {
      if (unchecked(instBroken[target]) == 1) {
        unchecked(vTarget[i] = -1);
        unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 3));
        return;
      }
      const cap = unchecked(instCapacity[target]);
      if (unchecked(instCurrentRiders[target]) < cap) {
        const ticket = unchecked(instTicketPrice[target]);
        if (unchecked(vWallet[i]) >= ticket) {
          unchecked(vWallet[i] = unchecked(vWallet[i]) - ticket);
          earn(ticket);
          recordAttractionVisitAndRevenue(target, ticket);
          unchecked(instCurrentRiders[target] = unchecked(instCurrentRiders[target]) + 1);
          unchecked(vState[i] = VS_RIDING);
          unchecked(vTimer[i] = unchecked(tmplRideTicks[tid]));
        } else {
          unchecked(vTarget[i] = -1);
          unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 3));
        }
      } else if (isInstantServiceCategory(cat, tid)) {
        unchecked(vQueueX[i] = -1);
        unchecked(vQueueY[i] = -1);
        unchecked(vTarget[i] = -1);
        unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 1));
      } else {
        const q = findQueueSpotByPosition(target, unchecked(instQueueLength[target]));
        if (q >= 0) {
          unchecked(vQueueX[i] = q & 0xFFFF);
          unchecked(vQueueY[i] = (q >> 16) & 0xFFFF);
        } else {
          unchecked(vQueueX[i] = cx);
          unchecked(vQueueY[i] = cy);
        }
        unchecked(vQueueOrder[i] = (tickCount << 8) + i);
        unchecked(vState[i] = VS_QUEUING);
        unchecked(vTimer[i] = 10);
      }
      return;
    }
    const mustGoStraight = urgentNeedValue >= HIGH_PRIORITY_NEED_THRESHOLD;
    if (!mustGoStraight) {
      let wanderChance: i32 = 28;
      if (urgentNeedValue >= 60) wanderChance = 10;
      else if (urgentNeedValue >= 50) wanderChance = 16;

      if ((nextRand() % 100) < wanderChance) {
        const roamPacked = randomRoamStepLevel(cx, cy, cl, adjX, adjY);
        if (roamPacked >= 0) {
          unchecked(vX[i] = roamPacked & 0x3FF);
          unchecked(vY[i] = (roamPacked >> 10) & 0x3FF);
          unchecked(vLevel[i] = <u8>((roamPacked >> 20) & 0x1F));
          unchecked(vStuckTimer[i] = 0);
          return;
        }
      }
    }

    const adjLevel = <i32>unchecked(heightData[adjY * MAP_W + adjX]);
    const nextPacked = bfsNextStepLevel(cx, cy, cl, adjX, adjY, adjLevel);
    if (nextPacked == -1) {
      unchecked(vStuckTimer[i] = unchecked(vStuckTimer[i]) + 1);
      if (unchecked(vStuckTimer[i]) > 10) {
        unchecked(vTarget[i] = -1);
        unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 3));
        unchecked(vStuckTimer[i] = 0);
      }
      return;
    }
    unchecked(vX[i] = nextPacked & 0x3FF);
    unchecked(vY[i] = (nextPacked >> 10) & 0x3FF);
    unchecked(vLevel[i] = <u8>((nextPacked >> 20) & 0x1F));
    unchecked(vStuckTimer[i] = 0);
    return;
  }

  if (state == VS_QUEUING) {
    maybeComplainCrowding(i);

    const target = unchecked(vTarget[i]);
    if (target < 0 || unchecked(instActive[target]) != 1) {
      unchecked(vState[i] = VS_WALKING);
      unchecked(vTarget[i] = -1);
      return;
    }
    if (unchecked(instBroken[target]) == 1) {
      unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 6));
      unchecked(vState[i] = VS_WALKING);
      unchecked(vTarget[i] = -1);
      return;
    }

    const tid = unchecked(instTemplateId[target]);
    const cat = unchecked(tmplCategory[tid]);
    if (isInstantServiceCategory(cat, tid)) {
      unchecked(vQueueX[i] = -1);
      unchecked(vQueueY[i] = -1);
      unchecked(vState[i] = VS_WALKING);
      unchecked(vTarget[i] = -1);
      return;
    }

    const queuePos = getQueuePosition(target, i);
    const targetSpot = findQueueSpotByPosition(target, queuePos);
    const fallbackX = unchecked(instEntranceX[target]);
    const fallbackY = unchecked(instEntranceY[target]);
    const qx = targetSpot >= 0 ? (targetSpot & 0xFFFF) : fallbackX;
    const qy = targetSpot >= 0 ? ((targetSpot >> 16) & 0xFFFF) : fallbackY;
    unchecked(vQueueX[i] = qx);
    unchecked(vQueueY[i] = qy);

    if (qx >= 0 && qy >= 0 && (unchecked(vX[i]) != qx || unchecked(vY[i]) != qy)) {
      const qLevel = <i32>unchecked(heightData[qy * MAP_W + qx]);
      const nextPacked = bfsNextStepLevel(unchecked(vX[i]), unchecked(vY[i]), <i32>unchecked(vLevel[i]), qx, qy, qLevel);
      if (nextPacked >= 0) {
        unchecked(vX[i] = nextPacked & 0x3FF);
        unchecked(vY[i] = (nextPacked >> 10) & 0x3FF);
        unchecked(vLevel[i] = <u8>((nextPacked >> 20) & 0x1F));
      }
    }

    let t = unchecked(vTimer[i]) - 1;
    unchecked(vTimer[i] = t);
    if (tickCount % 8 == 0) {
      unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER] = min(100, unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]) + 1));
      unchecked(vNausea[i] = max(0, unchecked(vNausea[i]) - 1));
      unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 1));
    }

    const atSpot = unchecked(vX[i]) == qx && unchecked(vY[i]) == qy;
    if (queuePos == 0 && atSpot && unchecked(instCurrentRiders[target]) < unchecked(instCapacity[target])) {
      const ticket = unchecked(instTicketPrice[target]);
      if (unchecked(vWallet[i]) >= ticket) {
        unchecked(vWallet[i] = unchecked(vWallet[i]) - ticket);
        earn(ticket);
        recordAttractionVisitAndRevenue(target, ticket);
        unchecked(instCurrentRiders[target] = unchecked(instCurrentRiders[target]) + 1);
        unchecked(vState[i] = VS_RIDING);
        unchecked(vTimer[i] = unchecked(tmplRideTicks[tid]));
        unchecked(vQueueOrder[i] = 0);
      } else {
        unchecked(vTarget[i] = -1);
        unchecked(vState[i] = VS_WALKING);
        unchecked(vQueueOrder[i] = 0);
      }
    } else if (t <= 0) {
      unchecked(vTimer[i] = 8 + (nextRand() % 8));
    }
    return;
  }

  if (state == VS_RIDING) {
    let t = unchecked(vTimer[i]) - 1;
    unchecked(vTimer[i] = t);
    if (t <= 0) {
      const target = unchecked(vTarget[i]);
      if (target >= 0) {
        unchecked(instCurrentRiders[target] = max(0, unchecked(instCurrentRiders[target]) - 1));
        const tid = unchecked(instTemplateId[target]);
        const cat = unchecked(tmplCategory[tid]);
        const appeal = getInstEffectiveAppeal(target);
        if (tid == BALLOON_STAND_TEMPLATE) {
          unchecked(vNeeds[i * NEED_COUNT + NEED_FUN] = max(0, unchecked(vNeeds[i * NEED_COUNT + NEED_FUN]) - 45));
          unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 10));
          unchecked(vExcitement[i] = min(100, unchecked(vExcitement[i]) + 5));
          unchecked(vBalloonTimer[i] = 130 + nextRand() % 110);
        } else if (tid == INFO_STAND_TEMPLATE) {
          unchecked(vNeeds[i * NEED_COUNT + NEED_RELAX] = max(0, unchecked(vNeeds[i * NEED_COUNT + NEED_RELAX]) - 25));
          unchecked(vExcitement[i] = max(0, unchecked(vExcitement[i]) - 4));
          if (isRainingNow == 1) {
            unchecked(vUmbrellaTimer[i] = max(unchecked(vUmbrellaTimer[i]), 900 + (nextRand() % 450)));
            unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 12));
          } else {
            unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 5));
          }
        } else if (cat == CAT_FOOD) {
          unchecked(vNeeds[i * NEED_COUNT + NEED_HUNGER] = max(0, unchecked(vNeeds[i * NEED_COUNT + NEED_HUNGER]) - 60));
          unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 8));
          unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER] = min(100, unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]) + 5));
        } else if (cat == CAT_DRINK) {
          unchecked(vNeeds[i * NEED_COUNT + NEED_THIRST] = max(0, unchecked(vNeeds[i * NEED_COUNT + NEED_THIRST]) - 70));
          unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 6));
          unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER] = min(100, unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]) + 10));
        } else if (cat == CAT_TOILET) {
          unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER] = max(0, unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]) - 80));
          unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 5));
        } else {
          unchecked(vNeeds[i * NEED_COUNT + cat] = max(0, unchecked(vNeeds[i * NEED_COUNT + cat]) - 40));
          unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + appeal / 5 + 10));
          unchecked(vNausea[i] = min(140, unchecked(vNausea[i]) + unchecked(tmplNauseaGain[tid])));
          if (cat == CAT_RELAX) {
            unchecked(vExcitementTolerance[i] = min(100, unchecked(vExcitementTolerance[i]) + 2));
            unchecked(vExcitement[i] = max(0, unchecked(vExcitement[i]) - 8));
          } else if (cat == CAT_FUN) {
            unchecked(vExcitement[i] = min(100, unchecked(vExcitement[i]) + 8));
          } else if (cat == CAT_THRILL) {
            unchecked(vExcitement[i] = min(100, unchecked(vExcitement[i]) + 14));
          }
        }
      }
      if (target >= 0) {
        const outX = unchecked(instExitX[target]);
        const outY = unchecked(instExitY[target]);
        if (outX >= 0 && outX < MAP_W && outY >= 0 && outY < MAP_H) {
          const outTile = unchecked(gridData[outY * MAP_W + outX]);
          if (isWalkable(outTile) || outTile == TILE_ENTRANCE || outTile == TILE_PATH_QUEUE) {
            unchecked(vX[i] = outX);
            unchecked(vY[i] = outY);
            unchecked(vLevel[i] = <u8>unchecked(heightData[outY * MAP_W + outX]));
          } else {
            const fallback = findAdjacentPath(target);
            if (fallback >= 0) {
              const fx = fallback & 0xFFFF;
              const fy = (fallback >> 16) & 0xFFFF;
              unchecked(vX[i] = fx);
              unchecked(vY[i] = fy);
              unchecked(vLevel[i] = <u8>unchecked(heightData[fy * MAP_W + fx]));
            } else {
              unchecked(vX[i] = outX);
              unchecked(vY[i] = outY);
              unchecked(vLevel[i] = <u8>unchecked(heightData[outY * MAP_W + outX]));
            }
          }
        }
      }
      unchecked(vTarget[i] = -1);
      unchecked(vQueueX[i] = -1);
      unchecked(vQueueY[i] = -1);
      unchecked(vQueueOrder[i] = 0);
      unchecked(vState[i] = VS_WALKING);
      for (let n = 0; n < 3; n++) {
        unchecked(vNeeds[i * NEED_COUNT + n] = min(100, unchecked(vNeeds[i * NEED_COUNT + n]) + 5));
      }
    }
    return;
  }

  if (state == VS_LEAVING) {
    let t = unchecked(vTimer[i]) - 1;
    unchecked(vTimer[i] = t);
    const ex = entranceX();
    const ey = entranceY();
    const cx = unchecked(vX[i]);
    const cy = unchecked(vY[i]);
    const cl = <i32>unchecked(vLevel[i]);
    if (cx == ex && cy == ey) {
      unchecked(vState[i] = VS_INACTIVE);
      unchecked(vCriminal[i] = 0);
      activeVisitors--;
      return;
    }
    const eLevel = <i32>unchecked(heightData[ey * MAP_W + ex]);
    const nextPacked = bfsNextStepLevel(cx, cy, cl, ex, ey, eLevel);
    if (nextPacked >= 0) {
      unchecked(vX[i] = nextPacked & 0x3FF);
      unchecked(vY[i] = (nextPacked >> 10) & 0x3FF);
      unchecked(vLevel[i] = <u8>((nextPacked >> 20) & 0x1F));
    }
    if (t <= 0) {
      unchecked(vState[i] = VS_INACTIVE);
      unchecked(vCriminal[i] = 0);
      activeVisitors--;
    }
    return;
  }
}

// ============== EXPORTED VISITOR GETTERS ==============

export function getActiveVisitors(): i32 { return activeVisitors; }
export function getTickCount(): i32 { return tickCount; }
export function getVisitorX(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vX[i]) : -1; }
export function getVisitorY(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vY[i]) : -1; }
export function getVisitorState(i: i32): u8 { return i >= 0 && i < MAX_VISITORS ? unchecked(vState[i]) : 255; }
export function getVisitorSatisfaction(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vSatisfaction[i]) : 0; }
export function getVisitorTarget(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vTarget[i]) : -1; }
export function getVisitorStuckTimer(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vStuckTimer[i]) : 0; }
export function getVisitorWallet(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vWallet[i]) : 0; }
export function getVisitorPathLevel(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vLevel[i]) : 0; }
export function getVisitorHunger(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vNeeds[i * NEED_COUNT + NEED_HUNGER]) : 0; }
export function getVisitorThirst(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vNeeds[i * NEED_COUNT + NEED_THIRST]) : 0; }
export function getVisitorBladder(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]) : 0; }
export function getVisitorFun(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vNeeds[i * NEED_COUNT + NEED_FUN]) : 0; }
export function getVisitorNausea(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vNausea[i]) : 0; }
export function getVisitorPukeTimer(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vPukeTimer[i]) : 0; }
export function getVisitorExcitement(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vExcitement[i]) : 0; }
export function getVisitorExcitementTolerance(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vExcitementTolerance[i]) : 0; }
export function getVisitorIsCriminal(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? <i32>unchecked(vCriminal[i]) : 0; }
export function getVisitorBalloonTimer(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vBalloonTimer[i]) : 0; }
export function getVisitorUmbrellaTimer(i: i32): i32 { return i >= 0 && i < MAX_VISITORS ? unchecked(vUmbrellaTimer[i]) : 0; }

export function setIsRaining(raining: i32): void {
  isRainingNow = raining > 0 ? 1 : 0;
}

export function getIsRaining(): i32 {
  return isRainingNow;
}

export function getPukeAt(x: i32, y: i32): i32 {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return 0;
  return unchecked(pukeData[y * MAP_W + x]);
}

export function getDirtyPathCount(): i32 {
  let count: i32 = 0;
  for (let i = 0; i < MAP_W * MAP_H; i++) {
    if (unchecked(pukeData[i]) > 0) count++;
  }
  return count;
}

// ============== EXPORTED AVERAGES ==============

export function getAvgSatisfaction(): i32 {
  if (activeVisitors == 0) return 0;
  let sum: i32 = 0; let count: i32 = 0;
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) != VS_INACTIVE) { sum += unchecked(vSatisfaction[i]); count++; }
  }
  return count > 0 ? sum / count : 0;
}

export function getAvgHunger(): i32 {
  if (activeVisitors == 0) return 0;
  let sum: i32 = 0; let count: i32 = 0;
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) != VS_INACTIVE) { sum += unchecked(vNeeds[i * NEED_COUNT + NEED_HUNGER]); count++; }
  }
  return count > 0 ? sum / count : 0;
}

export function getAvgThirst(): i32 {
  if (activeVisitors == 0) return 0;
  let sum: i32 = 0; let count: i32 = 0;
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) != VS_INACTIVE) { sum += unchecked(vNeeds[i * NEED_COUNT + NEED_THIRST]); count++; }
  }
  return count > 0 ? sum / count : 0;
}

export function getAvgBladder(): i32 {
  if (activeVisitors == 0) return 0;
  let sum: i32 = 0; let count: i32 = 0;
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) != VS_INACTIVE) { sum += unchecked(vNeeds[i * NEED_COUNT + NEED_BLADDER]); count++; }
  }
  return count > 0 ? sum / count : 0;
}

// ============== EXPORTED CRIME / RELOCATE / DROWN ==============

export function applyCrimeShock(x: i32, y: i32, severity: i32): void {
  const s = max(1, severity);
  parkAttractiveness = max(0, parkAttractiveness - max(1, s / 2));
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) == VS_INACTIVE) continue;
    const vx = unchecked(vX[i]);
    const vy = unchecked(vY[i]);
    const d = abs(vx - x) + abs(vy - y);
    if (d > 6) continue;
    const hit = max(1, s - d * 2);
    unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - hit));
  }
}

export function reportVandalism(x: i32, y: i32): void {
  vandalismCount++;
  applyCrimeShock(x, y, 14);
}

export function triggerCriminalEscape(visitorIndex: i32): void {
  if (visitorIndex < 0 || visitorIndex >= MAX_VISITORS) return;
  if (unchecked(vState[visitorIndex]) == VS_INACTIVE) return;
  unchecked(vState[visitorIndex] = VS_LEAVING);
  unchecked(vTimer[visitorIndex] = 45);
}

export function relocateVisitor(visitorIndex: i32, x: i32, y: i32): i32 {
  if (visitorIndex < 0 || visitorIndex >= MAX_VISITORS) return 0;
  if (unchecked(vState[visitorIndex]) == VS_INACTIVE) return 0;
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  unchecked(vX[visitorIndex] = x);
  unchecked(vY[visitorIndex] = y);
  unchecked(vLevel[visitorIndex] = <u8>unchecked(heightData[y * MAP_W + x]));
  unchecked(vState[visitorIndex] = VS_WALKING);
  unchecked(vTarget[visitorIndex] = -1);
  unchecked(vQueueX[visitorIndex] = -1);
  unchecked(vQueueY[visitorIndex] = -1);
  unchecked(vQueueOrder[visitorIndex] = 0);
  unchecked(vTimer[visitorIndex] = 0);
  return 1;
}

export function drownVisitor(visitorIndex: i32): i32 {
  if (visitorIndex < 0 || visitorIndex >= MAX_VISITORS) return 0;
  if (unchecked(vState[visitorIndex]) == VS_INACTIVE) return 0;
  resetVisitor(visitorIndex);
  activeVisitors = max(0, activeVisitors - 1);
  applyDrowningPenalty();
  return 1;
}
