import { Joi, Segments } from "celebrate";
export default {
  create: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required(),
    },
  },
  update: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required(),
    },
  },
};
