import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

async function getPrograms() {
  const { data } = await supabase
    .from("item")
    .select("ID, i_title, i_title_userside, i_type, i_formid_webflow, i_paid_tf, i_price, i_eventdate, i_event_count")
    .not("i_formid_webflow", "is", null)
    .order("ID", { ascending: false })
    .limit(6);
  return data ?? [];
}

function getProgramHref(type: string, slug: string) {
  const prefix: Record<string, string> = {
    sharing: "/sharing",
    challenge: "/challenge",
    workshop: "/sharing",
    special: "/sharing",
  };
  return `${prefix[type] ?? "/sharing"}/${slug}`;
}

function formatPrice(paid: boolean, price: number | null) {
  if (!paid) return "무료";
  return price ? `${price.toLocaleString()}원` : "유료";
}

export default async function Home() {
  const programs = await getPrograms();

  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-[#0A0A0A] text-white min-h-[70vh] flex items-center">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-12 py-20">
            <p className="text-[#FFD700] font-semibold mb-4">AI로 일하는 방식을 바꾸는</p>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              이기적 공유 커뮤니티<br />
              <span className="text-[#FFD700]">SELFISH CLUB</span>
            </h1>
            <p className="text-lg text-[#888888] mb-10 max-w-lg">
              냅-다 해보고, 쌩-날 경험을 나누고, 우당탕탕 해내는 사람들.
            </p>
            <div className="flex gap-4">
              <Link
                href="/membership"
                className="bg-[#FFD700] text-[#0A0A0A] font-semibold px-7 py-3 rounded-lg hover:bg-[#E5C200] transition-colors"
              >
                멤버십 알아보기
              </Link>
              <Link
                href="/sharing"
                className="border border-white text-white px-7 py-3 rounded-lg hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                공유회 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 프로그램 */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-10">프로그램</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <Link
                  key={p.ID}
                  href={getProgramHref(p.i_type, p.i_formid_webflow)}
                  className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block bg-[#FFD700] text-[#0A0A0A] text-xs font-semibold px-3 py-1 rounded-full">
                      {formatPrice(p.i_paid_tf, p.i_price)}
                    </span>
                    <span className="inline-block bg-[#F5F5F0] text-[#0A0A0A] text-xs px-3 py-1 rounded-full">
                      {p.i_type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {p.i_title_userside || p.i_title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#888888]">
                    {p.i_eventdate && <span>{p.i_eventdate}</span>}
                    {p.i_event_count > 0 && <span>{p.i_event_count}명 신청</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 셀피쉬클럽 소개 */}
        <section className="bg-[#F5F5F0] py-20">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">우리는 이렇게 일해</h2>
            <p className="text-[#888888] max-w-xl mx-auto mb-10">
              디지털 잡부들이 모여서 AI로 진짜 일하는 법을 쌩-날로 공유하는 곳
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <p className="text-2xl font-bold mb-2">30+</p>
                <p className="text-sm text-[#888888]">이기적공유회 개최</p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <p className="text-2xl font-bold mb-2">500+</p>
                <p className="text-sm text-[#888888]">멤버십 회원</p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <p className="text-2xl font-bold mb-2">AI First</p>
                <p className="text-sm text-[#888888]">모든 운영을 AI로</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
