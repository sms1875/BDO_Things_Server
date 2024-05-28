import express, { Request, Response } from "express";
import firebaseService from "../services/firebaseService";
import { WaitListItemDTO } from "../types/marketDTO";
import { FIREBASE_COLLECTIONS } from "../constants";
import logger from "../config/logger";

const router = express.Router();
const cached = new Map();
/**
 * 거래소 대기 상품 목록을 가져와 응답합니다.
 *
 * @description
 * - 데이터베이스에서 거래소 대기 상품 목록을 조회하여 응답합니다.
 * - GET 요청을 통해 데이터를 가져옵니다.
 *
 * @param {Request} req - 요청 객체
 * @param {Response} res - 응답 객체
 */
router.get("/getMarketWaitList", async (req: Request, res: Response) => {
    try {
        if (cached.has("cached")) {
            return res.status(200).json(cached.get("cached"));
        }
        const documents: WaitListItemDTO[] = await firebaseService.getDocuments(
            FIREBASE_COLLECTIONS.MARKET_WAIT_LIST
        );

        cached.set("cached", documents);
        // 응답합니다.
        res.status(200).json(documents);
    } catch (error) {
        logger.error("거래소 대기 상품 목록을 가져오는 중 에러 발생:", error);
        res.status(500).json({
            error: "거래소 대기 상품 목록을 가져오는 중 에러 발생"
        });
    }
});

export default router;
