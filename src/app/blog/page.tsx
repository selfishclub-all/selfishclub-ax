import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getPosts() {
  const { data } = await supabase
    .from("blog")
    .select("id, title, slug, author, thumbnail, description, created_at")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="pt-14">
        <section className="bg-[#0A0A0A] text-white py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <p className="text-[11px] text-[#E2E545] tracking-[0.3em] uppercase mb-4">
              Blog
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">팀 블로그</h1>
            <p className="text-base text-white/40 max-w-lg">
              셀피쉬클럽 크루들의 실전 이야기
            </p>
          </div>
        </section>

        <section className="bg-[#FAFAF8] min-h-screen">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-lg border border-[#E5E5E5]/60 overflow-hidden hover:border-[#0A0A0A]/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  {post.thumbnail ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.thumbnail})` }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A]" />
                  )}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#0A0A0A] leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-sm text-[#888] leading-relaxed mb-3 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-[#999]">
                      {post.author && <span>{post.author}</span>}
                      {post.author && post.created_at && <span className="w-px h-3 bg-[#E5E5E5]" />}
                      {post.created_at && <span>{formatDate(post.created_at)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
