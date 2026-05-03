require('dotenv').config()
const crypto = require('crypto')
const https = require('https')
const fs = require('fs')
const path = require('path')

const API_KEY = process.env.SOLAPI_API_KEY
const API_SECRET = process.env.SOLAPI_API_SECRET

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
    const options = {
      hostname: 'api.solapi.com',
      path: endpoint,
      method,
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) })
        } catch {
          resolve({ status: res.statusCode, data })
        }
      })
    })

    req.on('error', reject)
    if (body) req.write(JSON.stringify(body))
    req.end()
  })
}

async function uploadImage(filePath) {
  const fileData = fs.readFileSync(filePath)
  const base64 = fileData.toString('base64')
  const fileName = path.basename(filePath)

  const result = await solapiRequest('POST', '/storage/v1/files', {
    file: base64,
    type: 'KAKAO',
    name: fileName
  })

  return result
}

async function main() {
  const action = process.argv[2] || 'test'

  if (action === 'test') {
    console.log('=== SOLAPI 연결 테스트 ===')
    const result = await solapiRequest('GET', '/messages/v4/list?limit=1')
    console.log('Status:', result.status)
    if (result.status === 200) {
      console.log('연결 성공!')
    } else {
      console.log('응답:', JSON.stringify(result.data, null, 2))
    }
  }

  if (action === 'upload') {
    const filePath = process.argv[3]
    if (!filePath) {
      console.log('Usage: node solapi-test.js upload <image-path>')
      return
    }
    console.log(`=== 이미지 업로드: ${filePath} ===`)
    const result = await uploadImage(filePath)
    console.log('Status:', result.status)
    console.log('Response:', JSON.stringify(result.data, null, 2))
  }
}

main().catch(console.error)
