import { OllamaModel } from '@libs/common/constants';

export interface OllamaChatRequest {
  roomId: string;
  message: string;
  model?: OllamaModel;
  maxCompletionTokens?: number;
}
