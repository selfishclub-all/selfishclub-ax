"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface Program {
  ID: number;
  iid: string;
  i_title: string;
  i_title_userside: string | null;
  i_type: string;
  i_formid_webflow: string;
  i_paid_tf: boolean;
  i_price: number | null;
  i_eventdate: string | null;
  i_event_count: number | null;
  i_category: string[] | null;
  i_vodurl: string | null;
  i_full_schedule: string | null;
  hero_image?: string | null;
}

interface Props {
  programs: Program[];
  basePath: string;
}

// 프로토타입: 이미지가 있는 프로그램 (나중에 DB에서 가져옴)
const SUPABASE_STORAGE = "https://mryzkyvxcjeqjkdhlkeo.supabase.co/storage/v1/object/public/program-images";
const PROTOTYPE_IMAGES: Record<string, string> = {
  "ai-github": `${SUPABASE_STORAGE}/ai-github/hero.jpg`,
  "ai-bizvideo": `${SUPABASE_STORAGE}/ai-bizvideo/hero.jpg`,
  "ai-claude4": `${SUPABASE_STORAGE}/ai-claude4/hero.jpg`,
};

// 기존 카테고리 → 통합 카테고리 매핑
const categoryGroupMap: Record<string, string> = {
  "marketing": "ai-marketing",
  "seo": "ai-marketing",
  "branding": "ai-marketing",
  "content-creation": "ai-content",
  "blog": "ai-content",
  "video": "ai-content",
  "image": "ai-content",
  "automation": "ai-building",
  "vibe-coding": "ai-building",
  "webflow": "ai-building",
  "ai-tool": "ai-building",
  "claude": "ai-building",
  "monetization": "business",
  "career": "business",
  "community": "community",
};

const categoryLabels: Record<string, string> = {
  "ai-marketing": "AI 마케팅",
  "ai-content": "AI 콘텐츠",
  "ai-building": "AI 빌딩",
  "business": "비즈니스",
  "community": "커뮤니티",
};

const typeLabel: Record<string, string> = {
  sharing: "공유회",
  challenge: "챌린지",
  workshop: "워크숍",
  special: "스페셜",
};

function formatPrice(paid: boolean, price: number | null) {
  if (!paid) return "무료";
  return price ? `${price.toLocaleString()}원` : "유료";
}

function isPast(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

export function ProgramList({ programs, basePath }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 프로그램별 통합 카테고리 계산
  const programGroups = useMemo(() => {
    const map = new Map<number, Set<string>>();
    for (const p of programs) {
      const groups = new Set<string>();
      if (p.i_category) {
        for (const c of p.i_category) {
          const group = categoryGroupMap[c];
          if (group) groups.add(group);
        }
      }
      map.set(p.ID, groups);
    }
    return map;
  }, [programs]);

  // 카테고리 목록 추출 (통합 기준)
  const categories = useMemo(() => {
    const catCount: Record<string, number> = {};
    for (const groups of programGroups.values()) {
      for (const g of groups) {
        catCount[g] = (catCount[g] ?? 0) + 1;
      }
    }
    return Object.entries(catCount)
      .sort((a, b) => b[1] - a[1])
      .filter(([key]) => categoryLabels[key])
      .map(([key, count]) => ({ key, label: categoryLabels[key], count }));
  }, [programGroups]);

  // 필터링
  const filtered = useMemo(() => {
    if (!selectedCategory) return programs;
    return programs.filter((p) => programGroups.get(p.ID)?.has(selectedCategory));
  }, [programs, selectedCategory, programGroups]);

  // 진행 중 / 지난 프로그램 분리
  const upcoming = filtered.filter((p) => !isPast(p.i_eventdate));
  const past = filtered.filter((p) => isPast(p.i_eventdate));

  return (
    <div>
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`text-xs px-3.5 py-1.5 rounded tracking-wide transition-all duration-200 ${
            selectedCategory === null
              ? "bg-[#0A0A0A] text-white"
              : "bg-[#F0F0EC] text-[#666] hover:bg-[#E5E5E0]"
          }`}
        >
          전체 ({programs.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
            className={`text-xs px-3.5 py-1.5 rounded tracking-wide transition-all duration-200 ${
              selectedCategory === cat.key
                ? "bg-[#0A0A0A] text-white"
                : "bg-[#F0F0EC] text-[#666] hover:bg-[#E5E5E0]"
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* 진행 중 / 모집 중 */}
      {upcoming.length > 0 && (
        <div className="mb-16">
          <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-6">
            Upcoming · {upcoming.length}
          </p>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((p) => (
                <ProgramCard key={p.ID} program={p} basePath={basePath} past={false} />
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* 지난 프로그램 */}
      {past.length > 0 && (
        <div>
          <p className="text-[11px] text-[#888] tracking-[0.3em] uppercase mb-6">
            Past · {past.length}
          </p>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map((p) => (
                <ProgramCard key={p.ID} program={p} basePath={basePath} past={true} />
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#999]">해당 카테고리에 프로그램이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

function ProgramCard({
  program: p,
  basePath,
  past,
}: {
  program: Program;
  basePath: string;
  past: boolean;
}) {
  const href = `${basePath}/${p.i_formid_webflow}`;
  const heroImage = p.hero_image || PROTOTYPE_IMAGES[p.i_formid_webflow];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={href}
        className={`group block rounded-lg overflow-hidden border transition-all duration-300 h-full ${
          past
            ? "border-[#E5E5E5]/40 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
            : "border-[#E5E5E5]/60 hover:border-[#0A0A0A]/20 hover:shadow-md hover:-translate-y-0.5"
        }`}
      >
        {/* 이미지 영역 */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {heroImage ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A]">
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
            </div>
          )}

          {/* 이미지 위 배지 */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="text-[10px] text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
              {typeLabel[p.i_type] ?? p.i_type}
            </span>
            {p.i_vodurl && (
              <span className="text-[10px] text-[#E2E545] bg-[#E2E545]/10 backdrop-blur-sm px-2 py-0.5 rounded">
                VOD
              </span>
            )}
          </div>

          {/* 이미지 위 제목 */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-base font-semibold text-white leading-snug drop-shadow-lg">
              {p.i_title_userside || p.i_title}
            </h3>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-xs text-[#999]">
              {p.i_eventdate && <span>{p.i_eventdate}</span>}
              {p.i_event_count && p.i_event_count > 0 && (
                <>
                  <span className="w-px h-3 bg-[#E5E5E5]" />
                  <span>{p.i_event_count}명 참여</span>
                </>
              )}
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded tracking-wide ${
              past ? "text-[#999] bg-[#F0F0EC]" : "text-[#0A0A0A] bg-[#E2E545]/20"
            }`}>
              {formatPrice(p.i_paid_tf, p.i_price)}
            </span>
          </div>

          {/* 카테고리 태그 (통합 기준) */}
          {p.i_category && p.i_category.length > 0 && (() => {
            const groups = new Set<string>();
            for (const c of p.i_category) {
              const g = categoryGroupMap[c];
              if (g && categoryLabels[g]) groups.add(g);
            }
            return groups.size > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {[...groups].map((g) => (
                  <span
                    key={g}
                    className="text-[10px] text-[#AAA] border border-[#E5E5E5] px-2 py-0.5 rounded"
                  >
                    {categoryLabels[g]}
                  </span>
                ))}
              </div>
            ) : null;
          })()}
        </div>
      </Link>
    </motion.div>
  );
}
