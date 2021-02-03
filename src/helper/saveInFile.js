const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;

const writeFile = promisify(fs.writeFileSync);

const saveInFile = async (pathToSave, fileName, data) => {
	try {
		const fullSavePath = path.join(pathToSave, fileName);
		console.log(fullSavePath);
		await writeFile(fullSavePath, JSON.stringify(data, null, 4));
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	saveInFile,
};
