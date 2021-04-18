import { Specification } from "../entities/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";


interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({description, name}: ICreateCategoryDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateCategoryDTO }