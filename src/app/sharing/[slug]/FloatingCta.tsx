"use client";

import { useState, useEffect } from "react";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // 히어로를 지나면 표시
      const showAfter = window.innerHeight * 0.7;
      const scrollY = window.scrollY;

      if (scrollY < showAfter) {
        setVisible(false);
        return;
      }

      // 신청폼 섹션이 뷰포트에 들어오면 숨김
      const applySection = document.querySelector("[data-apply-form]");
      if (applySection) {
        const rect = applySection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisible(false);
          return;
        }
      }

      setVisible(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToApply() {
    const applySection = document.querySelector("[data-apply-form]");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 transition-all duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)", opacity: visible ? 1 : 0 }}
    >
      <button
        onClick={scrollToApply}
        className="w-full max-w-lg mx-auto block py-4 rounded-full text-base font-bold shadow-2xl transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: "#E2E545", color: "#0A0A0A" }}
      >
        마감되기 전에 신청하기
      </button>
    </div>
  );
}
