import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const mockFilmsService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const result = [];
      (service.findAll as jest.Mock).mockReturnValue(of(result));

      expect(await firstValueFrom(controller.findAll({}))).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a film object', async () => {
      const film = { title: 'A New Hope' };
      (service.findOne as jest.Mock).mockReturnValue(of(film));

      expect(await firstValueFrom(controller.findOne('1'))).toBe(film);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    xit('should throw NotFoundException if the film does not exist', async () => {
      (service.findOne as jest.Mock).mockReturnValue(of(undefined));

      await expect(firstValueFrom(controller.findOne('999'))).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
