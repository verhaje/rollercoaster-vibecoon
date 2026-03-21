export function advanceCartProgress(
  current: number,
  paused: boolean,
  step: number = 0.003,
): number {
  if (paused) return current;
  let next = current + step;
  while (next >= 1) next -= 1;
  while (next < 0) next += 1;
  return next;
}

export function trackTextureKey(
  type: number,
  direction: number,
  color: string,
  height: number,
  spriteStyle: string = 'rails',
): string {
  return `ct_${spriteStyle}_${type}_${direction}_${color}_${height}`;
}

export function cartTextureKey(direction: number, color: string, spriteStyle: string = 'rails'): string {
  return `cart_${spriteStyle}_${direction}_${color}`;
}

export function resolveCornerRenderType(
  pieceType: number,
  entryX: number,
  entryY: number,
  entryDirection: number,
  entryHeight: number,
  nextX: number,
  nextY: number,
): number {
  // TrackPieceType numeric values are stable in game code:
  // 1=TurnLeft, 2=TurnRight, 5=LargeTurnLeft, 6=LargeTurnRight.
  const isSmallTurn = pieceType === 1 || pieceType === 2;
  const isLargeTurn = pieceType === 5 || pieceType === 6;
  if (!isSmallTurn && !isLargeTurn) return pieceType;

  const leftType = isLargeTurn ? 5 : 1;
  const rightType = isLargeTurn ? 6 : 2;

  const leftNext = nextPositionForPiece(leftType, entryX, entryY, entryDirection, entryHeight);
  if (leftNext.x === nextX && leftNext.y === nextY) return leftType;

  const rightNext = nextPositionForPiece(rightType, entryX, entryY, entryDirection, entryHeight);
  if (rightNext.x === nextX && rightNext.y === nextY) return rightType;

  return pieceType;
}

function nextPositionForPiece(
  type: number,
  x: number,
  y: number,
  direction: number,
  height: number,
): { x: number; y: number; direction: number; height: number } {
  const turn = type === 1 || type === 2 || type === 5 || type === 6;
  const isLeft = type === 1 || type === 5;
  const isLarge = type === 5 || type === 6;

  const newDirection = turn
    ? (isLeft ? ((direction + 1) % 4) : ((direction + 3) % 4))
    : direction;

  const advanceDirection = turn ? newDirection : direction;
  const [adx, ady] = dirOffset(advanceDirection);

  if (isLarge) {
    const sideDirection = isLeft ? ((direction + 1) % 4) : ((direction + 3) % 4);
    const [sdx, sdy] = dirOffset(sideDirection);
    return {
      x: x + sdx + adx,
      y: y + sdy + ady,
      direction: newDirection,
      height,
    };
  }

  return {
    x: x + adx,
    y: y + ady,
    direction: newDirection,
    height,
  };
}

function dirOffset(direction: number): [number, number] {
  if (direction === 0) return [0, -1];
  if (direction === 1) return [1, 0];
  if (direction === 2) return [0, 1];
  return [-1, 0];
}
