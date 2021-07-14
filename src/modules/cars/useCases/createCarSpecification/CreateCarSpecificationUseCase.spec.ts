import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () =>{

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, 
            specificationRepositoryInMemory
            );
    })

    it("should not be able to add a new specification to a now-existent car", async () =>{
        expect(async () =>{
            const car_id = "1234";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({car_id, specifications_id});
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new specification to the car", async () =>{
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test",
            name: "test",
        })

        if(specification.id){
            const specifications_id: string[] = [specification.id];
            const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
            expect(specificationsCars).toHaveProperty("specifications")
            expect(specificationsCars.specifications.length).toBe(1);
        }        
    })
})