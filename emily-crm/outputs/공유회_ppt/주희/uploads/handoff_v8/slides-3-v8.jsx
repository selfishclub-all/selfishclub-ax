// Slides 13-20 (v8)

// ── 13 · Claude랑 기획부터 ──────────────────────────────
const S13 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">먼저 CLAUDE와 기획부터.</div>
    <div className="h-l" style={{ fontSize: 88, marginBottom: 64, fontWeight: 800, lineHeight: 1.15 }}>
      <span className="hl">상황부터</span> 얘기하고, <span className="hl">자동화 방법</span>을 같이 설계.
    </div>
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      {/* 내가 던진 상황 */}
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

      {/* Claude의 답 */}
      <div style={{ flex: 1, padding: '40px 44px', background: 'var(--ink)', color: '#fff', borderRadius: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 22 }}>CLAUDE →</div>
        <ul style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', color: '#eee' }}>
          <li>✓ <span style={{ fontWeight: 700 }}>Supabase</span>에 타깃 조건을 SQL로 정의</li>
          <li>✓ <span style={{ fontWeight: 700 }}>SOLAPI</span>로 카카오 알림톡 발송</li>
          <li>✓ <span style={{ fontWeight: 700 }}>스케줄러</span>가 시각마다 실행</li>
          <li>✓ 승인 모달은 <span style={{ fontWeight: 700 }}>Slack 인터랙티브</span>로</li>
        </ul>
        <div style={{ marginTop: 22, color: 'var(--yellow)', fontWeight: 800, fontSize: 24 }}>
          → 설계 초안부터 같이 짜볼게요.
        </div>
      </div>
    </div>
  </Slide>;


// ── 14 · 시켜봤더니 — 노트북 덮으면 멈춤 ─────────────────
const S14 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">설계대로 한번 시켜봤어요.</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 36, fontWeight: 800, lineHeight: 1.15 }}>
      근데 바로 막혔어요 — <span className="hl">노트북을 덮으면 멈춤.</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 1200 }}>
      {[
    { who: '나', side: 'L', t: '이번 신청자들 뽑아서, 오후 3시에 보내줘.' },
    { who: 'CLAUDE', side: 'R', t: '네, 3시에 6,080명 전송 완료했어요.' },
    { who: '나', side: 'L', t: '좋아. 그럼 7시에 미신청자한테도 한 번 더 보내줘.\n…근데 나 6시에 퇴근하거든. 노트북 끄고 가도 돼?' },
    { who: 'CLAUDE', side: 'R', t: '아… 노트북이 꺼지면, 저는 7시에 못 보내요.' }].
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
      <div style={{ fontSize: 30, fontWeight: 900 }}>→ 내 노트북과 무관하게 돌아갈 무언가가 필요.</div>
    </div>
  </Slide>;


// ── 15 · 답은 n8n ──────────────────────────────────────
const S15 = () =>
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 발송은 서버한테 맡겼어요.</div>
    <div className="h-l" style={{ fontSize: 96, marginBottom: 36, fontWeight: 800 }}>
      답은 <span className="hl">n8n</span>.
    </div>
    <div style={{ display: 'flex', gap: 36, alignItems: 'stretch' }}>
      {/* n8n 워크플로우 */}
      <div style={{ flex: 1.4, minHeight: 460, background: '#fafafa', borderRadius: 14, border: '1px solid #e5e5e5', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
        <img src="assets/n8n.png" style={{ width: '100%', height: 'auto', maxHeight: 460, objectFit: 'contain', borderRadius: 6 }} />
      </div>
      {/* 도입 이유 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        {[
      { n: '01', t: '서버에서 24/7 트리거', d: '노트북과 무관하게 정해진 시각에 알아서.' },
      { n: '02', t: '노드 연결만으로 워크플로우', d: '코드 안 짜고 박스 잇기로 발송 흐름.' },
      { n: '03', t: 'Claude가 그려줌', d: '기획 답변 그대로 노드 단위로 옮김.' }].
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
<Slide theme="light" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">전체 자동화를 한다면…</div>
    <div className="h-l" style={{ fontSize: 72, marginBottom: 36, fontWeight: 800, lineHeight: 1.2 }}>
      "혹시 <span className="hl">잘못 나가면</span> 어떡하지?"
    </div>

    {/* 변수 3개: 템플릿별 타깃 · UTM 링크 · 핏 카피 */}
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

    {/* 화살표 */}
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 10px' }}>
      <div style={{ fontSize: 38, color: '#bbb', lineHeight: 1 }}>↓</div>
    </div>

    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      {/* Slack 모달 캡처 */}
      <div style={{ flex: 1.2, minHeight: 280, background: '#fff', borderRadius: 14, border: '1px solid #e5e5e5', overflow: 'hidden', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="assets/slack-approval.png" style={{ width: '100%', height: 'auto', maxHeight: 360, objectFit: 'contain' }} />
      </div>
      {/* 솔루션 */}
      <div style={{ flex: 1, padding: '24px 30px', background: 'var(--ink)', color: '#fff', borderRadius: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 10 }}>SOLUTION</div>
        <div style={{ fontWeight: 800, lineHeight: 1.35, fontSize: "35px" }}>
          n8n이 발송 직전에 <span style={{ color: 'var(--yellow)', fontSize: "30px" }}>Slack에 미리보기.</span>
        </div>
        <div style={{ marginTop: 10, color: '#bbb', lineHeight: 1.55, fontSize: "30px" }}>
          내가 버튼을 눌러야만 실제로 나감.<br />완전 자동에서 → 사람이 한 번 보는 반자동으로.
        </div>
      </div>
    </div>
  </Slide>;


// ── 17 · 사용한 도구 3가지 ─────────────────────────────
const S17 = () =>
<Slide theme="dark" topLeft="02 · 자동화 구조 설계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">결국 이 셋으로 굴러가요.</div>
    <div className="h-xl" style={{ marginBottom: 64, fontWeight: 800, fontSize: 110 }}>
      도구는 <span className="hl">3개</span>.
    </div>
    <div style={{ display: 'flex', gap: 24 }}>
      {[
    { n: '01', name: 'Supabase', role: 'DB · 타깃 조회', d: '오늘 누구에게 어떤 템플릿이 가야 하는지, DB에서 조건으로 걸러 옴.' },
    { n: '02', name: 'n8n', role: '발송 · 자동화', d: '서버에서 24/7. 매일 정해진 시각에 자동으로 한 사이클 돌아감.', accent: true },
    { n: '03', name: 'Slack', role: '승인 · 검증', d: '발송 직전 미리보기 도착. 내가 눌러야 실제로 나감.' }].
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


// ── 18 · 전체 플로우 시각화 (공유회 1건이 9번의 발송으로) ───
const S18 = () => {
  const sends = [
  { d: 'D-5', tm: '10:00', t: '#1 오픈알림' },
  { d: 'D-3', tm: '19:00', t: '#2 미신청 리마인드' },
  { d: 'D-2', tm: '14:00', t: '#5 할인쿠폰' },
  { d: 'D-1', tm: '09:55', t: '#3 신청자 D-1' },
  { d: 'D-0', tm: '09:00', t: '#4 당일 리마인드' },
  { d: 'D-0', tm: '19:50', t: '#6 입장링크' },
  { d: 'D-0', tm: '20:00', t: '#7 라이브 시작' },
  { d: 'D+1', tm: '11:00', t: '#8 신청자 혜택' },
  { d: 'D+3', tm: '15:00', t: '#9 VOD 발송' }];

  // 오늘은 D-0(당일)로 가정. 슬랙으로 #6 입장링크가 도착.
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
      <div className="kicker">그리고 매일 아침,</div>
      <div className="h-xl" style={{ marginBottom: 72, fontWeight: 800, fontSize: 72, lineHeight: 1.05 }}>
        10시에 크론이 한 번 돌고<br />— <span className="hl">오늘 보낼 템플릿이 슬랙으로.</span>
      </div>

      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'stretch' }}>

        {/* LEFT — 타임라인 (카드 없이, 타이포로) */}
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
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 900,
                    minWidth: 60,
                    color: isDone ? '#bbb' : 'var(--ink)'
                  }}>{day.d}</div>
                  <div style={{
                    fontSize: isToday ? 24 : 22, fontWeight: isToday ? 900 : 700, flex: 1,
                    color: isDone ? '#bbb' : 'var(--ink)',
                    textDecoration: isDone ? 'line-through' : 'none',
                    display: 'flex', alignItems: 'center', gap: 12
                  }}>
                    {day.t}
                    {isToday &&
                    <span style={{
                      fontSize: 13, fontWeight: 900, letterSpacing: '0.2em',
                      background: 'var(--yellow)', color: 'var(--ink)',
                      padding: '4px 10px', borderRadius: 4
                    }}>오늘</span>
                    }
                  </div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700,
                    color: isDone ? '#bbb' : isToday ? 'var(--ink)' : '#666'
                  }}>{day.tm}</div>
                </div>);

            })}
          </div>

          <div style={{ fontSize: 17, color: '#555', marginTop: 22, lineHeight: 1.55 }}>
            오늘은 <span style={{ background: 'var(--yellow)', padding: '1px 6px', fontWeight: 800, color: 'var(--ink)' }}>D-0(당일)</span> 이라, #6 입장링크가 슬랙으로 와요. 내일은 또 내일 거.
          </div>
        </div>

        {/* RIGHT — 슬랙 + 결과 */}
        <div style={{ flex: '0 0 540px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 10 }}>SLACK · #알림톡-승인</div>
          <img
            src="slack-approval.png"
            alt="Slack 승인 카드"
            style={{
              width: '100%',
              borderRadius: 14,
              border: '1.5px solid #e5e5e5',
              boxShadow: '0 22px 50px rgba(0,0,0,0.12)',
              display: 'block'
            }} />
          
          <div style={{
            background: 'var(--yellow)', borderRadius: 12, padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 18, marginTop: 18
          }}>
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
        '이게 하네스구나'를 알기까지 좀 걸렸어요.
      </div>
    </div>
  </Slide>;


// ── 20 · CLAUDE.md 353줄 ──────────────────────────────
const S20 = () =>
<Slide theme="light" topLeft="03 · 내 맥락 심기" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', gap: 56, height: '100%' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="kicker">규칙이 너무 많아서,</div>
        <div className="h-l" style={{ fontSize: 64, marginTop: 16, fontWeight: 700 }}>
          <span className="u-y">CLAUDE.md 353줄</span>에<br />다 박았어요.
        </div>
        <div className="body" style={{ fontSize: 28, marginTop: 40, fontWeight: 400 }}>
          근데 AI가 자꾸 틀리고 까먹음.<br />
          맥북 2개 쓰는데, 다른 맥북 켜면 <span style={{ fontWeight: 600 }}>일주일 전 기억이 마지막</span>.
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <pre className="code" style={{ fontSize: 16, height: '100%', overflow: 'hidden' }}>
<span className="cm"># 셀피쉬 CRM 운영 규칙</span>{'\n'}
<span className="cm"># v2.1 — 2026.03.14</span>{'\n'}{'\n'}
<span className="y">## 톤앤매너</span>{'\n'}
- 존댓말 · 이모지 1개 이하{'\n'}
- '~님' 호칭 통일{'\n'}
- 느낌표 남발 금지{'\n'}{'\n'}
<span className="y">## 알림톡 타이밍</span>{'\n'}
- D-5 오픈알림 / D-3 리마인드{'\n'}
- D-1 확정자 / D-0 입장링크{'\n'}
- D+1 후기 유도{'\n'}{'\n'}
<span className="y">## 타겟팅 예외</span>{'\n'}
- 수신거부 자동 제외{'\n'}
- 최근 30일 이탈자 제외{'\n'}
- VIP는 별도 템플릿{'\n'}{'\n'}
<span className="y">## 링크 규칙</span>{'\n'}
- 공유회 상세: event.selfishclub.co/:id{'\n'}
- UTM: utm_source=kakao&amp;utm_medium=alimtalk{'\n'}
- 단축: s.slfc.to/ 항상 사용{'\n'}{'\n'}
<span className="cm">... 계속</span>
        </pre>
        <div style={{ position: 'absolute', top: 20, right: 20, background: 'var(--ink)', color: 'var(--yellow)', padding: '8px 18px', borderRadius: 6, fontSize: 20, fontWeight: 600, letterSpacing: '0.14em' }}>353 lines</div>
      </div>
    </div>
  </Slide>;


window.S13 = S13;window.S14 = S14;window.S15 = S15;
window.S16 = S16;window.S17 = S17;window.S18 = S18;
window.S19 = S19;window.S20 = S20;