import ATTRACTIONS from '../../game/config/attractions';
import {
  T,
  PAL,
  createCanvas,
  drawGrass,
  drawGrassDark,
  drawLandDesert,
  drawLandMud,
  drawConnectedPathTile,
  drawTree,
  drawTreeBig,
  drawTreeSmall,
  drawTreeCactus,
  drawTreeCherry,
  drawTreeShrubbery,
  drawTreeApple,
  drawTreeLemon,
  drawConnectedWaterTile,
  drawEntrance,
  drawMechanic,
  drawCleaner,
  drawSecurity,
  drawEntertainerDance,
  drawPuke,
  drawBridgeSupport,
  drawTunnelOverlay,
  drawSlopeOverlay,
  drawRampPath,
  drawVisitor,
  drawVisitorDown,
  drawVisitorUp,
  drawVisitorLeft,
  drawVisitorRight,
  drawVisitorCheer,
  drawVisitorEat,
  drawVisitorDrink,
  drawVisitorPuke,
  drawVisitorSitting,
  drawVisitorThrowTrash,
  drawVisitorCriminal,
  drawAttractionTile,
  drawBench,
  drawBenchVertical,
  drawBenchBroken,
  drawTrashCan,
  drawTrashCanBroken,
  drawLitter,
  drawSceneryFountain,
  drawSceneryFlowers,
  drawSceneryStatue,
  drawSceneryTopiary,
  drawSceneryGazebo,
  rect,
} from './core';
import { drawGhostTile, getAttrDrawer, isAnimatedAttraction } from './attractions';

/* ── Generate full sprite atlas ── */
export interface SpriteAtlas {
  canvas: OffscreenCanvas;
  regions: Map<string, { x: number; y: number; w: number; h: number }>;
}

export function generateSpriteAtlas(): SpriteAtlas {
  const visitorVariants = 6;
  const visitorAnimFrames = visitorVariants * 19; // 4 dirs × 2 walk + 2 cheer + eat + drink + 2 puke + 2 sitting + 2 throw + criminal

  // Animated attractions get 2 frames per tile, static attractions get 1 frame per tile.
  const rideAttrTileCount = ATTRACTIONS
    .filter((a) => isAnimatedAttraction(a.id))
    .reduce((s, a) => s + a.footprint.w * a.footprint.h * 2, 0);
  const stallAttrTileCount = ATTRACTIONS
    .filter((a) => !isAnimatedAttraction(a.id))
    .reduce((s, a) => s + a.footprint.w * a.footprint.h, 0);
  const ghostCount = 18; // path variants, tree variants, water, demolish, land variants
  const furnitureSprites = 9 + 2 + 2 + 11; // furniture + scenery sprites and ghost previews
  const pathAutotiles = 4 * 16; // 4 path types * 16 neighbor masks
  const waterAutotiles = 16 * 3; // 16 masks * 3 animation frames
  const slopeOverlays = 16;
  const rampSprites = 4 * 4; // 4 path types × 4 directions
  const baseSprites = 1 + 4 + 4 + pathAutotiles + 8 + 1 + waterAutotiles + 1 + 3 + 2 + 2 + slopeOverlays + rampSprites + 2 + 4;
  // grass + legacy paths + path autotiles + trees + legacy water + water autotiles + entrance + mechanic
  const totalSprites = baseSprites + 1 + visitorVariants + visitorAnimFrames +
    rideAttrTileCount + stallAttrTileCount + ghostCount + ATTRACTIONS.length + furnitureSprites;

  const cols = 32;
  const rows = Math.ceil(totalSprites / cols);
  const [atlas, actx] = createCanvas(cols * T, rows * T);

  const regions = new Map<string, { x: number; y: number; w: number; h: number }>();
  let idx = 0;

  function nextSlot(): [number, number] {
    const sx = (idx % cols) * T;
    const sy = Math.floor(idx / cols) * T;
    idx++;
    return [sx, sy];
  }

  function drawInSlot(key: string, fn: (ctx: OffscreenCanvasRenderingContext2D) => void): void {
    const [sx, sy] = nextSlot();
    actx.clearRect(sx, sy, T, T);
    actx.save();
    actx.translate(sx, sy);
    fn(actx);
    actx.restore();
    regions.set(key, { x: sx, y: sy, w: T, h: T });
  }

  // Base tiles
  drawInSlot('grass', drawGrass);
  drawInSlot('land_grass', drawGrass);
  drawInSlot('land_desert', drawLandDesert);
  drawInSlot('land_mud', drawLandMud);
  drawInSlot('land_dark_grass', drawGrassDark);

  // Keep legacy single-tile keys for any fallback callers.
  drawInSlot('path_muddy', (ctx) => drawConnectedPathTile(ctx, PAL.pathMud1, PAL.pathMud2, PAL.pathEdge, 15));
  drawInSlot('path_desert', (ctx) => drawConnectedPathTile(ctx, PAL.pathDesert1, PAL.pathDesert2, '#9d8558', 15));
  drawInSlot('path_concrete', (ctx) => drawConnectedPathTile(ctx, PAL.pathConcrete1, PAL.pathConcrete2, '#6f7379', 15));
  drawInSlot('path_queue', (ctx) => drawConnectedPathTile(ctx, PAL.pathQueue1, PAL.pathQueue2, '#7f5a9e', 15));

  for (let mask = 0; mask < 16; mask++) {
    drawInSlot(`path_muddy_${mask}`, (ctx) => drawConnectedPathTile(ctx, PAL.pathMud1, PAL.pathMud2, PAL.pathEdge, mask));
    drawInSlot(`path_desert_${mask}`, (ctx) => drawConnectedPathTile(ctx, PAL.pathDesert1, PAL.pathDesert2, '#9d8558', mask));
    drawInSlot(`path_concrete_${mask}`, (ctx) => drawConnectedPathTile(ctx, PAL.pathConcrete1, PAL.pathConcrete2, '#6f7379', mask));
    drawInSlot(`path_queue_${mask}`, (ctx) => drawConnectedPathTile(ctx, PAL.pathQueue1, PAL.pathQueue2, '#7f5a9e', mask));
  }

  drawInSlot('tree_pine', drawTree);
  drawInSlot('tree_big', drawTreeBig);
  drawInSlot('tree_small', drawTreeSmall);
  drawInSlot('tree_cactus', drawTreeCactus);
  drawInSlot('tree_cherry', drawTreeCherry);
  drawInSlot('tree_shrubbery', drawTreeShrubbery);
  drawInSlot('tree_apple', drawTreeApple);
  drawInSlot('tree_lemon', drawTreeLemon);

  // Legacy default water key + connected animated variants.
  drawInSlot('water', (ctx) => drawConnectedWaterTile(ctx, 15, 0));
  for (let mask = 0; mask < 16; mask++) {
    for (let frame = 0; frame < 3; frame++) {
      drawInSlot(`water_${mask}_${frame}`, (ctx) => drawConnectedWaterTile(ctx, mask, frame));
    }
  }

  drawInSlot('entrance', drawEntrance);
  drawInSlot('mechanic', drawMechanic);
  drawInSlot('cleaner', drawCleaner);
  drawInSlot('security', drawSecurity);
  drawInSlot('entertainer_dance_0', (ctx) => drawEntertainerDance(ctx, 0));
  drawInSlot('entertainer_dance_1', (ctx) => drawEntertainerDance(ctx, 1));
  drawInSlot('puke_0', (ctx) => drawPuke(ctx, 0));
  drawInSlot('puke_1', (ctx) => drawPuke(ctx, 1));
  drawInSlot('bridge_support', drawBridgeSupport);
  drawInSlot('tunnel_overlay', drawTunnelOverlay);

  for (let mask = 0; mask < 16; mask++) {
    drawInSlot(`slope_${mask}`, (ctx) => drawSlopeOverlay(ctx, mask));
  }

  // Ramp path sprites: 4 path types × 4 directions = 16 sprites
  const rampPathDefs: Array<{ prefix: string; fill1: string; fill2: string; edge: string }> = [
    { prefix: 'path_muddy', fill1: PAL.pathMud1, fill2: PAL.pathMud2, edge: PAL.pathEdge },
    { prefix: 'path_desert', fill1: PAL.pathDesert1, fill2: PAL.pathDesert2, edge: '#9d8558' },
    { prefix: 'path_concrete', fill1: PAL.pathConcrete1, fill2: PAL.pathConcrete2, edge: '#6f7379' },
    { prefix: 'path_queue', fill1: PAL.pathQueue1, fill2: PAL.pathQueue2, edge: '#7f5a9e' },
  ];
  for (const { prefix, fill1, fill2, edge } of rampPathDefs) {
    for (let dir = 1; dir <= 4; dir++) {
      drawInSlot(`ramp_${prefix}_${dir}`, (ctx) => drawRampPath(ctx, fill1, fill2, edge, dir));
    }
  }

  // Visitors (static/idle)
  for (let v = 0; v < visitorVariants; v++) {
    drawInSlot(`visitor_${v}`, (ctx) => drawVisitor(ctx, v));
  }

  // Visitor animation frames
  for (let v = 0; v < visitorVariants; v++) {
    for (let f = 0; f < 2; f++) {
      drawInSlot(`visitor_${v}_down_${f}`, (ctx) => drawVisitorDown(ctx, v, f));
      drawInSlot(`visitor_${v}_up_${f}`, (ctx) => drawVisitorUp(ctx, v, f));
      drawInSlot(`visitor_${v}_left_${f}`, (ctx) => drawVisitorLeft(ctx, v, f));
      drawInSlot(`visitor_${v}_right_${f}`, (ctx) => drawVisitorRight(ctx, v, f));
    }
    for (let f = 0; f < 2; f++) {
      drawInSlot(`visitor_${v}_cheer_${f}`, (ctx) => drawVisitorCheer(ctx, v, f));
    }
    drawInSlot(`visitor_${v}_eat`, (ctx) => drawVisitorEat(ctx, v));
    drawInSlot(`visitor_${v}_drink`, (ctx) => drawVisitorDrink(ctx, v));
    drawInSlot(`visitor_${v}_puke_0`, (ctx) => drawVisitorPuke(ctx, v, 0));
    drawInSlot(`visitor_${v}_puke_1`, (ctx) => drawVisitorPuke(ctx, v, 1));
    drawInSlot(`visitor_${v}_sit_0`, (ctx) => drawVisitorSitting(ctx, v, 0));
    drawInSlot(`visitor_${v}_sit_1`, (ctx) => drawVisitorSitting(ctx, v, 1));
    drawInSlot(`visitor_${v}_throw_0`, (ctx) => drawVisitorThrowTrash(ctx, v, 0));
    drawInSlot(`visitor_${v}_throw_1`, (ctx) => drawVisitorThrowTrash(ctx, v, 1));
    drawInSlot(`visitor_${v}_criminal`, (ctx) => drawVisitorCriminal(ctx, v));
  }

  // Attraction tiles – rides get 2 animation frames, stalls get 1 static frame
  for (const attr of ATTRACTIONS) {
    const frames = isAnimatedAttraction(attr.id) ? 2 : 1;
    for (let f = 0; f < frames; f++) {
      for (let ty = 0; ty < attr.footprint.h; ty++) {
        for (let tx = 0; tx < attr.footprint.w; tx++) {
          // Frame 0 also stored under the legacy key `attr_${id}_${tx}_${ty}` (used as fallback)
          const key = f === 0
            ? `attr_${attr.id}_${tx}_${ty}`
            : `attr_${attr.id}_${tx}_${ty}_f1`;
          const drawer = getAttrDrawer(attr.id, tx, ty, f);
          if (drawer) {
            drawInSlot(key, drawer);
          } else {
            const isTopLeft = tx === 0 && ty === 0;
            drawInSlot(key, (ctx) => drawAttractionTile(ctx, attr.color, attr.icon, isTopLeft));
          }
        }
      }
    }
  }

  // Ghost tiles
  drawInSlot('ghost_path_muddy', (ctx) => drawGhostTile(ctx, PAL.pathMud1));
  drawInSlot('ghost_path_desert', (ctx) => drawGhostTile(ctx, PAL.pathDesert1));
  drawInSlot('ghost_path_concrete', (ctx) => drawGhostTile(ctx, PAL.pathConcrete1));
  drawInSlot('ghost_path_queue', (ctx) => drawGhostTile(ctx, PAL.pathQueue1));
  drawInSlot('ghost_tree_pine', (ctx) => drawGhostTile(ctx, PAL.tree_leaves1));
  drawInSlot('ghost_tree_big', (ctx) => drawGhostTile(ctx, '#2a5f10'));
  drawInSlot('ghost_tree_small', (ctx) => drawGhostTile(ctx, '#4f9d2e'));
  drawInSlot('ghost_tree_cactus', (ctx) => drawGhostTile(ctx, '#2f8c48'));
  drawInSlot('ghost_tree_cherry', (ctx) => drawGhostTile(ctx, '#f6a7c5'));
  drawInSlot('ghost_tree_shrubbery', (ctx) => drawGhostTile(ctx, '#4ca23c'));
  drawInSlot('ghost_tree_apple', (ctx) => drawGhostTile(ctx, '#56ab46'));
  drawInSlot('ghost_tree_lemon', (ctx) => drawGhostTile(ctx, '#4f9f45'));
  drawInSlot('ghost_water', (ctx) => drawGhostTile(ctx, '#2f8fcf'));
  drawInSlot('ghost_land_grass', (ctx) => drawGhostTile(ctx, PAL.grass1));
  drawInSlot('ghost_land_desert', (ctx) => drawGhostTile(ctx, PAL.pathDesert1));
  drawInSlot('ghost_land_mud', (ctx) => drawGhostTile(ctx, PAL.pathMud1));
  drawInSlot('ghost_land_dark_grass', (ctx) => drawGhostTile(ctx, '#2f5d22'));
  drawInSlot('ghost_demolish', (ctx) => {
    ctx.globalAlpha = 0.4;
    rect(ctx, 0, 0, T, T, '#ff0000');
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(3, 3); ctx.lineTo(T - 3, T - 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(T - 3, 3); ctx.lineTo(3, T - 3); ctx.stroke();
  });

  // Attraction ghost tiles (one per attraction type)
  for (const attr of ATTRACTIONS) {
    drawInSlot(`ghost_attr_${attr.id}`, (ctx) => drawGhostTile(ctx, attr.color));
  }

  // Ride endpoint markers (entrance/exit)
  drawInSlot('ghost_ride_entrance', (ctx) => {
    drawGhostTile(ctx, '#53a86a');
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = '#f3fff4';
    ctx.fillRect(3, 4, 10, 9);
    ctx.fillStyle = '#2f7b3f';
    ctx.fillRect(2, 2, 12, 2);
    ctx.fillStyle = '#d8f0dc';
    ctx.fillRect(4, 6, 8, 4);
    ctx.fillStyle = '#2f7b3f';
    ctx.fillRect(7, 9, 2, 4);
    ctx.fillStyle = '#ffffff';
    rect(ctx, 10, 7, 2, 2, '#ffffff');
    ctx.globalAlpha = 1;
  });
  drawInSlot('ghost_ride_exit', (ctx) => {
    drawGhostTile(ctx, '#d0675f');
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = '#fff4f1';
    ctx.fillRect(3, 4, 10, 9);
    ctx.fillStyle = '#9f2f27';
    ctx.fillRect(2, 2, 12, 2);
    ctx.fillStyle = '#f5d4ce';
    ctx.fillRect(4, 6, 8, 4);
    ctx.fillStyle = '#9f2f27';
    ctx.fillRect(7, 4, 2, 4);
    ctx.fillStyle = '#ffffff';
    rect(ctx, 10, 9, 2, 2, '#ffffff');
    ctx.globalAlpha = 1;
  });
  drawInSlot('ride_entrance_marker', (ctx) => {
    rect(ctx, 2, 4, 12, 10, '#2f7b3f');
    rect(ctx, 3, 5, 10, 8, '#f3fff4');
    rect(ctx, 2, 2, 12, 2, '#245f32');
    rect(ctx, 4, 7, 8, 3, '#d8f0dc');
    rect(ctx, 7, 9, 2, 4, '#2f7b3f');
    rect(ctx, 10, 7, 2, 2, '#89c79a');
    rect(ctx, 3, 13, 10, 1, '#0004');
  });
  drawInSlot('ride_exit_marker', (ctx) => {
    rect(ctx, 2, 4, 12, 10, '#9f2f27');
    rect(ctx, 3, 5, 10, 8, '#fff4f1');
    rect(ctx, 2, 2, 12, 2, '#7c251f');
    rect(ctx, 4, 7, 8, 3, '#f5d4ce');
    rect(ctx, 7, 4, 2, 4, '#9f2f27');
    rect(ctx, 10, 9, 2, 2, '#e29b90');
    rect(ctx, 3, 13, 10, 1, '#0004');
  });

  // Furniture sprites
  drawInSlot('bench_h', drawBench);
  drawInSlot('bench_v', drawBenchVertical);
  drawInSlot('bench_broken_h', (ctx) => drawBenchBroken(ctx, false));
  drawInSlot('bench_broken_v', (ctx) => drawBenchBroken(ctx, true));
  // Legacy key retained as alias for existing callers.
  drawInSlot('bench', drawBench);
  drawInSlot('trashcan_0', (ctx) => drawTrashCan(ctx, 0));
  drawInSlot('trashcan_1', (ctx) => drawTrashCan(ctx, 1));
  drawInSlot('trashcan_broken', drawTrashCanBroken);
  drawInSlot('litter_0', (ctx) => drawLitter(ctx, 0));
  drawInSlot('litter_1', (ctx) => drawLitter(ctx, 1));
  drawInSlot('ghost_bench', (ctx) => drawGhostTile(ctx, '#c8903c'));
  drawInSlot('ghost_trashcan', (ctx) => drawGhostTile(ctx, '#607d8b'));
  drawInSlot('scenery_fountain_0', (ctx) => drawSceneryFountain(ctx, 0));
  drawInSlot('scenery_fountain_1', (ctx) => drawSceneryFountain(ctx, 1));
  drawInSlot('scenery_flowers', drawSceneryFlowers);
  drawInSlot('scenery_statue', drawSceneryStatue);
  drawInSlot('scenery_topiary', drawSceneryTopiary);
  drawInSlot('scenery_gazebo', drawSceneryGazebo);
  drawInSlot('ghost_scenery_fountain', (ctx) => drawGhostTile(ctx, '#7ec8e3'));
  drawInSlot('ghost_scenery_flowers', (ctx) => drawGhostTile(ctx, '#ff89c2'));
  drawInSlot('ghost_scenery_statue', (ctx) => drawGhostTile(ctx, '#8b9aa5'));
  drawInSlot('ghost_scenery_topiary', (ctx) => drawGhostTile(ctx, '#52a53b'));
  drawInSlot('ghost_scenery_gazebo', (ctx) => drawGhostTile(ctx, '#aab9c4'));

  // Extra slot to keep count even
  drawInSlot('trashcan_half', (ctx) => drawTrashCan(ctx, 0.5));

  return { canvas: atlas, regions };
}
