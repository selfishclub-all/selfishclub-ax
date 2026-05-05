#!/usr/bin/env bash
# scripts/pre-commit.sh — selfish_sharing 전용 pre-commit 린터
#
# 설치:
#   ln -sf ../../selfish_sharing/scripts/pre-commit.sh ../.git/hooks/pre-commit
#   (또는 수동으로 .git/hooks/pre-commit 에 복사 + chmod +x)
#
# 동작:
#   selfish_sharing/ 하위 파일만 staged 됐을 때 린터 실행
#   - MEMORY.md 인덱스 정합성
#   - 에이전트 참조 활성화 여부
#   - 카피 린터 (memory/feedback_copy_rules.md 규칙)
#
# 실패 시 커밋 차단 (--no-verify로 우회 가능하지만 권장 X).

set -e

# 프로젝트 루트 (selfish_sharing/)
PROJECT="selfish_sharing"
REPO_ROOT=$(git rev-parse --show-toplevel)
PROJECT_DIR="${REPO_ROOT}/${PROJECT}"

# staged 파일 중 selfish_sharing/ 안 것만
STAGED=$(git diff --cached --name-only --diff-filter=ACM | grep "^${PROJECT}/" || true)

if [ -z "$STAGED" ]; then
  # selfish_sharing 관련 변경 없음 — 바로 통과
  exit 0
fi

echo "🔍 selfish_sharing 린터 실행..."

cd "$PROJECT_DIR"

# 1. MEMORY.md 인덱스 정합
if ! python3 scripts/lint-memory.py; then
  echo ""
  echo "❌ MEMORY.md 인덱스 체크 실패 — 커밋 차단"
  echo "   수정 후 재시도 또는 --no-verify (비권장)"
  exit 1
fi

# 2. 에이전트 참조 활성화
if ! python3 scripts/lint-agent-refs.py; then
  echo ""
  echo "❌ 에이전트 활성화 체크 실패 — 커밋 차단"
  echo "   해결: 관련 에이전트 md에 참조 추가"
  exit 1
fi

# 3. 카피 파일 수정 시 lint-copy 실행
COPY_FILES=$(echo "$STAGED" | grep -E "copy/.+\.md$|memory/feedback_copy_rules\.md$" || true)
if [ -n "$COPY_FILES" ]; then
  for f in $COPY_FILES; do
    # feedback_copy_rules.md 자체는 카피가 아니므로 스킵
    if [[ "$f" == *"feedback_copy_rules"* ]]; then continue; fi
    rel="${f#${PROJECT}/}"
    echo ""
    echo "📝 카피 린트: $rel"
    if ! python3 scripts/lint-copy.py "$rel"; then
      RESULT=$?
      if [ $RESULT -eq 1 ]; then
        echo "❌ 카피 차단 규칙 위반 — 커밋 차단"
        exit 1
      fi
      # exit 2 = warning — 계속 진행 (경고만)
    fi
  done
fi

echo "✅ 린터 전부 통과"
exit 0
