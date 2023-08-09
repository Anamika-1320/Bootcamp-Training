import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello there!';
  }

  getEmp(): string {
    console.log('This is a test log.');
    return 'Hello this is emp!';
  }
}
