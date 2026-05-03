# 셀피쉬클럽 공유회 CRM 자동화 아키텍처

## 전체 파이프라인 플로우

```mermaid
flowchart TD
    A([🗣️ 에밀리: CRM 시작해줘 URL]) --> B

    subgraph ENGINE["⚙️ Claude Code 자동 처리 (D-7)"]
        B[📥 상세페이지 크롤링\n프로그램 정보 추출] --> C
        C[📅 타임라인 자동 생성\n9종 발송 스케줄] --> D
        D[✍️ 전채널 카피 생성\n알림톡·카플친·오카방·온드미디어·인스타] --> E
        E[🔗 UTM 21개 자동 생성\nGoogle Sheet 연동]
    end

    E --> F[📤 Slack #crm-카피 전달\n모든 카피 + 에셋 패키지]

    F --> G{👀 에밀리 검토\n승인 or 피드백}
    G -->|수정 요청| D
    G -->|승인| H

    subgraph CHANNELS["📡 채널별 발송"]
        H --> CH1
        H --> CH2
        H --> CH3
        H --> CH4
        H --> CH5
    end

    subgraph CH1["① 알림톡 9종 🟢 완전자동"]
        A1[n8n 크론 스케줄링] --> A2[Slack 승인 모달]
        A2 --> A3[SOLAPI 자동발송\n6,829명]
    end

    subgraph CH2["② 카플친 배너 🟡 반자동"]
        B1[Claude 배너 이미지 생성] --> B2[n8n Slack 승인]
        B2 --> B3[에밀리: 카카오\n파트너센터 발송\n~15분]
    end

    subgraph CH3["③ 오픈채팅방 🔴 수동"]
        C1[카피 자동생성\nSlack 복붙 준비] --> C2[에밀리:\n오카방 3곳 수동 게시]
    end

    subgraph CH4["④ 온드미디어 5종 🔴 수동"]
        D1[카피 자동생성\nSlack 복붙 준비] --> D2[에밀리: 리틀리·\n대화방소식·\n웰컴메시지 설정]
    end

    subgraph CH5["⑤ 인스타그램 🔴 수동"]
        E1[이미지+캡션\n자동생성] --> E2[에밀리: 인스타 수동 게시]
    end

    style ENGINE fill:#1a1a2e,stroke:#e8a020,color:#fff
    style CHANNELS fill:#0f1923,stroke:#444,color:#fff
    style CH1 fill:#0d2b1a,stroke:#22c55e,color:#fff
    style CH2 fill:#2b1f00,stroke:#f59e0b,color:#fff
    style CH3 fill:#2b1111,stroke:#ef4444,color:#fff
    style CH4 fill:#2b1111,stroke:#ef4444,color:#fff
    style CH5 fill:#2b1111,stroke:#ef4444,color:#fff
    style A fill:#e8a020,color:#000,font-weight:bold
    style G fill:#1e3a5f,stroke:#60a5fa,color:#fff
```

---

## 타임라인 뷰 (공유회 1회 기준)

```mermaid
gantt
    title 공유회 CRM 타임라인 (D-day 기준)
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

    section 준비
    📥 크롤링 + 콘텐츠 생성 (D-7)    :done, prep, 2026-04-06, 1d
    Slack 전달 + 에밀리 검토 (D-7)   :done, review, 2026-04-06, 1d

    section D-5 오픈
    ① 오픈알림톡 자동발송             :crit, a1, 2026-04-08, 1d
    카플친 오픈 배너                  :a2, 2026-04-08, 1d
    오카방 공지 (수동)                :a3, 2026-04-08, 1d
    온드미디어 세팅 (수동)            :a4, 2026-04-08, 1d

    section D-3 리마인드
    ② 오픈리마인드 알림톡 자동발송    :crit, b1, 2026-04-10, 1d
    카플친 리마인드 배너              :b2, 2026-04-10, 1d
    인스타 캐러셀 (수동)              :b3, 2026-04-10, 1d
    오카방 리마인드 (수동)            :b4, 2026-04-10, 1d

    section D-1 마감
    ③ D-1 리마인드 알림톡             :crit, c1, 2026-04-12, 1d
    ⑤ 할인쿠폰 알림톡                :crit, c2, 2026-04-12, 1d
    카플친 마감 배너                  :c3, 2026-04-12, 1d
    오카방 마감 (수동)                :c4, 2026-04-12, 1d

    section D-day
    ④ 당일리마인드 알림톡             :crit, d1, 2026-04-13, 1d
    ⑥ 입장링크 알림톡                :crit, d2, 2026-04-13, 1d
    ⑦ 시작알림 알림톡                :crit, d3, 2026-04-13, 1d
    ⑧ 혜택안내 알림톡                :crit, d4, 2026-04-13, 1d

    section D+3 사후
    ⑨ VOD 발송 알림톡 자동발송        :crit, e1, 2026-04-16, 1d
```

---

## 자동화 레벨 요약

```mermaid
%%{init: {"theme": "dark"}}%%
quadrantChart
    title 채널별 자동화 수준 vs 발송 규모
    x-axis 에밀리 개입 적음 --> 에밀리 개입 많음
    y-axis 발송 규모 작음 --> 발송 규모 큼
    quadrant-1 핵심 자동화 채널
    quadrant-2 대규모 수동
    quadrant-3 소규모 수동
    quadrant-4 고효율 자동화
    알림톡: [0.05, 0.95]
    카플친: [0.35, 0.75]
    인스타: [0.75, 0.30]
    오카방: [0.80, 0.40]
    온드미디어: [0.70, 0.20]
```

---

## 기술 스택 연결도

```mermaid
graph LR
    subgraph EMILY["👩 에밀리"]
        CMD["CRM 시작해줘 URL"]
    end

    subgraph CLAUDE["🤖 Claude Code"]
        CRAWL["크롤링\n+ 파싱"]
        GEN["전채널\n카피 생성"]
        BANNER["배너\n이미지 생성"]
    end

    subgraph N8N["⚡ n8n"]
        CRON["크론\n스케줄러"]
        MODAL["Slack\n승인 모달"]
    end

    subgraph INFRA["🏗️ 인프라"]
        SUPABASE[("Supabase\n회원 6,829명")]
        SOLAPI["SOLAPI\n카카오 발송 API"]
        SLACK["Slack\n승인·카피 전달"]
        GIT["Git·GitHub\n노트북 동기화"]
    end

    CMD --> CRAWL
    CRAWL --> SUPABASE
    CRAWL --> GEN
    GEN --> BANNER
    GEN --> SLACK
    BANNER --> SLACK
    SLACK --> MODAL
    MODAL --> CRON
    CRON --> SUPABASE
    CRON --> SOLAPI
    SOLAPI -->|알림톡 9종| EMILY

    style EMILY fill:#1e3a5f,stroke:#60a5fa,color:#fff
    style CLAUDE fill:#1a1a2e,stroke:#e8a020,color:#fff
    style N8N fill:#1a2e1a,stroke:#22c55e,color:#fff
    style INFRA fill:#1a1a1a,stroke:#666,color:#fff
```

---

## 핵심 지표

| 항목 | Before | After |
|------|--------|-------|
| 공유회 1회 CRM 준비 시간 | **2시간** | **30분** |
| 알림톡 종수 | 9종 | 9종 (완전 자동) |
| 대상 회원 수 | 6,829명 | 6,829명 |
| 채널 수 | 5채널 | 5채널 |
| 메시지 총 발송 수 | 20+ 건 | 20+ 건 |
| 에밀리 직접 입력 | 모든 카피 | 수동 채널 복붙만 |

> **자동화 레벨**: 🟢 알림톡 (100% 자동) | 🟡 카플친 (카피·이미지 자동, 발송 수동 15분) | 🔴 오카방·온드미디어·인스타 (카피 자동, 게시 수동)
