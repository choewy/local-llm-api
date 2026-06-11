import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { OllamaChatRequest } from '@libs/common';
import { OllamaTopic } from '@libs/common/topics';

import { OllamaServiceService } from './ollama-service.service';

@Controller()
export class OllamaServiceController {
  constructor(private readonly ollamaServiceService: OllamaServiceService) {}

  @MessagePattern(OllamaTopic.Chat)
  chat(@Payload() payload: OllamaChatRequest) {
    return this.ollamaServiceService.chat(payload);
  }
}
