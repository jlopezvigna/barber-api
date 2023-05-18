import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Transaction } from "../transactions/transactions.entity";

@Entity("category", { orderBy: { id: "ASC" } })
export class Category extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  @Unique(["name"])
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
