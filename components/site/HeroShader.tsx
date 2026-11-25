"use client";

import { useEffect, useRef } from "react";

/**
 * A slow, dark field of light behind the hero. Raw WebGL, one full-screen
 * triangle and one fragment shader, so it costs a few KB instead of a 3D
 * library. Pauses when scrolled out of view or the tab is hidden, drops to a
 * single static frame for reduced motion, and leaves the CSS gradient
 * underneath visible if WebGL is unavailable.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 r;
uniform float t;
uniform vec2 m;

float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  mat2 R=mat2(.8,.6,-.6,.8);
  for(int i=0;i<5;i++){v+=a*n(p);p=R*p*2.02;a*=.5;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  float T=t*.045;
  vec2 q=vec2(fbm(p*1.6+T),fbm(p*1.6-T+3.1));
  vec2 w=vec2(fbm(p*2.2+q*1.8+vec2(1.7,9.2)+T*1.3),fbm(p*2.2+q*1.8+vec2(8.3,2.8)-T));
  float f=fbm(p*1.4+w*1.6);

  // Cursor lends a faint lift to the field near it.
  float d=length(p-m);
  f+=.18*exp(-d*d*3.);

  vec3 base=vec3(.031,.031,.039);
  vec3 deep=vec3(.05,.09,.08);
  vec3 sig=vec3(.24,1.,.5);
  vec3 col=mix(base,deep,smoothstep(.25,.85,f));
  col+=sig*pow(smoothstep(.55,1.05,f),3.)*.22;
  col+=vec3(.9,.92,1.)*pow(smoothstep(.7,1.1,w.x*f),4.)*.06;

  // Fade into the canvas at the bottom so the hero hands off seamlessly.
  col=mix(vec3(.031,.031,.039),col,smoothstep(0.,.55,uv.y));
  // Vignette.
  col*=1.-.35*pow(length(uv-.5)*1.25,2.);
  gl_FragColor=vec4(col,1.);
}`;

export default function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uM = gl.getUniformLocation(prog, "m");

    // The field is soft by design, so rendering below device resolution is
    // invisible and roughly quarters the fragment cost.
    const scale = Math.min(window.devicePixelRatio, 2) * 0.5;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * scale));
      canvas.height = Math.max(1, Math.floor(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.4, y: 0.1, tx: 0.4, ty: 0.1 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left - rect.width / 2) / rect.height;
      mouse.ty = -(e.clientY - rect.top - rect.height / 2) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now() - 20000;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reduce) {
      gl.uniform1f(uT, 20);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
    }
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1600ms]"
    />
  );
}
