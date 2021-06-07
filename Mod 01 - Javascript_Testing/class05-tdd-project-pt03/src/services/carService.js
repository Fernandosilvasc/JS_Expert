const BaseRepository = require("../repositories/base/baseRepository");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBaseOnAge = Tax.taxesBaseOnAge;
    this.currencyFormat = new Intl.NumberFormat("en", {
      style: "currency",
      currency: "CAD",
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
    //REMIND:  we are using this method to generate a random number by receiving a number from input then we used this number as a limit for our random method!
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBaseOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;
    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = today.toLocaleDateString("en", options);

    const transaction = new Transaction({
      customer,
      dueDate,
      car,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = CarService;
