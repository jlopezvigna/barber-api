import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { PaymentMethod } from "../entities/payment-methods/payment-methods.entity";
import { BaseService } from "./base.service";

@Service()
export class PaymentMethodService extends BaseService<PaymentMethod> {
  @Inject("PaymentMethodRepo") repository: Repository<PaymentMethod>;
}
