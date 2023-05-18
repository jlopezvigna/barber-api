import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Transaction } from "../transactions/transactions.entity";

@Entity("client", { orderBy: { id: "ASC" } })
export class Client extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(["phone"])
  phone: string;

  @Column()
  @Unique(["email"])
  email: string;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];
}
