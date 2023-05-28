function notFound(message = "") {
  return {
    type: "Not Found",
    message,
  };
}

function badRequest(message = "") {
  return {
    type: "Bad Request",
    message,
  };
}

function server(message = "") {
  return {
    type: "Internal Server Error",
    message,
  };
}

const errorHelper = { notFound, badRequest, server };

export { errorHelper };
