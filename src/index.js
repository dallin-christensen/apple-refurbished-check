const config = require('../config.js')
const items = config.items.map(item => ({ ...item, dateEmailed: null }))
const scrapeDelayInterval = config.scrapeDelayInterval
const getCurrentDate = require('./utils').getCurrentDate
const scrapeAppleRefurbAvailability = require('./scraper')
const sendMail = require('./mailer')

const handleScrapeAndEmail = async () => {
  const date = getCurrentDate()
  console.log(`starting scrape for: ${date.legibleDateTime}`)

  for (const item of items) {
    // check if already emailed availability today:
    if (date.legibleDate !== item.dateEmailed && date.hour >= 7) {
      const isAvailable = await scrapeAppleRefurbAvailability({ url: item.address })

      if (isAvailable) {
        await sendMail({ item })
        item.dateEmailed = date.legibleDate
      } else {
        console.log(`none available for ${item.name} :(`)
      }
    }
  }

  console.log(`all done! will check again in ${scrapeDelayInterval} minutes :)`)
}

const runCheckRefurbApp = () => {
  handleScrapeAndEmail()

  setInterval(() => {
    handleScrapeAndEmail()
  }, scrapeDelayInterval * 60000)
}

runCheckRefurbApp()
