import express, { Request, Response } from "express";
import firebaseService from "../services/firebaseService";
import { ItemDTO } from "../types/bdolyticsDTO";
import { FIREBASE_COLLECTIONS } from "../constants";
import logger from "../config/logger";

const router = express.Router();
const cached = new Map();

router.get("/getCrateProducts", async (req: Request, res: Response) => {
    try {
        if (cached.has("getCrateProducts")) {
            return res.status(200).json(cached.get("getCrateProducts"));
        }
        let documents: ItemDTO[] = await firebaseService.getDocuments(
            FIREBASE_COLLECTIONS.CRATE_PRODUCT
        );

        cached.set("getCrateProducts", documents);
        res.status(200).json(documents);
    } catch (error) {
        logger.error("가공 무역 레시피 정보를 가져오는 중 에러 발생:", error);
        res.status(500).json({
            error: "가공 무역 레시피 정보를 가져오는 중 에러 발생"
        });
    }
});

export default router;
