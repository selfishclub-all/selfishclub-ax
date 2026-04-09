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

### BetterAuth + 카카오 로그인 셋업
**왜:** 카카오 비즈앱 심사에 시간이 걸리므로 로그인 인프라를 먼저 구축
**한 일:**
- BetterAuth + pg 패키지 설치 및 서버 설정 (`src/lib/auth.ts`)
- 카카오 OAuth 프로바이더 연결 (기존 카카오 앱 REST API 키 사용)
- Supabase Pooler 경유 DB 연결 (IPv4 호환 이슈 해결)
- BetterAuth 테이블 4개 생성 (user, session, account, verification) — 기존 테이블 무변경
- 카카오 로그인 UI 페이지 (`/login`) 구현
- Supabase 서버 클라이언트 설정 (`src/lib/supabase.ts`)

### [미결정] GitHub Public 전환 여부
**왜:** Vercel 무료 배포를 위해 레포를 Public으로 바꿔야 하는데, 결정이 필요
**배경:**
- selfishclub-ax가 Private → Vercel Hobby(무료)로 배포 불가
- Public으로 바꾸면 무료 배포 가능
- 코드가 공개되지만, API 키/비밀번호 등은 .env.local에 있어서 GitHub에 안 올라감 → 보안 이슈 없음
- 언제든 다시 Private으로 되돌릴 수 있음
- org admin 권한이 필요해서 젬마에게 요청해야 할 수 있음
**대안:** Vercel Pro(월 $20) 또는 Pro Trial(14일 무료)
