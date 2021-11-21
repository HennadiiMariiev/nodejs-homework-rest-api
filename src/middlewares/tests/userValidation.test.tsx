import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { userValidation } from "..";

describe("userValidation with wrong user email", () => {
  test("userValidation", () => {
    const req = {} as unknown as Request;

    const res = {
      body: {
        user: {
          email: "...@..com",
        },
      },
    } as unknown as Response;

    const next = {
      body: {
        user: {
          email: "asdad@asd.com",
        },
      },
    } as unknown as NextFunction;

    expect(userValidation(req, res, next)).toThrow(new BadRequest());
  });
});
