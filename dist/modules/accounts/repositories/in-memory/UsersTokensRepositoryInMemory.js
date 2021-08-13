"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token && refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const index = this.usersTokens.findIndex(ut => ut.id === id);
    this.usersTokens.splice(index, 1);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    return userToken;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;