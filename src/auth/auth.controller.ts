import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Post('login')
    public async login(@Res() res, @Body() body:LoginDto):Promise<any>{
        return await this.authService.login(body).then(async (result)=>{
            return await res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                data: result,
              });
        })
    }

    @Post('register')
    public async register(body:RegisterDto):Promise<any>{
        return this.authService.register(body)
    }

    @Get('logout')
    public async logout():Promise<any>{
        return this.authService.logout()
    }
}
