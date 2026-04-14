"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { CountUp } from "@/components/motion/CountUp";
import { MagneticButton } from "@/components/motion/MagneticButton";

interface Program {
  ID: number;
  i_title: string;
  i_title_userside: string | null;
  i_type: string;
  i_formid_webflow: string;
  i_paid_tf: boolean;
  i_price: number | null;
  i_eventdate: string | null;
  i_event_count: number;
}

const typeLabel: Record<string, string> = {
  sharing: "공유회",
  challenge: "챌린지",
  workshop: "워크숍",
  special: "스페셜",
};

function getProgramHref(type: string, slug: string) {
  const prefix: Record<string, string> = {
    sharing: "/sharing",
    challenge: "/challenge",
    workshop: "/sharing",
    special: "/sharing",
  };
  return `${prefix[type] ?? "/sharing"}/${slug}`;
}

function formatPrice(paid: boolean, price: number | null) {
  if (!paid) return "무료";
  return price ? `${price.toLocaleString()}원` : "유료";
}

export function HomeClient({ programs }: { programs: Program[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  return (
    <main>
      {/* ── 히어로 ── */}
      <section ref={heroRef} className="relative bg-[#0A0A0A] text-white min-h-screen flex items-center overflow-hidden">
        {/* 배경 그레인 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        {/* 글로우 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2E545]/[0.03] rounded-full blur-[120px]" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative max-w-[1400px] mx-auto px-5 lg:px-10 py-32 lg:py-0 w-full"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* 좌측 카피 */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="h-px bg-[#E2E545] block"
                />
                <span className="text-[11px] text-[#E2E545] tracking-[0.3em] uppercase font-medium">
                  AI Practitioners Community
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-8"
              >
                AI를 실전에{" "}
                <span className="relative inline-block">
                  장착
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                    className="absolute bottom-1 left-0 right-0 h-[6px] bg-[#E2E545]/30 origin-left -z-10"
                  />
                </span>
                하는 사람들
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base lg:text-lg text-white/40 leading-relaxed max-w-md mb-12"
              >
                배우고 끝나는 게 아니라, 직접 만들고 세상에 던지고,
                고객 반응까지 눈으로 확인하는 곳.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <MagneticButton strength={0.15}>
                  <Link
                    href="/membership"
                    className="inline-flex items-center justify-center text-sm text-[#0A0A0A] bg-[#E2E545] font-semibold px-7 py-3 rounded hover:bg-[#CDD03B] transition-colors duration-300"
                  >
                    멤버십 시작하기
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.15}>
                  <Link
                    href="/sharing"
                    className="inline-flex items-center justify-center text-sm text-white/50 border border-white/10 px-7 py-3 rounded hover:border-white/30 hover:text-white transition-all duration-300"
                  >
                    프로그램 둘러보기
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>

            {/* 우측 숫자 */}
            <div className="lg:col-span-5 mt-16 lg:mt-0">
              <StaggerChildren staggerDelay={0.15} className="grid grid-cols-2 gap-px bg-white/5 rounded-lg overflow-hidden">
                {[
                  { num: "30+", label: "공유회 · 워크숍", sub: "Sessions" },
                  { num: "500+", label: "커뮤니티 멤버", sub: "Members" },
                  { num: "8주", label: "풀사이클 빌딩", sub: "Program" },
                  { num: "100%", label: "AI 네이티브 운영", sub: "AI-Powered" },
                ].map((s) => (
                  <StaggerItem key={s.sub}>
                    <div className="bg-[#0A0A0A] p-6 lg:p-8 group hover:bg-white/[0.02] transition-colors duration-500">
                      <p className="text-2xl lg:text-3xl font-bold text-[#E2E545] mb-1">
                        <CountUp value={s.num} />
                      </p>
                      <p className="text-sm text-white/60 mb-0.5">{s.label}</p>
                      <p className="text-[10px] text-white/20 tracking-widest uppercase">
                        {s.sub}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── 한 줄 소개 ── */}
      <section className="bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <FadeIn>
            <p className="text-xl lg:text-3xl text-white/80 leading-relaxed font-light max-w-3xl">
              결이 같은 마케터·실무자들이 모여,{" "}
              <span className="text-white font-medium">AI를 날것 그대로 흡수</span>하고,{" "}
              <span className="text-[#E2E545] font-medium">실제 비즈니스 무기</span>로 장착하는 커뮤니티.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 프로그램 ── */}
      <section className="bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">Programs</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A]">
                  다가오는 프로그램
                </h2>
              </div>
              <Link
                href="/sharing"
                className="hidden sm:inline-flex text-sm text-[#888] hover:text-[#0A0A0A] transition-colors duration-300"
              >
                전체 보기 →
              </Link>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p) => (
              <StaggerItem key={p.ID}>
                <Link
                  href={getProgramHref(p.i_type, p.i_formid_webflow)}
                  className="group block bg-white rounded-lg p-6 border border-[#E5E5E5]/60 hover:border-[#0A0A0A]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[11px] text-[#0A0A0A] bg-[#F0F0EC] px-2.5 py-1 rounded tracking-wide">
                      {typeLabel[p.i_type] ?? p.i_type}
                    </span>
                    <span className="text-[11px] text-[#0A0A0A] font-semibold bg-[#E2E545]/20 px-2.5 py-1 rounded tracking-wide">
                      {formatPrice(p.i_paid_tf, p.i_price)}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#0A0A0A] mb-3 leading-snug">
                    {p.i_title_userside || p.i_title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#999]">
                    {p.i_eventdate && <span>{p.i_eventdate}</span>}
                    {p.i_event_count > 0 && (
                      <>
                        <span className="w-px h-3 bg-[#E5E5E5]" />
                        <span>{p.i_event_count}명 신청</span>
                      </>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="sm:hidden mt-6 text-center">
            <Link href="/sharing" className="text-sm text-[#888] hover:text-[#0A0A0A] transition-colors">
              전체 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 특징 3가지 ── */}
      <section className="bg-[#0A0A0A] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <FadeIn>
            <p className="text-[11px] text-white/30 tracking-[0.3em] uppercase mb-3">What we do</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-16">그냥 배우는 게 아니다</h2>
          </FadeIn>

          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
            {[
              {
                num: "01",
                title: "실전 즉시 적용",
                desc: "AI를 날것 그대로, 머뭇거림 없이 흡수해서 당장 내 비즈니스에 장착한다.",
              },
              {
                num: "02",
                title: "풀사이클 빌딩",
                desc: "직접 만들고, 세상에 던지고, 고객 반응까지 눈으로 확인하는 8주짜리 실전.",
              },
              {
                num: "03",
                title: "결이 같은 연대",
                desc: "자연스럽게 필터링된 사람들이 모여, 이기적으로 공유하며 함께 날카로워진다.",
              },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="bg-[#0A0A0A] p-8 lg:p-10 group hover:bg-white/[0.02] transition-colors duration-500 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#E2E545]/0 via-[#E2E545]/40 to-[#E2E545]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="text-[11px] text-[#E2E545] tracking-widest font-mono mb-6 block">
                    {item.num}
                  </span>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── 프로그램 구조 ── */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
          <FadeIn>
            <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-3">Structure</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0A0A0A] mb-16">셀피쉬클럽 구조</h2>
          </FadeIn>

          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "이기적공유회",
                desc: "무료 오픈 세미나. 실전 경험을 날것 그대로 공유한다.",
                tag: "무료 · 상시",
                href: "/sharing",
              },
              {
                name: "이기적챌린지",
                desc: "함께 몰입하는 실전 챌린지. 결과물로 증명한다.",
                tag: "유료 · 기수제",
                href: "/challenge",
              },
              {
                name: "이기적멤버십",
                desc: "AI 네이티브 멤버십. 모든 프로그램의 기반이 되는 뼈대.",
                tag: "구독 · 상시",
                href: "/membership",
              },
              {
                name: "AAA",
                desc: "클로즈드 AI 네이티브 커뮤니티. 8주 풀사이클 빌딩.",
                tag: "코호트 · 선발",
                href: "/aaa",
              },
            ].map((item) => (
              <StaggerItem key={item.name}>
                <Link
                  href={item.href}
                  className="group block border border-[#E5E5E5]/60 rounded-lg p-6 hover:border-[#0A0A0A]/20 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5 h-full"
                >
                  <span className="text-[10px] text-[#999] tracking-widest uppercase block mb-4">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#0A0A0A] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                  <span className="inline-block mt-4 text-xs text-[#bbb] group-hover:text-[#0A0A0A] transition-colors duration-300">
                    자세히 →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </main>
  );
}
