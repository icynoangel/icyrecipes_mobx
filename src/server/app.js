const express = require('express');
const data = require('./data/data');
const bodyParser = require('body-parser');
const path = require('path');
const args = process.argv.slice(2);
const isDevelopment = args[0] === 'dev';

const app = express();

const RESPONSE_TIMEOUT = 3000;

app.use(function(req, res, next) {
  if (isDevelopment) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(function(req, res, next) {
  // Disable caching for content files
  // res.header("Max-Age", 0);
  // res.header('Last-Modified', (new Date()).toString());
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', 0);
  res.header('Pragma', 'no-cache');
  next();
});

if (!isDevelopment) {
  app.use(express.static(path.resolve(__dirname, '../../build')));
}
app.use(express.static(path.resolve(__dirname, './static')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.use(bodyParser.json()); // for parsing application/json

app.get(data.responses.endpoint, (req, res) => {
  setTimeout(function() {
    res.send(data.responses.success);
  }, RESPONSE_TIMEOUT);
});

app.get(data.responses.errorEndpoint, (req, res) => {
  setTimeout(function() {
    res.status(500).send(data.responses.error);
  }, RESPONSE_TIMEOUT);
});

module.exports = app;
