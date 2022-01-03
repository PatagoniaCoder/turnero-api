import { IsArray, IsDate, IsNumber, IsObject } from "class-validator";


export class TurnoDto {

    @IsNumber()
    id:number

    @IsDate()
    date:Date;

    @IsNumber()
    available:number;

}
