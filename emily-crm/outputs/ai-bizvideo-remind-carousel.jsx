import React, { useState, useRef, useCallback } from 'react';

const SLIDES = [
  {
    id: 1,
    type: 'cover',
    bg: '#1A1A1A',
    textColor: '#FFFFFF',
  },
  {
    id: 2,
    type: 'problem',
    bg: '#FFF9F0',
    textColor: '#1A1A1A',
  },
  {
    id: 3,
    type: 'solution',
    bg: '#F5F0E8',
    textColor: '#1A1A1A',
  },
  {
    id: 4,
    type: 'workflows',
    bg: '#FFF9F0',
    textColor: '#1A1A1A',
  },
  {
    id: 5,
    type: 'cta',
    bg: '#1A1A1A',
    textColor: '#FFFFFF',
  },
];

const POINT_COLOR = '#2E5CFF';
const YELLOW = '#FFD84D';
const CORAL = '#FF6B5A';

export default function AIBizVideoRemindCarousel() {
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef([]);

  const goTo = (idx) => setCurrent(Math.max(0, Math.min(idx, SLIDES.length - 1)));

  const downloadSlide = useCallback(async (index, format = 'png') => {
    const el = slideRefs.current[index];
    if (!el) return;
    const { default: html2canvas } = await import('https://cdn.skypack.dev/html2canvas');
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
    const link = document.createElement('a');
    link.download = `slide-${index + 1}.${format}`;
    link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 0.95);
    link.click();
  }, []);

  const downloadAll = useCallback(async () => {
    for (let i = 0; i < SLIDES.length; i++) {
      await downloadSlide(i, 'png');
      await new Promise(r => setTimeout(r, 500));
    }
  }, [downloadSlide]);

  const renderSlide = (slide, index) => {
    const ref = (el) => { slideRefs.current[index] = el; };

    switch (slide.type) {
      case 'cover':
        return (
          <div ref={ref} style={{ width: 1080, height: 1080, background: slide.bg, fontFamily: "'Noto Sans KR', sans-serif", position: 'relative', overflow: 'hidden' }}>
            {/* 배경 그라디언트 */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 70% 30%, rgba(46,92,255,0.15) 0%, transparent 60%)' }} />

            {/* 상단 태그 */}
            <div style={{ position: 'absolute', top: 60, left: 60, display: 'flex', gap: 12 }}>
              <span style={{ background: POINT_COLOR, color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 700 }}>이기적 공유회</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 500 }}>REMIND</span>
            </div>

            {/* 메인 카피 */}
            <div style={{ position: 'absolute', top: 220, left: 60, right: 60 }}>
              <p style={{ fontSize: 28, fontWeight: 400, color: '#999', margin: 0, lineHeight: 1.5 }}>
                촬영팀 견적 받아보고
              </p>
              <p style={{ fontSize: 28, fontWeight: 400, color: '#999', margin: '4px 0 30px', lineHeight: 1.5 }}>
                포기한 적 있으시죠?
              </p>
              <h1 style={{ fontSize: 52, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                촬영 0원, 모델 0원으로
              </h1>
              <h1 style={{ fontSize: 52, fontWeight: 900, color: '#fff', margin: '8px 0 0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                브랜드 <span style={{ color: YELLOW }}>납품</span>까지
              </h1>
              <h1 style={{ fontSize: 52, fontWeight: 900, color: '#fff', margin: '8px 0 0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                해낸 사람들
              </h1>
            </div>

            {/* 하단 정보 */}
            <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <span style={{ background: CORAL, color: '#fff', padding: '6px 16px', borderRadius: 16, fontSize: 16, fontWeight: 700 }}>마감 임박</span>
                <span style={{ color: '#999', fontSize: 18 }}>3/16(월) 저녁 8시 ZOOM</span>
              </div>
              <p style={{ color: '#666', fontSize: 16, margin: 0 }}>AI 비즈니스 영상 편 · ₩9,900</p>
            </div>

            {/* 셀피쉬클럽 로고 */}
            <div style={{ position: 'absolute', bottom: 60, right: 60 }}>
              <span style={{ color: '#444', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em' }}>SELFISH CLUB</span>
            </div>
          </div>
        );

      case 'problem':
        return (
          <div ref={ref} style={{ width: 1080, height: 1080, background: slide.bg, fontFamily: "'Noto Sans KR', sans-serif", position: 'relative', padding: 60 }}>
            <span style={{ background: POINT_COLOR, color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 700 }}>AI 영상의 현실</span>

            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#1A1A1A', margin: '40px 0 16px', lineHeight: 1.3 }}>
              솔직히, AI 영상은
            </h2>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 50px', lineHeight: 1.3 }}>
              아직 <span style={{ color: CORAL }}>이런 문제</span>가 있어요
            </h2>

            {[
              { icon: '😩', text: '컷마다 얼굴이 아예 다른 사람' },
              { icon: '💦', text: '제품 형태가 녹아내리는 현상' },
              { icon: '🤦‍♂️', text: '"AI 티" 때문에 클라이언트한테 못 보여줌' },
              { icon: '💸', text: '결국 촬영팀 외주로 돌아가는 현실' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, padding: '20px 24px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
                <span style={{ fontSize: 26, fontWeight: 500, color: '#1A1A1A' }}>{item.text}</span>
              </div>
            ))}

            <p style={{ fontSize: 24, color: '#666', marginTop: 40, lineHeight: 1.6 }}>
              이 벽을 넘어서 실제 납품까지 해낸<br />
              사람들이 있습니다 →
            </p>
          </div>
        );

      case 'solution':
        return (
          <div ref={ref} style={{ width: 1080, height: 1080, background: slide.bg, fontFamily: "'Noto Sans KR', sans-serif", position: 'relative', padding: 60 }}>
            <span style={{ background: POINT_COLOR, color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 700 }}>실제 납품 사례</span>

            <h2 style={{ fontSize: 38, fontWeight: 900, color: '#1A1A1A', margin: '40px 0 50px', lineHeight: 1.3 }}>
              이 팀은 <span style={{ color: POINT_COLOR }}>어떻게</span> 해결했을까?
            </h2>

            {[
              { label: '크리에이터 영상', desc: '인플루언서 섭외 없이\nAI가 말까지 하는 영상 제작', color: '#EEF2FF' },
              { label: '뷰티 기작영상', desc: 'ChatGPT + 젠스파크 + 클링\n3단계로 촬영 없이 완성', color: '#FFF9F0' },
              { label: '3D 제품 모션', desc: '제품 사진 몇 장만으로\n3D 모션 그래픽까지', color: '#F0FFF4' },
              { label: '바디 콘텐츠', desc: '모델 구할 수 없을 때\nAI로 우회해서 해결', color: '#FFF5F5' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 24, padding: '24px', background: item.color, borderRadius: 16, alignItems: 'center' }}>
                <div style={{ minWidth: 160 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: POINT_COLOR, display: 'block', marginBottom: 4 }}>Session 0{i + 1}</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 20, color: '#666', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.desc}</span>
              </div>
            ))}

            <p style={{ fontSize: 20, color: '#999', marginTop: 20, textAlign: 'center' }}>
              아모레퍼시픽 · 클리오 · 달바 · 젝시믹스 실제 협업
            </p>
          </div>
        );

      case 'workflows':
        return (
          <div ref={ref} style={{ width: 1080, height: 1080, background: slide.bg, fontFamily: "'Noto Sans KR', sans-serif", position: 'relative', padding: 60 }}>
            <span style={{ background: POINT_COLOR, color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 700 }}>참여 혜택</span>

            <h2 style={{ fontSize: 38, fontWeight: 900, color: '#1A1A1A', margin: '40px 0 50px', lineHeight: 1.3 }}>
              <span style={{ color: YELLOW, background: '#1A1A1A', padding: '4px 12px', borderRadius: 8 }}>9,900원</span>에
              <br />이 모든 걸 가져가세요
            </h2>

            <div style={{ background: '#fff', borderRadius: 20, padding: '36px 32px', marginBottom: 30, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: POINT_COLOR, margin: '0 0 20px' }}>신청만 해도</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>🎁</span>
                <span style={{ fontSize: 24, fontWeight: 500 }}>공유회 다시보기 VOD</span>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 20, padding: '36px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: CORAL, margin: '0 0 20px' }}>라이브 완주 시</p>
              {[
                '워크플로우 자료 5종',
                '초압축 AI 인사이트 노트',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>🎁</span>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ position: 'absolute', bottom: 70, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 18, color: '#999' }}>정가 99,000원 → 90% 할인</span>
              <span style={{ fontSize: 20, color: '#1A1A1A', fontWeight: 700 }}>커피 한 잔 값이면 돼요 ☕</span>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div ref={ref} style={{ width: 1080, height: 1080, background: slide.bg, fontFamily: "'Noto Sans KR', sans-serif", position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,107,90,0.1) 0%, transparent 60%)' }} />

            <div style={{ position: 'absolute', top: 60, left: 60 }}>
              <span style={{ background: POINT_COLOR, color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 700 }}>이기적 공유회</span>
            </div>

            <div style={{ position: 'absolute', top: '50%', left: 60, right: 60, transform: 'translateY(-50%)', textAlign: 'center' }}>
              <p style={{ fontSize: 24, color: '#999', margin: '0 0 20px' }}>이기적공유회</p>
              <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.3 }}>
                AI 비즈니스 영상 편
              </h1>
              <div style={{ width: 60, height: 3, background: YELLOW, margin: '30px auto' }} />

              <p style={{ fontSize: 26, color: '#ccc', margin: '0 0 8px' }}>📅 3/16(월) 저녁 8시~9시 30분</p>
              <p style={{ fontSize: 26, color: '#ccc', margin: '0 0 8px' }}>📍 ZOOM 라이브</p>
              <p style={{ fontSize: 26, color: '#ccc', margin: '0 0 40px' }}>⏰ 마감: 당일 저녁 6시</p>

              <div style={{ display: 'inline-block', background: CORAL, color: '#fff', padding: '18px 60px', borderRadius: 50, fontSize: 28, fontWeight: 700, cursor: 'pointer' }}>
                지금 신청하기 →
              </div>

              <p style={{ fontSize: 20, color: '#666', marginTop: 24 }}>프로필 링크에서 신청하세요</p>
            </div>

            <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center' }}>
              <span style={{ color: '#444', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em' }}>SELFISH CLUB</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', fontFamily: "'Noto Sans KR', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />

      {/* 미리보기 */}
      <div style={{ position: 'relative', width: 540, height: 540, overflow: 'hidden', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
          {renderSlide(SLIDES[current], current)}
        </div>

        {/* 좌우 화살표 */}
        {current > 0 && (
          <button onClick={() => goTo(current - 1)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        )}
        {current < SLIDES.length - 1 && (
          <button onClick={() => goTo(current + 1)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
        )}

        {/* 인디케이터 */}
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }} />
          ))}
        </div>
      </div>

      {/* 슬라이드 번호 */}
      <p style={{ textAlign: 'center', color: '#666', margin: '16px 0 8px', fontSize: 14 }}>
        {current + 1} / {SLIDES.length}
      </p>

      {/* 다운로드 버튼 */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
        <button onClick={() => downloadSlide(current, 'png')} style={{ padding: '10px 20px', background: '#2E5CFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          현재 슬라이드 PNG ↓
        </button>
        <button onClick={() => downloadSlide(current, 'jpg')} style={{ padding: '10px 20px', background: '#666', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          현재 슬라이드 JPG ↓
        </button>
        <button onClick={downloadAll} style={{ padding: '10px 20px', background: '#FF6B5A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          전체 다운로드 ↓
        </button>
      </div>

      {/* 숨겨진 원본 크기 슬라이드 (다운로드용) */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        {SLIDES.map((slide, i) => (
          <div key={i}>{renderSlide(slide, i)}</div>
        ))}
      </div>
    </div>
  );
}
