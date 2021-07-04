import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import { ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationsRepository{
    specifications: Specification[] = [];

    async create({ description, name }: ICreateCategoryDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name
        })

        this.specifications.push(specification);

        return specification;
    }
    
    async findByName(name: string): Promise<Specification | undefined> {
        return this.specifications.find( specification => specification.name === name);
    }
    
    async findByIds(ids: string[]): Promise<Specification[] | undefined> {
        const allSpecifications = this.specifications.filter(specification => {
            if(specification.id){
                return specification
            }
        });

        return allSpecifications;
    }
}

export {SpecificationRepositoryInMemory}