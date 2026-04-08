# CLAUDE.md — 셀피쉬클럽 v4.0

@AGENTS.md

## 프로젝트 개요

셀피쉬클럽(selfishclub.xyz) v4.0 리뉴얼. Webflow 의존을 끊고 Next.js 자체 플랫폼 구축.
상세 기획은 `BRIEFING.md` 참조.

## 기술 스택

- **프레임워크:** Next.js 16 (App Router) + TypeScript
- **스타일링:** Tailwind CSS v4
- **배포:** Vercel
- **DB:** Supabase PostgreSQL (기존 테이블 유지 필수)
- **인증:** BetterAuth + 카카오 소셜 로그인
- **결제:** 포트원
- **알림톡:** 솔라피
- **뉴스레터:** 스티비
- **자동화:** n8n
- **AI:** Claude API
- **이미지:** Cloudflare R2

## 아키텍처 원칙

1. **프론트엔드에서 Supabase 직접 호출 금지** — 반드시 Next.js API Routes(Route Handlers)를 경유
2. **기존 Supabase 테이블 절대 삭제/수정 금지** — 구조 변경 시 반드시 사용자 확인
3. **결제 금액은 반드시 서버 사이드 검증**
4. **모든 민감 정보(API 키 등)는 환경 변수로 관리** — `.env.local`에만 저장, 커밋 금지

## 디렉토리 구조

```
src/
├── app/                    # App Router 페이지 & 레이아웃
│   ├── (public)/           # 인증 불필요 페이지 그룹
│   ├── (auth)/             # 인증 필요 페이지 그룹 (mypage 등)
│   ├── admin/              # 어드민 페이지
│   └── api/                # Route Handlers (API 엔드포인트)
├── components/             # 재사용 UI 컴포넌트
│   ├── ui/                 # 기본 UI 요소 (Button, Input 등)
│   └── layout/             # 레이아웃 컴포넌트 (Header, Footer 등)
├── lib/                    # 유틸리티 & 외부 서비스 클라이언트
│   ├── supabase.ts         # Supabase 서버 클라이언트 (서버 사이드 전용)
│   ├── auth.ts             # BetterAuth 설정
│   └── portone.ts          # 포트원 설정
├── types/                  # TypeScript 타입 정의
└── constants/              # 상수 정의
```

## 코딩 컨벤션

- **언어:** TypeScript strict mode
- **컴포넌트:** 함수 컴포넌트 + named export
- **파일 네이밍:** 컴포넌트는 PascalCase (e.g., `Button.tsx`), 유틸은 camelCase (e.g., `formatDate.ts`)
- **서버/클라이언트 구분:** 클라이언트 컴포넌트에 `"use client"` 명시, 기본은 서버 컴포넌트
- **API 응답 형식:** `{ data, error }` 패턴 통일
- **날짜 처리:** `Date` 객체 사용, 포맷팅은 `Intl.DateTimeFormat` 활용

## URL 구조

| URL | 설명 |
|---|---|
| `/` | 홈 |
| `/sharing`, `/sharing/[slug]` | 이기적공유회 |
| `/challenge`, `/challenge/[slug]` | 이기적챌린지 |
| `/selfishcrew`, `/selfishcrew/[slug]` | 셀피쉬크루 |
| `/aitools` | 추천 AI툴 |
| `/blog`, `/blog/[slug]` | 팀 블로그 |
| `/portfolio` | 영상 포트폴리오 |
| `/partners` | 파트너사 |
| `/press` | 보도자료 |
| `/membership` | 멤버십 가입 |
| `/aaa` | AAA 랜딩 |
| `/mypage` | 마이페이지 (인증 필요) |
| `/admin/**` | 어드민 (별도 인증) |

## 커밋 메시지 컨벤션

```
<type>: <설명>

type: feat, fix, refactor, style, docs, chore, test
```

## 현재 진행 상황

### 완료
- [x] 프로젝트 초기 셋업 (Next.js 16, Tailwind v4, shadcn/ui)
- [x] CLAUDE.md, DESIGN.md, BRIEFING.md 문서 작성
- [x] 대시보드 v1 (`/admin/dashboard`) — 진행률, 사이트맵, CRM 에이전트 현황

### 다음 작업
- [ ] 카카오 소셜 로그인 + BetterAuth 설정
- [ ] 기존 회원 매핑 로직
- [ ] 전체 페이지 레이아웃 쉘 (Header, Footer)
- [ ] 마이페이지
- [ ] 포트원 결제 재연동

### 미결정 사항
- 배포 구조: `selfishclub-all/aaa` 레포에 합칠지 별도 레포 만들지 미정
- 카카오 비즈앱 인증 아직 안 됨 (전화번호 수집 필요)

## 주의사항

- 디자인은 `DESIGN.md` 참조, 전체 기획은 `BRIEFING.md` 참조
- 기존 Supabase 테이블 목록: member, membership, item, event, purchase, refund_request, reviews, newsletter_DB, newsletter_bot_config, test_membership, test_purchase
- BetterAuth 자동 생성 테이블: user, session, account
- 카카오 로그인 시 전화번호 기반 기존 회원 매핑 로직 필요
