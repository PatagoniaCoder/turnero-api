import { Body, Controller, Res } from '@nestjs/common';
import { ChangePassDto } from './dtos/change-pass.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService:UserService){}

    public async update(){}

    public async changePass(@Res() res:any, @Body() body: ChangePassDto){
        const user:UserDto=res.req.user
        return await this.userService.changePass(body,user)
    }
}
