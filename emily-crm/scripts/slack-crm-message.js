/**
 * Slack CRM 메시지 전달 유틸리티
 * - 이미지 업로드 (카플친 배너)
 * - 채널별 독립 메시지 전달
 * - 이모지 반응으로 승인 상태 관리
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

const https = require('https')
const fs = require('fs')

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN
if (!SLACK_TOKEN) throw new Error('SLACK_BOT_TOKEN env var required (set in .env)')
const CRM_CHANNEL = 'C0AN2NZ4L7L'

function slackPost(endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body)
    const opts = {
      hostname: 'slack.com',
      path: `/api/${endpoint}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SLACK_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }
    const req = https.request(opts, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => {
        try { resolve(JSON.parse(d)) } catch { resolve(d) }
      })
    })
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

async function uploadImage(filePath, channel, initialComment) {
  const fileSize = fs.statSync(filePath).size
  const fileName = require('path').basename(filePath)

  const step1 = await new Promise((resolve) => {
    https.get({
      hostname: 'slack.com',
      path: `/api/files.getUploadURLExternal?filename=${encodeURIComponent(fileName)}&length=${fileSize}`,
      headers: { 'Authorization': `Bearer ${SLACK_TOKEN}` }
    }, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d))); })
  })
  if (!step1.ok) return step1

  const fileData = fs.readFileSync(filePath)
  const url = new URL(step1.upload_url)
  await new Promise((resolve) => {
    const req = https.request({
      hostname: url.hostname, path: url.pathname + url.search, method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream', 'Content-Length': fileData.length }
    }, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve()); })
    req.write(fileData)
    req.end()
  })

  const body = { files: [{ id: step1.file_id, title: fileName.replace(/\.\w+$/, '') }], channel_id: channel }
  if (initialComment) body.initial_comment = initialComment
  return slackPost('files.completeUploadExternal', body)
}

async function sendCrmMessage({ channel = CRM_CHANNEL, programName, phase, channelType, copy, bitlyUrls, imagePath }) {
  const emojiMap = {
    '오카방': '📢',
    '카플친': '📱',
    '알림톡': '💬',
    '인스타': '📸',
    '온드미디어': '📋'
  }
  const emoji = emojiMap[channelType] || '📌'

  if (channelType === '카플친' && imagePath) {
    const comment = `${emoji} *[${programName}] ${phase} — ${channelType} 배너*\n━━━━━━━━━━━━━━━━━━━━━\n${copy}\n━━━━━━━━━━━━━━━━━━━━━\n✅ 승인 = 이모지 반응 :white_check_mark:\n✏️ 수정 = 스레드에 피드백\n❌ 취소 = 이모지 반응 :x:`
    const result = await uploadImage(imagePath, channel, comment)
    return result
  }

  let text = `${emoji} *[${programName}] ${phase} — ${channelType} 카피*`
  if (channelType === '오카방' && bitlyUrls) {
    text += ` (3방 동일)`
  }
  text += `\n━━━━━━━━━━━━━━━━━━━━━\n${copy}\n━━━━━━━━━━━━━━━━━━━━━`

  if (bitlyUrls) {
    text += '\n'
    for (const [room, url] of Object.entries(bitlyUrls)) {
      text += `\n🔗 ${room}: ${url}`
    }
  }

  text += '\n\n✅ 승인 = 이모지 반응 :white_check_mark:\n✏️ 수정 = 스레드에 피드백\n❌ 취소 = 이모지 반응 :x:'

  const result = await slackPost('chat.postMessage', { channel, text })
  return result
}

async function shortenUrl(longUrl) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ long_url: longUrl })
    const opts = {
      hostname: 'api-ssl.bitly.com',
      path: '/v4/shorten',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BITLY_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }
    const req = https.request(opts, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => {
        try {
          const r = JSON.parse(d)
          resolve(r.link || longUrl)
        } catch { resolve(longUrl) }
      })
    })
    req.on('error', () => resolve(longUrl))
    req.write(body)
    req.end()
  })
}

async function generateBitlyUrls(baseUrl, campaign, phase, rooms = ['냅다활용', '냅다실무', '클럽']) {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const urls = {}
  for (const room of rooms) {
    const utmUrl = `${baseUrl}?utm_source=kakaoopenchat&utm_medium=crm&utm_campaign=${campaign}&utm_content=${date}_${phase}_${room}`
    urls[room] = await shortenUrl(utmUrl)
  }
  return urls
}

module.exports = { sendCrmMessage, uploadImage, shortenUrl, generateBitlyUrls, slackPost }

if (require.main === module) {
  const cmd = process.argv[2]
  if (cmd === 'test-bitly') {
    generateBitlyUrls('https://selfishclub.xyz/sharing/ai-github', 'ai-github', '마감')
      .then(urls => console.log('bit.ly URLs:', JSON.stringify(urls, null, 2)))
  } else if (cmd === 'test-message') {
    sendCrmMessage({
      programName: '클코&깃헙',
      phase: '마감',
      channelType: '오카방',
      copy: '테스트 카피입니다.',
      bitlyUrls: { '냅다활용': 'https://bit.ly/test1', '냅다실무': 'https://bit.ly/test2', '클럽': 'https://bit.ly/test3' }
    }).then(r => console.log('Result:', r.ok, r.ts))
  } else if (cmd === 'test-image') {
    const imgPath = process.argv[3]
    if (!imgPath) { console.log('Usage: node slack-crm-message.js test-image <path>'); process.exit(1) }
    uploadImage(imgPath, CRM_CHANNEL, '📱 카플친 배너 테스트')
      .then(r => console.log('Upload:', r.ok))
  } else {
    console.log('Usage: node slack-crm-message.js [test-bitly|test-message|test-image <path>]')
  }
}
