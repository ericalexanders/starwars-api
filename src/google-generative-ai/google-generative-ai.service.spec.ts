import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { GoogleGenerativeAiService } from './google-generative-ai.service';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('GoogleGenerativeAiService', () => {
  let service: GoogleGenerativeAiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleGenerativeAiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key) => {
              if (key === 'API_KEY_GOOGLE_AI') return 'test_api_key';
              if (key === 'API_KEY_GOOGLE_CX') return 'test_cx';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GoogleGenerativeAiService>(GoogleGenerativeAiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateContent', () => {
    it('should return search results', async () => {
      const mockItems = ['image1', 'image2'];
      const mockResponse: AxiosResponse = {
        data: { items: mockItems },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      const results = await service.generateContent('test prompt');
      expect(results).toEqual(mockItems);
    });

    it('should handle errors', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw new Error('Error fetching data');
      });

      await expect(service.generateContent('test prompt')).rejects.toThrow(
        'Error generating content.',
      );
    });
  });
});
