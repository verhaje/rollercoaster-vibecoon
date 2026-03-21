/* ══════════════════════════════════════════
  RIDE / ATTRACTION PIXEL-ART DRAWERS
   Each function draws one 16×16 tile of a
   multi-tile attraction.  frame=0|1 for anim.
   ══════════════════════════════════════════ */

import { T, px, rect } from './core';

/** Shared: draw the platform / floor base used by most rides */
function attrFloor(ctx: OffscreenCanvasRenderingContext2D, col: string): void {
  rect(ctx, 0, 12, T, 4, '#5a4a30');   // dark wooden deck
  rect(ctx, 0, 11, T, 1, '#7a6540');   // deck edge
  rect(ctx, 0, 15, T, 1, '#3a3020');   // shadow
  rect(ctx, 0, 0, T, 11, col);         // body background
}

/** Carousel – id 0, 2×2 */
function drawCarousel(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  const base = '#e74c3c';
  attrFloor(ctx, '#f5d7c8');
  if (tx === 0 && ty === 0) {
    // Left-top: pole, canopy left half
    rect(ctx, 6, 2, 4, 10, '#cc3333');          // center pole
    rect(ctx, 0, 2, 16, 3, '#e74c3c');           // canopy
    rect(ctx, 0, 2, 16, 1, '#fff');              // canopy stripe
    rect(ctx, 0, 4, 16, 1, '#ff8888');
    // spinning horse left — frame offset
    const hx = frame === 0 ? 2 : 3;
    const hy = frame === 0 ? 5 : 7;
    rect(ctx, hx, hy, 5, 3, '#f9e4b7');          // horse body
    px(ctx, hx + 4, hy - 1, '#f9e4b7');          // head
    rect(ctx, hx, hy + 3, 1, 2, '#c8a060');     // leg
  } else if (tx === 1 && ty === 0) {
    // Right-top: mirror canopy
    rect(ctx, 0, 2, 16, 3, '#e74c3c');
    rect(ctx, 0, 2, 16, 1, '#fff');
    rect(ctx, 0, 4, 16, 1, '#ff8888');
    const hx = frame === 0 ? 9 : 8;
    const hy = frame === 0 ? 7 : 5;
    rect(ctx, hx, hy, 5, 3, '#f9e4b7');
    px(ctx, hx, hy - 1, '#f9e4b7');
    rect(ctx, hx + 4, hy + 3, 1, 2, '#c8a060');
  } else if (tx === 0 && ty === 1) {
    // Left-bottom: lower pole + star lights
    rect(ctx, 6, 0, 4, 11, '#cc3333');
    for (let i = 0; i < 4; i++) {
      px(ctx, 1 + i * 4, frame === 0 ? 3 : 5, '#ffe566'); // twinkling lights
    }
    rect(ctx, 0, 11, T, 1, '#7a6540');
    rect(ctx, 0, 12, T, 4, '#5a4a30');
  } else {
    // Right-bottom: lower decoration
    rect(ctx, 6, 0, 4, 11, '#cc3333');
    for (let i = 0; i < 4; i++) {
      px(ctx, 1 + i * 4, frame === 0 ? 5 : 3, '#ffe566');
    }
    rect(ctx, 0, 11, T, 1, '#7a6540');
    rect(ctx, 0, 12, T, 4, '#5a4a30');
  }
  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
  rect(ctx, T - 1, 0, 1, T, '#0003');
}

/** Roller Coaster – id 1, station tile */
function drawRollerCoaster(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  rect(ctx, 0, 0, T, T, '#b0a898');
  rect(ctx, 0, 0, T, 3, '#c0392b');
  rect(ctx, 0, 0, T, 1, '#e74c3c');
  rect(ctx, 0, 10, T, 3, '#c8b898');
  rect(ctx, 0, 9, T, 1, '#a89878');

  // Track rails through station.
  rect(ctx, 3, 0, 2, T, '#888');
  rect(ctx, 11, 0, 2, T, '#888');
  for (let y = 0; y < T; y += 3) {
    rect(ctx, 3, y, 10, 1, '#6b4226');
  }

  // Small animated car in station.
  const cartY = frame === 0 ? 6 : 7;
  rect(ctx, 5, cartY, 6, 3, '#e67e22');
  rect(ctx, 6, cartY - 1, 4, 1, '#cc6611');
  px(ctx, 6, cartY + 1, '#fff');
  px(ctx, 9, cartY + 1, '#fff');

  // Entry/exit markers.
  rect(ctx, 1, 3, 5, 4, '#27ae60');
  rect(ctx, 10, 3, 5, 4, '#1976d2');
  rect(ctx, 0, 0, T, 1, '#0004');
  rect(ctx, 0, 0, 1, T, '#0004');
}

/** Ferris Wheel – id 2, 3×3 */
function drawFerrisWheel(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  const sky = '#cae4f4';
  const ground = '#95ab6b';
  const platform = '#8f8474';
  const rimDark = '#4f7da4';
  const rimLight = '#8fc0df';
  const steel = '#5c6f82';
  const supportLight = '#6d8297';
  const supportDark = '#425160';

  rect(ctx, 0, 0, T, 11, sky);
  rect(ctx, 0, 11, T, 5, ground);

  // Bottom row carries the station platform to anchor the ride mass.
  if (ty === 2) {
    rect(ctx, 0, 10, T, 6, platform);
    rect(ctx, 0, 10, T, 1, '#b5a993');
    rect(ctx, 0, 15, T, 1, '#6e665a');
  }

  // Central wheel disk uses concentric rings so it reads as top-down 3D.
  if (tx === 1 && ty === 1) {
    ctx.fillStyle = rimDark;
    ctx.beginPath();
    ctx.arc(8, 8, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = rimLight;
    ctx.beginPath();
    ctx.arc(8, 8, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = steel;
    ctx.beginPath();
    ctx.arc(8, 8, 3, 0, Math.PI * 2);
    ctx.fill();

    const rotation = frame === 0 ? 0 : Math.PI / 8;
    ctx.strokeStyle = '#375267';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const a = rotation + i * (Math.PI / 4);
      const x = 8 + Math.cos(a) * 6;
      const y = 8 + Math.sin(a) * 6;
      ctx.beginPath();
      ctx.moveTo(8, 8);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    rect(ctx, 6, 6, 4, 4, '#87a5be');
    px(ctx, 7, 7, '#d8ecfa');
    px(ctx, 8, 7, '#d8ecfa');
  }

  // Edge tiles continue wheel rim so 3x3 reads as one large structure.
  if (ty === 0) {
    if (tx === 0) rect(ctx, 11, 10, 5, 2, rimDark);
    if (tx === 1) rect(ctx, 2, 12, 12, 2, rimDark);
    if (tx === 2) rect(ctx, 0, 10, 5, 2, rimDark);
  }
  if (ty === 1) {
    if (tx === 0) rect(ctx, 13, 6, 3, 4, rimDark);
    if (tx === 2) rect(ctx, 0, 6, 3, 4, rimDark);
  }
  if (ty === 2) {
    if (tx === 0) rect(ctx, 11, 3, 5, 2, rimDark);
    if (tx === 1) rect(ctx, 2, 2, 12, 2, rimDark);
    if (tx === 2) rect(ctx, 0, 3, 5, 2, rimDark);
  }

  // Supports and hub stem sit mostly on center/bottom tiles.
  if (tx === 1) {
    if (ty === 1) {
      rect(ctx, 7, 12, 2, 4, supportDark);
      rect(ctx, 6, 12, 1, 4, supportLight);
      rect(ctx, 9, 12, 1, 4, supportDark);
    }
    if (ty === 2) {
      rect(ctx, 3, 2, 4, 8, supportLight);
      rect(ctx, 9, 2, 4, 8, supportDark);
      rect(ctx, 6, 7, 4, 2, '#738ba0');
    }
  }

  // Rotating gondolas: each frame shifts around ring anchors.
  const gondolaColorA = '#f59f3a';
  const gondolaColorB = '#d94841';
  if (frame === 0) {
    if (tx === 1 && ty === 0) rect(ctx, 7, 11, 2, 2, gondolaColorA);
    if (tx === 2 && ty === 1) rect(ctx, 1, 7, 2, 2, gondolaColorB);
    if (tx === 1 && ty === 2) rect(ctx, 7, 2, 2, 2, gondolaColorA);
    if (tx === 0 && ty === 1) rect(ctx, 13, 7, 2, 2, gondolaColorB);
  } else {
    if (tx === 2 && ty === 0) rect(ctx, 1, 11, 2, 2, gondolaColorA);
    if (tx === 2 && ty === 2) rect(ctx, 1, 2, 2, 2, gondolaColorB);
    if (tx === 0 && ty === 2) rect(ctx, 13, 2, 2, 2, gondolaColorA);
    if (tx === 0 && ty === 0) rect(ctx, 13, 11, 2, 2, gondolaColorB);
  }

  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** Bumper Cars – id 3, 3×2 */
function drawBumperCars(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  rect(ctx, 0, 0, T, T, '#2a2a2a');  // floor
  // Grid floor lines
  for (let i = 0; i < T; i += 4) {
    rect(ctx, i, 0, 1, T, '#333');
    rect(ctx, 0, i, T, 1, '#333');
  }
  // Boundary wall
  if (tx === 0) rect(ctx, 0, 0, 2, T, '#f1c40f');
  if (tx === 2) rect(ctx, T - 2, 0, 2, T, '#f1c40f');
  if (ty === 0) rect(ctx, 0, 0, T, 2, '#f1c40f');
  if (ty === 1) rect(ctx, 0, T - 2, T, 2, '#f1c40f');

  // Bumper cars (small colourful rectangles) – shift by frame
  type Car = [number, number, string];
  const cars: Car[][] = [
    [[2, 4, '#e74c3c'], [10, 8, '#3498db']],  // frame 0
    [[4, 6, '#e74c3c'], [8, 4, '#3498db']],   // frame 1
  ];
  if (tx === 1 && ty === 0) {
    for (const [cx, cy, cc] of cars[frame]) {
      rect(ctx, cx, cy, 6, 4, cc);
      rect(ctx, cx + 1, cy + 1, 4, 2, '#ffffff44');
      rect(ctx, cx, cy + 4, 6, 1, '#0004');
    }
  }
  if (tx === 0 && ty === 1 && frame === 0) {
    rect(ctx, 4, 3, 5, 3, '#2ecc71');
    rect(ctx, 5, 4, 3, 1, '#ffffff44');
  }
  if (tx === 2 && ty === 1 && frame === 1) {
    rect(ctx, 2, 4, 5, 3, '#9b59b6');
    rect(ctx, 3, 5, 3, 1, '#ffffff44');
  }
  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** Haunted House – id 4, 3×3 */
function drawHauntedHouse(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  if (ty === 0) {
    // Roofline
    rect(ctx, 0, 0, T, T, '#1a0d2e');
    if (tx === 1) {
      // Central tower peak
      rect(ctx, 5, 0, 6, 5, '#2d1b4e');
      rect(ctx, 7, 0, 2, 3, '#4a2870');
      // Flashing window
      rect(ctx, 6, 4, 4, 4, frame === 0 ? '#ffd700' : '#ff4400');
      // Bat (frame-dependent)
      if (frame === 0) {
        px(ctx, 2, 2, '#555'); px(ctx, 3, 1, '#555'); px(ctx, 4, 2, '#555');
        px(ctx, 11, 4, '#555'); px(ctx, 12, 3, '#555'); px(ctx, 13, 4, '#555');
      } else {
        px(ctx, 1, 4, '#555'); px(ctx, 2, 3, '#555'); px(ctx, 3, 4, '#555');
        px(ctx, 12, 2, '#555'); px(ctx, 13, 1, '#555'); px(ctx, 14, 2, '#555');
      }
    } else {
      rect(ctx, 0, 4, T, T - 4, '#2d1b4e');
      rect(ctx, 0, 3, T, 2, '#3d2b60');
    }
  } else if (ty === 1) {
    rect(ctx, 0, 0, T, T, '#2d1b4e');
    if (tx === 1) {
      // Windows glow
      rect(ctx, 2, 1, 4, 5, frame === 0 ? '#554400' : '#0a0a1f');
      rect(ctx, 10, 1, 4, 5, frame === 1 ? '#880000' : '#0a0a1f');
      // Door
      rect(ctx, 6, 7, 4, 9, '#1a0d2e');
      rect(ctx, 7, 7, 2, 5, '#0005');
    } else if (tx === 0) {
      rect(ctx, T - 3, 0, 3, T, '#221540');  // side wall shading
      rect(ctx, 5, 3, 4, 4, frame === 0 ? '#333300' : '#0a0a1f');
    } else {
      rect(ctx, 0, 0, 3, T, '#221540');
      rect(ctx, 7, 3, 4, 4, frame === 1 ? '#440000' : '#0a0a1f');
    }
  } else {
    // Ground level
    rect(ctx, 0, 0, T, T, '#1e1428');
    if (tx === 1) {
      // Entry porch
      rect(ctx, 3, 0, 10, 3, '#2d1b4e');
      rect(ctx, 5, 0, 6, 3, '#1a0d2e');  // doorway
      // Gravestones
      rect(ctx, 1, 6, 3, 4, '#666');
      rect(ctx, 2, 5, 1, 2, '#666');
      rect(ctx, 11, 8, 3, 4, '#555');
      rect(ctx, 12, 7, 1, 2, '#555');
    }
    rect(ctx, 0, T - 3, T, 3, '#2a1e38');
  }
  rect(ctx, 0, 0, T, 1, '#0005');
  rect(ctx, 0, 0, 1, T, '#0005');
}

/** Tea Cups – id 5, 2×2 */
function drawTeaCups(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  rect(ctx, 0, 0, T, T, '#c4ede9');
  // Rotating platform rim
  if (ty === 0 && tx === 0) {
    rect(ctx, 0, 8, T, 2, '#1abc9c');
    rect(ctx, 8, 0, 2, T, '#1abc9c');
    // Cup 1 – rotates clockwise
    const cx = frame === 0 ? 2 : 3;
    const cy = frame === 0 ? 1 : 2;
    rect(ctx, cx, cy, 6, 5, '#e8f8f5');
    rect(ctx, cx + 1, cy + 4, 4, 1, '#1abc9c');  // rim
    px(ctx, cx + 2, cy + 1, '#1abc9c');            // handle notch
    rect(ctx, cx + 5, cy + 1, 2, 2, '#1abc9c');   // handle
  } else if (ty === 0 && tx === 1) {
    rect(ctx, 0, 8, T, 2, '#1abc9c');
    const cx = frame === 0 ? 8 : 7;
    const cy = frame === 0 ? 2 : 1;
    rect(ctx, cx, cy, 6, 5, '#fde8ff');
    rect(ctx, cx + 1, cy + 4, 4, 1, '#9b59b6');
    rect(ctx, cx - 2, cy + 1, 2, 2, '#9b59b6');
  } else if (ty === 1 && tx === 0) {
    rect(ctx, 8, 0, 2, 8, '#1abc9c');
    const cy = frame === 0 ? 9 : 8;
    rect(ctx, 1, cy, 6, 5, '#fff3cd');
    rect(ctx, 2, cy + 4, 4, 1, '#f1c40f');
    rect(ctx, 6, cy + 1, 2, 2, '#f1c40f');
  } else {
    rect(ctx, 0, 0, 8, 2, '#1abc9c');
    const cx = frame === 0 ? 7 : 8;
    const cy = frame === 0 ? 8 : 9;
    rect(ctx, cx, cy, 6, 5, '#fde2e2');
    rect(ctx, cx + 1, cy + 4, 4, 1, '#e74c3c');
    rect(ctx, cx - 2, cy + 1, 2, 2, '#e74c3c');
  }
  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** Log Flume – id 6, 4×2 */
function drawLogFlume(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  if (ty === 0) {
    // Upper: water channel
    rect(ctx, 0, 0, T, T, '#6d9e5e');  // grass bank
    rect(ctx, 3, 5, T - 3, 6, '#2980b9');  // water
    rect(ctx, 3, 5, T - 3, 1, '#5ab4e8'); // highlight
    // Moving log boat on column 1
    if (tx === 1) {
      const lx = frame === 0 ? 3 : 6;
      rect(ctx, lx, 6, 7, 4, '#8B4513');   // log
      rect(ctx, lx + 1, 7, 5, 2, '#6B3410'); // hollow
      px(ctx, lx + 2, 6, '#a0614a'); px(ctx, lx + 5, 6, '#a0614a'); // rings
    }
    // Waterfall/drop on rightmost
    if (tx === 3) {
      rect(ctx, 0, 0, 5, T, '#2980b9');
      rect(ctx, 0, 0, 1, T, '#5ab4e8');
      // Splash at bottom
      if (frame === 0) {
        px(ctx, 2, 12, '#9dd8f5'); px(ctx, 4, 10, '#9dd8f5');
      } else {
        px(ctx, 1, 11, '#9dd8f5'); px(ctx, 3, 13, '#9dd8f5');
      }
    }
  } else {
    // Lower: loading platform + supports
    rect(ctx, 0, 0, T, T, '#b0a080');
    // channel support
    rect(ctx, 3, 0, T - 3, 5, '#2980b9');
    rect(ctx, 3, 0, T - 3, 1, '#5ab4e8');
    if (tx === 0 || tx === 3) {
      rect(ctx, 4, 4, 4, T - 4, '#8B5e3c');  // support pillar
    }
    // platform boards
    rect(ctx, 0, 8, T, T - 8, '#c8a878');
    for (let i = 0; i < T; i += 3) {
      rect(ctx, i, 8, 1, T - 8, '#a88a58');
    }
  }
  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** Zen Garden – id 7, 2×3 — calm / relax */
function drawZenGarden(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  rect(ctx, 0, 0, T, T, '#c8ba90');  // sand base
  // Raked sand lines (shift per frame for gentle animation)
  const lineOff = frame === 0 ? 0 : 1;
  for (let i = 0; i < T; i += 3) {
    rect(ctx, 0, i + lineOff, T, 1, '#b8aa80');
  }
  if (ty === 0) {
    // Top row: stones / lantern
    if (tx === 0) {
      rect(ctx, 3, 3, 5, 5, '#7f8c8d');   // stone 1
      px(ctx, 4, 4, '#9eacad'); px(ctx, 5, 3, '#9eacad');
    } else {
      // Stone lantern
      rect(ctx, 5, 3, 6, 3, '#8e8070');   // cap
      rect(ctx, 6, 6, 4, 5, '#b0a088');   // body
      rect(ctx, 5, 11, 6, 1, '#8e8070');  // base
      rect(ctx, 7, 7, 2, 3, frame === 0 ? '#ffe480' : '#ffaa00'); // candle glow
    }
  } else if (ty === 1) {
    // Middle: bonsai tree
    if (tx === 0) {
      rect(ctx, 6, 9, 3, 6, '#6b4226');   // trunk
      rect(ctx, 2, 2, 11, 8, '#2d8a40');  // canopy
      rect(ctx, 4, 1, 7, 2, '#39ab52');
      rect(ctx, 5, 0, 5, 1, '#39ab52');
      rect(ctx, 3, 4, 3, 2, '#3db054');   // highlight
    } else {
      // Smooth pebble path
      for (let i = 0; i < 5; i++) {
        const px2 = 2 + i * 2 + (i % 2) * 2;
        const py2 = 6 + (i % 3) * 3;
        rect(ctx, px2, py2, 3, 2, '#a09888');
        px(ctx, px2 + 1, py2, '#c0b8a8');
      }
    }
  } else {
    // Bottom: more pebbles / water feature
    if (tx === 0) {
      rect(ctx, 2, 2, T - 4, 8, '#1f6ea8');  // small pond
      rect(ctx, 2, 2, T - 4, 1, '#4ba9e0');
      // Lily pad
      rect(ctx, 5, frame === 0 ? 4 : 5, 4, 2, '#27ae60');
      px(ctx, 7, frame === 0 ? 3 : 4, '#e74c3c');  // flower
    } else {
      // stepping stones
      rect(ctx, 3, 2, 4, 3, '#8e8070');
      rect(ctx, 8, 6, 4, 3, '#7e7060');
      rect(ctx, 2, 11, 5, 3, '#9e9080');
    }
    rect(ctx, 0, T - 2, T, 2, '#aa9870');
  }
  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** Balloon Swing – id 14, 2x2 */
function drawBalloonSwing(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  rect(ctx, 0, 0, T, T, '#f7dcc8');

  if (ty === 0) {
    rect(ctx, 0, 0, T, 3, '#ff6b6b');
    rect(ctx, 0, 3, T, 1, '#ffd1d1');
    if (tx === 0) {
      const by = frame === 0 ? 4 : 5;
      rect(ctx, 4, by, 5, 5, '#ff8787');
      px(ctx, 6, by + 1, '#fff');
      rect(ctx, 6, by + 5, 1, 5, '#996633');
    } else {
      const by = frame === 0 ? 5 : 4;
      rect(ctx, 7, by, 5, 5, '#ffa94d');
      px(ctx, 9, by + 1, '#fff');
      rect(ctx, 9, by + 5, 1, 5, '#996633');
    }
  } else {
    rect(ctx, 0, 10, T, 6, '#8d6e63');
    rect(ctx, 0, 9, T, 1, '#b08968');
    if (tx === 0) {
      const cx = frame === 0 ? 3 : 5;
      rect(ctx, cx, 2, 6, 4, '#4dabf7');
      rect(ctx, cx + 1, 3, 4, 1, '#d0ebff');
    } else {
      const cx = frame === 0 ? 6 : 4;
      rect(ctx, cx, 3, 6, 4, '#69db7c');
      rect(ctx, cx + 1, 4, 4, 1, '#d3f9d8');
    }
  }

  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** River Cruise – id 15, 3x2 */
function drawRiverCruise(ctx: OffscreenCanvasRenderingContext2D, tx: number, ty: number, frame: number): void {
  if (ty === 0) {
    rect(ctx, 0, 0, T, T, '#8ecae6');
    rect(ctx, 0, 0, T, 1, '#bde9ff');
    for (let y = 3; y < T; y += 4) {
      const off = (frame + tx + y) % 3;
      rect(ctx, off, y, 4, 1, '#d8f3ff');
      rect(ctx, 8 + off, y, 3, 1, '#d8f3ff');
    }

    if (tx === 1) {
      const boatX = frame === 0 ? 3 : 6;
      rect(ctx, boatX, 7, 8, 3, '#8d5524');
      rect(ctx, boatX + 1, 6, 6, 1, '#a97142');
      rect(ctx, boatX + 3, 3, 1, 3, '#5c4033');
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(boatX + 4, 3);
      ctx.lineTo(boatX + 7, 5);
      ctx.lineTo(boatX + 4, 5);
      ctx.closePath();
      ctx.fill();
    }
  } else {
    rect(ctx, 0, 0, T, T, '#7fb069');
    rect(ctx, 0, 12, T, 4, '#a68a64');
    if (tx === 0) {
      rect(ctx, 10, 2, 4, 8, '#2d6a4f');
      rect(ctx, 9, 1, 6, 2, '#40916c');
    } else if (tx === 2) {
      rect(ctx, 2, 3, 5, 7, '#2d6a4f');
      rect(ctx, 1, 2, 7, 2, '#40916c');
    } else {
      const waveY = frame === 0 ? 7 : 8;
      rect(ctx, 1, waveY, T - 2, 2, '#5dade2');
      rect(ctx, 2, waveY, T - 4, 1, '#d8f3ff');
    }
  }

  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/** Park Train – id 16, 1x1 */
function drawParkTrain(ctx: OffscreenCanvasRenderingContext2D): void {
  // Station platform base
  rect(ctx, 0, 10, T, 6, '#a98f6a');
  rect(ctx, 0, 9, T, 1, '#c4aa84');

  // Rails
  rect(ctx, 2, 11, 12, 1, '#6b6b6b');
  rect(ctx, 2, 14, 12, 1, '#6b6b6b');
  for (let x = 2; x <= 12; x += 3) {
    rect(ctx, x, 11, 1, 4, '#6b4226');
  }

  // Locomotive body
  rect(ctx, 3, 5, 8, 5, '#2f7d32');
  rect(ctx, 3, 4, 8, 1, '#4da552');
  rect(ctx, 11, 5, 2, 5, '#246028');

  // Cabin / window
  rect(ctx, 5, 6, 3, 2, '#d9f3ff');
  rect(ctx, 8, 6, 1, 2, '#1f4f73');

  // Front and chimney
  rect(ctx, 2, 6, 1, 3, '#2f7d32');
  rect(ctx, 6, 2, 1, 3, '#444');
  rect(ctx, 6, 2, 1, 1, '#777');

  // Wheels
  rect(ctx, 4, 9, 2, 1, '#303030');
  rect(ctx, 8, 9, 2, 1, '#303030');

  rect(ctx, 0, 0, T, 1, '#0003');
  rect(ctx, 0, 0, 1, T, '#0003');
}

/* ══════════════════════════════
   FOOD / DRINK / TOILET STALLS
   Each is a 1×1 tile with a
   detailed static pixel-art look.
   ══════════════════════════════ */

/** Burger Stand – id 8 */
function drawBurgerStand(ctx: OffscreenCanvasRenderingContext2D): void {
  // Ground shadow to anchor the 3D volume.
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Main kiosk body: front and side walls with distinct shading.
  rect(ctx, 2, 7, 10, 7, '#d7681f');
  rect(ctx, 12, 7, 2, 7, '#a94b14');

  // Counter slab and a recessed serving window.
  rect(ctx, 2, 7, 10, 2, '#ef8b39');
  rect(ctx, 4, 9, 6, 3, '#5c2a14');
  rect(ctx, 5, 10, 4, 1, '#7d3b1d');

  // Roof deck with perspective: top, south lip, and east lip.
  rect(ctx, 1, 3, 12, 4, '#f7ab40');
  rect(ctx, 1, 7, 12, 1, '#dc7f25');
  rect(ctx, 13, 3, 2, 5, '#bc651a');

  // Awning stripes and highlight band to reinforce top-down depth.
  for (let i = 1; i < 13; i += 4) {
    rect(ctx, i, 3, 2, 3, '#ffd97e');
  }
  rect(ctx, 1, 3, 12, 1, '#ffe8b6');

  // Roof sign block and simplified burger emblem.
  rect(ctx, 5, 4, 5, 2, '#7a2e0e');
  rect(ctx, 6, 4, 3, 1, '#f6c65f');
  rect(ctx, 5, 5, 5, 1, '#4b2a1a');
  rect(ctx, 6, 6, 3, 1, '#f6c65f');

  // Small details: register light and menu board.
  px(ctx, 10, 9, '#fefefe');
  rect(ctx, 3, 11, 1, 2, '#2e7d32');

  // Outline accents consistent with nearby stall sprites.
  rect(ctx, 1, 3, 14, 1, '#00000030');
  rect(ctx, 1, 3, 1, 11, '#00000025');
}

/** Pizza Cart – id 9 */
function drawPizzaCart(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Cart volume with side shading.
  rect(ctx, 2, 7, 10, 6, '#d7482f');
  rect(ctx, 12, 7, 2, 6, '#a62b1e');
  rect(ctx, 2, 6, 10, 2, '#ef6c4e');

  // Oven top and warm counter lip.
  rect(ctx, 3, 3, 10, 3, '#9f2119');
  rect(ctx, 3, 6, 10, 1, '#d63f2f');
  rect(ctx, 13, 3, 1, 4, '#7d1814');

  // Pizza display area.
  rect(ctx, 4, 8, 7, 3, '#f3b255');
  px(ctx, 5, 9, '#cc3c2e');
  px(ctx, 8, 8, '#cc3c2e');
  px(ctx, 9, 10, '#cc3c2e');
  px(ctx, 7, 10, '#3c8f3e');

  // Canopy poles and handle.
  rect(ctx, 4, 4, 1, 3, '#7a5b44');
  rect(ctx, 10, 4, 1, 3, '#7a5b44');
  rect(ctx, 6, 2, 3, 1, '#9a9a9a');

  // Wheels for top-down cart read.
  rect(ctx, 2, 12, 2, 2, '#4a4a4a');
  rect(ctx, 10, 12, 2, 2, '#4a4a4a');
  px(ctx, 3, 13, '#9f9f9f');
  px(ctx, 11, 13, '#9f9f9f');
}

/** Lemonade Stand – id 10 */
function drawLemonadeStand(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Stall base.
  rect(ctx, 2, 8, 10, 5, '#39a7cc');
  rect(ctx, 12, 8, 2, 5, '#2c7fa0');
  rect(ctx, 2, 7, 10, 2, '#63c2e2');

  // Upper canopy with perspective.
  rect(ctx, 1, 3, 12, 4, '#ffe15a');
  rect(ctx, 1, 7, 12, 1, '#d2ad35');
  rect(ctx, 13, 3, 2, 5, '#aa8a2b');
  rect(ctx, 1, 3, 12, 1, '#fff0a4');
  for (let i = 1; i < 13; i += 3) {
    rect(ctx, i, 4, 1, 2, '#fff7c8');
  }

  // Lemon sign and cup.
  rect(ctx, 5, 4, 4, 2, '#ffffff');
  rect(ctx, 6, 4, 2, 1, '#f0d23e');
  rect(ctx, 5, 9, 4, 2, '#ffe37a');
  px(ctx, 6, 10, '#ffffff');
  rect(ctx, 10, 8, 2, 4, '#fff9c9');
  rect(ctx, 10, 8, 2, 1, '#e8d44a');

  // Support posts.
  rect(ctx, 2, 6, 1, 2, '#8d6f23');
  rect(ctx, 11, 6, 1, 2, '#8d6f23');
}

/** Ice Cream Cart – id 11 */
function drawIceCreamCart(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Freezer cart body.
  rect(ctx, 2, 7, 10, 6, '#e6edf2');
  rect(ctx, 12, 7, 2, 6, '#bcc8d1');
  rect(ctx, 2, 6, 10, 2, '#f5f9fc');
  rect(ctx, 4, 8, 6, 3, '#cdd9e1');

  // Scoops on display.
  rect(ctx, 4, 8, 1, 1, '#ff98b1');
  rect(ctx, 6, 8, 1, 1, '#a6dca9');
  rect(ctx, 8, 8, 1, 1, '#f8e3b8');

  // Umbrella canopy and pole.
  rect(ctx, 3, 2, 8, 3, '#7bbcf1');
  rect(ctx, 3, 5, 8, 1, '#4f96cd');
  rect(ctx, 4, 2, 1, 2, '#dff1ff');
  rect(ctx, 7, 2, 1, 2, '#dff1ff');
  rect(ctx, 6, 4, 1, 3, '#8f6b4f');

  // Wheels.
  rect(ctx, 2, 12, 2, 2, '#5a5a5a');
  rect(ctx, 10, 12, 2, 2, '#5a5a5a');
  px(ctx, 3, 13, '#a9a9a9');
  px(ctx, 11, 13, '#a9a9a9');
}

/** Restroom – id 12 */
function drawRestroom(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Concrete building volume.
  rect(ctx, 2, 5, 10, 8, '#b2bac1');
  rect(ctx, 12, 5, 2, 8, '#87939c');
  rect(ctx, 1, 2, 12, 3, '#939fa9');
  rect(ctx, 1, 5, 12, 1, '#74828d');

  // Entry and sign.
  rect(ctx, 5, 8, 4, 5, '#6f7a82');
  rect(ctx, 6, 9, 2, 3, '#4f5b62');
  rect(ctx, 5, 3, 4, 2, '#4d8cb4');
  rect(ctx, 6, 3, 2, 1, '#ffffff');
  rect(ctx, 6, 4, 2, 1, '#ffffff');

  // Side utility vents.
  rect(ctx, 3, 8, 1, 2, '#7d8991');
  rect(ctx, 10, 8, 1, 2, '#7d8991');
}

/** Porta-Potty – id 13 */
function drawPortaPotty(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Booth shell.
  rect(ctx, 3, 5, 8, 8, '#7ca0a0');
  rect(ctx, 11, 5, 2, 8, '#607f7f');
  rect(ctx, 2, 2, 10, 3, '#6e9090');
  rect(ctx, 2, 5, 10, 1, '#556f6f');

  // Door and lock.
  rect(ctx, 5, 7, 4, 6, '#5f8080');
  rect(ctx, 6, 8, 2, 4, '#496565');
  rect(ctx, 8, 9, 1, 1, '#e7c34f');

  // Roof vents.
  rect(ctx, 4, 3, 1, 1, '#425c5c');
  rect(ctx, 7, 3, 1, 1, '#425c5c');
  rect(ctx, 10, 3, 1, 1, '#425c5c');
}

/** Balloon Stand – id 17 */
function drawBalloonStand(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Booth structure.
  rect(ctx, 2, 7, 10, 6, '#ff5b88');
  rect(ctx, 12, 7, 2, 6, '#c93f66');
  rect(ctx, 2, 6, 10, 2, '#ff92b1');

  // Canopy.
  rect(ctx, 1, 2, 12, 4, '#ffe1ea');
  rect(ctx, 1, 6, 12, 1, '#ecabc1');
  rect(ctx, 13, 2, 2, 5, '#d792a7');
  for (let i = 1; i < 13; i += 4) {
    rect(ctx, i, 2, 2, 3, '#ffffff');
  }

  // Balloon cluster and strings.
  rect(ctx, 4, 2, 2, 2, '#ff4f72');
  rect(ctx, 7, 1, 2, 2, '#4cc9f0');
  rect(ctx, 9, 2, 2, 2, '#ffd447');
  rect(ctx, 5, 4, 1, 4, '#8a6b58');
  rect(ctx, 8, 3, 1, 5, '#8a6b58');
}

/** Information Stand – id 18 */
function drawInformationStand(ctx: OffscreenCanvasRenderingContext2D): void {
  rect(ctx, 1, 13, 14, 2, '#00000033');

  // Kiosk body.
  rect(ctx, 2, 7, 10, 6, '#3f8ec8');
  rect(ctx, 12, 7, 2, 6, '#275f8f');
  rect(ctx, 2, 6, 10, 2, '#6fb3df');

  // Roof panel.
  rect(ctx, 1, 2, 12, 4, '#d2e8f7');
  rect(ctx, 1, 6, 12, 1, '#9cc4dc');
  rect(ctx, 13, 2, 2, 5, '#82a8c0');

  // Information symbol and map board.
  rect(ctx, 5, 3, 4, 2, '#2d73a7');
  rect(ctx, 6, 3, 2, 1, '#ffffff');
  rect(ctx, 6, 4, 2, 1, '#ffffff');
  rect(ctx, 5, 8, 4, 4, '#eaf5fd');
  rect(ctx, 6, 9, 2, 2, '#2f7cb5');

  // Brochure racks.
  rect(ctx, 3, 9, 1, 3, '#1f6ea8');
  rect(ctx, 10, 9, 1, 3, '#1f6ea8');
}

/* ── ghost / preview overlay ── */
function drawGhostTile(ctx: OffscreenCanvasRenderingContext2D, color: string): void {
  ctx.globalAlpha = 0.5;
  rect(ctx, 0, 0, T, T, color);
  ctx.globalAlpha = 0.8;
  // dashed border
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);
  ctx.strokeRect(0.5, 0.5, T - 1, T - 1);
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
}

export function getAttrDrawer(
  id: number,
  tx: number,
  ty: number,
  frame: number,
): ((ctx: OffscreenCanvasRenderingContext2D) => void) | null {
  switch (id) {
    case 0: return (ctx) => drawCarousel(ctx, tx, ty, frame);
    case 1: return (ctx) => drawRollerCoaster(ctx, tx, ty, frame);
    case 2: return (ctx) => drawFerrisWheel(ctx, tx, ty, frame);
    case 3: return (ctx) => drawBumperCars(ctx, tx, ty, frame);
    case 4: return (ctx) => drawHauntedHouse(ctx, tx, ty, frame);
    case 5: return (ctx) => drawTeaCups(ctx, tx, ty, frame);
    case 6: return (ctx) => drawLogFlume(ctx, tx, ty, frame);
    case 7: return (ctx) => drawZenGarden(ctx, tx, ty, frame);
    case 14: return (ctx) => drawBalloonSwing(ctx, tx, ty, frame);
    case 15: return (ctx) => drawRiverCruise(ctx, tx, ty, frame);
    case 16: return frame === 0 ? (ctx) => drawParkTrain(ctx) : null;
    case 8: return frame === 0 ? (ctx) => drawBurgerStand(ctx) : null;
    case 9: return frame === 0 ? (ctx) => drawPizzaCart(ctx) : null;
    case 10: return frame === 0 ? (ctx) => drawLemonadeStand(ctx) : null;
    case 11: return frame === 0 ? (ctx) => drawIceCreamCart(ctx) : null;
    case 12: return frame === 0 ? (ctx) => drawRestroom(ctx) : null;
    case 13: return frame === 0 ? (ctx) => drawPortaPotty(ctx) : null;
    case 17: return frame === 0 ? (ctx) => drawBalloonStand(ctx) : null;
    case 18: return frame === 0 ? (ctx) => drawInformationStand(ctx) : null;
    default: return null;
  }
}

export function isAnimatedAttraction(id: number): boolean {
  return id >= 0 && id <= 7 || id === 14 || id === 15;
}

export { drawGhostTile };

