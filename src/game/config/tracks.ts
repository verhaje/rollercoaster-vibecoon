/* ================================================
   Park Tycoon – Track Style Configuration
   Defines per-attraction track building rules,
   allowed pieces, costs, and sprite style.
   ================================================ */

/**
 * Local mirror of TrackPieceType numeric values.
 * Avoids circular dependency with RollerCoasterTrack which imports this module.
 */
const PT = {
  Straight: 0,
  TurnLeft: 1,
  TurnRight: 2,
  HillUp: 3,
  HillDown: 4,
  LargeTurnLeft: 5,
  LargeTurnRight: 6,
  Station: 7,
} as const;

export type TrackSpriteStyle = 'rails' | 'narrowGauge' | 'waterChannel';

export interface TrackStyleConfig {
  /** Attraction template id this config applies to */
  templateId: number;
  /** Human-readable label for the builder dialog */
  dialogTitle: string;
  /** Emoji icon shown in the builder dialog */
  icon: string;
  /** Which track piece types the player can place */
  allowedPieces: number[];
  /** Minimum height for track pieces (station starts here) */
  minHeight: number;
  /** Maximum height for track pieces */
  maxHeight: number;
  /** Per-piece base build cost */
  baseCosts: Partial<Record<number, number>>;
  /** Default fallback cost when baseCosts entry is missing */
  defaultPieceCost: number;
  /** Default track color for new builds */
  defaultTrackColor: string;
  /** Default cart/vehicle color for new builds */
  defaultCartColor: string;
  /** Rendering style key used by the sprite system */
  spriteStyle: TrackSpriteStyle;
  /** Extra cost per height level above minHeight */
  heightCostPerLevel: number;
  /** Minimum pieces before completion is allowed */
  minPiecesForCompletion: number;
  /** Max vehicles visible on the track at once */
  maxCarts: number;
  /** Approximate cart length measured in piece units */
  cartLengthPieces: number;
  /** Gap between carts measured in piece units */
  cartGapPieces: number;
}

/** Roller Coaster (template id 1) */
const ROLLER_COASTER_CONFIG: TrackStyleConfig = {
  templateId: 1,
  dialogTitle: 'Track Builder',
  icon: '🎢',
  allowedPieces: [
    PT.Station,
    PT.Straight,
    PT.TurnLeft,
    PT.TurnRight,
    PT.HillUp,
    PT.HillDown,
    PT.LargeTurnLeft,
    PT.LargeTurnRight,
  ],
  minHeight: 1,
  maxHeight: 8,
  baseCosts: {
    [PT.Straight]: 18,
    [PT.TurnLeft]: 20,
    [PT.TurnRight]: 20,
    [PT.HillUp]: 26,
    [PT.HillDown]: 24,
    [PT.LargeTurnLeft]: 34,
    [PT.LargeTurnRight]: 34,
    [PT.Station]: 16,
  },
  defaultPieceCost: 18,
  defaultTrackColor: '#e67e22',
  defaultCartColor: '#c0392b',
  spriteStyle: 'rails',
  heightCostPerLevel: 8,
  minPiecesForCompletion: 4,
  maxCarts: 4,
  cartLengthPieces: 2,
  cartGapPieces: 1,
};

/** Log Flume (template id 6) */
const LOG_FLUME_CONFIG: TrackStyleConfig = {
  templateId: 6,
  dialogTitle: 'Flume Builder',
  icon: '🚣',
  allowedPieces: [
    PT.Station,
    PT.Straight,
    PT.TurnLeft,
    PT.TurnRight,
    PT.HillUp,
    PT.HillDown,
    PT.LargeTurnLeft,
    PT.LargeTurnRight,
  ],
  minHeight: 1,
  maxHeight: 6,
  baseCosts: {
    [PT.Straight]: 22,
    [PT.TurnLeft]: 24,
    [PT.TurnRight]: 24,
    [PT.HillUp]: 30,
    [PT.HillDown]: 28,
    [PT.LargeTurnLeft]: 38,
    [PT.LargeTurnRight]: 38,
    [PT.Station]: 20,
  },
  defaultPieceCost: 22,
  defaultTrackColor: '#6b4226',
  defaultCartColor: '#8b5e3c',
  spriteStyle: 'waterChannel',
  heightCostPerLevel: 10,
  minPiecesForCompletion: 4,
  maxCarts: 10,
  cartLengthPieces: 1,
  cartGapPieces: 1,
};

/** Park Train (template id 16) */
const PARK_TRAIN_CONFIG: TrackStyleConfig = {
  templateId: 16,
  dialogTitle: 'Train Track Builder',
  icon: '🚂',
  allowedPieces: [
    PT.Station,
    PT.Straight,
    PT.TurnLeft,
    PT.TurnRight,
    PT.LargeTurnLeft,
    PT.LargeTurnRight,
  ],
  minHeight: 1,
  maxHeight: 1,
  baseCosts: {
    [PT.Straight]: 14,
    [PT.TurnLeft]: 16,
    [PT.TurnRight]: 16,
    [PT.LargeTurnLeft]: 28,
    [PT.LargeTurnRight]: 28,
    [PT.Station]: 12,
  },
  defaultPieceCost: 14,
  defaultTrackColor: '#8899aa',
  defaultCartColor: '#2e7d32',
  spriteStyle: 'narrowGauge',
  heightCostPerLevel: 0,
  minPiecesForCompletion: 4,
  maxCarts: 5,
  cartLengthPieces: 3,
  cartGapPieces: 1,
};

/** All track style configs keyed by attraction template id */
export const TRACK_CONFIGS: ReadonlyMap<number, TrackStyleConfig> = new Map([
  [ROLLER_COASTER_CONFIG.templateId, ROLLER_COASTER_CONFIG],
  [LOG_FLUME_CONFIG.templateId, LOG_FLUME_CONFIG],
  [PARK_TRAIN_CONFIG.templateId, PARK_TRAIN_CONFIG],
]);

/** Check whether a given attraction template id uses the track builder */
export function isTrackAttraction(templateId: number): boolean {
  return TRACK_CONFIGS.has(templateId);
}

/** Get the track config for a template, or undefined if it's not a track attraction */
export function getTrackConfig(templateId: number): TrackStyleConfig | undefined {
  return TRACK_CONFIGS.get(templateId);
}
