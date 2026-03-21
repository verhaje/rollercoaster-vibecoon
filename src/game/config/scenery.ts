/* =============================================
   Park Tycoon – Scenery Catalog
   Data-driven definitions for buildable scenery.
   ============================================= */

export interface SceneryDef {
  id: number;
  key: string;
  name: string;
  icon: string;
  cost: number;
  textureKey: string;
  ghostTextureKey: string;
  animatedFrames: number;
}

export const SCENERY_CATALOG: SceneryDef[] = [
  {
    id: 0,
    key: 'fountain',
    name: 'Fountain',
    icon: '⛲',
    cost: 120,
    textureKey: 'scenery_fountain',
    ghostTextureKey: 'ghost_scenery_fountain',
    animatedFrames: 2,
  },
  {
    id: 1,
    key: 'flowers',
    name: 'Flower Garden',
    icon: '🌸',
    cost: 45,
    textureKey: 'scenery_flowers',
    ghostTextureKey: 'ghost_scenery_flowers',
    animatedFrames: 1,
  },
  {
    id: 2,
    key: 'statue',
    name: 'Statue',
    icon: '🗿',
    cost: 180,
    textureKey: 'scenery_statue',
    ghostTextureKey: 'ghost_scenery_statue',
    animatedFrames: 1,
  },
  {
    id: 3,
    key: 'topiary',
    name: 'Topiary Arch',
    icon: '🌿',
    cost: 95,
    textureKey: 'scenery_topiary',
    ghostTextureKey: 'ghost_scenery_topiary',
    animatedFrames: 1,
  },
  {
    id: 4,
    key: 'gazebo',
    name: 'Gazebo',
    icon: '🏛️',
    cost: 260,
    textureKey: 'scenery_gazebo',
    ghostTextureKey: 'ghost_scenery_gazebo',
    animatedFrames: 1,
  },
];

export function getSceneryDef(id: number): SceneryDef | undefined {
  return SCENERY_CATALOG.find((s) => s.id === id);
}
