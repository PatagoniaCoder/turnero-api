import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const mockConnection: TypeOrmModuleOptions = {
    type:'sqlite',
    driver:require('sqlite3'),
    database: "test_turnerodb.db",
    entities: [join(__dirname, "../src/**/*/*entity.ts")], //['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    logger: "file",
    dropSchema: true,
    keepConnectionAlive: true,
  };
  export default mockConnection;