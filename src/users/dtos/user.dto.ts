import { IsString, IsEmail, IsBoolean, IsNumber } from "class-validator";

export class UserDto{

    @IsNumber()
    id:number;
    
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;
    
    @IsEmail()
    email: string;
    
    @IsBoolean()
    isActive?: boolean;
}