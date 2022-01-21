import * as request from "supertest";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import mockConnection from "../helpers/mockconection";
import { UserModule } from "../../src/users/user.module";
import { changePass, registerMock, userActive } from "../helpers/mocks";
import { UserService } from "../../src/users/user.service";

describe("User (e2e)", () => {
  let app: INestApplication;
  let service: UserService;

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
    service = moduleFixture.get<UserService>(UserService)
    await app.init();
  });

  afterAll(async ()=>{
    await app.close()
  })

  it("/user/changepass/ (POST)", async () => {
    const user = await service.create(registerMock)
    console.log(user)
    return await request(app.getHttpServer())
      .put(`/users/changepass/${userActive.id}`)
      .set("Accept", "Application/json")
      .send(changePass)
      .expect(HttpStatus.CREATED)
  });
});
