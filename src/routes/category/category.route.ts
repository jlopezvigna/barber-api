import { celebrate } from "celebrate";
import express from "express";
import categorySchema from "../../constants/schema/category.schema";
import categoryController from "../../controllers/category.controller";

const router = express.Router();

router.get("/", categoryController.list);
router.post("/", celebrate(categorySchema.create), categoryController.create);
router.put("/:id", celebrate(categorySchema.update), categoryController.update);
router.get("/:id", categoryController.get);
router.delete("/:id", categoryController.remove);

export default router;
