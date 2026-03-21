/* =============================================
   Park Tycoon – PixiJS WebGL Renderer
   Renders the isometric-ish pixel tile map,
   visitors, and build-tool ghost overlay.
   Uses nearest-neighbor scaling for crisp pixels.
   ============================================= */

import * as PIXI from 'pixi.js';
import { ECONOMY } from '../game/config/economy';
import ATTRACTIONS, { type AttractionDef } from '../game/config/attractions';
import { type SimExports, TileType, VisitorState, BuildTool, TILE_ATTRACTION_BASE, type Camera } from '../game/types';
import { type WeatherType } from '../game/Weather';
import { generateSpriteAtlas, isAnimatedAttraction, type SpriteAtlas } from './SpriteGen';
import { type FurnitureSystem } from '../game/Furniture';
import { type ScenerySystem } from '../game/Scenery';
import { getSceneryDef } from '../game/config/scenery';
import { getTreeDef } from '../game/config/trees';
import { getTrackPieceTiles, type CoasterTrackSystem } from '../game/RollerCoasterTrack';
import { getTrackPieceDrawer, getCartDrawer, TrackHillTransition } from './sprites/coasterTrack';
import { getTrackConfig } from '../game/config/tracks';
import { connectionMaskAt, isPathTile, pathAxisAt, trashCanOffsetForPath } from './utils/tileConnections';
import { advanceCartProgress, cartTextureKey, resolveCornerRenderType, trackTextureKey } from './utils/coasterRenderState';
import { type QualityProfile } from '../game/uiMode';

const T = ECONOMY.tileSize;
const MAP_W = ECONOMY.mapWidth;
const MAP_H = ECONOMY.mapHeight;
const TERRAIN_PIXEL_STEP = 4;
const NO_ENDPOINT_MARKER_TEMPLATE_IDS = new Set<number>([17, 18]);

export class Renderer {
  app: PIXI.Application;
  atlas!: SpriteAtlas;
  baseTexture!: PIXI.BaseTexture;
  textures: Map<string, PIXI.Texture> = new Map();

  // layers
  groundContainer!: PIXI.Container;
  slopeContainer!: PIXI.Container;
  tileOverlayContainer!: PIXI.Container;
  upperPathContainer!: PIXI.Container;
  supportContainer!: PIXI.Container;
  entityContainer!: PIXI.Container;
  ghostContainer!: PIXI.Container;
  uiContainer!: PIXI.Container;
  weatherContainer!: PIXI.Container;
  coasterBeamContainer!: PIXI.Container;
  coasterBeamGraphics!: PIXI.Graphics;

  // tile sprite pool
  tileSprites: PIXI.Sprite[] = [];
  tileOverlaySprites: PIXI.Sprite[] = [];
  slopeSprites: PIXI.Sprite[] = [];
  upperPathSprites: PIXI.Sprite[] = [];
  supportSprites: PIXI.Sprite[] = [];
  tunnelSprites: PIXI.Sprite[] = [];
  visitorSprites: PIXI.Sprite[] = [];
  visitorPropSprites: PIXI.Graphics[] = [];
  mechanicSprites: PIXI.Sprite[] = [];
  cleanerSprites: PIXI.Sprite[] = [];
  securitySprites: PIXI.Sprite[] = [];
  entertainerSprites: PIXI.Sprite[] = [];
  pukeSprites: PIXI.Sprite[] = [];
  benchSprites: PIXI.Sprite[] = [];
  trashCanSprites: PIXI.Sprite[] = [];
  litterSprites: PIXI.Sprite[] = [];
  scenerySprites: PIXI.Sprite[] = [];
  endpointMarkerSprites: PIXI.Sprite[] = [];
  ghostSprites: PIXI.Sprite[] = [];
  weatherSprites: PIXI.Sprite[] = [];
  heatwaveSprites: PIXI.Sprite[] = [];
  thunderFlash!: PIXI.Graphics;

  camera: Camera = { x: 0, y: 0, zoom: 2 };

  private sim!: SimExports;
  private furniture: FurnitureSystem | null = null;
  private scenery: ScenerySystem | null = null;
  private coasterTracks: CoasterTrackSystem | null = null;
  private currentWeather: WeatherType = 'average';
  private thunderCooldown = 0;
  private thunderIntensity = 0;
  private rainTexture!: PIXI.Texture;
  private snowTexture!: PIXI.Texture;
  private heatTexture!: PIXI.Texture;
  private customAttractionTextures: Map<number, PIXI.Texture> = new Map();
  private coasterTrackTexCache: Map<string, PIXI.Texture> = new Map();
  private coasterTrackSprites: PIXI.Sprite[] = [];
  private coasterCartSprites: PIXI.Sprite[] = [];
  private coasterCartProgress: Map<number, number> = new Map();
  private suppressedEndpointMarkerInstances: Set<number> = new Set();
  private draggedVisitorPreview: { index: number; clientX: number; clientY: number } | null = null;
  private drownEffects: Array<{
    g: PIXI.Graphics;
    x: number;
    y: number;
    age: number;
    duration: number;
    isGuest: boolean;
  }> = [];

  private inferLandTextureAt(x: number, y: number): string {
    const neighbors: number[] = [];
    if (x > 0) neighbors.push(this.sim.tileAt(x - 1, y));
    if (x + 1 < MAP_W) neighbors.push(this.sim.tileAt(x + 1, y));
    if (y > 0) neighbors.push(this.sim.tileAt(x, y - 1));
    if (y + 1 < MAP_H) neighbors.push(this.sim.tileAt(x, y + 1));

    const counts = new Map<number, number>();
    for (const t of neighbors) {
      if (t === TileType.LandGrass || t === TileType.LandDesert || t === TileType.LandMud || t === TileType.LandDarkGrass) {
        counts.set(t, (counts.get(t) || 0) + 1);
      }
    }

    let best = TileType.LandGrass;
    let bestCount = -1;
    for (const [t, c] of counts) {
      if (c > bestCount) {
        best = t;
        bestCount = c;
      }
    }

    if (best === TileType.LandDesert) return 'land_desert';
    if (best === TileType.LandMud) return 'land_mud';
    if (best === TileType.LandDarkGrass) return 'land_dark_grass';
    return 'land_grass';
  }

  // Global animation tick for attraction tile frames (~30 fps → swap every 30 ticks ≈ 1 s)
  private attrAnimTick = 0;
  private qualityProfile: QualityProfile = {
    tier: 'high',
    waterAnimationDivisor: 10,
    attractionAnimationDivisor: 30,
    weatherDensity: 1,
    thunderEnabled: true,
  };

  private tileAtSafe(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return TileType.Empty;
    return this.sim.tileAt(x, y);
  }

  // Per-visitor animation tracking
  private vPrevX = new Int32Array(100);
  private vPrevY = new Int32Array(100);
  private vPrevState = new Uint8Array(100).fill(255);
  private vDirection = new Uint8Array(100); // 0=down,1=up,2=left,3=right
  private vAnimTimer = new Uint16Array(100);
  private vCheerTimer = new Uint8Array(100);

  getSnapshot(): { camera: Camera } {
    return {
      camera: {
        x: this.camera.x,
        y: this.camera.y,
        zoom: this.camera.zoom,
      },
    };
  }

  restoreSnapshot(snapshot: { camera: Camera }): void {
    this.camera.x = snapshot.camera.x;
    this.camera.y = snapshot.camera.y;
    this.camera.zoom = snapshot.camera.zoom;
  }

  setDraggedVisitorPreview(index: number, clientX: number, clientY: number): void {
    this.draggedVisitorPreview = { index, clientX, clientY };
  }

  clearDraggedVisitorPreview(): void {
    this.draggedVisitorPreview = null;
  }

  constructor(private container: HTMLElement) {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x2c2c2c,
      backgroundAlpha: 0,
      antialias: false,
      resolution: 1,
      autoDensity: true,
    });
    // Crisp pixel rendering
    PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
    container.appendChild(this.app.view as HTMLCanvasElement);
  }

  async init(sim: SimExports): Promise<void> {
    this.sim = sim;

    // Generate sprite atlas
    this.atlas = generateSpriteAtlas();
    const blob = await this.atlas.canvas.convertToBlob();
    const url = URL.createObjectURL(blob);
    this.baseTexture = PIXI.BaseTexture.from(url, { scaleMode: PIXI.SCALE_MODES.NEAREST });

    // Wait for base texture to load
    await new Promise<void>((resolve) => {
      if (this.baseTexture.valid) { resolve(); return; }
      this.baseTexture.once('loaded', () => resolve());
    });

    // Create sub-textures for each region
    for (const [key, r] of this.atlas.regions) {
      this.textures.set(key, new PIXI.Texture(
        this.baseTexture,
        new PIXI.Rectangle(r.x, r.y, r.w, r.h)
      ));
    }

    await this.loadCustomAttractionTextures();

    // Build scene graph layers
    this.groundContainer = new PIXI.Container();
    this.slopeContainer = new PIXI.Container();
    this.tileOverlayContainer = new PIXI.Container();
    this.upperPathContainer = new PIXI.Container();
    this.supportContainer = new PIXI.Container();
    this.entityContainer = new PIXI.Container();
    this.ghostContainer = new PIXI.Container();
    this.weatherContainer = new PIXI.Container();
    this.coasterBeamContainer = new PIXI.Container();
    this.uiContainer = new PIXI.Container();

    this.app.stage.addChild(this.groundContainer);
    this.app.stage.addChild(this.slopeContainer);
    this.app.stage.addChild(this.tileOverlayContainer);
    this.app.stage.addChild(this.upperPathContainer);
    this.app.stage.addChild(this.supportContainer);
    this.app.stage.addChild(this.coasterBeamContainer);
    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.ghostContainer);
    this.app.stage.addChild(this.weatherContainer);
    this.app.stage.addChild(this.uiContainer);

    this.coasterBeamGraphics = new PIXI.Graphics();
    this.coasterBeamContainer.addChild(this.coasterBeamGraphics);

    this.createWeatherTextures();
    this.createWeatherSprites();
    this.createThunderFlash();

    // Pre-allocate tile sprites for full map
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const spr = new PIXI.Sprite(this.textures.get('grass')!);
        spr.x = x * T;
        spr.y = y * T;
        spr.width = T;
        spr.height = T;
        this.groundContainer.addChild(spr);
        this.tileSprites.push(spr);

        const overlay = new PIXI.Sprite(this.textures.get('tree_pine')!);
        overlay.x = x * T;
        overlay.y = y * T;
        overlay.width = T;
        overlay.height = T;
        overlay.visible = false;
        this.tileOverlayContainer.addChild(overlay);
        this.tileOverlaySprites.push(overlay);

        const slope = new PIXI.Sprite(this.textures.get('slope_0')!);
        slope.x = x * T;
        slope.y = y * T;
        slope.width = T;
        slope.height = T;
        slope.visible = false;
        this.slopeContainer.addChild(slope);
        this.slopeSprites.push(slope);

        const upperPath = new PIXI.Sprite(this.textures.get('path_muddy_0')!);
        upperPath.x = x * T;
        upperPath.y = y * T;
        upperPath.width = T;
        upperPath.height = T;
        upperPath.visible = false;
        this.upperPathContainer.addChild(upperPath);
        this.upperPathSprites.push(upperPath);

        const support = new PIXI.Sprite(this.textures.get('bridge_support')!);
        support.x = x * T;
        support.y = y * T;
        support.width = T;
        support.height = T;
        support.visible = false;
        this.supportContainer.addChild(support);
        this.supportSprites.push(support);

        const tunnel = new PIXI.Sprite(this.textures.get('tunnel_overlay')!);
        tunnel.x = x * T;
        tunnel.y = y * T;
        tunnel.width = T;
        tunnel.height = T;
        tunnel.visible = false;
        this.supportContainer.addChild(tunnel);
        this.tunnelSprites.push(tunnel);
      }
    }

    // Pre-allocate visitor sprites (max 100)
    for (let i = 0; i < 100; i++) {
      const spr = new PIXI.Sprite(this.textures.get(`visitor_${i % 6}`)!);
      spr.visible = false;
      spr.anchor.set(0.25, 0.5);
      this.entityContainer.addChild(spr);
      this.visitorSprites.push(spr);

      const prop = new PIXI.Graphics();
      prop.visible = false;
      this.entityContainer.addChild(prop);
      this.visitorPropSprites.push(prop);
    }

    // Pre-allocate mechanic sprites (max 8)
    for (let i = 0; i < 8; i++) {
      const spr = new PIXI.Sprite(this.textures.get('mechanic')!);
      spr.visible = false;
      spr.anchor.set(0.25, 0.5);
      this.entityContainer.addChild(spr);
      this.mechanicSprites.push(spr);
    }

    // Pre-allocate cleaner sprites (max 8)
    for (let i = 0; i < 8; i++) {
      const spr = new PIXI.Sprite(this.textures.get('cleaner')!);
      spr.visible = false;
      spr.anchor.set(0.25, 0.5);
      this.entityContainer.addChild(spr);
      this.cleanerSprites.push(spr);
    }

    // Pre-allocate security sprites (max 8)
    for (let i = 0; i < 8; i++) {
      const spr = new PIXI.Sprite(this.textures.get('security')!);
      spr.visible = false;
      spr.anchor.set(0.25, 0.5);
      this.entityContainer.addChild(spr);
      this.securitySprites.push(spr);
    }

    // Pre-allocate entertainer sprites (max 8)
    for (let i = 0; i < 8; i++) {
      const spr = new PIXI.Sprite(this.textures.get('entertainer_dance_0')!);
      spr.visible = false;
      spr.anchor.set(0.25, 0.5);
      this.entityContainer.addChild(spr);
      this.entertainerSprites.push(spr);
    }

    // Pre-allocate puke decals on paths.
    for (let i = 0; i < MAP_W * MAP_H; i++) {
      const spr = new PIXI.Sprite(this.textures.get('puke_0')!);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.pukeSprites.push(spr);
    }

    // Pre-allocate bench sprites (up to 200)
    for (let i = 0; i < 200; i++) {
      const spr = new PIXI.Sprite(this.textures.get('bench_h')!);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.benchSprites.push(spr);
    }

    // Pre-allocate trash can sprites (up to 200)
    for (let i = 0; i < 200; i++) {
      const spr = new PIXI.Sprite(this.textures.get('trashcan_0')!);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.trashCanSprites.push(spr);
    }

    // Pre-allocate litter sprites
    for (let i = 0; i < MAP_W * MAP_H; i++) {
      const spr = new PIXI.Sprite(this.textures.get('litter_0')!);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.litterSprites.push(spr);
    }

    // Pre-allocate scenery sprites
    for (let i = 0; i < 300; i++) {
      const spr = new PIXI.Sprite(this.textures.get('scenery_flowers')!);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.scenerySprites.push(spr);
    }

    // Pre-allocate ride endpoint marker sprites (entrance/exit)
    for (let i = 0; i < MAP_W * MAP_H; i++) {
      const spr = new PIXI.Sprite(this.textures.get('ride_entrance_marker')!);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.endpointMarkerSprites.push(spr);
    }

    // Pre-allocate coaster track piece sprites (up to 400 track pieces)
    for (let i = 0; i < 400; i++) {
      const spr = new PIXI.Sprite(PIXI.Texture.EMPTY);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      this.entityContainer.addChild(spr);
      this.coasterTrackSprites.push(spr);
    }

    // Pre-allocate coaster cart sprites (up to 24 active carts)
    for (let i = 0; i < 24; i++) {
      const spr = new PIXI.Sprite(PIXI.Texture.EMPTY);
      spr.visible = false;
      spr.width = T;
      spr.height = T;
      spr.anchor.set(0.5, 0.5);
      this.entityContainer.addChild(spr);
      this.coasterCartSprites.push(spr);
    }

    // Ghost preview sprites (max 16 tiles for large footprints)
    for (let i = 0; i < 16; i++) {
      const spr = new PIXI.Sprite(this.textures.get('ghost_path_muddy')!);
      spr.visible = false;
      this.ghostContainer.addChild(spr);
      this.ghostSprites.push(spr);
    }

    // Center camera (account for base terrain height offset)
    this.camera.x = (MAP_W * T) / 2;
    this.camera.y = (MAP_H * T) / 2 - this.sim.getBaseHeight() * TERRAIN_PIXEL_STEP;
  }

  setFurniture(furniture: FurnitureSystem): void {
    this.furniture = furniture;
  }

  setScenery(scenery: ScenerySystem): void {
    this.scenery = scenery;
  }

  setCoasterTracks(ct: CoasterTrackSystem): void {
    this.coasterTracks = ct;
  }

  setSuppressedEndpointMarkers(instanceIds: number[]): void {
    this.suppressedEndpointMarkerInstances = new Set(instanceIds);
  }

  triggerDrownAt(tileX: number, tileY: number, isGuest: boolean): void {
    const g = new PIXI.Graphics();
    this.entityContainer.addChild(g);
    this.drownEffects.push({
      g,
      x: tileX,
      y: tileY,
      age: 0,
      duration: 36,
      isGuest,
    });
  }

  private getCoasterTexture(key: string, drawer: (ctx: OffscreenCanvasRenderingContext2D) => void): PIXI.Texture {
    let tex = this.coasterTrackTexCache.get(key);
    if (tex) return tex;
    const canvas = new OffscreenCanvas(T, T);
    const ctx = canvas.getContext('2d')!;
    // Scale from 16x16 sprite space to tile size
    ctx.scale(T / 16, T / 16);
    drawer(ctx);
    const base = PIXI.BaseTexture.from(canvas as any, { scaleMode: PIXI.SCALE_MODES.NEAREST });
    tex = new PIXI.Texture(base);
    this.coasterTrackTexCache.set(key, tex);
    return tex;
  }

  /** Clear cached track textures (call when a track color changes) */
  clearCoasterTexCache(): void {
    for (const tex of this.coasterTrackTexCache.values()) tex.destroy(true);
    this.coasterTrackTexCache.clear();
  }

  getTexture(key: string): PIXI.Texture {
    return this.textures.get(key) || this.textures.get('grass')!;
  }

  private async loadCustomAttractionTextures(): Promise<void> {
    const jobs = ATTRACTIONS
      .filter((attr) => attr.spriteUrl)
      .map(async (attr) => {
        const url = attr.spriteUrl;
        if (!url) return;
        try {
          const base = PIXI.BaseTexture.from(url, { scaleMode: PIXI.SCALE_MODES.NEAREST });
          await new Promise<void>((resolve) => {
            if (base.valid) {
              resolve();
              return;
            }
            base.once('loaded', () => resolve());
            base.once('error', () => resolve());
          });
          if (!base.valid) {
            console.warn(`Failed to load attraction sprite for ${attr.name} from ${url}`);
            return;
          }
          const tex = new PIXI.Texture(base, new PIXI.Rectangle(0, 0, base.width, base.height));
          this.customAttractionTextures.set(attr.id, tex);
        } catch (err) {
          console.warn(`Failed to load attraction sprite for ${attr.name} from ${url}`, err);
        }
      });
    await Promise.all(jobs);
  }

  setWeather(weather: WeatherType): void {
    if (this.currentWeather === weather) return;
    this.currentWeather = weather;
    this.resetWeatherSprites();
  }

  setQualityProfile(profile: QualityProfile): void {
    this.qualityProfile = { ...profile };
  }

  /* ── per-frame render update ── */
  update(paused: boolean = false): void {
    const sim = this.sim;
    const furn = this.furniture;
    const scenery = this.scenery;

    // Update camera transform
    const z = this.camera.zoom;
    const screenW = this.app.screen.width;
    const screenH = this.app.screen.height;
    const ox = screenW / 2 - this.camera.x * z;
    const oy = screenH / 2 - this.camera.y * z;

    for (const layer of [
      this.groundContainer,
      this.slopeContainer,
      this.tileOverlayContainer,
      this.upperPathContainer,
      this.supportContainer,
      this.coasterBeamContainer,
      this.entityContainer,
      this.ghostContainer,
    ]) {
      layer.x = ox;
      layer.y = oy;
      layer.scale.set(z, z);
    }

    this.weatherContainer.x = 0;
    this.weatherContainer.y = 0;
    this.weatherContainer.scale.set(1, 1);

    // Freeze visual animations while paused so the scene is fully static.
    if (!paused) {
      this.attrAnimTick++;
    }

    // Update tile sprites
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const idx = y * MAP_W + x;
        const spr = this.tileSprites[idx];
        const overlaySpr = this.tileOverlaySprites[idx];
        const tileVal = sim.tileAt(x, y);
        const h = sim.getTileHeight(x, y);
        const slopeMask = sim.getTileSlopeMask(x, y);

        let groundTexKey = 'land_grass';
        let overlayTexKey: string | undefined;
        let overlayOverrideTex: PIXI.Texture | undefined;
        let overlayRotationRadians = 0;
        let overlayUseCenteredRotation = false;
        const rampDir = sim.getRampDirection(x, y);

        if (tileVal === TileType.PathMuddy) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = rampDir > 0 ? `ramp_path_muddy_${rampDir}` : `path_muddy_${connectionMaskAt(x, y, (ax, ay) => this.tileAtSafe(ax, ay), (t) => isPathTile(t))}`;
        } else if (tileVal === TileType.PathDesert) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = rampDir > 0 ? `ramp_path_desert_${rampDir}` : `path_desert_${connectionMaskAt(x, y, (ax, ay) => this.tileAtSafe(ax, ay), (t) => isPathTile(t))}`;
        } else if (tileVal === TileType.PathConcrete) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = rampDir > 0 ? `ramp_path_concrete_${rampDir}` : `path_concrete_${connectionMaskAt(x, y, (ax, ay) => this.tileAtSafe(ax, ay), (t) => isPathTile(t))}`;
        } else if (tileVal === TileType.PathQueue) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = rampDir > 0 ? `ramp_path_queue_${rampDir}` : `path_queue_${connectionMaskAt(x, y, (ax, ay) => this.tileAtSafe(ax, ay), (t) => isPathTile(t))}`;
        }
        else if (tileVal === TileType.LandGrass) groundTexKey = 'land_grass';
        else if (tileVal === TileType.LandDesert) groundTexKey = 'land_desert';
        else if (tileVal === TileType.LandMud) groundTexKey = 'land_mud';
        else if (tileVal === TileType.LandDarkGrass) groundTexKey = 'land_dark_grass';
        else if (tileVal === TileType.TreePine) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_pine';
        }
        else if (tileVal === TileType.TreeBig) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_big';
        }
        else if (tileVal === TileType.TreeSmall) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_small';
        }
        else if (tileVal === TileType.TreeCactus) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_cactus';
        }
        else if (tileVal === TileType.TreeCherry) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_cherry';
        }
        else if (tileVal === TileType.TreeShrubbery) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_shrubbery';
        }
        else if (tileVal === TileType.TreeApple) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_apple';
        }
        else if (tileVal === TileType.TreeLemon) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'tree_lemon';
        }
        else if (tileVal === TileType.Water) {
          groundTexKey = 'water';
          const mask = connectionMaskAt(x, y, (ax, ay) => this.tileAtSafe(ax, ay), (t) => t === TileType.Water);
          const frame = Math.floor(this.attrAnimTick / this.qualityProfile.waterAnimationDivisor) % 3;
          // Offset phase by tile position to avoid all water tiles animating in lockstep.
          const phasedFrame = (frame + ((x + y) % 3)) % 3;
          groundTexKey = `water_${mask}_${phasedFrame}`;
        }
        else if (tileVal === TileType.Entrance) {
          groundTexKey = this.inferLandTextureAt(x, y);
          overlayTexKey = 'entrance';
        }
        else if (tileVal >= TILE_ATTRACTION_BASE) {
          groundTexKey = this.inferLandTextureAt(x, y);
          const instIdx = tileVal - TILE_ATTRACTION_BASE;
          const templateId = sim.getInstTemplateId(instIdx);
          const ax = sim.getInstX(instIdx);
          const ay = sim.getInstY(instIdx);
          const rot = sim.getInstRotation(instIdx);
          const lx = x - ax;
          const ly = y - ay;
          const attrDef = ATTRACTIONS.find(a => a.id === templateId);
          const mapped = attrDef
            ? this.mapRotatedTileToTemplate(lx, ly, attrDef.footprint.w, attrDef.footprint.h, rot)
            : { tx: lx, ty: ly };

          // Optional image-based override for 1x1 attractions (e.g. Burger Stand).
          const customTex = this.customAttractionTextures.get(templateId);
          if (customTex && lx === 0 && ly === 0) {
            overlayOverrideTex = customTex;
            overlayRotationRadians = (rot * Math.PI) / 180;
            overlayUseCenteredRotation = true;
          }

          // Choose animation frame: freeze on frame 0 when broken or not animated
          let frame = 0;
          if (isAnimatedAttraction(templateId) && sim.getInstBroken(instIdx) === 0) {
            frame = Math.floor(this.attrAnimTick / this.qualityProfile.attractionAnimationDivisor) % 2;
          }
          if (!overlayOverrideTex) {
            overlayTexKey = frame === 0
              ? `attr_${templateId}_${mapped.tx}_${mapped.ty}`
              : `attr_${templateId}_${mapped.tx}_${mapped.ty}_f1`;
          }
        } else {
          groundTexKey = this.inferLandTextureAt(x, y);
        }

        const tex = this.textures.get(groundTexKey);
        if (tex && spr.texture !== tex) {
          spr.texture = tex;
        }
        spr.y = y * T - h * TERRAIN_PIXEL_STEP;
        if (h <= 0) {
          spr.tint = 0xffffff;
        } else {
          const shade = Math.max(140, 255 - h * 16);
          let tint = (shade << 16) | (shade << 8) | shade;
          if (slopeMask !== 0) {
            const s = Math.max(120, shade - 10);
            tint = (s << 16) | (Math.min(255, s + 18) << 8) | s;
          }
          spr.tint = tint;
        }

        if (overlayTexKey || overlayOverrideTex) {
          const overlayTex = overlayOverrideTex ?? this.textures.get(overlayTexKey!);
          if (overlayTex && overlaySpr.texture !== overlayTex) {
            overlaySpr.texture = overlayTex;
          }
          overlaySpr.visible = true;
          if (overlayUseCenteredRotation) {
            overlaySpr.anchor.set(0.5, 0.5);
            overlaySpr.x = x * T + T * 0.5;
            overlaySpr.y = y * T - h * TERRAIN_PIXEL_STEP + T * 0.5;
            overlaySpr.rotation = overlayRotationRadians;
          } else {
            overlaySpr.anchor.set(0, 0);
            overlaySpr.x = x * T;
            overlaySpr.y = y * T - h * TERRAIN_PIXEL_STEP;
            overlaySpr.rotation = 0;
          }
          overlaySpr.tint = spr.tint;
          overlaySpr.alpha = 1;
        } else {
          overlaySpr.visible = false;
          overlaySpr.rotation = 0;
          overlaySpr.anchor.set(0, 0);
          overlaySpr.alpha = 1;
          overlaySpr.tint = 0xffffff;
        }

        const slopeSpr = this.slopeSprites[idx];
        slopeSpr.x = x * T;
        slopeSpr.y = y * T - h * TERRAIN_PIXEL_STEP;
        if (slopeMask > 0 && tileVal !== TileType.Water) {
          const slopeTex = this.textures.get(`slope_${slopeMask}`);
          if (slopeTex && slopeSpr.texture !== slopeTex) slopeSpr.texture = slopeTex;
          slopeSpr.visible = true;
          slopeSpr.alpha = 1;
        } else {
          slopeSpr.visible = false;
        }

        const upperPathSpr = this.upperPathSprites[idx];
        const supportSpr = this.supportSprites[idx];
        const tunnelSpr = this.tunnelSprites[idx];

        // Scan for multi-level paths (non-ground height)
        let foundLevel = -1;
        let foundVariant = -1;
        const maxLevels = 9;
        for (let lvl = 0; lvl < maxLevels; lvl++) {
          if (lvl === h) continue; // skip ground level (already rendered)
          const v = this.sim.getPathAtHeight(x, y, lvl);
          if (v >= 0) {
            foundLevel = lvl;
            foundVariant = v;
            break;
          }
        }

        // Fall back to legacy upper path system
        if (foundLevel < 0) {
          const upVariant = this.sim.getUpperPathVariant(x, y);
          if (upVariant >= 0) {
            foundLevel = this.sim.getUpperPathHeight(x, y);
            foundVariant = upVariant;
          }
        }

        if (foundLevel >= 0 && foundVariant >= 0) {
          const upH = foundLevel;
          const upRampDir = this.sim.getPathLevelRampDir(x, y, upH);

          let upMask = 0;
          if (this.sim.getPathAtHeight(x, y - 1, upH) >= 0 || (this.sim.getUpperPathVariant(x, y - 1) >= 0 && this.sim.getUpperPathHeight(x, y - 1) === upH)) upMask |= 1;
          if (this.sim.getPathAtHeight(x + 1, y, upH) >= 0 || (this.sim.getUpperPathVariant(x + 1, y) >= 0 && this.sim.getUpperPathHeight(x + 1, y) === upH)) upMask |= 2;
          if (this.sim.getPathAtHeight(x, y + 1, upH) >= 0 || (this.sim.getUpperPathVariant(x, y + 1) >= 0 && this.sim.getUpperPathHeight(x, y + 1) === upH)) upMask |= 4;
          if (this.sim.getPathAtHeight(x - 1, y, upH) >= 0 || (this.sim.getUpperPathVariant(x - 1, y) >= 0 && this.sim.getUpperPathHeight(x - 1, y) === upH)) upMask |= 8;

          const prefix = foundVariant === 1
            ? 'path_desert'
            : foundVariant === 2
              ? 'path_concrete'
              : foundVariant === 3
                ? 'path_queue'
                : 'path_muddy';
          const upTexKey = upRampDir > 0
            ? `ramp_${prefix}_${upRampDir}`
            : `${prefix}_${upMask}`;
          const upTex = this.textures.get(upTexKey);
          if (upTex && upperPathSpr.texture !== upTex) upperPathSpr.texture = upTex;
          upperPathSpr.visible = true;
          upperPathSpr.x = x * T;
          upperPathSpr.y = y * T - upH * TERRAIN_PIXEL_STEP;
          upperPathSpr.alpha = 0.95;

          if (this.sim.isBridge(x, y, upH)) {
            supportSpr.visible = true;
            supportSpr.x = x * T;
            supportSpr.y = y * T - (upH - 1) * TERRAIN_PIXEL_STEP;
            supportSpr.alpha = 0.8;
          } else {
            supportSpr.visible = false;
          }

          if (this.sim.isTunnel(x, y, upH)) {
            tunnelSpr.visible = true;
            tunnelSpr.x = x * T;
            tunnelSpr.y = y * T - h * TERRAIN_PIXEL_STEP;
            tunnelSpr.alpha = 0.75;
          } else {
            tunnelSpr.visible = false;
          }
        } else {
          upperPathSpr.visible = false;
          supportSpr.visible = false;
          tunnelSpr.visible = false;
        }
      }
    }

    // Update visitor sprites
    const DIR_NAMES = ['down', 'up', 'left', 'right'] as const;
    for (let i = 0; i < 100; i++) {
      const spr = this.visitorSprites[i];
      const prop = this.visitorPropSprites[i];
      const state = sim.getVisitorState(i);
      if (state === VisitorState.Inactive) {
        spr.visible = false;
        prop.visible = false;
        if (this.vPrevState[i] !== VisitorState.Inactive) {
          this.vAnimTimer[i] = 0;
          this.vCheerTimer[i] = 0;
          this.vDirection[i] = 0;
        }
        this.vPrevState[i] = state;
        continue;
      }
      spr.visible = true;
      const vx = sim.getVisitorX(i);
      const vy = sim.getVisitorY(i);
      const vlevel = sim.getVisitorPathLevel(i);
      const preview = this.draggedVisitorPreview;
      if (preview && preview.index === i) {
        const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect();
        const sx = (preview.clientX - rect.left) * (this.app.screen.width / rect.width);
        const sy = (preview.clientY - rect.top) * (this.app.screen.height / rect.height);
        const ox = this.app.screen.width / 2 - this.camera.x * this.camera.zoom;
        const oy = this.app.screen.height / 2 - this.camera.y * this.camera.zoom;
        const wx = (sx - ox) / this.camera.zoom;
        const wy = (sy - oy) / this.camera.zoom;
        spr.x = wx - T * 0.25;
        spr.y = wy - T * 0.5;
      } else {
        spr.x = vx * T + T * 0.25;
        spr.y = vy * T - vlevel * TERRAIN_PIXEL_STEP;
      }

      // Initialise tracking on spawn
      if (this.vPrevState[i] === VisitorState.Inactive) {
        this.vPrevX[i] = vx;
        this.vPrevY[i] = vy;
        this.vAnimTimer[i] = 0;
        this.vCheerTimer[i] = 0;
        this.vDirection[i] = 0;
      }

      // Direction from position delta
      const dx = vx - this.vPrevX[i];
      const dy = vy - this.vPrevY[i];
      if (dx !== 0 || dy !== 0) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.vDirection[i] = dx < 0 ? 2 : 3;
        } else {
          this.vDirection[i] = dy < 0 ? 1 : 0;
        }
      }

      // Detect ride finish → cheer
      if (this.vPrevState[i] === VisitorState.Riding && state === VisitorState.Walking) {
        this.vCheerTimer[i] = 40;
      }

      // Freeze visitor animations while paused.
      if (!paused) {
        this.vAnimTimer[i]++;
      }
      const animFrame = Math.floor(this.vAnimTimer[i] / 12) % 2;

      // Select texture
      const variant = i % 6;
      let texKey: string;
      const isCriminal = sim.getVisitorIsCriminal(i) === 1;

      if (isCriminal) {
        texKey = `visitor_${variant}_criminal`;
      } else if (this.vCheerTimer[i] > 0) {
        texKey = `visitor_${variant}_cheer_${animFrame}`;
        this.vCheerTimer[i]--;
      } else if (furn && furn.visitorAnim[i].throwingTrash > 0) {
        texKey = `visitor_${variant}_throw_${animFrame}`;
      } else if (furn && furn.visitorAnim[i].sittingOnBench) {
        texKey = `visitor_${variant}_sit_${animFrame}`;
      } else if (sim.getVisitorPukeTimer(i) > 0) {
        texKey = `visitor_${variant}_puke_${animFrame}`;
      } else if (state === VisitorState.Riding) {
        const target = sim.getVisitorTarget(i);
        const cat = target >= 0 ? sim.getInstCategory(target) : -1;
        if (cat === 3) texKey = `visitor_${variant}_eat`;
        else if (cat === 4) texKey = `visitor_${variant}_drink`;
        else texKey = `visitor_${variant}_down_0`;
      } else if (state === VisitorState.Walking || state === VisitorState.Entering || state === VisitorState.Leaving) {
        texKey = `visitor_${variant}_${DIR_NAMES[this.vDirection[i]]}_${animFrame}`;
      } else if (state === VisitorState.Queuing) {
        texKey = `visitor_${variant}_${DIR_NAMES[this.vDirection[i]]}_0`;
      } else {
        texKey = `visitor_${variant}_down_0`;
      }

      const tex = this.textures.get(texKey);
      if (tex) spr.texture = tex;

      const balloonTimer = sim.getVisitorBalloonTimer(i);
      const umbrellaTimer = sim.getVisitorUmbrellaTimer(i);
      const showUmbrella = this.currentWeather === 'rain' && umbrellaTimer > 0;
      if (balloonTimer > 0 || showUmbrella) {
        prop.clear();
        prop.visible = true;
        prop.x = spr.x;
        prop.y = spr.y;
        if (showUmbrella) {
          prop.lineStyle(1, 0x5d4037, 1);
          prop.moveTo(8, 6);
          prop.lineTo(8, -6);
          prop.beginFill(0x2e86de, 0.95);
          prop.moveTo(2, -6);
          prop.quadraticCurveTo(8, -12, 14, -6);
          prop.lineTo(2, -6);
          prop.endFill();
          prop.beginFill(0x9fd2ff, 0.95);
          prop.drawCircle(8, -8, 1);
          prop.endFill();
        }
        if (balloonTimer > 0) {
          const palette = [0xff4d6d, 0xffbe0b, 0x80ed99, 0x4cc9f0, 0xc77dff, 0xf28482];
          const balloonColor = palette[i % palette.length];
          prop.lineStyle(1, 0x8d6e63, 1);
          prop.moveTo(9, 5);
          prop.lineTo(13, -7);
          prop.beginFill(balloonColor, 0.95);
          prop.drawEllipse(13, -11, 4, 5);
          prop.endFill();
          prop.beginFill(0xffffff, 0.65);
          prop.drawCircle(11.5, -13, 1);
          prop.endFill();
        }
      } else {
        prop.visible = false;
      }

      // Satisfaction tint
      const sat = sim.getVisitorSatisfaction(i);
      if (sat < 25) spr.tint = 0xff6666;
      else if (sat < 50) spr.tint = 0xffaa44;
      else spr.tint = 0xffffff;

      // Store for next frame
      this.vPrevX[i] = vx;
      this.vPrevY[i] = vy;
      this.vPrevState[i] = state;
    }

    // Update mechanic sprites
    const mechanicCount = this.sim.getMechanicCount();
    for (let i = 0; i < this.mechanicSprites.length; i++) {
      const spr = this.mechanicSprites[i];
      if (i >= mechanicCount) {
        spr.visible = false;
        continue;
      }
      const mx = this.sim.getMechanicX(i);
      const my = this.sim.getMechanicY(i);
      if (mx < 0 || my < 0) {
        spr.visible = false;
        continue;
      }
      spr.visible = true;
      spr.x = mx * T + T * 0.25;
      spr.y = my * T - this.sim.getTileHeight(mx, my) * TERRAIN_PIXEL_STEP;
      spr.alpha = this.sim.getMechanicRepairTimer(i) > 0 ? 1 : 0.85;
    }

    // Update cleaner sprites
    const cleanerCount = this.sim.getCleanerCount();
    for (let i = 0; i < this.cleanerSprites.length; i++) {
      const spr = this.cleanerSprites[i];
      if (i >= cleanerCount) {
        spr.visible = false;
        continue;
      }
      const cx = this.sim.getCleanerX(i);
      const cy = this.sim.getCleanerY(i);
      if (cx < 0 || cy < 0) {
        spr.visible = false;
        continue;
      }
      spr.visible = true;
      spr.x = cx * T + T * 0.25;
      spr.y = cy * T - this.sim.getTileHeight(cx, cy) * TERRAIN_PIXEL_STEP;
      spr.alpha = this.sim.getCleanerCleanTimer(i) > 0 ? 1 : 0.9;
    }

    // Update security sprites
    const securityCount = this.sim.getSecurityCount();
    for (let i = 0; i < this.securitySprites.length; i++) {
      const spr = this.securitySprites[i];
      if (i >= securityCount) {
        spr.visible = false;
        continue;
      }
      const sx = this.sim.getSecurityX(i);
      const sy = this.sim.getSecurityY(i);
      if (sx < 0 || sy < 0) {
        spr.visible = false;
        continue;
      }
      spr.visible = true;
      spr.x = sx * T + T * 0.25;
      spr.y = sy * T - this.sim.getTileHeight(sx, sy) * TERRAIN_PIXEL_STEP;
      spr.alpha = this.sim.getSecurityTargetVisitor(i) >= 0 ? 1 : 0.9;
    }

    // Update entertainer sprites
    const entertainerCount = this.sim.getEntertainerCount();
    for (let i = 0; i < this.entertainerSprites.length; i++) {
      const spr = this.entertainerSprites[i];
      if (i >= entertainerCount) {
        spr.visible = false;
        continue;
      }
      const ex = this.sim.getEntertainerX(i);
      const ey = this.sim.getEntertainerY(i);
      if (ex < 0 || ey < 0) {
        spr.visible = false;
        continue;
      }
      spr.visible = true;
      spr.x = ex * T + T * 0.25;
      spr.y = ey * T - this.sim.getTileHeight(ex, ey) * TERRAIN_PIXEL_STEP;
      const danceFrame = Math.floor(this.attrAnimTick / 6 + i) % 2;
      spr.texture = this.getTexture(`entertainer_dance_${danceFrame}`);
      spr.alpha = 0.95;
    }

    // Render puke residue on dirty path tiles.
    let pukeIdx = 0;
    const pukeFrame = Math.floor(this.attrAnimTick / 20) % 2;
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const amount = this.sim.getPukeAt(x, y);
        if (amount <= 0) continue;
        if (pukeIdx >= this.pukeSprites.length) break;
        const spr = this.pukeSprites[pukeIdx++];
        spr.visible = true;
        spr.x = x * T;
        spr.y = y * T - this.sim.getTileHeight(x, y) * TERRAIN_PIXEL_STEP;
        spr.texture = this.getTexture(`puke_${pukeFrame}`);
        spr.alpha = Math.min(1, 0.45 + amount * 0.12);
      }
    }
    for (; pukeIdx < this.pukeSprites.length; pukeIdx++) {
      this.pukeSprites[pukeIdx].visible = false;
    }

    // Render benches
    if (furn) {
      for (let i = 0; i < this.benchSprites.length; i++) {
        const spr = this.benchSprites[i];
        if (i < furn.benches.length) {
          const b = furn.benches[i];
          const axis = pathAxisAt(b.x, b.y, (ax, ay) => this.tileAtSafe(ax, ay));
          spr.visible = true;
          spr.x = b.x * T;
          spr.y = b.y * T - sim.getTileHeight(b.x, b.y) * TERRAIN_PIXEL_STEP;
          if (b.broken) {
            spr.texture = this.getTexture(axis === 'vertical' ? 'bench_broken_v' : 'bench_broken_h');
          } else {
            spr.texture = this.getTexture(axis === 'vertical' ? 'bench_v' : 'bench_h');
          }
        } else {
          spr.visible = false;
        }
      }

      // Render trash cans
      for (let i = 0; i < this.trashCanSprites.length; i++) {
        const spr = this.trashCanSprites[i];
        if (i < furn.trashCans.length) {
          const tc = furn.trashCans[i];
          const off = trashCanOffsetForPath(tc.x, tc.y, (ax, ay) => this.tileAtSafe(ax, ay));
          spr.visible = true;
          spr.x = tc.x * T + off.ox;
          spr.y = tc.y * T - sim.getTileHeight(tc.x, tc.y) * TERRAIN_PIXEL_STEP + off.oy;
          const texKey = tc.broken ? 'trashcan_broken' : tc.fill >= 8 ? 'trashcan_1' : tc.fill >= 4 ? 'trashcan_half' : 'trashcan_0';
          spr.texture = this.getTexture(texKey);
        } else {
          spr.visible = false;
        }
      }

      // Render litter
      let litterIdx = 0;
      const litterFrame = Math.floor(this.attrAnimTick / 20) % 2;
      for (const [key, amount] of furn.litter) {
        if (litterIdx >= this.litterSprites.length) break;
        const lx = key % MAP_W;
        const ly = Math.floor(key / MAP_W);
        const spr = this.litterSprites[litterIdx++];
        spr.visible = true;
        spr.x = lx * T;
        spr.y = ly * T - sim.getTileHeight(lx, ly) * TERRAIN_PIXEL_STEP;
        spr.texture = this.getTexture(`litter_${litterFrame}`);
        spr.alpha = Math.min(1, 0.5 + amount * 0.12);
      }
      for (; litterIdx < this.litterSprites.length; litterIdx++) {
        this.litterSprites[litterIdx].visible = false;
      }
    }

    // Render scenery
    if (scenery) {
      let sceneryIdx = 0;
      for (const item of scenery.items) {
        if (sceneryIdx >= this.scenerySprites.length) break;
        const spr = this.scenerySprites[sceneryIdx++];
        spr.visible = true;
        spr.x = item.x * T;
        spr.y = item.y * T - sim.getTileHeight(item.x, item.y) * TERRAIN_PIXEL_STEP;
        const def = getSceneryDef(item.type);
        if (def?.animatedFrames && def.animatedFrames > 1) {
          const frame = Math.floor(this.attrAnimTick / 12) % def.animatedFrames;
          spr.texture = this.getTexture(`${def.textureKey}_${frame}`);
        } else {
          spr.texture = this.getTexture(def?.textureKey ?? 'scenery_flowers');
        }
      }
      for (; sceneryIdx < this.scenerySprites.length; sceneryIdx++) {
        this.scenerySprites[sceneryIdx].visible = false;
      }
    }

    // Render ride endpoint markers (entrance/exit) for non-stall attractions.
    for (const spr of this.endpointMarkerSprites) spr.visible = false;
    let markerCursor = 0;
    const instCount = sim.getInstanceCount();
    for (let i = 0; i < instCount; i++) {
      if (sim.isInstActive(i) !== 1) continue;
      if (this.suppressedEndpointMarkerInstances.has(i)) continue;
      const templateId = sim.getInstTemplateId(i);
      const def = ATTRACTIONS.find(a => a.id === templateId);
      if (!def) continue;
      if (NO_ENDPOINT_MARKER_TEMPLATE_IDS.has(templateId)) continue;
      if (def.category === 'food' || def.category === 'drink' || def.category === 'toilet') continue;

      const ex = sim.getInstEntranceX(i);
      const ey = sim.getInstEntranceY(i);
      const xx = sim.getInstExitX(i);
      const xy = sim.getInstExitY(i);

      if (markerCursor < this.endpointMarkerSprites.length && ex >= 0 && ey >= 0 && ex < MAP_W && ey < MAP_H) {
        const spr = this.endpointMarkerSprites[markerCursor++];
        spr.visible = true;
        spr.texture = this.getTexture('ride_entrance_marker');
        spr.x = ex * T;
        spr.y = ey * T - sim.getTileHeight(ex, ey) * TERRAIN_PIXEL_STEP;
        spr.alpha = 1;
      }
      if (markerCursor < this.endpointMarkerSprites.length && xx >= 0 && xy >= 0 && xx < MAP_W && xy < MAP_H) {
        const spr = this.endpointMarkerSprites[markerCursor++];
        spr.visible = true;
        spr.texture = this.getTexture('ride_exit_marker');
        spr.x = xx * T;
        spr.y = xy * T - sim.getTileHeight(xx, xy) * TERRAIN_PIXEL_STEP;
        spr.alpha = 1;
      }
    }

    // Render coaster tracks and carts
    if (this.coasterTracks) {
      let trackSprIdx = 0;
      let cartSprIdx = 0;
      this.coasterBeamGraphics.clear();
      this.coasterBeamGraphics.lineStyle(1, 0x6a6a6a, 0.95);

      const drawTrackBeams = (x: number, y: number, height: number) => {
        const groundH = sim.getTileHeight(x, y);
        const surfaceH = Math.max(groundH, sim.getUpperPathHeight(x, y));
        const topY = y * T - (surfaceH + height) * TERRAIN_PIXEL_STEP + T;
        const groundY = y * T - groundH * TERRAIN_PIXEL_STEP + T;
        if (topY >= groundY) return;

        const x1 = x * T + Math.floor(T * 0.33);
        const x2 = x * T + Math.floor(T * 0.67);
        this.coasterBeamGraphics.moveTo(x1, groundY);
        this.coasterBeamGraphics.lineTo(x1, topY);
        this.coasterBeamGraphics.moveTo(x2, groundY);
        this.coasterBeamGraphics.lineTo(x2, topY);
      };

      const isHillPiece = (type: number): boolean => type === 3 || type === 4;
      const isFlatOrCornerPiece = (type: number): boolean => (
        type === 0 || type === 1 || type === 2 || type === 5 || type === 6
      );
      const getHillTransition = (
        pieces: Array<{ type: number }>,
        index: number,
        isLoop: boolean,
      ): TrackHillTransition => {
        const piece = pieces[index];
        if (!isHillPiece(piece.type)) return TrackHillTransition.None;

        let transition = TrackHillTransition.None;
        const prev = index > 0
          ? pieces[index - 1]
          : isLoop && pieces.length > 1
            ? pieces[pieces.length - 1]
            : null;
        const next = index + 1 < pieces.length
          ? pieces[index + 1]
          : isLoop && pieces.length > 1
            ? pieces[0]
            : null;

        if (prev && isFlatOrCornerPiece(prev.type)) {
          transition |= TrackHillTransition.FlatEntry;
        }
        if (next && isFlatOrCornerPiece(next.type)) {
          transition |= TrackHillTransition.FlatExit;
        }
        return transition;
      };

      // Render tracks being built (active build)
      const build = this.coasterTracks.activeBuild;
      if (build) {
        const buildConfig = getTrackConfig(build.trackStyleId);
        const buildStyle = buildConfig?.spriteStyle ?? 'rails';
        for (let pi = 0; pi < build.pieces.length; pi++) {
          const piece = build.pieces[pi];
          const nextAnchor = pi + 1 < build.pieces.length
            ? { x: build.pieces[pi + 1].x, y: build.pieces[pi + 1].y }
            : { x: build.nextX, y: build.nextY };
          const renderPieceType = resolveCornerRenderType(
            piece.type,
            piece.x,
            piece.y,
            piece.direction,
            piece.height,
            nextAnchor.x,
            nextAnchor.y,
          );
          const hillTransition = getHillTransition(build.pieces, pi, false);
          const pieceTiles = getTrackPieceTiles(renderPieceType, piece.x, piece.y, piece.direction);
          for (let ti = 0; ti < pieceTiles.length; ti++) {
            if (trackSprIdx >= this.coasterTrackSprites.length) break;
            const tile = pieceTiles[ti];
            const isSecondaryTile = ti > 0;
            const spr = this.coasterTrackSprites[trackSprIdx++];
            spr.visible = true;
            spr.x = tile.x * T;
            const surfaceH = Math.max(sim.getTileHeight(tile.x, tile.y), sim.getUpperPathHeight(tile.x, tile.y));
            spr.y = tile.y * T - (surfaceH + piece.height) * TERRAIN_PIXEL_STEP;
            const texKey = `${trackTextureKey(renderPieceType, piece.direction, build.trackColor, piece.height, buildStyle)}_${hillTransition}_${isSecondaryTile ? 1 : 0}`;
            const drawer = getTrackPieceDrawer(renderPieceType, piece.direction, build.trackColor, piece.height, isSecondaryTile, hillTransition, buildStyle);
            spr.texture = this.getCoasterTexture(texKey, drawer);
            drawTrackBeams(tile.x, tile.y, piece.height);
          }
        }
        // Show ghost for next placement position
        if (trackSprIdx < this.coasterTrackSprites.length) {
          const ghost = this.coasterTrackSprites[trackSprIdx++];
          ghost.visible = true;
          ghost.x = build.nextX * T;
          const nextSurfaceH = Math.max(sim.getTileHeight(build.nextX, build.nextY), sim.getUpperPathHeight(build.nextX, build.nextY));
          ghost.y = build.nextY * T - (nextSurfaceH + build.nextHeight) * TERRAIN_PIXEL_STEP;
          ghost.texture = this.getTexture('grass');
          ghost.alpha = 0.5;
          ghost.tint = 0x00ff00;
        }
      }

      // Render completed tracks
      for (const [instId, track] of this.coasterTracks.tracks) {
        const trackConfig = getTrackConfig(track.trackStyleId);
        const trackStyle = trackConfig?.spriteStyle ?? 'rails';
        for (let pi = 0; pi < track.pieces.length; pi++) {
          const piece = track.pieces[pi];
          const nextAnchor = pi + 1 < track.pieces.length
            ? { x: track.pieces[pi + 1].x, y: track.pieces[pi + 1].y }
            : { x: track.stationX, y: track.stationY };
          const renderPieceType = resolveCornerRenderType(
            piece.type,
            piece.x,
            piece.y,
            piece.direction,
            piece.height,
            nextAnchor.x,
            nextAnchor.y,
          );
          const hillTransition = getHillTransition(track.pieces, pi, track.complete);
          const pieceTiles = getTrackPieceTiles(renderPieceType, piece.x, piece.y, piece.direction);
          for (let ti = 0; ti < pieceTiles.length; ti++) {
            if (trackSprIdx >= this.coasterTrackSprites.length) break;
            const tile = pieceTiles[ti];
            const isSecondaryTile = ti > 0;
            const spr = this.coasterTrackSprites[trackSprIdx++];
            spr.visible = true;
            spr.alpha = 1;
            spr.tint = 0xffffff;
            spr.x = tile.x * T;
            const surfaceH = Math.max(sim.getTileHeight(tile.x, tile.y), sim.getUpperPathHeight(tile.x, tile.y));
            spr.y = tile.y * T - (surfaceH + piece.height) * TERRAIN_PIXEL_STEP;
            const texKey = `${trackTextureKey(renderPieceType, piece.direction, track.trackColor, piece.height, trackStyle)}_${hillTransition}_${isSecondaryTile ? 1 : 0}`;
            const drawer = getTrackPieceDrawer(renderPieceType, piece.direction, track.trackColor, piece.height, isSecondaryTile, hillTransition, trackStyle);
            spr.texture = this.getCoasterTexture(texKey, drawer);
            drawTrackBeams(tile.x, tile.y, piece.height);
          }
        }

        // Animate carts only when there are riders on the attraction.
        if (track.complete && cartSprIdx < this.coasterCartSprites.length) {
          const ridersOnRide = sim.getInstRiders(instId);
          if (ridersOnRide <= 0) continue;
          const cfg = getTrackConfig(track.trackStyleId);
          let progress = this.coasterCartProgress.get(instId) || 0;
          if (!paused) {
            progress = advanceCartProgress(progress, paused);
            this.coasterCartProgress.set(instId, progress);
          }
          const totalPieces = Math.max(1, track.pieces.length);
          const maxCarts = Math.max(1, cfg?.maxCarts ?? 6);
          const requestedCars = Math.max(1, Math.min(track.stationLength || 1, maxCarts));
          const carCount = Math.min(requestedCars, maxCarts);
          const cartLengthPieces = Math.max(1, cfg?.cartLengthPieces ?? 2);
          const cartGapPieces = Math.max(0.5, cfg?.cartGapPieces ?? 1);
          const spacing = Math.min(0.45, (cartLengthPieces + cartGapPieces) / totalPieces);
          for (let car = 0; car < carCount && cartSprIdx < this.coasterCartSprites.length; car++) {
            let carProgress = progress - car * spacing;
            while (carProgress < 0) carProgress += 1;
            const pos = this.coasterTracks.getCartPosition(track, carProgress);
            if (!pos) continue;
            const cartSpr = this.coasterCartSprites[cartSprIdx++];
            cartSpr.visible = true;
            cartSpr.x = pos.x * T;
            const px = Math.floor(pos.x);
            const py = Math.floor(pos.y);
            const cartSurfaceH = Math.max(sim.getTileHeight(px, py), sim.getUpperPathHeight(px, py));
            cartSpr.y = pos.y * T - (cartSurfaceH + pos.height) * TERRAIN_PIXEL_STEP;
            const cartTexKey = cartTextureKey(pos.direction, track.cartColor, trackStyle);
            cartSpr.texture = this.getCoasterTexture(cartTexKey, getCartDrawer(pos.direction, track.cartColor, trackStyle));
          }
        }
      }

      // Hide unused track sprites
      for (; trackSprIdx < this.coasterTrackSprites.length; trackSprIdx++) {
        const spr = this.coasterTrackSprites[trackSprIdx];
        spr.visible = false;
        spr.alpha = 1;
        spr.tint = 0xffffff;
      }
      // Hide unused cart sprites
      for (; cartSprIdx < this.coasterCartSprites.length; cartSprIdx++) {
        this.coasterCartSprites[cartSprIdx].visible = false;
      }
    }

    // Render drowning effects after entities so they remain visible.
    this.updateDrownEffects();

    this.updateWeatherFx(paused);
  }

  private updateDrownEffects(): void {
    for (let i = this.drownEffects.length - 1; i >= 0; i--) {
      const fx = this.drownEffects[i];
      fx.age++;
      const t = fx.age / fx.duration;
      const alpha = Math.max(0, 1 - t);
      const radius = 2 + t * 8;
      const h = this.sim.getTileHeight(fx.x, fx.y);

      fx.g.clear();
      fx.g.x = fx.x * T + T * 0.5;
      fx.g.y = fx.y * T - h * TERRAIN_PIXEL_STEP + T * 0.5;
      fx.g.lineStyle(2, 0x7fd8ff, alpha);
      fx.g.drawCircle(0, 0, radius);
      fx.g.lineStyle(1, 0x2b95c9, alpha * 0.8);
      fx.g.drawCircle(0, 0, radius * 0.6);
      if (fx.isGuest) {
        fx.g.beginFill(0xffc9a8, alpha * 0.5);
        fx.g.drawCircle(0, -2, 2);
        fx.g.endFill();
      } else {
        fx.g.beginFill(0xd4e7ff, alpha * 0.5);
        fx.g.drawRect(-2, -4, 4, 4);
        fx.g.endFill();
      }

      if (fx.age >= fx.duration) {
        fx.g.destroy();
        this.drownEffects.splice(i, 1);
      }
    }
  }

  private createWeatherTextures(): void {
    const rainG = new PIXI.Graphics();
    rainG.lineStyle(2, 0x9ad8ff, 0.7);
    rainG.moveTo(0, 0);
    rainG.lineTo(4, 14);
    this.rainTexture = this.app.renderer.generateTexture(rainG, {
      resolution: 1,
      scaleMode: PIXI.SCALE_MODES.NEAREST,
    });
    rainG.destroy();

    const snowG = new PIXI.Graphics();
    snowG.beginFill(0xffffff, 0.9);
    snowG.drawCircle(3, 3, 3);
    snowG.endFill();
    this.snowTexture = this.app.renderer.generateTexture(snowG, {
      resolution: 1,
      scaleMode: PIXI.SCALE_MODES.NEAREST,
    });
    snowG.destroy();

    const heatG = new PIXI.Graphics();
    heatG.beginFill(0xffc36a, 0.22);
    heatG.drawRect(0, 0, 48, 8);
    heatG.endFill();
    this.heatTexture = this.app.renderer.generateTexture(heatG, {
      resolution: 1,
      scaleMode: PIXI.SCALE_MODES.NEAREST,
    });
    heatG.destroy();
  }

  private createWeatherSprites(): void {
    const rainSnowCount = 120;
    for (let i = 0; i < rainSnowCount; i++) {
      const spr = new PIXI.Sprite(this.rainTexture);
      spr.visible = false;
      spr.alpha = 0.75;
      spr.x = Math.random() * this.app.screen.width;
      spr.y = Math.random() * this.app.screen.height;
      spr.rotation = 0.2;
      this.weatherContainer.addChild(spr);
      this.weatherSprites.push(spr);
    }

    const heatCount = 22;
    for (let i = 0; i < heatCount; i++) {
      const spr = new PIXI.Sprite(this.heatTexture);
      spr.visible = false;
      spr.alpha = 0.08 + Math.random() * 0.12;
      spr.x = Math.random() * this.app.screen.width;
      spr.y = Math.random() * this.app.screen.height;
      this.weatherContainer.addChild(spr);
      this.heatwaveSprites.push(spr);
    }
  }

  private createThunderFlash(): void {
    this.thunderFlash = new PIXI.Graphics();
    this.thunderFlash.beginFill(0xf6fbff, 1);
    this.thunderFlash.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    this.thunderFlash.endFill();
    this.thunderFlash.alpha = 0;
    this.thunderFlash.visible = false;
    this.uiContainer.addChild(this.thunderFlash);
  }

  private resetWeatherSprites(): void {
    for (const spr of this.weatherSprites) {
      spr.x = Math.random() * this.app.screen.width;
      spr.y = Math.random() * this.app.screen.height;
      spr.visible = false;
    }
    for (const spr of this.heatwaveSprites) {
      spr.x = Math.random() * this.app.screen.width;
      spr.y = Math.random() * this.app.screen.height;
      spr.visible = false;
    }
  }

  private updateWeatherFx(paused: boolean): void {
    const dt = paused ? 0 : Math.min(33, this.app.ticker.elapsedMS);
    const w = this.app.screen.width;
    const h = this.app.screen.height;
    const time = performance.now() * 0.001;

    if (this.thunderFlash.width !== w || this.thunderFlash.height !== h) {
      this.thunderFlash.clear();
      this.thunderFlash.beginFill(0xf6fbff, 1);
      this.thunderFlash.drawRect(0, 0, w, h);
      this.thunderFlash.endFill();
    }

    if (this.currentWeather === 'rain') {
      const activeWeatherCount = Math.max(24, Math.floor(this.weatherSprites.length * this.qualityProfile.weatherDensity));
      for (let i = 0; i < this.weatherSprites.length; i++) {
        const spr = this.weatherSprites[i];
        if (i >= activeWeatherCount) {
          spr.visible = false;
          continue;
        }
        spr.visible = true;
        if (spr.texture !== this.rainTexture) spr.texture = this.rainTexture;
        spr.rotation = 0.25;
        spr.alpha = 0.5 + Math.sin(time * 10 + i) * 0.1;
        spr.x += 0.18 * dt;
        spr.y += 0.9 * dt;
        if (spr.y > h + 20 || spr.x > w + 20) {
          spr.x = Math.random() * w;
          spr.y = -20 - Math.random() * 80;
        }
      }
      for (const spr of this.heatwaveSprites) spr.visible = false;

      // Lightweight thunder flash: rare and short pulse while raining.
      this.thunderCooldown -= dt;
      if (this.thunderCooldown <= 0 && this.qualityProfile.thunderEnabled && Math.random() < 0.005) {
        this.thunderCooldown = 3500 + Math.random() * 6000;
        this.thunderIntensity = 0.22 + Math.random() * 0.18;
      }
      this.thunderIntensity *= 0.9;
      if (this.thunderIntensity > 0.01) {
        this.thunderFlash.visible = true;
        this.thunderFlash.alpha = this.thunderIntensity;
      } else {
        this.thunderFlash.visible = false;
        this.thunderFlash.alpha = 0;
      }
      return;
    }

    if (this.currentWeather === 'snow') {
      this.thunderFlash.visible = false;
      this.thunderFlash.alpha = 0;
      const activeWeatherCount = Math.max(24, Math.floor(this.weatherSprites.length * this.qualityProfile.weatherDensity));
      for (let i = 0; i < this.weatherSprites.length; i++) {
        const spr = this.weatherSprites[i];
        if (i >= activeWeatherCount) {
          spr.visible = false;
          continue;
        }
        spr.visible = true;
        if (spr.texture !== this.snowTexture) spr.texture = this.snowTexture;
        const drift = Math.sin(time * 1.6 + i * 0.45) * 0.35;
        spr.rotation = 0;
        spr.alpha = 0.55 + ((i % 7) / 20);
        spr.x += drift * dt * 0.08;
        spr.y += (0.11 + (i % 5) * 0.02) * dt;
        if (spr.y > h + 12) {
          spr.y = -12;
          spr.x = Math.random() * w;
        }
        if (spr.x < -12) spr.x = w + 8;
        if (spr.x > w + 12) spr.x = -8;
      }
      for (const spr of this.heatwaveSprites) spr.visible = false;
      return;
    }

    if (this.currentWeather === 'heatwave') {
      this.thunderFlash.visible = false;
      this.thunderFlash.alpha = 0;
      for (const spr of this.weatherSprites) spr.visible = false;
      const activeHeatCount = Math.max(8, Math.floor(this.heatwaveSprites.length * this.qualityProfile.weatherDensity));
      for (let i = 0; i < this.heatwaveSprites.length; i++) {
        const spr = this.heatwaveSprites[i];
        if (i >= activeHeatCount) {
          spr.visible = false;
          continue;
        }
        spr.visible = true;
        if (spr.texture !== this.heatTexture) spr.texture = this.heatTexture;
        const wave = Math.sin(time * 2.4 + i * 0.7);
        spr.alpha = 0.07 + (wave + 1) * 0.08;
        spr.x += Math.sin(time * 1.2 + i) * 0.35;
        spr.y -= (0.05 + (i % 4) * 0.012) * dt;
        if (spr.y < -10) {
          spr.y = h + Math.random() * 30;
          spr.x = Math.random() * w;
        }
      }
      return;
    }

    this.thunderFlash.visible = false;
    this.thunderFlash.alpha = 0;
    for (const spr of this.weatherSprites) spr.visible = false;
    for (const spr of this.heatwaveSprites) spr.visible = false;
  }

  private getRotatedFootprint(attr: AttractionDef, rotation: number): { w: number; h: number } {
    const r = ((rotation % 360) + 360) % 360;
    if (r === 90 || r === 270) {
      return { w: attr.footprint.h, h: attr.footprint.w };
    }
    return { w: attr.footprint.w, h: attr.footprint.h };
  }

  private mapRotatedTileToTemplate(
    localX: number,
    localY: number,
    templateW: number,
    templateH: number,
    rotation: number,
  ): { tx: number; ty: number } {
    const r = ((rotation % 360) + 360) % 360;
    if (r === 90) {
      return { tx: localY, ty: templateH - 1 - localX };
    }
    if (r === 180) {
      return { tx: templateW - 1 - localX, ty: templateH - 1 - localY };
    }
    if (r === 270) {
      return { tx: templateW - 1 - localY, ty: localX };
    }
    return { tx: localX, ty: localY };
  }

  /* ── ghost preview ── */
  showGhost(
    tool: BuildTool,
    tileX: number,
    tileY: number,
    attractionId: number,
    canPlaceHere: boolean,
    variantId: number = 0,
    elevated: boolean = false,
    buildHeight: number = -1,
    rotation: number = 0,
    attractionBuildStage: 'none' | 'entrance' | 'exit' = 'none',
  ): void {
    // hide all first
    for (const g of this.ghostSprites) {
      g.visible = false;
      g.rotation = 0;
      g.anchor.set(0, 0);
      g.alpha = 1;
    }

    if (tool === BuildTool.None) return;

    if (tool === BuildTool.Path || tool === BuildTool.Tree || tool === BuildTool.Water || tool === BuildTool.Land || tool === BuildTool.Demolish || tool === BuildTool.Terrain || tool === BuildTool.Bench || tool === BuildTool.TrashCan || tool === BuildTool.Scenery) {
      const g = this.ghostSprites[0];
      g.visible = true;
      g.x = tileX * T;
      const baseH = this.sim.getTileHeight(tileX, tileY);
      let ghostH: number;
      if (tool === BuildTool.Path && buildHeight >= 0) {
        ghostH = buildHeight;
      } else if (elevated) {
        ghostH = Math.min(baseH + 1, this.sim.getMaxHeight());
      } else {
        ghostH = baseH;
      }
      g.y = tileY * T - ghostH * TERRAIN_PIXEL_STEP;
      if (tool === BuildTool.Bench) g.texture = this.getTexture('ghost_bench');
      else if (tool === BuildTool.TrashCan) g.texture = this.getTexture('ghost_trashcan');
      else if (tool === BuildTool.Scenery) {
        const key = getSceneryDef(variantId)?.ghostTextureKey ?? 'ghost_scenery_flowers';
        g.texture = this.getTexture(key);
      }
      else if (tool === BuildTool.Land) {
        const key = variantId === 1
          ? 'ghost_land_desert'
          : variantId === 2
            ? 'ghost_land_mud'
            : variantId === 3
              ? 'ghost_land_dark_grass'
              : 'ghost_land_grass';
        g.texture = this.getTexture(key);
      }
      else if (tool === BuildTool.Path) {
        const key = variantId === 1
          ? 'ghost_path_desert'
          : variantId === 2
            ? 'ghost_path_concrete'
            : variantId === 3
              ? 'ghost_path_queue'
              : 'ghost_path_muddy';
        g.texture = this.getTexture(key);
      }
      else if (tool === BuildTool.Tree) {
        const key = getTreeDef(variantId)?.ghostTextureKey ?? 'ghost_tree_pine';
        g.texture = this.getTexture(key);
      }
      else if (tool === BuildTool.Water) g.texture = this.getTexture('ghost_water');
      else if (tool === BuildTool.Terrain) g.texture = this.getTexture('ghost_tree_small');
      else g.texture = this.getTexture('ghost_demolish');
      g.tint = canPlaceHere ? 0xffffff : 0xff4444;
      return;
    }

    if (tool === BuildTool.Attraction && attractionId >= 0) {
      if (attractionBuildStage === 'entrance' || attractionBuildStage === 'exit') {
        const g = this.ghostSprites[0];
        g.visible = true;
        g.x = tileX * T;
        g.y = tileY * T - this.sim.getTileHeight(tileX, tileY) * TERRAIN_PIXEL_STEP;
        g.texture = this.getTexture(attractionBuildStage === 'entrance' ? 'ghost_ride_entrance' : 'ghost_ride_exit');
        g.alpha = 0.85;
        g.tint = canPlaceHere ? 0xffffff : 0xff4444;
        return;
      }

      const attr = ATTRACTIONS.find(a => a.id === attractionId);
      if (!attr) return;

      const customTex = this.customAttractionTextures.get(attractionId);
      if (customTex && attr.footprint.w === 1 && attr.footprint.h === 1) {
        const g = this.ghostSprites[0];
        g.visible = true;
        g.anchor.set(0.5, 0.5);
        g.x = tileX * T + T * 0.5;
        g.y = tileY * T - this.sim.getTileHeight(tileX, tileY) * TERRAIN_PIXEL_STEP + T * 0.5;
        g.texture = customTex;
        g.rotation = (rotation * Math.PI) / 180;
        g.alpha = 0.7;
        g.tint = canPlaceHere ? 0xffffff : 0xff4444;
        return;
      }

      const fp = this.getRotatedFootprint(attr, rotation);
      const fw = fp.w;
      const fh = fp.h;
      let gi = 0;
      for (let localY = 0; localY < fh; localY++) {
        for (let localX = 0; localX < fw; localX++) {
          if (gi >= this.ghostSprites.length) break;
          const g = this.ghostSprites[gi++];
          const mapped = this.mapRotatedTileToTemplate(localX, localY, attr.footprint.w, attr.footprint.h, rotation);
          g.visible = true;
          g.x = (tileX + localX) * T;
          g.y = (tileY + localY) * T - this.sim.getTileHeight(tileX + localX, tileY + localY) * TERRAIN_PIXEL_STEP;
          g.texture = this.getTexture(`attr_${attractionId}_${mapped.tx}_${mapped.ty}`);
          g.alpha = 0.7;
          g.tint = canPlaceHere ? 0xffffff : 0xff4444;
        }
      }
    }

  }

  hideGhost(): void {
    for (const g of this.ghostSprites) {
      g.visible = false;
      g.rotation = 0;
      g.anchor.set(0, 0);
      g.alpha = 1;
    }
  }

  /* ── screen coord → tile coord ── */
  screenToTile(sx: number, sy: number): { x: number; y: number } {
    const z = this.camera.zoom;
    const screenW = this.app.screen.width;
    const screenH = this.app.screen.height;
    const ox = screenW / 2 - this.camera.x * z;
    const oy = screenH / 2 - this.camera.y * z;
    const worldX = (sx - ox) / z;
    const worldY = (sy - oy) / z;
    return {
      x: Math.floor(worldX / T),
      y: Math.floor(worldY / T),
    };
  }

  /* ── cleanup ── */
  destroy(): void {
    this.app.destroy(true);
  }
}
