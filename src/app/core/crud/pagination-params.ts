import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { FindOptionsOrder } from 'typeorm';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
  /**
   * Limit (paginated) - max number of entities should be taken
   */
  @ApiPropertyOptional({ type: () => 'number', minimum: 0, maximum: 100 })
  @IsOptional()
  @Min(0)
  @Max(50)
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  readonly take: number;

  /**
   * Pagination offset
   */
  @ApiPropertyOptional({ type: () => 'number', minimum: 0 })
  @IsOptional()
  @Min(0)
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  readonly skip: number;

  /**
   * Order, in which entities should be ordered.
   */
  @ApiPropertyOptional({ type: 'object' })
  @IsOptional()
  abstract readonly order?: FindOptionsOrder<T>;
}
