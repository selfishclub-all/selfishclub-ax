"use client";

import { useState } from "react";
import {
  CheckCircle,
  Circle,
  Clock,
  AlertTriangle,
  Bot,
  Zap,
  BarChart3,
  ListTodo,
  Map,
  Lock,
  Shield,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  phases,
  sitemap,
  crmAgents,
  getPhaseProgress,
  getOverallStats,
  getTasksForPage,
  getSitemapStats,
  type TaskStatus,
  type PageStatus,
  type SitemapPage,
} from "./data";

const statusConfig: Record<
  TaskStatus,
  { label: string; icon: typeof CheckCircle; className: string }
> = {
  done: { label: "완료", icon: CheckCircle, className: "text-emerald-600" },
  "in-progress": { label: "진행 중", icon: Clock, className: "text-amber-500" },
  todo: { label: "예정", icon: Circle, className: "text-gray-400" },
  blocked: { label: "블로킹", icon: AlertTriangle, className: "text-red-500" },
};

const pageStatusConfig: Record<
  PageStatus,
  { label: string; className: string; dotClass: string }
> = {
  done: { label: "완료", className: "text-emerald-400", dotClass: "bg-emerald-400" },
  "in-progress": { label: "진행 중", className: "text-amber-400", dotClass: "bg-amber-400" },
  "not-started": { label: "미착수", className: "text-white/30", dotClass: "bg-white/30" },
};

const agentStatusConfig = {
  active: { label: "가동 중", className: "bg-emerald-100 text-emerald-800" },
  ready: { label: "대기", className: "bg-amber-100 text-amber-800" },
  "not-started": { label: "미구축", className: "bg-gray-100 text-gray-600" },
};

const authIcons = {
  none: <Globe className="h-3 w-3 text-white/30" />,
  user: <Lock className="h-3 w-3 text-blue-400" />,
  admin: <Shield className="h-3 w-3 text-[#FFD700]" />,
};

export default function AXDashboardPage() {
  const stats = getOverallStats();
  const sitemapStats = getSitemapStats();
  const progressPercent = Math.round((stats.done / stats.total) * 100);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              셀피쉬클럽 v4.0{" "}
              <span className="text-[#FFD700]">AX 대시보드</span>
            </h1>
            <p className="text-sm text-white/50 mt-1">
              AI로 플랫폼을 만드는 과정을 실시간으로 기록합니다
            </p>
          </div>
          <Badge variant="outline" className="border-[#FFD700] text-[#FFD700]">
            Phase 1 진행 중
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        {/* 전체 진행률 카드 */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-[#FFD700]" />}
            label="전체 진행률"
            value={`${progressPercent}%`}
          />
          <StatCard
            icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
            label="완료"
            value={`${stats.done}/${stats.total}`}
          />
          <StatCard
            icon={<Map className="h-5 w-5 text-blue-400" />}
            label="페이지"
            value={`${sitemapStats.done + sitemapStats.inProgress}/${sitemapStats.total}`}
          />
          <StatCard
            icon={<ListTodo className="h-5 w-5 text-white/50" />}
            label="남은 작업"
            value={String(stats.todo)}
          />
        </section>

        {/* 전체 프로그레스 바 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/70">전체 진행률</span>
              <span className="text-[#FFD700] font-semibold">
                {stats.done} / {stats.total} 작업 완료
              </span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-white/10" />
          </CardContent>
        </Card>

        {/* ─── 사이트맵 구조 ─── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Map className="h-5 w-5 text-[#FFD700]" />
            <h2 className="text-lg font-semibold">사이트맵</h2>
            <div className="ml-auto flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> 공개</span>
              <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-blue-400" /> 로그인</span>
              <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-[#FFD700]" /> 어드민</span>
            </div>
          </div>
          <Card className="bg-white/5 border-white/10 text-white overflow-hidden">
            <CardContent className="pt-6 pb-4 font-mono text-sm">
              {sitemap.map((page, i) => (
                <SitemapTree
                  key={page.path}
                  page={page}
                  isLast={i === sitemap.length - 1}
                  prefix=""
                />
              ))}
            </CardContent>
          </Card>
        </section>

        <Separator className="bg-white/10" />

        {/* 차수별 작업 현황 */}
        <PhaseSection />

        <Separator className="bg-white/10" />

        {/* CRM 에이전트 현황 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="h-5 w-5 text-[#FFD700]" />
            <h2 className="text-lg font-semibold">CRM 에이전트 현황</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crmAgents.map((agent) => {
              const config = agentStatusConfig[agent.status];
              return (
                <Card key={agent.id} className="bg-white/5 border-white/10 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-white">
                        <Zap className="inline h-4 w-4 mr-1 text-[#FFD700]" />
                        {agent.name}
                      </CardTitle>
                      <Badge className={config.className}>{config.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-white/50">{agent.description}</p>
                    {agent.lastRun && (
                      <p className="text-xs text-white/30 mt-2">
                        마지막 실행: {agent.lastRun}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 푸터 */}
        <footer className="text-center text-xs text-white/30 pt-8 pb-12">
          셀피쉬클럽 v4.0 — AI Exchange 대시보드 | 이 페이지는 홈페이지 완성
          시 역할을 종료합니다
        </footer>
      </main>
    </div>
  );
}

// ─── 사이트맵 트리 컴포넌트 ───

function SitemapTree({
  page,
  isLast,
  prefix,
}: {
  page: SitemapPage;
  isLast: boolean;
  prefix: string;
}) {
  const config = pageStatusConfig[page.status];
  const tasks = getTasksForPage(page.path);
  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const branch = isLast ? "└── " : "├── ";
  const childPrefix = prefix + (isLast ? "    " : "│   ");

  return (
    <>
      <div className="flex items-center gap-0 py-1 hover:bg-white/5 rounded transition-colors group">
        <span className="text-white/20 whitespace-pre select-none">{prefix}{branch}</span>
        <span className={`h-2 w-2 rounded-full shrink-0 mx-1.5 ${config.dotClass}`} />
        {authIcons[page.auth]}
        <span className="text-white/50 ml-1.5">{page.path}</span>
        <span className="text-white/90 ml-2">{page.name}</span>
        <div className="ml-auto flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
          {tasks.length > 0 && (
            <span className="text-[10px] text-white/40">
              {doneTasks}/{tasks.length}
            </span>
          )}
          <span className={`text-[10px] ${config.className}`}>
            {config.label}
          </span>
          <span className="text-[10px] text-white/25">
            {page.phase}차
          </span>
        </div>
      </div>
      {page.children?.map((child, i) => (
        <SitemapTree
          key={child.path}
          page={child}
          isLast={i === (page.children!.length - 1)}
          prefix={childPrefix}
        />
      ))}
    </>
  );
}

// ─── 통계 카드 컴포넌트 ───

function PhaseSection() {
  const [activePhase, setActivePhase] = useState(1);
  const currentPhase = phases.find((p) => p.phase === activePhase)!;

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <ListTodo className="h-5 w-5 text-[#FFD700]" />
        <h2 className="text-lg font-semibold">작업 현황</h2>
      </div>

      {/* 탭 버튼 — 상단 가로 배치 */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {phases.map((phase) => {
          const progress = getPhaseProgress(phase);
          const isActive = phase.phase === activePhase;
          return (
            <button
              key={phase.phase}
              onClick={() => setActivePhase(phase.phase)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#FFD700] text-[#0A0A0A]"
                  : "bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 border border-white/10"
              }`}
            >
              {phase.phase}차 ({progress}%)
            </button>
          );
        })}
      </div>

      {/* 선택된 차수 콘텐츠 */}
      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-lg text-white">{currentPhase.title}</CardTitle>
          <CardDescription className="text-white/50">
            {currentPhase.description}
          </CardDescription>
          <Progress
            value={getPhaseProgress(currentPhase)}
            className="h-2 bg-white/10 mt-2"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentPhase.tasks.map((task) => {
              const config = statusConfig[task.status];
              const Icon = config.icon;
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${config.className}`} />
                  <span
                    className={
                      task.status === "done"
                        ? "text-white/40 line-through"
                        : "text-white/90"
                    }
                  >
                    {task.title}
                  </span>
                  {task.page && (
                    <Badge
                      variant="outline"
                      className="text-[10px] text-white/40 border-white/20 font-mono"
                    >
                      {task.page}
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`ml-auto text-xs ${config.className} border-current shrink-0`}
                  >
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="bg-white/5 border-white/10 text-white">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-xs text-white/50">{label}</span>
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  );
}
