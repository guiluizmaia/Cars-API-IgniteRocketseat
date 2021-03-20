import { request, response, Router }from 'express';
import { v4 as uuidV4 } from 'uuid';
import { Category } from '../modules/cars/model/Category';
import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/ListCategories';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) =>{
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) =>{
   return listCategoriesController.handle(request, response);
});

export { categoriesRoutes }