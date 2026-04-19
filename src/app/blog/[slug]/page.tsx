import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .eq("is_visible", true)
    .single();
  return data;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="pt-14">
        <section className="bg-[#0A0A0A] text-white">
          {post.thumbnail && (
            <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.thumbnail})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
            </div>
          )}
          <div className="max-w-3xl mx-auto px-5 lg:px-10 py-10 lg:py-14">
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-white/40">
              {post.author && <span>{post.author}</span>}
              {post.author && post.created_at && <span>·</span>}
              {post.created_at && <span>{formatDate(post.created_at)}</span>}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-10 py-12 lg:py-20">
            <div
              className="prose prose-lg max-w-none text-[#333] leading-[2]"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
