import { Entity, Index, Column } from 'typeorm';
import { Base } from '../core/entities/base';
import { UserOrganization as IUserOrganization } from '@/contracts';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity('user_organization')
export class UserOrganization extends Base implements IUserOrganization {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  userId: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  orgId: string;

  @ApiPropertyOptional({ type: Boolean, default: true })
  @Index()
  @Column({ default: true })
  isDefault: boolean;

  @ApiPropertyOptional({ type: Boolean, default: true })
  @Index()
  @Column({ default: true })
  isActive: boolean;
}
