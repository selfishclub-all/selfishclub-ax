---
name: n8n PUT 시 staticData 포함하지 않기
description: 코드/크론만 변경할 때 staticData를 PUT에 포함하면 런타임 버전 카운터가 덮어씌워져서 발송 실패
type: feedback
---

n8n 워크플로우 PUT 시 **staticData를 payload에 포함하면 런타임에 변경된 값이 덮어씌워진다.**

**Why:** 4/16에 승인 후 ver 카운터가 증가했는데, 크론 시간 변경을 위한 PUT에 staticData(이전 ver 값)가 포함되어 버전 불일치 → 취소 확인에서 전부 차단 → 카톡 미발송.

**How to apply:**
1. 코드/크론만 변경할 때: `{name, nodes, connections, settings}` — **staticData 제외**
2. staticData를 의도적으로 변경할 때만 포함 (zoomUrl 삭제 등)
3. staticData 포함 시 반드시 **직전 GET**에서 가져온 최신 값 사용
4. Wait 대기 중에는 staticData 변경 자체를 피할 것 (deactivate 금지와 같은 맥락)
