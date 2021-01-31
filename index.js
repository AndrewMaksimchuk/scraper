const path = require('path');
const { rcs } = require('./src/rcs');
const {vdmais} = require('./src/vdmais');
const {electronoff} = require('./src/electronoff');
const {cosmodrom} = require('./src/cosmodrom');
const {saveInFile} = require('./src/helper/saveInFile');

const pathToSaveFiles = path.join(__dirname, 'files');
const pathToTextFile = path.join(pathToSaveFiles, 'text');
const pathToImg = path.join(pathToSaveFiles, 'img');

const param = 'leg-12';

rcs(param, pathToImg)
  .then(data => saveInFile(pathToTextFile, "rcs.json", data))
  .catch(e => console.error(e));

vdmais(param, pathToImg)
  .then(data => saveInFile(pathToTextFile, "vdmais.json", data))
  .catch(e => console.error(e));

electronoff(param, pathToImg)
  .then(data => saveInFile(pathToTextFile, "electronoff.json", data))
  .catch(e => console.error(e));

cosmodrom(param, pathToImg)
  .then(data => saveInFile(pathToTextFile, "cosmodrom.json", data))
  .catch(e => console.error(e));

// TODO: Error: net::ERR_CONNECTION_TIMED_OUT

// TODO: Create main function to run all, input point.
const getParseDataFromCompetitor = (param) => {

}

module.exports = {
  getParseDataFromCompetitor,
}
