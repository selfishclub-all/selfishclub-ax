---
name: 4/5 n8n 알림톡 테스트 세션
description: ①~⑤ 테스트 완료, ⑥~⑨ 남음. Wait 노드 예약발송, SOLAPI 변수 수정, Slack 채널 분리
type: session
---

## 이번 세션에서 한 것

### n8n 워크플로우 수정사항 (공유회_알림톡_크론)
1. **모달에 발송시간 필드 추가** (전체 공통)
   - `f_scheduledTime` block → 에밀리가 시간 변경 가능
   - 비우면 즉시발송, 입력하면 해당 시간에 예약발송
2. **Wait 노드 3개 추가** (예약 발송)
   - Code: 대기시간 계산 → Switch: 대기여부 → Wait: 발송시간 대기
   - scheduledDate 계산 → _shouldWait true/false → Wait or 즉시
   - 주의: 1분 미만 남으면 즉시 발송됨
3. **SOLAPI: 오픈알림 노드 신규 추가**
   - ①② 같은 노드 쓰던 문제 해결
   - Switch: 템플릿 output 0 → SOLAPI: 오픈알림
4. **SOLAPI: 오픈리마인드 수정**
   - templateId: ① → ② (`KA01TP250718151456335cPBkIZJBkGt`)
   - 변수: #{공유회명} → #{프로그램명}
5. **SOLAPI: 리마인드 수정**
   - #{url} 변수 추가 (③ 버튼 링크용)
6. **https:// 자동 제거** (이중프로토콜 문제)
   - Code: 파싱 — link에서 https:// 자동 제거
   - Code: 발송 데이터 — v_url에서 https:// 자동 제거
   - 모달 placeholder에 "https:// 없이 입력" 안내
7. **슬랙 미리보기 카피 수정**
   - Code: 슬랙 메시지 case 2, 3 → 실제 SOLAPI 템플릿과 동일하게
   - Code: 수정 미리보기 case 2, 3 → 동일하게
8. **④⑥⑦ 모달에 줌링크 자동적용 안내 추가**
   - "💡 ③ D-1에서 입력한 줌링크가 자동 적용됩니다"
9. **① scheduledTime 09:30 → 15:00** (기본값, 모달에서 변경 가능)

### Slack 채널 분리
- `#crm-알림톡-승인단계` (C0AN2NZ4L7L) — n8n 알림톡 모달 전용
- `#crm-카피` (C0AQYBFB7R8) — 클로드코드 카피 레퍼런스 전용
- dispatcher/CRM 스킬에서 카피 채널 변경 아직 안 함 → 다음 세션

### 테스트 결과
- ✅ ① 오픈알림 — 모달+수정+발송+예약 전부 성공
- ✅ ② 오픈리마인드 — 모달+발송 성공, 미리보기 카피 수정 완료
- ✅ ③ D-1 리마인드 — 줌링크+발송 성공, https:// 제거로 이중프로토콜 해결
- ✅ ④ 당일리마인드 — 자동발송 성공 (staticData 줌링크 재사용)
- ✅ ⑤ 할인쿠폰 — 모달 확인, 발송 테스트 중이었음

### 남은 작업
- 🔲 ⑥ 입장링크 테스트
- 🔲 ⑦ 시작알림 테스트
- 🔲 ⑧ 혜택안내 테스트 + 크론 22:00→22:30 변경
- 🔲 ⑨ VOD 테스트
- 🔲 ⑤~⑨ 슬랙 미리보기를 실제 SOLAPI 템플릿과 맞추기
- 🔲 CRM 카피를 #crm-카피 채널로 전달하도록 수정
- 🔲 카카오모먼트 API 전환

### n8n 백업
- `scripts/n8n-backup-alimtalk-cron-20260405.json` (오늘 테스트 전 백업)

### 주의사항
- testMode=true 유지 중 (매일 09:00에 모달 뜸)
- testTemplates 현재 ⑤로 설정돼 있음 → 다음 세션에서 ⑥으로 변경
- SOLAPI 템플릿 버튼 URL이 `http://#{url}` 형식 → v_url에서 https:// 제거 필수
