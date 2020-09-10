import express from "express";
import eventRoutes from "./routes/events";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use("/events", eventRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(3000);
