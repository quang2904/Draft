import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from '../core/entities/base';
import { Organization } from '../organization/organization.entity';
import { OrganizationDepartment as IOrganizationDepartment } from '@/contracts';

@Entity('organization_department')
export class OrganizationDepartment extends Base implements IOrganizationDepartment {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  name: string;

  @ApiPropertyOptional({ type: Organization })
  @ManyToOne((type) => Organization, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  organization: Organization;
}
