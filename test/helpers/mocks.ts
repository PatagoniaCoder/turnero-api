import { LoginDto, RegisterDto } from "../../src/auth/dtos";

export const resMock = {
    status: jest.fn().mockImplementation(() => ({
      json: jest.fn((result) => result),
    })),
    req: { user: "" },
  };
export const loginMock: LoginDto={
    username : "user",
    password : "pass"
}
export const registerMock:RegisterDto={
    firstName: "string",
    lastName: "string",
    email: "string",
    password: "string",
    repassword: "string",
}