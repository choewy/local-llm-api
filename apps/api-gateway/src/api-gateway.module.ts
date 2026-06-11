import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ZodValidationPipe } from 'nestjs-zod';

import { ApiGatewayController } from './api-gateway.controller';
import { OllamaModule } from './ollama';

@Module({
  imports: [OllamaModule],
  controllers: [ApiGatewayController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class ApiGatewayModule {}
