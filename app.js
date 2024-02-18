const express = require('express');
const app = express();
const marketWaitListRouter = require('./src/routes/marketWaitList'); 
const getWorldMarketSearchList = require('./src/routes/getWorldMarketSearchList')
const schedule = require('./src/schedule/schedule'); 

// 스케줄러를 시작합니다.
schedule.start();


// Use marketWaitList router for '/marketWaitList' route
app.use('/', marketWaitListRouter);
app.use('/', getWorldMarketSearchList);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/BDO-Things/index.html');
});

app.get('/main', function (req, res) {
  res.sendFile(__dirname + '/BDO-Things/main.html');
});

app.listen(3000, function () {
  console.log('Express server started on port 3000');
});