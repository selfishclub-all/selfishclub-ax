import Link from "next/link";

const navItems = [
  { label: "이기적공유회", href: "/sharing" },
  { label: "이기적챌린지", href: "/challenge" },
  { label: "셀피쉬크루", href: "/selfishcrew" },
  { label: "AI툴", href: "/aitools" },
  { label: "블로그", href: "/blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-4 lg:px-12">
        <Link href="/" className="text-xl font-bold text-[#0A0A0A]">
          SELFISH CLUB
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#0A0A0A] hover:text-[#888888] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/membership"
            className="hidden sm:inline-flex bg-[#FFD700] text-[#0A0A0A] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#E5C200] transition-colors"
          >
            멤버십 가입
          </Link>
          <Link
            href="/login"
            className="text-sm text-[#0A0A0A] hover:text-[#888888] transition-colors"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
