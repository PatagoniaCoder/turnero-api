import { Controller } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    
    public async login(body:LoginDto){

    }

    public async register(){}
}
