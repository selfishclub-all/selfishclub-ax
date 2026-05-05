// v12 · slides-1 — S01-S05 (OPENING) + S06-S11 (WHY 시작)

// ── 01 · INTRO ────────────────────────────────────────
const S01 = () =>
<Slide num={1} total={31} theme="light" topLeft="INTRO" >
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div style={{ fontSize: 36, fontWeight: 600, color: '#666', marginBottom: 32, letterSpacing: '-0.01em' }}>
        매일 아침, AI가 <span style={{ background: 'var(--yellow)', padding: '0 0.1em', fontWeight: 800, color: 'var(--ink)' }}>알림톡</span>을 들고 옵니다.
      </div>
      <div className="h-hero" style={{ fontSize: 110, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.04em' }}>
        <div>비개발자 마케터가</div>
        <div><span className="hl">CRM 자동화</span>를</div>
        <div>구축한 이야기.</div>
      </div>
      <div style={{ marginTop: 64, fontSize: 30, color: '#a8a8a8', fontWeight: 400, letterSpacing: '-0.01em' }}>
        에밀리 · 셀피쉬클럽 CRM &nbsp;·&nbsp; AAA 공유회 · 2026.04.28
      </div>
    </div>
  </Slide>;


// ── 02 · 목차 ─────────────────────────────────────────
const S02 = () =>
<Slide num={2} total={31} topLeft="목차" >
    <div style={{ display: 'flex', gap: 120, height: '100%', alignItems: 'center' }}>
      <div className="h-hero" style={{ flex: '0 0 480px', fontWeight: 800, lineHeight: 1.0, fontSize: 110, letterSpacing: '-0.03em' }}>
        오늘 드릴<br /><span className="hl">이야기.</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {[
      ['01', 'WHY', '왜 CRM을 AX 했는가'],
      ['02', 'WHAT', '자동화 후 일하는 방식'],
      ['03', 'HOW', '6주간 만든 과정'],
      ['04', 'NEXT', '앞으로 자동화할 것들']].
      map(([n, k, t]) =>
      <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 40, paddingBottom: 32, borderBottom: '1.5px solid #e0e0e0' }}>
            <div style={{ fontSize: 34, fontWeight: 900, color: '#ccc', letterSpacing: '0.1em', minWidth: 70 }}>{n}</div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '0.24em', color: 'var(--ink)', minWidth: 150, padding: '10px 16px', background: 'var(--yellow)', borderRadius: 4, textAlign: 'center' }}>{k}</div>
            <div style={{ flex: 1, fontSize: 48, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{t}</div>
          </div>
      )}
      </div>
    </div>
  </Slide>;


// ── 03 · CONTEXT (셀피쉬 AX 맥락) ─────────────────────
const S03 = () =>
<Slide num={3} total={31} theme="light" topLeft="CONTEXT" >
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: 48 }}>
      <div>
        <div className="h-hero" style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.025em' }}>
          셀피쉬클럽은 지금, <span style={{ background: 'var(--yellow)', padding: '0 0.1em', color: 'var(--ink)' }}>AX</span> 중입니다.
        </div>
        <div style={{ marginTop: 20, fontSize: 32, color: '#555', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
          셀피쉬클럽의 전체 운영을 에이전트화하는 AX 프로젝트.<br/>
          홈페이지·CX·CRM 등, 운영 전체를 에이전트로 굴립니다.
        </div>
      </div>
      <div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
          그 중 — <span style={{ background: 'var(--yellow)', padding: '0 0.1em', color: 'var(--ink)' }}>CRM AX</span>는 제 파트입니다.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 8 }}>
        <div style={{ flex: '0 0 auto', padding: '28px 40px', border: '1.5px solid #d8d8d8', borderRadius: 14, background: '#fafafa' }}>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '0.22em', color: '#999' }}>SELFISH CLUB AX</div>
          <div style={{ fontSize: 36, fontWeight: 700, marginTop: 8 }}>운영 전체</div>
          <div style={{ fontSize: 20, color: '#777', marginTop: 6 }}>홈페이지 · CX · CRM 등</div>
        </div>
        <div style={{ fontSize: 56, color: '#bbb', padding: '0 8px' }}>→</div>
        <div style={{ flex: '0 0 auto', padding: '28px 40px', borderRadius: 14, background: 'var(--yellow)', color: 'var(--ink)' }}>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '0.22em' }}>MY PART</div>
          <div style={{ fontSize: 36, fontWeight: 800, marginTop: 8 }}>CRM AX</div>
          <div style={{ fontSize: 20, marginTop: 6, opacity: 0.75 }}>알림톡 · 채널 · 자동화 · 검수</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 04 · WHO (텍스트 + 사진) ─────────────────────────
const S04 = () =>
<Slide num={4} total={31} theme="light" topLeft="WHO" >
    <div style={{ display: 'flex', gap: 56, height: '100%', alignItems: 'stretch' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 8 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 18 }}>WHO</div>
          <div className="h-hero" style={{ fontSize: 116, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.035em' }}>
            에밀리<span style={{ color: 'var(--yellow)' }}>.</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 34, fontWeight: 600, color: '#3a3a3a', letterSpacing: '-0.01em' }}>
            퍼포먼스·그로스 마케터 <span style={{ color: '#bbb', margin: '0 8px' }}>/</span> 셀피쉬클럽 CRM AX PM
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 30, marginBottom: 22 }}>
          {[
            {
              q: '"숫자로 의사결정하고, 매출 전환 효율을 극대화."',
              d: '인하우스 퍼포먼스·그로스 마케터로, 데이터 분석·대시보드·퍼널 개선을 해왔습니다.'
            },
            {
              q: '"셀피쉬클럽에서는 CRM PM을 맡고 있어요."',
              d: '카카오 알림톡 같은 새로운 채널을 세팅하고 운영하면서, 퍼포먼스 마케터의 시각으로 가장 효율적으로 굴릴 방법을 고민하고 있어요.'
            },
            {
              q: '"그리고 지금은 — 개발 역량 없는 마케터가 CRM을 AX 합니다."',
              d: '셀피쉬클럽 AX 프로젝트의 CRM 파트를 맡아, 제가 개입하지 않아도 독립적으로 굴러가는 시스템을 만들고 있습니다.'
            }
          ].map((p, i) =>
          <div key={i} style={{ borderLeft: '4px solid var(--yellow)', paddingLeft: 22 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.35, letterSpacing: '-0.01em' }}>{p.q}</div>
            <div style={{ fontSize: 23, color: '#555', lineHeight: 1.55, marginTop: 8 }}>{p.d}</div>
          </div>
          )}
        </div>

        <div style={{ fontSize: 24, color: '#888', fontStyle: 'italic', letterSpacing: '-0.005em', borderTop: '1px solid #eee', paddingTop: 18 }}>
          — 마케터의 로직으로 만드는 CRM AX, <span style={{ color: '#1a1a1a', fontStyle: 'normal', fontWeight: 600 }}>에밀리의 이야기를 시작합니다.</span>
        </div>
      </div>

      <div style={{ flex: '0 0 380px', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 380, height: 520, borderRadius: 20, background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
          <img src="assets/emily.png" alt="emily" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 16, letterSpacing: '0.24em', fontWeight: 700, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>EMILY</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 05 · TAKEAWAY ─────────────────────────────────────
const S05 = () => {
  const items = [
  { n: '01', t: '개발 못 하는 마케터가, 운영 자동화를 만든 길.', hl: null },
  { n: '02', t: '클로드와 함께 일을 기획하고 명세화하는 법.', hl: null },
  { n: '03', t: <>AI에게 다 맡기지 않고, <span className="hl">사람이 승인</span>하는 운영 구조.</>, hl: null }];

  return (
    <Slide num={5} total={31} theme="light" topLeft="TAKEAWAY" >
      <div className="kicker">그 이야기에서,</div>
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 80, fontSize: 88 }}>
        <span className="hl">세 가지</span>를 가져가시면 좋겠어요.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {items.map((it, i) =>
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 36, paddingBottom: 28, borderBottom: '1px solid #e6e6e6' }}>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--ink)', minWidth: 130 }}>{it.n}</div>
          <div style={{ flex: 1, fontSize: 38, fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.02em' }}>
            {it.t}
          </div>
        </div>
        )}
      </div>
    </Slide>);
};


// ── 06 · WHY · CRM 채널 5개 ──────────────────────────
const S06 = () =>
<Slide num={6} total={31} theme="light" topLeft="WHY" >
    <div className="kicker">저희가 공유회 한 번 할 때마다,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 88 }}>
      CRM이 다루는 채널은 — <span className="hl">5개</span>.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginBottom: 48 }}>
      {[
    { n: '01', t: '카카오 알림톡', hl: true },
    { n: '02', t: '카카오 플러스친구 배너' },
    { n: '03', t: '이메일' },
    { n: '04', t: '인스타 피드' },
    { n: '05', t: '오픈 채팅방' }].
    map((c, i) =>
    <div key={i} style={{
      padding: '44px 24px',
      background: c.hl ? 'var(--yellow)' : '#f3f3f3',
      borderRadius: 16,
      textAlign: 'center',
      minHeight: 220,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16
    }}>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.2em', color: c.hl ? '#5a5a00' : '#aaa' }}>{c.n}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35, wordBreak: 'keep-all' }}>{c.t}</div>
        </div>
    )}
    </div>
    <div style={{ fontSize: 36, fontWeight: 600, color: '#444', lineHeight: 1.55 }}>
      공유회 한 번 열리면, 5개 채널 다 나가야 함.<br />
      <span style={{ color: '#888', fontSize: 30 }}>전부 수동. 매번 콘텐츠 새로 만들고, DB 분류하고, 오픈·마감마다 또.</span>
    </div>
  </Slide>;


// ── 07 · WHY · 그래서 알림톡부터 ─────────────────────
const S07 = () =>
<Slide num={7} total={31} theme="yellow" topLeft="WHY" >
    <div className="kicker">한 번에 다 자동화는 무리.</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 104 }}>
      그래서 — <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>알림톡부터</span>.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
      {[
    { n: '이유 1', t: '가장 자주 나감', d: '공유회 1건당 9개 메시지 × 매주.' },
    { n: '이유 2', t: '규칙이 명확', d: '정보성/광고성, 발송시간, 템플릿 — 자동화하기 좋음.' },
    { n: '이유 3', t: '1:1 메시지의 가능성', d: <>회원 한 명 한 명에게 닿는 채널.<br /><b>개인화의 출발점</b>이 될 수 있음.</> }].
    map((c, i) =>
    <div key={i} style={{ flex: 1, padding: '44px 38px', background: 'rgba(0,0,0,0.07)', borderRadius: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.22em', color: '#3a3b00', marginBottom: 16 }}>{c.n}</div>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.3, color: 'var(--ink)', marginBottom: 16 }}>{c.t}</div>
          <div style={{ fontSize: 26, color: '#3a3b00', lineHeight: 1.55 }}>{c.d}</div>
        </div>
    )}
    </div>
    <div style={{ marginTop: 36, fontSize: 28, color: '#3a3b00', lineHeight: 1.55 }}>
      ※ 다른 채널들은 <b>다음 AX 공유회</b>에서.
    </div>
  </Slide>;


// ── 08 · 용어 풀이 · 알림톡이 뭐냐면 ─────────────────
const S08 = () =>
<Slide num={8} total={31} topLeft="용어 풀이" bodyStyle={{ justifyContent: 'flex-start' }} >
    <div style={{ paddingLeft: 40, paddingTop: 40, marginBottom: 0 }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#888', letterSpacing: '-0.01em', marginBottom: 14 }}>그 전에 —</div>
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, fontSize: 84, display: 'inline-block' }}>
        <span className="hl">알림톡이 뭐냐면.</span>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 64, alignItems: 'stretch', flex: 1, minHeight: 0, paddingLeft: 60 }}>
      <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
        {/* Section 1 — DEFINITION */}
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.18em', color: '#888', marginBottom: 12 }}>알림톡이란?</div>
          <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.4, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            내 번호로 가입한 회원에게,<br />
            카카오톡으로 직접 가는 메시지.
          </div>
        </div>

        <div style={{ borderTop: '1px solid #d8d6cd' }}></div>

        {/* Section 2 — DIFFERENCE */}
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.18em', color: '#888', marginBottom: 12 }}>뭐가 달라요?</div>
          <div style={{ fontSize: 24, color: '#5f5e5a', lineHeight: 1.6, fontWeight: 500 }}>
            광고 메시지는 친구톡.<br />
            알림톡은 정보성 전용 —<br />
            신청·결제·일정 안내처럼.
          </div>
        </div>

        <div style={{ borderTop: '1px solid #d8d6cd' }}></div>

        {/* Section 3 — WHY (검정 박스, 강조) */}
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '0.16em', color: 'var(--ink)', marginBottom: 14 }}>저희한테 중요한 이유</div>
          <div style={{ padding: '26px 30px', background: 'var(--ink)', color: '#fff', borderRadius: 12 }}>
            <div style={{ fontSize: 26, color: '#fff', lineHeight: 1.55, marginBottom: 14 }}>
              이미 회원 DB가 쌓여있고,<br />
              그 안에서만 도는 구조.
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--yellow)', lineHeight: 1.35 }}>
              저렴하고, 도달률 높음.
            </div>
          </div>
        </div>
      </div>

      {/* 우측 60% — 실제 알림톡 카드 (이미지 그대로 키움) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 14, alignSelf: 'flex-end' }}>실제 발송 — 셀피쉬클럽</div>
        <div style={{
          background: '#fafafa', borderRadius: 18, padding: 16,
          boxShadow: '0 18px 48px rgba(0,0,0,0.12)',
          border: '1px solid #e9e7df',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          maxHeight: '100%', overflow: 'hidden'
        }}>
          <img src="assets/alimtalk-sample.jpg" alt="알림톡 실제 발송 예시" style={{ maxHeight: 800, width: 'auto', borderRadius: 12, display: 'block' }} />
        </div>
      </div>
    </div>
  </Slide>;


// ── 09 · 솔직히 · 저, 알림톡은 잘 몰라요 ────────────
const S09 = () =>
<Slide num={9} total={31} topLeft="솔직히" >
    <div className="kicker">근데 그거 아세요?</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: 48, fontSize: 100 }}>
      저, <span className="hl">알림톡은 잘 몰라요.</span>
    </div>
    <div style={{ fontSize: 32, color: '#444', lineHeight: 1.6, fontWeight: 500, marginBottom: 36 }}>
      셀피쉬클럽 CRM은 채널을 나눠서 운영해요.<br />
      기존에 알림톡은 다른 크루가 맡고 있었어요.
    </div>
    <div style={{ padding: '24px 32px', background: '#f5f5f5', borderRadius: 12, alignSelf: 'flex-start', fontSize: 26, fontWeight: 700, color: 'var(--ink)' }}>
      → AX 들어가면서 같이 들여다보기 시작했어요.
    </div>
  </Slide>;


// ── 10 · BEFORE · 매번 36번의 손 ─────────────────────
const S10 = () =>
<Slide num={10} total={31} topLeft="BEFORE · 들여다보니" >
    <div className="kicker">들여다보니 —</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 24, fontSize: 80 }}>
      알림톡 한 번 보낼 때마다,<br/>
      이걸 매번 다 <span className="hl">챙기고 있더라고요.</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 40, marginTop: 24 }}>
      {[
        { num: '9', label: '개 템플릿', sub: '한 사이클당', hl: false },
        { sym: '×', label: '', sub: '', hl: false, op: true },
        { num: '4', label: '가지 작업', sub: '매번 손으로', hl: false },
        { sym: '=', label: '', sub: '', hl: false, op: true },
        { num: '36', label: '번의 손', sub: '한 사이클당', hl: true, append: '× 매번' }
      ].map((b, i) =>
        b.op ? (
          <div key={i} style={{ fontSize: 80, fontWeight: 300, color: '#bbb', alignSelf: 'flex-end', paddingBottom: 24 }}>{b.sym}</div>
        ) : (
          <div key={i} style={{ flex: '1 1 0', textAlign: 'center', padding: '28px 24px', background: b.hl ? 'var(--yellow)' : '#f3f3f3', borderRadius: 14 }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.2em', color: b.hl ? '#5a5a00' : '#888', marginBottom: 8 }}>{b.sub}</div>
            <div style={{ fontSize: 140, fontWeight: 900, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.04em' }}>{b.num}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>{b.label}</div>
            {b.append && <div style={{ fontSize: 22, fontWeight: 700, color: '#5a5a00', marginTop: 6 }}>{b.append}</div>}
          </div>
        )
      )}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {[
        { k: 'DB', t: '대상자 추출', d: '신청자 / 미신청 / 결제 / 휴면' },
        { k: 'COPY', t: '카피 새로 쓰기', d: '시즌·세그먼트별로 매번' },
        { k: 'LINK', t: 'UTM 링크 만들기', d: 'utm_source · medium · campaign' },
        { k: 'TIME', t: '발송 시각 챙기기', d: '광고성 21–08시 금지 등 규칙' }
      ].map((c, i) =>
        <div key={i} style={{ padding: '32px 32px', border: '1.5px solid #e3e3e3', borderRadius: 14, background: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--ink)', marginBottom: 10 }}>{c.k}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{c.t}</div>
          <div style={{ fontSize: 22, color: '#777', lineHeight: 1.55 }}>{c.d}</div>
        </div>
      )}
    </div>
  </Slide>;


// ── 10 · BEFORE · 모든 사람한테 똑같은 카피 ─────────
const S11 = () =>
<Slide num={11} total={31} topLeft="BEFORE · 진짜 문제" >
    <div className="kicker">근데 더 큰 문제는,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 48, fontSize: 76 }}>
      <span className="hl">모든 사람</span>한테<br />
      <span className="hl">똑같은 카피</span>가 나가고 있었다는 거.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
      {[
        { tag: 'NEW USER', who: '신규 가입 7일' },
        { tag: '단골 (3회+)', who: '매번 신청 중' },
        { tag: '휴면 (6개월+)', who: '오래 안 옴' }
      ].map((c, i) =>
        <div key={i} style={{ padding: '36px 36px', border: '1.5px solid #e3e3e3', borderRadius: 16, background: '#fafafa' }}>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.2em', color: '#888', marginBottom: 10 }}>{c.tag}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', marginBottom: 22 }}>{c.who}</div>
          <div style={{ padding: '22px 24px', background: '#fff', borderLeft: '4px solid #ddd', borderRadius: 6, fontSize: 24, color: '#555', lineHeight: 1.55, fontStyle: 'italic' }}>
            "셀피쉬클럽 첫 공유회 오픈 🎉<br />얼리버드 시작됐어요!"
          </div>
          <div style={{ marginTop: 18, fontSize: 22, color: '#aaa' }}>→ 똑같이.</div>
        </div>
      )}
    </div>
    <div style={{ padding: '36px 44px', background: 'var(--yellow)', borderRadius: 16 }}>
      <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.4 }}>
        소구점은 다 다른데 — <b>카피는 하나.</b><br />
        <span style={{ fontSize: 38, fontWeight: 700 }}>→ 개인화 0%.</span>
      </div>
    </div>
  </Slide>;


window.S01 = S01; window.S02 = S02; window.S03 = S03; window.S04 = S04; window.S05 = S05;
window.S06 = S06; window.S07 = S07; window.S08 = S08; window.S09 = S09; window.S10 = S10; window.S11 = S11;