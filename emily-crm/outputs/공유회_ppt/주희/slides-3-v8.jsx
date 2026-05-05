// Slides 13-20 (v8) — 3번 섹션 재구성

// ── 13 · Claude랑 기획부터 ──────────────────────────────
const S13 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA"
  bodyStyle={{ justifyContent: 'flex-start', paddingTop: 120 }}>
    <div className="kicker">먼저 CLAUDE와 기획부터.</div>
    <div className="h-l" style={{ fontSize: 88, marginBottom: 56, fontWeight: 800, lineHeight: 1.15 }}>
      <span className="hl">상황부터</span> 던지고, <span className="hl">자동화 방법</span>을 같이 설계.
    </div>
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch', flex: 1 }}>
      <div style={{ flex: 1, padding: '40px 44px', background: '#f3f3f3', borderRadius: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: '#888', marginBottom: 22 }}>TO: CLAUDE</div>
        <div style={{ fontSize: 26, lineHeight: 1.7, color: '#222', fontWeight: 400 }}>
          "공유회 1건에 알림톡 9개가 나가.<br />
          타깃은 매번 달라 (신청자, 미신청자, 결제자…).<br />
          카카오 알림톡 템플릿은 이미 있고,<br />
          승인받은 걸 <span style={{ fontWeight: 700 }}>타이밍 맞춰 발송</span>하고 싶어.<br />
          어떻게 자동화할 수 있을까?"
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px 44px', background: 'var(--ink)', color: '#fff', borderRadius: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 22 }}>CLAUDE →</div>
        <ul style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', color: '#eee' }}>
          <li>✓ <span style={{ fontWeight: 700 }}>Supabase</span>에 타깃 조건을 SQL로 정의</li>
          <li>✓ <span style={{ fontWeight: 700 }}>SOLAPI</span>로 카카오 알림톡 발송</li>
          <li>✓ <span style={{ fontWeight: 700 }}>스케줄러</span>가 시각마다 실행</li>
          <li>✓ 승인 모달은 <span style={{ fontWeight: 700 }}>Slack 인터랙티브</span>로</li>
        </ul>
        <div style={{ marginTop: 22, color: 'var(--yellow)', fontWeight: 800, fontSize: 24 }}>
          → 설계 초안부터 같이.
        </div>
      </div>
    </div>
  </Slide>;


// ── 14 · 시켜봤더니 — 노트북 덮으면 멈춤 ─────────────────
const S14 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA"
  bodyStyle={{ justifyContent: 'flex-start', paddingTop: 120 }}>
    <div className="kicker">설계대로 한번 돌려보면,</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 36, fontWeight: 800, lineHeight: 1.15 }}>
      <span className="hl">노트북을 덮으면 멈추는</span> 자동화?
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 1200 }}>
      {[
    { who: '나', side: 'L', t: '이번 신청자들 뽑아서, 오후 3시에 보내줘.' },
    { who: 'CLAUDE', side: 'R', t: '네, 3시에 6,080명 전송 완료.' },
    { who: '나', side: 'L', t: '좋아. 7시에 미신청자한테도 한 번 더.\n…근데 나 6시 퇴근. 노트북 끄고 가도 돼?' },
    { who: 'CLAUDE', side: 'R', t: '아… 노트북이 꺼지면, 7시 발송 불가능.' }].
    map((m, i) =>
    <div key={i} style={{ display: 'flex', justifyContent: m.side === 'L' ? 'flex-start' : 'flex-end' }}>
          <div style={{ maxWidth: '70%' }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.16em', color: '#999', marginBottom: 6, textAlign: m.side === 'R' ? 'right' : 'left' }}>{m.who}</div>
            <div style={{
          padding: '18px 26px',
          background: m.side === 'L' ? '#f1f1f1' : 'var(--ink)',
          color: m.side === 'L' ? 'var(--ink)' : '#fff',
          borderRadius: 18,
          fontSize: 24, fontWeight: 500, lineHeight: 1.5, whiteSpace: 'pre-line'
        }}>{m.t}</div>
          </div>
        </div>
    )}
    </div>
    <div style={{ marginTop: 28, padding: '22px 32px', background: 'var(--yellow)', borderRadius: 14, display: 'inline-block' }}>
      <div style={{ fontSize: 30, fontWeight: 900 }}>→ 내 노트북과 무관하게 도는 무언가가 필요.</div>
    </div>
  </Slide>;


// ── 15 · 답은 n8n ──────────────────────────────────────
const S15 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA"
  bodyStyle={{ justifyContent: 'flex-start', paddingTop: 120 }}>
    <div className="kicker">발송은 서버에 위임.</div>
    <div className="h-l" style={{ fontSize: 96, marginBottom: 36, fontWeight: 800 }}>
      답은 <span className="hl">n8n</span>.
    </div>
    <div style={{ display: 'flex', gap: 36, alignItems: 'stretch', flex: 1 }}>
      <div style={{ flex: 1.4, minHeight: 460, background: '#fafafa', borderRadius: 14, border: '1px solid #e5e5e5', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
        <img src="assets/n8n.png" style={{ width: '100%', height: 'auto', maxHeight: 460, objectFit: 'contain', borderRadius: 6 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        {[
      { n: '01', t: '서버에서 24/7 트리거', d: '노트북과 무관하게 정해진 시각에.' },
      { n: '02', t: '노드 연결만으로 워크플로우', d: '코드 없이 박스 잇기로 발송 흐름 구성.' },
      { n: '03', t: 'Claude가 도식화', d: '기획 답변 그대로 노드 단위로 매핑.' }].
      map((c, i) =>
      <div key={i} style={{ padding: '18px 22px', background: '#fafafa', borderLeft: '4px solid var(--yellow)' }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.2em', color: '#aaa' }}>{c.n}</div>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{c.t}</div>
            <div style={{ fontSize: 18, color: '#666', marginTop: 4 }}>{c.d}</div>
          </div>
      )}
      </div>
    </div>
  </Slide>;


// ── 16 · 그래도 무서워서 — Slack 승인 ──────────────────
const S16 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA"
  bodyStyle={{ justifyContent: 'flex-start', paddingTop: 120 }}>
    <div className="kicker">전체 자동화로 가면…</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 36, fontWeight: 800, lineHeight: 1.2 }}>
      "혹시 <span className="hl">잘못 나가면</span> 어떡하지?"
    </div>

    <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
      {[
    { label: 'TARGET', t: '템플릿별 타깃', d: '신청 / 미신청 / 결제…', icon: '◉' },
    { label: 'LINK', t: 'UTM 붙은 링크', d: 'utm_source=kakao …', icon: '↗' },
    { label: 'COPY', t: '핏에 맞는 카피', d: '템플릿 변수 매칭', icon: '¶' }].
    map((c, i) =>
    <div key={i} style={{ flex: 1, padding: '18px 22px', background: '#fff', border: '1.5px solid var(--ink)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', width: 36, textAlign: 'center' }}>{c.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999' }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>{c.t}</div>
            <div style={{ fontSize: 15, color: '#666', marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>{c.d}</div>
          </div>
        </div>
    )}
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 10px' }}>
      <div style={{ fontSize: 38, color: '#bbb', lineHeight: 1 }}>↓</div>
    </div>

    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      <div style={{ flex: 1.2, minHeight: 280, background: '#fff', borderRadius: 14, border: '1px solid #e5e5e5', overflow: 'hidden', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="assets/slack-approval.png" style={{ width: '100%', height: 'auto', maxHeight: 360, objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, padding: '24px 30px', background: 'var(--ink)', color: '#fff', borderRadius: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 10 }}>SOLUTION</div>
        <div style={{ fontWeight: 800, lineHeight: 1.35, fontSize: "35px" }}>
          n8n이 발송 직전에 <span style={{ color: 'var(--yellow)', fontSize: "30px" }}>Slack 미리보기.</span>
        </div>
        <div style={{ marginTop: 10, color: '#bbb', lineHeight: 1.55, fontSize: "30px" }}>
          버튼 클릭 시에만 실제 발송.<br />완전 자동 → 사람이 한 번 보는 반자동.
        </div>
      </div>
    </div>
  </Slide>;


// ── 17 · 사용한 도구 3가지 ─────────────────────────────
const S17 = () =>
<Slide theme="dark" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA"
  bodyStyle={{ justifyContent: 'flex-start', paddingTop: 120 }}>
    <div className="kicker">결국 이 셋으로.</div>
    <div className="h-xl" style={{ marginBottom: 64, fontWeight: 800, fontSize: 110 }}>
      도구는 <span className="hl">3개</span>.
    </div>
    <div style={{ display: 'flex', gap: 24, flex: 1 }}>
      {[
    { n: '01', name: 'Supabase', role: 'DB · 타깃 조회', d: '오늘 누구에게 어떤 템플릿이 가야 하는지, DB에서 조건으로 추출.' },
    { n: '02', name: 'n8n', role: '발송 · 자동화', d: '서버에서 24/7. 매일 정해진 시각에 한 사이클 자동 실행.', accent: true },
    { n: '03', name: 'Slack', role: '승인 · 검증', d: '발송 직전 미리보기 도착. 클릭 시에만 실제 발송.' }].
    map((c, i) =>
    <div key={i} style={{
      flex: 1,
      padding: '40px 32px',
      background: c.accent ? 'rgba(233,237,18,0.08)' : 'rgba(255,255,255,0.04)',
      border: c.accent ? '1px solid rgba(233,237,18,0.4)' : '1px solid rgba(255,255,255,0.12)',
      borderRadius: 16
    }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: c.accent ? 'var(--yellow)' : '#888' }}>{c.n}</div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 14 }}>{c.name}</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8, color: c.accent ? 'var(--yellow)' : '#bbb' }}>{c.role}</div>
          <div style={{ fontSize: 20, color: '#bbb', marginTop: 20, lineHeight: 1.5 }}>{c.d}</div>
        </div>
    )}
    </div>
  </Slide>;


// ── 18 · 전체 플로우 시각화 ───────────────────────────
const S18 = () => {
  const days = [
  { d: 'D-5', t: '#1 오픈알림', tm: '10:00', done: true },
  { d: 'D-3', t: '#2 미신청 리마인드', tm: '19:00', done: true },
  { d: 'D-2', t: '#5 할인쿠폰', tm: '14:00', done: true },
  { d: 'D-1', t: '#3 D-1 리마인드', tm: '14:00', done: true },
  { d: 'D-0', t: '#6 입장링크', tm: '11:11', today: true },
  { d: 'D+1', t: '#8 신청자 혜택', tm: '11:00' },
  { d: 'D+3', t: '#9 VOD 발송', tm: '15:00' }];

  return (
    <Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA" bodyStyle={{ justifyContent: 'flex-start', paddingTop: 140, paddingBottom: 90 }}>
      <div className="kicker">매일 아침,</div>
      <div className="h-xl" style={{ marginBottom: 72, fontWeight: 800, fontSize: 72, lineHeight: 1.05 }}>
        10시에 크론이 한 번 돌고<br />— <span className="hl">오늘 보낼 템플릿이 슬랙으로.</span>
      </div>

      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 10 }}>DAILY CRON · 매일 10:00 KST</div>
          <div style={{ fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 22, fontSize: "40px" }}>
            오늘은 D-며칠? <span style={{ color: '#999', fontWeight: 700 }}>보낼 게 있나?</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {days.map((day, i) => {
              const isToday = day.today;
              const isDone = day.done;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'baseline', gap: 18,
                  padding: isToday ? '16px 0' : '13px 0',
                  borderTop: i === 0 ? '1.5px solid var(--ink)' : '1px solid #e5e5e5',
                  borderBottom: i === days.length - 1 ? '1.5px solid var(--ink)' : 'none'
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 900, minWidth: 60, color: isDone ? '#bbb' : 'var(--ink)' }}>{day.d}</div>
                  <div style={{ fontSize: isToday ? 24 : 22, fontWeight: isToday ? 900 : 700, flex: 1, color: isDone ? '#bbb' : 'var(--ink)', textDecoration: isDone ? 'line-through' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {day.t}
                    {isToday && <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.2em', background: 'var(--yellow)', color: 'var(--ink)', padding: '4px 10px', borderRadius: 4 }}>오늘</span>}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700, color: isDone ? '#bbb' : isToday ? 'var(--ink)' : '#666' }}>{day.tm}</div>
                </div>);
            })}
          </div>
          <div style={{ fontSize: 17, color: '#555', marginTop: 22, lineHeight: 1.55 }}>
            오늘은 <span style={{ background: 'var(--yellow)', padding: '1px 6px', fontWeight: 800, color: 'var(--ink)' }}>D-0(당일)</span>, #6 입장링크가 슬랙으로. 내일은 또 내일 거.
          </div>
        </div>

        <div style={{ flex: '0 0 540px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 10 }}>SLACK · #알림톡-승인</div>
          <img src="assets/slack-approval.png" alt="Slack 승인 카드" style={{ width: '100%', borderRadius: 14, border: '1.5px solid #e5e5e5', boxShadow: '0 22px 50px rgba(0,0,0,0.12)', display: 'block' }} />
          <div style={{ background: 'var(--yellow)', borderRadius: 12, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 18, marginTop: 18 }}>
            <div style={{ fontSize: 32 }}>✅</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--ink)' }}>이대로 발송</div>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4, lineHeight: 1.25 }}>오늘 11:11에 자동 전송.</div>
            </div>
          </div>
        </div>
      </div>
    </Slide>);
};


// ── 19 · 03 섹션 커버 ──────────────────────────────────
const S19 = () =>
<Slide theme="dark" topLeft="03" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>03.</div>
      <div className="h-hero" style={{ fontSize: 140, fontWeight: 800, lineHeight: 1.08 }}>
        AI한테 <span style={{ color: 'var(--yellow)' }}>내 맥락</span>을<br />심는 법.
      </div>
      <div className="body" style={{ fontSize: 30, marginTop: 48, color: '#bbb' }}>
        '이게 하네스구나'를 알기까지의 여정.
      </div>
    </div>
  </Slide>;


// ── 20 · 문제 상황: 말풍선 3개 (글자 키움) ──────────────
const S20 = () =>
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
    bodyStyle={{ justifyContent: 'flex-start', paddingTop: 180 }}>
    <div className="kicker">하다 보니,</div>
    <div className="h-xl" style={{ fontSize: 120, marginBottom: 80, fontWeight: 800, lineHeight: 0.98 }}>
      계속 되는 <span className="hl">문제들.</span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
      {[
        { side: 'L', t: '다른 맥북 켜면 → 일주일 전이 마지막 기억.' },
        { side: 'R', t: '같은 일을 시켰는데 → 매번 다른 대답.', accent: true },
        { side: 'L', t: '지난번 어떻게 했더라? → 매번 다시 설명.' }
      ].map((c, i) =>
        <div key={i} style={{ display: 'flex', justifyContent: c.side === 'R' ? 'flex-end' : 'flex-start' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '28px 48px',
            background: c.accent ? 'var(--ink)' : '#f1f1f1',
            color: c.accent ? '#fff' : 'var(--ink)',
            borderRadius: 999,
            fontSize: 52, fontWeight: 800,
            lineHeight: 1.15, letterSpacing: '-0.015em',
            maxWidth: '92%',
            boxShadow: c.accent ? '0 14px 30px rgba(0,0,0,0.18)' : 'none'
          }}>
            {c.t}
          </div>
        </div>
      )}
    </div>
  </Slide>;


// ── 20b · 알림톡 1건 = 8가지 + CLAUDE.md 한 파일에 다 박힘 ──
const S20b = () =>
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
    bodyStyle={{ justifyContent: 'flex-start', paddingTop: 96 }}>
    <div className="kicker">왜 이러지? 까보니까,</div>
    <div className="h-xl" style={{ fontSize: 92, marginBottom: 16, fontWeight: 800, lineHeight: 0.98 }}>
      <span className="hl">알림톡 1건</span> 보내려면 알아야 할 게 <b>8가지.</b>
    </div>
    <div className="body" style={{ fontSize: 28, marginBottom: 36, color: '#666', fontWeight: 600 }}>
      근데 이게 전부 <b style={{ color: 'var(--ink)' }}>CLAUDE.md 한 파일</b>에 박혀 있었어요.
    </div>

    <div style={{ display: 'flex', gap: 28, flex: 1, alignItems: 'stretch' }}>
      {/* 좌: 8가지 그리드 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.24em', color: '#888', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>AI가 알아야 할 것들 · 8</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, flex: 1 }}>
          {[
            { t: '템플릿 9종', d: '#1 오픈 / #6 입장' },
            { t: '발송 시각', d: 'D-5 / D-3 / D-0' },
            { t: '타깃 분기', d: '신청 / 미신청 / VIP' },
            { t: '변수 매핑', d: '#{이름} #{시간}' },
            { t: '카피 규칙', d: '존댓말 · 금지어' },
            { t: 'UTM 21종', d: 'source · medium' },
            { t: 'API 키', d: 'PF · 템플릿 ID' },
            { t: '발송 예외', d: '거부 / 이탈 / 중복' }
          ].map((it, i) =>
            <div key={i} style={{
              padding: '18px 22px',
              background: '#f5f5f5',
              borderRadius: 10,
              borderLeft: '3px solid #ccc',
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--ink)', lineHeight: 1.15 }}>{it.t}</div>
              <div style={{ fontSize: 15, color: '#666', marginTop: 6, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.4 }}>{it.d}</div>
            </div>
          )}
        </div>
      </div>

      {/* 화살표 */}
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>→</div>
      </div>

      {/* 우: CLAUDE.md 한 파일 미리보기 (실제 내용) */}
      <div style={{ flex: '0 0 480px', background: '#0d0d0d', borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', color: '#eee', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #2a2a2a' }}>
          <div style={{ width: 10, height: 10, background: 'var(--yellow)', borderRadius: 2 }} />
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>CLAUDE.md</div>
          <div style={{ fontSize: 12, color: '#777', fontFamily: 'JetBrains Mono, monospace', marginLeft: 'auto' }}>103 lines</div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.65, color: '#bbb', flex: 1, overflow: 'hidden' }}>
          <div style={{ color: '#888' }}># selfish_sharing — 공유회 CRM 자동화</div>
          <div style={{ marginTop: 10, color: '#888', fontWeight: 800 }}>## 프로젝트 목표</div>
          <div>"CRM 시작해줘 {'{'}URL{'}'}" 한 마디로 …</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 상세 스펙 (PRD)</div>
          <div>prd/00-overview · 01-알림톡 · 02-카플친</div>
          <div>03-오픈채팅 · 04-이메일 · 05-인스타 …</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 구조 원칙 (삼단구조)</div>
          <div>스킬 · 에이전트 · PRD = SSOT</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 에이전트 맵</div>
          <div>director · copywriter · verifier …</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 하네스 운영 규칙 (필독)</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## Git 운영 규칙</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 자동화 스크립트</div>
          <div>lint-copy · lint-memory · mask-secrets …</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 안전 규칙 (절대 금지)</div>
          <div>main 직접 push 금지 …</div>
          <div style={{ marginTop: 8, color: '#888', fontWeight: 800 }}>## 작업 습관 · 세션 루틴 · 연동 …</div>
          <div style={{ marginTop: 12, color: '#444' }}>… 모든 규칙이 이 한 파일에</div>
        </div>
        <div style={{ marginTop: 14, padding: '12px 16px', background: '#f5f5f5', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 15, fontWeight: 700, color: 'var(--inkyellow)', lineHeight: 1.4 }}>
          한 파일에 다 욱여넣음 → AI가 매번 다 읽어야 함.
        </div>
      </div>
    </div>
  </Slide>;


// ── 20c · 3개 레이어 분할 — 각 역할 목업으로 (글자 큼) ─
const S20c = () =>
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
    bodyStyle={{ justifyContent: 'flex-start', paddingTop: 88 }}>
    <div className="h-xl" style={{ fontSize: 88, marginBottom: 12, fontWeight: 800, lineHeight: 0.98 }}>
      <b>3개 레이어</b>로 분할.
    </div>
    <div className="body" style={{ fontSize: 24, marginBottom: 28, color: '#666', fontWeight: 600 }}>
      뭘 하는 친구들인지 — 한눈에.
    </div>

    <div style={{ display: 'flex', gap: 18, flex: 1, alignItems: 'stretch' }}>

      {/* ① 에이전트 */}
      <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', background: '#fff', border: '1.5px solid #e5e5e5', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1.5px solid #f0f0f0' }}>
          <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.28em', color: '#aaa', fontFamily: 'JetBrains Mono, monospace' }}>01 · AGENT</div>
          <div style={{ fontSize: 38, fontWeight: 900, marginTop: 6, letterSpacing: '-0.02em' }}>에이전트</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#666', marginTop: 6 }}>일 시키는 사람들 — 9명</div>
        </div>
        <div style={{ flex: 1, padding: '20px 22px', fontFamily: 'JetBrains Mono, monospace', fontSize: 15, lineHeight: 1.5, color: '#222' }}>
          {/* 실무 라인 */}
          <div style={{ padding: '8px 12px', background: '#fafafa', border: '1px solid #eee', borderRadius: 6, marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#444' }}>🎬 실무 라인 (6명) — 실제 일하는 애들</div>
          </div>
          {[
            ['🎯', 'director',         '전체 지휘 · 순서 잡기'],
            ['📅', 'timeline-planner', '날짜/시간 타임라인 짜기'],
            ['🔍', 'data-collector',   'URL 크롤 + DB 조회'],
            ['✍️', 'copywriter',       '카피 작성 (채널별)'],
            ['🎨', 'media-ops',        'UTM + 배너 + 이미지'],
            ['📨', 'dispatcher',       'Slack 전달 + 승인 대기']
          ].map(([icon, name, role], i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 8px' }}>
              <span style={{ width: 18 }}>{icon}</span>
              <span style={{ fontWeight: 800, color: '#000', minWidth: 144 }}>{name}</span>
              <span style={{ color: '#666', fontSize: 13 }}>{role}</span>
            </div>
          )}

          {/* 검수 라인 */}
          <div style={{ padding: '8px 12px', background: '#fff8d6', border: '1px solid #e8d27a', borderRadius: 6, margin: '14px 0 10px' }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#444' }}>🔒 검수 라인 (3명) — 검사하는 애들</div>
          </div>
          {[
            ['✅', 'verifier',      '산출물 규칙 위반 검사'],
            ['🧐', 'code-reviewer', '코드/n8n 변경 검토'],
            ['📓', 'session-retro', '세션 끝날 때 정리/박제']
          ].map(([icon, name, role], i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 8px' }}>
              <span style={{ width: 18 }}>{icon}</span>
              <span style={{ fontWeight: 800, color: '#000', minWidth: 144 }}>{name}</span>
              <span style={{ color: '#666', fontSize: 13 }}>{role}</span>
            </div>
          )}
        </div>
        <div style={{ padding: '14px 24px', background: '#fafafa', fontSize: 17, color: '#333', fontWeight: 700, borderTop: '1px solid #f0f0f0', lineHeight: 1.4 }}>
          → "카피 짜줘" 하면<br/>본부장이 카피라이터 호출.
        </div>
      </div>

      {/* ② PRD */}
      <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', background: 'var(--ink)', borderRadius: 14, overflow: 'hidden', color: '#fff' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #2a2a2a' }}>
          <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.28em', color: 'var(--yellow)', fontFamily: 'JetBrains Mono, monospace' }}>02 · PRD</div>
          <div style={{ fontSize: 38, fontWeight: 900, marginTop: 6, letterSpacing: '-0.02em' }}>PRD</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#bbb', marginTop: 6 }}>반복할 일의 규칙집 — 10개</div>
        </div>
        <div style={{ flex: 1, padding: '18px 22px', fontFamily: 'JetBrains Mono, monospace', fontSize: 16, lineHeight: 1.45, color: '#eee' }}>
          <div style={{ color: '#888', fontSize: 14 }}># prd/01-알림톡.md</div>
          <div style={{ marginTop: 10, color: '#888', fontSize: 15, fontWeight: 800 }}>## 템플릿 9종</div>
          {[
            ['①', '오픈알림',     '모달'],
            ['②', '오픈리마인드', '모달'],
            ['③', 'D-1 리마인드', '모달'],
            ['④', '당일 리마인드', '자동'],
            ['⑤', '할인쿠폰',     '모달'],
            ['⑥', '입장링크',     '모달'],
            ['⑦', '시작알림',     '자동'],
            ['⑧', '혜택안내',     '자동'],
            ['⑨', 'VOD 발송',    '자동']
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginTop: 3 }}>
              <span style={{ color: '#666', width: 16 }}>{r[0]}</span>
              <span style={{ flex: 1 }}>{r[1]}</span>
              <span style={{ color: r[2] === '모달' ? '#fff' : '#777', fontWeight: 800 }}>{r[2]}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 24px', background: '#0a0a0a', fontSize: 17, color: '#fff', fontWeight: 700, borderTop: '1px solid #2a2a2a', lineHeight: 1.4 }}>
          → "6주차 D-3 발송" 하면<br/>여기 와서 규칙 확인.
        </div>
      </div>

      {/* ③ CLAUDE.md */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', border: '1.5px solid #e5e5e5', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1.5px solid #f0f0f0' }}>
          <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.28em', color: '#aaa', fontFamily: 'JetBrains Mono, monospace' }}>03 · INDEX</div>
          <div style={{ fontSize: 38, fontWeight: 900, marginTop: 6, letterSpacing: '-0.02em' }}>CLAUDE.md</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#666', marginTop: 6 }}>프로젝트 안내 표지판</div>
        </div>
        <div style={{ flex: 1, padding: '20px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: 17, lineHeight: 1.6, color: '#222' }}>
          <div style={{ color: '#888', fontSize: 14 }}># CLAUDE.md</div>
          <div style={{ marginTop: 10, color: '#b88600', fontWeight: 800 }}>## 프로젝트 목표</div>
          <div style={{ marginTop: 8, color: '#b88600', fontWeight: 800 }}>## PRD 인덱스</div>
          <div style={{ marginTop: 8, color: '#b88600', fontWeight: 800 }}>## 에이전트 맵</div>
          <div style={{ marginTop: 8, color: '#b88600', fontWeight: 800 }}>## 안전 규칙</div>

          <div style={{ marginTop: 18, padding: '14px 16px', background: '#fafafa', borderRadius: 8, fontSize: 16, color: '#333', lineHeight: 1.5, fontWeight: 600 }}>
            세부 내용은 <b style={{ color: '#000' }}>안 적음.</b><br/>"어디로 가야 할지"만 가리킴.
          </div>
        </div>
        <div style={{ padding: '14px 24px', background: '#fafafa', fontSize: 17, color: '#333', fontWeight: 700, borderTop: '1px solid #f0f0f0', lineHeight: 1.4 }}>
          → 세션 시작하면<br/>자동으로 먼저 읽힘.
        </div>
      </div>

    </div>
  </Slide>;


// ── 20c2 · 하네스란? — 유즈케이스 1개로 설명 ──────────────
const S20c2 = () =>
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
    bodyStyle={{ justifyContent: 'flex-start', paddingTop: 140 }}>
    <div className="kicker">근데 이거 잘 된 건가? Claude한테 물어봤더니 —</div>
    <div className="h-xl" style={{ fontSize: 110, marginBottom: 20, fontWeight: 800, lineHeight: 0.98 }}>
      이게 바로 <span className="hl">하네스</span>래요.
    </div>
    <div className="body" style={{ fontSize: 32, marginBottom: 56, color: '#666', fontWeight: 600 }}>
      AI한테 <b style={{ color: 'var(--ink)' }}>공간 · 기억 · 학습</b>을 어떻게 줄지 — 내가 직접 설계하는 장치.
    </div>

    {/* 유즈케이스 명령 */}
    <div style={{ marginBottom: 28, padding: '24px 32px', background: 'var(--ink)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.24em', color: '#999', flex: '0 0 auto', fontFamily: 'JetBrains Mono, monospace' }}>질문</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>너가 생각하는 하네스는 뭐야?</div>
    </div>

    {/* 3축이 어떻게 작동하나 */}
    <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
      {[
        { k: '공간', kEn: 'SPACE',    role: '안전한 작업 환경',  t: '기술적으로 강제.' },
        { k: '기억', kEn: 'MEMORY',   role: 'AI는 세션마다 까먹음', t: '파일이 대신 기억.', accent: true },
        { k: '학습', kEn: 'LEARNING', role: '피드백 루프',       t: '실수 → 박제 → 자동 회피.' }
      ].map((c, i) => {
        const acc = c.accent;
        return (
          <div key={i} style={{
            flex: 1, padding: '24px 26px',
            background: acc ? 'var(--yellow)' : '#fff',
            border: acc ? '2px solid var(--ink)' : '1.5px solid #e5e5e5',
            borderRadius: 14,
            display: 'flex', flexDirection: 'column', gap: 8
          }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.28em', color: '#888', fontFamily: 'JetBrains Mono, monospace' }}>0{i+1} · {c.kEn}</div>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{c.k}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: acc ? '#444' : '#666', lineHeight: 1.3, marginBottom: 14 }}>{c.role}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.01em', marginTop: 'auto' }}>{c.t}</div>
          </div>);
      })}
    </div>
  </Slide>;


// ── 20d-axis 카드 컴포넌트 (재사용) ────────────
const AxisDeepCard = ({ axisKo, hero, useCase, supports }) =>
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
    bodyStyle={{ justifyContent: 'flex-start', paddingTop: 90 }}>
    {/* 축 라벨 */}
    <div style={{
      fontSize: 22, fontWeight: 900, color: '#aaa',
      letterSpacing: '0.32em', fontFamily: 'JetBrains Mono, monospace',
      marginBottom: 14
    }}>{axisKo}</div>

    {/* 히어로 한 줄 */}
    <div style={{
      fontSize: 88, fontWeight: 800,
      lineHeight: 1.05, letterSpacing: '-0.03em',
      color: 'var(--ink)',
      marginBottom: 40
    }}>
      {hero}
    </div>

    {/* 본문: 좌(유즈케이스) + 우(보충 항목) */}
    <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
      {/* 좌측 유즈케이스 — scenario 박스 */}
      <div style={{
        flex: 1.1,
        background: 'var(--ink)', color: '#fff',
        borderRadius: 14, padding: '32px 36px',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.28em', color: 'var(--yellow)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>USE CASE — 실제로 이렇게 작동해요</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          {useCase.map((u, i) =>
            <div key={i} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              paddingTop: i === 0 ? 0 : 16,
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{
                flex: '0 0 auto',
                padding: '6px 14px',
                background: u.tag === '상황' ? 'rgba(255,255,255,0.15)' : 'var(--yellow)',
                color: u.tag === '상황' ? '#fff' : 'var(--ink)',
                borderRadius: 4,
                fontSize: 15, fontWeight: 900, letterSpacing: '0.2em',
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: 4
              }}>{u.tag}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.4, letterSpacing: '-0.005em', flex: 1 }}>{u.t}</div>
            </div>
          )}
        </div>
      </div>

      {/* 우측 보충 — 짧은 항목 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.28em', color: '#999', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>이런 장치들이 깔려 있어요</div>
        {supports.map((s, i) =>
          <div key={i} style={{
            flex: 1,
            padding: '18px 22px',
            background: '#fafafa',
            border: '1.5px solid #ececec',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 18
          }}>
            <div style={{ flex: '0 0 auto', fontSize: 16, fontWeight: 900, color: '#bbb', fontFamily: 'JetBrains Mono, monospace' }}>0{i + 1}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, letterSpacing: '-0.005em' }}>{s}</div>
          </div>
        )}
      </div>
    </div>
  </Slide>;


// ── 20d-1 · 공간 ─────────────────────────────────────────
const S20d1 = () =>
  <AxisDeepCard
    axisKo="공간 · SPACE"
    hero={<>안전한 작업 환경 — <span className="hl">기술적으로 강제.</span></>}
    useCase={[
      { tag: '상황', t: '에밀리가 Slack 승인을 안 누름.' },
      { tag: '결과', t: '발송 자체가 일어나지 않아요. 사람이 까먹어도 시스템이 막음.' },
      { tag: '상황', t: '카피에 "90% 할인" 같은 금지어가 들어감.' },
      { tag: '결과', t: 'verifier가 자동 차단 → copywriter에게 반려.' }
    ]}
    supports={[
      '린터 실패 시 git commit 자체가 거부돼요.',
      '승인된 템플릿 9종만 발송 가능. 그 외는 시스템이 거부.',
      '규격 틀린 이미지(800×600 / 1080×1080) 자동 거부.',
      '발송 직전 DB 재조회 → 미신청자 자동 제외.',
      'main 직접 push 불가 · MEMORY.md 인덱스 누락 차단.'
    ]} />;


// ── 20d-2 · 기억 ─────────────────────────────────────────
const S20d2 = () =>
  <AxisDeepCard
    axisKo="기억 · MEMORY"
    hero={<>AI는 까먹어요. <span className="hl">파일이 대신 기억해요.</span></>}
    useCase={[
      { tag: '상황', t: '오늘 새 세션을 시작했어요. AI는 어제 합의를 다 잊은 상태.' },
      { tag: '결과', t: 'CLAUDE.md를 자동 로드 → 어제 진행 / 카피 규칙 / 다음 시작점을 그 자리에서 다시 알아요.' },
      { tag: '상황', t: '"지난주 보낸 카피랑 같은 톤으로 가줘" 라고 함.' },
      { tag: '결과', t: 'progress.md · feedback_*.md를 읽고 동일 톤으로 작성.' }
    ]}
    supports={[
      'CLAUDE.md — 세션마다 자동 로드 (30줄 + 에이전트/스크립트 맵).',
      'prd/*.md 10개 — 채널별 규칙 원본 (알림톡 · 카플친 · UTM · DB …).',
      '.claude/agents/*.md 9개 — 각 AI의 역할 정의서.',
      'memory/progress.md — 매 세션 진행상황 자동 갱신.',
      'MCP 연결 — Supabase · Slack · n8n · Notion · Gemini.'
    ]} />;


// ── 20d-3 · 학습 ─────────────────────────────────────────
const S20d3 = () =>
  <AxisDeepCard
    axisKo="학습 · LEARNING"
    hero={<>실수 → 박제 → <span className="hl">자동 회피.</span></>}
    useCase={[
      { tag: '상황', t: '에밀리: "이 가격 표현 다음에도 빼주세요."' },
      { tag: '결과', t: '그 자리에서 feedback_copy_rules.md에 박제 → 다음 회차 copywriter가 자동으로 그 규칙 적용.' },
      { tag: '상황', t: '같은 실패가 3번 반복됨 (예: 크론 타임존 버그).' },
      { tag: '결과', t: 'verifier가 feedback 박제를 자동 제안 → 다음 세션부터 같은 실수 안 해요.' }
    ]}
    supports={[
      '삽질 박제 — 크론 타임존 · n8n PUT 이스케이프 · Wait 중 deactivate 등 6건.',
      'Slack 승인 모달 — 에밀리 교정 → feedback 박제 → 다음 공유회 자동 반영.',
      'verifier 반려 — AI 산출물이 규칙 위반 시 작성 에이전트에게 되돌림.',
      'session-retro.py — 세션별 정합성 측정 → 구멍 자동 탐지.',
      'n8n 백업 8개 — 망가지면 즉시 롤백.'
    ]} />;


// ── 24a · 에이전트 8명 트리 ────────────────────────
const S24a = () => {
  const Row = ({ branch, name, model, role, indent = 0, header, line }) => (
    <div style={{
      display: 'flex',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 26,
      lineHeight: 1.5,
      color: header ? 'var(--ink)' : '#222',
      fontWeight: header ? 900 : 600,
      letterSpacing: '-0.005em'
    }}>
      <span style={{ color: '#888', whiteSpace: 'pre', flex: '0 0 auto' }}>{branch}</span>
      <span style={{ flex: 1, display: 'flex', gap: 16 }}>
        <span style={{ minWidth: 280, color: header ? 'var(--ink)' : 'var(--ink)', fontWeight: header ? 900 : 800 }}>{name}</span>
        {model && <span style={{ minWidth: 110, color: '#999' }}>({model})</span>}
        {role && <span style={{ color: '#444', fontWeight: 600 }}>{role}</span>}
      </span>
    </div>
  );
  return (
    <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
      bodyStyle={{ justifyContent: 'flex-start', paddingTop: 80 }}>
      <div className="kicker" style={{ marginBottom: 8 }}>이 워크플로우를 누가 돌릴까?</div>
      <div className="h-l" style={{ fontSize: 72, marginBottom: 36, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
        에이전트 <span className="hl">8명</span>, 역할을 쪼갰어요.
      </div>

      <div style={{
        flex: 1,
        background: '#fafafa',
        border: '1.5px solid #e5e5e5',
        borderRadius: 14,
        padding: '36px 44px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4
      }}>
        <Row branch="┳ "       name="본부장 (director, opus)"   role="── 전체 파이프라인 오케스트레이션" header />
        <Row branch="┃" />
        <Row branch="┣━ "      name="실무 라인 (작성·발송)"    header />
        <Row branch="┃   ┣━ "  name="data-collector"      model="haiku"  role="URL 크롤 + Supabase 조회" />
        <Row branch="┃   ┣━ "  name="timeline-planner"    model="sonnet" role="D-day 계산 + 리마인드 타이밍" />
        <Row branch="┃   ┣━ "  name="copywriter"          model="sonnet" role="전 채널 카피 (알림톡 ①② 풀 5안 등)" />
        <Row branch="┃   ┣━ "  name="media-ops"           model="sonnet" role="UTM + bit.ly + 배너/캐러셀 스펙" />
        <Row branch="┃   ┗━ "  name="dispatcher"          model="sonnet" role="Slack 미리보기 → 에밀리 승인 → 발송" />
        <Row branch="┃" />
        <Row branch="┗━ "      name="검수 라인 (작성자 ≠ 검수자)" header />
        <Row branch="    ┣━ "  name="verifier"            model="sonnet" role="카피/미디어/데이터 규칙 + lint-copy.py" />
        <Row branch="    ┗━ "  name="code-reviewer"       model="sonnet" role="n8n / 스크립트 / md 변경 검수" />
      </div>
    </Slide>
  );
};


// ── 24b · PRD 10개 + CLAUDE.md ────────────────────────
const S24b = () =>
  <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
    bodyStyle={{ justifyContent: 'flex-start', paddingTop: 80 }}>
    <div className="kicker" style={{ marginBottom: 8 }}>이 8명이 매번 무얼 보고 일할까?</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 36, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
      <span className="hl">규칙집</span>이랑 <span className="hl">표지판</span>이요.
    </div>

    <div style={{ display: 'flex', gap: 22, flex: 1, alignItems: 'stretch' }}>
      {/* PRD 10개 */}
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', background: 'var(--ink)', color: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '24px 30px', borderBottom: '1px solid #2a2a2a' }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.28em', color: 'var(--yellow)', fontFamily: 'JetBrains Mono, monospace' }}>PRD · 규칙집</div>
          <div style={{ fontSize: 44, fontWeight: 900, marginTop: 8, letterSpacing: '-0.02em' }}>채널마다 어떻게 보낼지</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#bbb', marginTop: 8 }}>반복할 일의 규칙 · 10개 파일</div>
        </div>
        <div style={{ flex: 1, padding: '24px 30px', fontFamily: 'JetBrains Mono, monospace', fontSize: 19, lineHeight: 1.7, color: '#eee' }}>
          {[
            ['00', 'overview',  '전체 개요'],
            ['01', '알림톡',     '템플릿 9종 · 카플친 vs n8n'],
            ['02', '카플친',     'SOLAPI 직접 발송'],
            ['03', '오픈채팅',   '진입 카피 · 공지'],
            ['04', '이메일',     '뉴스레터 · 스레드'],
            ['05', '인스타',     '스토리/피드 · 캐러셀 스펙'],
            ['06', '온드',       '랜딩 · 후기 페이지'],
            ['07', 'UTM',        '추적 · bit.ly 단축'],
            ['08', 'database',   '스키마 · 조회 패턴'],
            ['09', '아티팩트',   '산출물 형식']
          ].map(([n, name, desc], i) =>
            <div key={i} style={{ display: 'flex', gap: 14, padding: '2px 0' }}>
              <span style={{ color: '#666', width: 30 }}>{n}</span>
              <span style={{ minWidth: 130, fontWeight: 800, color: '#fff' }}>{name}</span>
              <span style={{ color: '#999', flex: 1 }}>{desc}</span>
            </div>
          )}
        </div>
      </div>

      {/* CLAUDE.md */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', border: '1.5px solid #e5e5e5', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '24px 30px', borderBottom: '1.5px solid #f0f0f0' }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.28em', color: '#aaa', fontFamily: 'JetBrains Mono, monospace' }}>CLAUDE.md · 표지판</div>
          <div style={{ fontSize: 44, fontWeight: 900, marginTop: 8, letterSpacing: '-0.02em' }}>"어디로 가야 할지"만</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#666', marginTop: 8 }}>세션 시작하면 자동 로드</div>
        </div>
        <div style={{ flex: 1, padding: '24px 30px', fontFamily: 'JetBrains Mono, monospace', fontSize: 19, lineHeight: 1.85, color: '#222' }}>
          <div style={{ color: '#888', fontSize: 16 }}># CLAUDE.md</div>
          <div style={{ marginTop: 14, color: '#b88600', fontWeight: 800 }}>## 프로젝트 목표</div>
          <div style={{ marginTop: 6, color: '#b88600', fontWeight: 800 }}>## PRD 인덱스</div>
          <div style={{ marginTop: 6, color: '#b88600', fontWeight: 800 }}>## 에이전트 맵</div>
          <div style={{ marginTop: 6, color: '#b88600', fontWeight: 800 }}>## 스크립트 맵</div>
          <div style={{ marginTop: 6, color: '#b88600', fontWeight: 800 }}>## 안전 규칙</div>

          <div style={{ marginTop: 22, padding: '18px 22px', background: '#fafafa', border: '1.5px solid #ececec', borderRadius: 10, fontSize: 22, color: 'var(--ink)', lineHeight: 1.4, fontWeight: 800, fontFamily: 'inherit' }}>
            세부 내용은 <span style={{ background: 'var(--yellow)', padding: '2px 6px' }}>안 적어요.</span><br/>
            <span style={{ fontWeight: 700, fontSize: 19, color: '#666' }}>"필요하면 어디 봐"라고만 가리킴.</span>
          </div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 24 · 최종 워크플로우 다이어그램 ────────────────────────
const S24 = () => {
  const Node = ({ label, sub, kind, indent = 0 }) => {
    const styles = {
      director: { bg: 'var(--ink)', fg: '#fff', border: 'none', tag: 'DIRECTOR', tagColor: 'var(--yellow)' },
      work:     { bg: '#fff',       fg: 'var(--ink)', border: '1.5px solid #ccc', tag: '실무 라인', tagColor: '#888' },
      review:   { bg: '#fff8d6',    fg: 'var(--ink)', border: '2px solid var(--ink)', tag: '검수 라인', tagColor: '#444' },
      approve:  { bg: '#fff',       fg: 'var(--ink)', border: '1.5px solid #ccc', tag: 'SLACK', tagColor: '#888' },
      send:     { bg: '#fff',       fg: 'var(--ink)', border: '1.5px solid #ccc', tag: '발송', tagColor: '#888' },
      retro:    { bg: 'var(--yellow)', fg: 'var(--ink)', border: '2px solid var(--ink)', tag: 'SESSION-RETRO', tagColor: '#444' },
    }[kind];
    return (
      <div style={{
        marginLeft: indent,
        padding: '20px 26px',
        background: styles.bg, color: styles.fg, border: styles.border,
        borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 22
      }}>
        <div style={{
          flex: '0 0 auto', width: 130,
          fontSize: 13, fontWeight: 900, letterSpacing: '0.24em',
          color: styles.tagColor, fontFamily: 'JetBrains Mono, monospace'
        }}>{styles.tag}</div>
        <div style={{ flex: 1 }}>
          <div className="mono" style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{label}</div>
          {sub && <div style={{ fontSize: 16, fontWeight: 600, color: kind === 'director' ? '#bbb' : '#666', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{sub}</div>}
        </div>
      </div>
    );
  };
  const Arrow = ({ label, color = '#bbb', up }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 24, gap: 12 }}>
      <div style={{ width: 2, height: 24, background: color, position: 'relative' }}>
        <div style={{
          position: 'absolute', left: -5,
          ...(up
            ? { top: -2, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: `8px solid ${color}` }
            : { bottom: -2, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${color}` })
        }} />
      </div>
      {label && <div style={{ fontSize: 15, fontFamily: 'JetBrains Mono, monospace', color: color === '#bbb' ? '#666' : color, fontWeight: 700, letterSpacing: '0.04em' }}>{label}</div>}
    </div>
  );

  return (
    <Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA"
      bodyStyle={{ justifyContent: 'flex-start', paddingTop: 70 }}>
      <div className="h-l" style={{ fontSize: 52, marginBottom: 18, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
        하네스가 돌아가는 <span className="hl">최종 워크플로우</span>.
      </div>

      <div style={{ display: 'flex', gap: 36, flex: 1, minHeight: 0, justifyContent: 'center' }}>
        {/* 다이어그램 풀폭 */}
        <div style={{ flex: 1, maxWidth: 1100, display: 'flex', flexDirection: 'column' }}>
          {/* 사용자 의도 */}
          <div style={{ alignSelf: 'flex-start', padding: '12px 22px', background: 'var(--yellow)', borderRadius: 999, fontSize: 18, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
            사용자 의도
          </div>
          <Arrow />
          <Node kind="director" label="본부장 director (opus)" sub="전체 파이프라인 오케스트레이션" />
          <Arrow />
          <Node kind="work" label="실무 라인 → 산출물" sub="data-collector · timeline-planner · copywriter · media-ops" />

          {/* 반려 루프 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 6, marginBottom: 6 }}>
            <Arrow color="#c4343b" label="반려" up />
            <Arrow color="#1f8a3a" label="통과" />
          </div>
          <Node kind="review" label="검수 라인" sub="verifier · code-reviewer (lint-copy.py 자동)" />
          <Arrow />
          <Node kind="approve" label="Slack #crm-카피 → 에밀리 승인" />
          <Arrow />
          <Node kind="send" label="발송" sub="n8n / SOLAPI / 수동" />
          <Arrow />
          <Node kind="retro" label="session-retro → memory/ 갱신" sub="progress.md · MEMORY.md · 다음 세션 시작점" />
          <Arrow label="git commit (pre-commit hook)" color="#444" />
          <div style={{ alignSelf: 'center', fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
            → 다음 세션이 자동으로 이어받음
          </div>
        </div>

        {/* RIGHT — 제거됨, 다이어그램만 표시 */}
      </div>
    </Slide>
  );
};



window.S13 = S13;window.S14 = S14;window.S15 = S15;
window.S16 = S16;window.S17 = S17;window.S18 = S18;
window.S19 = S19;window.S20 = S20;window.S20b = S20b;window.S20c = S20c;window.S20c2 = S20c2;window.S20d1 = S20d1;window.S20d2 = S20d2;window.S20d3 = S20d3;window.S24a = S24a;window.S24b = S24b;window.S24 = S24;
