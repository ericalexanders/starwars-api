import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { HttpModule } from '@nestjs/axios';
import { GoogleGenerativeAiService } from 'src/google-generative-ai/google-generative-ai.service';

@Module({
  imports: [HttpModule],
  controllers: [PeopleController],
  providers: [PeopleService, GoogleGenerativeAiService],
})
export class PeopleModule {}
