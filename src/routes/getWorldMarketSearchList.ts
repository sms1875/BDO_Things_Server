import express, { Request, Response } from "express";
import MarketApi from "../services/marketApiService";
import { MARKET_API_URLS } from "../constants";
import logger from "../config/logger";

const router = express.Router();

router.use(express.json());

/**
 * 아이템 검색 결과를 가져와 응답합니다.
 *
 * @description
 * - 마켓에서 검색 결과를 조회하여 응답합니다.
 *
 * @param {Request} req - 요청 객체
 * body : { "searchResult": "4901,10286" }
 * @param {Response} res - 응답 객체
 */
router.post(
    "/getWorldMarketSearchList",
    async (req: Request, res: Response) => {
        try {
            const { searchResult } = req.body;
            const result = await MarketApi.getWorldMarketSearchList(
                MARKET_API_URLS.KR,
                searchResult
            );
            res.status(200).json(result);
        } catch (error) {
            logger.error("Error getting world market search list:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

export default router;
