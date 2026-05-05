# URL Parser — 공유회 URL 파싱 및 데이터 소스 라우팅

## 입력
- 공유회 상세페이지 URL (예: `https://selfishclub.xyz/sharing/ai-video-reels`)

## 처리 로직

### 1. Slug 추출
```
URL: https://selfishclub.xyz/sharing/{slug}
→ slug = "ai-video-reels"
```

패턴: `selfishclub.xyz/sharing/` 뒤의 경로 세그먼트
- 쿼리 파라미터, 해시, 트레일링 슬래시 제거
- 유효하지 않은 URL → 사용자에게 재입력 요청

### 2. 데이터 소스 라우팅

slug로부터 3개 소스를 병렬 조회:

#### 소스 A: Supabase `item` 테이블
```sql
SELECT iid, i_type, i_title_userside, i_eventdate, i_full_schedule, i_alimurl
FROM item
WHERE i_type = 'sharing'
  AND (i_title_userside ILIKE '%{slug 키워드}%' OR iid::text = '{slug}')
ORDER BY i_eventdate DESC
LIMIT 5;
```
- slug에서 키워드 추출: `ai-video-reels` → `ai video reels`
- 매칭 결과가 여러 개면 사용자에게 선택 요청
- 매칭 실패 → 사용자에게 iid 직접 입력 요청

#### 소스 B: Webflow 상세페이지
```
크롤 URL: https://selfishclub.xyz/sharing/{slug}
```
- WebFetch 도구로 크롤링
- 404 또는 접근 불가 → 소스 A/C로 대체, 사용자에게 알림

#### 소스 C: 기획서.md (있으면)
```
경로 패턴: programs/{year}/sharing/{slug}/기획서.md
예: programs/2026/sharing/ai-video-reels/기획서.md
```
- 현재 연도부터 역순 탐색 (2026 → 2025 → 2024)
- 파일 없으면 스킵 (정상 동작)
- Read 도구로 읽기

### 3. 출력

```json
{
  "slug": "ai-video-reels",
  "url": "https://selfishclub.xyz/sharing/ai-video-reels",
  "sources": {
    "supabase": { "found": true, "iid": 123 },
    "webflow": { "found": true, "url": "..." },
    "planning_doc": { "found": false, "path": null }
  }
}
```

## 에러 처리

| 상황 | 처리 |
|------|------|
| URL 형식 오류 | "올바른 공유회 URL을 입력해주세요" |
| Supabase 매칭 실패 | "iid를 직접 입력해주세요" |
| Webflow 404 | 소스 A/C로 대체, 크롤 데이터 없이 진행 |
| 기획서 없음 | 정상 — 스킵 |
| 전체 소스 실패 | "데이터를 찾을 수 없습니다. 프로그램 정보를 직접 입력해주세요" |
