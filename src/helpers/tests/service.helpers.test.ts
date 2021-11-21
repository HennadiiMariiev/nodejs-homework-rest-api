import { Request } from "express";
import { isValidId, isDuplicateKeyError, isValidPaginationInRequest } from "..";

describe("test isValidId from service.helpers functions", () => {
  test("passing wrong id with numbers", () => {
    expect(isValidId("1234")).toBe(false);
  });

  test("passing wrong id with string", () => {
    expect(isValidId("qweqweqeqweqweqweq")).toBe(false);
  });

  test("passing correct id", () => {
    expect(isValidId("6180f901c84b779a5191fa14")).toBe(true);
  });
});

describe("test isDuplicateKeyError from service.helpers functions", () => {
  test("passing other error code 12000", () => {
    expect(isDuplicateKeyError({ code: 12000 })).toBe(false);
  });

  test("passing duplicate error code 11000", () => {
    expect(isDuplicateKeyError({ code: 11000 })).toBe(true);
  });

  test("passing wrong string code", () => {
    expect(isDuplicateKeyError("Some test string")).toBe(false);
  });
});

describe("test isValidPaginationInRequest from service.helpers functions", () => {
  test("passing correct page and limit", () => {
    const request = {
      query: { page: 12, limit: 2 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(true);
  });

  test("passing wrong page and limit", () => {
    const request = {
      query: { page: 0, limit: 2 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });

  test("passing wrong page and limit", () => {
    const request = {
      query: { page: -4, limit: -12 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });

  test("passing wrong page and limit", () => {
    const request = {
      query: { page: -12, limit: 2 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });

  test("passing no page and limit in query object", () => {
    const request = {
      query: { hello: 12, world: 1 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });
});
