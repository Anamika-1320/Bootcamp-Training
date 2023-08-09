/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsService {
  private readonly apiKey = 'e68440ca00fc4a53aca999f31a1edbe1';
  private readonly apiUrl = 'http://newsapi.org/v2/top-headlines';

  async getNews() {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          apiKey: this.apiKey,
          country: 'us',
        },
      });
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
}
