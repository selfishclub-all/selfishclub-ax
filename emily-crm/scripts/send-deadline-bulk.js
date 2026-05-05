// AAA(iid_1002) 미신청자 마감 임박 (T1) 본 발송
// 대상: 멤버십(마케팅동의+전화번호) − AAA 신청자(전화번호)
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const crypto = require('crypto')
const https = require('https')

const API_KEY = process.env.SOLAPI_API_KEY
const API_SECRET = process.env.SOLAPI_API_SECRET
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

const FROM = '07080186760'
const PF_ID = 'KA01PF_REDACTED_PFID'
const TEMPLATE_ID = 'KA01TP260417070155000oUqIHGY6LdH' // T1 후킹헤더형
const IID = 'iid_1002'
const BATCH_SIZE = 100

const PROGRAM_DESC = `이걸 놓치시는 분은 없겠죠..?
[내일 마감] 몇번 없는 셀피쉬 무료 공유회
아직 안 신청하셨다면 마지막 안내드릴게요.

크루 8명이 6주 동안 Claude Code로 각자 업무에 AI 에이전트를 직접 붙여본 기록,
내일 무료 공유회에서 공개해요.`

const SCHEDULE_BODY = `4월 28일(화) 20:30

🚨 정원 1,000명 제한
❗ 다시보기 VOD 제공 안됨!!
→ 꼭 라이브에 시간 맞춰 꼭 들어와주세요.

🎁 라이브 이벤트 참여 시
✔️스폰지클럽 얼리버드 특가
✔️40페이지 교안`

const URL_SLUG = 'aaa?utm_medium=crm&utm_source=alimtalk&utm_campaign=AAA&utm_content=0427_알림톡_미신청자&utm_term=inbound'

function getAuthHeader() {
  const date = new Date().toISOString()
  const salt = crypto.randomBytes(32).toString('hex')
  const signature = crypto.createHmac('sha256', API_SECRET).update(date + salt).digest('hex')
  return `HMAC-SHA256 apiKey=${API_KEY}, date=${date}, salt=${salt}, signature=${signature}`
}

function solapiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null
    const options = {
      hostname: 'api.solapi.com', path: endpoint, method,
      headers: { 'Authorization': getAuthHeader(), 'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}) }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => { try { resolve({ status: res.statusCode, data: JSON.parse(data) }) } catch { resolve({ status: res.statusCode, data }) } })
    })
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

function supabasePage(path, offset, limit) {
  return new Promise((resolve, reject) => {
    const sep = path.includes('?') ? '&' : '?'
    https.request({
      hostname: 'mryzkyvxcjeqjkdhlkeo.supabase.co',
      path: `/rest/v1/${path}${sep}offset=${offset}&limit=${limit}`,
      method: 'GET',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    }, res => {
      let d = ''; res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch (e) { reject(d) } })
    }).on('error', reject).end()
  })
}

async function fetchAll(path) {
  const all = []
  let offset = 0
  while (true) {
    const rows = await supabasePage(path, offset, 1000)
    if (!Array.isArray(rows) || rows.length === 0) break
    all.push(...rows)
    if (rows.length < 1000) break
    offset += 1000
  }
  return all
}

function maskPhone(p) { return (p || '').replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-****-$3') }

async function main() {
  console.log('=== AAA 신청자 전화번호 (제외 대상) 조회 ===')
  const eventRows = await fetchAll(`event?select=u_phone&iid=eq.${IID}`)
  const subscriberPhones = new Set()
  for (const r of eventRows) {
    const p = (r.u_phone || '').trim()
    if (p && /^010\d{8}$/.test(p)) subscriberPhones.add(p)
  }
  console.log(`AAA 신청자 unique phone: ${subscriberPhones.size}`)

  console.log('=== 멤버십(마케팅동의+전화번호) 조회 ===')
  const memberRows = await fetchAll('member?select=u_name,u_phone,u_marketing_agree_tf&u_membership_tf=eq.true&u_marketing_agree_tf=eq.true')
  console.log(`멤버십(동의) raw: ${memberRows.length}`)

  // 멤버십 dedupe + 신청자 제외
  const seen = new Set()
  const recipients = []
  let skippedInvalid = 0, skippedSubscriber = 0, skippedDup = 0
  for (const r of memberRows) {
    const p = (r.u_phone || '').trim()
    if (!p || !/^010\d{8}$/.test(p)) { skippedInvalid++; continue }
    if (subscriberPhones.has(p)) { skippedSubscriber++; continue }
    if (seen.has(p)) { skippedDup++; continue }
    seen.add(p)
    recipients.push({ phone: p, name: r.u_name || '회원' })
  }
  console.log(`발송 대상 (미신청자): ${recipients.length}`)
  console.log(`  - 형식 무효 제외: ${skippedInvalid}`)
  console.log(`  - 신청자 제외: ${skippedSubscriber}`)
  console.log(`  - 멤버십 내 중복 제외: ${skippedDup}`)
  console.log(`샘플: ${recipients.slice(0, 3).map(r => `${r.name}/${maskPhone(r.phone)}`).join(', ')}`)
  console.log()

  if (recipients.length === 0) { console.error('대상자 0명'); process.exit(1) }

  const batches = []
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) batches.push(recipients.slice(i, i + BATCH_SIZE))
  console.log(`발송 시작 — ${recipients.length}명 / ${batches.length} 배치 (${BATCH_SIZE}건/배치)`)
  console.log()

  let totalAccepted = 0, totalFailed = 0
  const failures = []
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    const messages = batch.map(r => ({
      to: r.phone, from: FROM,
      kakaoOptions: {
        pfId: PF_ID, templateId: TEMPLATE_ID, disableSms: true,
        variables: {
          '#{이름}': r.name,
          '#{프로그램설명}': PROGRAM_DESC,
          '#{프로그램명}': 'AAA 공유회',
          '#{일정}': SCHEDULE_BODY,
          '#{url}': URL_SLUG
        }
      }
    }))
    const { status, data } = await solapiRequest('POST', '/messages/v4/send-many/detail', { messages, showMessageList: true })
    if (status >= 200 && status < 300) {
      const accepted = data?.groupInfo?.count?.registeredSuccess ?? 0
      const failed = data?.groupInfo?.count?.registeredFailed ?? 0
      totalAccepted += accepted; totalFailed += failed
      console.log(`  [${i + 1}/${batches.length}] groupId=${data.groupInfo?._id} accepted=${accepted} failed=${failed}`)
      if (failed > 0 && Array.isArray(data.messageList)) {
        for (const m of data.messageList) {
          if (m.statusCode && !m.statusCode.startsWith('2')) failures.push({ to: maskPhone(m.to), code: m.statusCode, msg: m.statusMessage })
        }
      }
    } else {
      console.error(`  [${i + 1}/${batches.length}] HTTP ${status}`, JSON.stringify(data).slice(0, 300))
      totalFailed += batch.length
    }
    await new Promise(r => setTimeout(r, 200))
  }

  console.log()
  console.log('=== 미신청자 마감 임박 발송 완료 ===')
  console.log(`✅ 접수 성공: ${totalAccepted}`)
  console.log(`❌ 접수 실패: ${totalFailed}`)
  if (failures.length > 0) {
    console.log('실패 샘플:')
    for (const f of failures.slice(0, 10)) console.log(`  - ${f.to} | ${f.code} | ${f.msg}`)
  }
}

main().catch(e => { console.error('FATAL', e); process.exit(1) })
