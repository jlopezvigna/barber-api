import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { Transaction } from "../entities/transactions/transactions.entity";
import { BaseService } from "./base.service";

@Service()
export class TransactionService extends BaseService<Transaction> {
  @Inject("TransactionRepo") repository: Repository<Transaction>;

  async createTransaction(data, userId): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.amount = data.amount;
    transaction.transactionType = data.transactionType;
    transaction.date = data.date;
    transaction.category = data.categoryId;
    transaction.paymentMethod = data.paymentMethodId;
    transaction.client = data.clientId;
    transaction.user = userId;
    return await this.repository.save(transaction);
  }

  async findOneById(id: number): Promise<Transaction> {
    return await this.repository.findOne({
      relations: ["category", "paymentMethod", "client"],
      where: { id },
    });
  }
}
