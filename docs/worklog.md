# 셀피쉬클럽 v4.0 작업 로그

## 2026-04-05

### 프로젝트 초기 셋업
**왜:** Webflow 의존을 끊고 자체 플랫폼을 구축하기 위해
**한 일:**
- Next.js 16 + Tailwind v4 + TypeScript 프로젝트 생성
- CLAUDE.md, BRIEFING.md, DESIGN.md 문서 작성
- 어드민 대시보드 v1 구축 (진행률, 사이트맵, CRM 에이전트 현황)

## 2026-04-08

### 레포지토리 구조 정리
**왜:** 소스코드와 작업 로그를 체계적으로 관리하기 위해
**한 일:**
- selfishclub-ax 전용 레포로 소스코드 이관
- .gitignore에 Obsidian 파일 제외
- GitHub Actions로 aaa 레포 자동 동기화 설정

## 2026-04-09

### 레포지토리 구조 정리 및 자동 동기화 구축
**왜:** 소스코드와 작업 로그가 한 곳에서 체계적으로 관리되고, AAA 레포와 Obsidian에 자동으로 전파되는 구조가 필요해서
**한 일:**
- selfishclub-ax 전용 GitHub 레포 연결 및 전체 소스코드 push
- .gitignore 정리 (Obsidian 파일 제외)
- GitHub Actions 자동 동기화 설정 (selfishclub-ax → aaa 레포로 작업 로그 자동 복사)
- /worklog 스킬 수정 (주차 자동 계산, selfishclub-ax + Obsidian 두 곳 동시 기록)
- GitHub workflow 권한 설정 및 AAA_REPO_TOKEN 등록
