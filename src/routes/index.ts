import express from "express";
import marketWaitListRouter from "./getMarketWaitList";
import getWorldMarketSearchList from "./getWorldMarketSearchList";
import getCrateDesigns from "./getCrateDesigns";
import getingrediantsMarketPrice from "./getIngrediantsMarketPrice";
import getCrateProducts from "./getCrateProducts";
import getCrateIngrediants from "./getCrateIngrediants";

const router = express.Router();

router.use("/", marketWaitListRouter);
router.use("/", getWorldMarketSearchList);
router.use("/", getCrateDesigns);
router.use("/", getCrateProducts);
router.use("/", getCrateIngrediants);
router.use("/", getingrediantsMarketPrice);

// hello world 출력
router.get("/", (req, res) => {
    res.send("Hello World!");
});

export default router;
