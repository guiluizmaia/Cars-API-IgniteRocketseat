"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _listAvailableCarsUseCase = require("./listAvailableCarsUseCase");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      brand,
      name,
      category_id
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_listAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand,
      name: name,
      category_id: category_id
    });
    return response.json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;