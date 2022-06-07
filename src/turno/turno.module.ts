import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoEntity } from './entities/turno.entity';
import { TurnoController } from './turno.controller';
import { TurnoService } from './turno.service';

@Module({
  imports:[TypeOrmModule.forFeature([TurnoEntity])],
  controllers: [TurnoController],
  providers: [TurnoService]
})
export class TurnoModule {}
