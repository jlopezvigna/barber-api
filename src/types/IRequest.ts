import { Request } from "express";
import { Category } from "../entities/category/category.entity";
import { Client } from "../entities/client/client.entity";
import { PaymentMethod } from "../entities/payment-methods/payment-methods.entity";
import { Transaction } from "../entities/transactions/transactions.entity";
import { User } from "../entities/user/user.entity";

export default interface IRequest extends Request {
  user: User;
  category: Category;
  client: Client;
  paymentMethod: PaymentMethod;
  transaction: Transaction;
  dashboard: boolean;
}
