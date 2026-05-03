// AAA 공유회(iid_1002) S1~S8 세그먼트 모수 계산
// 우선순위 체인: S1 > S2 > S3 > S4 > S5 > S6 > S7 > S8
// 각 세그먼트는 이전 단계에서 배정된 사람 제외

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const https = require('https')
const path = require('path')
const { execSync } = require('child_process')

const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

// ───────── 설정 ─────────
const AAA_IID = 'iid_1002'
const TEST_IIDS = ['iid_999', 'iid_1000', 'iid_1001', 'iid_test']
const CLAUDE_SHARING = ['iid_63', 'iid_69', 'iid_72', 'iid_79']  // 클로드 공유회 (AAA 직계)
const CLAUDE_WORKSHOP = ['iid_70', 'iid_71', 'iid_73', 'iid_75', 'iid_76', 'iid_78', 'iid_80']
const AI_VIDEO = ['iid_74', 'iid_77']
const SURVEY_PATH = '/Users/juhee/Downloads/AX프로젝트 액션의 모든 것 - 공유회부터 스폰지클럽까지.xlsx'

// ───────── Supabase helper ─────────
function qPage(path, offset = 0, limit = 1000) {
  return new Promise((resolve, reject) => {
    const sep = path.includes('?') ? '&' : '?'
    const full = `/rest/v1/${path}${sep}offset=${offset}&limit=${limit}`
    const req = https.request({
      hostname: 'mryzkyvxcjeqjkdhlkeo.supabase.co', path: full, method: 'GET',
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    }, res => {
      let d = ''; res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch(e) { resolve({error: d, status: res.statusCode}) } })
    })
    req.on('error', reject); req.end()
  })
}

async function fetchAll(path) {
  const all = []; let offset = 0
  while (true) {
    const rows = await qPage(path, offset, 1000)
    if (!Array.isArray(rows)) { console.error('쿼리 에러:', rows); return all }
    if (rows.length === 0) break
    all.push(...rows)
    if (rows.length < 1000) break
    offset += 1000
  }
  return all
}

// 전화번호 정규화 (숫자만)
function normPhone(p) {
  if (!p) return null
  const s = String(p).replace(/\D/g, '')
  if (!s) return null
  // 10으로 시작하면 0 붙이기 (DB는 '1012345678' 형태일 가능성)
  if (s.length === 10 && s.startsWith('1')) return '0' + s
  return s
}

// ───────── 설문 CSV 파싱 (python 호출) ─────────
function parseSurveyXlsx() {
  const py = `
import json, sys
from openpyxl import load_workbook
wb = load_workbook('${SURVEY_PATH}', data_only=True)
ws = wb['설문참여자']
result = []
for r in ws.iter_rows(min_row=2, values_only=True):
    name, phone, email, phone_ok, email_ok, memo = r[0], r[1], r[2], r[3], r[4], r[5]
    if not (name or phone): continue
    result.append({
        'name': name or '',
        'phone': str(phone or ''),
        'email': email or '',
        'phone_ok': phone_ok,
        'memo': memo or ''
    })
print(json.dumps(result, ensure_ascii=False))
`
  const out = execSync(`python3 -c "${py.replace(/"/g, '\\"')}"`, { maxBuffer: 10*1024*1024 }).toString()
  return JSON.parse(out)
}

// ───────── 메인 ─────────
async function main() {
  console.log('=== 데이터 로드 ===')
  const members = await fetchAll("member?select=u_name,u_phone,u_email,u_marketing_agree_tf,u_item_tf,u_recent_date,u_participate_iids&u_membership_tf=eq.true")
  console.log(`멤버십 전체: ${members.length}`)

  // 전화번호 있음 + 정규화
  const memBase = members
    .filter(m => m.u_phone && String(m.u_phone).trim())
    .map(m => ({ ...m, _phone: normPhone(m.u_phone) }))
    .filter(m => m._phone)
  console.log(`전화번호 있음: ${memBase.length}`)

  // 중복 전화 제거 (혹시 동일 번호 여러 row)
  const byPhone = new Map()
  for (const m of memBase) {
    if (!byPhone.has(m._phone)) byPhone.set(m._phone, m)
  }
  const base = [...byPhone.values()]
  console.log(`고유 전화번호: ${base.length}`)
  console.log()

  // ───────── 공통 제외: AAA 신청자 ─────────
  console.log('=== 공통 제외 ===')
  const aaaEvent = await fetchAll(`event?select=u_name,u_phone&iid=eq.${AAA_IID}`)
  const aaaPurchase = await fetchAll(`purchase?select=u_name,u_phone,p_cancel_amount&iid=eq.${AAA_IID}`)
  const aaaPurchaseLive = aaaPurchase.filter(r => r.p_cancel_amount === null || r.p_cancel_amount === 0)
  const aaaPhones = new Set([
    ...aaaEvent.map(r => normPhone(r.u_phone)).filter(Boolean),
    ...aaaPurchaseLive.map(r => normPhone(r.u_phone)).filter(Boolean),
  ])
  console.log(`AAA 신청자 (event+purchase live 합): ${aaaPhones.size}명`)

  // 공통 제외 적용
  const afterExclude = base.filter(m => !aaaPhones.has(m._phone))
  console.log(`공통 제외 후 모수: ${afterExclude.length}`)
  console.log()

  // ───────── 세그먼트 정의에 필요한 집계 ─────────
  console.log('=== 보조 데이터 로드 ===')
  // 각 iid 그룹 참여자 전화번호
  async function phonesForIids(iids) {
    const orClause = iids.map(i => `iid.eq.${i}`).join(',')
    const p = await fetchAll(`purchase?select=u_phone,p_cancel_amount&or=(${orClause})`)
    const e = await fetchAll(`event?select=u_phone&or=(${orClause})`)
    const pLive = p.filter(r => r.p_cancel_amount === null || r.p_cancel_amount === 0)
    return new Set([
      ...pLive.map(r => normPhone(r.u_phone)).filter(Boolean),
      ...e.map(r => normPhone(r.u_phone)).filter(Boolean)
    ])
  }
  const claudeSharingPhones = await phonesForIids(CLAUDE_SHARING)
  const claudeWorkshopPhones = await phonesForIids(CLAUDE_WORKSHOP)
  const aiVideoPhones = await phonesForIids(AI_VIDEO)
  console.log(`클로드 공유회(S2 후보): ${claudeSharingPhones.size}`)
  console.log(`클로드 워크숍(S3 후보): ${claudeWorkshopPhones.size}`)
  console.log(`AI 영상(S4 후보): ${aiVideoPhones.size}`)

  // 공유회 참여 횟수 (u_participate_iids 배열에서 sharing iid 카운트)
  // i_type=sharing 전체 iid
  const sharingItems = await fetchAll("item?select=iid&i_type=eq.sharing")
  const sharingIids = new Set(sharingItems.map(s => s.iid).filter(i => !TEST_IIDS.includes(i)))
  console.log(`sharing iid 전체: ${sharingIids.size}`)

  // 설문 CSV 로드
  console.log('설문 CSV 파싱...')
  const survey = parseSurveyXlsx()
  const surveyAlimtalk = survey.filter(s => s.phone_ok === 1 && s.memo !== '문자발송')
  const surveyPhones = new Set(surveyAlimtalk.map(s => normPhone(s.phone)).filter(Boolean))
  console.log(`설문 알림톡 가능자: ${surveyAlimtalk.length} → 고유 번호 ${surveyPhones.size}`)
  console.log()

  // ───────── 우선순위 체인 배정 ─────────
  console.log('=== 세그먼트 우선순위 체인 배정 ===')
  const assigned = new Map()  // phone → segment

  function assign(seg, phone) {
    if (!assigned.has(phone)) assigned.set(phone, seg)
  }

  // S1: 설문자 (설문CSV ∩ 멤버십 − AAA신청자)
  let s1 = 0
  for (const m of afterExclude) {
    if (surveyPhones.has(m._phone)) { assign('S1', m._phone); s1++ }
  }
  console.log(`S1 (설문자): ${s1}`)

  // S2: 클로드 공유회 경험자
  let s2 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    if (claudeSharingPhones.has(m._phone)) { assign('S2', m._phone); s2++ }
  }
  console.log(`S2 (클로드 공유회): ${s2}`)

  // S3: 클로드 워크숍만 (S2 아님)
  let s3 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    if (claudeWorkshopPhones.has(m._phone)) { assign('S3', m._phone); s3++ }
  }
  console.log(`S3 (클로드 워크숍): ${s3}`)

  // S4: AI 영상
  let s4 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    if (aiVideoPhones.has(m._phone)) { assign('S4', m._phone); s4++ }
  }
  console.log(`S4 (AI 영상): ${s4}`)

  // S5: 공유회 3회+ (u_participate_iids에서 sharing 카운트)
  let s5 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    const parts = Array.isArray(m.u_participate_iids) ? m.u_participate_iids : []
    const sharingCount = parts.filter(i => sharingIids.has(i)).length
    if (sharingCount >= 3) { assign('S5', m._phone); s5++ }
  }
  console.log(`S5 (공유회 3회+): ${s5}`)

  // S6: 휴면 복귀 (u_recent_date > 90일 전)
  const now = new Date()
  const cutoff = new Date(now.getTime() - 90 * 86400 * 1000)
  let s6 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    if (!m.u_recent_date) continue
    const d = new Date(m.u_recent_date)
    if (d < cutoff) { assign('S6', m._phone); s6++ }
  }
  console.log(`S6 (휴면 복귀 >90일): ${s6}`)

  // S7: 첫 진입 (u_item_tf=false)
  let s7 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    if (m.u_item_tf === false) { assign('S7', m._phone); s7++ }
  }
  console.log(`S7 (첫 진입): ${s7}`)

  // S8: 나머지 (브로드)
  let s8 = 0
  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    assign('S8', m._phone); s8++
  }
  console.log(`S8 (브로드): ${s8}`)
  console.log()

  const total = s1+s2+s3+s4+s5+s6+s7+s8
  console.log(`합계: ${total} (afterExclude=${afterExclude.length}, 일치=${total===afterExclude.length})`)
  console.log()

  // ───────── 요약 저장 ─────────
  const summary = {
    generated_at: new Date().toISOString(),
    base: {
      membership_total: members.length,
      with_phone: base.length,
      aaa_applicants_excluded: aaaPhones.size,
      after_exclude: afterExclude.length
    },
    segments: { S1: s1, S2: s2, S3: s3, S4: s4, S5: s5, S6: s6, S7: s7, S8: s8, total }
  }
  const outDir = path.resolve(__dirname, '..', 'outputs', 'crm')
  require('fs').mkdirSync(outDir, { recursive: true })
  require('fs').writeFileSync(path.join(outDir, 'AAA_260421_summary.json'), JSON.stringify(summary, null, 2))
  console.log(`→ 저장: outputs/crm/AAA_260421_summary.json`)

  // 세그먼트 매핑도 저장 (다음 단계에서 실명단 추출용)
  const phoneToSeg = Object.fromEntries([...assigned])
  require('fs').writeFileSync(path.join(outDir, 'AAA_260421_phone_seg.json'), JSON.stringify(phoneToSeg))
  console.log(`→ 저장: outputs/crm/AAA_260421_phone_seg.json (${Object.keys(phoneToSeg).length}건)`)
}

main().catch(e => { console.error(e); process.exit(1) })
