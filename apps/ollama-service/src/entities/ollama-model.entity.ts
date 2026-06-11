import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OllamaModel, OllamaModelStatus } from '@libs/common';

@Entity({ name: 'ollama_models' })
@Index('ollama_models_UK', ['model'], { unique: true })
export class OllamaModelEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', primaryKeyConstraintName: 'ollama_models_PK' })
  id!: string;

  @Column({ type: 'text' })
  model!: OllamaModel;

  @Column({ type: 'text' })
  status!: OllamaModelStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
