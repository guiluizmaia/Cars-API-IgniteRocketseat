"use strict";

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
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
    await expect(sendForgotPasswordMailUseCase.execute("ka@uj.gr")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
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
  });
});