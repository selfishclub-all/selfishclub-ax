import Link from "next/link";

const footerLinks = [
  {
    title: "프로그램",
    links: [
      { label: "이기적공유회", href: "/sharing" },
      { label: "이기적챌린지", href: "/challenge" },
      { label: "이기적멤버십", href: "/membership" },
      { label: "AAA", href: "/aaa" },
    ],
  },
  {
    title: "커뮤니티",
    links: [
      { label: "셀피쉬크루", href: "/selfishcrew" },
      { label: "블로그", href: "/blog" },
      { label: "추천 AI툴", href: "/aitools" },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "파트너사", href: "/partners" },
      { label: "보도자료", href: "/press" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* 상단 CTA */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-20 text-center">
          <p className="text-white/30 text-sm tracking-widest uppercase mb-4">
            Ready to start
          </p>
          <p className="text-2xl lg:text-4xl font-bold mb-8 leading-tight">
            당신의 실전이 시작되는 곳
          </p>
          <Link
            href="/membership"
            className="inline-flex text-sm text-[#0A0A0A] bg-[#E2E545] font-semibold px-8 py-3 rounded hover:bg-[#CDD03B] transition-colors duration-300"
          >
            멤버십 시작하기
          </Link>
        </div>
      </div>

      {/* 링크 */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3">
                Selfish Club
              </p>
              <p className="text-xs text-white/30 leading-relaxed max-w-xs">
                AI를 실전에 장착하는 마케터·실무자들의 커뮤니티.
                배우는 것에서 끝나지 않고, 직접 만들고 세상에 던진다.
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-xs text-white/30 tracking-widest uppercase mb-4">
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 카피라이트 */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-white/20">
            © 2026 커넥테리안 All rights reserved.
          </p>
          <p className="text-[11px] text-white/20">
            selfishclub.xyz
          </p>
        </div>
      </div>
    </footer>
  );
}
