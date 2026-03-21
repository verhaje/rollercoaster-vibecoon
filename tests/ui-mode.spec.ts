import { describe, expect, it } from 'vitest';
import { resolveGameProfileFromEnv } from '../src/game/uiMode';

describe('ui mode resolution', () => {
  it('selects mobile and low quality on small coarse devices', () => {
    const profile = resolveGameProfileFromEnv({
      innerWidth: 390,
      devicePixelRatio: 3,
      hardwareConcurrency: 4,
      deviceMemory: 4,
      coarsePointer: true,
    });

    expect(profile.uiMode).toBe('mobile');
    expect(profile.input.touchGesturesEnabled).toBe(true);
    expect(profile.input.showOnScreenCameraControls).toBe(true);
    expect(profile.quality.tier).toBe('low');
    expect(profile.quality.weatherDensity).toBeLessThan(0.5);
  });

  it('selects tablet profile for mid-size touch layouts', () => {
    const profile = resolveGameProfileFromEnv({
      innerWidth: 1024,
      devicePixelRatio: 2,
      hardwareConcurrency: 8,
      deviceMemory: 8,
      coarsePointer: true,
    });

    expect(profile.uiMode).toBe('tablet');
    expect(profile.input.touchGesturesEnabled).toBe(true);
    expect(profile.input.showOnScreenCameraControls).toBe(true);
    expect(profile.quality.tier).toBe('high');
  });

  it('selects desktop mode and keeps on-screen camera controls off on fine pointers', () => {
    const profile = resolveGameProfileFromEnv({
      innerWidth: 1440,
      devicePixelRatio: 1,
      hardwareConcurrency: 12,
      deviceMemory: 16,
      coarsePointer: false,
    });

    expect(profile.uiMode).toBe('desktop');
    expect(profile.input.touchGesturesEnabled).toBe(false);
    expect(profile.input.showOnScreenCameraControls).toBe(false);
    expect(profile.quality.tier).toBe('high');
  });
});
