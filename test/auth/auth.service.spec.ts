import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { LoginDto, RegisterDto } from "src/auth/dtos";
import { UserLogged } from "src/auth/dtos/user-logged.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { UserService } from "src/users/user.service";
import {
  loginMock,
  mockUserRepository,
  registerMock,
} from "test/helpers/mocks";

describe("AuthService", () => {
  let service: AuthService;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("LOGGIN", () => {
    it("should return a user login", async () => {
      await userService.create(registerMock);
      const userlogged = await service.login(loginMock);
      expect(userlogged).toMatchObject<UserLogged>({
        id:1,
        firstName: registerMock.firstName,
        lastName: registerMock.lastName,
        email: registerMock.email,
        token: "123456",
        isActive: registerMock.isActive,
      });
    });

    it("should no be login", async () => {
      const user = await userService.create(registerMock);
      const credentials: LoginDto = {
        username: user.email,
        password: "wrongpass",
      };
      await service.login(credentials).then((res: HttpException) => {
        expect(res.message).toBe("Wrong pass or username");
        expect(res.getStatus()).toBe(HttpStatus.FORBIDDEN);
      });
    });
  });

  describe("Register", () => {
    it("should be register an new user", async () => {
      const registerUser: RegisterDto = {
        email: registerMock.email,
        firstName: registerMock.firstName,
        lastName: registerMock.lastName,
        password: registerMock.password,
        repassword: registerMock.repassword,
      };
      const user = await service.register(registerUser);
      expect(user).toBeDefined();
    });
  });
});
