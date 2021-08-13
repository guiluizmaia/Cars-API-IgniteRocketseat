import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "../../../accounts/dtos/IUserResponseDTO";
import { UserMap } from "../../../accounts/mapper/UserMap";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}

    async execute(id: string): Promise<IUserResponseDTO>{
        const user = await this.usersRepository.findById(id);

        if(!user){
            throw new AppError("user not found")
        }

        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase }