import { describe, expect, it } from 'vitest';
import { getAttrDrawer, isAnimatedAttraction } from '../src/render/sprites/attractions';
import ATTRACTIONS from '../src/game/config/attractions';

describe('attraction sprite drawers', () => {
  it('provides a static burger stand drawer on frame 0 only', () => {
    expect(getAttrDrawer(8, 0, 0, 0)).toBeTypeOf('function');
    expect(getAttrDrawer(8, 0, 0, 1)).toBeNull();
  });

  it('keeps burger stand non-animated while rides remain animated', () => {
    expect(isAnimatedAttraction(8)).toBe(false);
    expect(isAnimatedAttraction(1)).toBe(true);
  });

  it('exposes all static stall drawers on frame 0 and none on frame 1', () => {
    const staticStallIds = [8, 9, 10, 11, 12, 13, 17, 18];
    for (const id of staticStallIds) {
      expect(getAttrDrawer(id, 0, 0, 0)).toBeTypeOf('function');
      expect(getAttrDrawer(id, 0, 0, 1)).toBeNull();
      expect(isAnimatedAttraction(id)).toBe(false);
    }
  });

  it('provides explicit sprite drawers for every configured attraction tile/frame', () => {
    for (const attr of ATTRACTIONS) {
      const frames = isAnimatedAttraction(attr.id) ? 2 : 1;
      for (let frame = 0; frame < frames; frame++) {
        for (let ty = 0; ty < attr.footprint.h; ty++) {
          for (let tx = 0; tx < attr.footprint.w; tx++) {
            expect(getAttrDrawer(attr.id, tx, ty, frame)).toBeTypeOf('function');
          }
        }
      }
    }
  });
});
