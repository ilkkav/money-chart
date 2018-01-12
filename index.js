const express = require('express');
const path = require('path');
const fs = require('fs');
const ParseCsv = require('./client/src/ParseCsv');

const PORT = process.env.PORT || 5000;

const parseFile = filePath => readFile(filePath, 'utf8').then(content => ParseCsv(content));

const exampleDataController = (req, res) => {
  res.set('Content-Type', 'application/json');

  parseFile(path.join(__dirname, 'data/exampleData.csv'))
  .then(result => {
    res.send(result);
  });
};

const initApp = () => {
  const app = express();
  
  app.use(express.static(path.resolve(__dirname, 'client/build')));

  app.get('/api', exampleDataController);
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });

  return app;
};

if (!module.parent) {
  const app = initApp();

  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
}
