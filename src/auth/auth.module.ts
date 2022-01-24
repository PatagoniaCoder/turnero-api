import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),PassportModule],
  controllers: [AuthController],
  providers: [AuthService,UserService,LocalStrategy]
})
export class AuthModule {}
