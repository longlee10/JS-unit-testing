import { describe, test, it, expect } from "vitest";
import { calculateAverage, factorial, fizzBuzz, max } from "../src/intro";

describe("Max number", () => {
  it("should return the first argument if it is greater", () => {
    expect(max(2, 1)).toBe(2);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return first argument if both are equals", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("FizzBuzz", () => {
  it("Should return FizzBuzz if the argument divisible both 5 and 3", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("Should return Fizz if the argument divisible by 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  it("Should return Buzz if the argument divisible by 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("Should return the argument in string if the number is not divisible to both 5 and 3", () => {
    expect(fizzBuzz(7)).toBe("7");
  });
});

describe("Calculate average", () => {
  it("Should return NaN if the array is empty", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("Should return the same if the array is not empty and has 1 elements", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("Should return the average if the array is not empty and has 2 elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it("Should return the average if the array is not empty and has 3 elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("Factorial", () => {
  it("Returns 1 if the argument is 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("Returns 1 if the argument is 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("Returns 2 if the argument is 2", () => {
    expect(factorial(2)).toBe(2);
  });

  it("Returns 6 if the argument is 3", () => {
    expect(factorial(3)).toBe(6);
  });

  it("Returns 24 if the argument is 4", () => {
    expect(factorial(4)).toBe(24);
  });

  it("Returns undefined if the argument is negative", () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
