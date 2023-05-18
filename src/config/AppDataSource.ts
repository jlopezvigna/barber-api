import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../entities/category/category.entity";
import { Client } from "../entities/client/client.entity";
import { PaymentMethod } from "../entities/payment-methods/payment-methods.entity";
import { Transaction } from "../entities/transactions/transactions.entity";
import { User } from "../entities/user/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "prod",
  port: 3306,
  logging: true,
  entities: [User, Category, Client, PaymentMethod, Transaction],
  //   subscribers: [],
  //   migrations: [],
});
