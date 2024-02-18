const express = require('express');
const router = express.Router();
const { connPool, sql } = require('../../db/dbConnect');

// Add middleware to parse JSON-encoded bodies
router.use(express.json());

router.post('/getDesignDetails', async (req, res) => {
  try {
    const query = await connPool;
    const result = await query.request().execute('[bdo_thinsg].[dbo].[GetDesignDetails]');
    console.log(processDesignDetails(result.recordset));
    res.status(200).json(processDesignDetails(result.recordset));
  } catch (error) {
    console.error('Error getting world market search list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 디자인 ID 기준으로 재료 정리
const processDesignDetails = (designDetails) => {
  // Object to store processed design details
  const processedDesigns = {};

  // Loop through each design detail
  designDetails.forEach(detail => {
    const { 'Design ID': designId, 'Product ID': productId, 'Product Sell Price': productSellPrice, 'Product Name': productName, 'Product Quantity': productQuantity, 'Material ID': materialId, 'Material Quantity': materialQuantity, 'Market Price': marketPrice, 'Material Name': materialName } = detail;

    // Check if design ID already exists in processed designs
    if (processedDesigns[designId]) {
      // If design ID exists, push material details to existing design's materials array
      processedDesigns[designId].materials.push({
        'Material ID': materialId,
        'Material Quantity': materialQuantity,
        'Market Price': marketPrice,
        'Material Name': materialName
      });
    } else {
      // If design ID doesn't exist, create a new design object with material details
      processedDesigns[designId] = {
        'Design ID': designId,
        'Product ID': productId,
        'Product Sell Price': productSellPrice,
        'Product Name': productName,
        'Product Quantity': productQuantity,
        materials: [{
          'Material ID': materialId,
          'Material Quantity': materialQuantity,
          'Market Price': marketPrice,
          'Material Name': materialName
        }]
      };
    }
  });

  // Convert processed designs object into an array of design details
  const processedDesignsArray = Object.values(processedDesigns);

   return processedDesignsArray;
};

module.exports = router;