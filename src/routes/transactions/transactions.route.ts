import { celebrate } from "celebrate";
import express from "express";
import transactionSchema from "../../constants/schema/transaction.schema";
import transactionController from "../../controllers/transaction.controller";

const router = express.Router();

router.get("/", transactionController.list);
router.post(
  "/",
  celebrate(transactionSchema.create),
  transactionController.create
);
router.put(
  "/:id",
  celebrate(transactionSchema.update),
  transactionController.update
);
router.get("/:id", transactionController.get);
router.delete("/:id", transactionController.remove);

export default router;
