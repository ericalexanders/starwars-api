import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { from, map, mergeMap, toArray } from 'rxjs';
import { GoogleGenerativeAiService } from '../google-generative-ai/google-generative-ai.service';

@Injectable()
export class PeopleService {
  constructor(
    private httpService: HttpService,
    private readonly googleGenAIService: GoogleGenerativeAiService,
  ) {}

  findAll(query: any) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const url = `https://swapi.dev/api/people/?${queryString}`;

    return this.httpService.get(url).pipe(
      mergeMap((response) => {
        const results = response.data.results || [];
        return from(results).pipe(
          mergeMap((item: any) =>
            from(this.googleGenAIService.generateContent(item.name)).pipe(
              map((content: any) => {
                item.img = content?.length > 0 ? content[2].link : null;
                return item;
              }),
            ),
          ),
          toArray(),
          map((itemsWithImages) => ({
            ...response.data,
            results: itemsWithImages,
          })),
        );
      }),
    );
  }

  findOne(id: string) {
    return this.httpService
      .get(`https://swapi.dev/api/people/${id}`)
      .pipe(map((response) => response.data));
  }
}
