"use client";

import { useState } from "react";
import { PurchaseButton } from "./PurchaseButton";

interface Props {
  slug: string;
  title: string;
  isPaid: boolean;
  price: number;
  itemId?: string;
  theme?: "light" | "dark" | "brand";
  formTitle?: string;
  formSubtitle?: string;
  formButtonText?: string;
}

const THEME_STYLES = {
  light: { bg: "#FAFAF8", text: "#0A0A0A", sub: "#666", muted: "#888", inputBg: "#FFFFFF", inputBorder: "#E5E5E5", btnBg: "#E2E545", btnText: "#0A0A0A", tipBg: "#FFF9E5", tipText: "#444" },
  dark: { bg: "#0A0A0A", text: "#FFFFFF", sub: "#ccc", muted: "#999", inputBg: "#1a1a1a", inputBorder: "#333", btnBg: "#E2E545", btnText: "#0A0A0A", tipBg: "#1a1a1a", tipText: "#ccc" },
  brand: { bg: "#E2E545", text: "#0A0A0A", sub: "#444", muted: "#666", inputBg: "#FFFFFF", inputBorder: "#ccc", btnBg: "#0A0A0A", btnText: "#FFFFFF", tipBg: "#d4d73e", tipText: "#333" },
};

export function ApplyForm({ slug, title, isPaid, price, itemId, theme = "light", formTitle, formSubtitle, formButtonText }: Props) {
  const t = THEME_STYLES[theme];
  const displayFormTitle = formTitle || "";
  const displayFormSubtitle = formSubtitle || "";
  const displayButtonText = formButtonText || "마감되기 전에 신청하기";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError("이름, 전화번호, 이메일을 모두 입력해주세요.");
      return;
    }
    setError("");
    setShowConfirm(true);
  }

  async function confirmSubmit() {
    setShowConfirm(false);
    setLoading(true);

    try {
      const res = await fetch("/api/registrations/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          u_name: name,
          u_phone: phone,
          u_email: email,
          slug,
        }),
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section data-apply-form style={{ background: t.bg, padding: "56px 20px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 16 }}>🎉</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 8 }}>신청 완료!</p>
          <p style={{ fontSize: 15, color: t.sub, marginBottom: 24, lineHeight: 1.6 }}>행사 당일, 알림톡과 이메일로 라이브 링크를 보내드려요.</p>
          <div style={{ textAlign: "left", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(0,0,0,0.05)", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
              <span style={{ fontSize: 16, marginTop: 2 }}>💬</span>
              <p style={{ fontSize: 14, color: t.sub, lineHeight: 1.6, margin: 0 }}>당일 <strong style={{ color: t.text }}>카카오톡 셀피쉬클럽 알림톡</strong> 채팅창을 꼭 확인해주세요!</p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(0,0,0,0.05)", borderRadius: 12, padding: "12px 16px" }}>
              <span style={{ fontSize: 16, marginTop: 2 }}>🔧</span>
              <p style={{ fontSize: 14, color: t.sub, lineHeight: 1.6, margin: 0 }}>홈페이지 리뉴얼 중이라 기존 마이페이지에 신청내역이 안 보일 수 있어요. 신청은 정상 접수됐으니 걱정 마세요!</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a
              href={`/sharing/${slug}`}
              style={{ flex: 1, display: "block", padding: "12px 0", borderRadius: 12, border: "1px solid #E5E5E5", fontSize: 14, fontWeight: 600, color: t.text, textDecoration: "none", textAlign: "center" }}
            >
              돌아가기
            </a>
            <a
              href="http://pf.kakao.com/_dxmxixhG/chat"
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, display: "block", padding: "12px 0", borderRadius: 12, background: "#0A0A0A", fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none", textAlign: "center" }}
            >
              카카오 채널 문의
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-apply-form style={{ background: t.bg, padding: "56px 20px" }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        {displayFormTitle && (
          <h3 style={{ fontSize: 24, fontWeight: 700, color: t.text, margin: "0 0 8px", lineHeight: 1.3, whiteSpace: "pre-line" }}>
            {displayFormTitle}
          </h3>
        )}
        {displayFormSubtitle && (
          <p style={{ fontSize: 15, color: t.sub, margin: "0 0 28px", whiteSpace: "pre-line" }}>
            {displayFormSubtitle}
          </p>
        )}
        {!displayFormTitle && !displayFormSubtitle && <div style={{ height: 16 }} />}

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
            style={{ width: "100%", height: 52, padding: "0 16px", border: `1px solid ${t.inputBorder}`, borderRadius: 12, fontSize: 15, color: t.text, background: t.inputBg, outline: "none", boxSizing: "border-box" as const }}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호 (010-0000-0000)"
            required
            style={{ width: "100%", height: 52, padding: "0 16px", border: `1px solid ${t.inputBorder}`, borderRadius: 12, fontSize: 15, color: t.text, background: t.inputBg, outline: "none", boxSizing: "border-box" as const }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            style={{ width: "100%", height: 52, padding: "0 16px", border: `1px solid ${t.inputBorder}`, borderRadius: 12, fontSize: 15, color: t.text, background: t.inputBg, outline: "none", boxSizing: "border-box" as const }}
          />
        </div>

        <div style={{ background: t.tipBg, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: t.tipText, margin: 0 }}>
            해당 이기적공유회 신청 시, 이기적멤버십 2.0에도 무료로 자동가입됩니다.
          </p>
        </div>

        {error && (
          <p style={{ fontSize: 14, color: "#EF4444", marginBottom: 12 }}>{error}</p>
        )}

        {isPaid && itemId ? (
          <PurchaseButton
            itemId={itemId}
            slug={slug}
            title={title}
            price={price}
            isPaid={isPaid}
            customerName={name}
            customerPhone={phone}
            customerEmail={email}
          />
        ) : (
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", height: 52, background: loading ? "#ccc" : t.btnBg, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, color: t.btnText, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "신청 중..." : displayButtonText}
          </button>
        )}
      </form>

      {showConfirm && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", padding: "0 16px" }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            style={{ background: "#fff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", marginBottom: 4 }}>입력하신 정보를 확인해주세요</p>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>신청하신 정보로 Zoom 라이브 링크를 안내드립니다.<br />정확하게 입력되었는지 꼭 확인해주세요.</p>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, color: "#888" }}>이름</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0A0A0A" }}>{name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, color: "#888" }}>전화번호</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0A0A0A" }}>{phone}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 14, color: "#888" }}>이메일</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0A0A0A" }}>{email}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1px solid #E5E5E5", background: "#fff", fontSize: 14, fontWeight: 600, color: "#0A0A0A", cursor: "pointer" }}
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={confirmSubmit}
                disabled={loading}
                style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "none", background: "#0A0A0A", fontSize: 14, fontWeight: 700, color: "#E2E545", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}
              >
                {loading ? "신청 중..." : "신청 완료하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
