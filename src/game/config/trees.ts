export interface TreeDef {
  id: number;
  key: string;
  name: string;
  icon: string;
  cost: number;
  textureKey: string;
  ghostTextureKey: string;
}

export const TREE_CATALOG: TreeDef[] = [
  {
    id: 0,
    key: 'pine',
    name: 'Pine Tree',
    icon: '🌲',
    cost: 20,
    textureKey: 'tree_pine',
    ghostTextureKey: 'ghost_tree_pine',
  },
  {
    id: 1,
    key: 'cactus',
    name: 'Cactus',
    icon: '🌵',
    cost: 18,
    textureKey: 'tree_cactus',
    ghostTextureKey: 'ghost_tree_cactus',
  },
  {
    id: 2,
    key: 'cherry',
    name: 'Cherry Tree',
    icon: '🌸',
    cost: 26,
    textureKey: 'tree_cherry',
    ghostTextureKey: 'ghost_tree_cherry',
  },
  {
    id: 3,
    key: 'shrubbery',
    name: 'Shrubbery',
    icon: '🌿',
    cost: 12,
    textureKey: 'tree_shrubbery',
    ghostTextureKey: 'ghost_tree_shrubbery',
  },
  {
    id: 4,
    key: 'apple',
    name: 'Apple Tree',
    icon: '🍎',
    cost: 24,
    textureKey: 'tree_apple',
    ghostTextureKey: 'ghost_tree_apple',
  },
  {
    id: 5,
    key: 'lemon',
    name: 'Lemon Tree',
    icon: '🍋',
    cost: 22,
    textureKey: 'tree_lemon',
    ghostTextureKey: 'ghost_tree_lemon',
  },
];

export function getTreeDef(id: number): TreeDef | undefined {
  return TREE_CATALOG.find((tree) => tree.id === id);
}
