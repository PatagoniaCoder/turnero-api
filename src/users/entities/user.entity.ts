import {hash,genSalt} from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column,BeforeInsert,BeforeUpdate } from "typeorm";
@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email:string;

    @Column()
    isActive: boolean;

    @Column({select:false})
    password:string

    @BeforeInsert()
    async sertPassword(password:string){
        const salt = await genSalt()
        this.password = await hash(password || this.password,salt)
    }
}