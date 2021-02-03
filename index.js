const path = require("path");
const { rcs } = require("./src/rcs");
const { imrad } = require("./src/imrad");
const { vdmais } = require("./src/vdmais");
const { electronoff } = require("./src/electronoff");
const { cosmodrom } = require("./src/cosmodrom");
const { masteram } = require("./src/masteram");
const { saveInFile } = require("./src/helper/saveInFile");

const pathToSaveFiles = path.join(__dirname, "files");
const pathToTextFile = path.join(pathToSaveFiles, "text");
const pathToImg = path.join(pathToSaveFiles, "img");

const runParser = async (func, param, pathToTextFile, pathToImg) => {
	try {
		const data =  await func(param, pathToImg);
		// saveInFile(pathToTextFile, `${func}.json`, data);
		return data;
	} catch (error) {
		console.error(error);
		return { message: 'Дані не отримано, сталася помилка.' }
	}
}

const getParseDataFromCompetitor = async (param) => {
	const allRequestsPromises = [
		runParser(rcs, param, pathToTextFile, pathToImg),
		runParser(imrad, param, pathToTextFile, pathToImg),
		runParser(vdmais, param, pathToTextFile, pathToImg),
		runParser(electronoff, param, pathToTextFile, pathToImg),
		runParser(cosmodrom, param, pathToTextFile, pathToImg),
		runParser(masteram, param, pathToTextFile, pathToImg)
	];
	const allRequestsNames = ['rcs', 'imrad', 'vdmais', 'electronoff', 'cosmodrom', 'masteram'];
	const answers = await Promise.allSettled(allRequestsPromises); // answers is array of Objects { status: String, value: any }
	return answers.map((value, index) => {
		return Object.fromEntries([
			["name", allRequestsNames[index]],
			["data", value]
		]);
	});
};

module.exports = {
	getParseDataFromCompetitor,
};

// TODO: Error: net::ERR_CONNECTION_TIMED_OUT