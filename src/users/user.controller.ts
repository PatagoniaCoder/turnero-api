import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { UpdateUserDto, ChangePassDto, UserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService:UserService){}

    public async update(@Res() res:any, @Param()id:number,@Body() body:UpdateUserDto){
        return await this.userService.update(id,body)
    }

    @Post('changepass')
    public async changePass(@Res() res:any, @Body() body: ChangePassDto){
        console.log(res.req.user)
        const user:UserDto=res.req.user
        return await this.userService.changePass(body,user)
    }
}
