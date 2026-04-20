"use client";

import { useRef, useState, useEffect } from "react";
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

/* ─── 탑띠배너 + 카운트다운 ─── */
function TopBanner() {
  const [timeLeft, setTimeLeft] = useState("");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // 내일(4/21) 오후 3시 KST
    const deadline = new Date("2026-04-21T15:00:00+09:00");

    function update() {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft("");
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (expired) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white/90 py-2.5 overflow-hidden border-b border-white/10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[0, 1].map((i) => (
          <p key={i} className="text-sm sm:text-base font-bold shrink-0">
            {timeLeft && (
              <span className="font-mono mr-1 text-[#FF3B3B]">[마감까지{timeLeft}]</span>
            )}
            <span>설문 참여자 분들을 위한 우선 신청 페이지입니다!</span>
          </p>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
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
            <span key={i} className="font-bold underline decoration-[#E2E545] decoration-2 underline-offset-4">
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
  { initial: "G", name: "젬마", avatar: "/images/speakers/젬마.png", role: "Creator · Vision Holder", title: "각자 잘할 수 있다는 AI 시대에,\n왜 팀이었을까", image2: "/images/sessions/젬마1.png", desc: "AAA 팀이 탄생할 수밖에 없었던 이유\n\nClaude Code가 등장하면서,\n비개발자든 개발자든 직무의 경계를\n본격적으로 넘나들 수 있게 됐어요.\n\n다만 <hl>\"딸깍이면 된다\"</hl>와\n<hl>\"내 삶과 업무에 적용한다\"</hl>는\n<hl>완전히 다른 이야기</hl>예요.\n\n쏟아지는 정보를 혼자 학습하고, 적용하고,\n진짜 내 것으로 만드는 것까지 —\n혼자 해내기엔 너무 많고, 너무 빠릅니다.\n\n그래서 혼자가 아니라,\n<hl>팀으로 부딪치기로 했어요.</hl>\n그렇게 만들어진 팀이 AAA(AI Agent AZA)예요.\n\n8명이 매주 일요일에 모여\n서로 만든 것을 주고받으며 6주를 채웠습니다.\n\n무엇이 작동했고, 무엇이 바뀌었는지.\n그리고 그 경험이 만들어낼 다음 챕터,\n스폰지클럽까지 소개드립니다.", image: "/images/sessions/젬마.png", part: 1, before: "", after: "" },
  { initial: "D", name: "다다", avatar: "/images/speakers/다다.png", role: "PM · AAA팀 리더", title: "흩어진 노션을 AI가 읽는 \"살아있는 자산\"으로 —\n팀 웹페이지를 만든 이야기", desc: "AAA팀이 매주 만들어내는 좋은 기록들이\n각자 노션에 잠들어 있는 게 아까웠어요.\n\n옵시디언으로 매주 제출한 과제와 회의 기록이 데이터로 쌓이니,\n팀 안에서 어떤 일이 있었는지,\n각자가 어떤 흐름으로 성장했는지까지\n<hl>AI가 꺼내서 보여줄 수 있게 됐어요.</hl>\n그리고 그 데이터로 링크드인 글 같은\n새로운 콘텐츠까지 이어서 만들어낼 수 있습니다.\n\nAI가 가장 잘 읽는 형태(마크다운)로 쌓이니,\n아카이브가 \"보관용\"이 아니라\n<hl>계속 꺼내 쓰는 \"살아있는 자산\"</hl>이 되었고,\n외부에 공유 가능한 아카이빙 시스템까지 모두 공유합니다.", image: "/images/sessions/다다.png", part: 1, before: "AAA팀의 좋은 기록들이 각자의 노션에 흩어져 잠들어 있었다.", after: "옵시디언에 쓰면 AI가 정리해서 웹사이트에 올라가는\n팀 아카이빙 시스템이 돌아가고 있다." },
  { initial: "Da", name: "다니", avatar: "/images/speakers/다니.png", role: "Contents · Marketing", title: "\"딸깍 자동화\"에 실패하고,\n내 손으로 만든 콘텐츠 OS", desc: "처음엔 URL 하나 넣으면 블로그·인스타·링크드인이\n동시에 나오는 걸 만들었어요. <hl>결과는 실패.</hl>\n톤이 안 맞아서 결국 다시 캔바에서 작업했고,\n오히려 시간이 더 걸렸습니다.\n\n그래서 방향을 바꿨어요.\n<hl>캐러셀 에디터, 스레드·링크드인 동시 생성기,</hl>\n터미널에서 영상까지 만드는 시스템을 직접 만들었습니다.\n\n자동화가 실패한 이유와 돌아온 이유,\n그 과정에서 구조화한 디자인 규칙까지 공유합니다.", image: "/images/sessions/다니.mp4", part: 2, before: "\"딸깍 한 번 자동화\"를 믿고 시도했지만,\n결국 캔바로 다시 작업하느라 시간이 더 걸렸다.", after: "내 톤에 맞는 캐러셀을 즉시 생성·편집할 수 있는\n나만의 에디터를 만들어서 실제 업무에 쓰고 있다." },
  { initial: "H", name: "흐민", avatar: "/images/speakers/흐민.png", role: "AI Thinking Partner", title: "AI한테 답 구하기를 멈추고,\nAI에게 질문 받기 시작한 이야기", desc: "AI가 모든 답을 주는 시대에\n정작 \"내 생각이 뭔지\" 흐릿해지는 게 아쉬웠어요.\n\n<hl>텔레그램에 한 줄 던지면 AI가 질문을 던져주고,</hl>\n그 대화가 자동으로 위키에 쌓이고,\n<hl>3일 뒤에 콘텐츠 초안이 되는 시스템</hl> —\n혼자 쓰면서 허술하게 굴려온 실제 과정을 공유합니다.", image: "/images/sessions/흐민.mp4", part: 2, before: "AI한테 계속 답을 구하다가,\n정작 \"내 생각은 뭔지\" 흐릿해지는 게 아쉬웠다.", after: "텔레그램에 한 줄 쓰면 AI가 질문을 던져주고,\n그 대화가 3일 뒤에 콘텐츠 초안으로 돌아오는 구조를 돌리고 있다." },
  { initial: "O", name: "오웬", avatar: "/images/speakers/오웬.png", role: "Platform Builder", title: "13년 차 핀테크 대표가 회사를 정리하고\n\"왜(Why)\"를 찾아 AI에 올인하기까지", desc: "3주 동안 AI를 붙잡고 방황했어요.\n\"남들이 하는 거\"를 따라 하다가 전부 실패했습니다.\n\n<hl>\"내가 누구의 무슨 문제를 풀 건지\"가 선명해진 순간,</hl>\n4시간 만에 12개 에이전트를 굴려\n찜마켓이라는 실제 서비스를 세상에 내놓았어요.\n\n<hl>하루 만에 카톡으로 고객 문의가 오기까지의 기록,</hl>\n클로드 코드를 '나만의 코파운더'로 쓰는 법,\n그리고 '왜'가 빠졌을 때 AI가 어떻게 엉뚱해지는지 —\n찐 경험담으로 아낌없이 나눕니다.", image: "/images/sessions/오웬.mp4", part: 3, before: "13년 다닌 회사를 정리하고\n\"뭘 해야 할지\"를 모른 채 AI를 붙잡고 있었다.", after: "찜마켓이라는 서비스를 직접 만들어 운영 중이고,\n하루 만에 실제 고객 문의가 카톡으로 오는 단계까지 왔다." },
  { initial: "T", name: "띵크", avatar: "/images/speakers/띵크.png", role: "Workflow Architect", title: "결제, 예약, CRM, 광고를 한 화면에 —\n나만의 대시보드 만들기", desc: "매일 여러 SaaS 툴을 돌아다니며\n데이터 모으고 성과 정리하던 시간,\n<hl>이제는 없습니다.</hl>\n\nAPI를 엮어서 만든 <hl>커스텀 대시보드 하나로</hl>\n결제, 예약, CRM, 광고 성과를 한 번에 확인하는 법,\n그리고 마케터가 직접 만들 수 있었던 이유를 공유합니다.", image: "/images/sessions/띵크.png", part: 3, before: "결제, 예약, CRM, 광고 성과를 보려고\n매일 여러 SaaS 툴을 돌아다니며 데이터를 수기로 정리했다.", after: "API를 엮어서 만든 나만의 대시보드 하나에서\n모든 성과를 한 번에 본다." },
  { initial: "V", name: "비비안", avatar: "/images/speakers/비비안.png", role: "Operations · AX Design", title: "비개발자 마케터가\nAX 프로젝트 PM이 되기까지", desc: "<hl>개발 지식도, 기술적 원리도 모르는 마케터</hl>가\n어떻게 AX 프로젝트의 PM을 맡게 됐을까요.\n\nAX Dashboard를 직접 설계하고 활용해\n<hl>프로젝트 전체를 한눈에 관리하는 구조</hl>를 만들었고,\n회원 시스템, 결제, 카카오 로그인까지 붙이며\n비개발자도 프로젝트를 이끌 수 있다는 걸 증명한 과정을 공유합니다.", image: "/images/sessions/비비안.png", part: 3, before: "할 일을 노션에 적어놓고 하나씩 지우고 있었고,\n새 사이트는 \"일정상 무리\"라고 회의에서 결론 내렸다.", after: "AX 대시보드를 직접 만들어서 프로젝트를 굴리고,\n\"무리\"라던 새 사이트로 실제로 공유회를 열고 있다." },
  { initial: "E", name: "에밀리", avatar: "/images/speakers/에밀리.png", role: "CRM · Member Relations", title: "\"맥북 꺼지면 어떡해\"에서 시작된\nCRM 자동화 구축기", desc: "공유회 하나 열 때마다 나가는 <hl>알림톡 9종 + 채널 N개.</hl>\n카피 쓰고 DB 뽑고 UTM 붙이는 데 매번 하루 3시간.\n\n처음엔 클로드 코드로 만들어봤는데\n문제가 있었어요. <hl>맥북이 꺼지면 발송이 안 되더라고요.</hl>\n거기서 서버로 옮기는 이야기가 시작됐습니다.\n\n<hl>승인 한 번이면 발송이 끝나는 자동화</hl>를 어떻게 만들었는지,\n실제 실패했던 구간부터 공유합니다.", image: "/images/sessions/에밀리.png", part: 3, before: "공유회 하나 열 때마다 알림톡 9종을 수동으로 발송했다.\n카피 쓰고 DB 뽑고 UTM 붙이는 데 하루 3시간.", after: "슬랙에서 승인 한 번이면 발송이 끝난다. 하루 5분." },
];

const AGENDA_PARTS = [
  { num: "PART 01", title: "AAA팀: 무엇이고 어떻게 굴러갔는지", subtitle: "젬마 · 다다", desc: "왜 이 팀이 만들어졌고, 어떻게 함께 일했는지,\n그리고 일하는 구조조차도 AI의 도움으로\n어떻게 지었는지 —\nAI 팀 자체를 다루는 파트입니다." },
  { num: "PART 02", title: "나를 위한 OS를 만들기", subtitle: "다니 · 흐민", desc: "거창한 프로덕트가 아닙니다.\n내가 매일 하는 일, 내가 매번 막히던 지점 —\n거기서 시작한 두 사람의 이야기입니다.\n\n\"나도 이렇게 해볼 수 있겠다\"는 생각이 드는 게\n이 파트의 목표입니다." },
  { num: "PART 03", title: "고객을 위한 Product를 만들기", subtitle: "오웬 · 띵크 · 비비안 · 에밀리", desc: "\"코딩 몰라도 만들 수 있어\"라는 말이\n실제로 가능한지 — 이 파트가 그 증거입니다.\n\n또 혼자서 해서는 나만의 세계에 갇히게 됩니다.\n각자 다른 문제를 풀기 위해 시작한 4개의 실전 프로덕트,\n매주 미션을 가지고 과정과 결과물을 공유하며\n인사이트, 피드백을 나눈 이야기를 공유합니다." },
];

// Before/After는 SPEAKERS 데이터에 통합됨

const TIMETABLE = [
  { time: "20:30", title: "AAA, 그리고 우리의 기록", note: "PART 1 — 젬마 · 다다", highlight: false },
  { time: "21:00", title: "나를 위한 OS 만들기", note: "PART 2 — 다니 · 흐민", highlight: false },
  { time: "21:30", title: "고객을 위한 Product 만들기", note: "PART 3 — 오웬 · 띵크 · 비비안 · 에밀리", highlight: false },
  { time: "22:30", title: "★ 스폰지클럽 정식 모집 오픈", note: "SPONGE CLUB 모집 일정 공개", highlight: true },
  { time: "22:45", title: "Q&A", note: "공유자 8명 전원 참여 · 자유 질문", highlight: false },
];

const WHO_CARDS = [
  { icon: "01", title: "AI를 \"써봤다\"에서 끝난 사람", desc: "ChatGPT로 이것저것 해봤지만,\n\"뭔가 만들어봤다\"는 감각이 아직 없는 사람." },
  { icon: "02", title: "직무 경계가 흐려지는 게 불안한 사람", desc: "마케터인데 개발 영역까지 넘어가야 할 것 같은 압박,\n디자이너인데 프로덕트까지 고민해야 하는 상황." },
  { icon: "03", title: "사이드 프로젝트를 현실화하고 싶은 사람", desc: "아이디어는 쌓여있는데\n\"어떻게 시작하지\"에서 멈춘 사람." },
  { icon: "04", title: "같은 결의 동료를 만나고 싶은 사람", desc: "AI랑 비즈니스를 같이 고민할 수 있는 실무자." },
];

const TOGETHER_EPISODES = [
  "매주 일요일, 8명이 모여 각자의 진행 상황을 공유하고 피드백하는 환경이 있었어요. 혼자였다면 \"이게 맞나?\" 하고 멈췄을 순간에, 옆에서 \"나는 이렇게 했는데\" 한마디가 다시 움직이게 만들었습니다.",
  "젬마가 \"우리 노션 말고, 옵시디언 써보면 어떨까요?\" 한마디를 던졌어요. 그 한마디에 다다가 팀의 기록 방식을 통째로 바꾸고, 옵시디언 + 깃헙 기반으로 데이터화하고, 더 나아가 팀 아카이빙 웹사이트까지 만들었습니다.",
  "오웬이 흐민의 기록 시스템을 보고 \"나도 내 생각을 구조화해야겠다\"고 말한 날이 있어요. 그날 이후 오웬은 자기만의 기록 구조를 만들기 시작했고, 그게 결국 찜마켓의 고객 응대 흐름에까지 영향을 줬습니다.",
  "혼자 했으면 중간에 그만뒀을 거예요. 그리고 내가 하는 것만이 AI 활용의 전부라고 생각했을 거예요. 서로 다른 문제를 풀고 있었지만, 매주 공유하면서 생각지도 못한 연결이 생겼고, 그게 각자의 결과물을 완전히 다른 수준으로 끌어올렸습니다.",
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
      <div className="border-t border-white/10 pt-12">
        {/* 1. 프로필 + 이름 + 타이틀 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white/5 shrink-0">
            {speaker.avatar ? (
              <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg text-[#E2E545] font-mono">{speaker.initial}</div>
            )}
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">공유자</p>
            <p className="text-xl sm:text-2xl font-extrabold text-white">{speaker.name}</p>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-[1.3] whitespace-pre-line mb-6">
          {speaker.title}
        </h3>

        {/* 2. 줄글 설명 */}
        <p className="text-base sm:text-lg text-white/90 leading-[1.8] whitespace-pre-line mb-8"><HighlightedText text={speaker.desc} /></p>

        {/* 3+4. 이미지 + Before/After */}
        <div className="rounded-xl overflow-hidden border border-[#E8E8E3]/30">
          {/* 추가 이미지 (image2) */}
          {speaker.image2 && (
            <div className="overflow-hidden">
              <img src={speaker.image2} alt={`${speaker.name} 세션`} className="w-full h-auto" />
            </div>
          )}
          {/* 세션 이미지/영상 */}
          {speaker.image ? (
            <div className="aspect-[16/9] overflow-hidden">
              {speaker.image.endsWith(".mp4") ? (
                <video src={speaker.image} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={speaker.image} alt={`${speaker.name} 세션`} className="w-full h-full object-cover" />
              )}
            </div>
          ) : (
            <div className="aspect-[16/9] bg-white/[0.02] flex items-center justify-center">
              <span className="text-white/10 text-xs font-mono">SESSION IMAGE</span>
            </div>
          )}

          {/* Before → After */}
          {speaker.before && speaker.after && (
            <div className="bg-[#E8E8E3] px-6 py-8 sm:px-8 sm:py-10">
              <div className="flex items-start gap-3 mb-6">
                <span className="text-xs font-bold text-[#0A0A0A]/40 bg-[#0A0A0A]/10 px-2.5 py-1 rounded shrink-0 mt-0.5">6주 전</span>
                <p className="text-base text-[#0A0A0A]/50 leading-[1.7] whitespace-pre-line">{speaker.before}</p>
              </div>
              <div className="flex items-center gap-2 my-4 ml-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#0A0A0A]/30"><path d="M7 2V12M7 12L3 8M7 12L11 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="flex-1 h-px bg-[#0A0A0A]/10" />
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-[#0A0A0A] bg-[#E2E545] px-2.5 py-1 rounded shrink-0 mt-0.5">지금</span>
                <p className="text-base text-[#0A0A0A] font-bold leading-[1.7] whitespace-pre-line">{speaker.after}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeUp>
  );
}

// BeforeAfterCard removed — Before/After는 각 세션 카드에 통합됨

/* ─── 메인 컴포넌트 ─── */
export function SpongeClubLanding({ item }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const registerRef = useRef<HTMLDivElement>(null);
  const isRegisterVisible = useInView(registerRef, { margin: "0px" });

  return (
    <>
      {/* ═══ 탑띠배너 + 카운트다운 ═══ */}
      <TopBanner />

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
          {/* 상단 라벨 */}
          <div className="text-center px-5 pt-40 sm:pt-48 lg:pt-56 pb-10 sm:pb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-white/40 tracking-wide mb-6"
            >
              무료 온라인 공유회 · 4월 28일(화) 20:30
            </motion.p>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.3] sm:leading-[1.2] mb-6 whitespace-pre-line">
{`AI, '딸-깍'이 가능할까요?\n6주 동안 직접 부딪쳐봤습니다.`}
            </h1>
          </div>

          {/* GIF */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full max-w-md sm:max-w-lg mx-auto px-5"
          >
            <video
              src="/images/sponge-club-kv.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
              style={{
                mask: "radial-gradient(ellipse at center, black 45%, transparent 72%)",
                WebkitMask: "radial-gradient(ellipse at center, black 45%, transparent 72%)",
              }}
            />
          </motion.div>

          {/* 서브타이틀 + 메타 카드 */}
          <div className="text-center px-5 pt-8 sm:pt-12 pb-10 sm:pb-14 max-w-3xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="text-base sm:text-xl text-white/90 mb-8">
              Selfish Club AX PROJECT — AAA 8명의 쌩-날 기록
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }} className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto mb-6">
              {[
                { label: "Date", value: "4월 28일 (화)\n20:30" },
                { label: "Format", value: "온라인\n무료 공유회" },
                { label: "Duration", value: "120분 + α\nQ&A 포함" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.06] border border-white/[0.08] rounded-lg p-4 sm:p-5 text-center">
                  <p className="text-[10px] sm:text-xs text-white/30 tracking-[0.15em] uppercase font-mono mb-2">{item.label}</p>
                  <p className="text-sm sm:text-lg font-bold text-white whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* VOD 없음 경고 — 강조 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="max-w-xl mx-auto mb-16 lg:mb-20">
              <div className="bg-white rounded-lg px-5 py-4 sm:px-6 sm:py-5 text-center">
                <p className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-1">
                  ⚠️ 별도 VOD 제공이 없습니다
                </p>
                <p className="text-sm text-[#0A0A0A]/60">
                  꼭 라이브에 참여해주세요
                </p>
              </div>
            </motion.div>

            {/* 스크롤 화살표 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto text-[#E2E545]">
                  <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* 구분선 */}
          <div className="max-w-3xl mx-auto px-5">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="h-8 sm:h-12" />
        </motion.div>
      </section>

      {/* ═══ 그라데이션 전환 ═══ */}
      <SectionDivider from={BG.dark} to={BG.mid} />

      {/* ═══ 인트로 — 문제 제기 + Our Journey 통합 ═══ */}
      <section style={{ background: BG.mid }} className="py-14 lg:py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <div className="border-l-2 border-[#E2E545]/60 pl-6 sm:pl-8">
              <p className="text-base sm:text-xl text-white leading-[1.8]">
                <strong className="text-white font-bold">&ldquo;딸깍 한 번이면 자동화 된다&rdquo;</strong>는 이야기가 정말 많지만, 막상 내 업무에 가져오면 쉽게 포기하기 마련이에요.
              </p>
              <p className="text-base sm:text-xl text-white leading-[1.8] mt-6">
                <strong className="text-[#E2E545] font-bold">&lsquo;되는구나&rsquo;와 &lsquo;내가 이걸 내 일에 쓴다&rsquo;</strong> 사이의 간극, 그걸 6주 동안 좁혀온 팀이 있어요.
              </p>
            </div>

            <div className="border-l-2 border-white/10 pl-6 sm:pl-8 mt-8">
              <p className="text-base sm:text-xl text-white/70 leading-[1.8]">
                셀피쉬클럽이 2년간 내부에서 해온 실험들의 가장 최근 버전,
              </p>
              <p className="text-base sm:text-xl text-white leading-[1.8] mt-4">
                <strong className="text-white font-bold">AAA(AI Agent AZA)팀 8명.</strong> 매주 일요일에 모여, Claude Code로 각자의 업무에
                AI 에이전트를 직접 붙여봤어요.
              </p>
              <p className="text-base sm:text-xl text-white leading-[1.8] mt-4">
                어떤 건 됐고, 어떤 건 안 됐고, 회의에서 불가능하다고 판단한 걸 클로드랑 얘기하다 뒤집은 날도 있어요.
              </p>
              <p className="text-base sm:text-xl text-white font-bold leading-[1.8] mt-6">
                막힌 것도, 틀린 것도, 결국 뚫어낸 것도 — 4월 28일, 있는 그대로 공유합니다.
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

            return (
              <FadeUp key={part.num}>
                <div className={`${partIdx < AGENDA_PARTS.length - 1 ? "mb-32 pb-32 border-b border-white/10" : ""}`}>
                  {/* 파트 헤더 + 설명 통합 */}
                  <div className="bg-[#E2E545]/10 border border-[#E2E545]/20 rounded-xl p-6 sm:p-8 mb-14">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs sm:text-sm text-[#0A0A0A] font-bold bg-[#E2E545] px-3 py-1 rounded-full">
                        {part.num}
                      </span>
                      <span className="text-sm text-white/40">{part.subtitle}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug mb-4">
                      {part.title}
                    </h3>
                    <p className="text-base sm:text-lg text-white/70 leading-[1.8] whitespace-pre-line">
                      {part.desc}
                    </p>
                  </div>

                  {/* 스피커 카드 */}
                  <div className="space-y-32">
                    {partSpeakers.map((s, i) => (
                      <SpeakerCard key={s.name} speaker={s} delay={i * 0.1} />
                    ))}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <SectionDivider from={BG.dark} to={BG.mid} />

      {/* ═══ 같이 해서 뚫린 것들 ═══ */}
      <section style={{ background: BG.mid }} className="py-24 lg:py-40">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <FadeUp>
            <p className="text-xs text-[#E2E545]/60 tracking-[0.3em] uppercase font-mono mb-5">
              Together
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              &lsquo;같이&rsquo;해서 가능했던 것들
            </h2>
            <p className="text-base sm:text-xl text-white/90 leading-[1.7] mb-14 whitespace-pre-line">
              {"8명이 각자 자기 걸 만들었지만,\n사실은 혼자 한 게 하나도 없어요."}
            </p>
          </FadeUp>

          {/* 서베이 데이터 */}
          <FadeUp>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 sm:p-8 mb-14">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* 도넛 차트 */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
                    {/* 혼자서는 안 됨 85% */}
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#E2E545" strokeWidth="18"
                      strokeDasharray={`${85 * 3.016} ${100 * 3.016}`} strokeLinecap="round" />
                    {/* 기타 15% */}
                    <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="18"
                      strokeDasharray={`${15 * 3.016} ${100 * 3.016}`} strokeDashoffset={`${-85 * 3.016}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#E2E545]">85%</p>
                  </div>
                </div>

                {/* 설명 */}
                <div>
                  <p className="text-sm text-white/40 mb-3">
                    &ldquo;실무에서 AI를 적용하려 할 때 가장 큰 허들은 무엇인가요?&rdquo;
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-white mb-3">
                    &ldquo;혼자서는 안 된다&rdquo;
                  </p>
                  <p className="text-base text-white/70 leading-[1.7] mb-4">
                    사전 서베이 170명의 응답자 중
                    <br />
                    압도적 다수가 가장 큰 허들로 꼽은 답변입니다.
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    &ldquo;막혔을 때 물어볼 사람이 없다&rdquo;는
                    <br />
                    우회적 표현으로도 반복 등장했습니다.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="space-y-8 sm:space-y-10">
            {TOGETHER_EPISODES.map((episode, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <p className="text-base sm:text-lg text-white/90 leading-[1.7]">
                  {episode}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from={BG.mid} to={BG.accent} />

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
                  <p className="text-base text-white/90 leading-[1.7] whitespace-pre-line">{card.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              당일 진행 순서
            </h2>
          </FadeUp>

          {/* 라이브 전용 경고 */}
          <FadeUp delay={0.05}>
            <div className="bg-white rounded-lg px-5 py-4 sm:px-6 sm:py-5 mb-10 text-center">
              <p className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-1">
                ⚠️ 별도 VOD 제공이 없습니다
              </p>
              <p className="text-sm text-[#0A0A0A]/60">
                4월 28일 저녁 8시 30분, 꼭 라이브에 참여해주세요
              </p>
            </div>
          </FadeUp>

          {/* 혜택 */}
          <FadeUp delay={0.08}>
            <div className="mb-10">
              <p className="text-base font-bold text-white mb-4">라이브를 끝까지 보신 분들을 위한 혜택</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 sm:p-5 text-center">
                  <p className="text-base font-extrabold text-[#0A0A0A] mb-1">🎁 SPONGE CLUB 얼리버드 특가</p>
                  <p className="text-sm text-[#0A0A0A]/60">라이브 말미에 특가 링크 바로 공개</p>
                </div>
                <div className="bg-white rounded-lg p-4 sm:p-5 text-center">
                  <p className="text-base font-extrabold text-[#0A0A0A] mb-1">📖 40페이지 분량 교안 제공</p>
                  <p className="text-sm text-[#0A0A0A]/60">라이브 내용을 활용한 교안</p>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="divide-y divide-white/5">
            {TIMETABLE.map((row, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className={`grid grid-cols-[80px_1fr] sm:grid-cols-[110px_1fr] gap-4 sm:gap-8 py-6 sm:py-7 ${row.highlight ? "bg-white/[0.03] rounded-lg px-3 -mx-3" : ""}`}>
                  <span className="text-base text-[#E2E545] font-mono pt-0.5">
                    {row.time}
                  </span>
                  <div>
                    <p className={`text-lg font-medium text-white mb-1 ${row.highlight ? "text-xl font-bold" : ""}`}>{row.title}</p>
                    <p className="text-base text-white/30">{row.note}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="text-xs text-white/30 text-center mt-6">* 타임라인은 상황에 따라 변동될 수 있습니다.</p>
        </div>
      </section>

      {/* ═══ 스폰지클럽 티저 ═══ */}
      <section style={{ background: "#000000" }} className="py-24 lg:py-40">
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <FadeUp>
            <p className="text-base sm:text-lg text-[#E2E545] tracking-[0.2em] uppercase font-bold mb-8">
              Coming Soon
            </p>

            <div className="max-w-md sm:max-w-lg mx-auto mb-10">
              <img
                src="/images/sponge-club-teaser-v2.png"
                alt="SPONGE CLUB"
                className="w-full h-auto"
              />
            </div>

            <p className="text-base sm:text-xl text-white/90 leading-[1.7] max-w-xl mx-auto mb-6">
              셀피쉬클럽 안에서 쌓아온
              <br />
              이기적 공유 경험과 크루 양성 노하우를 응집해,
            </p>
            <p className="text-base sm:text-xl text-white font-medium leading-[1.7] max-w-xl mx-auto mb-6">
              마케터·비개발자 중심의
              <br />
              AI 에이전트 풀사이클 빌딩 프로그램으로
              <br />
              정식 런칭됩니다.
            </p>
            <p className="text-base text-white/90 leading-[1.7] max-w-lg mx-auto mb-6">
              양성 교육과 이기적 공유 커뮤니티가 함께하는 6주간의 프로그램.
              <br />
              이 공유회가 그 시작입니다.
            </p>
            <p className="text-base text-white/90 leading-[1.7] max-w-lg mx-auto mb-14">
              공유회 당일, 이 이름과 정식 모집 일정이 공개됩니다.
              <br />
              라이브에 참여하신 분이 가장 먼저 보게 됩니다.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ 신청 폼 (포인트 컬러 배경) ═══ */}
      <section ref={registerRef} id="register" className="py-24 lg:py-40 bg-[#E2E545]">
        <div className="max-w-lg mx-auto px-5 lg:px-10">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-xs text-[#0A0A0A]/40 tracking-[0.3em] uppercase font-mono mb-5">
                무료 · 온라인 라이브 · 선착순 · VOD 없음
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-6">
                4월 28일 저녁 8시 30분,
                <br />
                라이브에서 만나요
              </h2>
              <p className="text-base text-[#0A0A0A]/70 leading-[1.7] whitespace-pre-line">
                {"공유회 당일 알림톡과 이메일로 라이브 입장 링크를 보내드립니다.\nVOD가 제공되지 않으니 꼭 실시간 라이브에 참여해 주세요."}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            {!formSubmitted ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormLoading(true);
                  setFormError("");
                  const form = e.currentTarget;
                  const params = new URLSearchParams(window.location.search);
                  const data = {
                    u_name: (form.elements.namedItem("u_name") as HTMLInputElement).value,
                    u_phone: (form.elements.namedItem("u_phone") as HTMLInputElement).value,
                    u_email: (form.elements.namedItem("u_email") as HTMLInputElement).value,
                    slug: "aaa",
                    utm_source: params.get("utm_source") || "",
                    utm_medium: params.get("utm_medium") || "",
                    utm_campaign: params.get("utm_campaign") || "",
                    utm_content: params.get("utm_content") || "",
                    utm_term: params.get("utm_term") || "",
                  };
                  try {
                    const res = await fetch("/api/registrations/free", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });
                    const result = await res.json();
                    if (result.error) {
                      setFormError(result.error);
                    } else {
                      setFormSubmitted(true);
                    }
                  } catch {
                    setFormError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
                  } finally {
                    setFormLoading(false);
                  }
                }}
                className="space-y-3"
              >
                <input name="u_name" type="text" required placeholder="이름" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors" />
                <input name="u_phone" type="tel" required placeholder="전화번호 (010-0000-0000)" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors" />
                <input name="u_email" type="email" required placeholder="이메일" className="w-full px-4 py-4 bg-white border border-white rounded text-base text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#0A0A0A]/30 focus:ring-2 focus:ring-[#0A0A0A]/10 transition-colors" />
                <div className="bg-[#0A0A0A]/10 rounded-lg px-4 py-3 mt-3 text-center">
                  <p className="text-sm font-bold text-[#0A0A0A]">🎁 지금 이기적공유회 신청 시, 이기적멤버십2.0에도 무료로 가입됩니다.</p>
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-[#0A0A0A] text-[#E2E545] font-bold text-base py-4 rounded hover:bg-[#1a1a1a] transition-all duration-300 mt-3 disabled:opacity-50"
                >
                  {formLoading ? "신청 중..." : "마감되기 전에 신청하기"}
                </button>
                {formError && (
                  <p className="text-sm text-red-600 text-center pt-2">{formError}</p>
                )}
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-10 text-center">
                <p className="text-[#0A0A0A] font-medium text-lg mb-3">신청이 완료됐습니다!</p>
                <p className="text-base text-[#0A0A0A]/50 leading-relaxed">라이브 입장 링크는 행사 당일 이메일과 알림톡으로 보내드릴게요.</p>
              </motion.div>
            )}
            <div className="flex justify-center gap-4 pt-5">
              <a href="https://sepia-quartz-81f.notion.site/22b5c0a046468081b11cc019c2f558a4?pvs=74" target="_blank" rel="noopener noreferrer" className="text-xs text-[#0A0A0A]/40 underline hover:text-[#0A0A0A]/60">이용약관</a>
              <span className="text-xs text-[#0A0A0A]/20">|</span>
              <a href="https://sepia-quartz-81f.notion.site/22b5c0a0464680528d1ffb54dfd7eaeb" target="_blank" rel="noopener noreferrer" className="text-xs text-[#0A0A0A]/40 underline hover:text-[#0A0A0A]/60">개인정보처리방침</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ Q&A ═══ */}
      <section style={{ background: BG.dark }} className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <p className="text-xs text-white/20 tracking-[0.2em] uppercase font-mono mb-8">FAQ</p>
          <div className="space-y-6">
            {[
              { q: "셀피쉬클럽이 뭔가요?", a: "AI로 나의 가능성을 확장하는 커뮤니티입니다. 마케터, 디자이너, 창업가들이 함께 AI를 실험하고 배우며 지식을 쌓는 대신 나누며 성장하는 방식을 실천합니다." },
              { q: "이기적공유회가 뭐예요?", a: "AI 실무자들이 직접 겪은 시행착오와 성과를 그대로 나누는 셀피쉬클럽의 대표 프로그램입니다. 배우는 공유가 아니라 공유자가 가장 크게 성장하는 공유, 실무에 바로 적용할 수 있는 인사이트를 얻을 수 있습니다." },
              { q: "그 밖에 문의는 어디로 하나요?", a: "카카오채널 [셀피쉬클럽]을 추가해 바로 문의해주세요. 이메일로도 가능합니다." },
            ].map((item, i) => (
              <div key={i} className="border-b border-white/5 pb-6">
                <p className="text-sm text-white/30 mb-2">Q{i + 1}.</p>
                <p className="text-base text-white/50 font-medium mb-2">{item.q}</p>
                <p className="text-sm text-white/30 leading-[1.7]">{item.a}</p>
                {i === 2 && (
                  <div className="flex gap-4 mt-3">
                    <a href="http://pf.kakao.com/_dxmxixhG/chat" target="_blank" rel="noopener noreferrer" className="text-xs text-white/20 underline">카카오채널</a>
                    <a href="mailto:public.selfishclub@gmail.com" className="text-xs text-white/20 underline">public.selfishclub@gmail.com</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 플로팅 CTA (신청 섹션 도달 시 숨김) ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-5 transition-all duration-300 ${
        isRegisterVisible ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"
      }`}>
        <div className="max-w-lg mx-auto flex gap-2">
          <a
            href="#register"
            className="flex-1 font-bold text-base text-center py-4 rounded-full bg-[#E2E545] text-[#0A0A0A]"
          >
            마감되기 전에 신청하기
          </a>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "셀피쉬클럽 AAA 공유회",
                  text: "AI, '딸-깍'이 가능할까요? 6주 동안 직접 부딪쳐봤습니다.",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("링크가 복사되었습니다!");
              }
            }}
            className="w-14 h-14 shrink-0 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="공유하기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
              <path d="M13.5 7C14.8807 7 16 5.88071 16 4.5C16 3.11929 14.8807 2 13.5 2C12.1193 2 11 3.11929 11 4.5C11 4.65163 11.0138 4.79987 11.0401 4.94368L7.45723 6.73512C6.93119 6.27683 6.24881 6 5.5 6C3.84315 6 2.5 7.34315 2.5 9C2.5 10.6569 3.84315 12 5.5 12C6.24881 12 6.93119 11.7232 7.45723 11.2649L11.0401 13.0563C11.0138 13.2001 11 13.3484 11 13.5C11 14.8807 12.1193 16 13.5 16C14.8807 16 16 14.8807 16 13.5C16 12.1193 14.8807 11 13.5 11C12.7512 11 12.0688 11.2768 11.5428 11.7351L7.95986 9.94368C7.98617 9.79987 8 9.65163 8 9.5C8 9.34837 7.98617 9.20013 7.95986 9.05632L11.5428 7.26488C12.0688 7.72317 12.7512 8 13.5 8C13.5 7.65482 13.5 7.34518 13.5 7Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
