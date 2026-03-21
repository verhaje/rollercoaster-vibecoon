import { describe, expect, it } from 'vitest';
import {
  BALLOON_STAND_TEMPLATE_ID,
  INFORMATION_STAND_TEMPLATE_ID,
} from '../../src/ui/hud/constants';
import { getStallCategory, STALL_PRODUCTS } from '../../src/ui/hud/stallCatalog';

describe('hud stallCatalog', () => {
  it('resolves explicit template overrides before category fallback', () => {
    expect(getStallCategory(INFORMATION_STAND_TEMPLATE_ID, 'food')).toBe('information');
    expect(getStallCategory(BALLOON_STAND_TEMPLATE_ID, 'drink')).toBe('balloon');
  });

  it('resolves supported attraction categories and null for unsupported ones', () => {
    expect(getStallCategory(999, 'food')).toBe('food');
    expect(getStallCategory(999, 'drink')).toBe('drink');
    expect(getStallCategory(999, 'toilet')).toBe('toilet');
    expect(getStallCategory(999, 'thrill')).toBeNull();
  });

  it('defines non-empty product catalogs with non-negative prices', () => {
    const categories = Object.keys(STALL_PRODUCTS) as Array<keyof typeof STALL_PRODUCTS>;
    for (const category of categories) {
      const products = STALL_PRODUCTS[category];
      expect(products.length).toBeGreaterThan(0);
      for (const product of products) {
        expect(product.name.length).toBeGreaterThan(0);
        expect(product.price).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
