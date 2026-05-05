---
description: 공유회 종료 후 CRM 발송 성과 분석 리포트 자동 생성
trigger: "성과 분석", "포스트모템", "post mortem", "CRM 성과", "공유회 분석", "발송 성과"
---

# sharing-post-mortem

공유회 종료 후 전 채널 발송 성과를 분석하여 리포트 생성.

## 분석 항목

### 1. 전체 퍼널
```
멤버십 전체 → 알림톡 도달 → 신청 → 결제 → 라이브 참여
```

### 2. 채널별 UTM 전환 분석
```sql
-- UTM별 신청 건수
SELECT utm_source, utm_content, COUNT(*) as cnt
FROM event WHERE iid = '{iid}'
GROUP BY utm_source, utm_content
ORDER BY cnt DESC;

-- UTM별 결제 건수 + 매출
SELECT utm_source, utm_content, COUNT(*) as cnt, SUM(p_amount) as revenue
FROM purchase WHERE iid = '{iid}' AND (p_cancel_amount IS NULL OR p_cancel_amount = 0)
GROUP BY utm_source, utm_content
ORDER BY revenue DESC;
```

### 3. 분석 지표
| 지표 | 계산 |
|------|------|
| 전체 신청율 | 신청자 / 멤버십 전체 |
| 채널별 전환율 | 채널별 결제 / 채널별 도달 |
| 신규 비율 | 신규 신청자 / 전체 신청자 |
| 총 매출 | SUM(p_amount) |
| 환불율 | 취소 건수 / 전체 결제 |
| 채널 ROI 순위 | 채널별 매출 / 발송 비용 |

### 4. 알림톡 발송 성과
| 알림톡 | 발송수 | 도달수 | 클릭수 | 전환수 |
|-------|-------|-------|-------|-------|
| ① 오픈 | — | — | — | — |
| ② 리마인드 | — | — | — | — |
| ⑤ 쿠폰 | — | — | — | — |

### 5. 개선점 + 다음 공유회 액션아이템
- 가장 전환 높았던 채널/카피
- 가장 전환 낮았던 채널/카피
- Phase별 타이밍 적절했는지
- 카피 A/B 테스트 제안

## 출력
- Slack #crm-공유회 채널에 리포트 전달
- Notion 페이지 자동 생성 (추후)

## 사용법
```
"ai-bizvideo 공유회 성과 분석해줘"
"iid_74 포스트모템"
```
