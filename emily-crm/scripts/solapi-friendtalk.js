require('dotenv').config()
const crypto = require('crypto')
const https = require('https')
const fs = require('fs')
const path = require('path')

const API_KEY = process.env.SOLAPI_API_KEY
const API_SECRET = process.env.SOLAPI_API_SECRET
const PF_ID = 'KA01PF_REDACTED_PFID'

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
    const bodyStr = body ? JSON.stringify(body) : null
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
    if (bodyStr) req.write(bodyStr)
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

async function sendFriendTalkWide({ to, imageId, text, buttonText, buttonUrl }) {
  const msgText = text || '셀피쉬클럽 이기적공유회 안내'
  const body = {
    messages: [
      {
        to,
        from: '15886864',
        text: msgText,
        kakaoOptions: {
          pfId: PF_ID,
          imageId,
          disableSms: true,
          buttons: [
            {
              buttonType: 'WL',
              buttonName: buttonText || '신청하기',
              linkMo: buttonUrl || 'https://www.selfishclub.xyz',
              linkPc: buttonUrl || 'https://www.selfishclub.xyz'
            }
          ]
        }
      }
    ]
  }

  const result = await solapiRequest('POST', '/messages/v4/send-many/detail', body)
  return result
}

async function main() {
  const action = process.argv[2] || 'help'

  if (action === 'help') {
    console.log('Usage:')
    console.log('  node solapi-friendtalk.js upload <image-path>')
    console.log('  node solapi-friendtalk.js send <phone> <imageFileId> [buttonText] [buttonUrl]')
    console.log('  node solapi-friendtalk.js full <image-path> <phone> [buttonText] [buttonUrl]')
    return
  }

  if (action === 'upload') {
    const filePath = process.argv[3]
    console.log(`이미지 업로드: ${filePath}`)
    const result = await uploadImage(filePath)
    console.log('Status:', result.status)
    console.log('FileId:', result.data.fileId)
    console.log('Kakao URL:', result.data.kakao?.biztalk)
  }

  if (action === 'send') {
    const phone = process.argv[3]
    const imageId = process.argv[4]
    const buttonText = process.argv[5] || '신청하기'
    const buttonUrl = process.argv[6] || 'https://www.selfishclub.xyz'
    console.log(`친구톡 발송: ${phone}`)
    const result = await sendFriendTalkWide({ to: phone, imageId, buttonText, buttonUrl })
    console.log('Status:', result.status)
    console.log('Response:', JSON.stringify(result.data, null, 2))
  }

  if (action === 'full') {
    const imagePath = process.argv[3]
    const phone = process.argv[4]
    const buttonText = process.argv[5] || '신청하기'
    const buttonUrl = process.argv[6] || 'https://www.selfishclub.xyz'

    console.log('=== Step 1: 이미지 업로드 ===')
    const upload = await uploadImage(imagePath)
    if (upload.status !== 200) {
      console.error('업로드 실패:', upload.data)
      return
    }
    const fileId = upload.data.fileId
    console.log('FileId:', fileId)

    console.log('=== Step 2: 친구톡 와이드형 발송 ===')
    const send = await sendFriendTalkWide({ to: phone, imageId: fileId, buttonText, buttonUrl })
    console.log('Status:', send.status)
    console.log('Response:', JSON.stringify(send.data, null, 2))
  }
}

main().catch(console.error)
