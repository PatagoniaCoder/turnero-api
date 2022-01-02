import { Test, TestingModule } from "@nestjs/testing";
import { ChangePassDto } from "src/users/dtos/change-pass.dto";
import { UserService } from "src/users/user.service";
import { resMock, userActive } from "test/helpers/mocks";
import { UserController } from "../../src/users/user.controller";

describe("UserController", () => {
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({
            changePass: jest.fn()
          }),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Change Password", () => {
    it("should be a method changePass", () => {
      const changePass = jest.spyOn(controller, "changePass");
      expect(changePass).toBeDefined();
    });

    it("should be change an user password", async () => {
      const body: ChangePassDto = {
        oldpass: "",
        newpass: "",
      };
      await controller.changePass(resMock, body);

      expect(spyService.changePass).toHaveBeenCalledWith(body,userActive);
    });
  });

  describe("Update User", () => {
    it("should be a method update", () => {
      const update = jest.spyOn(controller, "update");
      expect(update).toBeDefined();
    });
  });
});
