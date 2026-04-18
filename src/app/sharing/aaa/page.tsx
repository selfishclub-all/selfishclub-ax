import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { SpongeClubLanding } from "./SpongeClubLanding";

export const dynamic = "force-dynamic";

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
