# Scrape For Apple Refurbished Product Availability Yo
Is Apple always out of the refurbished shit you're looking for?! Are you getting pissed off every time you check the availabilty of your product and it's unavailable?! Welcome to the solution to all of your woes!! This app will check for user-specified refurbished product avilabily every X minutes and email you when your shit is in stock! Rock on brutha/sista!!

## Setup
- FIRSTLY you'll need a computer and the interwebs, So get some of those
- SECONDLY install dependencies by running `npm install`
- THIRDLY you'll need to designate some environent variables for the mailer.
    - SCRAPER_EMAIL (the email account that the scraper will use to email you FROM)
    - SCRAPER_PASS (the password for the email account that the scraper will use)
    - SCRAPER_TO (the email that the scraper will send available products TO)
- FOURTHLY you'll need to edit the config files with the products you would like to be informed of, and how often you would like the scraper to run.

## SCRAPE THAT SHIT
`npm run start`
