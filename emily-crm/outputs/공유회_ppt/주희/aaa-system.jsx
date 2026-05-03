// =========================================================
// AAA Selfmarketing — Slide Layout Templates
// 6 layouts: Hero / Split / Quote / Stats / List / CTA
// All accept {theme, brand, page, total, children, ...}
// =========================================================

const { useState } = React;

// ── Shared bits ─────────────────────────────────────────
const Brandmark = ({ children = "AAA SELFMARKETING" }) =>
  <div className="brandmark">{children}</div>;

const SwipeHint = ({ label = "SWIPE" }) =>
  <div className="swipe"><span>{label}</span><span className="arr">→</span></div>;

const PageNum = ({ n, total }) =>
  <div className="pgnum">{String(n).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>;

// ── Frame ───────────────────────────────────────────────
// theme: "light" | "dark" | "accent"
// brand: show brandmark corner stamp
// footer: "swipe" | "page" | null
const Frame = ({ theme = "light", brand = true, footer = "page", page, total = 10, children, style = {} }) => {
  const cls = theme === "dark" ? "ig dark" : theme === "accent" ? "ig accent" : "ig";
  return (
    <div className={cls} style={style}>
      {brand && <Brandmark />}
      <div className="pad">{children}</div>
      {footer === "swipe" && <SwipeHint />}
      {footer === "page" && page != null && <PageNum n={page} total={total} />}
    </div>
  );
};

// ── 1. HERO ─────────────────────────────────────────────
// Big poster moment — cover, section headers, punchline slides
// props: kicker, title (string or node), sub, accent ('hl'|'u'|'word')
const HeroSlide = ({
  kicker, title, sub, theme = "dark", accent, accentWord,
  brand = true, footer = "swipe", page, total
}) => {
  const rendered = (() => {
    if (typeof title !== "string") return title;
    if (accent === "hl" && accentWord) {
      const i = title.indexOf(accentWord);
      if (i >= 0) return <>{title.slice(0,i)}<span className="hl">{accentWord}</span>{title.slice(i+accentWord.length)}</>;
    }
    if (accent === "u" && accentWord) {
      const i = title.indexOf(accentWord);
      if (i >= 0) return <>{title.slice(0,i)}<span className="u">{accentWord}</span>{title.slice(i+accentWord.length)}</>;
    }
    return title;
  })();

  return (
    <Frame theme={theme} brand={brand} footer={footer} page={page} total={total}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', paddingTop: 40 }}>
        {kicker && <div className="kicker" style={{ marginBottom: 40 }}>{kicker}</div>}
        <div className="h-hero" style={{ fontSize: 150 }}>{rendered}</div>
        {sub && <div className="body" style={{ marginTop: 56, fontSize: 40 }}>{sub}</div>}
      </div>
    </Frame>
  );
};

// ── 2. SPLIT (2-column before/after, do/don't) ──────────
// props: kicker, title, left:{label,title,body,tone}, right:{...}
const SplitSlide = ({
  kicker, title, left, right,
  theme = "light", brand = true, page, total
}) => {
  const Card = ({ d, tone = "mute" }) => {
    const bg = tone === "accent" ? "var(--accent)" : tone === "ink" ? "var(--ink)" : "var(--surface)";
    const color = tone === "ink" ? "#fff" : "var(--ink)";
    const labelColor = tone === "ink" ? "rgba(255,255,255,0.55)" : tone === "accent" ? "var(--accent-ink)" : "#666";
    return (
      <div style={{ flex:1, background:bg, color, padding:'48px 44px', borderRadius:'var(--r-card)', display:'flex', flexDirection:'column', minHeight:720 }}>
        {d.label && <div className="kicker" style={{ color: labelColor, marginBottom: 24 }}>{d.label}</div>}
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing:'-0.03em', lineHeight: 1.1, marginBottom: 28 }}>{d.title}</div>
        <div style={{ fontSize: 32, lineHeight: 1.5, opacity: tone === "ink" ? 0.85 : 1 }}>{d.body}</div>
      </div>
    );
  };
  return (
    <Frame theme={theme} brand={brand} footer="page" page={page} total={total}>
      <div style={{ paddingTop: 40 }}>
        {kicker && <div className="kicker" style={{ marginBottom: 20 }}>{kicker}</div>}
        {title && <div className="h-l" style={{ fontSize: 78, marginBottom: 48 }}>{title}</div>}
      </div>
      <div style={{ flex:1, display:'flex', gap: 24 }}>
        <Card d={left}  tone={left.tone || "mute"} />
        <Card d={right} tone={right.tone || "ink"} />
      </div>
    </Frame>
  );
};

// ── 3. QUOTE ────────────────────────────────────────────
const QuoteSlide = ({
  quote, attribution, role,
  theme = "light", brand = true, page, total
}) => (
  <Frame theme={theme} brand={brand} footer="page" page={page} total={total}>
    <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <div className="quote">{quote}</div>
      {attribution && (
        <div style={{ marginTop: 64, display:'flex', alignItems:'center', gap:24 }}>
          <div style={{ height:2, width:80, background:'var(--ink)' }} />
          <div>
            <div style={{ fontSize: 34, fontWeight: 800 }}>{attribution}</div>
            {role && <div style={{ fontSize: 26, color:'#666', fontWeight: 500, marginTop:4 }}>{role}</div>}
          </div>
        </div>
      )}
    </div>
  </Frame>
);

// ── 4. STATS (big numbers) ──────────────────────────────
// props: kicker, title, stats:[{num,lab,tone}], closer
const StatsSlide = ({
  kicker, title, stats, closer,
  theme = "light", brand = true, page, total
}) => (
  <Frame theme={theme} brand={brand} footer="page" page={page} total={total}>
    <div style={{ paddingTop: 40 }}>
      {kicker && <div className="kicker" style={{ marginBottom: 20 }}>{kicker}</div>}
      {title && <div className="h-l" style={{ fontSize: 82, marginBottom: 56 }}>{title}</div>}
    </div>
    <div style={{ flex:1, display:'flex', flexDirection:'column', gap: 24, justifyContent:'center' }}>
      <div style={{ display:'flex', gap: 18 }}>
        {stats.map((s,i) =>
          <div key={i} className={`stat${s.tone === 'ink' ? ' k' : s.tone === 'accent' ? ' y' : ''}`}>
            <div className="stat-num" style={{ fontSize: s.big ? 120 : 76 }}>{s.num}</div>
            <div className="stat-lab">{s.lab}</div>
          </div>
        )}
      </div>
      {closer && <div className="body" style={{ fontSize: 34, marginTop: 32 }}>{closer}</div>}
    </div>
  </Frame>
);

// ── 5. LIST (numbered takeaways) ────────────────────────
const ListSlide = ({
  kicker, title, items,
  theme = "light", brand = true, page, total
}) => (
  <Frame theme={theme} brand={brand} footer="page" page={page} total={total}>
    <div style={{ paddingTop: 40 }}>
      {kicker && <div className="kicker" style={{ marginBottom: 20 }}>{kicker}</div>}
      {title && <div className="h-l" style={{ fontSize: 78, marginBottom: 56 }}>{title}</div>}
    </div>
    <div className="nlist" style={{ flex:1, justifyContent:'center' }}>
      {items.map((it, i) =>
        <div key={i} className="nlist-item">
          <div className="nlist-num">{String(i+1).padStart(2,'0')}</div>
          <div className="nlist-body">
            <div className="nlist-t">{it.t}</div>
            {it.d && <div className="nlist-d">{it.d}</div>}
          </div>
        </div>
      )}
    </div>
  </Frame>
);

// ── 6. CTA (final card) ─────────────────────────────────
// props: eyebrow, title, action, handle, hashtags
const CTASlide = ({
  eyebrow, title, action, handle, hashtags,
  theme = "accent", brand = true, page, total
}) => (
  <Frame theme={theme} brand={brand} footer={null} page={page} total={total}>
    <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between', paddingTop: 40, paddingBottom: 40 }}>
      <div>
        {eyebrow && <div className="kicker" style={{ marginBottom: 32 }}>{eyebrow}</div>}
        <div className="h-hero" style={{ fontSize: 140 }}>{title}</div>
      </div>

      {action && (
        <div style={{ background: theme === "accent" ? "var(--ink)" : "var(--accent)",
                      color: theme === "accent" ? "var(--accent)" : "var(--ink)",
                      padding:'48px 52px', borderRadius: 18 }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing:'0.14em', textTransform:'uppercase', opacity: 0.7, marginBottom: 16 }}>
            HOW TO
          </div>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.2, letterSpacing:'-0.02em' }}>
            {action}
          </div>
          {handle && <div style={{ marginTop: 24, fontSize: 32, fontWeight: 600, opacity: 0.8 }}>{handle}</div>}
        </div>
      )}

      {hashtags && (
        <div style={{ display:'flex', gap: 14, flexWrap:'wrap' }}>
          {hashtags.map((h,i) =>
            <span key={i} style={{ padding:'14px 24px', background:'var(--ink)', color:'var(--accent)', borderRadius: 999, fontSize: 26, fontWeight: 700 }}>
              #{h}
            </span>
          )}
        </div>
      )}
    </div>
  </Frame>
);

// Export globally
Object.assign(window, {
  Frame, Brandmark, SwipeHint, PageNum,
  HeroSlide, SplitSlide, QuoteSlide, StatsSlide, ListSlide, CTASlide,
});
