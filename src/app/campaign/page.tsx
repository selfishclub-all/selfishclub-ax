"use client";

import { useState, useEffect, useCallback } from "react";

const CAMPAIGN_PASSWORD = "vjsznftprwhk";

interface CampaignData {
  total: number;
  goal: number;
  todayCount: number;
  newCount: number;
  retentionCount: number;
  utmRanking: { label: string; count: number }[];
  todayUtmRanking: { label: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
  events: {
    ID: number;
    e_created_at: string;
    u_name: string;
    u_phone: string;
    u_email: string;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    utm_term: string | null;
    e_new_tf: string | null;
  }[];
  comment: string;
  updatedAt: string;
}

interface ActionRecord {
  id: number;
  date: string;
  channel: string;
  audience: number;
  cost: number;
  memo: string;
}

function UtmRanking({ ranking }: { ranking: { label: string; count: number }[] }) {
  const [expanded, setExpanded] = useState(false);

  if (ranking.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3">UTM 순위</h2>
        <p className="text-sm text-white/30">UTM 데이터 없음</p>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];
  const top10 = ranking.slice(0, 10);
  const rest = ranking.slice(10);

  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold mb-3">UTM 순위</h2>
      {top10.map((u, i) => {
        const isTop3 = i < 3;
        return (
          <div key={u.label} className="flex items-center gap-3 mb-2">
            <span className="text-sm w-7 shrink-0">{isTop3 ? medals[i] : <span className="text-white/30 font-bold pl-1">{i + 1}</span>}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${isTop3 ? "text-[#E2E545] font-bold" : "text-white/60"}`}>{u.label}</p>
            </div>
            <span className={`text-sm ${isTop3 ? "text-[#E2E545] font-bold" : "text-white/60"}`}>{u.count}명</span>
          </div>
        );
      })}
      {rest.length > 0 && (
        <>
          {!expanded ? (
            <button
              onClick={() => setExpanded(true)}
              className="text-xs text-white/40 mt-2 underline"
            >
              더보기 ({rest.length}개)
            </button>
          ) : (
            <>
              {rest.map((u, i) => (
                <div key={u.label} className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-white/30 w-7 shrink-0 pl-1">{i + 11}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/60 truncate">{u.label}</p>
                  </div>
                  <span className="text-xs text-white/60">{u.count}명</span>
                </div>
              ))}
              <button
                onClick={() => setExpanded(false)}
                className="text-xs text-white/40 mt-2 underline"
              >
                접기
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function CampaignDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "overview">("today");

  // 액션 기록
  const [actions, setActions] = useState<ActionRecord[]>([]);
  const [showActionForm, setShowActionForm] = useState(false);
  const [actionForm, setActionForm] = useState({ date: "", channel: "", audience: "", cost: "", memo: "" });

  useEffect(() => {
    const saved = localStorage.getItem("campaign_actions");
    if (saved) setActions(JSON.parse(saved));
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/campaign");
      const result = await res.json();
      if (result.data) setData(result.data);
    } catch {
      // 조용히 실패
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetchData();
    const interval = setInterval(fetchData, 60 * 60 * 1000); // 1시간
    return () => clearInterval(interval);
  }, [authed, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CAMPAIGN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("비밀번호가 틀렸습니다");
    }
  };

  const saveAction = () => {
    if (!actionForm.date || !actionForm.channel || !actionForm.audience) return;
    const newAction: ActionRecord = {
      id: Date.now(),
      date: actionForm.date,
      channel: actionForm.channel,
      audience: Number(actionForm.audience),
      cost: Number(actionForm.cost) || 0,
      memo: actionForm.memo,
    };
    const updated = [newAction, ...actions];
    setActions(updated);
    localStorage.setItem("campaign_actions", JSON.stringify(updated));
    setActionForm({ date: "", channel: "", audience: "", cost: "", memo: "" });
    setShowActionForm(false);
  };

  const deleteAction = (id: number) => {
    const updated = actions.filter((a) => a.id !== id);
    setActions(updated);
    localStorage.setItem("campaign_actions", JSON.stringify(updated));
  };

  // 로그인 화면
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-1 text-center">Campaign Dashboard</h1>
          <p className="text-sm text-white/40 mb-6 text-center">Sponge Club</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder:text-white/30 focus:outline-none focus:border-[#E2E545]/50 mb-3"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-[#E2E545] text-[#0A0A0A] font-bold text-sm py-3 rounded">
            로그인
          </button>
        </form>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/40">데이터 로딩 중...</p>
      </div>
    );
  }

  const pct = Math.round((data.total / data.goal) * 100);
  const maxDaily = Math.max(...data.dailyTrend.map((d) => d.count), 1);
  const totalActionCost = actions.reduce((s, a) => s + a.cost, 0);
  const totalAudience = actions.reduce((s, a) => s + a.audience, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* 헤더 */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-white/10 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold">Sponge Club</h1>
            <p className="text-xs text-white/40">캠페인 대시보드</p>
          </div>
          <button onClick={fetchData} disabled={loading} className="text-xs text-white/40 border border-white/10 px-3 py-1.5 rounded">
            {loading ? "갱신 중..." : "새로고침"}
          </button>
        </div>
      </div>

      {/* 실시간 코멘트 */}
      <div className="mx-4 mt-4">
        <h2 className="text-sm font-bold mb-2">실시간 코멘트</h2>
        <div className="p-3 bg-[#E2E545]/10 border border-[#E2E545]/30 rounded-lg">
          {data.comment.split("\n").map((line, i) => (
            <p key={i} className="text-sm text-[#E2E545] mb-1 last:mb-0">{line}</p>
          ))}
          <p className="text-[10px] text-white/30 mt-2">
            {new Date(data.updatedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} 기준
          </p>
        </div>
      </div>

      {/* 목표 달성률 */}
      <div className="mx-4 mt-4 p-4 bg-white/5 rounded-lg">
        <div className="flex items-end justify-between mb-2">
          <p className="text-sm text-white/60">목표 달성률</p>
          <p className="text-2xl font-bold">
            {data.total.toLocaleString()} <span className="text-sm text-white/40">/ {data.goal.toLocaleString()}</span>
          </p>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-[#E2E545] h-3 rounded-full transition-all"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p className="text-xs text-white/40 mt-1 text-right">{pct}%</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-2 mx-4 mt-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-[10px] text-white/40">오늘 신청</p>
          <p className="text-lg font-bold">{data.todayCount}<span className="text-xs text-white/40">명</span></p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-[10px] text-white/40">오늘 달성률</p>
          <p className="text-lg font-bold">{Math.round((data.todayCount / data.goal) * 100)}<span className="text-xs text-white/40">%</span></p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-[10px] text-white/40">누적 신규비율</p>
          <p className="text-lg font-bold">{data.total > 0 ? Math.round((data.newCount / data.total) * 100) : 0}<span className="text-xs text-white/40">%</span></p>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-white/10 mx-4 mt-6">
        {(["today", "overview"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium ${
              activeTab === tab ? "text-[#E2E545] border-b-2 border-[#E2E545]" : "text-white/40"
            }`}
          >
            {tab === "today" ? "분석(오늘)" : "분석(누적)"}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 pb-20">
        {/* 분석(오늘) 탭 */}
        {activeTab === "today" && (
          <>
            <p className="text-xs text-white/40 mb-4">오늘 신청 {data.todayCount}명</p>
            <UtmRanking ranking={data.todayUtmRanking} />
          </>
        )}

        {/* 분석(누적) 탭 */}
        {activeTab === "overview" && (
          <>
            <UtmRanking ranking={data.utmRanking} />
          </>
        )}

      </div>

      {/* 날짜별 신청 추이 — 탭 밖 고정 영역 */}
      <div className="px-4 pb-20">
        <h2 className="text-sm font-bold mb-3">날짜별 신청 추이</h2>
        <div className="bg-white/5 rounded-lg p-3 overflow-x-auto">
          <svg
            viewBox={`0 0 ${Math.max(data.dailyTrend.length * 60, 300)} 180`}
            className="w-full"
            style={{ minWidth: `${Math.max(data.dailyTrend.length * 60, 300)}px` }}
          >
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = 150 - ratio * 130;
              return (
                <g key={ratio}>
                  <line x1="40" y1={y} x2={data.dailyTrend.length * 60 - 10} y2={y} stroke="rgba(255,255,255,0.05)" />
                  <text x="35" y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="10">
                    {Math.round(maxDaily * ratio)}
                  </text>
                </g>
              );
            })}
            <polyline
              fill="none"
              stroke="#E2E545"
              strokeWidth="2"
              points={data.dailyTrend
                .map((d, i) => {
                  const x = 50 + i * 55;
                  const y = 150 - (d.count / maxDaily) * 130;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
            {data.dailyTrend.map((d, i) => {
              const x = 50 + i * 55;
              const y = 150 - (d.count / maxDaily) * 130;
              return (
                <g key={d.date}>
                  <circle cx={x} cy={y} r="3" fill="#E2E545" />
                  <text x={x} y={y - 8} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                    {d.count}
                  </text>
                  <text x={x} y={168} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">
                    {d.date.slice(5)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
