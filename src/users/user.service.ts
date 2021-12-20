import { Injectable } from '@nestjs/common';
import { IBaseCrud } from 'src/common/interfaces/i-base-crud.interface';
import { IChangePass } from 'src/common/interfaces/i-change-pass';

@Injectable()
export class UserService implements IBaseCrud{
    changePass(changePass: IChangePass) {
      throw new Error("Method not implemented.");
    }
    findAll(): Promise<Object[]> {
        throw new Error('Method not implemented.');
    }
    findOne(options: object): Promise<Object> {
        throw new Error('Method not implemented.');
    }
    create(entity: Object): Promise<Object> {
        throw new Error('Method not implemented.');
    }
    update(id: number, newValue: Object): Promise<Object> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
