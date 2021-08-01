import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { getRepository, Repository } from "typeorm";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository{
    private repository: Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental);
    }
      

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        const openByCar = await this.repository.findOne({ 
            where:{
                car_id,
                end_date: null
            } 
        });
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        const openByCar = await this.repository.findOne({ 
            where:{
                user_id,
                end_date: null
            } 
        });
        return openByCar;
    }

    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create(data);

        await this.repository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental | undefined> {
        const rental = this.repository.findOne(id);

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = this.repository.find({
            where: {user_id},
            relations: ["car"],            
        })
        return rentals
    }
}

export { RentalsRepository }