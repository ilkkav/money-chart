const express = require('express');
const path = require('path');
const fs = require('fs');
const parseFile = require('./parseCsv').parseFile;

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');

  let filePath = path.join(__dirname, 'data/exampleData.csv');
  if(fs.existsSync(`${__dirname}/data/local`)) {
    filePath = path.join(`${__dirname}/data/local`, 'Tapahtumat_2016.csv');
  }

  parseFile(filePath)
  .then(result => {
    res.send(result);
  });
});

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
