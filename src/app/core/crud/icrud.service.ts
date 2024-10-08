import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination, ITryRequest } from '@/contracts';

export interface ICrudService<T> {
  count(filter?: FindManyOptions<T>): Promise<number>;

  countBy(filter?: FindOptionsWhere<T>): Promise<number>;

  findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>>;

  paginate(filter?: FindManyOptions<T>): Promise<IPagination<T>>;

  findOneByIdString(id: string, options?: FindOneOptions<T>): Promise<T>;

  findOneOrFailByIdString(id: string, options?: FindOneOptions<T>): Promise<ITryRequest<T>>;

  findOneByOptions(options: FindOneOptions<T>): Promise<T>;

  findOneOrFailByOptions(options: FindOneOptions<T>): Promise<ITryRequest<T>>;

  findOneByWhereOptions(options: FindOptionsWhere<T>): Promise<T>;

  findOneOrFailByWhereOptions(options: FindOptionsWhere<T>): Promise<ITryRequest<T>>;

  create(entity: DeepPartial<T>, ...options: any[]): Promise<T>;

  save(entity: DeepPartial<T>): Promise<T>;

  update(id: any, entity: QueryDeepPartialEntity<T>, ...options: any[]): Promise<UpdateResult | T>;

  delete(id: any, ...options: any[]): Promise<DeleteResult>;
}
