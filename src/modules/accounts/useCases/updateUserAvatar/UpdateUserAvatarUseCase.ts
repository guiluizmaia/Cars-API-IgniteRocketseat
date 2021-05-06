import { IUsersRepository } from "modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase{

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository;
    ){}

    async execute({user_id, avatar_file}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(user_id);

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase }