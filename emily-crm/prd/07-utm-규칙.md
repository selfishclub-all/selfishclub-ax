# 07 — UTM 규칙 PRD

## UTM 파라미터 구조
| 파라미터 | 규칙 | 예시 |
|---------|------|------|
| `utm_medium` | `crm` (전채널 통일) | `crm` |
| `utm_source` | 채널별 고정 | `alimtalk` / `kakaoopenchat` / `kakaochannel` / `littly` / `email` |
| `utm_campaign` | URL 뒤 이벤트네이밍 | `ai-bizvideo` |
| `utm_content` | `{YYMMDD}_{Phase}_{채널상세}` | `260311_오픈_셀피쉬냅다활용` |
| `utm_term` | `inbound` (URL에 포함) | `inbound` |
| term#2 | `emily` (시트 기재용, URL 미포함) | — |

## 채널별 source 매핑
| 채널 | utm_source |
|------|-----------|
| 알림톡 | `alimtalk` |
| 오픈채팅 3방 | `kakaoopenchat` |
| 카플친 | `kakaochannel` |
| 리틀리 | `littly` |
| 이메일 | `email` |
| 대화방소식/웰컴메시지/소식 | `kakaochannel` |

## UTM 생성 규칙
- 모든 신청 URL에 UTM 자동 부착
- 줌링크/노션/VOD 등은 UTM **불필요**
- 오픈채팅용은 **bit.ly 변환 필수**
- 인스타는 UTM **불필요** (링크 제한)

## Google Sheet 기록
- 시트 URL: https://docs.google.com/spreadsheets/d/1UqPImU1dlI7oIC3LhbxTShUoQ1YcLGHYilydg19dXfY/
- UTM 생성 시 자동 기록
- 기록 항목: 날짜, 채널, Phase, 전체 UTM URL, bit.ly (해당 시)

## UTM 21개 구성 (공유회 1회 기준)
| # | 채널 | Phase | utm_content |
|---|------|-------|------------|
| 1 | 리틀리 | 오픈 | `{YYMMDD}_오픈_리틀리링크` |
| 2 | 대화방소식 | 오픈 | `{YYMMDD}_오픈_대화방소식` |
| 3 | 웰컴메시지 | 오픈 | `{YYMMDD}_오픈_웰컴메시지` |
| 4 | 소식 | 오픈 | `{YYMMDD}_오픈_소식` |
| 5 | 카플친 | 오픈 | `{YYMMDD}_오픈_카플친` |
| 6 | 카플친 | 리마인드 | `{YYMMDD}_리마인드_카플친` |
| 7 | 카플친 | 마감 | `{YYMMDD}_마감_카플친` |
| 8 | 오카방-냅다활용 | 오픈 | `{YYMMDD}_오픈_셀피쉬냅다활용` |
| 9 | 오카방-냅다실무 | 오픈 | `{YYMMDD}_오픈_셀피쉬냅다실무` |
| 10 | 오카방-셀피쉬클럽 | 오픈 | `{YYMMDD}_오픈_셀피쉬클럽` |
| 11 | 오카방-냅다활용 | 리마인드 | `{YYMMDD}_리마인드_셀피쉬냅다활용` |
| 12 | 오카방-냅다실무 | 리마인드 | `{YYMMDD}_리마인드_셀피쉬냅다실무` |
| 13 | 오카방-셀피쉬클럽 | 리마인드 | `{YYMMDD}_리마인드_셀피쉬클럽` |
| 14 | 오카방-냅다활용 | 마감 | `{YYMMDD}_마감_셀피쉬냅다활용` |
| 15 | 오카방-냅다실무 | 마감 | `{YYMMDD}_마감_셀피쉬냅다실무` |
| 16 | 오카방-셀피쉬클럽 | 마감 | `{YYMMDD}_마감_셀피쉬클럽` |
| 17 | 알림톡 | 오픈 | `{YYMMDD}_오픈_알림톡` |
| 18 | 알림톡 | 리마인드 | `{YYMMDD}_리마인드_알림톡` |
| 19 | 알림톡 | 마감 | `{YYMMDD}_마감_알림톡` |
| 20 | 이메일 | 오픈 | `{YYMMDD}_오픈_이메일` |
| 21 | 이메일 | 마감 | `{YYMMDD}_마감_이메일` |
