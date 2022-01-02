import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {compare} from 'bcrypt'
import { IBaseCrud } from "src/common/interfaces/i-base-crud.interface";
import { IChangePass } from "src/common/interfaces/i-change-pass";
import { IRegister } from "src/common/interfaces/i-register.interface";
import { IUser } from "src/common/interfaces/i-user.interface";
import { Repository } from "typeorm";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService implements IBaseCrud {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async changePass(changePass: IChangePass, user: UserDto): Promise<any> {
    const usertochange = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.id=:id", { id: user.id })
      .getOne();
    if (await compare(changePass.oldpass,usertochange.password)){
      await usertochange.sertPassword(changePass.newpass)
      await this.userRepository.save(usertochange)
      return "Change succes";
    }else{
      return "Wrong Pass"
    }
  }
  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }
  async findOne(options: IUser | object): Promise<UserDto> {
    return await this.userRepository.findOne(options);
  }
  async create(entity: IRegister): Promise<UserDto> {
    const newUser = this.userRepository.create(entity);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }
  async update(id: number, newValue: IUser): Promise<UserDto> {
    const userfound = await this.userRepository.findOne({ id });
    const userUpdated = this.userRepository.merge(userfound, newValue);
    return await this.userRepository.save(userUpdated);
  }
  async delete(id: number): Promise<any> {
    const userToDelete = await this.userRepository.findOne(id);
    return await this.userRepository.remove(userToDelete);
  }
}
