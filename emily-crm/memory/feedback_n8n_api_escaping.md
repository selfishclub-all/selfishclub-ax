---
name: n8n API PUT 시 템플릿 리터럴 이중 이스케이프 방지
description: n8n Code 노드 jsCode를 API로 업데이트할 때 bash/jq 대신 python으로 JSON 생성해야 백틱/달러사인 이중이스케이프 방지
type: feedback
---

n8n Code 노드의 jsCode를 API PUT으로 업데이트할 때, **bash heredoc이나 jq로 JSON을 만들면 템플릿 리터럴(`` ` `` 및 `${}`)이 이중 이스케이프**될 수 있다.

**Why:** 4/16 Test 2에서 `Code: 취소 확인` 노드가 JS 문법 에러로 실패. `` `ver_${d.t}_${d.iid}` ``가 `` \`ver_\${d.t}_\${d.iid}\` ``로 저장되어 있었음. 승인 버튼 눌러도 카톡 발송 실패 → 에러 원인 추적에 시간 소모.

**How to apply:**
1. n8n jsCode 업데이트 시 **python3 `json.dump()`로 payload 생성** (jq/heredoc 금지)
2. PUT 후 반드시 **GET으로 jsCode를 다시 읽어서 이스케이프 확인**
3. 특히 `` ` ``, `${}`, `\n` 포함된 코드는 주의
4. 업데이트 후 **간단한 테스트 실행으로 노드가 에러 없이 도는지 확인**

```python
# 올바른 방법
import json
node['parameters']['jsCode'] = "const verKey = `ver_${d.t}_${d.iid}`;"
with open('/tmp/payload.json', 'w') as f:
    json.dump(payload, f)
# curl -X PUT ... -d @/tmp/payload.json
```
