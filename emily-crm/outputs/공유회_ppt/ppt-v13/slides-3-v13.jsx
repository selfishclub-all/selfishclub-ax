// v13 · slides-3 — S16-S22: HOW 1~7단계 (OMC 인터뷰 → CLAUDE.md → 노트북 → n8n → 슬랙승인 → 카드빌드 → 7일 흐름)

// ── 16 · HOW 1단계 — OMC 딥인터뷰 ─────────────────────
const S16 = () =>
<Slide num={16} total={27} topLeft="HOW · 1단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">먼저 — 코드 짜기 전에,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 28, fontSize: 70 }}>
      클로드랑 <span className="hl">OMC 딥인터뷰</span>부터.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch', marginBottom: 22 }}>
      <div style={{ flex: 1, padding: '24px 28px', background: '#f3f3f3', borderRadius: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#888', marginBottom: 10 }}>OMC = One-on-one with Claude</div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.35, marginBottom: 12, color: '#222' }}>
          PRD를 내가 쓰는 게 아니라,<br />클로드가 나한테 묻고 정리.
        </div>
        <div style={{ fontSize: 17, color: '#555', lineHeight: 1.6 }}>
          "어떤 상황이야?" "타깃은?" "발송 시각은?" "잘못 나가면?" — <br />
          질문 30개쯤 받고 답하다 보면, 자연스럽게 PRD가 만들어짐.
        </div>
      </div>
      <div style={{ flex: 1.1, padding: '24px 28px', background: 'var(--ink)', color: '#fff', borderRadius: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 10 }}>실제 인터뷰 일부</div>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: '#eee' }}>
          <div style={{ marginBottom: 8 }}><b style={{ color: 'var(--yellow)' }}>C</b> · 발송 시간이 정해져 있어요?</div>
          <div style={{ marginBottom: 8, color: '#bbb' }}>나 · 템플릿마다 다른데… 보통 11시.</div>
          <div style={{ marginBottom: 8 }}><b style={{ color: 'var(--yellow)' }}>C</b> · 잘못 나가면 어떻게 처리?</div>
          <div style={{ marginBottom: 8, color: '#bbb' }}>나 · 그건 진짜 큰일… 사람이 한번 봐야.</div>
          <div style={{ marginBottom: 8 }}><b style={{ color: 'var(--yellow)' }}>C</b> · 광고성/정보성 구분은?</div>
          <div style={{ color: '#bbb' }}>나 · 사실 잘 몰랐어요. 그것부터 알려줘.</div>
        </div>
      </div>
    </div>
    <div style={{ padding: '18px 24px', background: 'var(--yellow)', borderRadius: 12 }}>
      <div style={{ fontWeight: 900, fontSize: 22, color: 'var(--ink)' }}>
        → 이 인터뷰가 끝났을 때, 머릿속에 그림이 그려짐.<br />
        그 그림이 그대로 다음 단계의 <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>CLAUDE.md</span>가 됨.
      </div>
    </div>
  </Slide>;


// ── 17 · HOW 2단계 — CLAUDE.md 한 장 ───────────────────
const S17 = () =>
<Slide num={17} total={27} theme="dark" topLeft="HOW · 2단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>인터뷰가 끝나고 보니까,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 40, fontSize: 70 }}>
      답변이 자연스럽게 <br />
      <span style={{ fontFamily: 'JetBrains Mono, monospace', background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.15em' }}>CLAUDE.md</span> 한 장으로 떨어짐.
    </div>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <div className="body" style={{ fontSize: 22, color: '#fff', lineHeight: 1.55, marginBottom: 20 }}>
          CLAUDE.md = 클로드가 일 시작할 때 <b style={{ color: 'var(--yellow)' }}>가장 먼저 읽는 규칙 파일.</b><br />
          톤·금지사항·데이터 기준이 다 들어있음.
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 20 }}>
          PRD를 따로 길게 쓰지 않았어요.<br />
          인터뷰하면서 답한 내용을 그대로 정리.
        </div>
        <div style={{ padding: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
          💡 여기만 한 번 잘 정리해두면, <br />
          앞으로 클로드가 매번 이걸 먼저 읽고 시작.
        </div>
      </div>
      <div className="code" style={{ flex: 1, fontSize: 14, lineHeight: 1.7, padding: 24 }}>
        <span className="cm"># 셀피쉬클럽 CRM Agent 규칙</span>{'\n\n'}
        <span className="kw">## 톤</span>{'\n'}
        - 친근하지만 정중하게.{'\n'}
        - 이모지는 한 메시지에 1개까지.{'\n\n'}
        <span className="kw">## 발송 금지</span>{'\n'}
        - 광고성: 21:00 ~ 08:00 발송 금지{'\n'}
        - 정보성: 시간 무관, 단 23:00 이후 자제{'\n\n'}
        <span className="kw">## 데이터 / 세그먼트</span>{'\n'}
        - 기준은 <span className="y">last_active_at</span>{'\n'}
        - 30일 이내 = 활성{'\n'}
        - 31~90일 = 재참여{'\n'}
        - 91일 이상 = 휴면{'\n\n'}
        <span className="kw">## 검수</span>{'\n'}
        - 톤 + 규정 둘 다 통과해야 발송{'\n'}
        - 사람 최종 승인은 슬랙 카드{'\n'}
      </div>
    </div>
  </Slide>;


// ── 18 · HOW 3단계 — 노트북 덮으면 멈춤 ───────────────────
const S18 = () =>
<Slide num={18} total={27} topLeft="HOW · 3단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">설계대로 한번 시켜봤어요.</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: 28, fontSize: 72 }}>
      근데 바로 막혔어요 — <span className="hl">노트북을 덮으면 멈춤.</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 1300 }}>
      {[{ who: '나', side: 'L', t: '이번 신청자들 뽑아서, 오후 3시에 보내줘.' },
        { who: 'CLAUDE', side: 'R', t: '네, 3시에 142명 전송 완료했어요.' },
        { who: '나', side: 'L', t: '좋아. 그럼 7시에 미신청자한테도 한 번 더.\n…근데 나 6시에 퇴근하거든. 노트북 끄고 가도 돼?' },
        { who: 'CLAUDE', side: 'R', t: '아… 노트북이 꺼지면, 저는 7시에 못 보내요.' }].
        map((m, i) =>
        <div key={i} style={{ display: 'flex', justifyContent: m.side === 'L' ? 'flex-start' : 'flex-end' }}>
          <div style={{ maxWidth: '70%' }}>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.16em', color: '#999', marginBottom: 4, textAlign: m.side === 'R' ? 'right' : 'left' }}>{m.who}</div>
            <div style={{
              padding: '14px 22px',
              background: m.side === 'L' ? '#f1f1f1' : 'var(--ink)',
              color: m.side === 'L' ? 'var(--ink)' : '#fff',
              borderRadius: 16,
              fontWeight: i === 3 ? 700 : 500, lineHeight: 1.5, whiteSpace: 'pre-line',
              fontSize: i === 3 ? 32 : 22
            }}>{m.t}</div>
          </div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 24, padding: '18px 28px', background: 'var(--yellow)', borderRadius: 14, display: 'inline-block', alignSelf: 'flex-start' }}>
      <div style={{ fontWeight: 900, fontSize: 28 }}>→ 내 노트북과 무관하게 돌아갈 무언가가 필요.</div>
    </div>
  </Slide>;


// ── 19 · HOW 4단계 — n8n ──────────────────────────────
const S19 = () =>
<Slide num={19} total={27} theme="yellow" topLeft="HOW · 4단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">그래서 발송은 서버한테 맡겼어요.</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.0, marginBottom: 24, fontSize: 80 }}>
      답은 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.15em' }}>n8n</span>.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '22px 26px', background: '#fff', borderRadius: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 10 }}>n8n 이 뭐냐면</div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.35, marginBottom: 12 }}>
          코드 안 짜고 <span className="hl">박스를 잇는 것만으로</span><br />
          업무를 자동화하는 서버.
        </div>
        <div style={{ fontSize: 16, color: '#555', lineHeight: 1.55 }}>
          "DB에서 신청자 뽑기 → 카피 만들기 → 카카오 보내기" — <br />
          단계를 노드로 그려서 연결.<br />
          <b>서버에서 24/7</b> 돌아가니까 내 노트북과 무관.
        </div>
      </div>
      <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--ink)', marginBottom: 6 }}>실제 n8n 워크플로우 (38노드)</div>
        <div style={{ width: '100%', height: 380, borderRadius: 10, border: '1.5px solid var(--ink)', background: '#fff', boxShadow: '0 12px 30px rgba(0,0,0,0.18)', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 10 }}>
          {[
            ['크론 11:00', 'DB 조회', '카피 빌드', '슬랙 모달', 'Wait', 'SOLAPI 발송'],
            ['Webhook', '신청자 추출', '변수 매칭', '미리보기', '검수 대기', '결과 로깅']].
            map((row, ri) =>
            <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {row.map((box, bi) =>
                <React.Fragment key={bi}>
                  <div style={{ flex: 1, padding: '10px 12px', background: bi === row.length - 1 ? 'var(--yellow)' : '#f5f5f5', border: '1.5px solid var(--ink)', borderRadius: 6, fontSize: 13, fontWeight: 700, textAlign: 'center', color: 'var(--ink)' }}>{box}</div>
                  {bi < row.length - 1 && <div style={{ fontSize: 16, color: '#888' }}>→</div>}
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </Slide>;


// ── 20 · HOW 5단계 — 슬랙 모달 승인 ────────────────────
const S20 = () =>
<Slide num={20} total={27} topLeft="HOW · 5단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 전체 자동화를 한다면…</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: 28, fontSize: 64 }}>
      "혹시 <span className="hl">잘못 나가면</span> 어떡하지?"
    </div>
    <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
      {[
        { label: 'TARGET', t: '템플릿별 타깃', d: '신청 / 미신청 / 결제…', icon: '◉' },
        { label: 'LINK', t: 'UTM 붙은 링크', d: 'utm_source=kakao …', icon: '↗' },
        { label: 'COPY', t: '핏에 맞는 카피', d: '템플릿 변수 매칭', icon: '¶' }].
        map((c, i) =>
        <div key={i} style={{ flex: 1, padding: '16px 20px', background: '#fff', border: '1.5px solid var(--ink)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', width: 32, textAlign: 'center' }}>{c.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', color: '#999' }}>{c.label}</div>
            <div style={{ fontSize: 19, fontWeight: 800, marginTop: 2 }}>{c.t}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>{c.d}</div>
          </div>
        </div>
      )}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 8px' }}>
      <div style={{ fontSize: 32, color: '#bbb', lineHeight: 1 }}>↓</div>
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '24px 28px', background: '#f5f5f5', borderRadius: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 8 }}>제 마음</div>
        <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.4, color: '#222' }}>
          완전 자동은 무서워요.<br />
          <span className="hl">발송 직전에 한 번 보고 가고 싶어.</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '24px 28px', background: 'var(--ink)', color: '#fff', borderRadius: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 8 }}>SOLUTION</div>
        <div style={{ fontWeight: 800, lineHeight: 1.35, fontSize: 26 }}>
          n8n이 발송 직전에 <span style={{ color: 'var(--yellow)' }}>Slack에 미리보기</span>.
        </div>
        <div style={{ marginTop: 8, color: '#bbb', lineHeight: 1.55, fontSize: 18 }}>
          내가 버튼을 눌러야만 실제로 나감.<br />완전 자동에서 → 사람이 한 번 보는 반자동으로.
        </div>
      </div>
    </div>
  </Slide>;


// ── 21 · HOW 6단계 — 슬랙 카드 BEFORE/AFTER ────────────
const S21 = () =>
<Slide num={21} total={27} topLeft="HOW · 6단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">이 슬랙 카드, 처음엔 이렇지 않았어요.</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 32, fontSize: 64 }}>
      텍스트 한 줄에서 → <span className="hl">카드 한 장</span>으로.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '28px 32px', background: '#f3f3f3', borderRadius: 16 }}>
        <div className="tag" style={{ background: '#ddd', color: '#444' }}>BEFORE</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 16, marginBottom: 16 }}>
          그냥 슬랙에 텍스트 한 줄로 떨어짐
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '16px 18px', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#444', lineHeight: 1.6, border: '1px solid #e5e5e5' }}>
          [알림톡봇] 오늘 11:11 발송 예정.<br />
          템플릿: #6 입장링크. 대상: 218명.<br />
          승인하려면 /approve 6 입력.
        </div>
        <div style={{ fontSize: 17, color: '#c4343b', marginTop: 14 }}>
          → 뭐가 나갈지 한눈에 안 들어옴.<br />
          → 매번 텍스트 읽고 명령어 쳐야 함.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', color: '#bbb', fontSize: 40 }}>→</div>
      <div style={{ flex: 1, padding: '28px 32px', background: 'var(--ink)', color: '#fff', borderRadius: 16 }}>
        <div className="tag" style={{ background: 'var(--yellow)', color: 'var(--ink)' }}>AFTER</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 16, marginBottom: 16 }}>
          미리보기 + 승인 버튼이 한 카드에
        </div>
        <ul style={{ fontSize: 19, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', color: '#eee' }}>
          <li>✓ 카피 미리보기</li>
          <li>✓ 대상자 / 시간 / URL 한눈에</li>
          <li>✓ <span style={{ color: 'var(--yellow)', fontWeight: 800 }}>이대로 발송</span> · 수정 · 취소 버튼</li>
        </ul>
        <div style={{ marginTop: 14, padding: '14px 18px', background: 'rgba(233,237,18,0.1)', borderRadius: 10, fontSize: 16, color: '#eee', lineHeight: 1.55 }}>
          💡 매번 만드는 건 <b style={{ color: 'var(--yellow)', fontFamily: 'JetBrains Mono, monospace' }}>preview-builder</b> 서브에이전트.<br />
          내가 손 안 대도, 발송 직전에 카드를 알아서 빌드.
        </div>
      </div>
    </div>
  </Slide>;


// ── 22 · HOW 7단계 — 7일 흐름 + 매일 11시 크론 ───────────
const S22 = () => {
  const days = [
    { d: 'D-5', t: '#1 오픈알림', tm: '10:00', done: true },
    { d: 'D-3', t: '#2 미신청 리마인드', tm: '19:00', done: true },
    { d: 'D-2', t: '#5 할인쿠폰', tm: '14:00', done: true },
    { d: 'D-1', t: '#3 D-1 리마인드', tm: '14:00', done: true },
    { d: 'D-0', t: '#6 입장링크', tm: '11:11', today: true },
    { d: 'D+1', t: '#8 신청자 혜택', tm: '11:00' },
    { d: 'D+3', t: '#9 VOD 발송', tm: '15:00' }];

  return (
    <Slide num={22} total={27} theme="dark" topLeft="HOW · 7단계 (전체 흐름)" topRight="EMILY · SELFISH CLUB · AAA"
      bodyStyle={{ justifyContent: 'flex-start', paddingTop: 100, paddingBottom: 80 }}>
      <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>그리고 매일 아침,</div>
      <div className="h-l" style={{ fontWeight: 800, fontSize: 56, lineHeight: 1.1, marginBottom: 44 }}>
        11시에 <span style={{ background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.1em' }}>크론</span>이 한 번 돌고<br />
        — <span style={{ color: 'var(--yellow)' }}>오늘 보낼 템플릿이 슬랙으로.</span>
      </div>
      <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 24, lineHeight: 1.5 }}>
        ※ 크론 = 매일 정해진 시간에 자동으로 도는 거. 11시면 매일 11시.
      </div>

      <div style={{ display: 'flex', gap: 40, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>DAILY CRON · 매일 11:00 KST</div>
          <div style={{ fontWeight: 800, lineHeight: 1.2, marginBottom: 18, fontSize: 26, color: '#fff' }}>
            오늘은 D-며칠? <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>보낼 게 있나?</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {days.map((day, i) => {
              const isToday = day.today;
              const isDone = day.done;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'baseline', gap: 14,
                  padding: isToday ? '12px 0' : '9px 0',
                  borderTop: i === 0 ? '1.5px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.12)',
                  borderBottom: i === days.length - 1 ? '1.5px solid rgba(255,255,255,0.4)' : 'none'
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 17, fontWeight: 900,
                    minWidth: 52,
                    color: isDone ? 'rgba(255,255,255,0.3)' : '#fff'
                  }}>{day.d}</div>
                  <div style={{
                    fontSize: isToday ? 19 : 17, fontWeight: isToday ? 900 : 700, flex: 1,
                    color: isDone ? 'rgba(255,255,255,0.3)' : '#fff',
                    textDecoration: isDone ? 'line-through' : 'none',
                    display: 'flex', alignItems: 'center', gap: 10
                  }}>
                    {day.t}
                    {isToday &&
                    <span style={{
                      fontSize: 11, fontWeight: 900, letterSpacing: '0.2em',
                      background: 'var(--yellow)', color: 'var(--ink)',
                      padding: '3px 8px', borderRadius: 4
                    }}>오늘</span>}
                  </div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700,
                    color: isDone ? 'rgba(255,255,255,0.3)' : isToday ? '#fff' : 'rgba(255,255,255,0.55)'
                  }}>{day.tm}</div>
                </div>);
            })}
          </div>

          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 18, lineHeight: 1.55 }}>
            오늘은 <span style={{ background: 'var(--yellow)', padding: '1px 6px', fontWeight: 800, color: 'var(--ink)' }}>D-0(당일)</span> 이라, #6 입장링크가 슬랙으로 와요. 내일은 또 내일 거.
          </div>
        </div>

        <div style={{ flex: '0 0 480px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>SLACK · #알림톡-승인</div>
          <img src="slack-approval.png" alt="Slack 승인 카드"
            style={{ width: '100%', borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.15)', boxShadow: '0 22px 50px rgba(0,0,0,0.4)', display: 'block' }}
            onError={(e) => { e.target.style.display = 'none'; }} />
          <div style={{ background: 'var(--yellow)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <div style={{ fontSize: 28 }}>✅</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--ink)' }}>이대로 발송</div>
              <div style={{ fontSize: 19, fontWeight: 800, marginTop: 4, lineHeight: 1.25, color: 'var(--ink)' }}>오늘 11:11에 자동 전송.</div>
            </div>
          </div>
        </div>
      </div>
    </Slide>);
};


window.S16 = S16; window.S17 = S17; window.S18 = S18; window.S19 = S19;
window.S20 = S20; window.S21 = S21; window.S22 = S22;
