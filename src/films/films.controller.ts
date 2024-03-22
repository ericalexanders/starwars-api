import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.filmsService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const film = this.filmsService.findOne(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return film;
  }
}
