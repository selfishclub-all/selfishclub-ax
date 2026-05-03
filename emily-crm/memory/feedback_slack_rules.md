---
name: Slack 발송 규칙
description: Slack MCP 사용 시 젬마 계정으로 보내지 않기, 크론 자동발송 금지
type: feedback
---

## Slack MCP = 젬마 계정 — 젬마 이름으로 보내지 말 것

Slack MCP가 젬마(신주혜) 계정에 연결되어 있어서, MCP로 메시지 보내면 젬마 이름으로 나감.
**앞으로 젬마 이름으로 Slack 메시지 보내는 일이 없어야 함.**

**Why:** 에밀리가 "앞으로 젬마라는 이름으로 슬랙보내는게 없게해"라고 명확히 지시.
**How to apply:**
- Slack 메시지는 봇 토큰(`공유회-crm-bot` B0AMWB9JRA7)으로만 보낼 것
- Slack MCP 직접 사용 자제 (젬마 계정이므로)

## Claude Code 크론 자동발송 금지

Claude Code가 크론처럼 돌면서 자동으로 Slack에 카피를 보내면 안 됨.
**Claude Code 꺼지면 안 돌아감 = 진짜 자동화 아님.**

**Why:** 에밀리가 갑자기 슬랙에 오카방 카피 자동생성 메시지가 온 걸 보고 혼란. 이건 의도한 동작이 아님.
**How to apply:**
- 카피 생성/전달은 "CRM 시작해줘" 트리거로만 실행
- Claude Code 세션이 크론처럼 자동으로 Slack 발송하는 로직 만들지 말 것
- 자동화가 필요하면 n8n에서 처리 (Claude Code 의존 X)
