// AAA 공유회 세그먼트별 실명단 CSV + AAA 이미 신청자 별도 리스트 2개
// 산출물: outputs/crm/AAA_260421.xlsx (다음 단계에서 통합)
//       outputs/crm/rosters/S1.csv ~ S8.csv + aaa_applicants_survey.csv + aaa_applicants_nonsurvey.csv

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const https = require('https')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
const AAA_IID = 'iid_1002'
const TEST_IIDS = ['iid_999', 'iid_1000', 'iid_1001', 'iid_test']
const CLAUDE_SHARING = ['iid_63', 'iid_69', 'iid_72', 'iid_79']
const CLAUDE_WORKSHOP = ['iid_70', 'iid_71', 'iid_73', 'iid_75', 'iid_76', 'iid_78', 'iid_80']
const AI_VIDEO = ['iid_74', 'iid_77']
const SURVEY_PATH = '/Users/juhee/Downloads/AX프로젝트 액션의 모든 것 - 공유회부터 스폰지클럽까지.xlsx'

function qPage(p, offset = 0, limit = 1000) {
  return new Promise((resolve, reject) => {
    const sep = p.includes('?') ? '&' : '?'
    const full = `/rest/v1/${p}${sep}offset=${offset}&limit=${limit}`
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

async function fetchAll(p) {
  const all = []; let offset = 0
  while (true) {
    const rows = await qPage(p, offset, 1000)
    if (!Array.isArray(rows)) { console.error('쿼리 에러:', rows); return all }
    if (rows.length === 0) break
    all.push(...rows)
    if (rows.length < 1000) break
    offset += 1000
  }
  return all
}

function normPhone(p) {
  if (!p) return null
  const s = String(p).replace(/\D/g, '')
  if (!s) return null
  if (s.length === 10 && s.startsWith('1')) return '0' + s
  return s
}

function parseSurveyXlsx() {
  const py = `
import json
from openpyxl import load_workbook
wb = load_workbook('${SURVEY_PATH}', data_only=True)
ws = wb['설문참여자']
result = []
for r in ws.iter_rows(min_row=2, values_only=True):
    name, phone, email, phone_ok, email_ok, memo = r[0], r[1], r[2], r[3], r[4], r[5]
    if not (name or phone): continue
    result.append({'name': name or '', 'phone': str(phone or ''), 'email': email or '', 'phone_ok': phone_ok, 'memo': memo or ''})
print(json.dumps(result, ensure_ascii=False))
`
  return JSON.parse(execSync(`python3 -c "${py.replace(/"/g, '\\"')}"`, { maxBuffer: 10*1024*1024 }).toString())
}

function csvEscape(v) {
  if (v === null || v === undefined) return ''
  const s = String(v)
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
  return s
}
function toCsv(rows, headers) {
  const lines = [headers.join(',')]
  for (const r of rows) lines.push(headers.map(h => csvEscape(r[h])).join(','))
  return lines.join('\n') + '\n'
}

async function main() {
  console.log('=== 데이터 로드 ===')
  const members = await fetchAll("member?select=u_name,u_phone,u_email,u_marketing_agree_tf,u_item_tf,u_recent_date,u_participate_iids&u_membership_tf=eq.true")
  const memBase = members
    .filter(m => m.u_phone && String(m.u_phone).trim())
    .map(m => ({ ...m, _phone: normPhone(m.u_phone) }))
    .filter(m => m._phone)
  const byPhone = new Map()
  for (const m of memBase) if (!byPhone.has(m._phone)) byPhone.set(m._phone, m)
  const base = [...byPhone.values()]
  console.log(`멤버십 고유번호: ${base.length}`)

  // AAA 신청자 (event) — 설문자/비설문자 구분용
  const aaaEvent = await fetchAll(`event?select=u_name,u_phone,u_email,e_created_at&iid=eq.${AAA_IID}`)
  const aaaByPhone = new Map()
  for (const e of aaaEvent) {
    const p = normPhone(e.u_phone)
    if (p && !aaaByPhone.has(p)) aaaByPhone.set(p, e)
  }
  const aaaPhones = new Set(aaaByPhone.keys())
  console.log(`AAA 신청자 고유번호: ${aaaPhones.size}`)

  const afterExclude = base.filter(m => !aaaPhones.has(m._phone))
  console.log(`공통 제외 후: ${afterExclude.length}`)

  // 보조
  async function phonesForIids(iids) {
    const orC = iids.map(i => `iid.eq.${i}`).join(',')
    const p = await fetchAll(`purchase?select=u_phone,p_cancel_amount&or=(${orC})`)
    const e = await fetchAll(`event?select=u_phone&or=(${orC})`)
    const live = p.filter(r => r.p_cancel_amount === null || r.p_cancel_amount === 0)
    return new Set([...live, ...e].map(r => normPhone(r.u_phone)).filter(Boolean))
  }
  const claudeSharingPhones = await phonesForIids(CLAUDE_SHARING)
  const claudeWorkshopPhones = await phonesForIids(CLAUDE_WORKSHOP)
  const aiVideoPhones = await phonesForIids(AI_VIDEO)

  const sharingItems = await fetchAll("item?select=iid&i_type=eq.sharing")
  const sharingIids = new Set(sharingItems.map(s => s.iid).filter(i => !TEST_IIDS.includes(i)))

  // 설문 파싱 (해석A: 번호확인=1.0 & ≠문자발송)
  const survey = parseSurveyXlsx()
  const surveyAlimtalk = survey.filter(s => s.phone_ok === 1 && s.memo !== '문자발송')
  const surveyByPhone = new Map()
  for (const s of surveyAlimtalk) {
    const p = normPhone(s.phone)
    if (p && !surveyByPhone.has(p)) surveyByPhone.set(p, s)
  }
  const surveyPhones = new Set(surveyByPhone.keys())
  console.log(`설문 고유번호(해석A): ${surveyPhones.size}`)

  // ───────── 세그먼트 배정 (우선순위 체인) ─────────
  const assigned = new Map()
  const buckets = { S1:[], S2:[], S3:[], S4:[], S5:[], S6:[], S7:[], S8:[] }
  const now = new Date()
  const cutoff = new Date(now.getTime() - 90*86400*1000)

  function pick(seg, m) {
    assigned.set(m._phone, seg)
    buckets[seg].push({
      segment: seg,
      이름: m.u_name || '',
      핸드폰번호: m._phone,
      이메일: m.u_email || '',
      마케팅동의: m.u_marketing_agree_tf === true ? 'Y' : (m.u_marketing_agree_tf === false ? 'N' : ''),
      최근활동일: m.u_recent_date || '',
      참여이력: (Array.isArray(m.u_participate_iids) ? m.u_participate_iids : []).join('|'),
    })
  }

  for (const m of afterExclude) {
    if (assigned.has(m._phone)) continue
    if (surveyPhones.has(m._phone)) { pick('S1', m); continue }
    if (claudeSharingPhones.has(m._phone)) { pick('S2', m); continue }
    if (claudeWorkshopPhones.has(m._phone)) { pick('S3', m); continue }
    if (aiVideoPhones.has(m._phone)) { pick('S4', m); continue }
    const parts = Array.isArray(m.u_participate_iids) ? m.u_participate_iids : []
    const sharingCount = parts.filter(i => sharingIids.has(i)).length
    if (sharingCount >= 3) { pick('S5', m); continue }
    if (m.u_recent_date) {
      const d = new Date(m.u_recent_date)
      if (d < cutoff) { pick('S6', m); continue }
    }
    if (m.u_item_tf === false) { pick('S7', m); continue }
    pick('S8', m)
  }

  // ───────── AAA 신청자 실명단: 설문자 vs 비설문자 ─────────
  const aaaSurvey = []
  const aaaNonSurvey = []
  for (const [phone, e] of aaaByPhone) {
    const row = {
      이름: e.u_name || '',
      핸드폰번호: phone,
      이메일: e.u_email || '',
      신청일시: e.e_created_at || '',
      설문참여: surveyPhones.has(phone) ? 'Y' : 'N',
    }
    if (surveyPhones.has(phone)) aaaSurvey.push(row)
    else aaaNonSurvey.push(row)
  }
  console.log(`AAA 신청자: 설문자 ${aaaSurvey.length}, 비설문자 ${aaaNonSurvey.length}`)

  // ───────── 저장 ─────────
  const outDir = path.resolve(__dirname, '..', 'outputs', 'crm', 'rosters_260421')
  fs.mkdirSync(outDir, { recursive: true })

  const segHeaders = ['segment','이름','핸드폰번호','이메일','마케팅동의','최근활동일','참여이력']
  for (const seg of Object.keys(buckets)) {
    const file = path.join(outDir, `${seg}.csv`)
    fs.writeFileSync(file, toCsv(buckets[seg], segHeaders))
    console.log(`→ ${seg}: ${buckets[seg].length}명 → ${file}`)
  }

  const aaaHeaders = ['이름','핸드폰번호','이메일','신청일시','설문참여']
  fs.writeFileSync(path.join(outDir, 'aaa_applicants_survey.csv'), toCsv(aaaSurvey, aaaHeaders))
  fs.writeFileSync(path.join(outDir, 'aaa_applicants_nonsurvey.csv'), toCsv(aaaNonSurvey, aaaHeaders))
  console.log(`→ AAA 신청자 설문자: ${aaaSurvey.length}명`)
  console.log(`→ AAA 신청자 비설문자: ${aaaNonSurvey.length}명`)

  // summary
  const summary = {
    generated_at: new Date().toISOString(),
    base: {
      membership_unique_phones: base.length,
      aaa_applicants_total: aaaPhones.size,
      aaa_applicants_excluded_from_base: base.length - afterExclude.length,
      after_exclude: afterExclude.length,
    },
    segments: Object.fromEntries(Object.entries(buckets).map(([k,v])=>[k,v.length])),
    aaa_split: {
      survey: aaaSurvey.length,
      non_survey: aaaNonSurvey.length,
    }
  }
  fs.writeFileSync(path.join(outDir, '_summary.json'), JSON.stringify(summary, null, 2))
  console.log(`\n→ summary: ${path.join(outDir, '_summary.json')}`)
}

main().catch(e => { console.error(e); process.exit(1) })
