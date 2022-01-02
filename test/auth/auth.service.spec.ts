import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { LoginDto, RegisterDto } from "src/auth/dtos";
import { ILogin } from "src/common/interfaces/i-login.interface";
import { IUserLogged } from "src/common/interfaces/i-user-logged.interface";
import { UserEntity } from "src/users/entities/user.entity";
import { UserService } from "src/users/user.service";
import mockConnection from "test/helpers/mockconection";
import { loginMock, registerMock } from "test/helpers/mocks";

describe("AuthService", () => {
  let service: AuthService;
  let userService:UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env-test",
        }),
        TypeOrmModule.forRoot(mockConnection),
        TypeOrmModule.forFeature([UserEntity])],
      providers: [AuthService,UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService)
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe('LOGGIN',()=>{
    it("should return a user login", async () => {
      await userService.create(registerMock)
      const userlogged = await service.login(loginMock);
      expect(userlogged).toMatchObject<IUserLogged>({
        username: registerMock.email,
        name: registerMock.firstName,
        lastname: registerMock.lastName,
        email: registerMock.email,
        token:"123456" ,
        isActive: registerMock.isActive,
      });
    });
  
    it('should no be login',async()=>{
      const user = await userService.create(registerMock)
      const credentials:ILogin={
        username:user.email,
        password:"wrongpass"
      }
      await service.login(credentials).then((res:HttpException)=>{
        expect(res.message).toBe("Wrong pass or username")
        expect(res.getStatus()).toBe(HttpStatus.FORBIDDEN)
      })
    })
  })
  
  describe('Register',()=>{
    it('should be register an new user',async ()=>{
      const registerUser:RegisterDto={
        email:registerMock.email,
        firstName:registerMock.firstName,
        lastName:registerMock.lastName,
        password:registerMock.password,
        repassword:registerMock.repassword
      }
      const user = await service.register(registerUser)
      expect(user).toBeDefined()
    })

  })
});
