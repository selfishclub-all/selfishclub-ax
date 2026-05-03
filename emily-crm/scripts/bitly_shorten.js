require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') })
const https = require('https')

const TOKEN = process.env.BITLY_TOKEN
if (!TOKEN) { console.error('BITLY_TOKEN 없음'); process.exit(1) }

const links = [
  { room: '셀피쉬냅다활용방',  url: 'http://selfishclub.xyz/sharing/aaa?utm_medium=crm&utm_source=kakaoopenchat&utm_campaign=AAA&utm_content=%EC%98%A4%ED%94%88_%EB%83%85%EB%8B%A4%ED%99%9C%EC%9A%A9&utm_term=inbound' },
  { room: '셀피쉬냅다실무방',  url: 'http://selfishclub.xyz/sharing/aaa?utm_medium=crm&utm_source=kakaoopenchat&utm_campaign=AAA&utm_content=%EC%98%A4%ED%94%88_%EB%83%85%EB%8B%A4%EC%8B%A4%EB%AC%B4&utm_term=inbound' },
  { room: '셀피쉬단톡방',     url: 'http://selfishclub.xyz/sharing/aaa?utm_medium=crm&utm_source=kakaoopenchat&utm_campaign=AAA&utm_content=%EC%98%A4%ED%94%88_%EC%85%80%ED%94%BC%EC%89%AC%EB%8B%A8%ED%86%A1&utm_term=inbound' },
]

function shorten(longUrl) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ long_url: longUrl, domain: 'bit.ly' })
    const req = https.request({
      hostname: 'api-ssl.bitly.com',
      path: '/v4/shorten',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let d = ''; res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch(e) { resolve({error: d, status: res.statusCode}) } })
    })
    req.on('error', reject)
    req.write(body); req.end()
  })
}

async function main() {
  console.log('=== bit.ly 단축 중 ===\n')
  for (const { room, url } of links) {
    const r = await shorten(url)
    if (r.link) {
      console.log(`✅ ${room}\n   원본: ${decodeURIComponent(url)}\n   단축: ${r.link}\n`)
    } else {
      console.log(`❌ ${room}\n   에러: ${JSON.stringify(r)}\n`)
    }
  }
}
main().catch(e => { console.error(e); process.exit(1) })
