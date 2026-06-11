import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OllamaController } from './ollama.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'OLLAMA_CLIENT',
        useFactory() {
          return {
            transport: Transport.TCP,
            options: {
              host: '127.0.0.1',
              port: 3010,
            },
          };
        },
      },
    ]),
  ],
  controllers: [OllamaController],
})
export class OllamaModule {}
