import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";

export const maxDuration = 120; // Vercel 배포시 타임아웃 120초

// Claude API — .env.local에 ANTHROPIC_API_KEY 필요
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ data: null, error: "ANTHROPIC_API_KEY가 설정되지 않았습니다. .env.local에 추가해주세요." }, { status: 500 });
  }

  const body = await request.json();
  const { title, date, time, format, duration, price, sessions, hookDirection, beforeAfter, targetHint, benefits, appealPoints, transcript } = body;

  const sessionList = (sessions as { speaker: string; keyword: string; detail: string }[])
    .filter((s) => s.speaker || s.keyword)
    .map((s, i) => `세션${i + 1}: 공유자=${s.speaker || "미정"} / 제목=${s.keyword || "미정"}${s.detail ? `\n  상세: ${s.detail}` : ""}`)
    .join("\n");
  const speakerList = (sessions as { speaker: string }[]).map((s) => s.speaker).filter(Boolean).join(", ");

  const prompt = `당신은 셀피쉬클럽의 공유회/챌린지 상세페이지 콘텐츠를 작성하는 카피라이터입니다.

## 브랜드 톤
- 셀피쉬클럽: "AI로 나의 가능성을 확장하는 커뮤니티". 마케터·비개발자 대상.
- 톤: 진솔하고 날것. 성공 스토리가 아니라 삽질 과정을 보여준다.
- 선호 표현: "직접 부딪쳐봤다", "싹-다 공개", "우당탕탕 삽질기", "냅-다 해봤다", "찐 경험담"
- 금지 표현: "혁신적인", "완벽한", "최고의", "~해드립니다" 같은 기업 보도자료 톤
- 질문형 도입, 반전 구조("처음엔 ~했어요. 결과는 실패. 그래서 방향을 바꿨어요.")
- Before→After 대비를 적극 활용 (구체적 숫자 포함)
- "누구나 쉽게"는 쓰지 않음. 오히려 "누구나 가능은 거짓말!"이 셀피쉬 톤.

입력값은 정제되지 않은 날것의 메모입니다. 이것을 셀피쉬클럽 톤에 맞게 정제하여 콘텐츠를 생성하세요.

다음 핵심 정보를 바탕으로 상세페이지 콘텐츠를 JSON으로 생성하세요.

## 핵심 정보
- 제목: ${title}
- 날짜: ${date || "미정"} ${time || ""}
- 포맷: ${format || "온라인"}
- 소요시간: ${duration || "120분"}
- 가격: ${price ? `${Number(price).toLocaleString()}원` : "무료"}
- 공유자: ${speakerList || "미정"}
- 세션 구성:
${sessionList || "없음"}
- 핵심 훅/고민: ${hookDirection || "없음"}
- Before → After: ${beforeAfter || "없음"}
- 타겟 힌트: ${targetHint || "없음"}
- 혜택: ${benefits || "없음"}
- 추가 소구 포인트: ${appealPoints || "없음"}
${transcript ? `\n## 회의 녹음 스크립트 (핵심 내용을 추출하여 반영하세요)\n${transcript.slice(0, 3000)}` : ""}

## 생성 규칙
1. hook: 한 줄짜리 강렬한 질문 또는 문장 (예: "AI, '딸-깍'이 가능할까요?")
2. summary: 2~4문장의 감성적 도입부. 문제 제기 → 공감 → 이 공유회의 존재 이유
3. curriculum: 세션 키워드를 기반으로 PART별 커리큘럼. 각 PART에 title과 items(3~5개) 포함
4. speakers: 공유자별로 name, title(세션 제목), desc(2~3문장 소개), before(6주 전 상태), after(지금 상태)
5. target: "이런 분께 추천해요" 4개 항목
6. timetable: 시간대별 진행 순서 (time, title, desc)
7. benefits: 참여 혜택 3~5개
8. faq: 자주 묻는 질문 3~4개 (q, a)
9. imageSuggestions: 각 섹션에 들어갈 이미지/GIF 추천 5~8개. section(섹션명)과 suggestion(구체적인 이미지 설명) 포함

JSON만 반환하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      const errMsg = json.error?.message || "Claude API 오류";
      return NextResponse.json({ data: null, error: errMsg }, { status: 500 });
    }

    const text = json.content?.[0]?.text || "";

    let content;
    try {
      content = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        content = JSON.parse(jsonMatch[1].trim());
      } else {
        return NextResponse.json({ data: null, error: "AI 응답을 파싱할 수 없습니다." }, { status: 500 });
      }
    }

    return NextResponse.json({ data: content, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI 생성 중 오류가 발생했습니다.";
    return NextResponse.json({ data: null, error: message }, { status: 500 });
  }
}
