import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { Category } from "../entities/category/category.entity";
import { BaseService } from "./base.service";

@Service()
export class CategoryService extends BaseService<Category> {
  @Inject("CategoryRepo") repository: Repository<Category>;
}
