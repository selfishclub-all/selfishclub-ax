// v12 · slides-2 — S09-S14

// ── 10 · BEFORE: 매번 알림톡 발송때 챙긴 것 (옛 S10 곱셈 시각화 형식) ──
const S10 = () =>
<Slide num={10} total={29} topLeft="BEFORE · 알림톡 발송" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">알림톡 한 번 보낼 때마다,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 76 }}>
      <span className="hl">이걸 매번 다 챙겼어요.</span>
    </div>
    <div style={{ display: 'flex', gap: 56, alignItems: 'center', marginBottom: 40 }}>
      <div>
        <div className="cap" style={{ color: '#999', marginBottom: 12 }}>한 사이클당</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontSize: 180, fontWeight: 900, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.05em' }}>9</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>개 템플릿</div>
        </div>
      </div>
      <div style={{ fontSize: 80, color: '#ccc', fontWeight: 300 }}>×</div>
      <div>
        <div className="cap" style={{ color: '#999', marginBottom: 12 }}>매번 손으로</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontSize: 180, fontWeight: 900, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.05em' }}>4</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>가지 작업</div>
        </div>
      </div>
      <div style={{ fontSize: 80, color: '#ccc', fontWeight: 300 }}>=</div>
      <div>
        <div className="cap" style={{ color: 'var(--yellow-ink)', marginBottom: 12, fontWeight: 800 }}>한 사이클당</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, background: 'var(--yellow)', padding: '12px 24px', borderRadius: 10 }}>
          <div style={{ fontSize: 180, fontWeight: 900, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.05em' }}>36</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink)' }}>번의 손</div>
        </div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {[
        { k: 'DB', t: '수동으로 대상자 추출', d: '신청자 / 미신청 / 결제 / 휴면' },
        { k: 'COPY', t: '카피 새로 쓰기', d: '시즌·세그먼트별로 매번' },
        { k: 'LINK', t: 'UTM 링크 만들기', d: 'utm_source · medium · campaign' },
        { k: 'TIME', t: '발송 시각 직접 챙김', d: '광고성 21–08시 금지 등 규칙' }].
        map((c, i) =>
        <div key={i} style={{ padding: '20px 22px', background: '#f5f5f5', borderRadius: 10 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 800, color: 'var(--ink)', letterSpacing: '0.18em', marginBottom: 8 }}>{c.k}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 6 }}>{c.t}</div>
          <div style={{ fontSize: 16, color: '#666', lineHeight: 1.45 }}>{c.d}</div>
        </div>
      )}
    </div>
  </Slide>;


// ── 11 · BEFORE: 모두에게 똑같은 카피 (흰 배경) ───────
const S11 = () =>
<Slide num={11} total={29} topLeft="BEFORE · 진짜 문제" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 더 큰 문제는,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 48, fontSize: 72 }}>
      <span className="hl">모든 사람</span>한테<br />
      <span className="hl">똑같은 카피</span>가 나가고 있었다는 거.
    </div>
    <div style={{ display: 'flex', gap: 24 }}>
      {[
        { tag: 'NEW USER', sub: '신규 가입 7일' },
        { tag: '단골 (3회+)', sub: '매번 신청 중' },
        { tag: '휴면 (6개월+)', sub: '오래 안 옴' }].
        map((p, i) =>
        <div key={i} style={{ flex: 1, padding: 32, background: '#f5f5f5', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--ink)', marginBottom: 6, letterSpacing: '0.22em' }}>{p.tag}</div>
          <div style={{ fontSize: 16, color: '#888', marginBottom: 18 }}>{p.sub}</div>
          <div style={{ padding: '18px 20px', background: '#fff', borderRadius: 10, color: '#222', fontSize: 18, lineHeight: 1.5, border: '1px solid #e6e6e6' }}>
            "셀피쉬클럽 첫 공유회 오픈 🎉<br />얼리버드 시작됐어요!"
          </div>
          <div style={{ marginTop: 14, fontSize: 14, color: '#999' }}>→ {p.sub}한테도 똑같이.</div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 36, padding: '24px 32px', background: 'var(--yellow)', borderRadius: 10 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.4 }}>
        소구점은 다 다른데 — 카피는 하나. 개인화 0%.
      </div>
    </div>
  </Slide>;


// ── 12 · 그래서 자동화한 이유 ──────────────────────────
const S12 = () =>
<Slide num={12} total={29} theme="yellow" topLeft="WHY 자동화" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 자동화한 건,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.04, marginBottom: 64, fontSize: 76 }}>
      "보내는 데 쓰는 시간"을 줄여서,<br />
      <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>"개선하는 데 쓸 시간"</span>을 만들려고.
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div className="cap" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.22em', color: '#3a3b00', marginBottom: 16 }}>지금까지</div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3 }}>
          매주 알림톡<br />
          <span style={{ color: '#7a7a00' }}>같은 카피, 같은 시간.</span>
        </div>
      </div>
      <Arr size={120} />
      <div style={{ flex: 1 }}>
        <div className="cap" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.22em', color: '#3a3b00', marginBottom: 16 }}>앞으로</div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3 }}>
          개인화된 카피, <br />
          <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.1em' }}>데이터 기반 타이밍.</span>
        </div>
      </div>
    </div>
  </Slide>;


// ── 13 · WHAT 인트로: 결과부터 보여드릴게요 ───────────
const S13 = () =>
<Slide num={13} total={29} theme="dark" topLeft="WHAT" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="kicker" style={{ marginBottom: 32, color: 'var(--yellow)' }}>02. WHAT</div>
      <div className="h-hero" style={{ fontWeight: 800, lineHeight: 1.05, fontSize: 180, letterSpacing: '-0.04em', color: '#fff' }}>
        결과부터<br />
        <span style={{ background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.15em' }}>보여드릴게요.</span>
      </div>
      <div style={{ marginTop: 56, fontSize: 28, color: '#bbb', fontWeight: 600 }}>
        자동화하고 나서, 매일 이렇게 일하고 있어요.
      </div>
    </div>
  </Slide>;


// ── 14 · WHAT 결과 1: 매일 11시 슬랙 (흰 배경) ────────
const S14 = () =>
<Slide num={14} total={29} topLeft="WHAT · 결과 1" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">자동화하고 나서 — 매일 아침 11시,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 84 }}>
      슬랙으로 와요.
    </div>
    <div style={{ display: 'flex', gap: 56, alignItems: 'center', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1.1, display: 'flex', justifyContent: 'center' }}>
        <img src="slack-approval.png" alt="Slack 승인 카드"
          style={{ width: '100%', maxWidth: 620, borderRadius: 16, border: '1.5px solid #e5e5e5', boxShadow: '0 30px 60px rgba(0,0,0,0.18)', display: 'block' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.5, color: '#222' }}>
          오늘 나갈 알림톡 미리보기.<br />
          <span style={{ color: '#888' }}>승인 한 번 → 발송. 거절 → 폐기.</span>
        </div>
      </div>
    </div>
  </Slide>;


// ── 15 · WHAT 결과 2: 3시간 → 5분 (흰 배경) ──────────
const S15 = () =>
<Slide num={15} total={29} topLeft="WHAT · 결과 2" topRight="EMILY · SELFISH CLUB · AAA">
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


window.S10 = S10; window.S11 = S11; window.S12 = S12; window.S13 = S13;
window.S14 = S14; window.S15 = S15;
