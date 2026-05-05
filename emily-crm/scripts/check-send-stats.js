// 오늘 보낸 알림톡 그룹들 모수 집계 (시도 vs 실발송)
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const crypto = require('crypto')
const https = require('https')

const API_KEY = process.env.SOLAPI_API_KEY
const API_SECRET = process.env.SOLAPI_API_SECRET

function getAuthHeader() {
  const date = new Date().toISOString()
  const salt = crypto.randomBytes(32).toString('hex')
  const signature = crypto.createHmac('sha256', API_SECRET).update(date + salt).digest('hex')
  return `HMAC-SHA256 apiKey=${API_KEY}, date=${date}, salt=${salt}, signature=${signature}`
}

function solapiRequest(method, endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.solapi.com', path: endpoint, method,
      headers: { 'Authorization': getAuthHeader(), 'Content-Type': 'application/json' }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => { try { resolve({ status: res.statusCode, data: JSON.parse(data) }) } catch { resolve({ status: res.statusCode, data }) } })
    })
    req.on('error', reject); req.end()
  })
}

async function fetchAllGroups(startDate, endDate) {
  const all = []
  let startKey = null
  while (true) {
    let path = `/messages/v4/groups?dateType=CREATED&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&limit=200`
    if (startKey) path += `&startKey=${startKey}`
    const { status, data } = await solapiRequest('GET', path)
    if (status !== 200) { console.error('groups fetch fail', status, data); break }
    const list = data?.groupList ? Object.values(data.groupList) : []
    all.push(...list)
    if (data?.nextKey) startKey = data.nextKey
    else break
  }
  return all
}

const TEMPLATES = {
  'KA01TP250810153246575dLXbwnUflWd': "③' D-1 리마인드 (이미지헤더+라이브혜택)",
  'KA01TP260417070155000oUqIHGY6LdH': 'T1 후킹헤더형 (마감 임박)',
  'KA01TP260328003811869hKleQPvW4us': '③ D-1 리마인드 (구버전, 테스트만)'
}

async function main() {
  const start = '2026-04-27T00:00:00+09:00'
  const end = '2026-04-27T23:59:59+09:00'
  console.log(`=== SOLAPI 그룹 조회 ${start} ~ ${end} ===\n`)

  const groups = await fetchAllGroups(start, end)
  console.log(`총 그룹 수: ${groups.length}\n`)

  // dateCreated 시간으로 카테고리 분류 (KST):
  //   D-1 신청자 1차: 14:39:52 - 14:39:58 (982~)
  //   D-1 신청자 2차: 14:41:24 - 14:41:26 (347)
  //   미신청자 마감 : 14:43:45 - 14:44:13 (6068)
  const cats = [
    { name: "③' D-1 리마인드 (신청자, 1차+2차)", from: '14:39:00', to: '14:42:00' },
    { name: 'T1 마감 임박 (미신청자)',           from: '14:42:30', to: '14:45:00' }
  ]
  function inWindow(dc, fromHM, toHM) {
    if (!dc) return false
    const t = new Date(dc).toLocaleString('en-GB', { timeZone: 'Asia/Seoul', hour12: false })
    // dc looks like "27/04/2026, 14:39:55"
    const hm = t.split(', ')[1]?.slice(0, 8)
    return hm >= fromHM && hm <= toHM
  }
  const buckets = cats.map(c => ({ ...c, groups: [] }))
  for (const g of groups) {
    for (const b of buckets) {
      if (inWindow(g.dateCreated, b.from, b.to)) { b.groups.push(g); break }
    }
  }

  for (const b of buckets) {
    const sum = b.groups.reduce((a, g) => ({
      total: a.total + (g.count?.total || 0),
      sentTotal: a.sentTotal + (g.count?.sentTotal || 0),
      sentSuccess: a.sentSuccess + (g.count?.sentSuccess || 0),
      sentFailed: a.sentFailed + (g.count?.sentFailed || 0),
      registeredFailed: a.registeredFailed + (g.count?.registeredFailed || 0),
      sentReplacement: a.sentReplacement + (g.count?.sentReplacement || 0)
    }), { total:0, sentTotal:0, sentSuccess:0, sentFailed:0, registeredFailed:0, sentReplacement:0 })
    console.log(`📨 ${b.name}`)
    console.log(`   배치: ${b.groups.length}`)
    console.log(`   시도(total): ${sum.total}`)
    console.log(`   실발송(sentTotal): ${sum.sentTotal}`)
    console.log(`     ├─ 성공(sentSuccess): ${sum.sentSuccess}`)
    console.log(`     └─ 실패(sentFailed): ${sum.sentFailed}`)
    console.log(`   등록실패(registeredFailed): ${sum.registeredFailed}`)
    console.log(`   문자 대체 발송: ${sum.sentReplacement}`)
    console.log()
  }

  const byTemplate = {}
  // 디버그용 — 미사용 코드 길이 줄이기 위해 호환 부족; skip
  for (const g of [].slice(0)) {
    const tpl = g.kakaoOptions?.templateId || g.templateId || 'unknown'
    if (!byTemplate[tpl]) byTemplate[tpl] = {
      groups: 0,
      total: 0,
      sentTotal: 0,
      sentSuccess: 0,
      sentFailed: 0,
      registeredFailed: 0,
      sentReplacement: 0,
      groupIds: []
    }
    const b = byTemplate[tpl]
    b.groups++
    b.total += g.count?.total || 0
    b.sentTotal += g.count?.sentTotal || 0
    b.sentSuccess += g.count?.sentSuccess || 0
    b.sentFailed += g.count?.sentFailed || 0
    b.registeredFailed += g.count?.registeredFailed || 0
    b.sentReplacement += g.count?.sentReplacement || 0
    b.groupIds.push(g._id)
  }

  for (const [tpl, b] of Object.entries(byTemplate)) {
    const name = TEMPLATES[tpl] || tpl
    console.log(`📨 ${name}`)
    console.log(`   templateId: ${tpl}`)
    console.log(`   배치(그룹): ${b.groups}`)
    console.log(`   시도(total): ${b.total}`)
    console.log(`   실발송(sentTotal): ${b.sentTotal}`)
    console.log(`     ├─ 성공(sentSuccess): ${b.sentSuccess}`)
    console.log(`     └─ 실패(sentFailed): ${b.sentFailed}`)
    console.log(`   등록실패(registeredFailed): ${b.registeredFailed}`)
    console.log(`   대체발송(sentReplacement, 알림톡→문자): ${b.sentReplacement}`)
    console.log()
  }

  console.log('=== 합계 ===')
  const totals = Object.values(byTemplate).reduce((acc, b) => ({
    total: acc.total + b.total,
    sentSuccess: acc.sentSuccess + b.sentSuccess,
    sentFailed: acc.sentFailed + b.sentFailed,
    registeredFailed: acc.registeredFailed + b.registeredFailed,
    sentReplacement: acc.sentReplacement + b.sentReplacement
  }), { total: 0, sentSuccess: 0, sentFailed: 0, registeredFailed: 0, sentReplacement: 0 })
  console.log(JSON.stringify(totals, null, 2))
}

main().catch(e => { console.error('FATAL', e); process.exit(1) })
