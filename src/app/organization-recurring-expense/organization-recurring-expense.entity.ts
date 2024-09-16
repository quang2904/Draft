import { Column, Entity, Index } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Base } from '../core/entities/base';
import { OrganizationRecurringExpense as IOrganizationRecurringExpense, CurrenciesEnum } from '@/contracts';

@Entity('organization_recurring_expense')
export class OrganizationRecurringExpense extends Base implements IOrganizationRecurringExpense {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  orgId: string;

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
