import { Joi, Segments } from 'celebrate';
export default {
  create: {
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  },
  update: {
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  },
};
