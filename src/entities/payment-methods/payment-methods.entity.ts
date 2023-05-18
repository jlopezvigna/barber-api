import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Transaction } from "../transactions/transactions.entity";

@Entity("payment-methods", { orderBy: { id: "ASC" } })
export class PaymentMethod extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.paymentMethod)
  transactions: Transaction[];
}
