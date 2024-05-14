import MarketApi from '../api/marketApi';

/**
 * 가공무역 재료 거래소 가격을 업데이트합니다.
 * 
 * @description
 * - DB에 material ID를 요청합니다.
 * - 거래소 API를 통해 material의 시장 가격을 가져와 데이터베이스에 업데이트합니다.
 */
const updateMaterialsMarketPrice = async (): Promise<void> => {
  try {
    /*
    const query = await connPoolPromise;
    const request = await query.request().execute('[bdo_things].[dbo].[GetMaterialIds]');
    const materialIds: number[] = request.recordset.map((row: any) => row['MaterialId']);

    // 각 재료에 대해 Market API를 사용하여 검색을 수행하고 결과를 처리합니다.
    for (const materialId of materialIds) {
      const searchResult = await MarketApi.getWorldMarketSearchList(materialId.toString());

      // 거래소에서 가져온 데이터가 유효한지 확인합니다.
      if (searchResult && searchResult.resultCode === 0) {
        // 검색 결과를 파싱하여 필요한 정보를 추출합니다.
        const [itemId, currentStock, basePrice, totalTrades] = searchResult.resultMsg.split('-');
        const marketPrice: number = parseInt(basePrice); // 거래소에서 가져온 기본 가격을 사용합니다.

        // 해당 재료의 거래소 가격을 갱신합니다.
        await updateMaterialMarketPrice(materialId, marketPrice);
      } else {
        console.error('재료 ID', materialId, '에 대한 시장 데이터를 가져오지 못했습니다');
      }
    }
*/
    console.log('가공 무역 재료 거래소 가격이 업데이트되었습니다.');
  } catch (error) {
    console.error('재료 ID를 가져오는 중 에러 발생:', error);
  }
};

/**
 * 데이터베이스에서 재료의 시장 가격을 업데이트합니다.
 * @param {number} materialId - 재료의 ID.
 * @param {number} marketPrice - 업데이트할 시장 가격.
 */
const updateMaterialMarketPrice = async (materialId: number, marketPrice: number): Promise<void> => {
  try {
    /*
    const query = await connPoolPromise;
    const request = await query.request()
      .input('MaterialID', mssql.Int, materialId)
      .input('MarketPrice', mssql.Int, marketPrice)
      .execute('[bdo_things].[dbo].[UpdateMaterialMarketPrice]');
      */
  } catch (error) {
    console.error('재료 ID', materialId, '에 대한 시장 가격 업데이트 중 에러 발생:', error);
  }
};

export default updateMaterialsMarketPrice;
