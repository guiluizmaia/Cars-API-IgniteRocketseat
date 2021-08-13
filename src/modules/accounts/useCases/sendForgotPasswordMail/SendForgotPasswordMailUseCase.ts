import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import { resolve } from 'path'

import { AppError } from "../../../../shared/errors/AppError";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { dirname } from "path/posix";
import { User } from "../../infra/typeorm/entities/User";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("MailProvider")
        private mailProvider: IMailProvider
    ){}
    async execute(email: string): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

        if(!user){
            throw new AppError("User does not exists!");
        }
        
        const token = v4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        })

        const variables = {
            name: User.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)
    }
}

export { SendForgotPasswordMailUseCase }