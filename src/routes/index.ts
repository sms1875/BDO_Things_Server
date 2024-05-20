import express from "express";
import marketWaitListRouter from "./getMarketWaitList";
import getWorldMarketSearchList from "./getWorldMarketSearchList";
import getDesignDetails from "./getDesignDetails";
import getingrediantsMarketPrice from "./getIngrediantsMarketPrice";

const router = express.Router();

router.use("/", marketWaitListRouter);
router.use("/", getWorldMarketSearchList);
router.use("/", getDesignDetails);
router.use("/", getingrediantsMarketPrice);

export default router;
