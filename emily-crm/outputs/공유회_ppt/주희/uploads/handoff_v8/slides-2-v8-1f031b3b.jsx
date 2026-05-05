// Slides 07-12 (v8)

// ── 07 · 공유회 1건이 열리면 (채널·콘텐츠 볼륨) ────────
const S07 = () =>
<Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">공유회 한 건이 열리면,</div>
    <div className="h-xl" style={{ marginBottom: 64, fontWeight: 800, fontSize: 110, lineHeight: 1.08 }}>
      채널 <span className="hl">4</span>개, 콘텐츠 <span className="hl">10</span>개 이상.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 56 }}>
      {[
    { n: '01', t: '알림톡', d: '템플릿 9종' },
    { n: '02', t: '카톡 채널 친구', d: '오픈 마감 배너' },
    { n: '03', t: '이메일', d: '오픈 마감 소식' },
    { n: '04', t: '오픈 채팅방', d: '셀피쉬클럽 단톡방' }].
    map((c, i) =>
    <div key={i} className="card" style={{ padding: '36px 32px', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#bbb', marginBottom: 8 }}>{c.n}</div>
            <div className="h-m" style={{ fontSize: 44, fontWeight: 700 }}>{c.t}</div>
          </div>
          <div className="cap" style={{ fontSize: 22 }}>{c.d}</div>
        </div>
    )}
    </div>
    <div style={{ fontSize: 34, color: '#222', fontWeight: 500, lineHeight: 1.5 }}>
      셀피쉬클럽의 핵심 채널인 <span className="hl">알림톡</span>부터 자동화 시작.
    </div>
  </Slide>;


// ── 08 · 알림톡 9개 템플릿 (실제 스크린샷, 중앙 3×3 그리드) ──
const TARGET_COLORS = {
  '멤버십 전원': { bg: '#1e40af', fg: '#fff' },
  '미신청자': { bg: '#ea580c', fg: '#fff' },
  '신청자': { bg: '#111', fg: '#fff' },
  '참여자': { bg: '#15803d', fg: '#fff' }
};

const TEMPLATES = [
{ n: 1, title: '오픈 알림', target: '멤버십 전원' },
{ n: 2, title: '오픈 리마인드', target: '미신청자' },
{ n: 3, title: 'D-1 리마인드', target: '신청자' },
{ n: 4, title: '당일 리마인드', target: '신청자' },
{ n: 5, title: '할인 쿠폰', target: '미신청자' },
{ n: 6, title: '입장 링크', target: '신청자' },
{ n: 7, title: '라이브 시작', target: '신청자' },
{ n: 8, title: '참여 감사', target: '참여자' },
{ n: 9, title: 'VOD 발송', target: '신청자' }];


const AlimCard = ({ n, title, target }) => {
  const c = TARGET_COLORS[target];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0 }}>
      {/* 대상자 칩 — 카드 상단에 크게 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: c.bg, color: c.fg, padding: '6px 14px', borderRadius: 999,
        fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em',
        alignSelf: 'flex-start'
      }}>
        <span style={{ opacity: 0.6, fontSize: 13, fontWeight: 700 }}>#{n}</span>
        <span style={{ width: 1, height: 12, background: c.fg, opacity: 0.3 }} />
        {target}
      </div>
      {/* 이미지 — 동일 하이트로 크롭 */}
      <div style={{ position: 'relative', width: '100%', height: 260, overflow: 'hidden', borderRadius: 10, background: '#eef1f6', border: `3px solid ${c.bg}` }}>
        <img src={`alimtalk/${n}.png`} alt={title} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{title}</div>
    </div>);

};


const S08 = () =>
<Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA" bodyStyle={{ padding: '70px 80px 60px' }}>
    <div style={{ marginBottom: 50 }}>
      <div className="kicker">알림톡 하나만 봐도,</div>
      <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.12, fontSize: "55px" }}>
        공유회 한 건당 <span className="hl">템플릿 9개</span>, 대상 DB도 변수도 카피도 전부 다름.
      </div>
    </div>

    {/* 5+4 — 풍 바디 사용, 동일 하이트 */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 14 }}>
        {TEMPLATES.slice(0, 5).map((t) => <AlimCard key={t.n} {...t} />)}
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {TEMPLATES.slice(5).map((t) => <AlimCard key={t.n} {...t} />)}
        {/* 4개에서도 5칸 그리드 맞우기 위한 스페이서 */}
        <div style={{ flex: 1 }} />
      </div>
    </div>
  </Slide>;


// ── 09 · 템플릿마다 다른 변수·카피·CTA ──────────────
const S09 = () => {
  const rows = [
  { tpl: '#1번', vars: '#{이름} · #{공유회명} · #{일정} · #{기간}', copyHint: '오픈 소식, 전원 대상', cta: '공유회 신청하기' },
  { tpl: '#2번', vars: '#{이름} · #{프로그램명} · #{일정} · #{기간}', copyHint: '미신청자 한정, 톤 살짝 긴박', cta: '지금 바로 신청하기' },
  { tpl: '#3번', vars: '#{이름} · #{공유회명} · #{일정}', copyHint: '신청자 확정, 차분하게', cta: '입장링크 확인하기' },
  { tpl: '#4번', vars: '#{이름} · #{공유회명} · #{일정}', copyHint: '오늘이에요, 기대감', cta: '입장링크 확인하기' },
  { tpl: '#5번', vars: '#{이름} · #{쿠폰명} · #{종료일}', copyHint: '쿠폰 발급, 마감 강조', cta: '쿠폰 확인하기' },
  { tpl: '#6번', vars: '#{이름} · #{공유회명} · #{시간} · #{라이브혜택}', copyHint: '직전 안내, 짧고 확실하게', cta: '라이브 입장하기' },
  { tpl: '#7번', vars: '#{이름} · #{프로그램명} · #{자료집리스트}', copyHint: '지금 입장해요, 혜택 강조', cta: '라이브 참여하기' },
  { tpl: '#8번', vars: '#{이름} · #{공유회명}', copyHint: '따뜻한 마무리', cta: '공지 확인하기' },
  { tpl: '#9번', vars: '#{이름} · #{공유회명} · #{날짜} · #{채널}', copyHint: 'VOD 오픈, 열람 유도', cta: '다시보기 클릭' }];


  return (
    <Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
      <div className="kicker">같은 공유회여도, 템플릿마다</div>
      <div className="h-l" style={{ fontSize: 60, marginBottom: 32, fontWeight: 800, lineHeight: 1.1 }}>
        변수 · 카피 · CTA <span className="hl">매번 다 다름.</span>
      </div>

      {/* 표 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1.6fr 1.3fr 1fr', gap: 0, fontSize: 16, fontWeight: 900, letterSpacing: '0.14em', color: '#999', padding: '0 0 12px', borderBottom: '2px solid #111' }}>
        <div>템플릿</div>
        <div>변수</div>
        <div>카피 방향</div>
        <div>CTA</div>
      </div>
      {/* 행 */}
      {rows.map((r, i) =>
      <div key={i} style={{
        display: 'grid', gridTemplateColumns: '120px 1.6fr 1.3fr 1fr', gap: 0,
        padding: '16px 0', borderBottom: '1px solid #ececec',
        lineHeight: 1.4, alignItems: 'center'
      }}>
          <div style={{ fontWeight: 900, color: '#111', fontSize: 22 }}>{r.tpl}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 17, color: '#3b5998', lineHeight: 1.5 }}>{r.vars}</div>
          <div style={{ color: '#222', fontSize: 19, fontWeight: 500 }}>{r.copyHint}</div>
          <div style={{ fontSize: 19, color: '#111', fontWeight: 700 }}>{r.cta}</div>
        </div>
      )}

      <div style={{ marginTop: 24, padding: '26px 32px', background: '#faf8d9', borderRadius: 10, color: '#222', lineHeight: 1.4, fontSize: 34 }}>
        <b style={{ color: '#111' }}>이 조합이 매 공유회마다 새로.</b>
        &nbsp;전부 수동으로 맞춰서 발송.
      </div>
    </Slide>);

};

// ── 10 · 결과: 하루 3시간 → 5분 ─────────────────────────
const S10 = () =>
<Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">자동화 실행 후, </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, marginTop: 40 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '0.2em', color: '#999' }}>BEFORE</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          <span style={{ fontSize: 420, fontWeight: 900, lineHeight: 0.9, color: '#bbb', letterSpacing: '-0.05em' }}>3</span>
          <span style={{ fontSize: 120, fontWeight: 800, color: '#bbb' }}>시간</span>
        </div>
        <div style={{ fontSize: 26, color: '#777', marginTop: 20 }}>하루 3시간 · 수동 작성 + 발송</div>
      </div>
      <div style={{ fontSize: 140, color: '#ddd', fontWeight: 200 }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--yellow-ink)', background: 'var(--yellow)', padding: '4px 14px', borderRadius: 4, display: 'inline-block' }}>AFTER</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          <span style={{ fontSize: 420, fontWeight: 900, lineHeight: 0.9, color: 'var(--ink)', letterSpacing: '-0.05em' }}>5</span>
          <span style={{ fontSize: 120, fontWeight: 800, color: 'var(--ink)' }}>분</span>
        </div>
        <div style={{ fontSize: 26, color: '#333', marginTop: 20, fontWeight: 600 }}>하루 5분.  아침 승인 한 번이면 끝.</div>
      </div>
    </div>
    <div style={{ marginTop: 56, fontSize: 28, color: '#666', textAlign: 'center' }}>
      오늘 아침 제 메신저엔 이게 와요. <span style={{ color: 'var(--ink)', fontWeight: 700 }}>→</span>
    </div>
  </Slide>;


// ── 11 · 슬랙 승인 모달 (크게) ─────────────────────────
const SlackModalMock = () =>
<div style={{
  width: 820, background: '#fff',
  borderRadius: 16, overflow: 'hidden',
  boxShadow: '0 40px 80px -20px rgba(0,0,0,0.35)',
  border: '1px solid #e4e4e4'
}}>
    <div style={{ padding: '22px 28px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 800, fontSize: 24 }}># 오늘의 알림톡 · 승인 요청</div>
      <div style={{ color: '#999', fontSize: 20 }}>✕</div>
    </div>
    <div style={{ padding: '22px 28px', display: 'flex', gap: 14, alignItems: 'center', background: '#f9f9f9' }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🌟</div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 20 }}>알림톡봇 <span style={{ fontSize: 13, background: '#eee', padding: '3px 8px', borderRadius: 4, marginLeft: 6, color: '#666' }}>앱</span></div>
        <div style={{ color: '#888', fontSize: 16 }}>오전 10:00</div>
      </div>
    </div>
    <div style={{ padding: '28px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>🔗 [#6 입장링크] 비개발자를 위한 Claude Code 정복기</div>
      <div style={{ fontSize: 19, color: '#444', lineHeight: 1.6, marginBottom: 18 }}>
        <b>대상:</b> 218명 &nbsp; <b>⏰ 발송시간:</b> 19:50 &nbsp; <b>🔗 URL:</b> event.selfish.co/3305c…
      </div>
      <div style={{ background: '#f5f5f5', borderRadius: 10, padding: '18px 22px', fontSize: 18, lineHeight: 1.7, color: '#333' }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>📋 미리보기</div>
        {'{'}이름{'}'}님께서 신청하신 <b>이기적 공유회</b>가 <span className="hl" style={{ padding: '0 6px' }}>20:00</span>에 시작됩니다 😊 늦지 않게 입장해주세요!
      </div>
      <div style={{ marginTop: 18, fontSize: 15, color: '#999' }}>⚠️ 승인 시 예약 발송이 확정됩니다.</div>
      <div style={{ marginTop: 22, display: 'flex', gap: 12 }}>
        <button style={{ padding: '16px 28px', background: '#2eb67d', color: '#fff', border: 'none', borderRadius: 8, fontSize: 18, fontWeight: 800 }}>✅ 이대로 발송</button>
        <button style={{ padding: '16px 28px', background: '#fff', border: '1px solid #ccc', borderRadius: 8, fontSize: 18, fontWeight: 700 }}>✏️ 수정</button>
        <button style={{ padding: '16px 28px', background: '#fff', border: '1px solid #ccc', borderRadius: 8, fontSize: 18, fontWeight: 700, color: '#c4343b' }}>❌ 취소</button>
      </div>
    </div>
  </div>;


const S11 = () =>
<Slide theme="light" topLeft="01 · 지난 여정" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 64, alignItems: 'center', height: '100%' }}>
      <div style={{ flex: '0 0 36%' }}>
        <div className="kicker">지금 제 하루는,</div>
        <div className="h-l" style={{ fontSize: 80, marginTop: 16, marginBottom: 48, fontWeight: 800, lineHeight: 1.1 }}>
          메신저 <span className="hl">한 번</span>에<br />끝.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
        { n: '①', t: 'AM 10:00 · 모달 수신', d: '오늘 나갈 메시지 통합 리스트' },
        { n: '②', t: '수정·승인, 한 번에', d: '시간·링크·카피 다 모달 안에서' },
        { n: '③', t: '예약 발송, 알아서', d: '설정한 시간에 자동' }].
        map((r, i) =>
        <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#bbb', minWidth: 40 }}>{r.n}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{r.t}</div>
                <div style={{ fontSize: 20, color: '#666', marginTop: 4 }}>{r.d}</div>
              </div>
            </div>
        )}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <SlackModalMock />
      </div>
    </div>
  </Slide>;


// ── 12 · 02 섹션 커버 ─────────────────────────────────
const S12 = () =>
<Slide theme="dark" topLeft="02" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>02.</div>
      <div className="h-hero" style={{ fontSize: 140, fontWeight: 800, lineHeight: 1.08 }}>
        <span style={{ color: 'var(--yellow)' }}>자동화 구조</span><br />기획 설계
      </div>
    </div>
  </Slide>;


window.S07 = S07;window.S08 = S08;window.S09 = S09;
window.S10 = S10;window.S11 = S11;window.S12 = S12;