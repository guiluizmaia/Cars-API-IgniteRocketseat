"use strict";

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../../accounts/repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let createUserUseCase;
let dateProvider;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@teste.com",
      password: "1234",
      name: "user teste"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.co",
      password: "teste"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "user"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "teste"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
});