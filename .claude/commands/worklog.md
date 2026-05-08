---
name: worklog
description: 작업 로그를 selfishclub-ax(docs/worklog.md)와 Obsidian(selfishclub ax vault)에 동시 기록
---

# /worklog — 작업 로그 기록

현재 대화에서 수행한 작업을 **두 곳**에 기록하세요:

1. **selfishclub-ax 레포**: `docs/worklog.md` (push하면 GitHub Actions가 aaa에 자동 동기화)
2. **Obsidian (selfishclub ax vault)**: 주차별 폴더 안에 기록

## 주차 자동 계산

- Week 01 시작일: **2026-03-16 (월요일)**
- 매주 월요일에 주차가 넘어감
- 오늘 날짜 기준으로 계산: `(오늘 - 2026-03-16) / 7 + 1`
- 예: 2026-04-08 → (23일 / 7) + 1 = Week 04

## Obsidian 파일 경로

```
/Users/jeongeun/vivin-claude/selfishclub/selfishclub ax/Week_{XX}/Week_{XX}_worklog.md
```

`{XX}`는 위 계산으로 나온 주차 (zero-padded, 예: 04, 05, 12)

### 주차별 폴더 자동 생성

- 해당 주차 폴더(`Week_{XX}/`)가 없으면 **자동으로 생성**
- 파일(`Week_{XX}_worklog.md`)이 없으면 `# Week {XX} — 셀피쉬클럽 v4.0 작업 로그` 헤딩부터 시작

## 기록 포맷

```markdown
### {작업 제목 — 간결하게}
**왜:** {이 작업을 한 이유 — 어떤 문제를 해결하려 했는지}
**한 일:**
- {구체적으로 한 것 1}
- {구체적으로 한 것 2}
- ...
```

## 규칙

1. **docs/worklog.md**: 날짜 헤딩(`## YYYY-MM-DD`)이 오늘 날짜로 이미 있으면 그 아래에 추가. 없으면 새 날짜 헤딩을 먼저 추가.
2. **Obsidian 파일**: 맨 끝에 append. 파일이 없거나 비어있으면 헤딩부터 시작. 주차 폴더가 없으면 자동 생성.
3. **work log.md**: Obsidian vault 루트의 `work log.md`에도 동일 내용을 append (전체 로그 통합본)
4. 시간은 기록하지 않음
5. "왜"는 기술적 이유가 아니라 **프로젝트 관점의 동기**를 적을 것
6. "한 일"은 변경한 파일 나열이 아니라 **무엇이 달라졌는지** 중심으로
