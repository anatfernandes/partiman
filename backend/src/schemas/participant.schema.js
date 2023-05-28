import Joi from "joi";

const upsert = Joi.object({
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  participation: Joi.number().greater(0).max(100).required(),
});

const participantSchemas = { upsert };

export { participantSchemas };
