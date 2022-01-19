import { genSalt, hash } from "bcrypt";
import { LoginDto, RegisterDto } from "src/auth/dtos";
import { CreateTurnoDto, TurnoDto } from "src/turno/dtos";
import { ChangePassDto } from "src/users/dtos/change-pass.dto";
import { UserDto } from "src/users/dtos/user.dto";

export const loginMock: LoginDto = {
  username: "email@email.com",
  password: "string",
};
export const registerMock: RegisterDto = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email@email.com",
  password: "string78",
  repassword: "string78",
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
export const mockTurno:TurnoDto={
  id:1,...mockNewTurno

}
export const mockUserRepository = jest.fn(() => ({
  create: jest.fn().mockResolvedValue(registerMock),
  save: jest.fn().mockImplementation(() => userActive),
  findOne: jest.fn().mockResolvedValue(userActive),
  find: jest.fn().mockResolvedValue([userActive]),
  merge: jest.fn(),
  remove: jest.fn().mockResolvedValue(userActive),
  createQueryBuilder: jest.fn(() => ({
    addSelect: jest.fn(() => ({
      where: jest.fn(() => ({
        getOne: jest.fn(async () => {
          const salt = await genSalt();
          registerMock.password = await hash(registerMock.password, salt);
          registerMock["setPassword"] = jest.fn();
          return registerMock;
        }),
      })),
    })),
  })),
}));
export const mockTurnoRepository = jest.fn(() => ({
  findOne: jest.fn().mockResolvedValue(mockTurno),
  create: jest.fn().mockResolvedValue(mockTurno),
  save: jest.fn().mockResolvedValue(mockTurno),
  find: jest.fn().mockResolvedValue([mockTurno]),
  merge: jest.fn(),
  remove: jest.fn().mockResolvedValue(mockTurno)
}));
