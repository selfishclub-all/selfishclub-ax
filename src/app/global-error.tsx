"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>오류가 발생했습니다</h2>
          <button onClick={() => reset()} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
