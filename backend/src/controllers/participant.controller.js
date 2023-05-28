import { responseHelper } from "../helpers/index.js";
import { participantService } from "../services/participant.services.js";

async function upsert(req, res) {
  try {
    const result = await participantService.upsert(req.body);

    if (result.updated) return responseHelper.OK({ res, body: result.data });

    return responseHelper.CREATED({ res, body: result.data });
  } catch (error) {
    if (error.type === "Bad Request") {
      return responseHelper.BAD_REQUEST({ res, message: error.message });
    }

    if (error.type === "Internal Server Error") {
      return responseHelper.SERVER_ERROR({ res, message: error.message });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function list(_, res) {
  try {
    const participants = await participantService.list();

    return responseHelper.OK({ res, body: participants });
  } catch (error) {
    return responseHelper.SERVER_ERROR({ res });
  }
}

const participantController = { upsert, list };

export { participantController };
