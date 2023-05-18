import express from "express";

import userAuth from "./user/auth.route";
import categoryRoutes from "./category/category.route";
import clientsRoutes from "./clients/clients.route";
import transactionsRoutes from "./transactions/transactions.route";
import paymentMethodsRoutes from "./payment-methods/payment-methods.route";

const router = express.Router();

router.use("/user/auth", userAuth);
router.use("/categories", categoryRoutes);
router.use("/clients", clientsRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/payment-methods", paymentMethodsRoutes);

export default router;
