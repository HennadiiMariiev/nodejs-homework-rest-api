import { Request } from "express";
import { isValidId, isDuplicateKeyError, isValidPaginationInRequest } from "..";

describe("test isValidId from service.helpers functions", () => {
  test("isValidId", () => {
    expect(isValidId("1234")).toBe(false);
  });

  test("isValidId", () => {
    expect(isValidId("qweqweqeqweqweqweq")).toBe(false);
  });

  test("isValidId", () => {
    expect(isValidId("6180f901c84b779a5191fa14")).toBe(true);
  });
});

describe("test isDuplicateKeyError from service.helpers functions", () => {
  test("isDuplicateKeyError", () => {
    expect(isDuplicateKeyError({ code: 12000 })).toBe(false);
  });

  test("isDuplicateKeyError", () => {
    expect(isDuplicateKeyError({ code: 11000 })).toBe(true);
  });

  test("isDuplicateKeyError", () => {
    expect(isDuplicateKeyError("Some test string")).toBe(false);
  });
});

describe("test isValidPaginationInRequest from service.helpers functions", () => {
  test("isValidPaginationInRequest", () => {
    const request = {
      query: { page: 12, limit: 2 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(true);
  });

  test("isValidPaginationInRequest", () => {
    const request = {
      query: { page: 0, limit: 2 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });

  test("isValidPaginationInRequest", () => {
    const request = {
      query: { page: -4, limit: -12 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });

  test("isValidPaginationInRequest", () => {
    const request = {
      query: { page: -12, limit: 2 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });

  test("isValidPaginationInRequest", () => {
    const request = {
      query: { hello: 12, world: 1 },
    } as unknown as Request;
    expect(isValidPaginationInRequest(request)).toBe(false);
  });
});
