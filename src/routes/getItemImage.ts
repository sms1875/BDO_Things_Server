import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

router.get("/images/items/:itemId", async (req: Request, res: Response) => {
    const itemName = req.params.itemId;
    const url = `https://cdn.bdolytics.com/images/items/${itemName}.webp`;

    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        res.set("Content-Type", "image/webp");
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).send("Error fetching image");
    }
});

export default router;
