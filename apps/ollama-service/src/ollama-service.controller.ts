import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { OllamaChatRequest, OllamaGetRoomChatsRequest } from '@libs/common';
import { OllamaTopic } from '@libs/common/topics';

import { OllamaServiceService } from './ollama-service.service';

@Controller()
export class OllamaServiceController {
  constructor(private readonly ollamaServiceService: OllamaServiceService) {}

  @MessagePattern(OllamaTopic.GetRooms)
  getRooms() {
    return this.ollamaServiceService.getRooms();
  }

  @MessagePattern(OllamaTopic.CreateRoom)
  createRoom() {
    return this.ollamaServiceService.createRoom();
  }

  @MessagePattern(OllamaTopic.GetRoomChats)
  getRoomChats(@Payload() payload: OllamaGetRoomChatsRequest) {
    return this.ollamaServiceService.getRoomChats(payload);
  }

  @MessagePattern(OllamaTopic.Chat)
  chat(@Payload() payload: OllamaChatRequest) {
    return this.ollamaServiceService.chat(payload);
  }
}
