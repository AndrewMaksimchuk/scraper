const puppeteer = require('puppeteer');
const config = require('../config');
const path = require('path');

const rcs = async (param, pathToImg) => {
  const browser = await puppeteer.launch({headless: config.browserHeadless});
  const page = await browser.newPage();
  const url = `${config.searceUrls.rcs}${param}`;
  await page.goto(url);
  await page.setViewport({
    width: 1024,
    height: 3024
  })
  if (config.makeScreenshot) await page.screenshot({path: path.join(pathToImg, 'rcs.png')});
  const data = await page.evaluate(() => {
    const table = document.querySelectorAll('table')[0];
    const tr = Array.from(table.querySelectorAll('tr[class]'));
    try {
      return tr.map(td => {
        const namePlusCode = td.querySelector(':nth-child(2)');
        let name, code;
        if (namePlusCode) {
          name = namePlusCode.firstElementChild;
          if (name) name = name.firstChild;
          name
            ? name = name.textContent
            : name = 'Не отримано'
          code = namePlusCode.childNodes[3];
          code
            ? code = code.textContent.trim()
            : code = 'Не отримано'
        }
        let price = td.childNodes[13];
        if (price) price = price.firstElementChild;
        price
          ? price = price.textContent.replace(/[\n\t ]/gm, '').trim()
          : price = 'Не отримано'
        let inStock = td.childNodes[11];
        if (inStock) inStock = inStock.firstElementChild;
        inStock
          ? inStock = inStock.textContent.replace(/ /gm, '').trim()
          : inStock = 'Не отримано'
        return {
          name,
          code,
          price,
          inStock
        }
      });
    } catch (e) {
      console.error(e);
      return { message: 'Не вдалося отримати дані!'}
    }
  });
  await browser.close();
  return data;
}

module.exports = {
  rcs,
}
