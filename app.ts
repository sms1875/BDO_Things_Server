import express, { Application, Request, Response } from 'express';
import marketWaitListRouter from './src/routes/getMarketWaitList';
import getWorldMarketSearchList from './src/routes/getWorldMarketSearchList';
import getDesignDetails from './src/routes/getDesignDetails';
import { start as startSchedule } from './src/schedule/schedule';

// 스케줄러를 시작합니다.
startSchedule();

const app: Application = express();

// Use marketWaitList router for '/marketWaitList' route
app.use('/', marketWaitListRouter);
app.use('/', getWorldMarketSearchList);
app.use('/', getDesignDetails);

app.use(express.static(__dirname));

app.get('/', function (req: Request, res: Response) {
  res.sendFile(__dirname + '/BDO-Things/index.html');
});

app.get('/main', function (req: Request, res: Response) {
  res.sendFile(__dirname + '/BDO-Things/main.html');
});

app.listen(3000, function () {
  console.log('Express server started on port 3000');
});
