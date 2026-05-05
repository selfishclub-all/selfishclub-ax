---
name: Supabase 조회는 무조건 페이지네이션
description: Supabase REST API는 limit 무관하게 default max ~1000건만 반환. 발송용 모수는 반드시 fetchAll() 페이지네이션 헬퍼 사용
type: feedback
priority: high
---

Supabase REST `/rest/v1/{table}?...&limit=10000` 단일 호출은 실제로는 **약 1000건까지만** 반환된다 (서버 limit cap). limit 파라미터를 크게 줘도 무시됨.

**Why:** 2026-04-27 D-1 신청자 발송 시 `event` 테이블 1374건 중 첫 1000 raw rows만 가져와서 unique 981명에게만 발송 → 누락 347명에게는 알림톡 못 감. 직후 `send-d1-bulk-rest.js`로 보충 발송했지만 사고 직전 케이스.

**How to apply:**
- 발송용 대상자 조회·통계용 조회 등 **건수가 1000을 넘을 가능성이 있는 모든 Supabase 쿼리**는 `fetchAll()` 페이지네이션 헬퍼 사용.
- 레퍼런스: `scripts/check_recent_sharing.js`의 `fetchAll(path)` — offset 1000 단위로 반복 호출, 빈 배열 또는 1000 미만 반환 시 종료.
- 발송 스크립트 작성 시 체크리스트:
  1. `fetchAll()` 사용했는가?
  2. raw rows.length 출력하고 예상치와 비교?
  3. dedupe 후 unique 카운트 출력?
- 모수가 적으면 `?limit=1000` 단일 호출도 무방하지만, 멤버십·신청자 등 6,800명+ 규모는 무조건 fetchAll.
