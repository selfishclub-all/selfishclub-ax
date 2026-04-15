import Link from "next/link";

const sidebarItems = [
  { label: "대시보드", href: "/admin", icon: "📊" },
  { label: "프로그램 관리", href: "/admin/programs", icon: "📋" },
  { label: "회원 관리", href: "/admin/members", icon: "👥" },
  { label: "결제 내역", href: "/admin/payments", icon: "💳" },
  { label: "알림톡", href: "/admin/notifications", icon: "📱" },
  { label: "블로그", href: "/admin/blog", icon: "✏️" },
  { label: "콘텐츠", href: "/admin/content", icon: "📁" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* 사이드바 */}
      <aside className="w-60 bg-[#0A0A0A] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-[#222]">
          <Link href="/admin" className="text-lg font-bold">
            SC Admin
          </Link>
          <p className="text-xs text-[#888888] mt-1">셀피쉬클럽 관리자</p>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#888888] hover:text-white hover:bg-[#222] transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-5 border-t border-[#222]">
          <Link href="/" className="text-xs text-[#888888] hover:text-white transition-colors">
            ← 홈페이지로
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 bg-[#F5F5F0] p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
