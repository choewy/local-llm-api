import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { OllamaTopic } from '@libs/common';

import { OllamaChatRequestDTO } from './dto';

@Controller('ollama')
export class OllamaController {
  constructor(
    @Inject('OLLAMA_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @Get('rooms')
  getRooms() {
    return this.client.send(OllamaTopic.GetRooms, {});
  }

  @Post('rooms')
  createRoom() {
    return this.client.send(OllamaTopic.CreateRoom, {});
  }

  @Get('rooms/:roomId')
  getRoomChats(@Param('roomId', new ParseUUIDPipe({ version: '4' })) roomId: string) {
    return this.client.send(OllamaTopic.GetRoomChats, { roomId });
  }

  @Post('rooms/:roomId/chat')
  chat(@Param('roomId', new ParseUUIDPipe({ version: '4' })) roomId: string, @Body() body: OllamaChatRequestDTO) {
    return this.client.send(OllamaTopic.Chat, { roomId, ...body });
  }
}
