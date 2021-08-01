import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { inject } from "tsyringe";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository :ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental>{
        const minimumHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for use!");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
        if(compare < minimumHour){ 
            throw new AppError('Invalid return time!');
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export {CreateRentalUseCase}