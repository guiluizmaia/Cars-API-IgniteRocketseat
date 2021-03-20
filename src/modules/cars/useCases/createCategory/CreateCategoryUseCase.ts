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

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute({name, description}: IRequest): void{
        const categoryAlreadyEcists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyEcists){
            throw new Error("Category already exists!");
        }
    
        this.categoriesRepository.create({name, description});
    }
};

export { CreateCategoryUseCase }