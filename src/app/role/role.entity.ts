import { Column, Entity, Index } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/app/core/entities/internal';
import { Role as IRole, RolesEnum } from '@/contracts';

@Entity('role')
export class Role extends BaseEntity implements IRole {
  @ApiPropertyOptional({ type: String, enum: RolesEnum })
  @IsEnum(RolesEnum)
  @IsNotEmpty()
  @Index()
  @Column()
  name: string;
}
