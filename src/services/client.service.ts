import { Inject, Service } from "typedi";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { Client } from "../entities/client/client.entity";
import { BaseService } from "./base.service";

@Service()
export class ClientService extends BaseService<Client> {
  @Inject("ClientRepo") repository: Repository<Client>;

  async findOneByPhone(phone: any): Promise<Client> {
    const findOptions: FindOneOptions<Client> = {
      where: {
        phone,
      } as FindOptionsWhere<Client>,
    };

    return await this.repository.findOne(findOptions);
  }
}
