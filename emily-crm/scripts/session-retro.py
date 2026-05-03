#!/usr/bin/env python3
"""
session-retro.py — 세션 메트릭 자동 측정

현재 리포 상태를 스캔해서 하네스 건강도 지표를 출력한다.
session-retro 에이전트가 세션 종료 시 호출.

사용법:
    python3 scripts/session-retro.py

출력:
    - 에이전트 수 (루트/스킬)
    - PRD 수
    - 메모리 파일 수 (feedback/session/obsidian)
    - MEMORY 인덱스 정합
    - 에이전트 활성화 정합
    - 미커밋 변경 파일 수
    - 오늘 생성/수정된 파일
"""
import os
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent


def count(glob_pattern: str) -> int:
    return len(list(ROOT.glob(glob_pattern)))


def run(cmd: list) -> str:
    try:
        r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, check=False)
        return r.stdout.strip()
    except Exception:
        return ""


def git_uncommitted() -> list:
    out = run(["git", "status", "--porcelain"])
    return [line for line in out.splitlines() if line.strip()]


def changed_today() -> list:
    today = datetime.now().strftime("%Y-%m-%d")
    out = run(["git", "log", "--since", f"{today} 00:00", "--name-only", "--pretty=format:"])
    files = sorted(set(line.strip() for line in out.splitlines() if line.strip()))
    # 미커밋 변경도 포함
    for line in git_uncommitted():
        parts = line.split()
        if len(parts) >= 2:
            files.append(parts[-1])
    return sorted(set(files))


def lint_status(script: str) -> str:
    r = subprocess.run(["python3", f"scripts/{script}"], cwd=ROOT, capture_output=True, text=True)
    if r.returncode == 0:
        return "✅ 통과"
    # 간단 요약
    first_line = r.stdout.strip().split("\n")[0] if r.stdout else "❌ 실패"
    return first_line


def main() -> int:
    print("=" * 50)
    print(f"# 세션 회고 스냅샷 — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 50)

    print("\n## 하네스 구성")
    print(f"- 에이전트 (루트): {count('.claude/agents/*.md')}개")
    print(f"- 에이전트 (스킬 스텁): {count('.claude/skills/*/agents/*.md')}개")
    print(f"- PRD: {count('prd/*.md')}개")
    print(f"- Rules: {count('.claude/rules/*.md')}개")
    print(f"- Feedback 메모리: {count('memory/feedback_*.md')}개")
    print(f"- Session/Obsidian 메모리: {count('memory/session_*.md') + count('memory/obsidian_*.md')}개")
    print(f"- Scripts: {count('scripts/*.py') + count('scripts/*.sh') + count('scripts/*.js')}개")
    print(f"- n8n 백업: {count('scripts/n8n-backup-*.json')}개")

    print("\n## 정합성 체크")
    print(f"- MEMORY.md 인덱스: {lint_status('lint-memory.py')}")
    print(f"- 에이전트 활성화: {lint_status('lint-agent-refs.py')}")

    print("\n## Git 상태")
    uncommitted = git_uncommitted()
    print(f"- 미커밋 변경: {len(uncommitted)}건")
    for line in uncommitted[:10]:
        print(f"    {line}")
    if len(uncommitted) > 10:
        print(f"    ... (총 {len(uncommitted)}건)")

    today_files = changed_today()
    print(f"\n## 오늘 변경 파일 ({len(today_files)}개)")
    for f in today_files[:20]:
        print(f"  - {f}")
    if len(today_files) > 20:
        print(f"  ... (총 {len(today_files)}개)")

    print("\n## 다음 세션 시작점")
    progress = ROOT / "memory" / "progress.md"
    if progress.exists():
        text = progress.read_text(encoding="utf-8")
        # "남은 작업" 섹션 찾기
        import re
        m = re.search(r"## 남은 작업\s*\n(.+?)(?=\n##|\Z)", text, re.S)
        if m:
            lines = m.group(1).strip().splitlines()[:8]
            for line in lines:
                print(f"  {line}")
        else:
            print("  (progress.md에서 '남은 작업' 섹션 찾을 수 없음)")
    else:
        print("  progress.md 없음")

    print("\n" + "=" * 50)
    return 0


if __name__ == "__main__":
    sys.exit(main())
