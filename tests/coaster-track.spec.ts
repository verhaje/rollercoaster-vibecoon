import { describe, expect, it } from 'vitest';
import {
  CoasterTrackSystem,
  TrackDirection,
  TrackPieceType,
  type TrackPiece,
} from '../src/game/RollerCoasterTrack';
import { TileType, type SimExports } from '../src/game/types';
import { isTrackAttraction, getTrackConfig } from '../src/game/config/tracks';

function makeBuildState(
  stationX: number,
  stationY: number,
  nextX: number,
  nextY: number,
  nextDir: TrackDirection,
  nextHeight: number,
): CoasterTrackSystem['activeBuild'] {
  const pieces: TrackPiece[] = [
    { type: 0, x: stationX, y: stationY + 1, direction: TrackDirection.South, height: 1 },
    { type: 1, x: stationX, y: stationY + 2, direction: TrackDirection.South, height: 1 },
    { type: 0, x: stationX + 1, y: stationY + 2, direction: TrackDirection.East, height: 1 },
    { type: 2, x: stationX + 2, y: stationY + 2, direction: TrackDirection.East, height: 1 },
  ];

  return {
    instanceId: 1,
    trackStyleId: 1,
    stationX,
    stationY,
    stationDir: TrackDirection.South,
    trackColor: '#e67e22',
    cartColor: '#c0392b',
    stationLength: 1,
    pieces,
    nextX,
    nextY,
    nextDir,
    nextHeight,
    occupiedTiles: new Set<string>(),
    pieceCosts: [],
  };
}

describe('coaster completion rules', () => {
  it('completes when touching opposite station end from the north side', () => {
    const tracks = new CoasterTrackSystem({} as SimExports);
    tracks.activeBuild = makeBuildState(10, 10, 10, 9, TrackDirection.South, 1);

    expect(tracks.canComplete()).toBe(true);
  });

  it('does not complete at the old start-side station approach', () => {
    const tracks = new CoasterTrackSystem({} as SimExports);
    tracks.activeBuild = makeBuildState(10, 10, 10, 11, TrackDirection.North, 1);

    expect(tracks.canComplete()).toBe(false);
  });

  it('requires the correct return direction and height', () => {
    const tracks = new CoasterTrackSystem({} as SimExports);

    tracks.activeBuild = makeBuildState(10, 10, 10, 9, TrackDirection.North, 1);
    expect(tracks.canComplete()).toBe(false);

    tracks.activeBuild = makeBuildState(10, 10, 10, 9, TrackDirection.South, 2);
    expect(tracks.canComplete()).toBe(false);
  });

  it('allows completing from side corner entries into station end', () => {
    const tracks = new CoasterTrackSystem({} as SimExports);

    tracks.activeBuild = makeBuildState(10, 10, 9, 10, TrackDirection.East, 1);
    expect(tracks.canComplete()).toBe(true);

    tracks.activeBuild = makeBuildState(10, 10, 11, 10, TrackDirection.West, 1);
    expect(tracks.canComplete()).toBe(true);
  });
});

function makeBudgetSim(startBudget: number): SimExports {
  let budget = startBudget;
  return {
    tileAt: () => TileType.Empty,
    getUpperPathVariant: () => -1,
    getBudget: () => budget,
    setBudget: (b: number) => {
      budget = b;
    },
    demolish: () => 1,
  } as unknown as SimExports;
}

describe('coaster track build pricing', () => {
  it('charges for each placed piece and refunds on undo', () => {
    const sim = makeBudgetSim(1000);
    const tracks = new CoasterTrackSystem(sim);
    tracks.startBuild(1, 10, 10);

    expect(tracks.placePiece(TrackPieceType.Straight)).toBe(true);
    const afterStraight = sim.getBudget();
    expect(afterStraight).toBeLessThan(1000);

    expect(tracks.placePiece(TrackPieceType.HillUp)).toBe(true);
    const afterHill = sim.getBudget();
    expect(afterHill).toBeLessThan(afterStraight);

    expect(tracks.placePiece(TrackPieceType.Straight)).toBe(true);
    const afterElevatedStraight = sim.getBudget();
    const costAtHeight1 = 1000 - afterStraight;
    const costAtHeight2 = afterHill - afterElevatedStraight;
    expect(costAtHeight2).toBeGreaterThan(costAtHeight1);

    expect(tracks.undoLastPiece()).toBe(true);
    expect(sim.getBudget()).toBe(afterHill);
  });

  it('blocks placement when budget cannot cover piece cost', () => {
    const sim = makeBudgetSim(10);
    const tracks = new CoasterTrackSystem(sim);
    tracks.startBuild(1, 10, 10);

    expect(tracks.canPlacePiece(TrackPieceType.Straight)).toBe(false);
    expect(tracks.placePiece(TrackPieceType.Straight)).toBe(false);
  });
});

describe('track config lookups', () => {
  it('identifies track-based attractions', () => {
    expect(isTrackAttraction(1)).toBe(true);   // Roller Coaster
    expect(isTrackAttraction(6)).toBe(true);   // Log Flume
    expect(isTrackAttraction(16)).toBe(true);  // Park Train
    expect(isTrackAttraction(2)).toBe(false);  // something else
  });

  it('returns correct sprite style per attraction', () => {
    expect(getTrackConfig(1)?.spriteStyle).toBe('rails');
    expect(getTrackConfig(6)?.spriteStyle).toBe('waterChannel');
    expect(getTrackConfig(16)?.spriteStyle).toBe('narrowGauge');
  });
});

describe('park train rejects hills', () => {
  it('cannot place HillUp or HillDown for train template', () => {
    const sim = makeBudgetSim(5000);
    const tracks = new CoasterTrackSystem(sim);
    tracks.startBuild(1, 10, 10, 16); // Park Train

    expect(tracks.canPlacePiece(TrackPieceType.Straight)).toBe(true);
    expect(tracks.canPlacePiece(TrackPieceType.HillUp)).toBe(false);
    expect(tracks.canPlacePiece(TrackPieceType.HillDown)).toBe(false);
    expect(tracks.canPlacePiece(TrackPieceType.TurnLeft)).toBe(true);
    expect(tracks.canPlacePiece(TrackPieceType.TurnRight)).toBe(true);
  });
});

describe('log flume allows hills', () => {
  it('can place HillUp and HillDown for flume template', () => {
    const sim = makeBudgetSim(5000);
    const tracks = new CoasterTrackSystem(sim);
    tracks.startBuild(1, 10, 10, 6); // Log Flume

    expect(tracks.canPlacePiece(TrackPieceType.Straight)).toBe(true);
    expect(tracks.canPlacePiece(TrackPieceType.HillUp)).toBe(true);
  });
});
