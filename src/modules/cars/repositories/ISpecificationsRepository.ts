import { Specification } from "../infra/typeorm/entities/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";


interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({description, name}: ICreateCategoryDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | undefined>;
    findByIds(ids: string[]): Promise<Specification[] | undefined>;
}

export { ISpecificationsRepository, ICreateCategoryDTO }