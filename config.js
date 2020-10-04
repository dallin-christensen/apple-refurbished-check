// set items you'd like to scrape for here. Just needs URL and name.
const items = [
    {
        address: 'https://www.apple.com/shop/product/FTXN2LL/A/refurbished-11-inch-ipad-pro-wi-fi-64gb-space-gray',
        name: '11 inch ipad',
    },
    {
        address: 'https://www.apple.com/shop/product/FTXP2LL/A/refurbished-11-inch-ipad-pro-wi-fi-64gb-silver',
        name: '11 inch ipad silver',
    },
    {
        address: 'https://www.apple.com/shop/product/FVVJ2LL/A/refurbished-16-inch-macbook-pro-26ghz-6-core-intel-core-i7-with-retina-display-space-gray',
        name: '16 inch MBP',
    },
    {
        address: 'https://www.apple.com/shop/product/FVVL2LL/A/refurbished-16-inch-macbook-pro-26ghz-6-core-intel-core-i7-with-retina-display-silver',
        name: '16 inch MBP silver',
    },
]

// set how long you would like to wait between scrape intervals in minutes, i.e. 60 will check every hour
const scrapeDelayInterval = 60


module.exports = {
    items,
    scrapeDelayInterval,
}