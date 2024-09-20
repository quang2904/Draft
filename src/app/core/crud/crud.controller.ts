import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { BaseEntity } from '../entities/internal';
import { ICrudService } from '@/app/core/crud/icrud.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { IPagination } from '@/contracts';
import { PaginationParams } from '@/app/core';
import { UUIDValidationPipe } from '@/app/shared';

@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Authentication failed',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden',
})
@ApiBearerAuth()
export abstract class CrudController<T extends BaseEntity> {
  protected constructor(private readonly crudService: ICrudService<T>) {}

  @ApiOperation({ summary: 'Find all records counts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found records count',
  })
  @Get('count')
  async getCount(@Query() options?: FindOptionsWhere<T>): Promise<number | void> {
    return await this.crudService.countBy(options);
  }

  @ApiOperation({ summary: 'Find all records counts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found records count',
  })
  @Get('pagination')
  async pagination(@Query() filter?: PaginationParams<T>, ...options: any[]): Promise<IPagination<T> | void> {
    return this.crudService.paginate(filter);
  }

  @ApiOperation({ summary: 'Find all records' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Found records',
  })
  @Get()
  async findAll(filter?: PaginationParams<T>, ...option: any[]): Promise<IPagination<T>> {
    return this.crudService.findAll(filter);
  }

  @ApiOperation({ summary: 'Find by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find one record',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  async findById(@Param('id', UUIDValidationPipe) id: string, ...options: any[]): Promise<T> {
    return this.crudService.findOneByIdString(id);
  }

  @ApiOperation({ summary: 'Create new record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input, The response body may contain clue as what went wrong',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() entity: DeepPartial<T>, ...options: any[]): Promise<T> {
    return this.crudService.create(entity);
  }

  @ApiOperation({ summary: 'Update an existing record' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The record has been successfully edited',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input, the response body may contain clue as what went wrong',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  async update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() entity: QueryDeepPartialEntity<T>,
    ...options: any[]
  ): Promise<any> {
    return this.crudService.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The record has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async Delete(@Param('id', UUIDValidationPipe) id: string): Promise<any> {
    return this.crudService.delete(id);
  }
}
