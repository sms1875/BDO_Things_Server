const { connPool, sql } = require('./server'); // Require tmpFilePath from dataFetcher.js

const fetchAndSaveMarketWaitListData = async () => {
  try {
    const MarketApi = require('./MarketApi');
    const marketWaitList = await MarketApi.getWorldMarketWaitList();
    const query = await connPool;

    if (marketWaitList) {
      
      // Clear the existing data in the table
      await query.request().execute('[bdo_thinsg].[dbo].[ClearMarketWaitListData]');

      // Split the resultMsg into individual items
      const items = marketWaitList.resultMsg.split('|');

      // Loop through each item and insert it into the database
      for (const item of items) {
        // Check if the item is empty (i.e., the last item in the array)
        if (item) {
          const [itemId, enhancementLevel, price, unixTimestamp] = item.split('-');

          // Convert Unix timestamp to datetime
          const datetime = new Date(Number(unixTimestamp) * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');

          // Call the stored procedure to add data to the table
          await query.request()
            .input('itemId', sql.Int, itemId)
            .input('enhancementLevel', sql.Int, enhancementLevel)
            .input('price', sql.BigInt, price)
            .input('datetime', sql.DateTime, new Date(datetime))
            .execute('[bdo_thinsg].[dbo].[AddMarketWaitListData]');
        }
      }

      console.log('Market wait list data inserted into the database.');
    } else {
      console.error('Error fetching market wait list data');
    }
  } catch (error) {
    console.error('Error fetching or inserting market wait list data:', error);
  }
};

// Fetch and save market wait list data initially
fetchAndSaveMarketWaitListData();

// Schedule to fetch and save market wait list data every minute
setInterval(fetchAndSaveMarketWaitListData, 60000); // 1 minute = 60000 milliseconds

module.exports = { fetchAndSaveMarketWaitListData };