import * as joi from "joi";

export const JoiValidationSchema = joi.object({
    PORT: joi.number().default(3000),
    URI_MONGODB: joi.required(),
    DEFAULT_LIMIT: joi.number().default(6)
});