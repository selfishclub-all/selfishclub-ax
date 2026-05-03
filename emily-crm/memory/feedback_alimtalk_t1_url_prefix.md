---
name: T1 알림톡 버튼 URL prefix 하드코딩
description: T1 (`KA01TP260417070155000oUqIHGY6LdH`) 후킹헤더형 버튼이 `https://www.selfishclub.xyz/sharing/#{url}` 도메인+경로 하드코딩. slug+UTM만 넘겨야 함
type: feedback
priority: high
---

T1 후킹헤더형 (`KA01TP260417070155000oUqIHGY6LdH`)의 [지금 신청하기] 버튼은 `https://www.selfishclub.xyz/sharing/#{url}` 형식으로 **도메인+`/sharing/` 경로가 하드코딩**되어 있다.
→ `#{url}` 변수에는 **slug+UTM만** (`aaa?utm_source=...&...`) 넘겨야 한다.

**Why:** 2026-04-27 미신청자 마감 발송 시 `new.selfishclub.xyz/sharing/aaa?...`를 통째로 넘겼더니 `www.selfishclub.xyz/sharing/new.selfishclub.xyz/sharing/aaa?...` 이중 prefix로 깨졌다. PRD URL 처리 규칙 ("https:// 만 strip")만 봐서는 잡히지 않는 함정.

**How to apply:**
- T1·T2·T3 (오픈 카피 풀)은 모두 같은 prefix 가정으로 본다 (확인 전까지). `#{url}` = `{i_formid_webflow}?utm_...` 형태로만 채울 것.
- 다른 도메인(예: `new.selfishclub.xyz`, `links.selfishclub.xyz` 등)으로 보내야 하면 T1 못 씀 → 다른 템플릿 검수 신청 또는 단축 URL 우회 검토.
- 새 템플릿 PRD 등재 시 **버튼 URL prefix 형태**도 항상 명시 (`https://#{url}` vs `https://www.selfishclub.xyz/sharing/#{url}` 등).
- 의심스러우면 본인 폰에 테스트 발송 1회 → 카톡에서 직접 클릭 확인.
