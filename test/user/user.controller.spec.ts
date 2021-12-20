import { Test, TestingModule } from "@nestjs/testing";
import { ChangePassDto } from "src/users/dtos/change-pass.dto";
import { UserService } from "src/users/user.service";
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
            changePass: jest.fn().mockResolvedValue({
              oldpass: "",
              newpass: "",
            }),
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
      const create = jest.spyOn(controller, "changePass");
      expect(create).toBeDefined();
    });

    it("should be change an user password", () => {
      const body: ChangePassDto = {
        oldpass: "",
        newpass: "",
      };
      controller.changePass(body);

      expect(spyService.changePass).toHaveBeenCalledWith(body);
    });
  });

  describe("Update User", () => {
    it("should be a method update", () => {
      const create = jest.spyOn(controller, "update");
      expect(create).toBeDefined();
    });
  });
});
