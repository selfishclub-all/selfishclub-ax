"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  iid: string;
  i_title: string;
  i_title_userside: string | null;
  i_type: string;
  i_formid_webflow: string;
  i_paid_tf: boolean;
  i_price: number | null;
  i_event_count: number;
  i_live_count_max: number | null;
  i_total_revenue: number | null;
  i_eventdate: string | null;
  i_full_schedule: string | null;
  i_category: string[] | null;
  i_vodurl: string | null;
  is_visible: boolean;
  created_at: string;
}

interface GeneratedContent {
  hook: string;
  summary: string;
  curriculum: { title: string; items: string[] }[];
  speakers: { name: string; title: string; desc: string; before: string; after: string }[];
  target: string[];
  timetable: { time: string; title: string; desc: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
  imageSuggestions: { section: string; suggestion: string }[];
}

const programTypes = [
  { value: "sharing", label: "이기적공유회" },
  { value: "challenge", label: "이기적챌린지" },
  { value: "workshop", label: "워크숍" },
  { value: "special", label: "스페셜" },
];

const inputClass = "w-full h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition";
const labelClass = "text-xs font-medium text-[#888] mb-1 block";

export default function ProgramsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "create">("list");
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genElapsed, setGenElapsed] = useState(0);
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [sectionToggles, setSectionToggles] = useState<Record<string, boolean>>({
    hook: true, summary: true, curriculum: true, speakers: true,
    target: true, timetable: true, benefits: true, faq: true,
  });

  const [selectedIids, setSelectedIids] = useState<Set<string>>(new Set());

  function toggleSelect(iid: string) {
    setSelectedIids((prev) => {
      const next = new Set(prev);
      if (next.has(iid)) next.delete(iid);
      else next.add(iid);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIids.size === items.length) {
      setSelectedIids(new Set());
    } else {
      setSelectedIids(new Set(items.map((i) => i.iid)));
    }
  }

  async function setVisibility(visible: boolean) {
    if (selectedIids.size === 0) { alert("프로그램을 선택해주세요."); return; }
    await Promise.all(
      Array.from(selectedIids).map((iid) =>
        fetch("/api/admin/programs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ iid, is_visible: visible }),
        })
      )
    );
    setItems((prev) => prev.map((i) => selectedIids.has(i.iid) ? { ...i, is_visible: visible } : i));
    setSelectedIids(new Set());
  }

  const [form, setForm] = useState({
    i_title: "",
    i_title_userside: "",
    i_type: "sharing",
    i_formid_webflow: "",
    i_paid_tf: true,
    i_price: 9900,
    i_live_count_max: "",
    i_eventdate: "",
    i_time: "19:00",
    i_format: "온라인",
    i_duration: "120분",
    sessions: [{ speaker: "", keyword: "", detail: "" }],
    hookDirection: "",
    beforeAfter: "",
    targetHint: "",
    benefits: "",
    appealPoints: "",
    transcript: "",
  });

  useEffect(() => { fetchItems(); }, []);

  useEffect(() => {
    if (!generating) { setGenElapsed(0); return; }
    const timer = setInterval(() => setGenElapsed((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [generating]);

  async function fetchItems() {
    const res = await fetch("/api/admin/programs");
    const json = await res.json();
    if (json.data) setItems(json.data);
    setLoading(false);
  }

  function addSession() { setForm({ ...form, sessions: [...form.sessions, { speaker: "", keyword: "", detail: "" }] }); }
  function removeSession(i: number) { setForm({ ...form, sessions: form.sessions.filter((_, idx) => idx !== i) }); }
  function updateSession(i: number, field: "speaker" | "keyword" | "detail", v: string) {
    const s = [...form.sessions];
    s[i] = { ...s[i], [field]: v };
    setForm({ ...form, sessions: s });
  }

  async function handleGenerate() {
    setGenerating(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);
    try {
      const res = await fetch("/api/admin/generate", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.i_title_userside || form.i_title,
          date: form.i_eventdate,
          time: form.i_time,
          format: form.i_format,
          duration: form.i_duration,
          price: form.i_paid_tf ? form.i_price : 0,
          sessions: form.sessions.filter((s) => s.speaker || s.keyword),
          hookDirection: form.hookDirection,
          beforeAfter: form.beforeAfter,
          targetHint: form.targetHint,
          benefits: form.benefits,
          appealPoints: form.appealPoints,
          transcript: form.transcript,
        }),
      });
      const json = await res.json();
      if (json.error) {
        alert(`생성 실패: ${json.error}`);
      } else {
        setGenerated(json.data);
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        alert("120초 초과로 생성이 취소되었습니다. 녹음 스크립트가 길면 핵심 부분만 남겨보세요.");
      } else {
        alert("생성 중 오류가 발생했습니다.");
      }
    }
    clearTimeout(timeout);
    setGenerating(false);
  }

  async function handleSave() {
    if (!form.i_title || !form.i_formid_webflow) {
      alert("제목과 URL slug는 필수입니다.");
      return;
    }
    setSubmitting(true);

    // 활성화된 섹션만 포함한 콘텐츠
    const content = generated ? {
      ...(sectionToggles.hook && { hook: generated.hook }),
      ...(sectionToggles.summary && { summary: generated.summary }),
      ...(sectionToggles.curriculum && { curriculum: generated.curriculum }),
      ...(sectionToggles.speakers && { speakers: generated.speakers }),
      ...(sectionToggles.target && { target: generated.target }),
      ...(sectionToggles.timetable && { timetable: generated.timetable }),
      ...(sectionToggles.benefits && { benefits: generated.benefits }),
      ...(sectionToggles.faq && { faq: generated.faq }),
      imageSuggestions: generated.imageSuggestions,
    } : null;

    const res = await fetch("/api/admin/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i_title: form.i_title,
        i_title_userside: form.i_title_userside || null,
        i_type: form.i_type,
        i_formid_webflow: form.i_formid_webflow,
        i_paid_tf: form.i_paid_tf,
        i_price: form.i_paid_tf ? form.i_price : null,
        i_live_count_max: form.i_live_count_max ? Number(form.i_live_count_max) : null,
        i_eventdate: form.i_eventdate || null,
        i_content: content,
      }),
    });

    const json = await res.json();
    setSubmitting(false);

    if (json.error) {
      alert(`등록 실패: ${json.error}`);
      return;
    }

    alert("프로그램이 등록되었습니다!");
    setView("list");
    setGenerated(null);
    fetchItems();
  }

  function toggleSection(key: string) {
    setSectionToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // 미리보기에서 텍스트 편집
  function updateGeneratedField(path: string, value: string) {
    if (!generated) return;
    const updated = { ...generated };
    if (path === "hook") updated.hook = value;
    else if (path === "summary") updated.summary = value;
    setGenerated(updated);
  }

  // ─── 목록 뷰 ───
  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">프로그램 관리</h1>
            <p className="text-sm text-[#888]">공유회, 챌린지 등 프로그램 등록 및 관리</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedIids.size > 0 && (
              <>
                <span className="text-xs text-[#888]">{selectedIids.size}개 선택</span>
                <button onClick={() => setVisibility(true)} className="px-3 py-1.5 text-xs font-bold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 rounded-lg hover:bg-[#22C55E]/20 transition-colors">
                  노출
                </button>
                <button onClick={() => setVisibility(false)} className="px-3 py-1.5 text-xs font-bold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 rounded-lg hover:bg-[#EF4444]/20 transition-colors">
                  비노출
                </button>
              </>
            )}
            <Link href="/admin/programs/detail?new=true" className="bg-[#E2E545] text-[#0A0A0A] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#CDD03B] transition-colors">
              + 새 프로그램
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-[#888] text-sm">불러오는 중...</p>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-12 text-center">
            <p className="text-[#888]">등록된 프로그램이 없습니다</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  <th className="text-center px-3 py-3 w-10">
                    <input type="checkbox" checked={selectedIids.size === items.length && items.length > 0} onChange={toggleSelectAll} className="rounded cursor-pointer" />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[#888]">제목</th>
                  <th className="text-center px-3 py-3 font-medium text-[#888] w-14">노출</th>
                  <th className="text-left px-4 py-3 font-medium text-[#888]">유형</th>
                  <th className="text-left px-4 py-3 font-medium text-[#888]">가격</th>
                  <th className="text-left px-4 py-3 font-medium text-[#888]">신청</th>
                  <th className="text-left px-4 py-3 font-medium text-[#888]">행사일</th>
                  <th className="text-left px-4 py-3 font-medium text-[#888]">매출</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.iid} className={`border-b border-[#E5E5E5] last:border-none transition-colors ${item.is_visible === false ? "opacity-50" : "hover:bg-[#FAFAF8]"}`}>
                    <td className="text-center px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIids.has(item.iid)}
                        onChange={() => toggleSelect(item.iid)}
                        className="rounded cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/programs/detail?iid=${item.iid}`} className="block hover:underline">
                        <p className="font-medium text-[#0A0A0A]">{item.i_title_userside || item.i_title}</p>
                        <p className="text-xs text-[#999]">/{item.i_formid_webflow}</p>
                      </Link>
                    </td>
                    <td className="text-center px-3 py-3">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.is_visible === false ? "bg-[#EF4444]" : "bg-[#22C55E]"}`} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-[#F5F5F0] text-[#444] rounded-full px-2.5 py-0.5 text-xs">{item.i_type}</span>
                    </td>
                    <td className="px-4 py-3 text-[#444]">{item.i_paid_tf ? `${(item.i_price ?? 0).toLocaleString()}원` : "무료"}</td>
                    <td className="px-4 py-3 text-[#444]">{item.i_event_count ?? 0}{item.i_live_count_max ? `/${item.i_live_count_max}` : ""}명</td>
                    <td className="px-4 py-3 text-[#888]">{item.i_eventdate ?? "—"}</td>
                    <td className="px-4 py-3 text-[#444]">{item.i_total_revenue ? `${item.i_total_revenue.toLocaleString()}원` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ─── 생성 뷰 (2컬럼) ───
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">프로그램 등록</h1>
          <p className="text-sm text-[#888]">핵심 정보를 입력하고 AI 초안을 생성하세요</p>
        </div>
        <button onClick={() => { setView("list"); setGenerated(null); }} className="text-[#888] hover:text-[#0A0A0A] text-sm transition-colors">
          ← 목록으로
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── 왼쪽: 입력 폼 ─── */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#0A0A0A]">기본 정보</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>유형</label>
                <select value={form.i_type} onChange={(e) => setForm({ ...form, i_type: e.target.value })} className={inputClass}>
                  {programTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>URL slug</label>
                <input value={form.i_formid_webflow} onChange={(e) => setForm({ ...form, i_formid_webflow: e.target.value })} placeholder="ai-claude5" required className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>제목 (내부용)</label>
              <input value={form.i_title} onChange={(e) => setForm({ ...form, i_title: e.target.value })} placeholder="이기적공유회_AI클로드활용법" required className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>제목 (유저 노출용 — AI 생성 시 이 제목 사용)</label>
              <input value={form.i_title_userside} onChange={(e) => setForm({ ...form, i_title_userside: e.target.value })} placeholder="AI, '딸-깍'이 가능할까요?" className={inputClass} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>날짜</label>
                <input type="date" value={form.i_eventdate} onChange={(e) => setForm({ ...form, i_eventdate: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>시간</label>
                <input value={form.i_time} onChange={(e) => setForm({ ...form, i_time: e.target.value })} placeholder="19:00" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>소요시간</label>
                <input value={form.i_duration} onChange={(e) => setForm({ ...form, i_duration: e.target.value })} placeholder="120분" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>포맷</label>
                <select value={form.i_format} onChange={(e) => setForm({ ...form, i_format: e.target.value })} className={inputClass}>
                  <option value="온라인">온라인</option>
                  <option value="오프라인">오프라인</option>
                  <option value="하이브리드">하이브리드</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>유료 여부</label>
                <select value={form.i_paid_tf ? "true" : "false"} onChange={(e) => setForm({ ...form, i_paid_tf: e.target.value === "true" })} className={inputClass}>
                  <option value="false">무료</option>
                  <option value="true">유료</option>
                </select>
              </div>
              {form.i_paid_tf && (
                <div>
                  <label className={labelClass}>가격 (원)</label>
                  <input type="number" value={form.i_price} onChange={(e) => setForm({ ...form, i_price: Number(e.target.value) })} className={inputClass} />
                </div>
              )}
            </div>

            <div>
              <label className={labelClass}>최대 인원 (선택)</label>
              <input type="number" value={form.i_live_count_max} onChange={(e) => setForm({ ...form, i_live_count_max: e.target.value })} placeholder="미입력 시 무제한" className={inputClass} />
            </div>
          </div>

          {/* 세션 (공유자 + 키워드) */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0A0A0A]">세션 구성</h2>
              <button type="button" onClick={addSession} className="text-xs text-[#0A0A0A] hover:underline">+ 세션 추가</button>
            </div>
            <p className="text-xs text-[#999]">각 세션의 공유자와 핵심 키워드를 함께 입력하세요</p>
            {form.sessions.map((s, i) => (
              <div key={i} className="bg-[#F5F5F0] rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#999] font-medium">세션 {i + 1}</span>
                  {form.sessions.length > 1 && (
                    <button type="button" onClick={() => removeSession(i)} className="text-red-400/60 hover:text-red-400 text-xs">삭제</button>
                  )}
                </div>
                <input value={s.speaker} onChange={(e) => updateSession(i, "speaker", e.target.value)} placeholder="공유자 이름 (예: 젬마)" className={inputClass} />
                <input value={s.keyword} onChange={(e) => updateSession(i, "keyword", e.target.value)} placeholder="세션 제목 (예: AI 에이전트 실전 활용기)" className={inputClass} />
                <textarea value={s.detail || ""} onChange={(e) => updateSession(i, "detail", e.target.value)} placeholder="세션 상세 내용 — 다룰 주제, 사례, 핵심 메시지 등 자유롭게 적어주세요" rows={3} className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-y" />
              </div>
            ))}
          </div>

          {/* 콘텐츠 힌트 — 대충 적어도 AI가 정제 */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-[#0A0A0A] mb-1">콘텐츠 힌트</h2>
              <p className="text-xs text-[#999]">완성된 문구가 아니어도 괜찮아요. 떠오르는 대로 적으면 AI가 정제합니다.</p>
            </div>

            <div>
              <label className={labelClass}>핵심 훅 / 고민 (이 공유회를 왜 들어야 하는지)</label>
              <textarea
                value={form.hookDirection}
                onChange={(e) => setForm({ ...form, hookDirection: e.target.value })}
                placeholder="예: 공들여 만든 콘텐츠인데 아무도 안 봄, AI 영상 만들어봤는데 퀄리티가 구림, 자동화 하고싶은데 뭐부터 해야할지 모르겠음"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-none"
              />
            </div>

            <div>
              <label className={labelClass}>Before → After (이전에는 이랬는데, 지금은 이렇다)</label>
              <textarea
                value={form.beforeAfter}
                onChange={(e) => setForm({ ...form, beforeAfter: e.target.value })}
                placeholder="예: 매번 알림톡 수동발송 하루3시간 → 슬랙 승인 한번이면 끝 5분, 메이크 구독료 연240만원 → n8n 무료"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-none"
              />
            </div>

            <div>
              <label className={labelClass}>타겟 힌트 (어떤 사람이 들으면 좋을지)</label>
              <textarea
                value={form.targetHint}
                onChange={(e) => setForm({ ...form, targetHint: e.target.value })}
                placeholder="예: AI 써봤는데 실무에 적용 못하는 마케터, 리뷰 대응 귀찮은 1인 브랜드, 영상 만들어봤는데 안 터지는 크리에이터"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-none"
              />
            </div>

            <div>
              <label className={labelClass}>혜택 (줄 수 있는 것들)</label>
              <textarea
                value={form.benefits}
                onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                placeholder="예: VOD 다시보기, 프롬프트 모음zip, AI요약노트, 얼리버드 특가, 가이드북"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-none"
              />
            </div>

            <div>
              <label className={labelClass}>추가 소구 포인트 (그 외 강조하고 싶은 것)</label>
              <textarea
                value={form.appealPoints}
                onChange={(e) => setForm({ ...form, appealPoints: e.target.value })}
                placeholder="예: 비개발자도 가능, 실제 매출 나온 사례, 라이브에서만 공개되는 특가..."
                rows={2}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-none"
              />
            </div>
          </div>

          {/* 회의 녹음 스크립트 */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0A0A0A]">회의 녹음 스크립트 (선택)</h2>
            <p className="text-xs text-[#999]">기획 회의 녹음 스크립트가 있으면 붙여넣어 주세요. AI가 핵심 내용을 추출해서 초안에 반영합니다.</p>
            <textarea
              value={form.transcript}
              onChange={(e) => setForm({ ...form, transcript: e.target.value })}
              placeholder="회의 녹음 스크립트를 여기에 붙여넣기..."
              rows={5}
              className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition resize-y"
            />
          </div>

          {/* 초안 생성 버튼 */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating || !form.i_title}
            className="w-full bg-[#E2E545] text-[#0A0A0A] py-3 rounded-xl text-sm font-bold hover:bg-[#CDD03B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {generating ? "AI가 초안을 생성하고 있습니다..." : "초안 생성하기"}
          </button>
        </div>

        {/* ─── 오른쪽: 미리보기 ─── */}
        <div className="space-y-4">
          {!generated && !generating && (
            <div className="bg-white border border-[#E5E5E5] border-dashed rounded-xl p-12 text-center">
              <p className="text-[#ccc] text-4xl mb-4">✨</p>
              <p className="text-[#888] text-sm">핵심 정보를 입력하고</p>
              <p className="text-[#888] text-sm">&quot;초안 생성하기&quot; 를 눌러주세요</p>
            </div>
          )}

          {generating && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-12 text-center">
              <div className="inline-block h-8 w-8 border-2 border-[#E2E545] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#666] text-sm">AI가 상세페이지 콘텐츠를 생성 중입니다...</p>
              <p className="text-[#999] text-xs mt-1">{genElapsed}초 경과 · 보통 15~30초 소요</p>
            </div>
          )}

          {generated && (
            <>
              {/* 섹션 토글 */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4">
                <p className="text-xs text-[#888] mb-2">섹션 포함 여부</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(sectionToggles).map(([key, on]) => (
                    <button
                      key={key}
                      onClick={() => toggleSection(key)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${on ? "bg-[#E2E545]/20 border-[#E2E545]/40 text-[#0A0A0A]" : "bg-white border-[#E5E5E5] text-[#999]"}`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              {/* 미리보기 콘텐츠 */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
                {/* 히어로 */}
                {sectionToggles.hook && (
                  <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1a1a1a] p-6">
                    <ImagePlaceholder suggestion={generated.imageSuggestions.find((s) => s.section.includes("히어로") || s.section.includes("hero"))?.suggestion || "히어로 배경 이미지 — 프로그램 주제를 상징하는 사진"} />
                    <p className="text-xs text-white/50 mt-4 uppercase tracking-widest">{form.i_type}</p>
                    <textarea
                      value={generated.hook}
                      onChange={(e) => updateGeneratedField("hook", e.target.value)}
                      className="w-full bg-transparent text-2xl font-bold text-white mt-2 resize-none border-none outline-none"
                      rows={2}
                    />
                    <p className="text-white/40 text-sm mt-2">
                      {form.i_eventdate} {form.i_time} · {form.i_format} · {form.i_paid_tf ? `${form.i_price?.toLocaleString()}원` : "무료"} · {form.i_duration}
                    </p>
                  </div>
                )}

                <div className="p-6 space-y-8">
                  {/* 소개 문구 */}
                  {sectionToggles.summary && (
                    <div>
                      <SectionLabel label="소개" />
                      <textarea
                        value={generated.summary}
                        onChange={(e) => updateGeneratedField("summary", e.target.value)}
                        className="w-full bg-white rounded-lg p-3 text-sm text-[#333] leading-relaxed resize-none border border-[#E5E5E5] outline-none focus:border-[#E2E545]/40"
                        rows={4}
                      />
                    </div>
                  )}

                  {/* 커리큘럼 */}
                  {sectionToggles.curriculum && generated.curriculum.length > 0 && (
                    <div>
                      <SectionLabel label="Curriculum" />
                      <div className="space-y-4">
                        {generated.curriculum.map((section, i) => (
                          <div key={i} className="border-l-2 border-[#E2E545] pl-4">
                            <p className="text-sm font-semibold text-[#0A0A0A] mb-2">{section.title}</p>
                            <ul className="space-y-1">
                              {section.items.map((item, j) => (
                                <li key={j} className="text-xs text-[#888] flex items-start gap-2">
                                  <span className="text-[#0A0A0A] mt-0.5">·</span>{item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <ImagePlaceholder suggestion={generated.imageSuggestions.find((s) => s.section.includes("커리큘럼") || s.section.includes("agenda") || s.section.includes("세션"))?.suggestion || "세션 스크린샷 또는 실습 화면 캡처"} />
                    </div>
                  )}

                  {/* 공유자 */}
                  {sectionToggles.speakers && generated.speakers.length > 0 && (
                    <div>
                      <SectionLabel label="Speakers" />
                      <div className="grid grid-cols-1 gap-3">
                        {generated.speakers.map((s, i) => (
                          <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#F5F5F0] shrink-0 flex items-center justify-center text-xs text-[#999]">
                                {s.name[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-[#0A0A0A] text-sm">{s.name}</p>
                                <p className="text-xs text-[#0A0A0A] mb-1">{s.title}</p>
                                <p className="text-xs text-[#888] leading-relaxed">{s.desc}</p>
                                {s.before && s.after && (
                                  <div className="mt-2 grid grid-cols-2 gap-2">
                                    <div className="bg-white rounded p-2">
                                      <p className="text-[10px] text-[#999] mb-1">6주 전</p>
                                      <p className="text-[11px] text-[#888]">{s.before}</p>
                                    </div>
                                    <div className="bg-[#E2E545]/10 rounded p-2">
                                      <p className="text-[10px] text-[#0A0A0A]/60 mb-1">지금</p>
                                      <p className="text-[11px] text-[#444]">{s.after}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <ImagePlaceholder small suggestion={generated.imageSuggestions.find((im) => im.section.includes(s.name) || im.section.includes("공유자") || im.section.includes("speaker"))?.suggestion || `${s.name}의 프로필 사진 또는 세션 스크린샷`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 대상자 */}
                  {sectionToggles.target && generated.target.length > 0 && (
                    <div>
                      <SectionLabel label="Who is this for" />
                      <div className="grid grid-cols-1 gap-2">
                        {generated.target.map((t, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3">
                            <span className="text-[#0A0A0A] font-bold text-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
                            <p className="text-xs text-[#666]">{t}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 타임테이블 */}
                  {sectionToggles.timetable && generated.timetable.length > 0 && (
                    <div>
                      <SectionLabel label="Timetable" />
                      <div className="space-y-2">
                        {generated.timetable.map((t, i) => (
                          <div key={i} className="flex gap-3 text-xs">
                            <span className="text-[#0A0A0A] font-mono w-12 shrink-0">{t.time}</span>
                            <div>
                              <p className="text-[#333] font-medium">{t.title}</p>
                              <p className="text-[#888]">{t.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 혜택 */}
                  {sectionToggles.benefits && generated.benefits.length > 0 && (
                    <div>
                      <SectionLabel label="Benefits" />
                      <div className="grid grid-cols-1 gap-2">
                        {generated.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3">
                            <span className="text-[#0A0A0A]">✓</span>
                            <p className="text-xs text-[#666]">{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ */}
                  {sectionToggles.faq && generated.faq.length > 0 && (
                    <div>
                      <SectionLabel label="FAQ" />
                      <div className="space-y-3">
                        {generated.faq.map((f, i) => (
                          <div key={i} className="border-b border-[#E5E5E5] pb-3">
                            <p className="text-sm text-[#333] font-medium mb-1">Q. {f.q}</p>
                            <p className="text-xs text-[#888] leading-relaxed">{f.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 이미지 추천 요약 */}
                  {generated.imageSuggestions.length > 0 && (
                    <div>
                      <SectionLabel label="Image Suggestions" />
                      <div className="space-y-2">
                        {generated.imageSuggestions.map((img, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-[#0A0A0A] shrink-0">📸</span>
                            <div>
                              <span className="text-[#888] font-medium">{img.section}</span>
                              <span className="text-[#999]"> — {img.suggestion}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 저장 버튼 */}
              <button
                onClick={handleSave}
                disabled={submitting}
                className="w-full bg-[#E2E545] text-[#0A0A0A] py-3 rounded-xl text-sm font-bold hover:bg-[#CDD03B] transition-colors disabled:opacity-40"
              >
                {submitting ? "저장 중..." : "프로그램 등록 + 콘텐츠 저장"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 서브 컴포넌트 ───

function SectionLabel({ label }: { label: string }) {
  return <p className="text-[10px] text-[#999] tracking-[0.3em] uppercase mb-3">{label}</p>;
}

function ImagePlaceholder({ suggestion, small }: { suggestion: string; small?: boolean }) {
  return (
    <div className={`border-2 border-dashed border-[#E5E5E5] rounded-lg flex items-center gap-3 ${small ? "p-2 mt-2" : "p-4 mt-3"}`}>
      <span className={`text-[#ccc] ${small ? "text-lg" : "text-2xl"}`}>🖼</span>
      <p className={`text-[#999] leading-relaxed ${small ? "text-[10px]" : "text-xs"}`}>
        {suggestion}
      </p>
    </div>
  );
}
