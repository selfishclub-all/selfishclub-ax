// v12 · slides-3 — S14-S21: HOW

// ── 16 · HOW 섹션 진입 (검정 → 흰 배경 + 노랑 강조) ───
const S16 = () =>
<Slide num={16} total={29} topLeft="HOW" topRight="EMILY · SELFISH CLUB · AAA">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="kicker">04. HOW</div>
      <div className="h-hero" style={{ fontWeight: 800, lineHeight: 1.04, marginTop: 16, fontSize: 140 }}>
        그래서 <span className="hl">어떻게</span> 만들었냐면.
      </div>
      <div className="body" style={{ fontSize: 32, color: '#666', marginTop: 48, lineHeight: 1.5 }}>
        클로드랑 기획부터 — 노트북 덮어도 도는 구조 — 슬랙으로 승인까지.
      </div>
    </div>
  </Slide>;


// ── 17 · 1단계: OMC 딥인터뷰 ──────────────────────────
const S17 = () =>
<Slide num={17} total={29} topLeft="HOW · 1단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">먼저 — 코드 짜기 전에,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 32, fontSize: 76 }}>
      클로드랑 <span className="hl">브레인스토밍</span>부터.
    </div>
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch', marginBottom: 24 }}>
      <div style={{ flex: 1, padding: '28px 32px', background: '#f3f3f3', borderRadius: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: '#888', marginBottom: 12 }}>OMC = One-on-one with Claude</div>
        <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, marginBottom: 14, color: '#222' }}>
          PRD를 내가 쓰는 게 아니라,<br />클로드가 나한테 묻고 정리.
        </div>
        <div style={{ fontSize: 19, color: '#555', lineHeight: 1.6 }}>
          "어떤 상황이야?" "타깃은?" "발송 시각은?" "잘못 나가면?"<br />
          질문 30개쯤 받고 답하다 보면, 자연스럽게 PRD가 만들어짐.
        </div>
      </div>
      <div style={{ flex: 1.1, padding: '28px 32px', background: 'var(--ink)', color: '#fff', borderRadius: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 12 }}>실제 인터뷰 일부</div>
        <div style={{ fontSize: 18, lineHeight: 1.7, color: '#eee' }}>
          <div style={{ marginBottom: 10 }}><b style={{ color: 'var(--yellow)' }}>C</b> · 발송 시간이 정해져 있어요?</div>
          <div style={{ marginBottom: 10, color: '#bbb' }}>나 · 템플릿마다 다른데… 보통 11시.</div>
          <div style={{ marginBottom: 10 }}><b style={{ color: 'var(--yellow)' }}>C</b> · 잘못 나가면 어떻게 처리?</div>
          <div style={{ marginBottom: 10, color: '#bbb' }}>나 · 그건 진짜 큰일… 사람이 한번 봐야.</div>
          <div style={{ marginBottom: 10 }}><b style={{ color: 'var(--yellow)' }}>C</b> · 광고성/정보성 구분은?</div>
          <div style={{ color: '#bbb' }}>나 · 사실 잘 몰랐어요. 그것부터 알려줘.</div>
        </div>
      </div>
    </div>
    <div style={{ padding: '20px 28px', background: 'var(--yellow)', borderRadius: 12 }}>
      <div style={{ fontWeight: 900, fontSize: 24, color: 'var(--ink)' }}>
        → 이 답변들이 그대로 다음 단계의 <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>CLAUDE.md</span>가 됨.
      </div>
    </div>
  </Slide>;


// ── 18 · 2단계: CLAUDE.md (검정 → 흰) ────────────────
const S18 = () =>
<Slide num={18} total={29} topLeft="HOW · 2단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">인터뷰가 끝나고 보니까,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 48, fontSize: 64 }}>
      답변이 자연스럽게 <span style={{ fontFamily: 'JetBrains Mono, monospace', background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.15em' }}>CLAUDE.md</span> <br />
      한 장으로 떨어짐.
    </div>
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <div className="body" style={{ fontSize: 26, color: '#222', lineHeight: 1.55, marginBottom: 24 }}>
          CLAUDE.md = 클로드가 일 시작할 때 <b className="hl">가장 먼저 읽는 규칙 파일.</b>
        </div>
        <div style={{ fontSize: 20, color: '#666', lineHeight: 1.65 }}>
          톤·금지사항·데이터 기준이 다 들어있음.<br />
          여기만 한 번 잘 정리해두면, 매번 클로드가 이걸 먼저 읽고 시작.
        </div>
      </div>
      <div className="code" style={{ flex: 1, fontSize: 15, lineHeight: 1.7, padding: 28, background: 'var(--ink)', color: '#eee', borderRadius: 12 }}>
        <span className="cm" style={{ color: '#888' }}># 셀피쉬클럽 CRM Agent 규칙</span>{'\n\n'}
        <span className="kw" style={{ color: 'var(--yellow)' }}>## 톤</span>{'\n'}
        - 친근하지만 정중하게.{'\n'}
        - 이모지는 한 메시지에 1개까지.{'\n\n'}
        <span className="kw" style={{ color: 'var(--yellow)' }}>## 발송 금지</span>{'\n'}
        - 광고성: 21:00 ~ 08:00 발송 금지{'\n'}
        - 정보성: 시간 무관, 단 23:00 이후 자제{'\n\n'}
        <span className="kw" style={{ color: 'var(--yellow)' }}>## 세그먼트</span>{'\n'}
        - 30일 이내 = 활성{'\n'}
        - 31~90일 = 재참여{'\n'}
        - 91일 이상 = 휴면{'\n\n'}
        <span className="kw" style={{ color: 'var(--yellow)' }}>## 검수</span>{'\n'}
        - 톤 검수 + 규정 검수 둘 다 통과해야 발송{'\n'}
        - 사람 최종 승인은 슬랙 카드{'\n'}
      </div>
    </div>
  </Slide>;


// ── 19 · 3단계: 노트북 덮으면 멈춤 ────────────────────
const S19 = () =>
<Slide num={19} total={29} topLeft="HOW · 3단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">설계대로 한번 시켜봤어요.</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: 32, fontSize: 76 }}>
      근데 바로 막혔어요 — <span className="hl">노트북을 덮으면 멈춤.</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 1400 }}>
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
              fontWeight: i === 3 ? 700 : 500, lineHeight: 1.5, whiteSpace: 'pre-line', fontSize: i === 3 ? 36 : 26
            }}>{m.t}</div>
          </div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 28, padding: '22px 32px', background: 'var(--yellow)', borderRadius: 14, alignSelf: 'flex-start' }}>
      <div style={{ fontWeight: 900, fontSize: 30 }}>→ 내 노트북과 무관하게 돌아갈 무언가가 필요.</div>
    </div>
  </Slide>;


// ── 20 · 4단계: n8n 정의 ──────────────────────────────
const S20 = () =>
<Slide num={20} total={29} theme="yellow" topLeft="HOW · 4단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">발송은 서버한테 맡겼어요.</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.0, marginBottom: 24, fontSize: 110 }}>
      그래서 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.15em' }}>n8n</span>.
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink)', marginBottom: 36, lineHeight: 1.45 }}>
      n8n = <b>워크플로우 자동화 툴.</b><br />
      <span style={{ fontSize: 24, color: '#3a3b00', fontWeight: 600 }}>여러 서비스(DB·슬랙·카카오·클로드 등)를 하나의 흐름으로 묶어서, 정해진 시간/조건에 자동 실행시키는 서버.</span>
    </div>

    {/* 워크플로우 시각화 — 도구 소개 단계라 4박스만, 카피/슬랙은 다음 슬라이드에서 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, padding: '28px 24px', background: 'rgba(255,255,255,0.7)', borderRadius: 14, border: '2px solid var(--ink)' }}>
      {[
        { i: '⏰', t: '시간 트리거', s: 'CRON' },
        { i: '🗄', t: '데이터 조회', s: 'POSTGRES' },
        { i: '⚙', t: '조건 분기', s: 'IF / SWITCH' },
        { i: '📤', t: '외부 API 호출', s: 'HTTP / SOLAPI' }].
        map((n, i, arr) =>
        <React.Fragment key={i}>
          <div style={{ flex: 1, padding: '16px 14px', background: '#fff', border: '2px solid var(--ink)', borderRadius: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>{n.i}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.3 }}>{n.t}</div>
            <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#888', marginTop: 4, letterSpacing: '0.1em' }}>{n.s}</div>
          </div>
          {i < arr.length - 1 && <div style={{ fontSize: 26, color: 'var(--ink)', fontWeight: 800 }}>→</div>}
        </React.Fragment>
      )}
    </div>
    <div style={{ fontSize: 18, color: '#3a3b00', marginBottom: 20, fontStyle: 'italic' }}>
      ※ 노드 = 동작 하나. 박스를 잇기만 하면 워크플로우 완성. (카피·슬랙은 다음 단계에서.)
    </div>

    <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '22px 26px', background: 'var(--ink)', color: '#fff', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 8 }}>왜 n8n?</div>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5 }}>
          서버에서 <span style={{ color: 'var(--yellow)' }}>24/7</span> 돌아가서<br />
          내 노트북과 무관하게 발송됨.
        </div>
      </div>
      <div style={{ flex: 1, padding: '22px 26px', background: 'var(--ink)', color: '#fff', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 8 }}>워크플로우가 시각적</div>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5 }}>
          노드 하나당 동작 하나.<br />
          <span style={{ color: 'var(--yellow)' }}>전체 흐름이 한눈에</span> 보임.
        </div>
      </div>
      <div style={{ flex: 1, padding: '22px 26px', background: 'var(--ink)', color: '#fff', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 8 }}>오픈소스</div>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5 }}>
          셀프호스팅 가능 — <br />
          데이터가 <span style={{ color: 'var(--yellow)' }}>외부에 안 나감.</span>
        </div>
      </div>
    </div>
  </Slide>;


// ── 21 · 5단계: n8n으로 실제 한 일 + 클로드 설계 (NEW) ─────
const S21 = () =>
<Slide num={21} total={29} topLeft="HOW · 5단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 n8n이 그냥 도는 건 아니에요,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 32, fontSize: 76 }}>
      <span className="hl">실제로 시킨 건</span> 이거였어요.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
      {[
        { n: '01', t: '매일 11시 크론', d: '오늘 D-며칠인지 계산 → 보낼 알림톡 결정.' },
        { n: '02', t: '신청자 DB 조회', d: 'Supabase에서 발송 대상 추출 (정보성/광고성 분기).' },
        { n: '03', t: '변수 자동 매칭', d: '#{이름} #{프로그램명} #{URL} 등 템플릿 변수 채움.' },
        { n: '04', t: 'SOLAPI 발송', d: '카카오 알림톡 API로 직접 송출 (38노드).' },
        { n: '05', t: '예약 발송 (Wait)', d: '승인 후 정해진 시각까지 대기했다가 자동 송출.' },
        { n: '06', t: '결과 로깅', d: '성공·실패 DB 저장 → 다음 날 확인 가능.' }].
        map((c, i) =>
        <div key={i} style={{ padding: '18px 22px', background: '#f5f5f5', borderRadius: 10 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 900, color: 'var(--yellow-ink)', letterSpacing: '0.18em', marginBottom: 6 }}>{c.n}</div>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, color: 'var(--ink)', marginBottom: 6 }}>{c.t}</div>
          <div style={{ fontSize: 16, color: '#555', lineHeight: 1.5 }}>{c.d}</div>
        </div>
      )}
    </div>
    <div style={{ padding: '20px 28px', background: 'var(--ink)', color: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', minWidth: 120 }}>그리고 핵심,</div>
      <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.4 }}>
        이 <span style={{ color: 'var(--yellow)' }}>38노드 워크플로우</span> — 제가 짠 게 아니라, <span style={{ color: 'var(--yellow)' }}>클로드가 OMC 인터뷰 답변 보고 설계해줬어요.</span> 저는 검수만.
      </div>
    </div>
  </Slide>;


// ── 22 · 6단계: 잘못 나가면? (Slack 박스 제거) ──────────
const S22 = () =>
<Slide num={22} total={29} topLeft="HOW · 6단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 전체 자동화를 한다면,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.08, marginBottom: 56, fontSize: 96, letterSpacing: '-0.02em' }}>
      "혹시 <span className="hl">잘못 나가면</span><br />
      어떡하지?"
    </div>
    <div style={{ fontSize: 32, color: '#444', lineHeight: 1.55, marginBottom: 32, fontWeight: 600 }}>
      완전 자동은 무서워요.<br />
      <span style={{ color: 'var(--ink)', fontWeight: 800 }}>발송 직전에 한 번 보고 가고 싶음.</span>
    </div>
    <div style={{ padding: '24px 32px', background: 'var(--yellow)', borderRadius: 12 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.45 }}>
        → 그래서 n8n에 한 단계 더 끼웠어요. <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.1em' }}>발송 직전 슬랙 모달.</span>
      </div>
    </div>
  </Slide>;


// ── 23 · 7단계: 슬랙 모달 만든 과정 (Slack 설명 + n8n 연동) ──
const S23 = () =>
<Slide num={23} total={29} topLeft="HOW · 7단계" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">근데 슬랙 모달, 그냥 뚝딱 안 나왔어요,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 24, fontSize: 64 }}>
      n8n과 <span className="hl">슬랙</span>을 이렇게 연결했어요.
    </div>
    <div style={{ padding: '14px 22px', background: '#f5f5f5', borderRadius: 8, marginBottom: 24, fontSize: 17, color: '#555', lineHeight: 1.55 }}>
      ※ <b style={{ color: 'var(--ink)' }}>슬랙(Slack)</b> = 회사용 메신저. 카톡과 비슷한데, 채널·봇·승인 카드 같은 업무 자동화가 가능.
    </div>

    {/* n8n → Slack 연동 5단계 */}
    <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', marginBottom: 24 }}>
      {[
        { n: '①', t: 'n8n', d: '발송 직전\nWebhook 발사' },
        { n: '②', t: 'Slack Bolt', d: 'views.open\n모달 띄움' },
        { n: '③', t: '나', d: '미리보기 보고\n버튼 클릭' },
        { n: '④', t: 'Slack Action', d: 'interaction을\nn8n으로 콜백' },
        { n: '⑤', t: 'n8n', d: '응답 받고\n발송 or 폐기' }].
        map((s, i, arr) =>
        <React.Fragment key={i}>
          <div style={{ flex: 1, padding: '14px 12px', background: i === 2 ? 'var(--yellow)' : '#fff', border: '2px solid var(--ink)', borderRadius: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--ink)', marginBottom: 4 }}>{s.n}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>{s.t}</div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 6, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{s.d}</div>
          </div>
          {i < arr.length - 1 && <div style={{ display: 'flex', alignItems: 'center', fontSize: 22, color: 'var(--ink)', fontWeight: 800 }}>→</div>}
        </React.Fragment>
      )}
    </div>

    {/* 실제 결과 — 카드 + 카피 스샷 */}
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 8 }}>① 발송 예정 카드</div>
        <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'center' }}>
          <img src="slack-card.png" alt="슬랙 발송 예정 카드" style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block' }} />
        </div>
        <div style={{ fontSize: 15, color: '#666', marginTop: 10, lineHeight: 1.55 }}>무엇이 / 언제 / 누구에게 — 한눈에.</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 8 }}>② 카피 + UTM 레퍼런스</div>
        <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'center' }}>
          <img src="slack-comment.png" alt="슬랙 카피 레퍼런스" style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block' }} />
        </div>
        <div style={{ fontSize: 15, color: '#666', marginTop: 10, lineHeight: 1.55 }}>그대로 복붙해서 알림톡 본문에.</div>
      </div>
      <div style={{ flex: 0.9, padding: '20px 22px', background: 'var(--ink)', color: '#fff', borderRadius: 12, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 8 }}>그리고 이것도</div>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>
          Webhook URL · 서명 검증 ·<br />Bolt 핸들러 코드 — <br />
          <span style={{ color: 'var(--yellow)' }}>이것도 다 클로드가 만들었어요.</span>
        </div>
      </div>
    </div>
  </Slide>;


// ── 24 · 8단계: 7일 흐름 (검정 → 흰, 더 큰 시각화) ────
const S24 = () => {
  const days = [
  { d: 'D-5', t: '#1 오픈알림', tm: '10:00', done: true },
  { d: 'D-3', t: '#2 미신청 리마인드', tm: '19:00', done: true },
  { d: 'D-2', t: '#5 할인쿠폰', tm: '14:00', done: true },
  { d: 'D-1', t: '#3 D-1 리마인드', tm: '14:00', done: true },
  { d: 'D-0', t: '#6 입장링크', tm: '11:11', today: true },
  { d: 'D+1', t: '#8 신청자 혜택', tm: '11:00' },
  { d: 'D+3', t: '#9 VOD 발송', tm: '15:00' }];

  return (
    <Slide num={24} total={29} topLeft="HOW · 흐름" topRight="EMILY · SELFISH CLUB · AAA">
      <div className="kicker">매일 아침 11시,</div>
      <div className="h-xl" style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.1, marginBottom: 40 }}>
        오늘이 <span className="hl">D-며칠인지</span> 보고 — <br />
        보낼 게 있으면 슬랙으로.
      </div>

      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 12 }}>한 공유회 7일 흐름</div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {days.map((day, i) => {
              const isToday = day.today;
              const isDone = day.done;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'baseline', gap: 18,
                  padding: isToday ? '16px 16px' : '14px 0',
                  background: isToday ? 'var(--yellow)' : 'transparent',
                  borderTop: i === 0 ? '1.5px solid var(--ink)' : '1px solid #e6e6e6',
                  borderBottom: i === days.length - 1 ? '1.5px solid var(--ink)' : 'none'
                }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 900,
                    minWidth: 70,
                    color: isDone ? '#bbb' : 'var(--ink)'
                  }}>{day.d}</div>
                  <div style={{
                    fontSize: isToday ? 26 : 22, fontWeight: isToday ? 900 : 700, flex: 1,
                    color: isDone ? '#bbb' : 'var(--ink)',
                    textDecoration: isDone ? 'line-through' : 'none',
                    display: 'flex', alignItems: 'center', gap: 12
                  }}>
                    {day.t}
                    {isToday &&
                    <span style={{
                      fontSize: 12, fontWeight: 900, letterSpacing: '0.2em',
                      background: 'var(--ink)', color: 'var(--yellow)',
                      padding: '4px 10px', borderRadius: 4
                    }}>오늘</span>
                    }
                  </div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700,
                    color: isDone ? '#bbb' : isToday ? 'var(--ink)' : '#888'
                  }}>{day.tm}</div>
                </div>);
            })}
          </div>

          <div style={{ fontSize: 18, color: '#666', marginTop: 22, lineHeight: 1.55 }}>
            오늘은 <b>D-0</b>이라 <b>#6 입장링크</b>가 슬랙으로. 내일은 또 내일 거.
          </div>
        </div>

        <div style={{ flex: '0 0 540px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 12 }}>SLACK · #알림톡-승인</div>
          <img
            src="slack-approval.png"
            alt="Slack 승인 카드"
            style={{
              width: '100%',
              borderRadius: 14,
              border: '1.5px solid #e5e5e5',
              boxShadow: '0 22px 50px rgba(0,0,0,0.18)',
              display: 'block'
            }} />
          <div style={{
            background: 'var(--yellow)', borderRadius: 12, padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 18, marginTop: 18
          }}>
            <div style={{ fontSize: 32 }}>✅</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--ink)' }}>이대로 발송</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4, lineHeight: 1.25, color: 'var(--ink)' }}>오늘 11:11 자동 전송.</div>
            </div>
          </div>
        </div>
      </div>
    </Slide>);
};


window.S16 = S16; window.S17 = S17; window.S18 = S18; window.S19 = S19;
window.S20 = S20; window.S21 = S21; window.S22 = S22; window.S23 = S23;
window.S24 = S24;
