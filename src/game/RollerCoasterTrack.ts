/* =============================================
   Roller Coaster Custom Track Builder
   Manages track pieces, placement, direction,
   cart animation, and track scoring.
   ============================================= */

import { TILE_ATTRACTION_BASE, TileType, type SimExports } from './types';
import { getTrackConfig, isTrackAttraction, type TrackStyleConfig } from './config/tracks';

/** Direction the track is heading */
export const enum TrackDirection {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

/** Types of track pieces */
export const enum TrackPieceType {
  Straight = 0,
  TurnLeft = 1,
  TurnRight = 2,
  HillUp = 3,
  HillDown = 4,
  LargeTurnLeft = 5,
  LargeTurnRight = 6,
  Station = 7,
}

export interface TrackPiece {
  type: TrackPieceType;
  /** World tile X */
  x: number;
  /** World tile Y */
  y: number;
  /** Direction this piece exits toward */
  direction: TrackDirection;
  /** Height level (0-based, station starts at 0) */
  height: number;
}

export interface RollerCoasterTrackData {
  /** The instance id from WASM placement */
  instanceId: number;
  /** Attraction template id (determines track style) */
  trackStyleId: number;
  /** Station origin tile */
  stationX: number;
  stationY: number;
  /** Track color hex */
  trackColor: string;
  /** Cart color hex */
  cartColor: string;
  /** Station length in tiles (includes implicit starter segment) */
  stationLength: number;
  /** Ordered list of track pieces (first is station departure end, last connects back) */
  pieces: TrackPiece[];
  /** Whether the track loop is complete (back at station) */
  complete: boolean;
  /** Calculated stats */
  excitement: number;
  nausea: number;
  satisfaction: number;
}

export interface CoasterTrackSnapshot {
  tracks: RollerCoasterTrackData[];
  activeBuild: {
    instanceId: number;
    trackStyleId: number;
    stationX: number;
    stationY: number;
    stationDir: TrackDirection;
    trackColor: string;
    cartColor: string;
    stationLength: number;
    pieces: TrackPiece[];
    nextX: number;
    nextY: number;
    nextDir: TrackDirection;
    nextHeight: number;
    occupiedTiles: string[];
    pieceCosts: number[];
  } | null;
}

export const TRACK_PIECE_DEFS: Record<TrackPieceType, { name: string; icon: string; tiles: number; heightDelta: number }> = {
  [TrackPieceType.Straight]: { name: 'Straight', icon: '➡️', tiles: 1, heightDelta: 0 },
  [TrackPieceType.TurnLeft]: { name: 'Turn Left', icon: '↩️', tiles: 1, heightDelta: 0 },
  [TrackPieceType.TurnRight]: { name: 'Turn Right', icon: '↪️', tiles: 1, heightDelta: 0 },
  [TrackPieceType.HillUp]: { name: 'Hill Up', icon: '⬆️', tiles: 1, heightDelta: 1 },
  [TrackPieceType.HillDown]: { name: 'Hill Down', icon: '⬇️', tiles: 1, heightDelta: -1 },
  [TrackPieceType.LargeTurnLeft]: { name: 'Large Turn Left', icon: '🔄', tiles: 2, heightDelta: 0 },
  [TrackPieceType.LargeTurnRight]: { name: 'Large Turn Right', icon: '🔃', tiles: 2, heightDelta: 0 },
  [TrackPieceType.Station]: { name: 'Station', icon: '🏠', tiles: 1, heightDelta: 0 },
};

const MAX_STATION_LENGTH = 6;

/** Direction offset deltas: [dx, dy] for each direction */
const DIR_OFFSETS: Record<TrackDirection, [number, number]> = {
  [TrackDirection.North]: [0, -1],
  [TrackDirection.East]: [1, 0],
  [TrackDirection.South]: [0, 1],
  [TrackDirection.West]: [-1, 0],
};

const TREE_CLEAR_COST = 15;

function rotateLeft(dir: TrackDirection): TrackDirection {
  return ((dir + 3) % 4) as TrackDirection;
}

function rotateRight(dir: TrackDirection): TrackDirection {
  return ((dir + 1) % 4) as TrackDirection;
}

/**
 * Get all tiles occupied by a track piece at the given position/direction.
 * For large turns, this returns the entry tile + the tile to the side.
 */
export function getTrackPieceTiles(
  type: TrackPieceType,
  x: number,
  y: number,
  direction: TrackDirection,
): Array<{ x: number; y: number }> {
  const tiles: Array<{ x: number; y: number }> = [{ x, y }];

  if (type === TrackPieceType.LargeTurnLeft) {
    const sideDir = rotateRight(direction);
    const [dx, dy] = DIR_OFFSETS[sideDir];
    tiles.push({ x: x + dx, y: y + dy });
  } else if (type === TrackPieceType.LargeTurnRight) {
    const sideDir = rotateLeft(direction);
    const [dx, dy] = DIR_OFFSETS[sideDir];
    tiles.push({ x: x + dx, y: y + dy });
  }

  return tiles;
}

/**
 * Compute the next placement position and direction after placing a piece.
 */
export function getNextPosition(
  type: TrackPieceType,
  x: number,
  y: number,
  direction: TrackDirection,
  height: number,
): { x: number; y: number; direction: TrackDirection; height: number } {
  const def = TRACK_PIECE_DEFS[type];
  let newDir = direction;
  let newHeight = height + def.heightDelta;
  if (newHeight < 0) newHeight = 0;

  if (type === TrackPieceType.TurnLeft) {
    newDir = rotateRight(direction);
  } else if (type === TrackPieceType.TurnRight) {
    newDir = rotateLeft(direction);
  } else if (type === TrackPieceType.LargeTurnLeft) {
    newDir = rotateRight(direction);
  } else if (type === TrackPieceType.LargeTurnRight) {
    newDir = rotateLeft(direction);
  }

  // Advance one tile in the new direction (or the current direction for straight/hills)
  const advanceDir = (type === TrackPieceType.TurnLeft || type === TrackPieceType.TurnRight
    || type === TrackPieceType.LargeTurnLeft || type === TrackPieceType.LargeTurnRight)
    ? newDir : direction;
  const [dx, dy] = DIR_OFFSETS[advanceDir];

  // For large turns, advance from beyond the second tile
  if (type === TrackPieceType.LargeTurnLeft || type === TrackPieceType.LargeTurnRight) {
    const sideDir = type === TrackPieceType.LargeTurnLeft ? rotateRight(direction) : rotateLeft(direction);
    const [sdx, sdy] = DIR_OFFSETS[sideDir];
    return {
      x: x + sdx + dx,
      y: y + sdy + dy,
      direction: newDir,
      height: newHeight,
    };
  }

  return {
    x: x + dx,
    y: y + dy,
    direction: newDir,
    height: newHeight,
  };
}

/**
 * The track builder manages all coaster tracks in the park.
 */
export class CoasterTrackSystem {
  private readonly MAP_W = 50;
  private readonly MAP_H = 50;
  private readonly MIN_TRACK_CLEARANCE = 1;

  constructor(private sim: SimExports) {}

  tracks: Map<number, RollerCoasterTrackData> = new Map();

  /** Currently active build session, or null */
  activeBuild: {
    instanceId: number;
    /** Attraction template id (determines track style) */
    trackStyleId: number;
    stationX: number;
    stationY: number;
    stationDir: TrackDirection;
    trackColor: string;
    cartColor: string;
    /** Station length in tiles (includes implicit starter segment) */
    stationLength: number;
    pieces: TrackPiece[];
    /** Next piece will be placed here */
    nextX: number;
    nextY: number;
    nextDir: TrackDirection;
    nextHeight: number;
    /** All tiles occupied so far (for collision check) */
    occupiedTiles: Set<string>;
    /** Build cost paid per placed piece, aligned with pieces[] */
    pieceCosts: number[];
  } | null = null;

  /** Start building a track after placing the station */
  startBuild(instanceId: number, stationX: number, stationY: number, templateId: number = 1): void {
    if (this.activeBuild && this.activeBuild.instanceId === instanceId) {
      return;
    }

    const config = getTrackConfig(templateId);

    // Station faces south by default (departures go south from the station footprint)
    const stationDir = TrackDirection.South;
    const occupied = new Set<string>();
    occupied.add(`${stationX},${stationY}`);

    const departX = stationX;
    const departY = stationY + 1;

    this.activeBuild = {
      instanceId,
      trackStyleId: templateId,
      stationX,
      stationY,
      stationDir,
      trackColor: config?.defaultTrackColor ?? '#e67e22',
      cartColor: config?.defaultCartColor ?? '#c0392b',
      stationLength: 1,
      pieces: [],
      nextX: departX,
      nextY: departY,
      nextDir: stationDir,
      nextHeight: this.MIN_TRACK_CLEARANCE,
      occupiedTiles: occupied,
      pieceCosts: [],
    };
  }

  clearBuildIfInstance(instanceId: number): void {
    if (this.activeBuild && this.activeBuild.instanceId === instanceId) {
      this.activeBuild = null;
    }
  }

  pruneInvalidTracks(): void {
    for (const [instanceId] of this.tracks) {
      if (this.sim.isInstActive(instanceId) !== 1 || !isTrackAttraction(this.sim.getInstTemplateId(instanceId))) {
        this.tracks.delete(instanceId);
      }
    }
    if (this.activeBuild) {
      const id = this.activeBuild.instanceId;
      if (this.sim.isInstActive(id) !== 1 || !isTrackAttraction(this.sim.getInstTemplateId(id))) {
        this.activeBuild = null;
      }
    }
  }

  private isTreeTile(tile: number): boolean {
    return tile === TileType.TreePine || tile === TileType.TreeBig || tile === TileType.TreeSmall;
  }

  private getTileOccupiedTopHeight(x: number, y: number): number {
    const tile = this.sim.tileAt(x, y);
    if (tile === 255) return Number.MAX_SAFE_INTEGER;

    let occupiedTop = 0;
    if (tile !== TileType.Empty && tile !== TileType.LandGrass && tile !== TileType.LandDesert && tile !== TileType.LandMud && tile !== TileType.LandDarkGrass) {
      occupiedTop = 1;
    }
    if (tile >= TILE_ATTRACTION_BASE) {
      occupiedTop = Math.max(occupiedTop, 1);
    }
    if (this.sim.getUpperPathVariant(x, y) >= 0) {
      occupiedTop = Math.max(occupiedTop, 2);
    }
    return occupiedTop;
  }

  /** Set track color during build */
  setTrackColor(color: string): void {
    if (this.activeBuild) this.activeBuild.trackColor = color;
  }

  /** Set cart color during build */
  setCartColor(color: string): void {
    if (this.activeBuild) this.activeBuild.cartColor = color;
  }

  /** Check if a piece can be placed at the current next position */
  canPlacePiece(type: TrackPieceType): boolean {
    if (!this.activeBuild) return false;
    const { nextX, nextY, nextDir, nextHeight } = this.activeBuild;

    // Check piece is allowed for this track style
    const config = getTrackConfig(this.activeBuild.trackStyleId);
    if (config && !config.allowedPieces.includes(type)) return false;

    if (type === TrackPieceType.Station) {
      const onlyStationPiecesSoFar = this.activeBuild.pieces.every((p) => p.type === TrackPieceType.Station);
      if (!onlyStationPiecesSoFar) return false;
      if (this.activeBuild.stationLength >= MAX_STATION_LENGTH) return false;
      if (nextDir !== this.activeBuild.stationDir) return false;
      if (nextHeight !== this.MIN_TRACK_CLEARANCE) return false;
    }

    // Height check
    const def = TRACK_PIECE_DEFS[type];
    const minH = config?.minHeight ?? this.MIN_TRACK_CLEARANCE;
    const maxH = config?.maxHeight ?? 8;
    const newHeight = nextHeight + def.heightDelta;
    if (newHeight < minH || newHeight > maxH) return false;
    const pieceCost = this.getPieceBuildCost(type, nextHeight);

    // Get all tiles this piece would occupy
    const tiles = getTrackPieceTiles(type, nextX, nextY, nextDir);

    // Check bounds & collisions
    for (const t of tiles) {
      if (t.x < 0 || t.y < 0 || t.x >= this.MAP_W || t.y >= this.MAP_H) return false;
      if (this.activeBuild.occupiedTiles.has(`${t.x},${t.y}`)) return false;

      const tile = this.sim.tileAt(t.x, t.y);
      const occupiedTop = this.getTileOccupiedTopHeight(t.x, t.y);
      if (nextHeight <= occupiedTop && !this.isTreeTile(tile)) return false;
    }

    // If trees are in the way, ensure we can afford auto-clearing them.
    let treesToClear = 0;
    for (const t of tiles) {
      if (this.isTreeTile(this.sim.tileAt(t.x, t.y))) treesToClear++;
    }
    const totalCost = pieceCost + treesToClear * TREE_CLEAR_COST;
    if (this.sim.getBudget() < totalCost) return false;

    return true;
  }

  private getPieceBuildCost(type: TrackPieceType, height: number): number {
    const config = this.activeBuild ? getTrackConfig(this.activeBuild.trackStyleId) : undefined;
    const base = config?.baseCosts[type] ?? config?.defaultPieceCost ?? 18;
    const heightCostPerLevel = config?.heightCostPerLevel ?? 8;
    const minH = config?.minHeight ?? this.MIN_TRACK_CLEARANCE;
    const extraHeight = Math.max(0, height - minH);
    return base + extraHeight * heightCostPerLevel;
  }

  /** Check if the track can be completed (next position connects back to station) */
  canComplete(): boolean {
    if (!this.activeBuild) return false;
    const config = getTrackConfig(this.activeBuild.trackStyleId);
    const minPieces = config?.minPiecesForCompletion ?? 4;
    if (this.activeBuild.pieces.length < minPieces) return false; // minimum track length

    const { nextX, nextY, nextDir, nextHeight, stationX, stationY } = this.activeBuild;
    // Completion is valid when the lead reaches the opposite station end (north side),
    // including corner entries from west/east where the next forward step enters station tile.
    const [dx, dy] = DIR_OFFSETS[nextDir];
    const reachesStationOnNextStep = nextX + dx === stationX && nextY + dy === stationY;

    const atOppositeApproach = nextX === stationX && nextY === stationY - 1 && nextDir === TrackDirection.South;
    const atStationTile = nextX === stationX && nextY === stationY;
    const atSideApproach = nextY === stationY && (nextX === stationX - 1 || nextX === stationX + 1) && reachesStationOnNextStep;
    const validHeight = nextHeight === this.MIN_TRACK_CLEARANCE;
    return validHeight && (atOppositeApproach || atStationTile || atSideApproach);
  }

  /** Place a track piece */
  placePiece(type: TrackPieceType): boolean {
    if (!this.activeBuild || !this.canPlacePiece(type)) return false;

    const { nextX, nextY, nextDir, nextHeight } = this.activeBuild;
    const pieceCost = this.getPieceBuildCost(type, nextHeight);

    // Auto-clear trees under track pieces and charge clearance cost.
    const tiles = getTrackPieceTiles(type, nextX, nextY, nextDir);
    let treesCleared = 0;
    for (const t of tiles) {
      if (this.isTreeTile(this.sim.tileAt(t.x, t.y))) {
        const before = this.sim.getBudget();
        if (this.sim.demolish(t.x, t.y) !== 1) return false;
        const after = this.sim.getBudget();
        const refund = Math.max(0, after - before);
        this.sim.setBudget(after - (TREE_CLEAR_COST + refund));
        treesCleared++;
      }
    }

    if (treesCleared > 0 && this.sim.getBudget() < 0) {
      return false;
    }

    this.sim.setBudget(this.sim.getBudget() - pieceCost);

    const piece: TrackPiece = {
      type,
      x: nextX,
      y: nextY,
      direction: nextDir,
      height: nextHeight,
    };

    // Mark tiles
    for (const t of tiles) {
      this.activeBuild.occupiedTiles.add(`${t.x},${t.y}`);
    }

    this.activeBuild.pieces.push(piece);
    this.activeBuild.pieceCosts.push(pieceCost);
    if (type === TrackPieceType.Station) {
      this.activeBuild.stationLength = Math.min(MAX_STATION_LENGTH, this.activeBuild.stationLength + 1);
    }

    // Update next position
    const next = getNextPosition(type, nextX, nextY, nextDir, nextHeight);
    this.activeBuild.nextX = next.x;
    this.activeBuild.nextY = next.y;
    this.activeBuild.nextDir = next.direction;
    this.activeBuild.nextHeight = next.height;

    return true;
  }

  /** Remove the last placed piece (undo) */
  undoLastPiece(): boolean {
    if (!this.activeBuild || this.activeBuild.pieces.length === 0) return false;

    const piece = this.activeBuild.pieces.pop()!;
    const refundedCost = this.activeBuild.pieceCosts.pop() ?? 0;

    // Remove tiles
    const tiles = getTrackPieceTiles(piece.type, piece.x, piece.y, piece.direction);
    for (const t of tiles) {
      this.activeBuild.occupiedTiles.delete(`${t.x},${t.y}`);
    }

    if (refundedCost > 0) {
      this.sim.setBudget(this.sim.getBudget() + refundedCost);
    }

    // Recalculate next position from scratch
    this.recalcNextPosition();
    return true;
  }

  private recalcNextPosition(): void {
    if (!this.activeBuild) return;
    const { stationX, stationY, stationDir } = this.activeBuild;
    let x = stationX;
    let y = stationY + 1;
    let dir = stationDir;
    let height = this.MIN_TRACK_CLEARANCE;

    for (const p of this.activeBuild.pieces) {
      const next = getNextPosition(p.type, p.x, p.y, p.direction, p.height);
      x = next.x;
      y = next.y;
      dir = next.direction;
      height = next.height;
    }

    let stationLength = 1;
    for (const p of this.activeBuild.pieces) {
      if (p.type !== TrackPieceType.Station) break;
      stationLength++;
    }
    this.activeBuild.stationLength = stationLength;

    this.activeBuild.nextX = x;
    this.activeBuild.nextY = y;
    this.activeBuild.nextDir = dir;
    this.activeBuild.nextHeight = height;
  }

  /** Finalize the track build, store it, and calculate scores */
  completeBuild(): RollerCoasterTrackData | null {
    if (!this.activeBuild) return null;

    const track: RollerCoasterTrackData = {
      instanceId: this.activeBuild.instanceId,
      trackStyleId: this.activeBuild.trackStyleId,
      stationX: this.activeBuild.stationX,
      stationY: this.activeBuild.stationY,
      trackColor: this.activeBuild.trackColor,
      cartColor: this.activeBuild.cartColor,
      stationLength: this.activeBuild.stationLength,
      pieces: [...this.activeBuild.pieces],
      complete: true,
      excitement: 0,
      nausea: 0,
      satisfaction: 0,
    };

    const baseCapacity = this.sim.getTmplCapacity(this.sim.getInstTemplateId(track.instanceId));
    const stationScaledCapacity = Math.max(1, baseCapacity * track.stationLength);
    this.sim.setInstCapacity(track.instanceId, stationScaledCapacity);

    // Calculate scores
    this.calculateStats(track);

    this.tracks.set(track.instanceId, track);
    this.activeBuild = null;

    return track;
  }

  /** Cancel the current build session */
  cancelBuild(): void {
    // Keep current build session so it can be resumed from the coaster dialog.
  }

  /** Get a built track by instance id */
  getTrack(instanceId: number): RollerCoasterTrackData | undefined {
    return this.tracks.get(instanceId);
  }

  /** Remove a track */
  removeTrack(instanceId: number): void {
    const templateId = this.sim.getInstTemplateId(instanceId);
    if (templateId >= 0) {
      this.sim.setInstCapacity(instanceId, this.sim.getTmplCapacity(templateId));
    }
    this.tracks.delete(instanceId);
  }

  getSnapshot(): CoasterTrackSnapshot {
    return {
      tracks: Array.from(this.tracks.values()).map((track) => ({
        ...track,
        pieces: track.pieces.map((piece) => ({ ...piece })),
      })),
      activeBuild: this.activeBuild
        ? {
          instanceId: this.activeBuild.instanceId,
          trackStyleId: this.activeBuild.trackStyleId,
          stationX: this.activeBuild.stationX,
          stationY: this.activeBuild.stationY,
          stationDir: this.activeBuild.stationDir,
          trackColor: this.activeBuild.trackColor,
          cartColor: this.activeBuild.cartColor,
          stationLength: this.activeBuild.stationLength,
          pieces: this.activeBuild.pieces.map((piece) => ({ ...piece })),
          nextX: this.activeBuild.nextX,
          nextY: this.activeBuild.nextY,
          nextDir: this.activeBuild.nextDir,
          nextHeight: this.activeBuild.nextHeight,
          occupiedTiles: Array.from(this.activeBuild.occupiedTiles.values()),
          pieceCosts: [...this.activeBuild.pieceCosts],
        }
        : null,
    };
  }

  restoreSnapshot(snapshot: CoasterTrackSnapshot): void {
    this.tracks.clear();

    for (const track of snapshot.tracks) {
      if (this.sim.isInstActive(track.instanceId) !== 1) continue;
      this.tracks.set(track.instanceId, {
        ...track,
        pieces: track.pieces.map((piece) => ({ ...piece })),
      });
    }

    if (snapshot.activeBuild && this.sim.isInstActive(snapshot.activeBuild.instanceId) === 1) {
      this.activeBuild = {
        instanceId: snapshot.activeBuild.instanceId,
        trackStyleId: snapshot.activeBuild.trackStyleId,
        stationX: snapshot.activeBuild.stationX,
        stationY: snapshot.activeBuild.stationY,
        stationDir: snapshot.activeBuild.stationDir,
        trackColor: snapshot.activeBuild.trackColor,
        cartColor: snapshot.activeBuild.cartColor,
        stationLength: snapshot.activeBuild.stationLength,
        pieces: snapshot.activeBuild.pieces.map((piece) => ({ ...piece })),
        nextX: snapshot.activeBuild.nextX,
        nextY: snapshot.activeBuild.nextY,
        nextDir: snapshot.activeBuild.nextDir,
        nextHeight: snapshot.activeBuild.nextHeight,
        occupiedTiles: new Set(snapshot.activeBuild.occupiedTiles),
        pieceCosts: [...snapshot.activeBuild.pieceCosts],
      };
      return;
    }

    this.activeBuild = null;
  }

  /**
   * Calculate excitement, nausea, and satisfaction scores.
   * Scoring is style-aware: thrill rides reward height/speed,
   * calm rides reward length/scenery, water rides get a splash bonus.
   */
  calculateStats(track: RollerCoasterTrackData): void {
    const config = getTrackConfig(track.trackStyleId);
    const style = config?.spriteStyle ?? 'rails';

    let maxHeight = 0;
    let totalHeightChange = 0;
    let turnCount = 0;
    let largeTurnCount = 0;
    let hillUpCount = 0;
    let hillDownCount = 0;
    let straightCount = 0;
    let currentSpeed = 1;
    let maxSpeed = 1;
    let totalNauseaRaw = 0;

    for (const piece of track.pieces) {
      if (piece.height > maxHeight) maxHeight = piece.height;

      switch (piece.type) {
        case TrackPieceType.Straight:
          straightCount++;
          break;
        case TrackPieceType.TurnLeft:
        case TrackPieceType.TurnRight:
          turnCount++;
          totalNauseaRaw += currentSpeed * 3;
          break;
        case TrackPieceType.LargeTurnLeft:
        case TrackPieceType.LargeTurnRight:
          largeTurnCount++;
          totalNauseaRaw += currentSpeed * 1.5;
          break;
        case TrackPieceType.HillUp:
          hillUpCount++;
          totalHeightChange += 1;
          currentSpeed = Math.max(0.5, currentSpeed - 0.3);
          break;
        case TrackPieceType.HillDown:
          hillDownCount++;
          totalHeightChange += 1;
          currentSpeed = Math.min(5, currentSpeed + 0.5);
          if (currentSpeed > maxSpeed) maxSpeed = currentSpeed;
          totalNauseaRaw += currentSpeed * 2;
          break;
      }
    }

    const pieceCount = track.pieces.length;

    if (style === 'narrowGauge') {
      // Calm train: rewards length and variety of turns, low excitement cap
      const lengthBonus = Math.min(35, pieceCount * 2);
      const varietyBonus = Math.min(25, (turnCount + largeTurnCount) * 4);
      track.excitement = Math.min(50, Math.round(lengthBonus + varietyBonus + 5));
      track.nausea = Math.min(100, Math.round(totalNauseaRaw * 0.3));
    } else if (style === 'waterChannel') {
      // Log flume: rewards height drops (splash!) and length
      const splashBonus = hillDownCount * 12;
      const heightBonus = maxHeight * 6;
      const lengthBonus = Math.min(20, pieceCount * 1.5);
      const varietyBonus = Math.min(20, (turnCount + largeTurnCount) * 2 + (hillUpCount + hillDownCount) * 5);
      track.excitement = Math.min(100, Math.round(splashBonus + heightBonus + lengthBonus + varietyBonus));
      track.nausea = Math.min(100, Math.round(totalNauseaRaw * 0.7 + (pieceCount > 20 ? (pieceCount - 20) : 0)));
    } else {
      // Roller coaster (default): original scoring
      const heightBonus = maxHeight * 8;
      const speedBonus = maxSpeed * 10;
      const varietyBonus = Math.min(30, (turnCount + largeTurnCount) * 3 + (hillUpCount + hillDownCount) * 4);
      const lengthBonus = Math.min(20, pieceCount * 1.5);
      track.excitement = Math.min(100, Math.round(heightBonus + speedBonus + varietyBonus + lengthBonus));
      const nauseaBase = totalNauseaRaw;
      const nauseaLength = pieceCount > 20 ? (pieceCount - 20) * 2 : 0;
      track.nausea = Math.min(100, Math.round(nauseaBase + nauseaLength));
    }

    // Satisfaction: balance of excitement vs nausea
    const exciteFactor = track.excitement * 0.7;
    const nauseaPenalty = track.nausea * 0.4;
    track.satisfaction = Math.min(100, Math.max(0, Math.round(exciteFactor - nauseaPenalty + 20)));
  }

  /**
   * Get cart animation position along the track.
   * Returns world-space x/y/height for a given progress (0..1) along the track.
   */
  getCartPosition(trackData: RollerCoasterTrackData, progress: number): { x: number; y: number; height: number; direction: TrackDirection } | null {
    if (!trackData.complete || trackData.pieces.length === 0) return null;

    // Map progress to piece index + sub-progress
    const totalPieces = trackData.pieces.length;
    const scaledProgress = progress * totalPieces;
    const pieceIndex = Math.min(Math.floor(scaledProgress), totalPieces - 1);
    const subProgress = scaledProgress - pieceIndex;

    const piece = trackData.pieces[pieceIndex];
    const nextPieceIndex = (pieceIndex + 1) % totalPieces;
    const nextPiece = trackData.pieces[nextPieceIndex];

    // Interpolate between current piece center and next piece center
    const cx = piece.x + 0.5;
    const cy = piece.y + 0.5;
    const nx = nextPiece.x + 0.5;
    const ny = nextPiece.y + 0.5;

    return {
      x: cx + (nx - cx) * subProgress,
      y: cy + (ny - cy) * subProgress,
      height: piece.height + (nextPiece.height - piece.height) * subProgress,
      direction: piece.direction,
    };
  }

  /** Get all tiles occupied by a track, for rendering */
  getTrackTiles(trackData: RollerCoasterTrackData): Array<{ x: number; y: number; piece: TrackPiece }> {
    const result: Array<{ x: number; y: number; piece: TrackPiece }> = [];
    for (const piece of trackData.pieces) {
      const tiles = getTrackPieceTiles(piece.type, piece.x, piece.y, piece.direction);
      for (const t of tiles) {
        result.push({ x: t.x, y: t.y, piece });
      }
    }
    return result;
  }
}
