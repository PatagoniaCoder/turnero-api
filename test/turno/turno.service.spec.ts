import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateTurnoDto } from "src/turno/dtos/create-turno.dto";
import { TurnoDto } from "src/turno/dtos/turno.dto";
import { TurnoEntity } from "src/turno/entities/turno.entity";
import mockConnection from "test/helpers/mockconection";
import { mockNewTurno, mockUpdatedTurno } from "test/helpers/mocks";
import { TurnoService } from "../../src/turno/turno.service";

describe("TurnoService", () => {
  let service: TurnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env-test",
        }),
        TypeOrmModule.forRoot(mockConnection),
        TypeOrmModule.forFeature([TurnoEntity]),
      ],
      providers: [TurnoService],
    }).compile();

    service = module.get<TurnoService>(TurnoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("CRUD turno", () => {
    it("should create a turno", async () => {
      const turno = await service.create(mockNewTurno);
      expect(turno).toMatchObject<TurnoDto>({
        id: 1,
        date: mockNewTurno.date,
        available: mockNewTurno.available,
      });
    });

    it("should find a one turno", async () => {
      const turnoFound = service.findOne({id:1})
      expect(turnoFound).toBeDefined()
    });

    it("should return array of turnos", async () => {
      const allTurno=await service.findAll()
      expect(allTurno.length).toBeGreaterThan(0)
    });

    it("should update an turno", async () => {
      const updatedTurno = await service.update(mockUpdatedTurno.id,mockUpdatedTurno)
      expect(updatedTurno).toEqual(mockUpdatedTurno)
    });

    it("should delete an turno", async () => {});
  });
});
