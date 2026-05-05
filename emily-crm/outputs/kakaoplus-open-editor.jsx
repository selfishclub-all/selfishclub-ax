import React, { useState, useRef, useEffect, useCallback } from 'react';

const CANVAS_W = 1346;
const CANVAS_H = 734;
const DL_SCALE = 2;

const DEFAULTS = {
  badge: '신청 오픈 🔔',
  label: '이기적공유회',
  mainLine1: '코딩 없이',
  mainLine2: '내 서비스 만든다',
  highlight: '내 서비스',
  sub: '클로드코드 앱 하나로 시작하는 실전 가이드',
  cta: '지금 신청하기 ›',
  date: '4/13(월) 저녁 8시 ZOOM',
};

// P4: 다크 & 네온그린
const COLORS = {
  bgTop: '#111111',
  bgBottom: '#1A1A2E',
  accent: '#00E5A0',
  gold: '#FFD84D',
  white: '#FFFFFF',
  whiteDim: 'rgba(255,255,255,0.6)',
  badgeBg: 'rgba(0,229,160,0.12)',
  badgeBorder: 'rgba(0,229,160,0.4)',
  ctaBg: '#00E5A0',
  ctaText: '#111111',
};

export default function KakaoOpenBanner() {
  const canvasRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [t, setT] = useState({ ...DEFAULTS });

  const updateField = (key, val) => setT(prev => ({ ...prev, [key]: val }));

  const draw = useCallback((canvas, scale = 1) => {
    const ctx = canvas.getContext('2d');
    const w = CANVAS_W * scale;
    const h = CANVAS_H * scale;
    canvas.width = w;
    canvas.height = h;
    ctx.scale(scale, scale);

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bg.addColorStop(0, COLORS.bgTop);
    bg.addColorStop(1, COLORS.bgBottom);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Subtle grid pattern
    ctx.strokeStyle = 'rgba(0,229,160,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_W; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_H); ctx.stroke();
    }
    for (let j = 0; j < CANVAS_H; j += 40) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(CANVAS_W, j); ctx.stroke();
    }

    // Glow circle behind text
    const glow = ctx.createRadialGradient(CANVAS_W/2, CANVAS_H/2 - 30, 0, CANVAS_W/2, CANVAS_H/2 - 30, 350);
    glow.addColorStop(0, 'rgba(0,229,160,0.08)');
    glow.addColorStop(1, 'rgba(0,229,160,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.textAlign = 'center';

    // Badge pill
    const badgeW = ctx.measureText(t.badge).width + 40;
    const badgeX = CANVAS_W / 2;
    const badgeY = 135;
    ctx.font = `bold ${18}px "Noto Sans KR", sans-serif`;
    const bw = ctx.measureText(t.badge).width + 48;
    const bh = 38;
    ctx.beginPath();
    ctx.roundRect(badgeX - bw/2, badgeY - bh/2, bw, bh, 19);
    ctx.fillStyle = COLORS.badgeBg;
    ctx.fill();
    ctx.strokeStyle = COLORS.badgeBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = COLORS.accent;
    ctx.fillText(t.badge, badgeX, badgeY + 6);

    // Label
    ctx.font = `500 ${22}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = COLORS.whiteDim;
    ctx.fillText(t.label, CANVAS_W/2, 210);

    // Main line 1
    ctx.font = `900 ${64}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = COLORS.white;
    ctx.fillText(t.mainLine1, CANVAS_W/2, 310);

    // Main line 2 with highlight
    const line2 = t.mainLine2;
    const hl = t.highlight;
    if (hl && line2.includes(hl)) {
      const parts = line2.split(hl);
      const fullW = ctx.measureText(line2).width;
      let startX = CANVAS_W/2 - fullW/2;

      ctx.textAlign = 'left';
      // Part before highlight
      if (parts[0]) {
        ctx.fillStyle = COLORS.white;
        ctx.fillText(parts[0], startX, 390);
        startX += ctx.measureText(parts[0]).width;
      }
      // Highlight
      ctx.fillStyle = COLORS.accent;
      ctx.fillText(hl, startX, 390);
      startX += ctx.measureText(hl).width;
      // Part after highlight
      if (parts[1]) {
        ctx.fillStyle = COLORS.white;
        ctx.fillText(parts[1], startX, 390);
      }
      ctx.textAlign = 'center';
    } else {
      ctx.fillStyle = COLORS.white;
      ctx.fillText(line2, CANVAS_W/2, 390);
    }

    // Sub copy
    ctx.font = `400 ${24}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = COLORS.whiteDim;
    ctx.fillText(t.sub, CANVAS_W/2, 450);

    // Date
    ctx.font = `500 ${20}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText(t.date, CANVAS_W/2, 500);

    // CTA Button
    const ctaW = 280;
    const ctaH = 56;
    const ctaX = CANVAS_W/2 - ctaW/2;
    const ctaY = 570;
    // Shadow
    ctx.shadowColor = 'rgba(0,229,160,0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 4;
    ctx.beginPath();
    ctx.roundRect(ctaX, ctaY, ctaW, ctaH, 28);
    ctx.fillStyle = COLORS.ctaBg;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = `700 ${22}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = COLORS.ctaText;
    ctx.fillText(t.cta, CANVAS_W/2, ctaY + 36);

    // Bottom bar
    ctx.fillStyle = 'rgba(0,229,160,0.06)';
    ctx.fillRect(0, CANVAS_H - 50, CANVAS_W, 50);
    ctx.font = `400 ${14}px "Noto Sans KR", sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillText('SELFISH CLUB — 이기적멤버십', CANVAS_W/2, CANVAS_H - 22);
  }, [t]);

  useEffect(() => {
    if (!canvasRef.current) return;
    document.fonts?.ready?.then(() => draw(canvasRef.current));
  }, [draw]);

  const handleDownload = (format) => {
    const offscreen = document.createElement('canvas');
    draw(offscreen, DL_SCALE);
    const link = document.createElement('a');
    link.download = `kakaoplus-open-banner.${format}`;
    link.href = offscreen.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95);
    link.click();
  };

  const handleReset = () => setT({ ...DEFAULTS });

  return (
    <div style={{ fontFamily: '"Noto Sans KR", sans-serif', maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />

      <h2 style={{ marginBottom: 8 }}>📢 카플친 배너 — 오픈 Phase</h2>
      <p style={{ color: '#666', marginBottom: 16 }}>Layout A (중앙 타이포) · P4 (다크 & 네온그린)</p>

      <canvas
        ref={canvasRef}
        style={{ width: '100%', borderRadius: 8, border: '1px solid #ddd', marginBottom: 16 }}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setEditing(!editing)} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer', background: editing ? '#f0f0f0' : '#fff' }}>
          {editing ? '✏️ 편집 닫기' : '✏️ 편집 열기'}
        </button>
        <button onClick={() => handleDownload('png')} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#00E5A0', color: '#111', fontWeight: 700, cursor: 'pointer' }}>
          📥 PNG 다운로드
        </button>
        <button onClick={() => handleDownload('jpg')} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer' }}>
          📥 JPG 다운로드
        </button>
        <button onClick={handleReset} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer', color: '#999' }}>
          🔄 초기화
        </button>
      </div>

      {editing && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, background: '#f9f9f9', borderRadius: 8 }}>
          {[
            ['뱃지', 'badge'],
            ['라벨', 'label'],
            ['메인 1줄', 'mainLine1'],
            ['메인 2줄', 'mainLine2'],
            ['강조 단어', 'highlight'],
            ['서브카피', 'sub'],
            ['일시', 'date'],
            ['CTA 버튼', 'cta'],
          ].map(([label, key]) => (
            <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>{label}</span>
              <input
                value={t[key]}
                onChange={e => updateField(key, e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
