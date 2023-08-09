/* eslint-disable prettier/prettier */
import { Controller, Get, Render } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get()
  @Render('news')
  async getNews() {
    try {
      const news = await this.newsService.getNews();
      return { news };
    } catch (error) {
      console.error('Error getting news in controller:', error);
      return { news: [] };
    }
  }
}

