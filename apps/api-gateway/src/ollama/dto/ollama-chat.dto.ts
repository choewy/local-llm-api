import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { OllamaModel } from '@libs/common';

const OllamaChatRequestSchema = z.object({
  message: z.string().trim(),
  model: z.enum(OllamaModel).optional(),
  maxCompletionTokens: z.number().int().positive().optional(),
});

export class OllamaChatRequestDTO extends createZodDto(OllamaChatRequestSchema) {}
