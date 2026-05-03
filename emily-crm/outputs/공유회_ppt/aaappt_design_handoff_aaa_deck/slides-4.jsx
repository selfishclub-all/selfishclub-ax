// Slides 19-23

// ── 19 · 걔한테 물어봄 ──────────────────────────────────
const S19 = () => (
  <Slide theme="light" topLeft="§ 3 · STEP 2" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 그냥 걔한테 물어봤어요.</div>
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', flex: 1 }}>
      <div style={{ fontSize: 22, fontWeight: 900, letterSpacing:'0.2em', color:'#999', marginBottom: 24 }}>TO: CLAUDE</div>
      <div className="h-hero" style={{ fontSize: 120, lineHeight: 1.15 }}>
        "너한테 기억 잘 주려면<br/>뭘 가져야 해?<br/>
        …네가 생각하는 <span className="hl">하네스</span>는 뭐야?"
      </div>
      <div className="body" style={{ fontSize: 28, marginTop: 64, color:'#666' }}>
        AAA팀에서 '하네스'라는 단어만 언뜻 들었던 참이었거든요.
      </div>
    </div>
  </Slide>
);

// ── 20 · 하네스 3축 ─────────────────────────────────────
const S20 = () => (
  <Slide theme="light" topLeft="§ 3 · STEP 2" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">걔가 답해준 거 정리해보니</div>
    <div className="h-l" style={{ fontSize: 68, marginBottom: 72 }}>세 가지로 모이더라고요.</div>
    <div style={{ display:'flex', gap: 28 }}>
      {[
        {n:'01', k:'SPACE',    ko:'공간', t:<>기록이 <span className="hl">쌓일 자리</span>를 만들어주기.</>, d:'폴더 구조 · 파일 네이밍 규칙'},
        {n:'02', k:'MEMORY',   ko:'기억', t:<>세션 시작할 때 <span className="hl">자동으로 읽게</span> 만들기.</>, d:'MEMORY.md · 자동 로드'},
        {n:'03', k:'LEARNING', ko:'학습', t:<>규칙을 안 지키면 <span className="hl">막게</span> 만들기.</>, d:'pre-commit 훅 · 커밋 차단'},
      ].map((c,i)=>(
        <div key={i} className="card" style={{ flex:1, padding:'48px 40px', minHeight: 440 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color:'#aaa', marginBottom: 8 }}>{c.n} / {c.k}</div>
          <div style={{ fontSize: 56, fontWeight: 900 }}>{c.ko}</div>
          <div style={{ fontSize: 28, fontWeight: 600, marginTop: 28, lineHeight: 1.4 }}>{c.t}</div>
          <div style={{ fontSize: 20, color:'#777', marginTop: 20 }}>{c.d}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 40, fontSize: 28 }}>적용해보니 잘 돌더라고요. 알고 보니 이게 <b>'하네스'</b>였던 거예요.</div>
  </Slide>
);

// ── 21 · 하네스 작동 예 (인트로) ────────────────────────
const S21 = () => (
  <Slide theme="dark" topLeft="§ 3 · STEP 2" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%' }}>
      <div className="kicker">근데 이게 말로만 들으면 감이 안 와요.</div>
      <div className="h-hero" style={{ fontSize: 180, marginTop: 32 }}>
        실제로는 이렇게<br/><span className="hl">작동</span>해요.
      </div>
      <div className="body" style={{ fontSize: 32, marginTop: 56, color:'#bbb' }}>
        MEMORY.md 인덱스 갱신 — 한 장면에 3축이 다 걸려 있어요.
      </div>
    </div>
  </Slide>
);

// ── 22 · 세션저장 → 커밋차단 → 인덱스추가 ──────────────
const S22 = () => (
  <Slide theme="light" topLeft="§ 3 · STEP 2" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">세션 저장 → 커밋 차단 → 인덱스 추가.</div>
    <div className="h-l" style={{ fontSize: 56, marginBottom: 40 }}>
      이 한 <span className="hl">사이클</span>이 곧 하네스가 돌아가는 모습이에요.
    </div>
    <div style={{ display:'flex', gap: 20, marginBottom: 32 }}>
      <div className="card" style={{ flex: 1, padding:'28px 32px', background:'#f8f8f8' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing:'0.2em', color:'#888', textTransform:'uppercase', marginBottom: 14 }}>공간 · 폴더 구조</div>
        <pre className="mono" style={{ fontSize: 16, lineHeight: 1.6, color:'#222' }}>
📁 memory/{'\n'}
├─ <b>MEMORY.md</b>   ← 인덱스{'\n'}
├─ session_0418_aaa.md{'\n'}
├─ session_0421_crm.md  <span style={{ background:'var(--yellow)', padding:'1px 6px', borderRadius: 3, fontSize: 12, fontWeight: 800 }}>new</span>{'\n'}
├─ feedback_0419.md{'\n'}
└─ ...{'\n'}{'\n'}
📁 .husky/{'\n'}
└─ <b>pre-commit</b>   ← 검사
        </pre>
        <div style={{ fontSize: 18, color:'#666', marginTop: 14 }}>세션 파일이 쌓이면 MEMORY.md에도 한 줄 추가돼야 함.</div>
      </div>
      <div style={{ flex: 1, padding:'28px 32px', background:'#111', borderRadius: 16, color:'#eee' }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing:'0.2em', color:'var(--yellow)', textTransform:'uppercase', marginBottom: 14 }}>학습 · PRE-COMMIT 훅이 막음</div>
        <pre className="mono" style={{ fontSize: 16, lineHeight: 1.7 }}>
<span style={{ color:'#aaa' }}>$</span> git commit -m "add session_0421"{'\n'}{'\n'}
<span style={{ color:'#888' }}>running pre-commit…</span>{'\n'}
<span style={{ color:'#7ecc7a' }}>✓ lint</span>{'\n'}
<span style={{ color:'#7ecc7a' }}>✓ type-check</span>{'\n'}
<span style={{ color:'#ff5a5a' }}>✗ memory-index</span>{'\n'}{'\n'}
<span style={{ color:'#ff5a5a' }}>❌ 인덱스 누락 1건</span> — <b style={{ color:'var(--yellow)' }}>MEMORY.md</b>에 추가 필요{'\n'}
<span style={{ color:'#bbb' }}>· memory/session_0421_crm.md</span>{'\n'}{'\n'}
<span style={{ color:'#ff5a5a' }}>commit aborted.</span>
        </pre>
      </div>
    </div>
    <div style={{ display:'flex', gap: 20 }}>
      {[
        {k:'SPACE',    d:'폴더 구조가 자리를 만듦'},
        {k:'MEMORY',   d:'MEMORY.md가 매 세션 자동 로드'},
        {k:'LEARNING', d:'훅이 규칙을 강제함'},
      ].map((c,i)=>(
        <div key={i} style={{ flex:1, padding:'16px 20px', background:'var(--yellow)', borderRadius: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing:'0.18em', color:'var(--yellow-ink)' }}>{c.k}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color:'var(--ink)', marginTop: 2 }}>{c.d}</div>
        </div>
      ))}
    </div>
  </Slide>
);

// ── 23 · USE CASE ① PRD 분리 ──────────────────────────
const S23 = () => (
  <Slide theme="light" topLeft="§ 4 · 유즈케이스" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', alignItems:'baseline', gap: 20, marginBottom: 8 }}>
      <div className="tag">USE CASE ①</div>
    </div>
    <div className="h-l" style={{ fontSize: 72, marginTop: 12, marginBottom: 16 }}>
      규칙을 <span className="hl">md 파일</span>로 빼서 AI가 읽게.
    </div>
    <div className="body" style={{ fontSize: 28, marginBottom: 56, color:'#666' }}>353줄 CLAUDE.md → 역할별 PRD로 분리.</div>
    <div style={{ display:'flex', gap: 28, alignItems:'stretch' }}>
      <div className="card" style={{ flex: 1, padding:'36px 32px' }}>
        <div className="tag" style={{ background:'#ddd', color:'#444' }}>BEFORE</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 20 }}>CLAUDE.md 하나에 다 박음</div>
        <div style={{ marginTop: 24, padding:'20px 24px', background:'#fff', borderRadius: 10, border:'1px solid #e4e4e4' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>📄 CLAUDE.md <span style={{ color:'#aaa', fontWeight: 500 }}>353 lines</span></div>
          <div className="mono" style={{ fontSize: 16, lineHeight: 1.7, color:'#555', marginTop: 14 }}>
            톤 · 타이밍 · 타겟 · 링크 ·<br/>
            변수 · 예외 · 채널별 규칙…<br/>
            <span style={{ color:'#999' }}>(전부 한 파일)</span>
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 20, color:'#c4343b' }}>→ 길어서 AI가 끝까지 안 읽음</div>
      </div>
      <div style={{ display:'flex', alignItems:'center' }}><Arr /></div>
      <div className="card k" style={{ flex: 1, padding:'36px 32px' }}>
        <div className="tag" style={{ background:'var(--yellow)', color:'var(--ink)' }}>AFTER</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 20 }}>역할별 PRD로 쪼갬</div>
        <pre className="mono" style={{ marginTop: 24, padding:'20px 24px', background:'rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 18, lineHeight: 1.8, color:'#eee' }}>
📁 prd/{'\n'}
├─ <b style={{ color:'var(--yellow)' }}>alimtalk.md</b>   알림톡 규칙{'\n'}
├─ <b style={{ color:'var(--yellow)' }}>tone.md</b>         톤앤매너{'\n'}
├─ <b style={{ color:'var(--yellow)' }}>targeting.md</b>  예외 규칙{'\n'}
└─ <b style={{ color:'var(--yellow)' }}>links.md</b>        UTM · 단축
        </pre>
        <div style={{ marginTop: 18, fontSize: 20, color:'var(--yellow)' }}>→ AI가 그때그때 필요한 것만 로드</div>
      </div>
    </div>
  </Slide>
);

window.S19 = S19; window.S20 = S20; window.S21 = S21; window.S22 = S22; window.S23 = S23;
