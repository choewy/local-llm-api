import { Controller, Get } from '@nestjs/common';

import { OpenaiServiceService } from './openai-service.service';

@Controller()
export class OpenaiServiceController {
  constructor(private readonly openaiServiceService: OpenaiServiceService) {}

  @Get()
  getHello(): string {
    return this.openaiServiceService.getHello();
  }
}
