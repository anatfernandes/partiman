import { ObjectId } from "mongodb";
import { responseHelper } from "../helpers/index.js";
import { participantService } from "../services/participant.services.js";

function formatId(id) {
  try {
    const objectId = new ObjectId(id);
    return objectId;
  } catch (error) {
    return null;
  }
}

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

async function deleteById(req, res) {
  const id = formatId(req.params.id);

  if (!id) {
    return responseHelper.BAD_REQUEST({
      res,
      message: "Participant Id is invalid!",
    });
  }

  try {
    await participantService.deleteById(id);
    return responseHelper.NO_CONTENT({ res });
  } catch (error) {
    if (error.type === "Not Found") {
      return responseHelper.NOT_FOUND({ res, message: error.message });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

const participantController = { upsert, list, deleteById };

export { participantController };
