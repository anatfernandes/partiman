import { responseHelper } from "../helpers/index.js";

function validateParams(schema) {
  return validateSchema(schema, "params");
}

function validateBody(schema) {
  return validateSchema(schema, "body");
}

function validateSchema(schema, type = "body") {
  return (req, res, next) => {
    const validation = schema.validate(req[type], { abortEarly: true });

    if (validation.error) {
      const message = validation.error.details[0].message;
      return responseHelper.BAD_REQUEST({ res, message });
    }

    next();
  };
}

export { validateParams, validateBody };
