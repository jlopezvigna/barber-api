import { Joi, Segments } from "celebrate";
export default {
  create: {
    [Segments.BODY]: {
      categoryId: Joi.number().required(),
      paymentMethodId: Joi.number().required(),
      clientId: Joi.number().required(),
      amount: Joi.number().required(),
      date: Joi.string().required(),
      transactionType: Joi.string().required(),
    },
  },
  update: {
    [Segments.BODY]: {
      categoryId: Joi.number().required(),
      paymentMethodId: Joi.number().required(),
      clientId: Joi.number().required(),
      amount: Joi.number().required(),
      date: Joi.string().required(),
      transactionType: Joi.string().required(),
    },
  },
};
