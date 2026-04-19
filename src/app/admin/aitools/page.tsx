"use client";

import { useState, useEffect } from "react";

interface AiTool {
  id: number;
  name: string;
  description: string | null;
  logo_url: string | null;
  referral_url: string | null;
  benefit: string | null;
  is_visible: boolean;
}

export default function AdminAiToolsPage() {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [editing, setEditing] = useState<AiTool | null>(null);
  const [form, setForm] = useState({ name: "", description: "", logo_url: "", referral_url: "", benefit: "", is_visible: true });
  const [fetchUrl, setFetchUrl] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchTools = () => {
    fetch("/api/admin/aitools").then(r => r.json()).then(d => setTools(d.data || []));
  };

  useEffect(() => { fetchTools(); }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", logo_url: "", referral_url: "", benefit: "", is_visible: true });
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch("/api/admin/aitools", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) });
    } else {
      await fetch("/api/admin/aitools", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    fetchTools();
  };

  const handleEdit = (tool: AiTool) => {
    setEditing(tool);
    setForm({ name: tool.name, description: tool.description || "", logo_url: tool.logo_url || "", referral_url: tool.referral_url || "", benefit: tool.benefit || "", is_visible: tool.is_visible });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/aitools", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchTools();
  };

  const toggleVisibility = async (tool: AiTool) => {
    await fetch("/api/admin/aitools", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: tool.id, is_visible: !tool.is_visible }) });
    fetchTools();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">추천 AI 툴 관리</h1>

        {/* URL로 자동 가져오기 */}
        <div className="bg-[#E2E545]/10 border border-[#E2E545]/20 rounded-lg p-6 mb-6">
          <h2 className="text-base font-semibold mb-3">URL로 자동 가져오기</h2>
          <div className="flex gap-2">
            <input
              value={fetchUrl}
              onChange={e => setFetchUrl(e.target.value)}
              placeholder="레퍼럴 링크 URL 입력"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30"
            />
            <button
              type="button"
              disabled={fetching || !fetchUrl}
              onClick={async () => {
                setFetching(true);
                try {
                  const res = await fetch("/api/admin/og-fetch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: fetchUrl }) });
                  const result = await res.json();
                  if (result.data) {
                    setForm(prev => ({
                      ...prev,
                      name: result.data.title || prev.name,
                      description: result.data.description || prev.description,
                      logo_url: result.data.image || result.data.icon || prev.logo_url,
                      referral_url: fetchUrl,
                    }));
                  }
                } catch { /* ignore */ }
                setFetching(false);
              }}
              className="bg-[#E2E545] text-[#0A0A0A] font-bold text-sm px-5 py-3 rounded disabled:opacity-50"
            >
              {fetching ? "가져오는 중..." : "자동 입력"}
            </button>
          </div>
          <p className="text-xs text-white/30 mt-2">URL을 넣고 &quot;자동 입력&quot;을 누르면 이름, 설명, 로고가 아래 폼에 자동으로 채워져요.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "수정" : "새 AI 툴 등록"}</h2>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="브랜드명" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="서비스 설명" rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <input value={form.logo_url} onChange={e => setForm({ ...form, logo_url: e.target.value })} placeholder="로고 이미지 URL" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <input value={form.referral_url} onChange={e => setForm({ ...form, referral_url: e.target.value })} placeholder="레퍼럴 링크 URL" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <textarea value={form.benefit} onChange={e => setForm({ ...form, benefit: e.target.value })} placeholder="혜택/쿠폰 정보" rows={2} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_visible} onChange={e => setForm({ ...form, is_visible: e.target.checked })} />
            사이트에 노출
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-[#E2E545] text-[#0A0A0A] font-bold text-sm px-6 py-2.5 rounded">{editing ? "수정 완료" : "등록"}</button>
            {editing && <button type="button" onClick={resetForm} className="text-white/40 text-sm px-4 py-2.5">취소</button>}
          </div>
        </form>

        <div className="space-y-3">
          {tools.map(tool => (
            <div key={tool.id} className={`flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4 ${!tool.is_visible ? "opacity-40" : ""}`}>
              {tool.logo_url && <img src={tool.logo_url} alt="" className="w-10 h-10 rounded object-contain bg-white/10 shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{tool.name}</p>
                <p className="text-xs text-white/30 truncate">{tool.referral_url}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleVisibility(tool)} className="text-xs text-white/40 border border-white/10 px-3 py-1 rounded">{tool.is_visible ? "숨기기" : "보이기"}</button>
                <button onClick={() => handleEdit(tool)} className="text-xs text-[#E2E545] border border-[#E2E545]/30 px-3 py-1 rounded">수정</button>
                <button onClick={() => handleDelete(tool.id)} className="text-xs text-red-400 border border-red-400/30 px-3 py-1 rounded">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
