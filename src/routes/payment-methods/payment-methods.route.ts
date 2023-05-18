import { celebrate } from "celebrate";
import express from "express";
import paymentMethodSchema from "../../constants/schema/payment-method.schema";
import paymentMethodController from "../../controllers/payment-method.controller";

const router = express.Router();

router.get("/", paymentMethodController.list);
router.post(
  "/",
  celebrate(paymentMethodSchema.create),
  paymentMethodController.create
);
router.put(
  "/:id",
  celebrate(paymentMethodSchema.update),
  paymentMethodController.update
);
router.get("/:id", paymentMethodController.get);
router.delete("/:id", paymentMethodController.remove);

export default router;
