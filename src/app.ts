import express, { Application } from "express";
import routes from "./routes/index";
import logger from "./config/logger";
import config from "./config/config";
import morganMiddleware from "./config/morganMiddleware";
import { scheduleJobs } from "./schedule/scheduleJobs";

class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.configureMiddlewares();
        this.configureRoutes();
        this.startServer();
        this.scheduleJobs();
    }

    private configureMiddlewares() {
        this.app.use(express.static(__dirname));
        this.app.use(morganMiddleware);
    }

    private configureRoutes() {
        this.app.use("/", routes);
    }

    private startServer() {
        const port = config.port;
        this.app.listen(port, () => {
            logger.info(`NODE ENV = ${process.env.NODE_ENV}`);
            logger.info(`Server is running on port : ${port}`);
        });
    }

    private scheduleJobs() {
        scheduleJobs();
    }
}

new App();
