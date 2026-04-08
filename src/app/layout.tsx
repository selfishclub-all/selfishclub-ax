import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "셀피쉬클럽 — AI로 일하는 방식을 바꾸는 커뮤니티",
    template: "%s | 셀피쉬클럽",
  },
  description:
    "이기적 공유로 AI 시대를 헤쳐나가는 실전 커뮤니티. 이기적공유회, 이기적멤버십, AAA까지.",
  metadataBase: new URL("https://selfishclub.xyz"),
  openGraph: {
    siteName: "셀피쉬클럽",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
