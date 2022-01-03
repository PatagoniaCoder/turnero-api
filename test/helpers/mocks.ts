import { LoginDto, RegisterDto } from "src/auth/dtos";
import { IRegister } from "src/common/interfaces/i-register.interface";
import { CreateTurnoDto, TurnoDto } from "src/turno/dtos";
import { ChangePassDto } from "src/users/dtos/change-pass.dto";
import { UserDto } from "src/users/dtos/user.dto";

export const loginMock: LoginDto = {
  username: "email@email.com",
  password: "string",
};
export const registerMock: IRegister = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email@email.com",
  password: "string",
  repassword: "string",
  isActive: true,
};
export const changePass: ChangePassDto = {
  newpass: "new pass",
  oldpass: "string",
};
export const userActive: UserDto = {
  id: 1,
  firstName: "firstName",
  lastName: "lastName",
  email: "email@email.com",
  isActive: true,
};
export const resMock = {
  status: jest.fn().mockImplementation(() => ({
    json: jest.fn((result) => result),
  })),
  req: { user: userActive },
};
export const mockNewTurno: CreateTurnoDto = {
  date: new Date(),
  available: 4,
};
export const mockUpdatedTurno: TurnoDto = {
  id: 1,
  date: new Date(),
  available: 2,
};
