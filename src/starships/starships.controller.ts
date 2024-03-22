import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { StarshipsService } from './starships.service';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.starshipsService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const person = this.starshipsService.findOne(id);
    if (!person) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
    return person;
  }
}
