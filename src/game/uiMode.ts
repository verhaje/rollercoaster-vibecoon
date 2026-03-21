export type UiMode = 'mobile' | 'tablet' | 'desktop';

export type QualityTier = 'low' | 'medium' | 'high';

export type InputProfile = {
  touchGesturesEnabled: boolean;
  showOnScreenCameraControls: boolean;
};

export type QualityProfile = {
  tier: QualityTier;
  waterAnimationDivisor: number;
  attractionAnimationDivisor: number;
  weatherDensity: number;
  thunderEnabled: boolean;
};

export type GameProfile = {
  uiMode: UiMode;
  input: InputProfile;
  quality: QualityProfile;
};

export type ModeResolverEnv = {
  innerWidth: number;
  devicePixelRatio: number;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  coarsePointer?: boolean;
};

function resolveUiMode(width: number, coarsePointer: boolean): UiMode {
  if (width <= 767) return 'mobile';
  if (width <= 1199) return 'tablet';
  if (coarsePointer && width <= 1366) return 'tablet';
  return 'desktop';
}

function resolveQualityTier(env: ModeResolverEnv, uiMode: UiMode): QualityTier {
  const cores = env.hardwareConcurrency ?? 4;
  const memory = env.deviceMemory ?? 4;
  const dpr = env.devicePixelRatio || 1;

  if (uiMode === 'mobile' && (cores <= 4 || memory <= 4 || dpr > 2.5)) return 'low';
  if (uiMode === 'tablet' && (cores <= 6 || memory <= 6)) return 'medium';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

function qualityProfileForTier(tier: QualityTier): QualityProfile {
  if (tier === 'low') {
    return {
      tier,
      waterAnimationDivisor: 18,
      attractionAnimationDivisor: 45,
      weatherDensity: 0.45,
      thunderEnabled: false,
    };
  }

  if (tier === 'medium') {
    return {
      tier,
      waterAnimationDivisor: 14,
      attractionAnimationDivisor: 36,
      weatherDensity: 0.7,
      thunderEnabled: true,
    };
  }

  return {
    tier,
    waterAnimationDivisor: 10,
    attractionAnimationDivisor: 30,
    weatherDensity: 1,
    thunderEnabled: true,
  };
}

export function resolveGameProfileFromEnv(env: ModeResolverEnv): GameProfile {
  const uiMode = resolveUiMode(env.innerWidth, !!env.coarsePointer);
  const tier = resolveQualityTier(env, uiMode);

  return {
    uiMode,
    input: {
      touchGesturesEnabled: !!env.coarsePointer,
      showOnScreenCameraControls: uiMode !== 'desktop' || !!env.coarsePointer,
    },
    quality: qualityProfileForTier(tier),
  };
}

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export function resolveGameProfile(win: Window = window): GameProfile {
  const nav = win.navigator as NavigatorWithMemory;
  return resolveGameProfileFromEnv({
    innerWidth: win.innerWidth,
    devicePixelRatio: win.devicePixelRatio || 1,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    coarsePointer: win.matchMedia('(pointer: coarse)').matches,
  });
}
