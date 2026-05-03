// AAA(iid_1002) D-1 리마인드 (③') 본 발송 — 신청자 전체
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const crypto = require('crypto')
const https = require('https')

const API_KEY = process.env.SOLAPI_API_KEY
const API_SECRET = process.env.SOLAPI_API_SECRET
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

if (!API_KEY || !API_SECRET) { console.error('SOLAPI 키 미설정'); process.exit(1) }
if (!SUPABASE_KEY) { console.error('SUPABASE 키 미설정'); process.exit(1) }

const FROM = '07080186760'
const PF_ID = 'KA01PF_REDACTED_PFID'
const TEMPLATE_ID = 'KA01TP250810153246575dLXbwnUflWd' // ③' D-1
const IID = 'iid_1002'
const BATCH_SIZE = 100

const SCHEDULE_BODY = `4월 28일(화) 20:30

🚨 정원 1,000명 제한
❗ 다시보기 VOD 제공 안됨!!
→ 꼭 라이브에 시간 맞춰 꼭 들어와주세요.`

const BENEFITS_BODY = `라이브 이벤트 참여 시‼️
✔️스폰지클럽 얼리버드 특가
✔️40페이지 교안`

// ── SOLAPI helpers
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
      headers: {
        'Authorization': getAuthHeader(), 'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }) }
        catch { resolve({ status: res.statusCode, data }) }
      })
    })
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

// ── Supabase helpers
function supabaseQuery(path) {
  return new Promise((resolve, reject) => {
    const sep = path.includes('?') ? '&' : '?'
    https.request({
      hostname: 'mryzkyvxcjeqjkdhlkeo.supabase.co',
      path: `/rest/v1/${path}${sep}offset=0&limit=10000`,
      method: 'GET',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    }, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch (e) { reject(d) } })
    }).on('error', reject).end()
  })
}

function maskPhone(p) {
  return (p || '').replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-****-$3')
}

// ── 메인
async function main() {
  console.log('=== iid_1002 신청자 조회 ===')
  const eventRows = await supabaseQuery(`event?select=u_name,u_phone&iid=eq.${IID}`)
  if (!Array.isArray(eventRows)) { console.error('조회 실패:', eventRows); process.exit(1) }
  console.log(`event 테이블 raw: ${eventRows.length}`)

  // 전화번호 dedupe (가장 마지막 이름 우선)
  const byPhone = new Map()
  for (const r of eventRows) {
    const phone = (r.u_phone || '').trim()
    if (!phone) continue
    if (!/^010\d{8}$/.test(phone)) continue
    byPhone.set(phone, r.u_name || '회원')
  }
  const recipients = [...byPhone.entries()].map(([phone, name]) => ({ phone, name }))
  console.log(`유효 전화번호 (010xxxxxxxx 형식, dedupe): ${recipients.length}`)
  console.log(`샘플: ${recipients.slice(0, 3).map(r => `${r.name}/${maskPhone(r.phone)}`).join(', ')}`)
  console.log()

  if (recipients.length === 0) { console.error('대상자 0명'); process.exit(1) }

  // 배치 분할
  const batches = []
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    batches.push(recipients.slice(i, i + BATCH_SIZE))
  }
  console.log(`발송 시작 — 총 ${recipients.length}명, ${batches.length} 배치 (${BATCH_SIZE}건/배치)`)
  console.log()

  let totalAccepted = 0
  let totalFailed = 0
  const failures = []

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    const messages = batch.map(r => ({
      to: r.phone,
      from: FROM,
      kakaoOptions: {
        pfId: PF_ID,
        templateId: TEMPLATE_ID,
        disableSms: true,
        variables: {
          '#{이름}': r.name,
          '#{시간}': '내일 오후 1시',
          '#{공유회명}': 'AAA 공유회',
          '#{일정}': SCHEDULE_BODY,
          '#{라이브혜택}': BENEFITS_BODY
        }
      }
    }))

    const { status, data } = await solapiRequest('POST', '/messages/v4/send-many/detail', {
      messages,
      showMessageList: true
    })

    if (status >= 200 && status < 300) {
      const accepted = data?.groupInfo?.count?.registeredSuccess ?? 0
      const failed = data?.groupInfo?.count?.registeredFailed ?? 0
      totalAccepted += accepted
      totalFailed += failed
      console.log(`  [${i + 1}/${batches.length}] groupId=${data.groupInfo?._id} accepted=${accepted} failed=${failed}`)
      if (failed > 0 && Array.isArray(data.messageList)) {
        for (const m of data.messageList) {
          if (m.statusCode && !m.statusCode.startsWith('2')) {
            failures.push({ to: maskPhone(m.to), code: m.statusCode, msg: m.statusMessage })
          }
        }
      }
    } else {
      console.error(`  [${i + 1}/${batches.length}] HTTP ${status}`, JSON.stringify(data).slice(0, 300))
      totalFailed += batch.length
    }
    await new Promise(r => setTimeout(r, 200))
  }

  console.log()
  console.log('=== 발송 완료 ===')
  console.log(`✅ 접수 성공: ${totalAccepted}`)
  console.log(`❌ 접수 실패: ${totalFailed}`)
  if (failures.length > 0) {
    console.log('실패 샘플:')
    for (const f of failures.slice(0, 10)) console.log(`  - ${f.to} | ${f.code} | ${f.msg}`)
  }
}

main().catch(e => { console.error('FATAL', e); process.exit(1) })
