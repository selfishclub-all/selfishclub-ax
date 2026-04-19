import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getTools() {
  const { data } = await supabase
    .from("aitools")
    .select("*")
    .eq("is_visible", true)
    .order("id", { ascending: true });
  return data ?? [];
}

export default async function AIToolsPage() {
  const tools = await getTools();

  return (
    <>
      <Header />
      <main className="pt-14">
        <section className="bg-[#0A0A0A] text-white py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <p className="text-[11px] text-[#E2E545] tracking-[0.3em] uppercase mb-4">
              AI Tools
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">추천 AI 툴</h1>
            <p className="text-base text-white/40 max-w-lg">
              셀피쉬클럽이 직접 써보고 추천하는 AI 툴 모음
            </p>
          </div>
        </section>

        <section className="bg-[#FAFAF8] min-h-screen">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.referral_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg border border-[#E5E5E5]/60 p-6 hover:border-[#E2E545]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  {tool.logo_url && (
                    <div className="w-12 h-12 mb-4 rounded-lg overflow-hidden bg-[#F5F5F5]">
                      <img
                        src={tool.logo_url}
                        alt={tool.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 group-hover:text-[#0A0A0A]">
                    {tool.name}
                  </h3>
                  {tool.description && (
                    <p className="text-sm text-[#888] leading-relaxed mb-3 whitespace-pre-line">
                      {tool.description}
                    </p>
                  )}
                  {tool.benefit && (
                    <div className="bg-[#E2E545]/10 rounded px-3 py-2">
                      <p className="text-xs text-[#0A0A0A]/70 leading-relaxed whitespace-pre-line">
                        {tool.benefit}
                      </p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
