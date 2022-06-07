import { IsNotEmpty, IsString, Min } from "class-validator";

export class ChangePassDto {
  @IsString()
  @Min(8)
  @IsNotEmpty()
  newpass: string;
  
  @IsString()
  @Min(8)
  @IsNotEmpty()
  oldpass: string;
}
