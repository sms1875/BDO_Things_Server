const { connPool, sql } = require('../../db/dbConnect');
const MarketApi = require('../api/marketApi');

/*
 */
const updateMaterialsMarketPrice = async () => {
  try {
    const query = await connPool;
    const request = await query.request().execute('[bdo_thinsg].[dbo].[GetMaterialIds]');
    const materialIds = request.recordset.map(row => row['MaterialId']);
    console.log('Material IDs:', materialIds);
  } catch (error) {
    console.error('Error fetching material IDs:', error);
  }
};

module.exports = updateMaterialsMarketPrice; 