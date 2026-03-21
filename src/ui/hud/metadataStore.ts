export type HudMetadataSnapshot = {
  instanceNames: Array<{ id: number; name: string }>;
  instanceBuildDates: Array<{ id: number; date: string }>;
  stallProductPrices: Array<{ id: number; prices: number[] }>;
  stoppedAttractionCapacities: Array<{ id: number; capacity: number }>;
  employeeNamesByUid: Array<{ key: string; name: string }>;
  employeeHiredDateByUid: Array<{ key: string; date: string }>;
};

export const instanceNames: Map<number, string> = new Map();
const instanceBuildDates: Map<number, string> = new Map();
export const stallProductPricesByInstance: Map<number, number[]> = new Map();
export const stoppedAttractionCapacities: Map<number, number> = new Map();

export function recordBuildDate(instanceId: number, dateStr: string): void {
  instanceBuildDates.set(instanceId, dateStr);
}

export function getBuildDate(instanceId: number): string | undefined {
  return instanceBuildDates.get(instanceId);
}

export function clearInstanceRuntimeState(instanceId: number): void {
  stallProductPricesByInstance.delete(instanceId);
  stoppedAttractionCapacities.delete(instanceId);
}

export function getMetadataSnapshot(
  employeeNamesByUid: Map<string, string>,
  employeeHiredDateByUid: Map<string, string>,
): HudMetadataSnapshot {
  return {
    instanceNames: Array.from(instanceNames.entries()).map(([id, name]) => ({ id, name })),
    instanceBuildDates: Array.from(instanceBuildDates.entries()).map(([id, date]) => ({ id, date })),
    stallProductPrices: Array.from(stallProductPricesByInstance.entries()).map(([id, prices]) => ({ id, prices: [...prices] })),
    stoppedAttractionCapacities: Array.from(stoppedAttractionCapacities.entries()).map(([id, capacity]) => ({ id, capacity })),
    employeeNamesByUid: Array.from(employeeNamesByUid.entries()).map(([key, name]) => ({ key, name })),
    employeeHiredDateByUid: Array.from(employeeHiredDateByUid.entries()).map(([key, date]) => ({ key, date })),
  };
}

export function restoreMetadataSnapshot(
  snapshot: HudMetadataSnapshot,
  employeeNamesByUid: Map<string, string>,
  employeeHiredDateByUid: Map<string, string>,
): void {
  instanceNames.clear();
  instanceBuildDates.clear();
  stallProductPricesByInstance.clear();
  stoppedAttractionCapacities.clear();
  employeeNamesByUid.clear();
  employeeHiredDateByUid.clear();

  for (const row of snapshot.instanceNames) instanceNames.set(row.id, row.name);
  for (const row of snapshot.instanceBuildDates) instanceBuildDates.set(row.id, row.date);
  for (const row of snapshot.stallProductPrices) stallProductPricesByInstance.set(row.id, [...row.prices]);
  for (const row of snapshot.stoppedAttractionCapacities) stoppedAttractionCapacities.set(row.id, row.capacity);
  for (const row of snapshot.employeeNamesByUid) employeeNamesByUid.set(row.key, row.name);
  for (const row of snapshot.employeeHiredDateByUid) employeeHiredDateByUid.set(row.key, row.date);
}
