import * as request from "supertest";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import mockConnection from "../helpers/mockconection";
import { UserModule } from "../../src/users/user.module";
import { changePass, loginMock } from '../helpers/mocks'
import { UserLogged } from "src/auth/dtos/user-logged.dto";

describe("User (e2e)", () => {
  let app: INestApplication;
  let userLogin:UserLogged

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(mockConnection),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env-test",
        }),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/user/changepass/ (POST)", async()=>{
    return await request(app.getHttpServer())
    .post("/users/changepass")
    .set("Accept", "Application/json")
    .send(changePass)
    .expect(HttpStatus.OK);

  })
});
