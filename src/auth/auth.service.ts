import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserLogged } from "src/common/interfaces/i-user-logged.interface";
import { ILogin } from "src/common/interfaces/i-login.interface";
import { RegisterDto } from "./dtos";
import { UserService } from "src/users/user.service";
import { IRegister } from "src/common/interfaces/i-register.interface";

@Injectable()
export class AuthService {

  constructor(private userService:UserService){}

  async login(credencial: ILogin): Promise<IUserLogged | HttpException> {
    const user = await this.userService.findOne({email:credencial.username})
    const isValid = await this.userService.validateUser(user.id,credencial.password)
    if(isValid){
      const userlogged: IUserLogged = {
        username: user.email,
        name: user.firstName,
        lastname: user.lastName,
        email: user.email,
        token: "123456",
        isActive: user.isActive,
      };
      return userlogged
    }else{
      return new HttpException("Wrong pass or username",HttpStatus.FORBIDDEN)
    }
    
  }
  async register(body: RegisterDto): Promise<any> {
    let user:IRegister={
      firstName:body.firstName,
      lastName:body.lastName,
      email:body.email,
      password:body.password,
      repassword:body.repassword,
      isActive:true
    }
    const newUser=await this.userService.create(user)
    return newUser
  }

  async logout(): Promise<void> {
    return;
  }
}
