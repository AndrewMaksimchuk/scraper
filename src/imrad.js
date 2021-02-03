const config = require('../config');
const { default: axios } = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const loopThroughArray = (arr, callback) => {
	return arr.map(callback);
}

const parseGoodsObject = (html) => {
	let name, price;
	const fragPrice = JSDOM
		.fragment(html.price)
		.querySelector(".price__catalog")
	fragPrice
		? price = fragPrice.textContent.replace(/\s+/gm, ' ').trim()
		: price = 'Ціна відсутня'
	name = JSDOM
		.fragment(html.name)
		.textContent
		.trim();
	return { name, code: html.artikul, price }
}

const imrad = async (param) => {
	const url = `${config.searceUrls.imrad}${param}`;
	return await axios.post(url)
		.then(response => {
			return response.data.rows;
		})
		.then(arr => loopThroughArray(arr, parseGoodsObject));
}

module.exports = {
  imrad,
}