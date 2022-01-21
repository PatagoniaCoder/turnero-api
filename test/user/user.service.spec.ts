import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RegisterDto } from "../../src/auth/dtos";
import { UserDto } from "../../src/users/dtos/user.dto";
import { UserEntity } from "../../src/users/entities/user.entity";
import { UserService } from "../../src/users/user.service";
import { changePass, mockUserRepository, registerMock, userActive } from "../../test/helpers/mocks";
import { FindOneOptions } from "typeorm";

describe("UserService", () => {
  let service: UserService;


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {provide:getRepositoryToken(UserEntity),useFactory:mockUserRepository}
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

    it('should delete an user',async ()=>{
      const user = await service.delete(userActive.id)
      expect(user).toBeDefined()
    })
  });

  describe("Change Pass", () => {
    it("should change a user password", async () => {
      const user = await service.findOne({id:1})
      const userUpdated = await service.changePass(changePass, user.id);
      expect(userUpdated).toEqual("Change succes");
    });
  });

  describe('Call with expected param',()=>{
    it('should call create method with expected params', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const dto = new RegisterDto();
      service.create(dto);
      expect(createSpy).toHaveBeenCalledWith(dto);
    });

    it('should call findOne method with expected param', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const findOneOptions: FindOneOptions = {};
      service.findOne(findOneOptions);
      expect(findOneSpy).toHaveBeenCalledWith(findOneOptions);
    });
    
    it('should call update method with expected params', async () => {
      const updateNoteSpy = jest.spyOn(service, 'update');
      const id = 1;
      const dto = new UserDto();
      service.update(id, dto);
      expect(updateNoteSpy).toHaveBeenCalledWith(id, dto);
    });
  
    it('should call delete method with expected param', async () => {
      const deleteNoteSpy = jest.spyOn(service, 'delete');
      const id = 1;
      service.delete(id);
      expect(deleteNoteSpy).toHaveBeenCalledWith(id);
    });
  

  })
});
