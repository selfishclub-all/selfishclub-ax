// v13 · slides-1 — S01-S09: INTRO + WHY(AX→CRM자리→채널→알림톡부터) + 알림톡 정의

// ── 01 · 타이틀 ───────────────────────────────────────
const S01 = () =>
<Slide num={1} total={27} theme="dark" topLeft="INTRO" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="kicker" style={{ color: 'var(--yellow)', opacity: 0.95 }}>CRM AX · CASE STUDY</div>
      <div className="h-hero" style={{ fontSize: 138, fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.04em' }}>
        <div>매일 아침,</div>
        <div style={{ fontWeight: 800 }}>
          AI가{' '}
          <span style={{ background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.08em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>알림톡</span>을
        </div>
        <div>들고 옵니다.</div>
      </div>
      <div style={{ marginTop: 64, fontSize: 24, color: 'rgba(255,255,255,0.55)', fontWeight: 400, letterSpacing: '-0.01em' }}>
        에밀리 · 셀피쉬클럽 · CRM AX 담당 &nbsp;·&nbsp; AAA 공유회 · 2026.04.28
      </div>
    </div>
  </Slide>;


// ── 02 · 목차 ─────────────────────────────────────────
const S02 = () =>
<Slide num={2} total={27} topLeft="목차" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 80, height: '100%', alignItems: 'center' }}>
      <div className="h-l" style={{ flex: '0 0 360px', fontWeight: 800, lineHeight: 1.0, fontSize: 64 }}>
        오늘<br />드릴<br />이야기.
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          ['01', 'WHO', '에밀리 — CRM AX 담당'],
          ['02', 'TAKEAWAY', '오늘 가져가셨으면 하는 3가지'],
          ['03', 'WHY', '셀피쉬 AX → CRM AX → 알림톡부터'],
          ['04', '문제', '알림톡이 뭐고, 뭐가 문제였나'],
          ['05', 'WHAT', '하루 3시간 → 5분'],
          ['06', 'HOW', 'OMC 인터뷰 · CLAUDE.md · n8n · 슬랙 · 8명'],
          ['07', 'NEXT', '다음 채널들 · 6주 전 / 지금']].
          map(([n, k, t]) =>
          <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 24, paddingBottom: 14, borderBottom: '1px solid #e8e8e8' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#bbb', letterSpacing: '0.1em', minWidth: 48 }}>{n}</div>
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--ink)', minWidth: 96, padding: '4px 10px', background: 'var(--yellow)', borderRadius: 4, textAlign: 'center' }}>{k}</div>
            <div style={{ flex: 1, fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>{t}</div>
          </div>
        )}
      </div>
    </div>
  </Slide>;


// ── 03 · WHO ─────────────────────────────────────────
const S03 = () =>
<Slide num={3} total={27} theme="light" topLeft="WHO" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 72, alignItems: 'center', height: '100%' }}>
      <div style={{ flex: 1 }}>
        <div className="kicker" style={{ marginBottom: 20 }}>WHO</div>
        <div className="h-hero" style={{ fontSize: 156, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' }}>
          에밀리<span style={{ color: 'var(--yellow)' }}>.</span>
        </div>
        <div style={{ marginTop: 36, fontSize: 30, fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em' }}>
          <div>셀피쉬클럽 마케터 · CRM AX 담당</div>
          <div style={{ color: '#888', fontSize: 22, fontWeight: 500, marginTop: 6 }}>그로스 · 콘텐츠 · 운영을 한 사람이 굴리는 인하우스</div>
        </div>
        <div style={{ marginTop: 28, fontSize: 20, color: '#555', lineHeight: 1.65, maxWidth: 600 }}>
          원래 알림톡 담당은 아니었어요. 다른 채널을 굴리고 있었고, 셀피쉬 AX 시작하면서<br />
          알림톡 자동화를 맡게 됐습니다. — <b>그래서 알림톡이 뭔지부터 정리해야 했어요.</b>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {[{ t: '인하우스' }, { t: '풀스택 마케터' }, { t: '효율충', hl: true }, { t: 'AX 신참' }, { t: 'CRM 초보' }].map((tag) =>
            <span key={tag.t} style={{
              padding: '10px 20px', border: tag.hl ? 'none' : '1.5px solid #e0e0e0',
              background: tag.hl ? 'var(--yellow)' : 'transparent', borderRadius: 999,
              fontSize: 20, fontWeight: 500, color: tag.hl ? 'var(--yellow-ink)' : '#666'
            }}>#{tag.t}</span>
          )}
        </div>
      </div>
      <div style={{ flex: '0 0 420px' }}>
        <div style={{ width: 420, height: 520, borderRadius: 22, background: 'var(--surface)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <img src="assets/emily.png" alt="emily" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 16, letterSpacing: '0.24em', fontWeight: 600, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>EMILY</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 04 · TAKEAWAY (오늘 가져가셨으면 하는 3가지) ──────
const S04 = () => {
  const items = [
    { n: '01', t: '마케터가 개발 역량 없이\n운영 자동화를 만든 과정.', tag: '만들기' },
    { n: '02', t: '클로드와 같이\n기획하고 명세하는 구조.', tag: '기획하기' },
    { n: '03', t: 'AI에 다 맡기지 않고,\n사람이 승인하는 흐름.', tag: '통제하기' }];
  return (
    <Slide num={4} total={27} theme="light" topLeft="TAKEAWAY" topRight="EMILY · SELFISH CLUB · AAA">
      <div className="kicker">오늘 이 자리에서,</div>
      <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 48, fontSize: 72 }}>
        가져가셨으면 하는 <span className="hl">3가지.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {items.map((it, i) =>
          <div key={i} style={{
            padding: '36px 32px 40px',
            background: i === 1 ? 'var(--ink)' : '#f7f7f5',
            color: i === 1 ? '#fff' : 'var(--ink)',
            borderRadius: 16,
            minHeight: 340,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div>
              <div style={{
                fontSize: 72, fontWeight: 900, lineHeight: 1,
                color: i === 1 ? 'var(--yellow)' : 'var(--ink)',
                marginBottom: 22, letterSpacing: '-0.02em'
              }}>{it.n}</div>
              <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.45, whiteSpace: 'pre-line', letterSpacing: '-0.02em' }}>
                {it.t}
              </div>
            </div>
            <div style={{
              alignSelf: 'flex-start',
              fontSize: 12, fontWeight: 900, letterSpacing: '0.24em',
              padding: '6px 12px',
              background: i === 1 ? 'var(--yellow)' : 'var(--ink)',
              color: i === 1 ? 'var(--ink)' : 'var(--yellow)',
              borderRadius: 4
            }}>{it.tag.toUpperCase()}</div>
          </div>
        )}
      </div>
    </Slide>);
};


// ── 05 · WHY 큰 그림: 셀피쉬 AX ────────────────────────
const S05 = () =>
<Slide num={5} total={27} theme="dark" topLeft="WHY · 큰 그림" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'var(--yellow)', opacity: 0.9 }}>03. WHY</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.04, marginBottom: 32, fontSize: 80 }}>
      셀피쉬클럽이<br />
      <span style={{ color: 'var(--yellow)' }}>AX로 가기로 했어요.</span>
    </div>
    <div className="body" style={{ fontSize: 22, color: '#bbb', lineHeight: 1.55, marginBottom: 44, maxWidth: 1300 }}>
      운영 전체를 에이전트화 — 홈페이지·결제·CRM·캠페인까지.<br />
      그 안에서 제가 맡은 건 <b style={{ color: '#fff' }}>CRM AX</b>.
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ padding: '18px 24px', background: 'rgba(255,255,255,0.06)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)' }}>SELFISH CLUB AX</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#ddd', marginTop: 4 }}>운영 전체</div>
      </div>
      <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.4)' }}>→</div>
      <div style={{ padding: '18px 24px', background: 'var(--yellow)', borderRadius: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--ink)' }}>MY PART</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginTop: 4 }}>CRM AX</div>
      </div>
    </div>
  </Slide>;


// ── 06 · CRM이 다루던 채널들 (페인) ────────────────────
const S06 = () =>
<Slide num={6} total={27} topLeft="WHY · 페인" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">CRM이 원래 다루던 게 이만큼이었어요,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 36, fontSize: 68 }}>
      공유회 한 번 열리면 — <br />
      <span className="hl">이만큼 나가야 함.</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
      {[
        { c: '카카오 알림톡', d: '신청·결제·입장 안내 + 마케팅' },
        { c: '카카오 플러스 친구', d: '오픈/마감 시즌마다 새 배너 + 카피' },
        { c: '이메일', d: '뉴스레터 + 결제 영수증' },
        { c: '오픈채팅방', d: '오픈/마감 공지 · 안내 · Q&A' },
        { c: '인스타 피드', d: '오픈 알림 + 후기 큐레이션' },
        { c: '온드 미디어', d: '리틀리 / 소식 / 웰컴 / 대화방 메뉴' }].
        map((ch, i) =>
        <div key={i} style={{ padding: '18px 22px', background: '#f5f5f5', borderRadius: 10 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>{ch.c}</div>
          <div style={{ fontSize: 15, color: '#666', lineHeight: 1.45 }}>{ch.d}</div>
        </div>
      )}
    </div>
    <div style={{ padding: '18px 24px', background: 'var(--ink)', color: '#fff', borderRadius: 10, display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 800 }}>전부 수동 발송 · 매번 새 콘텐츠 · 신청자/미신청자 일일이 분류.</div>
      <div style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)' }}>개인화 0%</div>
    </div>
  </Slide>;


// ── 07 · 일단 알림톡부터 ────────────────────────────
const S07 = () =>
<Slide num={7} total={27} theme="yellow" topLeft="WHY · 시작점" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">한 번에 다 자동화는 무리,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 40, fontSize: 88 }}>
      그래서 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>알림톡부터</span>.
    </div>
    <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
      {[
        { n: '이유 1', t: '가장 자주 나감', d: '공유회 1건당 11개 메시지 × 매주.' },
        { n: '이유 2', t: '규칙이 명확', d: '정보성/광고성, 발송시간, 템플릿 — 자동화 가능.' },
        { n: '이유 3', t: '시간을 가장 잡아먹음', d: '여기 풀면 다른 채널의 베이스가 생김.' }].
        map((c, i) =>
        <div key={i} style={{ flex: 1, padding: '24px 28px', background: 'rgba(0,0,0,0.06)', borderRadius: 12 }}>
          <div className="cap" style={{ fontSize: 13, marginBottom: 8, color: '#3a3b00' }}>{c.n}</div>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.4, color: 'var(--ink)' }}>{c.t}</div>
          <div style={{ fontSize: 16, color: '#3a3b00', marginTop: 6, lineHeight: 1.5 }}>{c.d}</div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 24, fontSize: 18, color: '#3a3b00', lineHeight: 1.55 }}>
      ※ 다른 채널들(이메일·오픈채팅·인스타·배너) 자동화는 <b>5월 셀피쉬 AX 공유회</b>에서.
    </div>
  </Slide>;


// ── 08 · 알림톡이 뭐냐면 ────────────────────────────
const S08 = () =>
<Slide num={8} total={27} topLeft="용어 풀이" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 그 알림톡이 뭐냐면,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 40, fontSize: 70 }}>
      카카오톡 <span className="hl">비즈니스 메시지</span>.
    </div>
    <div style={{ display: 'flex', gap: 22 }}>
      <div className="card" style={{ flex: 1, padding: 32 }}>
        <div className="tag" style={{ marginBottom: 14 }}>정보성</div>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>신청 / 결제 / 입장 안내</div>
        <div style={{ fontSize: 18, color: '#666', lineHeight: 1.55 }}>신청한 사람한테만 나감.<br />동의 없이도 발송 가능.</div>
      </div>
      <div className="card" style={{ flex: 1, padding: 32 }}>
        <div className="tag" style={{ marginBottom: 14 }}>광고성</div>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>마케팅 푸시</div>
        <div style={{ fontSize: 18, color: '#666', lineHeight: 1.55 }}>광고 수신 동의자에게만.<br />야간 발송 제한 등 규칙 있음.</div>
      </div>
      <div className="card y" style={{ flex: 1, padding: 32 }}>
        <div className="tag" style={{ marginBottom: 14 }}>오늘의 주인공</div>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, marginBottom: 12, color: 'var(--ink)' }}>둘 다, 자동으로.</div>
        <div style={{ fontSize: 18, color: '#3a3b00', lineHeight: 1.55 }}>신청자엔 안내, 회원엔 마케팅.<br />시간 맞춰서.</div>
      </div>
    </div>
    <div className="cap" style={{ marginTop: 24, fontSize: 16 }}>
      ※ 유료 발송. 템플릿 사전 승인 필요. 변수 매칭 필수.
    </div>
  </Slide>;


// ── 09 · 솔직한 출발: 나도 잘 몰랐음 ──────────────────
const S09 = () =>
<Slide num={9} total={27} theme="light" topLeft="솔직한 출발" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">고백 하나,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 40, fontSize: 88 }}>
      근데 저도 알림톡,<br />
      <span style={{ textDecoration: 'line-through', textDecorationThickness: 4, color: '#aaa' }}>잘 알았던 거</span> 아닙니다.
    </div>
    <div style={{ display: 'flex', gap: 28 }}>
      <div className="card" style={{ flex: 1, padding: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 12 }}>WEEK 0</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.45 }}>
          정보성과 광고성이 <br /><b>다른지도 몰랐어요.</b>
        </div>
        <div style={{ fontSize: 18, color: '#666', lineHeight: 1.55, marginTop: 14 }}>
          "이거 어떻게 보내지?"부터 검색.
        </div>
      </div>
      <div className="card" style={{ flex: 1, padding: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 12 }}>WEEK 1</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.45 }}>
          첫 일은 — <span className="hl">템플릿 9종 전수조사.</span>
        </div>
        <div style={{ fontSize: 18, color: '#666', lineHeight: 1.55, marginTop: 14 }}>
          SOLAPI에 흩어진 9종을 다 까봤습니다.<br />
          정리해서 → PRD 파일로 → 클로드에게.
        </div>
      </div>
      <div className="card k" style={{ flex: 1, padding: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 12 }}>그래서 이번 발표는</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.45, color: '#fff' }}>
          전문가가 만든 게 아니라 <br />
          <span style={{ color: 'var(--yellow)' }}>초보가 클로드와 같이 만든 거.</span>
        </div>
      </div>
    </div>
  </Slide>;


window.S01 = S01; window.S02 = S02; window.S03 = S03; window.S04 = S04;
window.S05 = S05; window.S06 = S06; window.S07 = S07; window.S08 = S08;
window.S09 = S09;
