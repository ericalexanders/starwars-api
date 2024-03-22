import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      // Providers
      providers: [
        PlanetsService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of planet', async () => {
      const result = { results: [] };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const query = { name: 'Tatooinee' };
      expect(await service.findAll(query).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/planets/?name=Tatooinee`,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single planet details', async () => {
      const result = { name: 'Tatooine' };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const id = '1';
      expect(await service.findOne(id).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/planets/1`,
      );
    });
  });
});
