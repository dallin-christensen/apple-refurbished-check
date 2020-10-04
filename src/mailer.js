const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SCRAPER_EMAIL,
    pass: process.env.SCRAPER_PASS,
  }
})

const sendMail = async ({ item }) => {
  console.log('sending mail...')
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

module.exports = sendMail