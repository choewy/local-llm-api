import { Module } from '@nestjs/common';
import { OpenaiServiceController } from './openai-service.controller';
import { OpenaiServiceService } from './openai-service.service';

@Module({
  imports: [],
  controllers: [OpenaiServiceController],
  providers: [OpenaiServiceService],
})
export class OpenaiServiceModule {}
