export enum OllamaModel {
  Qwen3_0_6b = 'qwen3:0.6b',
  Qwen3_1_7b = 'qwen3:1.7b',
  Qwen3_4b = 'qwen3:4b',
  Qwen3_8b = 'qwen3:8b',
  Qwen3_14b = 'qwen3:14b',
  Qwen3_32b = 'qwen3:32b',
}

export enum OllamaModelStatus {
  NotInstalled = 'not_installed',
  Installed = 'installed',
}

export enum OllamaChatRole {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

export enum OllamaChatRoomStatus {
  Idle = 'idle',
  Generating = 'generating',
  Archived = 'archived',
}
