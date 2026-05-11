"use client";

import { useEffect, useState, useRef } from "react";

interface FaqItem {
  q: string;
  a: string;
  enabled: boolean;
}

interface TopBlock {
  id: string;
  label: string;
  html: string;
  enabled: boolean;
  theme?: "light" | "dark" | "brand";
}

interface ProgramItem {
  iid: string;
  i_title: string;
  i_title_userside: string | null;
  i_type: string;
  i_formid_webflow: string | null;
  i_thumbnail: string | null;
  i_detail_html: string | null;
  i_detail_faq: FaqItem[] | null;
  i_detail_top_blocks: TopBlock[] | null;
}

// Claude 채팅 프로젝트 URL — 프로젝트 생성 후 여기에 ID 입력
const CLAUDE_PROJECT_URL = "https://claude.ai/project/019e0c59-7a66-7363-b314-149d1fe776eb";

interface FaqPoolItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_default: boolean;
}

const DEFAULT_TOP_BLOCKS: TopBlock[] = [
  { id: "membership", label: "이기적멤버십 안내", html: '<div style="background:#E2E545;padding:16px 20px;border-radius:12px;text-align:center;margin-bottom:24px;"><p style="font-size:14px;font-weight:600;color:#0A0A0A;margin:0;">이기적멤버십 회원 only 프로그램</p><p style="font-size:13px;color:#444;margin:4px 0 0;">공유회 신청완료시 멤버십 자동 가입 · 자동결제&정기구독 전혀 없는 진짜 무료 멤버십</p></div>', enabled: false },
  { id: "notice", label: "공지사항", html: '<div style="background:#FAFAF8;border:1px solid #E5E5E5;padding:16px 20px;border-radius:12px;text-align:center;margin-bottom:24px;"><p style="font-size:14px;color:#444;margin:0;">📢 공지사항 내용을 여기에 입력하세요</p></div>', enabled: false },
];

const DEFAULT_BOTTOM_BLOCKS: TopBlock[] = [
  { id: "apply-form", label: "신청폼", html: `<section style="background:#FAFAF8;padding:56px 20px;">
  <div style="max-width:480px;margin:0 auto;text-align:center;">
    <p style="font-size:13px;color:#888;margin:0 0 8px;">무료 · 온라인 라이브 · 선착순 · VOD 없음</p>
    <h3 style="font-size:24px;font-weight:700;color:#0A0A0A;margin:0 0 4px;line-height:1.3;">라이브에서 만나요</h3>
    <p style="font-size:15px;color:#666;margin:0 0 8px;">공유회 당일 알림톡과 이메일로 라이브 링크를 보내드립니다.</p>
    <p style="font-size:14px;color:#888;margin:0 0 28px;">선착순 1000명으로 입장이 제한됩니다.</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin:0 0 20px;">
      <input type="text" placeholder="이름" style="width:100%;height:52px;padding:0 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:15px;color:#0A0A0A;background:#FFFFFF;outline:none;box-sizing:border-box;" />
      <input type="tel" placeholder="전화번호 (010-0000-0000)" style="width:100%;height:52px;padding:0 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:15px;color:#0A0A0A;background:#FFFFFF;outline:none;box-sizing:border-box;" />
      <input type="email" placeholder="이메일" style="width:100%;height:52px;padding:0 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:15px;color:#0A0A0A;background:#FFFFFF;outline:none;box-sizing:border-box;" />
    </div>
    <div style="background:#FFF9E5;border-radius:12px;padding:14px 16px;margin:0 0 20px;">
      <p style="font-size:14px;color:#444;margin:0;">🎁 해당 이기적공유회 신청 시, 이기적멤버십 2.0에도 무료로 자동가입됩니다.</p>
    </div>
    <button style="width:100%;height:52px;background:#E2E545;border:none;border-radius:12px;font-size:16px;font-weight:700;color:#0A0A0A;cursor:pointer;">신청하기</button>
  </div>
</section>`, enabled: false },
  { id: "terms", label: "이용약관 / 개인정보처리방침", html: `<div style="text-align:center;padding:24px 20px;border-top:1px solid #E5E5E5;">
  <a href="https://sepia-quartz-81f.notion.site/22b5c0a046468081b11cc019c2f558a4?pvs=74" target="_blank" style="font-size:13px;color:#888;text-decoration:none;">이용약관</a>
  <span style="font-size:13px;color:#ddd;margin:0 12px;">|</span>
  <a href="https://sepia-quartz-81f.notion.site/22b5c0a0464680528d1ffb54dfd7eaeb" target="_blank" style="font-size:13px;color:#888;text-decoration:none;">개인정보처리방침</a>
</div>`, enabled: true },
];

const inputClass = "w-full h-10 px-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition";
const labelClass = "text-xs font-medium text-[#888] mb-1 block";

const programTypes = [
  { value: "sharing", label: "이기적공유회" },
  { value: "challenge", label: "이기적챌린지" },
  { value: "workshop", label: "워크숍" },
  { value: "special", label: "스페셜" },
];

export default function DetailPage() {
  const [items, setItems] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIid, setSelectedIid] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [isNewProgram, setIsNewProgram] = useState(false);
  const [creating, setCreating] = useState(false);

  // 새 프로그램 기본 정보
  const [newForm, setNewForm] = useState({
    i_title: "",
    i_title_userside: "",
    i_type: "sharing",
    i_formid_webflow: "",
    i_paid_tf: true,
    i_price: 9900,
    i_eventdate: "",
  });

  // 썸네일
  const [thumbnail, setThumbnail] = useState<string>("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // 상세 페이지 데이터 — 블록 단위로 관리
  const [contentBlocks, setContentBlocks] = useState<{ id: string; html: string }[]>([]);
  const [faqPool, setFaqPool] = useState<FaqPoolItem[]>([]);
  const [selectedFaqIds, setSelectedFaqIds] = useState<Set<number>>(new Set());
  const [customFaq, setCustomFaq] = useState<FaqItem[]>([]);
  const [topBlocks, setTopBlocks] = useState<TopBlock[]>([...DEFAULT_TOP_BLOCKS]);
  const [bottomBlocks, setBottomBlocks] = useState<TopBlock[]>([...DEFAULT_BOTTOM_BLOCKS]);
  const [fetchError, setFetchError] = useState("");

  // 편집 상태
  const [uploading, setUploading] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const insertTargetIndex = useRef<number>(-1);

  useEffect(() => {
    Promise.all([fetchItems(), fetchFaqPool()]).then(() => {
      const params = new URLSearchParams(window.location.search);
      const iid = params.get("iid");
      const isNew = params.get("new");
      if (isNew) {
        handleSelect("__new__");
      } else if (iid) {
        setSelectedIid(iid);
      }
    });
  }, []);

  // iid가 세팅되고 items가 로드된 후 데이터 로드
  useEffect(() => {
    if (selectedIid && items.length > 0 && !isNewProgram) {
      const item = items.find((i) => i.iid === selectedIid);
      if (item) {
        setThumbnail(item.i_thumbnail || "");
        setContentBlocks(htmlToBlocks(item.i_detail_html || ""));
        const savedFaq = item.i_detail_faq || [];
        const poolIds = new Set<number>();
        const customs: FaqItem[] = [];
        savedFaq.forEach((f: FaqItem) => {
          if (f.q.startsWith("[custom]")) {
            customs.push({ ...f, q: f.q.replace("[custom]", "") });
          } else {
            const match = faqPool.find((p) => p.question === f.q);
            if (match && f.enabled) poolIds.add(match.id);
          }
        });
        setSelectedFaqIds(poolIds.size > 0 ? poolIds : new Set(faqPool.filter((f) => f.is_default).map((f) => f.id)));
        setCustomFaq(customs);
        const savedBlocks = item.i_detail_top_blocks as TopBlock[] | null;
        const savedTop = savedBlocks?.filter((b) => b.id !== "apply-form");
        const savedBottom = savedBlocks?.filter((b) => b.id === "apply-form");
        setTopBlocks(savedTop && savedTop.length > 0 ? savedTop : [...DEFAULT_TOP_BLOCKS]);
        setBottomBlocks(savedBottom && savedBottom.length > 0 ? savedBottom : [...DEFAULT_BOTTOM_BLOCKS]);
      }
    }
  }, [selectedIid, items, faqPool, isNewProgram]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchFaqPool() {
    try {
      const res = await fetch("/api/admin/faq");
      const json = await res.json();
      if (json.data) setFaqPool(json.data);
    } catch { /* ignore */ }
  }

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/programs");
      const json = await res.json();
      if (json.error) {
        setFetchError(json.error);
      } else if (json.data) {
        setItems(json.data);
        setFetchError("");
      }
    } catch {
      setFetchError("프로그램 목록을 불러오지 못했습니다. 네트워크를 확인해주세요.");
    }
    setLoading(false);
  }

  // HTML 문자열 → 블록 배열로 분리
  // 이미지 슬롯(dashed border)은 항상 독립 블록으로 분리
  function htmlToBlocks(html: string): { id: string; html: string }[] {
    if (!html.trim()) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    function uid() { return `b_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

    // 요소가 이미지 슬롯인지 판별 (dashed border)
    function isImageSlot(el: Element): boolean {
      const style = el.getAttribute("style") || "";
      return style.includes("dashed");
    }

    // section 내부에서 이미지 슬롯을 기준으로 분할
    function splitSection(section: Element): { id: string; html: string }[] {
      const children = Array.from(section.children);
      // section의 직계 자식이나 손자 중 이미지 슬롯이 있는지 확인
      const innerContainer = children.length === 1 ? children[0] : null;
      const targetChildren = innerContainer ? Array.from(innerContainer.children) : children;

      // 이미지 슬롯이 없으면 통째로 블록
      const hasSlot = targetChildren.some((c) => isImageSlot(c) || Array.from(c.children).some(isImageSlot));
      if (!hasSlot) {
        return [{ id: uid(), html: section.outerHTML.trim() }];
      }

      // 이미지 슬롯을 기준으로 분할
      const result: { id: string; html: string }[] = [];
      let buffer: Element[] = [];

      function flushBuffer() {
        if (buffer.length === 0) return;
        // buffer에 있는 요소들을 section으로 감싸기
        const wrapper = section.cloneNode(false) as Element;
        const inner = innerContainer ? innerContainer.cloneNode(false) as Element : wrapper;
        buffer.forEach((el) => inner.appendChild(el.cloneNode(true)));
        if (innerContainer) {
          const outerWrap = section.cloneNode(false) as Element;
          outerWrap.appendChild(inner);
          result.push({ id: uid(), html: outerWrap.outerHTML.trim() });
        } else {
          result.push({ id: uid(), html: wrapper.outerHTML.trim() });
        }
        buffer = [];
      }

      for (const child of targetChildren) {
        if (isImageSlot(child)) {
          flushBuffer();
          result.push({ id: uid(), html: child.outerHTML.trim() });
        } else if (Array.from(child.children).some(isImageSlot)) {
          // child 안에 이미지 슬롯이 섞여 있는 경우 — child를 더 분해
          flushBuffer();
          const subChildren = Array.from(child.children);
          let subBuffer: Element[] = [];
          for (const sub of subChildren) {
            if (isImageSlot(sub)) {
              if (subBuffer.length > 0) {
                const wrap = child.cloneNode(false) as Element;
                subBuffer.forEach((s) => wrap.appendChild(s.cloneNode(true)));
                result.push({ id: uid(), html: wrap.outerHTML.trim() });
                subBuffer = [];
              }
              result.push({ id: uid(), html: sub.outerHTML.trim() });
            } else {
              subBuffer.push(sub);
            }
          }
          if (subBuffer.length > 0) {
            const wrap = child.cloneNode(false) as Element;
            subBuffer.forEach((s) => wrap.appendChild(s.cloneNode(true)));
            result.push({ id: uid(), html: wrap.outerHTML.trim() });
          }
        } else {
          buffer.push(child);
        }
      }
      flushBuffer();
      return result;
    }

    // 최상위부터 탐색
    function extractBlocks(parent: Element): { id: string; html: string }[] {
      const result: { id: string; html: string }[] = [];
      for (const el of Array.from(parent.children)) {
        const tag = el.tagName.toLowerCase();
        if (tag === "section") {
          result.push(...splitSection(el));
        } else if (isImageSlot(el)) {
          result.push({ id: uid(), html: el.outerHTML.trim() });
        } else if (tag === "div" && el.children.length > 0) {
          const hasStructural = Array.from(el.children).some((c) => ["section", "div"].includes(c.tagName.toLowerCase()));
          if (hasStructural) {
            result.push(...extractBlocks(el));
          } else {
            result.push({ id: uid(), html: el.outerHTML.trim() });
          }
        } else if (el.outerHTML.trim()) {
          result.push({ id: uid(), html: el.outerHTML.trim() });
        }
      }
      return result;
    }

    const blocks = extractBlocks(doc.body);
    return blocks.length > 0 ? blocks : [{ id: uid(), html: html.trim() }];
  }

  // 블록 배열 → HTML 문자열 (원본 wrapper로 감싸기)
  function blocksToHtml(): string {
    const inner = contentBlocks.map((b) => b.html).join("\n");
    return `<div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #444; background: #FFFFFF;">\n${inner}\n</div>`;
  }

  // 블록 이동
  function moveBlock(index: number, direction: "up" | "down") {
    const newBlocks = [...contentBlocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setContentBlocks(newBlocks);
  }

  // 블록 삭제
  function removeBlock(index: number) {
    setContentBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  // 블록 HTML 수정
  function updateBlockHtml(id: string, html: string) {
    setContentBlocks((prev) => prev.map((b) => b.id === id ? { ...b, html } : b));
  }

  function handleSelect(value: string) {
    if (value === "__new__") {
      setIsNewProgram(true);
      setSelectedIid("");
      setContentBlocks([]);
      setSelectedFaqIds(new Set(faqPool.filter((f) => f.is_default).map((f) => f.id)));
      setCustomFaq([]);
      setTopBlocks([...DEFAULT_TOP_BLOCKS]);
      setBottomBlocks([...DEFAULT_BOTTOM_BLOCKS]);
      setNewForm({ i_title: "", i_title_userside: "", i_type: "sharing", i_formid_webflow: "", i_paid_tf: true, i_price: 9900, i_eventdate: "" });
      return;
    }
    setIsNewProgram(false);
    setSelectedIid(value);
    const item = items.find((i) => i.iid === value);
    if (!item) return;

    setContentBlocks(htmlToBlocks(item.i_detail_html || ""));
    // 저장된 FAQ에서 pool ID 매칭
    const savedFaq = item.i_detail_faq || [];
    const poolIds = new Set<number>();
    const customs: FaqItem[] = [];
    savedFaq.forEach((f: FaqItem) => {
      if (f.q.startsWith("[custom]")) {
        customs.push({ ...f, q: f.q.replace("[custom]", "") });
      } else {
        // pool에서 매칭
        const match = faqPool.find((p) => p.question === f.q);
        if (match && f.enabled) poolIds.add(match.id);
      }
    });
    // 저장된 FAQ가 없으면 기본값(is_default) 사용
    setSelectedFaqIds(poolIds.size > 0 ? poolIds : new Set(faqPool.filter((f) => f.is_default).map((f) => f.id)));
    setCustomFaq(customs);
    const savedBlocks = item.i_detail_top_blocks as TopBlock[] | null;
    const savedTop = savedBlocks?.filter((b) => b.id !== "apply-form");
    const savedBottom = savedBlocks?.filter((b) => b.id === "apply-form");
    setTopBlocks(savedTop && savedTop.length > 0 ? savedTop : [...DEFAULT_TOP_BLOCKS]);
    setBottomBlocks(savedBottom && savedBottom.length > 0 ? savedBottom : [...DEFAULT_BOTTOM_BLOCKS]);
  }

  async function handleCreateProgram() {
    if (!newForm.i_title || !newForm.i_formid_webflow) {
      alert("제목과 URL slug는 필수입니다.");
      return;
    }
    setCreating(true);
    const res = await fetch("/api/admin/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        i_title: newForm.i_title,
        i_title_userside: newForm.i_title_userside || null,
        i_type: newForm.i_type,
        i_formid_webflow: newForm.i_formid_webflow,
        i_paid_tf: newForm.i_paid_tf,
        i_price: newForm.i_paid_tf ? newForm.i_price : null,
        i_eventdate: newForm.i_eventdate || null,
      }),
    });
    const json = await res.json();
    setCreating(false);
    if (json.error) {
      alert(`등록 실패: ${json.error}`);
      return;
    }
    alert("프로그램이 등록되었습니다!");
    await fetchItems();
    setIsNewProgram(false);
    setSelectedIid(json.data.iid);
    handleSelect(json.data.iid);
  }

  function togglePoolFaq(id: number) {
    setSelectedFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCustomFaq(index: number) {
    setCustomFaq((prev) => prev.map((f, i) => i === index ? { ...f, enabled: !f.enabled } : f));
  }

  function addCustomFaq() {
    setCustomFaq((prev) => [...prev, { q: "", a: "", enabled: true }]);
  }

  function updateCustomFaq(index: number, field: "q" | "a", value: string) {
    setCustomFaq((prev) => prev.map((f, i) => i === index ? { ...f, [field]: value } : f));
  }

  function removeCustomFaq(index: number) {
    setCustomFaq((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleTopBlock(id: string) {
    setTopBlocks((prev) => prev.map((b) => b.id === id ? { ...b, enabled: !b.enabled } : b));
  }

  function updateTopBlockHtml(id: string, html: string) {
    setTopBlocks((prev) => prev.map((b) => b.id === id ? { ...b, html } : b));
  }

  function toggleBottomBlock(id: string) {
    setBottomBlocks((prev) => prev.map((b) => b.id === id ? { ...b, enabled: !b.enabled } : b));
  }

  function updateBottomBlockHtml(id: string, html: string) {
    setBottomBlocks((prev) => prev.map((b) => b.id === id ? { ...b, html } : b));
  }

  function updateBottomBlockTheme(id: string, theme: "light" | "dark" | "brand") {
    setBottomBlocks((prev) => prev.map((b) => b.id === id ? { ...b, theme } : b));
  }

  // HTML 붙여넣기 → 블록으로 분리해서 추가
  function handlePasteHtml(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html") || e.clipboardData.getData("text/plain");
    if (!html.trim()) return;
    const newBlocks = htmlToBlocks(html);
    if (contentBlocks.length > 0) {
      if (confirm("기존 블록을 새 HTML로 교체할까요?\n[확인] 교체 / [취소] 아래에 추가")) {
        setContentBlocks(newBlocks);
      } else {
        setContentBlocks((prev) => [...prev, ...newBlocks]);
      }
    } else {
      setContentBlocks(newBlocks);
    }
  }

  // 이미지 업로드 — 새 블록 추가 또는 기존 블록 교체
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);

  function triggerFileUpload(targetBlockId?: string) {
    setReplaceTargetId(targetBlockId || null);
    // 약간의 딜레이로 state가 세팅된 후 file dialog 열기
    setTimeout(() => fileInputRef.current?.click(), 50);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", selectedItem?.i_formid_webflow || "general");

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (json.error) {
        alert(`업로드 실패: ${json.error}`);
        setUploading(false);
        return;
      }

      const url = json.data.url;
      const isVideo = file.type.startsWith("video/");
      const mediaHtml = isVideo
        ? `<div style="text-align:center;margin:24px 0;"><video src="${url}" controls playsinline style="max-width:100%;border-radius:12px;"></video></div>`
        : `<div style="text-align:center;margin:24px 0;"><img src="${url}" alt="" style="max-width:100%;border-radius:12px;" /></div>`;

      if (replaceTargetId) {
        setContentBlocks((prev) => prev.map((b) => b.id === replaceTargetId ? { ...b, html: mediaHtml } : b));
        setReplaceTargetId(null);
      } else {
        setContentBlocks((prev) => [...prev, { id: `b_${Date.now()}_media`, html: mediaHtml }]);
      }
    } catch {
      alert("업로드 중 네트워크 오류가 발생했습니다.");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // 이미지 슬롯인지 판별 (블록 UI에서 사용)
  function isSlotBlock(html: string): boolean {
    return html.includes("dashed");
  }

  // 미리보기용 전체 HTML 조합
  function getFullPreviewHtml() {
    const topHtml = topBlocks.filter((b) => b.enabled).map((b) => b.html).join("\n");
    const poolFaq = faqPool.filter((f) => selectedFaqIds.has(f.id)).map((f) => ({ q: f.question, a: f.answer }));
    const enabledCustom = customFaq.filter((f) => f.enabled && f.q);
    const allFaq = [...poolFaq, ...enabledCustom];
    const faqHtml = allFaq.length > 0 ? `
      <section style="background:#FFFFFF;padding:56px 20px;">
        <div style="max-width:768px;margin:0 auto;">
          <p style="font-size:11px;color:#888;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:12px;">FAQ</p>
          <h2 style="font-size:22px;font-weight:700;color:#0A0A0A;margin-bottom:24px;">자주 묻는 질문</h2>
          ${allFaq.map((f) => `
            <div style="border-bottom:1px solid #E5E5E5;padding-bottom:16px;margin-bottom:16px;">
              <p style="font-size:15px;font-weight:600;color:#0A0A0A;margin-bottom:8px;">Q. ${f.q}</p>
              <p style="font-size:14px;color:#666;line-height:1.6;">${f.a}</p>
            </div>
          `).join("")}
        </div>
      </section>
    ` : "";
    const bottomHtml = bottomBlocks.filter((b) => b.enabled).map((b) => b.html).join("\n");

    return `${topHtml}${blocksToHtml()}${faqHtml}${bottomHtml}`;
  }

  async function handleSave() {
    if (!selectedIid) { alert("프로그램을 선택해주세요."); return; }
    setSaving(true);

    const allFaq = [
      ...faqPool.filter((f) => selectedFaqIds.has(f.id)).map((f) => ({ q: f.question, a: f.answer, enabled: true })),
      ...customFaq.map((f) => ({ ...f, q: `[custom]${f.q}` })),
    ];

    const allBlocks = [...topBlocks, ...bottomBlocks];

    const res = await fetch("/api/admin/programs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        iid: selectedIid,
        i_detail_html: blocksToHtml(),
        i_detail_faq: allFaq,
        i_detail_top_blocks: allBlocks,
        i_thumbnail: thumbnail || null,
      }),
    });

    const json = await res.json();
    setSaving(false);

    if (json.error) {
      alert(`저장 실패: ${json.error}`);
      return;
    }

    alert("상세 페이지가 저장되었습니다!");
    fetchItems();
  }

  const selectedItem = items.find((i) => i.iid === selectedIid);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">상세 페이지 등록</h1>
          <p className="text-sm text-[#888]">Claude 채팅에서 만든 HTML을 등록하고, FAQ와 공통 블록을 관리합니다</p>
        </div>
        <a
          href={CLAUDE_PROJECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0A0A0A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#222] transition-colors flex items-center gap-2"
        >
          Claude 채팅에서 만들기 →
        </a>
      </div>

      {/* 프로그램 선택 */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 mb-6">
        <label className={labelClass}>프로그램 선택</label>
        {loading ? (
          <p className="text-sm text-[#888]">불러오는 중...</p>
        ) : fetchError ? (
          <p className="text-sm text-red-500">{fetchError}</p>
        ) : (
          <select
            value={isNewProgram ? "__new__" : selectedIid}
            onChange={(e) => handleSelect(e.target.value)}
            className={inputClass}
          >
            <option value="">프로그램을 선택하세요</option>
            <option value="__new__">+ 새 프로그램 등록</option>
            {items.map((item) => (
              <option key={item.iid} value={item.iid}>
                {item.i_title_userside || item.i_title} ({item.i_type}) — /{item.i_formid_webflow || "slug 미설정"}
              </option>
            ))}
          </select>
        )}

        {/* 새 프로그램 기본 정보 입력 */}
        {isNewProgram && (
          <div className="mt-4 space-y-3 border-t border-[#E5E5E5] pt-4">
            <p className="text-xs text-[#888] font-medium">새 프로그램 기본 정보</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>유형</label>
                <select value={newForm.i_type} onChange={(e) => setNewForm({ ...newForm, i_type: e.target.value })} className={inputClass}>
                  {programTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>URL slug *</label>
                <input value={newForm.i_formid_webflow} onChange={(e) => setNewForm({ ...newForm, i_formid_webflow: e.target.value })} placeholder="ai-ax-project" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>제목 (내부용) *</label>
              <input value={newForm.i_title} onChange={(e) => setNewForm({ ...newForm, i_title: e.target.value })} placeholder="이기적공유회_AX프로젝트" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>제목 (유저 노출용)</label>
              <input value={newForm.i_title_userside} onChange={(e) => setNewForm({ ...newForm, i_title_userside: e.target.value })} placeholder="AX 한다는 말, 도대체 뭘 한다는 거야?" className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>날짜</label>
                <input type="date" value={newForm.i_eventdate} onChange={(e) => setNewForm({ ...newForm, i_eventdate: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>유료 여부</label>
                <select value={newForm.i_paid_tf ? "true" : "false"} onChange={(e) => setNewForm({ ...newForm, i_paid_tf: e.target.value === "true" })} className={inputClass}>
                  <option value="false">무료</option>
                  <option value="true">유료</option>
                </select>
              </div>
              {newForm.i_paid_tf && (
                <div>
                  <label className={labelClass}>가격 (원)</label>
                  <input type="number" value={newForm.i_price} onChange={(e) => setNewForm({ ...newForm, i_price: Number(e.target.value) })} className={inputClass} />
                </div>
              )}
            </div>
            <button
              onClick={handleCreateProgram}
              disabled={creating}
              className="w-full bg-[#E2E545] text-[#0A0A0A] py-2.5 rounded-lg text-sm font-bold hover:bg-[#CDD03B] transition-colors disabled:opacity-40"
            >
              {creating ? "등록 중..." : "프로그램 등록하기"}
            </button>
          </div>
        )}

        {selectedItem && (
          <p className="text-xs text-[#888] mt-2">
            상세 페이지 URL: <span className="text-[#0A0A0A] font-mono">/sharing/{selectedItem.i_formid_webflow || "???"}</span>
          </p>
        )}
      </div>

      {(selectedIid && !isNewProgram) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ─── 왼쪽: 편집 영역 ─── */}
          <div className="space-y-4">
            {/* 썸네일 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#0A0A0A]">썸네일</h2>
              <p className="text-xs text-[#999]">프로그램 목록과 상세 페이지 히어로에 사용됩니다</p>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setThumbnailUploading(true);
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("slug", selectedItem?.i_formid_webflow || "general");
                  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                  const json = await res.json();
                  setThumbnailUploading(false);
                  if (json.error) { alert(`업로드 실패: ${json.error}`); return; }
                  setThumbnail(json.data.url);
                  if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
                }}
              />
              {thumbnail ? (
                <div className="space-y-2">
                  <img src={thumbnail} alt="썸네일" className="w-full max-h-[200px] object-cover rounded-lg border border-[#E5E5E5]" />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => thumbnailInputRef.current?.click()}
                      disabled={thumbnailUploading}
                      className="text-xs px-3 py-1.5 bg-[#F5F5F0] border border-[#E5E5E5] rounded-lg text-[#444] hover:bg-[#E5E5E5] transition-colors"
                    >
                      {thumbnailUploading ? "업로드 중..." : "이미지 변경"}
                    </button>
                    <button
                      onClick={() => setThumbnail("")}
                      className="text-xs px-3 py-1.5 text-red-400/60 hover:text-red-400"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => thumbnailInputRef.current?.click()}
                  disabled={thumbnailUploading}
                  className="w-full py-8 border-2 border-dashed border-[#E5E5E5] rounded-lg text-sm text-[#888] hover:border-[#0A0A0A] hover:text-[#444] transition-colors cursor-pointer"
                >
                  {thumbnailUploading ? "업로드 중..." : "🖼 썸네일 이미지 업로드"}
                </button>
              )}
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="또는 이미지 URL을 직접 입력"
                className={inputClass}
              />
            </div>

            {/* 상단 공통 블록 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#0A0A0A]">상단 공통 블록</h2>
              <p className="text-xs text-[#999]">상세 페이지 맨 위에 표시될 공통 요소입니다</p>
              {topBlocks.map((block) => {
                // HTML에서 텍스트만 추출
                const textMatch = block.html.match(/>([^<]+)</g);
                const displayText = textMatch ? textMatch.map((t) => t.slice(1)).join(" ").trim() : "";
                return (
                  <div key={block.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={block.enabled}
                          onChange={() => toggleTopBlock(block.id)}
                          className="rounded"
                        />
                        <span className="text-sm text-[#444]">{block.label}</span>
                      </label>
                    </div>
                    {block.enabled && (
                      <div className="space-y-2">
                        <div className="bg-[#F5F5F0] rounded-lg p-3" dangerouslySetInnerHTML={{ __html: block.html }} />
                        <input
                          type="text"
                          defaultValue={displayText}
                          placeholder="표시할 텍스트를 입력하세요"
                          onBlur={(e) => {
                            const text = e.target.value;
                            if (block.id === "membership") {
                              updateTopBlockHtml(block.id, `<div style="background:#E2E545;padding:16px 20px;border-radius:12px;text-align:center;margin-bottom:24px;"><p style="font-size:14px;font-weight:600;color:#0A0A0A;margin:0;">${text}</p></div>`);
                            } else {
                              updateTopBlockHtml(block.id, `<div style="background:#FAFAF8;border:1px solid #E5E5E5;padding:16px 20px;border-radius:12px;text-align:center;margin-bottom:24px;"><p style="font-size:14px;color:#444;margin:0;">${text}</p></div>`);
                            }
                          }}
                          className={inputClass}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* HTML 본문 — 블록 에디터 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#0A0A0A]">본문 블록</h2>
              <p className="text-xs text-[#999]">Claude에서 만든 HTML을 아래에 붙여넣으면 섹션별로 자동 분리됩니다. 각 블록을 위/아래로 이동하거나, 사이에 이미지를 넣을 수 있어요.</p>

              {/* HTML 붙여넣기 영역 */}
              <textarea
                onPaste={handlePasteHtml}
                placeholder="Claude에서 만든 HTML을 여기에 붙여넣기 (Cmd+V)"
                rows={3}
                className="w-full px-3 py-3 bg-[#FAFAF8] border-2 border-dashed border-[#E5E5E5] rounded-lg text-sm text-[#444] placeholder:text-[#999] focus:border-[#0A0A0A] outline-none transition resize-none text-center"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.gif"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* 블록 추가 버튼 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerFileUpload()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#F5F5F0] border border-[#E5E5E5] rounded-lg text-[#444] hover:bg-[#E5E5E5] transition-colors disabled:opacity-40"
                >
                  {uploading ? "업로드 중..." : "🖼 이미지/GIF 블록 추가"}
                </button>
                <button
                  onClick={() => {
                    const url = prompt("영상 URL을 입력하세요 (YouTube 등)");
                    if (!url) return;
                    const videoHtml = url.includes("youtube.com") || url.includes("youtu.be")
                      ? `<div style="text-align:center;margin:24px 0;"><iframe width="100%" height="400" src="${url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}" frameborder="0" allowfullscreen style="border-radius:12px;max-width:100%;"></iframe></div>`
                      : `<div style="text-align:center;margin:24px 0;"><video src="${url}" controls style="max-width:100%;border-radius:12px;"></video></div>`;
                    setContentBlocks((prev) => [...prev, { id: `b_${Date.now()}_vid`, html: videoHtml }]);
                  }}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#F5F5F0] border border-[#E5E5E5] rounded-lg text-[#444] hover:bg-[#E5E5E5] transition-colors"
                >
                  🎬 영상 블록 추가
                </button>
              </div>

              {/* 블록 리스트 */}
              {contentBlocks.length > 0 && (
                <div className="space-y-0">
                  {contentBlocks.map((block, i) => (
                    <div key={block.id}>
                      {/* 블록 카드 */}
                      <div className={`group border rounded-lg overflow-hidden transition-colors ${isSlotBlock(block.html) ? "border-[#E2E545]/40 bg-[#FAFAF8]" : "border-[#E5E5E5] hover:border-[#E2E545]"}`}>
                        {/* 블록 컨트롤 바 */}
                        <div className="flex items-center justify-between px-3 py-1.5 bg-[#FAFAF8] border-b border-[#E5E5E5]">
                          <span className="text-[10px] text-[#888]">
                            {isSlotBlock(block.html) ? `📷 이미지 슬롯 ${i + 1}` : `블록 ${i + 1}`}
                          </span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => moveBlock(i, "up")} disabled={i === 0} className="text-[11px] px-1.5 py-0.5 text-[#888] hover:text-[#0A0A0A] disabled:opacity-20 disabled:cursor-not-allowed">↑</button>
                            <button onClick={() => moveBlock(i, "down")} disabled={i === contentBlocks.length - 1} className="text-[11px] px-1.5 py-0.5 text-[#888] hover:text-[#0A0A0A] disabled:opacity-20 disabled:cursor-not-allowed">↓</button>
                            {isSlotBlock(block.html) && (
                              <button
                                onClick={() => triggerFileUpload(block.id)}
                                disabled={uploading}
                                className="text-[10px] px-2 py-0.5 bg-[#E2E545]/20 border border-[#E2E545]/40 rounded text-[#0A0A0A] hover:bg-[#E2E545]/40 transition-colors font-medium"
                              >
                                {uploading ? "..." : "파일로 교체"}
                              </button>
                            )}
                            {block.html.includes("<img") && !isSlotBlock(block.html) && (
                              <button
                                onClick={() => triggerFileUpload(block.id)}
                                disabled={uploading}
                                className="text-[10px] px-2 py-0.5 bg-[#F5F5F0] border border-[#E5E5E5] rounded text-[#888] hover:text-[#0A0A0A] transition-colors"
                              >
                                {uploading ? "..." : "파일 변경"}
                              </button>
                            )}
                            <button onClick={() => setEditingBlockId(editingBlockId === block.id ? null : block.id)} className="text-[10px] px-1.5 py-0.5 text-[#888] hover:text-[#0A0A0A]">
                              {editingBlockId === block.id ? "코드 닫기" : "코드"}
                            </button>
                            <button onClick={() => { if (confirm("이 블록을 삭제할까요?")) removeBlock(i); }} className="text-[10px] px-1.5 py-0.5 text-red-400/60 hover:text-red-400">삭제</button>
                          </div>
                        </div>

                        {/* 블록 미리보기 (직접 편집 가능) */}
                        <div
                          className="p-3 focus:outline-none focus:ring-2 focus:ring-[#E2E545]/50 rounded"
                          contentEditable={!isSlotBlock(block.html)}
                          suppressContentEditableWarning
                          dangerouslySetInnerHTML={{ __html: block.html }}
                          onBlur={(e) => {
                            const newHtml = e.currentTarget.innerHTML;
                            if (newHtml !== block.html) updateBlockHtml(block.id, newHtml);
                          }}
                        />

                        {/* 블록 HTML 편집 */}
                        {editingBlockId === block.id && (
                          <div className="border-t border-[#E5E5E5] p-3">
                            <textarea
                              value={block.html}
                              onChange={(e) => updateBlockHtml(block.id, e.target.value)}
                              rows={8}
                              className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#E5E5E5] rounded-lg text-xs text-[#444] font-mono focus:border-[#0A0A0A] outline-none transition resize-y"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAQ 관리 */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-bold text-[#0A0A0A]">하단 FAQ</h2>
              <p className="text-xs text-[#999]">공통 FAQ에서 필요한 것만 켜고, 프로그램별 FAQ를 추가할 수 있습니다</p>

              {/* FAQ 풀에서 선택 */}
              <div className="space-y-2">
                <p className="text-xs text-[#888] font-medium">FAQ 풀 (관리: /admin/faq)</p>
                {faqPool.length === 0 && <p className="text-xs text-[#999]">FAQ가 없습니다. FAQ 관리 페이지에서 추가해주세요.</p>}
                {faqPool.map((faq) => (
                  <label key={faq.id} className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-[#F5F5F0]">
                    <input
                      type="checkbox"
                      checked={selectedFaqIds.has(faq.id)}
                      onChange={() => togglePoolFaq(faq.id)}
                      className="rounded mt-0.5"
                    />
                    <div>
                      <p className="text-sm text-[#444] font-medium">Q. {faq.question}</p>
                      <p className="text-xs text-[#888] mt-1">{faq.answer}</p>
                      {faq.is_default && <span className="text-[10px] text-[#E2E545] bg-[#E2E545]/10 px-1.5 py-0.5 rounded mt-1 inline-block">기본</span>}
                    </div>
                  </label>
                ))}
              </div>

              {/* 프로그램별 FAQ */}
              <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#888] font-medium">프로그램별 FAQ</p>
                  <button onClick={addCustomFaq} className="text-xs text-[#0A0A0A] hover:underline">+ 추가</button>
                </div>
                {customFaq.map((faq, i) => (
                  <div key={i} className="bg-[#F5F5F0] rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={faq.enabled}
                          onChange={() => toggleCustomFaq(i)}
                          className="rounded"
                        />
                        <span className="text-xs text-[#888]">FAQ {i + 1}</span>
                      </label>
                      <button onClick={() => removeCustomFaq(i)} className="text-red-400/60 hover:text-red-400 text-xs">삭제</button>
                    </div>
                    <input
                      value={faq.q}
                      onChange={(e) => updateCustomFaq(i, "q", e.target.value)}
                      placeholder="질문"
                      className={inputClass}
                    />
                    <textarea
                      value={faq.a}
                      onChange={(e) => updateCustomFaq(i, "a", e.target.value)}
                      placeholder="답변"
                      rows={2}
                      className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#0A0A0A] placeholder:text-[#999] focus:border-[#0A0A0A] outline-none transition resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 블록 (신청폼 등) */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-[#0A0A0A]">하단 블록</h2>
              <p className="text-xs text-[#999]">FAQ 아래에 표시될 블록입니다</p>
              {bottomBlocks.map((block) => (
                <div key={block.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={block.enabled}
                        onChange={() => toggleBottomBlock(block.id)}
                        className="rounded"
                      />
                      <span className="text-sm text-[#444]">{block.label}</span>
                    </label>
                  </div>
                  {block.enabled && (
                    <div className="space-y-2">
                      {block.id === "apply-form" ? (
                        <div
                          className="rounded-lg p-3 max-h-[200px] overflow-hidden"
                          style={{ backgroundColor: { light: "#FAFAF8", dark: "#0A0A0A", brand: "#E2E545" }[block.theme || "light"] }}
                          dangerouslySetInnerHTML={{ __html: block.html.replace(
                            /background:#[A-Fa-f0-9]{6}/,
                            `background:${{ light: "#FAFAF8", dark: "#0A0A0A", brand: "#E2E545" }[block.theme || "light"]}`
                          ).replace(
                            /color:#0A0A0A/g,
                            `color:${{ light: "#0A0A0A", dark: "#FFFFFF", brand: "#0A0A0A" }[block.theme || "light"]}`
                          ) }}
                        />
                      ) : (
                        <div className="bg-[#F5F5F0] rounded-lg p-3 max-h-[200px] overflow-hidden" dangerouslySetInnerHTML={{ __html: block.html }} />
                      )}
                      {block.id === "apply-form" && (
                        <div className="space-y-2 pl-1">
                          <p className="text-[10px] text-[#888]">배경 테마</p>
                          <div className="flex gap-2">
                            {([
                              { value: "light" as const, label: "밝은 회색", bg: "#FAFAF8", text: "#333" },
                              { value: "dark" as const, label: "블랙", bg: "#0A0A0A", text: "#fff" },
                              { value: "brand" as const, label: "브랜드", bg: "#E2E545", text: "#0A0A0A" },
                            ]).map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => updateBottomBlockTheme(block.id, opt.value)}
                                className={`flex-1 py-2 rounded-lg text-xs font-medium border-2 transition-all ${(block.theme || "light") === opt.value ? "border-[#0A0A0A] ring-1 ring-[#0A0A0A]" : "border-transparent"}`}
                                style={{ backgroundColor: opt.bg, color: opt.text }}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-[#888]">텍스트 수정</p>
                          <input
                            defaultValue="라이브에서 만나요"
                            placeholder="제목"
                            onBlur={(e) => {
                              const current = block.html;
                              const updated = current.replace(/>라이브에서 만나요</, `>${e.target.value}<`).replace(/>[^<]*만나요</, `>${e.target.value}<`);
                              updateBottomBlockHtml(block.id, updated !== current ? updated : current);
                            }}
                            className={inputClass}
                          />
                          <input
                            defaultValue="공유회 당일 알림톡과 이메일로 라이브 링크를 보내드립니다."
                            placeholder="설명"
                            onBlur={(e) => {
                              const current = block.html;
                              const updated = current.replace(/공유회 당일[^<]*/, e.target.value);
                              updateBottomBlockHtml(block.id, updated);
                            }}
                            className={inputClass}
                          />
                          <input
                            defaultValue="선착순 1000명으로 입장이 제한됩니다."
                            placeholder="안내 문구"
                            onBlur={(e) => {
                              const current = block.html;
                              const updated = current.replace(/선착순[^<]*/, e.target.value);
                              updateBottomBlockHtml(block.id, updated);
                            }}
                            className={inputClass}
                          />
                          <input
                            defaultValue="신청하기"
                            placeholder="버튼 텍스트"
                            onBlur={(e) => {
                              const current = block.html;
                              const updated = current.replace(/>신청하기</, `>${e.target.value}<`);
                              updateBottomBlockHtml(block.id, updated);
                            }}
                            className={inputClass}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 저장 버튼 */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#E2E545] text-[#0A0A0A] py-3 rounded-xl text-sm font-bold hover:bg-[#CDD03B] transition-colors disabled:opacity-40"
            >
              {saving ? "저장 중..." : "상세 페이지 저장"}
            </button>
          </div>

          {/* ─── 오른쪽: 전체 미리보기 ─── */}
          <div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden sticky top-4">
              <div className="bg-[#0A0A0A] px-4 py-3 flex items-center justify-between">
                <p className="text-xs text-white/60">전체 미리보기</p>
                <p className="text-xs text-white/40 font-mono">/sharing/{selectedItem?.i_formid_webflow || "slug"}</p>
              </div>
              <div
                className="p-0 bg-white"
                dangerouslySetInnerHTML={{ __html: getFullPreviewHtml() }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
