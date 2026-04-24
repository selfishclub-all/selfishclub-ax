"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
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
  { id: "target", label: "대상" },
  { id: "proof", label: "검증" },
  { id: "curriculum", label: "커리큘럼" },
  { id: "leadership", label: "운영진" },
  { id: "benefits", label: "1기 혜택" },
  { id: "faq", label: "FAQ" },
  { id: "register", label: "신청" },
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
  },
  {
    title: "1인 대표·프리랜서",
    desc: "혼자 다 해야 하는 업무를, AI를 동료로 만들어 해소하고 싶은 분. AI를 실제 매출·수익화까지 연결하고 싶다. 내 사이드 프로젝트를 프로덕트로 만들고 싶다.",
    color: C.orange,
  },
  {
    title: "사이드 프로젝트 직장인",
    desc: "본업이 있으면서도 본인의 프로덕트를 만들고 싶은 분. 제한된 시간에서 최대 효율로 완성품을 만들고 싶다. 시작은 있었지만 끝을 보지 못한 경험이 있다.",
    color: C.green,
  },
];

/* ─── 데이터: 검증 팀 ─── */
const PROOF_TEAMS = [
  {
    name: "AI 헌터스",
    period: "2024.06~",
    desc: "매주 새로운 AI 툴을 탐색·실험하고, 실무 적용 가능성을 검증하는 팀. 1년간 200개 이상의 툴을 리뷰.",
  },
  {
    name: "AI 크리에이티브",
    period: "2024.09~",
    desc: "AI를 활용한 콘텐츠 제작 워크플로우를 실험하는 팀. 영상, 이미지, 카피라이팅 전반을 커버.",
  },
  {
    name: "AAA팀 (AI Agent AZA)",
    period: "2025.02~",
    desc: "6주간 AI 에이전트 풀사이클 빌딩을 완주한 8인 팀. 스폰지 클럽의 직접적인 모태.",
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
  { week: "W1", date: "5/3 (일)", title: "오리엔테이션", desc: "조별 인사 + VOD 2편 + 인터뷰 스킬 + AAA팀 OS 소개" },
  { week: "W2", date: "5/10 (일)", title: "나만의 OS 시작", desc: "Claude Code 준비 + OS 사례 공유 시작" },
  { week: "W3", date: "5/17 (일)", title: "스킬 공유 + 제작 시작", desc: "필요한 스킬 논의 + 각자 유저 프로덕트 초안" },
  { week: "W4", date: "5/24 (일)", title: "유저 프로덕트 기획", desc: "누구를 위해 왜 만드는가" },
  { week: "W5", date: "5/31 (일)", title: "고도화 + 프로모션", desc: "실제 쓰이게 만드는 방법론 + 유저 5명 접촉" },
  { week: "W6", date: "6/7 (토) or 6/8 (일)", title: "AI 시대 학습·생존 [오프라인]", desc: "커리어와 AI 활용 실행 방안" },
  { week: "W7", date: "6/14 (일)", title: "마무리 & 공유", desc: "전원 결과물 · 회고 · 옵시디언 아카이브" },
];

/* ─── 데이터: 리더십 ─── */
const LEADER_GEMMA = {
  name: "젬마",
  role: "셀피쉬클럽 대표 · 스폰지 클럽 총괄",
  desc: "마케터·비개발자 170명의 페인포인트를 직접 듣고, AAA팀 6주 실험을 거쳐 스폰지 클럽을 설계했습니다. \"혼자 가면 빨리 가지만, 함께 가면 멀리 간다\"를 실천으로 증명합니다.",
};

const CREW_MEMBERS = [
  { name: "다다", role: "PM · 팀 리더", photo: "/images/spongeclub/crew/다다.png", desc: "" },
  { name: "다니", role: "콘텐츠 · 마케팅", photo: "/images/spongeclub/crew/다니.png", desc: "" },
  { name: "오웬", role: "플랫폼 빌더", photo: "/images/spongeclub/crew/오웬.png", desc: "" },
  { name: "띵크", role: "워크플로우 아키텍트", photo: "/images/spongeclub/crew/띵크.png", desc: "" },
  { name: "비비안", role: "운영 · AX 디자인", photo: "/images/spongeclub/crew/비비안.png", desc: "" },
  { name: "흐민", role: "AI 씽킹 파트너", photo: "/images/spongeclub/crew/흐민.png", desc: "" },
  { name: "에밀리", role: "CRM · 멤버 관계", photo: "/images/spongeclub/crew/에밀리.png", desc: "" },
];

/* ─── 데이터: 1기 혜택 ─── */
const BENEFIT_CARDS = [
  { emoji: "💰", title: "1기 한정 최저가", desc: "1차 55만 원 (3일간) · 2차 60만 원" },
  { emoji: "🎓", title: "워크숍 2종 무료 (총 40만 원 상당)", desc: "그리터 기획자 + Claude 기초" },
  { emoji: "🤝", title: "먼저 완주한 9명과 같은 조", desc: "AAA팀이 여러분과 함께합니다" },
  { emoji: "🔑", title: "스폰지 인터뷰 스킬 + AAA OS 최초 공개", desc: "1기만 받는 배포 자료" },
  { emoji: "📸", title: "1기 크루 = 2기 레퍼런스", desc: "옵시디언 아카이브 사이트 게재" },
  { emoji: "🏅", title: "OB 멤버십 우선 자격", desc: "커뮤니티 다음 챕터 우선 참여" },
];

/* ─── 데이터: FAQ ─── */
const FAQ_CATEGORIES = [
  {
    category: "대상 · 참여 조건",
    items: [
      { q: "코딩을 전혀 몰라도 참여할 수 있나요?", a: "네, 가능합니다. 스폰지 클럽은 비개발자를 위해 설계되었습니다. Claude Code를 활용하면 코딩 경험 없이도 실제 서비스를 만들 수 있고, AAA팀 8명 중 대부분이 비개발자였습니다." },
      { q: "마케터가 아니어도 참여할 수 있나요?", a: "물론입니다. 마케터, 기획자, 디자이너, 영업, 대표 등 비개발 직군이라면 누구든 환영합니다. 핵심은 'AI를 활용해 내 문제를 풀고 싶은 의지'입니다." },
      { q: "⭐ 필요한 장비나 소프트웨어가 있나요?", a: "맥북 또는 윈도우 노트북이 필요합니다. Claude Code 구독(월 $20), 옵시디언(무료), GitHub 계정(무료)이 필요하며, 상세 세팅 가이드는 W1에서 제공합니다." },
    ],
  },
  {
    category: "프로그램 운영",
    items: [
      { q: "매주 일요일 저녁 시간을 꼭 비워야 하나요?", a: "네, 매주 일요일 20:00~22:30은 필수 참석입니다. 7주 완주 프로그램이기 때문에 이 시간을 확보할 수 있는 분만 신청해주세요. 부득이한 사정으로 1~2회 불참 시 녹화본을 제공합니다." },
      { q: "어떤 프로젝트를 만들게 되나요?", a: "본인이 원하는 프로젝트를 직접 정합니다. 마케팅 자동화, CRM 대시보드, 콘텐츠 OS, 사이드 프로젝트 등 무엇이든 가능합니다. W1에서 함께 방향을 설정합니다." },
      { q: "팀으로 하나요, 개인으로 하나요?", a: "개인 프로젝트를 조별로 함께 진행합니다. 5~6명이 한 조가 되어 매주 진행 상황을 공유하고 피드백을 주고받습니다. 만드는 건 각자, 성장은 함께." },
      { q: "오프라인 모임도 있나요?", a: "기본적으로 온라인(Zoom)으로 진행됩니다. 다만 데모데이(W7)는 오프라인으로 진행될 수 있으며, 별도 공지드립니다." },
      { q: "⭐ Claude Code가 뭔가요? 꼭 써야 하나요?", a: "Claude Code는 Anthropic이 만든 AI 코딩 도구입니다. 자연어로 지시하면 코드를 작성해주어, 비개발자도 실제 서비스를 만들 수 있게 해줍니다. 스폰지 클럽의 핵심 도구이며, 사용법도 함께 배웁니다." },
      { q: "수료 후에도 커뮤니티에 남을 수 있나요?", a: "네, 스폰지 클럽 동문 슬랙 채널은 수료 후에도 유지됩니다. 기수 간 네트워킹도 이어질 예정입니다." },
    ],
  },
  {
    category: "신청 · 결제",
    items: [
      { q: "⭐ 정원은 몇 명인가요?", a: "1기는 소수 정예로 운영합니다. 조별 밀착 관리를 위해 정원을 제한하고 있으며, 정원이 마감되면 2기를 기다려야 합니다." },
      { q: "⭐ 환불 정책은 어떻게 되나요?", a: "프로그램 시작 전까지 100% 환불 가능합니다. 시작 이후에는 환불이 불가하오니 신중하게 결정해주세요." },
    ],
  },
  {
    category: "기타",
    items: [
      { q: "AAA팀과 스폰지 클럽의 차이가 뭔가요?", a: "AAA팀은 셀피쉬클럽 내부에서 8명이 진행한 6주 실험이었습니다. 스폰지 클럽은 그 경험을 기반으로, 더 많은 분들이 참여할 수 있도록 체계화한 7주 프로그램입니다." },
    ],
  },
];

/* ═══════════════════════════════════════════════
   메인 컴포넌트
   ═══════════════════════════════════════════════ */
export function SpongeClubPaidLanding({ item }: Props) {
  const heroRef = useRef<HTMLElement>(null);
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
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
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
      <section ref={heroRef} className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 text-white overflow-hidden" style={{ background: "linear-gradient(180deg, #2EC4A5 0%, #1BA8C4 35%, #4A7BD4 70%, #7B5EA7 100%)" }}>
        {/* 떠다니는 스폰지들 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.span
            key={`sponge-${i}`}
            className="absolute text-2xl sm:text-3xl pointer-events-none select-none"
            style={{ left: `${(i * 5.3 + 2) % 100}%`, top: `-5%` }}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 1, 1, 0],
              rotate: [0, (i % 2 === 0 ? 1 : -1) * 360],
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              delay: i * 0.7,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🧽
          </motion.span>
        ))}
        <FadeUp>
          <p className="text-base sm:text-lg lg:text-xl tracking-widest font-medium mb-6">
            스폰지 클럽 1기 모집
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-snug max-w-3xl mb-10">
            딸깍 한 번으로는<br />갈 수 없는 곳까지,<br />
            7주를 제대로 들여서<br />함께 도착합니다.
          </h1>
        </FadeUp>

        <FadeUp delay={0.45}>
          <div className="max-w-md mx-auto mb-8 space-y-2 text-xs sm:text-sm lg:text-base opacity-60">
            <p>마케터·비개발자를 위한 AI 에이전트 풀사이클 빌딩 커뮤니티</p>
            <p>1기 한정 구성 · 5/3 시작 · 7주 완주 프로그램</p>
            <p>1차 오픈 최저가 55만 원 · 4/28~30 단 3일</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.55}>
          <button
            onClick={() => scrollTo("register")}
            className="px-8 py-4 rounded-full text-lg font-bold mb-4 hover:scale-105 transition-transform animate-pulse"
            style={{ backgroundColor: C.lime, color: "#1a1a1a" }}
          >
            1기 신청하기 →
          </button>
        </FadeUp>
      </section>

      {/* ═══ PAIN POINT ═══ */}
      <section id="pain-point" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14">
              요즘 이런 생각, 혼자만 하고 계신가요?
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {PAIN_CARDS.map((card, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  {/* 말풍선 꼬리 */}
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white rotate-45" />
                  <span className="text-3xl mb-3 block">{card.emoji}</span>
                  <p className="text-sm sm:text-base leading-relaxed">&ldquo;{card.quote}&rdquo;</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <p className="text-sm opacity-60 mb-6 text-center">마케터·비즈니스 실무자 170명 설문 결과</p>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <div className="flex-1 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <motion.svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e5e5" strokeWidth="3" />
                      <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#1BA8C4" strokeWidth="3" strokeLinecap="round" initial={{ strokeDasharray: "0 100" }} whileInView={{ strokeDasharray: "85 15" }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
                    </motion.svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-black">85%</span>
                  </div>
                  <p className="text-xs sm:text-sm opacity-70">&ldquo;AI를 써봤지만<br />실무에 적용 못하고 있다&rdquo;</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <motion.svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e5e5" strokeWidth="3" />
                      <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#1BA8C4" strokeWidth="3" strokeLinecap="round" initial={{ strokeDasharray: "0 100" }} whileInView={{ strokeDasharray: "68 32" }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
                    </motion.svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-black">68%</span>
                  </div>
                  <p className="text-xs sm:text-sm opacity-70">&ldquo;함께 배울<br />동료가 없다&rdquo;</p>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p className="text-sm sm:text-base text-center mt-10 opacity-60 leading-relaxed">
              이 중 하나라도 내 얘기 같다면, 여기서 끝까지 읽어보세요.<br />
              이 페이지는 그 문제를 <strong>7주 안에 진짜로 통과해본 마케터·비개발자들</strong>이 만들었습니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ ANSWER ═══ */}
      <section id="answer" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-14">
              AI, 혼자서는 끝까지 갈 수 없습니다.
            </h2>
          </FadeUp>

          {/* 질적 이점 4가지 대조 */}
          <div className="space-y-4 mb-14">
            {[
              { alone: "좁은 시야 — 내가 아는 AI 툴만 본다", together: "시야의 교차 — 서로 다른 업무 영역에서 쓰는 AI가 나에게 오픈된다" },
              { alone: "흐지부지되는 프로젝트 — 막히면 혼자 덮어버린다", together: "끝까지 가는 완주력 — 이미 그 지점을 통과한 동료가 길을 알려준다" },
              { alone: "내 안에서만 평가하는 결과물 — 쓸지 말지 혼자 결정한다", together: "유저 시점의 검증 — 다른 사람이 경험하며 반응을 준다" },
              { alone: "관념 속의 학습 — 아는 것 같은데 적용은 안 된다", together: "이기적 공유의 연쇄 — 내가 방출한 경험이 동료의 출발점이 되고, 동료의 돌파가 내 출발점이 된다" },
            ].map((row, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-xl p-4 sm:p-5">
                    <p className="text-xs font-bold opacity-40 mb-1">혼자 공부할 때</p>
                    <p className="text-sm sm:text-base opacity-70">{row.alone}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
                    <p className="text-xs font-bold opacity-40 mb-1">커뮤니티에서 함께할 때</p>
                    <p className="text-sm sm:text-base font-medium">{row.together}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* 이기적 공유 설명 */}
          <FadeUp delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-8">
                스폰지 클럽은 이기적 공유로<br />이 문제를 풀어냅니다.
              </h3>
              <div className="text-sm sm:text-base lg:text-lg leading-[1.9] opacity-80 space-y-6">
                <p>
                  누군가가 일방적으로 가르치는 구조가 아닙니다. 각자가 자기 업무에서 발견한 것을 공유하고, 그 과정에서 서로의 시야가 내 시야가 됩니다. 내가 방출한 경험이 동료의 출발점이 되고, 동료의 돌파가 다시 내 출발점이 됩니다.
                </p>
                <p>
                  결과적으로 모두가 각자의 성장과 이익을 위해 공유하지만, 그 공유가 모여 혼자서는 절대 도달할 수 없는 곳까지 함께 가게 됩니다.
                </p>
              <p>
                혼자 하면 내 시야만큼만 AI를 보게 됩니다. 함께하면 조 전체의 시야가 내 시야가 됩니다.
              </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.6}>
            <p className="text-xs sm:text-sm text-center mt-8 opacity-40">
              170명 서베이에서 응답자의 85%가 "혼자서는 절대 안 된다"에 공감했습니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ PROOF + INSIDE VOICE (통합) ═══ */}
      <section id="proof" className="py-16 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-3">
              이건 추측이 아닙니다.
            </h2>
            <p className="text-center text-sm sm:text-base lg:text-lg opacity-60 mb-14">
              이미 내부에서 1년간 검증됐습니다.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {PROOF_TEAMS.map((team, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  <p className="text-xs font-mono opacity-40 mb-2">{team.period}</p>
                  <h3 className="text-base sm:text-lg font-bold mb-3">{team.name}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-70">{team.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* 크루들의 이야기 */}
          <FadeUp delay={0.3}>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-10">
              먼저 경험한 크루들의 이야기
            </h3>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {VOICE_CARDS.map((card, i) => (
              <FadeUp key={i} delay={0.35 + i * 0.12}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      {card.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{card.name}</p>
                      <p className="text-xs opacity-50">{card.role}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed">&ldquo;{card.quote}&rdquo;</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div className="max-w-3xl mx-auto text-sm sm:text-base leading-[1.9] opacity-80 space-y-4 mb-10">
              <p>
                각자 자기 분야에서 이미 일하던 사람들이, AI 에이전트를 처음 만났을 때 어떻게 바뀌는가 —
              </p>
              <p>
                6주 만에 이런 결과물이 나온다는 건, <strong>"AI 에이전트는 처음인 사람도 본인 분야의 깊이와 결합시키면 다른 차원의 무기가 된다"</strong>는 증거입니다.
              </p>
              <p>
                1기 크루 여러분도 이미 각자의 분야에서 일하고 계신 분들입니다. AAA팀이 증명했듯, <strong>AI 에이전트를 처음 만났을 때 여러분의 전문성이 어떻게 증폭되는지</strong>가 7주의 핵심입니다.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.7}>
            <div className="text-center">
              <p className="text-sm opacity-60 mb-4">1기 크루는 이 OS를 레퍼런스로 본인의 OS를 설계합니다.</p>
              <a
                href="https://aaa.selfishclub.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-full text-sm font-bold border-2 hover:scale-105 transition-transform"
                style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
              >
                AAA OS 둘러보기 →
              </a>
            </div>
          </FadeUp>
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
              매주 일요일 저녁 20:00 ~ 22:30 라이브 세션.<br />
              W1은 오리엔테이션, W6은 오프라인 모임.<br />
              사이사이에 본인 업무에 적용하고, 서로의 과정을 이기적으로 공유합니다.
            </p>
          </FadeUp>

          {/* 주차별 타임라인 */}
          <div className="space-y-3 mt-10">
            {CURRICULUM_WEEKS.map((w, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex gap-4 items-start">
                  <div className="shrink-0 pt-0.5">
                    <p className="text-sm font-black">{w.week}</p>
                    <p className="text-xs opacity-50">{w.date}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{w.title}</h3>
                    <p className="text-xs sm:text-sm opacity-60 mt-1">{w.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
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
                  <p className="text-xs sm:text-sm opacity-60">{LEADER_GEMMA.role}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed opacity-80">
                {LEADER_GEMMA.desc}
              </p>
            </div>
          </FadeUp>

          {/* 함께할 크루 */}
          <FadeUp delay={0.2}>
            <p className="text-sm font-bold opacity-50 mb-3 ml-1">함께할 크루</p>
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CREW_MEMBERS.map((m, i) => (
              <FadeUp key={i} delay={0.25 + i * 0.05}>
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden bg-gray-100">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <p className="font-bold text-sm">{m.name}</p>
                  <p className="text-xs opacity-50 mt-0.5">{m.role}</p>
                  {m.desc && <p className="text-xs opacity-60 mt-2 leading-relaxed">{m.desc}</p>}
                </div>
              </FadeUp>
            ))}
          </div>
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
                  <p className="text-xs sm:text-sm opacity-70">{card.desc}</p>
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
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full border-t-4" style={{ borderColor: card.color }}>
                  <h3 className="text-base sm:text-lg font-bold mb-3">{card.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-70">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <p className="text-center mt-10 text-sm sm:text-base opacity-60 leading-relaxed">
              셋 모두 <strong>"AI로 뭔가 해보고 싶은데 어떻게 시작할지 모르겠다"</strong>는 공통점을 갖고 있습니다.<br />
              결이 같은 사람들이 필터링되어 모이는 것이 스폰지 클럽의 가장 큰 자산입니다.
            </p>
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
            <div className="text-center py-16">
              <FadeUp>
                <p className="text-6xl mb-6">🧽</p>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4">결제 완료! 1기에서 만나요!</h2>
                <p className="text-sm sm:text-base lg:text-lg opacity-70">
                  함께 가야 갈 수 있는 곳이 있습니다.
                  <br />
                  이번엔 혼자가 아닙니다.
                </p>
              </FadeUp>
            </div>
          ) : (
            <>
              <FadeUp>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center mb-4 leading-snug">
                  딸깍 한 번으로는 절대 갈 수 없는 곳까지,
                  <br />
                  함께 도착합시다.
                </h2>
              </FadeUp>

              {/* 가격 구조 */}
              <FadeUp delay={0.1}>
                <div className="flex justify-center gap-4 my-10">
                  <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border-2 border-black/10">
                    <p className="text-xs opacity-50 mb-1">1차 오픈 최저가</p>
                    <p className="text-3xl font-bold">55만 원</p>
                    <p className="text-xs mt-1 opacity-60">4/28~30</p>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-4 sm:p-6 text-center opacity-50">
                    <p className="text-xs opacity-50 mb-1">2차 오픈</p>
                    <p className="text-3xl font-bold">60만 원</p>
                    <p className="text-xs mt-1">예정</p>
                  </div>
                </div>
              </FadeUp>

              {/* 포함 사항 */}
              <FadeUp delay={0.2}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 mb-10">
                  <p className="text-sm font-bold mb-3 opacity-70">포함 사항</p>
                  <ul className="space-y-2 text-sm opacity-80">
                    <li>✓ 7주 라이브 세션 (매주 일 20:00~22:30)</li>
                    <li>✓ 1:1 방향 설정 세션</li>
                    <li>✓ 스폰지 클럽 전용 슬랙 채널</li>
                    <li>✓ AAA OS 풀 액세스</li>
                    <li>✓ 데모데이 발표 기회</li>
                    <li>✓ 셀피쉬클럽 동문 네트워크</li>
                  </ul>
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
                    className="w-full mt-6 py-4 rounded-full text-lg font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <p className="text-xs sm:text-sm opacity-40">
                    이 프로그램은 170명의 마케터·1인 대표에게 직접 들은 페인포인트를 기반으로 설계됐습니다.
                  </p>
                  <p className="text-base sm:text-lg font-bold">
                    함께 가야 갈 수 있는 곳이 있습니다.<br />
                    이번엔 혼자가 아닙니다.
                  </p>
                  <p className="text-sm opacity-60">
                    🧽 스폰지 클럽 1기에서 만나요.
                  </p>
                  <p className="text-xs opacity-30 italic">
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
                  <p className="text-xs sm:text-sm font-bold opacity-40 uppercase tracking-wider mb-3">{cat.category}</p>
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
                              className="shrink-0 text-xl opacity-40"
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
              <p><span className="opacity-50">이름:</span> {formName}</p>
              <p><span className="opacity-50">전화번호:</span> {formPhone}</p>
              <p><span className="opacity-50">이메일:</span> {formEmail}</p>
              {formGoal && <p><span className="opacity-50">목표:</span> {formGoal}</p>}
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
            <p className="text-xs opacity-60">55만 원 · 7주 프로그램</p>
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
