// 직전 공유회 확인 + AAA 신청자 집계 (pagination 적용)
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const https = require('https')

const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

function qPage(path, offset = 0, limit = 1000) {
  return new Promise((resolve, reject) => {
    const sep = path.includes('?') ? '&' : '?'
    const full = `/rest/v1/${path}${sep}offset=${offset}&limit=${limit}`
    const req = https.request({
      hostname: 'mryzkyvxcjeqjkdhlkeo.supabase.co',
      path: full,
      method: 'GET',
      headers: { 'apikey': KEY, 'Authorization': `Bearer ${KEY}` }
    }, res => {
      let d = ''; res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch(e) { resolve({error: d, status: res.statusCode}) } })
    })
    req.on('error', reject); req.end()
  })
}

async function fetchAll(path) {
  const all = []
  let offset = 0
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

async function main() {
  console.log('=== 최근 공유회 (sharing) ===')
  const sharingList = await qPage("item?select=iid,i_title_userside,i_eventdate,i_open_sent_at&i_type=eq.sharing&order=i_eventdate.desc.nullslast&limit=15")
  for (const s of sharingList) {
    console.log(`${s.iid.padEnd(10)} | event=${s.i_eventdate||'-'} | ${s.i_title_userside||''}`)
  }
  console.log()

  console.log('=== AAA (iid_1002) 신청자 ===')
  const aaaPurchase = await fetchAll("purchase?select=u_name,u_phone,u_email,p_cancel_amount,p_created_at&iid=eq.iid_1002")
  const aaaPurchaseLive = aaaPurchase.filter(r => r.p_cancel_amount === null || r.p_cancel_amount === 0)
  console.log(`purchase 테이블: 전체 ${aaaPurchase.length}, 취소제외 ${aaaPurchaseLive.length}`)

  const aaaEvent = await fetchAll("event?select=u_name,u_phone,u_email,e_created_at&iid=eq.iid_1002")
  console.log(`event 테이블: ${aaaEvent.length}`)

  // 전화번호 합집합
  const aaaPhonesP = new Set(aaaPurchaseLive.map(r => r.u_phone).filter(Boolean))
  const aaaPhonesE = new Set(aaaEvent.map(r => r.u_phone).filter(Boolean))
  const aaaPhonesUnion = new Set([...aaaPhonesP, ...aaaPhonesE])
  console.log(`고유 전화번호 합집합: ${aaaPhonesUnion.size}`)
  console.log()

  console.log('=== 멤버십 모수 ===')
  const membership = await fetchAll("member?select=u_name,u_phone,u_email,u_marketing_agree_tf,u_membership_tf&u_membership_tf=eq.true")
  const withPhone = membership.filter(r => r.u_phone && r.u_phone.trim())
  const withPhoneAgree = withPhone.filter(r => r.u_marketing_agree_tf === true)
  console.log(`멤버십 전체: ${membership.length}`)
  console.log(`전화번호 보유: ${withPhone.length}`)
  console.log(`전화번호 + 마케팅동의: ${withPhoneAgree.length}`)
  console.log()

  console.log('=== 직전 공유회 신청자 (참고용) ===')
  const recentIids = ['iid_79', 'iid_74', 'iid_72', 'iid_69', 'iid_63']
  for (const iid of recentIids) {
    const p = await fetchAll(`purchase?select=u_phone,p_cancel_amount&iid=eq.${iid}`)
    const live = p.filter(r => r.p_cancel_amount === null || r.p_cancel_amount === 0)
    const phones = new Set(live.map(r => r.u_phone).filter(Boolean))
    const title = sharingList.find(s => s.iid === iid)?.i_title_userside || ''
    console.log(`${iid}: 신청자 ${phones.size}명 — ${title.slice(0, 30)}`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
