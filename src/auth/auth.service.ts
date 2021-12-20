import { Injectable } from "@nestjs/common";
import { IUserLogged } from "src/common/interfaces/i-user-logged.interface";
import { ILogin } from "src/common/interfaces/i-login.interface";
import { RegisterDto } from "./dtos";

@Injectable()
export class AuthService {
  async login(credencial: ILogin): Promise<IUserLogged> {
    const userlogged: IUserLogged = {
      username: "",
      name: "",
      lastname: "",
      email: "",
      token: "",
      isActive: true,
    };
    return userlogged
  }
  async register(body: RegisterDto): Promise<any> {
    return;
  }

  async logout(): Promise<void> {
    return;
  }
}
