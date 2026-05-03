# Handoff: AAA 발표 덱 (에밀리 · 셀피쉬클럽)

## Overview
2026.04.28(화) 20:30 AAA 공유회에서 에밀리(셀피쉬클럽 CRM PM)가 발표할 28장짜리 슬라이드 덱. 주제는 "6주 동안 AAA팀에서 Claude/Agent로 일한 방식"이고, 청중에게 **오늘 가져갈 수 있는 3가지**(AI랑 같이 기획하는 법 / 자동화 구조 설계 / 내 규칙을 AI가 읽게 만드는 법)를 전달하는 게 목표.

## About the Design Files
이 번들 안 파일들은 **HTML로 만들어진 디자인 레퍼런스**예요 — 의도한 룩과 행동을 보여주는 프로토타입이지, 그대로 프로덕션에 붙이는 코드가 아닙니다. 작업은 **이 HTML 디자인을 대상 코드베이스의 환경(React, Vue, 혹은 이미 쓰는 디자인 시스템 등)에 맞춰 재구성하는 것**. 환경이 아직 없다면, 프로젝트 성격에 가장 맞는 프레임워크를 골라서 구현.

실제 발표용 자산으로 쓸 때는 standalone 버전(`AAA 발표 덱 v7 (standalone).html`, 8MB)을 브라우저에서 바로 열면 돼요 — 오프라인 완전 동작.

## Fidelity
**High-fidelity (hifi)**. 1920×1080 기준 픽셀 단위 타이포·스페이싱·컬러까지 맞췄음. 재구현 시 수치/컬러 그대로 가져가세요.

## 덱 구조 (28장)

| # | 섹션 | 슬라이드 | 한 줄 |
|---|---|---|---|
| 01 | INTRO | Cover | "매일 아침, AI가 알림톡을 들고 옵니다." |
| 02 | INTRO · ABOUT | 에밀리 | 소개 + 태그 (#효율충 노란 pill) |
| 03 | INTRO · AAA | AAA 공유회 소개 | 지난 6주 뭘 했냐면 |
| 04 | CONTENTS | 목차 | 01 지난 여정 / 02 Step 1 / 03 Step 2 / 04 마무리 |
| 05 | TL;DR | 오늘 가져가실 수 있는 3가지 | AI랑 같이 기획 / 자동화 구조 설계 / 내 규칙 심기 |
| 06 | § 1 · 지난 여정 | 채널·메시지 hook | 알림톡·카플친·인스타·오카방·이메일 아이폰 프레임 5개 |
| 07–12 | § 1 · 지난 여정 | 4채널 운영 · 수동 작업의 병목 · 변화의 계기 | |
| 13–18 | § 2 · STEP 1 | 도구 셋 · 에이전트 구조 설계 · 하네스 정의 | |
| 19–23 | § 3 · STEP 2 | AI한테 내 맥락 심기 · CLAUDE.md 구조 · 승인 관문 | |
| 24 | § 4 · 유즈케이스 | 에이전트 8개 | director / copywriter / data-collector / dispatcher / verifier / scheduler / reporter / code-reviewer |
| 25 | § 4 · 유즈케이스 | 릴레이 구조 | 알림톡 ① 승인 → 에이전트가 ② 자동 세팅 |
| 26 | § 5 · IMPACT | 시간 절감 | 3h→5min / 2d→1h |
| 27 | § 6 · 팀 | 동료에게 받은 영향 | 비비안 · 다니 · 흐민 · 오웬 |
| 28 | OUTRO | Q&A | 내일부터 세 가지만 |

## Layout System

### Slide Frame
- **1920×1080 고정**, `<deck-stage>` 웹컴포넌트로 스케일 + 키보드 네비 + localStorage 위치 저장 + PPT 인쇄 지원
- 각 슬라이드 `<section>` (data-screen-label 자동 태깅)
- 테마 토큰: `theme="light"` (기본 흰) / `theme="dark"` (블랙) / `theme="yellow"`
- 상·하단에 메타 라벨(섹션, 발표자 정보) — 22px, 글자 위아래 여백 56px

### Typography (`deck-styles.css`)
- Display: `Pretendard Variable` (본문 한글), `Inter` (영문 메타), `JetBrains Mono` (코드·mono 라벨)
- Scale
  - `.h-hero` — 150~200px, weight 600~700, letter-spacing -0.04em
  - `.h-xl` — ~120px, weight 700
  - `.h-l` — 60~72px, weight 600
  - `.h-m` — 40~60px, weight 600~700
  - `.h-s` — 34px
  - body 22~32px

### Colors
```
--ink          #111111   // 본문·다크 BG
--ink-2        #333
--surface      #f5f5f5
--yellow       #FEE500   // 카카오 옐로우 (primary highlight)
--yellow-ink   #3C1E1E   // 옐로우 위 텍스트
--neutral-400  #999
--neutral-300  #bbb
--neutral-200  #e0e0e0
```

### Highlight rules (사용자 피드백 반영본)
- `.hl` (옐로우 배경 박스) — **한 슬라이드 안에 최대 1회**, 핵심어에만
- 어두운 배경에서는 `.hl` 대신 `.u-y` 언더라인 또는 `color: var(--yellow)`
- 고유명사(에밀리, 제품명 등)에는 하이라이트 쓰지 않음

### Font weight rules
- 기본은 600 (semi). 강조 1~2 단어만 700
- 500 이하는 "오늘 제 세션이 끝나면," 같은 kicker · 보조 라인용

## Screens / Views (주요 슬라이드 상세)

### S01 · Cover
- 배경: 흰색
- 메인 타이포: 150px, weight 600, line-height 1.12, letter-spacing -0.04em, 3줄:
  - "매일 아침," (600)
  - "AI가 **알림톡**을" (700, "알림톡"만 옐로우 배경 박스 padding 0 0.08em)
  - "들고 옵니다." (600)
- 하단 메타: 28px, `#a8a8a8`, "에밀리 · 셀피쉬클럽 CRM PM · AAA 공유회 · 2026.04.28"

### S02 · About
- 2컬럼 레이아웃 (flex gap 80)
- 왼쪽:
  - "에밀리." 180px weight 700 (마침표만 `--yellow`)
  - "셀피쉬클럽 CRM PM" / "인하우스 풀스택 마케터" (44px, weight 500, 두 번째는 #000)
  - 태그 pill 5개: `#퍼포먼스 #그로스 #ops #효율충(=yellow pill) #데이터자동화`
- 오른쪽: 480×580 라운드(24) 이미지 카드 (`assets/emily.png`, cover, 하단 왼쪽 "EMILY" 라벨)

### S05 · TL;DR
- 킥커: "오늘 제 세션이 끝나면,"
- H1: "**가져가실 수 있는 3가지**" (옐로우 하이라이트, 72px 이상)
- 리스트 3개 (borderTop 1px #e0e0e0, padding 36 0):
  - 01 — AI랑 같이 기획하는 법 (80px 숫자 400 #bbb / 60px 텍스트 700)
  - 02 — 자동화 구조 설계
  - 03 — 내 규칙을 AI가 읽게 만드는 법

### S06 · 채널·메시지 hook (아이폰 프레임 5개)
- 킥커 "근데 그 전에."
- 질문 "여러분은 어떤 **채널·메시지**를 통해 이 공유회에 오게 되셨나요?" (u-y 언더라인, 채널·메시지만 weight 700)
- **아이폰 mock-up 프레임** 5개 (280px 고정폭):
  - 프레임: `aspect-ratio 9/18`, `#1a1a1a` 베젤 2px, border-radius 36, padding 8
  - 노치: 80×20 `#000` 상단 중앙
  - 스크린: border-radius 28, 흰 배경
  - 이미지는 `object-fit: contain` (스샷 잘림 방지)
  - 라벨 위에 브랜드 배지:
    - 카카오: 노란 `K` (#FEE500 배경, #3C1E1E 글자)
    - 인스타: 그라데이션 (`#f09433 → #dc2743 → #bc1888`) 카메라 아이콘
    - 오카방: 하늘색 `#` (`#B2C7D9`)
    - Gmail: 흰 배지 + 빨강 `M` (`#EA4335`)

## Interactions & Behavior
- 키보드: ← → ↑ ↓ Space / PageUp·Down — deck-stage가 제공
- 슬라이드 인덱스 localStorage 저장 (새로고침 복원)
- speaker-notes가 필요하면 `<script type="application/json" id="speaker-notes">`로 추가 (현재 덱은 없음)
- 인쇄: Cmd/Ctrl+P → 1슬라이드/1페이지 자동

## Design Tokens
```css
/* colors */
--ink: #111;
--surface: #f5f5f5;
--yellow: #FEE500;
--yellow-ink: #3C1E1E;

/* typography */
--font-hero: 'Pretendard Variable', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* spacing */
slide padding: 72px 88px;
meta label height: 56px (top + bottom)
```

## Assets (project root `assets/`)
| 파일 | 어디에 쓰는지 | 출처 |
|---|---|---|
| `emily.png` | S02 프로필 카드 | 사용자 업로드 |
| `alimtalk.png` | S06 채널① | 사용자 업로드 |
| `kakaoplus.png` | S06 채널② | 사용자 업로드 |
| `insta_main.png` | S06 채널③ | 사용자 업로드 |
| `oka.png` | S06 채널④ | 사용자 업로드 |
| `Email.png` | S06 채널⑤ | 사용자 업로드 |
| `slack_modal.png`, `slack-approval*.png` | Step 1~2 섹션 | 사용자 업로드 |
| `pptx-image-2-1.png` | (참고) 원본 PPT에서 추출 | 원본 ppt |

## Files in this package
- `AAA 발표 덱 v7.html` — 엔트리 HTML (React + Babel + deck-stage)
- `AAA 발표 덱 v7 (standalone).html` — 오프라인 단일 HTML (8MB, 에셋 전부 인라인)
- `deck-styles.css` — 디자인 토큰 + 공통 컴포넌트 스타일
- `deck-stage.js` — 슬라이드 스케일·네비 웹컴포넌트
- `slides-core.jsx` — `<Slide>`, `<Frame>` 공통
- `slides-1.jsx` — S01–S06
- `slides-2.jsx` — S07–S12
- `slides-3.jsx` — S13–S18
- `slides-4.jsx` — S19–S23
- `slides-5.jsx` — S24–S28
- `assets/` — 이미지 (위 참조)

## 재구현 가이드
1. `deck-stage.js`는 웹컴포넌트라 React 안에 그냥 끼워도 되고, 쓰는 환경(Next.js 등)에서 슬라이드 컨테이너가 있으면 그걸 써도 됨. 1920×1080 고정 후 `transform: scale` 레터박싱이 핵심.
2. `deck-styles.css` 전체 그대로 쓰거나, 토큰만 따서 쓰는 디자인 시스템에 머지.
3. 각 슬라이드는 독립 컴포넌트로 잘라두면 섹션별로 재사용 쉬움.
4. 이미지 에셋 경로는 빌드 도구(Vite/Next) 규칙대로 임포트해서 `<img src={emily} />`로 연결.
