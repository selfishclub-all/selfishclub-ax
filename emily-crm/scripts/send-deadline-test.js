// AAA 미신청자 마감 임박 (T1) 테스트 발송 — 1회용
require('dotenv').config()
const crypto = require('crypto')
const https = require('https')

const API_KEY = process.env.SOLAPI_API_KEY
const API_SECRET = process.env.SOLAPI_API_SECRET

if (!API_KEY || !API_SECRET) {
  console.error('SOLAPI_API_KEY / SOLAPI_API_SECRET 미설정')
  process.exit(1)
}

function getAuthHeader() {
  const date = new Date().toISOString()
  const salt = crypto.randomBytes(32).toString('hex')
  const signature = crypto.createHmac('sha256', API_SECRET)
    .update(date + salt)
    .digest('hex')
  return `HMAC-SHA256 apiKey=${API_KEY}, date=${date}, salt=${salt}, signature=${signature}`
}

function solapiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null
    const options = {
      hostname: 'api.solapi.com',
      path: endpoint,
      method,
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
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

const TO = '01082948909'
const FROM = '07080186760'
const PF_ID = 'KA01PF_REDACTED_PFID'
const TEMPLATE_ID = 'KA01TP260417070155000oUqIHGY6LdH' // T1 후킹헤더형

const RAW_URL = 'aaa?utm_medium=crm&utm_source=alimtalk&utm_campaign=AAA&utm_content=0427_알림톡_미신청자&utm_term=inbound'
const URL_STRIPPED = RAW_URL.replace(/^https?:\/\//, '')

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

const variables = {
  '#{이름}': '에밀리',
  '#{프로그램설명}': PROGRAM_DESC,
  '#{프로그램명}': 'AAA 공유회',
  '#{일정}': SCHEDULE_BODY,
  '#{url}': URL_STRIPPED
}

const message = {
  to: TO,
  from: FROM,
  kakaoOptions: {
    pfId: PF_ID,
    templateId: TEMPLATE_ID,
    disableSms: true,
    variables
  }
}

const maskedTo = TO.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')
console.log(`=== T1 마감 임박 테스트 발송 → ${maskedTo} ===`)
console.log('Template:', TEMPLATE_ID)
console.log('URL:', URL_STRIPPED)
console.log('---')

solapiRequest('POST', '/messages/v4/send', { message })
  .then(({ status, data }) => {
    console.log('HTTP Status:', status)
    console.log('Response:', JSON.stringify(data, null, 2))
    if (status >= 200 && status < 300) {
      console.log('\n✅ 발송 요청 성공')
    } else {
      console.log('\n❌ 발송 실패')
      process.exit(1)
    }
  })
  .catch(err => {
    console.error('Request error:', err)
    process.exit(1)
  })
