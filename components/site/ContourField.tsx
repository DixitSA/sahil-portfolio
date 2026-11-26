"use client";

import { useEffect, useRef } from "react";
import { descend, toPath, wellsAt, START, DOTS_EVERY, type Pt, type Well } from "@/lib/loss";

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAG = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 r;uniform vec2 O;uniform float U;uniform vec4 w[6];uniform vec4 b;uniform vec3 col;uniform vec2 al;uniform float nz;
float f(vec2 p){float v=.32*dot(p,p);
for(int i=0;i<6;i++){vec2 d=p-w[i].xy;v+=w[i].z*exp(-dot(d,d)/(2.*w[i].w*w[i].w));}
vec2 d=p-b.xy;v+=b.z*exp(-dot(d,d)/(2.*b.w*b.w));
return v+.03*sin(3.1*p.x+1.7*p.y)*cos(2.3*p.y-1.1*p.x)+nz*.09*sin(11.*p.x+2.)*sin(13.*p.y-1.);}
void main(){vec2 p=(vec2(gl_FragCoord.x,r.y-gl_FragCoord.y)-O)/U;
float c=f(p)*14.;float g=abs(fract(c-.5)-.5);float fw=fwidth(c);
float line=1.-smoothstep(.5*fw,1.5*fw,g);float major=step(mod(floor(c+.5),5.),.5);
float a=line*mix(al.x,al.y,major);gl_FragColor=vec4(col*a,a);}`;

const TONES = {
  paper: { col: [0.086, 0.082, 0.075], al: [0.13, 0.3] },
  field: { col: [0.957, 0.953, 0.937], al: [0.08, 0.2] },
} as const;

/** Loss-surface contours plus the live descent. Host: the nearest [data-cf-host] (data-cf-intro="load" | "view").
 *  The noise term nz is visual only: it calibrates out while the first descent draws; the path is solved on the settled surface.
 *  html[data-motion="off"] (nav switch; the default under OS reduced motion) renders one settled frame and stops. */
export default function ContourField({ tone, className = "" }: { tone: keyof typeof TONES; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.closest<HTMLElement>("[data-cf-host]");
    if (!canvas || !host) return;
    const svg = host.querySelector<SVGSVGElement>("[data-cf-path]");
    const pathEl = svg?.querySelector("path") ?? null;
    const dots = svg ? Array.from(svg.querySelectorAll<SVGCircleElement>("[data-dot]")) : [];
    const ring = svg?.querySelector<SVGCircleElement>("[data-ring]") ?? null;
    const still = () => document.documentElement.dataset.motion === "off";
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    host.classList.add("cf-armed");

    // WebGL is optional: without it the path still runs on the plain ground.
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "low-power" });
    let ok = false;
    const U: Record<string, WebGLUniformLocation | null> = {};
    if (gl && gl.getExtension("OES_standard_derivatives")) {
      const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
      const pr = gl.createProgram()!;
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr);
      if (gl.getProgramParameter(pr, gl.LINK_STATUS)) {
        ok = true; gl.useProgram(pr);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        for (const n of ["r", "O", "U", "b", "col", "al", "nz", "w[0]", "w[1]", "w[2]", "w[3]", "w[4]", "w[5]"]) U[n] = gl.getUniformLocation(pr, n);
        const tc = TONES[tone];
        gl.uniform3f(U.col, tc.col[0], tc.col[1], tc.col[2]); gl.uniform2f(U.al, tc.al[0], tc.al[1]);
      }
    }

    const geo = { ox: 0, oy: 0, u: 1 };
    const scale = Math.min(devicePixelRatio, 2) * 0.75;
    let t = 0, last = performance.now(), driftUntil = 0, live = false, dirty = true, visible = true;
    let start: Pt = START;
    let nz = still() ? 0 : 1, nzStart = 0, nzMs = 1400;
    const bump = { x: 9, y: 9, tx: 9, ty: 9, a: 0, ta: 0 };
    const timers: number[] = [];

    const measure = () => {
      const cr = canvas.getBoundingClientRect();
      if (svg) {
        const sr = svg.getBoundingClientRect();
        geo.u = sr.width / 2 || 1; geo.ox = sr.left - cr.left + geo.u; geo.oy = sr.top - cr.top + geo.u;
        dots.forEach((d) => d.setAttribute("r", String(2.5 / geo.u)));
        ring?.setAttribute("r", String(9 / geo.u));
      }
      if (ok && gl) {
        canvas.width = Math.max(1, Math.floor(cr.width * scale)); canvas.height = Math.max(1, Math.floor(cr.height * scale));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(U.r, canvas.width, canvas.height); gl.uniform2f(U.O, geo.ox * scale, geo.oy * scale); gl.uniform1f(U.U, geo.u * scale);
      }
      dirty = true;
    };
    const hill = (): Well | null => (bump.a > 0.01 ? [bump.x, bump.y, bump.a, 0.12] : null);
    const solve = () => descend(start, wellsAt(t), hill());
    const setPath = (pts: Pt[]) => {
      pathEl?.setAttribute("d", toPath(pts));
      dots.forEach((el, i) => {
        const p = pts[(i + 1) * DOTS_EVERY];
        if (p) { el.setAttribute("cx", String(p[0])); el.setAttribute("cy", String(p[1])); el.style.display = ""; } else el.style.display = "none";
      });
      const e = pts[pts.length - 1];
      ring?.setAttribute("cx", String(e[0])); ring?.setAttribute("cy", String(e[1]));
    };
    const render = () => {
      if (!ok || !gl) return;
      wellsAt(t).forEach((w, i) => gl.uniform4f(U[`w[${i}]`], ...w));
      gl.uniform4f(U.b, ...(hill() ?? [9, 9, 0, 0.12]));
      gl.uniform1f(U.nz, nz);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
    };
    const play = (ms: number) => {
      live = false;
      host.classList.remove("cf-live", "cf-drawing", "cf-ring-on");
      host.style.setProperty("--cf-draw", `${ms}ms`);
      dots.forEach((el, i) => (el.style.transitionDelay = `${Math.round(((i + 1) / (dots.length + 1)) * ms)}ms`));
      setPath(solve());
      if (nz > 0 && !nzStart) { nzStart = performance.now(); nzMs = ms; }
      void host.offsetWidth; // restart the transition
      host.classList.add("cf-drawing");
      timers.push(window.setTimeout(() => {
        host.setAttribute("data-landed", "");
        host.classList.add("cf-ring-on", "cf-live");
        live = true; driftUntil = performance.now() + 5000; dirty = true;
      }, ms));
    };

    measure();
    const ro = new ResizeObserver(measure); ro.observe(host);

    const toField = (e: PointerEvent | MouseEvent): Pt => {
      const r = canvas.getBoundingClientRect();
      return [(e.clientX - r.left - geo.ox) / geo.u, (e.clientY - r.top - geo.oy) / geo.u];
    };
    const onMove = (e: PointerEvent) => { if (!live || still()) return; [bump.tx, bump.ty] = toField(e); bump.ta = 0.4; };
    const onLeave = () => { bump.ta = 0; };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a,button,input,label,select,textarea") || getSelection()?.toString()) return;
      const [x, y] = toField(e);
      if (x < -1.1 || x > 0.9 || y < -0.9 || y > 0.7) return;
      start = [x, y];
      if (still()) { setPath(solve()); return; }
      play(900);
    };
    if (fine) { host.addEventListener("pointermove", onMove, { passive: true }); host.addEventListener("pointerleave", onLeave); }
    host.addEventListener("click", onClick);

    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && host.dataset.cfIntro === "view" && !still() && !host.hasAttribute("data-landed") && en.intersectionRatio >= 0.35 && !host.classList.contains("cf-drawing")) {
        timers.push(window.setTimeout(() => play(1400), 150));
      }
    }, { threshold: [0, 0.35] });
    io.observe(host);

    const settle = () => {
      // one settled, static frame: at mount when motion is off, and whenever the switch turns it off
      nz = 0; bump.a = bump.ta = 0; driftUntil = 0; live = true;
      host.setAttribute("data-landed", ""); host.classList.add("cf-live", "cf-ring-on");
      render(); setPath(solve());
    };
    const onMotion = () => { if (still()) settle(); else dirty = true; };
    window.addEventListener("motionchange", onMotion);

    if (still()) settle();
    else if (host.dataset.cfIntro !== "view") timers.push(window.setTimeout(() => play(1400), 700));

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!visible || document.hidden || still()) return;
      if (nzStart && nz > 0) { const x = Math.min(1, (now - nzStart) / nzMs); nz = (1 - x) ** 3; dirty = true; }
      if (live && now < driftUntil) { t += dt; dirty = true; }
      const k = 0.08;
      if (Math.abs(bump.ta - bump.a) > 0.002 || Math.abs(bump.tx - bump.x) + Math.abs(bump.ty - bump.y) > 0.002) {
        bump.a += (bump.ta - bump.a) * k;
        if (bump.x === 9) { bump.x = bump.tx; bump.y = bump.ty; } else { bump.x += (bump.tx - bump.x) * k; bump.y += (bump.ty - bump.y) * k; }
        dirty = true;
      }
      if (!dirty) return;
      dirty = false;
      render();
      if (live) setPath(solve());
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); timers.forEach(clearTimeout); ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); host.removeEventListener("click", onClick);
      window.removeEventListener("motionchange", onMotion);
      host.classList.remove("cf-armed");
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [tone]);

  return <canvas ref={ref} aria-hidden className={`cf-canvas ${className}`} />;
}
