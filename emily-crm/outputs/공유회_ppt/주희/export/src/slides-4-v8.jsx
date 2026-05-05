// Slides 21-25

// ── 21 · 질문: 너한테 맥락 잘 주려면? (CLAUDE에게) ──────
const S21 = () =>
<Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">레이어를 나눈 다음, 직접 질문.</div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '0.2em', color: '#999', marginBottom: 24 }}>TO: CLAUDE</div>
      <div className="h-hero" style={{ fontSize: 110, lineHeight: 1.15 }}>
        "너한테 <span className="hl">내 맥락</span>을<br />제대로 주려면<br />
        뭐가 필요해?"
      </div>
      <div className="body" style={{ fontSize: 28, marginTop: 56, color: '#666' }}>
        AAA에서 들었던 '하네스'라는 단어가 머리에 걸려 있던 차.
      </div>
    </div>
  </Slide>;


// ── 22 · 답: 3축 (공간 · 기억 · 학습) ───────────────────
const S22 = () =>
<Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">정리해보면,</div>
    <div className="h-l" style={{ fontSize: 68, marginBottom: 56, fontWeight: 800 }}>
      답은 <span className="hl">세 축</span>으로 모임.
    </div>
    <div style={{ display: 'flex', gap: 28 }}>
      {[
    { n: '01', k: 'SPACE', ko: '공간', t: <>기록이 <span className="hl">쌓일 자리</span>.</>, d: '폴더 구조 · 파일 네이밍 규칙' },
    { n: '02', k: 'MEMORY', ko: '기억', t: <>세션 시작 시 <span className="hl">자동 로드</span>.</>, d: 'MEMORY.md · 자동 로드' },
    { n: '03', k: 'LEARNING', ko: '학습', t: <>규칙 위반 시 <span className="hl">차단</span>.</>, d: 'pre-commit 훅 · 커밋 차단' }].
    map((c, i) =>
    <div key={i} className="card" style={{ flex: 1, padding: '48px 40px', minHeight: 440 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#aaa', marginBottom: 8 }}>{c.n} / {c.k}</div>
          <div style={{ fontSize: 56, fontWeight: 900 }}>{c.ko}</div>
          <div style={{ fontSize: 28, fontWeight: 600, marginTop: 28, lineHeight: 1.4 }}>{c.t}</div>
          <div style={{ fontSize: 20, color: '#777', marginTop: 20 }}>{c.d}</div>
        </div>
    )}
    </div>
    <div style={{ marginTop: 36, padding: '18px 26px', background: 'var(--yellow)', borderRadius: 10, display: 'inline-block' }}>
      <div style={{ fontSize: 26, fontWeight: 800 }}>→ 이 셋이 모인 게 곧 <b>하네스</b>.</div>
    </div>
  </Slide>;


// ── 23 · 하네스 작동 예 (인트로) ────────────────────────
const S23 = () =>
<Slide theme="dark" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="kicker">근데 이게 말로만 들으면 감이 안 와요.</div>
      <div className="h-hero" style={{ marginTop: 32, fontSize: "130px" }}>
        하네스 관점으로 보는<br /><span className="hl">워크플로우</span>.
      </div>
      <div className="body" style={{ fontSize: 32, marginTop: 56, color: '#bbb' }}>
        MEMORY.md 인덱스 갱신 — 한 장면에 3축이 다 걸려 있어요.
      </div>
    </div>
  </Slide>;


// ── 25 · USE CASE ① PRD 분리 ──────────────────────────
const S25 = () =>
<Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 8 }}>
      <div className="tag">USE CASE ①</div>
    </div>
    <div className="h-l" style={{ fontSize: 72, marginTop: 12, marginBottom: 16 }}>
      규칙을 <span className="hl">md 파일</span>로 빼서 AI가 읽게.
    </div>
    <div className="body" style={{ fontSize: 28, marginBottom: 56, color: '#666' }}>353줄 CLAUDE.md → 역할별 PRD로 분리.</div>
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      <div className="card" style={{ flex: 1, padding: '36px 32px' }}>
        <div className="tag" style={{ background: '#ddd', color: '#444' }}>BEFORE</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 20 }}>CLAUDE.md 하나에 다 박음</div>
        <div style={{ marginTop: 24, padding: '20px 24px', background: '#fff', borderRadius: 10, border: '1px solid #e4e4e4' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>📄 CLAUDE.md <span style={{ color: '#aaa', fontWeight: 500 }}>353 lines</span></div>
          <div className="mono" style={{ fontSize: 16, lineHeight: 1.7, color: '#555', marginTop: 14 }}>
            톤 · 타이밍 · 타겟 · 링크 ·<br />
            변수 · 예외 · 채널별 규칙…<br />
            <span style={{ color: '#999' }}>(전부 한 파일)</span>
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 20, color: '#c4343b' }}>→ 길어서 AI가 끝까지 안 읽음</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}><Arr /></div>
      <div className="card k" style={{ flex: 1, padding: '36px 32px' }}>
        <div className="tag" style={{ background: 'var(--yellow)', color: 'var(--ink)' }}>AFTER</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 20 }}>역할별 PRD로 쪼갬</div>
        <pre className="mono" style={{ marginTop: 24, padding: '20px 24px', background: 'rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 18, lineHeight: 1.8, color: '#eee' }}>
📁 prd/{'\n'}
├─ <b style={{ color: 'var(--yellow)' }}>alimtalk.md</b>   알림톡 규칙{'\n'}
├─ <b style={{ color: 'var(--yellow)' }}>tone.md</b>         톤앤매너{'\n'}
├─ <b style={{ color: 'var(--yellow)' }}>targeting.md</b>  예외 규칙{'\n'}
└─ <b style={{ color: 'var(--yellow)' }}>links.md</b>        UTM · 단축
        </pre>
        <div style={{ marginTop: 18, fontSize: 20, color: 'var(--yellow)' }}>→ AI가 그때그때 필요한 것만 로드</div>
      </div>
    </div>
  </Slide>;


window.S21 = S21;window.S22 = S22;window.S23 = S23;window.S25 = S25;