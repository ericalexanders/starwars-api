import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('StarshipsService', () => {
  let service: StarshipsService;
  let httpService: HttpService;

  beforeEach(async () => {
    // Mock HttpService
    const httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      // Providers
      providers: [
        StarshipsService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      const result = { results: [] };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const query = { name: 'Luke' };
      expect(await service.findAll(query).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/starships/?name=Luke`,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single starship details', async () => {
      const result = { name: 'Death Star' };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const id = '1';
      expect(await service.findOne(id).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/starships/1`,
      );
    });
  });
});
