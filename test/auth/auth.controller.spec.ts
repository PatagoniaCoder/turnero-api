import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/auth/auth.service";
import { AuthController } from "../../src/auth/auth.controller";
import { LoginDto, RegisterDto } from "../../src/auth/dtos";
import { resMock,loginMock, registerMock } from "test/helpers/mocks";

describe("AuthController", () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({
            login: jest.fn(() => true),
            register: jest.fn(() => true),
            logout: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Login", () => {
    it("should be a method login", () => {
      const login = jest.spyOn(controller, "login");
      expect(login).toBeDefined();
    });

    it("should be call with user and pass", () => {
      const login = jest.spyOn(controller, "login");
      controller.login(resMock, loginMock);
      expect(login).toBeCalledWith(loginMock);
    });

    it("should auth an user", () => {
      controller.login(resMock,loginMock);
      expect(spyService.login).toHaveBeenCalledWith(loginMock);
    });
  });

  describe("Register", () => {
    it("should be a method register", () => {
      const reg = jest.spyOn(controller, "register");
      expect(reg).toBeDefined();
    });

    it("should register an user", () => {
      controller.register(registerMock);
      expect(spyService.register).toHaveBeenCalledWith(registerMock);
    });
  });

  describe("Logout", () => {
    it("should be a method logout", () => {
      const logout = jest.spyOn(controller, "logout");
      expect(logout).toBeDefined();
    });

    it("should logout an user", () => {
      controller.logout();
      expect(spyService.logout).toHaveBeenCalled();
    });
  });
});
