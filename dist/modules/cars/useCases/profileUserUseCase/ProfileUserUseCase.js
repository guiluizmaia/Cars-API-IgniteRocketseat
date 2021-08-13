"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _UserMap = require("../../../accounts/mapper/UserMap");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../../accounts/repositories/IUsersRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ProfileUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ProfileUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new _AppError.AppError("user not found");
    }

    return _UserMap.UserMap.toDTO(user);
  }

}) || _class) || _class) || _class) || _class);
exports.ProfileUserUseCase = ProfileUserUseCase;