const express = require('express');
const { connPool } = require('../../db/dbConnect'); 
const router = express.Router();

// UpdateMaterialMarketPrice 프로시저를 호출하여 재료의 거래소 가격을 업데이트하는 라우터
router.post('/updateMaterialMarketPrice', async function (req, res) {
    try {
        const { materialPriceUpdates } = req.body;

        const query = await connPool;
        const table = new query.Table('UpdateMaterialMarketPrice');
        table.columns.add('Id', sql.Int);
        table.columns.add('MarketPrice', sql.Int);

        materialPriceUpdates.forEach(update => {
            table.rows.add(update.Id, update.MarketPrice);
        });

        const request = await query.request();
        request.input('MaterialPriceUpdates', table);
        await request.execute('UpdateMaterialMarketPrice');

        res.status(200).json({ message: 'Material market prices updated successfully' });
    } catch (error) {
        console.error('Error updating material market prices:', error);
        res.status(500).json({ error: 'Failed to update material market prices' });
    }
});

// GetRecipeDetails 프로시저를 호출하여 레시피 상세 정보를 반환하는 라우터
router.get('/getRecipeDetails', async function (req, res) {
    try {
        const query = await connPool;
        const request = await query.request().execute('GetRecipeDetails');

        res.status(200).json({ recipeDetails: request.recordset });  
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
});

module.exports = router;
