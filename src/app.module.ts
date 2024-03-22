import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { FilmsService } from './films/films.service';
import { StarshipsService } from './starships/starships.service';
import { PlanetsService } from './planets/planets.service';
import { FilmsController } from './films/films.controller';
import { StarshipsController } from './starships/starships.controller';
import { PlanetsController } from './planets/planets.controller';
import { PeopleService } from './people/people.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PeopleModule, HttpModule],
  controllers: [
    AppController,
    FilmsController,
    StarshipsController,
    PlanetsController,
  ],
  providers: [
    AppService,
    FilmsService,
    StarshipsService,
    PlanetsService,
    PeopleService,
  ],
})
export class AppModule {}
