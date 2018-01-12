const path = require('path')		
const fs = require('fs');		
const Promise = require('bluebird');		
const { parseCsv } = require('./client/src/parseCsv');

const readFile = Promise.promisify(require('fs').readFile);

const parseLocalCsv = filePath => readFile(filePath, 'utf8').then(content => parseCsv(content));

module.exports = { parseLocalCsv };
