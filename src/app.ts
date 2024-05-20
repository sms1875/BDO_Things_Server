import express, { Application } from "express";
import routes from "./routes/index";
import { scheduleJobs } from "./schedule/scheduleJobs";
import logger from "./config/logger";
import config from "./config/config";
import morganMiddleware from "./config/morganMiddleware";

const app: Application = express();

app.use("/", routes);
app.use(express.static(__dirname));
app.use(morganMiddleware);

app.listen(config.port, function () {
    logger.info(` NODE ENV = ${process.env.NODE_ENV} `);
    logger.info(`Server is running on port : ${config.port}`);
});

scheduleJobs();
