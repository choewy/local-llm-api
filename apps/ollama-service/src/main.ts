import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { OllamaServiceModule } from './ollama-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OllamaServiceModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3010,
    },
  });

  await app.listen();
}

void bootstrap();
