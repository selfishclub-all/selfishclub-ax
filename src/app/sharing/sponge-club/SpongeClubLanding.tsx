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

/* ─── 데이터 ─── */
const SPEAKERS = [
  { initial: "G", name: "젬마 (신주혜)", role: "Creator · Vision Holder", title: "AAA 6주의 기록 — 우리가 증명하려 했던 것", desc: "AI 교육이 아닌 AI 빌딩. 팀 양성 6주 동안 무엇이 작동했고, 무엇이 바뀌었는지. 그리고 이 경험이 만들어낼 다음 챕터.", image: "", part: 1 },
  { initial: "D", name: "다다 (김다솔)", role: "PM · AAA팀 리더", title: "팀의 과정을 기록하고, 세상에 드러내는 PM의 AI 활용법", desc: "6주 동안 팀을 이끌면서 마주친 것들을 Claude로 어떻게 정리하고 외부에 알렸는지.", image: "", part: 2 },
  { initial: "Da", name: "다니 (송다은)", role: "Contents · Marketing", title: "AI 영상 제작으로 콘텐츠 마케터에 슈퍼파워 달기", desc: "촬영 없이, 편집 전문가 없이. AI 툴로 영상을 냅다 만들어본 6주.", image: "", part: 2 },
  { initial: "H", name: "흐민 (김현민)", role: "AI Thinking Partner", title: "내 옆에 두는 AI — 생각을 확장하고 질문을 깊게 만드는 법", desc: "답을 찾는 도구가 아니라, 더 좋은 질문을 하게 도와주는 존재로.", image: "", part: 2 },
  { initial: "V", name: "비비안 (박정은)", role: "Operations · AX Design", title: "셀피쉬클럽 AX 프로젝트 대시보드 — 조직의 AI 전환을 눈에 보이게", desc: "우리 팀의 AI 도입 현황을 한눈에 볼 수 있는 대시보드를 직접 만들었습니다.", image: "", part: 3, group: "internal" as const },
  { initial: "E", name: "에밀리 (문주희)", role: "CRM · Member Relations", title: "고객과의 관계를 자동으로 이어가는 CRM 시스템 구축기", desc: "멤버가 늘어날수록 관계 관리는 복잡해집니다. AI로 CRM을 직접 설계하고 연동해본 경험.", image: "", part: 3, group: "internal" as const },
  { initial: "O", name: "오웬 (성현)", role: "Platform Builder", title: "셀러들의 상부상조를 위한 안전 맞찜 플랫폼", desc: "아이디어에서 실제 플랫폼까지 — Claude Code로 혼자 만들어낸 과정.", image: "", part: 3, group: "external" as const },
  { initial: "T", name: "띵크", role: "Workflow Architect", title: "결제·예약·CRM·광고·워크플로우를 하나로 잇는 통합 대시보드", desc: "흩어진 비즈니스 도구들을 하나의 화면으로 통합하는 것.", image: "", part: 3, group: "external" as const },
];

const AGENDA_PARTS = [
  { num: "PART 01", title: "AAA, 그리고 앞으로의 이야기", subtitle: "젬마(신주혜) · 오프닝 세션", desc: "AAA팀은 왜 만들어졌을까요. 셀피쉬클럽 내부에서 시작된 작은 실험이 6주 동안 어떻게 진화했는지, 그리고 이 경험이 앞으로 어떤 커뮤니티로 이어질지 — 젬마가 직접 이야기합니다." },
  { num: "PART 02", title: "나를 위한 OS를 만들기", subtitle: "내 일하는 방식 자체를 AI로 다시 설계한 이야기", desc: '거창한 프로덕트가 아닙니다. 내가 매일 하는 일, 내가 매번 막히던 지점 — 거기서 시작한 세 사람의 이야기입니다. "나도 이렇게 해볼 수 있겠다"는 생각이 드는 게 이 파트의 목표입니다.' },
  { num: "PART 03", title: "고객을 위한 Product를 만들기", subtitle: "실제 유저가 쓰는 것을 Claude Code로 직접 개발한 이야기", desc: '"코딩 몰라도 만들 수 있어"라는 말이 실제로 가능한지 — 이 파트가 그 증거입니다. 각자 다른 문제를 풀기 위해 시작한 4개의 실전 프로덕트, 그 과정에서 배운 것들을 공유합니다.' },
];

const TIMETABLE = [
  { time: "19:30", title: "오프닝 & 젬마 세션", note: "PART 1 — AAA의 탄생과 6주간의 여정" },
  { time: "19:55", title: "나를 위한 OS 만들기", note: "PART 2 — 다다 · 다니 · 흐민 (각 10분 내외)" },
  { time: "20:30", title: "고객을 위한 Product 만들기", note: "PART 3 — 비비안 · 에밀리 · 오웬 · 띵크 (각 10분 내외)" },
  { time: "21:10", title: "Q&A + 다음 이야기 예고", note: "자유 질문 · Sponge Club 1기 모집 예고" },
  { time: "21:30", title: "종료", note: "참가자 전원 공유 자료 이메일 발송" },
];

const WHO_CARDS = [
  { icon: "01", title: "AI를 '써봤다'에서 끝난 사람", desc: "ChatGPT는 쓰는데, 뭔가 만들어봤다는 느낌이 없는. 이 공유회는 그 다음 단계입니다." },
  { icon: "02", title: "직무 경계가 사라지는 게 불안한 사람", desc: "마케터인데 개발자 영역까지 침범하고 싶다면. AAA팀이 그 답입니다." },
  { icon: "03", title: "사이드 프로젝트를 현실화하고 싶은 사람", desc: "아이디어는 있는데 실행이 안 된 것들. 어떻게 시작하는지 보고 싶은 사람." },
  { icon: "04", title: "같은 결의 사람들을 만나고 싶은 사람", desc: "AI와 비즈니스를 함께 고민할 동료가 필요한 마케터·실무자." },
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
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
        {speaker.image ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img src={speaker.image} alt={`${speaker.name} 세션`} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-white/[0.02] flex items-center justify-center">
            <span className="text-white/10 text-xs font-mono">SESSION IMAGE</span>
          </div>
        )}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#E2E545]/10 border border-[#E2E545]/20 flex items-center justify-center text-xs text-[#E2E545] font-mono shrink-0">
              {speaker.initial}
            </div>
            <div>
              <p className="text-base font-medium text-white">{speaker.name}</p>
              <p className="text-xs text-white/30 font-mono">{speaker.role}</p>
            </div>
          </div>
          <p className="text-lg sm:text-xl font-medium text-white mb-3 leading-snug">
            {speaker.title}
          </p>
          <p className="text-base text-white/40 leading-relaxed">{speaker.desc}</p>
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
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
              <StaggerText text={"셀피쉬클럽 AX PROJECT"} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-base sm:text-lg text-white/40"
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
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-snug max-w-2xl mx-auto mb-14 lg:mb-20">
              스스로를 에이전틱하게 바꾼 이야기
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }} className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 mb-16 lg:mb-20">
              <div className="text-center">
                <p className="text-xs text-white/25 tracking-[0.15em] uppercase font-mono mb-2">Date</p>
                <p className="text-lg sm:text-xl font-semibold text-white">2025년 4월 28일 (월)</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/25 tracking-[0.15em] uppercase font-mono mb-2">Format</p>
                <p className="text-lg sm:text-xl font-semibold text-white">온라인 (Zoom) · 무료</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/25 tracking-[0.15em] uppercase font-mono mb-2">Duration</p>
                <p className="text-lg sm:text-xl font-semibold text-white">약 90분</p>
              </div>
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
                  <span className="text-xs text-[#E2E545] tracking-[0.15em] font-mono bg-[#E2E545]/10 border border-[#E2E545]/20 px-3 py-1.5 rounded inline-block mb-5">
                    {part.num}
                  </span>

                  {/* 파트 타이틀 */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-3">
                    {part.title}
                  </h3>
                  <p className="text-base text-white/30 mb-8">{part.subtitle}</p>

                  {/* 파트 설명 */}
                  <p className="text-lg text-white/50 leading-[1.9] mb-12">
                    {part.desc}
                  </p>

                  {/* 스피커 카드 */}
                  {ungrouped.length > 0 && (
                    <div className="space-y-4">
                      {ungrouped.map((s, i) => (
                        <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                      ))}
                    </div>
                  )}

                  {internalSpeakers.length > 0 && (
                    <>
                      <p className="text-xs text-white/30 tracking-[0.1em] font-mono uppercase mb-4">
                        셀피쉬클럽 내부 프로덕트
                      </p>
                      <div className="space-y-4 mb-8">
                        {internalSpeakers.map((s, i) => (
                          <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                        ))}
                      </div>
                    </>
                  )}

                  {externalSpeakers.length > 0 && (
                    <>
                      <p className="text-xs text-white/30 tracking-[0.1em] font-mono uppercase mt-8 mb-4">
                        외부 서비스 프로덕트
                      </p>
                      <div className="space-y-4">
                        {externalSpeakers.map((s, i) => (
                          <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                        ))}
                      </div>
                    </>
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

      <SectionDivider from={BG.dark} to={BG.mid} />

      {/* ═══ 스폰지클럽 티저 (미드) ═══ */}
      <section style={{ background: BG.mid }} className="py-24 lg:py-40">
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <FadeUp>
            <p className="text-xs text-[#E2E545]/60 tracking-[0.3em] uppercase mb-5">
              Coming Soon
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              Sponge Club
            </h2>
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
                <p className="text-xs text-[#0A0A0A]/25 text-center pt-3 font-mono">
                  * 개인정보는 공유회 운영 목적으로만 사용됩니다.
                </p>
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
