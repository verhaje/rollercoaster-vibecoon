import { describe, expect, it } from 'vitest';
import {
  getNextPosition,
  TrackDirection,
  TrackPieceType,
} from '../src/game/RollerCoasterTrack';

describe('coaster turn direction mapping', () => {
  it('turn right from station heading goes to screen-right (east)', () => {
    const next = getNextPosition(
      TrackPieceType.TurnRight,
      10,
      11,
      TrackDirection.South,
      1,
    );

    expect(next.direction).toBe(TrackDirection.East);
    expect(next.x).toBe(11);
    expect(next.y).toBe(11);
  });

  it('turn left from station heading goes to screen-left (west)', () => {
    const next = getNextPosition(
      TrackPieceType.TurnLeft,
      10,
      11,
      TrackDirection.South,
      1,
    );

    expect(next.direction).toBe(TrackDirection.West);
    expect(next.x).toBe(9);
    expect(next.y).toBe(11);
  });

  it('applies same orientation for large turns', () => {
    const right = getNextPosition(
      TrackPieceType.LargeTurnRight,
      10,
      11,
      TrackDirection.South,
      1,
    );
    const left = getNextPosition(
      TrackPieceType.LargeTurnLeft,
      10,
      11,
      TrackDirection.South,
      1,
    );

    expect(right.direction).toBe(TrackDirection.East);
    expect(right.x).toBe(12);
    expect(right.y).toBe(11);

    expect(left.direction).toBe(TrackDirection.West);
    expect(left.x).toBe(8);
    expect(left.y).toBe(11);
  });
});
