import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PeopleService {
  constructor(private httpService: HttpService) {}

  findAll(query: any) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return this.httpService
      .get(`https://swapi.dev/api/people/?${queryString}`)
      .pipe(map((response: any) => response.data));
  }

  findOne(id: string) {
    return this.httpService
      .get(`https://swapi.dev/api/people/${id}`)
      .pipe(map((response: any) => response.data));
  }
}
