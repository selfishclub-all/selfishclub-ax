"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import * as PortOne from "@portone/browser-sdk/v2";

/* ─── 타입 ─── */
interface ItemData {
  iid: string;
  i_title: string;
  i_title_userside: string | null;
  i_eventdate: string | null;
  i_full_schedule: string | null;
  i_price: number | null;
  i_paid_tf: boolean;
  i_event_count: number;
}

interface Props {
  item: ItemData;
  previewSuccess?: boolean;
}

/* ─── 컬러 팔레트 ─── */
const C = {
  cream: "#FAF5EE",
  text: "#2D2D2D",
  lime: "#D4E600",
  spongeYellow: "#FFE135",
  skyBlue: "#47C8E8",
  green: "#8BC34A",
  pink: "#FF7EB3",
  orange: "#FF9800",
  navy: "#1B1464",
  red: "#E53935",
} as const;

/* ─── 포트원 설정 ─── */
const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID!;
const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!;

/* ─── 애니메이션 헬퍼 ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 네비게이션 데이터 ─── */
const NAV_ITEMS = [
  { id: "pain-point", label: "문제" },
  { id: "answer", label: "해답" },
  { id: "proof", label: "검증" },
  { id: "curriculum", label: "커리큘럼" },
  { id: "leadership", label: "운영진" },
  { id: "after", label: "수료 후" },
  { id: "benefits", label: "1기 혜택" },
  { id: "target", label: "대상" },
  { id: "register", label: "신청" },
  { id: "faq", label: "FAQ" },
] as const;

/* ─── 데이터: 페인포인트 ─── */
const PAIN_CARDS = [
  {
    emoji: "😵‍💫",
    quote: "AI 툴 하나 배우면 또 새로운 게 나와요. 따라잡는 게 지치는데, 안 따라잡으면 불안하고.",
  },
  {
    emoji: "😔",
    quote: "유튜브 튜토리얼은 30분이면 끝나는데, 막상 내 업무에 적용하려면 일주일도 안 풀려요.",
  },
  {
    emoji: "😤",
    quote: "만들어놓고 나서 막상 내가 안 쓰게 돼요. 고객한테 보여주기엔 뭔가 부족하고.",
  },
];

/* ─── 데이터: 혼자 vs 커뮤니티 비교 ─── */
const COMPARE_ROWS = [
  { alone: "정보 과잉 → 뭘 해야 할지 모름", together: "검증된 커리큘럼으로 방향 설정" },
  { alone: "만들다 막히면 혼자 끙끙", together: "조장·동료가 즉시 피드백" },
  { alone: "\"이게 되나?\" 확신 없이 포기", together: "매주 공유하며 완주율 극대화" },
  { alone: "나만의 세계에 갇힘", together: "다양한 관점에서 인사이트 폭발" },
];

/* ─── 데이터: 타겟 페르소나 ─── */
const PERSONA_CARDS = [
  {
    title: "마케터·콘텐츠 담당자",
    desc: "이미 콘텐츠·광고·CRM 실무를 하고 있고, AI로 워크플로우를 다시 짜고 싶은 분. 반복 업무를 AI로 자동화하고 싶다. 콘텐츠 퀄리티를 근본부터 올리고 싶다.",
    color: C.skyBlue,
    icon: "💼",
    result: "실무에 바로 꽂히는 자동화·프로모션을 함께 만듭니다",
  },
  {
    title: "1인 대표·프리랜서",
    desc: "혼자 다 해야 하는 업무를, AI를 동료로 만들어 해소하고 싶은 분. AI를 실제 매출·수익화까지 연결하고 싶다. 내 사이드 프로젝트를 프로덕트로 만들고 싶다.",
    color: C.orange,
    icon: "🚀",
    result: "실제 고객 5명을 만나 반응을 받는 사이클까지 갑니다",
  },
  {
    title: "사이드 프로젝트 직장인",
    desc: "본업이 있으면서도 본인의 프로덕트를 만들고 싶은 분. 제한된 시간에서 최대 효율로 완성품을 만들고 싶다. 시작은 있었지만 끝을 보지 못한 경험이 있다.",
    color: C.green,
    icon: "🛠️",
    result: "완주 구조가 포기 지점을 넘게 해드립니다",
  },
];

/* ─── 데이터: 검증 팀 ─── */
const PROOF_TEAMS = [
  {
    name: "AI 헌터스",
    period: "2024.06~",
    desc: "1년간 200개 이상의 툴을 리뷰.\n비개발자들이 AI로 영상을 만들어 미국 시장에 진출해 판매. \"AI로 해외에 물건을 파는 것이 실제로 가능한가\"를 증명.",
    photo: "/images/spongeclub/team-aihunters.png",
  },
  {
    name: "AI 크리에이티브",
    period: "2024.09~",
    desc: "AI를 활용한 콘텐츠 제작 워크플로우를 실험하는 팀.\nAI 크리에이터의 가능성을 증명하고 젝시믹스와 공식 협업. AI 생성 콘텐츠가 실제 브랜드 협업으로 연결되는 사례.",
    photo: "",
  },
  {
    name: "AAA",
    period: "2025.02~",
    desc: "AI 에이전트 시대에 비개발자가 할 수 있는 역할을 마케터 페르소나로 탐구, 실제 서비스에 적용 및 런칭까지 6주간 AI 에이전트 풀사이클 빌딩.\n\n레포 구조 · 자동화 명령어 · 어드민 · 아카이브 시스템 · 이기적 공유 루틴 — 6주를 시스템으로 돌린 실물이 지금 공개되어 있습니다.\n\nAAA팀이 6주 만에 만든 실제 OS를 구경해보세요.",
    photo: "",
    hasLink: true,
  },
];

/* ─── 데이터: 내부 후기 ─── */
const VOICE_CARDS = [
  {
    name: "오웬",
    role: "핀테크 대표 → AI 빌더",
    quote:
      "3주 동안 혼자 방황했는데, 팀에서 공유하기 시작하니 4시간 만에 서비스를 런칭했어요. 혼자였으면 절대 불가능했습니다.",
  },
  {
    name: "비비안",
    role: "마케터 → AX PM",
    quote:
      "개발자 없이 DB 수집부터 결제 페이지까지 혼자 만들었어요. 매주 공유하면서 방향을 잃지 않은 게 컸습니다.",
  },
  {
    name: "에밀리",
    role: "CRM 담당",
    quote:
      "하루 3시간 걸리던 알림톡 발송이 5분으로 줄었어요. 팀원들의 피드백 덕에 '맥북 꺼지면 안 돼' 문제도 해결했습니다.",
  },
  {
    name: "흐민",
    role: "콘텐츠 크리에이터",
    quote:
      "AI한테 답을 구하다가 질문을 받기 시작했어요. 텔레그램에 한 줄 쓰면 3일 뒤 콘텐츠 초안이 되는 시스템을 만들었습니다.",
  },
];

/* ─── 데이터: 커리큘럼 ─── */
const CURRICULUM_WEEKS = [
  { week: "W1", date: "5/3 (일)", emoji: "🎬", title: "첫 만남 · 조 편성 · 작업 환경 세팅", desc: "조별 인사 + GitHub·Obsidian·Claude Code 세팅 + AI 인터뷰 세션 + AAA팀 OS 둘러보기. 약 1.5시간." },
  { week: "W2", date: "5/10 (일)", emoji: "🧩", title: "나만의 AI OS 만들기", desc: "스폰지클럽 OS 사례 공개 + 개인 OS 사례 3인 공유(다니·흐민·다다) + Claude 웹/Code에 OS 얹기" },
  { week: "W3", date: "5/17 (일)", emoji: "🎨", title: "AI를 내 의도대로 · 이미지도 내 손으로", desc: "OS 상호 피드백 + 오케스트레이션·하네스 + 이미지 생성 실습(나노바나나 2.0·덱테이커)" },
  { week: "W4", date: "5/24 (일)", emoji: "🎯", title: "유저가 쓸 프로덕트 만들기 시작", desc: "비비안·오웬 프로덕트 공유회 + 대상 유저·기획 근거·가치·초기 마케팅 정리 + 첫 버전 제작" },
  { week: "W5", date: "5/31 (일)", emoji: "🚀", title: "유저 프로덕트 고도화 + 프로모션", desc: "유저 프로덕트 고도화 + 젬마의 프로모션 방법론 + 에밀리의 CRM 사례" },
  { week: "W6", date: "6/7 (일)", emoji: "🏕️", title: "AI 시대의 커리어 — 오프라인 모임", desc: "7주 중 유일한 대면 모임. 젬마 오프닝 + 조별 크로스 토론 + 유저 반응 수집" },
  { week: "W7", date: "6/14 (일)", emoji: "🎉", title: "7주의 결과물, 세상에 꺼내기", desc: "최종 발표 + 7주 회고 + Obsidian 아카이브 게재 + 스폰지클럽 크루 전환 안내" },
];

/* ─── 데이터: 리더십 ─── */
const LEADER_GEMMA = {
  name: "젬마",
  role: "셀피쉬클럽 대표 · 스폰지 클럽 총괄",
  desc: "마케터·비개발자 170명의 페인포인트를 직접 듣고, AAA팀 6주 실험을 거쳐 스폰지 클럽을 설계했습니다. \"혼자 가면 빨리 가지만, 함께 가면 멀리 간다\"를 실천으로 증명합니다.",
};

const CREW_PAIRS = [
  { leader: "오웬", leaderRole: "플랫폼 빌더 · 월 1개 유저 프로덕트 런칭", sub: "다니", leaderPhoto: "/images/spongeclub/crew/오웬.png", subPhoto: "/images/spongeclub/crew/다니.png" },
  { leader: "비비안", leaderRole: "AX PM · 프로덕트 구조 설계", sub: "키니", leaderPhoto: "/images/spongeclub/crew/비비안.png", subPhoto: "" },
  { leader: "띵크", leaderRole: "워크플로우 아키텍트 · Vercel 자동배포", sub: "위시", leaderPhoto: "/images/spongeclub/crew/띵크.png", subPhoto: "" },
  { leader: "흐민", leaderRole: "AI 씽킹 파트너 · Sullivan 프로젝트", sub: "에밀리", leaderPhoto: "/images/spongeclub/crew/흐민.png", subPhoto: "/images/spongeclub/crew/에밀리.png" },
  { leader: "다다", leaderRole: "팀 리더 · 운영 OS 설계자", sub: "루리", leaderPhoto: "/images/spongeclub/crew/다다.png", subPhoto: "" },
];

/* ─── 데이터: 1기 혜택 ─── */
const BENEFIT_CARDS = [
  { emoji: "💰", title: "1기 한정 최저가", desc: "1차 55만 원 / 2차 65만 원" },
  { emoji: "🎓", title: "GitHub + Claude Code 워크숍 편집 VOD", desc: "40만 원 상당" },
  { emoji: "🤝", title: "5개 조 · 조당 8~10명의 빌딩 파트너", desc: "" },
  { emoji: "🔑", title: "스폰지 인터뷰 스킬 + 스폰지클럽 OS 풀 액세스", desc: "" },
  { emoji: "☕", title: "오픈 클로 셋업 데이", desc: "함께 모여 환경 세팅하는 자리" },
  { emoji: "📸", title: "Obsidian 아카이브 공식 사이트 게재", desc: "" },
  { emoji: "🏅", title: "수료 후 스폰지클럽 크루 전환", desc: "" },
  { emoji: "💬", title: "2026 내부 크루용 이기적 공유 세션 무료 참여", desc: "" },
];

/* ─── 데이터: FAQ ─── */
const FAQ_CATEGORIES = [
  {
    category: "대상 · 참여",
    items: [
      { q: "코딩을 전혀 몰라도 괜찮나요?", a: "네. 비개발자를 위해 설계됐습니다. AAA팀도 대부분 비개발자였어요." },
      { q: "⭐ 시간은 얼마나 드나요?", a: "매주 일요일 20:00~23:00 (W1은 1.5시간) + 주중 미션 수행 시간이 필요합니다. 7주 완주 프로그램이라 7주 동안 이 시간을 안정적으로 낼 수 있는 분만 신청해주세요." },
      { q: "⭐ 필요한 장비는요?", a: "노트북 + Claude Code Max ($100 권장) + Obsidian(무료) + GitHub 계정(무료). Max 플랜을 권장드리는 이유는, 7주 커리큘럼 동안 Claude Code를 실무 수준으로 돌리기에 가장 안정적인 구독이기 때문입니다." },
    ],
  },
  {
    category: "프로그램 운영",
    items: [
      { q: "어디서 소통하나요?", a: "7주 전 기간 슬랙으로 운영됩니다. 공지·미션 배포·조별 채널·이기적 공유 모두 슬랙 한 곳에서." },
      { q: "어떤 프로젝트를 만드나요?", a: "본인이 원하는 프로젝트를 직접 정합니다. 마케팅 자동화, CRM 대시보드, 콘텐츠 OS, 사이드 프로젝트 모두 가능. W1에서 방향을 잡습니다." },
      { q: "조 구성은 어떻게 되나요?", a: "총 5개 조, 조당 8~10명으로 운영됩니다. 조장과 부조장이 한 팀으로 조를 이끌어요." },
      { q: "⭐ 환경 세팅이 어렵게 느껴져요. 도움받을 수 있나요?", a: "네. 7주 안에 \"오픈 클로 셋업 데이\"가 별도로 열립니다. 함께 모여서 클로드 코드 환경을 같이 세팅하는 자리예요. 일정과 장소는 1기 슬랙에서 안내됩니다." },
      { q: "Claude Code가 어려우면요?", a: "Codex로 진행해도 괜찮습니다." },
    ],
  },
  {
    category: "신청 · 결제",
    items: [
      { q: "⭐ 환불 정책은요?", a: "프로그램 시작 전까지 100% 환불 가능. 시작 이후는 환불 불가." },
      { q: "7주 이후에도 활동이 이어지나요?", a: "네. 스폰지클럽 크루로 전환되어 AI 프로젝트 우선권과 2026 내부 크루용 이기적 공유 세션 무료 참여 권한을 갖습니다." },
    ],
  },
];

/* ═══════════════════════════════════════════════
   메인 컴포넌트
   ═══════════════════════════════════════════════ */
export function SpongeClubPaidLanding({ item, previewSuccess = false }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const spongeRotate = useTransform(scrollY, [0, 500], [0, 180]);
  const spongeScale = useTransform(scrollY, [0, 300], [1, 1.3]);
  const registerRef = useRef<HTMLElement>(null);
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  /* 결제 폼 상태 */
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formGoal, setFormGoal] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">(previewSuccess ? "success" : "idle");
  const [paymentError, setPaymentError] = useState("");

  /* FAQ 토글 */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* 스크롤 → 네비게이션 표시 & 플로팅 CTA */
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight ?? 800;
      setShowNav(scrollY > heroHeight);
      setShowFloatingCta(scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Intersection Observer → 활성 섹션 추적 */
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* register 섹션 가시성 체크 → 플로팅 CTA 숨김 */
  useEffect(() => {
    const el = registerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowFloatingCta(false);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* 스무스 스크롤 */
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* 결제 처리 */
  async function handlePayment() {
    if (!formName || !formPhone || !formEmail) {
      alert("이름, 전화번호, 이메일을 모두 입력해주세요.");
      return;
    }
    setShowConfirmModal(true);
  }

  async function confirmPayment() {
    setShowConfirmModal(false);
    setPaymentStatus("processing");

    const paymentId = `sponge-club_${Date.now()}`;

    try {
      const response = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName: "스폰지 클럽 1기",
        totalAmount: 550000,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        redirectUrl: `${window.location.origin}/spongeclub?paymentId=${paymentId}`,
        customer: {
          fullName: formName,
          phoneNumber: formPhone,
          email: formEmail,
        },
        customData: {
          goal_text: formGoal,
        },
      });

      if (!response || response.code) {
        if (response?.code === "FAILURE_TYPE_PG") {
          setPaymentStatus("idle");
          return;
        }
        setPaymentStatus("error");
        setPaymentError(response?.message ?? "결제 중 오류가 발생했습니다.");
        return;
      }

      // 결제 성공 → 서버 검증
      const res = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: response.paymentId,
          itemId: item.iid,
        }),
      });

      const result = await res.json();

      if (result.error) {
        setPaymentStatus("error");
        setPaymentError(result.error);
        return;
      }

      setPaymentStatus("success");
    } catch (err) {
      setPaymentStatus("error");
      setPaymentError("결제 처리 중 오류가 발생했습니다.");
    }
  }

  return (
    <div style={{ backgroundColor: "#F5F5F3", color: C.text }} className="min-h-screen font-[Pretendard] overflow-x-hidden">
      {/* ─── Sticky Section Navigation ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: showNav ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-black/5"
        style={{ backgroundColor: "rgba(245,245,243,0.9)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 mr-3">
            {NAV_ITEMS.map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSection === nav.id
                    ? "text-white"
                    : "text-gray-600 hover:bg-black/5"
                }`}
                style={activeSection === nav.id ? { backgroundColor: "#1a1a1a" } : {}}
              >
                {nav.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("register")}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-bold"
            style={{ backgroundColor: C.lime, color: C.text }}
          >
            신청하기
          </button>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 sm:py-32 lg:py-40 text-white overflow-hidden" style={{ background: "linear-gradient(180deg, #2EC4A5 0%, #1BA8C4 35%, #4A7BD4 70%, #7B5EA7 100%)" }}>
        <FadeUp delay={0.1}>
          <img
            src="/images/spongeclub/selfishclub-logo-white.png"
            alt="SELFISH CLUB"
            className="h-6 sm:h-8 lg:h-10 mx-auto mb-10"
          />
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-base sm:text-lg lg:text-xl font-bold tracking-wide mb-8 px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm inline-block">
            스폰지클럽 1기 모집 오픈!
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.2] max-w-5xl">
            딸깍, 한 번에 못 가는 그곳까지<br />함께 도착합니다
          </h1>
        </FadeUp>

        {/* KEY_OBJECT 영역 */}
        <div className="my-12 sm:my-16 lg:my-20 w-full flex items-center justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-white/20 text-xs">
            KEY_OBJECT
          </div>
        </div>

        <FadeUp delay={0.5}>
          <p className="max-w-xl mx-auto text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed mb-10">
            혼자 애쓰던 마케터·비개발자들이,<br />
            이기적으로 공유하며 진짜 내 것을 만드는 7주가 시작됩니다
          </p>
        </FadeUp>

        <FadeUp delay={0.7}>
          <button
            onClick={() => scrollTo("register")}
            className="px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform"
            style={{ backgroundColor: C.lime, color: "#1a1a1a" }}
          >
            지금 얼리버드 최저가로 신청하기
          </button>
        </FadeUp>
      </section>

      {/* ═══ PAIN POINT ═══ */}
      <section id="pain-point" className="relative py-16 lg:py-24 px-4 sm:px-6 overflow-hidden" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
        {/* 소셜 프루프 배경 이미지 */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ mask: "linear-gradient(to bottom, white 0%, white 30%, transparent 70%)", WebkitMask: "linear-gradient(to bottom, white 0%, white 30%, transparent 70%)" }}>
          <img src="/images/spongeclub/social-proof-bg.png" alt="" className="w-full h-auto" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14 leading-[1.4] sm:leading-[1.5]">
              약 4만 명을 대상으로<br />AI 프로그램을 운영하면서 알게된 것
            </h2>
          </FadeUp>

          {/* 85% */}
          <FadeUp delay={0.1}>
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white text-center mb-6">
              &ldquo;AI를 써봤지만<br />실무에 적용 못하고 있다&rdquo;
            </p>
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mx-auto mb-14">
              <motion.svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
                <motion.circle cx="60" cy="60" r="48" fill="none" stroke="#1BA8C4" strokeWidth="14" strokeLinecap="round" initial={{ strokeDasharray: "0 301.6" }} whileInView={{ strokeDasharray: "256.36 301.6" }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
              </motion.svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-black text-white">85%</span>
            </div>
          </FadeUp>

          {/* 68% */}
          <FadeUp delay={0.2}>
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white text-center mb-6">
              &ldquo;함께 배울 동료가 없다&rdquo;
            </p>
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mx-auto mb-8">
              <motion.svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
                <motion.circle cx="60" cy="60" r="48" fill="none" stroke="#D4E600" strokeWidth="14" strokeLinecap="round" initial={{ strokeDasharray: "0 301.6" }} whileInView={{ strokeDasharray: "205.09 301.6" }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
              </motion.svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-black text-white">68%</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-white/60 text-center mb-12">
              마케터·비즈니스 실무자 170명 설문 결과
            </p>
          </FadeUp>

          <div className="max-w-2xl mx-auto space-y-5 mb-12">
            {PAIN_CARDS.map((card, i) => {
              const isRight = i % 2 === 1;
              return (
                <FadeUp key={i} delay={0.3 + i * 0.1}>
                  <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
                    <div className="relative max-w-lg">
                      <div className={`bg-white/10 backdrop-blur-sm px-5 py-4 ${isRight ? "rounded-2xl rounded-br-none" : "rounded-2xl rounded-bl-none"}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl shrink-0">{card.emoji}</span>
                          <p className="text-sm sm:text-base leading-relaxed text-white/90">{card.quote}</p>
                        </div>
                      </div>
                      {/* 말풍선 꼬리 */}
                      {isRight ? (
                        <svg className="absolute -bottom-2 right-0" width="16" height="12" viewBox="0 0 16 12" fill="none">
                          <path d="M0 0H16L8 12L0 0Z" fill="rgba(255,255,255,0.1)" style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%)" }} />
                          <path d="M6 0L16 0L16 12Z" fill="rgba(255,255,255,0.1)" />
                        </svg>
                      ) : (
                        <svg className="absolute -bottom-2 left-0" width="16" height="12" viewBox="0 0 16 12" fill="none">
                          <path d="M0 0L10 0L0 12Z" fill="rgba(255,255,255,0.1)" />
                        </svg>
                      )}
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.6}>
            <p className="text-sm sm:text-base text-center mt-10 opacity-60 leading-relaxed">
              이 중 하나라도 내 얘기 같다면, 여기서 끝까지 읽어보세요.<br />
              이 페이지는 그 문제를 <strong>7주 안에 진짜로 통과해본 마케터·비개발자들</strong>이 만들었습니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ AGENTIC — 삭제됨 ═══ */}

      {/* ═══ ANSWER ═══ */}
      <section id="answer" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-6">
              AI, 혼자서는 어려운 게 맞습니다
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-center opacity-70 leading-relaxed mb-14 max-w-3xl mx-auto">
              기술은 너무 빠르게 움직입니다. 매일 새로운 모델과 에이전트, 워크플로우가 나옵니다.<br /><br />
              이걸 각자의 비즈니스에 맞게 다시 짜는 것은 더 어렵습니다. 콘텐츠, CRM, 광고, 데이터까지 영역마다 적용할 AI가 다른데, 혼자 디깅해서 내 것으로 만드는 일은 쉽지 않겠죠.
            </p>
          </FadeUp>

          {/* 질적 이점 4가지 대조 */}
          <FadeUp>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center py-3">
                <p className="text-sm sm:text-base font-bold opacity-70">혼자 공부할 때</p>
              </div>
              <div className="text-center py-3 rounded-xl" style={{ backgroundColor: "#1BA8C4" }}>
                <p className="text-sm sm:text-base font-bold text-white">스폰지클럽</p>
              </div>
            </div>
          </FadeUp>
          <div className="space-y-3 mb-14">
            {[
              { alone: "좁은 시야 — 내가 아는 AI 툴만 본다", together: "시야의 교차 — 서로 다른 업무 영역에서 쓰는 AI가 나에게 오픈된다" },
              { alone: "흐지부지되는 프로젝트 — 막히면 혼자 덮어버린다", together: "끝까지 가는 완주력 — 이미 그 지점을 통과한 동료가 길을 알려준다" },
              { alone: "내 안에서만 평가하는 결과물 — 쓸지 말지 혼자 결정한다", together: "유저 시점의 검증 — 다른 사람이 경험하며 반응을 준다" },
              { alone: "관념 속의 학습 — 아는 것 같은데 적용은 안 된다", together: "이기적 공유의 연쇄 — 내가 방출한 경험이 동료의 출발점이 되고, 동료의 돌파가 내 출발점이 된다" },
            ].map((row, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-xl p-4 sm:p-5">
                    <p className="text-sm sm:text-base opacity-70">{row.alone}</p>
                  </div>
                  <div className="rounded-xl p-4 sm:p-5 border-2" style={{ borderColor: "#1BA8C4", backgroundColor: "rgba(27,168,196,0.05)" }}>
                    <p className="text-sm sm:text-base font-medium">{row.together}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ PROOF + INSIDE VOICE (통합) ═══ */}
      <section id="proof" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14 leading-[1.4] sm:leading-[1.5]">
              지난 1년 3개팀을 양성하며<br />준비해왔습니다
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="text-sm sm:text-base opacity-70 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
              그동안 정말 많은 분들이 셀피쉬클럽의 &ldquo;AI 크루로 합류하고 싶다&rdquo;는 문의가 있었고, 드디어 스폰지클럽의 이름으로 문을 엽니다.
            </p>
          </FadeUp>

          {/* 3개 팀 — 1열 왼쪽 정렬, 타임라인 느낌 */}
          <div className="space-y-12 mb-14">
            {PROOF_TEAMS.map((team, i) => {
              const isAAA = i === 2;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="border-l-2 border-black/15 pl-6 sm:pl-8">
                    <p className="text-sm font-mono opacity-60 mb-2">{team.period}</p>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">{team.name}</h3>

                    {/* 이미지: Hunters/Creative는 작게, AAA는 크게 */}
                    {team.photo ? (
                      <div className={`rounded-xl overflow-hidden mb-4 ${isAAA ? "aspect-[16/7]" : "w-full sm:w-2/3 lg:w-1/2 aspect-[16/9]"}`}>
                        <img src={team.photo} alt={team.name} className="w-full h-full object-cover" />
                      </div>
                    ) : !isAAA ? null : (
                      <div className="aspect-[16/7] rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                        <span className="text-sm text-gray-300 font-mono">TEAM PHOTO</span>
                      </div>
                    )}

                    <p className={`leading-[1.8] whitespace-pre-line opacity-80 ${isAAA ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>{team.desc}</p>
                    {"hasLink" in team && team.hasLink && (
                      <a
                        href="https://aaa.selfishclub.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-5 px-6 py-3 rounded-full text-base font-bold hover:scale-105 transition-transform"
                        style={{ backgroundColor: "#1a1a1a", color: "white" }}
                      >
                        🔗 AAA팀 OS 사이트 구경하기 →
                      </a>
                    )}
                  </div>
                </FadeUp>
              );
            })}
          </div>


        </div>
      </section>

      {/* ═══ CURRICULUM ═══ */}
      <section id="curriculum" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#1BA8C4", color: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-3">
              7주 동안 무엇을 하나요?
            </h2>
            <p className="text-center text-sm sm:text-base lg:text-lg opacity-70 mb-4 leading-relaxed">
              매주 일요일 저녁 20:00 ~ 23:00 (3시간) 라이브 세션.<br />
              매주 미션이 하나씩 나갑니다. 주중에 각자 미션을 수행한 뒤, 다음 일요일 세션에서 조별 이기적 공유 → 전체 세션 순서로 진행돼요.<br />
              7주 전 기간은 슬랙으로 운영됩니다.
            </p>
          </FadeUp>

          {/* 주차별 타임라인 */}
          <div className="space-y-3 mt-10">
            {CURRICULUM_WEEKS.map((w, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex gap-4 items-start">
                  <div className="shrink-0 pt-0.5">
                    <p className="text-2xl">{w.emoji}</p>
                    <p className="text-sm font-black">{w.week}</p>
                    <p className="text-smopacity-70">{w.date}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{w.title}</h3>
                    <p className="text-sm sm:text-base opacity-60 mt-1">{w.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.6}>
            <p className="text-smopacity-70 text-center mt-6">
              W1만 약 1.5시간, 나머지는 3시간. 커리큘럼은 진행 상황에 따라 일부 변경될 수 있습니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section id="leadership" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14">
              누구랑 하는가
            </h2>
          </FadeUp>

          {/* 젬마 카드 (풀 width) */}
          <FadeUp delay={0.1}>
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src="/images/spongeclub/crew/젬마.png" alt="젬마" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold">{LEADER_GEMMA.name}</p>
                  <p className="text-sm sm:text-base opacity-60">{LEADER_GEMMA.role}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed opacity-80">
                {LEADER_GEMMA.desc}
              </p>
            </div>
          </FadeUp>

          {/* 운영진 — 젬마와 동일 위계 */}
          <div className="space-y-4">
            {[
              { name: "오웬", role: "플랫폼 빌더 · 월 1개 유저 프로덕트 런칭", photo: "/images/spongeclub/crew/오웬.png" },
              { name: "비비안", role: "AX PM · 프로덕트 구조 설계", photo: "/images/spongeclub/crew/비비안.png" },
              { name: "띵크", role: "워크플로우 아키텍트 · Vercel 자동배포", photo: "/images/spongeclub/crew/띵크.png" },
              { name: "흐민", role: "AI 씽킹 파트너 · Sullivan 프로젝트", photo: "/images/spongeclub/crew/흐민.png" },
              { name: "다다", role: "팀 리더 · 운영 OS 설계자", photo: "/images/spongeclub/crew/다다.png" },
              { name: "다니", role: "콘텐츠 · 마케팅", photo: "/images/spongeclub/crew/다니.png" },
              { name: "에밀리", role: "CRM · 멤버 릴레이션", photo: "/images/spongeclub/crew/에밀리.png" },
            ].map((crew, i) => (
              <FadeUp key={i} delay={0.25 + i * 0.05}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={crew.photo} alt={crew.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold">{crew.name}</p>
                      <p className="text-sm sm:text-base opacity-70">{crew.role}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 수료 후 ═══ */}
      <section id="after" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-4">
              7주가 끝나도 계속됩니다
            </h2>
            <p className="text-center text-sm sm:text-base opacity-60 mb-14">
              스폰지클럽 1기 수료생은 스폰지클럽 크루로 전환되어 활동을 이어갑니다.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "AI 프로젝트 참여 우선권", desc: "앞으로 열리는 스폰지클럽 AI 프로젝트에 가장 먼저 제안을 받습니다." },
              { title: "2026 이기적 공유 세션 무료 참여", desc: "셀피쉬클럽 내부 크루들만 참여하던 이기적 공유 세션을, 1기 수료생은 2026년 내내 무료로 참여할 수 있습니다." },
              { title: "Obsidian 아카이브 사이트 게재", desc: "7주 기록이 스폰지클럽 공식 사이트에 게재되어 포트폴리오 자산으로 남습니다." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  <h3 className="font-bold text-sm sm:text-base mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base opacity-60 leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-center mt-10 text-sm sm:text-base font-medium opacity-70">
              7주 동안 같이 걸은 사람들은, 7주 뒤에도 같이 걷습니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ 1기 특별함 ═══ */}
      <section id="benefits" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          {/* 중요 공지 박스 */}
          <FadeUp>
            <div
              className="rounded-2xl p-4 sm:p-6 mb-10 border-2"
              style={{ borderColor: C.red, backgroundColor: `${C.red}0A` }}
            >
              <p className="font-bold text-sm sm:text-base lg:text-lg" style={{ color: C.red }}>
                중요 안내
              </p>
              <p className="text-sm mt-2 leading-relaxed opacity-80">
                스폰지 클럽 1기는 외부에서 시작되는 첫 번째 기수입니다. 1기 이후의 프로그램 구성·기간·가격·혜택은 아직 확정되지 않았습니다.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14">
              1기만의 특별함
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFIT_CARDS.map((card, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.08}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  <span className="text-3xl mb-3 block">{card.emoji}</span>
                  <h3 className="font-bold text-sm sm:text-base mb-2">{card.title}</h3>
                  <p className="text-sm sm:text-base opacity-70">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TARGET ═══ */}
      <section id="target" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14">
              이런 분들과 함께 가고 싶습니다.
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5">
            {PERSONA_CARDS.map((card, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="flex flex-col items-center gap-4">
                  {/* 페르소나 카드 */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm w-full border-t-4" style={{ borderColor: card.color }}>
                    <span className="text-3xl mb-3 block">{card.icon}</span>
                    <h3 className="text-base sm:text-lg font-bold mb-3">{card.title}</h3>
                    <p className="text-sm sm:text-base leading-relaxed opacity-70">{card.desc}</p>
                  </div>
                  {/* 화살표 */}
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="shrink-0 opacity-60">
                    <path d="M10 0V20M10 20L3 13M10 20L17 13" stroke={card.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {/* 결과 카드 */}
                  <div className="rounded-2xl p-4 sm:p-5 w-full text-center border-2" style={{ borderColor: card.color, backgroundColor: `${card.color}10` }}>
                    <p className="text-sm sm:text-base font-bold">{card.result}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>


          <FadeUp delay={0.5}>
            <div className="mt-10 rounded-2xl p-5 sm:p-6 border-2 border-amber-400/50" style={{ backgroundColor: "rgba(255,193,7,0.05)" }}>
              <h3 className="font-bold text-base sm:text-lg mb-3">그리고 — 이 7주에 진짜 시간을 낼 수 있는 분</h3>
              <p className="text-sm sm:text-base opacity-70 leading-relaxed">
                스폰지클럽 1기는 가볍게 들르는 강의가 아닙니다. 매주 일요일 저녁 3시간 라이브, 주중 미션 수행, 조별 이기적 공유 — 이 리듬을 7주 동안 함께 굴려야 결과물이 쌓이는 구조예요.<br /><br />
                직장이 바쁜 시즌이거나, 7주 안에 출장·이사·중요한 개인 일정이 겹친다면 정말 솔직하게 한 번 더 생각해 봐주세요. 7주 동안 본인의 시간을 집중적으로 낼 수 있는 분들과 함께하고 싶습니다.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FINAL CTA + Payment ═══ */}
      <section
        id="register"
        ref={registerRef}
        className="py-16 lg:py-24 px-4 sm:px-6"
        style={{ backgroundColor: C.lime, color: C.text }}
      >
        <div className="max-w-3xl mx-auto">
          {paymentStatus === "success" ? (
            /* 결제 완료 화면 */
            <div className="py-16">
              <FadeUp>
                <div className="text-center mb-10">
                  <p className="text-6xl mb-6">🎉</p>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4">결제 완료!</h2>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                    스폰지클럽 1기 크루가 되신 것을 환영합니다
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 text-left" style={{ color: "#1a1a1a" }}>
                  <div className="flex items-start gap-3 mb-5">
                    <span className="text-2xl mt-0.5">💬</span>
                    <div>
                      <p className="text-base sm:text-lg font-bold mb-1">카카오톡으로 상세 안내를 보내드려요</p>
                      <p className="text-sm sm:text-base opacity-70">참여 방법, 슬랙 초대, 사전 준비사항 등을 안내해 드립니다.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-5">
                    <span className="text-2xl mt-0.5">⚠️</span>
                    <div>
                      <p className="text-base sm:text-lg font-bold mb-1">카카오톡 채널 추가는 필수입니다</p>
                      <p className="text-sm sm:text-base opacity-70">채널이 추가되어 있지 않으면 안내 알림톡을 받을 수 없어요.</p>
                    </div>
                  </div>
                  <a
                    href="http://pf.kakao.com/_dxmxixhG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-bold transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: "#FEE500", color: "#1a1a1a" }}
                  >
                    카카오톡 채널 추가하기
                  </a>
                </div>

                <div className="text-center space-y-3">
                  <p className="text-base sm:text-lg font-bold">
                    딸깍, 한 번에 못 가는 그곳까지 — 이제 함께 갑니다.
                  </p>
                  <p className="text-sm sm:text-base opacity-70">
                    궁금한 점은 카카오 채널로 문의해주세요.
                  </p>
                </div>
              </FadeUp>
            </div>
          ) : (
            <>
              <FadeUp>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-4 leading-snug">
                  딸깍 한 번으로는 갈 수 없는 곳까지, 함께
                </h2>
              </FadeUp>

              {/* 가격 구조 */}
              <FadeUp delay={0.1}>
                <div className="flex justify-center gap-4 my-10">
                  <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border-2 border-black/10">
                    <p className="text-smopacity-70 mb-1">1차 오픈 최저가</p>
                    <p className="text-3xl font-bold">55만 원</p>
                    <p className="text-smmt-1 opacity-60">4/28~30</p>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-4 sm:p-6 text-center opacity-70">
                    <p className="text-smopacity-70 mb-1">2차 오픈</p>
                    <p className="text-3xl font-bold">65만 원</p>
                    <p className="text-smmt-1">예정</p>
                  </div>
                </div>
              </FadeUp>

              {/* 1기 크루가 받는 것 */}
              <FadeUp delay={0.2}>
              <div className="bg-white rounded-2xl p-6 mb-10" style={{ color: "#1a1a1a" }}>
                <p className="text-sm font-bold mb-4">🎁 1기 크루가 받는 것</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-smfont-bold opacity-60 mb-2">7주 동안</p>
                    <ul className="space-y-1.5 text-sm opacity-80">
                      <li>✓ 7주 라이브 세션 (일 20:00~23:00)</li>
                      <li>✓ 슬랙 운영 · 조별 + 전체 채널</li>
                      <li>✓ GitHub + Claude Code 워크숍 VOD (40만 원 상당)</li>
                      <li>✓ 스폰지 인터뷰 스킬 + OS 풀 액세스</li>
                      <li>✓ 5개 조 · 조당 8~10명 빌딩 파트너</li>
                      <li>✓ ☕ 오픈 클로 셋업 데이</li>
                      <li>✓ W6 오프라인 모임 · W7 데모데이</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-smfont-bold opacity-60 mb-2">7주 이후</p>
                    <ul className="space-y-1.5 text-sm opacity-80">
                      <li>✓ 스폰지클럽 크루 전환</li>
                      <li>✓ AI 프로젝트 참여 우선권</li>
                      <li>✓ 2026 이기적 공유 세션 무료 참여</li>
                      <li>✓ Obsidian 아카이브 사이트 게재</li>
                    </ul>
                  </div>
                </div>
              </div>
              </FadeUp>

              {/* 결제 폼 */}
              <FadeUp delay={0.3}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                  <h3 className="text-base sm:text-lg font-bold mb-6">신청 정보</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm opacity-60 mb-1">이름 *</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="홍길동"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">전화번호 *</label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">이메일 *</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">7주 동안 만들고 싶은 것 (한 줄)</label>
                      <input
                        type="text"
                        value={formGoal}
                        onChange={(e) => setFormGoal(e.target.value)}
                        placeholder="예: 마케팅 자동화 대시보드"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                      />
                    </div>
                  </div>

                  {paymentStatus === "error" && (
                    <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">
                      {paymentError}
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={paymentStatus === "processing"}
                    className="w-full mt-6 py-4 rounded-full text-lg font-bold transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#1a1a1a", color: C.lime }}
                  >
                    {paymentStatus === "processing"
                      ? "결제 처리 중..."
                      : "1기 신청하기 · 55만 원"}
                  </button>
                </div>
              </FadeUp>

              {/* 마감 카피 */}
              <FadeUp delay={0.4}>
                <div className="text-center mt-10 space-y-3">
                  <p className="text-base sm:text-lg font-bold">
                    7주 동안 같이 걸은 사람들은, 7주 뒤에도 같이 걷습니다.
                  </p>
                  <p className="text-sm opacity-70">
                    함께 가야 갈 수 있는 곳이 있습니다.<br />이번엔 혼자가 아닙니다.
                  </p>
                  <p className="text-sm opacity-60">
                    🧽 스폰지클럽 1기에서 만나요.
                  </p>
                  <p className="text-smopacity-60 italic">
                    이 창은 한 번만 열립니다.
                  </p>
                </div>
              </FadeUp>
            </>
          )}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14">
              자주 묻는 질문
            </h2>
          </FadeUp>

          <div className="space-y-10">
            {FAQ_CATEGORIES.map((cat, ci) => {
              const offset = FAQ_CATEGORIES.slice(0, ci).reduce((sum, c) => sum + c.items.length, 0);
              return (
                <FadeUp key={ci} delay={ci * 0.1}>
                  <p className="text-sm sm:text-base font-bold opacity-60 uppercase tracking-wider mb-3">{cat.category}</p>
                  <div className="space-y-3">
                    {cat.items.map((faq, fi) => {
                      const idx = offset + fi;
                      return (
                        <div key={fi} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left"
                          >
                            <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                            <motion.span
                              animate={{ rotate: openFaq === idx ? 45 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="shrink-0 text-xl opacity-60"
                            >
                              +
                            </motion.span>
                          </button>
                          <motion.div
                            initial={false}
                            animate={{
                              height: openFaq === idx ? "auto" : 0,
                              opacity: openFaq === idx ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-4 text-sm leading-relaxed opacity-70">
                              {faq.a}
                            </p>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 확인 모달 ─── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowConfirmModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl"
            style={{ color: C.text }}
          >
            <h3 className="text-xl font-bold mb-4">신청 정보를 확인해주세요</h3>
            <div className="space-y-2 text-sm mb-6">
              <p><span className="opacity-70">이름:</span> {formName}</p>
              <p><span className="opacity-70">전화번호:</span> {formPhone}</p>
              <p><span className="opacity-70">이메일:</span> {formEmail}</p>
              {formGoal && <p><span className="opacity-70">목표:</span> {formGoal}</p>}
              <div className="border-t pt-3 mt-3">
                <p className="font-bold text-lg">결제 금액: <span style={{ color: C.red }}>550,000원</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
              >
                취소
              </button>
              <button
                onClick={confirmPayment}
                className="flex-1 py-3 rounded-xl text-sm font-bold transition hover:scale-[1.02]"
                style={{ backgroundColor: C.lime, color: C.text }}
              >
                결제하기
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Floating CTA ─── */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCta ? 0 : 100, opacity: showFloatingCta ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none"
      >
        <div
          className="max-w-lg mx-auto rounded-2xl p-3 flex items-center justify-between pointer-events-auto"
          style={{ backgroundColor: `${"#1a1a1a"}ee`, backdropFilter: "blur(12px)" }}
        >
          <div className="text-white text-sm pl-2">
            <p className="font-bold">스폰지 클럽 1기</p>
            <p className="text-smopacity-60">55만 원 · 7주 프로그램</p>
          </div>
          <button
            onClick={() => scrollTo("register")}
            className="px-5 py-2.5 rounded-full text-sm font-bold shrink-0 hover:scale-105 transition-transform"
            style={{ backgroundColor: C.lime, color: C.text }}
          >
            1기 신청하기
          </button>
        </div>
      </motion.div>

      {/* scrollbar-hide 스타일 */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
