import express from "express";
import morgan from "morgan";
import application from "../constants/application";
import {
  errorHandler,
  notFoundErrorHandler,
} from "../middlewares/apiErrorHandler";
import authenticate from "../middlewares/authenticate";
import joiErrorHandler from "../middlewares/joiErrorHandler";
import indexRoute from "../routes/index.route";
import Container from "typedi";
import { AppDataSource } from "./AppDataSource";
import { User } from "../entities/user/user.entity";
import { Category } from "../entities/category/category.entity";
import { Client } from "../entities/client/client.entity";
import { PaymentMethod } from "../entities/payment-methods/payment-methods.entity";
import { Transaction } from "../entities/transactions/transactions.entity";

export const UserRepo = AppDataSource.getRepository(User);
export const CategoryRepo = AppDataSource.getRepository(Category);
export const ClientRepo = AppDataSource.getRepository(Client);
export const PaymentMethodRepo = AppDataSource.getRepository(PaymentMethod);
export const TransactionRepo = AppDataSource.getRepository(Transaction);

Container.set("UserRepo", UserRepo);
Container.set("CategoryRepo", CategoryRepo);
Container.set("ClientRepo", ClientRepo);
Container.set("TransactionRepo", TransactionRepo);
Container.set("PaymentMethodRepo", PaymentMethodRepo);

const app = express();
app.use(express.json()); // It parses incoming JSON requests and puts the parsed data in req.body.
app.use(morgan("dev"));

// Authentication Error Handler
app.use(authenticate);

// Router
app.use(application.url.base, indexRoute);

// Joi Error Handler
app.use(joiErrorHandler);

// Error Handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
