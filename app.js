const express = require('express');
const { connPool } = require('./server'); // Require tmpFilePath from dataFetcher.js
const app = express();
const marketWaitListRouter = require('./marketWaitList'); // Import marketWaitList router
const { fetchAndSaveMarketWaitListData } = require('./datafetcher'); // Import fetchAndSaveMarketWaitListData function


connPool;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/main.html');
});

app.get('/main', function (req, res) {
  res.sendFile(__dirname + '/public/main.html');
});

// Use marketWaitList router for '/marketWaitList' route
app.use('/', marketWaitListRouter);

app.listen(3000, function () {
  console.log('Express server started on port 3000');
});