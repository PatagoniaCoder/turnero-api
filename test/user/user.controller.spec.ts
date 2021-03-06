import { Test, TestingModule } from "@nestjs/testing";
import { ChangePassDto } from "../../src/users/dtos/change-pass.dto";
import { UserService } from "../../src/users/user.service";
import { resMock, userActive } from "../../test/helpers/mocks";
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
            changePass: jest.fn(),
            findOne: jest.fn().mockResolvedValue(userActive),
            update: jest.fn((id,value)=>Object.assign(userActive,value))
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
      await controller.changePass(resMock,1, body);

      expect(spyService.changePass).toHaveBeenCalledWith(body, 1);
    });
  });

  describe("Update User", () => {
    it("should be a method update", () => {
      const update = jest.spyOn(controller, "update");
      expect(update).toBeDefined();
    });

    it("should update a user", async () => {
      const updatedUser = await controller.update(
        resMock,
        1,
        {email:"test@test.com"}
      );
      expect(updatedUser.email).toBe('test@test.com');
    });
  });
});
