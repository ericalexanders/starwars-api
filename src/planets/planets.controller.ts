import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetService: PlanetsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.planetService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const planet = this.planetService.findOne(id);
    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
    return planet;
  }
}
