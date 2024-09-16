import { Column, Entity, Index } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Base } from '../core/entities/base';
import { Organization as IOrganization, CurrenciesEnum, DefaultValueDateTypeEnum } from '@/contracts';

@Entity('organization')
export class Organization extends Base implements IOrganization {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @Index()
  @Column()
  name: string;

  @ApiPropertyOptional({ type: String, maxLength: 500 })
  @IsOptional()
  @Column({ length: 500, nullable: true })
  imageUrl?: string;

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

  @ApiPropertyOptional({ type: String, enum: DefaultValueDateTypeEnum })
  @IsEnum(DefaultValueDateTypeEnum)
  @IsNotEmpty()
  @Index()
  @Column()
  defaultValueDateType: string;
}
