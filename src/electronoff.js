const puppeteer = require('puppeteer');
const config = require('../config');
const path = require('path');

const electronoff = async (param, pathToImg) => {
  const browser = await puppeteer.launch({headless: config.browserHeadless});
  const page = await browser.newPage();
  const url = `${config.searceUrls.electronoff}${param}`;
  await page.goto(url);
  await page.setViewport({
    width: 1024,
    height: 3024
  })
  if (config.makeScreenshot) await page.screenshot({path: path.join(pathToImg, 'electronoff.png')});
  const result = await page.evaluate(() => {
    try {
      const ul = document.querySelectorAll('ul.product-items')[0];
      const li = Array.from(ul.querySelectorAll('li'));
      return li.map(goods => {
        const allDescriptions = goods.querySelector('div');
        const name = allDescriptions.querySelector('div.for-title').textContent.trim();
        const price = allDescriptions.querySelector('div.buy-price').lastElementChild.textContent.trim();
        const code = allDescriptions.querySelector('div.articul-status').lastElementChild.textContent.trim();
        return {
          name,
          price,
          code
        }
      });
    } catch (e) {
      console.error(e);
      return { message: 'Товар не знайдено!' }
    }
  });
  await browser.close();
  return result;
}

module.exports = {
  electronoff,
}
