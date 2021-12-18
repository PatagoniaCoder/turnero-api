import { IsString, Min } from "class-validator";

export class LoginDto {
    @IsString()
    username:string;
    
    @IsString()
    @Min(8)
    password:string;
}
