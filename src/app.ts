import express, { Application } from "express";
import routes from "./routes/index";
import { scheduleJobs } from "./schedule/scheduleJobs";

scheduleJobs();

const app: Application = express();

app.use("/", routes);

app.use(express.static(__dirname));

app.listen(3000, function () {
    console.log("Express server started on port 3000");
});
