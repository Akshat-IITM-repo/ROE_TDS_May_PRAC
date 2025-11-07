// scrape_tables.js
const { chromium } = require('playwright');

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=23",
  "https://sanand0.github.io/tdsdata/js_table/?seed=24",
  "https://sanand0.github.io/tdsdata/js_table/?seed=25",
  "https://sanand0.github.io/tdsdata/js_table/?seed=26",
  "https://sanand0.github.io/tdsdata/js_table/?seed=27",
  "https://sanand0.github.io/tdsdata/js_table/?seed=28",
  "https://sanand0.github.io/tdsdata/js_table/?seed=29",
  "https://sanand0.github.io/tdsdata/js_table/?seed=30",
  "https://sanand0.github.io/tdsdata/js_table/?seed=31",
  "https://sanand0.github.io/tdsdata/js_table/?seed=32"
];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let totalSum = 0;

    for (const url of urls) {
        await page.goto(url);
        // Select all table cells
        const cells = await page.$$eval('table td', tds => tds.map(td => td.innerText));
        
        // Sum numbers in this page
        for (const cell of cells) {
            const num = parseFloat(cell.replace(/[^0-9.-]+/g,"")); // remove non-numeric chars
            if (!isNaN(num)) totalSum += num;
        }
    }

    console.log("Total sum of all numbers in all tables:", totalSum);
    await browser.close();
})();
