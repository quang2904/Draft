import { Column, Entity, Index, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Base } from '../core/entities/base';
import { Expense as IExpense, CurrenciesEnum } from '@/contracts';
import { Organization } from '../organization';
import { Employee } from '../employee';

@Entity('expense')
export class Expense extends Base implements IExpense {
  @ApiPropertyOptional({ type: Employee })
  @ManyToOne((type) => Employee, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  employee?: Employee;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((expense: Expense) => expense.employee)
  @Column({ nullable: true })
  readonly employeeId?: string;

  @ApiPropertyOptional({ type: Organization })
  @ManyToOne((type) => Organization, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  organization: Organization;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((expense: Expense) => expense.organization)
  readonly orgId: string;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Index()
  @Column()
  amount: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  vendorName: string;

  @ApiPropertyOptional({ type: String })
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  vendorId?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  categoryName: string;

  @ApiPropertyOptional({ type: String })
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  categoryId?: string;

  @ApiPropertyOptional({ type: String })
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  notes?: string;

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
}
