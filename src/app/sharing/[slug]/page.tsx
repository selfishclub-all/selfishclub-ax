import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PurchaseButton } from "./PurchaseButton";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProgram(slug: string) {
  const { data } = await supabase
    .from("item")
    .select("*")
    .eq("i_formid_webflow", slug)
    .single();
  return data;
}

export default async function SharingDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getProgram(slug);

  if (!item) notFound();

  const displayTitle = item.i_title_userside || item.i_title;
  const isPaid = item.i_paid_tf;
  const price = item.i_price ?? 0;

  return (
    <>
      <Header />
      <main>
        {/* 히어로 */}
        <section className="bg-[#0A0A0A] text-white py-20">
          <div className="max-w-3xl mx-auto px-4 lg:px-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-[#FFD700] text-[#0A0A0A] text-xs font-semibold px-3 py-1 rounded-full">
                {item.i_type}
              </span>
              {isPaid ? (
                <span className="inline-block bg-white/10 text-white text-xs px-3 py-1 rounded-full">
                  {price.toLocaleString()}원
                </span>
              ) : (
                <span className="inline-block bg-white/10 text-white text-xs px-3 py-1 rounded-full">
                  무료
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
              {displayTitle}
            </h1>
            {item.i_eventdate && (
              <p className="text-[#888888] text-lg">
                {item.i_eventdate}
                {item.i_full_schedule && ` · ${item.i_full_schedule}`}
              </p>
            )}
          </div>
        </section>

        {/* 본문 */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 lg:px-12">
            {/* 프로그램 정보 */}
            <div className="space-y-8">
              <div className="bg-[#F5F5F0] rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold">프로그램 정보</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#888888] mb-1">유형</p>
                    <p className="font-medium">{item.i_type}</p>
                  </div>
                  <div>
                    <p className="text-[#888888] mb-1">가격</p>
                    <p className="font-medium">
                      {isPaid ? `${price.toLocaleString()}원` : "무료"}
                    </p>
                  </div>
                  {item.i_eventdate && (
                    <div>
                      <p className="text-[#888888] mb-1">행사 날짜</p>
                      <p className="font-medium">{item.i_eventdate}</p>
                    </div>
                  )}
                  {item.i_live_count_max && (
                    <div>
                      <p className="text-[#888888] mb-1">정원</p>
                      <p className="font-medium">
                        {item.i_event_count ?? 0}/{item.i_live_count_max}명
                      </p>
                    </div>
                  )}
                  {item.i_event_count > 0 && !item.i_live_count_max && (
                    <div>
                      <p className="text-[#888888] mb-1">신청자</p>
                      <p className="font-medium">{item.i_event_count}명</p>
                    </div>
                  )}
                </div>
              </div>

              {/* VOD */}
              {item.i_vodurl && (
                <div className="bg-[#F5F5F0] rounded-2xl p-6">
                  <h2 className="text-lg font-bold mb-2">VOD</h2>
                  <a
                    href={item.i_vodurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline underline-offset-2 text-sm"
                  >
                    VOD 보러가기
                  </a>
                </div>
              )}
            </div>

            {/* 신청 CTA */}
            <div className="mt-12 sticky bottom-6">
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">
                    {isPaid ? `${price.toLocaleString()}원` : "무료"}
                  </p>
                  <p className="text-sm text-[#888888]">{displayTitle}</p>
                </div>
                <PurchaseButton
                  itemId={item.iid}
                  slug={slug}
                  title={displayTitle}
                  price={price}
                  isPaid={isPaid}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
