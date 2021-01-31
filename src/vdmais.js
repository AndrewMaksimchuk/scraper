const puppeteer = require('puppeteer');
const config = require('../config');
const path = require('path');

const vdmais = async (param, pathToImg) => {
  const browser = await puppeteer.launch({headless: config.browserHeadless});
  const page = await browser.newPage();
  const url = `${config.searceUrls.vdmais}${param}`;
  await page.goto(url);
  await page.setViewport({
    width: 1024,
    height: 3024
  })
  if (config.makeScreenshot) await page.screenshot({path: path.join(pathToImg, 'vdmais.png')});
  const table = await page.evaluate(() => {
    const tr = Array.from(document.querySelectorAll('.table-orders_catalog__row'));
    const text = tr.map(td => {
      const raw = td.textContent;
      return raw.replace(/(\t)/gm, '').trim();
    });
    return text;
  });
  await browser.close();
  return table;
}

module.exports = {
  vdmais,
}
