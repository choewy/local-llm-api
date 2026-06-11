import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenaiServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
