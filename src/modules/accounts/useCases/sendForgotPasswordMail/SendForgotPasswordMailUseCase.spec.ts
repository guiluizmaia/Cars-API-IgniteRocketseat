import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );

    })

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            name: "Vincent Day",
            email: "riun@bi.rw",
            password: "83063" 
        });

        await sendForgotPasswordMailUseCase.execute("riun@bi.rw");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does nor exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("ka@uj.gr")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateToekenMail = spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "787330",
            name: "Vincent Month",
            email: "riun2@bi.rw",
            password: "83063" 
        });

        await sendForgotPasswordMailUseCase.execute("riun2@bi.rw");

        expect(generateToekenMail).toHaveBeenCalled();
    })
})