import { Injectable } from '@nestjs/common';
import { Login } from '../../src/common/interfaces/login.interface';
import { RegisterDto } from './dtos';

@Injectable()
export class AuthService {

    async login(credencial:Login):Promise<any>{
        return
    }
    async register(body:RegisterDto):Promise<any>{
        return
    }

    async logout():Promise<void>{
        return

    }
}
