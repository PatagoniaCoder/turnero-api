import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TurnoDto } from "src/turno/dtos/turno.dto";
import { TurnoEntity } from "src/turno/entities/turno.entity";
import {
  mockNewTurno,
  mockTurno,
  mockTurnoRepository,
} from "test/helpers/mocks";
import { TurnoService } from "../../src/turno/turno.service";

describe("TurnoService", () => {
  let service: TurnoService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TurnoService,
        {
          provide: getRepositoryToken(TurnoEntity),
          useFactory: mockTurnoRepository,
        },
      ],
    }).compile();

    service = module.get<TurnoService>(TurnoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("CRUD turno", () => {
    it("should create a turno", async () => {
      const turno = await service.create(mockNewTurno);
      expect(turno).toMatchObject<TurnoDto>(mockTurno);
    });

    it("should find a one turno", async () => {
      const turnoFound = service.findOne({ id: 1 });
      expect(turnoFound).toBeDefined();
    });

    it("should return array of turnos", async () => {
      const allTurno = await service.findAll();
      expect(allTurno.length).toBeGreaterThan(0);
    });

    it("should update an turno", async () => {
      const toUpdate = await service.findOne({id:1})
      toUpdate.available=2
      const updatedTurno = await service.update(
        toUpdate.id,
        toUpdate
      );
      expect(updatedTurno).toEqual(toUpdate);
    });

    it("should delete an turno", async () => {
      const deleted = await service.delete(1)
      expect(deleted).toBe(mockTurno)
    });
  });

});
