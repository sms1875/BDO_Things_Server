const { connPool, sql } = require('../../db/dbConnect');
const MarketApi = require('../api/marketApi');

/**
 * 가공무역 재료 거래소 가격을 업데이트합니다
 * 
 * @description
 * - DB에 material ID 요청합니다
 * - 거래소 API를 통해 material의 market price를 가져와 데이터베이스에 업데이트합니다.
 */
const updateMaterialsMarketPrice = async () => {
  try {
    const query = await connPool;
    const request = await query.request().execute('[bdo_thinsg].[dbo].[GetMaterialIds]');
    const materialIds = request.recordset.map(row => row['MaterialId']);
    
    // 각 재료에 대해 Market API를 사용하여 검색을 수행하고 결과를 콘솔에 출력합니다.
    for (const materialId of materialIds) {
      const searchResult = await MarketApi.getWorldMarketSearchList(materialId.toString());
      
      // 거래소에서 가져온 데이터가 유효한지 확인합니다.
      if (searchResult && searchResult.resultCode === 0) {
        // 검색 결과를 파싱하여 필요한 정보를 추출합니다.
        const [itemId, currentStock, basePrice, totalTrades] = searchResult.resultMsg.split('-');
        const marketPrice = parseInt(basePrice); // 거래소에서 가져온 기본 가격을 사용합니다.
        
        // 해당 재료의 거래소 가격을 갱신합니다.
        await updateMaterialMarketPrice(materialId, marketPrice);
      } else {
        console.error('Failed to fetch market data for material ID', materialId);
      }
    }
    console.log('가공 무역 재료 거래소 가격 업데이트');
  } catch (error) {
    console.error('Error fetching material IDs:', error);
  }
};

/**
 * Update the market price of a material in the database.
 * @param {number} materialId - The ID of the material.
 * @param {number} marketPrice - The market price to update.
 */
const updateMaterialMarketPrice = async (materialId, marketPrice) => {
  try {
    const query = await connPool;
    const request = await query.request()
      .input('MaterialID', sql.Int, materialId)
      .input('MarketPrice', sql.Int, marketPrice)
      .execute('[bdo_thinsg].[dbo].[UpdateMaterialMarketPrice]');
  } catch (error) {
    console.error('Error updating market price for material ID', materialId, ':', error);
  }
};

module.exports = updateMaterialsMarketPrice;