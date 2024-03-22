import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpService: HttpService;

  beforeEach(async () => {
    // Mock HttpService
    const httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      // Providers
      providers: [
        PeopleService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      const result = { results: [] };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const query = { name: 'Luke' };
      expect(await service.findAll(query).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/people/?name=Luke`,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single person details', async () => {
      const result = { name: 'Luke Skywalker' };
      (httpService.get as jest.Mock).mockReturnValue(of({ data: result }));

      const id = '1';
      expect(await service.findOne(id).toPromise()).toEqual(result);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://swapi.dev/api/people/1`,
      );
    });
  });
});
