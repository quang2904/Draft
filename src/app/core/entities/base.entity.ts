import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntityModel as IBaseEntityModel } from '@/contracts';
import { IsOptional } from 'class-validator';

export abstract class Model {
  constructor(input?: any) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }
}

export abstract class BaseEntity extends Model implements IBaseEntityModel {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // Date when the record was created
  @ApiPropertyOptional({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  @CreateDateColumn()
  createdAt?: Date;

  // Date when the record was last updated
  @ApiPropertyOptional({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  @UpdateDateColumn()
  updatedAt?: Date;

  // Soft delete
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  @IsOptional()
  @IsDateString()
  @DeleteDateColumn()
  deleteAt?: Date;
}
