import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('FilmsService', () => {
  let service: FilmsService;
  let httpService: HttpService;

  beforeEach(async () => {
    // Mock HttpService
    const httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      // Providers
      providers: [
        FilmsService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const result = { results: [] };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const query = { name: 'Luke' };
      expect(await service.findAll(query).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/films/?name=Luke`,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single film details', async () => {
      const result = { name: 'Luke Skywalker' };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const id = '1';
      expect(await service.findOne(id).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/films/1`,
      );
    });
  });
});
