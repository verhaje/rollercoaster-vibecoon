/* =============================================
   Park Tycoon – Build Controller
   Handles mouse/touch input for:
     • Selecting build tools
     • Placing paths / trees / attractions
     • Demolishing
     • Camera pan (right-click drag) & zoom (wheel)
   ============================================= */

import { type SimExports, BuildTool, TileType } from '../game/types';
import { type Renderer } from '../render/Renderer';
import ATTRACTIONS, { type AttractionDef } from '../game/config/attractions';
import { ECONOMY } from '../game/config/economy';
import { type GameTime } from '../game/GameTime';
import { recordBuildDate } from '../ui/Hud';
import { type FurnitureSystem, BENCH_COST, TRASHCAN_COST } from '../game/Furniture';
import { type ScenerySystem } from '../game/Scenery';
import { getSceneryDef } from '../game/config/scenery';
import { isTrackAttraction } from '../game/config/tracks';

export type EmployeeKind = 'mechanic' | 'cleaner' | 'security' | 'entertainer';
type InputProfile = { touchGesturesEnabled: boolean };

const NO_ENDPOINT_TEMPLATE_IDS = new Set<number>([17, 18]);

export class BuildController {
  tool: BuildTool = BuildTool.None;
  selectedAttractionId: number = -1;
  selectedPathVariant: number = 0;
  selectedTreeVariant: number = 0;
  selectedLandVariant: number = 0;
  selectedSceneryVariant: number = 0;
  hoverTileX: number = -1;
  hoverTileY: number = -1;

  private pendingRideBuild: {
    instanceId: number;
    templateId: number;
    x: number;
    y: number;
    entryX: number;
    entryY: number;
    footprintW: number;
    footprintH: number;
    stage: 'entrance' | 'exit';
    rotation: number;
  } | null = null;

  private pendingEndpointEdit: {
    instanceId: number;
    templateId: number;
    x: number;
    y: number;
    footprintW: number;
    footprintH: number;
    stage: 'entrance' | 'exit';
    entryX: number;
    entryY: number;
  } | null = null;

  private selectedAttractionRotation: number = 0;

  private isPanning = false;
  private lastPanX = 0;
  private lastPanY = 0;
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  private isElevatedMode = false;
  private static readonly TERRAIN_PIXEL_STEP = 4;
  private inputProfile: InputProfile = { touchGesturesEnabled: false };
  private touchGestureActive = false;
  private touchCentroidX = 0;
  private touchCentroidY = 0;
  private touchDistance = 0;
  private singleTouchActive = false;

  /** Current build height for paths: -1 means "auto" (ground height). */
  buildHeight: number = -1;

  // Terrain drag state
  private terrainZone = 0;           // 0=all, 1=NW, 2=NE, 3=SE, 4=SW, 5=N, 6=E, 7=S, 8=W
  private terrainDragDelta = 0;      // +1 raise, −1 lower (0 = undetermined)
  private terrainDragStartY = 0;
  private terrainDragStartTileKey = -1;  // packed (tx | ty<<16) of initial tile
  private readonly terrainTouched: Set<number> = new Set();

  // Callbacks for UI refresh
  onBudgetChange?: () => void;
  onToolChange?: () => void;
  onSelectAttraction?: (instanceId: number) => void;
  onSelectVisitor?: (visitorIndex: number) => void;
  onSelectEmployee?: (kind: EmployeeKind, employeeIndex: number) => void;
  onSelectEntrance?: () => void;
  onAttractionPlaced?: (instanceId: number, templateId: number, x: number, y: number) => void;
  onAttractionDemolished?: (instanceId: number, templateId: number) => void;
  onRequestDemolishAttraction?: (instanceId: number) => void;
  onSaveRequest?: () => void;
  onLoadRequest?: () => void;

  private pendingEmployeeAreaAssignment: ((x: number, y: number) => void) | null = null;

  private furniture: FurnitureSystem | null = null;
  private scenery: ScenerySystem | null = null;
  private heldVisitorIndex: number = -1;
  private heldEmployeeKind: EmployeeKind | null = null;
  private heldEmployeeIndex: number = -1;
  private pickupDragActive = false;
  private pickupDragMoved = false;
  private pickupPickedThisDrag = false;
  private pickupDragStartX = 0;
  private pickupDragStartY = 0;

  setFurniture(f: FurnitureSystem): void {
    this.furniture = f;
  }

  setScenery(s: ScenerySystem): void {
    this.scenery = s;
  }

  setInputProfile(profile: InputProfile): void {
    this.inputProfile = { ...profile };
  }

  panCameraByScreenDelta(dx: number, dy: number): void {
    this.renderer.camera.x -= dx / this.renderer.camera.zoom;
    this.renderer.camera.y -= dy / this.renderer.camera.zoom;
  }

  zoomCameraByStep(direction: 1 | -1): void {
    const zoomSpeed = 0.15;
    if (direction > 0) {
      this.renderer.camera.zoom = Math.min(6, this.renderer.camera.zoom * (1 + zoomSpeed));
      return;
    }
    this.renderer.camera.zoom = Math.max(0.5, this.renderer.camera.zoom * (1 - zoomSpeed));
  }

  resetCameraToParkCenter(): void {
    this.renderer.camera.x = (ECONOMY.mapWidth * ECONOMY.tileSize) / 2;
    this.renderer.camera.y = (ECONOMY.mapHeight * ECONOMY.tileSize) / 2;
  }

  constructor(
    private sim: SimExports,
    private renderer: Renderer,
    private gameTime: GameTime,
  ) {
    this.bindEvents();
    this.syncEndpointMarkerSuppression();
  }

  private syncEndpointMarkerSuppression(): void {
    const hidden: number[] = [];
    if (this.pendingRideBuild) hidden.push(this.pendingRideBuild.instanceId);
    if (this.pendingEndpointEdit) hidden.push(this.pendingEndpointEdit.instanceId);
    this.renderer.setSuppressedEndpointMarkers(hidden);
  }

  private get canvas(): HTMLCanvasElement {
    return this.renderer.app.view as HTMLCanvasElement;
  }

  selectTool(tool: BuildTool, attractionId: number = -1, variantId: number = 0): void {
    if (tool !== BuildTool.Attraction || attractionId !== this.selectedAttractionId) {
      this.pendingRideBuild = null;
      this.pendingEndpointEdit = null;
      this.selectedAttractionRotation = 0;
      this.syncEndpointMarkerSuppression();
    }
    this.tool = tool;
    this.selectedAttractionId = attractionId;
    if (tool === BuildTool.Path) this.selectedPathVariant = variantId;
    if (tool === BuildTool.Tree) this.selectedTreeVariant = variantId;
    if (tool === BuildTool.Land) this.selectedLandVariant = variantId;
    if (tool === BuildTool.Scenery) this.selectedSceneryVariant = variantId;
    if (tool !== BuildTool.Path) this.buildHeight = -1;
    this.onToolChange?.();
  }

  setAttractionRotation(rotation: number): void {
    this.selectedAttractionRotation = this.normalizeAttractionRotation(rotation);
    this.onToolChange?.();
  }

  rotateAttractionRotation(): number {
    const sequence = [0, 90, 180, 270];
    const currentIndex = sequence.indexOf(this.selectedAttractionRotation);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % sequence.length : 0;
    this.selectedAttractionRotation = sequence[nextIndex];
    this.onToolChange?.();
    return this.selectedAttractionRotation;
  }

  getAttractionRotation(): number {
    return this.selectedAttractionRotation;
  }

  startAttractionBuild(templateId: number, rotation: number): void {
    this.selectedAttractionRotation = this.normalizeAttractionRotation(rotation);
    this.selectTool(BuildTool.Attraction, templateId);
  }

  private normalizeAttractionRotation(rotation: number): number {
    const normalized = ((rotation % 360) + 360) % 360;
    if (normalized === 90 || normalized === 180 || normalized === 270) return normalized;
    return 0;
  }

  getAttractionBuildStatus(): string {
    if (this.pendingEndpointEdit) {
      if (this.pendingEndpointEdit.stage === 'entrance') return 'Select new attraction entrance tile';
      return 'Select new attraction exit tile';
    }
    if (!this.pendingRideBuild) return '';
    if (this.pendingRideBuild.stage === 'entrance') return 'Select attraction entrance tile';
    return 'Select attraction exit tile';
  }

  getAttractionBuildStage(): 'none' | 'entrance' | 'exit' {
    if (this.pendingEndpointEdit) return this.pendingEndpointEdit.stage;
    if (!this.pendingRideBuild) return 'none';
    return this.pendingRideBuild.stage;
  }

  startEndpointEdit(instanceId: number): boolean {
    if (instanceId < 0 || this.sim.isInstActive(instanceId) !== 1) return false;
    const x = this.sim.getInstX(instanceId);
    const y = this.sim.getInstY(instanceId);
    const templateId = this.sim.getInstTemplateId(instanceId);
    if (x < 0 || y < 0 || templateId < 0) return false;
    if (NO_ENDPOINT_TEMPLATE_IDS.has(templateId)) return false;
    const attr = ATTRACTIONS.find((a) => a.id === templateId);
    if (!attr) return false;
    const rotation = this.sim.getInstRotation(instanceId);
    const fp = this.getRotatedFootprint(attr, rotation);

    this.pendingRideBuild = null;
    this.pendingEndpointEdit = {
      instanceId,
      templateId,
      x,
      y,
      footprintW: fp.w,
      footprintH: fp.h,
      stage: 'entrance',
      entryX: -1,
      entryY: -1,
    };
    this.tool = BuildTool.Attraction;
    this.selectedAttractionId = templateId;
    this.selectedAttractionRotation = this.normalizeAttractionRotation(rotation);
    this.syncEndpointMarkerSuppression();
    this.onToolChange?.();
    return true;
  }

  private isStallAttraction(templateId: number): boolean {
    const attr = ATTRACTIONS.find((a) => a.id === templateId);
    if (!attr) return false;
    if (attr.category === 'food' || attr.category === 'drink' || attr.category === 'toilet') return true;
    const n = attr.name.toLowerCase();
    return n.includes('stand') || n.includes('cart');
  }

  private isPathOrEntranceTile(tileType: number): boolean {
    return tileType === TileType.PathMuddy
      || tileType === TileType.PathDesert
      || tileType === TileType.PathConcrete
      || tileType === TileType.PathQueue
      || tileType === TileType.Entrance;
  }

  private isTrackStationCrossingEndpoint(px: number, py: number, rideX: number, rideY: number, w: number, h: number, templateId: number): boolean {
    if (!isTrackAttraction(templateId)) return false;
    const onStationFront = py === rideY - 1 && px >= rideX && px < rideX + w;
    const onStationBack = py === rideY + h && px >= rideX && px < rideX + w;
    return onStationFront || onStationBack;
  }

  private isEndpointTileValid(
    px: number,
    py: number,
    rideX: number,
    rideY: number,
    w: number,
    h: number,
    templateId: number,
  ): boolean {
    if (px < 0 || py < 0 || px >= ECONOMY.mapWidth || py >= ECONOMY.mapHeight) return false;
    const inside = px >= rideX && px < rideX + w && py >= rideY && py < rideY + h;
    if (inside) return false;
    const left = px === rideX - 1 && py >= rideY && py < rideY + h;
    const right = px === rideX + w && py >= rideY && py < rideY + h;
    const top = py === rideY - 1 && px >= rideX && px < rideX + w;
    const bottom = py === rideY + h && px >= rideX && px < rideX + w;
    const adjacent = left || right || top || bottom;
    if (!adjacent) return false;
    if (this.isTrackStationCrossingEndpoint(px, py, rideX, rideY, w, h, templateId)) return false;
    return true;
  }

  private getRotatedFootprint(attr: AttractionDef, rotation: number): { w: number; h: number } {
    const normalized = this.normalizeAttractionRotation(rotation);
    if (normalized === 90 || normalized === 270) {
      return { w: attr.footprint.h, h: attr.footprint.w };
    }
    return { w: attr.footprint.w, h: attr.footprint.h };
  }

  getCarryStatus(): string {
    if (this.heldVisitorIndex >= 0) return `Carrying guest #${this.heldVisitorIndex + 1}`;
    if (this.heldEmployeeKind && this.heldEmployeeIndex >= 0) {
      return `Carrying ${this.heldEmployeeKind} #${this.heldEmployeeIndex + 1}`;
    }
    return 'Click guest/employee to pick up';
  }

  startEmployeeAreaAssignment(onTilePicked: (x: number, y: number) => void): void {
    this.pendingEmployeeAreaAssignment = onTilePicked;
    this.selectTool(BuildTool.Select);
  }

  cancelEmployeeAreaAssignment(): void {
    this.pendingEmployeeAreaAssignment = null;
  }

  /* ── event binding ── */
  private bindEvents(): void {
    const c = this.canvas;

    c.addEventListener('mousemove', (e) => this.onMouseMove(e));
    c.addEventListener('mousedown', (e) => this.onMouseDown(e));
    c.addEventListener('mouseup', (e) => this.onMouseUp(e));
    c.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    c.addEventListener('contextmenu', (e) => e.preventDefault());

    // Touch support
    c.addEventListener('touchstart', (e) => {
      if (!this.inputProfile.touchGesturesEnabled) return;
      if (e.touches.length === 2) {
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        this.touchGestureActive = true;
        this.singleTouchActive = false;
        this.isDragging = false;
        this.isPanning = false;
        this.renderer.clearDraggedVisitorPreview();
        this.touchCentroidX = (t0.clientX + t1.clientX) / 2;
        this.touchCentroidY = (t0.clientY + t1.clientY) / 2;
        this.touchDistance = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        e.preventDefault();
        return;
      }
      if (e.touches.length === 1) {
        const t = e.touches[0];
        this.singleTouchActive = true;
        this.onMouseDown(new MouseEvent('mousedown', { clientX: t.clientX, clientY: t.clientY, button: 0 }));
        e.preventDefault();
      }
    }, { passive: false });
    c.addEventListener('touchmove', (e) => {
      if (!this.inputProfile.touchGesturesEnabled) return;
      if (this.touchGestureActive && e.touches.length >= 2) {
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const centroidX = (t0.clientX + t1.clientX) / 2;
        const centroidY = (t0.clientY + t1.clientY) / 2;
        const distance = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);

        this.panCameraByScreenDelta(centroidX - this.touchCentroidX, centroidY - this.touchCentroidY);

        if (this.touchDistance > 0) {
          const ratio = distance / this.touchDistance;
          this.renderer.camera.zoom = Math.max(0.5, Math.min(6, this.renderer.camera.zoom * ratio));
        }

        this.touchCentroidX = centroidX;
        this.touchCentroidY = centroidY;
        this.touchDistance = distance;
        e.preventDefault();
        return;
      }
      if (this.singleTouchActive && e.touches.length === 1) {
        const t = e.touches[0];
        this.onMouseMove(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY }));
        e.preventDefault();
      }
    }, { passive: false });
    c.addEventListener('touchend', (e) => {
      if (!this.inputProfile.touchGesturesEnabled) return;
      if (this.touchGestureActive) {
        if (e.touches.length < 2) {
          this.touchGestureActive = false;
          this.touchDistance = 0;
        }
      }
      if (this.singleTouchActive && e.touches.length === 0) {
        const changed = e.changedTouches[0];
        this.onMouseUp(new MouseEvent('mouseup', {
          button: 0,
          clientX: changed ? changed.clientX : this.lastMouseX,
          clientY: changed ? changed.clientY : this.lastMouseY,
        }));
        this.singleTouchActive = false;
      }
      if (e.touches.length === 0) {
        this.touchGestureActive = false;
      }
      e.preventDefault();
    }, { passive: false });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => this.onKey(e));
  }

  // Convert viewport coordinates to renderer screen-space coordinates.
  // This keeps picking accurate even when the canvas is offset or CSS-scaled.
  private toCanvasScreen(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const screen = this.renderer.app.screen;
    return {
      x: (clientX - rect.left) * (screen.width / rect.width),
      y: (clientY - rect.top) * (screen.height / rect.height),
    };
  }

  // Pick tile from a client position with terrain-height compensation so clicks line up
  // with rendered raised/lowered tiles.
  private pickTileFromClient(clientX: number, clientY: number): { x: number; y: number } {
    const screenPos = this.toCanvasScreen(clientX, clientY);
    let tile = this.renderer.screenToTile(screenPos.x, screenPos.y);

    for (let i = 0; i < 3; i++) {
      if (tile.x < 0 || tile.y < 0 || tile.x >= ECONOMY.mapWidth || tile.y >= ECONOMY.mapHeight) break;
      const h = this.sim.getTileHeight(tile.x, tile.y);
      const compensatedY = screenPos.y + h * BuildController.TERRAIN_PIXEL_STEP * this.renderer.camera.zoom;
      const next = this.renderer.screenToTile(screenPos.x, compensatedY);
      if (next.x === tile.x && next.y === tile.y) break;
      tile = next;
    }

    return tile;
  }

  private onMouseMove(e: MouseEvent): void {
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    if (this.isPanning) {
      const dx = e.clientX - this.lastPanX;
      const dy = e.clientY - this.lastPanY;
      this.renderer.camera.x -= dx / this.renderer.camera.zoom;
      this.renderer.camera.y -= dy / this.renderer.camera.zoom;
      this.lastPanX = e.clientX;
      this.lastPanY = e.clientY;
      return;
    }

    const tile = this.pickTileFromClient(e.clientX, e.clientY);
    this.hoverTileX = tile.x;
    this.hoverTileY = tile.y;

    // Ghost preview
    if (this.tool !== BuildTool.None) {
      let canPlaceHere = false;
      const isElevated = (e.ctrlKey || e.shiftKey) && this.tool === BuildTool.Path;
      if (this.tool === BuildTool.Path && isElevated) {
        // Elevated path can be placed on existing ground paths
        const t = this.sim.tileAt(tile.x, tile.y);
        canPlaceHere = t === TileType.PathMuddy || t === TileType.PathDesert || t === TileType.PathConcrete || t === TileType.PathQueue;
      } else if (this.tool === BuildTool.Bench) {
        canPlaceHere = !!this.furniture && this.furniture.canPlaceBench(this.sim, tile.x, tile.y);
      } else if (this.tool === BuildTool.TrashCan) {
        canPlaceHere = !!this.furniture && this.furniture.canPlaceTrashCan(this.sim, tile.x, tile.y);
      } else if (this.tool === BuildTool.Land) {
        const t = this.sim.tileAt(tile.x, tile.y);
        canPlaceHere = t === TileType.LandGrass || t === TileType.LandDesert || t === TileType.LandMud || t === TileType.LandDarkGrass;
      } else if (this.tool === BuildTool.Scenery) {
        canPlaceHere = !!this.scenery && this.scenery.canPlace(this.sim, this.furniture, tile.x, tile.y);
      } else if (this.tool === BuildTool.Pickup) {
        canPlaceHere = true;
      } else if (this.tool === BuildTool.Path || this.tool === BuildTool.Tree) {
        canPlaceHere = this.sim.canPlace(tile.x, tile.y, 1, 1) === 1;
      } else if (this.tool === BuildTool.Water) {
        const t = this.sim.tileAt(tile.x, tile.y);
        canPlaceHere = this.sim.canPlace(tile.x, tile.y, 1, 1) === 1 || (t !== TileType.Empty && t !== TileType.Entrance);
      } else if (this.tool === BuildTool.Terrain) {
        canPlaceHere = true;
      } else if (this.tool === BuildTool.Attraction && this.selectedAttractionId >= 0) {
        if (this.pendingEndpointEdit) {
          canPlaceHere = this.isEndpointTileValid(
            tile.x,
            tile.y,
            this.pendingEndpointEdit.x,
            this.pendingEndpointEdit.y,
            this.pendingEndpointEdit.footprintW,
            this.pendingEndpointEdit.footprintH,
            this.pendingEndpointEdit.templateId,
          );
          if (this.pendingEndpointEdit.stage === 'exit' && tile.x === this.pendingEndpointEdit.entryX && tile.y === this.pendingEndpointEdit.entryY) {
            canPlaceHere = false;
          }
        } else {
          const pending = this.pendingRideBuild;
          if (pending) {
          canPlaceHere = this.isEndpointTileValid(
            tile.x,
            tile.y,
            pending.x,
            pending.y,
            pending.footprintW,
            pending.footprintH,
            pending.templateId,
          );
          if (pending.stage === 'exit' && tile.x === pending.entryX && tile.y === pending.entryY) {
            canPlaceHere = false;
          }
          } else {
            const attr = ATTRACTIONS.find(a => a.id === this.selectedAttractionId);
            if (attr) {
              const fp = this.getRotatedFootprint(attr, this.selectedAttractionRotation);
              canPlaceHere = this.sim.canPlace(tile.x, tile.y, fp.w, fp.h) === 1;
            }
          }
        }
      } else if (this.tool === BuildTool.Demolish) {
        const t = this.sim.tileAt(tile.x, tile.y);
        canPlaceHere = t !== TileType.Empty && t !== TileType.Entrance; // not empty, not entrance
      }
      const variant = this.tool === BuildTool.Path
        ? this.selectedPathVariant
        : this.tool === BuildTool.Tree
          ? this.selectedTreeVariant
          : this.tool === BuildTool.Land
            ? this.selectedLandVariant
            : this.tool === BuildTool.Scenery
              ? this.selectedSceneryVariant
          : 0;
      this.renderer.showGhost(
        this.tool,
        tile.x,
        tile.y,
        this.selectedAttractionId,
        canPlaceHere,
        variant,
        isElevated,
        this.buildHeight,
        this.selectedAttractionRotation,
        this.getAttractionBuildStage(),
      );
    } else {
      this.renderer.hideGhost();
    }

    if (this.pickupDragActive) {
      if (this.heldVisitorIndex >= 0) {
        this.renderer.setDraggedVisitorPreview(this.heldVisitorIndex, e.clientX, e.clientY);
      }
      const dx = e.clientX - this.pickupDragStartX;
      const dy = e.clientY - this.pickupDragStartY;
      if (dx * dx + dy * dy >= 16) {
        this.pickupDragMoved = true;
      }
      if (this.heldVisitorIndex >= 0 && this.pickupDragMoved) {
        this.sim.relocateVisitor(this.heldVisitorIndex, tile.x, tile.y);
      }
    }

    // Drag-place paths/water/scenery
    if (this.isDragging && (this.tool === BuildTool.Path || this.tool === BuildTool.Water || this.tool === BuildTool.Scenery)) {
      this.tryPlace(tile.x, tile.y, this.isElevatedMode);
    }

    // Drag-edit terrain
    if (this.isDragging && this.tool === BuildTool.Terrain) {
      const dy = e.clientY - this.terrainDragStartY;
      if (this.terrainDragDelta === 0 && Math.abs(dy) >= 5) {
        this.terrainDragDelta = dy < 0 ? 1 : -1;
        // Also apply to the initial tile now that direction is known
        if (this.terrainDragStartTileKey >= 0) {
          const stx = this.terrainDragStartTileKey & 0xffff;
          const sty = (this.terrainDragStartTileKey >> 16) & 0xffff;
          this.applyTerrainZone(stx, sty);
        }
      }
      if (this.terrainDragDelta !== 0) {
        const key = tile.x | (tile.y << 16);
        if (!this.terrainTouched.has(key)) {
          this.applyTerrainZone(tile.x, tile.y);
        }
      }
    }
  }

  private onMouseDown(e: MouseEvent): void {
    // Right click or middle = pan
    if (e.button === 2 || e.button === 1) {
      this.isPanning = true;
      this.lastPanX = e.clientX;
      this.lastPanY = e.clientY;
      return;
    }

    // Left click = place
    if (e.button === 0) {
      const tile = this.pickTileFromClient(e.clientX, e.clientY);

      // Land painting is intentionally one tile per click.
      if (this.tool === BuildTool.Land) {
        this.isDragging = false;
        this.isElevatedMode = false;
        this.tryPlace(tile.x, tile.y, false);
        return;
      }

      this.isDragging = true;

      if (this.tool === BuildTool.Terrain) {
        // Determine which zone within the tile was clicked
        this.terrainZone = this.computeTerrainZone(e);
        this.terrainDragDelta = 0;      // undetermined until drag direction seen
        this.terrainDragStartY = e.clientY;
        this.terrainDragStartTileKey = tile.x | (tile.y << 16);
        this.terrainTouched.clear();
      } else if (this.tool === BuildTool.Pickup) {
        this.pickupDragActive = true;
        this.pickupDragMoved = false;
        this.pickupPickedThisDrag = false;
        this.pickupDragStartX = e.clientX;
        this.pickupDragStartY = e.clientY;
        if (!this.isHoldingEntity()) {
          this.pickupPickedThisDrag = this.pickupEntityAt(tile.x, tile.y);
          if (this.pickupPickedThisDrag && this.heldVisitorIndex >= 0) {
            this.renderer.setDraggedVisitorPreview(this.heldVisitorIndex, e.clientX, e.clientY);
          }
        }
      } else {
        this.isElevatedMode = e.ctrlKey || e.shiftKey;
        this.tryPlace(tile.x, tile.y, this.isElevatedMode);
      }
    }
  }

  private onMouseUp(e: MouseEvent): void {
    if (e.button === 2 || e.button === 1) {
      this.isPanning = false;
    }
    if (e.button === 0) {
      this.isDragging = false;
      if (this.tool === BuildTool.Pickup && this.pickupDragActive) {
        const tile = this.pickTileFromClient(e.clientX, e.clientY);
        const shouldDrop = this.isHoldingEntity() && (!this.pickupPickedThisDrag || this.pickupDragMoved);
        if (shouldDrop) {
          this.dropHeldEntityAt(tile.x, tile.y, this.sim.tileAt(tile.x, tile.y));
        }
      }
      this.renderer.clearDraggedVisitorPreview();
      this.pickupDragActive = false;
      this.pickupDragMoved = false;
      this.pickupPickedThisDrag = false;
      if (this.tool === BuildTool.Terrain) {
        this.terrainDragDelta = 0;
        this.terrainTouched.clear();
      }
    }
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    // Ctrl + wheel zooms, plain wheel scroll pans the map.
    if (e.ctrlKey) {
      const zoomSpeed = 0.15;
      if (e.deltaY < 0) {
        this.renderer.camera.zoom = Math.min(6, this.renderer.camera.zoom * (1 + zoomSpeed));
      } else {
        this.renderer.camera.zoom = Math.max(0.5, this.renderer.camera.zoom * (1 - zoomSpeed));
      }
      return;
    }

    const panSpeed = 1 / Math.max(0.5, this.renderer.camera.zoom);
    if (e.shiftKey) {
      this.renderer.camera.x += e.deltaY * panSpeed;
    } else {
      this.renderer.camera.x += e.deltaX * panSpeed;
      this.renderer.camera.y += e.deltaY * panSpeed;
    }
  }

  private onKey(e: KeyboardEvent): void {
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      this.onSaveRequest?.();
      return;
    }
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      this.onLoadRequest?.();
      return;
    }

    switch (e.key) {
      case '1': this.selectTool(BuildTool.Path); break;
      case '2': this.selectTool(BuildTool.Tree); break;
      case '3': this.selectTool(BuildTool.Demolish); break;
      case '4': case 's': case 'S': this.selectTool(BuildTool.Select); break;
      case '5': case 'w': case 'W': this.selectTool(BuildTool.Water); break;
      case '6': case 'l': case 'L': this.selectTool(BuildTool.Land); break;
      case '7': this.selectTool(BuildTool.Scenery); break;
      case '8': case 'g': case 'G': this.selectTool(BuildTool.Pickup); break;
      case 'Escape': this.selectTool(BuildTool.None); break;
      case 'q': case 'Q': this.adjustBuildHeight(1); break;
      case 'z': case 'Z': this.adjustBuildHeight(-1); break;
    }
  }

  getSnapshot(): {
    tool: BuildTool;
    selectedAttractionId: number;
    selectedPathVariant: number;
    selectedTreeVariant: number;
    selectedLandVariant: number;
    selectedSceneryVariant: number;
    selectedAttractionRotation: number;
    buildHeight: number;
  } {
    return {
      tool: this.tool,
      selectedAttractionId: this.selectedAttractionId,
      selectedPathVariant: this.selectedPathVariant,
      selectedTreeVariant: this.selectedTreeVariant,
      selectedLandVariant: this.selectedLandVariant,
      selectedSceneryVariant: this.selectedSceneryVariant,
      selectedAttractionRotation: this.selectedAttractionRotation,
      buildHeight: this.buildHeight,
    };
  }

  restoreSnapshot(snapshot: {
    tool: BuildTool;
    selectedAttractionId: number;
    selectedPathVariant: number;
    selectedTreeVariant: number;
    selectedLandVariant: number;
    selectedSceneryVariant: number;
    selectedAttractionRotation: number;
    buildHeight: number;
  }): void {
    this.tool = snapshot.tool;
    this.selectedAttractionId = snapshot.selectedAttractionId;
    this.selectedPathVariant = snapshot.selectedPathVariant;
    this.selectedTreeVariant = snapshot.selectedTreeVariant;
    this.selectedLandVariant = snapshot.selectedLandVariant;
    this.selectedSceneryVariant = snapshot.selectedSceneryVariant;
    this.selectedAttractionRotation = this.normalizeAttractionRotation(snapshot.selectedAttractionRotation);
    this.buildHeight = snapshot.buildHeight;
    this.pendingRideBuild = null;
    this.pendingEndpointEdit = null;
    this.syncEndpointMarkerSuppression();
    this.onToolChange?.();
  }

  /** Raise or lower the current build height for path placement. */
  adjustBuildHeight(delta: number): void {
    const maxH = this.sim.getMaxHeight();
    if (this.buildHeight < 0) {
      // Switch from auto to explicit: start from ground height of hovered tile
      const baseH = (this.hoverTileX >= 0 && this.hoverTileY >= 0)
        ? this.sim.getTileHeight(this.hoverTileX, this.hoverTileY)
        : this.sim.getBaseHeight();
      this.buildHeight = Math.max(0, Math.min(maxH, baseH + delta));
    } else {
      this.buildHeight = Math.max(0, Math.min(maxH, this.buildHeight + delta));
    }
    this.onToolChange?.();
  }

  /** Reset build height to auto (ground level). */
  resetBuildHeight(): void {
    this.buildHeight = -1;
    this.onToolChange?.();
  }

  /** Get the effective build height for a given tile. */
  getEffectiveBuildHeight(tx: number, ty: number): number {
    if (this.buildHeight < 0) return this.sim.getTileHeight(tx, ty);
    return this.buildHeight;
  }

  demolishAttractionByInstance(instanceId: number): boolean {
    if (instanceId < 0 || this.sim.isInstActive(instanceId) !== 1) return false;
    const x = this.sim.getInstX(instanceId);
    const y = this.sim.getInstY(instanceId);
    if (x < 0 || y < 0) return false;

    const templateId = this.sim.getInstTemplateId(instanceId);
    const removed = this.sim.demolish(x, y) === 1;
    if (!removed) return false;

    this.onAttractionDemolished?.(instanceId, templateId);
    this.onBudgetChange?.();
    return true;
  }

  private tryPlace(tx: number, ty: number, elevated: boolean = false): void {
    if (tx < 0 || ty < 0 || tx >= ECONOMY.mapWidth || ty >= ECONOMY.mapHeight) return;

    if (this.pendingEmployeeAreaAssignment) {
      const cb = this.pendingEmployeeAreaAssignment;
      this.pendingEmployeeAreaAssignment = null;
      cb(tx, ty);
      return;
    }

    const tileType = this.sim.tileAt(tx, ty);
    const instIdx = this.sim.instanceAtTile(tx, ty);

    if (this.tool === BuildTool.Pickup) {
      this.handlePickupDrop(tx, ty, tileType);
      return;
    }

    // Inspect flow for idle/select modes: attraction & entrance dialogs should always open.
    if (this.tool === BuildTool.None || this.tool === BuildTool.Select) {
      if (tileType === TileType.Entrance) {
        this.onSelectEntrance?.();
        return;
      }
      if (instIdx >= 0) {
        this.onSelectAttraction?.(instIdx);
        return;
      }
      const selectedEmployee = this.findEmployeeAtTile(tx, ty);
      if (selectedEmployee) {
        this.onSelectEmployee?.(selectedEmployee.kind, selectedEmployee.index);
        return;
      }
      if (this.tool === BuildTool.Select) {
        for (let i = 0; i < 100; i++) {
          if (this.sim.getVisitorState(i) === 255) continue; // inactive
          if (this.sim.getVisitorX(i) === tx && this.sim.getVisitorY(i) === ty) {
            this.onSelectVisitor?.(i);
            return;
          }
        }
      }
      return;
    }

    if (tileType === TileType.Entrance && this.tool !== BuildTool.Demolish) {
      this.onSelectEntrance?.();
      return;
    }

    let placed = false;

    const replaceAndPlace1x1 = (placeFn: () => boolean): boolean => {
      if (placeFn()) return true;
      if (this.sim.instanceAtTile(tx, ty) >= 0) return false;
      const tile = this.sim.tileAt(tx, ty);
      if (tile === TileType.Entrance || tile === TileType.Empty) return false;
      if (this.sim.demolish(tx, ty) !== 1) return false;
      return placeFn();
    };

    switch (this.tool) {
      case BuildTool.Path: {
        const effectiveH = this.getEffectiveBuildHeight(tx, ty);
        const groundH = this.sim.getTileHeight(tx, ty);
        if (elevated || effectiveH !== groundH) {
          // Place at non-ground height via multi-level system
          const h = elevated ? groundH + 1 : effectiveH;
          this.sim.placePathAtHeight(tx, ty, h, this.selectedPathVariant);
          placed = true;
        } else {
          placed = replaceAndPlace1x1(() => this.sim.placePathVariant(tx, ty, this.selectedPathVariant) === 1);
        }
        break;
      }
      case BuildTool.Tree:
        placed = replaceAndPlace1x1(() => this.sim.placeTreeVariant(tx, ty, this.selectedTreeVariant) === 1);
        break;
      case BuildTool.Water:
        placed = replaceAndPlace1x1(() => this.sim.placeWater(tx, ty) === 1);
        break;
      case BuildTool.Land:
        placed = this.sim.placeLandVariant(tx, ty, this.selectedLandVariant) === 1;
        break;
      case BuildTool.Terrain:
        // Terrain is handled via drag in onMouseMove / applyTerrainZone
        break;
      case BuildTool.Scenery:
        if (this.scenery) {
          const def = getSceneryDef(this.selectedSceneryVariant);
          const cost = def?.cost ?? 0;
          if (def && this.sim.getBudget() >= cost && this.scenery.place(this.sim, this.furniture, tx, ty, this.selectedSceneryVariant)) {
            this.sim.setBudget(this.sim.getBudget() - cost);
            placed = true;
          }
        }
        break;
      case BuildTool.Attraction:
        if (this.pendingEndpointEdit) {
          const edit = this.pendingEndpointEdit;
          const validEndpoint = this.isEndpointTileValid(tx, ty, edit.x, edit.y, edit.footprintW, edit.footprintH, edit.templateId);
          if (!validEndpoint) break;
          if (edit.stage === 'entrance') {
            edit.entryX = tx;
            edit.entryY = ty;
            edit.stage = 'exit';
            this.onToolChange?.();
            break;
          }
          if (tx === edit.entryX && ty === edit.entryY) break;
          const ok = this.sim.setInstEndpoints(edit.instanceId, edit.entryX, edit.entryY, tx, ty) === 1;
          placed = ok;
          if (ok) {
            this.pendingEndpointEdit = null;
            this.syncEndpointMarkerSuppression();
            this.selectTool(BuildTool.None);
          }
          break;
        }

        if (this.selectedAttractionId >= 0) {
          const templateId = this.selectedAttractionId;
          const attr = ATTRACTIONS.find((a) => a.id === templateId);
          if (!attr) break;
          if (this.isStallAttraction(templateId)) {
            const result = this.sim.placeAttractionRotated(templateId, tx, ty, this.selectedAttractionRotation);
            placed = result >= 0;
            if (placed) {
              recordBuildDate(result, this.gameTime.formatDate());
              this.onAttractionPlaced?.(result, templateId, tx, ty);
              this.selectTool(BuildTool.None);
            }
            break;
          }

          if (!this.pendingRideBuild) {
            const fp = this.getRotatedFootprint(attr, this.selectedAttractionRotation);
            if (this.sim.canPlace(tx, ty, fp.w, fp.h) !== 1) break;
            const instanceId = this.sim.placeAttractionRotated(templateId, tx, ty, this.selectedAttractionRotation);
            if (instanceId < 0) break;
            recordBuildDate(instanceId, this.gameTime.formatDate());

            this.pendingRideBuild = {
              instanceId,
              templateId,
              x: tx,
              y: ty,
              entryX: -1,
              entryY: -1,
              footprintW: fp.w,
              footprintH: fp.h,
              stage: 'entrance',
              rotation: this.selectedAttractionRotation,
            };
            placed = true;
            this.syncEndpointMarkerSuppression();
            this.onToolChange?.();
            break;
          }

          if (this.pendingRideBuild.templateId !== templateId) {
            this.pendingRideBuild = null;
            this.syncEndpointMarkerSuppression();
            break;
          }

          const pending = this.pendingRideBuild;
          const validEndpoint = this.isEndpointTileValid(tx, ty, pending.x, pending.y, pending.footprintW, pending.footprintH, pending.templateId);
          if (!validEndpoint) break;

          if (pending.stage === 'entrance') {
            pending.entryX = tx;
            pending.entryY = ty;
            pending.stage = 'exit';
            this.onToolChange?.();
            break;
          }

          if (tx === pending.entryX && ty === pending.entryY) break;
          const result = this.sim.setInstEndpoints(
            pending.instanceId,
            pending.entryX,
            pending.entryY,
            tx,
            ty,
          );
          placed = result === 1;
          if (placed) {
            this.onAttractionPlaced?.(pending.instanceId, templateId, pending.x, pending.y);
            this.pendingRideBuild = null;
            this.syncEndpointMarkerSuppression();
            this.selectTool(BuildTool.None);
          }
        }
        break;
      case BuildTool.Bench:
        if (this.furniture && this.sim.getBudget() >= BENCH_COST && this.furniture.placeBench(this.sim, tx, ty)) {
          this.sim.setBudget(this.sim.getBudget() - BENCH_COST);
          placed = true;
        }
        break;
      case BuildTool.TrashCan:
        if (this.furniture && this.sim.getBudget() >= TRASHCAN_COST && this.furniture.placeTrashCan(this.sim, tx, ty)) {
          this.sim.setBudget(this.sim.getBudget() - TRASHCAN_COST);
          placed = true;
        }
        break;
      case BuildTool.Demolish:
        if (this.furniture && this.furniture.hasFurnitureAt(tx, ty)) {
          this.furniture.removeFurnitureAt(tx, ty);
          placed = true;
        } else if (this.scenery && this.scenery.hasAt(tx, ty)) {
          this.scenery.removeAt(tx, ty);
          placed = true;
        } else {
          const instanceId = this.sim.instanceAtTile(tx, ty);
          if (instanceId >= 0) {
            this.onRequestDemolishAttraction?.(instanceId);
            return;
          }
          placed = this.sim.demolish(tx, ty) === 1;
        }
        break;
    }

    if (placed) {
      this.onBudgetChange?.();
    }
  }

  private findVisitorAtTile(tx: number, ty: number): number {
    for (let i = 0; i < 100; i++) {
      if (this.sim.getVisitorState(i) === 255) continue;
      if (this.sim.getVisitorX(i) === tx && this.sim.getVisitorY(i) === ty) return i;
    }
    return -1;
  }

  private isHoldingEntity(): boolean {
    return this.heldVisitorIndex >= 0 || (this.heldEmployeeKind !== null && this.heldEmployeeIndex >= 0);
  }

  private pickupEntityAt(tx: number, ty: number): boolean {
    const employee = this.findEmployeeAtTile(tx, ty);
    if (employee) {
      this.heldEmployeeKind = employee.kind;
      this.heldEmployeeIndex = employee.index;
      this.onToolChange?.();
      return true;
    }
    const visitor = this.findVisitorAtTile(tx, ty);
    if (visitor >= 0) {
      this.heldVisitorIndex = visitor;
      this.onToolChange?.();
      return true;
    }
    return false;
  }

  private dropHeldEntityAt(tx: number, ty: number, tileType: number): void {
    if (!this.isHoldingEntity()) return;

    if (tileType === TileType.Water) {
      if (this.heldVisitorIndex >= 0) {
        this.sim.drownVisitor(this.heldVisitorIndex);
        this.renderer.triggerDrownAt(tx, ty, true);
      } else if (this.heldEmployeeKind && this.heldEmployeeIndex >= 0) {
        if (this.heldEmployeeKind === 'mechanic') this.sim.drownMechanic(this.heldEmployeeIndex);
        else if (this.heldEmployeeKind === 'cleaner') this.sim.drownCleaner(this.heldEmployeeIndex);
        else if (this.heldEmployeeKind === 'security') this.sim.drownSecurity(this.heldEmployeeIndex);
        else this.sim.drownEntertainer(this.heldEmployeeIndex);
        this.renderer.triggerDrownAt(tx, ty, false);
      }
      this.clearHeldEntity();
      this.onBudgetChange?.();
      this.onToolChange?.();
      return;
    }

    if (this.heldVisitorIndex >= 0) {
      this.sim.relocateVisitor(this.heldVisitorIndex, tx, ty);
    } else if (this.heldEmployeeKind && this.heldEmployeeIndex >= 0) {
      if (this.heldEmployeeKind === 'mechanic') this.sim.relocateMechanic(this.heldEmployeeIndex, tx, ty);
      else if (this.heldEmployeeKind === 'cleaner') this.sim.relocateCleaner(this.heldEmployeeIndex, tx, ty);
      else if (this.heldEmployeeKind === 'security') this.sim.relocateSecurity(this.heldEmployeeIndex, tx, ty);
      else this.sim.relocateEntertainer(this.heldEmployeeIndex, tx, ty);
    }

    this.clearHeldEntity();
    this.onBudgetChange?.();
    this.onToolChange?.();
  }

  private handlePickupDrop(tx: number, ty: number, tileType: number): void {
    if (!this.isHoldingEntity()) {
      this.pickupEntityAt(tx, ty);
      return;
    }
    this.dropHeldEntityAt(tx, ty, tileType);
  }

  private clearHeldEntity(): void {
    this.heldVisitorIndex = -1;
    this.heldEmployeeKind = null;
    this.heldEmployeeIndex = -1;
    this.renderer.clearDraggedVisitorPreview();
  }

  private findEmployeeAtTile(tx: number, ty: number): { kind: EmployeeKind; index: number } | null {
    for (let i = 0; i < this.sim.getMechanicCount(); i++) {
      if (this.sim.getMechanicX(i) === tx && this.sim.getMechanicY(i) === ty) {
        return { kind: 'mechanic', index: i };
      }
    }
    for (let i = 0; i < this.sim.getCleanerCount(); i++) {
      if (this.sim.getCleanerX(i) === tx && this.sim.getCleanerY(i) === ty) {
        return { kind: 'cleaner', index: i };
      }
    }
    for (let i = 0; i < this.sim.getSecurityCount(); i++) {
      if (this.sim.getSecurityX(i) === tx && this.sim.getSecurityY(i) === ty) {
        return { kind: 'security', index: i };
      }
    }
    for (let i = 0; i < this.sim.getEntertainerCount(); i++) {
      if (this.sim.getEntertainerX(i) === tx && this.sim.getEntertainerY(i) === ty) {
        return { kind: 'entertainer', index: i };
      }
    }
    return null;
  }

  /** Compute which sub-tile zone the mouse event falls in:
   *  0=center (all), 1=NW, 2=NE, 3=SE, 4=SW,
   *  5=N edge, 6=E edge, 7=S edge, 8=W edge
   */
  private computeTerrainZone(e: MouseEvent): number {
    const T = ECONOMY.tileSize;
    const z = this.renderer.camera.zoom;
    const screen = this.renderer.app.screen;
    const ox = screen.width / 2 - this.renderer.camera.x * z;
    const oy = screen.height / 2 - this.renderer.camera.y * z;
    const screenPos = this.toCanvasScreen(e.clientX, e.clientY);
    const sx = screenPos.x;
    const sy = screenPos.y;
    const worldX = (sx - ox) / z;
    const worldY = (sy - oy) / z;
    const picked = this.pickTileFromClient(e.clientX, e.clientY);
    const pickedH = (picked.x >= 0 && picked.y >= 0 && picked.x < ECONOMY.mapWidth && picked.y < ECONOMY.mapHeight)
      ? this.sim.getTileHeight(picked.x, picked.y)
      : 0;
    const adjustedWorldY = worldY + pickedH * BuildController.TERRAIN_PIXEL_STEP;
    const localX = ((worldX % T) + T) % T;
    const localY = ((adjustedWorldY % T) + T) % T;
    const edge = Math.max(3, Math.floor(T * 0.28)); // ~4-5px zone around corners/edges
    if (localX <= edge && localY <= edge) return 1;          // NW corner
    if (localX >= T - edge && localY <= edge) return 2;      // NE corner
    if (localX >= T - edge && localY >= T - edge) return 3;  // SE corner
    if (localX <= edge && localY >= T - edge) return 4;      // SW corner
    if (localY <= edge) return 5;                             // N edge
    if (localX >= T - edge) return 6;                        // E edge
    if (localY >= T - edge) return 7;                        // S edge
    if (localX <= edge) return 8;                            // W edge
    return 0;                                                 // center
  }

  /** Apply the current terrain zone edit to one tile and mark it touched. */
  private applyTerrainZone(tx: number, ty: number): void {
    if (tx < 0 || ty < 0 || tx >= ECONOMY.mapWidth || ty >= ECONOMY.mapHeight) return;
    const placed = this.sim.adjustTerrainZone(tx, ty, this.terrainZone, this.terrainDragDelta) === 1;
    const key = tx | (ty << 16);
    this.terrainTouched.add(key);
    if (placed) this.onBudgetChange?.();
  }
}
