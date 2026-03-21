import {
  MAP_H,
  MAP_W,
  MAX_VISITORS,
  VS_INACTIVE,
} from '../constants';
import {
  cleanerActive,
  cleanerAreaCount,
  cleanerAreaX,
  cleanerAreaY,
  cleanerCleanTimer,
  cleanerCount,
  cleanerHiredTick,
  cleanerPathsCleaned,
  cleanerPatrolX,
  cleanerPatrolY,
  cleanerTargetX,
  cleanerTargetY,
  cleanerUid,
  cleanerX,
  cleanerY,
  CLEANER_HIRE_COST,
  CLEANER_MONTHLY_COST,
  entertainerActive,
  entertainerAreaCount,
  entertainerAreaX,
  entertainerAreaY,
  entertainerCount,
  entertainerGuestsCheered,
  entertainerHiredTick,
  entertainerPatrolX,
  entertainerPatrolY,
  ENTERTAINER_HIRE_COST,
  ENTERTAINER_MONTHLY_COST,
  MAX_ENTERTAINERS,
  entertainerUid,
  entertainerX,
  entertainerY,
  EMPLOYEE_AREA_RADIUS,
  MAX_CLEANERS,
  MAX_EMPLOYEE_AREAS,
  MAX_MECHANICS,
  MAX_SECURITY,
  MECHANIC_HIRE_COST,
  MECHANIC_MONTHLY_COST,
  mechActive,
  mechAreaCount,
  mechAreaX,
  mechAreaY,
  mechanicCount,
  mechHiredTick,
  mechPatrolX,
  mechPatrolY,
  mechRepairTimer,
  mechRepairsCompleted,
  mechTarget,
  mechUid,
  mechX,
  mechY,
  nextEmployeeUid,
  SECURITY_HIRE_COST,
  SECURITY_MONTHLY_COST,
  securityActive,
  securityAreaCount,
  securityAreaX,
  securityAreaY,
  securityCount,
  securityHiredTick,
  securityIncidentsHandled,
  securityPatrolX,
  securityPatrolY,
  securityTargetVisitor,
  securityUid,
  securityX,
  securityY,
} from '../state/employeeState';
import {
  budget,
  criminalRatePerThousand,
  entranceTicket,
  parkAttractiveness,
  theftCount,
  totalExpense,
  totalIncome,
  vandalismCount,
} from '../state/parkState';
import {
  instActive,
  instTemplateId,
  tmplMonthlyCost,
  instanceCount,
} from '../state/attractionState';
import { gridData } from '../state/gridState';
import { vSatisfaction, vState, tickCount } from '../state/visitorState';
import { spend } from '../economy/economy';
import { isWalkable } from '../behavior/navigation';
import { entranceX, entranceY } from '../grid/gridOps';

// ============== PARK / ECONOMY GETTERS ==============

export function getBudget(): i32 { return budget; }
export function setBudget(b: i32): void { budget = b; }
export function getEntranceTicket(): i32 { return entranceTicket; }
export function setEntranceTicket(p: i32): void { entranceTicket = max(0, p); }
export function getTotalIncome(): i32 { return totalIncome; }
export function getTotalExpense(): i32 { return totalExpense; }
export function getParkAttractiveness(): i32 { return parkAttractiveness; }
export function getCriminalRate(): i32 { return criminalRatePerThousand; }
export function getTheftCount(): i32 { return theftCount; }
export function getVandalismCount(): i32 { return vandalismCount; }

// ============== EMPLOYEE GETTERS ==============

export function getMechanicCount(): i32 { return mechanicCount; }
export function getCleanerCount(): i32 { return cleanerCount; }
export function getSecurityCount(): i32 { return securityCount; }
export function getEntertainerCount(): i32 { return entertainerCount; }

export function getMechanicX(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechX[i]) : -1; }
export function getMechanicY(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechY[i]) : -1; }
export function getMechanicTarget(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechTarget[i]) : -1; }
export function getMechanicRepairTimer(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechRepairTimer[i]) : 0; }
export function getMechanicUid(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechUid[i]) : -1; }
export function getMechanicHiredTick(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechHiredTick[i]) : 0; }
export function getMechanicRepairsCompleted(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechRepairsCompleted[i]) : 0; }
export function getMechanicAreaCount(i: i32): i32 { return i >= 0 && i < MAX_MECHANICS ? unchecked(mechAreaCount[i]) : 0; }
export function getMechanicAreaX(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_MECHANICS || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(mechAreaX[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}
export function getMechanicAreaY(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_MECHANICS || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(mechAreaY[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}

export function getCleanerX(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerX[i]) : -1; }
export function getCleanerY(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerY[i]) : -1; }
export function getCleanerTargetX(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerTargetX[i]) : -1; }
export function getCleanerTargetY(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerTargetY[i]) : -1; }
export function getCleanerCleanTimer(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerCleanTimer[i]) : 0; }
export function getCleanerUid(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerUid[i]) : -1; }
export function getCleanerHiredTick(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerHiredTick[i]) : 0; }
export function getCleanerPathsCleaned(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerPathsCleaned[i]) : 0; }
export function getCleanerAreaCount(i: i32): i32 { return i >= 0 && i < MAX_CLEANERS ? unchecked(cleanerAreaCount[i]) : 0; }
export function getCleanerAreaX(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_CLEANERS || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(cleanerAreaX[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}
export function getCleanerAreaY(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_CLEANERS || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(cleanerAreaY[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}

export function getSecurityX(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityX[i]) : -1; }
export function getSecurityY(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityY[i]) : -1; }
export function getSecurityTargetVisitor(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityTargetVisitor[i]) : -1; }
export function getSecurityUid(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityUid[i]) : -1; }
export function getSecurityHiredTick(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityHiredTick[i]) : 0; }
export function getSecurityIncidentsHandled(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityIncidentsHandled[i]) : 0; }
export function getSecurityAreaCount(i: i32): i32 { return i >= 0 && i < MAX_SECURITY ? unchecked(securityAreaCount[i]) : 0; }
export function getSecurityAreaX(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_SECURITY || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(securityAreaX[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}
export function getSecurityAreaY(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_SECURITY || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(securityAreaY[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}

export function getEntertainerX(i: i32): i32 { return i >= 0 && i < MAX_ENTERTAINERS ? unchecked(entertainerX[i]) : -1; }
export function getEntertainerY(i: i32): i32 { return i >= 0 && i < MAX_ENTERTAINERS ? unchecked(entertainerY[i]) : -1; }
export function getEntertainerUid(i: i32): i32 { return i >= 0 && i < MAX_ENTERTAINERS ? unchecked(entertainerUid[i]) : -1; }
export function getEntertainerHiredTick(i: i32): i32 { return i >= 0 && i < MAX_ENTERTAINERS ? unchecked(entertainerHiredTick[i]) : 0; }
export function getEntertainerGuestsCheered(i: i32): i32 { return i >= 0 && i < MAX_ENTERTAINERS ? unchecked(entertainerGuestsCheered[i]) : 0; }
export function getEntertainerAreaCount(i: i32): i32 { return i >= 0 && i < MAX_ENTERTAINERS ? unchecked(entertainerAreaCount[i]) : 0; }
export function getEntertainerAreaX(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_ENTERTAINERS || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(entertainerAreaX[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}
export function getEntertainerAreaY(i: i32, areaIndex: i32): i32 {
  if (i < 0 || i >= MAX_ENTERTAINERS || areaIndex < 0 || areaIndex >= MAX_EMPLOYEE_AREAS) return -1;
  return unchecked(entertainerAreaY[i * MAX_EMPLOYEE_AREAS + areaIndex]);
}

// ============== EMPLOYEE AREA MANAGEMENT ==============

function canAssignEmployeeArea(x: i32, y: i32): bool {
  if (x < 0 || x >= MAP_W || y < 0 || y >= MAP_H) return false;
  const tile = unchecked(gridData[y * MAP_W + x]);
  return isWalkable(tile) || tile == 2; // TILE_ENTRANCE == 2
}

function addEmployeeArea(areaCount: StaticArray<i32>, areaX: StaticArray<i32>, areaY: StaticArray<i32>, index: i32, x: i32, y: i32): i32 {
  if (!canAssignEmployeeArea(x, y)) return 0;
  if (index < 0) return 0;
  let count = unchecked(areaCount[index]);
  for (let i = 0; i < count; i++) {
    const off = index * MAX_EMPLOYEE_AREAS + i;
    if (unchecked(areaX[off]) == x && unchecked(areaY[off]) == y) return 1;
  }
  if (count < MAX_EMPLOYEE_AREAS) {
    const off = index * MAX_EMPLOYEE_AREAS + count;
    unchecked(areaX[off] = x);
    unchecked(areaY[off] = y);
    unchecked(areaCount[index] = count + 1);
    return 1;
  }
  for (let i = 1; i < MAX_EMPLOYEE_AREAS; i++) {
    const prev = index * MAX_EMPLOYEE_AREAS + (i - 1);
    const cur = index * MAX_EMPLOYEE_AREAS + i;
    unchecked(areaX[prev] = unchecked(areaX[cur]));
    unchecked(areaY[prev] = unchecked(areaY[cur]));
  }
  const last = index * MAX_EMPLOYEE_AREAS + (MAX_EMPLOYEE_AREAS - 1);
  unchecked(areaX[last] = x);
  unchecked(areaY[last] = y);
  return 1;
}

function clearEmployeeAreas(areaCount: StaticArray<i32>, areaX: StaticArray<i32>, areaY: StaticArray<i32>, index: i32): i32 {
  if (index < 0) return 0;
  unchecked(areaCount[index] = 0);
  for (let i = 0; i < MAX_EMPLOYEE_AREAS; i++) {
    const off = index * MAX_EMPLOYEE_AREAS + i;
    unchecked(areaX[off] = -1);
    unchecked(areaY[off] = -1);
  }
  return 1;
}

export function setMechanicArea(i: i32, x: i32, y: i32): i32 {
  if (i < 0 || i >= mechanicCount || unchecked(mechActive[i]) != 1) return 0;
  return addEmployeeArea(mechAreaCount, mechAreaX, mechAreaY, i, x, y);
}

export function clearMechanicAreas(i: i32): i32 {
  if (i < 0 || i >= mechanicCount || unchecked(mechActive[i]) != 1) return 0;
  unchecked(mechPatrolX[i] = -1);
  unchecked(mechPatrolY[i] = -1);
  return clearEmployeeAreas(mechAreaCount, mechAreaX, mechAreaY, i);
}

export function setCleanerArea(i: i32, x: i32, y: i32): i32 {
  if (i < 0 || i >= cleanerCount || unchecked(cleanerActive[i]) != 1) return 0;
  return addEmployeeArea(cleanerAreaCount, cleanerAreaX, cleanerAreaY, i, x, y);
}

export function clearCleanerAreas(i: i32): i32 {
  if (i < 0 || i >= cleanerCount || unchecked(cleanerActive[i]) != 1) return 0;
  unchecked(cleanerPatrolX[i] = -1);
  unchecked(cleanerPatrolY[i] = -1);
  return clearEmployeeAreas(cleanerAreaCount, cleanerAreaX, cleanerAreaY, i);
}

export function setSecurityArea(i: i32, x: i32, y: i32): i32 {
  if (i < 0 || i >= securityCount || unchecked(securityActive[i]) != 1) return 0;
  return addEmployeeArea(securityAreaCount, securityAreaX, securityAreaY, i, x, y);
}

export function clearSecurityAreas(i: i32): i32 {
  if (i < 0 || i >= securityCount || unchecked(securityActive[i]) != 1) return 0;
  unchecked(securityPatrolX[i] = -1);
  unchecked(securityPatrolY[i] = -1);
  return clearEmployeeAreas(securityAreaCount, securityAreaX, securityAreaY, i);
}

export function setEntertainerArea(i: i32, x: i32, y: i32): i32 {
  if (i < 0 || i >= entertainerCount || unchecked(entertainerActive[i]) != 1) return 0;
  return addEmployeeArea(entertainerAreaCount, entertainerAreaX, entertainerAreaY, i, x, y);
}

export function clearEntertainerAreas(i: i32): i32 {
  if (i < 0 || i >= entertainerCount || unchecked(entertainerActive[i]) != 1) return 0;
  unchecked(entertainerPatrolX[i] = -1);
  unchecked(entertainerPatrolY[i] = -1);
  return clearEmployeeAreas(entertainerAreaCount, entertainerAreaX, entertainerAreaY, i);
}

// ============== HIRE / FIRE ==============

export function hireMechanic(): i32 {
  if (mechanicCount >= MAX_MECHANICS) return 0;
  if (!spend(MECHANIC_HIRE_COST)) return 0;
  const idx = mechanicCount;
  mechanicCount++;
  unchecked(mechActive[idx] = 1);
  unchecked(mechX[idx] = entranceX());
  unchecked(mechY[idx] = entranceY());
  unchecked(mechTarget[idx] = -1);
  unchecked(mechRepairTimer[idx] = 0);
  unchecked(mechUid[idx] = nextEmployeeUid++);
  unchecked(mechHiredTick[idx] = tickCount);
  unchecked(mechRepairsCompleted[idx] = 0);
  unchecked(mechPatrolX[idx] = -1);
  unchecked(mechPatrolY[idx] = -1);
  unchecked(mechAreaCount[idx] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = idx * MAX_EMPLOYEE_AREAS + a;
    unchecked(mechAreaX[off] = -1);
    unchecked(mechAreaY[off] = -1);
  }
  return 1;
}

export function hireCleaner(): i32 {
  if (cleanerCount >= MAX_CLEANERS) return 0;
  if (!spend(CLEANER_HIRE_COST)) return 0;
  const idx = cleanerCount;
  cleanerCount++;
  unchecked(cleanerActive[idx] = 1);
  unchecked(cleanerX[idx] = entranceX());
  unchecked(cleanerY[idx] = entranceY());
  unchecked(cleanerTargetX[idx] = -1);
  unchecked(cleanerTargetY[idx] = -1);
  unchecked(cleanerCleanTimer[idx] = 0);
  unchecked(cleanerUid[idx] = nextEmployeeUid++);
  unchecked(cleanerHiredTick[idx] = tickCount);
  unchecked(cleanerPathsCleaned[idx] = 0);
  unchecked(cleanerPatrolX[idx] = -1);
  unchecked(cleanerPatrolY[idx] = -1);
  unchecked(cleanerAreaCount[idx] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = idx * MAX_EMPLOYEE_AREAS + a;
    unchecked(cleanerAreaX[off] = -1);
    unchecked(cleanerAreaY[off] = -1);
  }
  return 1;
}

export function hireSecurity(): i32 {
  if (securityCount >= MAX_SECURITY) return 0;
  if (!spend(SECURITY_HIRE_COST)) return 0;
  const idx = securityCount;
  securityCount++;
  unchecked(securityActive[idx] = 1);
  unchecked(securityX[idx] = entranceX());
  unchecked(securityY[idx] = entranceY());
  unchecked(securityTargetVisitor[idx] = -1);
  unchecked(securityPatrolX[idx] = -1);
  unchecked(securityPatrolY[idx] = -1);
  unchecked(securityUid[idx] = nextEmployeeUid++);
  unchecked(securityHiredTick[idx] = tickCount);
  unchecked(securityIncidentsHandled[idx] = 0);
  unchecked(securityAreaCount[idx] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = idx * MAX_EMPLOYEE_AREAS + a;
    unchecked(securityAreaX[off] = -1);
    unchecked(securityAreaY[off] = -1);
  }
  return 1;
}

export function hireEntertainer(): i32 {
  if (entertainerCount >= MAX_ENTERTAINERS) return 0;
  if (!spend(ENTERTAINER_HIRE_COST)) return 0;
  const idx = entertainerCount;
  entertainerCount++;
  unchecked(entertainerActive[idx] = 1);
  unchecked(entertainerX[idx] = entranceX());
  unchecked(entertainerY[idx] = entranceY());
  unchecked(entertainerPatrolX[idx] = -1);
  unchecked(entertainerPatrolY[idx] = -1);
  unchecked(entertainerUid[idx] = nextEmployeeUid++);
  unchecked(entertainerHiredTick[idx] = tickCount);
  unchecked(entertainerGuestsCheered[idx] = 0);
  unchecked(entertainerAreaCount[idx] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = idx * MAX_EMPLOYEE_AREAS + a;
    unchecked(entertainerAreaX[off] = -1);
    unchecked(entertainerAreaY[off] = -1);
  }
  return 1;
}

export function fireMechanic(index: i32): i32 {
  if (index < 0 || index >= mechanicCount) return 0;
  for (let i = index; i < mechanicCount - 1; i++) {
    unchecked(mechActive[i] = unchecked(mechActive[i + 1]));
    unchecked(mechX[i] = unchecked(mechX[i + 1]));
    unchecked(mechY[i] = unchecked(mechY[i + 1]));
    unchecked(mechTarget[i] = unchecked(mechTarget[i + 1]));
    unchecked(mechRepairTimer[i] = unchecked(mechRepairTimer[i + 1]));
    unchecked(mechUid[i] = unchecked(mechUid[i + 1]));
    unchecked(mechHiredTick[i] = unchecked(mechHiredTick[i + 1]));
    unchecked(mechRepairsCompleted[i] = unchecked(mechRepairsCompleted[i + 1]));
    unchecked(mechPatrolX[i] = unchecked(mechPatrolX[i + 1]));
    unchecked(mechPatrolY[i] = unchecked(mechPatrolY[i + 1]));
    unchecked(mechAreaCount[i] = unchecked(mechAreaCount[i + 1]));
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const dst = i * MAX_EMPLOYEE_AREAS + a;
      const src = (i + 1) * MAX_EMPLOYEE_AREAS + a;
      unchecked(mechAreaX[dst] = unchecked(mechAreaX[src]));
      unchecked(mechAreaY[dst] = unchecked(mechAreaY[src]));
    }
  }
  const last = mechanicCount - 1;
  unchecked(mechActive[last] = 0);
  unchecked(mechTarget[last] = -1);
  unchecked(mechRepairTimer[last] = 0);
  unchecked(mechPatrolX[last] = -1);
  unchecked(mechPatrolY[last] = -1);
  unchecked(mechAreaCount[last] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = last * MAX_EMPLOYEE_AREAS + a;
    unchecked(mechAreaX[off] = -1);
    unchecked(mechAreaY[off] = -1);
  }
  mechanicCount--;
  return 1;
}

export function fireCleaner(index: i32): i32 {
  if (index < 0 || index >= cleanerCount) return 0;
  for (let i = index; i < cleanerCount - 1; i++) {
    unchecked(cleanerActive[i] = unchecked(cleanerActive[i + 1]));
    unchecked(cleanerX[i] = unchecked(cleanerX[i + 1]));
    unchecked(cleanerY[i] = unchecked(cleanerY[i + 1]));
    unchecked(cleanerTargetX[i] = unchecked(cleanerTargetX[i + 1]));
    unchecked(cleanerTargetY[i] = unchecked(cleanerTargetY[i + 1]));
    unchecked(cleanerCleanTimer[i] = unchecked(cleanerCleanTimer[i + 1]));
    unchecked(cleanerUid[i] = unchecked(cleanerUid[i + 1]));
    unchecked(cleanerHiredTick[i] = unchecked(cleanerHiredTick[i + 1]));
    unchecked(cleanerPathsCleaned[i] = unchecked(cleanerPathsCleaned[i + 1]));
    unchecked(cleanerPatrolX[i] = unchecked(cleanerPatrolX[i + 1]));
    unchecked(cleanerPatrolY[i] = unchecked(cleanerPatrolY[i + 1]));
    unchecked(cleanerAreaCount[i] = unchecked(cleanerAreaCount[i + 1]));
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const dst = i * MAX_EMPLOYEE_AREAS + a;
      const src = (i + 1) * MAX_EMPLOYEE_AREAS + a;
      unchecked(cleanerAreaX[dst] = unchecked(cleanerAreaX[src]));
      unchecked(cleanerAreaY[dst] = unchecked(cleanerAreaY[src]));
    }
  }
  const last = cleanerCount - 1;
  unchecked(cleanerActive[last] = 0);
  unchecked(cleanerTargetX[last] = -1);
  unchecked(cleanerTargetY[last] = -1);
  unchecked(cleanerCleanTimer[last] = 0);
  unchecked(cleanerPatrolX[last] = -1);
  unchecked(cleanerPatrolY[last] = -1);
  unchecked(cleanerAreaCount[last] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = last * MAX_EMPLOYEE_AREAS + a;
    unchecked(cleanerAreaX[off] = -1);
    unchecked(cleanerAreaY[off] = -1);
  }
  cleanerCount--;
  return 1;
}

export function fireSecurity(index: i32): i32 {
  if (index < 0 || index >= securityCount) return 0;
  for (let i = index; i < securityCount - 1; i++) {
    unchecked(securityActive[i] = unchecked(securityActive[i + 1]));
    unchecked(securityX[i] = unchecked(securityX[i + 1]));
    unchecked(securityY[i] = unchecked(securityY[i + 1]));
    unchecked(securityTargetVisitor[i] = unchecked(securityTargetVisitor[i + 1]));
    unchecked(securityPatrolX[i] = unchecked(securityPatrolX[i + 1]));
    unchecked(securityPatrolY[i] = unchecked(securityPatrolY[i + 1]));
    unchecked(securityUid[i] = unchecked(securityUid[i + 1]));
    unchecked(securityHiredTick[i] = unchecked(securityHiredTick[i + 1]));
    unchecked(securityIncidentsHandled[i] = unchecked(securityIncidentsHandled[i + 1]));
    unchecked(securityAreaCount[i] = unchecked(securityAreaCount[i + 1]));
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const dst = i * MAX_EMPLOYEE_AREAS + a;
      const src = (i + 1) * MAX_EMPLOYEE_AREAS + a;
      unchecked(securityAreaX[dst] = unchecked(securityAreaX[src]));
      unchecked(securityAreaY[dst] = unchecked(securityAreaY[src]));
    }
  }
  const last = securityCount - 1;
  unchecked(securityActive[last] = 0);
  unchecked(securityTargetVisitor[last] = -1);
  unchecked(securityPatrolX[last] = -1);
  unchecked(securityPatrolY[last] = -1);
  unchecked(securityAreaCount[last] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = last * MAX_EMPLOYEE_AREAS + a;
    unchecked(securityAreaX[off] = -1);
    unchecked(securityAreaY[off] = -1);
  }
  securityCount--;
  return 1;
}

export function fireEntertainer(index: i32): i32 {
  if (index < 0 || index >= entertainerCount) return 0;
  for (let i = index; i < entertainerCount - 1; i++) {
    unchecked(entertainerActive[i] = unchecked(entertainerActive[i + 1]));
    unchecked(entertainerX[i] = unchecked(entertainerX[i + 1]));
    unchecked(entertainerY[i] = unchecked(entertainerY[i + 1]));
    unchecked(entertainerPatrolX[i] = unchecked(entertainerPatrolX[i + 1]));
    unchecked(entertainerPatrolY[i] = unchecked(entertainerPatrolY[i + 1]));
    unchecked(entertainerUid[i] = unchecked(entertainerUid[i + 1]));
    unchecked(entertainerHiredTick[i] = unchecked(entertainerHiredTick[i + 1]));
    unchecked(entertainerGuestsCheered[i] = unchecked(entertainerGuestsCheered[i + 1]));
    unchecked(entertainerAreaCount[i] = unchecked(entertainerAreaCount[i + 1]));
    for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
      const dst = i * MAX_EMPLOYEE_AREAS + a;
      const src = (i + 1) * MAX_EMPLOYEE_AREAS + a;
      unchecked(entertainerAreaX[dst] = unchecked(entertainerAreaX[src]));
      unchecked(entertainerAreaY[dst] = unchecked(entertainerAreaY[src]));
    }
  }
  const last = entertainerCount - 1;
  unchecked(entertainerActive[last] = 0);
  unchecked(entertainerPatrolX[last] = -1);
  unchecked(entertainerPatrolY[last] = -1);
  unchecked(entertainerGuestsCheered[last] = 0);
  unchecked(entertainerAreaCount[last] = 0);
  for (let a = 0; a < MAX_EMPLOYEE_AREAS; a++) {
    const off = last * MAX_EMPLOYEE_AREAS + a;
    unchecked(entertainerAreaX[off] = -1);
    unchecked(entertainerAreaY[off] = -1);
  }
  entertainerCount--;
  return 1;
}

// ============== RELOCATE / DROWN ==============

export function applyDrowningPenalty(): void {
  parkAttractiveness = max(0, parkAttractiveness - 10);
  for (let i = 0; i < MAX_VISITORS; i++) {
    if (unchecked(vState[i]) == VS_INACTIVE) continue;
    unchecked(vSatisfaction[i] = max(0, unchecked(vSatisfaction[i]) - 12));
  }
}

export function relocateMechanic(index: i32, x: i32, y: i32): i32 {
  if (index < 0 || index >= mechanicCount || unchecked(mechActive[index]) != 1) return 0;
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  unchecked(mechX[index] = x);
  unchecked(mechY[index] = y);
  unchecked(mechTarget[index] = -1);
  unchecked(mechRepairTimer[index] = 0);
  return 1;
}

export function relocateCleaner(index: i32, x: i32, y: i32): i32 {
  if (index < 0 || index >= cleanerCount || unchecked(cleanerActive[index]) != 1) return 0;
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  unchecked(cleanerX[index] = x);
  unchecked(cleanerY[index] = y);
  unchecked(cleanerTargetX[index] = -1);
  unchecked(cleanerTargetY[index] = -1);
  unchecked(cleanerCleanTimer[index] = 0);
  return 1;
}

export function relocateSecurity(index: i32, x: i32, y: i32): i32 {
  if (index < 0 || index >= securityCount || unchecked(securityActive[index]) != 1) return 0;
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  unchecked(securityX[index] = x);
  unchecked(securityY[index] = y);
  unchecked(securityTargetVisitor[index] = -1);
  return 1;
}

export function relocateEntertainer(index: i32, x: i32, y: i32): i32 {
  if (index < 0 || index >= entertainerCount || unchecked(entertainerActive[index]) != 1) return 0;
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return 0;
  unchecked(entertainerX[index] = x);
  unchecked(entertainerY[index] = y);
  unchecked(entertainerPatrolX[index] = -1);
  unchecked(entertainerPatrolY[index] = -1);
  return 1;
}

export function drownMechanic(index: i32): i32 {
  if (fireMechanic(index) == 1) { applyDrowningPenalty(); return 1; }
  return 0;
}

export function drownCleaner(index: i32): i32 {
  if (fireCleaner(index) == 1) { applyDrowningPenalty(); return 1; }
  return 0;
}

export function drownSecurity(index: i32): i32 {
  if (fireSecurity(index) == 1) { applyDrowningPenalty(); return 1; }
  return 0;
}

export function drownEntertainer(index: i32): i32 {
  if (fireEntertainer(index) == 1) { applyDrowningPenalty(); return 1; }
  return 0;
}

// ============== ECONOMY ==============

export function setCriminalRate(ratePerThousand: i32): void {
  criminalRatePerThousand = min(300, max(0, ratePerThousand));
}

export function applyMonthlyOperatingCosts(): void {
  let total: i32 = mechanicCount * MECHANIC_MONTHLY_COST + cleanerCount * CLEANER_MONTHLY_COST + securityCount * SECURITY_MONTHLY_COST + entertainerCount * ENTERTAINER_MONTHLY_COST;
  for (let i = 0; i < instanceCount; i++) {
    if (unchecked(instActive[i]) != 1) continue;
    const tid = unchecked(instTemplateId[i]);
    total += unchecked(tmplMonthlyCost[tid]);
  }
  if (total <= 0) return;
  budget -= total;
  totalExpense += total;
}
