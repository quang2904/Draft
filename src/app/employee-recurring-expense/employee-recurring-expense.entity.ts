import { Column, Entity, Index } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Base } from '../core/entities/base';
import { EmployeeRecurringExpense as IEmployeeRecurringExpense, CurrenciesEnum } from '@/contracts';

@Entity('employee_recurring_expense')
export class EmployeeRecurringExpense extends Base implements IEmployeeRecurringExpense {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  employeeId: string;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 12 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  @Column()
  month: number;

  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Column()
  year: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  categoryName: string;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  value: number;

  @ApiPropertyOptional({ type: String, enum: CurrenciesEnum })
  @IsEnum(CurrenciesEnum)
  @IsNotEmpty()
  @Index()
  @Column()
  currency: string;
}
