#!/usr/bin/env python3
"""
mask-secrets.py — 민감정보 탐지 + 마스킹

로그/스냅샷/Slack 메시지에 전화번호·API 키 같은 민감정보가 섞여 있는지 감지하고
마스킹한 결과를 출력한다.

사용법:
    python3 scripts/mask-secrets.py <파일경로>
    cat log.txt | python3 scripts/mask-secrets.py -

Exit code:
    0 = 민감정보 없음
    1 = 민감정보 감지됨 (마스킹된 결과는 stdout)
"""
import re
import sys


MASKS = [
    # 한국 휴대폰 (010-1234-5678 / 01012345678)
    (
        "phone",
        re.compile(r"\b(01[016789])[-\s]?(\d{3,4})[-\s]?(\d{4})\b"),
        lambda m: f"{m.group(1)}-****-{m.group(3)[-2:]}**",
    ),
    # SOLAPI API 키 (NCST_REDACTED_KEY 형식, 대문자+숫자 16자)
    (
        "solapi_key",
        re.compile(r"\bNCS[A-Z0-9]{13}\b"),
        lambda m: f"NCS***{m.group(0)[-4:]}",
    ),
    # Slack 봇 토큰 (xoxb-...)
    (
        "slack_token",
        re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{10,}"),
        lambda m: f"{m.group(0)[:10]}***",
    ),
    # JWT 의심
    (
        "jwt",
        re.compile(r"\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]+"),
        lambda m: f"{m.group(0)[:12]}***",
    ),
    # Supabase URL (https://xxxxx.supabase.co)
    (
        "supabase_url",
        re.compile(r"https://[a-z0-9]+\.supabase\.co"),
        lambda m: "https://***.supabase.co",
    ),
    # 이메일 (로그에 섞이면 마스킹)
    (
        "email",
        re.compile(r"\b([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b"),
        lambda m: f"{m.group(1)[:2]}***@{m.group(2)}",
    ),
]


def read_input() -> str:
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/mask-secrets.py <file> | -", file=sys.stderr)
        sys.exit(3)
    arg = sys.argv[1]
    if arg == "-":
        return sys.stdin.read()
    with open(arg, encoding="utf-8") as f:
        return f.read()


def main() -> int:
    text = read_input()
    hits = []
    out = text
    for name, pattern, fn in MASKS:
        matches = list(pattern.finditer(out))
        if matches:
            hits.append((name, len(matches)))
            out = pattern.sub(fn, out)

    print(out, end="")
    if hits:
        print("\n---", file=sys.stderr)
        for name, cnt in hits:
            print(f"⚠️  {name} {cnt}건 마스킹됨", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
