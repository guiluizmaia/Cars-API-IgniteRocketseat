import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListRentalsByUserController } from '../../../../modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();


rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/develution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.post("/user", ensureAuthenticated, listRentalsByUserController.handle);



export { rentalRoutes };