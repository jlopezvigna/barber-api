import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseService<T> {
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOneById(id: any): Promise<T> {
    const findOptions: FindOneOptions<T> = {
      where: {
        id,
      } as FindOptionsWhere<T>,
    };

    return await this.repository.findOne(findOptions);
  }

  async findOneByName(name: any): Promise<T> {
    const findOptions: FindOneOptions<T> = {
      where: {
        name,
      } as FindOptionsWhere<T>,
    };

    return await this.repository.findOne(findOptions);
  }

  async create(data: DeepPartial<T>) {
    return await this.repository.save(data);
  }

  async update(id: number, partialEntity: QueryDeepPartialEntity<T>) {
    // return await this.repository
    //   .update(id, partialEntity)
    //   .then(() => this.findOneById(id as FindOneOptions<T>));
    await this.repository.update(id, partialEntity);
    return await this.findOneById(id as FindOneOptions<T>);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
