import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;

  beforeEach(async () => {
    const mockPeopleService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        {
          provide: StarshipsService,
          useValue: mockPeopleService,
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      const result = [];
      (service.findAll as jest.Mock).mockReturnValue(of(result));

      expect(await firstValueFrom(controller.findAll({}))).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a starship object', async () => {
      const person = { name: 'Luke Skywalker' };
      (service.findOne as jest.Mock).mockReturnValue(of(person));

      expect(await firstValueFrom(controller.findOne('1'))).toBe(person);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    xit('should throw NotFoundException if the starship does not exist', async () => {
      (service.findOne as jest.Mock).mockReturnValue(of(undefined));

      await expect(firstValueFrom(controller.findOne('999'))).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
