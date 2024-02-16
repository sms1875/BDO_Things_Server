const express = require('express');
const app = express();
const marketWaitListRouter = require('./src/routes/marketWaitList'); // Import marketWaitList router
const updateMarketWaitList = require('./src/tasks/marketWaitListUpdater'); // Import fetchAndSaveMarketWaitListData function

// Fetch and save market wait list data initially
updateMarketWaitList();

// Schedule to fetch and save market wait list data every minute
setInterval(updateMarketWaitList, 60000); // 1 minute = 60000 milliseconds


// Use marketWaitList router for '/marketWaitList' route
app.use('/', marketWaitListRouter);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/main.html');
});

app.get('/main', function (req, res) {
  res.sendFile(__dirname + '/public/main.html');
});

app.listen(3000, function () {
  console.log('Express server started on port 3000');
});