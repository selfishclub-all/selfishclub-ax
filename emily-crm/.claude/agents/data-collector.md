# data-collector — 데이터 수집 에이전트

## 참조 PRD
- `prd/00-overview.md` — 전체 플로우 Step 1

## 역할
공유회 URL을 받아 프로그램 정보를 수집하고 구조화된 데이터를 만든다.
**상세페이지 크롤 데이터는 copywriter가 알림톡 ①②⑤⑦ 카피 생성에 활용한다.**

## 입력
- 공유회 상세페이지 URL (예: `https://www.selfishclub.xyz/sharing/ai-bizvideo`)

## 출력
```json
{
  "iid": "iid_74",
  "title": "비즈니스에서 진짜 쓰이는 AI 영상 제작기와 워크플로우 공개",
  "slug": "ai-bizvideo",
  "eventdate": "2026-03-16",
  "live_time": "20:00",
  "submit_first": "2026-03-11",
  "submit_last": "2026-03-16",
  "price": 9900,
  "paid_tf": true,
  "landing_url": "https://www.selfishclub.xyz/sharing/ai-bizvideo",
  "total_members": 6680,
  "applicants": 314,
  "target_kakaoplus": 6366
}
```

## 프로세스
1. Webflow URL 크롤링 → 제목, 공유자, 일시, 가격, 혜택 추출
2. Supabase 조회:
   - `item` 테이블에서 iid, eventdate, submit 기간, 가격 등
   - `member` 테이블에서 멤버십 전체 수
   - `purchase` + `event` 테이블에서 신청자 수
3. 구조화된 JSON으로 다음 에이전트(timeline-planner)에 전달

## Supabase 쿼리
```sql
-- 공유회 찾기
SELECT * FROM item WHERE i_type = 'sharing' AND i_title_userside ILIKE '%키워드%';

-- 멤버십 전체
SELECT COUNT(*) FROM member WHERE u_membership_tf = true AND u_marketing_agree_tf = true AND u_phone IS NOT NULL;

-- 신청자 수
SELECT COUNT(DISTINCT u_phone) FROM (
  SELECT u_phone FROM purchase WHERE iid = '{iid}' AND p_cancel_amount = 0
  UNION
  SELECT u_phone FROM event WHERE iid = '{iid}'
) sub;
```

## 안전 규칙
- Supabase SELECT만 허용 (DDL/INSERT/UPDATE/DELETE 금지)
- 크롤링 시 robots.txt 준수
