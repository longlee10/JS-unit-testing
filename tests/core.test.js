import { describe, expect, it } from "vitest";
import {
  canDrive,
  createProduct,
  fetchData,
  generateTestingInfo,
  getCoupons,
  isAdmissibleToCollege,
  isPriceInRange,
  isValidUsername,
} from "../src/core";

describe("Get coupons", () => {
  const coupons = getCoupons();

  it("Should return an array of coupons", () => {
    expect(Array.isArray(coupons)).toBeTruthy();
    expect(coupons.length).toBeGreaterThan(0);
  });

  // Here: should loop through the array and make assertion withing the loop -> revise!
  it("Should return a list of valid codes", () => {
    // Revise
    coupons.forEach((c) => {
      expect(c).toHaveProperty("code");
      expect(typeof c.code).toBe("string");
      expect(c.code).toBeTruthy(); // make sure code is not empty string
    });
  });

  it("should return a list of valid discount", () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("Generate test info", () => {
  const testInfo = generateTestingInfo();

  it("should return an array of object", () => {
    expect(Array.isArray(testInfo)).toBe(true);
    expect(testInfo.length).toBeGreaterThan(0);
  });

  it("should return valid student names", () => {
    testInfo.forEach((info) => {
      expect(info).toHaveProperty("name");
      expect(typeof info.name).toBe("string");
      expect(info.name).toBeTruthy();
    });
  });

  it("should return valid voucher code", () => {
    testInfo.forEach((info) => {
      expect(info).toHaveProperty("voucher");
      expect(typeof info.voucher).toBe("string");
      expect(info.voucher.length).toBe(8);
    });
  });

  it("should return valid test type", () => {
    testInfo.forEach((info) => {
      expect(info).toHaveProperty("type");
      expect(typeof info.type).toBe("string");
      expect(info.type.length).toBe(1);
      expect(info.type).toMatch(/[AT]/); // either A or T. Nothing else
    });
  });
});

// test create product
/* 
  product no name -> error object
  product price <= 0 -> error object
  valid product -> success
*/
describe("create product", () => {
  it("should return object error if product has no name", () => {
    const res = createProduct({});

    expect(res.success).toBeFalsy();
    expect(res.error).toHaveProperty("code");
    expect(res.error).toHaveProperty("message");
    expect(res.error.code).toMatch(/[invalid name]/);
    expect(res.error.message).toMatch(/[name missing]/);
  });

  it("should return error object if price <= 0", () => {
    const res = createProduct({ name: "Fish", price: 0 });

    expect(res).toHaveProperty("success");
    expect(res).toHaveProperty("error");
    expect(res.success).toBeFalsy();
    expect(res.error).toHaveProperty("code");
    expect(res.error).toHaveProperty("message");
    expect(res.error.code).toMatch(/[invalid price]/);
    expect(res.error.message).toMatch(/[price missing]/);
  });

  it("should return success object", () => {
    const res = createProduct({ name: "Bean", price: 10 });

    expect(res).toHaveProperty("success");
    expect(res).toHaveProperty("message");
    expect(res.success).toBeTruthy();
    expect(res.message).toMatch(/[Product successfully published]/);
  });
});

describe("Is valid username", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return false if username length is out of range", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true if username lenght is 5 or 15", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });

  it("should return true if username is within the range 5 - 15", () => {
    expect(isValidUsername("a".repeat(maxLength - 1))).toBe(true);
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
  });

  it("should return false if the username is invalid", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe("Can drive", () => {
  it("should return error message if the country code is invalid", () => {
    expect(canDrive("18", "CA")).toMatch(/[Invalid code]/);
  });

  // Parameterized test
  it.each([
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
  ])("Should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });

  it("should return false if country code is UK but age is less than 17", () => {
    expect(canDrive("16", "UK")).toBe(false);
  });

  it("should return true if country code is UK and age is more than or equal 17", () => {
    expect(canDrive("17", "UK")).toBe(true);
    expect(canDrive("18", "UK")).toBe(true);
  });

  it("should return false if country code is US but age is less than 16", () => {
    expect(canDrive("15", "US")).toBe(false);
  });

  it("should return true if country code is US and age is more than or equal 16", () => {
    expect(canDrive("16", "US")).toBe(true);
    expect(canDrive("18", "US")).toBe(true);
  });

  // this may not be neccessary
  it("should return false if input are invalid", () => {
    expect(canDrive(null, null)).toBe(false);
    expect(canDrive(1, undefined)).toBe(false);
    expect(canDrive(null, "")).toBe(false);
  });
});

describe("Price in range", () => {
  const min = 10;
  const max = 20;

  it("should return false if price is out of range", () => {
    expect(isPriceInRange(5, min, max)).toBe(false);
    expect(isPriceInRange(21, min, max)).toBe(false);
  });

  it("should return true if price is at the boundary", () => {
    expect(isPriceInRange(10, min, max)).toBe(true);
    expect(isPriceInRange(20, min, max)).toBe(true);
  });

  it("should return true if price is within range", () => {
    expect(isPriceInRange(15, min, max)).toBe(true);
  });

  it("should return false if input is invalid", () => {
    expect(isPriceInRange(null, min, max)).toBe(false);
    expect(isPriceInRange(undefined, min, max)).toBe(false);
    expect(isPriceInRange("", min, max)).toBe(false);
    expect(isPriceInRange("a", min, max)).toBe(false);
  });
});

describe("Parameterized price in range", () => {
  it.each([
    { scenario: "price < min", price: 5, result: false },
    { scenario: "price = min", price: 10, result: true },
    { scenario: "price between min and max", price: 15, result: true },
    { scenario: "price = max", price: 20, result: true },
    { scenario: "price > max", price: 21, result: false },
  ])("Should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 10, 20)).toBe(result);
  });
});

/* 
  cases: 
  Essay < 5
  Essay = 5 && Reading < 245
  Essay = 5 && Reading = 245
  Essay > 5 && Reading > 245

  Math < ; = ; > 255

*/
describe("Is admissible to college", () => {
  it("should send a message saying student to wait for email", () => {
    const testResult = { testType: "T" };
    expect(isAdmissibleToCollege(testResult)).toMatch(/[Email email]/);
  });

  it("should return foundation if essay score is < 5", () => {
    const testResult = {
      testType: "A",
      subject: "English",
      essayScore: 4,
      readingScore: 255,
    };
    expect(isAdmissibleToCollege(testResult)).toBe("Foundation level");
  });

  it("should return foundation if essay score is = 5 and reading < 245", () => {
    const testResult = {
      testType: "A",
      subject: "English",
      essayScore: 5,
      readingScore: 244,
    };
    expect(isAdmissibleToCollege(testResult)).toBe("Foundation level");
  });

  it("should return foundation if essay score is = 5 & reading = 245", () => {
    const testResult = {
      testType: "A",
      subject: "English",
      essayScore: 5,
      readingScore: 245,
    };
    expect(isAdmissibleToCollege(testResult)).toBe("College level");
  });

  it("should return foundation if essay score is > 5 & reading > 5", () => {
    const testResult = {
      testType: "A",
      subject: "English",
      essayScore: 6,
      readingScore: 246,
    };
    expect(isAdmissibleToCollege(testResult)).toBe("College level");
  });

  it("should return invalid message if the result is invalid", () => {
    const testResult = {};
    expect(isAdmissibleToCollege(testResult)).toMatch(/[Invalid test result]/);
  });
});

describe("Fetch data", () => {
  it("should return a promise with an array of number", async () => {
    try {
      const result = await fetchData();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (err) {
      expect(err).toHaveProperty("reason");
      expect(err.reason).toMatch(/fail/i);
    }
  });
});
