import { celebrate } from "celebrate";
import express from "express";
import clientSchema from "../../constants/schema/client.schema";
import clientController from "../../controllers/client.controller";

const router = express.Router();

router.get("/", clientController.list);
router.post("/", celebrate(clientSchema.create), clientController.create);
router.put("/:id", celebrate(clientSchema.update), clientController.update);
router.get("/:id", clientController.get);
router.delete("/:id", clientController.remove);

export default router;
