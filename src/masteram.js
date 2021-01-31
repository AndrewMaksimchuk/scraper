const puppeteer = require('puppeteer');
const config = require('../config');
const path = require('path');

const masteram = async (param, pathToImg) => {
  const browser = await puppeteer.launch({headless: config.browserHeadless});
  const page = await browser.newPage();
  const url = `${config.searceUrls.masteram}${param}`;
  await page.goto(url);
  await page.setViewport({
    width: 1024,
    height: 3024
  })
  if (config.makeScreenshot) await page.screenshot({path: path.join(pathToImg, 'masteram.png')});
  const result = await page.evaluate(() => {
    try {
      const div = document.querySelectorAll('div[class="row grid-type"]')[0];
      const arrOfGoodsCard = Array.from(div.querySelectorAll('div[class="col-xs-12 col-sm-6 col-md-6 col-lg-4 relative product-col"]'));
      const arrOfGoodsDescriptions = arrOfGoodsCard.map(goodsCard => {
        let name, inStock, price;
        const code = goodsCard.dataset.id;
        const checkName = goodsCard.querySelector('div[class="prc_name"]');
        checkName
          ? name = checkName.textContent.trim()
          : name = 'Не отримано'
        const inStockPlusPrice = goodsCard.querySelectorAll('div[class="full-width clearfix"]'); // colection of elements
        const checkStock = inStockPlusPrice[0].lastElementChild;
        checkStock
          ? inStock = checkStock.textContent.trim()
          : inStock = 'Не отримано'
        const checkPrice = inStockPlusPrice[1].querySelector('div[class="-current"]');
        checkPrice
          ? price = checkPrice.textContent.trim()
          : price = 'Не отримано'
        return {
          code,
          name,
          inStock,
          price
        };
      });
      return arrOfGoodsDescriptions;
    } catch (e) {
      console.error(e);
      return { message: 'Товар не знайдено!' }
    }
  });
  await browser.close();
  return result;
}

module.exports = {
  masteram,
}
