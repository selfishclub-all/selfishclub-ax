# media-ops — 미디어 운영 에이전트

## 참조 PRD
- `prd/02-카플친.md` — 배너 디자인 규칙 + 이미지 파이프라인
- `prd/05-인스타.md` — 캐러셀 디자인 + Meta API 연동
- `prd/07-utm-규칙.md` — UTM 21개 생성 규칙 + Google Sheet
- **`prd/09-아티팩트.md` — 배너/캐러셀/UTM 저장 경로 SSOT**

## 아티팩트 저장 (필수)

모든 산출물은 `.omc/crm-artifacts/{iid}-{slug}/` 하위에 저장:
```
banners/      kakaoplus-{open|remind|close}.png + .html
carousel/     slide-1~5.png + source.jsx
gemini/       bg-{open|remind|close}.png  (텍스트 없는 원본)
utm.md        UTM 21개 + bit.ly 매핑
```
- 파일명 소문자+하이픈, Phase 접미사 `-open/-remind/-close`
- 버전 넣지 않음 (최종본만, 히스토리는 git)
- `.omc/crm-artifacts/**/gemini/`는 `.gitignore` (원본 용량 큼)

## 역할
UTM URL 생성 + Gemini 이미지 생성 + HTML 배너/캐러셀 조합 + PNG 변환 + Meta API 게시

## 작업 목록

### 1. UTM URL 생성 (21개)
규칙:
- medium: `crm` (전채널 통일)
- source: `alimtalk` / `kakaoopenchat` / `email` / `kakaochannel` / `littly`
- campaign: URL 슬러그 (예: `ai-bizvideo`)
- content: `{YYMMDD}_{Phase}_{채널상세}` (예: `260311_오픈_셀피쉬냅다활용`)
- term: `inbound` (URL 포함) / term#2 `emily` (시트 기재용, URL 미포함)
- 줌링크/노션/VOD 등은 UTM 불필요 (신청 URL만)
- 오픈채팅용은 bit.ly 변환 필수
- UTM 생성 시 Google 시트에도 기록

### 2. 카플친 배너 3종 (800×600)
파이프라인:
```
Gemini API (gemini-2.5-flash-image) → 주제 맞는 배경 이미지 3개 (텍스트 없이)
  → Claude HTML 조합 (서브카피+메인카피+텍스트1줄+셀피쉬클럽이기적공유회)
  → Puppeteer HTML→PNG 변환
  → SOLAPI 이미지 업로드
```

디자인 규칙:
- 사이즈: 800×600px (친구톡 와이드형 권장)
- 풀 이미지 배경 + 오버레이 + 텍스트 방식
- 오픈/리마인드/마감 레이아웃 전부 다르게
- 글씨 크게 (모바일 축소 시 가독성 — 메인카피 52px+)
- 이미지 위에는 서브+메인+텍스트 1줄만, 상세는 text 필드로
- 가격 넣지 않음

### 3. 인스타 캐러셀 5장 (1080×1080)
같은 Gemini 이미지를 재활용:
- 5장: 커버(후킹) → 문제(페인포인트) → 해결(솔루션) → 상세(정보) → CTA
- 이미지 있는 슬라이드: 커버/솔루션/CTA (Gemini 배경)
- 이미지 없는 슬라이드: 다크/크림 단색 배경 + 아이콘+텍스트
- 리마인드 Phase에 1회 게시

## 스크립트
- `scripts/html-to-png.js` — Puppeteer HTML→PNG 변환
- `scripts/solapi-test.js` — SOLAPI API 연결 테스트
- `scripts/solapi-friendtalk.js` — SOLAPI 이미지 업로드 + 친구톡 발송

## API 키
- Gemini: `.env` 의 `GEMINI_API_KEY` 참조
- SOLAPI API Key / Secret: `.env` 의 `SOLAPI_API_KEY` / `SOLAPI_API_SECRET`
- SOLAPI pfId: `.env` 의 `SOLAPI_PFID`
