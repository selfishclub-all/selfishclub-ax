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
      { label: "영상 포트폴리오", href: "/portfolio" },
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
    <footer className="bg-[#0A0A0A] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-xl font-bold mb-3">SELFISH CLUB</p>
            <p className="text-sm text-[#888888]">
              AI로 일하는 방식을 바꾸는<br />이기적 공유 커뮤니티
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="font-semibold text-sm mb-3">{group.title}</p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#888888] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#222] pt-6 text-xs text-[#888888]">
          <p>© 2026 커넥테리안. All rights reserved. | selfishclub.xyz</p>
        </div>
      </div>
    </footer>
  );
}
