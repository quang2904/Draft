import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/app/core/entities/internal';
import { UserOrganization as IUserOrganization } from '@/contracts';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('user_organization')
export class UserOrganization extends BaseEntity implements IUserOrganization {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Column()
  userId: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Column()
  orgId: string;

  @ApiPropertyOptional({ type: Boolean, default: true })
  @Column({ default: true })
  isDefault: boolean;

  @ApiPropertyOptional({ type: Boolean, default: true })
  @Column({ default: true })
  isActive: boolean;
}
