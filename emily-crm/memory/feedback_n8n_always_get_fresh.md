---
name: n8n 업데이트 시 반드시 현재 워크플로우 GET 후 수정
description: 임시파일 재사용하면 이전 설정으로 되돌아감. 항상 GET → 수정 → PUT.
type: feedback
---

n8n 워크플로우 업데이트 시 **반드시 현재 워크플로우를 GET해서 수정**할 것. 이전에 저장한 /tmp 파일을 재사용하면 안 됨.

**Why:** 4/16에 testTemplates=[4,5,6,7,8]로 바꿨는데, 이전 /tmp 파일(testTemplates=[7])을 기반으로 staticData 수정 후 PUT → testTemplates가 [7]로 되돌아감 → 크론 때 7번만 옴.

**How to apply:**
1. 매 PUT 전 `curl GET > /tmp/n8n_wf_current.json` (항상 fresh)
2. 이전 /tmp 파일 절대 재사용 금지
3. PUT 후 GET으로 변경사항 검증 (특히 testTemplates, staticData, jsCode)
