import { Body, Controller } from '@nestjs/common';
import { ChangePassDto } from './dtos/change-pass.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService:UserService){}

    public async update(){}
    public async changePass(@Body() body: ChangePassDto){
        return await this.userService.changePass(body)
    }
}
