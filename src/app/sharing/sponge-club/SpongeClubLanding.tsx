"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

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

function StaggerText({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.split("\n");
  let charIndex = 0;
  return (
    <span className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx}>
          {lineIdx > 0 && <br />}
          {line.split("").map((char) => {
            const idx = charIndex++;
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.03 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/* ─── 그라데이션 구분선 ─── */
function SectionDivider({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="h-24 sm:h-32 lg:h-40"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}

/* ─── 하이라이트 텍스트 렌더링 ─── */
function HighlightedText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(<hl>.*?<\/hl>)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("<hl>") && part.endsWith("</hl>")) {
          const inner = part.slice(4, -5);
          return (
            <span key={i} className="font-bold" style={{ backgroundImage: "linear-gradient(to top, rgba(226,229,69,0.25) 40%, transparent 40%)" }}>
              {inner}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/* ─── 데이터 ─── */
const SPEAKERS = [
  { initial: "G", name: "젬마", avatar: "/images/speakers/젬마.png", role: "Creator · Vision Holder", title: "AAA 6주의 기록 —\n우리가 증명하려 했던 것", desc: "<hl>AI 교육이 아닌 AI 빌딩.</hl>\n팀 양성 6주 동안 무엇이 작동했고, 무엇이 바뀌었는지.\n그리고 이 경험이 만들어낼 다음 챕터.", image: "/images/sessions/젬마.png", part: 1 },
  { initial: "D", name: "다다", avatar: "/images/speakers/다다.png", role: "PM · AAA팀 리더", title: "옵시디언+깃헙+클로드코드로\n4주만에 만든 웹페이지", desc: "에밀리가 만든 CRM 자동화, 흐민이 만든 Sullivan,\n띵크의 5개 에이전트 동시 투입 —\n우리끼리만 알기엔 너무 아까운 것들.\n\n<hl>\"잠깐, 이거 우리만 보기 아깝지 않아?\"</hl>\n\n자랑하고 싶고, 외부에 보여주고 싶었지만\n노션 링크 공유는 좀...\n<hl>그래서 우리만의 웹사이트를 직접 만들었습니다.</hl>", image: "/images/sessions/다다.png", part: 2 },
  { initial: "Da", name: "다니", avatar: "/images/speakers/다니.png", role: "Contents · Marketing", title: "이미지부터 캐러셀, 영상까지 —\n마케터가 직접 만든 콘텐츠 자동화 OS", desc: "<hl>피그마 없이, 코드도 모르는 마케터</hl>가 Claude Code로\n인스타 캐러셀 자동 생성 에디터,\nURL 하나로 캐러셀+스레드+링크드인 동시 생성기,\n터미널에서 영상까지 만드는 시스템을 직접 만들었습니다.\n\n\"AI 잘 쓰는 법\"이 아니라,\n<hl>실무에서 매일 쓰는 나만의 콘텐츠 OS</hl>를 만든\n과정과 삽질 이야기를 공유합니다.", image: "/images/sessions/다니.gif", part: 2 },
  { initial: "H", name: "흐민", avatar: "/images/speakers/흐민.png", role: "AI Thinking Partner", title: "내 옆에 두는 AI —\n생각을 확장하고 질문을 깊게 만드는 법", desc: "<hl>답을 찾는 도구가 아니라,</hl>\n더 좋은 질문을 하게 도와주는 존재로.", image: "/images/sessions/흐민.png", part: 2 },
  { initial: "V", name: "비비안", avatar: "/images/speakers/비비안.png", role: "Operations · AX Design", title: "셀피쉬클럽 AX 프로젝트 대시보드 —\n조직의 AI 전환을 눈에 보이게", desc: "우리 팀의 <hl>AI 도입 현황을 한눈에</hl> 볼 수 있는\n대시보드를 직접 만들었습니다.", image: "/images/sessions/비비안.png", part: 3, group: "internal" as const },
  { initial: "E", name: "에밀리", avatar: "/images/speakers/에밀리.png", role: "CRM · Member Relations", title: "고객과의 관계를\n자동으로 이어가는 CRM 시스템 구축기", desc: "멤버가 늘어날수록 관계 관리는 복잡해집니다.\n<hl>AI로 CRM을 직접 설계하고 연동해본 경험.</hl>", image: "/images/sessions/에밀리.png", part: 3, group: "internal" as const },
  { initial: "O", name: "오웬", avatar: "/images/speakers/오웬.png", role: "Platform Builder", title: "회사를 벗어나 AI 솔로프리너로 :\n나만의 '무한 성장 비즈니스 생태계' 구축기", desc: "13년 실무 경험을 바탕으로\n<hl>시장의 반복적인 비효율을 발견</hl>하고,\nAI를 역할별 팀처럼 운영하며\n찜마켓이라는 실제 서비스를 빠르게 출시한 과정을 공유합니다.\n\n<hl>병렬 실행, 이기적 공유, 사람이 개입하는 팀 구조</hl>가\nAI 시대에 더 중요해졌는지를\n실제 사례 중심으로 보여줍니다.", image: "/images/sessions/오웬.png", part: 3, group: "external" as const },
  { initial: "T", name: "띵크", avatar: "/images/speakers/띵크.png", role: "Workflow Architect", title: "결제·예약·CRM·광고·워크플로우를\n하나로 잇는 통합 대시보드", desc: "<hl>흩어진 비즈니스 도구들을</hl>\n하나의 화면으로 통합하는 것.", image: "", part: 3, group: "external" as const },
];

const AGENDA_PARTS = [
  { num: "PART 01", title: "AAA, 그리고 앞으로의 이야기", subtitle: "젬마 · 오프닝 세션", desc: "AAA팀은 왜 만들어졌을까요.\n셀피쉬클럽 내부에서 시작된 <hl>작은 실험</hl>이\n6주 동안 어떻게 진화했는지,\n그리고 이 경험이 앞으로 어떤 커뮤니티로 이어질지 —\n젬마가 직접 이야기합니다." },
  { num: "PART 02", title: "나를 위한 OS를 만들기", subtitle: "내 일하는 방식 자체를 AI로 다시 설계한 이야기", desc: "거창한 프로덕트가 아닙니다.\n내가 매일 하는 일, 내가 매번 막히던 지점 —\n거기서 시작한 세 사람의 이야기입니다.\n\n<hl>\"나도 이렇게 해볼 수 있겠다\"</hl>는 생각이 드는 게\n이 파트의 목표입니다." },
  { num: "PART 03", title: "고객을 위한 Product를 만들기", subtitle: "실제 유저가 쓰는 것을 Claude Code로 직접 개발한 이야기", desc: "<hl>\"코딩 몰라도 만들 수 있어\"</hl>라는 말이\n실제로 가능한지 — 이 파트가 그 증거입니다.\n\n각자 다른 문제를 풀기 위해 시작한\n4개의 실전 프로덕트,\n그 과정에서 배운 것들을 공유합니다." },
];

const TIMETABLE = [
  { time: "21:00", title: "오프닝 & 젬마 세션", note: "PART 1 — AAA의 탄생과 6주간의 여정" },
  { time: "", title: "나를 위한 OS 만들기", note: "PART 2 — 다다 · 다니 · 흐민" },
  { time: "", title: "고객을 위한 Product 만들기", note: "PART 3 — 비비안 · 에밀리 · 오웬 · 띵크" },
  { time: "", title: "Q&A + 다음 이야기 예고", note: "자유 질문 · SXXXXX CLUB 모집 예고" },
  { time: "", title: "종료", note: "참가자 전원 공유 자료 이메일 발송" },
];

const WHO_CARDS = [
  { icon: "01", title: "AI를 '써봤다'에서 끝난 사람", desc: "ChatGPT는 쓰는데, 뭔가 만들어봤다는 느낌이 없는. 이 공유회는 그 다음 단계입니다." },
  { icon: "02", title: "직무 경계가 사라지는 게 불안한 사람", desc: "마케터인데 개발자 영역까지 침범하고 싶다면. AAA팀이 그 답입니다." },
  { icon: "03", title: "사이드 프로젝트를 현실화하고 싶은 사람", desc: "아이디어는 있는데 실행이 안 된 것들. 어떻게 시작하는지 보고 싶은 사람." },
  { icon: "04", title: "같은 결의 사람들을 만나고 싶은 사람", desc: "AI와 비즈니스를 함께 고민할 동료가 필요한 마케터·실무자." },
];

const CREW_COMMENTS = [
  { name: "오웬", avatar: "/images/speakers/오웬.png", comment: "내가 먼저 배우고 부딪히며 얻은 것들을\n아낌없이 나눠드릴게요.\n\n아마 이런 고민, 한 번쯤 해보셨을 거예요.\nAI를 많이 들어봤는데 막상 내 일에는 어떻게 붙여야 할지,\n혼자 해보려니 어디서부터 시작해야 할지 막막했던 순간들요.\n\n이번 발표는 그런 고민에서 출발해,\n실제로 문제를 발견하고 서비스로 만들기까지의\n과정을 함께 나누는 시간입니다." },
  { name: "젬마", avatar: "/images/speakers/젬마.png", comment: "" },
  { name: "다다", avatar: "/images/speakers/다다.png", comment: "개인이나 팀이 공들여 쌓은 기록들,\n그냥 노션에만 잠자게 두기엔 너무 아깝지 않나요?\n\n이제 그 흩어진 데이터들을\nClaude Code가 가장 잘 읽을 수 있는 형태로 변환해서\n완전히 새롭게 재가공해 보세요!\n\n우리만의 아카이브를 단순히 '보관용'이 아니라,\nAI가 언제든 꺼내 쓸 수 있는\n'살아있는 자산'으로 만드는 법을 공유해 드릴게요." },
  { name: "다니", avatar: "/images/speakers/다니.png", comment: "내가 실무에 바로 쓸 수 있는\n서비스와 시스템을 만들려면 어떤 부분이 중요한지,\n삽질한 과정과 실제 결과물을 함께 공유합니다." },
  { name: "흐민", avatar: "/images/speakers/흐민.png", comment: "" },
  { name: "비비안", avatar: "/images/speakers/비비안.png", comment: "" },
  { name: "에밀리", avatar: "/images/speakers/에밀리.png", comment: "" },
  { name: "띵크", avatar: "/images/speakers/띵크.png", comment: "" },
];

const JOB_OPTIONS = ["마케터 / 콘텐츠 담당자", "비즈니스 / 기획", "개발 / 디자인", "사이드 프로젝트 운영 중", "기타"];

/* ─── 배경 색상 ─── */
const BG = {
  dark: "#000000",
  mid: "#0e0d0b",
  accent: "#161510",
};

/* ─── 스피커 카드 ─── */
function SpeakerCard({ speaker, delay }: { speaker: (typeof SPEAKERS)[0]; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div>
        {/* 카드 본문 */}
        <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-lg">
          {/* 프로필 사진 — 좌측, 카드 위로 살짝 삐져나옴 */}
          <div className="absolute left-5 sm:left-6 top-[-24px] sm:top-[-28px] z-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white/5 border-3 border-[#000]">
              {speaker.avatar ? (
                <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg text-[#E2E545] font-mono">{speaker.initial}</div>
              )}
            </div>
          </div>
          <div className="p-5 sm:p-6 pt-24 sm:pt-28">
            {/* 공유자 + 닉네임 — 우측 상단 */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5">
                <span className="text-xs text-white/40">공유자</span>
                <span className="text-sm font-bold text-white">{speaker.name}</span>
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white mb-4 leading-snug whitespace-pre-line">
              {speaker.title}
            </p>
            <p className="text-base sm:text-lg text-white leading-[2] whitespace-pre-line"><HighlightedText text={speaker.desc} /></p>
          </div>

          {/* 세션 이미지 */}
          {speaker.image ? (
            <div className="aspect-[16/9] overflow-hidden">
              <img src={speaker.image} alt={`${speaker.name} 세션`} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[16/9] bg-white/[0.02] flex items-center justify-center">
              <span className="text-white/10 text-xs font-mono">SESSION IMAGE</span>
            </div>
          )}
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── 메인 컴포넌트 ─── */
export function SpongeClubLanding({ item }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const registerRef = useRef<HTMLDivElement>(null);
  const isRegisterVisible = useInView(registerRef, { margin: "0px" });

  return (
    <>
      {/* ═══ HERO (다크) ═══ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: BG.dark }}
      >
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#000] via-[#050505] to-[#000]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2E545]/5 rounded-full blur-[120px]" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10">
          {/* 타이틀 */}
          <div className="text-center px-5 pt-32 sm:pt-40 lg:pt-48 pb-10 sm:pb-14">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-4">
              <StaggerText text={"무료 공유회"} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
            >
              우리가 일하는 방식을 바꾼 6주
            </motion.p>
          </div>

          {/* GIF */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full max-w-md sm:max-w-lg mx-auto px-5"
          >
            <img
              src="/images/sponge-club-kv.gif"
              alt="AAA"
              className="w-full h-auto block"
              style={{
                mask: "radial-gradient(ellipse at center, black 45%, transparent 72%)",
                WebkitMask: "radial-gradient(ellipse at center, black 45%, transparent 72%)",
              }}
            />
          </motion.div>

          {/* 서브카피 + 메타 */}
          <div className="text-center px-5 pt-8 sm:pt-12 pb-10 sm:pb-14 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="mb-14 lg:mb-20">
              <p className="text-lg sm:text-xl text-white/50 mb-3">
                Selfish Club AX PROJECT
              </p>
              <p className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white leading-snug max-w-2xl mx-auto">
                스스로를 에이전틱하게 바꾼 이야기
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }} className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto mb-16 lg:mb-20">
              {[
                { label: "Date", value: "4월 28일 (월) 21:00" },
                { label: "Format", value: "Zoom · 무료" },
                { label: "Duration", value: "120분+" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.06] border border-white/[0.08] rounded-lg p-4 sm:p-5 text-center">
                  <p className="text-[10px] sm:text-xs text-white/30 tracking-[0.15em] uppercase font-mono mb-2">{item.label}</p>
                  <p className="text-base sm:text-lg font-bold text-white">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* 스크롤 화살표 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto text-white/30">
                  <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* 구분선 */}
          <div className="max-w-3xl mx-auto px-5">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="h-16 sm:h-20" />
        </motion.div>
      </section>

      {/* ═══ 그라데이션 전환 ═══ */}
      <SectionDivider from={BG.dark} to={BG.mid} />

      {/* ═══ 인트로 (미드 다크) ═══ */}
      <section style={{ background: BG.mid }} className="py-16 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <div className="border-l-2 border-[#E2E545]/60 pl-6 sm:pl-8">
              <p className="text-lg sm:text-xl text-white/50 leading-[2]">
                AI를 배웠다고 해서 뭔가 달라지지 않습니다.
                <br />
                <strong className="text-white/80 font-medium">
                  직접 만들고, 실제로 써보고, 고객 앞에 내놓아야
                </strong>{" "}
                비로소 무기가 됩니다.
              </p>
              <p className="text-lg sm:text-xl text-white/50 leading-[2] mt-8">
                AAA팀은 지난 6주 동안 그 과정을 온몸으로 통과했습니다.
                <br />
                막힌 것도, 틀린 것도, 결국 뚫어낸 것도 —
                <br />
                오는 4월 28일, 있는 그대로 공유합니다.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <SectionDivider from={BG.mid} to={BG.dark} />

      {/* ═══ AGENDA (다크) ═══ */}
      <section id="agenda" className="relative overflow-hidden py-24 lg:py-40" style={{ background: BG.dark }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E2E545]/3 rounded-full blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <p className="text-xs text-[#E2E545] tracking-[0.3em] uppercase font-mono mb-5">
              Agenda
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-16 lg:mb-24">
              공유회에서 다룰 것들
            </h2>
          </FadeUp>

          {AGENDA_PARTS.map((part, partIdx) => {
            const partSpeakers = SPEAKERS.filter((s) => s.part === partIdx + 1);
            const internalSpeakers = partSpeakers.filter((s) => s.group === "internal");
            const externalSpeakers = partSpeakers.filter((s) => s.group === "external");
            const ungrouped = partSpeakers.filter((s) => !s.group);

            return (
              <FadeUp key={part.num}>
                <div className={`${partIdx < AGENDA_PARTS.length - 1 ? "mb-24 pb-24 border-b border-white/5" : ""}`}>
                  {/* 파트 번호 */}
                  <span className="text-base sm:text-lg text-[#E2E545] tracking-[0.15em] font-mono bg-[#E2E545]/10 border border-[#E2E545]/20 px-4 py-2 rounded inline-block mb-6">
                    {part.num}
                  </span>

                  {/* 파트 타이틀 */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E2E545] leading-snug mb-3">
                    {part.title}
                  </h3>
                  <p className="text-base text-white/30 mb-8">{part.subtitle}</p>

                  {/* 파트 설명 */}
                  <p className="text-lg text-white/50 leading-[2] mb-12 whitespace-pre-line">
                    <HighlightedText text={part.desc} />
                  </p>

                  {/* 스피커 카드 */}
                  {ungrouped.length > 0 && (
                    <div className="space-y-32">
                      {ungrouped.map((s, i) => (
                        <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                      ))}
                    </div>
                  )}

                  {ungrouped.length > 0 && (internalSpeakers.length > 0 || externalSpeakers.length > 0) && (
                    <div className="h-32" />
                  )}
                  {internalSpeakers.length > 0 && (
                    <div className="space-y-32">
                      {internalSpeakers.map((s, i) => (
                        <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                      ))}
                    </div>
                  )}

                  {externalSpeakers.length > 0 && internalSpeakers.length > 0 && (
                    <div className="h-32" />
                  )}
                  {externalSpeakers.length > 0 && (
                    <div className="space-y-32">
                      {externalSpeakers.map((s, i) => (
                        <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <SectionDivider from={BG.dark} to={BG.accent} />

      {/* ═══ 이런 분께 추천 (액센트 다크) ═══ */}
      <section style={{ background: BG.accent }} className="py-24 lg:py-40">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <p className="text-xs text-[#E2E545]/60 tracking-[0.3em] uppercase mb-5">
              Who is this for
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-14">
              이 공유회가 필요한 사람
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHO_CARDS.map((card, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 sm:p-7 h-full">
                  <span className="text-[#E2E545] font-bold text-xl inline-block mb-3">
                    {card.icon}
                  </span>
                  <p className="text-lg font-semibold text-white mb-3">{card.title}</p>
                  <p className="text-base text-white/40 leading-relaxed">{card.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from={BG.accent} to={BG.dark} />

      {/* ═══ 크루들이 추천하는 이유 (말풍선) ═══ */}
      <section style={{ background: BG.dark }} className="py-24 lg:py-40">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <p className="text-xs text-[#E2E545] tracking-[0.3em] uppercase font-mono mb-5">
              From the crew
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E2E545] leading-tight mb-16">
              크루들이 이 공유회를<br />추천하는 이유
            </h2>
          </FadeUp>

          <div className="space-y-10">
            {CREW_COMMENTS.filter((c) => c.comment).map((crew, i) => {
              const isRight = i % 2 === 1;
              return (
              <FadeUp key={crew.name} delay={i * 0.1}>
                <div className={`flex items-start gap-4 ${isRight ? "flex-row-reverse" : ""}`}>
                  {/* 프로필 */}
                  <div className="shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-white/5">
                      <img src={crew.avatar} alt={crew.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs font-medium text-white/50 text-center mt-1.5">{crew.name}</p>
                  </div>
                  {/* 말풍선 */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className={`relative bg-[#E8E8E3] rounded-2xl px-5 py-4 sm:px-6 sm:py-5 ${isRight ? "rounded-tr-sm" : "rounded-tl-sm"}`}>
                      {/* 꼬리 */}
                      {isRight ? (
                        <div className="absolute right-[-8px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#E8E8E3]" />
                      ) : (
                        <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[#E8E8E3]" />
                      )}
                      <p className="text-base sm:text-lg text-[#1a1a1a] leading-[1.9] whitespace-pre-line">
                        {crew.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider from={BG.dark} to={BG.dark} />

      {/* ═══ 타임테이블 (다크) ═══ */}
      <section className="relative overflow-hidden py-24 lg:py-40" style={{ background: BG.dark }}>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E2E545]/3 rounded-full blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <p className="text-xs text-[#E2E545] tracking-[0.3em] uppercase font-mono mb-5">
              Timetable
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-14">
              당일 진행 순서
            </h2>
          </FadeUp>

          <div className="divide-y divide-white/5">
            {TIMETABLE.map((row, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[110px_1fr] gap-4 sm:gap-8 py-6 sm:py-7">
                  <span className="text-base text-[#E2E545] font-mono pt-0.5">
                    {row.time}
                  </span>
                  <div>
                    <p className="text-lg font-medium text-white mb-1">{row.title}</p>
                    <p className="text-base text-white/30">{row.note}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 스폰지클럽 티저 ═══ */}
      <section style={{ background: "#000000" }} className="py-24 lg:py-40">
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <FadeUp>
            <p className="text-xs text-[#E2E545]/60 tracking-[0.3em] uppercase mb-5">
              Coming Soon
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8">
              SXXXXX CLUB
            </h2>

            <div className="max-w-xs sm:max-w-sm mx-auto mb-10">
              <img
                src="/images/sponge-club-teaser.png"
                alt="SXXXXX CLUB"
                className="w-full h-auto rounded-lg"
              />
            </div>

            <p className="text-lg sm:text-xl text-white/40 leading-relaxed max-w-xl mx-auto mb-14">
              AAA 팀 8명의 6주 경험이 토대가 된,
              <br />
              AI 에이전트 풀사이클 빌딩 커뮤니티.
              <br />
              <span className="text-white/70 font-medium">이 공유회가 그 시작입니다.</span>
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { step: "01", word: "Absorb", ko: "흡수" },
              { step: "02", word: "Compress", ko: "압축" },
              { step: "03", word: "Release", ko: "방출" },
              { step: "04", word: "React", ko: "반응" },
            ].map((card, i) => (
              <FadeUp key={card.step} delay={i * 0.1}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 sm:p-6">
                  <p className="text-[11px] text-[#E2E545]/50 tracking-wider mb-3 font-mono">
                    {card.step}
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-white mb-1">
                    {card.word}
                  </p>
                  <p className="text-sm text-white/30">{card.ko}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 신청 폼 (포인트 컬러 배경) ═══ */}
      <section ref={registerRef} id="register" className="py-24 lg:py-40 bg-[#E2E545]">
        <div className="max-w-lg mx-auto px-5 lg:px-10">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-xs text-[#0A0A0A]/40 tracking-[0.3em] uppercase font-mono mb-5">
                무료 · 온라인 · 선착순
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-6">
                4월 28일,
                <br />
                함께하세요
              </h2>
              <p className="text-base text-[#0A0A0A]/50 leading-relaxed">
                신청 후 <span className="text-[#0A0A0A]/70 font-medium">이메일로 Zoom 링크</span>를 보내드립니다.
                <br />
                당일 공유 자료는 참가자 전원에게 발송됩니다.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            {!formSubmitted ? (
              <form
                onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                className="space-y-3"
              >
                <input type="text" required placeholder="이름" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors" />
                <input type="email" required placeholder="이메일" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors" />
                <select defaultValue="" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors appearance-none">
                  <option value="" disabled>직군 선택</option>
                  {JOB_OPTIONS.map((opt) => (<option key={opt} value={opt} className="bg-white text-[#0A0A0A]">{opt}</option>))}
                </select>
                <input type="text" placeholder="이 공유회에서 가장 듣고 싶은 것 (선택)" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors" />
                <button type="submit" className="w-full bg-[#0A0A0A] text-[#E2E545] font-bold text-base py-4 rounded hover:bg-[#1a1a1a] transition-all duration-300 mt-3">
                  무료로 신청하기
                </button>
                <div className="flex justify-center gap-3 pt-3">
                  <a href="https://sepia-quartz-81f.notion.site/22b5c0a046468081b11cc019c2f558a4?pvs=74" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#0A0A0A]/20 underline">이용약관</a>
                  <a href="https://sepia-quartz-81f.notion.site/22b5c0a0464680528d1ffb54dfd7eaeb" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#0A0A0A]/20 underline">개인정보처리방침</a>
                </div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-10 text-center">
                <p className="text-[#0A0A0A] font-medium text-lg mb-3">신청이 완료됐습니다!</p>
                <p className="text-base text-[#0A0A0A]/50 leading-relaxed">Zoom 링크는 행사 전날 이메일로 보내드릴게요.</p>
              </motion.div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ── 플로팅 CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-5">
        <div className="max-w-lg mx-auto">
          <a
            href="#register"
            className={`block w-full font-bold text-base text-center py-4 rounded-full transition-colors duration-300 ${
              isRegisterVisible
                ? "bg-[#0A0A0A] text-[#E2E545]"
                : "bg-[#E2E545] text-[#0A0A0A]"
            }`}
          >
            무료 신청하기
          </a>
        </div>
      </div>
    </>
  );
}
