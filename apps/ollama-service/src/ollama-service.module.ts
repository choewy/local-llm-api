import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { OllamaChatMessageEntity, OllamaChatRoomEntity, OllamaModelEntity } from './entities';
import { OllamaServiceController } from './ollama-service.controller';
import { OllamaServiceService } from './ollama-service.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: '127.0.0.1',
          port: 54310,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([OllamaModelEntity, OllamaChatRoomEntity, OllamaChatMessageEntity]),
  ],
  controllers: [OllamaServiceController],
  providers: [OllamaServiceService],
})
export class OllamaServiceModule {}
