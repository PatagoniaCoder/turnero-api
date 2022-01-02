import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { IUser } from "src/common/interfaces/i-user.interface";
import { UserDto } from "src/users/dtos/user.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { UserService } from "src/users/user.service";
import mockConnection from "test/helpers/mockconection";
import { changePass, registerMock, userActive } from "test/helpers/mocks";

describe("UserService", () => {
  let service: UserService;
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env-test",
        }),
        TypeOrmModule.forRoot(mockConnection),
        TypeOrmModule.forFeature([UserEntity])],
      providers: [
        UserService,
        /* {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        }, */
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("CRUD User", () => {
    it("should create a user", async () => {
      const userCreated: UserDto = await service.create(registerMock);
      expect(userCreated).toBeDefined();
      expect(userCreated).not.toContain('password')
    });

    it('should find a one user',async ()=>{
      const userFound = await service.findOne(userActive)
      expect(userFound).toEqual(userActive)
    })

    it('should return array of Users',async ()=>{
      const users=await service.findAll()
      expect(users.length).toBeGreaterThan(0)
    })

    it('should update an user',async ()=>{
      const userToUpdate = await service.findOne({id:1})
      userToUpdate.email = 'updated@email.com'
      const userUpdated = await service.update(1,userToUpdate)
      expect(userUpdated).toEqual(userToUpdate)
    })

    xit('should delete an user',async ()=>{
      await service.delete(1)
      const userDeleted = await service.findOne({id:1})
      expect(userDeleted).not.toBeDefined()
    })
  });

  describe("Change Pass", () => {
    it("should change a user password", async () => {
      const userUpdated = await service.changePass(changePass, userActive);
      expect(userUpdated).toEqual("Change succes");
    });
  });
});
