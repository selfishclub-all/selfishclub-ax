import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { SpongeClubPaidLanding } from "./SpongeClubPaidLanding";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "스폰지 클럽 1기 — 7주 AI 에이전트 풀사이클 빌딩 커뮤니티",
  description: "딸깍 한 번으로는 갈 수 없는 곳까지, 7주를 제대로 들여서 함께 도착합니다.",
  openGraph: {
    title: "스폰지 클럽 1기 — 7주 AI 에이전트 풀사이클 빌딩 커뮤니티",
    description: "딸깍 한 번으로는 갈 수 없는 곳까지, 7주를 제대로 들여서 함께 도착합니다.",
  },
};

async function getProgram() {
  const { data } = await supabase
    .from("item")
    .select("*")
    .eq("i_formid_webflow", "sponge-club")
    .order("ID", { ascending: false })
    .limit(1);
  return data?.[0] ?? null;
}

export default async function SpongeClubPaidPage() {
  const item = await getProgram();
  if (!item) notFound();
  return (
    <main>
      <SpongeClubPaidLanding item={item} />
    </main>
  );
}
