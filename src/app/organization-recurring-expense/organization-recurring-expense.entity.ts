import { Column, Entity } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { BaseEntity } from '@/app/core/entities/internal';
import { CurrenciesEnum, OrganizationRecurringExpense as IOrganizationRecurringExpense } from '@/contracts';

@Entity('organization_recurring_expense')
export class OrganizationRecurringExpense extends BaseEntity implements IOrganizationRecurringExpense {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
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
  @Column()
  currency: string;
}
