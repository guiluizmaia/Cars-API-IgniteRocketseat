import { Category } from '../../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

// singleton

class CategoriesRepository implements ICategoriesRepository{
    /** Private para só essa classe pode usar */
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor(){
        this.categories = [];
    };

    public static getInstance(): CategoriesRepository{
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

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