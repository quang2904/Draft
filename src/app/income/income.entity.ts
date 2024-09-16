import { Column, Entity, Index, JoinColumn, RelationId, ManyToOne } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Base } from '../core/entities/base';
import { Income as IIncome, CurrenciesEnum } from '@/contracts';
import { Employee } from '../employee';
import { Organization } from '../organization';

@Entity('income')
export class Income extends Base implements IIncome {
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
  @Index()
  @Column()
  amount: number;

  @ApiPropertyOptional({ type: String })
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  clientId?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  clientName: string;

  @ApiPropertyOptional({ type: String, enum: CurrenciesEnum })
  @IsEnum(CurrenciesEnum)
  @IsNotEmpty()
  @Index()
  @Column()
  currency: string;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Column({ nullable: true })
  valueDate?: Date;

  @ApiPropertyOptional({ type: String })
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  notes?: string;
}
