// Slides 13-18 — 02·자동화 구조 설계 본편 (v8 rev2)

// ── 13 · 셀피쉬가 쓰는 스택 ────────────────────────────
const S13 = () => (
  <Slide theme="dark" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">셀피쉬가 쓰는 스택.</div>
    <div className="h-xl" style={{ marginBottom: 24, fontSize: 80 }}>
      세 개로 만들었어요.
    </div>
    <div className="body" style={{ fontSize: 26, marginBottom: 56, color:'#bbb' }}>
      슬랙 · 수파베이스 · n8n, 이 조합으로 <b style={{ color:'#fff' }}>알림톡 자동화</b>를 돌려요.
    </div>
    <div style={{ display:'flex', gap: 28 }}>
      {[
        {n:'01', t:'Slack',    d1:'커뮤니케이션 · 승인', d2:'매일 아침 승인 모달이 여기로.'},
        {n:'02', t:'Supabase', d1:'데이터베이스',        d2:'멤버·신청·일정이 한 곳에.'},
        {n:'03', t:'n8n',      d1:'자동화 워크플로우',    d2:'서버에서 24시간 돌아요.',
                               note:'왜 n8n? — Make/Zapier 대비 조건 분기·DB 직접 접속·자체 호스팅 자유.'},
      ].map((c,i) => (
        <div key={i} style={{
          flex: 1, padding:'40px 36px',
          background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)',
          borderRadius: 16, minHeight: 440
        }}>
          <div style={{ fontSize: 20, fontWeight: 900, color:'rgba(255,255,255,0.4)' }}>{c.n}</div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 8, letterSpacing:'-0.03em' }}>{c.t}</div>
          <div style={{ fontSize: 18, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.18em', fontWeight: 700, marginTop: 32 }}>{c.d1}</div>
          <div style={{ fontSize: 22, color:'#ddd', marginTop: 10 }}>{c.d2}</div>
          {c.note && (
            <div style={{
              marginTop: 18, padding:'14px 16px',
              background:'rgba(233,237,18,0.12)', border:'1px dashed var(--yellow)', borderRadius: 10,
              fontSize: 16, color:'var(--yellow)', lineHeight: 1.5,
            }}>{c.note}</div>
          )}
        </div>
      ))}
    </div>
  </Slide>
);

// ── 14 · 기획 단계 (Claude와 상의) ─────────────────────
const S14 = () => (
  <Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">먼저 Claude와 기획부터.</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 48, fontWeight: 700 }}>
      <span className="u-y">상황부터</span> 얘기하고, <span className="u-y">자동화 방법</span>을 같이 설계.
    </div>
    <div style={{ display:'flex', gap: 40, alignItems:'stretch' }}>
      {/* 나의 요청 */}
      <div style={{ flex: 1, padding:'36px 32px', background:'#f5f5f5', borderRadius: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing:'0.2em', color:'#999', marginBottom: 16 }}>TO: CLAUDE</div>
        <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.65, color:'#222' }}>
          "공유회 1건에 알림톡 9개가 나가.<br/>
          타깃은 매번 달라 (신청자, 미신청자, 결제자…).<br/>
          카카오 알림톡 템플릿은 이미 있고,<br/>
          승인받은 걸 <b>타이밍 맞춰 발송</b>하고 싶어.<br/>
          어떻게 자동화할 수 있을까?"
        </div>
      </div>
      {/* Claude 답변 체크리스트 */}
      <div style={{ flex: 1, padding:'36px 32px', background:'var(--ink)', color:'#fff', borderRadius: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing:'0.2em', color:'var(--yellow)', marginBottom: 16 }}>CLAUDE →</div>
        <div style={{ fontSize: 20, lineHeight: 1.8 }}>
          <div>✓ Supabase에 <b>타깃 조건을 SQL</b>로 정의</div>
          <div>✓ <b>SOLAPI</b>로 카카오 알림톡 발송</div>
          <div>✓ <b>스케줄러</b>가 시각마다 실행</div>
          <div>✓ 승인 모달은 <b>Slack 인터랙티브</b>로</div>
          <div style={{ marginTop: 20, color:'var(--yellow)', fontWeight: 700 }}>→ 설계 초안부터 같이 짜볼게요.</div>
        </div>
      </div>
    </div>
  </Slide>
);

// ── 15 · 퇴근 대화 (반말 통일, Claude 답변 크게) ──────
const S15 = () => (
  <Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 얘기하다 보니,</div>
    <div style={{ display:'flex', flexDirection:'column', gap: 16, maxWidth: 1200, marginTop: 24, marginBottom: 48 }}>
      {[
        {who:'나',     side:'L', t:'나 6시 퇴근이거든. 근데 7시에 발송인데…'},
        {who:'나',     side:'L', t:'맥북 닫고 가도 돼?'},
      ].map((m,i)=>(
        <div key={i} style={{ display:'flex', justifyContent: m.side==='L'?'flex-start':'flex-end' }}>
          <div style={{ maxWidth: '72%' }}>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing:'0.16em', color:'#999', marginBottom: 4, textAlign: m.side==='R'?'right':'left' }}>{m.who}</div>
            <div style={{
              padding:'18px 26px',
              background: m.side==='L' ? '#f1f1f1' : 'var(--ink)',
              color: m.side==='L' ? 'var(--ink)' : '#fff',
              borderRadius: 18,
              fontSize: 26, fontWeight: 500, lineHeight: 1.4
            }}>{m.t}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Claude 답변 — 크게 */}
    <div style={{ display:'flex', justifyContent:'flex-end', marginBottom: 40 }}>
      <div style={{ maxWidth: '85%' }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing:'0.16em', color:'#999', marginBottom: 8, textAlign:'right' }}>CLAUDE</div>
        <div style={{
          padding:'40px 48px',
          background: 'var(--ink)', color:'#fff',
          borderRadius: 22, fontSize: 56, fontWeight: 800, lineHeight: 1.25, letterSpacing:'-0.03em',
          boxShadow:'0 20px 40px -10px rgba(0,0,0,0.3)',
        }}>
          "아, 노트북이 꺼지면<br/>
          <span style={{ color:'var(--yellow)' }}>저는 못 보내요.</span>"
        </div>
      </div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color:'#222' }}>
      → <span className="hl">알아서 돌아갈</span> 구조가 필요했어요.
    </div>
  </Slide>
);

// ── 16 · n8n 설계 (만드는 Claude, 돌리는 n8n) ──────────
const S16 = () => (
  <Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서,</div>
    <div className="h-xl" style={{ marginBottom: 48, fontWeight: 700 }}>
      만드는 건 <span className="hl">Claude</span>, 돌리는 건 <span className="hl">n8n</span>.
    </div>
    <div style={{ display:'flex', gap: 32, alignItems:'stretch' }}>
      {/* Claude */}
      <div className="card" style={{ flex: 1, padding:'44px 40px', minHeight: 340 }}>
        <div className="tag">만드는 역할</div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 20 }}>Claude Code</div>
        <div className="body" style={{ fontSize: 24, marginTop: 24, lineHeight: 1.5 }}>
          대화하면서 <b>워크플로우 JSON</b>을 만들어요.<br/>
          내가 말로 설명하면 <b>조건·시각·변수</b>가 설계됨.
        </div>
      </div>
      {/* Arrow */}
      <div style={{ display:'flex', alignItems:'center', color:'#bbb', fontSize: 48, fontWeight: 300 }}>→</div>
      {/* n8n */}
      <div className="card k" style={{ flex: 1, padding:'44px 40px', minHeight: 340 }}>
        <div className="tag" style={{ background:'var(--yellow)', color:'var(--ink)' }}>돌리는 역할</div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 20 }}>n8n</div>
        <div className="body" style={{ fontSize: 24, marginTop: 24, color:'#ddd', lineHeight: 1.5 }}>
          설계된 JSON을 <b style={{ color:'var(--yellow)' }}>서버</b>에 올려두면,<br/>
          내가 없어도 <b style={{ color:'var(--yellow)' }}>시각에 맞춰 실행</b>돼요.
        </div>
      </div>
    </div>
    <div style={{ marginTop: 48, padding:'20px 28px', background:'#f5f5f5', borderRadius: 12, fontSize: 22, color:'#444' }}>
      <b>Claude가 n8n 워크플로우를 설계 → 서버에 업로드 → 예약된 시각에 자동 실행.</b>
    </div>
  </Slide>
);

// ── 17 · 리스크 → 확인 알림 구조 ──────────────────────
const S17 = () => (
  <Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 또 불안했어요.</div>
    <div className="h-l" style={{ fontSize: 64, marginBottom: 48, fontWeight: 700 }}>
      완전 자동은 <span className="hl">무서워요</span>.
    </div>
    <div style={{ display:'flex', gap: 24, marginBottom: 40 }}>
      {[
        {t:'카피 오타',  d:'= 수백명이 동시에 봄'},
        {t:'시간 실수',  d:'= 엉뚱한 시각에 발송'},
        {t:'링크 깨짐',  d:'= 유입 제로'},
      ].map((c,i)=>(
        <div key={i} className="card" style={{ flex:1, padding:'32px 28px', minHeight: 180 }}>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>{c.t}</div>
          <div style={{ fontSize: 22, color:'#555' }}>{c.d}</div>
        </div>
      ))}
    </div>
    <div style={{ padding:'28px 36px', background:'var(--yellow)', borderRadius: 14, fontSize: 34, fontWeight: 800, letterSpacing:'-0.02em' }}>
      발송 전에 <span style={{ background:'var(--ink)', color:'var(--yellow)', padding:'4px 16px', borderRadius: 6 }}>나에게 먼저 확인</span>이 오게.
    </div>
    <div style={{ marginTop: 24, fontSize: 22, color:'#555' }}>
      → 슬랙으로 오늘 나갈 리스트가 모달로 떠요. 내가 <b>이대로 발송 / 수정 / 취소</b>.
    </div>
  </Slide>
);

// ── 18 · 최종 워크플로우 (+ DB 연동 마무리) ────────────
const FlowStep = ({ n, time, who, title, sub, hl }) => (
  <div style={{
    flex: 1, padding:'20px 22px',
    background: hl ? 'var(--yellow)' : '#f5f5f5',
    borderRadius: 14,
    minHeight: 180,
    display:'flex', flexDirection:'column', justifyContent:'space-between',
  }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 900, letterSpacing:'0.18em', color: hl?'var(--yellow-ink)':'#999' }}>{n} · {who}</div>
      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8, lineHeight: 1.25 }}>{title}</div>
      <div style={{ fontSize: 14, color: hl?'var(--yellow-ink)':'#666', marginTop: 8, lineHeight: 1.4 }}>{sub}</div>
    </div>
    {time && (
      <div style={{ fontSize: 13, fontWeight: 700, color: hl?'var(--yellow-ink)':'#888', marginTop: 10 }}>{time}</div>
    )}
  </div>
);

const S18 = () => (
  <Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">정리하면 이렇게 돌아가요.</div>
    <div className="h-l" style={{ fontSize: 60, marginBottom: 48, fontWeight: 700 }}>
      최종 <span className="u-y">알림톡 자동화 워크플로우</span>.
    </div>
    <div style={{ display:'flex', gap: 12, alignItems:'stretch' }}>
      <FlowStep n="STEP 1" time="매일 10:00" who="n8n"      title="스케줄 실행" sub="예약된 시각마다 자동 기동" />
      <div style={{ display:'flex', alignItems:'center', color:'#ccc', fontSize: 28 }}>→</div>
      <FlowStep n="STEP 2" who="Supabase"                  title="DB에서 타겟 조회" sub="오늘 나갈 대상자 · 신청/미신청/결제 분리" />
      <div style={{ display:'flex', alignItems:'center', color:'#ccc', fontSize: 28 }}>→</div>
      <FlowStep n="STEP 3" who="Slack"                     title="승인 모달 발송" sub="오늘 리스트 · 카피 · 시간 미리보기" hl />
      <div style={{ display:'flex', alignItems:'center', color:'#ccc', fontSize: 28 }}>→</div>
      <FlowStep n="STEP 4" who="나"                        title="확인 · 승인" sub="이대로 발송 / 수정 / 취소" hl />
      <div style={{ display:'flex', alignItems:'center', color:'#ccc', fontSize: 28 }}>→</div>
      <FlowStep n="STEP 5" who="SOLAPI"                    title="카카오 알림톡 발송" sub="예약 시각에 전송" />
    </div>

    <div style={{ display:'flex', gap: 24, marginTop: 40 }}>
      <div style={{ flex: 1, padding:'20px 24px', background:'var(--ink)', color:'#fff', borderRadius: 12, fontSize: 20, lineHeight: 1.55 }}>
        ✓ <b style={{ color:'var(--yellow)' }}>DB 연동까지</b> — 신청 전·결제 전 데이터 모두 조회해서 타겟팅.
      </div>
      <div style={{ flex: 1, padding:'20px 24px', background:'#f5f5f5', borderRadius: 12, fontSize: 20, lineHeight: 1.55, color:'#333' }}>
        ✓ <b>내가 승인하지 않으면 발송 안 됨</b> — 리스크 차단 구조.
      </div>
    </div>
  </Slide>
);

window.S13 = S13; window.S14 = S14; window.S15 = S15;
window.S16 = S16; window.S17 = S17; window.S18 = S18;
