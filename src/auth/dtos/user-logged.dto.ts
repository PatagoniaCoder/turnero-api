import { IsNumber, IsString, IsEmail, IsBoolean } from "class-validator";

export class UserLogged{
  @IsNumber()
    id:number;
    
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;
    
    @IsEmail()
    email: string;
    
    @IsBoolean()
    isActive: boolean;

    @IsString()
    token: string;
}