import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {compare} from 'bcrypt'
import { RegisterDto } from "src/auth/dtos";
import { IBaseCrud } from "src/common/interfaces/i-base-crud.interface";
import { Repository } from "typeorm";
import { ChangePassDto } from "./dtos/change-pass.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService implements IBaseCrud {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async changePass(changePass: ChangePassDto, user: UserDto): Promise<any> {
    const usertochange = await this.getPass(user.id)
    if (await compare(changePass.oldpass,usertochange.password)){
      await usertochange.setPassword(changePass.newpass)
      await this.userRepository.save(usertochange)
      return "Change succes";
    }else{
      return "Wrong Pass"
    }
  }
  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }
  async findOne(options: object): Promise<UserDto> {
    return await this.userRepository.findOne(options);
  }
  async create(entity: RegisterDto): Promise<UserDto> {
    const newUser = this.userRepository.create({
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      isActive: entity.isActive,
      password:entity.password
    });
    const saved = await this.userRepository.save(newUser);
    delete saved.password;
    return saved;
  }
  async update(id: number, newValue: UpdateUserDto): Promise<UserDto> {
    const userfound = await this.userRepository.findOne({ id });
    const userUpdated = this.userRepository.merge(userfound, newValue);
    return await this.userRepository.save(userUpdated);
  }
  async delete(id: number): Promise<any> {
    const userToDelete = await this.userRepository.findOne(id);
    return await this.userRepository.remove(userToDelete);
  }

  private async getPass(id:number): Promise<UserEntity>{
    return await this.userRepository
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.id=:id", { id })
    .getOne();

  }

  async validateUser(id:number, password:string):Promise<boolean>{
    const user = await this.getPass(id)
    return await compare(password,user.password)
  }
}
