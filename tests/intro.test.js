import { describe, test, it, expect } from "vitest";
import {
  calculateAverage,
  factorial,
  fizzBuzz,
  isPalindrome,
  max,
  maxNum,
  reverseString,
} from "../src/intro";

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

describe("Reverse a string", () => {
  it("should return message Not a string if argument is not a string", () => {
    expect(reverseString(1)).toBe("Argument is not a string");
  });

  it("should return message Cannot reverse if argument is an empty string", () => {
    expect(reverseString("")).toBe("Cannot reverse an empty string");
  });

  it("should return the same if the string length is only 1", () => {
    expect(reverseString("a")).toBe("a");
  });

  it("should return 'oh' if the argument if 'ho'", () => {
    expect(reverseString("ho")).toBe("oh");
  });

  it("should return 'cat' if the argument if 'tac'", () => {
    expect(reverseString("tac")).toBe("cat");
  });

  it("should return 'hello' if the argument if 'olleh'", () => {
    expect(reverseString("olleh")).toBe("hello");
  });
});

describe("max num in array", () => {
  it("should return message not an array if argument is not array", () => {
    expect(maxNum(1)).toBe("Not an array");
  });

  it("should return no maximum number if the array is empty", () => {
    expect(maxNum([])).toBe("No maximum number");
  });

  it("should return 1 if the array contains 1 only", () => {
    expect(maxNum([1])).toBe(1);
  });

  it("should return 2 if argument is [1, 2]", () => {
    expect(maxNum([1, 2])).toBe(2);
  });

  it("should return 6 if argument is [1, 6, 5]", () => {
    expect(maxNum([1, 6, 5])).toBe(6);
  });
});

describe("Palindrome", () => {
  it("Returns NaN if argument is not a number", () => {
    expect(isPalindrome()).toBe(NaN);
  });

  it("Returns true if argument is a palindrome", () => {
    expect(isPalindrome(12221)).toBe(true);
  });

  it("Returns false if argument is a not palindrome", () => {
    expect(isPalindrome(12331)).toBe(false);
  });
});
