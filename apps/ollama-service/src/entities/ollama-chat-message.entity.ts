import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OllamaChatRole } from '@libs/common';

import { OllamaChatRoomEntity } from './ollama-chat-room.entity';

@Entity({ name: 'ollama_chat_messages' })
@Index('ollama_chat_messages_UK', ['roomId', 'messageIndex'], { unique: true })
export class OllamaChatMessageEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'ollama_chat_messages_PK' })
  id!: string;

  @Column({ type: 'int' })
  messageIndex!: number;

  @Column({ type: 'enum', enum: OllamaChatRole })
  role!: OllamaChatRole;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  reasoning!: string | null;

  @Column({ type: 'text', nullable: true })
  finishReason!: string | null;

  @Column({ type: 'int', nullable: true })
  promptTokens!: number | null;

  @Column({ type: 'int', nullable: true })
  completionTokens!: number | null;

  @Column({ type: 'int', nullable: true })
  totalTokens!: number | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({ type: 'uuid' })
  roomId!: string;

  @ManyToOne(() => OllamaChatRoomEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'ollama_chat_messages_room_FK' })
  room!: OllamaChatRoomEntity;
}
