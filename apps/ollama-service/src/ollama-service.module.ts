import { Module } from '@nestjs/common';

import { OllamaServiceController } from './ollama-service.controller';
import { OllamaServiceService } from './ollama-service.service';

@Module({
  imports: [],
  controllers: [OllamaServiceController],
  providers: [OllamaServiceService],
})
export class OllamaServiceModule {}
