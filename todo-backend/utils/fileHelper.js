const fs = require('fs');
const path = require('path');

const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, '..', 'database', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJsonFile = (filename, data) => {
  const filePath = path.join(__dirname, '..', 'database', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readJsonFile,
  writeJsonFile
};