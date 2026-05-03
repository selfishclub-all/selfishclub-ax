#!/usr/bin/env python3
"""
lint-agent-refs.py — 에이전트 활성화 감사

feedback_*.md와 prd/*.md 가 최소 1개 이상의 에이전트 md / SKILL.md / CLAUDE.md 에
참조 연결돼있는지 검증. "저장만 하고 활성화 안 됨" 패턴 방지.

사용법:
    python3 scripts/lint-agent-refs.py

Exit code:
    0 = 전부 최소 1곳에서 참조됨
    1 = 참조 누락 발견 (활성화 안 된 규칙)
"""
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent

# 검사 대상: 참조되어야 할 규칙 파일들
SOURCE_GLOBS = [
    "memory/feedback_*.md",
    "prd/*.md",
]

# 참조 위치로 허용되는 곳
REFERRER_GLOBS = [
    ".claude/agents/*.md",
    ".claude/skills/**/SKILL.md",
    ".claude/skills/**/agents/*.md",
    "CLAUDE.md",
]

# 인덱스성 파일은 예외 (스스로는 참조 대상 아님)
EXEMPT_SOURCES = {
    "memory/MEMORY.md",
    "memory/progress.md",
}


def collect_files(globs, base: Path) -> list:
    files = []
    for g in globs:
        files.extend(base.glob(g))
    return sorted({f.resolve() for f in files if f.is_file()})


def build_referrer_text(referrers: list) -> str:
    chunks = []
    for p in referrers:
        try:
            chunks.append(p.read_text(encoding="utf-8"))
        except Exception:
            continue
    return "\n".join(chunks)


def main() -> int:
    sources = collect_files(SOURCE_GLOBS, ROOT)
    referrers = collect_files(REFERRER_GLOBS, ROOT)
    combined = build_referrer_text(referrers)

    orphans = []
    for src in sources:
        rel = src.relative_to(ROOT).as_posix()
        if rel in EXEMPT_SOURCES:
            continue
        name = src.name
        # 파일명 또는 상대 경로로 참조되는지
        if name in combined or rel in combined:
            continue
        orphans.append(rel)

    if not orphans:
        print(f"✅ 규칙 활성화 정합 ({len(sources) - len(EXEMPT_SOURCES)}개 전부 참조됨)")
        return 0

    print(f"❌ 활성화 누락 {len(orphans)}건 — 에이전트/스킬/CLAUDE.md에서 참조하지 않음:")
    for o in orphans:
        print(f"  - {o}")
    print("\n  해결: 관련 에이전트 md에 참조 추가 또는 파일 제거.")
    print("  SSOT 원칙: 저장만 하고 활성화 안 되면 규칙은 안 쓰임.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
