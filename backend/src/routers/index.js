import { Router } from "express";
import { participantRouter } from "./participant.router.js";

const routes = Router();

routes.use("/participants", participantRouter);

export { routes };
