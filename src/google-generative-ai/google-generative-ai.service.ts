import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GoogleGenerativeAiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async generateContent(prompt: string): Promise<any> {
    try {
      // const apiKey = this.configService.get<string>('API_KEY_GOOGLE_AI');
      // const cx = this.configService.get<string>('API_KEY_GOOGLE_CX');
      const apiKey = 'AIzaSyACf7KGpkjwep1Jg8mMc6DN-Sr5FZnvkS0';
      const cx = 'f6ae169c1d2234a19';
      const url = `https://www.googleapis.com/customsearch/v1?q="${prompt}"&cx=${cx}&key=${apiKey}&searchType=image`;
      const response = await this.httpService.get(url).toPromise();
      return response.data.items;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Error generating content.');
    }
  }
}
