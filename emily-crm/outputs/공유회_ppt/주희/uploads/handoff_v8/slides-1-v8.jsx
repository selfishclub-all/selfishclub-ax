// Slides 01-06 — INTRO + §1 시작

// ── 01 · Cover ─────────────────────────────────────────
const S01 = () =>
<Slide theme="light"
topLeft="INTRO" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="h-hero" style={{ fontSize: 150, fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.04em' }}>
        <div>매일 아침,</div>
        <div style={{ fontWeight: 700 }}>
          AI가{' '}
          <span style={{
          background: 'var(--yellow)',
          padding: '0 0.08em',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone'
        }}>알림톡</span>을
        </div>
        <div>들고 옵니다.</div>
      </div>
      <div style={{ marginTop: 80, fontSize: 28, color: '#a8a8a8', fontWeight: 400, letterSpacing: '-0.01em' }}>
        에밀리 · 셀피쉬클럽 CRM PM &nbsp;·&nbsp; AAA 공유회 · 2026.04.28
      </div>
    </div>
  </Slide>;


// ── 02 · ABOUT ─────────────────────────────────────────
const S02 = () =>
<Slide theme="light"
topLeft="INTRO · ABOUT" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 80, alignItems: 'center', height: '100%' }}>
      <div style={{ flex: 1 }}>
        <div className="h-hero" style={{ fontSize: 180, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' }}>
          에밀리<span style={{ color: 'var(--yellow)' }}>.</span>
        </div>
        <div style={{ marginTop: 64, fontSize: 44, fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.02em' }}>
          <div>셀피쉬클럽 CRM PM</div>
          <div style={{ color: '#000' }}>인하우스 풀스택 마케터</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 56 }}>
          {[
        { t: '퍼포먼스' },
        { t: '그로스' },
        { t: 'ops' },
        { t: '효율충', hl: true },
        { t: '데이터자동화' }].
        map((tag) =>
        <span key={tag.t} style={{
          padding: '12px 24px',
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
        background: 'var(--surface)', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
      }}>
          <img src="assets/emily.png" alt="emily" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => e.target.style.display = 'none'} />
          <div style={{ position: 'absolute', bottom: 24, left: 24, fontSize: 18, letterSpacing: '0.24em', fontWeight: 600, color: '#fff' }}>EMILY</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 03 · 왜 AAA팀에 들어갔나 ───────────────────────────
const S03 = () =>
<Slide theme="light"
topLeft="INTRO" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">제가 AAA팀에 들어간 이유.</div>
    <div className="h-xl" style={{ marginTop: 16, marginBottom: 64, fontWeight: 700 }}>
      <span style={{ fontWeight: 800, background: 'var(--yellow)', padding: '0 0.1em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>AI 에이전트</span>로 뭐 하나,<br />
      제대로 자동화시켜보고 싶어서.
    </div>
    <div style={{ display: 'flex', gap: 24 }}>
      {[
    { k: '01', h: 'AI로 뭘 자동화할 수 있을까', t: <>CRM 자동화가 목적이 아니라,<br />AI로 내 반복 업무를 없애고 싶었어요.</> },
    { k: '02', h: 'Claude Code의 끝은 어디일까', t: <>혼자 써보면서 <b>'끝이 어딘가'</b> 궁금했고,<br />팀과 함께면 더 멀리 갈 수 있을 것 같았어요.</> },
    { k: '03', h: '내 마케팅에 어떻게 적용할까', t: <>인사이트를 뽑아내서,<br />내 업무·포트폴리오에 녹이고 싶었어요.</> }].
    map((c, i) =>
    <div key={i} className="card" style={{ flex: 1, minHeight: 380, padding: '44px 40px' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#bbb', letterSpacing: '0.08em' }}>{c.k}</div>
          <div style={{ marginTop: 20, fontSize: 32, fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.02em' }}>{c.h}</div>
          <div style={{ marginTop: 24, fontSize: 22, lineHeight: 1.55, color: '#555', fontWeight: 400 }}>{c.t}</div>
        </div>
    )}
    </div>
    <div style={{ marginTop: 40, fontSize: 24, color: '#777' }}>
      그래서 팀과 같이 AAA의 AI 프로젝트에 참여했습니다.
    </div>
  </Slide>;


// ── 04 · 목차 ──────────────────────────────────────────
const S04 = () =>
<Slide theme="light" topLeft="CONTENTS" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="h-xl" style={{ marginBottom: 80, fontWeight: 700 }}>목차<span style={{ color: 'var(--yellow)' }}>.</span></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, rowGap: 24 }}>
      {[
    { n: '01', t: '지난 여정', d: '처음에 어떻게 기획을 하게 됐는지' },
    { n: '02', t: '자동화 구조 설계', d: '셀피쉬가 쓰는 스택과 시행착오' },
    { n: '03', t: 'AI한테 내 맥락 심기', d: '하네스를 알아가는 과정' },
    { n: '04', t: '팀과 일했던 이야기', d: '혼자 한 거 아니에요' }].
    map((r, i) =>
    <div key={i} style={{ display: 'flex', gap: 28, padding: '28px 0', borderTop: '1px solid #e0e0e0', alignItems: 'baseline' }}>
          <div style={{ fontSize: 72, fontWeight: 400, color: '#bbb', letterSpacing: '-0.04em', minWidth: 110 }}>{r.n}</div>
          <div style={{ flex: 1 }}>
            <div className="h-s" style={{ fontSize: 38, fontWeight: 700 }}>{r.t}</div>
            <div style={{ fontSize: 22, color: '#888', marginTop: 6 }}>{r.d}</div>
          </div>
        </div>
    )}
    </div>
  </Slide>;


// ── 05 · TL;DR ────────────────────────────────────────
const S05 = () =>
<Slide theme="light" topLeft="TAKEAWAYS" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">오늘 제 세션이 끝나면,</div>
    <div className="h-xl" style={{ marginBottom: 80, fontWeight: 700, fontSize: 120 }}>
      <span style={{ background: 'var(--yellow)', padding: '0 0.1em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>가져가실 수 있는 3가지</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {[
    { n: '01', t: 'AI랑 같이 기획하는 법' },
    { n: '02', t: '자동화 구조 설계' },
    { n: '03', t: '내 규칙을 AI가 읽게 만드는 법' }].
    map((r, i) =>
    <div key={i} style={{ display: 'flex', gap: 40, padding: '40px 0', borderTop: '1px solid #e0e0e0', alignItems: 'baseline' }}>
          <div style={{ fontSize: 96, fontWeight: 400, color: '#bbb', letterSpacing: '-0.04em', minWidth: 160 }}>{r.n}</div>
          <div className="h-m" style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-0.02em' }}>{r.t}</div>
        </div>
    )}
    </div>
  </Slide>;


// ── 06 · 5채널 (오프닝 훅) ─────────────────────────────
// 아이폰 프레임 안에 스크린샷을 contain으로 넣어서 잘리지 않게 함
const ChannelBadge = ({ kind }) => {
  const base = {
    width: 22, height: 22, borderRadius: 6,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 800, color: '#fff', flex: '0 0 22px'
  };
  if (kind === 'kakao') return <div style={{ ...base, background: '#FEE500', color: '#3C1E1E' }}>K</div>;
  if (kind === 'instagram') return (
    <div style={{ ...base, background: 'linear-gradient(135deg,#f09433 0%,#dc2743 50%,#bc1888 100%)' }}>
      <div style={{ width: 12, height: 12, border: '2px solid #fff', borderRadius: 4, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 1, right: 1, width: 2, height: 2, borderRadius: '50%', background: '#fff' }} />
      </div>
    </div>);

  if (kind === 'openchat') return <div style={{ ...base, background: '#B2C7D9', color: '#fff' }}>#</div>;
  if (kind === 'gmail') return (
    <div style={{ ...base, background: '#fff', border: '1px solid #eee', color: '#EA4335', fontSize: 14 }}>M</div>);

  return <div style={{ ...base, background: '#FEE500', color: '#3C1E1E' }}>알</div>;
};

// 채널별 앱 상단 UI (스크린샷 위에 얹히는 mock UI chrome)
const AppChrome = ({ brand }) => {
  if (brand === 'instagram') return (
    <>
      {/* iOS 상태바 */}
      <div style={{ height: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 0 18px', fontSize: 10, fontWeight: 600, color: '#111' }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      {/* 인스타 내비 */}
      <div style={{ padding: '6px 12px 8px', borderBottom: '1px solid #efefef', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Dancing Script", cursive, serif', fontSize: 18, fontWeight: 700, color: '#111' }}>Instagram</span>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: '#111' }}>♡ ✈</div>
      </div>
    </>);

  if (brand === 'openchat') return (
    <>
      <div style={{ height: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 0 18px', fontSize: 10, fontWeight: 600, color: '#111' }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div style={{ padding: '6px 12px 8px', background: '#B2C7D9', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: 13, color: '#111' }}>‹</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#111', lineHeight: 1.1 }}>셀피쉬클럽 오픈채팅</div>
          <div style={{ fontSize: 8, color: '#333' }}>참여자 412명</div>
        </div>
        <span style={{ fontSize: 12, color: '#111' }}>☰</span>
      </div>
    </>);

  if (brand === 'gmail') return (
    <>
      <div style={{ height: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 0 18px', fontSize: 10, fontWeight: 600, color: '#111' }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div style={{ padding: '6px 12px 8px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #efefef', background: '#fff' }}>
        <span style={{ fontSize: 12, color: '#5f6368' }}>←</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#4285F4' }}>G</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#EA4335' }}>m</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#FBBC04' }}>a</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#4285F4' }}>i</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#34A853' }}>l</span>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#5f6368' }}>⋮</span>
      </div>
    </>);

  // kakao (알림톡 / 카플친)
  return (
    <>
      <div style={{ height: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 0 18px', fontSize: 10, fontWeight: 600, color: '#111' }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div style={{ padding: '6px 12px 8px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #efefef', background: '#fff' }}>
        <span style={{ fontSize: 13, color: '#111' }}>‹</span>
        <div style={{ width: 18, height: 18, borderRadius: 5, background: '#FEE500', color: '#3C1E1E', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>K</div>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>카카오톡</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#111' }}>☰</span>
      </div>
    </>);

};

const ChannelCard = ({ n, label, src, alt, brand }) =>
<div style={{
  flex: '0 0 280px',
  display: 'flex', flexDirection: 'column'
}}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 18, fontWeight: 500, color: '#bbb' }}>{n}</span>
      <ChannelBadge kind={brand} />
      <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)' }}>{label}</span>
    </div>
    {/* 아이폰 프레임 */}
    <div style={{
    width: '100%', aspectRatio: '9 / 18',
    background: '#1a1a1a',
    borderRadius: 36, padding: 8,
    border: '2px solid #2a2a2a',
    boxShadow: '0 4px 20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)',
    position: 'relative'
  }}>
      {/* 노치 */}
      <div style={{
      position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
      width: 80, height: 20, background: '#000', borderRadius: 999, zIndex: 2
    }} />
      {/* 스크린 */}
      <div style={{
      width: '100%', height: '100%',
      background: '#fff', borderRadius: 28, overflow: 'hidden',
      display: 'flex', flexDirection: 'column'
    }}>
        <AppChrome brand={brand} />
        <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <img src={src} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
        onError={(e) => {e.target.style.display = 'none';e.target.parentElement.innerHTML = '<div style="color:#999;padding:20px;font-size:14px;text-align:center">' + alt + '</div>';}} />
        </div>
      </div>
    </div>
  </div>;


const S06 = () =>
<Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 그 전에.</div>
    <div className="h-xl" style={{ marginBottom: 64, fontWeight: 800, lineHeight: 1.1, fontSize: "90px" }}>
      여러분은 어떤 <span className="u-y" style={{ fontWeight: 800 }}>채널·메시지</span>를<br />받고 이 공유회에 오게 되셨나요?
    </div>
    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-start' }}>
      <ChannelCard n="01" label="알림톡" brand="kakao" src="assets/alimtalk.png" alt="알림톡" />
      <ChannelCard n="02" label="카톡 채널 친구" brand="kakao" src="assets/kakaoplus.png" alt="카톡 채널 친구" />
      <ChannelCard n="03" label="이메일" brand="gmail" src="assets/Email.png" alt="이메일" />
      <ChannelCard n="04" label="인스타그램" brand="instagram" src="assets/insta_main.png" alt="인스타그램" />
    </div>
  </Slide>;


window.S01 = S01;window.S02 = S02;window.S03 = S03;
window.S04 = S04;window.S05 = S05;window.S06 = S06;