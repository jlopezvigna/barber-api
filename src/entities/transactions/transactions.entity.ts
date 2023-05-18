import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Category } from "../category/category.entity";
import { Client } from "../client/client.entity";
import { PaymentMethod } from "../payment-methods/payment-methods.entity";
import { User } from "../user/user.entity";

@Entity("transactions", { orderBy: { id: "ASC" } })
export class Transaction extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @Column()
  amount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: string;

  @Column()
  transactionType: string;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.transactions)
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Client, (client) => client.transactions)
  client: Client;
}
