import { Router } from "express";
import { validateBody } from "../middlewares/validate.schema.middleware.js";
import { participantSchemas } from "../schemas/participant.schema.js";
import { participantController } from "../controllers/participant.controller.js";

const participantRouter = Router();

participantRouter.post("/", validateBody(participantSchemas.upsert), participantController.upsert);

export { participantRouter };
