import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OllamaChatRoomStatus, OllamaModel } from '@libs/common';

@Entity({ name: 'ollama_chat_rooms' })
export class OllamaChatRoomEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'ollama_chat_rooms_PK' })
  id!: string;

  @Column({ type: 'text' })
  model!: OllamaModel;

  @Column({ type: 'int', default: 0 })
  lastMessageIndex!: number;

  @Column({ type: 'enum', enum: OllamaChatRoomStatus, default: OllamaChatRoomStatus.Idle })
  status!: OllamaChatRoomStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
