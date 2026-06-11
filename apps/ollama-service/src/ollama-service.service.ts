import { Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { OpenAI } from 'openai';
import { ChatCompletionMessage } from 'openai/resources';
import { Repository } from 'typeorm';

import { OllamaChatRequest, OllamaChatRole, OllamaChatRoomStatus, OllamaGetRoomChatsRequest, OllamaModel, OllamaModelStatus } from '@libs/common';

import { OllamaChatMessageEntity, OllamaChatRoomEntity, OllamaModelEntity } from './entities';

@Injectable()
export class OllamaServiceService implements OnModuleInit {
  private readonly client = new OpenAI({ apiKey: 'ollama', baseURL: 'http://127.0.0.1:11434/v1' });

  constructor(
    @InjectRepository(OllamaModelEntity)
    private readonly modelRepository: Repository<OllamaModelEntity>,
    @InjectRepository(OllamaChatRoomEntity)
    private readonly roomRepository: Repository<OllamaChatRoomEntity>,
    @InjectRepository(OllamaChatMessageEntity)
    private readonly messageRepository: Repository<OllamaChatMessageEntity>,
  ) {}

  async onModuleInit() {
    const modelMap = new Map(Object.values(OllamaModel).map((model) => [model, OllamaModelStatus.NotInstalled]));
    const modelList = await this.client.models.list();

    for (const model of modelList.data) {
      modelMap.set(model.id as OllamaModel, OllamaModelStatus.Installed);
    }

    const models = Array.from(modelMap).map(([model, status]) => this.modelRepository.create({ model, status }));
    await this.modelRepository.upsert(models, {
      conflictPaths: { model: true },
      skipUpdateIfNoValuesChanged: true,
    });
  }

  async getRooms() {
    return this.roomRepository.find({
      select: {
        id: true,
        lastMessageIndex: true,
        createdAt: true,
        updatedAt: true,
      },
      order: { updatedAt: 'DESC' },
    });
  }

  async createRoom() {
    const room = this.roomRepository.create({
      model: OllamaModel.Qwen3_4b,
      status: OllamaChatRoomStatus.Idle,
    });

    await this.roomRepository.insert(room);

    return room;
  }

  async getRoomChats(request: OllamaGetRoomChatsRequest) {
    return this.messageRepository.find({
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
      where: { roomId: request.roomId },
      order: { messageIndex: 'ASC' },
    });
  }

  async chat(request: OllamaChatRequest) {
    const model = await this.modelRepository.findOneBy({ model: request.model ?? OllamaModel.Qwen3_4b });

    if (!model) {
      throw new RpcException('모델 정보를 찾을 수 없습니다.');
    }

    if (model.status === OllamaModelStatus.NotInstalled) {
      throw new RpcException('지원하지 않는 모델입니다.');
    }

    const room = await this.roomRepository.findOneBy({ id: request.roomId });

    if (!room) {
      throw new RpcException('존재하지 않는 방입니다.');
    }

    if (room.status === OllamaChatRoomStatus.Archived) {
      throw new RpcException('대화가 불가능한 방입니다.');
    }

    const result = await this.roomRepository.update({ id: room.id, status: OllamaChatRoomStatus.Idle }, { status: OllamaChatRoomStatus.Generating });

    if (result.affected !== 1) {
      throw new RpcException('답변을 생성중입니다.');
    }

    const insertChatMessage = async (roomId: string, message: OllamaChatMessageEntity) => {
      const result = await this.roomRepository
        .createQueryBuilder()
        .update()
        .set({ lastMessageIndex: () => 'last_message_index + 1', updatedAt: () => 'NOW()' })
        .where('id = :id', { id: roomId })
        .returning('last_message_index')
        .execute();

      message.roomId = roomId;
      message.messageIndex = (result.raw as Array<{ last_message_index: number }>)[0].last_message_index;

      await this.messageRepository.insert(message);

      return message;
    };

    await insertChatMessage(room.id, this.messageRepository.create({ role: OllamaChatRole.User, content: request.message }));

    const messages = await this.messageRepository.find({
      where: { roomId: room.id },
      order: { messageIndex: 'ASC' },
    });

    const response = await this.client.chat.completions
      .create({
        model: model.model,
        max_completion_tokens: request.maxCompletionTokens,
        max_tokens: request.maxCompletionTokens,
        messages: [
          { role: 'system', content: '너는 한국어로 간결하게 답변한다. 내부 사고 과정은 출력하지 않는다.' },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      })
      .catch((e) => {
        throw new RpcException(e as Error);
      });

    const usage = response.usage;
    const choice = response.choices[0];
    const message = choice.message as ChatCompletionMessage & {
      content: string;
      reasoning: string;
    };

    await insertChatMessage(
      room.id,
      this.messageRepository.create({
        role: OllamaChatRole.Assistant,
        content: message.content,
        reasoning: message.reasoning,
        finishReason: choice.finish_reason,
        promptTokens: usage?.prompt_tokens,
        completionTokens: usage?.completion_tokens,
        totalTokens: usage?.total_tokens,
      }),
    );

    return response;
  }
}
