import schedule from 'node-schedule';
import marketWaitListUpdater from '../tasks/marketWaitListUpdater';
import materialsMarketPriceUpdater from '../tasks/materialsMarketPriceUpdater';

// 스케줄러 시작 함수
const start = (): void => {
  // 1분마다 거래 대기 목록 업데이트 작업을 수행합니다.
  schedule.scheduleJob('*/10 * * * *', async () => {
     await materialsMarketPriceUpdater();
  });

  // 10분마다 재료 시세 업데이트 작업을 수행합니다.
  schedule.scheduleJob('*/1 * * * *', async () => {
    await marketWaitListUpdater();
  });
};

export { start };
