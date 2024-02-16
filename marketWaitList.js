const express = require('express');
const { connPool } = require('./server'); // Require tmpFilePath from dataFetcher.js
const router = express.Router();

router.get('/marketWaitList', async function (req, res) {
    try {
        const query = await connPool;

        // Call the stored procedure to get market wait list data
        const request = await query.request().execute('[bdo_thinsg].[dbo].[GetMarketWaitListData]');

        // Send the fetched data as response
        res.status(200).json({ data: request.recordset /* + 테이블 수정 시간 추가 */});
    } catch (error) {
        console.error('Error fetching market wait list data:', error);
        res.status(500).json({ error: 'Error fetching market wait list data' });
    }
});

module.exports = router;