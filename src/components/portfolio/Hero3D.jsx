import React, { useEffect, useRef } from 'react';

// All chips: anchorX/anchorY = desired center (0–1 of canvas)
// Safe-margin clamping ensures they NEVER clip any edge.
const CHIPS = [
  { text: 'const ai = new Model()', anchorX: 0.50, anchorY: 0.08, color: '#00F5FF', phase: 0.0, bobAmp: 6 },
  { text: 'import torch',           anchorX: 0.82, anchorY: 0.25, color: '#9D4EDD', phase: 1.3, bobAmp: 8 },
  { text: 'SELECT * FROM data',     anchorX: 0.80, anchorY: 0.72, color: '#22c55e', phase: 2.1, bobAmp: 7 },
  { text: 'def train():',           anchorX: 0.20, anchorY: 0.75, color: '#f97316', phase: 3.0, bobAmp: 6 },
  { text: 'git commit -m "fix"',    anchorX: 0.18, anchorY: 0.28, color: '#eab308', phase: 0.7, bobAmp: 9 },
  { text: '<Component />',          anchorX: 0.50, anchorY: 0.92, color: '#06b6d4', phase: 1.8, bobAmp: 5 },
];

const GEMS = [
  { normX: 0.10, normY: 0.50, color: '#00F5FF', size: 12, speed: 1.1 },
  { normX: 0.90, normY: 0.42, color: '#9D4EDD', size: 10, speed: 0.85 },
  { normX: 0.50, normY: 0.05, color: '#00F5FF', size:  8, speed: 1.45 },
];

const CHIP_FONT   = '500 12px "JetBrains Mono", monospace';
const CHIP_H      = 30;
const CHIP_PAD    = 13;
const SAFE        = 10; // min px from any canvas edge

export default function Hero3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: 0, y: 0 };

    // ── resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width  - 0.5;
      mouse.y = (e.clientY - rect.top)  / rect.height - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // ── particles ───────────────────────────────────────────────────────────
    const particles = Array.from({ length: 65 }, () => ({
      nx:      Math.random(),
      ny:      Math.random(),
      r:       0.6 + Math.random() * 1.4,
      speed:   0.00005 + Math.random() * 0.00009,
      angle:   Math.random() * Math.PI * 2,
      phase:   Math.random() * Math.PI * 2,
      color:   Math.random() > 0.5 ? '#00F5FF' : '#9D4EDD',
      opacity: 0.20 + Math.random() * 0.45,
    }));

    // ── scanline grid ────────────────────────────────────────────────────────
    const drawGrid = () => {
      const w = W(), h = H();
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth   = 0.5;
      const step = 48;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();
    };

    // ── radial ambient glow ──────────────────────────────────────────────────
    const drawGlow = () => {
      const w = W(), h = H();
      const cx = w / 2, cy = h / 2;
      const r = Math.min(w, h) * 0.55;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0,   'rgba(0,245,255,0.045)');
      g.addColorStop(0.5, 'rgba(157,78,221,0.025)');
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.save();
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    };

    // ── orbit rings ──────────────────────────────────────────────────────────
    const drawOrbitRings = (t) => {
      const w = W(), h = H();
      const cx = w / 2 + mouse.x * 8;
      const cy = h / 2 + mouse.y * 5;
      const base = Math.min(w, h);
      const rings = [
        { rx: base * 0.34, ry: base * 0.13, spd:  0.16, col: '#00F5FF', dash: [6, 12] },
        { rx: base * 0.43, ry: base * 0.17, spd: -0.10, col: '#9D4EDD', dash: [4, 16] },
        { rx: base * 0.52, ry: base * 0.21, spd:  0.07, col: '#9D4EDD', dash: [2, 20] },
      ];
      for (const ring of rings) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * ring.spd);
        ctx.globalAlpha = 0.11;
        ctx.strokeStyle = ring.col;
        ctx.shadowColor = ring.col;
        ctx.shadowBlur  = 6;
        ctx.lineWidth   = 1;
        ctx.setLineDash(ring.dash);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    };

    // ── laptop ────────────────────────────────────────────────────────────────
    const drawLaptop = (t) => {
      const w = W(), h = H();
      const cx = w / 2 + mouse.x * 12;
      const cy = h / 2 + mouse.y * 7 + Math.sin(t * 0.4) * 3;
      const lw = Math.min(w, h) * 0.48;
      const lh = lw * 0.62;

      ctx.save();

      // screen bezel
      const sx = cx - lw / 2, sy = cy - lh * 0.58;
      const sw = lw, sh = lh * 0.68, r = 8;
      ctx.shadowColor = '#00F5FF';
      ctx.shadowBlur  = 32;
      ctx.beginPath();
      ctx.moveTo(sx + r, sy);
      ctx.lineTo(sx + sw - r, sy);
      ctx.quadraticCurveTo(sx + sw, sy, sx + sw, sy + r);
      ctx.lineTo(sx + sw, sy + sh - r);
      ctx.quadraticCurveTo(sx + sw, sy + sh, sx + sw - r, sy + sh);
      ctx.lineTo(sx + r, sy + sh);
      ctx.quadraticCurveTo(sx, sy + sh, sx, sy + sh - r);
      ctx.lineTo(sx, sy + r);
      ctx.quadraticCurveTo(sx, sy, sx + r, sy);
      ctx.closePath();
      ctx.fillStyle   = '#0a0f1e';
      ctx.strokeStyle = '#1e2d4a';
      ctx.lineWidth   = 1.5;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur  = 0;

      // screen panel
      const px = sx + sw * 0.05, py = sy + sh * 0.06;
      const pw = sw * 0.90,      ph = sh * 0.88;
      ctx.fillStyle = '#040910';
      ctx.fillRect(px, py, pw, ph);
      const grad = ctx.createLinearGradient(px, py, px + pw, py + ph);
      grad.addColorStop(0, 'rgba(0,245,255,0.07)');
      grad.addColorStop(1, 'rgba(157,78,221,0.05)');
      ctx.fillStyle = grad;
      ctx.fillRect(px, py, pw, ph);

      // code lines with animated typing reveal
      const lineData = [
        { w: 0.58, ind: 0.00, col: '#00F5FF' },
        { w: 0.36, ind: 0.06, col: '#9D4EDD' },
        { w: 0.46, ind: 0.06, col: '#00F5FF' },
        { w: 0.30, ind: 0.12, col: '#22c55e' },
        { w: 0.40, ind: 0.06, col: '#9D4EDD' },
        { w: 0.24, ind: 0.12, col: '#eab308' },
      ];
      for (let i = 0; i < lineData.length; i++) {
        const ld  = lineData[i];
        const lx  = px + pw * 0.05 + pw * ld.ind;
        const ly  = py + ph * 0.10 + i * ph * 0.14;
        const lw2 = pw * ld.w * (0.7 + 0.3 * Math.sin(t * 0.3 + i));
        ctx.globalAlpha = 0.75;
        ctx.fillStyle   = ld.col;
        ctx.shadowColor = ld.col;
        ctx.shadowBlur  = 5;
        ctx.fillRect(lx, ly, lw2, 3);
      }

      // blinking cursor
      if (Math.floor(t * 2) % 2 === 0) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle   = '#00F5FF';
        ctx.shadowColor = '#00F5FF';
        ctx.shadowBlur  = 10;
        ctx.fillRect(px + pw * 0.11, py + ph * 0.10 + 5 * ph * 0.14 + 5, 7, 13);
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;

      // hinge
      ctx.fillStyle = '#181f30';
      ctx.fillRect(cx - lw * 0.48, sy + sh - 2, lw * 0.96, 4);

      // base
      const bx = cx - lw * 0.5, by = sy + sh + 2;
      const bw = lw, bh = lh * 0.28;
      ctx.beginPath();
      ctx.moveTo(bx,             by);
      ctx.lineTo(bx + bw,        by);
      ctx.lineTo(bx + bw * 0.95, by + bh);
      ctx.lineTo(bx + bw * 0.05, by + bh);
      ctx.closePath();
      ctx.fillStyle   = '#0c1120';
      ctx.strokeStyle = '#1e2d4a';
      ctx.lineWidth   = 1;
      ctx.fill();
      ctx.stroke();

      // keys
      ctx.fillStyle = '#121826';
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
          ctx.fillRect(
            bx + bw * 0.05 + col * bw * 0.092,
            by + bh * 0.10 + row * bh * 0.28,
            bw * 0.075, bh * 0.18
          );
        }
      }

      ctx.restore();
    };

    // ── chip — fully clamped, text never clipped ──────────────────────────────
    const drawChip = (chip, t) => {
      const w = W(), h = H();

      ctx.font = CHIP_FONT;
      const tw  = ctx.measureText(chip.text).width;
      const cw  = tw + CHIP_PAD * 2;

      // floating position before clamping
      const rawCX = chip.anchorX * w;
      const rawCY = chip.anchorY * h + Math.sin(t * 0.65 + chip.phase) * chip.bobAmp;

      // clamp: chip box [cx - cw/2 .. cx + cw/2] must stay in [SAFE .. W-SAFE]
      const minCX = SAFE + cw / 2;
      const maxCX = w - SAFE - cw / 2;
      const minCY = SAFE + CHIP_H / 2;
      const maxCY = h - SAFE - CHIP_H / 2;

      const cx = Math.min(Math.max(rawCX, minCX), maxCX);
      const cy = Math.min(Math.max(rawCY, minCY), maxCY);

      const left = cx - cw / 2;
      const top  = cy - CHIP_H / 2;

      ctx.save();

      // backdrop blur simulation — darker rect behind
      ctx.globalAlpha = 0.30;
      ctx.fillStyle   = '#05080f';
      ctx.beginPath();
      ctx.roundRect(left - 1, top - 1, cw + 2, CHIP_H + 2, 7);
      ctx.fill();

      // colored fill
      ctx.globalAlpha = 0.14;
      ctx.fillStyle   = chip.color;
      ctx.shadowColor = chip.color;
      ctx.shadowBlur  = 18;
      ctx.beginPath();
      ctx.roundRect(left, top, cw, CHIP_H, 6);
      ctx.fill();

      // border
      ctx.globalAlpha = 0.60;
      ctx.strokeStyle = chip.color;
      ctx.lineWidth   = 1;
      ctx.shadowBlur  = 12;
      ctx.stroke();

      // dot indicator
      ctx.globalAlpha = 0.90;
      ctx.fillStyle   = chip.color;
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      ctx.arc(left + 8, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // text — drawn from left + PAD (never clipped)
      ctx.globalAlpha = 0.92;
      ctx.fillStyle   = chip.color;
      ctx.shadowBlur  = 4;
      ctx.font        = CHIP_FONT;
      ctx.fillText(chip.text, left + CHIP_PAD + 6, cy + 4);

      ctx.restore();
    };

    // ── gems ──────────────────────────────────────────────────────────────────
    const drawGems = (t) => {
      const w = W(), h = H();
      for (const gem of GEMS) {
        const gx  = gem.normX * w;
        const gy  = gem.normY * h + Math.sin(t * gem.speed + gem.normX * 9) * 8;
        const rot = t * gem.speed;
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(rot);

        // outer glow
        ctx.globalAlpha = 0.75;
        ctx.fillStyle   = gem.color;
        ctx.shadowColor = gem.color;
        ctx.shadowBlur  = 20;
        ctx.beginPath();
        ctx.moveTo(0, -gem.size);
        ctx.lineTo(gem.size * 0.58,  0);
        ctx.lineTo(0,                gem.size);
        ctx.lineTo(-gem.size * 0.58, 0);
        ctx.closePath();
        ctx.fill();

        // inner highlight
        ctx.globalAlpha = 0.30;
        ctx.fillStyle   = '#ffffff';
        ctx.shadowBlur  = 0;
        ctx.beginPath();
        ctx.moveTo(0, -gem.size * 0.48);
        ctx.lineTo(gem.size * 0.28,  0);
        ctx.lineTo(0,                gem.size * 0.48);
        ctx.lineTo(-gem.size * 0.28, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    // ── main loop ─────────────────────────────────────────────────────────────
    let t = 0;
    const draw = () => {
      t += 0.016;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      drawGrid();
      drawGlow();

      // particles
      for (const p of particles) {
        p.angle += p.speed * 60;
        const px2 = (p.nx + Math.cos(p.angle) * 0.016 + 1) % 1;
        const py2 = (p.ny + Math.sin(p.angle) * 0.012 + 1) % 1;
        ctx.save();
        ctx.globalAlpha = p.opacity * (0.60 + 0.40 * Math.sin(t + p.phase));
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 5;
        ctx.beginPath();
        ctx.arc(px2 * w, py2 * h, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      drawOrbitRings(t);
      drawLaptop(t);

      for (const chip of CHIPS) drawChip(chip, t);
      drawGems(t);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-[480px] lg:h-[560px] relative">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
}