import { Specification } from "../../entities/Specification";
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import { ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository{
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }
        
    create({ description, name }: ICreateCategoryDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name, 
            description,
            create_at: new Date(),
        });
        this.specifications.push(specification)
    }
    findByName(name: string): Specification {
        const specification = this.specifications.find(
            Specification => specification.name === name
            );
        return specification;
    }

};

export { SpecificationsRepository };
