import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { mergeMap } from 'rxjs/operators';
import { of as observableOf, throwError } from 'rxjs';
import { Base } from '../entities/base';
import { ICrudService } from './icrud.service';
import { IPagination } from '@/contracts';

export abstract class CrudService<T extends Base> implements ICrudService<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  public async count(filter?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(filter);
  }

  public async findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>> {
    const total = await this.repository.count(filter);
    const items = await this.repository.find(filter);
    return { items, total };
  }

  public async create(entity: DeepPartial<T>, ...options: any[]): Promise<T> {
    const obj = this.repository.create(entity);
    try {
      // https://github.com/Microsoft/TypeScript/issues/21592
      return await this.repository.save(obj as any);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string | number | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
    ...options: any[]
  ): Promise<UpdateResult | T> {
    try {
      return await this.repository.update(id, partialEntity);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  public async delete(criteria: string | number | FindOptionsWhere<T>, ...options: any[]): Promise<DeleteResult> {
    try {
      return this.repository.delete(criteria);
    } catch (err) {
      throw new NotFoundException(`The record was not found`, err);
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
