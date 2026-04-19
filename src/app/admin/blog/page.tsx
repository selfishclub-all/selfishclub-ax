"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string | null;
  thumbnail: string | null;
  description: string | null;
  is_visible: boolean;
  created_at: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", author: "", thumbnail: "", description: "", content: "", is_visible: true });

  const fetchPosts = () => {
    fetch("/api/admin/blog").then(r => r.json()).then(d => setPosts(d.data || []));
  };

  useEffect(() => { fetchPosts(); }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", author: "", thumbnail: "", description: "", content: "", is_visible: true });
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch("/api/admin/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) });
    } else {
      await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    fetchPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({ title: post.title, slug: post.slug, author: post.author || "", thumbnail: post.thumbnail || "", description: post.description || "", content: "", is_visible: post.is_visible });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchPosts();
  };

  const toggleVisibility = async (post: BlogPost) => {
    await fetch("/api/admin/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: post.id, is_visible: !post.is_visible }) });
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">블로그 관리</h1>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? "수정" : "새 글 작성"}</h2>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="제목" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required placeholder="URL 슬러그 (영문, 예: my-first-post)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="작성자" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <input value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} placeholder="썸네일 이미지 URL" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="메타 설명 (한 줄 요약)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30" />
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="본문 (HTML)" rows={8} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder:text-white/30 font-mono" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_visible} onChange={e => setForm({ ...form, is_visible: e.target.checked })} />
            사이트에 노출
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-[#E2E545] text-[#0A0A0A] font-bold text-sm px-6 py-2.5 rounded">{editing ? "수정 완료" : "등록"}</button>
            {editing && <button type="button" onClick={resetForm} className="text-white/40 text-sm px-4 py-2.5">취소</button>}
          </div>
        </form>

        <p className="text-xs text-white/30 mb-4">총 {posts.length}개</p>
        <div className="space-y-2">
          {posts.map(post => (
            <div key={post.id} className={`flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4 ${!post.is_visible ? "opacity-40" : ""}`}>
              {post.thumbnail && <img src={post.thumbnail} alt="" className="w-16 h-10 rounded object-cover bg-white/10 shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{post.title}</p>
                <p className="text-xs text-white/30">{post.author} · {post.slug}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleVisibility(post)} className="text-xs text-white/40 border border-white/10 px-3 py-1 rounded">{post.is_visible ? "숨기기" : "보이기"}</button>
                <button onClick={() => handleEdit(post)} className="text-xs text-[#E2E545] border border-[#E2E545]/30 px-3 py-1 rounded">수정</button>
                <button onClick={() => handleDelete(post.id)} className="text-xs text-red-400 border border-red-400/30 px-3 py-1 rounded">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
