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

const Slide = ({ theme = "light", topLeft, topRight, botLeft, botRight, children, bodyStyle = {} }) => (
  <section className={`slide ${theme === "dark" ? "dark" : theme === "yellow" ? "yellow" : ""}`}>
    <TopBar left={topLeft} right={topRight} />
    <div className="slide-body" style={bodyStyle}>{children}</div>
    <BotBar left={botLeft} right={botRight} />
  </section>
);

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
