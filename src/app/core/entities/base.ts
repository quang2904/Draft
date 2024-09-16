import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntityModel as IBaseEntityModel } from '@/contracts';

export abstract class Base implements IBaseEntityModel {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiPropertyOptional({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
