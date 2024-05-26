import express, { Request, Response } from "express";
import firebaseService from "../services/firebaseService";
import { DesignDTO } from "../types/bdolyticsDTO";
import { FIREBASE_COLLECTIONS } from "../constants";
import logger from "../config/logger";

const router = express.Router();

/**
 * 가공 무역 레시피 정보를 가져와 응답합니다.
 *
 * @description
 * - 데이터베이스에서 가공 무역 레시피 정보를 조회하여 응답합니다.
 * - GET 요청을 통해 데이터를 가져옵니다.
 *
 * @param {Request} req - 요청 객체
 * @param {Response} res - 응답 객체
 */
router.get("/getCrateDesigns", async (req: Request, res: Response) => {
    try {
        let documents: DesignDTO[] = await firebaseService.getDocuments(
            FIREBASE_COLLECTIONS.CRATE_DESIGN
        );

        // 각 문서에 필터를 적용합니다.
        documents = documents.map(filterDesignData);

        // 응답합니다.
        res.status(200).json(documents);
    } catch (error) {
        logger.error("가공 무역 레시피 정보를 가져오는 중 에러 발생:", error);
        res.status(500).json({
            error: `getCrateDesigns error : ${error}`
        });
    }
});

/**
 * 디자인 데이터 필터링 함수
 * @param {DesignDTO} designData - 필터링할 디자인 데이터
 * @returns {DesignDTO} - 필터링된 디자인 데이터
 */
function filterDesignData(designData: DesignDTO): DesignDTO {
    return {
        id: designData.id,
        name: designData.name,
        icon_image: designData.icon_image,
        // crafting_time: designData.crafting_time,
        ingredients: designData.ingredients,
        products: designData.products,
        // crafted_in_houses: designData.crafted_in_houses,
        db_type: designData.db_type
    };
}

export default router;
