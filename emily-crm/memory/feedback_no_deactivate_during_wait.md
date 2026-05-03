---
name: Wait 중 워크플로우 deactivate 금지
description: n8n 워크플로우 deactivate하면 Wait 중인 실행이 전부 종료됨. 발송 대기 중에는 절대 deactivate 금지.
type: feedback
---

n8n 워크플로우를 deactivate하면 **Wait 노드에서 대기 중인 실행이 전부 종료**된다.

**Why:** 4/16에 5개 템플릿 승인 후 11:10 발송 대기 중이었는데, 자동승인 코드 복원을 위해 deactivate → activate 했더니 Wait 중이던 3건이 전부 error로 종료됨. 카톡 미발송.

**How to apply:**
1. 승인 후 Wait 대기 중에는 **절대 워크플로우 deactivate 금지**
2. 코드 수정이 필요하면 **발송 완료 후** 또는 **크론 전에** 배포
3. 긴급 수정 필요 시: API PUT만 (deactivate 없이) — 단, 크론 스케줄러 재등록 안 될 수 있음
4. Wait 중인 실행 확인: `status=waiting` 실행이 있으면 deactivate 보류
