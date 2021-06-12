import { request, response, Router }from 'express';
import multer from 'multer'

import {CreateCategoryController}  from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/ListCategories/ListCategoriesController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const upload = multer({
    dest: "./tmp",
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get('/',  listCategoriesController.handle);

categoriesRoutes.post('/import', ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }