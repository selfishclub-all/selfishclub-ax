# DESIGN.md — 셀피쉬클럽 디자인 시스템

## 브랜드 아이덴티티

셀피쉬클럽은 AI로 일하는 방식을 바꾸는 실전 커뮤니티.
"이기적 공유"라는 철학 아래, 날것의 경험을 거침없이 나누는 에너지가 핵심.

### 브랜드 키워드
- **냅-다** (bias-to-action)
- **쌩-날** (날것의 실전 경험)
- **이기적 공유** (핵심 철학)
- **디지털 잡부** (멀티 스킬 정체성)
- **우당탕탕** (혼란스럽지만 해내는)

---

## 컬러 시스템

### Primary

| 이름 | Hex | 용도 |
|---|---|---|
| Black | `#0A0A0A` | 메인 텍스트, 주요 배경 |
| White | `#FFFFFF` | 배경, 반전 텍스트 |
| Selfish Yellow | `#FFD700` | 브랜드 포인트, CTA, 강조 |

### Secondary

| 이름 | Hex | 용도 |
|---|---|---|
| Warm Gray | `#F5F5F0` | 섹션 배경, 카드 배경 |
| Mid Gray | `#888888` | 보조 텍스트, 비활성 상태 |
| Light Gray | `#E5E5E5` | 구분선, 테두리 |

### Accent

| 이름 | Hex | 용도 |
|---|---|---|
| Electric Blue | `#3B82F6` | 링크, 인터랙티브 요소 |
| Success Green | `#22C55E` | 성공 상태 |
| Error Red | `#EF4444` | 에러 상태 |
| Warning Orange | `#F59E0B` | 경고 상태 |

---

## 타이포그래피

### 폰트

- **한글:** Pretendard (Variable)
- **영문/숫자:** Geist (기본 내장)
- **모노스페이스:** Geist Mono (코드 블록)

### 스케일

| 이름 | 크기 | 행간 | 용도 |
|---|---|---|---|
| Display | 48px / 3rem | 1.1 | 히어로 타이틀 |
| H1 | 36px / 2.25rem | 1.2 | 페이지 타이틀 |
| H2 | 28px / 1.75rem | 1.3 | 섹션 타이틀 |
| H3 | 22px / 1.375rem | 1.4 | 카드 타이틀 |
| Body Large | 18px / 1.125rem | 1.6 | 강조 본문 |
| Body | 16px / 1rem | 1.6 | 기본 본문 |
| Body Small | 14px / 0.875rem | 1.5 | 보조 텍스트 |
| Caption | 12px / 0.75rem | 1.4 | 라벨, 캡션 |

---

## 레이아웃

### Grid

- **최대 너비:** 1200px
- **컬럼:** 12컬럼
- **거터:** 24px
- **페이지 좌우 패딩:** 모바일 16px / 태블릿 32px / 데스크톱 48px

### Breakpoints

| 이름 | 너비 | Tailwind |
|---|---|---|
| Mobile | < 640px | 기본 |
| Tablet | >= 640px | `sm:` |
| Desktop | >= 1024px | `lg:` |
| Wide | >= 1280px | `xl:` |

### Spacing Scale

Tailwind 기본 spacing 활용. 주요 사용 값:
- **4px** (1) — 아이콘과 텍스트 간격
- **8px** (2) — 요소 내부 밀착
- **16px** (4) — 카드 내부 패딩
- **24px** (6) — 컴포넌트 간 간격
- **48px** (12) — 섹션 간 간격
- **80px** (20) — 대섹션 간 간격

---

## 컴포넌트 스타일 가이드

### Button

```
Primary:   bg-[#0A0A0A] text-white hover:bg-[#222] — 주요 CTA
Secondary: border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white — 보조 액션
Accent:    bg-[#FFD700] text-[#0A0A0A] hover:bg-[#E5C200] — 강조 CTA
Ghost:     text-[#0A0A0A] hover:bg-[#F5F5F0] — 텍스트 버튼

크기: sm(h-8 px-3 text-sm), md(h-10 px-5 text-base), lg(h-12 px-7 text-lg)
모서리: rounded-lg (8px)
```

### Card

```
기본:     bg-white border border-[#E5E5E5] rounded-2xl p-6
호버:     hover:shadow-lg hover:-translate-y-1 transition-all duration-200
다크 배경: bg-[#0A0A0A] text-white border-none
```

### Badge / Tag

```
기본:    bg-[#F5F5F0] text-[#0A0A0A] rounded-full px-3 py-1 text-sm
강조:    bg-[#FFD700] text-[#0A0A0A] rounded-full px-3 py-1 text-sm
상태:    각 상태 컬러 + bg-opacity-10
```

### Input / Form

```
기본:    w-full h-12 px-4 border border-[#E5E5E5] rounded-lg focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] outline-none transition
에러:    border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]
라벨:    text-sm font-medium text-[#0A0A0A] mb-2
```

---

## 페이지 레이아웃 패턴

### 공통 Header

```
높이: h-16 (64px)
구성: 로고(좌) | 네비게이션(중) | CTA 버튼(우)
모바일: 햄버거 메뉴
스타일: bg-white/80 backdrop-blur-md border-b border-[#E5E5E5] sticky top-0 z-50
```

### 공통 Footer

```
구성: 로고 + 소개 | 메뉴 링크 | 소셜 링크 | 법인 정보(커넥테리안)
스타일: bg-[#0A0A0A] text-white py-16
```

### 히어로 섹션

```
높이: min-h-[60vh] ~ min-h-screen
구성: 큰 타이틀 + 서브텍스트 + CTA 버튼
스타일: 다크 배경(#0A0A0A) + 포인트 컬러(#FFD700) 조합
```

### 목록 페이지 (공유회, 챌린지, 블로그)

```
구성: 페이지 타이틀 + 필터/탭 + 카드 그리드
그리드: 모바일 1컬럼 / 태블릿 2컬럼 / 데스크톱 3컬럼
```

### 상세 페이지

```
구성: 히어로(이미지+타이틀) → 본문 → 신청/CTA → FAQ
본문 최대 너비: max-w-3xl mx-auto
```

---

## 모션 & 인터랙션

- **기본 트랜지션:** `transition-all duration-200 ease-out`
- **호버 리프트:** `hover:-translate-y-1 hover:shadow-lg`
- **페이드 인:** 스크롤 시 `opacity-0 → opacity-100, translateY(20px) → 0`
- **과도한 애니메이션 지양** — 깔끔하고 빠른 인터랙션 선호

---

## 톤앤매너 (콘텐츠)

### 말투
- 반말 / 친근체
- 고에너지, 실전 중심
- 동료 대 동료

### 절대 쓰지 말 것
- "AI로 업무 효율을 높이세요"
- "함께 성장해요"
- 습니다체
- 에이전시/SaaS 말투

---

## 다크 모드

현재 버전에서는 **라이트 모드만 지원**. 다크 모드는 추후 검토.
(히어로, Footer 등 특정 섹션에서 다크 배경 사용은 별도)
