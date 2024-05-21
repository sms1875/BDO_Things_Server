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

// hello world 출력
router.get("/", (req, res) => {
    res.send("Hello World!");
});

export default router;
