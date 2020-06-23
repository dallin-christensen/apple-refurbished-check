const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SCRAPER_EMAIL,
    pass: process.env.SCRAPER_PASS,
  }
})

const getCurrentDate = (includeTime) => {
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`
  const legibleDate = `${date.getMonth() + 1}/${date.getDate()}`
  return includeTime ? `${legibleDate} ${time}` : legibleDate
}

const items = [
  {
    address: 'https://www.apple.com/shop/product/FTXN2LL/A/refurbished-11-inch-ipad-pro-wi-fi-64gb-space-gray',
    name: '11 inch ipad',
    dateEmailed: null,
  },
  {
    address: 'https://www.apple.com/shop/product/FVVJ2LL/A/refurbished-16-inch-macbook-pro-26ghz-6-core-intel-core-i7-with-retina-display-space-gray',
    name: '16 inch MBP',
    dateEmailed: null,
  }
]

const scrapeAppleRefurbAvailability = async ({ url }) => {
  // const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

  await page.goto(url, {waitUntil: 'networkidle2'}).catch(console.warn);

  const isDisabled = await page.evaluate(() => {
    const addToCartButton = document.querySelector('button[name="add-to-cart"]')
    return addToCartButton.disabled
  })

  await browser.close();

  return !isDisabled
}

const sendMail = async ({ item }) => {
  const mailOptions = {
    from: process.env.SCRAPER_EMAIL,
    to: process.env.SCRAPER_TO,
    subject: 'apple refurb product hit',
    text: `${item.name} is available here: ${item.address}`,
  }

  await transporter.sendMail(mailOptions)
    .catch((err) => {
      console.error('mail failed to send: ', err)
    })
}

const emailAvailableItems = async () => {
  console.log(`starting scrape for: ${getCurrentDate(true)}`)

  const date = getCurrentDate()
  for (const item of items) {
    // check if already emailed availability today:
    if (date !== item.dateEmailed) {
      const isAvailable = await scrapeAppleRefurbAvailability({ url: item.address })

      if (isAvailable) {
        await sendMail({ item })
        item.dateEmailed = getCurrentDate()
      }
    }
  }
}

const runCheckRefurbApp = () => {
  emailAvailableItems()

  setInterval(() => {
    emailAvailableItems()
  }, 3600000)
}

runCheckRefurbApp()
