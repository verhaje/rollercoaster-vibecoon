/* ══════════════════════════════════════════
   TRACK PIECE SPRITES
   Each function draws one 16×16 tile for a
   specific track piece type and direction.
   Track color is parameterised for customisation.
   Supports three sprite styles:
     - 'rails'        (roller coaster)
     - 'narrowGauge'  (calm park train)
     - 'waterChannel' (log flume)
   ══════════════════════════════════════════ */

import { T, px, rect } from './core';
import { TrackDirection, TrackPieceType } from '../../game/RollerCoasterTrack';
import type { TrackSpriteStyle } from '../../game/config/tracks';

const RAIL_W = 2;
const SUPPORT_COLOR = '#888';
const TIE_COLOR = '#6b4226';
export const enum TrackHillTransition {
  None = 0,
  FlatEntry = 1,
  FlatExit = 2,
}

function drawSupportBeams(ctx: OffscreenCanvasRenderingContext2D, height: number): void {
  if (height <= 0) return;
  const levels = Math.min(8, height);
  for (let i = 0; i < levels; i++) {
    const y = T - 1 - i * 2;
    rect(ctx, 4, y, 2, 2, SUPPORT_COLOR);
    rect(ctx, 10, y, 2, 2, SUPPORT_COLOR);
    rect(ctx, 6, y, 4, 1, '#737373');
  }
}

function rotateScreenRight(dir: TrackDirection): TrackDirection {
  return ((dir + 3) % 4) as TrackDirection;
}

function rotateScreenLeft(dir: TrackDirection): TrackDirection {
  return ((dir + 1) % 4) as TrackDirection;
}

/** Draw a straight track piece */
export function drawTrackStraight(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  color: string,
  height: number,
): void {
  drawSupportBeams(ctx, height);

  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    // Vertical track: rails on left & right, ties horizontal
    for (let y = 0; y < T; y += 3) {
      rect(ctx, 2, y, 12, 1, TIE_COLOR); // wooden tie
    }
    rect(ctx, 3, 0, RAIL_W, T, color);    // left rail
    rect(ctx, 11, 0, RAIL_W, T, color);   // right rail
  } else {
    // Horizontal track: rails on top & bottom, ties vertical
    for (let x = 0; x < T; x += 3) {
      rect(ctx, x, 2, 1, 12, TIE_COLOR);
    }
    rect(ctx, 0, 3, T, RAIL_W, color);
    rect(ctx, 0, 11, T, RAIL_W, color);
  }
}

/** Draw a turn track piece (small 90-degree turn) */
export function drawTrackTurn(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  turnRight: boolean,
  color: string,
  height: number,
): void {
  drawSupportBeams(ctx, height);

  // Draw curved rails using arcs
  // The turn goes from the entry direction and curves left or right
  ctx.lineWidth = RAIL_W;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Determine arc center and path based on entry direction + turn.
  // turnRight uses screen-space right semantics to match build controls.
  let arcCX: number, arcCY: number;
  let startAngle: number, endAngle: number;
  const innerR = 4;
  const outerR = 12;

  if (dir === TrackDirection.North) {
    if (turnRight) { arcCX = 0; arcCY = 0; startAngle = 0; endAngle = Math.PI / 2; }
    else { arcCX = T; arcCY = 0; startAngle = Math.PI / 2; endAngle = Math.PI; }
  } else if (dir === TrackDirection.East) {
    if (turnRight) { arcCX = T; arcCY = 0; startAngle = Math.PI / 2; endAngle = Math.PI; }
    else { arcCX = T; arcCY = T; startAngle = Math.PI; endAngle = Math.PI * 1.5; }
  } else if (dir === TrackDirection.South) {
    if (turnRight) { arcCX = T; arcCY = T; startAngle = Math.PI; endAngle = Math.PI * 1.5; }
    else { arcCX = 0; arcCY = T; startAngle = Math.PI * 1.5; endAngle = Math.PI * 2; }
  } else { // West
    if (turnRight) { arcCX = 0; arcCY = T; startAngle = Math.PI * 1.5; endAngle = Math.PI * 2; }
    else { arcCX = 0; arcCY = 0; startAngle = 0; endAngle = Math.PI / 2; }
  }

  // Ties along the curve
  ctx.strokeStyle = TIE_COLOR;
  ctx.lineWidth = 1;
  for (let a = startAngle; a <= endAngle; a += 0.3) {
    const ix = arcCX + Math.cos(a) * innerR;
    const iy = arcCY + Math.sin(a) * innerR;
    const ox = arcCX + Math.cos(a) * outerR;
    const oy = arcCY + Math.sin(a) * outerR;
    ctx.beginPath();
    ctx.moveTo(ix, iy);
    ctx.lineTo(ox, oy);
    ctx.stroke();
  }

  // Inner rail
  ctx.strokeStyle = color;
  ctx.lineWidth = RAIL_W;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, innerR, startAngle, endAngle);
  ctx.stroke();

  // Outer rail
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, outerR, startAngle, endAngle);
  ctx.stroke();

  // Add short entry/exit stubs so corners blend cleanly with straights/hills.
  const exitDir = turnRight ? rotateScreenRight(dir) : rotateScreenLeft(dir);
  const drawStub = (d: TrackDirection) => {
    if (d === TrackDirection.North) {
      rect(ctx, 3, 0, RAIL_W, 4, color);
      rect(ctx, 11, 0, RAIL_W, 4, color);
    } else if (d === TrackDirection.South) {
      rect(ctx, 3, T - 4, RAIL_W, 4, color);
      rect(ctx, 11, T - 4, RAIL_W, 4, color);
    } else if (d === TrackDirection.East) {
      rect(ctx, T - 4, 3, 4, RAIL_W, color);
      rect(ctx, T - 4, 11, 4, RAIL_W, color);
    } else {
      rect(ctx, 0, 3, 4, RAIL_W, color);
      rect(ctx, 0, 11, 4, RAIL_W, color);
    }
  };
  drawStub(dir);
  drawStub(exitDir);

}

/** Draw a hill up/down piece */
export function drawTrackHill(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  goingUp: boolean,
  color: string,
  height: number,
  transition: TrackHillTransition = TrackHillTransition.None,
): void {
  drawSupportBeams(ctx, height + 1);

  // Support
  rect(ctx, 7, 0, 2, T, '#4f4f4f');

  const transitionLen = 4;
  const getSmoothedOffset = (
    pos: number,
    ascending: boolean,
    flattenAtStart: boolean,
    flattenAtEnd: boolean,
  ): number => {
    const maxPos = T - 1;
    const base = ascending
      ? Math.floor((maxPos - pos) * 4 / T)
      : Math.floor(pos * 4 / T);
    const startOffset = ascending
      ? Math.floor(maxPos * 4 / T)
      : 0;
    const endOffset = ascending
      ? 0
      : Math.floor(maxPos * 4 / T);

    let offset = base;
    if (flattenAtStart && pos < transitionLen) {
      const t = pos / (transitionLen - 1);
      offset = Math.round(startOffset + (offset - startOffset) * t);
    }
    if (flattenAtEnd && pos >= T - transitionLen) {
      const t = (maxPos - pos) / (transitionLen - 1);
      offset = Math.round(endOffset + (offset - endOffset) * t);
    }
    return offset;
  };

  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    const ascending = (dir === TrackDirection.North) === goingUp;
    const entryAtStart = dir === TrackDirection.South;
    const flattenAtStart = ((transition & TrackHillTransition.FlatEntry) !== 0 && entryAtStart)
      || ((transition & TrackHillTransition.FlatExit) !== 0 && !entryAtStart);
    const flattenAtEnd = ((transition & TrackHillTransition.FlatEntry) !== 0 && !entryAtStart)
      || ((transition & TrackHillTransition.FlatExit) !== 0 && entryAtStart);
    // Ties
    for (let y = 0; y < T; y += 3) {
      const offset = getSmoothedOffset(y, ascending, flattenAtStart, flattenAtEnd);
      rect(ctx, 3, y - offset, 10, 1, TIE_COLOR);
    }
    // Gradient rails
    for (let y = 0; y < T; y++) {
      const offset = getSmoothedOffset(y, ascending, flattenAtStart, flattenAtEnd);
      rect(ctx, 3, y - offset, RAIL_W, 1, color);
      rect(ctx, 11, y - offset, RAIL_W, 1, color);
    }
    // Arrow indicator
    const arrowColor = goingUp ? '#4caf50' : '#f44336';
    const ay = goingUp ? 2 : T - 4;
    rect(ctx, 7, ay, 2, 3, arrowColor);
  } else {
    const ascending = (dir === TrackDirection.West) === goingUp;
    const entryAtStart = dir === TrackDirection.East;
    const flattenAtStart = ((transition & TrackHillTransition.FlatEntry) !== 0 && entryAtStart)
      || ((transition & TrackHillTransition.FlatExit) !== 0 && !entryAtStart);
    const flattenAtEnd = ((transition & TrackHillTransition.FlatEntry) !== 0 && !entryAtStart)
      || ((transition & TrackHillTransition.FlatExit) !== 0 && entryAtStart);
    for (let x = 0; x < T; x += 3) {
      const offset = getSmoothedOffset(x, ascending, flattenAtStart, flattenAtEnd);
      rect(ctx, x, 3 - offset, 1, 10, TIE_COLOR);
    }
    for (let x = 0; x < T; x++) {
      const offset = getSmoothedOffset(x, ascending, flattenAtStart, flattenAtEnd);
      rect(ctx, x, 3 - offset, 1, RAIL_W, color);
      rect(ctx, x, 11 - offset, 1, RAIL_W, color);
    }
    const arrowColor = goingUp ? '#4caf50' : '#f44336';
    const ax = goingUp ? 2 : T - 4;
    rect(ctx, ax, 7, 3, 2, arrowColor);
  }

}

/** Draw a large turn (the main entry tile) */
export function drawTrackLargeTurn(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  turnLeft: boolean,
  color: string,
  height: number,
  isSecondaryTile: boolean,
): void {
  drawSupportBeams(ctx, height);

  // Draw a wider curve spanning two tiles
  let arcCX: number, arcCY: number;
  let startAngle: number, endAngle: number;
  const innerR = isSecondaryTile ? 2 : 6;
  const outerR = isSecondaryTile ? 10 : 14;

  if (dir === TrackDirection.North) {
    if (turnLeft) { arcCX = 0; arcCY = isSecondaryTile ? T : 0; startAngle = isSecondaryTile ? -Math.PI / 4 : 0; endAngle = Math.PI / 2; }
    else { arcCX = T; arcCY = isSecondaryTile ? T : 0; startAngle = Math.PI / 2; endAngle = isSecondaryTile ? Math.PI * 1.25 : Math.PI; }
  } else if (dir === TrackDirection.East) {
    if (turnLeft) { arcCX = isSecondaryTile ? 0 : T; arcCY = 0; startAngle = isSecondaryTile ? Math.PI / 4 : Math.PI / 2; endAngle = Math.PI; }
    else { arcCX = isSecondaryTile ? 0 : T; arcCY = T; startAngle = Math.PI; endAngle = isSecondaryTile ? Math.PI * 1.75 : Math.PI * 1.5; }
  } else if (dir === TrackDirection.South) {
    if (turnLeft) { arcCX = T; arcCY = isSecondaryTile ? 0 : T; startAngle = Math.PI; endAngle = isSecondaryTile ? Math.PI * 1.75 : Math.PI * 1.5; }
    else { arcCX = 0; arcCY = isSecondaryTile ? 0 : T; startAngle = isSecondaryTile ? Math.PI * 1.25 : Math.PI * 1.5; endAngle = Math.PI * 2; }
  } else { // West
    if (turnLeft) { arcCX = isSecondaryTile ? T : 0; arcCY = T; startAngle = isSecondaryTile ? Math.PI * 1.25 : Math.PI * 1.5; endAngle = Math.PI * 2; }
    else { arcCX = isSecondaryTile ? T : 0; arcCY = 0; startAngle = 0; endAngle = isSecondaryTile ? Math.PI * 0.75 : Math.PI / 2; }
  }

  // Ties
  ctx.strokeStyle = TIE_COLOR;
  ctx.lineWidth = 1;
  const arcSpan = endAngle - startAngle;
  for (let i = 0; i <= 5; i++) {
    const a = startAngle + (arcSpan * i) / 5;
    ctx.beginPath();
    ctx.moveTo(arcCX + Math.cos(a) * innerR, arcCY + Math.sin(a) * innerR);
    ctx.lineTo(arcCX + Math.cos(a) * outerR, arcCY + Math.sin(a) * outerR);
    ctx.stroke();
  }

  // Rails
  ctx.strokeStyle = color;
  ctx.lineWidth = RAIL_W;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, innerR, startAngle, endAngle);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, outerR, startAngle, endAngle);
  ctx.stroke();

}

/** Draw a station tile (part of the roller coaster station) */
export function drawTrackStation(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  color: string,
  isEntry: boolean,
): void {
  rect(ctx, 0, 0, T, T, '#b0a898');

  // Station roof
  rect(ctx, 0, 0, T, 3, '#c0392b');
  rect(ctx, 0, 0, T, 1, '#e74c3c');

  // Platform
  rect(ctx, 0, 10, T, 3, '#c8b898');
  rect(ctx, 0, 9, T, 1, '#a89878');

  // Track through the station
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    rect(ctx, 3, 0, RAIL_W, T, color);
    rect(ctx, 11, 0, RAIL_W, T, color);
    for (let y = 0; y < T; y += 3) {
      rect(ctx, 3, y, 10, 1, TIE_COLOR);
    }
  } else {
    rect(ctx, 0, 3, T, RAIL_W, color);
    rect(ctx, 0, 11, T, RAIL_W, color);
    for (let x = 0; x < T; x += 3) {
      rect(ctx, x, 3, 1, 10, TIE_COLOR);
    }
  }

  if (isEntry) {
    // Entry sign
    rect(ctx, 2, 3, 7, 4, '#27ae60');
    ctx.font = '4px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('GO', 3, 7);
  }

  // Waiting line indicators
  for (let i = 0; i < 3; i++) {
    rect(ctx, 2 + i * 4, 11, 2, 2, '#888');
  }

  rect(ctx, 0, 0, T, 1, '#0004');
  rect(ctx, 0, 0, 1, T, '#0004');
}

/** Draw the cart sprite for the animation */
export function drawCoasterCart(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  cartColor: string,
): void {
  // Cart body (6x4 px or 4x6 px depending on direction)
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    // Vertical cart
    rect(ctx, 5, 4, 6, 8, cartColor);
    // Top/windshield
    rect(ctx, 6, dir === TrackDirection.North ? 4 : 10, 4, 2, '#ffffff88');
    // Wheels
    rect(ctx, 4, 5, 1, 2, '#333');
    rect(ctx, 4, 9, 1, 2, '#333');
    rect(ctx, 11, 5, 1, 2, '#333');
    rect(ctx, 11, 9, 1, 2, '#333');
    // Highlight
    rect(ctx, 6, 5, 4, 1, '#ffffff44');
  } else {
    // Horizontal cart
    rect(ctx, 4, 5, 8, 6, cartColor);
    // Windshield
    rect(ctx, dir === TrackDirection.East ? 10 : 4, 6, 2, 4, '#ffffff88');
    // Wheels
    rect(ctx, 5, 4, 2, 1, '#333');
    rect(ctx, 9, 4, 2, 1, '#333');
    rect(ctx, 5, 11, 2, 1, '#333');
    rect(ctx, 9, 11, 2, 1, '#333');
    // Highlight
    rect(ctx, 5, 6, 1, 4, '#ffffff44');
  }
}

/* ── Narrow Gauge (Park Train) sprite functions ── */

const NG_INNER = 5;
const NG_OUTER = 9;
const NG_TIE_COLOR = '#a08060';
const NG_RAIL_W = 2;

function drawNarrowGaugeStraight(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  color: string,
): void {
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    for (let y = 0; y < T; y += 3) {
      rect(ctx, NG_INNER - 1, y, NG_OUTER - NG_INNER + NG_RAIL_W + 1, 1, NG_TIE_COLOR);
    }
    rect(ctx, NG_INNER, 0, NG_RAIL_W, T, color);
    rect(ctx, NG_OUTER, 0, NG_RAIL_W, T, color);
  } else {
    for (let x = 0; x < T; x += 3) {
      rect(ctx, x, NG_INNER - 1, 1, NG_OUTER - NG_INNER + NG_RAIL_W + 1, NG_TIE_COLOR);
    }
    rect(ctx, 0, NG_INNER, T, NG_RAIL_W, color);
    rect(ctx, 0, NG_OUTER, T, NG_RAIL_W, color);
  }
}

function drawNarrowGaugeTurn(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  turnRight: boolean,
  color: string,
): void {
  const innerR = NG_INNER;
  const outerR = NG_OUTER + NG_RAIL_W;
  const { arcCX, arcCY, startAngle, endAngle } = resolveArcParams(dir, turnRight);

  ctx.strokeStyle = NG_TIE_COLOR;
  ctx.lineWidth = 1;
  for (let a = startAngle; a <= endAngle; a += 0.3) {
    ctx.beginPath();
    ctx.moveTo(arcCX + Math.cos(a) * innerR, arcCY + Math.sin(a) * innerR);
    ctx.lineTo(arcCX + Math.cos(a) * outerR, arcCY + Math.sin(a) * outerR);
    ctx.stroke();
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = NG_RAIL_W;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, innerR, startAngle, endAngle);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, outerR, startAngle, endAngle);
  ctx.stroke();

  const exitDir = turnRight ? rotateScreenRight(dir) : rotateScreenLeft(dir);
  drawNarrowGaugeStub(ctx, dir, color);
  drawNarrowGaugeStub(ctx, exitDir, color);
}

function drawNarrowGaugeStub(ctx: OffscreenCanvasRenderingContext2D, d: TrackDirection, color: string): void {
  if (d === TrackDirection.North) {
    rect(ctx, NG_INNER, 0, NG_RAIL_W, 4, color);
    rect(ctx, NG_OUTER, 0, NG_RAIL_W, 4, color);
  } else if (d === TrackDirection.South) {
    rect(ctx, NG_INNER, T - 4, NG_RAIL_W, 4, color);
    rect(ctx, NG_OUTER, T - 4, NG_RAIL_W, 4, color);
  } else if (d === TrackDirection.East) {
    rect(ctx, T - 4, NG_INNER, 4, NG_RAIL_W, color);
    rect(ctx, T - 4, NG_OUTER, 4, NG_RAIL_W, color);
  } else {
    rect(ctx, 0, NG_INNER, 4, NG_RAIL_W, color);
    rect(ctx, 0, NG_OUTER, 4, NG_RAIL_W, color);
  }
}

function drawNarrowGaugeLargeTurn(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  turnLeft: boolean,
  color: string,
  isSecondary: boolean,
): void {
  const innerR = isSecondary ? 2 : NG_INNER;
  const outerR = isSecondary ? NG_OUTER + 1 : 13;
  const { arcCX, arcCY, startAngle, endAngle } = resolveLargeArcParams(dir, turnLeft, isSecondary);

  ctx.strokeStyle = NG_TIE_COLOR;
  ctx.lineWidth = 1;
  const span = endAngle - startAngle;
  for (let i = 0; i <= 5; i++) {
    const a = startAngle + (span * i) / 5;
    ctx.beginPath();
    ctx.moveTo(arcCX + Math.cos(a) * innerR, arcCY + Math.sin(a) * innerR);
    ctx.lineTo(arcCX + Math.cos(a) * outerR, arcCY + Math.sin(a) * outerR);
    ctx.stroke();
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = NG_RAIL_W;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, innerR, startAngle, endAngle);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, outerR, startAngle, endAngle);
  ctx.stroke();
}

function drawNarrowGaugeStation(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  color: string,
  isEntry: boolean,
): void {
  rect(ctx, 0, 0, T, T, '#c8d6c0');
  rect(ctx, 0, 0, T, 3, '#2e7d32');
  rect(ctx, 0, 0, T, 1, '#4caf50');
  rect(ctx, 0, 10, T, 3, '#c8b898');
  rect(ctx, 0, 9, T, 1, '#a89878');

  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    rect(ctx, NG_INNER, 0, NG_RAIL_W, T, color);
    rect(ctx, NG_OUTER, 0, NG_RAIL_W, T, color);
    for (let y = 0; y < T; y += 3) rect(ctx, NG_INNER, y, NG_OUTER - NG_INNER + NG_RAIL_W, 1, NG_TIE_COLOR);
  } else {
    rect(ctx, 0, NG_INNER, T, NG_RAIL_W, color);
    rect(ctx, 0, NG_OUTER, T, NG_RAIL_W, color);
    for (let x = 0; x < T; x += 3) rect(ctx, x, NG_INNER, 1, NG_OUTER - NG_INNER + NG_RAIL_W, NG_TIE_COLOR);
  }

  if (isEntry) {
    rect(ctx, 2, 3, 7, 4, '#1b5e20');
    ctx.font = '4px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('GO', 3, 7);
  }
  for (let i = 0; i < 3; i++) rect(ctx, 2 + i * 4, 11, 2, 2, '#888');
  rect(ctx, 0, 0, T, 1, '#0004');
  rect(ctx, 0, 0, 1, T, '#0004');
}

/** Draw the park train cart */
export function drawTrainCart(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  cartColor: string,
): void {
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    // Wider, lower train car
    rect(ctx, 4, 3, 8, 10, cartColor);
    rect(ctx, 5, dir === TrackDirection.North ? 3 : 11, 6, 2, '#ffffff66');
    // Roof stripe
    rect(ctx, 5, 5, 6, 1, '#ffffff33');
    // Wheels
    rect(ctx, 3, 5, 1, 2, '#444');
    rect(ctx, 3, 9, 1, 2, '#444');
    rect(ctx, 12, 5, 1, 2, '#444');
    rect(ctx, 12, 9, 1, 2, '#444');
  } else {
    rect(ctx, 3, 4, 10, 8, cartColor);
    rect(ctx, dir === TrackDirection.East ? 11 : 3, 5, 2, 6, '#ffffff66');
    rect(ctx, 5, 5, 1, 6, '#ffffff33');
    rect(ctx, 5, 3, 2, 1, '#444');
    rect(ctx, 9, 3, 2, 1, '#444');
    rect(ctx, 5, 12, 2, 1, '#444');
    rect(ctx, 9, 12, 2, 1, '#444');
  }
}

/* ── Water Channel (Log Flume) sprite functions ── */

const WC_WALL_INNER = 2;
const WC_WALL_OUTER = 12;
const WC_WALL_W = 2;
const WC_WALL_COLOR = '#6b4226';
const WC_WATER_COLOR = '#3498db';
const WC_WATER_DARK = '#2980b9';
const WC_PLANK_COLOR = '#8b6914';

function drawWaterFill(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
): void {
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    for (let y = 0; y < T; y++) {
      const c = y % 2 === 0 ? WC_WATER_COLOR : WC_WATER_DARK;
      rect(ctx, WC_WALL_INNER + WC_WALL_W, y, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, 1, c);
    }
  } else {
    for (let x = 0; x < T; x++) {
      const c = x % 2 === 0 ? WC_WATER_COLOR : WC_WATER_DARK;
      rect(ctx, x, WC_WALL_INNER + WC_WALL_W, 1, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, c);
    }
  }
}

function drawWaterChannelSupportBeams(ctx: OffscreenCanvasRenderingContext2D, height: number): void {
  if (height <= 0) return;
  const levels = Math.min(8, height);
  for (let i = 0; i < levels; i++) {
    const y = T - 1 - i * 2;
    rect(ctx, 3, y, 2, 2, WC_WALL_COLOR);
    rect(ctx, 11, y, 2, 2, WC_WALL_COLOR);
    rect(ctx, 5, y, 6, 1, '#8b5e3c');
  }
}

function drawWaterChannelStraight(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  color: string,
  height: number,
): void {
  drawWaterChannelSupportBeams(ctx, height);
  drawWaterFill(ctx, dir);

  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    rect(ctx, WC_WALL_INNER, 0, WC_WALL_W, T, color);
    rect(ctx, WC_WALL_OUTER, 0, WC_WALL_W, T, color);
    for (let y = 0; y < T; y += 4) {
      rect(ctx, WC_WALL_INNER + WC_WALL_W, y, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, 1, WC_PLANK_COLOR);
    }
  } else {
    rect(ctx, 0, WC_WALL_INNER, T, WC_WALL_W, color);
    rect(ctx, 0, WC_WALL_OUTER, T, WC_WALL_W, color);
    for (let x = 0; x < T; x += 4) {
      rect(ctx, x, WC_WALL_INNER + WC_WALL_W, 1, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, WC_PLANK_COLOR);
    }
  }
}

function drawWaterChannelTurn(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  turnRight: boolean,
  color: string,
  height: number,
): void {
  drawWaterChannelSupportBeams(ctx, height);
  const innerR = WC_WALL_INNER + WC_WALL_W;
  const outerR = WC_WALL_OUTER;
  const { arcCX, arcCY, startAngle, endAngle } = resolveArcParams(dir, turnRight);

  // Water fill along arc
  ctx.fillStyle = WC_WATER_COLOR;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, outerR, startAngle, endAngle);
  ctx.arc(arcCX, arcCY, innerR, endAngle, startAngle, true);
  ctx.closePath();
  ctx.fill();

  // Walls
  ctx.strokeStyle = color;
  ctx.lineWidth = WC_WALL_W;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, WC_WALL_INNER + 1, startAngle, endAngle);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, WC_WALL_OUTER + 1, startAngle, endAngle);
  ctx.stroke();

  // Planks
  ctx.strokeStyle = WC_PLANK_COLOR;
  ctx.lineWidth = 1;
  for (let a = startAngle; a <= endAngle; a += 0.4) {
    ctx.beginPath();
    ctx.moveTo(arcCX + Math.cos(a) * innerR, arcCY + Math.sin(a) * innerR);
    ctx.lineTo(arcCX + Math.cos(a) * outerR, arcCY + Math.sin(a) * outerR);
    ctx.stroke();
  }

  const exitDir = turnRight ? rotateScreenRight(dir) : rotateScreenLeft(dir);
  drawWaterChannelStub(ctx, dir, color);
  drawWaterChannelStub(ctx, exitDir, color);
}

function drawWaterChannelStub(ctx: OffscreenCanvasRenderingContext2D, d: TrackDirection, color: string): void {
  if (d === TrackDirection.North) {
    rect(ctx, WC_WALL_INNER + WC_WALL_W, 0, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, 4, WC_WATER_COLOR);
    rect(ctx, WC_WALL_INNER, 0, WC_WALL_W, 4, color);
    rect(ctx, WC_WALL_OUTER, 0, WC_WALL_W, 4, color);
  } else if (d === TrackDirection.South) {
    rect(ctx, WC_WALL_INNER + WC_WALL_W, T - 4, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, 4, WC_WATER_COLOR);
    rect(ctx, WC_WALL_INNER, T - 4, WC_WALL_W, 4, color);
    rect(ctx, WC_WALL_OUTER, T - 4, WC_WALL_W, 4, color);
  } else if (d === TrackDirection.East) {
    rect(ctx, T - 4, WC_WALL_INNER + WC_WALL_W, 4, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, WC_WATER_COLOR);
    rect(ctx, T - 4, WC_WALL_INNER, 4, WC_WALL_W, color);
    rect(ctx, T - 4, WC_WALL_OUTER, 4, WC_WALL_W, color);
  } else {
    rect(ctx, 0, WC_WALL_INNER + WC_WALL_W, 4, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, WC_WATER_COLOR);
    rect(ctx, 0, WC_WALL_INNER, 4, WC_WALL_W, color);
    rect(ctx, 0, WC_WALL_OUTER, 4, WC_WALL_W, color);
  }
}

function drawWaterChannelHill(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  goingUp: boolean,
  color: string,
  height: number,
  transition: TrackHillTransition,
): void {
  drawWaterChannelSupportBeams(ctx, height + 1);
  rect(ctx, 7, 0, 2, T, WC_WALL_COLOR);

  const transitionLen = 4;
  const getOff = (pos: number, asc: boolean, fs: boolean, fe: boolean): number => {
    const mx = T - 1;
    const base = asc ? Math.floor((mx - pos) * 4 / T) : Math.floor(pos * 4 / T);
    const sOff = asc ? Math.floor(mx * 4 / T) : 0;
    const eOff = asc ? 0 : Math.floor(mx * 4 / T);
    let off = base;
    if (fs && pos < transitionLen) { const t = pos / (transitionLen - 1); off = Math.round(sOff + (off - sOff) * t); }
    if (fe && pos >= T - transitionLen) { const t = (mx - pos) / (transitionLen - 1); off = Math.round(eOff + (off - eOff) * t); }
    return off;
  };

  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    const asc = (dir === TrackDirection.North) === goingUp;
    const entry = dir === TrackDirection.South;
    const fs = ((transition & TrackHillTransition.FlatEntry) !== 0 && entry) || ((transition & TrackHillTransition.FlatExit) !== 0 && !entry);
    const fe = ((transition & TrackHillTransition.FlatEntry) !== 0 && !entry) || ((transition & TrackHillTransition.FlatExit) !== 0 && entry);
    for (let y = 0; y < T; y++) {
      const off = getOff(y, asc, fs, fe);
      const wc = y % 2 === 0 ? WC_WATER_COLOR : WC_WATER_DARK;
      rect(ctx, WC_WALL_INNER + WC_WALL_W, y - off, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, 1, wc);
      rect(ctx, WC_WALL_INNER, y - off, WC_WALL_W, 1, color);
      rect(ctx, WC_WALL_OUTER, y - off, WC_WALL_W, 1, color);
    }
    const arrowColor = goingUp ? '#4caf50' : '#f44336';
    rect(ctx, 7, goingUp ? 2 : T - 4, 2, 3, arrowColor);
  } else {
    const asc = (dir === TrackDirection.West) === goingUp;
    const entry = dir === TrackDirection.East;
    const fs = ((transition & TrackHillTransition.FlatEntry) !== 0 && entry) || ((transition & TrackHillTransition.FlatExit) !== 0 && !entry);
    const fe = ((transition & TrackHillTransition.FlatEntry) !== 0 && !entry) || ((transition & TrackHillTransition.FlatExit) !== 0 && entry);
    for (let x = 0; x < T; x++) {
      const off = getOff(x, asc, fs, fe);
      const wc = x % 2 === 0 ? WC_WATER_COLOR : WC_WATER_DARK;
      rect(ctx, x, WC_WALL_INNER + WC_WALL_W - off, 1, WC_WALL_OUTER - WC_WALL_INNER - WC_WALL_W, wc);
      rect(ctx, x, WC_WALL_INNER - off, 1, WC_WALL_W, color);
      rect(ctx, x, WC_WALL_OUTER - off, 1, WC_WALL_W, color);
    }
    const arrowColor = goingUp ? '#4caf50' : '#f44336';
    rect(ctx, goingUp ? 2 : T - 4, 7, 3, 2, arrowColor);
  }
}

function drawWaterChannelLargeTurn(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  turnLeft: boolean,
  color: string,
  height: number,
  isSecondary: boolean,
): void {
  drawWaterChannelSupportBeams(ctx, height);
  const innerR = isSecondary ? 2 : WC_WALL_INNER + WC_WALL_W;
  const outerR = isSecondary ? 10 : WC_WALL_OUTER;
  const { arcCX, arcCY, startAngle, endAngle } = resolveLargeArcParams(dir, turnLeft, isSecondary);

  ctx.fillStyle = WC_WATER_COLOR;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, outerR, startAngle, endAngle);
  ctx.arc(arcCX, arcCY, innerR, endAngle, startAngle, true);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = WC_WALL_W;
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, isSecondary ? 2 : WC_WALL_INNER + 1, startAngle, endAngle);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(arcCX, arcCY, isSecondary ? 10 : WC_WALL_OUTER + 1, startAngle, endAngle);
  ctx.stroke();
}

function drawWaterChannelStation(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  color: string,
  isEntry: boolean,
): void {
  rect(ctx, 0, 0, T, T, '#8fb8d0');
  rect(ctx, 0, 0, T, 3, '#2980b9');
  rect(ctx, 0, 0, T, 1, '#3498db');
  rect(ctx, 0, 10, T, 3, '#b0a898');
  rect(ctx, 0, 9, T, 1, '#a89878');

  drawWaterFill(ctx, dir);
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    rect(ctx, WC_WALL_INNER, 0, WC_WALL_W, T, color);
    rect(ctx, WC_WALL_OUTER, 0, WC_WALL_W, T, color);
  } else {
    rect(ctx, 0, WC_WALL_INNER, T, WC_WALL_W, color);
    rect(ctx, 0, WC_WALL_OUTER, T, WC_WALL_W, color);
  }

  if (isEntry) {
    rect(ctx, 2, 3, 7, 4, '#1a5276');
    ctx.font = '4px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('GO', 3, 7);
  }
  for (let i = 0; i < 3; i++) rect(ctx, 2 + i * 4, 11, 2, 2, '#888');
  rect(ctx, 0, 0, T, 1, '#0004');
  rect(ctx, 0, 0, 1, T, '#0004');
}

/** Draw the log flume boat */
export function drawFlumeBoat(
  ctx: OffscreenCanvasRenderingContext2D,
  dir: TrackDirection,
  cartColor: string,
): void {
  if (dir === TrackDirection.North || dir === TrackDirection.South) {
    // Vertical log hull
    rect(ctx, 5, 3, 6, 10, cartColor);
    // Rounded ends
    rect(ctx, 6, dir === TrackDirection.North ? 3 : 11, 4, 2, '#a0522d');
    // Water line
    rect(ctx, 5, 11, 6, 1, '#2980b9');
    // Seat / highlight
    rect(ctx, 6, 6, 4, 3, '#d4a574');
  } else {
    rect(ctx, 3, 5, 10, 6, cartColor);
    rect(ctx, dir === TrackDirection.East ? 11 : 3, 6, 2, 4, '#a0522d');
    rect(ctx, 3, 11, 10, 1, '#2980b9');
    rect(ctx, 6, 6, 3, 4, '#d4a574');
  }
}

/* ── Shared arc parameter helpers ── */

function resolveArcParams(dir: TrackDirection, turnRight: boolean): { arcCX: number; arcCY: number; startAngle: number; endAngle: number } {
  let arcCX: number, arcCY: number, startAngle: number, endAngle: number;
  if (dir === TrackDirection.North) {
    if (turnRight) { arcCX = 0; arcCY = 0; startAngle = 0; endAngle = Math.PI / 2; }
    else { arcCX = T; arcCY = 0; startAngle = Math.PI / 2; endAngle = Math.PI; }
  } else if (dir === TrackDirection.East) {
    if (turnRight) { arcCX = T; arcCY = 0; startAngle = Math.PI / 2; endAngle = Math.PI; }
    else { arcCX = T; arcCY = T; startAngle = Math.PI; endAngle = Math.PI * 1.5; }
  } else if (dir === TrackDirection.South) {
    if (turnRight) { arcCX = T; arcCY = T; startAngle = Math.PI; endAngle = Math.PI * 1.5; }
    else { arcCX = 0; arcCY = T; startAngle = Math.PI * 1.5; endAngle = Math.PI * 2; }
  } else {
    if (turnRight) { arcCX = 0; arcCY = T; startAngle = Math.PI * 1.5; endAngle = Math.PI * 2; }
    else { arcCX = 0; arcCY = 0; startAngle = 0; endAngle = Math.PI / 2; }
  }
  return { arcCX, arcCY, startAngle, endAngle };
}

function resolveLargeArcParams(dir: TrackDirection, turnLeft: boolean, isSecondary: boolean): { arcCX: number; arcCY: number; startAngle: number; endAngle: number } {
  let arcCX: number, arcCY: number, startAngle: number, endAngle: number;
  if (dir === TrackDirection.North) {
    if (turnLeft) { arcCX = 0; arcCY = isSecondary ? T : 0; startAngle = isSecondary ? -Math.PI / 4 : 0; endAngle = Math.PI / 2; }
    else { arcCX = T; arcCY = isSecondary ? T : 0; startAngle = Math.PI / 2; endAngle = isSecondary ? Math.PI * 1.25 : Math.PI; }
  } else if (dir === TrackDirection.East) {
    if (turnLeft) { arcCX = isSecondary ? 0 : T; arcCY = 0; startAngle = isSecondary ? Math.PI / 4 : Math.PI / 2; endAngle = Math.PI; }
    else { arcCX = isSecondary ? 0 : T; arcCY = T; startAngle = Math.PI; endAngle = isSecondary ? Math.PI * 1.75 : Math.PI * 1.5; }
  } else if (dir === TrackDirection.South) {
    if (turnLeft) { arcCX = T; arcCY = isSecondary ? 0 : T; startAngle = Math.PI; endAngle = isSecondary ? Math.PI * 1.75 : Math.PI * 1.5; }
    else { arcCX = 0; arcCY = isSecondary ? 0 : T; startAngle = isSecondary ? Math.PI * 1.25 : Math.PI * 1.5; endAngle = Math.PI * 2; }
  } else {
    if (turnLeft) { arcCX = isSecondary ? T : 0; arcCY = T; startAngle = isSecondary ? Math.PI * 1.25 : Math.PI * 1.5; endAngle = Math.PI * 2; }
    else { arcCX = isSecondary ? T : 0; arcCY = 0; startAngle = 0; endAngle = isSecondary ? Math.PI * 0.75 : Math.PI / 2; }
  }
  return { arcCX, arcCY, startAngle, endAngle };
}

/** Get a drawer function for a specific track piece, to be used in atlas generation */
export function getTrackPieceDrawer(
  pieceType: TrackPieceType,
  dir: TrackDirection,
  color: string,
  height: number,
  isSecondaryTile: boolean = false,
  hillTransition: TrackHillTransition = TrackHillTransition.None,
  spriteStyle: TrackSpriteStyle = 'rails',
): (ctx: OffscreenCanvasRenderingContext2D) => void {
  if (spriteStyle === 'narrowGauge') {
    return getNarrowGaugeDrawer(pieceType, dir, color, height, isSecondaryTile);
  }
  if (spriteStyle === 'waterChannel') {
    return getWaterChannelDrawer(pieceType, dir, color, height, isSecondaryTile, hillTransition);
  }
  // Default: rails (roller coaster)
  switch (pieceType) {
    case TrackPieceType.Straight:
      return (ctx) => drawTrackStraight(ctx, dir, color, height);
    case TrackPieceType.TurnLeft:
      return (ctx) => drawTrackTurn(ctx, dir, false, color, height);
    case TrackPieceType.TurnRight:
      return (ctx) => drawTrackTurn(ctx, dir, true, color, height);
    case TrackPieceType.HillUp:
      return (ctx) => drawTrackHill(ctx, dir, true, color, height, hillTransition);
    case TrackPieceType.HillDown:
      return (ctx) => drawTrackHill(ctx, dir, false, color, height, hillTransition);
    case TrackPieceType.LargeTurnLeft:
      return (ctx) => drawTrackLargeTurn(ctx, dir, false, color, height, isSecondaryTile);
    case TrackPieceType.LargeTurnRight:
      return (ctx) => drawTrackLargeTurn(ctx, dir, true, color, height, isSecondaryTile);
    case TrackPieceType.Station:
      return (ctx) => drawTrackStation(ctx, dir, color, !isSecondaryTile);
    default:
      return (ctx) => drawTrackStraight(ctx, dir, color, height);
  }
}

/** Get the appropriate cart drawer for a sprite style */
export function getCartDrawer(
  dir: TrackDirection,
  cartColor: string,
  spriteStyle: TrackSpriteStyle = 'rails',
): (ctx: OffscreenCanvasRenderingContext2D) => void {
  if (spriteStyle === 'narrowGauge') return (ctx) => drawTrainCart(ctx, dir, cartColor);
  if (spriteStyle === 'waterChannel') return (ctx) => drawFlumeBoat(ctx, dir, cartColor);
  return (ctx) => drawCoasterCart(ctx, dir, cartColor);
}

function getNarrowGaugeDrawer(
  pieceType: TrackPieceType,
  dir: TrackDirection,
  color: string,
  _height: number,
  isSecondary: boolean,
): (ctx: OffscreenCanvasRenderingContext2D) => void {
  switch (pieceType) {
    case TrackPieceType.Straight:
      return (ctx) => drawNarrowGaugeStraight(ctx, dir, color);
    case TrackPieceType.TurnLeft:
      return (ctx) => drawNarrowGaugeTurn(ctx, dir, false, color);
    case TrackPieceType.TurnRight:
      return (ctx) => drawNarrowGaugeTurn(ctx, dir, true, color);
    case TrackPieceType.LargeTurnLeft:
      return (ctx) => drawNarrowGaugeLargeTurn(ctx, dir, false, color, isSecondary);
    case TrackPieceType.LargeTurnRight:
      return (ctx) => drawNarrowGaugeLargeTurn(ctx, dir, true, color, isSecondary);
    case TrackPieceType.Station:
      return (ctx) => drawNarrowGaugeStation(ctx, dir, color, !isSecondary);
    default:
      return (ctx) => drawNarrowGaugeStraight(ctx, dir, color);
  }
}

function getWaterChannelDrawer(
  pieceType: TrackPieceType,
  dir: TrackDirection,
  color: string,
  height: number,
  isSecondary: boolean,
  hillTransition: TrackHillTransition,
): (ctx: OffscreenCanvasRenderingContext2D) => void {
  switch (pieceType) {
    case TrackPieceType.Straight:
      return (ctx) => drawWaterChannelStraight(ctx, dir, color, height);
    case TrackPieceType.TurnLeft:
      return (ctx) => drawWaterChannelTurn(ctx, dir, false, color, height);
    case TrackPieceType.TurnRight:
      return (ctx) => drawWaterChannelTurn(ctx, dir, true, color, height);
    case TrackPieceType.HillUp:
      return (ctx) => drawWaterChannelHill(ctx, dir, true, color, height, hillTransition);
    case TrackPieceType.HillDown:
      return (ctx) => drawWaterChannelHill(ctx, dir, false, color, height, hillTransition);
    case TrackPieceType.LargeTurnLeft:
      return (ctx) => drawWaterChannelLargeTurn(ctx, dir, false, color, height, isSecondary);
    case TrackPieceType.LargeTurnRight:
      return (ctx) => drawWaterChannelLargeTurn(ctx, dir, true, color, height, isSecondary);
    case TrackPieceType.Station:
      return (ctx) => drawWaterChannelStation(ctx, dir, color, !isSecondary);
    default:
      return (ctx) => drawWaterChannelStraight(ctx, dir, color, height);
  }
}
