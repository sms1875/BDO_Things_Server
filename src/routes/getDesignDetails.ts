import express, { Request, Response } from 'express';
import { connPoolPromise } from '../../db/dbConnect';

const router = express.Router();

/**
 * 가공 무역 레시피 정보를 가져와 응답합니다.
 * 
 * @description
 * - 데이터베이스에서 가공 무역 레시피 정보를 조회하여 응답합니다.
 */
router.post('/getDesignDetails', async (req: Request, res: Response) => {
  try {
    const query = await connPoolPromise;
    const result = await query.request().execute('[bdo_thinsg].[dbo].[GetDesignDetails]');

    res.status(200).json(processDesignDetails(result.recordset));
  } catch (error) {
    console.error('가공 무역 레시피 정보를 가져오는 중 에러 발생:', error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// 디자인 ID 기준으로 재료 정리
const processDesignDetails = (designDetails: any[]) => {
  // Object to store processed design details
  const processedDesigns: { [key: string]: any } = {};

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

export default router;
