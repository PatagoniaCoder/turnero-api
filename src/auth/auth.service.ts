import { Injectable } from "@nestjs/common";
import { UserLogged } from "src/common/interfaces/user-logged.interface";
import { Login } from "src/common/interfaces/login.interface";
import { RegisterDto } from "./dtos";

@Injectable()
export class AuthService {
  async login(credencial: Login): Promise<UserLogged> {
    const userlogged: UserLogged = {
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
