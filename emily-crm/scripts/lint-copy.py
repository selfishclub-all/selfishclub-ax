#!/usr/bin/env python3
"""
lint-copy.py — 카피 금지어/규칙 자동 감지기

사용법:
    python3 scripts/lint-copy.py <파일경로>
    python3 scripts/lint-copy.py .omc/crm-artifacts/iid79-ai-github/copy/alimtalk.md
    cat copy.md | python3 scripts/lint-copy.py -

참조 규칙: memory/feedback_copy_rules.md

Exit code:
    0 = 통과
    1 = 차단(Critical)
    2 = 경고만(Warning) — 통과는 가능
"""
import re
import sys


BLOCK_RULES = [
    {
        "id": "no-discount-rate",
        "pattern": re.compile(r"\b(9\d|8\d|7\d|50)%\s*할인"),
        "message": "할인율 표현 금지 ('90% 할인' 등). 가격은 카피에 넣지 않음.",
    },
    {
        "id": "no-price-arrow",
        "pattern": re.compile(r"\d{1,3},?\d{3}원\s*(→|->|=>|➡️)\s*\d"),
        "message": "가격 비교 표현 금지 ('99,000원 → 9,900원'). 카피에 가격 안 넣음.",
    },
    {
        "id": "no-complete-expr",
        "pattern": re.compile(r"라이브\s*(완주|참여하면)"),
        "message": "금지 표현 — 반드시 '라이브 이벤트 참여 시'만 사용.",
    },
    {
        "id": "no-tech-hook",
        "pattern": re.compile(r"^(터미널|깃헙|깃허브|크론|API|SDK)", re.M),
        "message": "비개발자 타겟 — 기술 용어로 후킹 금지. 결과 중심으로 작성.",
    },
    {
        "id": "no-hyperbole",
        "pattern": re.compile(r"\b(혁신|최고|압도적|완벽|독보적|전례없는|역대\s*최대)\b"),
        "message": "과장 형용사 금지 (혁신/최고/압도적/완벽/독보적 등). 셀피쉬클럽 톤 위반.",
    },
]


# 카피 풀 검증 (①② #{프로그램설명} 5안 파일)
POOL_HOOK_TAGS = {"결핍", "가치", "사회증거", "호기심", "희소성"}
POOL_RANGES = {
    "①": (18, 45),   # 오픈알림 패턴 A — 한글 헤드라인
    "오픈알림": (18, 45),
    "②": (8, 22),    # 오픈리마인드 패턴 B — 한글 문장 안 키워드
    "오픈리마인드": (8, 22),
}
POOL_ITEM_RE = re.compile(r"\[(\d+)\]\s*🏷️\s*(\S+?)\s*\((\d+)자\)\s*\n(.+?)(?=\n\s*\n|\n\[\d+\]|\n🔗|\Z)", re.S)
POOL_SECTION_RE = re.compile(r"(①|②)\s*(오픈알림|오픈리마인드)")


def lint_copy_pool(text: str):
    """카피 풀 전용 린터 — 풀 섹션 있을 때만 작동."""
    warns = []
    blocks = []

    sections = list(POOL_SECTION_RE.finditer(text))
    if not sections:
        return blocks, warns  # 풀 아님

    # 섹션별 범위 처리 (다음 섹션 시작 전까지가 한 섹션)
    for i, sec in enumerate(sections):
        key = sec.group(1)
        label = sec.group(2)
        start = sec.end()
        end = sections[i + 1].start() if i + 1 < len(sections) else len(text)
        section_text = text[start:end]

        lo, hi = POOL_RANGES.get(key) or POOL_RANGES.get(label, (0, 9999))

        items = list(POOL_ITEM_RE.finditer(section_text))
        if not items:
            continue

        # 각 항목 검증
        tag_count = {}
        for m in items:
            idx = m.group(1)
            tag = m.group(2).strip()
            declared = int(m.group(3))
            body = m.group(4).strip()
            actual = len(body)

            # 허용 태그 체크
            if tag not in POOL_HOOK_TAGS:
                blocks.append({
                    "id": "pool-invalid-tag",
                    "message": f"{key}{label} [{idx}] 후크 태그 '{tag}' 비허용. 허용: {', '.join(sorted(POOL_HOOK_TAGS))}",
                    "sample": f"🏷️ {tag}",
                })

            # 글자수 범위 체크
            if not (lo <= actual <= hi):
                blocks.append({
                    "id": "pool-glyph-range",
                    "message": f"{key}{label} [{idx}] 글자수 {actual}자 — 허용 범위 {lo}~{hi}자 위반.",
                    "sample": body[:40] + ("..." if len(body) > 40 else ""),
                })

            # 표기 vs 실제 글자수 일치
            if declared != actual:
                warns.append({
                    "id": "pool-glyph-mismatch",
                    "message": f"{key}{label} [{idx}] 표기 ({declared}자) ≠ 실제 ({actual}자).",
                    "sample": body[:40] + ("..." if len(body) > 40 else ""),
                })

            tag_count[tag] = tag_count.get(tag, 0) + 1

        # 태그 다양성: 같은 태그 3회 이상이면 경고
        for tag, cnt in tag_count.items():
            if cnt >= 3:
                warns.append({
                    "id": "pool-tag-over-used",
                    "message": f"{key}{label} 후크 태그 '{tag}' {cnt}회 사용. 5안 중 3회 이상이면 다양성 부족.",
                    "sample": tag,
                })

        # 5안 개수 체크
        if len(items) < 5:
            warns.append({
                "id": "pool-less-than-5",
                "message": f"{key}{label} 카피 풀 {len(items)}안 — 표준은 5안.",
                "sample": f"{len(items)}안",
            })

    return blocks, warns


WARN_RULES = [
    {
        "id": "ai-setup-punchline",
        "pattern": re.compile(r"했습니다\.\s*.{0,30}하고요\."),
        "message": "AI 티 나는 setup→punchline 패턴 의심. 자연스러운 구어체로.",
    },
    {
        "id": "price-in-copy",
        "pattern": re.compile(r"\b\d{1,3},\d{3}원\b"),
        "message": "카피에 가격 숫자 포함. 온드/오카방/카플친은 가격 제외.",
    },
    {
        "id": "missing-coupon-guide",
        "marker": re.compile(r"#\{쿠폰명\}|할인쿠폰"),
        "required": re.compile(r"쿠폰\s*자동\s*적용된\s*가격"),
        "message": "⑤ 할인쿠폰 카피에 '쿠폰 자동 적용된 가격' 안내 누락 의심.",
    },
]


def read_input() -> str:
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/lint-copy.py <file> | -", file=sys.stderr)
        sys.exit(3)
    arg = sys.argv[1]
    if arg == "-":
        return sys.stdin.read()
    with open(arg, encoding="utf-8") as f:
        return f.read()


def lint(text: str):
    blocks, warns = [], []
    for rule in BLOCK_RULES:
        m = rule["pattern"].search(text)
        if m:
            blocks.append({"id": rule["id"], "message": rule["message"], "sample": m.group(0)})

    for rule in WARN_RULES:
        if "pattern" in rule:
            m = rule["pattern"].search(text)
            if m:
                warns.append({"id": rule["id"], "message": rule["message"], "sample": m.group(0)})
        elif "marker" in rule and "required" in rule:
            if rule["marker"].search(text) and not rule["required"].search(text):
                warns.append({"id": rule["id"], "message": rule["message"], "sample": "(marker matched, required missing)"})

    # 카피 풀 전용 검증 (①② 섹션 있으면 자동 실행)
    pool_blocks, pool_warns = lint_copy_pool(text)
    blocks.extend(pool_blocks)
    warns.extend(pool_warns)

    return blocks, warns


def report(blocks, warns) -> int:
    if not blocks and not warns:
        print("✅ 통과 (차단 0건, 경고 0건)")
        return 0

    lines = []
    if blocks:
        lines.append(f"❌ 차단 {len(blocks)}건")
        for b in blocks:
            lines.append(f"  [{b['id']}] {b['message']}")
            lines.append(f"    발견: \"{b['sample']}\"")
    if warns:
        lines.append(f"⚠️  경고 {len(warns)}건")
        for w in warns:
            lines.append(f"  [{w['id']}] {w['message']}")
            if w.get("sample"):
                lines.append(f"    발견: \"{w['sample']}\"")
    print("\n".join(lines))

    return 1 if blocks else 2


if __name__ == "__main__":
    text = read_input()
    blocks, warns = lint(text)
    sys.exit(report(blocks, warns))
