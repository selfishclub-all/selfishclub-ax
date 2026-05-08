// AX 대시보드 — roadmap/data.ts에서 파생
// roadmap/data.ts만 업데이트하면 대시보드도 자동 동기화

import {
  sitemapRoot,
  adminRoot,
  dashboardRoot,
  securityRoot,
  crmRoot,
  phaseStyle,
  type SitemapNode,
  type Feature,
  type PhaseNumber,
} from "./roadmap/data";

export type TaskStatus = "done" | "in-progress" | "todo";
export type PageStatus = "done" | "in-progress" | "not-started";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  phase: PhaseNumber;
  page?: string;
}

export interface PhaseInfo {
  phase: PhaseNumber;
  title: string;
  description: string;
  tasks: Task[];
}

export interface SitemapPage {
  path: string;
  name: string;
  auth: "none" | "user" | "admin";
  status: PageStatus;
  phase: PhaseNumber;
  children?: SitemapPage[];
}

export interface CrmAgent {
  id: string;
  name: string;
  description: string;
  status: "active" | "ready" | "not-started";
  lastRun?: string;
}

// ─── 로드맵 노드에서 Feature 전체 수집 ───

function collectFeatures(node: SitemapNode, path?: string): { feature: Feature; page: string; nodeId: string }[] {
  const results: { feature: Feature; page: string; nodeId: string }[] = [];
  const nodePath = path ?? node.path;

  if (node.features) {
    for (const f of node.features) {
      results.push({ feature: f, page: nodePath, nodeId: node.id });
    }
  }
  if (node.children) {
    for (const child of node.children) {
      results.push(...collectFeatures(child));
    }
  }
  return results;
}

const allRoots = [sitemapRoot, adminRoot, dashboardRoot, securityRoot, crmRoot];
const allFeatureEntries = allRoots.flatMap((root) => collectFeatures(root));

// ─── Phase별 작업 목록 ───

function buildTasks(phase: PhaseNumber): Task[] {
  return allFeatureEntries
    .filter((e) => e.feature.phase === phase)
    .map((e, i) => ({
      id: `${phase}-${i}`,
      title: e.feature.name,
      status: e.feature.done ? "done" as const : "todo" as const,
      phase,
      page: e.page || undefined,
    }));
}

export const phases: PhaseInfo[] = [
  {
    phase: 1,
    title: phaseStyle[1].label,
    description: "오늘~다음주: 공유회/셀피쉬클럽 관련 + 핵심 기능",
    tasks: buildTasks(1),
  },
  {
    phase: 2,
    title: phaseStyle[2].label,
    description: "VOD, 결제, 어드민 확장, 보안, 블로그 개선",
    tasks: buildTasks(2),
  },
  {
    phase: 3,
    title: phaseStyle[3].label,
    description: "AI 자동화, CRM, SEO 최종, 포트폴리오",
    tasks: buildTasks(3),
  },
];

// ─── 사이트맵 ───

function nodeToPage(node: SitemapNode, auth: "none" | "user" | "admin" = "none"): SitemapPage {
  const features = node.features ?? [];
  const totalFeatures = features.length;
  const doneFeatures = features.filter((f) => f.done).length;

  let status: PageStatus;
  if (totalFeatures === 0) {
    status = node.status === "done" ? "done" : node.status === "in-progress" ? "in-progress" : "not-started";
  } else if (doneFeatures === totalFeatures) {
    status = "done";
  } else if (doneFeatures > 0 || node.status === "in-progress") {
    status = "in-progress";
  } else {
    status = "not-started";
  }

  return {
    path: node.path,
    name: node.name,
    auth,
    status,
    phase: node.phase,
    children: node.children?.map((child) => nodeToPage(child, auth)),
  };
}

export const sitemap: SitemapPage[] = [
  // 퍼블릭 페이지 (홈 + 자식들)
  nodeToPage(sitemapRoot, "none"),
  ...(sitemapRoot.children?.map((child) => {
    const auth = child.id === "mypage" ? "user" as const : "none" as const;
    return nodeToPage(child, auth);
  }) ?? []),
  // 어드민/내부
  nodeToPage(adminRoot, "admin"),
  nodeToPage(dashboardRoot, "none"),
  nodeToPage(securityRoot, "none"),
  nodeToPage(crmRoot, "none"),
];

// ─── CRM 에이전트 ───

const crmFeatures = crmRoot.features ?? [];
const crmDone = crmFeatures.filter((f) => f.done).length;

export const crmAgents: CrmAgent[] = [
  {
    id: "crm-emily",
    name: "Emily (CRM 자동화)",
    description: crmFeatures.map((f) => f.name).join(" / "),
    status: crmDone === crmFeatures.length ? "active" : crmDone > 0 ? "ready" : "not-started",
  },
];

// ─── 헬퍼 함수 ───

export function getPhaseProgress(phase: PhaseInfo) {
  if (phase.tasks.length === 0) return 0;
  const done = phase.tasks.filter((t) => t.status === "done").length;
  return Math.round((done / phase.tasks.length) * 100);
}

export function getOverallStats() {
  const allTasks = phases.flatMap((p) => p.tasks);
  const done = allTasks.filter((t) => t.status === "done").length;
  const inProgress = allTasks.filter((t) => t.status === "in-progress").length;
  const todo = allTasks.filter((t) => t.status === "todo").length;
  return { total: allTasks.length, done, inProgress, todo, blocked: 0 };
}

export function getTasksForPage(path: string) {
  return phases.flatMap((p) => p.tasks).filter((t) => t.page === path);
}

export function getSitemapStats() {
  const allPages = sitemap.flatMap((p) => [p, ...(p.children ?? [])]);
  const done = allPages.filter((p) => p.status === "done").length;
  const inProgress = allPages.filter((p) => p.status === "in-progress").length;
  const notStarted = allPages.filter((p) => p.status === "not-started").length;
  return { total: allPages.length, done, inProgress, notStarted };
}
