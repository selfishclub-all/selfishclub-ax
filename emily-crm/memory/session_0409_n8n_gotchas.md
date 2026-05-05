---
name: 4/9 n8n 알림톡 크론 삽질 교훈
description: n8n 서버 타임존·크론 포맷·Code 노드 모드·자동승인·수정모달 등 4/9 세션에서 잡은 버그와 운영 철칙 전체
type: feedback
---

## 시점
2026-04-09 — 크루 테스트(4/10~4/16) 세팅 직전. 이 세션에서 잡은 운영 지식이 **테스트 실패와 직결**되므로 누락 금지.

## 1. Schedule Trigger 3대 함정

### n8n 서버는 UTC가 아니라 **America/New_York (EDT/EST)**
- KST → EDT 변환: `KST - 13시간` (서머타임 `KST - 14시간`)
- 매일 10:00 KST 크론 = `0 0 21 * * *` (21:00 EDT)
- 이걸 모르고 UTC로 계산하면 아예 안 돎

### 크론은 **6자리 포맷** (초 포함)
- `초 분 시 일 월 요일`
- `0 21 * * *` 쓰면 "매시 21초"로 해석됨 → 완전히 다른 동작
- 반드시 `0 0 21 * * *`

### API로 크론 수정하면 스케줄러 재등록이 **간헐적으로 안 됨**
- 코드 변경은 API OK
- 시간 변경은 **n8n UI에서 노드 열고 Publish** 해야 확실
- 테스트 시엔 **매분 크론(`0 * * * * *`)으로 강제 트리거** 후 검증
- **"Execute workflow from Schedule Trigger"** 수동 실행은 Schedule Trigger가 1개 아이템만 emit할 수 있어서 크론 자동 실행과 결과 다를 수 있음

**Why**: 진짜 크론이 작동하는지 확인 못하면 내일 10시에 아무것도 안 오는 참사 발생.
**How to apply**: 크론 시간 변경 후 반드시 매분 크론으로 한 번 검증 → 복원.

## 2. Code 노드 필수 설정: `Run Once for Each Item`

### 기본값의 함정
- n8n Code 노드 typeVersion 2 기본 모드는 `Run Once for All Items`
- 이 모드에서는 Code가 **1번만 실행** → 9개 입력이 와도 1개만 처리
- **하루에 여러 템플릿(예: D-day ④⑥⑦⑧)이 동시에 나가야 하는 크론이 1개만 내보내는 참사**

### 해결
1. 모든 Code 노드 (변수 준비, 슬랙 메시지, 파싱, SQL 재생성, 발송 데이터, 수정 미리보기 등)를 **`Run Once for Each Item`** 모드로 설정
2. return 포맷을 **단일 객체**로: `return { json: {...} };` (배열 X)
3. `$input.item.json` 사용 (`.first()` 금지 — 항상 첫 아이템만 봄)
4. `$getWorkflowStaticData('global')`은 최상단에서 선언

**Why**: `.first()` + 배열 return 쓰면 하루에 1개 템플릿만 발송되고 나머지는 사일런트 드롭.
**How to apply**: n8n UI에서 각 Code 노드 열어서 Mode 드롭다운을 `Run Once for Each Item`으로 확인.

## 3. URL / `http(s)://` 자동 제거

### SOLAPI 템플릿 버튼 이슈
- SOLAPI 알림톡 버튼은 템플릿 정의에 이미 `http://#{url}` 또는 `https://#{url}`가 박혀있음
- 변수에 프로토콜 포함해서 넘기면 **`https://https://...` 이중 프로토콜** → 알림톡 실패 → 문자로 대체 발송
- **모든 URL 입력값은 `strip()` 함수로 프로토콜 제거 필수**

```javascript
const strip = u => (u||'').replace(/^https?:\/\//, '');
```

### 적용 위치
- `Code: 파싱` — 모달에서 사용자가 입력한 줌링크/URL/VOD링크
- `Code: 발송 데이터` — DB의 `i_alimurl`, staticData의 `zoomUrl/vodUrl` 등 모든 v_url

**Why**: 문자로 대체발송되면 크루 테스트에서 카피/디자인이 완전히 달라보이고 링크도 안 달림.
**How to apply**: 새 템플릿 추가할 때 SOLAPI 노드에 `v_url` 매핑할 때 반드시 `strip(...)` 래핑.

## 4. Slack 수정 모달 필수 규칙

### 4-1. `f_time` 블록 ID 충돌
- ⑥ 입장링크 수정 모달에는 **공유회 시간** 필드로 `f_time`이 이미 사용 중
- 발송시간 필드를 `f_time`으로 또 넣으면 → **Slack API 400 (중복 block_id)** → 수정 버튼이 아예 안 먹음
- **발송시간은 무조건 `block_id: f_scheduled`로 분리**

### 4-2. 발송시간 기본값 노출
- 모달 placeholder에 해당 템플릿 scheduledTime 노출 (예: `19:00 (비우면 즉시발송)`)
- 사용자가 "미정"으로 오해하지 않도록 값 필드도 기본값 채움
- 비우면 즉시발송, 값 있으면 SOLAPI sendAt으로 예약

### 4-3. `Code: 수정 미리보기`의 `cb` JSON 필수 필드
재수정 시 값 유지 위해 반드시 포함:
- `scheduledTime` (발송시간 — 누락 시 재수정에서 "미정"으로 리셋)
- `vodDeadline` (⑨ 열람기한)
- `lh`, `rh`, `cpn`, `ed`, `period`, `link`, `url`

**Why**: 크루 테스트 중 에밀리가 시간 수정하고 다시 수정하려 하면 이전 값 다 날아감 → 혼란.
**How to apply**: 새 필드 추가할 때마다 `Code: 슬랙 메시지`와 `Code: 수정 미리보기`의 cb에 **동시에** 반영.

## 5. 승인 경고 워딩 필수

모든 모달/미리보기 버튼 바로 위에:
```
⚠️ 승인 시 예약 발송이 확정됩니다. 카피·링크·시간을 반드시 확인 후 승인해주세요.
```

**Why**: "이대로 발송"이 **예약 발송 확정**임을 명확히 해서 사고 방지.

## 6. 자동승인 경로 (staticData 연쇄)

`Code: 파싱`에서 `cron_approve` 액션 처리 시:
```javascript
if (cb.t === 4 || cb.t === 6 || cb.t === 7 || cb.t === 8 || cb.t === 9) {
  const link = (cb.t === 8 || cb.t === 9)
    ? (cb.link || cb.url || '')
    : (staticData.zoomUrl || cb.link || '');
  if (link) return approve_direct;  // 모달 스킵
}
```

### 연쇄 흐름
```
③ D-1 줌링크 입력 → staticData.zoomUrl → ④⑥⑦ 자동승인
⑥ 라이브혜택 입력 → staticData.benefits → ⑦ 자료집리스트 자동 로드
⑨ VOD링크 입력 → staticData.vodUrl 저장 (다음 공유회까지 유지)
⑧⑨ DB 링크 (i_alimurl/i_vodurl)도 cb.link로 자동승인
```

### ⑦의 자료집리스트
- ⑦ 모달에서 `rh` 기본값은 `staticData.benefits || d.rh` (⑥에서 저장한 값 우선)
- SOLAPI 템플릿 `#{자료집리스트}`에 이미 `✅`가 박혀있으므로 **변수값엔 `✅` 제거**

**Why**: ⑥⑦이 모달 스킵 안 되면 에밀리가 D-day 오후에 줌링크/라이브혜택을 2번씩 입력해야 함.
**How to apply**: 새 템플릿 추가 시 자동승인 대상인지 먼저 확인. `cb.t === N` 조건에 추가.

## 7. SOLAPI 노드 `#{url}` 변수 누락 주의

- ③④⑥⑦⑧⑨ 모두 버튼에 링크 포함 → `variables.#{url}` 매핑 필수
- 과거 **SOLAPI: 리마인드 노드**에 `#{url}` 변수가 빠져 있어서 ③④가 문자로 대체 발송된 사건 있음
- **case 7 = ⑦ 시작알림, case 8 = ⑧ 혜택안내** — 과거 템플릿 ID가 뒤바뀐 버그 있었음 → 배포 전 반드시 매핑 확인

## 8. testMode의 양면성

### 편의 경로 (iid_999 하드코딩)
- `Code: 알림톡 판별`에서 `testMode:true`면 `testTemplates` 배열의 번호만 처리
- `iid = 'iid_999'` 강제 조회 → 프로덕션 SQL 건너뜀

### 문제
- 프로덕션 SQL 경로가 제대로 도는지 **전혀 검증 못 함**
- 크루 테스트는 반드시 **testMode 하드코딩 제거** + iid_999에 실제 member/purchase 세팅 후 프로덕션 SQL 경로로 돌려야 실전 검증 됨

**How to apply**: 크루 테스트 세팅 시 `testMode:false`로 두거나, `testMode:true`이되 `iid_999` 하드코딩 분기 제거 → `CURRENT_DATE` 조건 SQL이 돌게 함.

## 9. 워크플로우 ID 및 환경

| 항목 | 값 |
|------|-----|
| 워크플로우 ID | `R2FCAquAvaDPTkWP` |
| 이름 | `공유회_알림톡_크론` |
| n8n 서버 타임존 | `America/New_York` |
| SOLAPI API Key | `NCST_REDACTED_KEY` |
| SOLAPI PF ID | `KA01PF_REDACTED_PFID` |
| Slack 승인 채널 | `#crm-알림톡-승인단계` (C0AN2NZ4L7L) |
| Slack 카피 채널 | `#crm-카피` (C0AQYBFB7R8) |
| Slack 봇 | `공유회-crm-bot` (B0AMWB9JRA7) |

## 10. 백업 전략

### 매 세션 종료 시
```bash
curl -sS -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "$N8N_URL/api/v1/workflows/R2FCAquAvaDPTkWP" \
  > scripts/n8n-backup-alimtalk-cron-YYYYMMDD.json
```

### 업데이트 시 API 주의사항
n8n PUT API는 settings에 허용 필드만 받음:
```bash
jq '{name, nodes, connections, settings: (.settings | {executionOrder, saveDataErrorExecution, saveDataSuccessExecution, saveManualExecutions, saveExecutionProgress, timezone, callerPolicy} | with_entries(select(.value != null)))}'
```
