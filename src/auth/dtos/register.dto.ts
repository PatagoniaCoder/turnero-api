import { IsBoolean, IsEmail, IsString, min, Min } from "class-validator";

export class RegisterDto {
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;
    
    @IsEmail()
    email: string;
    
    @IsBoolean()
    isActive?: boolean;
    
    @IsString()
    @Min(8)
    password: string;
    
    @IsString()
    @Min(8)
    repassword: string;
}
