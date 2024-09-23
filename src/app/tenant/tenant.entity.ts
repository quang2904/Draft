import { Column, Entity, Index } from 'typeorm';
import { ITenant } from '../../contracts';
import { BaseEntity } from '@/app/core/entities/internal';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('tenant')
export class Tenant extends BaseEntity implements ITenant {
  @ApiProperty({ type: () => String })
  @Index()
  @Column()
  name: string;

  @ApiPropertyOptional({ type: () => String })
  @Index()
  @Column()
  logo?: string;
}
