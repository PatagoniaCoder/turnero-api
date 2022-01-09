import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dtos";
import { UserService } from "src/users/user.service";
import { UserLogged } from "./dtos/user-logged.dto";

@Injectable()
export class AuthService {

  constructor(private userService:UserService){}

  async login(credencial: LoginDto): Promise<UserLogged | HttpException> {
    const user = await this.userService.findOne({email:credencial.username})
    const isValid = await this.userService.validateUser(user.id,credencial.password)
    if(isValid){
      const userlogged: UserLogged = {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
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
    const newUser=await this.userService.create(body)
    return newUser
  }

  async logout(): Promise<void> {
    return;
  }
}
