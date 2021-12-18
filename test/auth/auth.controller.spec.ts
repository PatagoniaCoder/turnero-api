import { Test, TestingModule } from '@nestjs/testing';
import { LoginDto } from '../../src/auth/dtos/login.dto';
import { AuthController } from '../../src/auth/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Login',()=>{
    it('should be a method login',()=>{
     const login = jest.spyOn(controller, 'login');
      expect(login).toBeDefined()
    })

    it('should be call with user and pass',()=>{
      const login = jest.spyOn(controller, 'login');
      const body = new LoginDto()
      body.username = 'user'
      body.password = 'pass'
      controller.login(body)
      expect(login).toBeCalledWith(body)

    })
  })

  describe('Register',()=>{
    it('should be a method register',()=>{
      const reg = jest.spyOn(controller, 'register');
       expect(reg).toBeDefined()
     })
  })


});
