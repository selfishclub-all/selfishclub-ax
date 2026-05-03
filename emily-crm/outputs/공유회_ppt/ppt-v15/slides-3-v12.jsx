// v12 · slides-3 — S15-S25 HOW 챕터 (11장)

// ── 14 · HOW 챕터 표지 ────────────────────────────────
const S15 = () =>
<Slide num={15} total={31} topLeft="HOW" >
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div className="kicker">03. HOW</div>
      <div className="h-hero" style={{ fontWeight: 800, lineHeight: 1.05, fontSize: 140, letterSpacing: '-0.04em' }}>
        그래서 — <br />
        <span className="hl">어떻게 만들었냐면.</span>
      </div>
      <div style={{ marginTop: 48, fontSize: 28, color: '#666', lineHeight: 1.55, maxWidth: 1400 }}>
        6주 동안 만든 자동화의 뼈대를, 단계별로.
      </div>
    </div>
  </Slide>;


// ── 15 · HOW · 0단계: 처음엔 막막 → 템플릿 정리 ──────
const S16 = () =>
<Slide num={16} total={31} topLeft="HOW · 0단계" >
    <div className="kicker">코드 짜기 전에 —</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 32, fontSize: 96 }}>
      처음엔 <span style={{ color: '#bbb' }}>막막했어요.</span>
    </div>
    <div style={{ fontSize: 30, color: '#444', lineHeight: 1.55, fontWeight: 600, marginBottom: 56 }}>
      (말씀드렸듯이) 알림톡은 제 담당이 아니었으니까요.<br />
      알림톡이 대체 몇 개고, 어디서 어디로 흘러가는지 몰랐거든요.
    </div>

    <div style={{ display: 'flex', gap: 32, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '40px 44px', background: '#f5f5f5', borderRadius: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 16 }}>그래서 한 일</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 18 }}>
          알림톡 템플릿을 <span className="hl">전부 다 정리</span>.
        </div>
        <div style={{ fontSize: 24, color: '#555', lineHeight: 1.6 }}>
          어떤 트리거에 무슨 메시지가 나가는지,<br />
          정보성/광고성 분류, 발송 시각.<br />
          피그마에 하나씩 다 정리했어요.
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px 44px', background: 'var(--ink)', color: '#fff', borderRadius: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--yellow)', marginBottom: 16 }}>그리고</div>
        <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.4, marginBottom: 18 }}>
          그걸 그대로 — <br />
          <span style={{ background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.12em' }}>클로드한테 넘김.</span>
        </div>
        <div style={{ fontSize: 24, color: '#bbb', lineHeight: 1.6 }}>
          내가 정리한 알림톡 표를 들고,<br />
          "이거 자동화하고 싶어"부터 출발.
        </div>
      </div>
    </div>
  </Slide>;


// ── 16 · HOW · 1단계: 딥인터뷰 (실제 캡쳐) ───────────
const S17 = () => {
  const flow = [
    { n: 1, q: '목표가 뭐야?', amb: '100%', pick: '알림톡 한 채널 다' },
    { n: 2, q: '어디까지 자동?', amb: '67%', pick: '카피 승인 + 발송 버튼' },
    { n: 3, q: '끝났다는 건?', amb: '47.5%', pick: '운영하면서 확정' }
  ];
  return (
    <Slide num={17} total={31} topLeft="HOW · 1단계" >
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 4, fontSize: 60 }}>
        먼저 — <span className="hl">딥인터뷰</span>부터 했어요.
      </div>
      <div style={{ fontSize: 20, color: '#666', fontWeight: 500, lineHeight: 1.5, marginBottom: 18 }}>
        "crm 자동화할거야" 한 마디 → 3라운드 만에 자동화 스펙이 정리됩니다.
      </div>

      <div style={{ display: 'flex', gap: 36, flex: 1, minHeight: 0 }}>
        {/* 좌측 60% — ROUND 1 캡처 크게 */}
        <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: 'var(--ink)', padding: '6px 12px', background: 'var(--yellow)', borderRadius: 6 }}>ROUND 1</div>
            <div style={{ fontSize: 16, color: '#666', fontFamily: 'JetBrains Mono, monospace' }}>Goal Clarity · Ambiguity 100%</div>
          </div>
          <div style={{
            flex: 1, background: '#fafafa', border: '1.5px solid #e3e3e3', borderRadius: 14,
            padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 0, overflow: 'hidden', boxShadow: '0 14px 36px rgba(0,0,0,0.08)'
          }}>
            <img src="assets/deep-interview-1.png" alt="Deep Interview Round 1 — 실제 캡쳐" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8, display: 'block' }} />
          </div>
          <div style={{ fontSize: 15, color: '#888', marginTop: 10, lineHeight: 1.5, fontFamily: 'JetBrains Mono, monospace' }}>
            ↑ 클로드가 보기 4지선다로 던진 질문 — 내가 클릭만.
          </div>
        </div>

        {/* 우측 40% — 3라운드 흐름 텍스트 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 4 }}>3라운드 흐름</div>
          {flow.map((r, i) =>
            <React.Fragment key={r.n}>
              <div style={{ padding: '14px 18px', border: '1.5px solid #e3e3e3', borderRadius: 12, background: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.18em', color: 'var(--ink)' }}>ROUND {r.n}</div>
                  <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#999' }}>AMB {r.amb}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="assets/icon-claude.png" alt="Claude" style={{ width: 22, height: 22, display: 'block' }} />
                  <span>{r.q}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#3a3b00', background: 'var(--yellow)', padding: '6px 12px', borderRadius: 6, display: 'inline-block' }}>
                  → {r.pick}
                </div>
              </div>
              {i < flow.length - 1 && <div style={{ textAlign: 'center', fontSize: 18, color: '#bbb', lineHeight: 1, fontWeight: 300 }}>↓</div>}
            </React.Fragment>
          )}
          <div style={{ marginTop: 8, padding: '12px 18px', background: 'var(--ink)', color: '#fff', borderRadius: 10, fontSize: 18, fontWeight: 800, textAlign: 'center' }}>
            → 자동화 스펙 정리 완료
          </div>
        </div>
      </div>
    </Slide>
  );
};


// ── 17 · HOW · 2단계: CLAUDE.md ──────────────────────
const S18 = () =>
<Slide num={18} total={31} topLeft="HOW · 2단계" >
    <div className="kicker">인터뷰가 끝나고 보니까,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 48, fontSize: 68 }}>
      답변이 자연스럽게 <span style={{ fontFamily: 'JetBrains Mono, monospace', background: 'var(--yellow)', color: 'var(--ink)', padding: '0 0.15em' }}>CLAUDE.md</span> <br />
      한 장으로 떨어짐.
    </div>
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <div className="body" style={{ fontSize: 30, color: '#222', lineHeight: 1.5, marginBottom: 28 }}>
          CLAUDE.md = 클로드가 일 시작할 때 <b className="hl">가장 먼저 읽는 규칙 파일.</b>
        </div>
        <div style={{ fontSize: 24, color: '#666', lineHeight: 1.65 }}>
          톤·금지사항·데이터 기준이 다 들어있음.<br />
          여기만 한 번 잘 정리해두면, 매번 클로드가 이걸 먼저 읽고 시작.
        </div>
      </div>
      <div className="code" style={{ flex: 1, fontSize: 17, lineHeight: 1.7, padding: 32, background: 'var(--ink)', color: '#eee', borderRadius: 14 }}>
        <span style={{ color: '#888' }}># 셀피쉬클럽 CRM Agent 규칙</span>{'\n\n'}
        <span style={{ color: 'var(--yellow)' }}>## 톤</span>{'\n'}
        - 친근하지만 정중하게.{'\n'}
        - 이모지는 한 메시지에 1개까지.{'\n\n'}
        <span style={{ color: 'var(--yellow)' }}>## 발송 금지</span>{'\n'}
        - 광고성: 21:00 ~ 08:00 발송 금지{'\n'}
        - 정보성: 시간 무관, 단 23:00 이후 자제{'\n\n'}
        <span style={{ color: 'var(--yellow)' }}>## 세그먼트</span>{'\n'}
        - 30일 이내 = 활성{'\n'}
        - 31~90일 = 재참여{'\n'}
        - 91일 이상 = 휴면{'\n\n'}
        <span style={{ color: 'var(--yellow)' }}>## 검수</span>{'\n'}
        - 톤 검수 + 규정 검수 둘 다 통과해야 발송{'\n'}
        - 사람 최종 승인은 슬랙 카드{'\n'}
      </div>
    </div>
  </Slide>;


// ── 18 · HOW · 3단계 [막힘]: 한 명한테 다 시킴 ───────
const S19 = () =>
<Slide num={19} total={31} topLeft="HOW · 3단계 · 시행착오" >
    <div className="kicker">CLAUDE.md 들고 처음엔 이렇게 만들었어요</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 40, fontSize: 84 }}>
      에이전트 <span style={{ color: '#999' }}>딱 한 명</span>한테 다 시켰음.
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'stretch', marginBottom: 24 }}>
      <div style={{ flex: 1, padding: '32px 36px', background: '#fff', border: '1.5px solid #e3e3e3', borderRadius: 14 }}>
        <div style={{ display: 'inline-block', fontSize: 20, fontWeight: 900, color: 'var(--ink)', marginBottom: 14, letterSpacing: '0.2em', background: 'var(--yellow)', padding: '4px 12px', borderRadius: 6 }}>FAIL</div>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, color: 'var(--ink)', marginBottom: 16 }}>
          "오늘 발송할 거 정하고, 카피 쓰고, 검수까지 알아서 해."
        </div>
        <div style={{ fontSize: 19, color: '#666', lineHeight: 1.6 }}>
          → 너무 많은 판단을 한 번에<br/>
          → 어디서 틀렸는지 추적 안 됨<br/>
          → 카피 톤이 매번 다름
        </div>
      </div>
      <div style={{ flex: 1, padding: '32px 36px', background: '#fff', border: '1.5px solid #e3e3e3', borderRadius: 14 }}>
        <div style={{ display: 'inline-block', fontSize: 20, fontWeight: 900, color: 'var(--ink)', marginBottom: 14, letterSpacing: '0.2em', background: 'var(--yellow)', padding: '4px 12px', borderRadius: 6 }}>비유하면</div>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.45, color: 'var(--ink)', marginBottom: 16 }}>
          식당 한 명이 — 주문받고 · 요리 · 서빙 · 계산까지.
        </div>
        <div style={{ fontSize: 19, color: '#666', lineHeight: 1.6 }}>
          → 한 명이 다 하면 망함<br/>
          → 역할 나누면 각자 잘하게 됨
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, margin: '12px 0 18px' }}>
      <div style={{ flex: 1, height: 1, borderTop: '2px dashed #ccc' }}></div>
      <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: '#888' }}>그래서 —</div>
      <div style={{ fontSize: 72, color: 'var(--ink)', fontWeight: 300, lineHeight: 1 }}>↓</div>
      <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: '#888' }}>해결</div>
      <div style={{ flex: 1, height: 1, borderTop: '2px dashed #ccc' }}></div>
    </div>

    <div style={{ padding: '40px 52px', background: 'var(--yellow)', borderRadius: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ flex: '0 0 auto', padding: '12px 22px', background: 'var(--ink)', color: 'var(--yellow)', borderRadius: 8, fontSize: 22, fontWeight: 900, letterSpacing: '0.18em' }}>해결</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.3, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            "역할별로 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.14em' }}>서브에이전트</span>를 쪼개자."
          </div>
          <div style={{ fontSize: 22, color: '#3a3b00', fontWeight: 600, lineHeight: 1.5 }}>
            기획 · 카피 · 톤검수 · 규정검수 · 발송 · 기록 — 한 명이 다 하지 말고, 8명이 분업.
          </div>
        </div>
      </div>
    </div>

    <div style={{ marginTop: 18, fontSize: 17, color: '#888', lineHeight: 1.55 }}>
      ※ 서브에이전트 = 클로드 안에서 역할별로 따로 노는 작은 클로드들. 각자 자기 규칙만 보고, 자기 일만 함.
    </div>
  </Slide>;


// ── 19 · HOW · 3단계 [해결]: 8명 분업 ────────────────
const S20 = () =>
<Slide num={20} total={31} topLeft="HOW · 3단계 · 8명" >
    <div className="kicker">그래서 서브에이전트가</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 44, fontSize: 88 }}>
      이렇게 <span className="hl">8명</span>이 됐어요.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {[
        { n: '01', name: 'schedule-checker', t: '오늘 보낼 거 점검', d: '캘린더 읽고 대상자 추출' },
        { n: '02', name: 'segment-picker', t: '누구한테 보낼지', d: '신규/재참여/휴면 분기' },
        { n: '03', name: 'copy-writer', t: '카피 작성', d: '세그먼트별 톤 다르게', hl: true },
        { n: '04', name: 'tone-reviewer', t: '톤 검수', d: '브랜드 보이스 어긋나면 반려' },
        { n: '05', name: 'compliance-checker', t: '규정 검수', d: '광고성 야간 발송 등 차단' },
        { n: '06', name: 'preview-builder', t: '미리보기 빌드', d: '슬랙 카드 + 승인 버튼', hl: true },
        { n: '07', name: 'sender', t: 'n8n 트리거', d: '승인 받으면 카카오 API 호출' },
        { n: '08', name: 'logger', t: '결과 기록', d: '오픈/클릭 → Notion DB' }
      ].map((a, i) =>
        <div key={i} style={{
          padding: '32px 30px', borderRadius: 16,
          background: a.hl ? 'var(--ink)' : '#fff',
          color: a.hl ? '#fff' : 'var(--ink)',
          border: a.hl ? 'none' : '2px solid #ececec'
        }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: a.hl ? 'var(--yellow)' : '#bbb', letterSpacing: '0.1em', marginBottom: 12 }}>{a.n}</div>
          <div style={{ fontSize: 16, fontFamily: 'JetBrains Mono, monospace', color: a.hl ? 'rgba(255,255,255,0.6)' : '#999', marginBottom: 14 }}>{a.name}</div>
          <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.25, marginBottom: 12, letterSpacing: '-0.02em' }}>{a.t}</div>
          <div style={{ fontSize: 20, color: a.hl ? 'rgba(255,255,255,0.7)' : '#666', lineHeight: 1.5, fontWeight: 500 }}>{a.d}</div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 28, fontSize: 22, color: '#888', lineHeight: 1.55 }}>
      ※ 검정 카드 = 직접 메시지 만지는 핵심 에이전트. 나머지는 검수·실행·기록. 이 8명을 묶는 규칙이 — 앞장의 <b>CLAUDE.md</b>.
    </div>
  </Slide>;


// ── 20 · HOW · 4단계 [막힘]: 노트북 덮으면 멈춤 ─────
const S21 = () =>
<Slide num={21} total={31} topLeft="HOW · 4단계" >
    <div className="kicker">8명을 굴려보니까,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: 36, fontSize: 80 }}>
      또 막혔어요 — <span className="hl">노트북을 덮으면 멈춤.</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 1500 }}>
      {[
        { who: '나', side: 'L', t: '이번 신청자들 뽑아서, 오후 3시에 보내줘.' },
        { who: 'CLAUDE', side: 'R', t: '네, 3시에 6,080명 전송 완료했어요.' },
        { who: '나', side: 'L', t: '좋아. 그럼 7시에 미신청자한테도 한 번 더 보내줘.\n…근데 나 6시에 퇴근하거든. 노트북 끄고 가도 돼?' },
        { who: 'CLAUDE', side: 'R', t: '아… 노트북이 꺼지면, 저는 7시에 못 보내요.', emphasize: true }
      ].map((m, i) =>
        <div key={i} style={{ display: 'flex', justifyContent: m.side === 'L' ? 'flex-start' : 'flex-end' }}>
          <div style={{ maxWidth: '72%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, justifyContent: m.side === 'R' ? 'flex-end' : 'flex-start' }}>
              {m.who === 'CLAUDE' && <img src="assets/icon-claude.png" alt="Claude" style={{ width: 22, height: 22, display: 'block' }} />}
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.16em', color: '#999' }}>{m.who}</div>
            </div>
            <div style={{
              padding: '22px 30px',
              background: m.side === 'L' ? '#f1f1f1' : 'var(--ink)',
              color: m.side === 'L' ? 'var(--ink)' : '#fff',
              borderRadius: 22,
              fontWeight: m.emphasize ? 800 : 500, lineHeight: 1.5, whiteSpace: 'pre-line', fontSize: m.emphasize ? 38 : 28
            }}>{m.t}</div>
          </div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 32, padding: '24px 36px', background: 'var(--yellow)', borderRadius: 14, alignSelf: 'flex-start' }}>
      <div style={{ fontWeight: 900, fontSize: 32 }}>→ 내 노트북과 무관하게 돌아갈 무언가가 필요.</div>
    </div>
  </Slide>;


// ── 21 · HOW · 5단계: n8n 도입 ───────────────────────
const S22 = () => {
  const benefits = [
    { tag: '24시간 돌아감', d: '내 노트북이 꺼져 있어도 돌아감 — 서버가 해주니까.' },
    { tag: '워크플로우가 시각적', d: '노드 하나당 동작 하나. 전체 흐름이 한눈에 보임.' },
    { tag: '오픈소스', d: '셀프호스팅 가능 — 데이터가 외부에 안 나감.' }
  ];
  return (
    <Slide num={22} total={31} topLeft="HOW · 5단계" >
      <div className="kicker">그래서 n8n을 사용하기로 합니다.</div>
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.02, marginBottom: 40, fontSize: 110, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 24 }}>
        <img src="assets/icon-n8n.png" alt="n8n" style={{ width: 96, height: 96, display: 'block' }} />
        <span><span style={{ fontFamily: 'JetBrains Mono, monospace' }}>n8n</span>이 뭐냐면.</span>
      </div>
      <div style={{ display: 'flex', gap: 56, alignItems: 'center', flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, justifyContent: 'center' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.45, marginBottom: 14 }}>
              n8n = <span className="hl">워크플로우 자동화 툴.</span>
            </div>
            <div style={{ fontSize: 24, color: '#555', lineHeight: 1.65 }}>
              여러 서비스(DB·슬랙·카카오·클로드 등)를 하나의 흐름으로 묶어서,<br />
              정해진 시간/조건에 자동 실행시키는 서버.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {benefits.map((b, i) =>
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{
                  flex: '0 0 auto', width: 38, height: 38, borderRadius: '50%',
                  background: 'var(--ink)', color: 'var(--yellow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace',
                  marginTop: 4
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>{b.tag}</div>
                  <div style={{ fontSize: 22, color: '#666', lineHeight: 1.55 }}>{b.d}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1.05, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 14 }}>이런 모양</div>
          <div style={{
            flex: 1, background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 16,
            padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 18px 40px rgba(0,0,0,0.08)', minHeight: 0
          }}>
            <img src="n8n-screen.png" alt="n8n 워크플로우 캡쳐" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8, display: 'block' }} />
          </div>
          <div style={{ fontSize: 18, color: '#888', marginTop: 14, lineHeight: 1.5, fontFamily: 'JetBrains Mono, monospace' }}>
            ↑ 셀피쉬클럽 알림톡 자동화 워크플로우 일부.
          </div>
        </div>
      </div>
    </Slide>
  );
};


// ── 22 · HOW · 5단계 디테일: 클로드가 설계한 워크플로우 ─
const S23 = () => {
  const flow = [
    [{ t: 'Schedule', sub: '매일 11:00 탐색' }, { t: 'Code', sub: '알림톡 판별' }, { t: 'Slack', sub: '승인 모달', hl: true }],
    [{ t: 'Code', sub: 'SQL 재생성' }, { t: 'Wait', sub: '발송시간까지' }, { t: 'Code', sub: '취소 확인' }],
    [{ t: 'Postgres', sub: '대상자 조회' }, { t: 'Switch', sub: '9개 템플릿 분기' }, { t: 'HTTP', sub: '→ SOLAPI 발송' }]
  ];
  return (
    <Slide num={23} total={31} topLeft="HOW · 5단계 · 클로드가 설계해준 것" bodyStyle={{ padding: '140px 50px 80px' }} >
      <div className="kicker">이 n8n 워크플로우, 제가 짠 게 아니에요,</div>
      <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.06, marginBottom: 12, fontSize: 76 }}>
        <span className="hl">클로드가 알아서</span> 설계해줬어요.
      </div>
      <div style={{ fontSize: 24, color: '#666', lineHeight: 1.55, marginBottom: 32 }}>
        앞장 브레인스토밍 + <b style={{ color: 'var(--ink)' }}>CLAUDE.md</b> 한 장만 보고 — <img src="assets/icon-n8n.png" alt="n8n" style={{ width: 22, height: 22, display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} /><b style={{ color: 'var(--ink)' }}>n8n</b> 38개 단계짜리 자동화를 통째로.
      </div>

      <div style={{ flex: 1, background: '#fafafa', border: '1.5px solid #e9e9e3', borderRadius: 18, padding: '50px 50px 40px', display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'center', minHeight: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 20, left: 30, fontSize: 14, fontWeight: 900, letterSpacing: '0.22em', color: '#999' }}>N8N WORKFLOW · 대표 9개 노드</div>
        {flow.map((row, ri) =>
          <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 22, justifyContent: 'center' }}>
            {row.map((n, ci) =>
              <React.Fragment key={ci}>
                <div style={{
                  flex: '0 0 320px', padding: '32px 36px', borderRadius: 14,
                  background: n.hl ? 'var(--yellow)' : '#fff',
                  border: n.hl ? '2.5px solid var(--ink)' : '1.5px solid #d8d8d8',
                  textAlign: 'center', position: 'relative'
                }}>
                  {n.icon && <img src={n.icon} alt="" style={{ width: 26, height: 26, position: 'absolute', top: 10, right: 10, display: 'block' }} />}
                  <div style={{ fontSize: 16, fontFamily: 'JetBrains Mono, monospace', color: n.hl ? '#3a3b00' : '#999', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>{n.t}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.25 }}>{n.sub}</div>
                </div>
                {ci < row.length - 1 && <div style={{ fontSize: 34, color: '#bbb', fontWeight: 300 }}>→</div>}
              </React.Fragment>
            )}
          </div>
        )}
        <div style={{ textAlign: 'center', fontSize: 18, color: '#888', marginTop: 8, fontFamily: 'JetBrains Mono, monospace' }}>
          + 분기·검증·재시도·로깅 ··· = <b style={{ color: 'var(--ink)' }}>총 38개 단계</b>
        </div>
      </div>
    </Slide>
  );
};


// ── 23 · HOW · 6단계 [막힘]: 잘못 나가면? ────────────
const S24 = () =>
<Slide num={24} total={31} topLeft="HOW · 6단계 · 마지막 걱정" >
    <div className="kicker">n8n까지 만들고 보니까,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.08, marginBottom: 56, fontSize: 96, letterSpacing: '-0.02em' }}>
      "혹시 <span className="hl">잘못 나가면</span><br />
      어떡하지?"
    </div>
    <div style={{ fontSize: 36, color: '#444', lineHeight: 1.55, fontWeight: 600, marginBottom: 36 }}>
      6,080명한테 한 번에 나가는 메시지.<br />
      오타 하나, 링크 하나 잘못되면 — <b style={{ color: 'var(--ink)' }}>되돌릴 수 없음.</b>
    </div>
    <div style={{ padding: '24px 36px', background: 'var(--yellow)', borderRadius: 14, alignSelf: 'flex-start', fontSize: 28, fontWeight: 800, color: 'var(--ink)' }}>
      → 완전 자동은 무서워요. 발송 직전에 — <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '4px 12px', borderRadius: 6, marginLeft: 6 }}>한 번 보고 가고 싶었음.</span>
    </div>
  </Slide>;


// ── 24 · HOW · 6단계 [해결]: 슬랙 모달 ──────────────
const S25 = () =>
<Slide num={25} total={31} topLeft="HOW · 6단계 · 결과" >
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 22, fontSize: 76, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
      <img src="assets/icon-n8n.png" alt="n8n" style={{ width: 56, height: 56, display: 'block' }} />
      <span>n8n에 한 단계 추가 —</span>
      <img src="assets/icon-slack.png" alt="Slack" style={{ width: 56, height: 56, display: 'block' }} />
      <span className="hl">발송 직전 슬랙 모달.</span>
    </div>
    <div style={{ fontSize: 20, color: '#666', marginBottom: 32, padding: '12px 18px', background: '#f5f5f5', borderRadius: 8, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src="assets/icon-slack.png" alt="Slack" style={{ width: 20, height: 20, display: 'block' }} />
      <span><b style={{ color: 'var(--ink)' }}>※ 슬랙</b> = 회사용 메신저. 채널·봇·승인 카드 같은 업무 자동화가 가능.</span>
    </div>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 14 }}>① 발송 예정 카드</div>
        <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 18, display: 'flex', justifyContent: 'center' }}>
          <img src="slack-card.png" alt="슬랙 발송 예정 카드" style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block' }} />
        </div>
        <div style={{ fontSize: 22, color: '#555', marginTop: 16, lineHeight: 1.55 }}>
          무엇이 / 언제 / 누구에게 — 한눈에.
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.22em', color: '#999', marginBottom: 14 }}>② 카피 + UTM 레퍼런스</div>
        <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 18, display: 'flex', justifyContent: 'center' }}>
          <img src="slack-comment.png" alt="슬랙 카피 레퍼런스" style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block' }} />
        </div>
        <div style={{ fontSize: 22, color: '#555', marginTop: 16, lineHeight: 1.55 }}>
          그대로 복붙해서 알림톡 본문에 넣을 수 있게.
        </div>
      </div>
    </div>
    <div style={{ marginTop: 28, padding: '24px 36px', background: 'var(--yellow)', borderRadius: 14, fontSize: 32, fontWeight: 800, color: 'var(--ink)' }}>
      AI가 다 만들고 — 마지막 한 번만, <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>사람이 승인</span>.
    </div>
  </Slide>;


// ── 25 · HOW · 6단계 · 연결 (SVG 다이어그램) ────────
const S26 = () =>
<Slide num={26} total={31} topLeft="HOW · 6단계 · 연결" >
    <div className="kicker" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      그럼 <img src="assets/icon-n8n.png" alt="n8n" style={{ width: 22, height: 22, display: 'inline-block' }} /> n8n과 <img src="assets/icon-slack.png" alt="Slack" style={{ width: 22, height: 22, display: 'inline-block' }} /> 슬랙은 어떻게 연결된 걸까?
    </div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 36, fontSize: 80 }}>
      봇 셋이 일하고 — <span className="hl">나는 승인만</span>.
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 24, display: 'flex', alignItems: 'center', gap: 14, padding: '8px 14px', background: '#fff', border: '1.5px solid #e3e3e3', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <img src="assets/icon-n8n.png" alt="n8n" style={{ width: 28, height: 28, display: 'block' }} />
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>n8n</span>
        <span style={{ fontSize: 16, color: '#bbb' }}>×</span>
        <img src="assets/icon-slack.png" alt="Slack" style={{ width: 28, height: 28, display: 'block' }} />
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>Slack</span>
      </div>
      <img src="assets/connect-t.svg" alt="n8n × Slack T자 다이어그램" style={{ width: '100%', height: '100%', maxWidth: 1500, objectFit: 'contain', display: 'block' }} />
    </div>
  </Slide>;


// ── 26 · HOW · 7단계 · 한 바퀴 (SVG) ──────────────────
const S27 = () =>
<Slide num={27} total={31} topLeft="HOW · 7단계 · 한 바퀴" >
    <div className="kicker">매일 아침 11시 시작 — 사람이 끼는 건 딱 5초.</div>
    <div className="h-xl" style={{ fontWeight: 800, fontSize: 56, lineHeight: 1.08, marginBottom: 14 }}>
      이렇게 <span className="hl">한 바퀴</span> 돕니다.
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 24, display: 'flex', alignItems: 'center', gap: 14, padding: '8px 14px', background: '#fff', border: '1.5px solid #e3e3e3', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', zIndex: 2 }}>
        <img src="assets/icon-n8n.png" alt="n8n" style={{ width: 28, height: 28, display: 'block' }} />
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>n8n</span>
        <span style={{ fontSize: 16, color: '#bbb' }}>×</span>
        <img src="assets/icon-slack.png" alt="Slack" style={{ width: 28, height: 28, display: 'block' }} />
        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>Slack</span>
      </div>
      <img src="assets/workflow-split.svg" alt="6단계 워크플로우 + 슬랙 카드" style={{ width: 1080, height: 'auto', display: 'block' }} />
    </div>
  </Slide>;


window.S15 = S15; window.S16 = S16; window.S17 = S17; window.S18 = S18;
window.S19 = S19; window.S20 = S20; window.S21 = S21; window.S22 = S22;
window.S23 = S23; window.S24 = S24; window.S25 = S25; window.S26 = S26; window.S27 = S27;
