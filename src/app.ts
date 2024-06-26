import express, { Application } from "express";
import routes from "./routes/index";
import logger from "./config/logger";
import config from "./config/config";
import morganMiddleware from "./middlewares/morgan";
import { scheduleJobs } from "./schedule/scheduleJobs";
import corsMiddleware from "./middlewares/cors";

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
        this.app.use(corsMiddleware);
        this.app.use(express.static(__dirname));
        this.app.use(morganMiddleware);
    }

    private configureRoutes() {
        this.app.use("/", routes);
    }

    private startServer() {
        const port = config.port;
        this.app.listen(8080, "0.0.0.0", () => {
            logger.info(`NODE ENV = ${process.env.NODE_ENV}`);
            logger.info(`Server is running on port : ${port}`);
        });
    }

    private scheduleJobs() {
        scheduleJobs();
    }
}

new App();
