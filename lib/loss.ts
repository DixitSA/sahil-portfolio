/** Loss surface and gradient descent, in field units (y down). FRAG in ContourField mirrors f(). */
export type Pt = [number, number];
export type Well = [number, number, number, number]; // cx, cy, amplitude, sigma
export const BOWL = 0.32; // keep equal to the literal .32 in FRAG
export const WELLS: Well[] = [
  [0.0, 0.0, -0.95, 0.22], // global minimum
  [-0.62, 0.42, -0.4, 0.15], // decoy basin
  [0.6, -0.5, -0.3, 0.17], // decoy basin
  [-0.42, -0.12, 0.5, 0.16], // ridge the path routes around
  [0.32, 0.38, 0.38, 0.2], // hill
  [0.05, -0.62, 0.28, 0.2], // hill
];
export const START: Pt = [-0.77, -0.47];
export const DOTS_EVERY = 18;
export const DOT_POOL = 32;

export function wellsAt(t: number): Well[] {
  return WELLS.map(([x, y, a, s], i) => [
    x + (i === 0 ? 0 : 0.035 * Math.sin(t * (0.11 + i * 0.023) + i * 1.7)),
    y + (i === 0 ? 0 : 0.035 * Math.cos(t * (0.09 + i * 0.019) + i * 2.3)),
    a,
    s,
  ]);
}

function grad(px: number, py: number, wells: Well[], bump: Well | null): Pt {
  let gx = 2 * BOWL * px, gy = 2 * BOWL * py;
  for (const [cx, cy, a, s] of bump ? [...wells, bump] : wells) {
    const dx = px - cx, dy = py - cy, s2 = s * s;
    const e = a * Math.exp(-(dx * dx + dy * dy) / (2 * s2));
    gx -= (e * dx) / s2;
    gy -= (e * dy) / s2;
  }
  const A = 3.1 * px + 1.7 * py, B = 2.3 * py - 1.1 * px; // ripple .03*sin(A)*cos(B)
  gx += 0.03 * (3.1 * Math.cos(A) * Math.cos(B) + 1.1 * Math.sin(A) * Math.sin(B));
  gy += 0.03 * (1.7 * Math.cos(A) * Math.cos(B) - 2.3 * Math.sin(A) * Math.sin(B));
  return [gx, gy];
}

/** Momentum gradient descent. Returns every visited point. */
export function descend(start: Pt, wells: Well[], bump: Well | null, steps = 700, lr = 0.0028, mu = 0.9): Pt[] {
  let [x, y] = start, vx = 0, vy = 0;
  const pts: Pt[] = [[x, y]];
  for (let i = 0; i < steps; i++) {
    const [gx, gy] = grad(x, y, wells, bump);
    vx = mu * vx - lr * gx; vy = mu * vy - lr * gy;
    x += vx; y += vy;
    pts.push([x, y]);
    if (Math.hypot(gx, gy) < 0.004 && Math.hypot(vx, vy) < 0.0004) break;
  }
  return pts;
}

export function toPath(pts: Pt[], every = 2): string {
  let d = `M${pts[0][0].toFixed(4)} ${pts[0][1].toFixed(4)}`;
  for (let i = every; i < pts.length; i += every) d += `L${pts[i][0].toFixed(4)} ${pts[i][1].toFixed(4)}`;
  const l = pts[pts.length - 1];
  return `${d}L${l[0].toFixed(4)} ${l[1].toFixed(4)}`;
}
