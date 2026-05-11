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
}

const THEME_STYLES = {
  light: { bg: "#FAFAF8", text: "#0A0A0A", sub: "#666", muted: "#888", inputBg: "#FFFFFF", inputBorder: "#E5E5E5", btnBg: "#E2E545", btnText: "#0A0A0A", tipBg: "#FFF9E5", tipText: "#444" },
  dark: { bg: "#0A0A0A", text: "#FFFFFF", sub: "#ccc", muted: "#999", inputBg: "#1a1a1a", inputBorder: "#333", btnBg: "#E2E545", btnText: "#0A0A0A", tipBg: "#1a1a1a", tipText: "#ccc" },
  brand: { bg: "#E2E545", text: "#0A0A0A", sub: "#444", muted: "#666", inputBg: "#FFFFFF", inputBorder: "#ccc", btnBg: "#0A0A0A", btnText: "#FFFFFF", tipBg: "#d4d73e", tipText: "#333" },
};

export function ApplyForm({ slug, title, isPaid, price, itemId, theme = "light" }: Props) {
  const t = THEME_STYLES[theme];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError("이름, 전화번호, 이메일을 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");

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
      <section style={{ background: t.bg, padding: "56px 20px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 8 }}>신청 완료!</p>
          <p style={{ fontSize: 15, color: t.sub, marginBottom: 16 }}>공유회 당일 알림톡과 이메일로 라이브 링크를 보내드릴게요.</p>
          <a
            href="https://selfishclub.xyz/mypage"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, color: t.text, textDecoration: "underline" }}
          >
            마이페이지에서 신청 내역 확인하기 →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: t.bg, padding: "56px 20px" }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: t.muted, margin: "0 0 8px" }}>
          {isPaid ? `${price.toLocaleString()}원` : "무료"} · 온라인 라이브 · 선착순
        </p>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: t.text, margin: "0 0 4px", lineHeight: 1.3 }}>
          라이브에서 만나요
        </h3>
        <p style={{ fontSize: 15, color: t.sub, margin: "0 0 8px" }}>
          공유회 당일 알림톡과 이메일로 라이브 링크를 보내드립니다.
        </p>
        <p style={{ fontSize: 14, color: t.muted, margin: "0 0 28px" }}>
          선착순 1000명으로 입장이 제한됩니다.
        </p>

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
            {loading ? "신청 중..." : "신청하기"}
          </button>
        )}
      </form>
    </section>
  );
}
