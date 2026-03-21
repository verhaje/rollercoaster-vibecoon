import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearInstanceRuntimeState,
  getBuildDate,
  getMetadataSnapshot,
  instanceNames,
  recordBuildDate,
  restoreMetadataSnapshot,
  stallProductPricesByInstance,
  stoppedAttractionCapacities,
} from '../../src/ui/hud/metadataStore';

describe('hud metadataStore', () => {
  const employeeNamesByUid = new Map<string, string>();
  const employeeHiredDateByUid = new Map<string, string>();

  beforeEach(() => {
    instanceNames.clear();
    stallProductPricesByInstance.clear();
    stoppedAttractionCapacities.clear();
    employeeNamesByUid.clear();
    employeeHiredDateByUid.clear();
    restoreMetadataSnapshot(
      {
        instanceNames: [],
        instanceBuildDates: [],
        stallProductPrices: [],
        stoppedAttractionCapacities: [],
        employeeNamesByUid: [],
        employeeHiredDateByUid: [],
      },
      employeeNamesByUid,
      employeeHiredDateByUid,
    );
  });

  it('records and reads build dates by instance id', () => {
    recordBuildDate(7, 'Jan 3, 2001');
    expect(getBuildDate(7)).toBe('Jan 3, 2001');
    expect(getBuildDate(8)).toBeUndefined();
  });

  it('clears only runtime state maps for an instance', () => {
    recordBuildDate(11, 'Feb 10, 2004');
    stallProductPricesByInstance.set(11, [2, 4, 6]);
    stoppedAttractionCapacities.set(11, 18);

    clearInstanceRuntimeState(11);

    expect(stallProductPricesByInstance.has(11)).toBe(false);
    expect(stoppedAttractionCapacities.has(11)).toBe(false);
    expect(getBuildDate(11)).toBe('Feb 10, 2004');
  });

  it('round-trips metadata through snapshot and restore', () => {
    instanceNames.set(3, 'Dragon Coaster');
    recordBuildDate(3, 'Mar 8, 2005');
    stallProductPricesByInstance.set(3, [5, 7]);
    stoppedAttractionCapacities.set(3, 24);
    employeeNamesByUid.set('mechanic:10', 'Maya Baker');
    employeeHiredDateByUid.set('mechanic:10', 'Apr 1, 2005');

    const snapshot = getMetadataSnapshot(employeeNamesByUid, employeeHiredDateByUid);

    instanceNames.clear();
    stallProductPricesByInstance.clear();
    stoppedAttractionCapacities.clear();
    employeeNamesByUid.clear();
    employeeHiredDateByUid.clear();
    restoreMetadataSnapshot(
      {
        instanceNames: [],
        instanceBuildDates: [],
        stallProductPrices: [],
        stoppedAttractionCapacities: [],
        employeeNamesByUid: [],
        employeeHiredDateByUid: [],
      },
      employeeNamesByUid,
      employeeHiredDateByUid,
    );

    restoreMetadataSnapshot(snapshot, employeeNamesByUid, employeeHiredDateByUid);

    expect(instanceNames.get(3)).toBe('Dragon Coaster');
    expect(getBuildDate(3)).toBe('Mar 8, 2005');
    expect(stallProductPricesByInstance.get(3)).toEqual([5, 7]);
    expect(stoppedAttractionCapacities.get(3)).toBe(24);
    expect(employeeNamesByUid.get('mechanic:10')).toBe('Maya Baker');
    expect(employeeHiredDateByUid.get('mechanic:10')).toBe('Apr 1, 2005');
  });
});
