import {
  BALLOON_STAND_TEMPLATE_ID,
  INFORMATION_STAND_TEMPLATE_ID,
} from './constants';
import type { StallCategory, StallProduct } from './types';

export function getStallCategory(templateId: number, category: string): StallCategory | null {
  if (templateId === INFORMATION_STAND_TEMPLATE_ID) return 'information';
  if (templateId === BALLOON_STAND_TEMPLATE_ID) return 'balloon';
  if (category === 'food' || category === 'drink' || category === 'toilet') return category;
  return null;
}

export const STALL_PRODUCTS: Record<StallCategory, StallProduct[]> = {
  food: [
    { name: 'Burger Meal', price: 3 },
    { name: 'Pizza Slice', price: 4 },
    { name: 'Hot Dog Combo', price: 5 },
  ],
  drink: [
    { name: 'Lemonade', price: 2 },
    { name: 'Iced Coffee', price: 3 },
    { name: 'Fruit Smoothie', price: 4 },
  ],
  toilet: [
    { name: 'Standard Access', price: 0 },
    { name: 'Express Access', price: 1 },
    { name: 'Premium Access', price: 2 },
  ],
  information: [
    { name: 'Map', price: 2 },
    { name: 'Umbrella', price: 5 },
  ],
  balloon: [
    { name: 'Green Balloon', price: 2 },
    { name: 'Red Balloon', price: 2 },
    { name: 'Blue Balloon', price: 2 },
  ],
};
