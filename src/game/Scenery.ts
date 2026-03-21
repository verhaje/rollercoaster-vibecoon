/* =============================================
   Park Tycoon – Scenery System
   Handles decorative scenery placement and lookup.
   ============================================= */

import { type SimExports, TileType } from './types';
import { ECONOMY } from './config/economy';
import { type FurnitureSystem } from './Furniture';
import { getSceneryDef } from './config/scenery';

const MAP_W = ECONOMY.mapWidth;
const MAP_H = ECONOMY.mapHeight;

export interface SceneryItem {
  x: number;
  y: number;
  type: number;
}

export interface ScenerySnapshot {
  items: SceneryItem[];
}

function tileKey(x: number, y: number): number {
  return y * MAP_W + x;
}

function isBuildableLandTile(tile: number): boolean {
  return tile === TileType.Empty ||
    tile === TileType.LandGrass ||
    tile === TileType.LandDesert ||
    tile === TileType.LandMud ||
    tile === TileType.LandDarkGrass;
}

export function sceneryCost(type: number): number {
  return getSceneryDef(type)?.cost ?? 0;
}

export class ScenerySystem {
  items: SceneryItem[] = [];
  private itemMap: Map<number, number> = new Map();

  canPlace(sim: SimExports, furniture: FurnitureSystem | null, x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return false;
    if (!isBuildableLandTile(sim.tileAt(x, y))) return false;
    const k = tileKey(x, y);
    if (this.itemMap.has(k)) return false;
    if (furniture && furniture.hasFurnitureAt(x, y)) return false;
    return true;
  }

  place(sim: SimExports, furniture: FurnitureSystem | null, x: number, y: number, type: number): boolean {
    if (!this.canPlace(sim, furniture, x, y)) return false;
    const idx = this.items.length;
    this.items.push({ x, y, type });
    this.itemMap.set(tileKey(x, y), idx);
    return true;
  }

  hasAt(x: number, y: number): boolean {
    return this.itemMap.has(tileKey(x, y));
  }

  getAt(x: number, y: number): SceneryItem | null {
    const idx = this.itemMap.get(tileKey(x, y));
    if (idx == null) return null;
    return this.items[idx] ?? null;
  }

  removeAt(x: number, y: number): boolean {
    const key = tileKey(x, y);
    const idx = this.itemMap.get(key);
    if (idx == null) return false;
    this.items.splice(idx, 1);
    this.rebuildMap();
    return true;
  }

  private rebuildMap(): void {
    this.itemMap.clear();
    for (let i = 0; i < this.items.length; i++) {
      this.itemMap.set(tileKey(this.items[i].x, this.items[i].y), i);
    }
  }

  getSnapshot(): ScenerySnapshot {
    return {
      items: this.items.map((item) => ({ x: item.x, y: item.y, type: item.type })),
    };
  }

  restoreSnapshot(snapshot: ScenerySnapshot): void {
    this.items = snapshot.items.map((item) => ({ x: item.x, y: item.y, type: item.type }));
    this.rebuildMap();
  }
}
