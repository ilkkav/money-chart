const express = require('express');
const path = require('path');
const fs = require('fs');
const { parseLocalCsv } = require('./parseLocalCsv');

const PORT = process.env.PORT || 5000;

const exampleDataController = (req, res) => {
  res.set('Content-Type', 'application/json');

  parseLocalCsv(path.join(__dirname, 'data/exampleData.csv'))
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
