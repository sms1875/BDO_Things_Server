const { connPool } = require('./server'); // Require tmpFilePath from dataFetcher.js

const fetchAndSaveMarketWaitListData = async () => {
  try {
    const MarketApi = require('./MarketApi');
    const marketWaitList = await MarketApi.getWorldMarketWaitList();

    if (marketWaitList) {
      console.log(marketWaitList);
      
      // Clear the existing data in the table
      const clearQuery = await connPool;
      await clearQuery.request().query(`
        DELETE FROM [bdo_thinsg].[dbo].[거래소 등록대기]
      `);

      // Split the resultMsg into individual items
      const items = marketWaitList.resultMsg.split('|');

      // Loop through each item and insert it into the database
      for (const item of items) {
        // Check if the item is empty (i.e., the last item in the array)
        if (item) {
          const [itemId, enhancementLevel, price, unixTimestamp] = item.split('-');

          // Convert Unix timestamp to datetime
          const datetime = new Date(Number(unixTimestamp) * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');

          const query = await connPool;
          const request = await query.request().query(`
            INSERT INTO [bdo_thinsg].[dbo].[거래소 등록대기] ([Item ID], [Enhancement Level], [Price], [Timestamp when item hits the market])
            VALUES (${itemId}, ${enhancementLevel}, ${price}, '${datetime}')
          `);
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