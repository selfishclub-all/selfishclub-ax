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
**결정:** Public으로 전환 완료

### Vercel 배포 + 홈페이지/어드민 레이아웃
**왜:** 로컬만으로는 한계가 있어서, 기본 레이아웃이라도 배포해두고 작업하기 위해
**한 일:**
- GitHub 레포 Public 전환 → Vercel Hobby(무료) 배포 성공
- 홈페이지 기본 레이아웃 구성 (Header, Hero, 프로그램 카드, 소개 섹션, Footer)
- 어드민 기본 레이아웃 구성 (사이드바 + 대시보드 껍데기)
- AX 대시보드 경로 변경 (/admin/dashboard → /dashboard)
- 배포 주소: selfishclub-ax.vercel.app

## 2026-04-11

### 홈페이지 리디자인 — Editorial Tech 컨셉
**왜:** 기존 홈페이지가 캐주얼하고 전문성이 부족해서, 셀피쉬클럽의 새 방향(실전적·진중한 실무자 커뮤니티)에 맞는 디자인으로 전환
**한 일:**
- 다크 헤더 + 풀스크린 히어로 + 패럴랙스 스크롤 구현
- 모션 애니메이션 시스템 구축 (FadeIn, StaggerChildren, CountUp, MagneticButton)
- 카피 톤 전환 — "냅-다 우당탕탕"에서 "실전에 장착하는 사람들"로
- 모바일 반응형 + 햄버거 메뉴

### 콘텐츠 마이그레이션 — 프로그램 목록 + 카테고리
**왜:** 기존 Webflow에 있던 82개 프로그램을 새 사이트에서 볼 수 있게 하기 위해
**한 일:**
- 공유회(/sharing), 챌린지·워크숍(/challenge), 커뮤니티 행사(/community) 3개 목록 페이지 생성
- 카테고리 15개를 5개로 통합 (AI 마케팅/콘텐츠/빌딩/비즈니스/커뮤니티)
- 지난 프로그램 그레이스케일 처리, 진행 중/종료 자동 분리
- Webflow CMS API로 콘텐츠 추출 파이프라인 구축
- 3개 샘플 상세 페이지 (ai-github, ai-bizvideo, ai-claude4) — 커리큘럼/대상/혜택/FAQ/공유자 정보 포함
- Supabase Storage 버킷 생성 + Webflow 이미지 마이그레이션
- 이미지 카드 디자인 (딤 + 타이틀 오버레이)
- 지난 프로그램 상세 페이지에 리뷰 상단 노출 (186개 후기 연동)

### 카카오 로그인 완성
**왜:** 비즈앱 인증이 완료되어, 그동안 블로커였던 카카오 로그인을 마무리하기 위해
**한 일:**
- Vercel 환경변수 추가 (DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET, KAKAO_CLIENT_SECRET)
- 카카오 개발자 콘솔에서 Web 도메인 등록 + REST API 키에 Redirect URI 등록
- 카카오 로그인 성공 확인 (BetterAuth user/account 테이블에 정상 저장)
- 로그인 후 리다이렉트 경로 변경 (/mypage → / 홈)

### 결제 구조 방향 확정
**왜:** 토스 직접 연동 vs 포트원 경유를 결정하고, 결제 전 선행 작업을 명확히 하기 위해
**한 일:**
- 포트원 경유로 결정 (기존 계약 활용)
- Firestore 제거 확정 — Next.js API Route가 대체, Supabase가 유일한 DB
- 결제 전 선행 과제 정리: 구매자 정보 수집(로그인 필수), 저장 실패 시 안전장치
- Supabase 유료 전환 시점 검토 사항 기록

### AX 대시보드 레이아웃 수정 + 전체 진행 상황 동기화
**왜:** 대시보드 탭이 사이드에 있어 클릭 영역이 안 보이는 문제 해결 + 지금까지 작업한 모든 내역을 대시보드에 반영
**한 일:**
- 1차/2차/3차 탭을 왼쪽 사이드에서 리스트 상단 가로 3열로 이동
- 비활성 탭도 보이도록 스타일 수정
- 누락된 완료 항목 추가 (홈 리디자인, Vercel 배포, 비즈앱 인증, 목록 페이지 등)
- 누락된 진행 중 항목 추가 (콘텐츠 마이그레이션, 상세 페이지 리뉴얼 등)
- 사이트맵에 /community 페이지 추가
