import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SpongeClubLanding } from "./SpongeClubLanding";

export const dynamic = "force-dynamic";

async function getProgram() {
  const { data } = await supabase
    .from("item")
    .select("*")
    .eq("i_formid_webflow", "sponge-club")
    .order("ID", { ascending: false })
    .limit(1);
  return data?.[0] ?? null;
}

export default async function SpongeClubPage() {
  const item = await getProgram();

  if (!item) notFound();

  return (
    <>
      <Header />
      <main className="pt-14">
        <SpongeClubLanding item={item} />
      </main>
    </>
  );
}
