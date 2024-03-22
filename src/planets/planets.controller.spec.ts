import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let service: PlanetsService;

  beforeEach(async () => {
    const mockPlanetsService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        {
          provide: PlanetsService,
          useValue: mockPlanetsService,
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      const result = [];
      (service.findAll as jest.Mock).mockReturnValue(of(result));

      expect(await firstValueFrom(controller.findAll({}))).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a planet object', async () => {
      const person = { name: 'Tatooine' };
      (service.findOne as jest.Mock).mockReturnValue(of(person));

      expect(await firstValueFrom(controller.findOne('1'))).toBe(person);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    xit('should throw NotFoundException if the planet does not exist', async () => {
      (service.findOne as jest.Mock).mockReturnValue(of(undefined));

      await expect(firstValueFrom(controller.findOne('999'))).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
