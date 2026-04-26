// AX 대시보드 — 프로젝트 작업 현황 데이터
// 실제 작업 진행에 따라 이 파일만 업데이트하면 대시보드에 반영됨

export type TaskStatus = "done" | "in-progress" | "todo" | "blocked";
export type PageStatus = "done" | "in-progress" | "not-started";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  phase: 1 | 2 | 3;
  category: "setup" | "auth" | "payment" | "crm" | "admin" | "content" | "seo" | "design" | "dashboard" | "test";
  page?: string; // 사이트맵 페이지 경로 (해당하는 경우)
}

export interface PhaseInfo {
  phase: number;
  title: string;
  description: string;
  tasks: Task[];
}

export interface SitemapPage {
  path: string;
  name: string;
  auth: "none" | "user" | "admin";
  status: PageStatus;
  phase: 1 | 2 | 3;
  children?: SitemapPage[];
}

export interface CrmAgent {
  id: string;
  name: string;
  description: string;
  status: "active" | "ready" | "not-started";
  lastRun?: string;
}

// ─── 사이트맵 ───

export const sitemap: SitemapPage[] = [
  {
    path: "/",
    name: "홈",
    auth: "none",
    status: "in-progress",
    phase: 1,
  },
  {
    path: "/login",
    name: "로그인",
    auth: "none",
    status: "done",
    phase: 1,
  },
  {
    path: "/sharing",
    name: "이기적공유회",
    auth: "none",
    status: "in-progress",
    phase: 2,
    children: [
      { path: "/sharing/[slug]", name: "공유회 상세", auth: "none", status: "in-progress", phase: 2 },
      { path: "/sharing/aaa", name: "스폰지클럽 공유회 랜딩", auth: "none", status: "done", phase: 3 },
    ],
  },
  {
    path: "/spongeclub",
    name: "스폰지클럽 1기 랜딩 + 결제",
    auth: "none",
    status: "done",
    phase: 3,
  },
  {
    path: "/challenge",
    name: "이기적챌린지/워크숍",
    auth: "none",
    status: "in-progress",
    phase: 2,
    children: [
      { path: "/challenge/[slug]", name: "챌린지 상세", auth: "none", status: "in-progress", phase: 2 },
    ],
  },
  {
    path: "/community",
    name: "커뮤니티 행사",
    auth: "none",
    status: "done",
    phase: 2,
  },
  {
    path: "/selfishcrew",
    name: "셀피쉬크루",
    auth: "none",
    status: "not-started",
    phase: 2,
    children: [
      { path: "/selfishcrew/[slug]", name: "크루 프로필", auth: "none", status: "not-started", phase: 2 },
    ],
  },
  {
    path: "/aitools",
    name: "추천 AI툴",
    auth: "none",
    status: "done",
    phase: 2,
  },
  {
    path: "/blog",
    name: "팀 블로그",
    auth: "none",
    status: "done",
    phase: 2,
    children: [
      { path: "/blog/[slug]", name: "블로그 상세", auth: "none", status: "done", phase: 2 },
    ],
  },
  {
    path: "/portfolio",
    name: "영상 포트폴리오",
    auth: "none",
    status: "not-started",
    phase: 2,
  },
  {
    path: "/partners",
    name: "파트너사",
    auth: "none",
    status: "not-started",
    phase: 2,
  },
  {
    path: "/press",
    name: "보도자료",
    auth: "none",
    status: "not-started",
    phase: 2,
  },
  {
    path: "/membership",
    name: "멤버십 가입",
    auth: "none",
    status: "not-started",
    phase: 1,
  },
  {
    path: "/aaa",
    name: "AAA 랜딩",
    auth: "none",
    status: "not-started",
    phase: 3,
  },
  {
    path: "/mypage",
    name: "마이페이지",
    auth: "user",
    status: "done",
    phase: 1,
  },
  {
    path: "/events",
    name: "이벤트",
    auth: "none",
    status: "done",
    phase: 3,
  },
  {
    path: "/admin",
    name: "어드민",
    auth: "admin",
    status: "in-progress",
    phase: 1,
  },
  {
    path: "/dashboard",
    name: "AX 대시보드",
    auth: "none",
    status: "done",
    phase: 1,
  },
];

// ─── 작업 목록 ───

export const phases: PhaseInfo[] = [
  {
    phase: 1,
    title: "1차 — 껍데기 + 핵심 이슈",
    description: "대시보드, 디자인 시스템, 인증, 결제, CRM 자동화, 어드민 v1",
    tasks: [
      { id: "1-1", title: "AX 대시보드 v1", status: "done", phase: 1, category: "dashboard", page: "/dashboard" },
      { id: "1-2", title: "Design.md + 디자인 시스템 정의", status: "done", phase: 1, category: "design" },
      { id: "1-3", title: "Next.js 프로젝트 초기 셋업", status: "done", phase: 1, category: "setup" },
      { id: "1-4", title: "CLAUDE.md 코딩 컨벤션", status: "done", phase: 1, category: "setup" },
      { id: "1-5", title: "전체 페이지 레이아웃 쉘", status: "done", phase: 1, category: "design", page: "/" },
      { id: "1-5a", title: "홈페이지 리디자인 (Editorial Tech + 모션)", status: "done", phase: 1, category: "design", page: "/" },
      { id: "1-5b", title: "Vercel 배포 연결", status: "done", phase: 1, category: "setup" },
      { id: "1-6", title: "카카오 소셜 로그인 + BetterAuth", status: "done", phase: 1, category: "auth", page: "/login" },
      { id: "1-6a", title: "로그인 페이지 안내 문구 (매핑/전화번호 변경 안내)", status: "done", phase: 1, category: "auth", page: "/login" },
      { id: "1-6b", title: "카카오 비즈앱 인증 + Redirect URI 등록", status: "done", phase: 1, category: "auth", page: "/login" },
      { id: "1-6c", title: "카카오싱크 심사 신청 (개인정보 동의항목)", status: "in-progress", phase: 1, category: "auth", page: "/login" },
      { id: "1-T1a", title: "[테스트] 카카오 로그인 성공 확인", status: "done", phase: 1, category: "test", page: "/login" },
      { id: "1-T1b", title: "[테스트] 포트원 실결제 성공 확인", status: "done", phase: 1, category: "test", page: "/sharing" },
      { id: "1-7", title: "카카오싱크 연동 + 전화번호/이름 수집", status: "blocked", phase: 1, category: "auth", page: "/login" },
      { id: "1-7a", title: "기존 회원 매핑 로직", status: "blocked", phase: 1, category: "auth", page: "/mypage" },
      { id: "1-T1", title: "[테스트] 카카오 로그인 + 회원 매핑 정상 동작", status: "todo", phase: 1, category: "test", page: "/mypage" },
      { id: "1-8", title: "마이페이지 구현", status: "done", phase: 1, category: "setup", page: "/mypage" },
      { id: "1-9", title: "마이페이지 Invalid Date / NaN원 버그", status: "todo", phase: 1, category: "setup", page: "/mypage" },
      { id: "1-T2", title: "[테스트] 마이페이지 날짜/금액 정상 표시", status: "todo", phase: 1, category: "test", page: "/mypage" },
      { id: "1-10", title: "VOD 섹션 노출 강화", status: "todo", phase: 1, category: "setup", page: "/mypage" },
      { id: "1-11", title: "포트원 결제 재연동", status: "done", phase: 1, category: "payment", page: "/membership" },
      { id: "1-12", title: "결제 webhook 처리", status: "todo", phase: 1, category: "payment", page: "/api/webhook" },
      { id: "1-T3", title: "[테스트] 포트원 테스트 결제 + webhook → DB 저장 확인", status: "todo", phase: 1, category: "test", page: "/membership" },
      { id: "1-T4", title: "[테스트] 결제 금액 서버 사이드 검증 (위변조 차단)", status: "todo", phase: 1, category: "test", page: "/api/webhook" },
      { id: "1-13", title: "오픈 소식 알림톡", status: "todo", phase: 1, category: "crm", page: "/admin" },
      { id: "1-14", title: "라이브 시작 알림톡", status: "todo", phase: 1, category: "crm", page: "/admin" },
      { id: "1-15", title: "VOD 업데이트 알림톡", status: "todo", phase: 1, category: "crm", page: "/admin" },
      { id: "1-T5", title: "[테스트] 알림톡 3종 발송 + 솔라피 바이트 제한 확인", status: "todo", phase: 1, category: "test", page: "/admin" },
      { id: "1-16", title: "어드민 v1 — 프로그램 등록", status: "done", phase: 1, category: "admin", page: "/admin" },
      { id: "1-16a", title: "어드민 v1 — 프로그램 수정/삭제", status: "todo", phase: 1, category: "admin", page: "/admin" },
      { id: "1-17", title: "Claude API 상세페이지 자동 생성", status: "todo", phase: 1, category: "admin", page: "/admin" },
      { id: "1-18", title: "알림톡 문구 자동 생성 + 승인 발송", status: "todo", phase: 1, category: "admin", page: "/admin" },
      { id: "1-T6", title: "[테스트] 어드민 프로그램 등록 → 상세페이지 생성 E2E", status: "todo", phase: 1, category: "test", page: "/admin" },
    ],
  },
  {
    phase: 2,
    title: "2차 — 콘텐츠 채우기 + 누락 섹션",
    description: "콘텐츠 마이그레이션, 누락 페이지, 뉴스레터 폼, 어드민 v2",
    tasks: [
      { id: "2-0a", title: "공유회 목록 페이지 + 카테고리 필터", status: "done", phase: 2, category: "content", page: "/sharing" },
      { id: "2-0b", title: "챌린지/워크숍 목록 페이지 + 카테고리 필터", status: "done", phase: 2, category: "content", page: "/challenge" },
      { id: "2-0c", title: "커뮤니티 행사 목록 페이지", status: "done", phase: 2, category: "content", page: "/community" },
      { id: "2-0d", title: "카테고리 통합 (15개 → 5개)", status: "done", phase: 2, category: "content" },
      { id: "2-0e", title: "Supabase Storage 이미지 저장소 구축", status: "done", phase: 2, category: "setup" },
      { id: "2-0f", title: "상세 페이지 리뉴얼 (이미지 히어로 + 리뷰)", status: "in-progress", phase: 2, category: "content", page: "/sharing" },
      { id: "2-0g", title: "Webflow CMS API 콘텐츠 추출 파이프라인", status: "done", phase: 2, category: "content" },
      { id: "2-0h", title: "프로그램 썸네일 마이그레이션 (34개)", status: "done", phase: 2, category: "content" },
      { id: "2-1", title: "공유회 상세 콘텐츠 마이그레이션 (9/82개 완료)", status: "in-progress", phase: 2, category: "content", page: "/sharing" },
      { id: "2-2", title: "챌린지/워크숍 상세 콘텐츠 마이그레이션", status: "in-progress", phase: 2, category: "content", page: "/challenge" },
      { id: "2-3", title: "블로그 마이그레이션 (55개) + 어드민 CRUD", status: "done", phase: 2, category: "content", page: "/blog" },
      { id: "2-4", title: "URL 301 리다이렉트 처리", status: "done", phase: 2, category: "seo" },
      { id: "2-5", title: "셀피쉬크루 페이지", status: "todo", phase: 2, category: "content", page: "/selfishcrew" },
      { id: "2-6", title: "추천 AI툴 페이지 + 어드민 CRUD + OG 크롤링", status: "done", phase: 2, category: "content", page: "/aitools" },
      { id: "2-6a", title: "어드민 비밀번호 로그인", status: "done", phase: 2, category: "admin" },
      { id: "2-7", title: "파트너사 페이지", status: "todo", phase: 2, category: "content", page: "/partners" },
      { id: "2-8", title: "보도자료 페이지", status: "todo", phase: 2, category: "content", page: "/press" },
      { id: "2-9", title: "영상 포트폴리오 페이지", status: "todo", phase: 2, category: "content", page: "/portfolio" },
      { id: "2-10", title: "AAA 알림신청 페이지", status: "todo", phase: 2, category: "content", page: "/aaa" },
      { id: "2-11", title: "뉴스레터 폼 교체", status: "todo", phase: 2, category: "crm", page: "/" },
      { id: "2-T1", title: "[테스트] 뉴스레터 구독 → Supabase + 스티비 연동 확인", status: "todo", phase: 2, category: "test", page: "/" },
      { id: "2-T2", title: "[테스트] 301 리다이렉트 동작 확인 (/seminar, /events)", status: "todo", phase: 2, category: "test" },
      { id: "2-12", title: "어드민 v2 (VOD 링크 연결)", status: "todo", phase: 2, category: "admin", page: "/admin" },
      { id: "2-13", title: "1차 피드백 반영", status: "todo", phase: 2, category: "setup" },
    ],
  },
  {
    phase: 3,
    title: "3차 — AAA 론칭 + 완성도",
    description: "AAA 랜딩, 홈 최종, 어드민 v3, SEO",
    tasks: [
      { id: "3-1", title: "스폰지클럽 공유회 커스텀 랜딩 페이지", status: "done", phase: 3, category: "content", page: "/sharing/aaa" },
      { id: "3-1a", title: "스폰지클럽 신청 폼 + n8n 알림 연동", status: "done", phase: 3, category: "payment", page: "/sharing/aaa" },
      { id: "3-1d", title: "이벤트 페이지 신규 생성", status: "done", phase: 3, category: "content", page: "/events" },
      { id: "3-1e", title: "프로그램 카드 수 맞추기 (17+8개 등록)", status: "done", phase: 3, category: "content" },
      { id: "3-1b", title: "사이트 포인트 컬러 변경 + Pretendard 폰트", status: "done", phase: 3, category: "design" },
      { id: "3-1f", title: "Webflow → Vercel JS 리다이렉트 + UTM 캡처", status: "done", phase: 3, category: "setup" },
      { id: "3-1g", title: "슬러그 sponge-club → aaa 변경", status: "done", phase: 3, category: "setup" },
      { id: "3-1h", title: "스폰지클럽 1기 랜딩페이지 + 결제 (포트원)", status: "done", phase: 3, category: "payment", page: "/spongeclub" },
      { id: "3-1i", title: "스폰지클럽 v5.7 기획안 카피 반영", status: "done", phase: 3, category: "content", page: "/spongeclub" },
      { id: "3-1c", title: "커밍순 페이지 + 미들웨어 접근 제한", status: "done", phase: 3, category: "setup" },
      { id: "3-2", title: "홈 최종 완성", status: "todo", phase: 3, category: "design", page: "/" },
      { id: "3-3", title: "어드민 v3 — 크루/AI툴/파트너사 관리", status: "todo", phase: 3, category: "admin", page: "/admin" },
      { id: "3-4", title: "어드민 v3 — 보도자료 자동 파싱", status: "todo", phase: 3, category: "admin", page: "/admin" },
      { id: "3-5", title: "어드민 v3 — 블로그 발행", status: "todo", phase: 3, category: "admin", page: "/admin" },
      { id: "3-6", title: "어드민 v3 — 영상 포트폴리오 관리", status: "todo", phase: 3, category: "admin", page: "/admin" },
      { id: "3-7", title: "SEO 최종 점검", status: "todo", phase: 3, category: "seo" },
      { id: "3-T1", title: "[테스트] sitemap.xml / OG 태그 / robots.txt 검증", status: "todo", phase: 3, category: "test" },
      { id: "3-T2", title: "[테스트] 프론트에서 Supabase 직접 호출 없는지 최종 확인", status: "todo", phase: 3, category: "test" },
      { id: "3-T3", title: "[테스트] BetterAuth /mypage, /admin 접근 제어 확인", status: "todo", phase: 3, category: "test", page: "/mypage" },
      { id: "3-8", title: "인스타그램 피드 정상화", status: "todo", phase: 3, category: "content" },
      { id: "SEC-1", title: "🔴 [보안] Vercel 환경변수 교체 (AUTH/KAKAO/SUPABASE 완료, DB_URL 공유회 후)", status: "in-progress", phase: 3, category: "setup" },
      { id: "SEC-1a", title: "🔴 [보안] 어드민 API 인증 추가", status: "done", phase: 3, category: "setup" },
      { id: "SEC-2", title: "🔴 [보안] Vercel Activity Log 이상 여부 확인", status: "todo", phase: 3, category: "setup" },
      { id: "SEC-3", title: "🟡 [보안] Google OAuth 앱 점검 — 미사용 앱 해제", status: "todo", phase: 3, category: "auth" },
      { id: "SEC-4", title: "🟡 [보안] Supabase service_role 키 재발급", status: "done", phase: 3, category: "setup" },
      { id: "SEC-5", title: "🟡 [보안] 카카오 클라이언트 시크릿 재발급", status: "done", phase: 3, category: "auth" },
      { id: "SEC-6", title: "🔵 [보안] 포트원 키 권한 최소화 확인", status: "todo", phase: 3, category: "payment" },
      { id: "SEC-7", title: "🔵 [보안] Supabase RLS 정책 점검", status: "todo", phase: 3, category: "setup" },
    ],
  },
];

// ─── CRM 에이전트 ───

export const crmAgents: CrmAgent[] = [
  {
    id: "crm-1",
    name: "오픈 소식 알림톡",
    description: "프로그램 오픈 시 멤버십 전체 대상 발송",
    status: "not-started",
  },
  {
    id: "crm-2",
    name: "라이브 시작 알림톡",
    description: "행사 당일 참가자 대상 발송",
    status: "not-started",
  },
  {
    id: "crm-3",
    name: "VOD 업데이트 알림톡",
    description: "VOD 등록 시 해당 프로그램 참가자 발송",
    status: "not-started",
  },
  {
    id: "crm-4",
    name: "신청 완료 웹훅 (n8n)",
    description: "결제 완료 → Supabase 저장 → n8n 트리거",
    status: "not-started",
  },
  {
    id: "crm-5",
    name: "환불 요청 웹훅 (n8n)",
    description: "환불 요청 → n8n 트리거",
    status: "not-started",
  },
];

// ─── 헬퍼 함수 ───

export function getPhaseProgress(phase: PhaseInfo) {
  const done = phase.tasks.filter((t) => t.status === "done").length;
  return Math.round((done / phase.tasks.length) * 100);
}

export function getOverallStats() {
  const allTasks = phases.flatMap((p) => p.tasks);
  const done = allTasks.filter((t) => t.status === "done").length;
  const inProgress = allTasks.filter((t) => t.status === "in-progress").length;
  const todo = allTasks.filter((t) => t.status === "todo").length;
  const blocked = allTasks.filter((t) => t.status === "blocked").length;
  return { total: allTasks.length, done, inProgress, todo, blocked };
}

export function getTasksForPage(path: string) {
  return phases.flatMap((p) => p.tasks).filter((t) => t.page === path);
}

export function getSitemapStats() {
  const allPages = sitemap.flatMap((p) => [p, ...(p.children ?? [])]);
  const done = allPages.filter((p) => p.status === "done").length;
  const inProgress = allPages.filter((p) => p.status === "in-progress").length;
  const notStarted = allPages.filter((p) => p.status === "not-started").length;
  return { total: allPages.length, done, inProgress, notStarted };
}
