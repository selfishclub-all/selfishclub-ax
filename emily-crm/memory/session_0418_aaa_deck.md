---
name: 4/18 AAA 공유회 PPT 초안 + 하네스 보강
description: 에밀리 AAA 공유회 발표자료 14장 초안 생성 + 검수 레이어/자동 린터/SSOT 정리 완료. 내일 PPT 수정 이어감.
type: session
---

## 시점
2026-04-18 — 하네스 엔지니어링 골격 완성 + AAA 공유회 발표 준비 시작

## 이번 세션 한 일

### 하네스 엔지니어링 골격 (커밋 992fe89 푸시 완료)
- verifier / code-reviewer / session-retro 에이전트 신규
- 자동 린터 스크립트: lint-copy.py / lint-memory.py / lint-agent-refs.py / mask-secrets.py / backup-n8n.py / session-retro.py
- pre-commit hook 설치 (린터 강제 실행)
- SSOT 일원화 (루트 .claude/agents/ = SSOT, skills/는 스텁)
- 하네스 운영 규칙 박제 (feedback_harness_operation.md)
- PRD 09 신규 (아티팩트 저장 경로 SSOT)

### AAA 공유회 발표 준비
- 플랜 파일: `/Users/mjhee/.claude/plans/delightful-brewing-mountain.md` (최종 v4)
- 발표 제목: **"매일 아침, AI가 알림톡을 들고 옵니다"** / 부제: "오늘 이 카피로 오후 3시에 보낼까요?"
- 목차 4개 확정:
  1. 공유회 열릴 때마다 벌어지던 일
  2. AI한테 일 시키려면, 내 일부터 쪼개야 했어요
  3. AI가 일하되, 제가 승인만 하면 되는 구조
  4. 오늘 가져가실 2가지
- 가져갈 2가지:
  - ① AI한테 일 시키려면 내 일부터 쪼개야 한다
  - ② 규칙은 '저장'이 아니라 '읽히게' 만들어야 한다

### PPT 초안 생성 완료
- 파일: `outputs/에밀리-AAA-공유회-20260428.pptx` (14장, 295KB)
- 스크립트 위치: `outputs/aaa-deck/build.js`
- 디자인: 화이트 + rose-600(#E11D48) 포인트, Pretendard, 미니멀
- QA: 텍스트 콘텐츠 검수 완료 (14장 전부 정상)
- 시각 QA(PDF→이미지)는 LibreOffice 없어서 못 함

## 내일 할 것

### 최우선: PPT 수정
- 사용자가 PPT 열어보고 **고칠 거 많다**고 함 (구체 피드백 미정)
- 예상 수정 포인트:
  - 텍스트 레이아웃/정렬
  - 색상/폰트 조정
  - 슬라이드별 디테일 (아이콘/이미지 placeholder)
  - 실제 카톡 스크린샷 교체 (현재 placeholder)
  - 실제 슬랙 모달 스크린샷 교체 (현재 목업)
- 수정 방법:
  - `outputs/aaa-deck/build.js` 수정 → `node build.js`로 재생성
  - 또는 Canva로 import 후 직접 수정

### 이어서 할 것
- 발표 스크립트 (각 슬라이드별 말로 풀어쓸 문장 + 분 단위 타이밍)
- 리허설 (타이밍 + 용어 필터)

### 대체 옵션 준비됨
- Genspark 프롬프트 (이번 세션 마지막에 제공)
- NotebookLM 프롬프트 (이번 세션 마지막에 제공)

## 블로커
- 원래 알림톡 D-day 5개 동시 발송 테스트 3회 실패 원인 불명 (n8n UI에서 에러 실행 확인 필요)
- testMode 해제 + 프로덕션 전환 대기 중
- 공유회(4/28)까지 우선순위: PPT 완성 + 발표 리허설 > n8n 테스트

## 참조
- 플랜: `/Users/mjhee/.claude/plans/delightful-brewing-mountain.md`
- PPT 소스: `outputs/aaa-deck/build.js`
- PPT 출력: `outputs/에밀리-AAA-공유회-20260428.pptx`
- 공유회 상세: https://(공유회 상세페이지 URL)
