import { Entity, Column, JoinColumn, OneToOne, RelationId, ManyToOne } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Base } from '../core/entities/base';
import { Employee as IEmployee } from '@/contracts';
import { IsDate, IsOptional } from 'class-validator';
import { User } from '../user';
import { Organization } from '../organization';

@Entity('employee')
export class Employee extends Base implements IEmployee {
  @ApiPropertyOptional({ type: User })
  @OneToOne((type) => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((employee: Employee) => employee.user)
  readonly userId: string;

  @ApiPropertyOptional({ type: Organization })
  @ManyToOne((type) => Organization, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  organization: Organization;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((employee: Employee) => employee.organization)
  readonly orgId: string;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  valueDate?: Date;

  @ApiPropertyOptional({ type: Boolean, default: true })
  @Column({ nullable: true, default: true })
  isActive: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  endWork?: Date;
}
