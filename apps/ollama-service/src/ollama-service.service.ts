import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { OpenAI } from 'openai';

import { OllamaChatRequest } from '@libs/common';

@Injectable()
export class OllamaServiceService {
  private readonly client = new OpenAI({ apiKey: 'ollama', baseURL: 'http://127.0.0.1:11434/v1' });

  async chat(request: OllamaChatRequest) {
    const result = await this.client.chat.completions
      .create({
        model: request.model ?? 'qwen3:4b',
        max_completion_tokens: request.maxCompletionTokens,
        max_tokens: request.maxCompletionTokens,
        messages: [
          { role: 'system', content: '너는 한국어로 간결하게 답변한다. 내부 사고 과정은 출력하지 않는다.' },
          { role: 'user', content: request.message },
        ],
      })
      .catch((e) => {
        throw new RpcException(e as Error);
      });

    return result;
  }
}
