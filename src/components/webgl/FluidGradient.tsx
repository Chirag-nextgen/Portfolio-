'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

/**
 * Domain-warped flowing noise field, tinted between three colors.
 * Reacts subtly to pointer position. Kept to a single full-screen quad
 * with a cheap fragment shader so it stays well within the perf budget.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

// Hash-based value noise.
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.05;
  vec2 m = (u_mouse - 0.5) * 0.4;

  // Domain warp for a fluid, organic flow.
  vec2 q = vec2(fbm(p + t + m), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 1.8*q + vec2(1.7,9.2) + 0.15*t),
                fbm(p + 1.8*q + vec2(8.3,2.8) - 0.12*t));
  float f = fbm(p + 2.2*r);

  vec3 col = mix(u_c1, u_c2, clamp(f*f*2.2, 0.0, 1.0));
  col = mix(col, u_c3, clamp(length(q), 0.0, 1.0));
  col = mix(col, u_c3, clamp(r.x*0.7, 0.0, 1.0));

  // Gentle vignette to settle the edges.
  float vig = smoothstep(1.15, 0.25, length(uv - 0.5));
  col *= 0.82 + 0.18*vig;

  gl_FragColor = vec4(col, 1.0);
}`;

type FluidGradientProps = {
  className?: string;
  /** Three RGB triplets in 0–1 range. */
  colors?: [number[], number[], number[]];
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export function FluidGradient({
  className,
  colors = [
    [0.04, 0.04, 0.06],
    [0.22, 0.16, 0.62],
    [0.55, 0.46, 1.0],
  ],
}: FluidGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u_res = gl.getUniformLocation(program, 'u_res');
    const u_time = gl.getUniformLocation(program, 'u_time');
    const u_mouse = gl.getUniformLocation(program, 'u_mouse');
    gl.uniform3fv(gl.getUniformLocation(program, 'u_c1'), colors[0]);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_c2'), colors[1]);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_c3'), colors[2]);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u_res, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const render = () => {
      const time = (performance.now() - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(u_time, time);
      gl.uniform2f(u_mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [reduced, colors]);

  // Static, tasteful CSS fallback for reduced motion / no-WebGL.
  if (reduced) {
    return (
      <div
        className={cn('h-full w-full', className)}
        style={{
          background:
            'radial-gradient(120% 120% at 70% 20%, rgb(var(--accent) / 0.35), transparent 55%), radial-gradient(90% 90% at 20% 80%, rgb(var(--accent) / 0.18), rgb(var(--paper)) 70%)',
        }}
      />
    );
  }

  return <canvas ref={canvasRef} className={cn('block h-full w-full', className)} />;
}
