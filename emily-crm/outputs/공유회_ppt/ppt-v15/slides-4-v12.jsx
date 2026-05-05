// v15 · slides-4 — S28-S31: 6주전/지금 + 혼자였으면 + NEXT + Thanks
// (S27·S28은 slides-3로 이동되었음 — n8n×Slack 연결 + 7일 한 바퀴)

// ── 28 · CLOSE · 6주 전 vs 지금 ────────────────────────
const S28 = () =>
<Slide num={28} total={31} topLeft="CLOSE · 돌아보며">
    <div className="kicker">돌아보면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 64, fontSize: 88 }}>
      6주 전과 지금.
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '48px 56px 48px 0', borderRight: '1.5px solid #e6e6e6' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '0.22em', color: '#bbb', marginBottom: 20 }}>6주 전</div>
        <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.3, marginBottom: 32, color: '#888', minHeight: 180 }}>
          알림톡,<br />어떻게 시작해야 할지<br />막막했음.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 28, color: '#999', lineHeight: 1.45 }}>
          <div>· 매번 처음부터 검색</div>
          <div>· 발송시간도 손으로 체크</div>
          <div>· 같은 사람들에게 동일 카피, 개인화 0%</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '48px 0 48px 56px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '0.22em', color: 'var(--ink)', marginBottom: 20 }}>지금</div>
        <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.3, marginBottom: 32, minHeight: 180 }}>
          알림톡 시스템을<br /><span className="hl">직접 만들어서 굴림.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 28, color: '#333', lineHeight: 1.45 }}>
          <div>· 매일 11시에 알아서 돔</div>
          <div>· 슬랙으로 승인만 누르면 끝</div>
          <div>· 이제 개인화를 시킬 단계</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 29 · CLOSE · 혼자였으면 ──────────────────────────
const S29 = () =>
<Slide num={29} total={31} topLeft="CLOSE">
    <div className="h-hero" style={{ fontWeight: 800, lineHeight: 1.1, fontSize: 110, letterSpacing: '-0.03em', marginBottom: 48 }}>
      <div>혼자였으면</div>
      <div><span className="hl">진짜 완성 못 했다.</span></div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 26, color: '#444', lineHeight: 1.7, maxWidth: 1700 }}>
      <div>
        결국 자동화와 알림톡 개인화 메시지, <b style={{ color: 'var(--ink)' }}>더 나은 CRM</b>을 위해 시작한 일이었지만,<br />
        팀이 없었다면 이 알림톡을 어떻게 디벨롭해 나갈지 막막했을 거예요.
      </div>
      <div>
        팀원들이 아니었으면 사용해보지 못했을 다양한 스킬들을 공유받으며 프로젝트를 더 발전시킬 수 있었고,<br />
        무엇보다 — AI와 일하며 막막하고 혼자 삽질하던 순간에도 <b style={{ color: 'var(--ink)' }}>끝까지 포기하지 않고 나아갈 수 있었던 건 함께하는 팀원들 덕분</b>이었어요.
      </div>
      <div style={{ marginTop: 12, padding: '28px 32px', background: 'var(--yellow)', borderRadius: 14, fontWeight: 700, fontSize: 30, color: 'var(--ink)', lineHeight: 1.55 }}>
        지금 셀피쉬클럽에서 AX를 함께하며 언제든 피드백해주고 도와주는 크루들이 있기에 — <br />
        <b>나는 이 프로젝트를 완성시킬 자신이 있다.</b>
      </div>
    </div>
  </Slide>;


// ── 30 · NEXT · 다음 채널들도 차례로 ──────────────────
const S30 = () =>
<Slide num={30} total={31} theme="yellow" topLeft="NEXT">
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
              padding: '24px 32px',
              background: done ? 'var(--ink)' : next ? '#fff' : 'transparent',
              color: done ? 'var(--yellow)' : 'var(--ink)',
              border: done ? 'none' : next ? '2px solid var(--ink)' : '1.5px dashed rgba(0,0,0,0.3)',
              borderRadius: 12,
              display: 'flex', gap: 18, alignItems: 'center'
            }}>
              <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.18em', opacity: done || next ? 1 : 0.5 }}>{ch.s}</span>
              <span style={{ fontSize: 30, fontWeight: 800 }}>{ch.c}</span>
            </div>);
        }
      )}
    </div>
    <div className="body" style={{ fontSize: 26, color: '#3a3b00', lineHeight: 1.6, maxWidth: 1500 }}>
      알림톡에서 만든 구조 — <b>브레인스토밍 → CLAUDE.md → n8n → 슬랙 승인 → 서브에이전트</b> — 를<br />
      그대로 다른 채널에 옮길 수 있어요.<br /><br />
      <b>각 채널 자동화한 얘기는 다음 AX 공유회에서 들고 돌아올게요.</b>
    </div>
  </Slide>;


// ── 31 · 감사합니다 (closing) ─────────────────────────
const S31 = () =>
<Slide num={31} total={31} topLeft="">
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


window.S28 = S28; window.S29 = S29; window.S30 = S30; window.S31 = S31;
