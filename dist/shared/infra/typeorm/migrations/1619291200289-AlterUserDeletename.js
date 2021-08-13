"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeletename1619291200289 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeletename1619291200289 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.AlterUserDeletename1619291200289 = AlterUserDeletename1619291200289;