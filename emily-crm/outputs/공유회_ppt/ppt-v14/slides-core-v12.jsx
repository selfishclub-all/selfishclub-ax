// AAA 발표 덱 v7 — Slide Core Components
// Frame + 공통 컴포넌트

const TopBar = ({ left = "", right = "EMILY · SELFISH CLUB · AAA" }) => (
  <div className="slide-top">
    <div className="stamp">{left}</div>
    <div>{right}</div>
  </div>
);

const BotBar = ({ left = "", right = "" }) => (
  <div className="slide-bot">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

const Slide = ({ theme = "light", topLeft, topRight, botLeft, botRight, num, total, children, bodyStyle = {} }) => {
  const pageInfo = num ? String(num).padStart(2, '0') : '';
  const totalInfo = total ? String(total).padStart(2, '0') : '';
  return (
    <section className={`slide ${theme === "dark" ? "dark" : theme === "yellow" ? "yellow" : ""}`}>
      <TopBar left={topLeft} right={topRight} />
      <div className="slide-body" style={bodyStyle}>{children}</div>
      <BotBar left={botLeft} right={botRight} />
      {num && (
        <div className="page-num" style={{
          position: 'absolute', right: 56, bottom: 36,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 18, fontWeight: 700, letterSpacing: '0.1em',
          color: theme === 'dark' ? 'rgba(255,255,255,0.55)' : theme === 'yellow' ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.45)'
        }}>
          {pageInfo} / {totalInfo}
        </div>
      )}
    </section>
  );
};

// Arrow between two blocks
const Arr = ({ size = 80 }) => (
  <div className="arrow" style={{ fontSize: size, margin: "0 24px" }}>→</div>
);

// Simple phone bezel
const Phone = ({ children, style = {} }) => (
  <div className="phone" style={style}>
    <div className="phone-screen">{children}</div>
  </div>
);

window.TopBar = TopBar;
window.BotBar = BotBar;
window.Slide = Slide;
window.Arr = Arr;
window.Phone = Phone;
