/* =============================================
   Pixel-art sprite generator — creates all
   game sprites procedurally on OffscreenCanvas
   so we ship zero external image assets.
   Every sprite is 16×16 with a fixed 4-colour
   palette per element, nearest-neighbour scaled.
   ============================================= */

import { ECONOMY } from '../../game/config/economy';

const T = ECONOMY.tileSize; // 16

/* ── palette ── */
const PAL = {
  grass1: '#4a7c2e',
  grass2: '#5a9a38',
  pathMud1: '#8f6f4b',
  pathMud2: '#7a5b3b',
  pathDesert1: '#d8c288',
  pathDesert2: '#bea76c',
  pathConcrete1: '#b9bcc1',
  pathConcrete2: '#94979d',
  pathQueue1: '#d9b3ff',
  pathQueue2: '#b87be7',
  pathEdge: '#5f5f5f',
  tree_trunk: '#6b4226',
  tree_leaves1: '#2d6e12',
  tree_leaves2: '#3c8c1e',
  tree_leaves3: '#1b5500',
  entrance1: '#d4a030',
  entrance2: '#b8860b',
  visitor_skin: '#ffcc99',
  visitor_shirt: '#4488ff',
  visitor_pants: '#334466',
  visitor_hair: '#553322',
  water: '#2288cc',
  cleaner_uniform: '#28a745',
  cleaner_pants: '#1f2d4a',
  puke1: '#8abf39',
  puke2: '#5f8f22',
};

const VISITOR_SHIRTS = ['#4488ff', '#ff4444', '#44cc44', '#ff8800', '#cc44cc', '#44cccc'];

function createCanvas(w: number, h: number): [OffscreenCanvas, OffscreenCanvasRenderingContext2D] {
  const c = new OffscreenCanvas(w, h);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

/* helpers */
function px(ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function rect(ctx: OffscreenCanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

/* ── sprite builders ── */

function drawGrass(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.grass1);
  // random-looking tufts
  for (let i = 0; i < 8; i++) {
    const gx = (i * 7 + 3) % T;
    const gy = (i * 11 + 2) % T;
    px(ctx, gx, gy, PAL.grass2);
  }
  // small dirt specks
  px(ctx, 4, 12, '#6b5c3a');
  px(ctx, 11, 5, '#6b5c3a');
}

function drawGrassDark(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, '#2f5d22');
  for (let i = 0; i < 9; i++) {
    px(ctx, (i * 6 + 1) % T, (i * 9 + 3) % T, '#3c7b2a');
  }
  px(ctx, 3, 11, '#4b6d2d');
  px(ctx, 12, 4, '#4b6d2d');
}

function drawLandDesert(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathDesert1);
  for (let i = 0; i < 10; i++) {
    px(ctx, (i * 5 + 2) % T, (i * 7 + 1) % T, PAL.pathDesert2);
  }
}

function drawLandMud(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathMud1);
  for (let i = 0; i < 10; i++) {
    px(ctx, (i * 3 + 2) % T, (i * 11 + 5) % T, PAL.pathMud2);
  }
}

function drawPath(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathMud1);
  for (let i = 0; i < 6; i++) {
    const gx = (i * 5 + 1) % T;
    const gy = (i * 9 + 3) % T;
    px(ctx, gx, gy, PAL.pathMud2);
  }
  // edge pixels
  rect(ctx, 0, 0, T, 1, PAL.pathEdge);
  rect(ctx, 0, T - 1, T, 1, PAL.pathEdge);
  rect(ctx, 0, 0, 1, T, PAL.pathEdge);
  rect(ctx, T - 1, 0, 1, T, PAL.pathEdge);
}

function drawPathDesert(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathDesert1);
  for (let i = 0; i < 7; i++) {
    px(ctx, (i * 3 + 2) % T, (i * 5 + 4) % T, PAL.pathDesert2);
  }
  rect(ctx, 0, 0, T, 1, '#9d8558');
  rect(ctx, 0, T - 1, T, 1, '#9d8558');
}

function drawPathConcrete(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathConcrete1);
  for (let i = 0; i < 3; i++) {
    rect(ctx, 1, 4 + i * 4, T - 2, 1, PAL.pathConcrete2);
  }
  rect(ctx, 7, 1, 1, T - 2, PAL.pathConcrete2);
  rect(ctx, 0, 0, T, 1, '#6f7379');
  rect(ctx, 0, T - 1, T, 1, '#6f7379');
}

function drawPathQueue(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathQueue1);
  for (let y = 2; y < T; y += 4) {
    rect(ctx, 1, y, T - 2, 1, PAL.pathQueue2);
  }
  rect(ctx, 0, 0, T, 1, '#7f5a9e');
  rect(ctx, 0, T - 1, T, 1, '#7f5a9e');
}

function drawConnectedPathTile(
  ctx: OffscreenCanvasRenderingContext2D,
  fill1: string,
  fill2: string,
  edge: string,
  mask: number,
): void {
  rect(ctx, 0, 0, T, T, fill1);
  // Shared interior noise keeps contiguous paths from looking tiled.
  for (let i = 0; i < 10; i++) {
    const gx = (i * 5 + 2) % T;
    const gy = (i * 7 + 1) % T;
    px(ctx, gx, gy, fill2);
  }

  const n = (mask & 1) !== 0;
  const e = (mask & 2) !== 0;
  const s = (mask & 4) !== 0;
  const w = (mask & 8) !== 0;

  if (!n) rect(ctx, 0, 0, T, 1, edge);
  if (!s) rect(ctx, 0, T - 1, T, 1, edge);
  if (!w) rect(ctx, 0, 0, 1, T, edge);
  if (!e) rect(ctx, T - 1, 0, 1, T, edge);

  // Fill exposed corners so edge lines merge across bends cleanly.
  if (!n && !w) px(ctx, 0, 0, edge);
  if (!n && !e) px(ctx, T - 1, 0, edge);
  if (!s && !w) px(ctx, 0, T - 1, edge);
  if (!s && !e) px(ctx, T - 1, T - 1, edge);
}

function drawSlopeOverlay(ctx: OffscreenCanvasRenderingContext2D, mask: number): void {
  if (mask === 0) return;

  const n = (mask & 1) !== 0;
  const e = (mask & 2) !== 0;
  const s = (mask & 4) !== 0;
  const w = (mask & 8) !== 0;

  // lower side gets soft shadow line.  Opposite pairs draw wedge gradients.
  const HALF = T >> 1;

  // Diagonal gradient simulating perspective lift on raised edges
  if (n) {
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.52 - i * 0.044).toFixed(3);
      const w2 = T - i * 2;
      if (w2 <= 0) continue;
      rect(ctx, i, i, w2, 1, `rgba(255,252,220,${alpha})`);
    }
    // Top highlight edge
    rect(ctx, 0, 0, T, 1, 'rgba(255,255,255,0.65)');
    // Bottom shadow
    if (!s) rect(ctx, 1, T - 2, T - 2, 1, 'rgba(0,0,0,0.22)');
  }
  if (s) {
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.52 - i * 0.044).toFixed(3);
      const w2 = T - i * 2;
      if (w2 <= 0) continue;
      rect(ctx, i, T - 1 - i, w2, 1, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, 0, T - 1, T, 1, 'rgba(255,255,255,0.65)');
    if (!n) rect(ctx, 1, 1, T - 2, 1, 'rgba(0,0,0,0.22)');
  }
  if (w) {
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.52 - i * 0.044).toFixed(3);
      const h2 = T - i * 2;
      if (h2 <= 0) continue;
      rect(ctx, i, i, 1, h2, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, 0, 0, 1, T, 'rgba(255,255,255,0.65)');
    if (!e) rect(ctx, T - 2, 1, 1, T - 2, 'rgba(0,0,0,0.22)');
  }
  if (e) {
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.52 - i * 0.044).toFixed(3);
      const h2 = T - i * 2;
      if (h2 <= 0) continue;
      rect(ctx, T - 1 - i, i, 1, h2, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, T - 1, 0, 1, T, 'rgba(255,255,255,0.65)');
    if (!w) rect(ctx, 1, 1, 1, T - 2, 'rgba(0,0,0,0.22)');
  }

  // Diagonal ridge line at the top of adjacent corner pairs (apex highlight)
  if (n && w) px(ctx, 0, 0, 'rgba(255,255,255,0.9)');
  if (n && e) px(ctx, T - 1, 0, 'rgba(255,255,255,0.9)');
  if (s && w) px(ctx, 0, T - 1, 'rgba(255,255,255,0.9)');
  if (s && e) px(ctx, T - 1, T - 1, 'rgba(255,255,255,0.9)');

  // Center tint for multi-side slopes (hill top)
  const sideCount = (n ? 1 : 0) + (e ? 1 : 0) + (s ? 1 : 0) + (w ? 1 : 0);
  if (sideCount >= 3) {
    rect(ctx, 4, 4, T - 8, T - 8, 'rgba(220,240,200,0.18)');
  }
}

/** Draw a ramp path tile: a sloped path connecting two heights.
 *  dir: 1=up-N, 2=up-E, 3=up-S, 4=up-W
 *  The ramp has a gradient from the lower end to the higher end.
 */
function drawRampPath(ctx: OffscreenCanvasRenderingContext2D, fill1: string, fill2: string, edge: string, dir: number): void {
  // Base path fill
  rect(ctx, 0, 0, T, T, fill1);
  for (let i = 0; i < 10; i++) {
    const gx = (i * 5 + 2) % T;
    const gy = (i * 7 + 1) % T;
    px(ctx, gx, gy, fill2);
  }
  // Edge lines
  rect(ctx, 0, 0, T, 1, edge);
  rect(ctx, 0, T - 1, T, 1, edge);
  rect(ctx, 0, 0, 1, T, edge);
  rect(ctx, T - 1, 0, 1, T, edge);

  // Directional ramp gradient overlay — bright highlight on the high side
  const HALF = T >> 1;
  if (dir === 1) { // slopes up-N: top is high
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.42 - i * 0.035).toFixed(3);
      rect(ctx, 1, i + 1, T - 2, 1, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, 1, 0, T - 2, 1, 'rgba(255,255,255,0.55)');
    // Arrow indicator
    rect(ctx, T / 2 - 1, 3, 2, 4, 'rgba(255,255,255,0.4)');
  } else if (dir === 3) { // slopes up-S: bottom is high
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.42 - i * 0.035).toFixed(3);
      rect(ctx, 1, T - 2 - i, T - 2, 1, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, 1, T - 1, T - 2, 1, 'rgba(255,255,255,0.55)');
    rect(ctx, T / 2 - 1, T - 7, 2, 4, 'rgba(255,255,255,0.4)');
  } else if (dir === 4) { // slopes up-W: left is high
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.42 - i * 0.035).toFixed(3);
      rect(ctx, i + 1, 1, 1, T - 2, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, 0, 1, 1, T - 2, 'rgba(255,255,255,0.55)');
    rect(ctx, 3, T / 2 - 1, 4, 2, 'rgba(255,255,255,0.4)');
  } else if (dir === 2) { // slopes up-E: right is high
    for (let i = 0; i < HALF; i++) {
      const alpha = (0.42 - i * 0.035).toFixed(3);
      rect(ctx, T - 2 - i, 1, 1, T - 2, `rgba(255,252,220,${alpha})`);
    }
    rect(ctx, T - 1, 1, 1, T - 2, 'rgba(255,255,255,0.55)');
    rect(ctx, T - 7, T / 2 - 1, 4, 2, 'rgba(255,255,255,0.4)');
  }
}

function drawTree(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 7, 9, 2, 6, PAL.tree_trunk);
  rect(ctx, 3, 3, 10, 6, PAL.tree_leaves1);
  rect(ctx, 3, 2, 10, 1, PAL.tree_leaves2);
  rect(ctx, 12, 3, 1, 6, PAL.tree_leaves3);
  rect(ctx, 4, 4, 3, 2, PAL.tree_leaves2);
  rect(ctx, 8, 7, 4, 2, PAL.tree_leaves3);
}

function drawTreeBig(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');
  rect(ctx, 7, 8, 2, 7, PAL.tree_trunk);
  rect(ctx, 2, 2, 12, 7, PAL.tree_leaves1);
  rect(ctx, 2, 1, 12, 1, PAL.tree_leaves2);
  rect(ctx, 13, 2, 1, 7, PAL.tree_leaves3);
  rect(ctx, 4, 3, 4, 2, PAL.tree_leaves2);
  rect(ctx, 9, 6, 4, 2, PAL.tree_leaves3);
}

function drawTreeSmall(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 3, 13, 10, 2, '#00000033');
  rect(ctx, 7, 10, 2, 5, PAL.tree_trunk);
  rect(ctx, 4, 5, 8, 5, PAL.tree_leaves1);
  rect(ctx, 4, 4, 8, 1, PAL.tree_leaves2);
  rect(ctx, 11, 5, 1, 5, PAL.tree_leaves3);
  rect(ctx, 5, 6, 2, 2, PAL.tree_leaves2);
}

function drawTreeCactus(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 3, 13, 10, 2, '#00000033');
  rect(ctx, 7, 4, 2, 9, '#2f8c48');
  rect(ctx, 9, 4, 1, 9, '#256f3a');
  rect(ctx, 5, 7, 2, 4, '#2f8c48');
  rect(ctx, 6, 7, 1, 4, '#256f3a');
  rect(ctx, 9, 6, 2, 4, '#2f8c48');
  rect(ctx, 10, 6, 1, 4, '#256f3a');
  rect(ctx, 6, 12, 4, 2, '#9c7a4f');
  px(ctx, 8, 5, '#6ad48a');
  px(ctx, 6, 9, '#6ad48a');
  px(ctx, 10, 8, '#6ad48a');
}

function drawTreeCherry(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 7, 9, 2, 6, PAL.tree_trunk);
  rect(ctx, 3, 3, 10, 6, '#f6a7c5');
  rect(ctx, 3, 2, 10, 1, '#ffc4da');
  rect(ctx, 12, 3, 1, 6, '#ea8eb5');
  rect(ctx, 5, 7, 6, 2, '#ea8eb5');
  px(ctx, 6, 5, '#d43d64');
  px(ctx, 9, 4, '#d43d64');
  px(ctx, 10, 6, '#d43d64');
}

function drawTreeShrubbery(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 3, 8, 10, 4, '#4ca23c');
  rect(ctx, 3, 7, 10, 1, '#66ba4f');
  rect(ctx, 12, 8, 1, 4, '#347a2b');
  rect(ctx, 2, 9, 2, 3, '#4ca23c');
  rect(ctx, 10, 9, 2, 3, '#4ca23c');
  rect(ctx, 5, 12, 6, 2, '#6f7f68');
  px(ctx, 4, 10, '#7ed166');
  px(ctx, 11, 10, '#7ed166');
}

function drawTreeApple(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 7, 9, 2, 6, PAL.tree_trunk);
  rect(ctx, 3, 4, 10, 6, '#3e9132');
  rect(ctx, 3, 3, 10, 1, '#56ab46');
  rect(ctx, 12, 4, 1, 6, '#2a6824');
  px(ctx, 6, 6, '#d94141');
  px(ctx, 9, 7, '#d94141');
  px(ctx, 10, 5, '#d94141');
  px(ctx, 7, 4, '#d94141');
}

function drawTreeLemon(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 7, 9, 2, 6, PAL.tree_trunk);
  rect(ctx, 3, 4, 10, 6, '#2f7f2d');
  rect(ctx, 3, 3, 10, 1, '#4f9f45');
  rect(ctx, 12, 4, 1, 6, '#235a21');
  px(ctx, 6, 6, '#f2dc4a');
  px(ctx, 9, 7, '#f2dc4a');
  px(ctx, 10, 5, '#f2dc4a');
  px(ctx, 7, 4, '#f2dc4a');
}

function drawWater(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, '#1f6ea8');
  for (let i = 0; i < 8; i++) {
    rect(ctx, (i * 2) % T, (i * 3 + 1) % T, 4, 1, '#4ba9e0');
  }
  rect(ctx, 0, 0, T, 1, '#78c5f0');
}

function drawConnectedWaterTile(
  ctx: OffscreenCanvasRenderingContext2D,
  mask: number,
  frame: number,
): void {
  const bottomA = '#7d8f63';
  const bottomB = '#6a7b53';
  const baseA = 'rgba(31,110,168,0.55)';
  const baseB = 'rgba(36,121,181,0.45)';
  const ripple = 'rgba(97,186,233,0.55)';
  const shore = '#8ed4f7';
  const deep = '#154f78';

  rect(ctx, 0, 0, T, T, bottomA);
  for (let i = 0; i < 8; i++) {
    px(ctx, (i * 3 + 1) % T, (i * 5 + 2) % T, bottomB);
  }
  rect(ctx, 0, 0, T, T, baseA);
  for (let y = 0; y < T; y += 2) {
    const shift = (frame + (y / 2)) % 3;
    for (let x = shift; x < T; x += 4) {
      px(ctx, x, y, baseB);
    }
  }

  for (let i = 0; i < 5; i++) {
    const y = 2 + i * 3;
    const x = (i * 4 + frame * 2) % T;
    rect(ctx, x, y, 3, 1, ripple);
  }

  const n = (mask & 1) !== 0;
  const e = (mask & 2) !== 0;
  const s = (mask & 4) !== 0;
  const w = (mask & 8) !== 0;

  if (!n) rect(ctx, 0, 0, T, 1, shore);
  if (!s) rect(ctx, 0, T - 1, T, 1, deep);
  if (!w) rect(ctx, 0, 0, 1, T, shore);
  if (!e) rect(ctx, T - 1, 0, 1, T, deep);

  if (!n && !w) {
    px(ctx, 0, 0, shore);
    px(ctx, 1, 0, shore);
    px(ctx, 0, 1, shore);
  }
  if (!n && !e) {
    px(ctx, T - 1, 0, shore);
    px(ctx, T - 2, 0, shore);
    px(ctx, T - 1, 1, shore);
  }
  if (!s && !w) {
    px(ctx, 0, T - 1, deep);
    px(ctx, 1, T - 1, deep);
    px(ctx, 0, T - 2, deep);
  }
  if (!s && !e) {
    px(ctx, T - 1, T - 1, deep);
    px(ctx, T - 2, T - 1, deep);
    px(ctx, T - 1, T - 2, deep);
  }
}

function drawEntrance(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 0, 0, T, T, PAL.pathDesert1);
  // gate pillars
  rect(ctx, 1, 0, 3, T, PAL.entrance1);
  rect(ctx, T - 4, 0, 3, T, PAL.entrance1);
  // arch
  rect(ctx, 4, 0, T - 8, 3, PAL.entrance2);
  // star decoration
  px(ctx, 7, 1, '#fff');
  px(ctx, 8, 1, '#fff');
}

function drawVisitor(ctx: OffscreenCanvasRenderingContext2D, variant: number): void {
  const shirts = ['#4488ff', '#ff4444', '#44cc44', '#ff8800', '#cc44cc', '#44cccc'];
  const shirt = shirts[variant % shirts.length];
  // head
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  // hair
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  // eyes
  px(ctx, 6, 3, '#000');
  px(ctx, 9, 3, '#000');
  // body / shirt
  rect(ctx, 4, 6, 8, 5, shirt);
  // pants
  rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
  rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
  // shoes
  px(ctx, 5, 15, '#222');
  px(ctx, 6, 15, '#222');
  px(ctx, 9, 15, '#222');
  px(ctx, 10, 15, '#222');
}

/* ── animated visitor sprites ── */

function drawVisitorDown(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000'); px(ctx, 9, 3, '#000');
  rect(ctx, 4, 6, 8, 5, shirt);
  if (frame === 0) {
    rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
    rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
    px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
    px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
  } else {
    rect(ctx, 4, 11, 3, 4, PAL.visitor_pants);
    rect(ctx, 10, 11, 3, 4, PAL.visitor_pants);
    px(ctx, 4, 15, '#222'); px(ctx, 5, 15, '#222');
    px(ctx, 10, 15, '#222'); px(ctx, 11, 15, '#222');
  }
}

function drawVisitorUp(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 0, 6, 6, PAL.visitor_hair);
  rect(ctx, 6, 5, 4, 1, PAL.visitor_skin);
  rect(ctx, 4, 6, 8, 5, shirt);
  if (frame === 0) {
    rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
    rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
    px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
    px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
  } else {
    rect(ctx, 4, 11, 3, 4, PAL.visitor_pants);
    rect(ctx, 10, 11, 3, 4, PAL.visitor_pants);
    px(ctx, 4, 15, '#222'); px(ctx, 5, 15, '#222');
    px(ctx, 10, 15, '#222'); px(ctx, 11, 15, '#222');
  }
}

function drawVisitorLeft(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000');
  rect(ctx, 4, 6, 8, 5, shirt);
  if (frame === 0) {
    rect(ctx, 3, 11, 3, 4, PAL.visitor_pants);
    rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
    px(ctx, 3, 15, '#222'); px(ctx, 4, 15, '#222');
    px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
  } else {
    rect(ctx, 6, 11, 4, 4, PAL.visitor_pants);
    px(ctx, 6, 15, '#222'); px(ctx, 7, 15, '#222');
    px(ctx, 8, 15, '#222'); px(ctx, 9, 15, '#222');
  }
}

function drawVisitorRight(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 9, 3, '#000');
  rect(ctx, 4, 6, 8, 5, shirt);
  if (frame === 0) {
    rect(ctx, 4, 11, 3, 4, PAL.visitor_pants);
    rect(ctx, 10, 11, 3, 4, PAL.visitor_pants);
    px(ctx, 4, 15, '#222'); px(ctx, 5, 15, '#222');
    px(ctx, 10, 15, '#222'); px(ctx, 11, 15, '#222');
  } else {
    rect(ctx, 6, 11, 4, 4, PAL.visitor_pants);
    px(ctx, 6, 15, '#222'); px(ctx, 7, 15, '#222');
    px(ctx, 8, 15, '#222'); px(ctx, 9, 15, '#222');
  }
}

function drawVisitorCheer(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000'); px(ctx, 9, 3, '#000');
  px(ctx, 7, 4, '#000'); px(ctx, 8, 4, '#000');
  rect(ctx, 4, 6, 8, 5, shirt);
  if (frame === 0) {
    rect(ctx, 2, 3, 2, 5, shirt);
    rect(ctx, 12, 3, 2, 5, shirt);
    px(ctx, 2, 2, PAL.visitor_skin); px(ctx, 3, 2, PAL.visitor_skin);
    px(ctx, 12, 2, PAL.visitor_skin); px(ctx, 13, 2, PAL.visitor_skin);
  } else {
    rect(ctx, 2, 1, 2, 6, shirt);
    rect(ctx, 12, 1, 2, 6, shirt);
    px(ctx, 2, 0, PAL.visitor_skin); px(ctx, 3, 0, PAL.visitor_skin);
    px(ctx, 12, 0, PAL.visitor_skin); px(ctx, 13, 0, PAL.visitor_skin);
  }
  rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
  rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
  px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
  px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
}

function drawVisitorEat(ctx: OffscreenCanvasRenderingContext2D, variant: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000'); px(ctx, 9, 3, '#000');
  rect(ctx, 4, 6, 8, 5, shirt);
  rect(ctx, 2, 5, 2, 3, shirt);
  px(ctx, 2, 4, PAL.visitor_skin); px(ctx, 3, 4, PAL.visitor_skin);
  rect(ctx, 2, 2, 2, 2, '#8B4513');
  rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
  rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
  px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
  px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
}

function drawVisitorDrink(ctx: OffscreenCanvasRenderingContext2D, variant: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000'); px(ctx, 9, 3, '#000');
  rect(ctx, 4, 6, 8, 5, shirt);
  rect(ctx, 12, 5, 2, 3, shirt);
  px(ctx, 12, 4, PAL.visitor_skin); px(ctx, 13, 4, PAL.visitor_skin);
  rect(ctx, 12, 1, 2, 3, '#2288cc');
  px(ctx, 12, 1, '#66ccff');
  rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
  rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
  px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
  px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
}

function drawVisitorPuke(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  drawVisitorDown(ctx, variant, frame % 2);
  const spillX = frame === 0 ? 6 : 5;
  rect(ctx, spillX, 9, 4, 2, PAL.puke1);
  px(ctx, spillX + 1, 11, PAL.puke2);
  px(ctx, spillX + 3, 11, PAL.puke2);
}

function drawVisitorCriminal(ctx: OffscreenCanvasRenderingContext2D, variant: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  rect(ctx, 4, 6, 8, 5, shirt);
  rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
  rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
  px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
  px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
  // Black mask
  rect(ctx, 5, 2, 6, 2, '#111');
  px(ctx, 6, 3, '#ddd');
  px(ctx, 9, 3, '#ddd');
}

function drawMechanic(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, '#2b2b2b');
  rect(ctx, 4, 6, 8, 5, '#f4c430');
  rect(ctx, 5, 11, 3, 4, '#2a3f5f');
  rect(ctx, 9, 11, 3, 4, '#2a3f5f');
  // Wrench
  rect(ctx, 12, 6, 1, 5, '#cfd8dc');
  rect(ctx, 11, 5, 3, 1, '#cfd8dc');
}

function drawCleaner(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, '#1b1b1b');
  rect(ctx, 4, 6, 8, 5, PAL.cleaner_uniform);
  rect(ctx, 5, 11, 3, 4, PAL.cleaner_pants);
  rect(ctx, 9, 11, 3, 4, PAL.cleaner_pants);
  // Mop handle and mop head
  rect(ctx, 12, 5, 1, 8, '#b08d57');
  rect(ctx, 10, 12, 4, 2, '#b0bec5');
}

function drawSecurity(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, '#0d1b2a');
  rect(ctx, 4, 6, 8, 5, '#1d3557');
  rect(ctx, 5, 11, 3, 4, '#0d1b2a');
  rect(ctx, 9, 11, 3, 4, '#0d1b2a');
  rect(ctx, 4, 6, 2, 2, '#f6c90e');
  rect(ctx, 12, 6, 1, 5, '#444');
}

function drawEntertainerDance(ctx: OffscreenCanvasRenderingContext2D, frame: number): void {
  // Colorful mascot costume with two dance poses.
  rect(ctx, 5, 1, 6, 5, '#ffd89c');
  rect(ctx, 4, 0, 8, 2, '#a43ddb');
  rect(ctx, 3, 1, 2, 2, '#ffcf33');
  rect(ctx, 11, 1, 2, 2, '#3ec9ff');
  px(ctx, 6, 3, '#111');
  px(ctx, 9, 3, '#111');
  rect(ctx, 7, 4, 2, 1, '#d64545');

  rect(ctx, 4, 6, 8, 5, '#ff3f7f');
  rect(ctx, 5, 7, 6, 1, '#ffe27a');
  rect(ctx, 5, 11, 3, 4, '#4c2a88');
  rect(ctx, 9, 11, 3, 4, '#4c2a88');
  px(ctx, 5, 15, '#1c1c1c');
  px(ctx, 6, 15, '#1c1c1c');
  px(ctx, 9, 15, '#1c1c1c');
  px(ctx, 10, 15, '#1c1c1c');

  if (frame % 2 === 0) {
    rect(ctx, 2, 5, 2, 4, '#ffcf33');
    rect(ctx, 12, 7, 2, 4, '#3ec9ff');
  } else {
    rect(ctx, 2, 7, 2, 4, '#ffcf33');
    rect(ctx, 12, 5, 2, 4, '#3ec9ff');
  }
}

function drawPuke(ctx: OffscreenCanvasRenderingContext2D, frame: number): void {
  const y = frame === 0 ? 11 : 10;
  rect(ctx, 3, y, 10, 3, PAL.puke1);
  rect(ctx, 5, y - 1, 6, 2, PAL.puke1);
  px(ctx, 4, y + 2, PAL.puke2);
  px(ctx, 7, y + 2, PAL.puke2);
  px(ctx, 10, y + 1, PAL.puke2);
  px(ctx, 12, y + 2, PAL.puke2);
}

/* ── Furniture sprites ── */

function drawBench(ctx: OffscreenCanvasRenderingContext2D): void {
  // Horizontal bench (east-west path direction)
  rect(ctx, 2, 10, 2, 5, '#6b4226');
  rect(ctx, 12, 10, 2, 5, '#6b4226');
  rect(ctx, 1, 9, 14, 2, '#c8903c');
  rect(ctx, 1, 9, 14, 1, '#e0a84a');
  rect(ctx, 1, 5, 14, 4, '#b07830');
  rect(ctx, 2, 5, 12, 1, '#c8903c');
  rect(ctx, 2, 7, 12, 1, '#a06828');
  rect(ctx, 1, 7, 2, 3, '#6b4226');
  rect(ctx, 13, 7, 2, 3, '#6b4226');
}

function drawBenchVertical(ctx: OffscreenCanvasRenderingContext2D): void {
  // Vertical bench (north-south path direction)
  rect(ctx, 10, 2, 5, 2, '#6b4226');
  rect(ctx, 10, 12, 5, 2, '#6b4226');
  rect(ctx, 9, 1, 2, 14, '#c8903c');
  rect(ctx, 9, 1, 1, 14, '#e0a84a');
  rect(ctx, 5, 1, 4, 14, '#b07830');
  rect(ctx, 5, 2, 1, 12, '#c8903c');
  rect(ctx, 7, 2, 1, 12, '#a06828');
  rect(ctx, 7, 1, 3, 2, '#6b4226');
  rect(ctx, 7, 13, 3, 2, '#6b4226');
}

function drawBenchBroken(ctx: OffscreenCanvasRenderingContext2D, vertical: boolean): void {
  if (vertical) drawBenchVertical(ctx);
  else drawBench(ctx);
  rect(ctx, 3, 8, 10, 2, '#3b2a1a');
  rect(ctx, 6, 6, 2, 6, '#2a1b10');
}

function drawTrashCan(ctx: OffscreenCanvasRenderingContext2D, fillRatio: number): void {
  // Compact bin (smaller footprint so it can sit on path edge)
  rect(ctx, 5, 6, 6, 7, '#607d8b');
  rect(ctx, 4, 6, 8, 1, '#78909c');
  rect(ctx, 4, 12, 8, 1, '#455a64');
  // Rim
  rect(ctx, 4, 5, 8, 2, '#90a4ae');
  // Fill indicator
  if (fillRatio > 0) {
    const fillH = Math.ceil(fillRatio * 5);
    const fillY = 7 + (5 - fillH);
    rect(ctx, 6, fillY, 4, fillH, '#8d6e37');
    if (fillRatio >= 1) {
      // Overflowing
      rect(ctx, 4, 5, 1, 2, '#8d6e37');
      rect(ctx, 11, 5, 1, 2, '#8d6e37');
    }
  }
  // Recycle icon hint
  px(ctx, 7, 9, '#b0bec5');
  px(ctx, 8, 9, '#b0bec5');
}

function drawTrashCanBroken(ctx: OffscreenCanvasRenderingContext2D): void {
  drawTrashCan(ctx, 1);
  rect(ctx, 4, 6, 8, 1, '#2b2b2b');
  rect(ctx, 5, 7, 1, 5, '#2b2b2b');
  px(ctx, 10, 10, '#2b2b2b');
}

function drawLitter(ctx: OffscreenCanvasRenderingContext2D, frame: number): void {
  // Small scattered trash items on ground
  const ox = frame === 0 ? 0 : 2;
  // Wrapper
  rect(ctx, 3 + ox, 11, 4, 2, '#d4a030');
  px(ctx, 4 + ox, 12, '#b08620');
  // Cup
  rect(ctx, 9 - ox, 10, 3, 3, '#ecf0f1');
  px(ctx, 10 - ox, 10, '#bdc3c7');
  // Crumple
  px(ctx, 6, 13 + (frame % 2), '#a0522d');
  px(ctx, 12, 12, '#d4a030');
}

function drawSceneryFountain(ctx: OffscreenCanvasRenderingContext2D, frame: number): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 3, 10, 10, 3, '#7f8c8d');
  rect(ctx, 3, 9, 10, 1, '#9aa7aa');
  rect(ctx, 12, 10, 1, 3, '#667476');
  rect(ctx, 5, 8, 6, 2, '#9fb0b3');
  rect(ctx, 7, 5, 2, 3, '#c4ccd1');
  const jetY = frame === 0 ? 1 : 2;
  rect(ctx, 8, jetY, 1, 4, '#a8e6ff');
  rect(ctx, 7, 3 + (frame === 0 ? 0 : 1), 3, 1, '#c6f2ff');
}

function drawSceneryFlowers(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000022');
  rect(ctx, 3, 11, 10, 2, '#6f8c5b');
  for (let i = 0; i < 6; i++) {
    const x = 2 + (i * 2);
    const y = 4 + ((i * 3) % 7);
    px(ctx, x, y, '#ff5a5a');
    px(ctx, x + 1, y + 1, '#ffd166');
    px(ctx, x - 1, y + 1, '#7bdff2');
  }
}

function drawSceneryStatue(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 4, 11, 8, 2, '#6e7b84');
  rect(ctx, 4, 10, 8, 1, '#87959f');
  rect(ctx, 11, 11, 1, 2, '#59656d');
  rect(ctx, 6, 5, 4, 6, '#8b9aa5');
  rect(ctx, 9, 5, 1, 6, '#71818c');
  rect(ctx, 5, 4, 6, 1, '#9aaab6');
  rect(ctx, 7, 2, 2, 2, '#aab9c4');
}

function drawSceneryTopiary(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 2, 13, 12, 2, '#00000033');
  rect(ctx, 4, 12, 8, 1, '#6f7f68');
  rect(ctx, 4, 11, 8, 1, '#87977f');
  rect(ctx, 11, 12, 1, 1, '#596556');
  rect(ctx, 7, 9, 2, 3, '#6b4f33');
  rect(ctx, 3, 6, 10, 3, '#3f7f2e');
  rect(ctx, 3, 5, 10, 1, '#52a53b');
  rect(ctx, 12, 6, 1, 3, '#2f6223');
  rect(ctx, 2, 8, 2, 2, '#3f7f2e');
  rect(ctx, 12, 8, 2, 2, '#3f7f2e');
  rect(ctx, 4, 3, 8, 2, '#52a53b');
  px(ctx, 5, 4, '#7bcc5a');
  px(ctx, 10, 4, '#7bcc5a');
}

function drawSceneryGazebo(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');
  rect(ctx, 3, 11, 10, 2, '#7b8a95');
  rect(ctx, 3, 10, 10, 1, '#95a4af');
  rect(ctx, 12, 11, 1, 2, '#63717a');
  rect(ctx, 4, 6, 2, 4, '#d0d7de');
  rect(ctx, 10, 6, 2, 4, '#d0d7de');
  rect(ctx, 7, 7, 2, 3, '#c2c8cf');
  rect(ctx, 2, 5, 12, 1, '#9ba9b5');
  rect(ctx, 5, 2, 6, 3, '#aa7851');
  rect(ctx, 4, 3, 8, 1, '#895f40');
}

function drawVisitorSitting(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  // Head
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000'); px(ctx, 9, 3, '#000');
  // Body
  rect(ctx, 4, 6, 8, 5, shirt);
  // Legs (bent forward – sitting)
  rect(ctx, 4, 11, 4, 2, PAL.visitor_pants);
  rect(ctx, 8, 11, 4, 2, PAL.visitor_pants);
  // Feet (forward)
  px(ctx, 4, 13, '#222'); px(ctx, 5, 13, '#222');
  px(ctx, 10, 13, '#222'); px(ctx, 11, 13, '#222');
  // Subtle breathing animation
  if (frame === 1) {
    rect(ctx, 4, 6, 8, 1, shirt);
  }
}

function drawVisitorThrowTrash(ctx: OffscreenCanvasRenderingContext2D, variant: number, frame: number): void {
  const shirt = VISITOR_SHIRTS[variant % VISITOR_SHIRTS.length];
  // Head
  rect(ctx, 5, 1, 6, 5, PAL.visitor_skin);
  rect(ctx, 5, 0, 6, 2, PAL.visitor_hair);
  px(ctx, 6, 3, '#000'); px(ctx, 9, 3, '#000');
  // Body
  rect(ctx, 4, 6, 8, 5, shirt);
  // Arms – one reaching forward with trash
  if (frame === 0) {
    rect(ctx, 12, 4, 2, 4, shirt);
    px(ctx, 12, 3, PAL.visitor_skin); px(ctx, 13, 3, PAL.visitor_skin);
    // Trash item in hand
    rect(ctx, 13, 1, 3, 3, '#d4a030');
  } else {
    rect(ctx, 12, 6, 2, 3, shirt);
    px(ctx, 12, 5, PAL.visitor_skin); px(ctx, 13, 5, PAL.visitor_skin);
  }
  // Legs
  rect(ctx, 5, 11, 3, 4, PAL.visitor_pants);
  rect(ctx, 9, 11, 3, 4, PAL.visitor_pants);
  px(ctx, 5, 15, '#222'); px(ctx, 6, 15, '#222');
  px(ctx, 9, 15, '#222'); px(ctx, 10, 15, '#222');
}

function drawBridgeSupport(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 4, 6, 2, 10, '#6b5b44');
  rect(ctx, 10, 6, 2, 10, '#6b5b44');
  rect(ctx, 3, 6, 10, 1, '#8a7758');
  rect(ctx, 3, 15, 10, 1, '#40372a');
}

function drawTunnelOverlay(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 6, 14, 9, 'rgba(20,20,24,0.45)');
  rect(ctx, 2, 7, 12, 7, 'rgba(6,6,10,0.45)');
  rect(ctx, 1, 6, 14, 1, 'rgba(120,120,130,0.5)');
}

function drawRampPiece(_ctx: OffscreenCanvasRenderingContext2D, _dir: number): void { /* removed */ }

/* ── Fallback generic attraction tile ── */
function drawAttractionTile(ctx: OffscreenCanvasRenderingContext2D, color: string, icon: string, isTopLeft: boolean): void {
  rect(ctx, 0, 0, T, T, color);
  rect(ctx, 0, 0, T, 1, '#00000044');
  rect(ctx, 0, T - 1, T, 1, '#00000044');
  rect(ctx, 0, 0, 1, T, '#00000044');
  rect(ctx, T - 1, 0, 1, T, '#00000044');
  rect(ctx, 2, 2, T - 4, T - 4, color);
  rect(ctx, 3, 3, T - 6, 1, '#ffffff33');
  if (isTopLeft) {
    rect(ctx, 2, 2, T - 4, 3, '#00000022');
    ctx.font = '10px serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(icon, 3, 13);
  } else {
    for (let i = 0; i < 4; i++) {
      px(ctx, 3 + i * 3, 7, '#ffffff44');
    }
  }
}

export {
  T,
  PAL,
  createCanvas,
  px,
  rect,
  drawGrass,
  drawGrassDark,
  drawLandDesert,
  drawLandMud,
  drawPath,
  drawPathDesert,
  drawPathConcrete,
  drawPathQueue,
  drawConnectedPathTile,
  drawSlopeOverlay,
  drawRampPath,
  drawTree,
  drawTreeBig,
  drawTreeSmall,
  drawTreeCactus,
  drawTreeCherry,
  drawTreeShrubbery,
  drawTreeApple,
  drawTreeLemon,
  drawWater,
  drawConnectedWaterTile,
  drawEntrance,
  drawVisitor,
  drawVisitorDown,
  drawVisitorUp,
  drawVisitorLeft,
  drawVisitorRight,
  drawVisitorCheer,
  drawVisitorEat,
  drawVisitorDrink,
  drawVisitorPuke,
  drawVisitorCriminal,
  drawMechanic,
  drawCleaner,
  drawSecurity,
  drawEntertainerDance,
  drawPuke,
  drawBench,
  drawBenchVertical,
  drawBenchBroken,
  drawTrashCan,
  drawTrashCanBroken,
  drawLitter,
  drawVisitorSitting,
  drawVisitorThrowTrash,
  drawBridgeSupport,
  drawTunnelOverlay,
  drawAttractionTile,
  drawSceneryFountain,
  drawSceneryFlowers,
  drawSceneryStatue,
  drawSceneryTopiary,
  drawSceneryGazebo,
};
