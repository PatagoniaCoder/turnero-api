import { Body, Controller, Param, Post, Put, Res } from '@nestjs/common';
import { UpdateUserDto, ChangePassDto, UserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService:UserService){}

    public async update(@Res() res:any, @Param()id:number,@Body() body:UpdateUserDto){
        return await this.userService.update(id,body)
    }

    @Put('changepass/:id')
    public async changePass(@Res() res:any, @Param('id') id:number, @Body() body: ChangePassDto){
        return await this.userService.changePass(body,id)
    }
}
