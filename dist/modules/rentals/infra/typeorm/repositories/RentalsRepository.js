"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findOpenRentalByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id) {
    const openByCar = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async create(data) {
    const rental = this.repository.create(data);
    await this.repository.save(rental);
    return rental;
  }

  async findById(id) {
    const rental = this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id) {
    const rentals = this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }

}

exports.RentalsRepository = RentalsRepository;