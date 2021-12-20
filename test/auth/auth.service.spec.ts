import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "src/auth/auth.service";
import { IUserLogged } from "src/common/interfaces/i-user-logged.interface";
import { loginMock } from "test/helpers/mocks";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a user login", async () => {
    const userlogged: IUserLogged = await service.login(loginMock);
    expect(userlogged).toMatchObject<IUserLogged>({
      username: "",
      name: "",
      lastname: "",
      email: "",
      token: "",
      isActive: true,
    });
  });
});
