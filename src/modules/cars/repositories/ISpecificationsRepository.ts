import { Specification } from "../infra/typeorm/entities/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";


interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({description, name}: ICreateCategoryDTO): Promise<void>;
    findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationsRepository, ICreateCategoryDTO }