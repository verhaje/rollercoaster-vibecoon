import { describe, expect, it } from 'vitest';
import { FurnitureSystem } from '../src/game/Furniture';
import { TileType, VisitorState, type SimExports } from '../src/game/types';

function makeFurnitureSim(): SimExports {
  return {
    tileAt: () => TileType.PathMuddy,
    getTickCount: () => 1,
    getVisitorState: () => VisitorState.Inactive,
    getCleanerCount: () => 1,
    getCleanerTargetX: () => -1,
    getCleanerTargetY: () => -1,
    getCleanerCleanTimer: () => 0,
    getPukeAt: () => 0,
    getCleanerX: () => 5,
    getCleanerY: () => 5,
    getMechanicCount: () => 1,
    getMechanicTarget: () => -1,
    getMechanicRepairTimer: () => 0,
    getMechanicX: () => 5,
    getMechanicY: () => 5,
  } as unknown as SimExports;
}

describe('furniture cleaner behavior', () => {
  it('empties nearby trash cans even when not full', () => {
    const sim = makeFurnitureSim();
    const furniture = new FurnitureSystem();

    expect(furniture.placeTrashCan(sim, 5, 5)).toBe(true);
    const can = furniture.getTrashCanAt(5, 5);
    expect(can).not.toBeNull();
    can!.fill = 3;

    furniture.tick(sim);

    expect(can!.fill).toBe(0);
  });

  it('lets nearby idle mechanics repair broken trash cans', () => {
    const sim = makeFurnitureSim();
    const furniture = new FurnitureSystem();

    expect(furniture.placeTrashCan(sim, 5, 5)).toBe(true);
    const can = furniture.getTrashCanAt(5, 5);
    expect(can).not.toBeNull();
    can!.broken = true;

    furniture.tick(sim);

    expect(can!.broken).toBe(false);
  });
});
