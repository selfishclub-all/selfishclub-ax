// Slides 01-06 — INTRO + 01·지난 여정 훅 (v8 rev2)

// ── 01 · Cover ─────────────────────────────────────────
const S01 = () => (
  <Slide theme="light"
    topLeft="INTRO" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%' }}>
      <div className="h-hero" style={{ fontSize: 150, fontWeight: 600, lineHeight: 1.12, letterSpacing:'-0.04em' }}>
        <div>매일 아침,</div>
        <div style={{ fontWeight: 700 }}>
          AI가{' '}
          <span style={{
            background:'var(--yellow)',
            padding:'0 0.08em',
            boxDecorationBreak:'clone',
            WebkitBoxDecorationBreak:'clone'
          }}>알림톡</span>을
        </div>
        <div>들고 옵니다.</div>
      </div>
      <div style={{ marginTop: 80, fontSize: 28, color:'#a8a8a8', fontWeight: 400, letterSpacing:'-0.01em' }}>
        에밀리 · 셀피쉬클럽 CRM PM &nbsp;·&nbsp; AAA 공유회 · 2026.04.28
      </div>
    </div>
  </Slide>
);

// ── 02 · ABOUT ─────────────────────────────────────────
const S02 = () => (
  <Slide theme="light"
    topLeft="INTRO · ABOUT" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', gap: 80, alignItems:'center', height:'100%' }}>
      <div style={{ flex: 1 }}>
        <div className="h-hero" style={{ fontSize: 180, fontWeight: 700, lineHeight: 1, letterSpacing:'-0.04em' }}>
          에밀리<span style={{ color:'var(--yellow)' }}>.</span>
        </div>
        <div style={{ marginTop: 64, fontSize: 44, fontWeight: 500, lineHeight: 1.35, letterSpacing:'-0.02em' }}>
          <div>셀피쉬클럽 CRM PM</div>
          <div style={{ color:'#000' }}>인하우스 풀스택 마케터</div>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 12, marginTop: 56 }}>
          {[
            {t:'퍼포먼스'}, {t:'그로스'}, {t:'ops'},
            {t:'효율충', hl: true}, {t:'데이터자동화'},
          ].map(tag =>
            <span key={tag.t} style={{
              padding:'12px 24px',
              border: tag.hl ? 'none' : '1.5px solid #e0e0e0',
              background: tag.hl ? 'var(--yellow)' : 'transparent',
              borderRadius: 999,
              fontSize: 24, fontWeight: 500,
              color: tag.hl ? 'var(--yellow-ink)' : '#666'
            }}>#{tag.t}</span>
          )}
        </div>
      </div>
      <div style={{ flex: '0 0 480px' }}>
        <div style={{
          width: 480, height: 580, borderRadius: 24,
          background: 'var(--surface)', overflow:'hidden',
          display:'flex', alignItems:'center', justifyContent:'center', position:'relative'
        }}>
          <img src="assets/emily.png" alt="emily" style={{ width:'100%', height:'100%', objectFit:'cover' }}
               onError={(e) => e.target.style.display='none'} />
          <div style={{ position:'absolute', bottom: 24, left: 24, fontSize: 18, letterSpacing:'0.24em', fontWeight: 600, color:'#fff' }}>EMILY</div>
        </div>
      </div>
    </div>
  </Slide>
);

// ── 03 · AAA 참여 이유 (카피 단문화) ──────────────────
const S03 = () => (
  <Slide theme="light"
    topLeft="INTRO · AAA" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">AAA팀에 온 이유,</div>
    <div className="h-xl" style={{ marginTop: 16, marginBottom: 80, fontWeight: 700 }}>
      6주 동안 <span style={{ fontWeight: 800, borderBottom: '6px solid var(--yellow)', paddingBottom: 4 }}>뭘</span> 했냐면.
    </div>
    <div style={{ display:'flex', gap: 24 }}>
      {[
        { t: <><b>반복 업무</b>를<br/>AI한테 넘겨보려고.</> },
        { t: <>클로드 코드,<br/><b>어디까지 되는지</b> 보려고.</> },
        { t: <>팀에서 다른 방식 보고<br/><b>내 작업에 접목</b>하려고.</> },
      ].map((c,i) => (
        <div key={i} className="card" style={{ flex: 1, minHeight: 380, padding:'48px 44px', display:'flex', alignItems:'center' }}>
          <div className="h-m" style={{ fontSize: 40, lineHeight: 1.4, fontWeight: 600 }}>{c.t}</div>
        </div>
      ))}
    </div>
  </Slide>
);

// ── 04 · 목차 ─────────────────────────────────────────
const S04 = () => (
  <Slide theme="light" topLeft="CONTENTS" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="h-xl" style={{ marginBottom: 80, fontWeight: 700 }}>목차<span style={{ color:'var(--yellow)' }}>.</span></div>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 32, rowGap: 24 }}>
      {[
        {n:'01', k:'지난 여정',          t:'처음에 어떻게 기획하게 됐는지'},
        {n:'02', k:'자동화 구조 설계',    t:'Claude Code + n8n 으로 만든 워크플로우'},
        {n:'03', k:'하네스',              t:'AI한테 내 맥락 심는 법'},
        {n:'04', k:'마무리',              t:'팀과 일했던 이야기'},
      ].map((r,i)=>(
        <div key={i} style={{ display:'flex', gap: 28, padding:'28px 0', borderTop:'1px solid #e0e0e0', alignItems:'baseline' }}>
          <div style={{ fontSize: 72, fontWeight: 400, color:'#bbb', letterSpacing:'-0.04em', minWidth: 110 }}>{r.n}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, letterSpacing:'0.22em', fontWeight: 600, color:'#888', textTransform:'uppercase', marginBottom: 8 }}>{r.k}</div>
            <div className="h-s" style={{ fontSize: 32, fontWeight: 600 }}>{r.t}</div>
          </div>
        </div>
      ))}
    </div>
  </Slide>
);

// ── 05 · 가져가실 수 있는 3가지 ────────────────────────
const S05 = () => (
  <Slide theme="light" topLeft="INTRO" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">오늘 제 세션이 끝나면,</div>
    <div className="h-xl" style={{ marginBottom: 72, fontWeight: 700 }}>
      <span style={{ background:'var(--yellow)', padding:'0 0.1em', boxDecorationBreak:'clone', WebkitBoxDecorationBreak:'clone' }}>가져가실 수 있는 3가지</span>
    </div>
    <div style={{ display:'flex', flexDirection:'column' }}>
      {[
        { n:'01', t:'AI랑 같이 기획하는 법' },
        { n:'02', t:'자동화 구조 설계' },
        { n:'03', t:'내 규칙을 AI가 읽게 만드는 법' },
      ].map((r,i)=>(
        <div key={i} style={{ display:'flex', gap: 40, padding:'36px 0', borderTop:'1px solid #e0e0e0', alignItems:'baseline' }}>
          <div style={{ fontSize: 80, fontWeight: 400, color:'#bbb', letterSpacing:'-0.04em', minWidth: 130 }}>{r.n}</div>
          <div className="h-m" style={{ fontSize: 60, fontWeight: 700, letterSpacing:'-0.02em' }}>{r.t}</div>
        </div>
      ))}
    </div>
  </Slide>
);

// ── 06 · 채널 훅 (5개 복구 · 카플친 · 사이즈 축소) ────
const ChannelBadge = ({ kind }) => {
  const base = {
    width: 22, height: 22, borderRadius: 6,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize: 12, fontWeight: 800, color:'#fff', flex:'0 0 22px'
  };
  if (kind === 'kakao') return <div style={{ ...base, background:'#FEE500', color:'#3C1E1E' }}>K</div>;
  if (kind === 'instagram') return (
    <div style={{ ...base, background:'linear-gradient(135deg,#f09433 0%,#dc2743 50%,#bc1888 100%)' }}>
      <div style={{ width: 12, height: 12, border:'2px solid #fff', borderRadius: 4, position:'relative' }}>
        <div style={{ position:'absolute', top: 1, right: 1, width: 2, height: 2, borderRadius:'50%', background:'#fff' }}/>
      </div>
    </div>
  );
  if (kind === 'openchat') return <div style={{ ...base, background:'#B2C7D9', color:'#fff' }}>#</div>;
  if (kind === 'gmail') return (
    <div style={{ ...base, background:'#fff', border:'1px solid #eee', color:'#EA4335', fontSize: 14 }}>M</div>
  );
  return <div style={{ ...base, background:'#FEE500', color:'#3C1E1E' }}>알</div>;
};

const AppChrome = ({ brand }) => {
  if (brand === 'instagram') return (
    <>
      <div style={{ height: 18, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', fontSize: 8, fontWeight: 600, color:'#111' }}>
        <span>9:41</span><span>●●●</span>
      </div>
      <div style={{ padding:'4px 10px 6px', borderBottom:'1px solid #efefef', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontFamily:'"Dancing Script", cursive, serif', fontSize: 14, fontWeight: 700, color:'#111' }}>Instagram</span>
        <div style={{ fontSize: 10, color:'#111' }}>♡ ✈</div>
      </div>
    </>
  );
  if (brand === 'openchat') return (
    <>
      <div style={{ height: 18, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', fontSize: 8, fontWeight: 600, color:'#111' }}>
        <span>9:41</span><span>●●●</span>
      </div>
      <div style={{ padding:'4px 10px 6px', background:'#B2C7D9', display:'flex', alignItems:'center', gap: 6 }}>
        <span style={{ fontSize: 11, color:'#111' }}>‹</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color:'#111' }}>셀피쉬클럽 오픈채팅</div>
          <div style={{ fontSize: 7, color:'#333' }}>참여자 412명</div>
        </div>
      </div>
    </>
  );
  if (brand === 'gmail') return (
    <>
      <div style={{ height: 18, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', fontSize: 8, fontWeight: 600, color:'#111' }}>
        <span>9:41</span><span>●●●</span>
      </div>
      <div style={{ padding:'4px 10px 6px', display:'flex', alignItems:'center', gap: 8, borderBottom:'1px solid #efefef', background:'#fff' }}>
        <span style={{ fontSize: 10, color:'#5f6368' }}>←</span>
        <div style={{ display:'flex', alignItems:'center', gap: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color:'#4285F4' }}>G</span>
          <span style={{ fontSize: 11, fontWeight: 700, color:'#EA4335' }}>m</span>
          <span style={{ fontSize: 11, fontWeight: 700, color:'#FBBC04' }}>a</span>
          <span style={{ fontSize: 11, fontWeight: 700, color:'#4285F4' }}>i</span>
          <span style={{ fontSize: 11, fontWeight: 700, color:'#34A853' }}>l</span>
        </div>
      </div>
    </>
  );
  // kakao
  return (
    <>
      <div style={{ height: 18, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', fontSize: 8, fontWeight: 600, color:'#111' }}>
        <span>9:41</span><span>●●●</span>
      </div>
      <div style={{ padding:'4px 10px 6px', display:'flex', alignItems:'center', gap: 6, borderBottom:'1px solid #efefef', background:'#fff' }}>
        <span style={{ fontSize: 11, color:'#111' }}>‹</span>
        <div style={{ width: 14, height: 14, borderRadius: 4, background:'#FEE500', color:'#3C1E1E', fontSize: 9, fontWeight: 800, display:'flex', alignItems:'center', justifyContent:'center' }}>K</div>
        <span style={{ fontSize: 10, fontWeight: 700, color:'#111' }}>카카오톡</span>
      </div>
    </>
  );
};

const ChannelCard = ({ n, label, src, alt, brand }) => (
  <div style={{ flex: '0 0 200px', display:'flex', flexDirection:'column' }}>
    <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color:'#bbb' }}>{n}</span>
      <ChannelBadge kind={brand} />
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink)' }}>{label}</span>
    </div>
    <div style={{
      width:'100%', aspectRatio:'9 / 18',
      background:'#1a1a1a', borderRadius: 28, padding: 6,
      border:'2px solid #2a2a2a',
      boxShadow:'0 4px 16px rgba(0,0,0,0.12)', position:'relative',
    }}>
      <div style={{
        position:'absolute', top: 8, left:'50%', transform:'translateX(-50%)',
        width: 60, height: 16, background:'#000', borderRadius: 999, zIndex: 2
      }}/>
      <div style={{
        width:'100%', height:'100%',
        background:'#fff', borderRadius: 22, overflow:'hidden',
        display:'flex', flexDirection:'column',
      }}>
        <AppChrome brand={brand} />
        <div style={{ flex: 1, minHeight: 0, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff' }}>
          <img src={src} alt={alt}
               style={{ width:'100%', height:'100%', objectFit:'contain', background:'#fff' }}
               onError={(e)=>{ e.target.style.display='none'; e.target.parentElement.innerHTML='<div style="color:#999;padding:16px;font-size:12px;text-align:center">'+alt+'</div>'; }} />
        </div>
      </div>
    </div>
  </div>
);

const S06 = () => (
  <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 그 전에.</div>
    <div className="h-xl" style={{ fontSize: 88, marginBottom: 72, fontWeight: 700, lineHeight: 1.1 }}>
      여러분은 어떤 <span className="u-y" style={{ fontWeight: 800 }}>채널·메시지</span>로<br/>이 공유회에 오게 되셨나요?
    </div>
    <div style={{ display:'flex', gap: 20, justifyContent:'center', alignItems:'flex-start' }}>
      <ChannelCard n="01" label="알림톡" brand="kakao"     src="assets/alimtalk.png"   alt="알림톡" />
      <ChannelCard n="02" label="카플친" brand="kakao"     src="assets/kakaoplus.png"  alt="카플친" />
      <ChannelCard n="03" label="인스타" brand="instagram" src="assets/insta_main.png" alt="인스타" />
      <ChannelCard n="04" label="오카방" brand="openchat"  src="assets/oka.png"        alt="오카방" />
      <ChannelCard n="05" label="이메일" brand="gmail"     src="assets/Email.png"      alt="이메일" />
    </div>
  </Slide>
);

window.S01 = S01; window.S02 = S02; window.S03 = S03;
window.S04 = S04; window.S05 = S05; window.S06 = S06;
