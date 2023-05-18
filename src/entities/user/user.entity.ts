import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Transaction } from "../transactions/transactions.entity";

@Entity("user_auth", { orderBy: { id: "ASC" } })
export class User extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  lastLogin: string;

  @Column({ default: false })
  isStaff: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
