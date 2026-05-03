/**
 * 에밀리 AAA 공유회 발표 PPT — v5 (25장)
 * - 포인트 컬러: #E9ED12 (셀피쉬 형광 연두)
 * - 텍스트 최소화 + 시각 1요소 원칙
 * - 하네스 서사: 귀납적 (맥북 2개·md 비대·AI 틀림 → "알고 보니 하네스였더라")
 * - 알림톡 자체 유즈케이스 (DB 자동 발라내기) 추가
 */
const pptxgen = require("pptxgenjs");

const C = {
  bg: "FFFFFF",
  text: "0F0F0F",
  muted: "6B6B6B",
  accent: "E9ED12",       // 형광 연두 (포인트)
  accentPale: "FBFDC7",   // 아주 연한 틴트
  accentMid: "F5F7B0",    // 중간 틴트
  divider: "E5E5E5",
  dark: "0F0F0F",
  grayBg: "F8F8F8",
  grayBg2: "F8FAFC",
};
const F = { title: "Pretendard", body: "Pretendard" };

// 섹션 상단 라벨 (다니식 아닌, 내 버전)
function sectionLabel(pres, s, sectionNum, totalSections, label) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.35, w: 0.08, h: 0.22,
    fill: { color: C.accent }, line: { type: "none" }
  });
  s.addText(`SECTION ${sectionNum} / ${totalSections}`, {
    x: 0.7, y: 0.3, w: 2.5, h: 0.32,
    fontFace: F.body, fontSize: 10, bold: true,
    color: C.accent, charSpacing: 3, valign: "middle", margin: 0
  });
  s.addText(label, {
    x: 3.2, y: 0.3, w: 6, h: 0.32,
    fontFace: F.body, fontSize: 10, bold: true,
    color: C.muted, charSpacing: 2, valign: "middle", margin: 0
  });
}

// 페이지 번호
function pageNum(s, n, total) {
  s.addText(`${n} / ${total}`, {
    x: 8.8, y: 5.2, w: 0.8, h: 0.3,
    fontFace: F.body, fontSize: 9,
    color: C.muted, align: "right", margin: 0
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "에밀리 · 셀피쉬클럽";
  pres.title = "매일 아침, AI가 알림톡을 들고 옵니다";
  const TOTAL = 25;

  // ==================== P1. 타이틀 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.dark };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 0.5, w: 0.08, h: 0.4,
      fill: { color: C.accent }, line: { type: "none" }
    });
    s.addText("SELFISH CLUB · AAA PROJECT", {
      x: 0.7, y: 0.5, w: 8, h: 0.4,
      fontFace: F.body, fontSize: 11, color: "CBD5E1", charSpacing: 3
    });
    s.addText("매일 아침,", {
      x: 0.5, y: 1.7, w: 9, h: 0.9,
      fontFace: F.title, fontSize: 54, bold: true,
      color: "FFFFFF", margin: 0
    });
    s.addText("AI가 알림톡을 들고 옵니다", {
      x: 0.5, y: 2.55, w: 9, h: 0.9,
      fontFace: F.title, fontSize: 54, bold: true,
      color: C.accent, margin: 0
    });
    s.addText("\"오늘 이 카피로 오후 3시에 보낼까요?\"", {
      x: 0.5, y: 3.7, w: 9, h: 0.6,
      fontFace: F.body, fontSize: 20, italic: true,
      color: "E5E7EB", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.5, y: 4.7, w: 1.2, h: 0,
      line: { color: C.accent, width: 2 }
    });
    s.addText("에밀리 · 셀피쉬클럽 CRM PM · AAA 크루", {
      x: 0.5, y: 4.8, w: 9, h: 0.4,
      fontFace: F.body, fontSize: 13, color: "CBD5E1", margin: 0
    });
  }

  // ==================== P2. 자기소개 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    s.addText("안녕하세요,", {
      x: 0.7, y: 0.9, w: 9, h: 0.6,
      fontFace: F.title, fontSize: 26, color: C.muted, margin: 0
    });
    s.addText("에밀리입니다", {
      x: 0.7, y: 1.45, w: 9, h: 1.0,
      fontFace: F.title, fontSize: 56, bold: true,
      color: C.text, margin: 0
    });

    const cardW = 4.1, cardH = 1.95;
    // 좌: 본업
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.7, y: 3.05, w: cardW, h: cardH,
      fill: { color: C.accent }, line: { type: "none" },
      rectRadius: 0.1
    });
    s.addText("본업", {
      x: 0.9, y: 3.2, w: cardW - 0.4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.dark, charSpacing: 2, margin: 0
    });
    s.addText("셀피쉬클럽 CRM PM", {
      x: 0.9, y: 3.55, w: cardW - 0.4, h: 0.55,
      fontFace: F.title, fontSize: 22, bold: true,
      color: C.text, margin: 0
    });
    s.addText("이기적멤버십 6,800명\n공유회 CRM 혼자 담당", {
      x: 0.9, y: 4.15, w: cardW - 0.4, h: 0.8,
      fontFace: F.body, fontSize: 12, color: C.text,
      margin: 0, valign: "top", paraSpaceAfter: 2
    });

    // 우: 부캐
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 3.05, w: cardW, h: cardH,
      fill: { color: C.grayBg },
      line: { color: C.divider, width: 1 },
      rectRadius: 0.1
    });
    s.addText("AAA 크루", {
      x: 5.4, y: 3.2, w: cardW - 0.4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText("에밀리", {
      x: 5.4, y: 3.55, w: cardW - 0.4, h: 0.55,
      fontFace: F.title, fontSize: 22, bold: true,
      color: C.text, margin: 0
    });
    s.addText("6주간 Claude Code로\n업무 에이전트 만드는 크루", {
      x: 5.4, y: 4.15, w: cardW - 0.4, h: 0.8,
      fontFace: F.body, fontSize: 12, color: C.muted,
      margin: 0, valign: "top", paraSpaceAfter: 2
    });
    pageNum(s, 2, TOTAL);
  }

  // ==================== P3. AAA 참여 이유 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    s.addText("왜 AAA에 왔냐면요", {
      x: 0.7, y: 0.9, w: 9, h: 0.8,
      fontFace: F.title, fontSize: 32, bold: true,
      color: C.text, margin: 0
    });

    // 상황 박스 (좌)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.7, y: 2.2, w: 4.3, h: 2.7,
      fill: { color: C.grayBg }, line: { type: "none" },
      rectRadius: 0.1
    });
    s.addText("이때 제가 있던 자리", {
      x: 0.9, y: 2.4, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText("공유회 월 4~6번.", {
      x: 0.9, y: 2.85, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 17, bold: true,
      color: C.text, margin: 0
    });
    s.addText("알림톡 9종 매번 수동 발송.", {
      x: 0.9, y: 3.3, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 17, bold: true,
      color: C.text, margin: 0
    });
    s.addText("퇴근 직전까지 DB 뽑고 있었어요.", {
      x: 0.9, y: 3.75, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 17, bold: true,
      color: C.text, margin: 0
    });

    // 결심 박스 (우)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.3, y: 2.2, w: 4, h: 2.7,
      fill: { color: C.accent }, line: { type: "none" },
      rectRadius: 0.1
    });
    s.addText("그래서", {
      x: 5.5, y: 2.4, w: 3.6, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.dark, charSpacing: 2, margin: 0
    });
    s.addText("혼자 해보다 한계 느꼈고,", {
      x: 5.5, y: 2.85, w: 3.6, h: 0.5,
      fontFace: F.title, fontSize: 17, bold: true,
      color: C.text, margin: 0
    });
    s.addText("크루들이랑 같이 해보려고\nAAA에 왔어요.", {
      x: 5.5, y: 3.4, w: 3.6, h: 1.2,
      fontFace: F.title, fontSize: 17, bold: true,
      color: C.text, margin: 0, valign: "top", paraSpaceAfter: 2
    });
    pageNum(s, 3, TOTAL);
  }

  // ==================== P4. AAA 크루 8명 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    s.addText("AAA팀 — 8명의 크루", {
      x: 0.5, y: 0.7, w: 9, h: 0.65,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });
    s.addText("각자 다른 일 · 같은 고민 — 내 업무에 AI 진짜로 적용하기", {
      x: 0.5, y: 1.35, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    const crew = [
      { name: "젬마", role: "AAA 오프닝·리드" },
      { name: "다다", role: "옵시디언 + Claude Code 아카이브 웹" },
      { name: "다니", role: "마케터 실무 자동화 OS" },
      { name: "흐민", role: "질문하는 AI — Sullivan 프로젝트" },
      { name: "비비안", role: "셀피쉬 AX 전체 대시보드" },
      { name: "오웬", role: "찜마켓 서비스 실제 출시" },
      { name: "띵크", role: "결제·예약·CRM 통합 대시보드" },
      { name: "에밀리 (나)", role: "CRM 자동화 — 오늘 발표" },
    ];
    const cW = 2.9, cH = 0.85, gap = 0.15;
    crew.forEach((c, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.55 + col * (cW + gap);
      const y = 1.9 + row * (cH + gap);
      const isMe = c.name.includes("나");
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cW, h: cH,
        fill: { color: isMe ? C.accent : C.grayBg },
        line: { color: isMe ? C.accent : C.divider, width: 1 },
        rectRadius: 0.08
      });
      s.addText(c.name, {
        x: x + 0.2, y: y + 0.1, w: cW - 0.4, h: 0.3,
        fontFace: F.body, fontSize: 13, bold: true,
        color: C.text, margin: 0
      });
      s.addText(c.role, {
        x: x + 0.2, y: y + 0.42, w: cW - 0.4, h: 0.4,
        fontFace: F.body, fontSize: 10, italic: true,
        color: isMe ? C.text : C.muted, margin: 0, valign: "top"
      });
    });
    s.addText("6주 동안 Claude Code로 각자 자기 업무에 AI 에이전트를 만들었어요", {
      x: 0.5, y: 5.15, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.text, align: "center", margin: 0
    });
    pageNum(s, 4, TOTAL);
  }

  // ==================== P5. AGENDA — 타겟 + 순서 + 가져갈 것 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };

    // 상단 타겟 바
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 0.45, w: 9, h: 0.5,
      fill: { color: C.dark }, line: { type: "none" }, rectRadius: 0.25
    });
    s.addText("FOR · 반복 업무에 치여 본질에 집중 못 하는 마케터 · PM · 운영 담당자", {
      x: 0.5, y: 0.45, w: 9, h: 0.5,
      fontFace: F.body, fontSize: 12, bold: true,
      color: C.accent, align: "center", valign: "middle", charSpacing: 2, margin: 0
    });

    s.addText("오늘 이야기 흐름", {
      x: 0.5, y: 1.25, w: 9, h: 0.45,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.muted, charSpacing: 3, margin: 0
    });
    s.addText("순서", {
      x: 0.5, y: 1.6, w: 9, h: 0.55,
      fontFace: F.title, fontSize: 24, bold: true,
      color: C.text, margin: 0
    });

    // 좌측: 순서 4단계
    const flow = [
      { num: "01", text: "지난한 여정 — 공유회 1건의 CRM이 왜 보통일이 아니었는지" },
      { num: "02", text: "STEP 1 · 자동화 구조 짜기 (삽질 2가지 + 3 도구)" },
      { num: "03", text: "STEP 2 · 하네스 엔지니어링 (내 상황에서 귀납된 결과)" },
      { num: "04", text: "팀 · 배운 것 · 스폰지클럽" },
    ];
    flow.forEach((f, i) => {
      const y = 2.4 + i * 0.55;
      s.addShape(pres.shapes.OVAL, {
        x: 0.5, y, w: 0.45, h: 0.45,
        fill: { color: C.accent }, line: { type: "none" }
      });
      s.addText(f.num, {
        x: 0.5, y, w: 0.45, h: 0.45,
        fontFace: F.body, fontSize: 10, bold: true,
        color: C.dark, align: "center", valign: "middle", margin: 0
      });
      s.addText(f.text, {
        x: 1.1, y: y, w: 5.3, h: 0.45,
        fontFace: F.body, fontSize: 12,
        color: C.text, valign: "middle", margin: 0
      });
    });

    // 우측: 가져가실 3가지
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.7, y: 2.3, w: 2.8, h: 2.6,
      fill: { color: C.accentPale }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("가져가실 3가지", {
      x: 6.9, y: 2.45, w: 2.4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.dark, charSpacing: 2, margin: 0
    });
    const take = [
      "① AI랑 같이 기획하는 법",
      "② 자동화 구조 설계",
      "③ 내 규칙을 AI가 읽게 만드는 법",
    ];
    take.forEach((t, i) => {
      s.addText(t, {
        x: 6.9, y: 2.9 + i * 0.55, w: 2.5, h: 0.5,
        fontFace: F.title, fontSize: 13, bold: true,
        color: C.text, margin: 0, valign: "top"
      });
    });

    // 하단 강조
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 5.15, w: 9, h: 0.45,
      fill: { color: C.dark }, line: { type: "none" }
    });
    s.addText("한마디로 — \"AI한테 일 잘 시키는 법\"", {
      x: 0.5, y: 5.15, w: 9, h: 0.45,
      fontFace: F.title, fontSize: 14, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });
  }

  // ==================== P6. 받아오신 메시지 4채널 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 1, 4, "WHY · 지난한 여정");

    s.addText("여러분 이거 받고 오셨죠?", {
      x: 0.5, y: 0.8, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 30, bold: true,
      color: C.text, margin: 0
    });
    s.addText("공유회 1건 열리면 이게 다 나가요", {
      x: 0.5, y: 1.5, w: 9, h: 0.4,
      fontFace: F.body, fontSize: 14, italic: true,
      color: C.muted, margin: 0
    });

    const channels = [
      { label: "카카오 알림톡", icon: "📱" },
      { label: "카플친 배너", icon: "📲" },
      { label: "오픈채팅 공지", icon: "💬" },
      { label: "인스타 캐러셀", icon: "📸" },
    ];
    const slotW = 1.95, slotH = 2.6, gap = 0.2;
    const totalW = slotW * 4 + gap * 3;
    const startX = (10 - totalW) / 2;
    channels.forEach((c, i) => {
      const x = startX + i * (slotW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.2, w: slotW, h: slotH,
        fill: { color: C.accentPale },
        line: { color: C.accent, width: 1 },
        rectRadius: 0.1
      });
      s.addText(c.icon, {
        x, y: 2.5, w: slotW, h: 0.8,
        fontSize: 36, align: "center", margin: 0
      });
      s.addText("캡처 자리", {
        x, y: 3.35, w: slotW, h: 0.5,
        fontFace: F.body, fontSize: 10, italic: true,
        color: C.muted, align: "center", margin: 0
      });
      s.addText(c.label, {
        x, y: 4.35, w: slotW, h: 0.4,
        fontFace: F.body, fontSize: 12, bold: true,
        color: C.text, align: "center", margin: 0
      });
    });
    pageNum(s, 6, TOTAL);
  }

  // ==================== P7. 시간축 타임라인 (하나의 선) ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 1, 4, "WHY · 지난한 여정");

    s.addText("공유회 1건 = 10일 × 9번 알림톡", {
      x: 0.5, y: 0.8, w: 9, h: 0.65,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });
    s.addText("그리고 매번 대상이 달라집니다", {
      x: 0.5, y: 1.45, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 13, italic: true,
      color: C.muted, margin: 0
    });

    // 가로 타임라인
    const lineY = 3.2;
    s.addShape(pres.shapes.LINE, {
      x: 0.7, y: lineY, w: 8.6, h: 0,
      line: { color: C.muted, width: 1.5 }
    });

    const points = [
      { x: 0.9, day: "D-7", tpl: "① 오픈알림", target: "전체" },
      { x: 2.3, day: "D-5", tpl: "② 리마인드", target: "미신청자" },
      { x: 3.7, day: "D-1", tpl: "③ D-1", target: "신청자" },
      { x: 5.1, day: "D-day", tpl: "④⑤⑥⑦⑧", target: "교차" },
      { x: 7.8, day: "D+3", tpl: "⑨ VOD", target: "신청자" },
    ];
    points.forEach((p, i) => {
      // 점
      s.addShape(pres.shapes.OVAL, {
        x: p.x - 0.12, y: lineY - 0.12, w: 0.24, h: 0.24,
        fill: { color: C.accent }, line: { color: C.dark, width: 1.2 }
      });
      // 위쪽 라벨
      s.addText(p.day, {
        x: p.x - 0.7, y: lineY - 0.9, w: 1.4, h: 0.3,
        fontFace: F.body, fontSize: 11, bold: true,
        color: C.dark, align: "center", margin: 0
      });
      s.addText(p.tpl, {
        x: p.x - 0.8, y: lineY - 0.55, w: 1.6, h: 0.3,
        fontFace: F.body, fontSize: 10, bold: true,
        color: C.text, align: "center", margin: 0
      });
      // 아래쪽 대상 조건
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: p.x - 0.55, y: lineY + 0.2, w: 1.1, h: 0.35,
        fill: { color: C.accentPale }, line: { type: "none" }, rectRadius: 0.05
      });
      s.addText(p.target, {
        x: p.x - 0.55, y: lineY + 0.2, w: 1.1, h: 0.35,
        fontFace: F.body, fontSize: 9, bold: true,
        color: C.dark, align: "center", valign: "middle", margin: 0
      });
    });

    // 하단 캡션
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.3, w: 9, h: 0.45,
      fill: { color: C.dark }, line: { type: "none" }
    });
    s.addText("→ 매 시점마다 DB 조건이 바뀝니다", {
      x: 0.5, y: 4.3, w: 9, h: 0.45,
      fontFace: F.title, fontSize: 14, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });
    s.addText("이게 촘촘히 짜진 CRM이에요 — 무지성으로 많이 쏘는 게 아니라", {
      x: 0.5, y: 4.9, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, align: "center", margin: 0
    });
    pageNum(s, 7, TOTAL);
  }

  // ==================== P8. DB 발라내기 — 수동이었던 증거 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 1, 4, "WHY · 지난한 여정");

    s.addText("이 조건들을 매번 수동으로 뽑았어요", {
      x: 0.5, y: 0.8, w: 9, h: 0.65,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });
    s.addText("발송마다 다른 대상자 — 예전엔 사람이 손으로 골라냈습니다", {
      x: 0.5, y: 1.45, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    // 좌: Supabase 쿼리 결과 캡처
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: 2.0, w: 4.4, h: 3.0,
      fill: { color: C.grayBg2 },
      line: { color: C.accent, width: 0.5, dashType: "dash" },
      rectRadius: 0.08
    });
    s.addText("🗄️", {
      x: 0.6, y: 2.2, w: 4.4, h: 0.6,
      fontSize: 30, align: "center", margin: 0
    });
    s.addText("Supabase 쿼리 결과", {
      x: 0.6, y: 2.85, w: 4.4, h: 0.4,
      fontFace: F.body, fontSize: 13, bold: true,
      color: C.text, align: "center", margin: 0
    });
    s.addText("(캡처 자리 — 신청자 명단 테이블)", {
      x: 0.6, y: 3.25, w: 4.4, h: 0.35,
      fontFace: F.body, fontSize: 10, italic: true,
      color: C.muted, align: "center", margin: 0
    });

    // 우: SQL 조건 설명
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 2.0, w: 4.2, h: 3.0,
      fill: { color: C.dark }, line: { type: "none" }, rectRadius: 0.08
    });
    s.addText("예: ② 리마인드 보낼 때", {
      x: 5.4, y: 2.2, w: 3.8, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.accent, charSpacing: 2, margin: 0
    });
    s.addText("WHERE ...", {
      x: 5.4, y: 2.75, w: 3.8, h: 0.4,
      fontFace: "Menlo", fontSize: 14, color: "E5E7EB", margin: 0
    });
    s.addText("  paid_at IS NULL", {
      x: 5.4, y: 3.1, w: 3.8, h: 0.35,
      fontFace: "Menlo", fontSize: 12, color: C.accent, margin: 0
    });
    s.addText("  AND created_at < NOW()", {
      x: 5.4, y: 3.4, w: 3.8, h: 0.35,
      fontFace: "Menlo", fontSize: 12, color: C.accent, margin: 0
    });
    s.addText("  AND user NOT IN (①발송자)", {
      x: 5.4, y: 3.7, w: 3.8, h: 0.35,
      fontFace: "Menlo", fontSize: 12, color: C.accent, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 5.4, y: 4.2, w: 3.6, h: 0,
      line: { color: C.muted, width: 1 }
    });
    s.addText("→ 이 조건을 9번 다 손으로 뽑았어요", {
      x: 5.4, y: 4.35, w: 3.8, h: 0.5,
      fontFace: F.body, fontSize: 12, italic: true,
      color: "E5E7EB", margin: 0
    });
    pageNum(s, 8, TOTAL);
  }

  // ==================== P9. BEFORE / AFTER 하루 3시간 → 5분 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 1, 4, "WHY · 지난한 여정");

    s.addText("그래서 바뀐 건,", {
      x: 0.5, y: 0.9, w: 9, h: 0.6,
      fontFace: F.body, fontSize: 20, color: C.muted, margin: 0
    });

    const boxW = 4.3, boxH = 3.5, gap = 0.4;
    const startX = (10 - (boxW * 2 + gap)) / 2;

    // BEFORE
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: startX, y: 1.7, w: boxW, h: boxH,
      fill: { color: C.grayBg },
      line: { color: C.divider, width: 1 },
      rectRadius: 0.12
    });
    s.addText("BEFORE", {
      x: startX + 0.3, y: 1.9, w: boxW - 0.6, h: 0.35,
      fontFace: F.body, fontSize: 12, bold: true,
      color: C.muted, charSpacing: 4, margin: 0
    });
    s.addText("하루", {
      x: startX + 0.3, y: 2.4, w: boxW - 0.6, h: 0.45,
      fontFace: F.body, fontSize: 18, color: C.text, margin: 0
    });
    s.addText("3시간", {
      x: startX + 0.3, y: 2.85, w: boxW - 0.6, h: 1.3,
      fontFace: F.title, fontSize: 86, bold: true,
      color: C.text, margin: 0
    });
    s.addText("수동 세팅 + 수동 발송", {
      x: startX + 0.3, y: 4.4, w: boxW - 0.6, h: 0.35,
      fontFace: F.body, fontSize: 13, color: C.muted, margin: 0
    });
    s.addText("공유회 1건당 이틀 꼬박", {
      x: startX + 0.3, y: 4.75, w: boxW - 0.6, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    // 화살표
    s.addText("→", {
      x: startX + boxW, y: 1.7, w: gap, h: boxH,
      fontFace: F.title, fontSize: 36, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });

    // AFTER
    const afterX = startX + boxW + gap;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: afterX, y: 1.7, w: boxW, h: boxH,
      fill: { color: C.accent }, line: { type: "none" }, rectRadius: 0.12
    });
    s.addText("AFTER", {
      x: afterX + 0.3, y: 1.9, w: boxW - 0.6, h: 0.35,
      fontFace: F.body, fontSize: 12, bold: true,
      color: C.dark, charSpacing: 4, margin: 0
    });
    s.addText("하루", {
      x: afterX + 0.3, y: 2.4, w: boxW - 0.6, h: 0.45,
      fontFace: F.body, fontSize: 18, color: C.dark, margin: 0
    });
    s.addText("5분", {
      x: afterX + 0.3, y: 2.85, w: boxW - 0.6, h: 1.3,
      fontFace: F.title, fontSize: 86, bold: true,
      color: C.dark, margin: 0
    });
    s.addText("슬랙에서 확인·승인", {
      x: afterX + 0.3, y: 4.4, w: boxW - 0.6, h: 0.35,
      fontFace: F.body, fontSize: 13, bold: true,
      color: C.dark, margin: 0
    });
    s.addText("맥북 꺼도 정시에 나감", {
      x: afterX + 0.3, y: 4.75, w: boxW - 0.6, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.dark, margin: 0
    });

    s.addText("지금부터 이게 어떻게 가능했는지 말씀드릴게요", {
      x: 0.5, y: 5.4, w: 9, h: 0.3,
      fontFace: F.body, fontSize: 13, italic: true,
      color: C.muted, align: "center", margin: 0
    });
    pageNum(s, 9, TOTAL);
  }

  // ==================== P10. "오늘 아침 슬랙엔 이게 와요" ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 1, 4, "WHY · 지난한 여정");

    s.addText("이게 제일 신기한 부분이에요", {
      x: 0.5, y: 0.8, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });
    s.addText("오늘 아침, 제 슬랙엔 이게 와요", {
      x: 0.5, y: 1.5, w: 9, h: 0.4,
      fontFace: F.body, fontSize: 15, italic: true,
      color: C.accent, margin: 0
    });

    // 중앙: 슬랙 모달 실 캡처 자리 (크게)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 2.0, y: 2.1, w: 6.0, h: 2.5,
      fill: { color: C.grayBg2 },
      line: { color: C.accent, width: 1.5, dashType: "dash" },
      rectRadius: 0.1
    });
    s.addText("💬", {
      x: 2.0, y: 2.35, w: 6.0, h: 0.6,
      fontSize: 36, align: "center", margin: 0
    });
    s.addText("슬랙 승인 모달 실제 캡처", {
      x: 2.0, y: 3.0, w: 6.0, h: 0.4,
      fontFace: F.body, fontSize: 14, bold: true,
      color: C.text, align: "center", margin: 0
    });
    s.addText("(카피 · 대상자 수 · 발송 시각 + ✅ 승인 / ❌ 취소 버튼)", {
      x: 2.0, y: 3.45, w: 6.0, h: 0.35,
      fontFace: F.body, fontSize: 11, italic: true,
      color: C.muted, align: "center", margin: 0
    });

    // 하단 한 줄
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.9, w: 9, h: 0.55,
      fill: { color: C.dark }, line: { type: "none" }
    });
    s.addText("AI가 카피 써 놓고 → ✅ 승인만 누르면 정시 발송 · 맥북 꺼도 나감", {
      x: 0.5, y: 4.9, w: 9, h: 0.55,
      fontFace: F.title, fontSize: 13, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });
    pageNum(s, 10, TOTAL);
  }

  // ==================== P11. STEP 1 라벨 + 삽질 ① 맥북 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 2, 4, "STEP 1 · 자동화 구조 짜기");

    s.addText("😰 삽질 ①", {
      x: 0.5, y: 0.9, w: 9, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.accent, charSpacing: 3, margin: 0
    });
    s.addText("Claude Code는 맥북이 켜져 있어야 돎", {
      x: 0.5, y: 1.3, w: 9, h: 0.8,
      fontFace: F.title, fontSize: 30, bold: true,
      color: C.text, margin: 0
    });

    // 상황
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 2.5, w: 4.3, h: 2.6,
      fill: { color: C.grayBg }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("상황", {
      x: 0.7, y: 2.7, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText("퇴근하면 맥북 닫음", {
      x: 0.7, y: 3.1, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 16, bold: true,
      color: C.text, margin: 0
    });
    s.addText("→ Claude Code 멈춤", {
      x: 0.7, y: 3.55, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 16, bold: true,
      color: C.text, margin: 0
    });
    s.addText("→ 저녁 7시 예정 발송 못 나감 📵", {
      x: 0.7, y: 4.0, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 16, bold: true,
      color: C.text, margin: 0
    });

    // 깨달음
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 2.5, w: 4.3, h: 2.6,
      fill: { color: C.accent }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("💡 그래서", {
      x: 5.4, y: 2.7, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.dark, charSpacing: 2, margin: 0
    });
    s.addText("서버에서 혼자 도는", {
      x: 5.4, y: 3.15, w: 4, h: 0.5,
      fontFace: F.title, fontSize: 20, bold: true,
      color: C.text, margin: 0
    });
    s.addText("도구가 필요했어요", {
      x: 5.4, y: 3.65, w: 4, h: 0.5,
      fontFace: F.title, fontSize: 20, bold: true,
      color: C.text, margin: 0
    });
    s.addText("→ n8n 등장", {
      x: 5.4, y: 4.3, w: 4, h: 0.4,
      fontFace: F.body, fontSize: 13, italic: true,
      color: C.dark, margin: 0
    });
    pageNum(s, 11, TOTAL);
  }

  // ==================== P12. 삽질 ② 완전 자동 무서움 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 2, 4, "STEP 1 · 자동화 구조 짜기");

    s.addText("😰 삽질 ②", {
      x: 0.5, y: 0.9, w: 9, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.accent, charSpacing: 3, margin: 0
    });
    s.addText("완전 자동 발송은 무서웠어요", {
      x: 0.5, y: 1.3, w: 9, h: 0.8,
      fontFace: F.title, fontSize: 30, bold: true,
      color: C.text, margin: 0
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 2.5, w: 4.3, h: 2.6,
      fill: { color: C.grayBg }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("상황", {
      x: 0.7, y: 2.7, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText("크론으로 시간 맞춰 자동?", {
      x: 0.7, y: 3.1, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 16, bold: true,
      color: C.text, margin: 0
    });
    s.addText("🚨 카피 오타 1번 → 6,800명 민원", {
      x: 0.7, y: 3.8, w: 4, h: 0.45,
      fontFace: F.body, fontSize: 13, bold: true,
      color: C.text, margin: 0
    });
    s.addText("🚨 줌링크 틀리면 라이브 말림", {
      x: 0.7, y: 4.25, w: 4, h: 0.45,
      fontFace: F.body, fontSize: 13, bold: true,
      color: C.text, margin: 0
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 2.5, w: 4.3, h: 2.6,
      fill: { color: C.accent }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("💡 그래서", {
      x: 5.4, y: 2.7, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.dark, charSpacing: 2, margin: 0
    });
    s.addText("보내기 전엔", {
      x: 5.4, y: 3.15, w: 4, h: 0.5,
      fontFace: F.title, fontSize: 20, bold: true,
      color: C.text, margin: 0
    });
    s.addText("사람이 한 번 봐야 해요", {
      x: 5.4, y: 3.65, w: 4, h: 0.5,
      fontFace: F.title, fontSize: 20, bold: true,
      color: C.text, margin: 0
    });
    s.addText("→ Slack 승인 모달 등장", {
      x: 5.4, y: 4.3, w: 4, h: 0.4,
      fontFace: F.body, fontSize: 13, italic: true,
      color: C.dark, margin: 0
    });
    pageNum(s, 12, TOTAL);
  }

  // ==================== P13. 3 도구 역할 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 2, 4, "STEP 1 · 자동화 구조 짜기");

    s.addText("그래서 셋을 조합했어요", {
      x: 0.5, y: 0.9, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });
    s.addText("하나로는 안 돼서, 각자 역할만 하게 했어요", {
      x: 0.5, y: 1.6, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    const tools = [
      { emoji: "🤖", name: "n8n", role: "스케줄 + 서버 실행", sub: "맥북 꺼도 돎", ans: "← 삽질 ① 해결" },
      { emoji: "🗄️", name: "Supabase", role: "대상자 DB", sub: "신청자·미신청자 자동 조회", ans: "(데이터 역할)" },
      { emoji: "💬", name: "Slack", role: "사람 승인 관문", sub: "승인 전엔 발송 안 됨", ans: "← 삽질 ② 해결" },
    ];
    const cW = 2.9, cH = 3.0, gap = 0.15;
    const startX = (10 - (cW * 3 + gap * 2)) / 2;
    tools.forEach((t, i) => {
      const x = startX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.2, w: cW, h: cH,
        fill: { color: C.bg },
        line: { color: C.accent, width: 1.5 }, rectRadius: 0.12
      });
      s.addText(t.emoji, {
        x, y: 2.4, w: cW, h: 0.55,
        fontSize: 30, align: "center", margin: 0
      });
      s.addText(t.name, {
        x: x + 0.2, y: 3.0, w: cW - 0.4, h: 0.4,
        fontFace: F.title, fontSize: 20, bold: true,
        color: C.text, align: "center", margin: 0
      });
      s.addText(t.role, {
        x: x + 0.2, y: 3.5, w: cW - 0.4, h: 0.35,
        fontFace: F.body, fontSize: 12, bold: true,
        color: C.accent, align: "center", charSpacing: 1, margin: 0
      });
      s.addShape(pres.shapes.LINE, {
        x: x + cW / 2 - 0.2, y: 3.9, w: 0.4, h: 0,
        line: { color: C.accent, width: 1.5 }
      });
      s.addText(t.sub, {
        x: x + 0.2, y: 4.05, w: cW - 0.4, h: 0.5,
        fontFace: F.body, fontSize: 11, color: C.text,
        align: "center", margin: 0
      });
      s.addText(t.ans, {
        x: x + 0.2, y: 4.7, w: cW - 0.4, h: 0.35,
        fontFace: F.body, fontSize: 10, italic: true,
        color: C.muted, align: "center", margin: 0
      });
    });
    pageNum(s, 13, TOTAL);
  }

  // ==================== P14. 전체 플로우 구조도 + 실물 캡처 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 2, 4, "STEP 1 · 자동화 구조 짜기");

    s.addText("지금 돌아가는 전체 모습", {
      x: 0.5, y: 0.9, w: 9, h: 0.65,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });

    // 상단 5단계 플로우
    const flow = [
      { icon: "⏰", label: "n8n" },
      { icon: "🗄️", label: "Supabase" },
      { icon: "✍️", label: "AI 카피" },
      { icon: "💬", label: "Slack 승인" },
      { icon: "📤", label: "SOLAPI" },
    ];
    const sW = 1.65, sH = 1.0, sGap = 0.15;
    const totalW = sW * 5 + sGap * 4;
    const sX = (10 - totalW) / 2;
    flow.forEach((st, i) => {
      const x = sX + i * (sW + sGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.8, w: sW, h: sH,
        fill: { color: C.accentPale },
        line: { color: C.accent, width: 1 }, rectRadius: 0.08
      });
      s.addText(st.icon, {
        x, y: 1.9, w: sW, h: 0.55,
        fontSize: 22, align: "center", margin: 0
      });
      s.addText(st.label, {
        x: x + 0.1, y: 2.4, w: sW - 0.2, h: 0.3,
        fontFace: F.body, fontSize: 11, bold: true,
        color: C.text, align: "center", margin: 0
      });
      if (i < flow.length - 1) {
        s.addText("→", {
          x: x + sW, y: 1.8, w: sGap, h: sH,
          fontFace: F.title, fontSize: 14, bold: true,
          color: C.accent, align: "center", valign: "middle", margin: 0
        });
      }
    });

    // 하단 실 캡처 2개
    const capW = 4.3, capH = 2.0, capGap = 0.4;
    const capX = (10 - (capW * 2 + capGap)) / 2;
    [
      { x: capX, icon: "🗄️", t: "Supabase 테이블 캡처", s: "(발송 대상자 DB)" },
      { x: capX + capW + capGap, icon: "🤖", t: "n8n 워크플로우 캡처", s: "(전체 자동화 플로우)" },
    ].forEach(c => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: c.x, y: 3.15, w: capW, h: capH,
        fill: { color: C.grayBg2 },
        line: { color: C.accent, width: 0.5, dashType: "dash" },
        rectRadius: 0.08
      });
      s.addText(c.icon, {
        x: c.x, y: 3.3, w: capW, h: 0.6,
        fontSize: 28, align: "center", margin: 0
      });
      s.addText(c.t, {
        x: c.x, y: 3.95, w: capW, h: 0.4,
        fontFace: F.body, fontSize: 12, bold: true,
        color: C.text, align: "center", margin: 0
      });
      s.addText(c.s, {
        x: c.x, y: 4.35, w: capW, h: 0.35,
        fontFace: F.body, fontSize: 10, italic: true,
        color: C.muted, align: "center", margin: 0
      });
    });

    s.addText("자고 있어도 돌고, 보내기 전엔 사람이 한 번 확인", {
      x: 0.5, y: 5.3, w: 9, h: 0.3,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.accent, align: "center", margin: 0
    });
    pageNum(s, 14, TOTAL);
  }

  // ==================== P15. 규칙 많음 + CLAUDE.md 353줄 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("근데 또 다른 문제가 생겼어요", {
      x: 0.5, y: 0.9, w: 9, h: 0.6,
      fontFace: F.body, fontSize: 16, color: C.muted, margin: 0
    });
    s.addText("규칙이 너무 많더라고요", {
      x: 0.5, y: 1.45, w: 9, h: 0.8,
      fontFace: F.title, fontSize: 32, bold: true,
      color: C.text, margin: 0
    });

    // 좌: 규칙 8개
    const rules = [
      "🎨 카피 톤·금지어·길이",
      "🔗 UTM 파라미터 21개",
      "📱 템플릿 9종 구조",
      "⏰ 각 템플릿 발송 시간",
      "👥 대상자 조건",
      "💰 가격 표기 규칙",
      "🎁 혜택 카피 포맷",
      "📋 공유회별 맞춤 변수",
    ];
    rules.forEach((r, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * 2.75;
      const y = 2.6 + row * 0.42;
      s.addText(r, {
        x, y, w: 2.7, h: 0.35,
        fontFace: F.body, fontSize: 12, color: C.text,
        margin: 0, valign: "middle"
      });
    });

    // 우: CLAUDE.md 큰 덩어리
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.2, y: 2.4, w: 3.3, h: 2.7,
      fill: { color: C.grayBg2 },
      line: { color: C.divider, width: 1 }, rectRadius: 0.08
    });
    s.addText("CLAUDE.md", {
      x: 6.2, y: 2.55, w: 3.3, h: 0.35,
      fontFace: "Menlo", fontSize: 11, bold: true,
      color: C.muted, align: "center", margin: 0
    });
    for (let i = 0; i < 8; i++) {
      const lineW = 2.6 - (i % 3) * 0.3;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.4, y: 3.05 + i * 0.16, w: lineW, h: 0.04,
        fill: { color: "CBD5E1" }, line: { type: "none" }
      });
    }
    s.addText("353줄", {
      x: 6.2, y: 4.5, w: 3.3, h: 0.45,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.accent, align: "center", margin: 0
    });

    s.addText("이걸 한 파일에 다 박았어요", {
      x: 0.5, y: 5.3, w: 9, h: 0.3,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, align: "center", margin: 0
    });
    pageNum(s, 15, TOTAL);
  }

  // ==================== P16. AI가 또 틀림 + 맥북 2개 기억 사고 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("아니나 다를까,", {
      x: 0.5, y: 0.9, w: 9, h: 0.55,
      fontFace: F.body, fontSize: 18, italic: true, color: C.muted, margin: 0
    });
    s.addText("기억도 안 되고, 규칙도 안 읽혀요", {
      x: 0.5, y: 1.45, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });

    // 좌: AI 또 틀림
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 2.5, w: 4.3, h: 2.6,
      fill: { color: C.grayBg }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("😩 규칙이 안 읽혀요", {
      x: 0.7, y: 2.7, w: 4, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText("\"어제 말한 가격 표기 규칙,", {
      x: 0.7, y: 3.2, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 15, italic: true,
      color: C.text, margin: 0
    });
    s.addText("왜 또 틀려?\"", {
      x: 0.7, y: 3.65, w: 4, h: 0.45,
      fontFace: F.title, fontSize: 15, italic: true,
      color: C.text, margin: 0
    });
    s.addText("→ AI가 또 까먹음", {
      x: 0.7, y: 4.35, w: 4, h: 0.4,
      fontFace: F.body, fontSize: 12, bold: true,
      color: C.text, margin: 0
    });

    // 우: 맥북 2개 기억 사고
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 2.5, w: 4.3, h: 2.6,
      fill: { color: C.grayBg }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("💻 맥북 2개 기억 사고", {
      x: 5.4, y: 2.7, w: 4, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText("내일 당장 이거 해야 해서", {
      x: 5.4, y: 3.2, w: 4, h: 0.45,
      fontFace: F.body, fontSize: 14, color: C.text, margin: 0
    });
    s.addText("다른 맥북 켰더니...", {
      x: 5.4, y: 3.6, w: 4, h: 0.45,
      fontFace: F.body, fontSize: 14, color: C.text, margin: 0
    });
    s.addText("일주일 전 기억이 마지막 😱", {
      x: 5.4, y: 4.25, w: 4, h: 0.5,
      fontFace: F.title, fontSize: 16, bold: true,
      color: C.accent, margin: 0
    });
    pageNum(s, 16, TOTAL);
  }

  // ==================== P17. 하네스 언뜻 듣고 — 클로드한테 질문 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("그러다 '하네스'라는 걸 들었어요", {
      x: 0.5, y: 0.9, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });
    s.addText("AAA팀 안에서 언뜻 듣고 → 클로드한테 질문해봤어요", {
      x: 0.5, y: 1.6, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    // 중앙: 큰 말풍선
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.2, y: 2.3, w: 7.6, h: 2.6,
      fill: { color: C.accentPale },
      line: { color: C.accent, width: 1.5 }, rectRadius: 0.15
    });
    s.addText("나 → Claude", {
      x: 1.4, y: 2.45, w: 7.2, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.muted, charSpacing: 3, margin: 0
    });
    const qs = [
      "\"너한테 기억 잘 주려면 뭘 가지고 있어야 해?\"",
      "\"네가 생각하는 하네스는 뭐야?\"",
      "\"내가 이 프로젝트에서 가져가야 할 하네스는 뭐야?\"",
    ];
    qs.forEach((q, i) => {
      s.addText(q, {
        x: 1.4, y: 2.9 + i * 0.6, w: 7.2, h: 0.5,
        fontFace: F.title, fontSize: 16, bold: true,
        color: C.text, margin: 0, valign: "top"
      });
    });

    // 하단
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 5.15, w: 9, h: 0.45,
      fill: { color: C.dark }, line: { type: "none" }
    });
    s.addText("→ 클로드가 3가지를 줬어요", {
      x: 0.5, y: 5.15, w: 9, h: 0.45,
      fontFace: F.title, fontSize: 14, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });
    pageNum(s, 17, TOTAL);
  }

  // ==================== P18. 적용해보니 잘 굴러감 → "알고 보니 하네스였더라" ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("적용해보니 실제로 잘 굴러가더라고요", {
      x: 0.5, y: 0.9, w: 9, h: 0.75,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });

    const items = [
      { icon: "📂", name: "공간", prob: "CLAUDE.md 너무 커서\n쪼갰어요", sol: "에이전트 · PRD · 스킬로 나눔" },
      { icon: "🧠", name: "기억", prob: "맥북 바꿔도 이어지게\n하려고요", sol: "메모리 · 프로젝트 상태 파일" },
      { icon: "🔁", name: "학습", prob: "자꾸 틀리니까 검수를\n붙였어요", sol: "검수 레이어 + 피드백 루프" },
    ];
    const cW = 2.9, cH = 2.9, gap = 0.15;
    const sX = (10 - (cW * 3 + gap * 2)) / 2;
    items.forEach((it, i) => {
      const x = sX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.95, w: cW, h: cH,
        fill: { color: C.accentPale },
        line: { color: C.accent, width: 1 }, rectRadius: 0.12
      });
      s.addText(it.icon, {
        x, y: 2.1, w: cW, h: 0.6,
        fontSize: 30, align: "center", margin: 0
      });
      s.addText(it.name, {
        x: x + 0.2, y: 2.75, w: cW - 0.4, h: 0.45,
        fontFace: F.title, fontSize: 20, bold: true,
        color: C.text, align: "center", margin: 0
      });
      s.addText(it.prob, {
        x: x + 0.2, y: 3.3, w: cW - 0.4, h: 0.9,
        fontFace: F.body, fontSize: 11, italic: true,
        color: C.muted, align: "center", margin: 0, valign: "top"
      });
      s.addShape(pres.shapes.LINE, {
        x: x + cW / 2 - 0.2, y: 4.1, w: 0.4, h: 0,
        line: { color: C.accent, width: 1.5 }
      });
      s.addText(it.sol, {
        x: x + 0.2, y: 4.25, w: cW - 0.4, h: 0.5,
        fontFace: F.body, fontSize: 11, bold: true,
        color: C.text, align: "center", margin: 0
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 5.1, w: 9, h: 0.5,
      fill: { color: C.accent }, line: { type: "none" }
    });
    s.addText("이게 있으니까 잘 돌아가더라 — 알고 보니 이게 '하네스'였더라", {
      x: 0.5, y: 5.1, w: 9, h: 0.5,
      fontFace: F.title, fontSize: 14, bold: true,
      color: C.dark, align: "center", valign: "middle", margin: 0
    });
    pageNum(s, 18, TOTAL);
  }

  // ==================== P19. 유즈케이스 ① — 알림톡 PRD ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("예를 들어 이런 거예요 — 알림톡 PRD", {
      x: 0.5, y: 0.9, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });
    s.addText("제가 매번 말하던 규칙을, 이제 얘가 읽고 씁니다", {
      x: 0.5, y: 1.6, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    // 좌: md 파일 스크린샷 자리
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 2.2, w: 4.4, h: 2.9,
      fill: { color: C.grayBg2 },
      line: { color: C.accent, width: 0.5, dashType: "dash" }, rectRadius: 0.08
    });
    s.addText("📄 prd/01-알림톡.md", {
      x: 0.5, y: 2.4, w: 4.4, h: 0.4,
      fontFace: "Menlo", fontSize: 12, bold: true,
      color: C.text, align: "center", margin: 0
    });
    s.addText("(실제 파일 스크린샷 자리)", {
      x: 0.5, y: 2.85, w: 4.4, h: 0.35,
      fontFace: F.body, fontSize: 10, italic: true,
      color: C.muted, align: "center", margin: 0
    });
    // 파일 라인 목업
    for (let i = 0; i < 10; i++) {
      const lineW = 3.7 - (i % 4) * 0.4;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.85, y: 3.3 + i * 0.15, w: lineW, h: 0.04,
        fill: { color: "CBD5E1" }, line: { type: "none" }
      });
    }

    // 우: 이 안에 있는 것
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.1, y: 2.2, w: 4.4, h: 2.9,
      fill: { color: C.accent }, line: { type: "none" }, rectRadius: 0.08
    });
    s.addText("이 안에 들어있는 것", {
      x: 5.3, y: 2.4, w: 4, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true,
      color: C.dark, charSpacing: 2, margin: 0
    });
    const items = [
      "① 템플릿 9종 구조 + SOLAPI ID",
      "② 발송 시점·시간·대상자 조건",
      "③ 변수 매핑 + 금지어 · 길이 규칙",
    ];
    items.forEach((t, i) => {
      s.addText(t, {
        x: 5.3, y: 2.9 + i * 0.65, w: 4, h: 0.55,
        fontFace: F.title, fontSize: 14, bold: true,
        color: C.text, margin: 0, valign: "top"
      });
    });
    pageNum(s, 19, TOTAL);
  }

  // ==================== P20. 유즈케이스 ② — 에이전트 8개 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("그리고 역할을 나눈 에이전트들", {
      x: 0.5, y: 0.9, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });
    s.addText("에이전트 = 하나의 역할만 맡는 작은 AI 일꾼", {
      x: 0.5, y: 1.6, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    const agents = [
      { name: "director", role: "전체 지휘" },
      { name: "timeline-planner", role: "타임라인 설계" },
      { name: "data-collector", role: "DB 조회 / URL 크롤" },
      { name: "copywriter", role: "카피 쓰는 애" },
      { name: "media-ops", role: "배너 · UTM" },
      { name: "dispatcher", role: "슬랙 전달 · 발송" },
      { name: "verifier", role: "검수하는 애" },
      { name: "code-reviewer", role: "코드 리뷰" },
    ];
    const cW = 2.15, cH = 0.95, gap = 0.12;
    agents.forEach((a, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 0.5 + col * (cW + gap);
      const y = 2.2 + row * (cH + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cW, h: cH,
        fill: { color: C.accentPale },
        line: { color: C.accent, width: 1 }, rectRadius: 0.08
      });
      s.addText(a.name, {
        x: x + 0.15, y: y + 0.12, w: cW - 0.3, h: 0.35,
        fontFace: "Menlo", fontSize: 11, bold: true,
        color: C.text, margin: 0
      });
      s.addText(a.role, {
        x: x + 0.15, y: y + 0.48, w: cW - 0.3, h: 0.4,
        fontFace: F.body, fontSize: 11, italic: true,
        color: C.muted, margin: 0, valign: "top"
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.6, w: 9, h: 0.5,
      fill: { color: C.dark }, line: { type: "none" }
    });
    s.addText("director가 지휘 → 나머지가 각자 담당 → verifier가 마지막에 검수", {
      x: 0.5, y: 4.6, w: 9, h: 0.5,
      fontFace: F.title, fontSize: 13, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });
    pageNum(s, 20, TOTAL);
  }

  // ==================== P21. 유즈케이스 ③ — 촘촘한 CRM이 자동화된 장면 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 3, 4, "STEP 2 · 하네스 엔지니어링");

    s.addText("수동으로 하던 촘촘한 조건들,", {
      x: 0.5, y: 0.9, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 26, bold: true,
      color: C.text, margin: 0
    });
    s.addText("이제 얘가 알아서 DB까지 발라냅니다", {
      x: 0.5, y: 1.6, w: 9, h: 0.4,
      fontFace: F.body, fontSize: 14, italic: true,
      color: C.accent, margin: 0
    });

    // 3단 플로우
    const steps = [
      { num: "01", icon: "📤", tag: "알림톡 ① 발송", body: "오픈알림 전체 멤버에게 나감" },
      { num: "02", icon: "🔍", tag: "data-collector 작동", body: "① 이후 신청자 자동 조회" },
      { num: "03", icon: "✉️", tag: "dispatcher 발송", body: "그 사람들 제외하고 ② 리마인드" },
    ];
    const cW = 2.9, cH = 2.6, gap = 0.15;
    const sX = (10 - (cW * 3 + gap * 2)) / 2;
    steps.forEach((st, i) => {
      const x = sX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.35, w: cW, h: cH,
        fill: { color: i === 1 ? C.accent : C.accentPale },
        line: { type: "none" }, rectRadius: 0.1
      });
      s.addText(st.num, {
        x: x + 0.2, y: 2.5, w: 0.6, h: 0.3,
        fontFace: F.body, fontSize: 10, bold: true,
        color: C.dark, charSpacing: 3, margin: 0
      });
      s.addText(st.icon, {
        x: x + cW - 0.7, y: 2.5, w: 0.5, h: 0.5,
        fontSize: 22, align: "center", margin: 0
      });
      s.addText(st.tag, {
        x: x + 0.2, y: 3.0, w: cW - 0.4, h: 0.4,
        fontFace: F.title, fontSize: 14, bold: true,
        color: C.text, margin: 0
      });
      s.addText(st.body, {
        x: x + 0.2, y: 3.5, w: cW - 0.4, h: 1.4,
        fontFace: F.body, fontSize: 12, color: C.text,
        margin: 0, valign: "top"
      });
      if (i < steps.length - 1) {
        s.addText("→", {
          x: x + cW, y: 2.35, w: gap, h: cH,
          fontFace: F.title, fontSize: 18, bold: true,
          color: C.dark, align: "center", valign: "middle", margin: 0
        });
      }
    });

    s.addText("예전엔 제가 SQL 짜서 엑셀로 뽑던 일이에요", {
      x: 0.5, y: 5.2, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, align: "center", margin: 0
    });
    pageNum(s, 21, TOTAL);
  }

  // ==================== P22. 임팩트 — 정량 + 정성 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 4, 4, "IMPACT · 팀 · 배운 것");

    s.addText("그래서 바뀐 것들", {
      x: 0.5, y: 0.9, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });

    // 좌: 정량 숫자 3개
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 1.9, w: 4.3, h: 3.2,
      fill: { color: C.dark }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("정량", {
      x: 0.7, y: 2.05, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.accent, charSpacing: 3, margin: 0
    });
    const nums = [
      { big: "3시간 → 5분", sub: "하루 발송 세팅" },
      { big: "이틀 → 1시간", sub: "공유회 1건 전체 세팅" },
      { big: "오타·링크 리스크", sub: "검수단계로 차단" },
    ];
    nums.forEach((n, i) => {
      const y = 2.5 + i * 0.85;
      s.addText(n.big, {
        x: 0.7, y, w: 4, h: 0.45,
        fontFace: F.title, fontSize: 18, bold: true,
        color: C.accent, margin: 0
      });
      s.addText(n.sub, {
        x: 0.7, y: y + 0.45, w: 4, h: 0.35,
        fontFace: F.body, fontSize: 11, italic: true,
        color: "CBD5E1", margin: 0
      });
    });

    // 우: 정성 3문장
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 1.9, w: 4.3, h: 3.2,
      fill: { color: C.accentPale }, line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("정성", {
      x: 5.4, y: 2.05, w: 4, h: 0.35,
      fontFace: F.body, fontSize: 10, bold: true,
      color: C.dark, charSpacing: 3, margin: 0
    });
    const qualities = [
      "\"퇴근 직전 카피 쓰다 질려있었는데,\n이젠 퇴근해요\"",
      "\"맥북 닫아도 정시에 나가요\"",
      "\"본질(개인화·품질)에 시간 쓸 수 있어요\"",
    ];
    qualities.forEach((q, i) => {
      s.addText(q, {
        x: 5.4, y: 2.5 + i * 0.85, w: 4, h: 0.8,
        fontFace: F.body, fontSize: 12, italic: true,
        color: C.text, margin: 0, valign: "top", paraSpaceAfter: 2
      });
    });
    pageNum(s, 22, TOTAL);
  }

  // ==================== P23. 혼자였으면 못 했을 것 — 구체 케이스 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 4, 4, "IMPACT · 팀 · 배운 것");

    s.addText("이거, 혼자였으면 못 만들었어요", {
      x: 0.5, y: 0.9, w: 9, h: 0.75,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });
    s.addText("팀이었어서 뾰족하게 유익했던 지점들", {
      x: 0.5, y: 1.65, w: 9, h: 0.35,
      fontFace: F.body, fontSize: 12, italic: true,
      color: C.muted, margin: 0
    });

    const cases = [
      {
        who: "비비안 ↔ 에밀리",
        what: "비비안이 전체 대시보드를 만들고 있어서, 내 CRM이 어디 들어가는지 감 잡힘. 같이 논의하면서 구조가 나아짐"
      },
      {
        who: "다니 → 에밀리",
        what: "마케팅 OS(CLAUDE.md를 규칙 책으로) 개념 차용 — 내 알림톡 PRD에 그대로 적용"
      },
      {
        who: "피드백 루프",
        what: "code-reviewer 에이전트는 AAA 과제에서 하네스 공유하다가 '검수 필요하네' 깨닫고 만듦"
      },
      {
        who: "타 크루 프로덕트",
        what: "흐민의 질문하는 AI, 오웬의 찜마켓 보면서 내 활용 범위가 넓어짐"
      },
    ];
    const cW = 4.3, cH = 1.25, gap = 0.15;
    cases.forEach((c, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * (cW + gap);
      const y = 2.2 + row * (cH + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cW, h: cH,
        fill: { color: C.accentPale },
        line: { color: C.accent, width: 1 }, rectRadius: 0.08
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 0.08, h: cH,
        fill: { color: C.accent }, line: { type: "none" }
      });
      s.addText(c.who, {
        x: x + 0.25, y: y + 0.1, w: cW - 0.4, h: 0.35,
        fontFace: F.title, fontSize: 13, bold: true,
        color: C.text, margin: 0
      });
      s.addText(c.what, {
        x: x + 0.25, y: y + 0.45, w: cW - 0.4, h: 0.75,
        fontFace: F.body, fontSize: 11, color: C.text,
        margin: 0, valign: "top", paraSpaceAfter: 2
      });
    });
    pageNum(s, 23, TOTAL);
  }

  // ==================== P24. 스폰지클럽 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    sectionLabel(pres, s, 4, 4, "IMPACT · 팀 · 배운 것");

    s.addText("그래서 스폰지클럽,", {
      x: 0.5, y: 1.2, w: 9, h: 0.6,
      fontFace: F.body, fontSize: 20, color: C.muted, margin: 0
    });
    s.addText("같이 이기적공유하며 성장합니다", {
      x: 0.5, y: 1.85, w: 9, h: 0.85,
      fontFace: F.title, fontSize: 36, bold: true,
      color: C.text, margin: 0
    });

    s.addShape(pres.shapes.LINE, {
      x: 0.5, y: 3.0, w: 1.2, h: 0,
      line: { color: C.accent, width: 2 }
    });

    s.addText("스폰지처럼 빨아들이고 → 내 것으로 내보내고", {
      x: 0.5, y: 3.2, w: 9, h: 0.5,
      fontFace: F.title, fontSize: 20, bold: true,
      color: C.text, margin: 0
    });
    s.addText("→ 그걸 또 누군가가 빨아들이고", {
      x: 0.5, y: 3.7, w: 9, h: 0.5,
      fontFace: F.title, fontSize: 20, bold: true,
      color: C.text, margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.55, w: 9, h: 0.55,
      fill: { color: C.accent }, line: { type: "none" }
    });
    s.addText("그게 셀피쉬클럽이 되게 하려는 바예요", {
      x: 0.5, y: 4.55, w: 9, h: 0.55,
      fontFace: F.title, fontSize: 15, bold: true,
      color: C.dark, align: "center", valign: "middle", margin: 0
    });
    pageNum(s, 24, TOTAL);
  }

  // ==================== P25. 여러분은 이렇게 + 감사 ====================
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };

    s.addText("여러분은 이렇게 해보세요", {
      x: 0.5, y: 0.7, w: 9, h: 0.7,
      fontFace: F.title, fontSize: 28, bold: true,
      color: C.text, margin: 0
    });

    const acts = [
      { num: "①", text: "내 반복 업무 쪼개서 AI한테 상황 설명부터 해보세요" },
      { num: "②", text: "완전 자동 대신 승인 단계 하나 두세요" },
      { num: "③", text: "내 규칙을 한 파일에 모으고, 커지면 쪼개세요" },
    ];
    acts.forEach((a, i) => {
      const y = 1.75 + i * 0.85;
      s.addShape(pres.shapes.OVAL, {
        x: 0.6, y, w: 0.55, h: 0.55,
        fill: { color: C.accent }, line: { type: "none" }
      });
      s.addText(a.num, {
        x: 0.6, y, w: 0.55, h: 0.55,
        fontFace: F.title, fontSize: 18, bold: true,
        color: C.dark, align: "center", valign: "middle", margin: 0
      });
      s.addText(a.text, {
        x: 1.4, y: y + 0.02, w: 8, h: 0.55,
        fontFace: F.title, fontSize: 17, bold: true,
        color: C.text, valign: "middle", margin: 0
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 4.6, w: 10, h: 1.0,
      fill: { color: C.dark }, line: { type: "none" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 4.6, w: 10, h: 0.08,
      fill: { color: C.accent }, line: { type: "none" }
    });
    s.addText("감사합니다 · Q&A 환영해요", {
      x: 0, y: 4.7, w: 10, h: 0.9,
      fontFace: F.title, fontSize: 22, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0
    });
  }

  // ============ 저장 ============
  const outPath = "../에밀리-AAA-공유회-20260428.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log(`✅ ${outPath} (${TOTAL}장) 생성 완료`);
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
