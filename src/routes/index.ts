import express from "express";
import marketWaitListRouter from "./getMarketWaitList";
import getWorldMarketSearchList from "./getWorldMarketSearchList";
import getCrateDesigns from "./getCrateDesigns";
import getingredientsMarketPrice from "./getIngredientsMarketPrice";
import getCrateProducts from "./getCrateProducts";
import getCrateIngredients from "./getCrateIngredients";

const router = express.Router();

router.use("/", marketWaitListRouter);
router.use("/", getWorldMarketSearchList);
router.use("/", getCrateDesigns);
router.use("/", getCrateProducts);
router.use("/", getCrateIngredients);
router.use("/", getingredientsMarketPrice);

// hello world 출력
router.get("/", (req, res) => {
    res.send("Hello World!");
});

export default router;
