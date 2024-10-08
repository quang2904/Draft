import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IBaseEntityModel } from '@/contracts';
import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

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
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
  @CreateDateColumn()
  createdAt?: Date;

  // Date when the record was last updated
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2018-11-21T06:20:32.232Z',
  })
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

  // Indicates if record is active now
  @ApiPropertyOptional({
    type: Boolean,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @Column({ nullable: true, default: true })
  isActive?: boolean;

  // Indicates if record is archived
  @ApiPropertyOptional({
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Column({ nullable: true, default: false })
  isArchived?: boolean;
}
