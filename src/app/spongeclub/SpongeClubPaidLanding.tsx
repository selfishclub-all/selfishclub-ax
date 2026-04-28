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
  { id: "curriculum", label: "커리큘럼" },
  { id: "benefits", label: "1기 혜택" },
  { id: "faq", label: "FAQ" },
] as const;

/* ─── 데이터: 페인포인트 ─── */
const PAIN_CARDS = [
  {
    emoji: "😵‍💫",
    quote: "AI 툴 배우면 또 새 게 나와요. 따라잡기 지치는데 안 하면 불안하고.",
  },
  {
    emoji: "😔",
    quote: "튜토리얼은 30분이면 끝나는데, 내 업무에 적용하면 일주일도 안 풀려요.",
  },
  {
    emoji: "😤",
    quote: "만들어놓고 막상 안 쓰게 돼요. 고객한테 보여주기엔 부족하고.",
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
    desc: "AI로 반복 업무를 자동화하고, 워크플로우를 다시 짜고 싶은 분.",
    color: C.skyBlue,
    icon: "💼",
    result: "실무에 바로 적용할 수 있는 자동화를 함께 만듭니다",
  },
  {
    title: "1인 대표·프리랜서",
    desc: "혼자 다 해야 하는 업무에 AI를 동료로 붙이고 싶은 분.",
    color: C.orange,
    icon: "🚀",
    result: "실제 고객 반응을 받는 사이클까지 갑니다",
  },
  {
    title: "사이드 프로젝트 직장인",
    desc: "아이디어는 있는데 끝을 못 본 경험이 있는 분.",
    color: C.green,
    icon: "🛠️",
    result: "완주 구조가 포기 지점을 넘게 해줍니다",
  },
];

/* ─── 데이터: 검증 팀 ─── */
const PROOF_TEAMS = [
  {
    name: "AI 헌터스",
    subtitle: "AI 영상으로 미국 시장 진출까지 성공",
    period: "2024.06~",
    desc: "1년간 200개 이상의 툴을 리뷰. 비개발자들이 AI로 영상을 만들어 미국 시장에 진출, 실제 판매까지 성공.",
    photo: "/images/spongeclub/team-aihunters.png",
  },
  {
    name: "AI Creator 팀",
    subtitle: "젝시믹스와 공식 협업 시작",
    period: "2025.01~",
    desc: "AI 콘텐츠 제작 워크플로우를 실험하는 팀. 젝시믹스와 공식 협업까지 연결.",
    photo: "/images/spongeclub/team-aicreator.png",
  },
  {
    name: "AAA팀 · AI Agent AZA",
    subtitle: "6주간 AI 에이전트 빌딩 완주",
    period: "2025.02~",
    desc: "비개발자 8명이 6주간 AI 에이전트를 직접 만들고 런칭. 레포 구조부터 자동화, 아카이브 시스템까지 — 스폰지클럽의 원형이 된 팀.",
    photo: "/images/spongeclub/team-aaa.png",
    hasLink: true,
  },
];

/* ─── 데이터: 내부 후기 ─── */
const VOICE_CARDS = [
  {
    name: "오웬",
    role: "핀테크 대표",
    quote:
      "3주 동안 혼자 방황했는데, 팀에서 공유하기 시작하니 4시간 만에 서비스를 런칭했어요.",
  },
  {
    name: "비비안",
    role: "마케터",
    quote:
      "개발자 없이 DB 수집부터 결제 페이지까지 혼자 만들었어요.",
  },
  {
    name: "에밀리",
    role: "CRM 담당",
    quote:
      "하루 3시간 걸리던 알림톡 발송이 5분으로 줄었어요.",
  },
  {
    name: "흐민",
    role: "콘텐츠 크리에이터",
    quote:
      "AI한테 답을 구하다가 질문을 받기 시작했어요.",
  },
];

/* ─── 데이터: 커리큘럼 ─── */
const CURRICULUM_WEEKS = [
  { week: "1주차", title: "첫 만남 · 셋업 · 팀 OS의 감 잡기", detail: "조 편성 발표, 작업 환경 같이 세팅, AI가 나를 인터뷰하면서 \"7주 뒤에 내가 뭘 만들고 있을까\"가 한 장으로 정리됩니다. 다다의 팀 OS 사례로 \"OS가 어떻게 굴러가는지\"의 감을 가장 먼저 잡아요.\n\n📦 학습 자료 패키지 제공: GitHub + Claude Code 워크숍 편집 VOD (40만 원 상당) · Claude Code · GitHub · OS 학습 자료 · Sponge Interview Skill" },
  { week: "2주차", title: "나만의 AI OS 만들기", detail: "매일 아침 켜져서 내 일을 같이 하는 작업 환경을 직접 만듭니다. 다니(업무 OS)와 흐민(삶 OS)의 두 갈래 사례를 봐요. 이 주가 끝나면 \"AI를 쓴다\"가 아니라 \"AI랑 같이 일한다\"의 첫 감각이 잡힙니다." },
  { week: "3주차", title: "의도대로 움직이는 AI · 이미지 · 상세페이지", detail: "조원들이 내 OS를 직접 만져보고 피드백을 줍니다. AI가 엉뚱한 데로 새지 않게 잡는 법(하네스·오케스트레이션), 디자이너 없이 제품 컷·모델 컷 만드는 법, AI로 상세페이지 만드는 법까지. 젬마의 미니 세션이 가장 많이 등장하는 주." },
  { week: "4주차", title: "유저가 쓸 프로덕트 시작", detail: "\"누구한테, 왜\"부터 정리합니다. 비비안(개발자 없이 결제까지)과 오웬(월 1개 유저 프로덕트 런칭, 찜마켓 등)의 프로덕트 공유회. 내 프로덕트의 대상 유저·기획 근거·가치·초기 마케팅을 1페이지로 정리하고, 첫 버전 제작 시작." },
  { week: "5주차", title: "고도화 + 프로모션", detail: "W4에서 시작한 프로덕트를 실제 쓰일 수준까지 끌어올립니다. 젬마의 프로모션 방법론(유저가 다시 만나러 오는 가두리망 설계) + 에밀리의 CRM 사례(하루 3시간이 5분이 된 알림톡·배너·UTM 자동 생성)." },
  { week: "6주차", title: "AI 시대의 커리어 (오프라인)", badge: "오프라인 모임", detail: "7주 중 유일한 대면 모임. 만들기를 잠시 멈추고 두 가지 큰 질문을 같이 이야기합니다.\n\n① AI 시대의 커리어 — 무엇을 더 깊이 파야 할지, 무엇은 AI에 넘기고 손을 떼도 되는지, 내 커리어의 다음 한 발을 어디에 둘지. 45명의 관점이 교차되는 자리.\n② 에이전틱한 워크플로우를 갖는다는 것 — 7주 동안 짠 워크플로우를 다시 꺼내놓고, \"계속 손볼 수 있는 살아있는 시스템\"으로 보는 시각을 잡습니다.\n\n오프라인은 조 단위로 묶여 진행될 예정이며, 정확한 운영 방식은 참석 현황에 따라 조정됩니다." },
  { week: "7주차", title: "결과물 발표 · 정식 스폰지크루 전환", detail: "7주의 결과물(내 OS + 프로덕트 + 이미지 + 유저 반응)을 발표하고, 다른 크루 40~50명의 결과물을 한 번에 흡수합니다. Obsidian 아카이브가 스폰지클럽 공식 사이트에 게재돼요. 이 주가 끝나는 순간, 모든 1기 멤버가 정식 스폰지크루로 전환됩니다." },
];

/* ─── 데이터: 리더십 ─── */
const LEADER_GEMMA = {
  name: "젬마",
  role: "셀피쉬클럽 대표 · 스폰지 클럽 총괄",
  desc: "170명의 실무자 서베이와 AAA팀 6주 실험을 거쳐 스폰지 클럽을 설계했습니다.",
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
      { q: "코딩을 전혀 몰라도 괜찮나요?", a: "네. 비개발자를 위해 설계됐습니다." },
      { q: "시간은 얼마나 드나요?", a: "매주 일요일 20:00~23:00 (W1은 1.5시간) + 주중 미션. 7주 동안 안정적으로 시간을 낼 수 있는 분만 신청해 주세요." },
      { q: "필요한 장비는?", a: "노트북 + Claude Code Max 플랜 권장 + Obsidian(무료) + GitHub(무료). 표준은 Claude Code, Codex는 바이브 코딩 보조용으로 활용 가능." },
    ],
  },
  {
    category: "프로그램 운영",
    items: [
      { q: "라이브 세션은 어떻게 진행되나요?", a: "매주 ① 조별 이기적 공유 → ② 전체 세션 공유 → ③ 심화 공유 + 젬마 미니 세션 3단 구조로 진행됩니다. 조에서 먼저 발견을 꺼내고, 그중 공유할 만한 내용이 전체로 올라가는 흐름이에요." },
      { q: "커리큘럼이 중간에 바뀔 수도 있나요?", a: "네. 큰 골격은 유지되지만, 세부 콘텐츠·미니 세션 주제·실습 도구는 진행 상황에 따라 조정됩니다. 변경 사항은 슬랙으로 안내됩니다." },
      { q: "미션은 어떤 식으로 나가나요?", a: "매주 1~3개. 실제 구현 미션 + 답을 정해두지 않은 고민 아젠다 두 갈래로 같이 굴러요." },
      { q: "어디서 소통하나요?", a: "7주 전 기간 슬랙. 과제 제출은 옵시디언, 체크인·자료 모음은 스프레드시트." },
      { q: "어떤 프로젝트를 만드나요?", a: "본인이 직접 정합니다. 마케팅 자동화, CRM 대시보드, 콘텐츠 OS, 사이드 프로젝트 모두 가능. W1에서 방향을 잡아요." },
      { q: "조 구성은?", a: "5개 조 · 조당 8~10명. 조장과 부조장이 한 팀으로 조를 이끕니다." },
    ],
  },
  {
    category: "신청 · 결제",
    items: [
      { q: "7주 이후에도 활동이 이어지나요?", a: "네. 정식 스폰지크루로 전환되어 2026년까지 예정된 이기적 공유 세션 무료 참여 + 영상 프로젝트 등 다른 활동 참여까지 이어집니다." },
      { q: "환불 정책은?", a: "4월 30일까지 환불 가능합니다. 이후로는 환불이 어려우니 신중하게 결정해 주세요." },
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
  const [formConfirm, setFormConfirm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">(previewSuccess ? "success" : "idle");
  const [paymentError, setPaymentError] = useState("");
  const [soldOut, setSoldOut] = useState(false);

  /* 재고 확인 */
  useEffect(() => {
    fetch(`/api/payments/stock?itemId=${item.iid}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data?.soldOut) setSoldOut(true);
      })
      .catch(() => {});
  }, [item.iid]);

  /* 모바일 결제 복귀: URL에 paymentId가 있으면 서버 검증 후 성공 화면 표시 */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returnedPaymentId = params.get("paymentId");
    if (!returnedPaymentId || paymentStatus === "success") return;

    setPaymentStatus("processing");

    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: returnedPaymentId, itemId: item.iid }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          // 이미 처리된 결제(중복)도 성공으로 간주
          if (result.error.includes("이미") || result.error.includes("already")) {
            setPaymentStatus("success");
          } else {
            setPaymentStatus("error");
            setPaymentError(result.error);
          }
        } else {
          setPaymentStatus("success");
        }
      })
      .catch(() => {
        setPaymentStatus("error");
        setPaymentError("결제 확인 중 오류가 발생했습니다.");
      });
  }, []);

  /* FAQ 토글 */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* 커리큘럼 토글 */
  const [openWeek, setOpenWeek] = useState<number | null>(null);

  /* 스크롤 → 네비게이션 표시 */
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight ?? 800;
      setShowNav(scrollY > heroHeight);
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

  /* 히어로 아래부터 플로팅 CTA 표시, register 섹션 보이면 숨김 */
  useEffect(() => {
    const heroEl = heroRef.current;
    const registerEl = registerRef.current;
    if (!heroEl || !registerEl) return;

    let pastHero = false;
    let registerVisible = false;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        setShowFloatingCta(pastHero && !registerVisible);
      },
      { threshold: 0 }
    );

    const registerObserver = new IntersectionObserver(
      ([entry]) => {
        registerVisible = entry.isIntersecting;
        setShowFloatingCta(pastHero && !registerVisible);
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroEl);
    registerObserver.observe(registerEl);
    return () => {
      heroObserver.disconnect();
      registerObserver.disconnect();
    };
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
    if (!formConfirm) {
      alert("안내 사항을 확인해주세요.");
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
        initial={{ y: 0 }}
        animate={{ y: 0 }}
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
          <img
            src="/images/spongeclub/selfishclub-logo-white.png"
            alt="SELFISH CLUB"
            className="shrink-0 h-5 sm:h-6"
          />
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 sm:py-32 lg:py-40 overflow-hidden" style={{ background: "#E9ED12", color: "#0A0A0A" }}>
        <FadeUp delay={0.15}>
          <p className="text-base sm:text-lg lg:text-xl font-bold tracking-wide mb-8 px-5 py-2 rounded-full border border-black/20 bg-black/5 inline-block">
            스폰지클럽 1기 모집 오픈!
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.15] max-w-5xl">
            딸깍 한 번으로는<br />갈 수 없는 곳까지, 함께
          </h1>
        </FadeUp>

        {/* 스폰지 로고 */}
        <div className="my-12 sm:my-16 lg:my-20 w-full flex items-center justify-center">
          <motion.img
            src="/images/spongeclub/sponge-logo.png"
            alt="SPONGE CLUB"
            className="w-48 sm:w-64 lg:w-80 drop-shadow-2xl"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <FadeUp delay={0.5}>
          <p className="max-w-xl mx-auto text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed mb-10">
            마케터·비개발자를 위한 7주 AI 에이전트 빌딩 커뮤니티
          </p>
        </FadeUp>

        <FadeUp delay={0.7}>
          <button
            onClick={() => scrollTo("register")}
            className="px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform"
            style={{ backgroundColor: "#E9ED12", color: "#0A0A0A" }}
          >
            지금 얼리버드 최저가로 신청하기
          </button>
        </FadeUp>
      </section>

      {/* ═══ PAIN POINT ═══ */}
      <section id="pain-point" className="relative pt-16 lg:pt-24 px-4 sm:px-6 overflow-hidden" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
        {/* 소셜 프루프 배경 이미지 */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ mask: "linear-gradient(to bottom, white 0%, white 60%, transparent 90%)", WebkitMask: "linear-gradient(to bottom, white 0%, white 60%, transparent 90%)" }}>
          <img src="/images/spongeclub/social-proof-bg.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-14 leading-[1.4] sm:leading-[1.5]">
              요즘 이런 생각,<br />혼자만 하고 계신가요?
            </h2>
          </FadeUp>

          {/* 85% */}
          <FadeUp delay={0.1}>
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white text-center mb-6">
              &ldquo;AI를 써봤지만 실무에 적용 못하고 있다&rdquo;
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
            <div className="text-center mt-12 mb-6">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed opacity-90">
                내 얘기 같다면,
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed opacity-90">
                끝까지 읽어보세요.
              </p>
            </div>
          </FadeUp>
        </div>
        {/* 그라데이션 전환 + 세로선 하나로 연결 */}
        <div className="-mx-4 sm:-mx-6 flex flex-col items-center" style={{ background: "linear-gradient(to bottom, #1a1a1a, #0A0A0A)" }}>
          <div className="w-px h-20 sm:h-28 bg-white/30" />
        </div>
      </section>

      {/* ═══ AGENTIC ═══ */}
      <section id="agentic" className="pt-6 pb-20 lg:pb-32 px-4 sm:px-6" style={{ backgroundColor: "#0A0A0A", color: "white" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-8 leading-[1.4] sm:leading-[1.5]">
              7주 후 당신은<br />에이전틱한 사람이 됩니다
            </h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed opacity-80">
                에이전틱<span className="opacity-60">(agentic)</span>하다는 건, AI에게 무엇을 어떻게 시킬지 스스로 정하고 설계할 수 있다는 뜻이에요.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ ANSWER ═══ */}
      <section id="answer" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-6">
              AI, 혼자서는<br />어려운 게 맞습니다
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-center opacity-70 leading-relaxed mb-14 max-w-3xl mx-auto">
              매일 새로운 모델과 워크플로우가 나오는데, 이걸 내 업무에 맞게 적용하는 건 또 다른 문제입니다.
            </p>
          </FadeUp>

          {/* 질적 이점 4가지 대조 */}
          <FadeUp>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center py-3">
                <p className="text-sm sm:text-base font-bold opacity-70">혼자 할 때</p>
              </div>
              <div className="text-center py-3 rounded-xl" style={{ backgroundColor: "#0A0A0A" }}>
                <p className="text-sm sm:text-base font-bold text-white">함께 할 때</p>
              </div>
            </div>
          </FadeUp>
          <div className="space-y-3 mb-14">
            {[
              { alone: "내가 아는 툴만 보게된다", together: "크루가 써본 툴들을 간접적으로 써볼 수 있다" },
              { alone: "막힐 때 쉽게 포기하게 된다", together: "이미 경험한 크루가 팁을 주고, 함께 고민해 준다" },
              { alone: "내 기준으로만 평가하게 된다", together: "크루가 유저 시점으로 경험하고, 피드백을 준다" },
            ].map((row, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-xl p-4 sm:p-5">
                    <p className="text-sm sm:text-base opacity-70">{row.alone}</p>
                  </div>
                  <div className="rounded-xl p-4 sm:p-5 border-2" style={{ borderColor: "#0A0A0A", backgroundColor: "rgba(10,10,10,0.03)" }}>
                    <p className="text-sm sm:text-base font-medium">{row.together}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ WHY ═══ */}
      <section id="why" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-8 leading-[1.4] sm:leading-[1.5]">
              스폰지클럽에서는<br />가능한 이유
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-base sm:text-lg leading-relaxed opacity-70">
                매주 미션 + 조별 이기적 공유로 7주간 굴러갑니다. 내가 꺼낸 만큼 돌아오는 구조예요.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-5">
            <FadeUp delay={0.2}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-3">① 실전 중심</h3>
                <p className="text-sm sm:text-base leading-relaxed opacity-70">
                  이론이 아니라 매주 직접 만듭니다. 내 업무에 바로 적용해요.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-3">② 이기적 공유</h3>
                <p className="text-sm sm:text-base leading-relaxed opacity-70">
                  출발점이 다른 8~10명의 유즈케이스가 매주 내 시야로 들어옵니다.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-3">③ 7주 미션</h3>
                <p className="text-sm sm:text-base leading-relaxed opacity-70">
                  고민 아젠다 + 구현 미션. 따라하는 워크숍이 아니라 직접 만드는 구조입니다.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ PROOF + INSIDE VOICE (통합) ═══ */}
      <section id="proof" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-14 leading-[1.4] sm:leading-[1.5]">
              셀피쉬클럽이<br />1년 동안 검증한 방식입니다
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="text-sm sm:text-base opacity-70 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
              셀피쉬클럽이 1년간 운영한 3개 팀의 실제 결과물입니다.
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
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">{team.name}</h3>
                    {"subtitle" in team && team.subtitle && (
                      <p className="text-sm sm:text-base opacity-60 mb-4">{team.subtitle}</p>
                    )}

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
                        href="https://aaa-homepage.vercel.app/"
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

          {/* AAA 프로젝트 후기 */}
          <div id="voice" className="mt-14">
            <FadeUp>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8">
                AAA 프로젝트 후기
              </h3>
            </FadeUp>

            <div className="grid sm:grid-cols-2 gap-5">
              {VOICE_CARDS.map((card, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={`/images/spongeclub/crew/${card.name}.png`} alt={card.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold">{card.name}</p>
                        <p className="text-sm opacity-60">{card.role}</p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed opacity-80">&ldquo;{card.quote}&rdquo;</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ CURRICULUM ═══ */}
      <section id="curriculum" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#0A0A0A", color: "white" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-3">
              7주 커리큘럼
            </h2>
            <p className="text-center text-sm sm:text-base lg:text-lg opacity-70 mb-4 leading-relaxed">
              5월 3일부터 7주간 매주 일요일 8:00-11:00<br /><span className="opacity-50">(1주차만 8:00-9:30, 1.5시간 진행)</span>
            </p>
          </FadeUp>

          {/* 주차별 타임라인 */}
          <div className="space-y-3 mt-10">
            {CURRICULUM_WEEKS.map((w, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ color: "#2D2D2D" }}>
                  <button
                    onClick={() => setOpenWeek(openWeek === i ? null : i)}
                    className="w-full p-4 sm:p-5 flex gap-4 items-start text-left hover:bg-black/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="shrink-0 pt-0.5">
                      <p className="text-sm font-black">{w.week}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm sm:text-base">{w.title}</h3>
                      {"badge" in w && w.badge && (
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#E9ED12", color: "#1a1a1a" }}>
                          {w.badge}
                        </span>
                      )}
                    </div>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      animate={{ rotate: openWeek === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 mt-0.5"
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openWeek === i ? "auto" : 0,
                      opacity: openWeek === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[calc(1rem+3.5rem)] sm:pl-[calc(1.25rem+3.5rem)] text-sm sm:text-base leading-relaxed opacity-70 whitespace-pre-line">
                      {w.detail}
                    </p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.6}>
            <p className="text-sm opacity-70 text-center mt-6">
              커리큘럼은 진행 상황에 따라 일부 변경될 수 있습니다.
            </p>
          </FadeUp>

          {/* 주간 운영 캘린더 */}
          <FadeUp delay={0.7}>
            <div className="mt-14">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">주간 운영 플랜</h3>
              {/* 세로 캘린더 */}
              <div className="rounded-2xl overflow-hidden border border-black/10">
                {/* 월~토 */}
                <div className="flex border-b border-black/10">
                  <div className="w-16 sm:w-20 shrink-0 flex flex-col items-center justify-center font-bold text-sm divide-y divide-black/10" style={{ backgroundColor: "#E9ED12", color: "#1a1a1a" }}>
                    {["월", "화", "수", "목", "금", "토"].map((day) => (
                      <span key={day} className="w-full text-center py-2">{day}</span>
                    ))}
                  </div>
                  <div className="flex-1 p-4 sm:p-5 flex items-center" style={{ backgroundColor: "#F5F5F3", color: "#2D2D2D" }}>
                    <div>
                      <p className="font-bold text-sm sm:text-base mb-2">💬 슬랙 활동 · 미션 · 질문</p>
                      <p className="text-sm leading-relaxed opacity-70">
                        미션 수행, 질문, 조원 간 공유 — 주중 활동은 모두 슬랙에서 진행됩니다.
                      </p>
                    </div>
                  </div>
                </div>
                {/* 일요일 */}
                <div className="flex">
                  <div className="w-16 sm:w-20 shrink-0 flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#E9ED12", color: "#1a1a1a" }}>
                    일
                  </div>
                  <div className="flex-1 p-4 sm:p-5" style={{ backgroundColor: "#F5F5F3", color: "#2D2D2D" }}>
                    <p className="font-bold text-sm sm:text-base mb-1">🎙️ 라이브 세션 · 20:00–23:00</p>
                    <div className="space-y-3">
                      <div className="pl-4 border-l-2" style={{ borderColor: "#E9ED12" }}>
                        <p className="text-sm font-bold mb-1">① 조별 이기적 공유</p>
                        <p className="text-sm leading-relaxed opacity-70">한 주간의 발견·막힘·돌파를 조별로 꺼내놓고, 전체 공유할 내용을 선정합니다.</p>
                      </div>
                      <div className="pl-4 border-l-2" style={{ borderColor: "#E9ED12" }}>
                        <p className="text-sm font-bold mb-1">② 전체 세션 공유</p>
                        <p className="text-sm leading-relaxed opacity-70">5개 조에서 올라온 내용을 전체가 함께 봅니다.</p>
                      </div>
                      <div className="pl-4 border-l-2" style={{ borderColor: "#E9ED12" }}>
                        <p className="text-sm font-bold mb-1">③ 심화 공유 + 젬마 미니 세션</p>
                        <p className="text-sm leading-relaxed opacity-70">주제별 심화 공유 또는 젬마의 미니 세션이 진행됩니다.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section id="leadership" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-14">
              완주하도록 이끌어줄<br />크루들을 소개합니다
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

          {/* 운영진 — 2열 그리드 */}
          <div className="grid sm:grid-cols-2 gap-4">
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
      <section id="after" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-4">
              7주가 끝나면<br />정식 스폰지크루로
            </h2>
            <p className="text-center text-base sm:text-lg leading-relaxed opacity-70 mb-14 max-w-3xl mx-auto">
              7주 완주한 1기 멤버는 정식 스폰지크루로 전환됩니다.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { emoji: "🎫", title: "이기적 공유 세션 무료 참여", desc: "2026년까지 예정된 내부 이기적 공유 세션에 계속 참여" },
              { emoji: "🎬", title: "영상 프로젝트 등 다른 활동 참여", desc: "AI 헌터스·AI 크리에이터 팀 흐름에 합류하거나 새 프로젝트 진입" },
              { emoji: "🤝", title: "1기 멤버끼리 다음 챕터", desc: "스폰지크루의 이름을 달고 새 활동을 전개하는 것도 가능" },
              { emoji: "📸", title: "Obsidian 아카이브 공식 사이트 게재", desc: "7주 기록이 스폰지클럽 공식 사이트에 포트폴리오로 남습니다" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  <span className="text-2xl mb-2 block">{item.emoji}</span>
                  <h3 className="font-bold text-sm sm:text-base mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base opacity-60 leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 1기 특별함 ═══ */}
      <section id="benefits" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-14">
              1기를 절대 놓치면<br />안되는 이유
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFIT_CARDS.map((card, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
                  <span className="text-3xl mb-3 block">{card.emoji}</span>
                  <h3 className="font-bold text-sm sm:text-base mb-2">{card.title}</h3>
                  <p className="text-sm sm:text-base opacity-70">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.8}>
            <div
              className="rounded-2xl p-4 sm:p-6 mt-10 border-2"
              style={{ borderColor: C.red, backgroundColor: `${C.red}0A` }}
            >
              <p className="font-bold text-sm sm:text-base lg:text-lg" style={{ color: C.red }}>
                중요 안내
              </p>
              <p className="text-sm mt-2 leading-relaxed opacity-80">
                1기 이후의 프로그램 구성·기간·가격·혜택은 아직 확정되지 않았습니다.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ TARGET ═══ */}
      <section id="target" className="py-24 lg:py-36 px-4 sm:px-6" style={{ backgroundColor: "#0A0A0A", color: "white" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-20 leading-tight">
              이런 분들께<br />추천합니다
            </h2>
          </FadeUp>

          <div className="space-y-8">
            {PERSONA_CARDS.map((card, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div className="rounded-3xl p-6 sm:p-8 lg:p-10" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <h3 className="text-2xl sm:text-3xl font-black mb-4">{card.title}</h3>
                  <p className="text-base sm:text-lg leading-relaxed opacity-50 mb-6">{card.desc}</p>
                  <p className="text-base sm:text-lg font-bold" style={{ color: "#E9ED12" }}>→ {card.result}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-16 rounded-3xl p-6 sm:p-8 lg:p-10" style={{ backgroundColor: "rgba(233,237,18,0.08)", borderLeft: "4px solid #E9ED12" }}>
              <h3 className="font-bold text-xl sm:text-2xl mb-4" style={{ color: "#E9ED12" }}>7주 동안 시간을 낼 수 있는 분</h3>
              <p className="text-base sm:text-lg opacity-60 leading-relaxed">
                매주 일요일 3시간 라이브 + 주중 미션. 7주간 이 리듬을 유지할 수 있는 분과 함께하고 싶습니다.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ TOOLS ═══ */}
      <section id="notes" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-14">
              사용하는 툴
            </h2>
          </FadeUp>

          {/* 유료 필수 */}
          <FadeUp delay={0.1}>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: "#E53935", color: "white" }}>유료 필수</span>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-5">
                  <div>
                    <p className="font-bold text-sm sm:text-base">Claude (Max 플랜)</p>
                    <p className="text-sm opacity-60 mt-0.5">7주의 표준 도구 · 클로드 코드가 아니라 claude.ai로 진입</p>
                  </div>
                  <p className="text-sm font-medium opacity-50 shrink-0 ml-4">월 $100</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* 보조 유료 */}
          <FadeUp delay={0.2}>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: "#F59E0B", color: "white" }}>보조 유료</span>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-5">
                  <div>
                    <p className="font-bold text-sm sm:text-base">Codex</p>
                    <p className="text-sm opacity-60 mt-0.5">바이브 코딩 보조용 · Plus 플랜 사용 시</p>
                  </div>
                  <p className="text-sm font-medium opacity-50 shrink-0 ml-4">월 $20</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* 무료 사용 가능 */}
          <FadeUp delay={0.3}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: "#22C55E", color: "white" }}>무료 사용 가능</span>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-black/5">
                <div className="p-4 sm:p-5">
                  <p className="font-bold text-sm sm:text-base">스프레드시트</p>
                  <p className="text-sm opacity-60 mt-0.5">주차별 체크인 + 자료 모음</p>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-bold text-sm sm:text-base">옵시디언 (Obsidian)</p>
                  <p className="text-sm opacity-60 mt-0.5">과제 제출 + 7주 기록 아카이브</p>
                </div>
                <div className="flex items-center justify-between p-4 sm:p-5">
                  <div>
                    <p className="font-bold text-sm sm:text-base">나노바나나 2.0 / 덕테이프</p>
                    <p className="text-sm opacity-60 mt-0.5">W3 이미지 생성 · 유료 권장하지만 무료로도 가능</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-bold text-sm sm:text-base">후커블 (Hookable)</p>
                  <p className="text-sm opacity-60 mt-0.5">W3 상세페이지 제작 · 무료 크레딧 제공</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-20 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-14">
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

      {/* ═══ FINAL CTA + Payment ═══ */}
      <section
        id="register"
        ref={registerRef}
        className="py-20 lg:py-32 px-4 sm:px-6"
        style={{ backgroundColor: C.lime, color: C.text }}
      >
        <div className="max-w-3xl mx-auto">
          {soldOut && paymentStatus !== "success" ? (
            <div className="py-16">
              <FadeUp>
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4">선착순 신청이 마감되었습니다</h2>
                  <p className="text-lg sm:text-xl opacity-70 mb-8">
                    많은 관심 감사합니다. 다음 기수 모집 시 알림을 받으시려면 카카오 채널을 추가해주세요.
                  </p>
                  <a
                    href="http://pf.kakao.com/_dxmxixhG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: "#FEE500", color: "#1a1a1a" }}
                  >
                    카카오톡 채널 추가하기
                  </a>
                </div>
              </FadeUp>
            </div>
          ) : paymentStatus === "success" ? (
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
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-4 leading-snug">
                  딸깍 한 번으로는 갈 수 없는 곳까지, 함께
                </h2>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="flex justify-center gap-4 my-10">
                  <div className="bg-white rounded-2xl p-4 sm:p-6 text-center border-2 border-black/10">
                    <p className="text-sm opacity-70 mb-1">1차 오픈 최저가</p>
                    <p className="text-3xl font-bold">55만 원</p>
                    <p className="text-sm mt-1 opacity-60">4/28~30</p>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-4 sm:p-6 text-center opacity-70">
                    <p className="text-sm opacity-70 mb-1">2차 오픈</p>
                    <p className="text-3xl font-bold">65만 원</p>
                    <p className="text-sm mt-1">예정</p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                  <h3 className="text-base sm:text-lg font-bold mb-6">신청 정보</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm opacity-60 mb-1">이름 *</label>
                      <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="홍길동" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">전화번호 *</label>
                      <input type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="010-0000-0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">이메일 *</label>
                      <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">7주 동안 만들고 싶은 것 (한 줄)</label>
                      <input type="text" value={formGoal} onChange={(e) => setFormGoal(e.target.value)} placeholder="예: 마케팅 자동화 대시보드" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition" />
                    </div>
                  </div>
                  <p className="text-sm text-center mt-4 opacity-60">
                    🎁 해당 이기적공유회 신청 시, 이기적멤버십 2.0에도 무료로 자동가입됩니다.
                  </p>

                  <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-sm opacity-70 mb-3">
                      신청 및 결제 완료 시 4/30(목) 참여자 대상 상세 안내를 보내드립니다.
                    </p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formConfirm}
                        onChange={(e) => setFormConfirm(e.target.checked)}
                        className="w-4 h-4 rounded accent-black"
                      />
                      <span className="text-sm font-medium">확인했습니다 <span className="text-red-500">*</span></span>
                    </label>
                  </div>

                  {paymentStatus === "error" && (
                    <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">{paymentError}</div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={paymentStatus === "processing"}
                    className="w-full mt-6 py-4 rounded-full text-lg font-bold transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#E9ED12", color: "#0A0A0A" }}
                  >
                    {paymentStatus === "processing" ? "결제 처리 중..." : "선착순 신청하기"}
                  </button>
                </div>
              </FadeUp>
            </>
          )}
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
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pointer-events-none"
      >
        <div className="max-w-lg mx-auto pointer-events-auto">
          {soldOut ? (
            <span
              className="block w-full py-4 rounded-full text-lg font-bold text-center shadow-2xl cursor-not-allowed"
              style={{ backgroundColor: "#999", color: "rgba(255,255,255,0.7)" }}
            >
              선착순 신청이 마감되었습니다
            </span>
          ) : (
            <button
              onClick={() => scrollTo("register")}
              className="w-full py-4 rounded-full text-lg font-bold hover:scale-[1.02] transition-all shadow-2xl"
              style={{ backgroundColor: "#E9ED12", color: "#0A0A0A" }}
            >
              선착순 신청하기
            </button>
          )}
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
