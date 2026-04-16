import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { ProgramList } from "@/components/programs/ProgramList";

export const dynamic = "force-dynamic";

async function getPrograms() {
  const { data } = await supabase
    .from("item")
    .select("ID, iid, i_title, i_title_userside, i_type, i_formid_webflow, i_paid_tf, i_price, i_eventdate, i_event_count, i_category, i_vodurl, i_full_schedule")
    .eq("i_type", "special")
    .not("i_formid_webflow", "is", null)
    .order("i_eventdate", { ascending: false });
  return data ?? [];
}

export default async function EventsPage() {
  const programs = await getPrograms();

  return (
    <>
      <Header />
      <main className="pt-14">
        <section className="bg-[#0A0A0A] text-white py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <p className="text-[11px] text-[#E2E545] tracking-[0.3em] uppercase mb-4">
              Event
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">이벤트</h1>
            <p className="text-base text-white/40 max-w-lg">
              직접 만나는 셀피쉬클럽의 오프라인 행사
            </p>
          </div>
        </section>

        <section className="bg-[#FAFAF8] min-h-screen">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 lg:py-16">
            <ProgramList programs={programs} basePath="/events" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
