#!/usr/bin/env python3
"""
backup-n8n.py — n8n 워크플로우 자동 백업

주요 워크플로우를 GET 해서 scripts/n8n-backup-{name}-{YYYYMMDD}.json 으로 저장.
같은 날 재실행 시 덮어쓰기.

사용법:
    python3 scripts/backup-n8n.py

    # cron 예시 (매주 월요일 09:00 KST):
    # 0 9 * * 1 cd /path/to/selfish_sharing && python3 scripts/backup-n8n.py

환경변수 (.env):
    N8N_URL
    N8N_API_KEY

백업 대상:
    - alimtalk-cron (R2FCAquAvaDPTkWP)
    - crm-trigger
    - kaplus-friendtalk
"""
import json
import os
import sys
import urllib.request
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"

# 백업 대상 (이름 → 워크플로우 ID)
# 실제 ID는 .env 또는 이 dict에서 관리
WORKFLOWS = {
    "alimtalk-cron": "R2FCAquAvaDPTkWP",
    # 추가 워크플로우 ID가 확정되면 여기에 추가
    # "crm-trigger": "...",
    # "kaplus-friendtalk": "...",
}


def load_env() -> dict:
    env = {}
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    # OS env가 우선
    for k in ("N8N_URL", "N8N_API_KEY"):
        if k in os.environ:
            env[k] = os.environ[k]
    return env


def fetch_workflow(url: str, api_key: str, wf_id: str) -> dict:
    endpoint = f"{url.rstrip('/')}/api/v1/workflows/{wf_id}"
    req = urllib.request.Request(endpoint, headers={"X-N8N-API-KEY": api_key})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    env = load_env()
    url = env.get("N8N_URL")
    key = env.get("N8N_API_KEY")
    if not url or not key:
        print("❌ .env에 N8N_URL / N8N_API_KEY 필요")
        return 1

    today = datetime.now().strftime("%Y%m%d")
    saved = []
    for name, wf_id in WORKFLOWS.items():
        out = SCRIPTS / f"n8n-backup-{name}-{today}.json"
        try:
            data = fetch_workflow(url, key, wf_id)
            out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            saved.append(out.name)
            print(f"✅ {name} → {out.name}")
        except Exception as e:
            print(f"❌ {name} 백업 실패: {e}")
            return 2

    print(f"\n💾 총 {len(saved)}개 백업 완료")
    return 0


if __name__ == "__main__":
    sys.exit(main())
