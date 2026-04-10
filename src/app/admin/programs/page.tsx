"use client";

import { useEffect, useState } from "react";

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
  created_at: string;
}

const programTypes = [
  { value: "sharing", label: "이기적공유회" },
  { value: "challenge", label: "이기적챌린지" },
  { value: "workshop", label: "워크숍" },
  { value: "special", label: "스페셜" },
];

export default function ProgramsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 폼 상태
  const [form, setForm] = useState({
    i_title: "",
    i_title_userside: "",
    i_type: "sharing",
    i_formid_webflow: "",
    i_paid_tf: true,
    i_price: 9900,
    i_live_count_max: "",
    i_eventdate: "",
    i_full_schedule: "",
    i_category: [] as string[],
    i_vodurl: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/programs");
    const json = await res.json();
    if (json.data) setItems(json.data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/admin/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        i_live_count_max: form.i_live_count_max ? Number(form.i_live_count_max) : null,
        i_category: form.i_category.length > 0 ? form.i_category : null,
      }),
    });

    const json = await res.json();
    setSubmitting(false);

    if (json.error) {
      alert(`등록 실패: ${json.error}`);
      return;
    }

    setShowForm(false);
    setForm({
      i_title: "",
      i_title_userside: "",
      i_type: "sharing",
      i_formid_webflow: "",
      i_paid_tf: true,
      i_price: 9900,
      i_live_count_max: "",
      i_eventdate: "",
      i_full_schedule: "",
      i_category: [],
      i_vodurl: "",
    });
    fetchItems();
  }

  // slug 자동 생성
  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      i_title: value,
      i_formid_webflow: prev.i_formid_webflow || "",
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">프로그램 관리</h1>
          <p className="text-sm text-[#888888]">
            공유회, 챌린지 등 프로그램 등록 및 관리
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#222] transition-colors"
        >
          {showForm ? "취소" : "+ 새 프로그램"}
        </button>
      </div>

      {/* 등록 폼 */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-[#E5E5E5] p-6 mb-6 space-y-4"
        >
          <h2 className="text-lg font-bold mb-2">프로그램 등록</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 유형 */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                유형
              </label>
              <select
                value={form.i_type}
                onChange={(e) => setForm({ ...form, i_type: e.target.value })}
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition bg-white"
              >
                {programTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 제목 (내부용) */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                제목 (내부용)
              </label>
              <input
                type="text"
                value={form.i_title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="예: 이기적공유회_AI클로드활용법"
                required
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition"
              />
            </div>

            {/* 제목 (유저노출용) */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                제목 (유저 노출용)
              </label>
              <input
                type="text"
                value={form.i_title_userside}
                onChange={(e) =>
                  setForm({ ...form, i_title_userside: e.target.value })
                }
                placeholder="예: AI 클로드 200% 활용법"
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition"
              />
            </div>

            {/* slug */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                URL slug
              </label>
              <input
                type="text"
                value={form.i_formid_webflow}
                onChange={(e) =>
                  setForm({ ...form, i_formid_webflow: e.target.value })
                }
                placeholder="예: ai-claude5"
                required
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition"
              />
            </div>

            {/* 유료 여부 */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                유료 여부
              </label>
              <select
                value={form.i_paid_tf ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, i_paid_tf: e.target.value === "true" })
                }
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition bg-white"
              >
                <option value="true">유료</option>
                <option value="false">무료</option>
              </select>
            </div>

            {/* 가격 */}
            {form.i_paid_tf && (
              <div>
                <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                  가격 (원)
                </label>
                <input
                  type="number"
                  value={form.i_price}
                  onChange={(e) =>
                    setForm({ ...form, i_price: Number(e.target.value) })
                  }
                  required
                  className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition"
                />
              </div>
            )}

            {/* 최대 인원 */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                최대 인원 (선택)
              </label>
              <input
                type="number"
                value={form.i_live_count_max}
                onChange={(e) =>
                  setForm({ ...form, i_live_count_max: e.target.value })
                }
                placeholder="미입력 시 무제한"
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition"
              />
            </div>

            {/* 행사 날짜 */}
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] mb-2 block">
                행사 날짜
              </label>
              <input
                type="date"
                value={form.i_eventdate}
                onChange={(e) =>
                  setForm({ ...form, i_eventdate: e.target.value })
                }
                className="w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#0A0A0A] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#222] transition-colors disabled:opacity-50"
          >
            {submitting ? "등록 중..." : "프로그램 등록"}
          </button>
        </form>
      )}

      {/* 프로그램 목록 */}
      {loading ? (
        <p className="text-[#888888] text-sm">불러오는 중...</p>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-12 text-center">
          <p className="text-[#888888]">등록된 프로그램이 없습니다</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F5F5F0]">
                <th className="text-left px-4 py-3 font-medium text-[#888888]">
                  제목
                </th>
                <th className="text-left px-4 py-3 font-medium text-[#888888]">
                  유형
                </th>
                <th className="text-left px-4 py-3 font-medium text-[#888888]">
                  가격
                </th>
                <th className="text-left px-4 py-3 font-medium text-[#888888]">
                  신청
                </th>
                <th className="text-left px-4 py-3 font-medium text-[#888888]">
                  행사일
                </th>
                <th className="text-left px-4 py-3 font-medium text-[#888888]">
                  매출
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.iid}
                  className="border-b border-[#E5E5E5] last:border-none hover:bg-[#F5F5F0] transition-colors"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{item.i_title}</p>
                    <p className="text-xs text-[#888888]">
                      {item.i_formid_webflow}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-[#F5F5F0] text-[#0A0A0A] rounded-full px-2.5 py-0.5 text-xs">
                      {item.i_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {item.i_paid_tf
                      ? `${(item.i_price ?? 0).toLocaleString()}원`
                      : "무료"}
                  </td>
                  <td className="px-4 py-3">
                    {item.i_event_count ?? 0}
                    {item.i_live_count_max
                      ? `/${item.i_live_count_max}`
                      : ""}
                    명
                  </td>
                  <td className="px-4 py-3 text-[#888888]">
                    {item.i_eventdate ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {item.i_total_revenue
                      ? `${item.i_total_revenue.toLocaleString()}원`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
