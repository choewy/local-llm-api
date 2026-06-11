import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { OllamaTopic } from '@libs/common';

import { OllamaChatRequestDTO } from './dto';

@Controller('ollama')
export class OllamaController {
  constructor(
    @Inject('OLLAMA_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Post('chat')
  chat(@Body() body: OllamaChatRequestDTO) {
    return this.client.send(OllamaTopic.Chat, body);
  }
}
