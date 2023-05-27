import httpStatus from "http-status";

function constructErrorResponseBody(message, statusCode) {
  return {
    message,
    statusCode,
  };
}

function OK({ res, body }) {
  return res.status(httpStatus.OK).send(body);
}

function CREATED({ res, body = {} }) {
  return res.status(httpStatus.CREATED).send(body);
}

function NO_CONTENT({ res }) {
  return res.sendStatus(httpStatus.NO_CONTENT);
}

function BAD_REQUEST({ res, message = "Invalid request!" }) {
  const statusCode = httpStatus.BAD_REQUEST;
  const body = constructErrorResponseBody(message, statusCode);
  return res.status(statusCode).send(body);
}

function NOT_FOUND({ res, message = "No results were found!" }) {
  const statusCode = httpStatus.NOT_FOUND;
  const body = constructErrorResponseBody(message, statusCode);
  return res.status(httpStatus.NOT_FOUND).send(body);
}

function SERVER_ERROR({ res, message = "Something went wrong!" }) {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const body = constructErrorResponseBody(message, statusCode);
  return res.status(statusCode).send(body);
}

const responseHelper = {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
};

export { responseHelper };
