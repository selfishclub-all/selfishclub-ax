---
name: CRM 프로젝트 진행 상태
description: 현재 완료/진행중/남은 작업 전체 추적. 매 세션 업데이트.
type: project
---

## ⚡ 다음 세션 To-Do (2026-04-29~)
- ✅ **Vercel API 토큰 `claude-cli-deploy` 폐기** (2026-04-28 완료)
- 🚫 **Vercel × selfishclub-all/selfish-ops2 연결 — 안 함** (팀 레포라 별도 권한 부담)
  - 결정: 다음에 Vercel 자동 배포가 필요한 상황이 생기면 → **개인 계정에 별도 레포 만들어서** 거기에 deck 분리하고 Vercel 연결
  - 그 전까지는 `vercel deploy --prod` CLI로 수동 배포 (필요할 때 새 토큰 발급)
- 🔲 AAA 공유회 사후분석 (`/사후분석 해줘` 스킬로 전환·도달율 분석)
- 🔲 다음 채널(카플친·이메일·인스타·오픈채팅) AX 일정 확정

## 🗓️ 4월 로드맵 (2026-04-09 수립)

> **목표**: 월말까지 Tier 0~3 완료 = 측정 기반 자동화 CRM 플랫폼 기반 마련
> **원칙**: 운영 자동화 먼저 → 측정 → 가시화 → (5월에) v2 본격 착수

### Week 1 (4/9~4/12) — Tier 0 + Tier 1 착수
- 크루 테스트 ①②③⑤ 모니터링 (자동 실행)
- CRM 카피 레퍼런스 스크립트 점검/전달 (4/10 아침)
- `sharing-crm-team` 스킬 안정화 (data-collector, copywriter)

### Week 2 (4/13~4/19) — Tier 1 완료 + 전채널 자동화
- 4/13 D-day 크루 테스트 (④⑥⑦⑧)
- 카플친 배너/카피 완성 → 자동화 파이프라인 (Slack 업로드까지)
- 인스타 캐러셀 배너/카피 완성 → 자동화 업로드
- 전체 플로우 최대한 자동화 + 디벨롭
- 4/17 testMode 해제 + 프로덕션 전환

### ⚠️ 카플친/온드미디어 발송 전략
- **친구톡 템플릿 심사는 스킵** (에밀리 선호: 검수 과정 귀찮음)
- **자동화 레벨 A**: 카피 + 이미지 자동 생성 → Slack #crm-카피에 복붙 친화적으로 올림 → 에밀리가 카카오 파트너센터에서 5분 수동 발송
- 온드미디어(리틀리/대화방소식/웰컴메시지/소식)도 동일: 카피 자동 생성 → Slack 복붙 대기 → 에밀리 수동 입력
- 카카오가 파트너센터 공식 API 미제공이라 발송 자동화는 기술적 불가
- 수동 발송에 드는 시간: 공유회 1건당 ~15분 (허용 범위)

### Week 3 (4/20~4/26) — 측정 + 사후분석 + 대시보드 (Tier 2+3 통합)
- Supabase SQL view 3개 생성 (v_channel_attribution, v_event_funnel, v_channel_phase_matrix)
- "사후분석 해줘" 스킬 실행화 (SQL → Slack 리포트)
- **Next.js + Vercel 대시보드** (KPI 퍼널 + 채널 전환 + 배너/카피 아카이브)
- n8n 주간 다이제스트 워크플로우 (매주 월 09:00 KST)
- CRM 시작 시 과거 성과 컨텍스트 주입

### Week 4 (4/27~4/30) — 최적화 + 회고
- 아티팩트 저장 체계화 (.omc/crm-artifacts/{slug}/)
- E2E 테스트: "CRM 시작해줘" → "사후분석 해줘" 전체 사이클
- PRD 업데이트 (00-overview, 08-database)
- 4월 회고 + 5월 v2 계획

### 5월 이후 — Tier 4 (v2 본격)
- v2-A: 유저 여정 추적 (세그먼트 정의)
- v2-B: KPI 적응형 CRM (A/B 테스트, 규칙 엔진)
- v2-C: 과거 인사이트 축적 (pgvector + Claude RAG)

### 🗑️ 영구 보류 (재논의 필요)
- events 테이블 + n8n 이벤트 적재 (UTM 분석으로 충분, 별도 테이블 불필요)
- Vercel 서버리스 풀 전환 (Claude Code로 충분)
- 카카오모먼트 API 전환
- Stibee 이메일 자동화 (가치 검증 먼저)
- 오픈채팅 3방 자동화 (수동 충분)
- 온드미디어 자동화 (저빈도)

---

## 4/27 세션 — AAA D-1 본 발송 + PPT v8 작업 (진행 중)

### 알림톡 본 발송 (14:00~14:45 KST)
- ✅ **신청자 D-1 (③' `KA01TP250810153246575dLXbwnUflWd`)**: 1,328 시도 / 1,266 성공 / 62 실패 (4.7%)
  - 1차 981명 (`send-d1-bulk.js`) — Supabase 페이지네이션 누락
  - 2차 347명 (`send-d1-bulk-rest.js`) — 누락분 보충
- ✅ **미신청자 마감 (T1 `KA01TP260417070155000oUqIHGY6LdH`)**: 6,069 시도 / 4,266 성공 / 1,803 실패 (29.7%)
  - 멤버십(마케팅동의) 6,801 − 신청자 663 − 무효형식 68 − 중복 2 = 6,068 발송
- 📊 **합계: 7,397 시도 / 5,532 성공 / 1,865 실패 (25.2%)**
- 💡 미신청자 알림톡 직후 신규 신청 빠르게 유입 ("많이 들어왔다")
- 🗂️ SSOT: `outputs/crm/AAA_260427_send_log.md` (카피 풀+모수+이슈 박제)

### 신규 박제
- ✅ PRD 12 → 13종 (T4/T5 + ③' 등재, ③ 레거시)
- ✅ `feedback_alimtalk_t1_url_prefix.md` (T1 버튼 도메인 prefix 하드코딩 함정)
- ✅ `feedback_supabase_pagination_required.md` (REST limit cap ~1000)
- ✅ `session_0427_aaa_d1_send.md` (세션 종합)

### AAA 발표 PPT 작업 (미완)
- v8 HTML 골격 (`outputs/aaa-deck-v8/deck.html`) 16장
- **방향 전환**: v7 PPT(`outputs/aaappt_design_handoff_aaa_deck/`) 기준으로 디벨롭
- v7 28장 → 21장 plan (S19-S22 하네스 컷, S23-S25 USE CASE 컷)
- **다음 액션 (집에서)**: jsx 5개 + `build_pptx_editable.py` 수정 → 컷 + 용어풀이/5월안내 추가 → PPT 빌드 → 4/28 20:30 발표

---

## 4/13 세션 — 크루 D-day 버그 수정 + 취소 기능 + 발송 직전 조회

### 버그 수정 (n8n API PUT)
- ✅ ③ D-1 dsql 수정: `i_eventdate = CURRENT_DATE` → `i_eventdate - INTERVAL '1 day' = CURRENT_DATE`
- ✅ ⑦ 슬랙 메시지/수정 미리보기 이중 체크마크(`✅✅`) 제거
- ✅ 슬랙 메시지 순서 보장: `HTTP: 슬랙 전송`에 batching (batchSize:1, batchInterval:1000)
- ✅ 수정 헤더에 numLabel 추가: `[#4 당일리마인드] 공유회명 — 수정됨`
- ✅ ⑤ 수정 모달에 신청페이지 URL 필드(f_link) 추가
- ✅ 링크 라우팅: ⑧→i_alimurl, ⑨→i_vodurl, ③④⑥⑦→staticData.zoomUrl, ①②⑤→UTM/신청URL

### 취소 기능 구현
- ✅ `Code: 취소 준비` 노드 추가 — staticData에 `cancel_{t}_{iid}` 플래그 설정
- ✅ `Code: 실행 취소` 노드 추가 — 패스스루 (API 호출 방식 → staticData 플래그 방식으로 전환)
- ✅ `Code: 취소 확인` 노드 추가 (Wait → Switch 사이) — 플래그 있으면 빈 배열 리턴으로 발송 스킵
- ✅ `Code: SQL 재생성`에서 재승인 시 cancel 플래그 삭제
- ✅ `HTTP: 취소 메시지` 업데이트 — 취소 상태 표시
- ✅ 연결: Switch: 액션[reject] → 취소 준비 → 실행 취소 → 취소 메시지
- ✅ 승인 → 취소 → 재승인 사이클 동작 확인

### 발송 직전 DB 조회 (플로우 순서 변경)
- ✅ 기존: SQL재생성 → Postgres조회 → 발송데이터 → Wait → Switch
- ✅ 변경: SQL재생성 → Wait → 취소확인 → Postgres조회 → 발송데이터 → Switch
- ✅ `Code: SQL 재생성`에 scheduledDate 계산 + 파싱 데이터 패스스루 추가
- ✅ `Code: 취소 확인`에서 staticData._currentSend에 템플릿 데이터 저장
- ✅ `Code: 발송 데이터`가 staticData._currentSend에서 템플릿 정보 읽도록 변경
- ❌ 14:00 ④ 당일리마인드 — 2번 발송됨 (중복 발송 버그)
- ❌ 13:00 ⑤ 할인쿠폰 — 코이가 미신청자로 받음 (승인 시점 DB 조회 + 발송직전 조회 미적용 상태)

### 중복 발송 버그 수정 (cancel 플래그 → 버전 카운터)
- **원인**: 승인→취소→재승인 시, 재승인이 cancel 플래그를 삭제하면서 이전 waiting 실행도 발송됨
- **수정**: staticData에 `ver_{t}_{iid}` 버전 카운터 도입
  - `Code: SQL 재생성`: 승인 시 ver +1, `_ver`을 데이터에 포함
  - `Code: 취소 준비`: 취소 시 ver +1
  - `Code: 취소 확인`: `d._ver !== currentVer`이면 발송 안 함
- **검증 대기**: ⑥⑦ 취소→재승인 후 19:00에 1번만 오는지 + 비비안 포함 확인

### 크루 테스트 DB 작업
- ✅ 코이(01038128772) iid_999 purchase INSERT (ID=9902) — 발송 직전 조회 테스트용
- ✅ 비비안(01099984696) iid_999 purchase INSERT (ID=9903) — 발송직전 조회 검증용 (승인 후 등록)

### 삽질 기록
- API PUT 후 webhook 등록 풀림 → **Unpublish → Publish 필수**
- n8n Code 노드에서 `fetch`, `require('axios')` 전부 차단됨 → HTTP 호출 불가
- staticData 방식이 API 호출 방식보다 안정적 (n8n 보안 제한 우회 불필요)
- n8n execution API: waiting 상태 실행은 일반 list에 안 나옴, 개별 ID로 조회해야 함
- DELETE API로 waiting 실행 삭제 가능 (stop은 안 됨)
- **cancel 플래그 방식 한계**: 재승인 시 플래그 삭제 → 이전 실행도 살아남 → 버전 카운터로 해결

---

## 4/14 세션 — Fix 1~3 테스트 + 크론 삽질

### 해결된 것
- ✅ **Test 1 (Fix 2): 발송직전 DB 조회** — 승인 시점 미신청자(0명) → 발송 시점 신청자 전환 → 카톡 발송 성공
  - 템플릿 #3 D-1, iid_999, eventdate=4/15 (오늘이 D-1), 크론 `0 35 4 * * *` (KST 17:35)
  - 에밀리 승인(17:37) → 신청자 전환 → 17:37 Wait 해제 → Postgres 재조회 → 1명 → 카톡 ✅
- ✅ **크론 타임존 재확인**: n8n 서버 = America/New_York (EDT, UTC-4). KST - 13 = EDT
- ✅ **크론 API 변경 가능 확인**: PUT + deactivate + activate. 이미 지난 시간은 당일 실행 안 됨
- ✅ **PRD 01-알림톡 업데이트**: 크론 API 규칙 정정 + 테스트 로그 추가

### 삽질 기록
- 크론 시간을 UTC로 계산해서 3번 실패 (EDT였음)
- 매분 크론(`0 * * * * *`)으로 메커니즘 정상 확인 후 EDT로 재계산해서 해결
- 백업(0413-v2)에서 복원했더니 이전 코드(취소 확인 등) 복원됨 → 취소 확인 버전 체크 비활성화해서 Test 1 진행
- execution 11021: Postgres에서 에밀리 나왔지만 발송 데이터에서 0건 (버전 체크 실패) → 취소 확인 비활성화로 우회
- execution 11027: 백업 복원 후 `Code: 취소 확인`에서 `_ver` undefined 에러 → 버전 체크 주석처리로 해결

---

## 4/18 세션 — 하네스 엔지니어링 골격 완성 + AAA 공유회 PPT 초안

### 완료
- ✅ **하네스 보강** (커밋 992fe89 푸시)
  - verifier / code-reviewer / session-retro 에이전트 신규
  - 자동 린터 6종 (lint-copy/memory/agent-refs/mask-secrets/backup-n8n/session-retro)
  - pre-commit hook 설치 (린터 강제 실행)
  - SSOT 일원화 (루트 `.claude/agents/` = SSOT)
  - `memory/feedback_harness_operation.md` 박제
- ✅ **AAA 공유회 발표 준비 시작**
  - 플랜: `/Users/mjhee/.claude/plans/delightful-brewing-mountain.md`
  - PPT 초안: `outputs/에밀리-AAA-공유회-20260428.pptx` (14장)
  - 빌드 스크립트: `outputs/aaa-deck/build.js`
  - Genspark/NotebookLM 프롬프트 준비

### 내일 할 것
- 🔥 PPT 수정 (고칠 거 많음 — 구체 피드백 대기)
- 🔲 발표 스크립트 (슬라이드별 말로 풀어쓸 문장 + 분 단위)
- 🔲 리허설

---

## 4/17 세션 — 카피 규칙 에이전트 통합

### 완료
- ✅ `memory/feedback_copy_rules.md` 규칙을 copywriter 에이전트 2개에 통합
  - `.claude/agents/copywriter.md` (루트)
  - `.claude/skills/sharing-crm-team/agents/copywriter.md` (스킬)
- ✅ 반영 내용:
  - SSOT 참조 명시 (feedback_copy_rules.md 먼저 읽기)
  - 🚨 카피 필수 규칙 블록 (혜택 구조 / 표현 / 할인쿠폰 / 가격 / 톤 / 매번 새로)
  - ⑤ 할인쿠폰 "쿠폰 자동 적용된 가격" 안내 필수 명시
  - 알림톡 Slack 레퍼런스 형식 (풀카피 + ✅ 혜택 리스트)
  - Round 2 알림톡 섹션 구체화 (스킬 에이전트)

### 진행 중 (사용자 직접)
- 🔲 알림톡 템플릿 수정

---

## 4/16 세션 — Test 2 성공 + 수정 미리보기 수정

### Test 2 (Fix 1): 승인 → 취소 → 재승인 중복방지 ✅
- **결과**: 카톡 1건만 정상 도착 (버전 카운터 동작 확인)
- **버그 수정**: `Code: 취소 확인` 노드의 템플릿 리터럴 이중 이스케이프 (`\`...\${}\``) → API PUT 시 발생
  - 원인: API로 jsCode 업데이트 시 백틱/달러사인이 이중 이스케이프됨 → JS 문법 에러 → 승인해도 발송 실패
  - 수정: python으로 정확한 코드 생성 후 PUT
- **테스트 환경**: iid_999, eventdate=4/17, 템플릿 ③ D-1, 크론 KST 10:08
- **실행 로그**: 11259(trigger) → 11260~11265(webhook, 전부 success)

### 수정 미리보기 수정 (이전 세션에서 수행)
- ✅ `Code: 수정 미리보기` case 2 (프로그램명), case 3 (D-1 SOLAPI 일치), case 4 (당일 SOLAPI 일치), case 7 (✅+하단 텍스트)
- ✅ `Code: 슬랙 메시지` case 7 (✅+하단 텍스트)

### 남은 테스트
- 🔲 **D-day 전체 테스트** (④⑤⑥⑦⑧ 동시) — 발송 시점 에러 미해결
  - 에러 원인 불명: API에서 에러 상세 안 나옴 → **n8n UI에서 에러 실행 확인 필요**
  - staticData PUT 덮어쓰기, Wait 중 deactivate 등 삽질 교훈 반영 완료
  - 단일 템플릿(⑤만) 테스트로 기본 발송 동작 먼저 확인 필요
- 🔲 **Test 3 (Fix 3)**: ⑦ 시작알림 `✅` 이모티콘 — 코드는 수정 완료, 카톡 수신 확인만 남음
- 테스트 통과 시 → 코드 확정 + n8n 백업 + 커밋 + 프로덕션 크론 복원

### 현재 n8n 상태 (4/16 11:30 기준)
- 크론: `0 25 22 * * *` (KST 11:25) — 테스트용
- testTemplates: [4, 5, 6, 7, 8]
- `Code: 취소 확인`: 이중 이스케이프 수정 완료, 버전 체크 활성화
- `Code: 발송 데이터` case 7: ✅ strip 수정 완료
- `Code: 슬랙 메시지` / `Code: 수정 미리보기` case 7: ✅ strip 수정 완료
- 자동승인: 활성화 (zoomUrl/benefits 있으면 ④⑥⑦ 모달 스킵)
- iid_999 eventdate: **4/16** (오늘 = D-day)
- 에밀리: **신청자** (p_cancel_amount=0)
- 제이: **미신청자** (purchase 없음)

---

## 알림톡 테스트 현황
- ✅ ① 오픈알림 — 모달+수정+예약발송 성공
- ✅ ② 오픈리마인드 — templateId+변수 수정, 미리보기 매칭
- ✅ ③ D-1 리마인드 — 줌링크+https:// 자동제거
- ✅ ④ 당일리마인드 — 자동발송 (staticData 줌링크 재사용)
- ✅ ⑤ 할인쿠폰 — 모달+발송 성공
- ✅ ⑥ 입장링크 — 모달+라이브혜택+줌링크+발송 성공
- ✅ ⑦ 시작알림 — 자동발송 (staticData ③줌링크+⑥라이브혜택)
- ✅ ⑧ 혜택안내 — 모달+노션링크(DB자동)+발송 성공, nm:false
- ✅ ⑨ VOD — Switch t=9 + SOLAPI 노드 + 변수매핑 + 슬랙 미리보기 완료

## 4/9 세션 (오후) — 수정 미리보기 버그 + 크루 테스트 세팅
### 버그 픽스
- ✅ `Code: 수정 미리보기`의 `cb` JSON에 `scheduledTime`, `vodDeadline` 추가 → 재수정 시 "미정"으로 리셋되던 버그 해결
- ✅ `f_time` block_id 충돌 수정 → 발송시간은 `f_scheduled`로 분리 (⑥ 공유회시간과 겹치던 문제)
- ✅ 발송시간 기본값 = 해당 템플릿의 `scheduledTime` (placeholder에 노출)
- ✅ 수정 완료 미리보기에 ⏰ 발송시간 + ✅ 링크 변경사항 요약 표시
- ✅ ⑥⑧⑨ `Code: 파싱` 자동승인 경로 추가 (staticData/cb.link 있으면 모달 스킵)
- ✅ ⑦ 자료집리스트가 `staticData.benefits` 자동 로드 + 편집 가능
- ✅ SOLAPI: 리마인드 노드 `#{url}` 변수 누락 수정 (③④ 문자 대체발송 원인)
- ✅ case 7/8 SOLAPI 템플릿 뒤바뀜 수정 (①시작알림/⑧혜택안내)
- ✅ rh/lh 기본값에서 `✅` 제거 (SOLAPI 템플릿에 이미 있어서 이중 표기)

## 4/9 세션 (오전) — ⑨ VOD 완성
- ✅ Switch: 템플릿 t=9 VOD발송 라우팅 추가
- ✅ SOLAPI: VOD발송 노드 신규 (templateId + #{이름},#{공유회명},#{날짜},#{채널},#{url})
- ✅ Code: 슬랙 메시지 case 9 미리보기 + numLabel/em
- ✅ Code: 수정 미리보기 case 8, 9 추가
- ✅ Code: 수정 모달 t=9 (공유회명+열람기한+열람방법+VOD링크)
- ✅ Code: 발송 데이터 case 8, 9 변수 매핑
- ✅ Code: 파싱 ⑨ VOD링크 staticData 저장
- ✅ https:// 자동 제거 — strip() 함수 전 v_url에 적용

### n8n 인프라 수정
- ✅ 크론 6자리 포맷 확인 (초 포함: `0 분 시 * * *`)
- ✅ n8n 서버 타임존 확인: **America/New_York (EDT, UTC-4)** — KST-13=EDT
- ✅ 크론 10:00 KST = `0 0 21 * * *` (21:00 EDT)
- ✅ Code 노드 전체 `.first()` → `.item` 수정 (변수 준비, 슬랙 메시지, 파싱, SQL 재생성, 발송 데이터)
- ✅ Code: 슬랙 메시지 Mode → "Run Once for Each Item" (UI에서 직접 변경)
- ✅ return 형식 수정: `return [{ json: {...} }]` → `return {...}` (Each Item 모드 호환)
- ✅ 승인 경고 워딩 추가: "⚠️ 승인 시 예약 발송이 확정됩니다"
- ✅ ② 오픈리마인드 동적 간격: 오픈~공유회 4일 이하→+1일, 5일 이상→+2일
- ✅ ① scheduledTime 15:00, ② scheduledTime 13:00

### 크루 테스트 준비
- ✅ iid_999 79번 공유회 데이터로 교체 (title, slug `ai-github`, notion 링크)
- ✅ iid_999 날짜 세팅: 오픈 4/10(금), 마감 4/12, 공유회 4/13(월)
- ✅ 크론 매분/특정시간 작동 확인 완료
- ✅ 크루 7명 번호/이메일 수집 완료:
  - **신청자 4명**: 에밀리 `01082948909` emily.selfishclub@gmail.com / 젬마 `01024551899` zemma.selffishclub@gmail.com / 다니 `01065271136` dani.selfishclub@gmail.com / 제이 `01049724705` jei.selfishclub@gmail.com
  - **미신청자 3명**: 비비안 `01099984696` bb.mktduo@gmail.com / 띵크 `01028547990` think.selfishclub@gmail.com / 코이 `01038128772` koi.selfishclub@gmail.com
- ⚠️ 번호 충돌 주의: `01082948909`(문주희), `01065271136`(송다은), `01028547990`(이예성)은 기존 member에 **다른 사람**으로 등록되어 있음 — 신규 INSERT로 우회 (DB 동일번호 중복 허용 확인: 비비안×2 사례)
- 🔲 크루 7명 member INSERT (신규 row)
- 🔲 purchase INSERT (신청자 4명 iid_999) + 기존 비비안테스트 정리
- 🔲 testMode 하드코딩 제거 → 프로덕션 SQL 경로로 전환
- 🔲 Slack 카피 레퍼런스 전달

## 크루 테스트 타임라인 (오픈 4/10, 공유회 4/13)
| 날짜 | 카톡 도착 | # | 알림톡 | 대상 |
|------|----------|---|--------|------|
| 4/10 (목) | 15:00 | ① 오픈알림 | 전체 7명 |
| 4/11 (금) | 13:00 | ② 오픈리마인드 | 미신청자 3명 |
| 4/12 (토) | 13:00 | ③ D-1 + ⑤ 할인쿠폰(D-day) | ③ 신청자 4명 / ⑤ 미신청자 3명 |
| 4/13 (일) | 14:00~22:00 | ④⑥⑦⑧ | 신청자 4명 |
| 4/16 (수) | 18:00 | ⑨ VOD | 신청자 4명 |

## 남은 작업
- 🔲 크루 테스트 완료 (D-day ④⑤⑥⑦⑧ 동시 발송 에러 해결)
- 🔲 ⑤~⑨ 슬랙 미리보기를 실제 SOLAPI 템플릿과 최종 검증
- 🔲 카카오모먼트 API 전환
- ✅ CRM 카피 규칙을 copywriter 에이전트에 통합 (2026-04-17)
- 🔲 CRM 카피 실제 재생성 (규칙 반영된 에이전트로 공유회별 카피 뽑기)
- 🔲 인스타 캐러셀 이미지 생성
- 🔲 testMode 해제 + 프로덕션 전환
- 🔲 Vercel + Claude API 서버리스 전환

## v2 로드맵
- 🔲 v2-A: 유저 여정 추적
- 🔲 v2-B: KPI 적응형 CRM
- 🔲 v2-C: 과거 인사이트 축적

## 주의사항
- testMode=true 유지 중 (testTemplates 현재 ①~⑨ 전체)
- n8n 서버 타임존: America/New_York (EDT, UTC-4) — KST = EDT + 13
- n8n 크론 6자리: `0 분 시(EDT) * * *`
- 크론 10:00 KST = `0 0 21 * * *`
- Code: 슬랙 메시지 Mode = "Run Once for Each Item" (UI에서만 변경 가능)
- SOLAPI 버튼 URL: ③⑨ = http://#{url}, ⑥⑦ = https://#{url}, ⑧ = https://#{url}
- 전체 v_url에서 https:// 자동 제거 (strip 함수)
- Slack MCP = 젬마 계정, 봇으로 보내려면 토큰 직접 호출
- ⑧ nm:false (노션링크 DB 자동), ⑨ nm:false (VOD링크 DB 자동)
- API PUT + deactivate + activate로 크론 변경 가능 (이미 지난 시간은 당일 실행 안 됨)

## n8n 백업
- scripts/n8n-backup-alimtalk-cron-20260402.json
- scripts/n8n-backup-alimtalk-cron-20260405.json
- scripts/n8n-backup-alimtalk-cron-20260409.json
- scripts/n8n-backup-alimtalk-cron-20260412.json (⑤ D-day 수정)
- scripts/n8n-backup-alimtalk-cron-20260413.json (취소 기능 + 발송직전 조회 + ⑤ 링크필드)
- scripts/n8n-backup-alimtalk-cron-20260414.json ← 최신 (Test 1 완료, 취소확인 버전체크 활성화)
- scripts/n8n-backup-kaplus-friendtalk-20260411.json (카플친 승인 로직)
- scripts/n8n-backup-crm-trigger-20260402.json

## 카피 규칙 (memory/feedback_copy_rules.md 참고)
- "라이브 이벤트 참여 시" (완주 아님)
- 할인쿠폰: "아래 링크에서 쿠폰 자동 적용된 가격으로 신청 가능" 안내 필수
- 90% 할인 등 할인율 표현 금지
- 알림톡 카피 레퍼런스: 풀카피 + 혜택 리스트 둘 다 포함
