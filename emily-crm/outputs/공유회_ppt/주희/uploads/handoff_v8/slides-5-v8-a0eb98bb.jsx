// Slides 26-30

// ── 26 · USE CASE ② 에이전트 8개 ──────────────────────
const S26 = () => (
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="tag">USE CASE ②</div>
    <div className="h-l" style={{ fontSize: 72, marginTop: 12, marginBottom: 12 }}>
      <span className="hl">에이전트 8개</span>, 역할을 쪼갰어요.
    </div>
    <div className="body" style={{ fontSize: 26, marginBottom: 40, color:'#666' }}>한 명이 다 하는 대신, 직원 여덟 명처럼.</div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 18 }}>
      {[
        {n:'01', t:'director',      d:'전체 흐름 지휘'},
        {n:'02', t:'copywriter',    d:'카피 초안 작성'},
        {n:'03', t:'data-collector', d:'DB에서 타겟 조회'},
        {n:'04', t:'dispatcher',    d:'실제 발송 트리거'},
        {n:'05', t:'verifier',      d:'링크·변수 검수'},
        {n:'06', t:'scheduler',     d:'예약 시점 관리'},
        {n:'07', t:'reporter',      d:'발송 리포트'},
        {n:'08', t:'code-reviewer', d:'검수 게이트', hl: true},
      ].map((c,i)=>(
        <div key={i} className="card" style={{ padding:'24px 24px', minHeight: 140, background: c.hl?'var(--yellow)':'var(--surface)' }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: c.hl?'var(--yellow-ink)':'#999' }}>{c.n}</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>{c.t}</div>
          <div style={{ fontSize: 18, color: c.hl?'var(--yellow-ink)':'#666', marginTop: 8 }}>{c.d}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 40, fontSize: 24, color:'#666' }}>
      ↑ <b>code-reviewer</b>는 AAA 과제 중에 '검수가 필요하다'는 걸 깨닫고 뒤늦게 추가한 역할이에요.
    </div>
  </Slide>
);

// ── 27 · USE CASE ③ 릴레이 ───────────────────────────
const S27 = () => (
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="tag">USE CASE ③</div>
    <div className="h-l" style={{ fontSize: 68, marginTop: 12, marginBottom: 12 }}>
      발송이 <span className="hl">다음 발송</span>을 만들어요.
    </div>
    <div className="body" style={{ fontSize: 26, marginBottom: 48, color:'#666' }}>알림톡 한 번 나가면, 그다음이 자동으로 세팅돼요.</div>
    <div style={{ display:'flex', gap: 14, alignItems:'stretch' }}>
      <div style={{ flex:'0 0 200px', padding:'24px 22px', background:'var(--yellow)', borderRadius: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing:'0.16em', color:'var(--yellow-ink)' }}>STEP 1 · 내가 누름</div>
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 20, lineHeight: 1.3 }}>알림톡 ①<br/>발송</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', color:'#bbb', fontSize: 40 }}>→</div>
      <div style={{ flex: 1, padding:'24px 22px', background:'#f3f3f3', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing:'0.18em', color:'#888' }}>AGENT</div>
        <div className="mono" style={{ fontSize: 20, fontWeight: 800, marginTop: 14 }}>data-collector</div>
        <div style={{ fontSize: 18, color:'#555', marginTop: 8 }}>신청자 조회</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', color:'#bbb', fontSize: 40 }}>→</div>
      <div style={{ flex: 1, padding:'24px 22px', background:'#f3f3f3', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing:'0.18em', color:'#888' }}>AGENT</div>
        <div className="mono" style={{ fontSize: 20, fontWeight: 800, marginTop: 14 }}>dispatcher</div>
        <div style={{ fontSize: 18, color:'#555', marginTop: 8 }}>신청자 제외 세팅</div>
      </div>
      <div style={{ display:'flex', alignItems:'center', color:'#bbb', fontSize: 40 }}>→</div>
      <div style={{ flex:'0 0 220px', padding:'24px 22px', background:'var(--ink)', color:'#fff', borderRadius: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing:'0.16em', color:'var(--yellow)' }}>STEP 2 · 자동</div>
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 20, lineHeight: 1.3 }}>미신청자 전용<br/>알림톡 ② 발송</div>
      </div>
    </div>
    <div style={{ marginTop: 40, padding:'22px 28px', background:'var(--ink)', color:'#fff', borderRadius: 10, fontSize: 24 }}>
      <b style={{ color:'var(--yellow)' }}>STEP 1만 내가 승인하면 돼요</b> — 나머지는 에이전트끼리 릴레이로 STEP 2를 만들어요.
    </div>
    <div style={{ marginTop: 24, display:'flex', gap: 32, fontSize: 20, color:'#666' }}>
      <div><b style={{ color:'#c4343b' }}>옛날엔</b> 알림톡 ① 보내고 → 다음 날 수동으로 신청자 빼고 → 미신청자만 추려서 ② 보냄.</div>
      <div><b style={{ color:'var(--ink)' }}>지금은</b> 알림톡 ① 발송 직후에 에이전트끼리 자동으로 다음 타겟을 재조회.</div>
    </div>
  </Slide>
);

// ── 28 · IMPACT ───────────────────────────────────────
const S28 = () => (
  <Slide theme="light" topLeft="04 · 팀과 일한 이야기" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 뭐가 바뀌었냐면.</div>
    <div style={{ display:'flex', flexDirection:'column', gap: 20 }}>
      {[
        {label:'알림톡 1건', a:'3h', b:'5min', note:'매일 아침 슬랙 모달 한 번.'},
        {label:'공유회 준비', a:'2d', b:'1h',   note:'채널별 발송 세팅 전체.'},
        {label:'리스크',      a:'오타·링크 실수', b:'검수 단계에서 차단.', long:true},
      ].map((r,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap: 32, padding:'28px 0', borderTop:'1px solid #eee' }}>
          <div style={{ flex:'0 0 200px', fontSize: 22, fontWeight: 800, letterSpacing:'0.16em', textTransform:'uppercase', color:'#888' }}>{r.label}</div>
          <div style={{ flex: 1, display:'flex', alignItems:'center', gap: 32 }}>
            <div style={{ fontSize: r.long?48:110, fontWeight: 900, color:'#999', letterSpacing:'-0.03em' }}>{r.a}</div>
            <div style={{ fontSize: 60, color:'#bbb', fontWeight: 300 }}>→</div>
            <div style={{ fontSize: r.long?48:110, fontWeight: 900, color:'var(--ink)', letterSpacing:'-0.03em' }}>
              <span className="hl" style={{ padding:'0 0.12em' }}>{r.b}</span>
            </div>
          </div>
          <div style={{ flex:'0 0 380px', fontSize: 22, color:'#555' }}>{r.note}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 48, fontSize: 32, fontWeight: 700, lineHeight: 1.4 }}>
      퇴근 직전 카피 쓰다 지쳤던 제가,<br/>
      <span className="hl">맥북 닫고 집에 가도 메시지가 나가요.</span>
    </div>
  </Slide>
);

// ── 29 · 팀 ────────────────────────────────────────────
const S29 = () => (
  <Slide theme="light" topLeft="04 · 팀과 일한 이야기" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">혼자 한 거 아니에요.</div>
    <div className="h-l" style={{ fontSize: 60, marginBottom: 48 }}>AAA 6주, 옆자리에서 이렇게 영향받았어요.</div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 20 }}>
      {[
        {who:'비비안',        t:<>전체 대시보드 크루랑 협업하면서,<br/>내 CRM이 전체 어디에 들어가는지 <b>감 잡음</b>.</>},
        {who:'다니',          t:<>마케팅 OS 보면서 영향받아,<br/><b>CLAUDE.md → PRD 구조</b> 차용.</>},
        {who:'code-reviewer', t:<>AAA 과제로 <b>하네스 서로 공유</b>하다 "검수가 필요하다" 깨닫고 만든 에이전트.</>, mono:true},
        {who:'흐민 · 오웬',    t:<>흐민의 <b>'질문하는 AI'</b>, 오웬의 <b>'찜마켓'</b> 보면서 활용 범위 확장.</>},
      ].map((c,i)=>(
        <div key={i} className="card" style={{ padding:'28px 24px', minHeight: 260 }}>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: c.mono?0:'-0.02em', fontFamily: c.mono?'"JetBrains Mono", monospace':'inherit' }}>{c.who}</div>
          <div style={{ height: 1, background:'#ddd', margin:'16px 0' }}/>
          <div style={{ fontSize: 20, lineHeight: 1.55, color:'#333' }}>{c.t}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 64, padding:'32px 40px', background:'var(--yellow)', borderRadius: 14 }}>
      <div style={{ fontSize: 40, fontWeight: 900 }}>그래서 <span style={{ textDecoration:'underline', textDecorationThickness: 4 }}>스폰지클럽</span>.</div>
      <div style={{ fontSize: 24, marginTop: 12, color:'var(--yellow-ink)' }}>빨아들이고, 내보내고, 또 누군가가 빨아들이고.</div>
    </div>
  </Slide>
);

// ── 30 · 아웃트로 ──────────────────────────────────────
const S30 = () => (
  <Slide theme="dark" topLeft="OUTRO" topRight="EMILY · SELFISH CLUB · AAA" botLeft="에밀리 · 셀피쉬클럽 CRM PM" botRight="AAA 공유회 · 2026.04.28">
    <div className="kicker">여러분은 이렇게 해보세요.</div>
    <div className="h-xl" style={{ marginBottom: 56 }}>
      내일부터 <span className="hl">세 가지</span>만.
    </div>
    <div style={{ display:'flex', flexDirection:'column', gap: 20, marginBottom: 56 }}>
      {[
        {n:'01', t:'한 파일로 시작하기.',       d:'CLAUDE.md에 내 규칙부터 적어보기.'},
        {n:'02', t:'걔한테 먼저 물어보기.',     d:'"내 맥락 잘 기억하려면 뭘 줘야 해?"'},
        {n:'03', t:'사람 관문 하나 남겨두기.',  d:'완전 자동 말고, 승인 한 번.'},
      ].map((r,i)=>(
        <div key={i} style={{ display:'flex', gap: 28, alignItems:'baseline' }}>
          <div style={{ fontSize: 44, fontWeight: 900, color:'var(--yellow)', minWidth: 80 }}>{r.n}</div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>{r.t}</div>
            <div style={{ fontSize: 24, color:'#bbb', marginTop: 6 }}>{r.d}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop: 32, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
      <div className="h-hero" style={{ fontSize: 120 }}>감사합니다. <span className="hl">Q & A.</span></div>
    </div>
  </Slide>
);

window.S26 = S26; window.S27 = S27; window.S28 = S28; window.S29 = S29; window.S30 = S30;
