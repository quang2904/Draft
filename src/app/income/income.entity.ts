import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '@/app/core/entities/internal';
import { CurrenciesEnum, Income as IIncome } from '@/contracts';
import { Employee } from '../employee';
import { Organization } from '../organization';

@Entity('income')
export class Income extends BaseEntity implements IIncome {
  @ApiPropertyOptional({ type: Employee })
  @ManyToOne((type) => Employee, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  employee: Employee;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((income: Income) => income.employee)
  @Column({ nullable: true })
  readonly employeeId?: string;

  @ApiPropertyOptional({ type: Organization })
  @ManyToOne((type) => Organization, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  organization: Organization;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((income: Income) => income.organization)
  readonly orgId: string;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  amount: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Column({ nullable: true })
  clientId?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Column()
  clientName: string;

  @ApiPropertyOptional({ type: String, enum: CurrenciesEnum })
  @IsEnum(CurrenciesEnum)
  @IsNotEmpty()
  @Column()
  currency: string;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  valueDate?: Date;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Column({ nullable: true })
  notes?: string;
}
