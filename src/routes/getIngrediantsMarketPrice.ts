import express, { Request, Response } from "express";
import firebaseService from "../firebase/firebaseService";
import { IngrediantsMarketPriceDTO } from "../DTO/firebaseDTO";
import { FIREBASE_COLLECTIONS } from "../constants";

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
router.get(
    "/getIngrediantsMarketPrice",
    async (req: Request, res: Response) => {
        try {
            const documents: IngrediantsMarketPriceDTO[] =
                await firebaseService.getDocuments(
                    FIREBASE_COLLECTIONS.INGREDIANTS_MARKETPRICE
                );

            // 응답합니다.
            res.status(200).json(documents);
        } catch (error) {
            console.error(
                "가공 무역 레시피 정보를 가져오는 중 에러 발생:",
                error
            );
            res.status(500).json({
                error: "가공 무역 레시피 정보를 가져오는 중 에러 발생"
            });
        }
    }
);

export default router;
