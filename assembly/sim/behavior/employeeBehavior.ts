import {
  MAP_H,
  MAP_W,
  MAX_VISITORS,
  TILE_ENTRANCE,
  TILE_PATH_QUEUE,
  VS_INACTIVE,
  VS_LEAVING,
} from '../constants';
import {
  instActive,
  instBroken,
  instBuildTick,
  instRotation,
  instRepairTicks,
  instTemplateId,
  instX,
  instY,
  instanceCount,
  tmplBuildPrice,
  tmplFootprintH,
  tmplFootprintW,
} from '../state/attractionState';
import {
  cleanerActive,
  cleanerAreaCount,
  cleanerAreaX,
  cleanerAreaY,
  cleanerCleanTimer,
  cleanerCount,
  cleanerPathsCleaned,
  cleanerPatrolX,
  cleanerPatrolY,
  cleanerTargetX,
  cleanerTargetY,
  cleanerX,
  cleanerY,
  EMPLOYEE_AREA_RADIUS,
  entertainerActive,
  entertainerAreaCount,
  entertainerAreaX,
  entertainerAreaY,
  entertainerCount,
  entertainerGuestsCheered,
  entertainerPatrolX,
  entertainerPatrolY,
  entertainerX,
  entertainerY,
  MAX_EMPLOYEE_AREAS,
  mechActive,
  mechAreaCount,
  mechAreaX,
  mechAreaY,
  mechanicCount,
  mechPatrolX,
  mechPatrolY,
  mechRepairTimer,
  mechRepairsCompleted,
  mechTarget,
  mechX,
  mechY,
  securityActive,
  securityAreaCount,
  securityAreaX,
  securityAreaY,
  securityCount,
  securityIncidentsHandled,
  securityPatrolX,
  securityPatrolY,
  securityTargetVisitor,
  securityX,
  securityY,
} from '../state/employeeState';
import { upperPathVariantData, gridData, heightData } from '../state/gridState';
import { SECURITY_DETECTION_RADIUS, TICKS_PER_MONTH, pukeData } from '../state/parkState';
import {
  vCrimeTimer,
  vCriminal,
  vSatisfaction,
  vState,
  vTimer,
  vX,
  vY,
  tickCount,
} from '../state/visitorState';
import { bfsNextStep, bfsPath, findNearestWalkableTile, isWalkable, randomWalkStepLevel } from './navigation';
import { nextRand } from './rng';

function findNearestDirtyPath(sx: i32, sy: i32): i32 {
  let bestPacked: i32 = -1;
  let bestDist: i32 = 1 << 30;
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (unchecked(pukeData[y * MAP_W + x]) <= 0) continue;
      const d = bfsPath(sx, sy, x, y);
      if (d >= 0 && d < bestDist) {
        bestDist = d;
        bestPacked = x | (y << 16);
      }
    }
  }
  return bestPacked;
}

function choosePatrolTileNear(centerX: i32, centerY: i32, radius: i32): i32 {
  for (let attempt = 0; attempt < 36; attempt++) {
    const dx = (nextRand() % (radius * 2 + 1)) - radius;
    const dy = (nextRand() % (radius * 2 + 1)) - radius;
    const x = centerX + dx;
    const y = centerY + dy;
    if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) continue;
    const tile = unchecked(gridData[y * MAP_W + x]);
    if (isWalkable(tile) || tile == TILE_ENTRANCE) return x | (y << 16);
  }
  return -1;
}

function pickAreaPatrolTile(areaCount: i32, areaX: StaticArray<i32>, areaY: StaticArray<i32>, empIndex: i32): i32 {
  if (areaCount <= 0) return -1;
  const slot = nextRand() % areaCount;
  const off = empIndex * MAX_EMPLOYEE_AREAS + slot;
  const ax = unchecked(areaX[off]);
  const ay = unchecked(areaY[off]);
  return choosePatrolTileNear(ax, ay, EMPLOYEE_AREA_RADIUS);
}

function randomEmployeeWanderStep(cx: i32, cy: i32): i32 {
  const cl = <i32>unchecked(heightData[cy * MAP_W + cx]);
  const step = randomWalkStepLevel(cx, cy, cl);
  if (step < 0) return -1;
  return (step & 0x3FF) | (((step >> 10) & 0x3FF) << 16);
}

function stepTowardNearestWalkable(cx: i32, cy: i32): i32 {
  const packed = findNearestWalkableTile(cx, cy);
  if (packed < 0) return -1;
  const tx = packed & 0xFFFF;
  const ty = (packed >> 16) & 0xFFFF;
  let nx = cx;
  let ny = cy;
  if (abs(tx - cx) >= abs(ty - cy)) {
    if (tx > cx) nx++;
    else if (tx < cx) nx--;
    else if (ty > cy) ny++;
    else if (ty < cy) ny--;
  } else {
    if (ty > cy) ny++;
    else if (ty < cy) ny--;
    else if (tx > cx) nx++;
    else if (tx < cx) nx--;
  }
  if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) return -1;
  return nx | (ny << 16);
}

function findNearestDirtyPathForCleaner(cleanerIndex: i32, sx: i32, sy: i32): i32 {
  const areaCount = unchecked(cleanerAreaCount[cleanerIndex]);
  if (areaCount <= 0) return findNearestDirtyPath(sx, sy);

  let bestPacked: i32 = -1;
  let bestDist: i32 = 1 << 30;
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (unchecked(pukeData[y * MAP_W + x]) <= 0) continue;
      let inArea = false;
      for (let a = 0; a < areaCount; a++) {
        const off = cleanerIndex * MAX_EMPLOYEE_AREAS + a;
        const ax = unchecked(cleanerAreaX[off]);
        const ay = unchecked(cleanerAreaY[off]);
        if (abs(x - ax) + abs(y - ay) <= EMPLOYEE_AREA_RADIUS) {
          inArea = true;
          break;
        }
      }
      if (!inArea) continue;
      const d = bfsPath(sx, sy, x, y);
      if (d >= 0 && d < bestDist) {
        bestDist = d;
        bestPacked = x | (y << 16);
      }
    }
  }
  return bestPacked;
}

export function updateCleaners(): void {
  for (let c = 0; c < cleanerCount; c++) {
    if (unchecked(cleanerActive[c]) != 1) continue;

    const cx = unchecked(cleanerX[c]);
    const cy = unchecked(cleanerY[c]);
    const tile = unchecked(gridData[cy * MAP_W + cx]);
    if (!(isWalkable(tile) || tile == TILE_ENTRANCE)) {
      const step = stepTowardNearestWalkable(cx, cy);
      if (step >= 0) {
        unchecked(cleanerX[c] = step & 0xFFFF);
        unchecked(cleanerY[c] = (step >> 16) & 0xFFFF);
      }
      continue;
    }
    let tx = unchecked(cleanerTargetX[c]);
    let ty = unchecked(cleanerTargetY[c]);

    if (unchecked(cleanerCleanTimer[c]) > 0) {
      const t = unchecked(cleanerCleanTimer[c]) - 1;
      unchecked(cleanerCleanTimer[c] = t);
      if (t <= 0 && tx >= 0 && ty >= 0) {
        const cell = ty * MAP_W + tx;
        if (unchecked(pukeData[cell]) > 0) {
          unchecked(pukeData[cell] = unchecked(pukeData[cell]) - 1);
          unchecked(cleanerPathsCleaned[c] = unchecked(cleanerPathsCleaned[c]) + 1);
        }
      }
      continue;
    }

    if (tx < 0 || ty < 0 || unchecked(pukeData[ty * MAP_W + tx]) == 0) {
      const packed = findNearestDirtyPathForCleaner(c, cx, cy);
      if (packed < 0) {
        unchecked(cleanerTargetX[c] = -1);
        unchecked(cleanerTargetY[c] = -1);
        let px = unchecked(cleanerPatrolX[c]);
        let py = unchecked(cleanerPatrolY[c]);
        if (px < 0 || py < 0 || (px == cx && py == cy)) {
          const patrol = pickAreaPatrolTile(unchecked(cleanerAreaCount[c]), cleanerAreaX, cleanerAreaY, c);
          if (patrol >= 0) {
            px = patrol & 0xFFFF;
            py = (patrol >> 16) & 0xFFFF;
            unchecked(cleanerPatrolX[c] = px);
            unchecked(cleanerPatrolY[c] = py);
          }
        }

        if (px >= 0 && py >= 0) {
          const nextPatrol = bfsNextStep(cx, cy, px, py);
          if (nextPatrol >= 0) {
            unchecked(cleanerX[c] = nextPatrol & 0xFFFF);
            unchecked(cleanerY[c] = (nextPatrol >> 16) & 0xFFFF);
          } else {
            unchecked(cleanerPatrolX[c] = -1);
            unchecked(cleanerPatrolY[c] = -1);
          }
          continue;
        }

        const wander = randomEmployeeWanderStep(cx, cy);
        if (wander >= 0) {
          unchecked(cleanerX[c] = wander & 0xFFFF);
          unchecked(cleanerY[c] = (wander >> 16) & 0xFFFF);
        }
        continue;
      }
      tx = packed & 0xFFFF;
      ty = (packed >> 16) & 0xFFFF;
      unchecked(cleanerTargetX[c] = tx);
      unchecked(cleanerTargetY[c] = ty);
    }

    if (cx == tx && cy == ty) {
      unchecked(cleanerCleanTimer[c] = 16);
      continue;
    }

    const nextPacked = bfsNextStep(cx, cy, tx, ty);
    if (nextPacked >= 0) {
      unchecked(cleanerX[c] = nextPacked & 0xFFFF);
      unchecked(cleanerY[c] = (nextPacked >> 16) & 0xFFFF);
    } else {
      unchecked(cleanerTargetX[c] = -1);
      unchecked(cleanerTargetY[c] = -1);
    }
  }
}

function instFootprintW(instIdx: i32): i32 {
  const tid = unchecked(instTemplateId[instIdx]);
  const rot = unchecked(instRotation[instIdx]);
  if (rot == 90 || rot == 270) return unchecked(tmplFootprintH[tid]);
  return unchecked(tmplFootprintW[tid]);
}

function instFootprintH(instIdx: i32): i32 {
  const tid = unchecked(instTemplateId[instIdx]);
  const rot = unchecked(instRotation[instIdx]);
  if (rot == 90 || rot == 270) return unchecked(tmplFootprintW[tid]);
  return unchecked(tmplFootprintH[tid]);
}

export function findAdjacentPath(instIdx: i32): i32 {
  const ax = unchecked(instX[instIdx]);
  const ay = unchecked(instY[instIdx]);
  const fw = instFootprintW(instIdx);
  const fh = instFootprintH(instIdx);

  for (let dx: i32 = -1; dx <= fw; dx++) {
    for (let dy: i32 = -1; dy <= fh; dy++) {
      if (dx >= 0 && dx < fw && dy >= 0 && dy < fh) continue;
      const nx = ax + dx;
      const ny = ay + dy;
      if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue;
      if (unchecked(gridData[ny * MAP_W + nx]) == TILE_PATH_QUEUE) return nx | (ny << 16);
    }
  }

  for (let dx: i32 = -1; dx <= fw; dx++) {
    for (let dy: i32 = -1; dy <= fh; dy++) {
      if (dx >= 0 && dx < fw && dy >= 0 && dy < fh) continue;
      const nx = ax + dx;
      const ny = ay + dy;
      if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H) continue;
      if (isWalkable(unchecked(gridData[ny * MAP_W + nx]))) return nx | (ny << 16);
    }
  }
  return -1;
}

export function calcRepairTicks(instIdx: i32): i32 {
  const tid = unchecked(instTemplateId[instIdx]);
  const ageMonths = max(0, (tickCount - unchecked(instBuildTick[instIdx])) / TICKS_PER_MONTH);
  const buildPrice = unchecked(tmplBuildPrice[tid]);
  return 30 + buildPrice / 25 + ageMonths * 3;
}

function ensureMechanicTargets(): void {
  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) != 1 || unchecked(instBroken[i]) != 1) continue;
    let assigned = false;
    for (let m = 0; m < mechanicCount; m++) {
      if (unchecked(mechActive[m]) == 1 && unchecked(mechTarget[m]) == i) {
        assigned = true;
        break;
      }
    }
    if (assigned) continue;
    for (let m = 0; m < mechanicCount; m++) {
      if (unchecked(mechActive[m]) == 1 && unchecked(mechTarget[m]) < 0) {
        unchecked(mechTarget[m] = i);
        break;
      }
    }
  }
}

export function updateMechanics(): void {
  ensureMechanicTargets();
  for (let m = 0; m < mechanicCount; m++) {
    if (unchecked(mechActive[m]) != 1) continue;
    const mx = unchecked(mechX[m]);
    const my = unchecked(mechY[m]);
    const tile = unchecked(gridData[my * MAP_W + mx]);
    if (!(isWalkable(tile) || tile == TILE_ENTRANCE)) {
      const step = stepTowardNearestWalkable(mx, my);
      if (step >= 0) {
        unchecked(mechX[m] = step & 0xFFFF);
        unchecked(mechY[m] = (step >> 16) & 0xFFFF);
      }
      continue;
    }
    const target = unchecked(mechTarget[m]);
    if (target < 0 || target >= instanceCount || unchecked(instActive[target]) != 1 || unchecked(instBroken[target]) != 1) {
      unchecked(mechTarget[m] = -1);
      unchecked(mechRepairTimer[m] = 0);
      const cx = unchecked(mechX[m]);
      const cy = unchecked(mechY[m]);
      let px = unchecked(mechPatrolX[m]);
      let py = unchecked(mechPatrolY[m]);
      if (px < 0 || py < 0 || (px == cx && py == cy)) {
        const patrol = pickAreaPatrolTile(unchecked(mechAreaCount[m]), mechAreaX, mechAreaY, m);
        if (patrol >= 0) {
          px = patrol & 0xFFFF;
          py = (patrol >> 16) & 0xFFFF;
          unchecked(mechPatrolX[m] = px);
          unchecked(mechPatrolY[m] = py);
        }
      }
      if (px >= 0 && py >= 0) {
        const nextPatrol = bfsNextStep(cx, cy, px, py);
        if (nextPatrol >= 0) {
          unchecked(mechX[m] = nextPatrol & 0xFFFF);
          unchecked(mechY[m] = (nextPatrol >> 16) & 0xFFFF);
        } else {
          unchecked(mechPatrolX[m] = -1);
          unchecked(mechPatrolY[m] = -1);
        }
      } else {
        const wander = randomEmployeeWanderStep(cx, cy);
        if (wander >= 0) {
          unchecked(mechX[m] = wander & 0xFFFF);
          unchecked(mechY[m] = (wander >> 16) & 0xFFFF);
        }
      }
      continue;
    }

    if (unchecked(mechRepairTimer[m]) > 0) {
      const rt = unchecked(mechRepairTimer[m]) - 1;
      unchecked(mechRepairTimer[m] = rt);
      unchecked(instRepairTicks[target] = rt);
      if (rt <= 0) {
        unchecked(instBroken[target] = 0);
        unchecked(instRepairTicks[target] = 0);
        unchecked(mechTarget[m] = -1);
        unchecked(mechRepairsCompleted[m] = unchecked(mechRepairsCompleted[m]) + 1);
      }
      continue;
    }

    const adj = findAdjacentPath(target);
    if (adj < 0) continue;
    const tx = adj & 0xFFFF;
    const ty = (adj >> 16) & 0xFFFF;
    const cx = unchecked(mechX[m]);
    const cy = unchecked(mechY[m]);
    if (cx == tx && cy == ty) {
      const repairTicks = calcRepairTicks(target);
      unchecked(mechRepairTimer[m] = repairTicks);
      unchecked(instRepairTicks[target] = repairTicks);
      continue;
    }
    const nextPacked = bfsNextStep(cx, cy, tx, ty);
    if (nextPacked >= 0) {
      unchecked(mechX[m] = nextPacked & 0xFFFF);
      unchecked(mechY[m] = (nextPacked >> 16) & 0xFFFF);
    }
  }
}

export function hasSecurityNearby(x: i32, y: i32, radius: i32): bool {
  for (let s = 0; s < securityCount; s++) {
    if (unchecked(securityActive[s]) != 1) continue;
    const d = abs(unchecked(securityX[s]) - x) + abs(unchecked(securityY[s]) - y);
    if (d <= radius) return true;
  }
  return false;
}

function choosePatrolTile(securityIndex: i32): i32 {
  const areaCount = unchecked(securityAreaCount[securityIndex]);
  if (areaCount > 0) {
    const patrol = pickAreaPatrolTile(areaCount, securityAreaX, securityAreaY, securityIndex);
    if (patrol >= 0) return patrol;
  }
  for (let attempt = 0; attempt < 30; attempt++) {
    const x = nextRand() % MAP_W;
    const y = nextRand() % MAP_H;
    if (isWalkable(unchecked(gridData[y * MAP_W + x]))) return x | (y << 16);
  }
  return -1;
}

export function updateSecurity(): void {
  for (let s = 0; s < securityCount; s++) {
    if (unchecked(securityActive[s]) != 1) continue;
    const sx = unchecked(securityX[s]);
    const sy = unchecked(securityY[s]);
    const tile = unchecked(gridData[sy * MAP_W + sx]);
    if (!(isWalkable(tile) || tile == TILE_ENTRANCE)) {
      const step = stepTowardNearestWalkable(sx, sy);
      if (step >= 0) {
        unchecked(securityX[s] = step & 0xFFFF);
        unchecked(securityY[s] = (step >> 16) & 0xFFFF);
      }
      continue;
    }
    let target = unchecked(securityTargetVisitor[s]);

    if (target >= 0) {
      if (unchecked(vState[target]) == VS_INACTIVE || unchecked(vCriminal[target]) == 0) {
        target = -1;
        unchecked(securityTargetVisitor[s] = -1);
      }
    }

    if (target < 0) {
      let best = -1;
      let bestDist = 1 << 30;
      for (let i = 0; i < MAX_VISITORS; i++) {
        if (unchecked(vState[i]) == VS_INACTIVE) continue;
        if (unchecked(vCriminal[i]) == 0) continue;
        const d = abs(unchecked(vX[i]) - sx) + abs(unchecked(vY[i]) - sy);
        if (d > SECURITY_DETECTION_RADIUS) continue;
        if (d < bestDist) {
          best = i;
          bestDist = d;
        }
      }
      target = best;
      unchecked(securityTargetVisitor[s] = target);
    }

    if (target >= 0) {
      const tx = unchecked(vX[target]);
      const ty = unchecked(vY[target]);
      if (abs(tx - sx) + abs(ty - sy) <= 1) {
        unchecked(vCriminal[target] = 0);
        unchecked(vCrimeTimer[target] = 0);
        unchecked(vState[target] = VS_LEAVING);
        unchecked(vTimer[target] = 28);
        unchecked(securityTargetVisitor[s] = -1);
        unchecked(securityIncidentsHandled[s] = unchecked(securityIncidentsHandled[s]) + 1);
        continue;
      }
      const nextPacked = bfsNextStep(sx, sy, tx, ty);
      if (nextPacked >= 0) {
        unchecked(securityX[s] = nextPacked & 0xFFFF);
        unchecked(securityY[s] = (nextPacked >> 16) & 0xFFFF);
      } else {
        unchecked(securityTargetVisitor[s] = -1);
      }
      continue;
    }

    let px = unchecked(securityPatrolX[s]);
    let py = unchecked(securityPatrolY[s]);
    if (px < 0 || py < 0 || (px == sx && py == sy)) {
      const patrol = choosePatrolTile(s);
      if (patrol >= 0) {
        px = patrol & 0xFFFF;
        py = (patrol >> 16) & 0xFFFF;
        unchecked(securityPatrolX[s] = px);
        unchecked(securityPatrolY[s] = py);
      } else {
        px = -1;
        py = -1;
        unchecked(securityPatrolX[s] = -1);
        unchecked(securityPatrolY[s] = -1);
      }
    }
    if (px >= 0 && py >= 0) {
      const nextPatrol = bfsNextStep(sx, sy, px, py);
      if (nextPatrol >= 0) {
        unchecked(securityX[s] = nextPatrol & 0xFFFF);
        unchecked(securityY[s] = (nextPatrol >> 16) & 0xFFFF);
        continue;
      }
    }

    const wander = randomEmployeeWanderStep(sx, sy);
    if (wander >= 0) {
      unchecked(securityX[s] = wander & 0xFFFF);
      unchecked(securityY[s] = (wander >> 16) & 0xFFFF);
    } else {
      unchecked(securityPatrolX[s] = -1);
      unchecked(securityPatrolY[s] = -1);
    }
  }
}

function chooseEntertainerPatrolTile(entertainerIndex: i32): i32 {
  const areaCount = unchecked(entertainerAreaCount[entertainerIndex]);
  if (areaCount > 0) {
    const patrol = pickAreaPatrolTile(areaCount, entertainerAreaX, entertainerAreaY, entertainerIndex);
    if (patrol >= 0) return patrol;
  }
  for (let attempt = 0; attempt < 30; attempt++) {
    const x = nextRand() % MAP_W;
    const y = nextRand() % MAP_H;
    if (isWalkable(unchecked(gridData[y * MAP_W + x]))) return x | (y << 16);
  }
  return -1;
}

export function updateEntertainers(): void {
  const shouldCheer = tickCount % 12 == 0;
  for (let e = 0; e < entertainerCount; e++) {
    if (unchecked(entertainerActive[e]) != 1) continue;
    const ex = unchecked(entertainerX[e]);
    const ey = unchecked(entertainerY[e]);
    const tile = unchecked(gridData[ey * MAP_W + ex]);
    if (!(isWalkable(tile) || tile == TILE_ENTRANCE)) {
      const step = stepTowardNearestWalkable(ex, ey);
      if (step >= 0) {
        unchecked(entertainerX[e] = step & 0xFFFF);
        unchecked(entertainerY[e] = (step >> 16) & 0xFFFF);
      }
      continue;
    }

    let px = unchecked(entertainerPatrolX[e]);
    let py = unchecked(entertainerPatrolY[e]);
    if (px < 0 || py < 0 || (px == ex && py == ey)) {
      const patrol = chooseEntertainerPatrolTile(e);
      if (patrol >= 0) {
        px = patrol & 0xFFFF;
        py = (patrol >> 16) & 0xFFFF;
        unchecked(entertainerPatrolX[e] = px);
        unchecked(entertainerPatrolY[e] = py);
      } else {
        unchecked(entertainerPatrolX[e] = -1);
        unchecked(entertainerPatrolY[e] = -1);
      }
    }

    if (px >= 0 && py >= 0) {
      const nextPatrol = bfsNextStep(ex, ey, px, py);
      if (nextPatrol >= 0) {
        unchecked(entertainerX[e] = nextPatrol & 0xFFFF);
        unchecked(entertainerY[e] = (nextPatrol >> 16) & 0xFFFF);
      } else {
        unchecked(entertainerPatrolX[e] = -1);
        unchecked(entertainerPatrolY[e] = -1);
      }
    }

    if (!shouldCheer) continue;
    const cx = unchecked(entertainerX[e]);
    const cy = unchecked(entertainerY[e]);
    let cheered = 0;
    for (let i = 0; i < MAX_VISITORS; i++) {
      if (unchecked(vState[i]) == VS_INACTIVE) continue;
      if (unchecked(vState[i]) == VS_LEAVING) continue;
      const d = abs(unchecked(vX[i]) - cx) + abs(unchecked(vY[i]) - cy);
      if (d > 2) continue;
      unchecked(vSatisfaction[i] = min(100, unchecked(vSatisfaction[i]) + 1));
      cheered++;
    }
    if (cheered > 0) {
      unchecked(entertainerGuestsCheered[e] = unchecked(entertainerGuestsCheered[e]) + cheered);
    }
  }
}

