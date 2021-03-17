import { Category } from '../model/Category';

// DTO => Data transgfer object
interface ICreateCategoryDTO {
    name: string;
    description: string
}

class CategoriesRepository {
    /** Private para só essa classe pode usar */
    private categories: Category[];

    constructor(){
        this.categories = [];
    };

    create({description, name}: ICreateCategoryDTO): void{
        const category = new Category();
        
        /* Possibilidade mais difícil
        category.name = name;
        category.description = description;
        category.created_at = new Date();*/
    
        Object.assign(category,{
            name,
            description,
            created_at: new Date()
        });
        this.categories.push(category);
    };

    list(): Category[]{
        return this.categories;
    };

    findByName(name: string): Category{
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}

export { CategoriesRepository }