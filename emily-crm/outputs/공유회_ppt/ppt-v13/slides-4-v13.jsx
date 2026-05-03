// v13 · slides-4 — S23-S27: SKILLS (8 에이전트 + 삽질 한 컷) + CLOSE (NEXT · 6주 회고 · 팀 · 감사)

// ── 23 · 서브에이전트 8명 ─────────────────────────────
const S23 = () =>
<Slide num={23} total={27} theme="dark" topLeft="SKILLS · 분업" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>그리고 일은 — 한 명한테 다 안 시켜요.</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 28, fontSize: 64 }}>
      <span style={{ color: 'var(--yellow)' }}>서브에이전트 8명</span>한테<br />
      쪼개서 시킵니다.
    </div>
    <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.55 }}>
      클로드와 회의하다가 "한 명이 다 하면 흔들린다 — 쪼개자" 결정한 흐름.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 22 }}>
      {[
        { n: 'director', t: '본부장', d: '전체 검수 · 최종 승인 · Phase 조율' },
        { n: 'team-lead', t: '팀장', d: '카피·에셋 품질 검수' },
        { n: 'data-collector', t: '자료조사', d: 'URL 크롤 · DB 조회 · 신청자 추출' },
        { n: 'timeline-planner', t: '일정', d: 'Phase별 발송 시각 자동 계산' },
        { n: 'copywriter', t: '카피라이터', d: '템플릿 + 변수 채워 카피 생성' },
        { n: 'media-ops', t: '미디어', d: '배너 · 캐러셀 이미지 · HTML→PNG' },
        { n: 'dispatcher', t: '발송원', d: 'SOLAPI · Slack 전달 · 모달 띄움' },
        { n: 'verifier', t: '검수원', d: '톤 · 규정 위반 자동 반려' }].
        map((a, i) =>
        <div key={i} style={{
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 8
        }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 800, color: 'var(--yellow)', marginBottom: 4 }}>{a.n}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{a.t}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.45 }}>{a.d}</div>
        </div>
      )}
    </div>
    <div style={{ padding: '16px 22px', background: 'var(--yellow)', borderRadius: 10 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.4 }}>
        한 명이 8역할 = 흐려짐. 역할별로 나누면 — <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.1em' }}>각자 일을 더 잘함.</span>
      </div>
    </div>
  </Slide>;


// ── 24 · 삽질 한 컷: 취소 버튼 5번 → "관점 바꿔라" ──────
const S24 = () =>
<Slide num={24} total={27} topLeft="SKILLS · 인사이트" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">초보가 다 자동화한 거 아닙니다 — 5번씩 막혔어요.</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 28, fontSize: 64 }}>
      "취소 버튼 하나" 만드는 데 — <span className="hl">5번 시도.</span>
    </div>
    <div style={{ display: 'flex', gap: 22, alignItems: 'stretch', marginBottom: 22 }}>
      <div style={{ flex: 1.2, padding: '22px 26px', background: '#f5f5f5', borderRadius: 14 }}>
        <div className="tag" style={{ background: '#ddd', color: '#444', marginBottom: 14 }}>4번 다 실패</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['1', '실행 ID API stop', 'fetch가 안 됨'],
            ['2', 'axios 시도', '외부 모듈 차단'],
            ['3', 'this.helpers.httpRequest', 'Code 노드에선 접근 불가'],
            ['4', 'waiting 실행 stop', '"not found"']].
            map(([n, t, e], i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5' }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: '#c4343b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900 }}>{n}</div>
              <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#222' }}>{t}</div>
              <div style={{ fontSize: 14, color: '#c4343b', fontFamily: 'JetBrains Mono, monospace' }}>{e}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', color: '#bbb', fontSize: 36 }}>→</div>
      <div style={{ flex: 1, padding: '22px 26px', background: 'var(--ink)', color: '#fff', borderRadius: 14 }}>
        <div className="tag" style={{ background: 'var(--yellow)', color: 'var(--ink)', marginBottom: 14 }}>5번째 — 1분</div>
        <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.5, color: '#eee', marginBottom: 14 }}>
          "<span style={{ color: 'var(--yellow)' }}>다른 관점에서 생각해봐.</span>"<br />
          한 마디로 클로드가 멈춤.
        </div>
        <div style={{ fontSize: 17, color: '#bbb', lineHeight: 1.55, fontStyle: 'italic' }}>
          "실행을 멈추는 게 아니라,<br />발송만 안 하면 되잖아."
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(233,237,18,0.12)', borderRadius: 8, fontSize: 16, color: '#eee', lineHeight: 1.55, fontFamily: 'JetBrains Mono, monospace' }}>
          → staticData.cancel = true 1줄.
        </div>
      </div>
    </div>
    <div style={{ padding: '14px 22px', background: 'var(--yellow)', borderRadius: 10 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.45 }}>
        💡 같은 방향 3번 실패 = <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.1em' }}>방향이 틀렸다는 신호.</span>
      </div>
    </div>
  </Slide>;


// ── 25 · NEXT — 다음 채널들 ────────────────────────────
const S25 = () =>
<Slide num={25} total={27} theme="yellow" topLeft="NEXT · 다음은" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">알림톡은 첫 한 칸이었고,</div>
    <div className="h-xl" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 36, fontSize: 80 }}>
      이제 <span style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '0 0.12em' }}>다른 채널들</span>도<br />
      차례로 자동화.
    </div>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
      {[
        { c: '카카오 알림톡', s: 'DONE' },
        { c: '문자 (LMS)', s: 'NEXT' },
        { c: '이메일', s: 'NEXT' },
        { c: '카플친 배너', s: 'NEXT' },
        { c: '인스타 캐러셀', s: 'TODO' },
        { c: '오픈채팅 카피', s: 'TODO' },
        { c: '온드미디어', s: 'TODO' },
        { c: '개인화 카피 ★', s: 'TODO' }].
        map((ch, i) => {
          const done = ch.s === 'DONE';
          const next = ch.s === 'NEXT';
          return (
            <div key={i} style={{
              padding: '12px 20px',
              background: done ? 'var(--ink)' : next ? '#fff' : 'transparent',
              color: done ? 'var(--yellow)' : 'var(--ink)',
              border: done ? 'none' : next ? '2px solid var(--ink)' : '1.5px dashed rgba(0,0,0,0.3)',
              borderRadius: 8,
              display: 'flex', gap: 10, alignItems: 'center'
            }}>
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', opacity: done ? 1 : next ? 1 : 0.5 }}>{ch.s}</span>
              <span style={{ fontSize: 19, fontWeight: 800 }}>{ch.c}</span>
            </div>);
        })}
    </div>
    <div className="body" style={{ fontSize: 22, color: '#3a3b00', lineHeight: 1.55, maxWidth: 1500 }}>
      알림톡에서 만든 구조 — <b>OMC 인터뷰 → CLAUDE.md → n8n → 슬랙 승인 → 서브에이전트</b> — 를<br />
      그대로 다른 채널에 옮길 수 있어요. 자세한 얘기는 <b>다음 AX 공유회</b>에서.
    </div>
  </Slide>;


// ── 26 · 6주 전 vs 지금 ────────────────────────────────
const S26 = () =>
<Slide num={26} total={27} topLeft="CLOSE · 돌아보며" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker">돌아보면,</div>
    <div className="h-l" style={{ fontWeight: 800, lineHeight: 1.05, marginBottom: 56, fontSize: 70 }}>
      6주 전과 지금.
    </div>
    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      <div style={{ flex: 1, padding: '36px 44px 36px 0', borderRight: '1px solid #e6e6e6' }}>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.2em', color: '#bbb', marginBottom: 14 }}>6주 전</div>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.3, marginBottom: 24, color: '#888' }}>
          알림톡이 정보성/광고성이 <br />다른지도 몰랐음.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 18, color: '#999' }}>
          <div>· "이거 어떻게 보내지?"부터 검색</div>
          <div>· 매번 손으로 발송 시간 체크</div>
          <div>· 같은 카피, 같은 사람들</div>
          <div>· 클로드 코드 명령어도 안 외워짐</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '36px 0 36px 44px' }}>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--ink)', marginBottom: 14 }}>지금</div>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.3, marginBottom: 24 }}>
          알림톡 시스템을 <br /><span className="hl">직접 만들어서 굴림.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 18, color: '#444' }}>
          <div>· 매일 11시에 알아서 돔</div>
          <div>· 슬랙으로 승인만 누르면 끝</div>
          <div>· 다음은 세그먼트별 카피로</div>
          <div>· OMC 인터뷰로 PRD 뽑아냄</div>
        </div>
      </div>
    </div>
  </Slide>;


// ── 27 · 클로징 (팀 + 감사) ───────────────────────────
const S27 = () =>
<Slide num={27} total={27} theme="dark" topLeft="THANK YOU" topRight="EMILY · SELFISH CLUB · AAA">
    <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>마지막으로,</div>
    <div className="h-hero" style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.06, marginBottom: 40 }}>
      혼자였으면<br />
      <span style={{ color: 'var(--yellow)' }}>여기까지 못 왔어요.</span>
    </div>
    <div style={{ fontSize: 22, color: '#bbb', lineHeight: 1.6, marginBottom: 36, maxWidth: 1300 }}>
      클로드 코드가 실행을 도와줬지만, <br />
      방향을 잡아준 건 매주 공유하고 피드백을 주고받은 옆자리 사람들이었어요.
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
      {[
        ['비비안', '셀피쉬 AX 전체 그림 — 내 CRM 자리가 어딘지 잡아줌. 5월 AX 공유회는 비비안과 함께.'],
        ['AAA 크루', '"검수 단계 필요" 피드백 → tone-reviewer / verifier 추가.'],
        ['셀피쉬 팀', '"많이 보낸다 → 다양화·개인화" 톤 보정.']].
        map((r, i) =>
        <div key={i} style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--yellow)', minWidth: 110 }}>{r[0]}</div>
          <div style={{ flex: 1, fontSize: 17, color: '#ddd', lineHeight: 1.55 }}>{r[1]}</div>
        </div>
      )}
    </div>
    <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div className="h-l" style={{ fontSize: 56, fontWeight: 800 }}>
        감사합니다. <span style={{ color: 'var(--yellow)' }}>Q & A.</span>
      </div>
      <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
        AX 전체 흐름은 5월 / 스폰지클럽에서 더 깊이.
      </div>
    </div>
  </Slide>;


window.S23 = S23; window.S24 = S24; window.S25 = S25; window.S26 = S26;
window.S27 = S27;
