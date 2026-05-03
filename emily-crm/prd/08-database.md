# 08 — Supabase 데이터베이스 PRD

## 개요
- **읽기 전용** — SELECT만 허용, DDL/마이그레이션 절대 금지
- Project ID: `mryzkyvxcjeqjkdhlkeo`
- iid 형식: 문자열 `"iid_79"` (숫자 아님)

## 테이블

### item (프로그램 정보)
주요 컬럼: `iid`, `i_title`, `i_title_userside`, `i_type`(sharing/workshop/challenge), `i_eventdate`, `i_full_schedule`, `i_submitdate_first`, `i_submitdate_last`, `i_price`, `i_paid_tf`, `i_alimurl`, `i_vodurl`, `i_open_sent_at`, `i_formid_webflow`

### member (회원 정보)
주요 컬럼: `u_name`, `u_phone`, `u_email`, `u_membership_tf`, `u_membership_type`, `u_marketing_agree_tf`, `u_marketing_agree_date`, `u_marketing_reject_date`, `u_participate_iids`

### purchase (결제 정보)
주요 컬럼: `iid`, `u_name`, `u_phone`, `u_email`, `p_created_at`, `p_amount`, `p_cancel_amount`(NULL=정상), `utm_source/medium/campaign/content/term`

### event (신청/이벤트 정보)
주요 컬럼: `iid`, `u_name`, `u_phone`, `u_email`, `e_created_at`, `e_marketingagree_tf`, `utm_source/medium/campaign/content/term`

## CRM 주요 쿼리 패턴
```sql
-- 공유회 찾기 (slug → iid)
SELECT * FROM item WHERE i_title_userside ILIKE '%키워드%' AND i_type = 'sharing';

-- 멤버십 전체
SELECT COUNT(*) FROM member WHERE u_membership_tf = true;

-- 신청자 (취소 제외)
SELECT * FROM purchase WHERE iid = '{iid}' AND (p_cancel_amount IS NULL OR p_cancel_amount = 0);

-- 미신청자 = 멤버십회원 - 신청자

-- 카플친 타겟 = 멤버십회원 - 신청자 - 수신거부(u_marketing_agree_tf = false)
```

## 수치 참고 (2026-04-05 기준)
- 멤버십 전체: 6,829명
- 전화번호 보유: 6,816명 (99.8%)
- 마케팅동의 + 전화번호: 6,736명
- 카플친 구독자: 2,865명 (멤버십의 42%)
