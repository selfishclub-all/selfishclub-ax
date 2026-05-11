"use client";

import { useEffect, useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_default: boolean;
}

const inputClass = "w-full h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition";

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");

  useEffect(() => { fetchFaqs(); }, []);

  async function fetchFaqs() {
    const res = await fetch("/api/admin/faq");
    const json = await res.json();
    if (json.data) setFaqs(json.data);
    setLoading(false);
  }

  async function handleAdd() {
    if (!newQ.trim() || !newA.trim()) { alert("질문과 답변을 입력해주세요."); return; }
    setAdding(true);
    const res = await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: newQ, answer: newA }),
    });
    const json = await res.json();
    setAdding(false);
    if (json.error) { alert(`추가 실패: ${json.error}`); return; }
    setNewQ("");
    setNewA("");
    fetchFaqs();
  }

  async function handleUpdate(id: number) {
    const res = await fetch("/api/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, question: editQ, answer: editA }),
    });
    const json = await res.json();
    if (json.error) { alert(`수정 실패: ${json.error}`); return; }
    setEditingId(null);
    fetchFaqs();
  }

  async function handleDelete(id: number) {
    if (!confirm("이 FAQ를 삭제할까요?")) return;
    const res = await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.error) { alert(`삭제 실패: ${json.error}`); return; }
    fetchFaqs();
  }

  function startEdit(faq: FaqItem) {
    setEditingId(faq.id);
    setEditQ(faq.question);
    setEditA(faq.answer);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">FAQ 관리</h1>
        <p className="text-sm text-[#888]">FAQ를 등록하면 상세 페이지에서 골라서 붙일 수 있습니다</p>
      </div>

      {/* 새 FAQ 추가 */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 mb-6 space-y-3">
        <h2 className="text-sm font-bold text-[#0A0A0A]">새 FAQ 추가</h2>
        <input value={newQ} onChange={(e) => setNewQ(e.target.value)} placeholder="질문" className={inputClass} />
        <textarea
          value={newA}
          onChange={(e) => setNewA(e.target.value)}
          placeholder="답변"
          rows={3}
          className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] outline-none transition resize-y"
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          className="bg-[#E2E545] text-[#0A0A0A] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#CDD03B] transition-colors disabled:opacity-40"
        >
          {adding ? "추가 중..." : "FAQ 추가"}
        </button>
      </div>

      {/* FAQ 목록 */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-sm text-[#888] p-5">불러오는 중...</p>
        ) : faqs.length === 0 ? (
          <p className="text-sm text-[#888] p-5">등록된 FAQ가 없습니다</p>
        ) : (
          <div className="divide-y divide-[#E5E5E5]">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-5">
                {editingId === faq.id ? (
                  <div className="space-y-2">
                    <input value={editQ} onChange={(e) => setEditQ(e.target.value)} className={inputClass} />
                    <textarea
                      value={editA}
                      onChange={(e) => setEditA(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] focus:border-[#0A0A0A] outline-none transition resize-y"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(faq.id)} className="text-xs px-3 py-1.5 bg-[#E2E545] text-[#0A0A0A] rounded-lg font-bold">저장</button>
                      <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 text-[#888]">취소</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-[#0A0A0A]">Q. {faq.question}</p>
                        {faq.is_default && <span className="text-[10px] text-[#E2E545] bg-[#E2E545]/10 px-1.5 py-0.5 rounded">기본</span>}
                      </div>
                      <p className="text-xs text-[#888] leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => startEdit(faq)} className="text-xs px-2 py-1 text-[#888] hover:text-[#0A0A0A]">수정</button>
                      {!faq.is_default && (
                        <button onClick={() => handleDelete(faq.id)} className="text-xs px-2 py-1 text-red-400/60 hover:text-red-400">삭제</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
