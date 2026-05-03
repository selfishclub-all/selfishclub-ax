#!/usr/bin/env python3
"""
lint-memory.py — MEMORY.md 인덱스 정합성 체크

memory/ 디렉토리의 feedback_*.md, session_*.md, obsidian_*.md, meeting_*.md 등이
memory/MEMORY.md 인덱스에 한 줄씩 등록돼있는지 검증.

사용법:
    python3 scripts/lint-memory.py

Exit code:
    0 = 모든 파일이 인덱싱됨
    1 = 인덱스 누락 발견
"""
import os
import re
import sys
from pathlib import Path


MEMORY_DIR = Path(__file__).resolve().parent.parent / "memory"
INDEX_FILE = MEMORY_DIR / "MEMORY.md"

# 인덱스에 등록해야 하는 파일 prefix
INDEXED_PREFIXES = ("feedback_", "session_", "obsidian_", "meeting_", "aaa_")
# 인덱스 자체 + progress는 예외
EXEMPT = {"MEMORY.md", "progress.md"}


def find_files() -> list:
    files = []
    for p in MEMORY_DIR.glob("*.md"):
        if p.name in EXEMPT:
            continue
        if any(p.name.startswith(prefix) for prefix in INDEXED_PREFIXES):
            files.append(p.name)
    return sorted(files)


def read_index() -> str:
    if not INDEX_FILE.exists():
        print(f"❌ MEMORY.md 없음: {INDEX_FILE}")
        sys.exit(1)
    return INDEX_FILE.read_text(encoding="utf-8")


def main() -> int:
    files = find_files()
    index = read_index()

    missing = []
    for fname in files:
        # `(파일명)` 패턴으로 체크 (마크다운 링크)
        if f"({fname})" not in index:
            missing.append(fname)

    # 역방향: 인덱스에 있는데 실제 파일 없는 깨진 링크
    link_pattern = re.compile(r"\(([^)]+\.md)\)")
    indexed = set(link_pattern.findall(index))
    # progress.md 같은 예외는 제외
    actual = {p.name for p in MEMORY_DIR.glob("*.md")}
    broken = sorted(indexed - actual)

    if not missing and not broken:
        print(f"✅ MEMORY.md 인덱스 정합 ({len(files)}개 파일 전부 등록됨)")
        return 0

    if missing:
        print(f"❌ 인덱스 누락 {len(missing)}건 — MEMORY.md에 추가 필요:")
        for m in missing:
            print(f"  - memory/{m}")
        print("\n  추가 형식: `- [제목](파일명) — 한줄설명`")

    if broken:
        print(f"\n❌ 깨진 링크 {len(broken)}건 — MEMORY.md에서 제거 또는 파일 복구:")
        for b in broken:
            print(f"  - {b}")

    return 1


if __name__ == "__main__":
    sys.exit(main())
