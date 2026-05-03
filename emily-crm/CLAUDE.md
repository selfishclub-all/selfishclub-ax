# selfish_sharing — 셀피쉬클럽 공유회 CRM 자동화

## 프로젝트 목표
"CRM 시작해줘 {URL}" 한 마디로 공유회 CRM 전 과정을 에이전트 팀이 자동 처리.
URL 입력 → 데이터 수집 → 타임라인 생성 → 전채널 카피/에셋 생성 → Slack Phase별 전달(승인/수정/취소) → 발송.

## 상세 스펙 (PRD)
| 파일 | 내용 |
|------|------|
| `prd/00-overview.md` | **전체 A-Z 플로우 + Phase 구조 + 발송 아키텍처 + Slack 구조** |
| `prd/01-알림톡.md` | 템플릿 9종, SOLAPI ID, 변수 매핑, n8n 크론/모달 |
| `prd/02-카플친.md` | 배너 디자인, 이미지 파이프라인, 비주얼 콘텐츠 파이프라인 |
| `prd/03-오픈채팅.md` | 3방 규칙, 카피 톤, Phase별 소구 |
| `prd/04-이메일.md` | Stibee API (추후) |
| `prd/05-인스타.md` | 캐러셀 5장, Meta Graph API |
| `prd/06-온드미디어.md` | 리틀리/대화방소식/웰컴메시지/소식 |
| `prd/07-utm-규칙.md` | UTM 21개 + Google Sheet |
| `prd/08-database.md` | Supabase 테이블 스키마 + 쿼리 패턴 |
| `prd/09-아티팩트.md` | **아티팩트 저장 경로 SSOT** (`.omc/crm-artifacts/{iid}-{slug}/`) |

## 구조 원칙 (삼단구조)
- **스킬(SKILL.md)** = 업무 파이프라인 (트리거 → 실행 순서)
- **에이전트(.claude/agents/*.md)** = 재사용 가능한 역할 (여러 스킬에서 공유, **SSOT는 루트**)
- **PRD(prd/*.md)** = 규칙 원본 (SSOT). 에이전트가 참조

## 에이전트 맵

| 에이전트 | 역할 | 모델 |
|---|---|---|
| director | 전체 파이프라인 오케스트레이션 | opus |
| timeline-planner | 타임라인 생성 | sonnet |
| data-collector | URL 크롤 + DB 조회 | haiku |
| copywriter | 전채널 카피 (feedback_copy_rules 필독) | sonnet |
| media-ops | UTM + 배너 + 캐러셀 | sonnet |
| dispatcher | Slack 전달 + 승인 대기 | sonnet |
| **verifier** | 카피/미디어/데이터 검수 (lint-copy.py 실행) | sonnet |
| **code-reviewer** | n8n/스크립트/md 변경 검수 | sonnet |
| **session-retro** | 세션 종료 시 메모리 갱신 | sonnet |

## 하네스 운영 규칙 (필독)
**`memory/feedback_harness_operation.md`** — 모든 에이전트가 작업 종료 전 체크.
- 저장 ≠ 활성화 — feedback/PRD 만들면 에이전트 md에도 참조 연결
- MEMORY.md 인덱스 동기화 (새 feedback → 한 줄 추가)
- 산출물은 verifier 경유 (작성자 ≠ 검수자)
- 세션 종료 시 session-retro 호출

## Git 운영 규칙
**`memory/feedback_git_pull_behavior.md`** — "풀해줘" 기본 동작: 현재 브랜치를 풀, 세션 상태 파일 충돌 시 원격 우선 채택.

## 자동화 스크립트

| 스크립트 | 용도 | 호출 시점 |
|---|---|---|
| `scripts/lint-copy.py <file>` | 카피 금지어 감지 (90% 할인 등) | verifier가 자동 호출 / 커밋 전 |
| `scripts/lint-memory.py` | MEMORY.md 인덱스 정합 체크 | pre-commit hook |
| `scripts/lint-agent-refs.py` | feedback/prd 활성화 여부 | pre-commit hook |
| `scripts/mask-secrets.py <file>` | 전화번호/API 키 마스킹 | Slack/로그 노출 전 |
| `scripts/backup-n8n.py` | n8n 워크플로우 자동 백업 | 주 1회 cron 권장 |
| `scripts/session-retro.py` | 세션 스냅샷 + 메트릭 | 세션 종료 시 |
| `scripts/pre-commit.sh` | 린터 강제 실행 | git hook (설치됨) |

### 스킬
| 스킬 | 트리거 | 용도 |
|------|--------|------|
| `sharing-crm-team` | "CRM 시작해줘" | 공유회 CRM 전체 파이프라인 |
| `sharing-post-mortem` | "사후분석 해줘" | 공유회 사후 전환 분석 |

## 작업 범위
- 이 폴더(`selfish_sharing/`) 안에서 모든 작업 완결
- 상위 폴더(`selfish-ops/`) 기존 파일은 **참조만** — 수정 금지

## 안전 규칙 (절대 금지)
- Supabase 프로덕션 DDL/마이그레이션 직접 실행 금지 (SELECT만)
- n8n `셀피쉬DB_main_flow` 직접 수정 금지
- `main` 브랜치 직접 push 금지 (브랜치: `feat/sharing-crm-team`)
- `programs/` 기존 기획서 수정 금지
- `.claude/commands/alimtalk.md` 수정 금지

## 작업 습관
- **커밋**: 의미 있는 단위마다. `[영역] 내용` 형식
- **메모리 저장**: 결정/피드백은 즉시 `memory/`에 저장
- **변경 시 전체 반영**: PRD 수정 → 에이전트도 함께 업데이트
- **스킬 변경 전 확인**: 기존 스킬 수정 전 항상 사용자 확인

## 세션 루틴
| 시점 | 뭘 | 어디에 |
|------|-----|--------|
| 세션 종료 | 결정/피드백/진행상태 | `memory/` |
| 세션 종료 | 스펙 변경 | `prd/*.md` + `agents/*.md` |
| 구조 작업 후 | 정합성 체크 | `/ultraqa` |
| 작업 완료 후 | 완료 검증 | `/verification-before-completion` |

## 연동
- **Slack**: `#crm-알림톡-승인단계` (C0AN2NZ4L7L) — n8n 모달 / `#crm-카피` (C0AQYBFB7R8) — 카피 전달
- **Supabase**: `.env`에 URL+키. iid 형식: `"iid_79"` (문자열)
- **SOLAPI**: API Key `NCST_REDACTED_KEY`, PF ID `KA01PF_REDACTED_PFID`
- **n8n**: `.env`에 N8N_URL + N8N_API_KEY. 크론 워크플로우 `R2FCAquAvaDPTkWP`
- **봇**: `공유회-crm-bot` (B0AMWB9JRA7)

## 현재 진행 상태
→ **`memory/progress.md` 참조** (매 세션 업데이트)
→ 메모리 전체: `memory/MEMORY.md` (인덱스)
