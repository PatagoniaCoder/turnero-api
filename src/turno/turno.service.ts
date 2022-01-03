import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IBaseCrud } from "src/common/interfaces/i-base-crud.interface";
import { Repository } from "typeorm";
import { CreateTurnoDto, TurnoDto } from "./dtos";
import { TurnoEntity } from "./entities/turno.entity";

@Injectable()
export class TurnoService implements IBaseCrud {
  constructor(
    @InjectRepository(TurnoEntity)
    private turnoRepository: Repository<TurnoEntity>
  ) {}
  async findAll(): Promise<TurnoDto[]> {
    return await this.turnoRepository.find()
  }
  async findOne(options: object): Promise<TurnoDto> {
    return await this.turnoRepository.findOne(options)
  }
  async create(turnoDto: CreateTurnoDto): Promise<TurnoDto> {
    const turno = this.turnoRepository.create(turnoDto);
    const newTurno = await this.turnoRepository.save(turno).then((res) => {
      const turno: TurnoDto = {
        id: res.id,
        date: res.date,
        available: res.available,
      };
      return turno;
    });
    return newTurno;
  }
  async update(id: number, newValue: Object): Promise<TurnoDto> {
    const turno = await this.turnoRepository.findOne(id)
    const updated = this.turnoRepository.merge(turno,newValue)
    this.turnoRepository.save(updated)
    return await this.turnoRepository.save(updated)
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
