import { IsDate, IsNumber } from "class-validator";

export class CreateTurnoDto{
    @IsDate()
    date:Date;

    @IsNumber()
    available:number;
}