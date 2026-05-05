const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

async function htmlToPng(htmlPath, outputDir) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const absolutePath = path.resolve(htmlPath)
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0' })

  // 배너들 찾기 (.banner 클래스 또는 .slide 클래스)
  const elements = await page.$$('.banner, .slide')

  if (elements.length === 0) {
    console.error('No .banner or .slide elements found')
    await browser.close()
    return
  }

  fs.mkdirSync(outputDir, { recursive: true })

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    const box = await el.boundingBox()
    if (!box) continue

    const outputPath = path.join(outputDir, `banner-${i + 1}.png`)
    await el.screenshot({ path: outputPath })
    console.log(`Saved: ${outputPath} (${box.width}x${box.height})`)
  }

  await browser.close()
  console.log(`Done! ${elements.length} images saved to ${outputDir}`)
}

// CLI usage: node html-to-png.js <html-file> [output-dir]
const args = process.argv.slice(2)
if (args.length < 1) {
  console.log('Usage: node html-to-png.js <html-file> [output-dir]')
  console.log('Example: node html-to-png.js outputs/kakaoplus-mobile-v3.html outputs/png')
  process.exit(1)
}

const htmlFile = args[0]
const outputDir = args[1] || path.join(path.dirname(htmlFile), 'png')

htmlToPng(htmlFile, outputDir)
