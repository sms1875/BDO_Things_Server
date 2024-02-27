import schedule from 'node-schedule';
import updateMarketWaitList from '../tasks/marketWaitListUpdater';
import updateMaterialsMarketPrice from '../tasks/materialsMarketPriceUpdater';

// 스케줄러 시작 함수
const start = (): void => {
  // 1분마다 거래 대기 목록 업데이트 작업을 수행합니다.
  schedule.scheduleJob('*/1 * * * *', async () => {
    await updateMarketWaitList();
  });

  // 1분마다 재료 시세 업데이트 작업을 수행합니다.
  schedule.scheduleJob('*/1 * * * *', async () => {
    await updateMaterialsMarketPrice();
  });

  // 5분마다 임시 작업을 수행합니다.
  schedule.scheduleJob('*/5 * * * *', () => {
    console.log('임시 작업을 수행합니다.');
  });
};

export { start };
