import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { SpongeClubLanding } from "./SpongeClubLanding";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AAA 공유회 — AI, '딸-깍'이 가능할까요?",
  description: "AAA팀 8명이 6주 동안 직접 부딪쳐본 기록. 4월 28일 무료 온라인 라이브.",
  openGraph: {
    title: "AAA 공유회 — AI, '딸-깍'이 가능할까요?",
    description: "AAA팀 8명이 6주 동안 직접 부딪쳐본 기록. 4월 28일 무료 온라인 라이브.",
    images: [{ url: "/images/og-aaa.png", width: 1200, height: 630 }],
  },
};

async function getProgram() {
  const { data } = await supabase
    .from("item")
    .select("*")
    .eq("i_formid_webflow", "aaa")
    .order("ID", { ascending: false })
    .limit(1);
  return data?.[0] ?? null;
}

export default async function SpongeClubPage() {
  const item = await getProgram();

  if (!item) notFound();

  return (
    <main>
      <SpongeClubLanding item={item} />
    </main>
  );
}
