import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;


describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider
            );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate an user", async () =>{
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@teste.com",
            password: "1234",
            name: "user teste"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        })

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () =>{
        await expect(authenticateUserUseCase.execute({
                email: "false@email.co",
                password: "teste",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("should not be able to authenticate with incorrect password", async () =>{
        const user: ICreateUserDTO ={
            driver_license:"9999",
            email:"user@user.com",
            password: "1234",
            name: "user"
        }

        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "teste",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
})