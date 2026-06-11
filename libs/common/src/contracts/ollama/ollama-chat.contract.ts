import { OllamaModel } from '@libs/common/constants';

export interface OllamaChatRequest {
  message: string;
  model?: OllamaModel;
  maxCompletionTokens?: number;
}
