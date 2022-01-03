import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('turno')
export class TurnoEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;

    @Column()
    available:number;

}