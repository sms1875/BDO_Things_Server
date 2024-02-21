const schedule = require('node-schedule');

// 거래 대기 목록 업데이트 작업을 가져옵니다.
const updateMarketWaitList = require('../tasks/marketWaitListUpdater');
const updateMaterialsMarketPrice = require('../tasks/materialsMarketPriceUpdater');

// 스케줄러 시작 함수
const start = () => {
  // 1분마다 거래 대기 목록 업데이트 작업을 수행합니다.
  schedule.scheduleJob('*/1 * * * *', async () => {
    await updateMarketWaitList();
  });

  schedule.scheduleJob('*/1 * * * *', async () => {
    await updateMaterialsMarketPrice();
  });

  // 5분마다 임시 작업을 수행합니다.
  schedule.scheduleJob('*/5 * * * *', () => {
    console.log('임시 작업을 수행합니다.');
  });
};

module.exports = { start };
