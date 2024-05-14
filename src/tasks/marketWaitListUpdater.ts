import MarketApi from '../api/marketApi';

/**
 * 거래소 대기 상품 목록을 업데이트합니다.
 * 
 * @description
 * - 거래소 API를 통해 대기 중인 상품 목록을 가져와 데이터베이스에 업데이트합니다.
 * - 기존 데이터를 삭제하고 새로운 데이터를 삽입합니다.
 */
const updateMarketWaitList = async (): Promise<void> => {
  try {
    /*
    // 거래소 API를 통해 대기 중인 상품 목록을 가져옵니다.
    const marketWaitList = await MarketApi.getWorldMarketWaitList();
    const query = await connPoolPromise;

    if (marketWaitList) {
      // 대기 중인 상품 목록을 개별 항목으로 분할합니다.
      const items = marketWaitList.resultMsg.split('|');

      // 기존 데이터를 삭제합니다.
      await query.request().execute('[bdo_things].[dbo].[ClearMarketWaitListData]');

      // 각 항목을 데이터베이스에 삽입합니다.
      for (const item of items) {
        // 항목이 비어있지 않은지 확인합니다.
        if (item) {
          const [itemId, enhancementLevel, price, unixTimestamp] = item.split('-');

          // Unix 타임스탬프를 날짜 및 시간으로 변환합니다.
          const datetime = new Date(Number(unixTimestamp) * 1000);

          // 저장 프로시저를 호출하여 데이터를 추가합니다.
          await query.request()
            .input('itemId', mssql.Int, itemId)
            .input('enhancementLevel', mssql.Int, enhancementLevel)
            .input('price', mssql.BigInt, price)
            .input('datetime', mssql.DateTime, datetime)
            .execute('[bdo_things].[dbo].[AddMarketWaitListData]');
        }
      }

      console.log('거래소 대기 상품 목록이 데이터베이스에 삽입되었습니다.');
    } else {
      console.error('거래소 대기 상품 목록을 가져오는 중 에러 발생');
    }*/
  } catch (error) {
    console.error('거래소 대기 상품 목록 업데이트 중 에러 발생:', error);
  }
};

export default updateMarketWaitList;
