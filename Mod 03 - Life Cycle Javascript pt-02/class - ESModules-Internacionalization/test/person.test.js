import mocha from "mocha";
import chai from "chai";
import Person from "../src/person.js";

const { describe, it } = mocha;
const { expect } = chai;

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Car 20000 2020-01-01 2020-02-01"
    );
    const expected = {
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Car"],
      kmTraveled: "20000",
      id: "1",
    };
    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2020-01-01",
      to: "2020-02-01",
      vehicles: ["Bike", "Car"],
      kmTraveled: "20000",
      id: "1",
    });

    const result = person.formatted("en");

    const expected = {
      from: "January 01, 2020",
      to: "February 01, 2020",
      vehicles: "Bike and Car",
      kmTraveled: "20,000 km",
      id: 1,
    };

    expect(result).to.be.deep.equal(expected);
  });
});
