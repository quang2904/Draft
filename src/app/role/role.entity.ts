import { Column, Entity, Index } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Base } from '../core/entities/base';
import { Role as IRole, RolesEnum } from '@/contracts';

@Entity('role')
export class Role extends Base implements IRole {
  @ApiPropertyOptional({ type: String, enum: RolesEnum })
  @IsEnum(RolesEnum)
  @IsNotEmpty()
  @Index()
  @Column()
  name: string;
}
