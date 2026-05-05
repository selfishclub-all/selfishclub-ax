# 공유회 CRM 에이전트 팀

> 트리거: "CRM 시작해줘", "공유회 CRM", "CRM 시작"
> 입력: 공유회 상세페이지 URL

## 개요
공유회 URL 하나로 전체 CRM 파이프라인을 자동 실행한다.
크롤링 → 타임라인 생성 → 전채널 카피 생성 → Slack 프레젠테이션.

## 팀 구조

```
본부장 (이 SKILL.md = director) — opus
  ├─ 실무 라인
  │    ├─ data-collector  — haiku
  │    ├─ copywriter      — sonnet
  │    ├─ media-ops       — sonnet
  │    └─ dispatcher      — sonnet
  └─ 검수 라인 (작성자 ≠ 검수자)
       ├─ verifier        — sonnet  (카피/미디어/데이터 규칙 체크)
       ├─ code-reviewer   — sonnet  (n8n/스크립트/md 변경 검수)
       └─ session-retro   — sonnet  (세션 종료 시 메모리 갱신)
```

**SSOT**: 모든 에이전트 정의는 루트 `.claude/agents/*.md`. `skills/sharing-crm-team/agents/` 는 참조 스텁.

## 오케스트레이션 원칙

1. **병렬 가능한 것은 병렬로** — copywriter ∥ media-ops 동시 실행
2. **검수는 별도 lane** — 작성 에이전트가 자기 승인 금지
3. **verifier 통과 후 dispatcher 호출** — 차단(❌) 있으면 재작업
4. **세션 종료 전 session-retro 호출** — 메모리/진행상태 갱신

## 공통 규칙
- **모든 URL에 UTM 자동 부착** (source/medium/campaign/content)
- **오픈채팅용은 bit.ly 변환** (나머지는 원본 UTM URL)
- **카플친** = 카카오 플러스친구 와이드형 메시지 (매 Phase 다른 디자인+카피)
- **오픈채팅** = 3개 동일 카피

---

## 실행 파이프라인

### Phase 0: 데이터 수집
**실행**: data-collector
**참조**: lib/url-parser.md, lib/data-enricher.md

1. URL에서 slug 추출
2. Supabase `item` 조회 → iid, i_eventdate, i_full_schedule, i_alimurl
3. Webflow 크롤 → 상세페이지 카피
4. 기획서.md 있으면 참조
5. Supabase: 멤버십 회원수, 신청자수, 미신청자수
6. 누락 정보 → 사용자에게 질문

**director 검수**: 필수 필드 완전성 확인
- iid, eventdate, live_time, title 있는가
- 세그먼트 수치 합리적인가

### Phase 1: 타임라인 생성
**실행**: data-collector
**참조**: lib/timeline-generator.md

1. 모집기간 기반 D-day 계산
2. 리마인드 타이밍 자동 계산 (모집기간에 비례)
3. Flow1(오픈→마감) + Flow2(후속) 출력

**director 검수**:
- 날짜 순서 정확 (오픈 < 리마인드 < D-1 < D-day)
- 리마인드 타이밍 적절

**→ 사용자 확인 후 다음 Phase**

### Phase 2: 전채널 카피 생성
**실행**: copywriter + media-ops (병렬)
**참조**: agents/copywriter.md, agents/media-ops.md

**copywriter 산출물**:
- 카플친: 오픈/리마인드/마감/혜택 각각 다른 카피+디자인 컨셉
- 오픈채팅: 오픈/리마인드/마감 각각 다른 카피
- 인스타 캐러셀: 리마인드만 (슬라이드+캡션+해시태그)
- 온드미디어 4종: 리틀리, 대화방소식, 웰컴메시지, 소식

**media-ops 산출물**:
- UTM URL 세트 (채널×Phase별)
- bit.ly 단축 URL (오픈채팅용)
- 카플친 배너 스펙 → kakaoplus-banner-generator 스킬
- 인스타 캐러셀 스펙 → selfish-membership-carousel 스킬

**verifier 검수** (필수, dispatcher 호출 전):
- `verifier(copy)` — `scripts/lint-copy.py` 자동 실행 + feedback_copy_rules.md 체크
- `verifier(media)` — 사이즈/UTM 포맷/bit.ly 여부 체크
- 차단 0건 확인 → 다음 Phase, 차단 있으면 작성 에이전트에 반려

**director 최종 판단** → 사용자 확인 후 다음 Phase

### Phase 3: Slack 프레젠테이션
**실행**: dispatcher
**참조**: agents/dispatcher.md

1. CRM 통합채널에 타임라인 순서대로 Phase별 메인 메시지
2. 각 Phase 스레드에 채널별 카피 (코드블록으로 복사 가능)
3. 사용자 승인 대기:
   - "승인" → Phase 완료
   - "수정: {피드백}" → copywriter 재생성 → 재프레젠테이션

**team-lead 검수**: Slack 메시지 완전성 확인
**director 최종 검수**: 전체 파이프라인 완료

---

## 아티팩트 저장

모든 산출물을 아래 경로에 저장:
```
.omc/crm-artifacts/{slug}/
├── manifest.json          # 전체 산출물 인덱스
├── enriched-data.json     # Phase 0 데이터
├── timeline.json          # Phase 1 타임라인
├── copy/
│   ├── kakaofriend/       # 카플친 카피 (Phase별)
│   ├── openchat/          # 오픈채팅 카피 (Phase별)
│   ├── instagram/         # 인스타 캐러셀
│   └── owned-media/       # 온드미디어 4종
├── urls/
│   ├── utm-urls.json      # 전체 UTM URL 세트
│   └── bitly-urls.json    # bit.ly 단축 URL
└── specs/
    ├── banner-specs.json  # 카플친 배너 스펙
    └── carousel-spec.json # 인스타 캐러셀 스펙
```

---

## Round 2: 알림톡 (나중에 추가)

사용자가 알림톡 템플릿 파일 공유 후:
- copywriter.md에 알림톡 카피 생성 로직 추가
- ①~⑦ + ⑥-3 + 노션 + VOD
- dispatcher.md에 SOLAPI 발송 로직 추가

## Round 3: 이메일 (나중에 추가)

- copywriter.md에 이메일 카피 추가 (오픈+마감+VOD, Stibee 포맷)
- dispatcher.md에 Stibee API 로직 추가

---

## 참조 파일

| 파일 | 용도 |
|------|------|
| lib/url-parser.md | URL 파싱 + 데이터 소스 라우팅 |
| lib/data-enricher.md | Webflow 크롤 + DB 쿼리 |
| lib/timeline-generator.md | 타임라인 자동 생성 |
| agents/data-collector.md | 데이터 수집 에이전트 |
| agents/copywriter.md | 카피 생성 에이전트 |
| agents/media-ops.md | UTM/bit.ly/이미지 스펙 에이전트 |
| agents/dispatcher.md | Slack 프레젠테이션 에이전트 |
| agents/team-lead.md | 호환 스텁 (→ verifier로 통합) |
| .claude/agents/verifier.md | 카피/미디어/데이터 규칙 검수 + lint-copy.py 실행 |
| .claude/agents/code-reviewer.md | n8n/스크립트/md 변경 검수 |
| .claude/agents/session-retro.md | 세션 종료 시 메모리 갱신 + 다음 세션 준비 |
| scripts/lint-copy.py | 카피 금지어 자동 감지 (verifier가 호출) |
