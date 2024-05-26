import express from "express";
import marketWaitListRouter from "./getMarketWaitList";
import getWorldMarketSearchList from "./getWorldMarketSearchList";
import getCrateDesigns from "./getCrateDesigns";
import getingredientsMarketPrice from "./getIngredientsMarketPrice";
import getCrateProducts from "./getCrateProducts";
import getCrateIngredients from "./getCrateIngredients";
import getItemImage from "./getItemImage";
import logger from "../config/logger";

const router = express.Router();

router.use(express.json());

router.use("/", marketWaitListRouter);
router.use("/", getWorldMarketSearchList);
router.use("/", getCrateDesigns);
router.use("/", getCrateProducts);
router.use("/", getCrateIngredients);
router.use("/", getingredientsMarketPrice);
router.use("/", getItemImage);

// hello world 출력
router.get("/", (req, res) => {
    res.send("Hello World!");
});

process.on("uncaughtException", (err) => {
    logger.error("Unhandled Exception:", err);
    process.exit(1); // 서버 종료
});

export default router;
