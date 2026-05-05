# AAA 발표 덱 v8 — Handoff

## 새 Claude 프로젝트에서 시작하기

1. 이 폴더(zip)를 새 Claude 프로젝트의 **Import** 버튼으로 통째로 업로드
2. `main.html` 열어서 시작 (= 원본 "AAA 발표 덱 v8.html" 이름만 영문화)
3. 아래 프롬프트를 첫 메시지로 붙여넣기

## 파일 구조

- `main.html` — 메인 (이거 열어서 시작)
- `deck-stage.js` — 슬라이드 셸 (web component, 1920×1080 자동 스케일링)
- `deck-styles.css` — 전역 스타일 + 디자인 토큰
- `slides-core.jsx` — Slide / Title / hl 등 공통 컴포넌트
- `slides-1-v8.jsx` ~ `slides-5-v8.jsx` — 30장 슬라이드 (S01~S30 분할)
- `assets/` — 메인 이미지 (emily, alimtalk, kakaoplus, Email, insta_main, n8n, slack-approval)
- `slack-approval.png` — S?? 에서 루트 경로로 참조됨 (그대로 둘 것)
- `alimtalk/1~9.png` — 알림톡 9개 템플릿 캡처

## Claude한테 줄 프롬프트

```
AAA 에밀리 발표 덱 v8을 이어서 작업해. 첨부 파일들 다 업로드된 상태야.

═══════════════════════════════
📁 파일 구조
═══════════════════════════════
- main.html ← 메인 (이거 열어서 시작)
- deck-stage.js ← <deck-stage> web component (1920x1080 자동 스케일링 + 키보드 ←/→)
- deck-styles.css ← 전역 스타일 + AAA 디자인 토큰
- slides-core.jsx ← Slide, Title, hl 등 공통 컴포넌트, window.S01~S30 export
- slides-1-v8.jsx ~ slides-5-v8.jsx ← 30장 슬라이드 (S01~S30 분할)
- assets/, alimtalk/ — 이미지
- slack-approval.png ← 루트 경로 참조됨 (assets/에도 동일 파일 있음)

═══════════════════════════════
🎨 디자인 시스템
═══════════════════════════════
- 캔버스: 1920×1080, 16:9
- 폰트: Pretendard (전 weight). 한국어 우선, 본문 -0.01em letter-spacing
- 컬러:
  - --paper #FAFAFA (밝은 배경)
  - --ink #0B0B0B (텍스트)
  - --accent / --yellow #FFD60A (AAA 노란색, 형광펜·강조)
  - --muted #6B6B6B (보조 텍스트)
- 하이라이트: <span className="hl"> ← 노란 형광펜 효과 (background gradient)
- 슬라이드 헤더: topLeft (섹션), topRight "EMILY · SELFISH CLUB · AAA"
- 톤: 캐주얼한 한국어, 친구한테 말하듯, 이모지 절제

═══════════════════════════════
🧱 슬라이드 작성 규칙
═══════════════════════════════
- 각 슬라이드는 window.S## = () => (...) 형태로 export
- <Slide theme="light|dark" topLeft="..." topRight="..." bodyStyle={{...}}> 사용
- 타이포: h-xl (72px+, 메인카피), h-lg (54px), kicker (small caps 라벨)
- 텍스트 최소 24px (1920×1080 기준)
- 슬라이드 라벨 [data-screen-label]은 1-indexed (deck-stage가 자동 부여)

═══════════════════════════════
⚠️ 주의사항
═══════════════════════════════
1. 슬라이드 추가/순서 변경 시 main.html의 need 배열도 업데이트
2. window.S## 이름 충돌 주의 (slides-1~5에 분산)
3. styles 객체 만들 때 const styles = {} 금지 → 컴포넌트별 unique name
4. 새 이미지는 assets/ 또는 alimtalk/에 넣고 상대경로로 참조
5. 카피 수정 요청 받으면 정확한 원문 찾아서 그 자리만 교체

═══════════════════════════════
🎯 시작
═══════════════════════════════
"main.html" 먼저 열어서 30장 다 정상 렌더되는지 확인하고, 어떤 작업할지 물어봐줘.
```
