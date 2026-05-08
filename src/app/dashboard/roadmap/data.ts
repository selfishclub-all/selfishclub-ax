// AX 로드맵 — 비주얼 사이트맵 기반

export type PhaseNumber = 1 | 2 | 3 | 4 | 5;
export type NodeStatus = "done" | "in-progress" | "planned";

export interface Feature {
  name: string;
  done: boolean;
  phase: PhaseNumber;
}

export interface SitemapNode {
  id: string;
  path: string;
  name: string;
  phase: PhaseNumber;
  status: NodeStatus;
  isDynamic?: boolean;  // [slug] 동적 페이지
  agenticNote: string;
  features?: Feature[];  // 페이지 내 기능 (체크박스로 표시)
  children?: SitemapNode[];  // 하위 페이지 (별도 박스로 표시)
}

export const phaseStyle: Record<PhaseNumber, { bg: string; border: string; text: string; label: string }> = {
  1: { bg: "#a5f3fc", border: "#67e8f9", text: "#083344", label: "Phase 1 — 뼈대 + 핵심" },
  2: { bg: "#3b82f6", border: "#60a5fa", text: "#fff", label: "Phase 2 — 콘텐츠 + 확장" },
  3: { bg: "#1e1b4b", border: "#4338ca", text: "#c7d2fe", label: "Phase 3 — 론칭 + 완성" },
  4: { bg: "#a855f7", border: "#c084fc", text: "#fff", label: "Phase 4 — CRM (크루 작업)" },
  5: { bg: "#ec4899", border: "#f472b6", text: "#fff", label: "Phase 5 — AI 상담사 (크루 작업)" },
};

// ─── 홈페이지 사이트맵 (퍼블릭) ───

export const sitemapRoot: SitemapNode = {
  id: "home",
  path: "/",
  name: "홈페이지",
  phase: 1,
  status: "in-progress",
  agenticNote: "🤖 DESIGN.md 기반 Editorial Tech 레이아웃 + 모션. Phase 3에서 최종 완성.",
  features: [
    { name: "헤더/푸터 레이아웃", done: true, phase: 1 },
    { name: "히어로 섹션", done: true, phase: 1 },
    { name: "메인 메뉴 네비게이션 업데이트", done: false, phase: 1 },
    { name: "섹션별 콘텐츠 배치", done: false, phase: 2 },
    { name: "반응형 최적화", done: false, phase: 2 },
    { name: "최종 모션 + 퍼포먼스", done: false, phase: 3 },
  ],
  children: [
    // ── 1. Selfish Club ──
    {
      id: "selfishclub",
      path: "/selfishclub",
      name: "Selfish Club",
      phase: 2,
      status: "planned",
      agenticNote: "셀피쉬클럽 소개 + 프로젝트 허브. 이기적 프로그램/스폰지클럽/AI 크리에이티브를 한눈에 설명.",
      features: [
        { name: "조직 소개 (미션/비전)", done: false, phase: 1 },
        { name: "프로젝트 요약 (프로그램·스폰지·크리에이티브)", done: false, phase: 1 },
        { name: "🤖 AI 카피라이팅 — 소개 문구 자동 생성", done: false, phase: 3 },
      ],
      children: [
        { id: "selfishcrew", path: "/selfishcrew", name: "Selfish Crew", phase: 2, status: "planned", agenticNote: "🤖 크루 페이지 자동 생성. 👤 정보 수집은 사람.", features: [{ name: "크루 프로필 카드", done: false, phase: 1 }, { name: "SNS 링크 연동", done: false, phase: 2 }] },
        { id: "partners", path: "/partners", name: "파트너사", phase: 2, status: "planned", agenticNote: "🤖 로고 그리드 자동 생성.", features: [{ name: "로고 그리드 레이아웃", done: false, phase: 1 }] },
        { id: "press", path: "/press", name: "보도자료", phase: 2, status: "planned", agenticNote: "🧠 URL → 제목/날짜/매체/요약 자동 파싱.", features: [{ name: "URL 자동 파싱", done: false, phase: 2 }, { name: "매체별 필터", done: false, phase: 2 }] },
      ],
    },
    // ── 2. 이기적 프로그램 ──
    {
      id: "programs",
      path: "/programs",
      name: "이기적 프로그램",
      phase: 2,
      status: "in-progress",
      agenticNote: "허브 → 공유회/챌린지/워크숍 각각 별도 페이지로 진입.",
      features: [
        { name: "프로그램 유형 소개 (공유회/챌린지/워크숍 차이 설명)", done: false, phase: 1 },
        { name: "프로그램별 진입 CTA", done: false, phase: 1 },
        { name: "결제 webhook 처리", done: false, phase: 2 },
        { name: "[테스트] 포트원 결제 + webhook → DB 저장", done: false, phase: 2 },
        { name: "[테스트] 결제 금액 서버 사이드 검증", done: false, phase: 2 },
      ],
      children: [
        {
          id: "sharing",
          path: "/sharing",
          name: "이기적 공유회",
          phase: 2,
          status: "in-progress",
          agenticNote: "🤖 목록+카테고리 필터 자동 구현.",
          features: [{ name: "카테고리 필터", done: true, phase: 1 }, { name: "Webflow 콘텐츠 마이그레이션 (9/82)", done: false, phase: 1 }],
          children: [
            { id: "sharing-slug", path: "/sharing/[slug]", name: "공유회 상세", phase: 2, status: "in-progress", isDynamic: true, agenticNote: "🧠 커리큘럼·FAQ·리뷰 자동 파싱.", features: [{ name: "커리큘럼 섹션", done: true, phase: 1 }, { name: "FAQ 섹션", done: true, phase: 1 }, { name: "리뷰/후기", done: true, phase: 1 }, { name: "결제 버튼 (포트원)", done: true, phase: 1 }, { name: "VOD 구매 섹션 (해당 프로그램 영상)", done: false, phase: 2 }] },
            { id: "aaa", path: "/aaa", name: "AAA 공유회 (마감)", phase: 3, status: "done", agenticNote: "🤖 AX 스토리 + CTA. 마감 처리 완료.", features: [{ name: "AX 스토리 콘텐츠", done: true, phase: 1 }, { name: "신청 CTA", done: true, phase: 1 }, { name: "마감 상태 표시", done: true, phase: 1 }] },
          ],
        },
        {
          id: "challenge",
          path: "/challenge",
          name: "이기적 챌린지",
          phase: 2,
          status: "in-progress",
          agenticNote: "🤖 공유회와 동일 패턴 자동 생성.",
          features: [{ name: "카테고리 필터", done: true, phase: 1 }, { name: "콘텐츠 마이그레이션", done: false, phase: 1 }],
          children: [
            { id: "challenge-slug", path: "/challenge/[slug]", name: "챌린지 상세", phase: 2, status: "in-progress", isDynamic: true, agenticNote: "🧠 Webflow 파이프라인 공유.", features: [{ name: "커리큘럼 섹션", done: false, phase: 1 }, { name: "결제 버튼", done: true, phase: 1 }, { name: "VOD 구매 섹션 (해당 프로그램 영상)", done: false, phase: 2 }] },
          ],
        },
        {
          id: "workshop",
          path: "/workshop",
          name: "이기적 워크숍",
          phase: 2,
          status: "planned",
          agenticNote: "🤖 챌린지와 유사한 패턴 자동 생성.",
          features: [{ name: "워크숍 목록 + 필터", done: false, phase: 2 }, { name: "상세 페이지 템플릿", done: false, phase: 2 }, { name: "워크숍 상세 [slug]", done: false, phase: 2 }],
        },
        { id: "membership", path: "/membership", name: "이기적 멤버십 무료 가입", phase: 1, status: "planned", agenticNote: "배너를 통해 진입. 대메뉴 미노출.", features: [{ name: "혜택 소개 랜딩", done: false, phase: 2 }, { name: "가입 CTA 버튼", done: false, phase: 2 }] },
      ],
    },
    // ── 3. 스폰지클럽 ──
    {
      id: "spongeclub-menu",
      path: "/spongeclub",
      name: "스폰지클럽",
      phase: 3,
      status: "in-progress",
      agenticNote: "모집 마감 유지 + 1기 활동 중심 전환.",
      children: [
        { id: "spongeclub-landing", path: "/spongeclub", name: "모집 페이지 (마감)", phase: 3, status: "done", agenticNote: "🤖 랜딩+결제 완료. 마감 상태 노출.", features: [{ name: "랜딩 페이지", done: true, phase: 1 }, { name: "포트원 결제", done: true, phase: 1 }, { name: "마감 상태 표시", done: true, phase: 1 }] },
        { id: "spongeclub-activity", path: "/spongeclub/activity", name: "1기 활동 내용", phase: 3, status: "planned", agenticNote: "🤖 활동 기록/후기/갤러리.", features: [{ name: "활동 타임라인", done: false, phase: 3 }, { name: "후기/갤러리", done: false, phase: 3 }] },
      ],
    },
    // ── 4. AI Creative Team ──
    {
      id: "ai-creative",
      path: "/ai-creative",
      name: "AI Creative Team",
      phase: 2,
      status: "planned",
      agenticNote: "팀 소개 + 카테고리별 포트폴리오.",
      features: [
        { name: "팀 소개 섹션", done: false, phase: 3 },
        { name: "블로그 필터 연동 (AI 크리에이티브 태그)", done: false, phase: 3 },
        { name: "인스타그램 자동 크롤링", done: false, phase: 3 },
      ],
      children: [
        { id: "portfolio", path: "/portfolio", name: "영상 포트폴리오", phase: 2, status: "planned", agenticNote: "🤖 카테고리별 YouTube 임베드.", features: [{ name: "카테고리별 필터", done: false, phase: 3 }, { name: "YouTube 임베드 그리드", done: false, phase: 3 }, { name: "🤖 영상 요약 카드 자동 생성", done: false, phase: 3 }] },
      ],
    },
    // ── 5. Blog ──
    {
      id: "blog",
      path: "/blog",
      name: "Blog",
      phase: 2,
      status: "done",
      agenticNote: "🤖 Webflow 55개 마이그레이션 완료.",
      features: [
        { name: "블로그 목록", done: true, phase: 1 },
        { name: "카테고리/태그 필터 (Selfish Meet Up 태그 포함)", done: false, phase: 2 },
        { name: "검색 기능", done: false, phase: 2 },
        { name: "🤖 태그 자동 추천", done: false, phase: 3 },
        { name: "🤖 관련 글 자동 추천", done: false, phase: 3 },
        { name: "🤖 SEO 메타 자동 생성", done: false, phase: 3 },
      ],
      children: [
        { id: "blog-slug", path: "/blog/[slug]", name: "블로그 상세", phase: 2, status: "done", isDynamic: true, agenticNote: "🤖 마크다운 렌더링 + OG 태그.", features: [{ name: "마크다운 렌더링", done: true, phase: 1 }, { name: "OG 태그", done: true, phase: 1 }] },
      ],
    },
    // ── 6. 이벤트 ──
    {
      id: "event-menu",
      path: "/events",
      name: "이벤트",
      phase: 3,
      status: "in-progress",
      agenticNote: "프로모션/이벤트성 콘텐츠 허브.",
      children: [
        { id: "aitools", path: "/aitools", name: "추천 AI툴", phase: 2, status: "done", agenticNote: "🤖 OG 크롤링 자동 추출.", features: [{ name: "OG 크롤링 자동 입력", done: true, phase: 1 }, { name: "카드 그리드", done: true, phase: 1 }] },
        { id: "membership-event", path: "/membership", name: "이기적 멤버십 무료 가입", phase: 1, status: "planned", agenticNote: "이벤트 카테고리에도 노출.", features: [{ name: "혜택 소개", done: false, phase: 2 }, { name: "가입 CTA", done: false, phase: 2 }] },
      ],
    },
    // ── 7. My Page ──
    {
      id: "mypage",
      path: "/mypage",
      name: "My Page",
      phase: 1,
      status: "done",
      agenticNote: "🤖 useSession + API Route 자동 구현.",
      features: [
        { name: "카카오 로그인", done: true, phase: 1 },
        { name: "카카오싱크 심사 신청", done: false, phase: 2 },
        { name: "카카오싱크 연동 (전화번호/이름 수집)", done: false, phase: 2 },
        { name: "이메일 가입 (카카오 미보유 사용자)", done: false, phase: 1 },
        { name: "기존 회원 매핑 로직 (전화번호 기반)", done: false, phase: 2 },
        { name: "구매 내역 조회", done: true, phase: 1 },
        { name: "이벤트 참여 이력", done: true, phase: 1 },
        { name: "VOD 시청", done: true, phase: 1 },
        { name: "VOD 섹션 노출 강화", done: false, phase: 2 },
        { name: "VOD 구매 + 기간제 시청 (YouTube unlisted 임베드)", done: false, phase: 2 },
        { name: "VOD 플레이어 — YouTube 브랜딩/링크 숨김 (CSS 오버레이)", done: false, phase: 2 },
        { name: "VOD 시청 만료 자동 차단 (구매일 기준)", done: false, phase: 2 },
        { name: "Invalid Date / NaN원 버그 수정", done: false, phase: 1 },
        { name: "프로필 수정", done: false, phase: 2 },
        { name: "🤖 맞춤 프로그램 + VOD 추천", done: false, phase: 3 },
        { name: "🤖 월간 활동 요약 리포트", done: false, phase: 3 },
        { name: "[테스트] 카카오 로그인 + 회원 매핑 동작", done: false, phase: 2 },
        { name: "[테스트] 날짜/금액 정상 표시", done: false, phase: 1 },
        { name: "[테스트] BetterAuth 접근 제어 확인", done: false, phase: 2 },
      ],
    },
  ],
};

// ─── 운영 도구 사이트맵 (어드민/내부) ───

export const adminRoot: SitemapNode = {
  id: "admin",
  path: "/admin",
  name: "어드민",
  phase: 1,
  status: "in-progress",
  agenticNote: "🤖 v1→v2→v3 CRUD 패턴 확장.",
  features: [
    { name: "비밀번호 인증", done: true, phase: 1 },
    { name: "사이드바 네비게이션", done: true, phase: 1 },
    { name: "회원 관리 페이지", done: false, phase: 2 },
    { name: "결제 내역 페이지", done: false, phase: 2 },
    { name: "VOD 관리 — YouTube URL + 상품별 시청 기간 설정", done: false, phase: 2 },
    { name: "블로그 발행 기능 (v3)", done: false, phase: 2 },
    { name: "1차 피드백 반영", done: false, phase: 1 },
    { name: "🤖 대시보드 인사이트 — 주간 핵심 지표 자동 요약", done: false, phase: 3 },
    { name: "[테스트] 프로그램 등록 → 상세페이지 생성 E2E", done: false, phase: 2 },
  ],
  children: [
    { id: "admin-programs", path: "/admin/programs", name: "프로그램 관리", phase: 1, status: "done", agenticNote: "🤖 폼+API+Supabase 전체 자동.", features: [{ name: "프로그램 등록", done: true, phase: 1 }, { name: "프로그램 수정/삭제", done: false, phase: 2 }, { name: "정원 관리", done: true, phase: 1 }, { name: "🤖 프로그램 초안 자동 생성 (제목→커리큘럼/FAQ/혜택)", done: false, phase: 1 }] },
    { id: "admin-blog", path: "/admin/blog", name: "블로그 관리", phase: 2, status: "done", agenticNote: "🤖 에디터+업로드+미리보기.", features: [{ name: "마크다운 에디터", done: true, phase: 1 }, { name: "이미지 업로드", done: true, phase: 1 }, { name: "카테고리/태그 관리", done: false, phase: 2 }, { name: "🤖 블로그 초안 작성 보조 (주제→초안)", done: false, phase: 3 }] },
    { id: "admin-aitools", path: "/admin/aitools", name: "AI툴 관리", phase: 2, status: "done", agenticNote: "🤖 OG 크롤링 + CRUD.", features: [{ name: "OG 자동 크롤링", done: true, phase: 1 }, { name: "CRUD", done: true, phase: 1 }] },
    { id: "admin-crew", path: "/admin/crew", name: "크루 관리", phase: 3, status: "planned", agenticNote: "🤖 v2 패턴 복제 확장.", features: [{ name: "크루 프로필 CRUD", done: false, phase: 1 }, { name: "이미지 업로드", done: false, phase: 1 }] },
    { id: "admin-partners", path: "/admin/partners", name: "파트너사 관리", phase: 3, status: "planned", agenticNote: "🤖 로고 CRUD.", features: [{ name: "로고 CRUD", done: false, phase: 1 }] },
    { id: "admin-portfolio", path: "/admin/portfolio", name: "포트폴리오 관리", phase: 3, status: "planned", agenticNote: "🤖 영상 URL CRUD.", features: [{ name: "영상 URL CRUD", done: false, phase: 3 }] },
    { id: "admin-press", path: "/admin/press", name: "보도자료 관리", phase: 3, status: "planned", agenticNote: "🧠 URL 자동 파싱 + CRUD.", features: [{ name: "🤖 URL 자동 파싱 (제목/날짜/매체/요약)", done: false, phase: 2 }, { name: "CRUD", done: false, phase: 2 }] },
  ],
};

export const dashboardRoot: SitemapNode = {
  id: "dashboard",
  path: "/dashboard",
  name: "AX 대시보드",
  phase: 1,
  status: "done",
  agenticNote: "🤖 data.ts 업데이트 → 자동 반영.",
  features: [{ name: "전체 진행률", done: true, phase: 1 }, { name: "사이트맵 트리", done: true, phase: 1 }, { name: "Phase별 작업 현황", done: true, phase: 1 }, { name: "CRM 에이전트 현황", done: true, phase: 1 }],
  children: [
    { id: "roadmap", path: "/dashboard/roadmap", name: "로드맵", phase: 2, status: "in-progress", agenticNote: "🤖 이 페이지. 사이트맵 도식화.", features: [{ name: "비주얼 사이트맵", done: true, phase: 1 }, { name: "에이전틱 전략 표시", done: true, phase: 1 }, { name: "기능 체크리스트", done: true, phase: 1 }] },
  ],
};

export const securityRoot: SitemapNode = {
  id: "security",
  path: "",
  name: "보안 / SEO",
  phase: 3,
  status: "in-progress",
  agenticNote: "보안 점검 + SEO 최종 확인. 🤖 자동 검증 스크립트 활용.",
  features: [
    { name: "Vercel 환경변수 교체 (DB_URL)", done: false, phase: 2 },
    { name: "어드민 API 인증 추가", done: true, phase: 1 },
    { name: "Supabase service_role 키 재발급", done: true, phase: 1 },
    { name: "카카오 클라이언트 시크릿 재발급", done: true, phase: 1 },
    { name: "Vercel Activity Log 이상 여부 확인", done: false, phase: 2 },
    { name: "Google OAuth 미사용 앱 해제", done: false, phase: 2 },
    { name: "포트원 키 권한 최소화 확인", done: false, phase: 2 },
    { name: "Supabase RLS 정책 점검", done: false, phase: 2 },
    { name: "SEO 최종 점검", done: false, phase: 3 },
    { name: "URL 301 리다이렉트 처리", done: true, phase: 1 },
    { name: "[테스트] sitemap.xml / OG 태그 / robots.txt", done: false, phase: 3 },
    { name: "[테스트] 프론트에서 Supabase 직접 호출 없는지 확인", done: false, phase: 2 },
    { name: "[테스트] 301 리다이렉트 동작 확인", done: false, phase: 2 },
  ],
};

export const crmRoot: SitemapNode = {
  id: "crm",
  path: "CRM",
  name: "CRM / Emily",
  phase: 4,
  status: "in-progress",
  agenticNote: "⚡ n8n + 🧠 Claude API + 솔라피로 회원 생애주기 자동 관리. 다른 크루가 별도 작업 중 — 추후 머지 예정.",
  features: [
    { name: "알림톡 오픈 알림", done: false, phase: 4 },
    { name: "알림톡 라이브 알림", done: false, phase: 4 },
    { name: "알림톡 VOD 알림", done: false, phase: 4 },
    { name: "뉴스레터 구독 폼 (스티비)", done: false, phase: 4 },
    { name: "뉴스레터 자동 발송", done: false, phase: 4 },
    { name: "🤖 개인화 메시지 자동 생성 (세그먼트별)", done: false, phase: 4 },
    { name: "🤖 이탈 예측 + 재참여 메시지 초안", done: false, phase: 4 },
    { name: "🤖 뉴스레터 콘텐츠 자동 큐레이션", done: false, phase: 4 },
  ],
};

export const aiCounselorRoot: SitemapNode = {
  id: "ai-counselor",
  path: "AI 상담사",
  name: "AI 상담사",
  phase: 5,
  status: "planned",
  agenticNote: "🧠 Claude API 기반 웹사이트 내 AI 상담사. 다른 크루가 별도 작업 중 — 추후 머지 예정.",
  features: [
    { name: "상담 챗봇 UI (웹 위젯)", done: false, phase: 5 },
    { name: "프로그램 안내 / 추천 응답", done: false, phase: 5 },
    { name: "FAQ 자동 응답", done: false, phase: 5 },
    { name: "회원 맥락 연동 (로그인 사용자)", done: false, phase: 5 },
    { name: "상담 이력 저장 + 어드민 조회", done: false, phase: 5 },
  ],
};
