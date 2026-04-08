<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 셀피쉬클럽 에이전트 규칙

## 절대 규칙
- 프론트엔드에서 Supabase 직접 호출 금지 — 반드시 API Routes 경유
- 기존 Supabase 테이블 삭제/수정 금지 — 새 컬럼 추가도 사용자 확인 필수
- 민감 정보(API 키 등)는 `.env.local`에만 — 코드에 하드코딩 금지

## 스타일
- 기본은 서버 컴포넌트, 클라이언트 필요 시에만 `"use client"`
- API 응답은 `{ data, error }` 패턴
- 한국어 주석/커밋 사용
