"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  sitemapRoot,
  adminRoot,
  dashboardRoot,
  securityRoot,
  crmRoot,
  aiCounselorRoot,
  phaseStyle,
  type SitemapNode,
  type PhaseNumber,
  type Feature,
} from "./data";

export default function RoadmapPage() {
  const [selected, setSelected] = useState<SitemapNode | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              대시보드
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                AX <span className="text-[#E2E545]">로드맵</span>
              </h1>
              <p className="text-sm text-white/50 mt-0.5">
                클릭하면 에이전틱 전략을 확인할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8 space-y-6">
        {/* 범례 */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {([1, 2, 3, 4, 5] as PhaseNumber[]).map((p) => {
            const s = phaseStyle[p];
            return (
              <span
                key={p}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 font-medium"
                style={{ backgroundColor: s.bg + "33", color: s.border }}
              >
                <span
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: s.bg }}
                />
                {s.label}
              </span>
            );
          })}
          <span className="text-white/10 mx-1">|</span>
          <span className="flex items-center gap-1.5 text-white/40">
            <span className="relative h-2.5 w-2.5 rounded-full bg-amber-400">
              <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50" />
            </span>
            진행 중
          </span>
          <span className="flex items-center gap-1.5 text-white/40">
            반투명 = 완료
          </span>
          <span className="text-white/10 mx-1">|</span>
          <span className="text-white/30">
            <span className="border border-dashed border-white/30 rounded px-1.5 py-0.5 text-[10px]">점선</span> = 동적 페이지
          </span>
        </div>

        {/* 홈페이지 사이트맵 */}
        <div>
          <h2 className="text-sm font-semibold text-white/50 mb-3 tracking-wider uppercase">홈페이지 (퍼블릭)</h2>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[1100px] py-4 px-8">
              <TreeNode node={sitemapRoot} onSelect={setSelected} selectedId={selected?.id ?? null} depth={0} />
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-white/10" />

        {/* 운영 구조도 — 가로 배치 */}
        <div>
          <h2 className="text-sm font-semibold text-white/50 mb-3 tracking-wider uppercase">운영 (내부)</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start gap-16 py-4 px-8">
              <TreeNode node={adminRoot} onSelect={setSelected} selectedId={selected?.id ?? null} depth={0} />
              <TreeNode node={dashboardRoot} onSelect={setSelected} selectedId={selected?.id ?? null} depth={0} />
              <TreeNode node={securityRoot} onSelect={setSelected} selectedId={selected?.id ?? null} depth={0} />
              <TreeNode node={crmRoot} onSelect={setSelected} selectedId={selected?.id ?? null} depth={0} />
              <TreeNode node={aiCounselorRoot} onSelect={setSelected} selectedId={selected?.id ?? null} depth={0} />
            </div>
          </div>
        </div>

        {/* 선택된 노드 상세 패널 */}
        {selected && (
          <div
            className="rounded-xl border border-white/10 bg-[#1a1a1a] px-6 py-5 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              {selected.status === "in-progress" && (
                <span className="relative h-2.5 w-2.5 rounded-full bg-amber-400">
                  <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50" />
                </span>
              )}
              <h3 className="text-lg font-bold">{selected.name}</h3>
              {selected.path && (
                <span className="text-sm font-mono text-white/30">{selected.path}</span>
              )}
              <button
                onClick={() => setSelected(null)}
                className="ml-auto text-white/30 hover:text-white/60 text-sm"
              >
                닫기 ✕
              </button>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {selected.agenticNote}
            </p>
          </div>
        )}

        {/* 에이전트 범례 */}
        <div className="flex items-center gap-6 text-[11px] text-white/30 border-t border-white/5 pt-4">
          <span>🤖 Claude Code — 코드 생성</span>
          <span>🧠 Claude API — 콘텐츠/분석</span>
          <span>⚡ n8n — 워크플로우</span>
          <span>👤 사람 — 기획/판단</span>
        </div>

        <footer className="text-center text-xs text-white/30 pt-4 pb-12">
          셀피쉬클럽 v4.0 AX 로드맵
        </footer>
      </main>
    </div>
  );
}

// ─── 트리 노드 (재귀) ───

function TreeNode({
  node,
  onSelect,
  selectedId,
  depth,
}: {
  node: SitemapNode;
  onSelect: (node: SitemapNode) => void;
  selectedId: string | null;
  depth: number;
}) {
  const hasChildren = node.children && node.children.length > 0;
  // depth 0 = 홈(1단), depth 1 = 메인메뉴(2단), depth 2+ = 3단 이하(세로)
  const childrenVertical = depth >= 1;

  return (
    <div className="flex flex-col items-center">
      {/* 노드 박스 */}
      <NodeBox node={node} onSelect={onSelect} isSelected={selectedId === node.id} />

      {hasChildren && !childrenVertical && (
        <>
          {/* 부모에서 내려오는 수직선 */}
          <div className="w-px h-6 bg-white/15" />

          {/* 자식들 (가로 — 1단→2단) */}
          <div className="flex items-start">
            {node.children!.map((child, i) => {
              const isFirst = i === 0;
              const isLast = i === node.children!.length - 1;
              const isOnly = node.children!.length === 1;

              return (
                <div key={child.id} className="flex flex-col items-center relative px-1.5">
                  <div className="w-px h-6 bg-white/15" />
                  {!isOnly && (
                    <div
                      className="absolute top-0 h-px bg-white/15"
                      style={{
                        left: isFirst ? "50%" : 0,
                        right: isLast ? "50%" : 0,
                      }}
                    />
                  )}
                  <TreeNode node={child} onSelect={onSelect} selectedId={selectedId} depth={depth + 1} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* 자식 세로 배치 — 2단 메인메뉴의 하위 페이지들 */}
      {hasChildren && childrenVertical && (
        <VerticalChildren nodes={node.children!} onSelect={onSelect} selectedId={selectedId} depth={depth + 1} />
      )}
    </div>
  );
}

// ─── 세로 자식 목록 ───

function VerticalChildren({
  nodes,
  onSelect,
  selectedId,
  depth,
}: {
  nodes: SitemapNode[];
  onSelect: (node: SitemapNode) => void;
  selectedId: string | null;
  depth: number;
}) {
  return (
    <div className="pl-10 relative">
      {/* 세로 줄기선 */}
      <div
        className="absolute left-[19px] top-0 w-px bg-white/20"
        style={{ height: "calc(100% - 24px)" }}
      />
      {nodes.map((child, i) => {
        const hasGrandchildren = child.children && child.children.length > 0;
        return (
          <div key={child.id} className="relative py-1.5">
            {/* 수평 꺾임선 */}
            <div className="absolute left-[-21px] top-[24px] w-[21px] h-px bg-white/20" />
            {/* 자식 노드 */}
            <div className="flex flex-col items-start">
              <NodeBox node={child} onSelect={onSelect} isSelected={selectedId === child.id} />
              {hasGrandchildren && (
                <VerticalChildren nodes={child.children!} onSelect={onSelect} selectedId={selectedId} depth={depth + 1} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 노드 박스 ───

function NodeBox({
  node,
  onSelect,
  isSelected,
}: {
  node: SitemapNode;
  onSelect: (node: SitemapNode) => void;
  isSelected: boolean;
}) {
  const hasFeatures = node.features && node.features.length > 0;
  const hasPendingFeatures = hasFeatures && node.features!.some((f) => !f.done);
  const isDone = node.status === "done" && !hasPendingFeatures;
  const isDynamic = node.isDynamic;

  return (
    <button
      onClick={() => onSelect(node)}
      className="transition-all hover:scale-105 hover:brightness-125 text-left"
      style={{ opacity: isDone ? 0.2 : 1 }}
    >
      <div
        className={`rounded-lg px-4 py-2.5 min-w-[110px] relative ${hasFeatures ? "max-w-[220px]" : "max-w-[140px]"}`}
        style={{
          backgroundColor: "#1a1a1a",
          border: `2px ${isDynamic ? "dashed" : "solid"} ${isSelected ? "#E2E545" : "#333"}`,
          boxShadow: isSelected ? "0 0 0 2px #E2E545, 0 0 12px rgba(226,229,69,0.3)" : "none",
        }}
      >
        {/* 상태 도트: 진행 중만 빛나는 도트 */}
        {node.status === "in-progress" && (
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-amber-400">
            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50" />
          </span>
        )}

        {/* 이름 */}
        <p className="text-xs font-bold leading-tight text-white">
          {node.name}
        </p>

        {/* 경로 */}
        {node.path && (
          <p className="text-[9px] mt-0.5 font-mono text-white/40">
            {node.path}
          </p>
        )}

        {/* 기능 체크리스트 */}
        {hasFeatures && (
          <div className="mt-2 border-t border-white/10 pt-1.5 space-y-0.5">
            {node.features!.map((f, i) => {
              const isTest = f.name.startsWith("[테스트]");
              const fps = phaseStyle[f.phase];
              return (
                <div key={i} className={`flex items-start gap-1.5 ${isTest ? "ml-2 border-l border-white/15 pl-1.5" : ""}`}>
                  <span
                    className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full mt-[1px] shrink-0 text-[8px] font-bold leading-none"
                    style={{
                      backgroundColor: fps.bg,
                      color: fps.text,
                      opacity: f.done ? 0.4 : (isTest ? 0.6 : 1),
                    }}
                  >
                    {f.phase}
                  </span>
                  <span className="text-[10px] leading-none mt-0.5 text-white/70" style={{ opacity: isTest ? 0.6 : 1 }}>
                    {f.done ? "☑" : "☐"}
                  </span>
                  <span
                    className={`text-[10px] leading-tight text-white/80 ${f.done ? "line-through opacity-40" : ""}`}
                    style={{ opacity: isTest && !f.done ? 0.6 : 1 }}
                  >
                    {isTest ? `🧪 ${f.name.replace("[테스트] ", "")}` : f.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </button>
  );
}
