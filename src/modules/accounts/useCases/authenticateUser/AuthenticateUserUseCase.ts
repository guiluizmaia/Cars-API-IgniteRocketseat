import { IUsersRepository } from "modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest){
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new Error("User not found")
        }
    }
}

export { AuthenticateUserUseCase }