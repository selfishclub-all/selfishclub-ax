import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PurchaseButton } from "./PurchaseButton";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// 프로토타입: 3개 샘플 상세 콘텐츠
const DETAIL_DATA: Record<string, {
  summary: string;
  curriculum: { title: string; items: string[] }[];
  target: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  speakers: { name: string; desc: string }[];
  images: string[];
  reviewKey: string;
}> = {
  "ai-github": {
    summary: "비개발자를 위한 Claude Code 앱과 GitHub 실전 활용 공유회. 터미널 없이 앱으로 서비스를 만드는 방법부터 코드 관리와 팀 협업까지 한 번에 배울 수 있습니다.",
    curriculum: [
      { title: "Session 01 — 클로드코드 앱 실전 정복기", items: ["터미널 없이 클로드코드 앱으로 가능한 것들", "스킬과 플러그인 활용법", "아이디어를 구체화하는 기획 도구 사용법", "로컬, 배포, 데이터베이스 구조 이해", "5시간 만에 만든 비개발자 실전 사례"] },
      { title: "Session 02 — 깃헙 활용해보기", items: ["Git과 GitHub의 개념 구분하기", "필수 4가지 개념: 커밋, 클론, 브랜치, PR", "셀피쉬클럽의 실제 협업 구조 공개", "초보자가 자주 하는 실수 TOP 3"] },
    ],
    target: ["클로드코드는 써보고 싶지만 터미널이 낯선 사람", "만들고 싶은 아이디어가 있지만 구체화하기 막막한 사람", "코드 관리와 팀 협업이 고민인 1인 빌더", "마케터, 기획자, 스타트업 PO/PM"],
    benefits: ["공유회 다시보기 VOD", "플러그인 & 스킬 모음.zip", "공유회 초압축 AI 인사이트 노트"],
    faq: [
      { q: "라이브 참여는 어떻게 하나요?", a: "신청 완료 후 당일 저녁 7시에 알림톡과 이메일로 라이브 입장 링크가 발송됩니다." },
      { q: "환불은 언제까지 가능한가요?", a: "공유회 시작 3일 전까지 가능합니다. 마이페이지에서 환불 요청할 수 있습니다." },
    ],
    speakers: [
      { name: "젬마", desc: "클로드코드 앱 실전 워크플로우 전문가" },
      { name: "코이", desc: "GitHub 협업 구조 설계 전문가" },
    ],
    images: [
      "https://mryzkyvxcjeqjkdhlkeo.supabase.co/storage/v1/object/public/program-images/ai-github/hero.jpg",
    ],
    reviewKey: "클로드코드앱 / 깃헙 편",
  },
  "ai-bizvideo": {
    summary: "AI 비즈니스 영상 제작 공유회. 애슬레저, 뷰티 등 다양한 업계의 실전 사례를 통해 일관성 있는 AI 영상 제작 방법을 4명의 크리에이터가 공개합니다.",
    curriculum: [
      { title: "Opening — AI 영상, 진짜 비즈니스에서 쓸 수 있나요?", items: ["셀피쉬클럽 AI 영상팀의 성장 과정과 현업 경험 공유"] },
      { title: "Session 01 — AI로 '말하는' 크리에이터 영상 만들기", items: ["레퍼런스 분석 + 스토리보드 기획", "AI 크리에이터 기본 이미지 생성", "클링 3.0으로 영상 생성 + 나레이션 처리"] },
      { title: "Session 02 — 뷰티 기작영상 제작", items: ["ChatGPT로 스토리보드 방향 잡기", "젠스파크로 컷별 이미지 한번에 생성", "클링으로 영상화"] },
      { title: "Session 03 — 제품 모션 영상 만들기", items: ["힉스필드 앵글 + 인페인트 조합", "퍼스트/라스트 프레임 전략"] },
      { title: "Session 04 — AI로 바디 제품 콘텐츠 생성하기", items: ["미드저니에서 레퍼런스 찾기", "원하는 이미지로 수정 → 영상으로 만들기"] },
    ],
    target: ["AI 영상 제작 경험이 있지만 실무 적용에 어려움을 느끼는 마케터", "인플루언서 섭외 및 촬영 비용 절감을 원하는 브랜드 담당자", "AI 영상으로 비즈니스 프로젝트를 진행하고 싶은 크리에이터"],
    benefits: ["공유회 다시보기 VOD", "릴리의 AI 크리에이터 영상 제작 워크플로우", "다니의 뷰티 기작영상 제작 워크플로우", "러피의 제품 모션 영상 제작 워크플로우", "비비안의 타겟 모델 영상 제작 워크플로우"],
    faq: [
      { q: "라이브는 왜 끝까지 들어야 하나요?", a: "라이브 완주 시 최대 5종의 추가 혜택을 받을 수 있으며, 해당 혜택은 라이브 중에만 안내됩니다." },
      { q: "환불은 언제까지 가능한가요?", a: "공유회 시작 3일 전까지 가능합니다. 마이페이지에서 요청할 수 있습니다." },
    ],
    speakers: [
      { name: "젬마", desc: "셀피쉬클럽 AI 영상팀 대표" },
      { name: "릴리", desc: "AI 크리에이터 영상 제작 전문가" },
      { name: "다니", desc: "뷰티 기작영상 제작 전문가" },
      { name: "러피", desc: "3D 모션 그래픽 제작 전문가" },
      { name: "비비안", desc: "바디 제품 콘텐츠 제작 전문가" },
    ],
    images: [
      "https://mryzkyvxcjeqjkdhlkeo.supabase.co/storage/v1/object/public/program-images/ai-bizvideo/hero.jpg",
    ],
    reviewKey: "AI 비즈니스 영상 편",
  },
  "ai-claude4": {
    summary: "Claude 프로젝트와 스킬을 활용한 실전 마케팅 자동화 사례를 공개. 기획부터 CRM 자동화, 콘텐츠 제작, 광고 분석까지 한 번의 대화로 처리하는 워크플로우를 배운다.",
    curriculum: [
      { title: "PART 01 — 클로드 프로젝트 & 스킬 이해하기", items: ["프로젝트(셰프)와 스킬(칼)의 개념과 차이점", "맥락과 철학을 담는 프로젝트 설계 방법"] },
      { title: "PART 02 — 실전 사례: 노리케어 마케팅 캠페인", items: ["프로젝트 지침으로 캠페인 맥락 유지하기", "n8n 스킬로 27개 노드 CRM 워크플로우 생성", "캐러셀/Supabase 스킬 활용한 자동화"] },
      { title: "PART 03 — 실전 사례: 이기적멤버십 운영", items: ["재사용 가능한 스킬 아키텍처", "프로젝트 인스트럭션 옵티마이저로 지침 최적화"] },
      { title: "PART 04 — 라이브 시연", items: ["프로젝트 새로 세팅하기", "스킬 처음부터 만들어보기"] },
    ],
    target: ["반복되는 AI 설명이 지친 마케터", "클로드 프로젝트&스킬 사용법이 막막한 초보자", "코딩 없이 업무 자동화를 원하는 실무자", "AI 마케팅 워크플로우를 배우고 싶은 취준생/학생"],
    benefits: ["공유회 다시보기 VOD", "실전 스킬모음.zip", "공유회 초압축 AI 인사이트 노트"],
    faq: [
      { q: "라이브는 왜 끝까지 들어야 하나요?", a: "라이브 완주시에만 실전 스킬모음.zip과 AI 인사이트 노트를 제공합니다." },
      { q: "환불은 언제까지 가능한가요?", a: "공유회 시작 3일 전까지 가능합니다. 마이페이지에서 요청할 수 있습니다." },
    ],
    speakers: [
      { name: "젬마", desc: "AX 비즈니스 디렉터, 150개 기업·2만명 이상 대상 AI/AX 교육 진행" },
    ],
    images: [
      "https://mryzkyvxcjeqjkdhlkeo.supabase.co/storage/v1/object/public/program-images/ai-claude4/hero.jpg",
    ],
    reviewKey: "",
  },
  "sharing-aivideo": {
    summary: "이번 공유회는 실제 브랜드 협업 사례를 바탕으로 AI 마케팅 영상 제작 과정과 노하우를 생생하게 공개하며 실시간 Q&A까지 약 2시간 동안 진행됩니다! 영상 제작 경험이 전혀 없어도 어떤 AI 툴을 활용해서 마케팅 영상을 만드는지 기획부터 제작까지 모든 과정을 직접 배울 수 있습니다.",
    curriculum: [],
    target: ["AI로 빠르게 프로모션 영상을 제작하는 노하우를 알고 싶은 분", "혼자서 영상 기획부터 최종편집까지 A to Z를 배워보고 싶은 분", "다양한 AI 툴, 어떻게 연결해야 써야 효과적일지 모르겠는 분", "셀피쉬클럽의 실제 AI 영상 제작 사례와 노하우가 궁금한 분"],
    benefits: ["공유회 다시보기 VOD", "AI 요약노트 제공", "후기 작성자 중 추첨 영상 무료 제작", "꿀팁 프롬프트 모음 제공"],
    faq: [],
    speakers: [{ name: "젬마", desc: "셀피쉬클럽 마스터이자 AI 마케팅 디렉터. AI 영상 집중팀을 만들고 브랜드 협업까지 성공한 과정을 공유합니다." }],
    images: ["/images/program-images/sharing-aivideo.png"],
    reviewKey: "",
  },
  "ai-ir": {
    summary: "AI 기술의 발전으로 기존의 워크플로우를 대체하는 수준은 충분히 가능해졌습니다. AI 해자팀은 여기서 그치지 않고 AI로 진짜 '해자'를 만들어서 비즈니스 임팩트를 내기 위해 도전했습니다. 뚜렷한 목표를 가지고 다양한 실행을 했고, 결국 결과를 만들어 낸 모든 과정을 공개합니다.",
    curriculum: [],
    target: ["AI 이미지와 영상이 현업에서 어떻게 쓰이는지 궁금한 누구나", "AI 영상이 만들어지는 모든 과정이 궁금한 분들", "AI가 비즈니스에서 어떤 임팩트를 만들 수 있는지 궁금한 분들", "다양한 AI 툴을 효과적으로 연결하고 활용하는 방법이 궁금한 분들"],
    benefits: ["베타멤버십 가입 + 라이브 끝까지 참여시 공유회 VOD 녹화본 제공"],
    faq: [],
    speakers: [{ name: "젬마", desc: "셀피쉬클럽 마스터이자 AI마케팅디렉터. AI 해자팀과 함께 존재하지 않았던 것도 존재하게 만든 여정을 공유합니다." }],
    images: ["/images/program-images/ai-ir.png"],
    reviewKey: "",
  },
  "ai-seo": {
    summary: "SEO, 요즘 너도나도 한다는데 어떻게 해야하는지 막막했던 분들을 위한 실전 사례 및 노하우를 공유합니다. SEO의 두 축인 테크니컬 SEO, 콘텐츠 SEO의 핵심만 꾹꾹 눌러 담았어요. 비개발자도 충분히 가능합니다.",
    curriculum: [],
    target: ["SEO에 관심은 있지만 잘 모르겠는 분", "SEO를 담당해야하는 마케터", "페이드마케팅 성과 저하로 고민하는 분", "0원으로 잠재고객 유입시키고 싶은 분"],
    benefits: ["공유회 VOD 녹화본 제공", "AI&SEO 비법 자료집 제공"],
    faq: [],
    speakers: [{ name: "콜", desc: "SEO, 웹플로우 전문가. 6개월만에 MAU 13만에서 22만 달성한 AI 노코드 SEO의 비밀을 공유합니다." }],
    images: ["/images/program-images/ai-seo.png"],
    reviewKey: "",
  },
  "ai-chal": {
    summary: "챗GPT + Lily.AI로 빠르게 블로그 글 발행하기, GPTs + Suno로 나만의 콘텐츠를 빛내줄 BGM 만들기 등 AI로 나만의 콘텐츠를 뽑는 찐 사례를 공유합니다. AI 잘 쓰는 법이 아니라, 실무에서 바로 적용할 수 있는 실전 활용법입니다.",
    curriculum: [],
    target: ["AI를 써보고 싶은데 어떻게 시작해야할지 모르는 사람", "ChatGPT 사용은 해봤지만 다양한 활용법이 궁금한 사람", "생성형 AI로 콘텐츠 만들고 싶은 사람", "AI 활용해서 업무 속도와 퀄리티 업그레이드 하고 싶은 사람"],
    benefits: ["공유회 다시보기 VOD 및 요약본 제공", "AI 마케팅 실무 커뮤니티 초대"],
    faq: [],
    speakers: [{ name: "AI 마케팅 크루", desc: "브랜딩부터 마케팅까지 생성형 AI를 실무에 적용한 크루들이 찐 사례를 공유합니다." }],
    images: ["/images/program-images/ai-chal.png"],
    reviewKey: "",
  },
  "aimkt": {
    summary: "마케팅을 하면서 겪었던 여러가지 고민들, 이제 AI로 해결해드릴게요! 나만의 AI마케팅 군단이 브랜딩부터 패키지 디자인, 광고 소재까지 마케팅의 A to Z를 책임집니다. '나도 할 수 있겠다'는 자신감을 얻게 될 거예요.",
    curriculum: [],
    target: ["실제 활용가능한 마케팅소재를 AI로 만들고 싶은 분", "고객접점에 있는 모든 콘텐츠를 AI를 통해 만들어 보고 싶은 분", "AI가 마케팅에 미칠 영향이 궁금한 분들", "AI로 트렌디한 마케팅 전략을 적용하고 싶은 분들"],
    benefits: ["라이브 참여자 모두에게 공유회 VOD 제공"],
    faq: [],
    speakers: [{ name: "젬마", desc: "셀피쉬클럽 마스터이자 AI마케팅디렉터. 10년간 스타트업 마케팅 경험을 바탕으로 AI 실전 사례를 공유합니다." }],
    images: ["/images/program-images/aimkt.png"],
    reviewKey: "",
  },
  "seminar-yusagil": {
    summary: "언젠가 나만의 공간을 운영하고 싶다는 로망, 한 번쯤 꿈꿔보셨죠? 바 창업이라고 하면 막연한 걱정들로 가득 차게 됩니다. 바에 대해 아무것도 몰랐던 IT업계 출신이 부업으로 혼술바를 창업한 과정을 모두 공유합니다.",
    curriculum: [],
    target: ["아직 뭔지 모르겠지만 언젠가 새로운 시도를 해보고 싶은 사람", "나만의 공간을 운영하고 싶은 사람", "위스키바나 커뮤니티 운영에 관심있는 사람", "소자본으로 부업을 시작하고 싶은 사람"],
    benefits: ["혼술바 창업 체크리스트 템플릿 공유", "모던그로스스택 2024 입장티켓 증정"],
    faq: [],
    speakers: [{ name: "하니", desc: "IT 스타트업을 대차게 말아먹고, 냅다 제주도 게스트하우스와 혼술바를 창업하고 운영 중." }],
    images: ["/images/program-images/seminar-yusagil.png"],
    reviewKey: "",
  },
};

async function getProgram(slug: string) {
  const { data } = await supabase
    .from("item")
    .select("*")
    .eq("i_formid_webflow", slug)
    .order("ID", { ascending: false })
    .limit(1);
  return data?.[0] ?? null;
}

async function getReviews(programName: string) {
  if (!programName) return [];
  const { data } = await supabase
    .from("reviews")
    .select("name, rating, one_liner, program_type, created_at")
    .eq("program_name", programName)
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

function isPast(dateStr: string | null): boolean {
  if (!dateStr) return false;
  // 행사 당일 끝(KST 23:59:59)까지는 종료 아님
  // "2026-04-30" → KST 다음날 00:00 = UTC 당일 15:00
  const [y, m, d] = dateStr.split("-").map(Number);
  const endKST = new Date(Date.UTC(y, m - 1, d, 15, 0, 0)); // KST 다음날 0시 = UTC 15시
  return new Date() >= endKST;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-[#E2E545] text-sm tracking-wider">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

export default async function SharingDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getProgram(slug);

  if (!item) notFound();

  const displayTitle = item.i_title_userside || item.i_title;
  const isPaid = item.i_paid_tf;
  const price = item.i_price ?? 0;
  const detail = DETAIL_DATA[slug];
  const heroImage = detail?.images?.[0];
  const past = isPast(item.i_eventdate);

  const reviews = detail?.reviewKey ? await getReviews(detail.reviewKey) : [];
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <Header />
      <main className="pt-14">
        {/* 히어로 — 이미지 + 딤 + 타이틀 */}
        <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-end overflow-hidden">
          {heroImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#0A0A0A]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />

          <div className="relative max-w-[1400px] mx-auto px-5 lg:px-10 py-12 lg:py-16 w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] text-[#E2E545] tracking-[0.3em] uppercase font-medium">
                {item.i_type}
              </span>
              <span className="text-[11px] text-white/30">·</span>
              <span className="text-[11px] text-white/30">
                {isPaid ? `${price.toLocaleString()}원` : "무료"}
              </span>
              {past && (
                <>
                  <span className="text-[11px] text-white/30">·</span>
                  <span className="text-[11px] text-white/40">종료됨</span>
                </>
              )}
            </div>
            <h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
              {displayTitle}
            </h1>
            {item.i_eventdate && (
              <p className="text-white/40 text-sm lg:text-base">
                {item.i_full_schedule || item.i_eventdate}
              </p>
            )}
            {detail && (
              <p className="text-white/50 text-sm lg:text-base mt-4 max-w-xl leading-relaxed">
                {detail.summary}
              </p>
            )}
          </div>
        </section>

        {/* 본문 */}
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-10 py-12 lg:py-20 space-y-14">

            {/* 리뷰 — 지난 프로그램은 상단 */}
            {past && reviews.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase">Reviews</p>
                  {avgRating && (
                    <span className="text-sm text-[#E2E545] font-semibold">
                      ★ {avgRating} ({reviews.length})
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">참여자 후기</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {reviews.map((r) => (
                    <div key={r.name + r.created_at} className="bg-[#FAFAF8] rounded-lg p-5 border border-[#E5E5E5]/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#0A0A0A]">
                          {r.name.charAt(0)}{"○".repeat(r.name.length - 1)}
                        </span>
                        <Stars rating={r.rating} />
                      </div>
                      {r.one_liner && (
                        <p className="text-sm text-[#666] leading-relaxed line-clamp-3">
                          &ldquo;{r.one_liner.replace(/\n/g, " ").trim()}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 커리큘럼 */}
            {detail?.curriculum && (
              <div>
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">Curriculum</p>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-8">커리큘럼</h2>
                <div className="space-y-8">
                  {detail.curriculum.map((section, i) => (
                    <div key={i} className="border-l-2 border-[#E2E545] pl-6">
                      <h3 className="text-base font-semibold text-[#0A0A0A] mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="text-sm text-[#666] flex items-start gap-2">
                            <span className="text-[#E2E545] mt-0.5 shrink-0">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 추천 대상 */}
            {detail?.target && (
              <div>
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">Who is this for</p>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">이런 분께 추천해요</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.target.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#FAFAF8] rounded-lg p-4">
                      <span className="text-[#E2E545] font-bold text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-sm text-[#444]">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 공유자 */}
            {detail?.speakers && (
              <div>
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">Speakers</p>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">공유자</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detail.speakers.map((s, i) => (
                    <div key={i} className="border border-[#E5E5E5] rounded-lg p-5">
                      <p className="font-semibold text-[#0A0A0A] mb-2">{s.name}</p>
                      <p className="text-sm text-[#888] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 혜택 */}
            {detail?.benefits && (
              <div>
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">Benefits</p>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">참여 혜택</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#0A0A0A] text-white rounded-lg p-4">
                      <span className="text-[#E2E545] text-lg">✓</span>
                      <p className="text-sm">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VOD */}
            {item.i_vodurl && (
              <div className="bg-[#FAFAF8] rounded-lg p-6 border border-[#E5E5E5]">
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-2">VOD Available</p>
                <p className="font-semibold text-[#0A0A0A] mb-3">다시보기 VOD가 준비되어 있어요</p>
                <a
                  href={item.i_vodurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm text-[#0A0A0A] bg-[#E2E545] font-semibold px-5 py-2.5 rounded hover:bg-[#CDD03B] transition-colors"
                >
                  VOD 보러가기
                </a>
              </div>
            )}

            {/* FAQ */}
            {detail?.faq && (
              <div>
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">FAQ</p>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">자주 묻는 질문</h2>
                <div className="space-y-4">
                  {detail.faq.map((f, i) => (
                    <div key={i} className="border-b border-[#E5E5E5] pb-4">
                      <p className="font-semibold text-[#0A0A0A] mb-2">Q. {f.q}</p>
                      <p className="text-sm text-[#666] leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 프로그램 정보 요약 */}
            <div className="bg-[#FAFAF8] rounded-lg p-6 border border-[#E5E5E5]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-[#888] mb-1">유형</p>
                  <p className="font-medium">{item.i_type}</p>
                </div>
                <div>
                  <p className="text-[#888] mb-1">가격</p>
                  <p className="font-medium">{isPaid ? `${price.toLocaleString()}원` : "무료"}</p>
                </div>
                {item.i_eventdate && (
                  <div>
                    <p className="text-[#888] mb-1">행사 날짜</p>
                    <p className="font-medium">{item.i_eventdate}</p>
                  </div>
                )}
                {item.i_event_count > 0 && (
                  <div>
                    <p className="text-[#888] mb-1">참여자</p>
                    <p className="font-medium">{item.i_event_count}명</p>
                  </div>
                )}
              </div>
            </div>

            {/* 신청 CTA */}
            {!past && isPaid && (
              <div className="sticky bottom-6">
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{price.toLocaleString()}원</p>
                    <p className="text-sm text-[#888]">{displayTitle}</p>
                  </div>
                  <PurchaseButton
                    itemId={item.iid}
                    slug={slug}
                    title={displayTitle}
                    price={price}
                    isPaid={isPaid}
                  />
                </div>
              </div>
            )}

            {/* 리뷰 — 진행 중 프로그램은 하단 */}
            {!past && reviews.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase">Reviews</p>
                  {avgRating && (
                    <span className="text-sm text-[#E2E545] font-semibold">
                      ★ {avgRating} ({reviews.length})
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">참여자 후기</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {reviews.map((r) => (
                    <div key={r.name + r.created_at} className="bg-[#FAFAF8] rounded-lg p-5 border border-[#E5E5E5]/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#0A0A0A]">
                          {r.name.charAt(0)}{"○".repeat(r.name.length - 1)}
                        </span>
                        <Stars rating={r.rating} />
                      </div>
                      {r.one_liner && (
                        <p className="text-sm text-[#666] leading-relaxed line-clamp-3">
                          &ldquo;{r.one_liner.replace(/\n/g, " ").trim()}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
