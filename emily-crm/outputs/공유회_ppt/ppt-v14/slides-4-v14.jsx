// v14 · slides-4 — S25-S29: 분업(브리지 추가) + 6주전/지금 + 혼자였으면 + NEXT + Thanks

// ── 25 · HOW · 분업: "클로드 한 명이 다 한 것 같죠?" 흐름 다리 추가 ──
const S25 = () =>
<Slide num={25} total={29} topLeft="HOW · 분업" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">여기까지 보면 — 클로드 한 명이 다 한 것 같죠?</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 36, fontSize: 76 }}>
      근데 안에서는 — <span className="hl">역할별로 쪼개놨어요.</span>
    </div>
    <div style={{ fontSize: 22, color: '#555', lineHeight: 1.55, marginBottom: 32 }}>
      OMC 인터뷰하다 클로드가 먼저 제안했어요 — <b style={{ color: 'var(--ink)' }}>"한 명이 다 하면 톤·검수·발송이 다 흐려져요. 쪼개죠."</b><br />
      그래서 이렇게 분업했습니다.
    </div>
    <div style={{ display: 'flex', gap: 18, alignItems: 'stretch', marginBottom: 32 }}>
      {[
        { tag: '기획', name: 'PM Claude', desc: 'OMC 인터뷰·PRD 정리' },
        { tag: '카피', name: 'Writer Claude', desc: '세그먼트별 톤 맞춰 작성' },
        { tag: '검수', name: 'Reviewer Claude', desc: '톤·규정 위반 자동 반려' },
        { tag: '발송', name: 'Dispatcher Claude', desc: 'SOLAPI · Slack 모달' },
        { tag: '데이터', name: 'Analyst Claude', desc: '결과 정리·주간 리포트' }].
        map((a, i) =>
        <div key={i} style={{ flex: 1, padding: '22px 22px', background: '#f5f5f5', borderRadius: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 10 }}>{a.tag}</div>
          <div style={{ fontSize: 19, fontWeight: 900, color: 'var(--ink)', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>{a.name}</div>
          <div style={{ fontSize: 15, color: '#555', lineHeight: 1.5 }}>{a.desc}</div>
        </div>
      )}
    </div>
    <div style={{ padding: '20px 28px', background: 'var(--ink)', color: '#fff', borderRadius: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.45 }}>
        한 명한테 다 시키면 흐려져요. <span style={{ color: 'var(--yellow)', fontWeight: 900 }}>역할별로 나누면 — 각자 더 잘함.</span>
      </div>
    </div>
  </Slide>;


// ── 26 · CLOSE · 6주 전 vs 지금 ────────────────────────
const S26 = () =>
<Slide num={26} total={29} topLeft="CLOSE · 돌아보며" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">돌아보면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 64, fontSize: 88 }}>
      6주 전과 지금.
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '40px 48px 40px 0', borderRight: '1px solid #e6e6e6' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.2em', color: '#bbb', marginBottom: 16 }}>6주 전</div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3, marginBottom: 28, color: '#888' }}>
          알림톡이 정보성/광고성<br />다른지도 몰랐음.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 22, color: '#999' }}>
          <div>· "이거 어떻게 보내지?"부터 검색</div>
          <div>· 매번 손으로 발송시간 체크</div>
          <div>· 같은 카피, 같은 사람들</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px 0 40px 48px' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--ink)', marginBottom: 16 }}>지금</div>
        <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.3, marginBottom: 28 }}>
          알림톡 시스템을 <br /><span className="hl">직접 만들어서 굴림.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 22, color: '#444' }}>
          <div>· 매일 11시에 알아서 돔</div>
          <div>· 슬랙으로 승인만 누르면 끝</div>
          <div>· 세그먼트별로 카피가 다름</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 27 · CLOSE · 혼자였으면 ──────────────────────────
const S27 = () =>
<Slide num={27} total={29} topLeft="CLOSE" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="h-hero" style={{ fontWeight: 800, lineHeight: 1.1, fontSize: 120, letterSpacing: '-0.03em', marginBottom: 56 }}>
      <div>혼자였으면</div>
      <div><span className="hl">여기까지 못 왔고,</span></div>
      <div><span className="hl">앞으로도 못 간다.</span></div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 24, color: '#444', lineHeight: 1.7, maxWidth: 1500 }}>
      <div>
        클로드 코드가 실행을 도와줬지만,<br />
        <b style={{ color: 'var(--ink)' }}>방향을 잡아준 건 매주 공유하고 피드백을 주고받은 팀</b>이었습니다.
      </div>
      <div>
        <b style={{ color: 'var(--ink)' }}>다다</b>의 아카이빙 구조를 보고 워크로그 스킬을 만들었고,<br />
        <b style={{ color: 'var(--ink)' }}>크루들</b>의 피드백을 받고 슬랙 카드를 전면 리뉴얼했습니다.<br />
        그리고 에밀리의 CRM 자동화는 이후 셀피쉬클럽에 직접 붙여보려고 합니다.
      </div>
      <div style={{ marginTop: 8 }}>
        혼자 만드는 건 혼자의 최대치지만,<br />
        <b style={{ color: 'var(--ink)' }}>이기적으로 공유하면 조 전체의 시야가 내 시야가 됩니다.</b>
      </div>
    </div>
  </Slide>;


// ── 28 · NEXT · 다음 채널들도 차례로 ──────────────────
const S28 = () =>
<Slide num={28} total={29} theme="yellow" topLeft="NEXT" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">알림톡은 첫 한 칸이었고,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 84 }}>
      이제 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>다른 채널들</span>도<br />
      차례로 자동화.
    </div>
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
      {[
        { c: '카카오 알림톡', s: 'DONE' },
        { c: '카카오 플러스친구 배너', s: 'NEXT' },
        { c: '이메일', s: 'NEXT' },
        { c: '인스타 피드', s: 'TODO' },
        { c: '오픈채팅방', s: 'TODO' }].
        map((ch, i) => {
          const done = ch.s === 'DONE';
          const next = ch.s === 'NEXT';
          return (
            <div key={i} style={{
              padding: '18px 26px',
              background: done ? 'var(--ink)' : next ? '#fff' : 'transparent',
              color: done ? 'var(--yellow)' : 'var(--ink)',
              border: done ? 'none' : next ? '2px solid var(--ink)' : '1.5px dashed rgba(0,0,0,0.3)',
              borderRadius: 10,
              display: 'flex', gap: 14, alignItems: 'center'
            }}>
              <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.18em', opacity: done || next ? 1 : 0.5 }}>{ch.s}</span>
              <span style={{ fontSize: 24, fontWeight: 800 }}>{ch.c}</span>
            </div>);
        }
      )}
    </div>
    <div className="body" style={{ fontSize: 26, color: '#3a3b00', lineHeight: 1.6, maxWidth: 1500 }}>
      알림톡에서 만든 구조 — <b>OMC 인터뷰 → CLAUDE.md → n8n → 슬랙 승인 → 서브에이전트</b> — 를<br />
      그대로 다른 채널에 옮길 수 있어요.<br /><br />
      <b>각 채널 자동화한 얘기는 다음 AX 공유회에서 들고 돌아올게요.</b>
    </div>
  </Slide>;


// ── 29 · 감사합니다 (closing) ─────────────────────────
const S29 = () =>
<Slide num={29} total={29} topLeft="" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
      <div className="h-hero" style={{ fontSize: 220, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em' }}>
        감사합니다<span style={{ color: 'var(--yellow)' }}>.</span>
      </div>
      <div style={{ marginTop: 64, fontSize: 30, fontWeight: 600, color: '#666', letterSpacing: '0.04em' }}>
        에밀리 · 셀피쉬클럽 CRM · AAA 공유회
      </div>
      <div style={{ marginTop: 32, padding: '12px 28px', background: 'var(--yellow)', borderRadius: 999, fontSize: 22, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--ink)' }}>
        Q & A
      </div>
    </div>
  </Slide>;


window.S25 = S25; window.S26 = S26; window.S27 = S27; window.S28 = S28; window.S29 = S29;
