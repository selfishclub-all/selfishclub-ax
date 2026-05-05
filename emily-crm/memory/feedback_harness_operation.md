---
name: 하네스 운영 규칙
description: 저장/참조/검수/회고가 끊기지 않게 하는 메타 규칙. 모든 에이전트 필독.
type: feedback
priority: critical
---

# 하네스 운영 규칙 (메타)

**Why**: 이 프로젝트는 기억(파일) 중심 하네스. 저장만 하고 활성화 안 되는 패턴이 반복됨 (feedback 만들고 agent.md에 참조 안 걸기, 박제해놓고 MEMORY 인덱스 미반영 등). 이 규칙은 그 단절을 막는다.

**How to apply**: 모든 에이전트가 작업 종료 전 이 4가지를 체크.

## 1. 저장 ≠ 활성화

파일 만드는 건 절반. 다음도 같이 해야 끝.
- feedback 생성 → 해당 에이전트 md에 "이 파일 먼저 읽기" 명시
- PRD 생성/수정 → 관련 에이전트 md에 참조 추가
- 에이전트 md 생성 → CLAUDE.md 또는 SKILL.md에 호출 경로 명시

**체크**: "새로 만든 파일이 다음 세션에 자동으로 발화되는가?"

## 2. MEMORY.md 인덱스 동기화

`memory/feedback_*.md` / `memory/session_*.md` 새로 만들면 **반드시** `memory/MEMORY.md`에 1줄 추가.
- 한 줄 포맷: `- [제목](파일명) — 설명 (한줄, ~150자)`
- 순서: 관련 규칙끼리 인접 배치

**체크**: "새 메모 파일 있는데 MEMORY.md에 안 적혔나?"

## 3. 산출물은 verifier 경유

에밀리 승인/외부 발송 전에 verifier가 먼저 체크.
- 카피 → `verifier(copy)` + `scripts/lint-copy.py`
- 미디어(배너/UTM) → `verifier(media)`
- 데이터 → `verifier(data)`
- 코드/워크플로우 변경 → `code-reviewer`

**작성자 ≠ 검수자**. 쓴 에이전트가 자기 승인 금지.

**체크**: "이 산출물이 검수 레이어를 거쳤는가?"

## 4. 세션 종료 회고 필수

세션 끝낼 때 `session-retro` 에이전트 호출.
- `memory/progress.md` 오늘 섹션 추가
- 새 박제 규칙 → MEMORY 인덱스 반영
- 미완료는 "다음 세션 시작점" 명시
- 박제만 하고 활성화 안 된 항목 식별

**체크**: "다음 세션이 바로 이어받을 수 있는 상태인가?"

---

## 위반 사례 (실제 발생)

- 4/17: `feedback_copy_rules.md` 저장만 하고 copywriter 에이전트에 참조 연결 누락 → 사용자 "그거 된거아니였어?" 지적받고서야 연결
- 4/18: `prd/09-아티팩트.md` 추가했는데 관련 에이전트 md 참조 일부 누락 → 같은 세션에서 발견해 보정
- 다수: 새 feedback 파일 추가 후 MEMORY.md 업데이트 누락 → 인덱스 뒤처지면 로드 실패
