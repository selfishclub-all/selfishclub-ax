# 셀피쉬클럽 상세 페이지 디자인 가이드

> 이 가이드를 따라 HTML 상세 페이지를 생성한다.
> 모든 스타일은 인라인으로 작성하고, 외부 CSS 없이 단독 동작해야 한다.

---

## 1. 컬러

| 이름 | Hex | 용도 |
|---|---|---|
| Black | `#0A0A0A` | 메인 텍스트, 히어로 배경, Footer 배경 |
| White | `#FFFFFF` | 본문 배경, 히어로 텍스트 |
| Selfish Yellow | `#E2E545` | 포인트 컬러, CTA, 강조, 체크마크, 세로 라인 |
| Warm Gray | `#FAFAF8` | 카드 배경, 섹션 배경 |
| Mid Gray | `#888888` | 라벨, 보조 텍스트 |
| Light Gray | `#E5E5E5` | 구분선, 테두리 |
| Dark Text | `#444444` | 본문 텍스트 |
| Muted Text | `#666666` | 설명 텍스트 |

---

## 2. 타이포그래피

```
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

| 용도 | 크기 | 굵기 | 행간 |
|---|---|---|---|
| 히어로 타이틀 | 36~48px | bold (700) | 1.1~1.2 |
| 섹션 타이틀 | 20~24px | bold (700) | 1.3 |
| 섹션 라벨 | 11px, uppercase, letter-spacing: 0.3em | medium (500) | 1.4 |
| 본문 | 15~16px | normal (400) | 1.6 |
| 카드 내 텍스트 | 14px | normal (400) | 1.5 |
| 번호 (01, 02) | 14px | bold (700) | - |

---

## 3. 레이아웃

- 전체 최대 너비: `max-width: 768px; margin: 0 auto;`
- 좌우 패딩: 모바일 `20px`, 데스크톱 `40px`
- 섹션 간 간격: `padding: 56px 0;`
- 카드 모서리: `border-radius: 12px;`
- 카드 테두리: `border: 1px solid #E5E5E5;`
- 카드 패딩: `padding: 20px;`

---

## 4. 섹션별 HTML 코드 샘플

### 4-1. 히어로

```html
<section style="background: #0A0A0A; padding: 80px 20px 60px; text-align: center;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #E2E545; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 16px;">이기적공유회</p>
    <h1 style="font-family: 'Pretendard', sans-serif; font-size: 36px; font-weight: 700; color: #FFFFFF; line-height: 1.2; margin-bottom: 16px;">
      히어로 Hook 문구 한 줄
    </h1>
    <p style="font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 8px;">2026. 05. 20 (화) 19:00 — 온라인</p>
    <p style="font-size: 16px; color: rgba(255,255,255,0.5);">무료</p>
  </div>
</section>
```

### 4-2. Summary

```html
<section style="background: #FFFFFF; padding: 56px 20px;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #888; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 12px;">About</p>
    <p style="font-size: 17px; color: #444; line-height: 1.8;">
      소개 문구 2~4문장. 문제 제기 → 공감 → 이 공유회의 존재 이유.
    </p>
  </div>
</section>
```

### 4-3. 이미지/GIF 슬롯

```html
<div style="max-width: 768px; margin: 0 auto; padding: 0 20px;">
  <div style="background: #FAFAF8; border: 2px dashed #E5E5E5; border-radius: 12px; padding: 40px 20px; text-align: center; margin: 8px 0;">
    <p style="font-size: 14px; color: #888; margin-bottom: 8px;">📷 이미지 추천</p>
    <p style="font-size: 14px; color: #444;">구체적인 이미지/GIF 설명 — 어떤 장면을, 어떤 형태로</p>
  </div>
</div>
```

### 4-4. Curriculum

```html
<section style="background: #FFFFFF; padding: 56px 20px;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #888; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 12px;">Curriculum</p>
    <h2 style="font-size: 22px; font-weight: 700; color: #0A0A0A; margin-bottom: 32px;">커리큘럼</h2>

    <!-- PART 1 -->
    <div style="border-left: 3px solid #E2E545; padding-left: 24px; margin-bottom: 32px;">
      <h3 style="font-size: 16px; font-weight: 600; color: #0A0A0A; margin-bottom: 12px;">Session 01 — 세션 제목 (공유자명)</h3>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="font-size: 14px; color: #666; padding: 4px 0; display: flex; align-items: flex-start; gap: 8px;">
          <span style="color: #E2E545; flex-shrink: 0;">✔️</span> 항목 1
        </li>
        <li style="font-size: 14px; color: #666; padding: 4px 0; display: flex; align-items: flex-start; gap: 8px;">
          <span style="color: #E2E545; flex-shrink: 0;">✔️</span> 항목 2
        </li>
        <li style="font-size: 14px; color: #666; padding: 4px 0; display: flex; align-items: flex-start; gap: 8px;">
          <span style="color: #E2E545; flex-shrink: 0;">✔️</span> 항목 3
        </li>
      </ul>
    </div>

    <!-- PART 2 (반복) -->
  </div>
</section>
```

### 4-5. Speakers (공유자 소개)

```html
<section style="background: #FAFAF8; padding: 56px 20px;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #888; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 12px;">Speakers</p>
    <h2 style="font-size: 22px; font-weight: 700; color: #0A0A0A; margin-bottom: 32px;">공유자</h2>

    <!-- 공유자 카드 -->
    <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
      <!-- 이미지 슬롯 -->
      <div style="width: 80px; height: 80px; border-radius: 50%; background: #E5E5E5; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 12px; color: #888;">📷</span>
      </div>
      <p style="font-size: 16px; font-weight: 700; color: #0A0A0A; margin-bottom: 4px;">공유자 이름</p>
      <p style="font-size: 13px; color: #888; margin-bottom: 12px;">역할/타이틀</p>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 16px;">소개 2~3문장</p>

      <!-- Before → After -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="background: #FAFAF8; border-radius: 8px; padding: 16px;">
          <p style="font-size: 11px; color: #888; letter-spacing: 0.1em; margin-bottom: 6px;">BEFORE</p>
          <p style="font-size: 13px; color: #444; line-height: 1.5;">6주 전 상태 구체적 묘사</p>
        </div>
        <div style="background: #0A0A0A; border-radius: 8px; padding: 16px;">
          <p style="font-size: 11px; color: #E2E545; letter-spacing: 0.1em; margin-bottom: 6px;">AFTER</p>
          <p style="font-size: 13px; color: #FFFFFF; line-height: 1.5;">지금 상태 구체적 묘사</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 4-6. Target (추천 대상)

```html
<section style="background: #FFFFFF; padding: 56px 20px;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #888; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 12px;">Who is this for</p>
    <h2 style="font-size: 22px; font-weight: 700; color: #0A0A0A; margin-bottom: 24px;">이런 분께 추천해요</h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div style="background: #FAFAF8; border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 14px; font-weight: 700; color: #E2E545; flex-shrink: 0;">01</span>
        <p style="font-size: 14px; color: #444;">구체적 상황 묘사</p>
      </div>
      <div style="background: #FAFAF8; border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 14px; font-weight: 700; color: #E2E545; flex-shrink: 0;">02</span>
        <p style="font-size: 14px; color: #444;">구체적 상황 묘사</p>
      </div>
      <div style="background: #FAFAF8; border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 14px; font-weight: 700; color: #E2E545; flex-shrink: 0;">03</span>
        <p style="font-size: 14px; color: #444;">구체적 상황 묘사</p>
      </div>
      <div style="background: #FAFAF8; border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 14px; font-weight: 700; color: #E2E545; flex-shrink: 0;">04</span>
        <p style="font-size: 14px; color: #444;">구체적 상황 묘사</p>
      </div>
    </div>
  </div>
</section>
```

### 4-7. Benefits (혜택)

```html
<section style="background: #FFFFFF; padding: 56px 20px;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #888; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 12px;">Benefits</p>
    <h2 style="font-size: 22px; font-weight: 700; color: #0A0A0A; margin-bottom: 24px;">참여 혜택</h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div style="background: #0A0A0A; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 12px;">
        <span style="color: #E2E545; font-size: 18px;">✓</span>
        <p style="font-size: 14px; color: #FFFFFF;">혜택 항목</p>
      </div>
    </div>
  </div>
</section>
```

### 4-8. Timetable (진행 순서)

```html
<section style="background: #FAFAF8; padding: 56px 20px;">
  <div style="max-width: 768px; margin: 0 auto;">
    <p style="font-size: 11px; color: #888; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 12px;">Timetable</p>
    <h2 style="font-size: 22px; font-weight: 700; color: #0A0A0A; margin-bottom: 24px;">진행 순서</h2>

    <div style="border-left: 2px solid #E2E545; padding-left: 24px;">
      <div style="margin-bottom: 24px;">
        <p style="font-size: 13px; font-weight: 700; color: #E2E545; margin-bottom: 4px;">19:00 — 19:30</p>
        <p style="font-size: 15px; font-weight: 600; color: #0A0A0A; margin-bottom: 4px;">세션 제목</p>
        <p style="font-size: 13px; color: #888;">간단 설명</p>
      </div>
    </div>
  </div>
</section>
```

---

## 5. 반응형 규칙

- 기본: 모바일 (1컬럼)
- 그리드 2컬럼 (Target, Benefits, Speakers): `@media (min-width: 640px)`에서 활성화
- 히어로 타이틀: 모바일 28px → 데스크톱 42px
- 단, Artifact에서는 미디어 쿼리가 제한적이므로, **기본을 모바일로 두되 grid는 2컬럼 유지**

---

## 6. 이미지/GIF 슬롯 규칙

- 섹션과 섹션 사이, 또는 섹션 내부에 배치
- 점선 테두리(`border: 2px dashed #E5E5E5`)로 플레이스홀더 표시
- 어떤 이미지를 넣으면 좋을지 **구체적으로** 추천
  - 나쁜 예: "관련 이미지"
  - 좋은 예: "공유자가 클로드코드 앱에서 실제로 코드를 생성하는 화면 스크린샷 — 터미널 없이 GUI로 작동하는 모습이 드러나게"
- 전체 페이지에 최소 5개, 최대 8개 배치
- 공유자 프로필 사진 슬롯은 원형 (80x80px, border-radius: 50%)

---

## 7. HTML 출력 규칙

1. **Artifact(디자인 미리보기)로 생성** — 사용자가 실시간으로 보고 수정 가능
2. **인라인 스타일만 사용** — 외부 CSS, class 없이 단독 동작
3. **FAQ/공통 블록 제외** — 어드민에서 자동 추가되므로 HTML에 포함하지 않음
4. 히어로부터 Benefits까지만 생성
5. 이미지 슬롯은 플레이스홀더로 표시 (실제 이미지 URL 넣지 않음)
6. 코드 블록 없이 완성된 HTML로 바로 복사 가능하게
