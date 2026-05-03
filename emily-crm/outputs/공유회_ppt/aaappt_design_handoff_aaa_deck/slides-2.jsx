// Slides 07-12 — 01·지난 여정 본편 + 02·자동화 구조 설계 커버 (v8 rev2)

// ── 07 · 공유회 1건 스케일 (콘텐츠 많음, 오픈채팅) ─────
const S07 = () => (
  <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">공유회 1건이 열리면,</div>
    <div className="h-xl" style={{ marginBottom: 56, fontWeight: 700 }}>
      채널 <span style={{ fontWeight: 800, borderBottom:'6px solid var(--yellow)', paddingBottom: 4 }}>4개</span>, 콘텐츠 <span style={{ fontWeight: 800, borderBottom:'6px solid var(--yellow)', paddingBottom: 4 }}>수십 개</span>.
    </div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 24, marginBottom: 56 }}>
      {[
        {n:'01', t:'알림톡',   d:'템플릿 9종 · 타깃별 발송'},
        {n:'02', t:'카플친',   d:'플러스친구 소식 · 쿠폰'},
        {n:'03', t:'이메일',   d:'Stibee · 뉴스레터'},
        {n:'04', t:'오픈채팅', d:'공지 · 안내 · FAQ'},
      ].map((c,i) => (
        <div key={i} className="card" style={{ padding:'40px 36px', minHeight: 240, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color:'#bbb', marginBottom: 8 }}>{c.n}</div>
            <div className="h-m" style={{ fontSize: 46, fontWeight: 700 }}>{c.t}</div>
          </div>
          <div className="cap" style={{ fontSize: 22 }}>{c.d}</div>
        </div>
      ))}
    </div>
    <div style={{ padding:'28px 36px', background:'var(--yellow)', borderRadius: 14, fontSize: 36, fontWeight: 800, letterSpacing:'-0.02em' }}>
      가장 핵심인 <span style={{ background:'var(--ink)', color:'var(--yellow)', padding:'4px 18px', borderRadius: 8 }}>알림톡</span> 부터 자동화 시작.
    </div>
  </Slide>
);

// ── 08 · 알림톡 CRM 워크플로우 (시각화 키움) ───────────
const TemplateDot = ({ d, n, label, filter, hl }) => (
  <div style={{ flex: 1, display:'flex', flexDirection:'column', alignItems:'center', gap: 12, position:'relative' }}>
    <div style={{ fontSize: 18, fontWeight: 800, color:'#999', letterSpacing:'0.14em' }}>{d}</div>
    <div style={{
      width: 92, height: 92, borderRadius: '50%',
      background: hl ? 'var(--yellow)' : 'var(--ink)',
      color: hl ? 'var(--ink)' : '#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: 36, fontWeight: 800,
      boxShadow:'0 10px 24px rgba(0,0,0,0.14)', zIndex: 2,
    }}>{n}</div>
    <div style={{ fontSize: 20, fontWeight: 700, textAlign:'center', lineHeight: 1.25, marginTop: 4 }}>{label}</div>
    <div style={{
      padding:'6px 12px', background: hl ? 'rgba(233,237,18,0.22)' : '#f3f3f3',
      borderRadius: 999, fontSize: 13, fontFamily:'"JetBrains Mono", monospace',
      color:'#555', whiteSpace:'nowrap',
    }}>{filter}</div>
  </div>
);

const S08 = () => (
  <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">알림톡 CRM 워크플로우.</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 56, fontWeight: 700 }}>
      <span style={{ background:'var(--yellow)', padding:'0 0.1em' }}>5일</span>, <span style={{ background:'var(--yellow)', padding:'0 0.1em' }}>9번</span>, 매번 바뀌는 타겟.
    </div>

    {/* 타임라인 바 */}
    <div style={{ position:'relative', margin:'20px 0 16px', height: 420 }}>
      <div style={{
        position:'absolute', top: 58, left: '4%', right: '4%', height: 6,
        background:'linear-gradient(to right, #e0e0e0 0%, #111 100%)', borderRadius: 3, zIndex: 1,
      }}/>
      <div style={{ display:'flex', gap: 4, position:'relative', zIndex: 2 }}>
        <TemplateDot d="D-5" n="①" label="오픈알림"     filter="전체 수신동의자" />
        <TemplateDot d="D-4" n="②" label="오픈리마인드" filter="− ①수신자" />
        <TemplateDot d="D-3" n="③" label="D-1 안내"     filter="신청자만" />
        <TemplateDot d="D-2" n="④" label="당일리마인드" filter="신청자만" />
        <TemplateDot d="D-2" n="⑤" label="할인쿠폰"     filter="미신청자만" />
        <TemplateDot d="D-1" n="⑥" label="입장링크"     filter="결제자만" />
        <TemplateDot d="D-0" n="⑦" label="시작알림"     filter="결제자만" hl />
        <TemplateDot d="D-0" n="⑧" label="혜택안내"     filter="참석자만" />
        <TemplateDot d="D+2" n="⑨" label="VOD발송"     filter="참석자만" />
      </div>
    </div>

    <div style={{ display:'flex', gap: 32, alignItems:'center', padding:'24px 32px', background:'var(--ink)', color:'#fff', borderRadius: 12 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color:'var(--yellow)' }}>9번 발송 · 매번 다른 타겟.</div>
      <div style={{ fontSize: 22, color:'#ddd', marginLeft:'auto' }}>예전엔 이걸 매번 — <b style={{ color:'#fff' }}>수동 SQL</b>로.</div>
    </div>
  </Slide>
);

// ── 09 · 그래서 자동화 ─────────────────────────────────
const S09 = () => (
  <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', alignItems:'flex-start' }}>
      <div className="kicker">그래서,</div>
      <div className="h-hero" style={{ fontSize: 220, fontWeight: 800, lineHeight: 1.05, letterSpacing:'-0.04em' }}>
        <span style={{ background:'var(--yellow)', padding:'0 0.08em', boxDecorationBreak:'clone', WebkitBoxDecorationBreak:'clone' }}>자동화</span>.
      </div>
      <div className="body" style={{ fontSize: 36, marginTop: 48, fontWeight: 500 }}>
        한 번의 승인으로 — 9번 발송.
      </div>
    </div>
  </Slide>
);

// ── 10 · 자동화 이후 지금 (슬랙 모달 크게) ─────────────
const SlackModalMock = ({ scale = 1 }) => (
  <div style={{
    width: 820 * scale,
    background: '#fff', borderRadius: 18, overflow:'hidden',
    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.28)',
    border:'1px solid #e4e4e4',
  }}>
    <div style={{ padding:'22px 28px', borderBottom:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div style={{ fontWeight: 800, fontSize: 22 }}># 오늘의 알림톡 · 승인 요청</div>
      <div style={{ color:'#999', fontSize: 18 }}>✕</div>
    </div>
    <div style={{ padding:'24px 28px', display:'flex', gap: 14, alignItems:'center', background:'#f9f9f9' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background:'var(--yellow)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 24 }}>🌟</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>알림톡봇 <span style={{ fontSize: 13, background:'#eee', padding:'2px 8px', borderRadius: 4, marginLeft: 6, color:'#666' }}>앱</span></div>
        <div style={{ color:'#888', fontSize: 14 }}>오전 10:00</div>
      </div>
    </div>
    <div style={{ padding:'28px' }}>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>🔗 [#6 입장링크] 비개발자를 위한 클로드코드앱 &amp; 깃헙 실전 정복기 <span style={{ color:'#888', fontWeight: 400, fontSize: 16 }}>— 수정됨 ✏️</span></div>
      <div style={{ fontSize: 17, color:'#444', lineHeight: 1.6, marginBottom: 14 }}>
        <b>대상:</b> 86명 &nbsp; <b>⏰ 발송시간:</b> 19:30 &nbsp; <b>🔗 URL:</b> sepia-quartz-81f.notion.site/3305c...
      </div>
      <div style={{ background:'#f5f5f5', borderRadius: 10, padding:'18px 22px', fontSize: 16, lineHeight: 1.7, color:'#333' }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>📋 수정된 미리보기:</div>
        {'{이름}'}님께서 신청하신 <b>이기적공유회</b>가 <span style={{ background:'var(--yellow)', padding:'0 6px', fontWeight:700 }}>20:00</span>에 시작됩니다 😊 늦지 않게 입장해주세요!
      </div>
      <div style={{ marginTop: 16, fontSize: 14, color:'#999' }}>⚠️ 승인 시 예약 발송이 확정됩니다. 카피·링크·시간을 반드시 확인 후 승인해주세요.</div>
      <div style={{ marginTop: 20, display:'flex', gap: 10 }}>
        <button style={{ padding:'12px 24px', background:'#2eb67d', color:'#fff', border:'none', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>✅ 이대로 발송</button>
        <button style={{ padding:'12px 24px', background:'#fff', border:'1px solid #ccc', borderRadius: 8, fontSize: 16, fontWeight: 600 }}>✏️ 수정</button>
        <button style={{ padding:'12px 24px', background:'#fff', border:'1px solid #ccc', borderRadius: 8, fontSize: 16, fontWeight: 600, color:'#c4343b' }}>❌ 취소</button>
      </div>
    </div>
  </div>
);

const S10 = () => (
  <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', gap: 80, alignItems:'center', height:'100%' }}>
      <div style={{ flex:'0 0 36%' }}>
        <div className="kicker">지금은,</div>
        <div className="h-l" style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.15 }}>
          슬랙 <span style={{ background:'var(--yellow)', padding:'0 0.1em' }}>승인 한 번</span>.
        </div>
        <div className="body" style={{ fontSize: 26, marginTop: 40, lineHeight: 1.55 }}>
          오늘 나갈 알림톡 리스트가 슬랙으로 와요.<br/>
          카피·시간·링크 확인 후 <b>이대로 발송</b> 누르면 끝.
        </div>
      </div>
      <div style={{ flex: 1, display:'flex', justifyContent:'center' }}>
        <SlackModalMock />
      </div>
    </div>
  </Slide>
);

// ── 11 · 3h → 5min (Before/After) ─────────────────────
const S11 = () => (
  <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 바뀐 것.</div>
    <div className="h-l" style={{ fontSize: 56, marginBottom: 64, fontWeight: 600 }}>
      공유회 1건에 드는 시간.
    </div>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 80, marginTop: 40 }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing:'0.22em', color:'#999', marginBottom: 24 }}>BEFORE</div>
        <div style={{ fontSize: 280, fontWeight: 900, color:'#bbb', letterSpacing:'-0.05em', lineHeight: 1 }}>3h</div>
        <div style={{ fontSize: 24, color:'#888', marginTop: 16 }}>하루 3시간, 수동 SQL + 발송</div>
      </div>
      <div style={{ fontSize: 140, color:'#ddd', fontWeight: 200 }}>→</div>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing:'0.22em', color:'var(--ink)', marginBottom: 24 }}>AFTER</div>
        <div style={{
          fontSize: 280, fontWeight: 900, letterSpacing:'-0.05em', lineHeight: 1,
          background:'var(--yellow)', padding:'0 0.08em',
          display:'inline-block', color:'var(--ink)',
        }}>5min</div>
        <div style={{ fontSize: 24, color:'var(--ink)', fontWeight: 600, marginTop: 16 }}>슬랙 승인 한 번, 끝.</div>
      </div>
    </div>
  </Slide>
);

// ── 12 · 02 섹션 커버 ─────────────────────────────────
const S12 = () => (
  <Slide theme="dark" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%' }}>
      <div style={{ color:'#888', fontSize: 32, fontWeight: 700, letterSpacing:'0.22em', marginBottom: 28 }}>02</div>
      <div className="h-hero" style={{ fontSize: 96, fontWeight: 700, letterSpacing:'-0.03em' }}>
        <span style={{ color:'var(--yellow)', fontWeight: 800 }}>자동화 구조</span> 설계.
      </div>
      <div className="body" style={{ fontSize: 30, marginTop: 48, color:'#bbb', fontWeight: 400 }}>
        퇴근한 뒤에도 메시지가 나가려면, 구조가 있어야 했어요.
      </div>
    </div>
  </Slide>
);

window.S07 = S07; window.S08 = S08; window.S09 = S09;
window.S10 = S10; window.S11 = S11; window.S12 = S12;
