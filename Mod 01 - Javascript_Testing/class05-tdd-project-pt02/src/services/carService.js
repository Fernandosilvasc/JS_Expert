const BaseRepository = require("../repositories/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
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
}

module.exports = CarService;
