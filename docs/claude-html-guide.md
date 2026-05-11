# Claude 채팅 HTML 생성 지침 — 어드민 편집기 호환용

## 어드민 편집기 현황
- 붙여넣은 HTML은 **하나의 contentEditable 편집 영역**에서 직접 수정됨
- 서식 툴바로 볼드/이탤릭/텍스트 크기/링크/목록/정렬/이미지 삽입 가능
- 텍스트를 클릭해서 바로 수정, 이미지는 커서 위치에 삽입
- 저장 시 편집 영역의 innerHTML이 그대로 `i_detail_html`에 저장됨

## HTML 작성 규칙

### 1. 모든 스타일은 인라인으로
```html
<!-- ✅ 좋음 -->
<p style="font-size:15px; color:#666;">텍스트</p>

<!-- ❌ 나쁨 — class, CSS 변수 사용 금지 -->
<p class="text-gray-500">텍스트</p>
```
Tailwind preflight가 기본 스타일을 리셋하므로, font-size/color/margin/padding 모두 인라인으로 명시해야 함.

### 2. 이미지는 인라인 스타일로 크기 지정
```html
<!-- 풀폭 스크린샷 — width 지정 안 하면 CSS 기본 100%로 표시됨 -->
<div style="text-align:center; margin:24px 0;">
  <img src="URL" style="max-width:100%; border-radius:12px;" />
</div>

<!-- 프로필 사진 등 작은 이미지 — 반드시 width/height 명시 -->
<img src="URL" style="width:80px; height:80px; border-radius:50%; object-fit:cover;" />
```
CSS에서 `display: block`, `width: 100%` 등을 강제하지 않으므로, 인라인 스타일이 그대로 적용됨. 작은 이미지는 반드시 크기를 지정해야 커지지 않음.

### 3. 이미지 슬롯(placeholder) 사용하지 않기
```html
<!-- ❌ 이전 방식 — dashed border placeholder -->
<div style="border:2px dashed #ccc;">이미지를 넣어주세요</div>

<!-- ✅ 새 방식 — 이미지가 필요한 자리에 주석만 -->
<!-- 여기에 이미지 삽입 예정 -->
```
어드민 편집기에서 커서 위치에 직접 이미지를 삽입할 수 있으므로, placeholder 불필요.

### 4. 하나의 wrapper div로 감싸기
```html
<div style="font-family:'Pretendard', sans-serif; color:#444; background:#FFFFFF;">
  <section>...</section>
  <section>...</section>
</div>
```
저장 시 자동으로 wrapper가 감싸지지만, 원본에도 있으면 스타일 일관성 유지.

### 5. flex/grid 레이아웃은 인라인 스타일로
```html
<div style="display:flex; align-items:center; gap:16px;">
  <img src="..." style="width:80px; height:80px; border-radius:50%;" />
  <div>
    <p style="font-size:18px; font-weight:700;">이름</p>
    <p style="font-size:14px; color:#888;">설명</p>
  </div>
</div>
```

### 6. 링크는 target, rel 포함
```html
<a href="https://..." target="_blank" rel="noopener noreferrer" 
   style="color:#0A0A0A; text-decoration:underline;">링크 텍스트</a>
```
CSS에서 `color: inherit; text-decoration: inherit;`로 리셋되므로 인라인 스타일 필수.

### 7. 리스트는 인라인 스타일로 마커 지정
```html
<ul style="list-style:none; padding:0;">
  <li style="padding-left:20px; position:relative;">
    <span style="position:absolute; left:0;">✓</span> 항목
  </li>
</ul>
```
CSS에서 `list-style: none; padding: 0;`으로 리셋되므로.

### 8. 편집 가능한 텍스트 구조 유지
```html
<!-- ✅ 좋음 — 텍스트가 직접 수정 가능 -->
<h2 style="font-size:28px; font-weight:700;">제목 텍스트</h2>
<p style="font-size:15px;">본문 텍스트</p>

<!-- ❌ 나쁨 — 중첩이 너무 깊으면 편집 어려움 -->
<div><div><div><span><b>텍스트</b></span></div></div></div>
```
