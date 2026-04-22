import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const TARGET_IID = "iid_1002";
const TARGET_GOAL = 1300;

export async function GET() {
  // 전체 신청 데이터 조회
  let allEvents: Record<string, unknown>[] = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from("event")
      .select("ID, e_created_at, u_name, u_phone, u_email, utm_source, utm_medium, utm_campaign, utm_content, utm_term, e_new_tf")
      .eq("iid", TARGET_IID)
      .order("e_created_at", { ascending: false })
      .range(from, from + pageSize - 1);
    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 });
    }
    allEvents = allEvents.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const total = allEvents.length;

  // 오늘 신청 수 (DB에 저장된 시간이 이미 KST이므로 변환 불필요)
  const now = new Date();
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const todayStr = kstNow.toISOString().slice(0, 10);
  const todayCount = allEvents.filter((e) => {
    const d = new Date(e.e_created_at as string);
    return d.toISOString().slice(0, 10) === todayStr;
  }).length;

  // 신규/재방문
  const newCount = allEvents.filter((e) => e.e_new_tf === "new").length;
  const retentionCount = total - newCount;

  // UTM별 전환 집계 (누적)
  const utmMap: Record<string, number> = {};
  for (const e of allEvents) {
    const key = [e.utm_source, e.utm_medium, e.utm_campaign, e.utm_content]
      .filter(Boolean)
      .join(" / ");
    if (key) {
      utmMap[key] = (utmMap[key] || 0) + 1;
    }
  }
  const utmRanking = Object.entries(utmMap)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));

  // UTM별 전환 집계 (오늘)
  const todayEvents = allEvents.filter((e) => {
    const d = new Date(e.e_created_at as string);
    return d.toISOString().slice(0, 10) === todayStr;
  });
  const todayUtmMap: Record<string, number> = {};
  for (const e of todayEvents) {
    const key = [e.utm_source, e.utm_medium, e.utm_campaign, e.utm_content]
      .filter(Boolean)
      .join(" / ");
    if (key) {
      todayUtmMap[key] = (todayUtmMap[key] || 0) + 1;
    }
  }
  const todayUtmRanking = Object.entries(todayUtmMap)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));

  // 날짜별 신청 추이
  const dateMap: Record<string, number> = {};
  for (const e of allEvents) {
    const d = new Date(e.e_created_at as string);
    const dateKey = d.toISOString().slice(0, 10);
    dateMap[dateKey] = (dateMap[dateKey] || 0) + 1;
  }
  const dailyTrend = Object.entries(dateMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  // 규칙 기반 AI 코멘트 생성
  const comment = generateComment({
    total,
    goal: TARGET_GOAL,
    todayCount,
    newCount,
    retentionCount,
    utmRanking,
    dailyTrend,
  });

  return NextResponse.json({
    data: {
      total,
      goal: TARGET_GOAL,
      todayCount,
      newCount,
      retentionCount,
      utmRanking,
      todayUtmRanking,
      dailyTrend,
      events: allEvents,
      comment,
      updatedAt: new Date().toISOString(),
    },
    error: null,
  });
}

function generateComment(d: {
  total: number;
  goal: number;
  todayCount: number;
  newCount: number;
  retentionCount: number;
  utmRanking: { label: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
}): string {
  const pct = Math.round((d.total / d.goal) * 100);
  const remaining = d.goal - d.total;

  // 목표 달성 여부
  if (d.total >= d.goal) {
    return `🎉 목표 ${d.goal.toLocaleString()}명 달성! 현재 ${d.total.toLocaleString()}명 신청 완료.`;
  }

  const parts: string[] = [];

  // 달성률 코멘트
  if (pct >= 80) {
    parts.push(`목표까지 ${remaining.toLocaleString()}명 남았습니다. 거의 다 왔어요!`);
  } else if (pct >= 50) {
    parts.push(`목표 대비 ${pct}% 달성, ${remaining.toLocaleString()}명 남았습니다.`);
  } else {
    parts.push(`현재 ${d.total.toLocaleString()}명 신청 (목표 대비 ${pct}%).`);
  }

  // 오늘 신청 속도
  if (d.todayCount > 0) {
    parts.push(`오늘 ${d.todayCount}명 신청.`);
  }

  // 전환 베스트 UTM
  if (d.utmRanking.length > 0) {
    const best = d.utmRanking[0];
    parts.push(`전환 베스트: ${best.label} (${best.count}명).`);
  }

  // 일평균 속도 기반 예측
  if (d.dailyTrend.length >= 2) {
    const recentDays = d.dailyTrend.slice(-3);
    const avgPerDay = Math.round(recentDays.reduce((s, x) => s + x.count, 0) / recentDays.length);
    if (avgPerDay > 0) {
      const daysLeft = Math.ceil(remaining / avgPerDay);
      parts.push(`최근 일평균 ${avgPerDay}명, 이 속도면 약 ${daysLeft}일 후 달성 예상.`);
    }
  }

  return parts.join("\n");
}
