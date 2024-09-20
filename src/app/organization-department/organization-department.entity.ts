import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from '@/app/core/entities/internal';
import { Organization } from '../organization/organization.entity';
import { OrganizationDepartment as IOrganizationDepartment } from '@/contracts';

@Entity('organization_department')
export class OrganizationDepartment extends BaseEntity implements IOrganizationDepartment {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiPropertyOptional({ type: Organization })
  @ManyToOne((type) => Organization, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  organization: Organization;
}
