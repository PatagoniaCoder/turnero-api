import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const configDB = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [join(__dirname, '../../**/**/*/*entity{.ts,.js}')], //['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    migrationsRun: true,
    migrations: [join(__dirname, '../../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    cli: {
      migrationsDir: 'src/migration',
    },
    // Disable in production
    synchronize: false,
    logging: true,
    logger: 'file',
  };
};
export default registerAs('database', () => ({ config: configDB() }));