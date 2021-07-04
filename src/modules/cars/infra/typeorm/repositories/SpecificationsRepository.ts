import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { where } from "sequelize/types";


class SpecificationsRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
            
    async create({ description, name }: ICreateCategoryDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);

        return specification
    }

    async findByName(name: string): Promise<Specification | undefined> {
        const specification = await this.repository.findOne({
            name,
        });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[] | undefined> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
        
    }

};

export { SpecificationsRepository };
