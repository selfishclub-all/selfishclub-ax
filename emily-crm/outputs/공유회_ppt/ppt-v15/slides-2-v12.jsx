// v12 · slides-2 — S12-S14 (WHAT 챕터)

// ── 11 · WHY → WHAT 전환: 그래서 자동화했어요 ────────
const S12 = () =>
<Slide num={12} total={31} theme="yellow" topLeft="WHY → WHAT" >
    <div className="kicker">그래서 —</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 108 }}>
      자동화했어요.
    </div>
    <div style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.55, marginBottom: 64, color: 'var(--ink)' }}>
      "보내는 데 쓰는 시간"을 줄여서,<br />
      "<span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>개선하는 데 쓸 시간</span>"을 만들려고.
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
      <div style={{ flex: 1, padding: '36px 40px', background: 'rgba(0,0,0,0.07)', borderRadius: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.22em', color: '#3a3b00', marginBottom: 18 }}>지금까지</div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.35, color: 'var(--ink)' }}>
          매번 알림톡,<br />
          <span style={{ color: '#7a7a00' }}>같은 카피, 같은 시간.</span>
        </div>
      </div>
      <Arr size={100} />
      <div style={{ flex: 1, padding: '36px 40px', background: 'var(--ink)', color: '#fff', borderRadius: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 18 }}>앞으로</div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.35 }}>
          <span style={{ background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.1em' }}>개인화된 카피</span>,<br />
          <span style={{ background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.1em' }}>데이터 기반 타이밍</span>.
        </div>
      </div>
    </div>
  </Slide>;


// ── 12 · WHAT · 슬랙으로 와요 ────────────────────────
const S13 = () =>
<Slide num={13} total={31} topLeft="WHAT · 결과 1" >
    <div style={{ marginTop: 60 }}>
      <div className="kicker">자동화하고 나서 — 매일 아침 11시,</div>
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 64, fontSize: 100 }}>
        <span className="hl">슬랙으로 와요.</span>
      </div>
      <div style={{ display: 'flex', gap: 56, alignItems: 'center' }}>
        <div style={{ flex: 1.1, display: 'flex', justifyContent: 'center' }}>
          <img src="slack-approval.png" alt="Slack 승인 카드"
            style={{ width: '100%', maxWidth: 640, borderRadius: 16, border: '1.5px solid #e5e5e5', boxShadow: '0 30px 60px rgba(0,0,0,0.18)', display: 'block' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.5, color: '#222' }}>
            오늘 나갈 알림톡<br/>
            미리보기.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, fontWeight: 600, color: '#666', lineHeight: 1.55 }}>
            승인 한 번 <span style={{ color: 'var(--ink)' }}>→ 발송.</span><br/>
            거절 <span style={{ color: 'var(--ink)' }}>→ 폐기.</span>
          </div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 13 · WHAT · 3시간 → 5분 (v15 원본 복원) ─────────
const S14 = () =>
<Slide num={14} total={31} topLeft="WHAT · 결과 2" >
    <div className="kicker">시간으로 따지면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 64, fontSize: 88 }}>
      하루 <span className="hl">3시간</span>이 → <span className="hl">5분.</span>
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '40px 56px 40px 0', borderRight: '1px solid #e6e6e6' }}>
        <div className="cap" style={{ color: '#bbb', marginBottom: 14 }}>BEFORE</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.9, color: '#bbb', letterSpacing: '-0.05em' }}>3</div>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#bbb' }}>시간 / 일</div>
        </div>
        <div style={{ fontSize: 22, color: '#666', lineHeight: 1.55 }}>
          템플릿 찾기 · 발송시간 챙기기 · 카피 직접 쓰기 · 결과 엑셀 정리.
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px 0 40px 56px' }}>
        <div className="cap" style={{ color: 'var(--yellow-ink)', marginBottom: 14, fontWeight: 800 }}>NOW</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.9, color: 'var(--ink)', letterSpacing: '-0.05em', background: 'var(--yellow)', padding: '0 12px' }}>5</div>
          <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--ink)' }}>분 / 일</div>
        </div>
        <div style={{ fontSize: 22, color: '#444', lineHeight: 1.55 }}>
          슬랙 카드 훑고 → 승인 → 끝.<br />
          나머지 시간은 <b>메시지 개선·개인화</b>에.
        </div>
      </div>
    </div>
  </Slide>;


window.S12 = S12; window.S13 = S13; window.S14 = S14;
