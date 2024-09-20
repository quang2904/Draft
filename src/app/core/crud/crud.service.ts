import { BaseEntity } from '@/app/core/entities/base.entity';
import { ICrudService } from '@/app/core/crud/icrud.service';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { IPagination, ITryRequest } from '@/contracts';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { mergeMap } from 'rxjs/operators';
import { of as observableOf, throwError } from 'rxjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class CrudService<T extends BaseEntity> implements ICrudService<T> {
  /**
   * Alias (default we used table name) for pagination crud
   */
  protected get alias(): string {
    return this.repository.metadata.tableName;
  }

  protected constructor(protected readonly repository: Repository<T>) {}

  public async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }

  public async countBy(options?: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.countBy(options);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<IPagination<T>> {
    const total = await this.repository.count(options);
    const items = await this.repository.find(options);
    return { items, total };
  }

  public async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  public async paginate(options?: FindManyOptions<T>): Promise<IPagination<T>> {
    try {
      const [items, total] = await this.repository.findAndCount({
        skip: options && options.skip ? options.take * (options.skip - 1) : 0,
        take: options && options.take ? options.take : 10,
        /**
         * Specifies what relations should be loaded.
         *
         * @deprecated
         */
        ...(options && options.join
          ? {
              join: options.join,
            }
          : {}),
        ...(options && options.select
          ? {
              select: options.select,
            }
          : {}),
        ...(options && options.relations
          ? {
              relations: options.relations,
            }
          : {}),
        ...(options && options.where
          ? {
              where: options.where,
            }
          : {}),
        ...(options && options.order
          ? {
              order: options.order,
            }
          : {}),
      });
      return { items, total };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  public async findOneByIdString(id: T['id'], options?: FindOneOptions<T>): Promise<T> {
    const record = await this.repository.findOne({
      ...(options && options.select
        ? {
            select: options.select,
          }
        : {}),
      where: {
        id,
        ...(options && options.where ? options.where : {}),
      },
      ...(options && options.relations
        ? {
            relations: options.relations,
          }
        : []),
      ...(options && options.order
        ? {
            order: options.order,
          }
        : {}),
    } as FindOneOptions<T>);
    if (!record) {
      throw new NotFoundException(`The requested record was not found`);
    }
    return record;
  }

  public async findOneOrFailByIdString(id: string, options?: FindOneOptions<T>): Promise<ITryRequest<T>> {
    try {
      const record = await this.repository.findOneOrFail({
        ...(options && options.select
          ? {
              select: options.select,
            }
          : {}),
        where: {
          id,
          ...(options && options.where ? options.where : {}),
        },
        ...(options && options.relations
          ? {
              relations: options.relations,
            }
          : []),
        ...(options && options.order
          ? {
              order: options.order,
            }
          : {}),
      } as FindOneOptions<T>);
      return {
        success: true,
        record,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  public async findOneByOptions(options: FindOneOptions<T>): Promise<T | null> {
    const record = await this.repository.findOne(options);
    if (!record) {
      throw new NotFoundException(`The requested record was not found`);
    }
    return record;
  }

  public async findOneOrFailByOptions(options: FindOneOptions<T>): Promise<ITryRequest<T>> {
    try {
      const record = await this.repository.findOneOrFail(options);
      return {
        success: true,
        record,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  public async findOneByWhereOptions(options: FindOptionsWhere<T>): Promise<T | null> {
    const record = await this.repository.findOneBy(options);
    if (!record) {
      throw new NotFoundException(`The requested record was not found`);
    }
    return record;
  }

  public async findOneOrFailByWhereOptions(options: FindOptionsWhere<T>): Promise<ITryRequest<T>> {
    try {
      const record = await this.repository.findOneByOrFail(options);
      return {
        success: true,
        record,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  public async create(entity: DeepPartial<T>): Promise<T> {
    const obj = this.repository.create(entity);
    try {
      return await this.repository.save(obj as any);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async save(entity: DeepPartial<T>): Promise<T> {
    try {
      return await this.repository.save(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult | T> {
    try {
      return this.repository.update(id, partialEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async delete(criteria: string | number | FindOptionsWhere<T>, ...options: any[]): Promise<DeleteResult> {
    try {
      return await this.repository.delete(criteria);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('The record was not found', error);
    }
  }

  /**
   * e.g., findOneById(id).pipe(map(entity => entity.id), entityNotFound())
   */
  private entityNotFound() {
    return (stream$) =>
      stream$.pipe(
        mergeMap((signal) => {
          if (!signal) {
            return throwError(() => new NotFoundException(`The requested record was not found`));
          }
          return observableOf(signal);
        }),
      );
  }
}
