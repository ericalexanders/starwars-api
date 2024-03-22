import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.peopleService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const person = this.peopleService.findOne(id);
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }
}
