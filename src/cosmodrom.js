const puppeteer = require('puppeteer');
const path = require('path');
const config = require('../config');

const cosmodrom = async (param, pathToImg) => {
  const browser = await puppeteer.launch({headless: config.browserHeadless});
  const page = await browser.newPage();
  const url = `${config.searceUrls.cosmodrom}${param}`;
  await page.goto(url);
  await page.setViewport({
    width: 1024,
    height: 3024
  })
  if (config.makeScreenshot) await page.screenshot({path: path.join(pathToImg, 'cosmodrom.png')});
  await page.waitForSelector('tr[bgcolor]');
  const table = await page.evaluate(() => {
    const tr = Array.from(document.querySelectorAll('tr[bgcolor]'));
    const result = tr.map(elementTR => {
        let description = elementTR.children[1]
        description = description.firstChild.firstChild.textContent;
        let price = elementTR.lastElementChild
        if (!price) price = 'Ціну не отримано';
        try {
          // price = price.firstChild.querySelector('table').lastElementChild.lastElementChild.children[1].textContent
          price = price.firstChild.querySelector('table').lastElementChild.lastElementChild.textContent
        } catch (e) {
          price = 'Ціну не отримано'
          console.error(e)
        }
        console.log(description, '\n', price);
        return {description, price};
    })
    return result;
  });
  await browser.close();
  return table;
}

module.exports = {
  cosmodrom,
}
