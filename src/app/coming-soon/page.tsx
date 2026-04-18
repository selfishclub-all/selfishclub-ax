export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
      <div className="text-center">
        <p className="text-xs text-[#E2E545] tracking-[0.3em] uppercase font-mono mb-6">
          Coming Soon
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          셀피쉬클럽
        </h1>
        <p className="text-base text-white/40 mb-10">
          새로운 모습으로 곧 찾아갑니다.
        </p>
        <a
          href="/sharing/aaa"
          className="inline-flex text-sm bg-[#E2E545] text-[#0A0A0A] font-bold px-6 py-3 rounded-full hover:bg-[#CDD03B] transition-colors"
        >
          AAA 공유회 보러가기
        </a>
      </div>
    </div>
  );
}
