const fs = require('fs');
const path = require('path');

const saveInFile = (pathToSave, fileName, data) => {
  const fullSavePath = path.join(pathToSave, fileName);
  console.log(fullSavePath);
  fs.writeFileSync(fullSavePath, JSON.stringify(data, null, 4));
}

module.exports = {
  saveInFile,
}
