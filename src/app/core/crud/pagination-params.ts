import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
  /**
   * Pagination limit
   */
  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 50 })
  @IsOptional()
  @Min(0)
  @Max(50)
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  readonly take = 10;

  /**
   * Pagination offset
   */
  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsOptional()
  @Min(0)
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  readonly skip = 0;

  /**
   * OrderBy
   */
  @ApiPropertyOptional()
  @IsOptional()
  abstract readonly order?: { [P in keyof T]?: OrderType };
}
