import { Router } from "express";
import * as Event from "../controllers/events";

const eventRoutes = Router();

eventRoutes.get("/", Event.getEvents);
eventRoutes.post("/", Event.postEvent);
eventRoutes.patch("/:id", Event.updateEvent);
eventRoutes.delete("/:id", Event.deleteEvent);

export default eventRoutes;
