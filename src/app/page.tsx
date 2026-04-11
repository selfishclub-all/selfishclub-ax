import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { HomeClient } from "./(public)/HomeClient";

export const dynamic = "force-dynamic";

async function getPrograms() {
  const { data } = await supabase
    .from("item")
    .select("ID, i_title, i_title_userside, i_type, i_formid_webflow, i_paid_tf, i_price, i_eventdate, i_event_count")
    .not("i_formid_webflow", "is", null)
    .order("ID", { ascending: false })
    .limit(6);
  return data ?? [];
}

export default async function Home() {
  const programs = await getPrograms();

  return (
    <>
      <Header />
      <HomeClient programs={programs} />
      <Footer />
    </>
  );
}
