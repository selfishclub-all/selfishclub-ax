// v13 · slides-2 — S10-S15: BEFORE(반복+개인화0%) + WHAT(11시 슬랙 · 3시간→5분) + HOW 진입

// ── 10 · BEFORE: 매주 반복되는 일이 너무 많음 ──────────
const S10 = () =>
<Slide num={10} total={27} theme="dark" topLeft="BEFORE · 반복" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>그래서 알림톡만 봐도,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 40, fontSize: 70 }}>
      매주 반복되는 일이<br />
      <span style={{ color: 'var(--yellow)' }}>진짜 너무 많았어요.</span>
    </div>
    <div style={{ display: 'flex', gap: 12, color: '#ddd', flexWrap: 'wrap' }}>
      {[
        '오픈 알림', '오픈 리마인드', 'D-1 리마인드',
        '당일 리마인드', '입장 링크', '시작 알림',
        '할인 쿠폰', '혜택 안내', 'VOD 발송',
        '결제 영수증', '미신청자 푸시'].
        map((m, i) =>
        <div key={i} style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 20, fontWeight: 600 }}>
          {m}
        </div>
      )}
    </div>
    <div style={{ marginTop: 48, display: 'flex', gap: 80, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
      <div>
        <div className="cap" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>한 프로그램당</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, color: 'var(--yellow)', letterSpacing: '-0.05em' }}>11</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>개 메시지</div>
        </div>
      </div>
      <div>
        <div className="cap" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>한 주에 평균</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, color: 'var(--yellow)', letterSpacing: '-0.05em' }}>3</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>시간 / 일</div>
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>템플릿 찾고 · 시간 챙기고 · 카피 쓰고</div>
      </div>
    </div>
  </Slide>;


// ── 11 · 진짜 문제: 모두에게 똑같은 카피 ─────────────────
const S11 = () =>
<Slide num={11} total={27} topLeft="BEFORE · 진짜 문제" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 더 큰 문제는,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 44, fontSize: 64 }}>
      <span className="hl">모든 사람</span>한테<br />
      <span className="hl">똑같은 카피</span>가 나가고 있었다는 거.
    </div>
    <div style={{ display: 'flex', gap: 22 }}>
      {[
        { tag: 'NEW USER', sub: '신규' },
        { tag: '3회차 참여', sub: '단골' },
        { tag: '휴면 6개월', sub: '이탈' }].
        map((p, i) =>
        <div key={i} className="card" style={{ flex: 1, padding: 30 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#999', marginBottom: 12, letterSpacing: '0.22em' }}>{p.tag}</div>
          <div style={{ fontSize: 20, lineHeight: 1.5, color: '#444' }}>
            "셀피쉬클럽 첫 공유회 오픈 🎉<br />얼리버드 시작됐어요!"
          </div>
          <div style={{ marginTop: 16, fontSize: 14, color: '#aaa', fontStyle: 'italic' }}>→ {p.sub}한테도 똑같이.</div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 40, fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.45 }}>
      <span style={{ color: '#999' }}>소구점은 다 다른데,</span> 카피는 하나.
    </div>
  </Slide>;


// ── 12 · WHY 자동화 (재정의) ──────────────────────────
const S12 = () =>
<Slide num={12} total={27} theme="yellow" topLeft="WHY · 재정의" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'rgba(0,0,0,0.6)' }}>그래서 자동화한 진짜 이유,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.04, marginBottom: 36, fontSize: 88 }}>
      반복을 줄이려고가 아니에요.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '28px 32px', background: 'rgba(0,0,0,0.06)', borderRadius: 12 }}>
        <div className="cap" style={{ color: '#3a3b00', fontSize: 13, marginBottom: 10 }}>WHAT WE WERE DOING</div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.4, color: 'var(--ink)' }}>
          같은 템플릿으로<br />모두에게 같은 메시지.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 40 }}>→</div>
      <div style={{ flex: 1.4, padding: '28px 32px', background: 'var(--ink)', color: '#fff', borderRadius: 12 }}>
        <div className="cap" style={{ color: 'var(--yellow)', fontSize: 13, marginBottom: 10 }}>WHY AUTOMATE</div>
        <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, color: '#fff' }}>
          데이터로 사람마다 소구되는 카피를 찾는 <span style={{ color: 'var(--yellow)' }}>개인화 CRM</span>으로 가기 위해.
        </div>
        <div style={{ fontSize: 18, color: '#bbb', marginTop: 14, lineHeight: 1.55 }}>
          자동화는 그 시간을 만드는 토대.
        </div>
      </div>
    </div>
  </Slide>;


// ── 13 · WHAT 결과 1: 매일 11시 슬랙 ──────────────────
const S13 = () =>
<Slide num={13} total={27} topLeft="WHAT · 결과 1" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">자동화하고 나서, 매일 아침 11시</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 40, fontSize: 72 }}>
      이게 <span className="hl">슬랙</span>으로 와요.
    </div>
    <div style={{ display: 'flex', gap: 48, alignItems: 'center', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1.1, display: 'flex', justifyContent: 'center' }}>
        <img src="slack-approval.png" alt="Slack 승인 카드"
          style={{ width: '100%', maxWidth: 580, borderRadius: 16, border: '1.5px solid #e5e5e5', boxShadow: '0 30px 60px rgba(0,0,0,0.18)', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.5, color: '#222', marginBottom: 22 }}>
          오늘 나갈 알림톡을 미리보기.<br />
          <span style={{ color: '#888' }}>승인 한 번 → 발송. 거절 → 폐기.</span>
        </div>
        <div style={{ paddingTop: 22, borderTop: '1px solid #e6e6e6', fontSize: 18, color: '#555', lineHeight: 1.6 }}>
          ※ 슬랙 = 회사용 메신저 (요즘 디스코드 같은 걸로 회사가 쓰는 그것).<br />
          이 카드 안에 미리보기 + 승인/거절 버튼이 다 들어있어요.
        </div>
      </div>
    </div>
  </Slide>;


// ── 14 · WHAT 결과 2: 3시간 → 5분 ─────────────────────
const S14 = () =>
<Slide num={14} total={27} theme="dark" topLeft="WHAT · 결과 2" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>그래서 시간으로 따지면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 64, fontSize: 96 }}>
      하루 <span style={{ color: 'var(--yellow)' }}>3시간</span>이<br />
      <span style={{ color: 'var(--yellow)' }}>5분</span>이 됐어요.
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '40px 48px 40px 0', borderRight: '1px solid rgba(255,255,255,0.18)' }}>
        <div className="cap" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontSize: 14 }}>BEFORE</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
          <div style={{ fontSize: 180, fontWeight: 900, lineHeight: 0.9, color: '#888', letterSpacing: '-0.05em' }}>3</div>
          <div style={{ fontSize: 42, fontWeight: 700, color: '#888' }}>시간 / 일</div>
        </div>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
          템플릿 찾기 · 발송 시간 챙기기 ·<br />
          카피 직접 쓰기 · 결과 엑셀 정리.<br />
          한 사이클당 평균 <b>3시간</b>.
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px 0 40px 48px' }}>
        <div className="cap" style={{ color: 'var(--yellow)', marginBottom: 12, fontSize: 14 }}>NOW</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
          <div style={{ fontSize: 180, fontWeight: 900, lineHeight: 0.9, color: 'var(--yellow)', letterSpacing: '-0.05em' }}>5</div>
          <div style={{ fontSize: 42, fontWeight: 700, color: 'var(--yellow)' }}>분 / 일</div>
        </div>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
          슬랙 카드 훑고 → 승인 누르고 → 끝.<br />
          나머지 시간은 <b style={{ color: 'var(--yellow)' }}>메시지 개선·개인화</b>에 씁니다.
        </div>
      </div>
    </div>
  </Slide>;


// ── 15 · HOW 진입 ─────────────────────────────────────
const S15 = () =>
<Slide num={15} total={27} theme="dark" topLeft="HOW" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="kicker" style={{ color: 'var(--yellow)', opacity: 0.9 }}>04. HOW</div>
      <div className="h-hero" style={{ fontWeight: 800, lineHeight: 1.04, marginTop: 20, fontSize: 124 }}>
        그래서 <span style={{ color: 'var(--yellow)' }}>어떻게</span> 만들었냐면.
      </div>
      <div className="body" style={{ fontSize: 26, color: 'rgba(255,255,255,0.7)', marginTop: 36, lineHeight: 1.5 }}>
        클로드랑 기획부터 — 노트북 덮어도 도는 구조 — 슬랙으로 승인까지.
      </div>
      <div style={{ marginTop: 40, display: 'flex', gap: 14, color: 'rgba(255,255,255,0.85)', fontSize: 18, fontWeight: 700, letterSpacing: '0.16em' }}>
        {['1. OMC 인터뷰', '2. CLAUDE.md', '3. 노트북 덮으면', '4. n8n', '5. 슬랙 승인', '6. 카드 빌드', '7. 매일 11시'].map((s, i) =>
          <span key={i} style={{ padding: '8px 14px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6 }}>{s}</span>
        )}
      </div>
    </div>
  </Slide>;


window.S10 = S10; window.S11 = S11; window.S12 = S12; window.S13 = S13;
window.S14 = S14; window.S15 = S15;
