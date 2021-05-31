import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}
/**
 * [x] - Definir tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){}

    async execute({name, description}: IRequest): Promise<void>{
        const categoryAlreadyEcists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyEcists){
            throw new AppError("Category already exists!");
        }
    
        this.categoriesRepository.create({name, description});
    }
};

export { CreateCategoryUseCase }