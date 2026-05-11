# Week 09 — 셀피쉬클럽 v4.0 작업 로그

## 2026-05-10 ~ 05-11

### 상세 페이지 제작 시스템 구축 — Claude 채팅 + 어드민 통합
**왜:** 상세 페이지를 매번 수동으로 카피+디자인하는 데 리소스가 너무 많이 들어서, Claude 채팅에서 HTML을 생성하고 어드민에서 등록/관리하는 시스템이 필요했음
**한 일:**
- Claude 채팅 프로젝트 파일 3종 작성 — 카피라이팅 가이드(후기 분석 포함), 디자인 가이드(섹션별 HTML 코드 샘플), 스킬(섹션별 대화형 인터뷰 → HTML 생성)
- 후기 DB 186건 분석 → 참여자 실제 표현, 가치 패턴, Before→After 패턴 추출
- 어드민 상세 페이지 등록 화면 개발 (`/admin/programs/detail`) — 블록 에디터, 이미지/GIF/영상 업로드+교체, 상단 공통 블록, 하단 FAQ/신청폼/이용약관, 새 프로그램 등록, 전체 미리보기
- FAQ 관리 페이지 (`/admin/faq`) — DB 기반 FAQ 풀 관리, 프로그램별 체크박스 선택
- 상세 페이지 렌더링 — `i_detail_html` 기반 렌더링 + Tailwind preflight 무효화 + 기존 DETAIL_DATA 폴백
- 신청폼 통합 (`ApplyForm.tsx`) — 무료/유료 모두 대응, spongeclub/aaa와 동일한 event+membership+n8n 플로우
- API 추가: `PUT /api/admin/programs`, `POST /api/admin/upload`, `/api/admin/faq` CRUD
- Supabase: item 테이블에 `i_detail_html`, `i_detail_faq`, `i_detail_top_blocks` 컬럼 추가, `faq_pool` 테이블 신규 생성
- `.env.local`에 `N8N_PURCHASE_WEBHOOK_URL` 추가

### 삽질과 배움

**Tailwind preflight가 인라인 스타일 HTML을 전부 깨뜨림**
Claude가 만든 HTML은 인라인 스타일로 되어있는데, Tailwind의 CSS 리셋이 h1/p/ul 등의 기본 margin/padding/font-size를 0으로 만들어서 정렬이 전부 무너졌음. `.detail-html-content` 클래스로 preflight를 선택적으로 무효화해서 해결.
→ **배움: 외부에서 가져온 인라인 스타일 HTML을 렌더링할 때는 Tailwind preflight 영향을 반드시 차단해야 함**

**블록 분리 시 wrapper div가 벗겨지면서 전역 스타일 소실**
Claude HTML의 최상위 `<div style="font-family:...; background:...">` wrapper가 블록 분리 과정에서 제거되면서 font-family, background 등이 사라짐. `blocksToHtml()`에서 저장 시 wrapper를 다시 감싸는 것으로 해결.
→ **배움: HTML 파서로 블록을 분리할 때 최상위 wrapper의 스타일 정보를 보존하는 로직이 필요**

**useRef로 파일 교체 대상 관리 시 값 유실**
이미지 "파일로 교체" 버튼 클릭 → 파일 선택 다이얼로그 열고 닫는 사이에 useRef 값이 유실되어 교체가 안 됨. useState로 전환하고 setTimeout으로 타이밍을 맞춰서 해결.
→ **배움: 파일 다이얼로그처럼 비동기 UI가 끼어드는 상황에서는 useRef보다 useState가 안전함**

**상단/하단 블록 구분 없이 렌더링해서 신청폼이 히어로 위에 출력**
`i_detail_top_blocks`에 상단 블록(멤버십, 공지)과 하단 블록(신청폼, 이용약관)이 같이 저장되는데, 렌더링 시 enabled인 것만 필터해서 상단에 전부 렌더링함. `bottomBlockIds` 배열로 하단 블록을 구분하는 필터 추가로 해결.
→ **배움: 같은 배열에 성격이 다른 블록을 섞어 저장할 때는 렌더링 위치를 구분하는 로직이 필수**
