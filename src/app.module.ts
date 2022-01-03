import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TYPEORM_CONFIG } from './shared/config/constants';
import { UserModule } from './users/user.module';
import { TurnoModule } from './turno/turno.module';
import databaseConfig from './shared/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    TurnoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
