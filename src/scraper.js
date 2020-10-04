const puppeteer = require('puppeteer')

const scrapeAppleRefurbAvailability = async ({ url }) => {
  console.log('starting headless browser...')
  const puppeteerLaunchOptions = process.platform === 'linux'
    ? {headless: true, args: ['--no-sandbox'], executablePath: 'chromium-browser'}
    : {headless: true}
  const browser = await puppeteer.launch(puppeteerLaunchOptions)
  const page = await browser.newPage()

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')

  console.log('checking url...')
  await page.goto(url, {waitUntil: 'networkidle2'}).catch(console.warn)

  const isDisabled = await page.evaluate(() => {
    const addToCartButton = document.querySelector('button[name="add-to-cart"]')
    return addToCartButton.disabled
  })

  await browser.close()

  return !isDisabled
}

  module.exports = scrapeAppleRefurbAvailability