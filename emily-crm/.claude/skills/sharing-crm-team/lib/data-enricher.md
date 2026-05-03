# Data Enricher — Webflow 크롤 + Supabase 쿼리 + 기획서 참조

## 입력
- url-parser.md의 출력 (slug, iid, 소스 상태)

## 처리 로직

### 1. Webflow 크롤 (WebFetch 도구)

상세페이지에서 추출할 필드:

| 필드 | 설명 | 필수 |
|------|------|------|
| 제목 | 공유회 메인 제목 | ✅ |
| 소개 | 프로그램 소개 텍스트 | ✅ |
| 커리큘럼 | 세션별 내용 | ✅ |
| 연사 정보 | 이름, 소개, 프로필 | ✅ |
| 혜택 | 참가자 혜택 리스트 | ⬜ |
| 쿠폰 | 할인 쿠폰 정보 (코드, 금액) | ⬜ |
| 가격 | 정가, 할인가 | ⬜ |
| 일시 | 날짜 + 시간 | ✅ |
| 장소 | 온라인/오프라인 | ⬜ |

프로모 카피 추출 (알림톡 ①② 용):
- 핵심 후킹 포인트 3~5개 (체크마크 리스트)
- 연사의 대표 성과/경력
- "왜 이 공유회를 들어야 하는가" 요약

### 2. Supabase 쿼리 (execute_sql 도구)

#### 프로그램 기본 정보
```sql
SELECT iid, i_type, i_title_userside, i_eventdate, i_full_schedule, i_alimurl
FROM item
WHERE iid = {iid};
```

#### 멤버십 회원수
```sql
SELECT COUNT(*) as total_members
FROM member
WHERE u_membership_tf = true;
```

#### 신청자수 (해당 프로그램)
```sql
SELECT COUNT(*) as applicants
FROM purchase
WHERE iid = {iid}
  AND (p_cancel_amount IS NULL OR p_cancel_amount = 0);
```

#### 미신청자수 (계산)
```
미신청자수 = total_members - applicants
```

#### 신청자 목록 (카플친 그룹용)
```sql
SELECT u_name, u_phone
FROM purchase
WHERE iid = {iid}
  AND (p_cancel_amount IS NULL OR p_cancel_amount = 0);
```

### 3. 기획서 참조 (Read 도구)

기획서.md가 있으면 추가 추출:
- 모집 시작일 / 마감일
- 정원
- 특별 혜택
- CRM 연동 메모

### 4. 누락 정보 처리

**필수인데 없는 정보 → 사용자에게 질문**:

| 정보 | 소스 우선순위 | 없으면 |
|------|-------------|--------|
| 모집 시작일 | 기획서 → 사용자 | ❓ 질문 |
| 모집 마감일 | 기획서 → 사용자 | ❓ 질문 |
| i_eventdate | Supabase | ❓ 질문 |
| i_full_schedule | Supabase | 전체 일정 텍스트 (예: "2026.04.01(수) 20:00-22:00") |
| i_alimurl | Supabase | 알림용 URL (노션 등) |
| 제목 | Webflow → Supabase | ❓ 질문 |
| 쿠폰 코드 | Webflow → 기획서 | ⬜ 없으면 스킵 |
| 혜택 | Webflow → 기획서 | ⬜ 없으면 스킵 |

### 5. 출력: Enriched Data JSON

```json
{
  "program": {
    "iid": 123,
    "slug": "ai-video-reels",
    "title": "AI 영상 릴스 공유회",
    "eventdate": "2026-04-15",
    "live_time": "20:00",
    "live_url": "https://zoom.us/...",
    "landing_url": "https://selfishclub.xyz/sharing/ai-video-reels"
  },
  "recruitment": {
    "start_date": "2026-04-01",
    "end_date": "2026-04-14",
    "period_days": 14
  },
  "content": {
    "intro": "...",
    "curriculum": ["세션1: ...", "세션2: ..."],
    "speakers": [{"name": "...", "bio": "..."}],
    "benefits": ["혜택1", "혜택2"],
    "coupon": {"code": "SHARE10", "amount": 10000},
    "price": {"regular": 50000, "discounted": 40000},
    "promo_copy": "비즈니스에서 진짜 쓰이는 AI 영상..."
  },
  "segments": {
    "total_members": 500,
    "applicants": 45,
    "non_applicants": 455
  }
}
```

## 주의사항
- Supabase는 **SELECT만** 허용 (DDL/INSERT/UPDATE/DELETE 금지)
- Webflow 크롤 실패 시 → Supabase + 기획서 데이터만으로 진행
- 개인정보(u_phone, u_email)는 카피에 직접 포함하지 않음
