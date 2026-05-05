// v12 · slides-1 — S01-S08

// ── 01 · 타이틀 ───────────────────────────────────────
const S01 = () =>
<Slide num={1} total={29} theme="light" topLeft="INTRO" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="h-hero" style={{ fontSize: 150, fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.04em' }}>
        <div>매일 아침,</div>
        <div style={{ fontWeight: 700 }}>
          AI가{' '}
          <span style={{ background: 'var(--yellow)', padding: '0 0.08em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>알림톡</span>을
        </div>
        <div>들고 옵니다.</div>
      </div>
      <div style={{ marginTop: 80, fontSize: 28, color: '#a8a8a8', fontWeight: 400, letterSpacing: '-0.01em' }}>
        에밀리 · 셀피쉬클럽 CRM PM &nbsp;·&nbsp; AAA 공유회 · 2026.04.28
      </div>
    </div>
  </Slide>;


// ── 02 · 목차 (단순화) ────────────────────────────────
const S02 = () =>
<Slide num={2} total={29} topLeft="목차" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 120, height: '100%', alignItems: 'center' }}>
      <div className="h-hero" style={{ flex: '0 0 480px', fontWeight: 800, lineHeight: 1.0, fontSize: 110, letterSpacing: '-0.03em' }}>
        오늘<br /><span className="hl">이야기.</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {[
      ['01', 'WHY', 'CRM 자동화를 하게 된 이유'],
      ['02', 'WHAT', '자동화로 바뀐 일하는 방식'],
      ['03', 'HOW', '실제로 만든 과정'],
      ['04', 'NEXT', '앞으로 자동화할 것들']].
      map(([n, k, t]) =>
      <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 40, paddingBottom: 32, borderBottom: '1.5px solid #e0e0e0' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#ccc', letterSpacing: '0.1em', minWidth: 56 }}>{n}</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.24em', color: 'var(--ink)', minWidth: 130, padding: '8px 14px', background: 'var(--yellow)', borderRadius: 4, textAlign: 'center' }}>{k}</div>
            <div style={{ flex: 1, fontSize: 44, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{t}</div>
          </div>
      )}
      </div>
    </div>
  </Slide>;


// ── 03 · WHO ─────────────────────────────────────────
const S03 = () =>
<Slide num={3} total={29} theme="light" topLeft="WHO" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 80, alignItems: 'center', height: '100%' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 24 }}>WHO</div>
        <div className="h-hero" style={{ fontSize: 180, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' }}>
          에밀리<span style={{ color: 'var(--yellow)' }}>.</span>
        </div>
        <div style={{ marginTop: 48, fontSize: 36, fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em' }}>
          <div>셀피쉬클럽 CRM PM</div>
          <div style={{ color: '#666', fontSize: 28, fontWeight: 500, marginTop: 8 }}>인하우스 풀스택 마케터</div>
        </div>
        <div style={{ marginTop: 32, fontSize: 22, color: '#555', lineHeight: 1.65, maxWidth: 640 }}>
          퍼포먼스·그로스 마케터입니다.<br />
          퍼널을 구축하고, AI로 운영 효율을 높여요.<br />
          셀피쉬클럽에서는 CRM을 맡고있어요.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
          {[{ t: '퍼포먼스' }, { t: '그로스' }, { t: 'ops' }, { t: '효율충', hl: true }, { t: '데이터자동화' }].map((tag) =>
        <span key={tag.t} style={{
          padding: '12px 24px', border: tag.hl ? 'none' : '1.5px solid #e0e0e0',
          background: tag.hl ? 'var(--yellow)' : 'transparent', borderRadius: 999,
          fontSize: 24, fontWeight: 500, color: tag.hl ? 'var(--yellow-ink)' : '#666'
        }}>#{tag.t}</span>
        )}
        </div>
      </div>
      <div style={{ flex: '0 0 480px' }}>
        <div style={{ width: 480, height: 580, borderRadius: 24, background: 'var(--surface)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <img src="assets/emily.png" alt="emily" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
          <div style={{ position: 'absolute', bottom: 24, left: 24, fontSize: 18, letterSpacing: '0.24em', fontWeight: 600, color: '#fff' }}>EMILY</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 04 · TAKEAWAY (가로 1·2·3 텍스트만) ───────────────
const S04 = () => {
  const items = [
  { n: '01', t: '마케터가 개발 역량 없이 운영 자동화를 구축한 과정.' },
  { n: '02', t: '클로드와 함께 프로젝트를 기획하고 명세화하는 구조.' },
  { n: '03', t: 'AI에게 모든 권한을 넘기지 않고, 사람이 승인하는 운영 구조.' }];

  return (
    <Slide num={4} total={29} theme="light" topLeft="TAKEAWAY" topRight="EMILY · SELFISH CLUB · AAA">
      <div className="kicker">오늘 이 자리에서,</div>
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 80, fontSize: 88 }}>
        가져가셨으면 하는 <span className="hl">3가지.</span>
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


// ── 05 · WHY: 셀피쉬클럽 AX → CRM AX ─────────────────
const S05 = () =>
<Slide num={5} total={29} theme="light" topLeft="WHY" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">왜 자동화 했냐면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.04, marginBottom: 56, fontSize: 88 }}>
      셀피쉬클럽이<br />
      <span className="hl">AX로 가기로 했어요.</span>
    </div>
    <div className="body" style={{ fontSize: 28, color: '#555', lineHeight: 1.55, marginBottom: 56, maxWidth: 1400 }}>
      운영 전체를 에이전트화 — 홈페이지·결제·CRM·캠페인까지.<br />
      그 안에서 제가 맡은 건, <b style={{ color: 'var(--ink)' }}>CRM AX</b>.
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ padding: '24px 32px', background: '#f3f3f3', borderRadius: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999' }}>SELFISH CLUB AX</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#444', marginTop: 6 }}>운영 전체</div>
      </div>
      <div style={{ fontSize: 32, color: '#bbb' }}>→</div>
      <div style={{ padding: '24px 32px', background: 'var(--yellow)', borderRadius: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--ink)' }}>MY PART</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', marginTop: 6 }}>CRM AX</div>
      </div>
    </div>
  </Slide>;


// ── 06 · CRM 채널 5개 (간소화) ────────────────────────
const S06 = () =>
<Slide num={6} total={29} topLeft="WHY" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">CRM이 다루던 채널이 이만큼,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 76 }}>
      공유회 한 번 열리면 — <br />
      <span className="hl">이만큼 나가야 함.</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 40 }}>
      {[
    '카카오 알림톡',
    '카카오 플러스친구 배너',
    '이메일',
    '인스타 피드',
    '오픈 채팅방'].
    map((c, i) =>
    <div key={i} style={{
      padding: '36px 20px',
      background: '#f5f5f5',
      borderRadius: 12,
      textAlign: 'center',
      minHeight: 140,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35 }}>{c}</div>
        </div>
    )}
    </div>
    <div style={{ padding: '32px 40px', background: 'var(--yellow)', borderRadius: 12 }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.45 }}>
        전부 수동 발송.<br />
        매번 콘텐츠 새로 만들고, DB 분류하고, 오픈/마감마다 또 새로 제작.
      </div>
    </div>
  </Slide>;


// ── 07 · 일단 알림톡부터 ────────────────────────────
const S07 = () =>
<Slide num={7} total={29} theme="yellow" topLeft="WHY" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">한 번에 다 자동화는 무리,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 100 }}>
      그래서 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>알림톡부터</span>.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
      {[
    { n: '이유 1', t: '가장 자주 나감', d: '공유회 1건당 9개 메시지 × 매주.' },
    { n: '이유 2', t: '규칙이 명확', d: '정보성/광고성, 발송시간, 템플릿 — 자동화 가능.' },
    { n: '이유 3', t: '맞춤 메시지에 최적', d: '모두 똑같이 말고, 사람마다 다르게.' }].
    map((c, i) =>
    <div key={i} style={{ flex: 1, padding: '32px 32px', background: 'rgba(0,0,0,0.06)', borderRadius: 12 }}>
          <div className="cap" style={{ fontSize: 14, marginBottom: 12, color: '#3a3b00' }}>{c.n}</div>
          <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.35, color: 'var(--ink)' }}>{c.t}</div>
          <div style={{ fontSize: 20, color: '#3a3b00', marginTop: 10, lineHeight: 1.5 }}>{c.d}</div>
        </div>
    )}
    </div>
    <div style={{ marginTop: 32, fontSize: 22, color: '#3a3b00', lineHeight: 1.55 }}>
      ※ 다른 채널들(이메일·오픈채팅·인스타·배너) 자동화는 <b>다음 AX 공유회</b>에서.
    </div>
  </Slide>;


// ── 08 · 처음엔 막막했어요 (v11 스타일) ───────────
const S08 = () =>
<Slide num={8} total={29} topLeft="WHY" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">처음엔 막막했어요,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 64, fontSize: 88, letterSpacing: '-0.02em' }}>
      알림톡이 <span style={{ color: '#bbb' }}>대체 몇 개고,</span><br />
      <span style={{ color: '#bbb' }}>어디서 어디로 흘러가는지</span> 몰랐어요.
    </div>
    <div style={{ display: 'flex', gap: 32, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '32px 36px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 16 }}>그래서 한 일 — 1단계</div>
        <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.35, color: 'var(--ink)', marginBottom: 14 }}>
          알림톡 템플릿을<br />
          전부 다 정리.
        </div>
        <div style={{ fontSize: 20, color: '#666', lineHeight: 1.6 }}>
          어떤 트리거에 무슨 메시지가 나가는지, 정보성/광고성 분류, 발송 시각.<br />
          피그마에 하나씩 다 정리했어요.
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px 36px' }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 16 }}>그래서 한 일 — 2단계</div>
        <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.35, color: 'var(--ink)', marginBottom: 14 }}>
          그걸 그대로<br />
          <span className="hl">클로드한테 넣었음.</span>
        </div>
        <div style={{ fontSize: 20, color: '#666', lineHeight: 1.6 }}>
          "이 템플릿들을 자동으로 보내고 싶어." 부터 출발.<br />
          내가 모르는 건 클로드가 계속 짚어줬어요.
        </div>
      </div>
    </div>
  </Slide>;


// ── 09 · 알림톡이 뭐냐면 (가두리망) ──────────────────
const S09 = () =>
<Slide num={9} total={29} topLeft="용어 풀이" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 그 알림톡이 뭐냐면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 48, fontSize: 84 }}>
      카카오톡으로 오는 <br />
      <span className="hl">비즈니스 메시지.</span>
    </div>
    <div style={{ display: 'flex', gap: 32, alignItems: 'stretch', marginBottom: 32 }}>
      <div style={{ flex: 1, padding: '36px 40px', background: '#f5f5f5', borderRadius: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: '#888', marginBottom: 14 }}>WHAT</div>
        <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.4, color: 'var(--ink)', marginBottom: 14 }}>
          내 번호를 가진 회원에게,<br />
          카카오톡으로 직접 보내는 메시지.
        </div>
        <div style={{ fontSize: 20, color: '#555', lineHeight: 1.6 }}>
          신청·결제 안내(정보성) + 마케팅 푸시(광고성) 둘 다 가능.<br />
          템플릿은 카카오 사전 승인 필수.
        </div>
      </div>
      <div style={{ flex: 1, padding: '36px 40px', background: 'var(--ink)', color: '#fff', borderRadius: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 14 }}>WHY 알림톡?</div>
        <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.35, marginBottom: 14 }}>
          셀피쉬클럽엔 회원 DB가 쌓여 있음.<br />
          <span style={{ color: 'var(--yellow)' }}>그 안에서만 메시지를 도는 구조 = 가두리망.</span>
        </div>
        <div style={{ fontSize: 20, color: '#bbb', lineHeight: 1.6 }}>
          광고 없이, 이미 우리 회원한테만 — 그래서 <b style={{ color: '#fff' }}>저렴하고 도달률이 높음.</b>
        </div>
      </div>
    </div>
  </Slide>;


window.S01 = S01;window.S02 = S02;window.S03 = S03;window.S04 = S04;
window.S05 = S05;window.S06 = S06;window.S07 = S07;window.S08 = S08;
window.S09 = S09;
window.S05 = S05;window.S06 = S06;window.S07 = S07;window.S08 = S08;