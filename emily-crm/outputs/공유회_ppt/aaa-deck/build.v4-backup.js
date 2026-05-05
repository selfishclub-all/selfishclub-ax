/**
 * 에밀리 AAA 공유회 발표 PPT — v4 (19장)
 * - STEP 2개 구조 (자동화 구조 + 하네스 엔지니어링)
 * - 기획 삽질 2가지 강조 → 자동화 구조로 자연 연결
 * - 하네스 마지막 슬라이드 = "구조화 한눈에" 시각화
 * - Supabase / n8n 대시보드 캡처 placeholder 확보
 */
const pptxgen = require("pptxgenjs");

const COLORS = {
  bg: "FFFFFF",
  text: "0F0F0F",
  textMuted: "6B6B6B",
  accent: "F4C71C",       // 셀피쉬 노랑
  accentLight: "FEF8D2",  // 연한 노랑 배경
  accentPale: "FDF2A3",   // 중간 노랑
  divider: "E5E5E5",
  dark: "0F0F0F",         // 검정
};
const FONTS = { title: "Pretendard", body: "Pretendard" };

function addStepHeader(pres, s, stepNum, totalSteps, stepTitle) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.4,
    fill: { color: COLORS.accentLight }, line: { type: "none" }
  });
  s.addText(`STEP ${stepNum} / ${totalSteps}`, {
    x: 0.5, y: 0, w: 1.8, h: 0.4,
    fontFace: FONTS.body, fontSize: 11, bold: true,
    color: COLORS.accent, charSpacing: 3,
    valign: "middle", margin: 0
  });
  s.addText(stepTitle, {
    x: 2.3, y: 0, w: 5.7, h: 0.4,
    fontFace: FONTS.body, fontSize: 11, bold: true,
    color: COLORS.text, valign: "middle", margin: 0
  });
  const barX = 8.3, barY = 0.18, barW = 1.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: barX, y: barY, w: barW, h: 0.05,
    fill: { color: COLORS.divider }, line: { type: "none" }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: barX, y: barY, w: barW * stepNum / totalSteps, h: 0.05,
    fill: { color: COLORS.accent }, line: { type: "none" }
  });
}

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "에밀리 · 셀피쉬클럽";
  pres.title = "매일 아침, AI가 알림톡을 들고 옵니다";

  // ==================== 01: 타이틀 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.dark };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 0.5, w: 0.08, h: 0.4,
      fill: { color: COLORS.accent }, line: { type: "none" }
    });
    s.addText("Selfish Club AX PROJECT · AAA", {
      x: 0.7, y: 0.5, w: 8, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, color: "CBD5E1", charSpacing: 3
    });
    s.addText("매일 아침,", {
      x: 0.5, y: 1.7, w: 9, h: 0.9,
      fontFace: FONTS.title, fontSize: 52, bold: true,
      color: "FFFFFF", margin: 0
    });
    s.addText("AI가 알림톡을 들고 옵니다", {
      x: 0.5, y: 2.5, w: 9, h: 0.9,
      fontFace: FONTS.title, fontSize: 52, bold: true,
      color: "FFFFFF", margin: 0
    });
    s.addText("\"오늘 이 카피로 오후 3시에 보낼까요?\"", {
      x: 0.5, y: 3.6, w: 9, h: 0.6,
      fontFace: FONTS.body, fontSize: 22, italic: true,
      color: "FFFFFF", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.5, y: 4.6, w: 1.5, h: 0,
      line: { color: COLORS.accent, width: 2 }
    });
    s.addText("에밀리 · CRM 자동화 6주", {
      x: 0.5, y: 4.7, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, color: "CBD5E1", margin: 0
    });
  }

  // ==================== 02: 자기소개 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText("안녕하세요,", {
      x: 0.7, y: 0.9, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, color: COLORS.textMuted, margin: 0
    });
    s.addText("에밀리입니다", {
      x: 0.7, y: 1.45, w: 9, h: 1.0,
      fontFace: FONTS.title, fontSize: 56, bold: true,
      color: COLORS.text, margin: 0
    });
    const cardW = 4.1, cardH = 1.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.7, y: 3.1, w: cardW, h: cardH,
      fill: { color: COLORS.accentLight }, line: { type: "none" },
      rectRadius: 0.1
    });
    s.addText("부캐 · AAA 크루", {
      x: 0.9, y: 3.25, w: cardW - 0.4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    s.addText("에밀리", {
      x: 0.9, y: 3.65, w: cardW - 0.4, h: 0.55,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("이기적멤버십 AAA팀\n6주간 Claude Code로 업무 에이전트 만드는 크루", {
      x: 0.9, y: 4.2, w: cardW - 0.4, h: 0.7,
      fontFace: FONTS.body, fontSize: 12, color: COLORS.textMuted,
      margin: 0, valign: "top", paraSpaceAfter: 2
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 3.1, w: cardW, h: cardH,
      fill: { color: COLORS.accent }, line: { type: "none" },
      rectRadius: 0.1
    });
    s.addText("본업", {
      x: 5.4, y: 3.25, w: cardW - 0.4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: "FEF8D2", charSpacing: 2, margin: 0
    });
    s.addText("셀피쉬클럽 CRM PM", {
      x: 5.4, y: 3.65, w: cardW - 0.4, h: 0.55,
      fontFace: FONTS.title, fontSize: 24, bold: true,
      color: "FFFFFF", margin: 0
    });
    s.addText("이기적멤버십 6,800+ 회원 대상\n공유회·이벤트 CRM 전 채널 기획·운영", {
      x: 5.4, y: 4.2, w: cardW - 0.4, h: 0.7,
      fontFace: FONTS.body, fontSize: 12, color: "FEF8D2",
      margin: 0, valign: "top", paraSpaceAfter: 2
    });
  }

  // ==================== 2-A: AAA 참여 이유 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("왜 AAA에 참여했냐면요", {
      x: 0.5, y: 0.8, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 30, bold: true,
      color: COLORS.text, margin: 0
    });

    // 좌측: 업무 상황
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 1.8, w: 4.3, h: 3.4,
      fill: { color: "F8F8F8" },
      line: { color: COLORS.divider, width: 1 },
      rectRadius: 0.1
    });
    s.addText("지금 제 상황", {
      x: 0.7, y: 2.0, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.textMuted, charSpacing: 3, margin: 0
    });
    const situations = [
      "공유회 월 4~6번 반복 운영",
      "알림톡 9종 · 카플친 · 오카방 등\n전 채널 CRM 혼자 담당",
      "매일 퇴근 시간에 발송 세팅\n→ 본질(개인화·품질)에 집중 못 함",
    ];
    situations.forEach((t, i) => {
      const y = 2.5 + i * 0.9;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.7, y: y + 0.08, w: 0.06, h: 0.3,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(t, {
        x: 0.85, y, w: 3.9, h: 0.8,
        fontFace: FONTS.body, fontSize: 12,
        color: COLORS.text, margin: 0, valign: "top", paraSpaceAfter: 2
      });
    });

    // 우측: 동기
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 1.8, w: 4.3, h: 3.4,
      fill: { color: COLORS.accentLight },
      line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("그래서 결심했어요", {
      x: 5.4, y: 2.0, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 3, margin: 0
    });
    s.addText("반복 업무를 AI에게 넘기고", {
      x: 5.4, y: 2.5, w: 4, h: 0.5,
      fontFace: FONTS.title, fontSize: 18, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("진짜 해야 할 일에 집중하자", {
      x: 5.4, y: 3.0, w: 4, h: 0.5,
      fontFace: FONTS.title, fontSize: 18, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 5.4, y: 3.7, w: 0.5, h: 0,
      line: { color: COLORS.accent, width: 2 }
    });
    s.addText("혼자 시도해봤지만 한계가 있어서,\n크루와 같이 하는 AAA팀에 합류했습니다.", {
      x: 5.4, y: 3.85, w: 4, h: 1.1,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.text, margin: 0, valign: "top", paraSpaceAfter: 2
    });
  }

  // ==================== 2-B: AAA 크루 8명 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("AAA팀 — 8명의 크루", {
      x: 0.5, y: 0.7, w: 9, h: 0.65,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("각자 다른 일 · 같은 고민 — 내 업무에 AI 진짜로 적용하기", {
      x: 0.5, y: 1.35, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.textMuted, margin: 0
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
        fill: { color: isMe ? COLORS.accent : "F8F8F8" },
        line: { color: isMe ? COLORS.accent : COLORS.divider, width: 1 },
        rectRadius: 0.08
      });
      s.addText(c.name, {
        x: x + 0.2, y: y + 0.1, w: cW - 0.4, h: 0.3,
        fontFace: FONTS.body, fontSize: 13, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(c.role, {
        x: x + 0.2, y: y + 0.42, w: cW - 0.4, h: 0.4,
        fontFace: FONTS.body, fontSize: 10, italic: true,
        color: isMe ? COLORS.text : COLORS.textMuted, margin: 0, valign: "top"
      });
    });

    s.addText("6주 동안 Claude Code로 각자 자기 업무에 AI 에이전트를 만들었어요", {
      x: 0.5, y: 5.2, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 03: 어떤 메시지 받고 오셨나요 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText("여러분은 어떤 메시지를 받고", {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("이 공유회에 오셨나요?", {
      x: 0.5, y: 1.1, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.accent, margin: 0
    });
    const channels = [
      { label: "카카오 알림톡", icon: "📱" },
      { label: "카플친 배너", icon: "📲" },
      { label: "오픈채팅 공지", icon: "💬" },
      { label: "인스타 캐러셀", icon: "📸" }
    ];
    const slotW = 1.9, slotH = 2.4, gap = 0.2;
    const totalW = slotW * 4 + gap * 3;
    const startX = (10 - totalW) / 2;
    channels.forEach((c, i) => {
      const x = startX + i * (slotW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.1, w: slotW, h: slotH,
        fill: { color: COLORS.accentLight },
        line: { color: COLORS.accent, width: 1 },
        rectRadius: 0.1
      });
      s.addText(c.icon, {
        x, y: 2.35, w: slotW, h: 0.8,
        fontSize: 36, align: "center", margin: 0
      });
      s.addText("캡처\n여기에", {
        x, y: 3.15, w: slotW, h: 0.6,
        fontFace: FONTS.body, fontSize: 11, italic: true,
        color: COLORS.textMuted, align: "center", margin: 0
      });
      s.addText(c.label, {
        x, y: 4.0, w: slotW, h: 0.4,
        fontFace: FONTS.body, fontSize: 13, bold: true,
        color: COLORS.text, align: "center", margin: 0
      });
    });
    s.addText("이게 저희 셀피쉬클럽의 CRM 채널들이에요", {
      x: 0.5, y: 4.85, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 14,
      color: COLORS.text, align: "center", margin: 0
    });
    s.addText("공유회·이벤트가 열릴 때마다, 이 채널들에 다 뿌려야 해요", {
      x: 0.5, y: 5.22, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
  }

  // ==================== 04: 공유회 1건 = 많은 채널 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText("공유회 하나 열리면,", {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("이 많은 채널에 전부 다 나가야 해요", {
      x: 0.5, y: 1.1, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 26, bold: true,
      color: COLORS.accent, margin: 0
    });
    const tiles = [
      { icon: "📱", name: "알림톡", sub: "9종" },
      { icon: "📲", name: "카플친 배너", sub: "3종" },
      { icon: "💬", name: "오픈채팅", sub: "3방 × 3회" },
      { icon: "📋", name: "온드미디어", sub: "4종" },
      { icon: "📸", name: "인스타 캐러셀", sub: "5장" },
      { icon: "🔗", name: "UTM 추적", sub: "21개" },
    ];
    const tW = 2.9, tH = 1.0, tGap = 0.15;
    const gridStartX = 0.55;
    const gridStartY = 2.2;
    tiles.forEach((t, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = gridStartX + col * (tW + tGap);
      const y = gridStartY + row * (tH + tGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: tW, h: tH,
        fill: { color: "F8FAFC" },
        line: { color: COLORS.divider, width: 1 },
        rectRadius: 0.08
      });
      s.addText(t.icon, {
        x: x + 0.2, y, w: 0.7, h: tH,
        fontSize: 22, valign: "middle", align: "left", margin: 0
      });
      s.addText(t.name, {
        x: x + 0.95, y: y + 0.15, w: tW - 1.1, h: 0.35,
        fontFace: FONTS.body, fontSize: 13, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(t.sub, {
        x: x + 0.95, y: y + 0.52, w: tW - 1.1, h: 0.3,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.accent, margin: 0
      });
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.65, w: 9, h: 0.85,
      fill: { color: COLORS.accent }, line: { type: "none" }
    });
    s.addText("리소스가 너무 많이 들었어요 → 전체 자동화하기로 결정", {
      x: 0.5, y: 4.65, w: 9, h: 0.85,
      fontFace: FONTS.title, fontSize: 16, bold: true,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
  }

  // ==================== 05: 알림톡부터 (이유) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText("근데 한 번에 다 못 하니까,", {
      x: 0.5, y: 0.5, w: 9, h: 0.5,
      fontFace: FONTS.body, fontSize: 16, color: COLORS.textMuted, margin: 0
    });
    s.addText("\"알림톡\"부터 시작했어요", {
      x: 0.5, y: 1.0, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("WHY ALIMTALK", {
      x: 0.5, y: 2.1, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.textMuted, charSpacing: 3, margin: 0
    });
    const reasons = [
      { icon: "👥", main: "우리 핵심 도달 채널", sub: "멤버 6,800명 · 도달률 95%+" },
      { icon: "📱", main: "템플릿이 이미 준비돼 있었음", sub: "SOLAPI 사전 승인 9종" },
      { icon: "⚡", main: "보내기만 하면 되는 상태", sub: "단가 저렴 · API 있음" },
    ];
    const cW = 2.9, cH = 2.3, rGap = 0.15;
    const rStartX = 0.55;
    reasons.forEach((r, i) => {
      const x = rStartX + i * (cW + rGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.55, w: cW, h: cH,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.1
      });
      s.addText(r.icon, {
        x, y: 2.75, w: cW, h: 0.7,
        fontSize: 32, align: "center", margin: 0
      });
      s.addText(r.main, {
        x: x + 0.2, y: 3.55, w: cW - 0.4, h: 0.7,
        fontFace: FONTS.title, fontSize: 15, bold: true,
        color: COLORS.text, align: "center", margin: 0, valign: "top"
      });
      s.addText(r.sub, {
        x: x + 0.2, y: 4.15, w: cW - 0.4, h: 0.5,
        fontFace: FONTS.body, fontSize: 11, italic: true,
        color: COLORS.textMuted, align: "center", margin: 0
      });
    });
  }

  // ==================== 06: 알림톡 9종 타임라인 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText("공유회 1번 = 알림톡 9종", {
      x: 0.5, y: 0.5, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("각각 다른 날 · 다른 시간 · 다른 대상에게", {
      x: 0.5, y: 1.15, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 14,
      color: COLORS.textMuted, margin: 0
    });
    const rows = [
      ["①", "오픈알림", "D-7", "15:00", "전체 멤버"],
      ["②", "오픈리마인드", "D-5", "13:00", "미신청자"],
      ["③", "D-1 리마인드", "D-1", "13:00", "신청자"],
      ["④", "당일리마인드", "D-day", "14:00", "신청자"],
      ["⑤", "할인쿠폰", "D-day", "13:00", "미신청자"],
      ["⑥", "입장링크", "D-day", "19:00", "신청자"],
      ["⑦", "시작알림", "D-day", "20:00", "신청자"],
      ["⑧", "혜택안내", "D-day", "22:30", "신청자"],
      ["⑨", "VOD", "D+3", "18:00", "신청자"],
    ];
    const tableY = 1.75;
    const rowH = 0.38;
    const colX = [0.7, 1.3, 4.5, 5.7, 7.2];
    const headers = ["#", "템플릿", "발송일", "시간", "대상"];
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: tableY, w: 9, h: rowH,
      fill: { color: COLORS.accent }, line: { type: "none" }
    });
    headers.forEach((h, i) => {
      s.addText(h, {
        x: colX[i], y: tableY, w: 2.5, h: rowH,
        fontFace: FONTS.body, fontSize: 11, bold: true,
        color: "FFFFFF", valign: "middle", charSpacing: 2, margin: 0
      });
    });
    rows.forEach((row, ri) => {
      const y = tableY + rowH + ri * rowH;
      const bg = ri % 2 === 0 ? "FFFFFF" : "F8FAFC";
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y, w: 9, h: rowH,
        fill: { color: bg }, line: { type: "none" }
      });
      row.forEach((cell, ci) => {
        const isAccent = ci === 0 || ci === 3;
        s.addText(cell, {
          x: colX[ci], y, w: 2.5, h: rowH,
          fontFace: FONTS.body, fontSize: 12, bold: isAccent,
          color: isAccent ? COLORS.accent : COLORS.text,
          valign: "middle", margin: 0
        });
      });
    });
    s.addText("이 9종을 월 4~6번 반복 · 발송마다 대상자 DB 조회 + 카피 확정 필요", {
      x: 0.5, y: 5.2, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
  }

  // ==================== 07-A: BEFORE ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("BEFORE", {
      x: 0.5, y: 0.5, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.textMuted, charSpacing: 4, margin: 0
    });
    s.addText("6주 전 저는 이렇게 하고 있었어요", {
      x: 0.5, y: 0.95, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 30, bold: true,
      color: COLORS.text, margin: 0
    });

    // 좌측: 수동 작업 리스트
    s.addText("매일 시간 맞춰서,", {
      x: 0.5, y: 1.95, w: 4.3, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, bold: true,
      color: COLORS.text, margin: 0
    });
    const tasks = [
      "카피 초안 쓰기",
      "대상자 명단 뽑기 (Supabase 쿼리)",
      "UTM 링크 생성",
      "파트너센터 열어서 템플릿 선택",
      "변수 하나씩 붙여넣기",
      "발송 버튼 클릭 (9종 × 매번)",
    ];
    tasks.forEach((t, i) => {
      const y = 2.45 + i * 0.4;
      s.addText("☐", {
        x: 0.5, y, w: 0.35, h: 0.35,
        fontFace: FONTS.body, fontSize: 14, bold: true,
        color: COLORS.textMuted, margin: 0
      });
      s.addText(t, {
        x: 0.85, y, w: 3.9, h: 0.35,
        fontFace: FONTS.body, fontSize: 12,
        color: COLORS.text, margin: 0, valign: "middle"
      });
    });

    // 우측: 캡처 자리
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 1.95, w: 4.3, h: 3.3,
      fill: { color: "F8F8F8" },
      line: { color: COLORS.divider, width: 0.5, dashType: "dash" },
      rectRadius: 0.08
    });
    s.addText("📷", {
      x: 5.2, y: 2.3, w: 4.3, h: 0.8,
      fontSize: 36, align: "center", margin: 0
    });
    s.addText("Before 캡처", {
      x: 5.2, y: 3.2, w: 4.3, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, bold: true,
      color: COLORS.text, align: "center", margin: 0
    });
    s.addText("(파트너센터 수동 발송 화면)", {
      x: 5.2, y: 3.6, w: 4.3, h: 0.3,
      fontFace: FONTS.body, fontSize: 11, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
    s.addText("또는 n8n 전 수동 워크플로우", {
      x: 5.2, y: 3.9, w: 4.3, h: 0.3,
      fontFace: FONTS.body, fontSize: 11, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
  }

  // ==================== 07-B: AFTER ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("AFTER", {
      x: 0.5, y: 0.5, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.accent, charSpacing: 4, margin: 0
    });
    s.addText("지금은 이렇게 바뀌었어요", {
      x: 0.5, y: 0.95, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 30, bold: true,
      color: COLORS.text, margin: 0
    });

    // 플로우 다이어그램 (5단계)
    const steps = [
      { icon: "⏰", label: "n8n" },
      { icon: "🗄️", label: "Supabase" },
      { icon: "✍️", label: "AI 카피" },
      { icon: "💬", label: "Slack 승인" },
      { icon: "📤", label: "카톡 발송" },
    ];
    const sW = 1.65, sH = 1.0, sGap = 0.15;
    const totalW = sW * 5 + sGap * 4;
    const sStartX = (10 - totalW) / 2;
    steps.forEach((st, i) => {
      const x = sStartX + i * (sW + sGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.95, w: sW, h: sH,
        fill: { color: COLORS.accentLight },
        line: { color: COLORS.accent, width: 1 },
        rectRadius: 0.08
      });
      s.addText(st.icon, {
        x, y: 2.05, w: sW, h: 0.55,
        fontSize: 22, align: "center", margin: 0
      });
      s.addText(st.label, {
        x: x + 0.1, y: 2.55, w: sW - 0.2, h: 0.3,
        fontFace: FONTS.body, fontSize: 11, bold: true,
        color: COLORS.text, align: "center", margin: 0
      });
      if (i < steps.length - 1) {
        s.addText("→", {
          x: x + sW, y: 1.95, w: sGap, h: sH,
          fontFace: FONTS.title, fontSize: 14, bold: true,
          color: COLORS.accent, align: "center", valign: "middle", margin: 0
        });
      }
    });

    // 좌측: 슬랙 캡처 자리
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 3.2, w: 4.3, h: 2.1,
      fill: { color: "F8F8F8" },
      line: { color: COLORS.accent, width: 0.5, dashType: "dash" },
      rectRadius: 0.08
    });
    s.addText("💬", {
      x: 0.5, y: 3.35, w: 4.3, h: 0.5,
      fontSize: 28, align: "center", margin: 0
    });
    s.addText("슬랙 승인 모달 캡처", {
      x: 0.5, y: 3.9, w: 4.3, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, bold: true,
      color: COLORS.text, align: "center", margin: 0
    });
    s.addText("(실제 에밀리가 받는 화면)", {
      x: 0.5, y: 4.25, w: 4.3, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });

    // 우측: 결과 3줄
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 3.2, w: 4.3, h: 2.1,
      fill: { color: COLORS.accentLight },
      line: { type: "none" }, rectRadius: 0.08
    });
    const results = [
      "매일 아침 10시 슬랙 알림",
      "내가 승인만 하면 자동 발송",
      "맥북 꺼도 정시에 나감",
    ];
    results.forEach((r, i) => {
      const y = 3.35 + i * 0.6;
      s.addText("✓", {
        x: 5.4, y, w: 0.4, h: 0.4,
        fontFace: FONTS.title, fontSize: 20, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(r, {
        x: 5.85, y, w: 3.4, h: 0.4,
        fontFace: FONTS.body, fontSize: 13, bold: true,
        color: COLORS.text, valign: "middle", margin: 0
      });
    });
  }

  // ==================== 07-C: 시간 비교 (큰 숫자) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("그래서 바뀐 건,", {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontFace: FONTS.body, fontSize: 20, color: COLORS.textMuted, margin: 0
    });

    // Before: 하루 3시간 → After: 하루 5분
    const boxW = 4.3, boxH = 3.5, gap = 0.4;
    const startX = (10 - (boxW * 2 + gap)) / 2;

    // BEFORE
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: startX, y: 1.7, w: boxW, h: boxH,
      fill: { color: "F8F8F8" },
      line: { color: COLORS.divider, width: 1 },
      rectRadius: 0.12
    });
    s.addText("BEFORE", {
      x: startX + 0.3, y: 1.9, w: boxW - 0.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.textMuted, charSpacing: 4, margin: 0
    });
    s.addText("하루", {
      x: startX + 0.3, y: 2.4, w: boxW - 0.6, h: 0.45,
      fontFace: FONTS.body, fontSize: 18,
      color: COLORS.text, margin: 0
    });
    s.addText("3시간", {
      x: startX + 0.3, y: 2.85, w: boxW - 0.6, h: 1.3,
      fontFace: FONTS.title, fontSize: 84, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("수동 세팅 + 수동 발송", {
      x: startX + 0.3, y: 4.4, w: boxW - 0.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 13,
      color: COLORS.textMuted, margin: 0
    });
    s.addText("공유회 1건당 이틀 꼬박", {
      x: startX + 0.3, y: 4.75, w: boxW - 0.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.textMuted, margin: 0
    });

    // 화살표
    const afterX = startX + boxW + gap;
    s.addText("→", {
      x: startX + boxW, y: 1.7, w: gap, h: boxH,
      fontFace: FONTS.title, fontSize: 36, bold: true,
      color: COLORS.accent, align: "center", valign: "middle", margin: 0
    });

    // AFTER
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: afterX, y: 1.7, w: boxW, h: boxH,
      fill: { color: COLORS.accent },
      line: { type: "none" }, rectRadius: 0.12
    });
    s.addText("AFTER", {
      x: afterX + 0.3, y: 1.9, w: boxW - 0.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.text, charSpacing: 4, margin: 0
    });
    s.addText("하루", {
      x: afterX + 0.3, y: 2.4, w: boxW - 0.6, h: 0.45,
      fontFace: FONTS.body, fontSize: 18,
      color: COLORS.text, margin: 0
    });
    s.addText("5분", {
      x: afterX + 0.3, y: 2.85, w: boxW - 0.6, h: 1.3,
      fontFace: FONTS.title, fontSize: 84, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("슬랙에서 확인하고 승인", {
      x: afterX + 0.3, y: 4.4, w: boxW - 0.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("실수 리스크 → 자동 체크로 방지", {
      x: afterX + 0.3, y: 4.75, w: boxW - 0.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.text, margin: 0
    });

    s.addText("지금부터 이게 어떻게 가능했는지 말씀드릴게요", {
      x: 0.5, y: 5.4, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
  }

  // ==================== 08: 목차 (STEP 2개) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    s.addText("오늘 이야기할 2단계", {
      x: 0.5, y: 0.5, w: 9, h: 0.55,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("제가 알림톡 자동화를 만들면서 거친 단계들이에요", {
      x: 0.5, y: 1.05, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12,
      color: COLORS.textMuted, margin: 0
    });
    const steps = [
      {
        num: "STEP 1",
        title: "자동화 구조 짜기",
        subtitle: "(n8n + Slack + Supabase)",
        subs: [
          "Claude Code는 맥북 켜져 있어야 돎",
          "완전 자동은 무서웠어요 (민원 리스크)",
          "→ 서버 + 사람 승인 구조로 전환",
        ],
      },
      {
        num: "STEP 2",
        title: "하네스 엔지니어링",
        subtitle: "(AI가 규칙을 '읽게' 만들기)",
        subs: [
          "CLAUDE.md 353줄에 적었는데 또 까먹음",
          "3요소: 공간 · 학습 · 기억",
          "→ 에이전트 + PRD + 검수 레이어 적용",
        ],
      },
    ];
    const cardY0 = 1.55;
    const cardH = 1.55;
    const cardGap = 0.15;
    steps.forEach((st, i) => {
      const y = cardY0 + i * (cardH + cardGap);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y, w: 0.12, h: cardH,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.62, y, w: 8.88, h: cardH,
        fill: { color: "F8FAFC" },
        line: { type: "none" }
      });
      s.addText(st.num, {
        x: 0.85, y: y + 0.15, w: 1.5, h: 0.3,
        fontFace: FONTS.body, fontSize: 11, bold: true,
        color: COLORS.accent, charSpacing: 3, margin: 0
      });
      s.addText(st.title, {
        x: 0.85, y: y + 0.45, w: 4.3, h: 0.4,
        fontFace: FONTS.title, fontSize: 19, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(st.subtitle, {
        x: 0.85, y: y + 0.9, w: 4.3, h: 0.3,
        fontFace: FONTS.body, fontSize: 11, italic: true,
        color: COLORS.accent, margin: 0
      });
      st.subs.forEach((sub, si) => {
        const subY = y + 0.18 + si * 0.38;
        s.addText(`└ ${sub}`, {
          x: 5.3, y: subY, w: 4.1, h: 0.35,
          fontFace: FONTS.body, fontSize: 11,
          color: COLORS.textMuted, margin: 0
        });
      });
    });
    // "가져가실 3가지" 표시
    const endY = cardY0 + 2 * (cardH + cardGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: endY, w: 9, h: 0.55,
      fill: { color: COLORS.dark }, line: { type: "none" }
    });
    s.addText("+  오늘 가져가실 3가지", {
      x: 0.8, y: endY, w: 5, h: 0.55,
      fontFace: FONTS.body, fontSize: 14, bold: true,
      color: "FFFFFF", valign: "middle", margin: 0
    });
    s.addText("다음 장에서 바로 공개 →", {
      x: 5.5, y: endY, w: 3.8, h: 0.55,
      fontFace: FONTS.body, fontSize: 11, italic: true,
      color: COLORS.accent, align: "right", valign: "middle", margin: 0
    });
  }

  // ==================== 09: 가져갈 3가지 (타겟 포함) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    // 타겟 라벨 (상단)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 0.45, w: 9, h: 0.5,
      fill: { color: COLORS.dark },
      line: { type: "none" }, rectRadius: 0.25
    });
    s.addText("FOR · 반복 업무에 치여 본질에 집중 못 하는 마케터 · PM · 운영 담당자", {
      x: 0.5, y: 0.45, w: 9, h: 0.5,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.accent, align: "center", valign: "middle", charSpacing: 2, margin: 0
    });

    s.addText("오늘 제 세션이 끝나면", {
      x: 0.5, y: 1.15, w: 9, h: 0.55,
      fontFace: FONTS.body, fontSize: 18, color: COLORS.textMuted, margin: 0
    });
    s.addText("가져가실 수 있는 3가지", {
      x: 0.5, y: 1.7, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.text, margin: 0
    });
    const takeaways = [
      { num: "①", title: "AI(클로드)와", main: "함께 기획하는 법" },
      { num: "②", title: "AI(클로드)", main: "자동화 구조 설계하는 법" },
      { num: "③", title: "AI(클로드)", main: "하네스 엔지니어링", sub: "규칙을 '읽게' 만드는 법" },
    ];
    const cW = 2.9, cH = 2.5, gap = 0.15;
    const startX = (10 - (cW * 3 + gap * 2)) / 2;
    takeaways.forEach((t, i) => {
      const x = startX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.1, w: cW, h: cH,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.12
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + cW / 2 - 0.3, y: 2.3, w: 0.6, h: 0.6,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(t.num, {
        x: x + cW / 2 - 0.3, y: 2.3, w: 0.6, h: 0.6,
        fontFace: FONTS.title, fontSize: 22, bold: true,
        color: "FFFFFF", align: "center", valign: "middle", margin: 0
      });
      s.addText(t.title, {
        x: x + 0.15, y: 3.1, w: cW - 0.3, h: 0.4,
        fontFace: FONTS.body, fontSize: 13,
        color: COLORS.textMuted, align: "center", margin: 0
      });
      s.addText(t.main, {
        x: x + 0.15, y: 3.5, w: cW - 0.3, h: 0.9,
        fontFace: FONTS.title, fontSize: 17, bold: true,
        color: COLORS.text, align: "center", valign: "top", margin: 0
      });
      if (t.sub) {
        s.addText(t.sub, {
          x: x + 0.15, y: 4.15, w: cW - 0.3, h: 0.4,
          fontFace: FONTS.body, fontSize: 11, italic: true,
          color: COLORS.accent, align: "center", margin: 0
        });
      }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.95, w: 9, h: 0.6,
      fill: { color: COLORS.dark }, line: { type: "none" }
    });
    s.addText("한마디로 — \"AI한테 일 잘 시키는 법\"", {
      x: 0.5, y: 4.95, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 16, bold: true,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
  }

  // ==================== 도구 소개: 저희가 쓰는 도구부터 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("먼저, 저희가 쓰는 도구부터", {
      x: 0.5, y: 0.7, w: 9, h: 0.6,
      fontFace: FONTS.body, fontSize: 18, color: COLORS.textMuted, margin: 0
    });
    s.addText("n8n · Supabase · Slack", {
      x: 0.5, y: 1.25, w: 9, h: 0.75,
      fontFace: FONTS.title, fontSize: 36, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("셀피쉬클럽이 이 세 가지 위에서 돌아가고 있어요", {
      x: 0.5, y: 2.0, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, margin: 0
    });

    const tools = [
      {
        emoji: "🤖",
        name: "n8n",
        what: "자동화 도구",
        desc: "조립 블록처럼 생긴 자동화 서비스.\n정해진 시간·조건에 자동으로 일을 실행합니다.\n서버에서 혼자 돌기 때문에 제 맥북이 꺼져 있어도 동작합니다.",
      },
      {
        emoji: "🗄️",
        name: "Supabase",
        what: "데이터베이스",
        desc: "회원 정보·이벤트·결제 기록이 저장된 곳.\n\"누구한테 보낼지\" 명단을 여기서 조회합니다.\n(오픈소스 Firebase 대안이라고 생각하시면 돼요)",
      },
      {
        emoji: "💬",
        name: "Slack",
        what: "팀 메신저",
        desc: "저희 팀 업무 메신저입니다.\n여기로 AI가 \"이거 보낼까요?\" 물어보고,\n제가 승인 버튼을 눌러줍니다.",
      },
    ];
    const cW = 2.9, cH = 3.0, gap = 0.15;
    const startX = (10 - (cW * 3 + gap * 2)) / 2;
    tools.forEach((t, i) => {
      const x = startX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.55, w: cW, h: cH,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.12
      });
      s.addText(t.emoji, {
        x, y: 2.7, w: cW, h: 0.6,
        fontSize: 30, align: "center", margin: 0
      });
      s.addText(t.name, {
        x: x + 0.2, y: 3.35, w: cW - 0.4, h: 0.4,
        fontFace: FONTS.title, fontSize: 20, bold: true,
        color: COLORS.text, align: "center", margin: 0
      });
      s.addText(t.what, {
        x: x + 0.2, y: 3.8, w: cW - 0.4, h: 0.3,
        fontFace: FONTS.body, fontSize: 11, italic: true,
        color: COLORS.accent, align: "center", margin: 0
      });
      s.addShape(pres.shapes.LINE, {
        x: x + cW / 2 - 0.25, y: 4.15, w: 0.5, h: 0,
        line: { color: COLORS.accent, width: 1.5 }
      });
      s.addText(t.desc, {
        x: x + 0.2, y: 4.3, w: cW - 0.4, h: 1.2,
        fontFace: FONTS.body, fontSize: 10.5,
        color: COLORS.text, margin: 0, valign: "top", paraSpaceAfter: 2
      });
    });
  }

  // ==================== 10: Claude Code랑 이렇게 작업했어요 (4단계) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 1, 2, "자동화 구조 짜기");

    s.addText("Claude Code랑 이렇게 작업했어요", {
      x: 0.5, y: 0.7, w: 9, h: 0.65,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("상황 설명 → 딥 인터뷰 → 실제 테스트 → 문제 발견", {
      x: 0.5, y: 1.35, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.textMuted, margin: 0
    });

    // 4단계 카드 2x2
    const steps = [
      {
        num: "01",
        tag: "상황 설명",
        icon: "💬",
        body: "\"공유회 알림톡 9종 자동화하려고 해.\n템플릿은 SOLAPI, 대상자는 Supabase.\n카피는 공유회마다 달라.\"",
      },
      {
        num: "02",
        tag: "딥 인터뷰 스킬",
        icon: "🔍",
        body: "Claude: \"대상자 조건은?\n발송 시간대는? 카피 변형 규칙은?\"\n→ 하나씩 답하면서 구조가 잡힘",
      },
      {
        num: "03",
        tag: "실제 테스트 지시",
        icon: "🧪",
        body: "\"Supabase에서 신청자 조회 후,\n미신청자한테 ③ D-1 템플릿 전송.\n지금 한 번 + 저녁 7시에 한 번\"",
      },
      {
        num: "04",
        tag: "완성됐는데…",
        icon: "⚠️",
        body: "\"어? 나 6시 퇴근하는데…\n맥북 꺼지고 Claude Code 꺼지면\n저녁 7시 발송은 어떡해?\"",
      },
    ];

    const cW = 4.4, cH = 1.55, gap = 0.2;
    steps.forEach((st, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * (cW + gap);
      const y = 1.9 + row * (cH + 0.15);
      const isLast = i === steps.length - 1;

      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cW, h: cH,
        fill: { color: isLast ? COLORS.accent : COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.1
      });
      s.addText(st.num, {
        x: x + 0.2, y: y + 0.15, w: 0.6, h: 0.3,
        fontFace: FONTS.body, fontSize: 11, bold: true,
        color: COLORS.text, charSpacing: 3, margin: 0
      });
      s.addText(st.icon, {
        x: x + cW - 0.7, y: y + 0.15, w: 0.5, h: 0.5,
        fontSize: 22, align: "center", margin: 0
      });
      s.addText(st.tag, {
        x: x + 0.2, y: y + 0.45, w: cW - 0.9, h: 0.35,
        fontFace: FONTS.title, fontSize: 15, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(st.body, {
        x: x + 0.2, y: y + 0.8, w: cW - 0.4, h: 0.7,
        fontFace: FONTS.body, fontSize: 10.5, italic: true,
        color: COLORS.text, margin: 0, valign: "top", paraSpaceAfter: 1
      });
    });

    // 하단: 다음 슬라이드 예고
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 5.25, w: 9, h: 0.45,
      fill: { color: COLORS.dark }, line: { type: "none" }
    });
    s.addText("여기서 2가지 벽에 부딪혔어요 →", {
      x: 0.5, y: 5.25, w: 9, h: 0.45,
      fontFace: FONTS.title, fontSize: 13, bold: true,
      color: COLORS.accent, align: "center", valign: "middle", margin: 0
    });
  }

  // ==================== 11: 기획 삽질 2가지 인트로 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 1, 2, "자동화 구조 짜기");

    s.addText("기획하면서 깨달았던", {
      x: 0.5, y: 1.0, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, color: COLORS.textMuted, margin: 0
    });
    s.addText("2가지 삽질", {
      x: 0.5, y: 1.75, w: 9, h: 0.9,
      fontFace: FONTS.title, fontSize: 52, bold: true,
      color: COLORS.accent, margin: 0
    });

    // 2가지 삽질 미리보기
    const gists = [
      { num: "01", text: "Claude Code는 맥북이 켜져 있어야 돎" },
      { num: "02", text: "완전 자동 발송은 무서웠어요" },
    ];
    gists.forEach((g, i) => {
      const y = 3.3 + i * 0.85;
      s.addShape(pres.shapes.OVAL, {
        x: 0.5, y, w: 0.5, h: 0.5,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(g.num, {
        x: 0.5, y, w: 0.5, h: 0.5,
        fontFace: FONTS.body, fontSize: 11, bold: true,
        color: "FFFFFF", align: "center", valign: "middle", margin: 0
      });
      s.addText(g.text, {
        x: 1.2, y: y - 0.02, w: 8, h: 0.55,
        fontFace: FONTS.title, fontSize: 20, bold: true,
        color: COLORS.text, valign: "middle", margin: 0
      });
    });

    s.addText("이 두 가지 때문에 결국 지금의 구조로 가게 됐어요", {
      x: 0.5, y: 5.15, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 11: 삽질 ① — 맥북 문제 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 1, 2, "자동화 구조 짜기");

    s.addText("😰  삽질 ①", {
      x: 0.5, y: 0.8, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.accent, charSpacing: 3, margin: 0
    });
    s.addText("Claude Code는", {
      x: 0.5, y: 1.2, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("맥북이 켜져 있어야 돎", {
      x: 0.5, y: 1.9, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.accent, margin: 0
    });

    // 상황 박스
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 3.0, w: 4.3, h: 2.2,
      fill: { color: "F8FAFC" },
      line: { color: COLORS.divider, width: 1 },
      rectRadius: 0.1
    });
    s.addText("상황", {
      x: 0.7, y: 3.15, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    s.addText("\"DB 조회해서 알림톡 발송해줘\"", {
      x: 0.7, y: 3.5, w: 4, h: 0.45,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.text, margin: 0
    });
    s.addText("Claude Code한테 시켜놓고 퇴근하면?", {
      x: 0.7, y: 4.1, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 12,
      color: COLORS.textMuted, margin: 0
    });
    s.addText("🖥️  맥북 닫음  →  💤  Claude Code 멈춤", {
      x: 0.7, y: 4.45, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("📵  알림 못 나감", {
      x: 0.7, y: 4.8, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, bold: true,
      color: COLORS.accent, margin: 0
    });

    // 깨달음
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 3.0, w: 4.3, h: 2.2,
      fill: { color: COLORS.accentLight },
      line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("💡 깨달은 것", {
      x: 5.4, y: 3.15, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    s.addText("서버에서", {
      x: 5.4, y: 3.55, w: 4, h: 0.6,
      fontFace: FONTS.title, fontSize: 24, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("혼자 도는 도구가 필요해요", {
      x: 5.4, y: 4.1, w: 4, h: 0.5,
      fontFace: FONTS.title, fontSize: 20, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("→ n8n 등장", {
      x: 5.4, y: 4.75, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, margin: 0
    });
  }

  // ==================== 12: 삽질 ② — 완전 자동 무서움 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 1, 2, "자동화 구조 짜기");

    s.addText("😰  삽질 ②", {
      x: 0.5, y: 0.8, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.accent, charSpacing: 3, margin: 0
    });
    s.addText("완전 자동 발송은", {
      x: 0.5, y: 1.2, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("무서웠어요", {
      x: 0.5, y: 1.9, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.accent, margin: 0
    });

    // 상황
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 3.0, w: 4.3, h: 2.2,
      fill: { color: "F8FAFC" },
      line: { color: COLORS.divider, width: 1 },
      rectRadius: 0.1
    });
    s.addText("상황", {
      x: 0.7, y: 3.15, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    s.addText("크론으로 시간 맞춰 자동 발송?", {
      x: 0.7, y: 3.55, w: 4, h: 0.4,
      fontFace: FONTS.body, fontSize: 13,
      color: COLORS.text, margin: 0
    });
    s.addText("근데...", {
      x: 0.7, y: 4.0, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, margin: 0
    });
    s.addText("🚨  카피 오타 한 번 나면 100명 민원", {
      x: 0.7, y: 4.4, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("🚨  줌링크 잘못 들어가면 라이브 말림", {
      x: 0.7, y: 4.75, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.text, margin: 0
    });

    // 깨달음
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.2, y: 3.0, w: 4.3, h: 2.2,
      fill: { color: COLORS.accentLight },
      line: { type: "none" }, rectRadius: 0.1
    });
    s.addText("💡 깨달은 것", {
      x: 5.4, y: 3.15, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    s.addText("보내기 전엔", {
      x: 5.4, y: 3.55, w: 4, h: 0.6,
      fontFace: FONTS.title, fontSize: 24, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("사람이 한 번 봐야 해요", {
      x: 5.4, y: 4.1, w: 4, h: 0.5,
      fontFace: FONTS.title, fontSize: 20, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("→ Slack 승인 모달 등장", {
      x: 5.4, y: 4.75, w: 4, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, margin: 0
    });
  }

  // ==================== 13: 그래서 만든 구조 (3 도구 역할) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 1, 2, "자동화 구조 짜기");

    s.addText("그래서 이 세 가지를 조합했어요", {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 26, bold: true,
      color: COLORS.text, margin: 0
    });

    const tools = [
      {
        tag: "🤖 n8n",
        role: "스케줄 + 워크플로우",
        sub: "맥북 꺼도 서버에서 혼자 돎",
        answers: "← 삽질 ① 해결",
      },
      {
        tag: "🗄️ Supabase",
        role: "발송 대상자 DB",
        sub: "신청자·미신청자 자동 조회",
        answers: "(데이터 역할)",
      },
      {
        tag: "💬 Slack",
        role: "사람 승인 관문",
        sub: "승인 전엔 발송 안 됨\n팀원도 대신 승인 가능",
        answers: "← 삽질 ② 해결",
      }
    ];
    const cW = 2.9, cH = 3.5, gap = 0.15;
    const startX = (10 - (cW * 3 + gap * 2)) / 2;
    tools.forEach((t, i) => {
      const x = startX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.6, w: cW, h: cH,
        fill: { color: "FFFFFF" },
        line: { color: COLORS.accent, width: 1.5 },
        rectRadius: 0.12
      });
      s.addText(t.tag, {
        x: x + 0.25, y: 1.8, w: cW - 0.5, h: 0.45,
        fontFace: FONTS.body, fontSize: 14, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(t.role, {
        x: x + 0.25, y: 2.3, w: cW - 0.5, h: 0.4,
        fontFace: FONTS.body, fontSize: 12, bold: true,
        color: COLORS.accent, charSpacing: 2, margin: 0
      });
      s.addShape(pres.shapes.LINE, {
        x: x + 0.25, y: 2.75, w: 0.5, h: 0,
        line: { color: COLORS.accent, width: 1.5 }
      });
      s.addText(t.sub, {
        x: x + 0.25, y: 2.9, w: cW - 0.5, h: 1.0,
        fontFace: FONTS.body, fontSize: 12,
        color: COLORS.text, margin: 0, valign: "top", paraSpaceAfter: 4
      });
      s.addText(t.answers, {
        x: x + 0.25, y: 4.6, w: cW - 0.5, h: 0.4,
        fontFace: FONTS.body, fontSize: 11, italic: true,
        color: COLORS.accent, margin: 0
      });
    });

    s.addText("하나로는 안 돼서, 셋이 각자 역할만 하게 했어요", {
      x: 0.5, y: 5.2, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
  }

  // ==================== 14: 지금 돌아가는 전체 플로우 (캡처 자리) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 1, 2, "자동화 구조 짜기");

    s.addText("지금 돌아가는 전체 모습", {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });

    // 상단: 플로우 다이어그램 (간단)
    const steps = [
      { icon: "⏰", label: "n8n" },
      { icon: "🗄️", label: "Supabase" },
      { icon: "✍️", label: "AI 카피" },
      { icon: "💬", label: "Slack 승인" },
      { icon: "📤", label: "SOLAPI" },
    ];
    const sW = 1.65, sH = 1.0, sGap = 0.15;
    const totalW = sW * 5 + sGap * 4;
    const sStartX = (10 - totalW) / 2;
    steps.forEach((st, i) => {
      const x = sStartX + i * (sW + sGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.6, w: sW, h: sH,
        fill: { color: COLORS.accentLight },
        line: { color: COLORS.accent, width: 1 },
        rectRadius: 0.08
      });
      s.addText(st.icon, {
        x, y: 1.7, w: sW, h: 0.55,
        fontSize: 22, align: "center", margin: 0
      });
      s.addText(st.label, {
        x: x + 0.1, y: 2.2, w: sW - 0.2, h: 0.3,
        fontFace: FONTS.body, fontSize: 11, bold: true,
        color: COLORS.text, align: "center", margin: 0
      });
      if (i < steps.length - 1) {
        s.addText("→", {
          x: x + sW, y: 1.6, w: sGap, h: sH,
          fontFace: FONTS.title, fontSize: 14, bold: true,
          color: COLORS.accent, align: "center", valign: "middle", margin: 0
        });
      }
    });

    // 하단: 캡처 placeholder 2개 (Supabase + n8n 대시보드)
    s.addText("📷  실물 화면", {
      x: 0.5, y: 3.0, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.textMuted, charSpacing: 3, margin: 0
    });

    const capW = 4.3, capH = 1.95, capGap = 0.4;
    const capStartX = (10 - (capW * 2 + capGap)) / 2;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: capStartX, y: 3.45, w: capW, h: capH,
      fill: { color: "F8FAFC" },
      line: { color: COLORS.accent, width: 0.5, dashType: "dash" },
      rectRadius: 0.08
    });
    s.addText("🗄️", {
      x: capStartX, y: 3.6, w: capW, h: 0.6,
      fontSize: 28, align: "center", margin: 0
    });
    s.addText("Supabase 대시보드 캡처", {
      x: capStartX, y: 4.3, w: capW, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.text, align: "center", margin: 0
    });
    s.addText("(발송 대상자 DB 테이블)", {
      x: capStartX, y: 4.65, w: capW, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });

    const cap2X = capStartX + capW + capGap;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cap2X, y: 3.45, w: capW, h: capH,
      fill: { color: "F8FAFC" },
      line: { color: COLORS.accent, width: 0.5, dashType: "dash" },
      rectRadius: 0.08
    });
    s.addText("🤖", {
      x: cap2X, y: 3.6, w: capW, h: 0.6,
      fontSize: 28, align: "center", margin: 0
    });
    s.addText("n8n 워크플로우 캡처", {
      x: cap2X, y: 4.3, w: capW, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.text, align: "center", margin: 0
    });
    s.addText("(전체 자동화 플로우)", {
      x: cap2X, y: 4.65, w: capW, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });

    s.addText("자고 있어도 돌고 + 보내기 전엔 사람이 한 번 확인", {
      x: 0.5, y: 5.45, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 15: STEP 2 시작 — 규칙이 너무 많더라 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("근데 문제가 또 하나 생겼어요", {
      x: 0.5, y: 0.8, w: 9, h: 0.55,
      fontFace: FONTS.body, fontSize: 16, color: COLORS.textMuted, margin: 0
    });
    s.addText("규칙이 너무 많더라고요", {
      x: 0.5, y: 1.3, w: 9, h: 0.75,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: COLORS.accent, margin: 0
    });

    // 좌측: 규칙 나열
    const rules = [
      "🎨 카피 규칙 (톤·금지어·길이)",
      "🔗 UTM 파라미터 21개",
      "📱 알림톡 템플릿 9종 구조",
      "⏰ 각 템플릿 발송 시간",
      "👥 대상자 조건 (신청자/미신청자)",
      "💰 가격 표기 규칙",
      "🎁 혜택 카피 포맷",
      "📋 공유회별 맞춤 변수",
    ];
    rules.forEach((r, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * 2.75;
      const y = 2.5 + row * 0.42;
      s.addText(r, {
        x, y, w: 2.7, h: 0.35,
        fontFace: FONTS.body, fontSize: 12,
        color: COLORS.text, margin: 0, valign: "middle"
      });
    });

    // 우측: CLAUDE.md 큰 덩어리
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.2, y: 2.3, w: 3.3, h: 2.7,
      fill: { color: "F8FAFC" },
      line: { color: COLORS.divider, width: 1 },
      rectRadius: 0.08
    });
    s.addText("CLAUDE.md", {
      x: 6.2, y: 2.45, w: 3.3, h: 0.35,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
    for (let i = 0; i < 8; i++) {
      const lineW = 2.6 - (i % 3) * 0.3;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.4, y: 2.95 + i * 0.16, w: lineW, h: 0.04,
        fill: { color: "CBD5E1" }, line: { type: "none" }
      });
    }
    s.addText("353줄", {
      x: 6.2, y: 4.4, w: 3.3, h: 0.45,
      fontFace: FONTS.title, fontSize: 24, bold: true,
      color: COLORS.accent, align: "center", margin: 0
    });

    s.addText("이걸 CLAUDE.md 한 파일에 다 박았어요", {
      x: 0.5, y: 5.2, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 16: 😰 AI가 또 틀려요 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("😰  삽질", {
      x: 0.5, y: 0.8, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.accent, charSpacing: 3, margin: 0
    });
    s.addText("아니나 다를까, AI가 자꾸 까먹어요", {
      x: 0.5, y: 1.2, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 24, bold: true,
      color: COLORS.text, margin: 0
    });

    // 좌측: 대화
    const mx = 0.5, my = 1.95, mw = 5.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx, y: my, w: mw, h: 3.3,
      fill: { color: "F8FAFC" },
      line: { color: COLORS.divider, width: 1 },
      rectRadius: 0.08
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 1.3, y: my + 0.2, w: 3.5, h: 0.5,
      fill: { color: COLORS.accent }, line: { type: "none" },
      rectRadius: 0.08
    });
    s.addText("앞으로 90% 할인 쓰지 마세요", {
      x: mx + 1.3, y: my + 0.2, w: 3.5, h: 0.5,
      fontFace: FONTS.body, fontSize: 11,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 0.2, y: my + 0.85, w: 2.0, h: 0.4,
      fill: { color: "FFFFFF" },
      line: { color: COLORS.divider, width: 0.5 }, rectRadius: 0.08
    });
    s.addText("네 알겠습니다", {
      x: mx + 0.2, y: my + 0.85, w: 2.0, h: 0.4,
      fontFace: FONTS.body, fontSize: 11,
      color: COLORS.text, align: "center", valign: "middle", margin: 0
    });
    s.addText("(다음 날)", {
      x: mx, y: my + 1.35, w: mw, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, italic: true,
      color: COLORS.textMuted, align: "center", margin: 0
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 0.2, y: my + 1.7, w: 3.8, h: 0.6,
      fill: { color: "FFFFFF" },
      line: { color: COLORS.divider, width: 0.5 }, rectRadius: 0.08
    });
    s.addText("🔥 이번 공유회 90% 할인 진행중!", {
      x: mx + 0.2, y: my + 1.7, w: 3.8, h: 0.6,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 1.3, y: my + 2.5, w: 3.5, h: 0.45,
      fill: { color: COLORS.accent }, line: { type: "none" },
      rectRadius: 0.08
    });
    s.addText("쓰지 말랬잖아요...", {
      x: mx + 1.3, y: my + 2.5, w: 3.5, h: 0.45,
      fontFace: FONTS.body, fontSize: 11,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });

    // 우측: 두 패턴
    s.addText("두 가지 패턴이 보였어요", {
      x: 6.0, y: 2.15, w: 3.8, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, bold: true,
      color: COLORS.text, margin: 0
    });
    const patterns = [
      { num: "1", title: "규칙을 무시", desc: "적어놨는데 안 읽음" },
      { num: "2", title: "실수 반복", desc: "어제 고친 걸 또 틀림" },
    ];
    patterns.forEach((p, i) => {
      const y = 2.7 + i * 1.1;
      s.addShape(pres.shapes.OVAL, {
        x: 6.0, y, w: 0.45, h: 0.45,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(p.num, {
        x: 6.0, y, w: 0.45, h: 0.45,
        fontFace: FONTS.title, fontSize: 16, bold: true,
        color: "FFFFFF", align: "center", valign: "middle", margin: 0
      });
      s.addText(p.title, {
        x: 6.55, y: y - 0.05, w: 3.4, h: 0.35,
        fontFace: FONTS.body, fontSize: 14, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(p.desc, {
        x: 6.55, y: y + 0.3, w: 3.4, h: 0.5,
        fontFace: FONTS.body, fontSize: 11, italic: true,
        color: COLORS.textMuted, margin: 0
      });
    });

    s.addText("CLAUDE.md에 분명히 적어놨는데... 왜 까먹지?", {
      x: 0.5, y: 5.35, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 17: 하네스란? ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("하네스란?", {
      x: 0.5, y: 0.8, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 34, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("AI에게 공간 · 학습 · 기억을 어떻게 줄 것인지 —\nClaude가 일하는 방식에 맞춰 내가 설계하는 장치", {
      x: 0.5, y: 1.55, w: 9, h: 0.6,
      fontFace: FONTS.body, fontSize: 13, italic: true,
      color: COLORS.textMuted, margin: 0, paraSpaceAfter: 2
    });

    // 좌측: 3요소 박스 (세로)
    const els = [
      { name: "기억", meta: "AI의 외장 하드", desc: "feedback / prd / agent.md\n→ AI가 읽고 작업" },
      { name: "학습", meta: "오답 노트", desc: "verifier / 에밀리 승인 / 삽질 박제\n→ 실수 감지 → 기억으로 박제" },
      { name: "공간", meta: "울타리 (기술적 강제)", desc: "린터 / hook / 외부 API\n→ 박제된 규칙이 강제됨" },
    ];
    els.forEach((el, i) => {
      const y = 2.3 + i * 1.05;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.5, y, w: 4.5, h: 0.9,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.08
      });
      s.addText(el.name, {
        x: 0.7, y: y + 0.1, w: 1.3, h: 0.35,
        fontFace: FONTS.title, fontSize: 18, bold: true,
        color: COLORS.accent, margin: 0
      });
      s.addText(el.meta, {
        x: 0.7, y: y + 0.48, w: 1.3, h: 0.3,
        fontFace: FONTS.body, fontSize: 10, italic: true,
        color: COLORS.textMuted, margin: 0
      });
      s.addText(el.desc, {
        x: 2.05, y: y + 0.12, w: 2.85, h: 0.7,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.text, margin: 0, valign: "top", paraSpaceAfter: 2
      });
    });

    // 우측: 순환 다이어그램
    s.addText("순환 구조", {
      x: 5.5, y: 2.3, w: 4, h: 0.3,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.textMuted, charSpacing: 3, margin: 0
    });
    const loop = [
      { label: "기억", sub: "AI가 읽고 작업", y: 2.7 },
      { label: "학습", sub: "실수 감지 → 박제", y: 3.5 },
      { label: "공간", sub: "박제된 규칙 강제", y: 4.3 },
    ];
    loop.forEach((l, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 5.5, y: l.y, w: 4, h: 0.65,
        fill: { color: "FFFFFF" },
        line: { color: COLORS.accent, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(l.label, {
        x: 5.7, y: l.y + 0.08, w: 1.2, h: 0.5,
        fontFace: FONTS.title, fontSize: 15, bold: true,
        color: COLORS.accent, valign: "middle", margin: 0
      });
      s.addText(l.sub, {
        x: 6.9, y: l.y + 0.08, w: 2.9, h: 0.5,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.text, valign: "middle", margin: 0
      });
      if (i < loop.length - 1) {
        s.addText("↓", {
          x: 7.3, y: l.y + 0.65, w: 0.4, h: 0.15,
          fontSize: 14, align: "center", color: COLORS.accent, margin: 0
        });
      }
    });
    s.addText("↺ 다시 기억이 누적 → AI가 더 똑똑해짐", {
      x: 5.5, y: 5.05, w: 4, h: 0.3,
      fontFace: FONTS.body, fontSize: 10, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 18: 공간 (Scaffolding) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("🏠 공간", {
      x: 0.5, y: 0.8, w: 4, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("Scaffolding — 기술적으로 강제", {
      x: 0.5, y: 1.45, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, italic: true,
      color: COLORS.textMuted, margin: 0
    });
    s.addText("규칙을 \"지켜주세요\"가 아니라, 아예 어기지 못하게 만들기", {
      x: 0.5, y: 1.9, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12,
      color: COLORS.text, margin: 0
    });

    const items = [
      { icon: "🚫", text: "린터 실패 시 커밋 자체 거부" },
      { icon: "📱", text: "승인된 템플릿 9종만 발송 가능" },
      { icon: "🖼️", text: "규격 틀린 이미지 거부 (800×600·1080×1080)" },
      { icon: "✋", text: "Slack 승인 안 하면 발송 안 됨" },
      { icon: "🔢", text: "버전 카운터로 중복 발송 자동 차단" },
      { icon: "❌", text: "취소 플래그 걸리면 자동 스킵" },
      { icon: "🔍", text: "발송 직전 재조회 → 미신청자 자동 제외" },
      { icon: "🔒", text: "main 브랜치 직접 push 불가" },
      { icon: "📎", text: "feedback 활성화 누락 차단" },
      { icon: "⛔", text: "\"90% 할인\" 금지어 자동 차단" },
      { icon: "📋", text: "MEMORY.md 인덱스 누락 시 push 차단" },
    ];
    const iW = 4.4, iH = 0.38, iGap = 0.05;
    items.forEach((it, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * (iW + 0.2);
      const y = 2.4 + row * (iH + iGap);
      s.addText(it.icon, {
        x, y, w: 0.35, h: iH,
        fontSize: 13, valign: "middle", margin: 0
      });
      s.addText(it.text, {
        x: x + 0.4, y, w: iW - 0.4, h: iH,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.text, valign: "middle", margin: 0
      });
    });
  }

  // ==================== 19: 학습 (Feedback Loop) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("📓 학습", {
      x: 0.5, y: 0.8, w: 4, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("Feedback Loop — 실수 → 박제 → 자동 회피", {
      x: 0.5, y: 1.45, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, italic: true,
      color: COLORS.textMuted, margin: 0
    });

    // 2열 구성: 박제 예시 / 루프 메커니즘
    s.addText("무엇을 박제했나", {
      x: 0.5, y: 2.0, w: 4.4, h: 0.3,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    const archived = [
      "삽질 교훈 6건 (크론 타임존·PUT 이스케이프·Wait deactivate…)",
      "에밀리 교정 (카피 규칙·가격 표현 금지)",
      "성공 원리 (버전 카운터·발송직전 조회)",
      "n8n 백업 8개 (망가지면 롤백)",
    ];
    archived.forEach((a, i) => {
      const y = 2.35 + i * 0.45;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: y + 0.05, w: 0.05, h: 0.3,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(a, {
        x: 0.65, y, w: 4.3, h: 0.4,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.text, margin: 0, valign: "middle"
      });
    });

    s.addText("루프가 돌아가는 지점", {
      x: 5.2, y: 2.0, w: 4.3, h: 0.3,
      fontFace: FONTS.body, fontSize: 11, bold: true,
      color: COLORS.accent, charSpacing: 2, margin: 0
    });
    const mechanisms = [
      "Slack 승인 모달 → 에밀리 교정 → feedback 박제",
      "n8n 실행 로그 → 실패 감지 → 재실행",
      "발송직전 DB 재조회 → 승인 후 변경사항 자동 보정",
      "verifier 반려 → AI 산출물 규칙 위반 시 재작업",
    ];
    mechanisms.forEach((m, i) => {
      const y = 2.35 + i * 0.45;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.2, y: y + 0.05, w: 0.05, h: 0.3,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(m, {
        x: 5.35, y, w: 4.15, h: 0.4,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.text, margin: 0, valign: "middle"
      });
    });

    // 하단 강조
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 4.55, w: 9, h: 0.95,
      fill: { color: COLORS.accentLight },
      line: { type: "none" }, rectRadius: 0.08
    });
    s.addText("3회 연속 같은 실패 → verifier가 feedback 박제 제안", {
      x: 0.7, y: 4.65, w: 8.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 13, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("session-retro.py가 세션별 정합성 측정 → 구멍 자동 탐지", {
      x: 0.7, y: 5.05, w: 8.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, margin: 0
    });
  }

  // ==================== 20: 기억 (Context) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("💾 기억", {
      x: 0.5, y: 0.8, w: 4, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.accent, margin: 0
    });
    s.addText("Context — AI가 세션마다 까먹어도 파일이 대신 기억", {
      x: 0.5, y: 1.45, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 14, italic: true,
      color: COLORS.textMuted, margin: 0
    });

    // 4개 영역
    const groups = [
      {
        title: "프로젝트 입구",
        tag: "자동 로드",
        items: ["CLAUDE.md (30줄 + 에이전트 맵 + 스크립트 맵)"],
      },
      {
        title: "규칙 원본 (SSOT)",
        tag: "prd/*.md 10개",
        items: ["00 overview · 01 알림톡 · 02 카플친 · 03 오픈채팅", "04 이메일 · 05 인스타 · 06 온드 · 07 UTM · 08 DB · 09 아티팩트"],
      },
      {
        title: "역할 정의",
        tag: ".claude/agents/*.md 9개",
        items: [
          "실무: director · timeline-planner · data-collector · copywriter · media-ops · dispatcher",
          "검수: verifier · code-reviewer · session-retro",
        ],
      },
      {
        title: "파이프라인 · 도구 · 세션 연결",
        tag: "skills / MCP / memory",
        items: [
          "skills: sharing-crm-team / sharing-post-mortem",
          "MCP: Supabase · Slack · n8n · Notion · Gemini",
          "memory: progress.md · MEMORY.md 인덱스 · 린터 · 백업 · 마스킹",
        ],
      },
    ];
    const gW = 9, gH = 0.82, gGap = 0.08;
    groups.forEach((g, i) => {
      const y = 2.0 + i * (gH + gGap);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y, w: 0.08, h: gH,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.58, y, w: gW - 0.08, h: gH,
        fill: { color: "F8FAFC" }, line: { type: "none" }
      });
      s.addText(g.title, {
        x: 0.75, y: y + 0.08, w: 3.5, h: 0.3,
        fontFace: FONTS.body, fontSize: 13, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(g.tag, {
        x: 0.75, y: y + 0.4, w: 3.5, h: 0.25,
        fontFace: FONTS.body, fontSize: 10, italic: true,
        color: COLORS.accent, margin: 0
      });
      g.items.forEach((it, j) => {
        s.addText(it, {
          x: 4.3, y: y + 0.08 + j * 0.22, w: 5.1, h: 0.25,
          fontFace: FONTS.body, fontSize: 10,
          color: COLORS.textMuted, margin: 0
        });
      });
    });
  }

  // ==================== 21: 4가지 루프 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("4가지 루프가 맞물려 돌아요", {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 26, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("기억 ↔ 학습 ↔ 공간이 만나는 실제 회로들", {
      x: 0.5, y: 1.4, w: 9, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.textMuted, margin: 0
    });

    const loops = [
      {
        tag: "루프 A · 실무",
        flow: "에밀리 승인 모달 \"이거 아닌데\" → dispatcher 반려 → copywriter 재실행",
      },
      {
        tag: "루프 B · 검수",
        flow: "verifier 규칙 위반 감지 (lint-copy.py) → 작성 에이전트 반려 → 자동 재작업",
      },
      {
        tag: "루프 C · 박제",
        flow: "동일 실수 3회 반복 → feedback_*.md 생성 → 에이전트 md 참조 연결 → lint-agent-refs 통과 → 다음 세션 자동 회피",
      },
      {
        tag: "루프 D · 정합성",
        flow: "커밋 시도 → pre-commit hook 린터 실행 → 누락 감지 시 커밋 차단 → 강제 수정 후 재시도",
      },
    ];
    const lW = 9, lH = 0.85, lGap = 0.1;
    loops.forEach((l, i) => {
      const y = 1.95 + i * (lH + lGap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.5, y, w: lW, h: lH,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.08
      });
      s.addText(l.tag, {
        x: 0.75, y: y + 0.1, w: 2.5, h: 0.3,
        fontFace: FONTS.body, fontSize: 12, bold: true,
        color: COLORS.accent, charSpacing: 2, margin: 0
      });
      s.addText(l.flow, {
        x: 0.75, y: y + 0.4, w: 8.5, h: 0.45,
        fontFace: FONTS.body, fontSize: 11,
        color: COLORS.text, margin: 0, valign: "top"
      });
    });
  }

  // ==================== 22: 결국 이렇게 구조화했어요 (최종 요약) ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };
    addStepHeader(pres, s, 2, 2, "하네스 엔지니어링");

    s.addText("💡  정리하면", {
      x: 0.5, y: 0.8, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.accent, charSpacing: 3, margin: 0
    });
    s.addText("결국 이렇게 구조화했어요", {
      x: 0.5, y: 1.2, w: 9, h: 0.65,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });

    const cols = [
      {
        label: "🏠 공간",
        tag: "기술적 강제",
        items: [
          { name: "pre-commit hook", desc: "커밋 전 자동 체크" },
          { name: "verifier 에이전트", desc: "발송 전 검수" },
          { name: "외부 API 강제", desc: "SOLAPI·Slack·DB" },
        ],
      },
      {
        label: "📓 학습",
        tag: "실수 → 박제",
        items: [
          { name: "feedback_*.md", desc: "삽질 교훈 박제" },
          { name: "session 기록", desc: "세션 간 연결" },
          { name: "린터 스크립트", desc: "재발 탐지" },
        ],
      },
      {
        label: "💾 기억",
        tag: "잊어도 남게",
        items: [
          { name: "CLAUDE.md 입구", desc: "30줄 + 맵" },
          { name: "PRD 10개", desc: "채널별 규칙" },
          { name: "에이전트 9개", desc: "역할별 지시문" },
        ],
      },
    ];
    const cW = 2.9, cH = 3.3, gap = 0.15;
    const startX = (10 - (cW * 3 + gap * 2)) / 2;
    cols.forEach((col, i) => {
      const x = startX + i * (cW + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y: 2.0, w: cW, h: cH,
        fill: { color: "FFFFFF" },
        line: { color: COLORS.accent, width: 1.5 },
        rectRadius: 0.1
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 2.0, w: cW, h: 0.7,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(col.label, {
        x, y: 2.05, w: cW, h: 0.35,
        fontFace: FONTS.title, fontSize: 15, bold: true,
        color: "FFFFFF", align: "center", margin: 0
      });
      s.addText(col.tag, {
        x, y: 2.4, w: cW, h: 0.3,
        fontFace: FONTS.body, fontSize: 10, italic: true,
        color: "FEF8D2", align: "center", margin: 0
      });
      col.items.forEach((it, j) => {
        const y = 2.9 + j * 0.8;
        s.addText(it.name, {
          x: x + 0.2, y, w: cW - 0.4, h: 0.35,
          fontFace: FONTS.body, fontSize: 12, bold: true,
          color: COLORS.text, margin: 0
        });
        s.addText(it.desc, {
          x: x + 0.2, y: y + 0.32, w: cW - 0.4, h: 0.3,
          fontFace: FONTS.body, fontSize: 10, italic: true,
          color: COLORS.textMuted, margin: 0
        });
      });
    });

    s.addText("저장만 하면 AI는 안 읽어요 → \"어디 읽어라\"까지 알려줘야 발동", {
      x: 0.5, y: 5.45, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 19: 클로징 RECAP ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.dark };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 0.5, w: 0.08, h: 0.4,
      fill: { color: COLORS.accent }, line: { type: "none" }
    });
    s.addText("RECAP", {
      x: 0.7, y: 0.5, w: 8, h: 0.4,
      fontFace: FONTS.body, fontSize: 12, color: "CBD5E1", charSpacing: 3
    });
    s.addText("오늘 가져가실 3가지", {
      x: 0.5, y: 1.2, w: 9, h: 0.65,
      fontFace: FONTS.title, fontSize: 32, bold: true,
      color: "FFFFFF", margin: 0
    });
    const recaps = [
      ["①", "AI(클로드)와 함께 기획하는 법"],
      ["②", "AI(클로드) 자동화 구조 설계하는 법"],
      ["③", "AI(클로드) 하네스 엔지니어링"],
    ];
    recaps.forEach(([num, msg], i) => {
      const y = 2.3 + i * 0.65;
      s.addShape(pres.shapes.OVAL, {
        x: 0.5, y: y + 0.02, w: 0.5, h: 0.5,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText(num, {
        x: 0.5, y: y + 0.02, w: 0.5, h: 0.5,
        fontFace: FONTS.title, fontSize: 16, bold: true,
        color: "FFFFFF", align: "center", valign: "middle", margin: 0
      });
      s.addText(msg, {
        x: 1.2, y, w: 8.3, h: 0.5,
        fontFace: FONTS.title, fontSize: 19, bold: true,
        color: "FFFFFF", valign: "middle", margin: 0
      });
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.5, y: 4.65, w: 1.5, h: 0,
      line: { color: COLORS.accent, width: 2 }
    });
    s.addText("오늘 밤, 하나만 골라", {
      x: 0.5, y: 4.8, w: 9, h: 0.45,
      fontFace: FONTS.title, fontSize: 22, color: "FFFFFF", margin: 0
    });
    s.addText("자기 업무에 적용해보세요.", {
      x: 0.5, y: 5.2, w: 9, h: 0.45,
      fontFace: FONTS.title, fontSize: 22, bold: true,
      color: "FFFFFF", margin: 0
    });
  }

  // ==================== D: 정성적 임팩트 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("숫자 말고,", {
      x: 0.5, y: 0.8, w: 9, h: 0.7,
      fontFace: FONTS.title, fontSize: 32, color: COLORS.textMuted, margin: 0
    });
    s.addText("제가 진짜로 달라진 것", {
      x: 0.5, y: 1.5, w: 9, h: 0.8,
      fontFace: FONTS.title, fontSize: 38, bold: true,
      color: COLORS.text, margin: 0
    });

    const changes = [
      {
        icon: "🏠",
        title: "화요일 저녁, 제 시간을 되찾았어요",
        desc: "퇴근 시간이 라이브 시작 시간이었는데, 이제는 저녁에 진짜 쉴 수 있어요",
      },
      {
        icon: "🎯",
        title: "발송에서 → 품질로 집중이 옮겨갔어요",
        desc: "반복 세팅이 사라지니 카피 품질·개인화·전환 전략에 시간을 쓰게 됐어요",
      },
      {
        icon: "🛡️",
        title: "실수 걱정이 줄었어요",
        desc: "자동 검수·발송 직전 재조회가 저 대신 마지막 방어선을 지켜줍니다",
      },
      {
        icon: "🤝",
        title: "혼자 못 한 걸 크루 덕분에 뚫었어요",
        desc: "혼자 유튜브 볼 때 막혔던 벽, 크루가 각자 다른 영역에서 같은 벽을 부딪히니 같이 뚫렸어요",
      },
    ];
    const cW = 4.4, cH = 1.35, gap = 0.2;
    changes.forEach((c, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * (cW + gap);
      const y = 2.7 + row * (cH + 0.15);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cW, h: cH,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.1
      });
      s.addText(c.icon, {
        x: x + 0.2, y: y + 0.15, w: 0.5, h: 0.5,
        fontSize: 22, align: "center", margin: 0
      });
      s.addText(c.title, {
        x: x + 0.8, y: y + 0.18, w: cW - 1.0, h: 0.4,
        fontFace: FONTS.title, fontSize: 13, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(c.desc, {
        x: x + 0.8, y: y + 0.6, w: cW - 1.0, h: 0.65,
        fontFace: FONTS.body, fontSize: 10,
        color: COLORS.textMuted, margin: 0, valign: "top"
      });
    });
  }

  // ==================== E: 스폰지클럽 연결 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("근데, 혼자선 못 했습니다.", {
      x: 0.5, y: 0.8, w: 9, h: 0.8,
      fontFace: FONTS.title, fontSize: 36, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("AAA 6주가 저에게 진짜로 준 것은,", {
      x: 0.5, y: 1.65, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 14,
      color: COLORS.textMuted, margin: 0
    });

    // AAA가 준 것 3가지
    const gifts = [
      "다른 크루가 다른 영역에서 같은 벽에 부딪히는 걸 보는 경험",
      "\"나만 어려운 게 아니구나\" 하는 순간의 속도",
      "혼자 유튜브·블로그로는 절대 얻을 수 없었던 맥락",
    ];
    gifts.forEach((g, i) => {
      const y = 2.2 + i * 0.55;
      s.addShape(pres.shapes.OVAL, {
        x: 0.5, y: y + 0.05, w: 0.35, h: 0.35,
        fill: { color: COLORS.accent }, line: { type: "none" }
      });
      s.addText("✓", {
        x: 0.5, y: y + 0.05, w: 0.35, h: 0.35,
        fontFace: FONTS.title, fontSize: 14, bold: true,
        color: COLORS.text, align: "center", valign: "middle", margin: 0
      });
      s.addText(g, {
        x: 1.0, y, w: 8.5, h: 0.45,
        fontFace: FONTS.body, fontSize: 14, bold: true,
        color: COLORS.text, valign: "middle", margin: 0
      });
    });

    // 스폰지클럽 박스
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 4.1, w: 9, h: 1.45,
      fill: { color: COLORS.accent },
      line: { type: "none" }, rectRadius: 0.12
    });
    s.addText("그래서 이 경험을 정식 프로그램으로 엽니다", {
      x: 0.7, y: 4.25, w: 8.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12, bold: true,
      color: COLORS.text, charSpacing: 2, margin: 0
    });
    s.addText("✨ 스폰지클럽", {
      x: 0.7, y: 4.6, w: 8.6, h: 0.55,
      fontFace: FONTS.title, fontSize: 28, bold: true,
      color: COLORS.text, margin: 0
    });
    s.addText("같이 이기적으로 공유하며 성장하는 6주 — 마케터·비개발자 중심", {
      x: 0.7, y: 5.15, w: 8.6, h: 0.35,
      fontFace: FONTS.body, fontSize: 12,
      color: COLORS.text, margin: 0
    });
  }

  // ==================== 여러분은 이렇게 활용해보세요 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.bg };

    s.addText("여러분은", {
      x: 0.5, y: 0.7, w: 9, h: 0.6,
      fontFace: FONTS.title, fontSize: 28, color: COLORS.textMuted, margin: 0
    });
    s.addText("이렇게 활용해보세요", {
      x: 0.5, y: 1.25, w: 9, h: 0.75,
      fontFace: FONTS.title, fontSize: 38, bold: true,
      color: COLORS.accent, margin: 0
    });

    const cases = [
      {
        tag: "마케터",
        title: "반복 카피 · 캠페인 자동화",
        desc: "SNS 예약 포스팅 · 뉴스레터 · 리뷰 답변 — 규칙 파일 쪼개고 승인 관문만 나에게",
      },
      {
        tag: "PM · 기획자",
        title: "업무 규칙을 AI 친화적으로",
        desc: "Notion 한 페이지 대신 파일 분리 · 에이전트 md로 역할 나누기 · 린터로 품질 자동 체크",
      },
      {
        tag: "운영 담당자",
        title: "나 없이도 돌아가는 루틴",
        desc: "n8n + Slack 승인 모달로 \"자고 있어도 돌되 최종 버튼은 나\"  구조 만들기",
      },
      {
        tag: "누구나",
        title: "\"내가 자주 고치는 규칙\"부터 박제",
        desc: "ChatGPT가 자꾸 까먹는 규칙 1개 → 파일로 뽑고 → 지시문에 \"먼저 읽어라\" 한 줄 추가",
      },
    ];
    const cW = 4.4, cH = 1.6, gap = 0.2;
    cases.forEach((c, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.5 + col * (cW + gap);
      const y = 2.2 + row * (cH + 0.15);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cW, h: cH,
        fill: { color: COLORS.accentLight },
        line: { type: "none" }, rectRadius: 0.1
      });
      s.addText(c.tag, {
        x: x + 0.2, y: y + 0.15, w: cW - 0.4, h: 0.3,
        fontFace: FONTS.body, fontSize: 10, bold: true,
        color: COLORS.accent, charSpacing: 3, margin: 0
      });
      s.addText(c.title, {
        x: x + 0.2, y: y + 0.45, w: cW - 0.4, h: 0.4,
        fontFace: FONTS.title, fontSize: 14, bold: true,
        color: COLORS.text, margin: 0
      });
      s.addText(c.desc, {
        x: x + 0.2, y: y + 0.9, w: cW - 0.4, h: 0.65,
        fontFace: FONTS.body, fontSize: 10,
        color: COLORS.textMuted, margin: 0, valign: "top"
      });
    });

    s.addText("→ 오늘 밤 바로 적용할 수 있는 것부터 하나 골라보세요", {
      x: 0.5, y: 5.35, w: 9, h: 0.3,
      fontFace: FONTS.body, fontSize: 12, italic: true,
      color: COLORS.accent, align: "center", margin: 0
    });
  }

  // ==================== 감사합니다 ====================
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.dark };

    s.addShape(pres.shapes.LINE, {
      x: 4.25, y: 1.5, w: 1.5, h: 0,
      line: { color: COLORS.accent, width: 2 }
    });
    s.addText("Thank you", {
      x: 0.5, y: 1.8, w: 9, h: 0.6,
      fontFace: FONTS.body, fontSize: 14, color: "CBD5E1",
      align: "center", charSpacing: 4, margin: 0
    });

    s.addText("여기까지", {
      x: 0.5, y: 2.6, w: 9, h: 0.9,
      fontFace: FONTS.title, fontSize: 56, bold: true,
      color: "FFFFFF", align: "center", margin: 0
    });
    s.addText("들어주셔서 감사합니다", {
      x: 0.5, y: 3.5, w: 9, h: 0.9,
      fontFace: FONTS.title, fontSize: 56, bold: true,
      color: "FFFFFF", align: "center", margin: 0
    });

    s.addText("에밀리 · 셀피쉬클럽 CRM PM", {
      x: 0.5, y: 4.8, w: 9, h: 0.4,
      fontFace: FONTS.body, fontSize: 13,
      color: "CBD5E1", align: "center", margin: 0
    });
  }

  // ============ 저장 ============
  const outPath = "/Users/mjhee/Projects/selfish-ops2/selfish_sharing/outputs/에밀리-AAA-공유회-20260428.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("✅ 저장됨:", outPath);
  console.log("   슬라이드: 확장 (완성본 먼저 + 하네스 상세 + 활용/감사)");
}

build().catch(e => { console.error(e); process.exit(1); });
