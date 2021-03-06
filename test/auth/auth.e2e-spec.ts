import * as request from "supertest";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthModule } from "../../src/auth/auth.module";
import { loginMock, registerMock } from "../../test/helpers/mocks";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import mockConnection from "../../test/helpers/mockconection";
import { UserService } from "../../src/users/user.service";

describe("Auth (e2e)", () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(mockConnection),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env-test",
        }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = app.get<UserService>(UserService);
    await app.init();
  });
  afterAll(async ()=>{
    await app.close()
  })

  it("/auth/login/ (POST)", async () => {
    await userService.create(registerMock);
    return request(await app.getHttpServer())
      .post("/auth/login")
      .set("Accept", "Application/json")
      .send(loginMock)
      .expect(HttpStatus.OK);
  });

  it("/auth/register/ (POST)", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .set("Accept", "Application/json")
      .send(registerMock)
      .expect(HttpStatus.CREATED);
  });

  it("/auth/logout (GET)", async () => {
    return await request(app.getHttpServer())
      .get("/auth/logout")
      .expect(HttpStatus.OK);
  });
});
