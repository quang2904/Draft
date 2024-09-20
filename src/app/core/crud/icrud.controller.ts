import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, UpdateResult } from 'typeorm';
import { IPagination } from '@/contracts';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type ConstructorType<T = {}> = new (...args: any[]) => T;

export interface ICrudController<T> {
  /**
   * Counts entities that match given options
   *
   * @param options
   */
  getCount(options: FindOptionsWhere<T>): Promise<number | void>;

  /**
   * Finds entities that match give find options
   * Also counts all entities that match give condition
   *
   * @param filters
   * @param options
   */
  pagination(filters: FindManyOptions<T>, ...options: any[]): Promise<IPagination<T>>;

  /**
   * Finds entities that match find options
   * Also counts all entities that match give condition
   * But ignore pagination setting (from and take options)
   *
   * @param options
   */
  findAll(options: FindManyOptions<T>): Promise<IPagination<T>>;

  /**
   * Finds first entities by a given options
   * If entity was not found in the database - returns null
   *
   * @param id
   * @param options
   */
  findById(id: any, ...options: any[]): Promise<T>;

  /**
   * Create a new entity instance anf copies all entity properties from this object info a new entity.
   * Saves a given entity in the database.
   * Note that it copies only properties that are present in entity schema.
   *
   * @param entity
   * @returns
   */
  create(entity: DeepPartial<T>): Promise<T>;

  /**
   * Update entity partially. Entity can be found by a given conditions
   *
   * @param id
   * @param entity
   * @param options
   */
  update(id: any, entity: QueryDeepPartialEntity<T>, ...options: any[]): Promise<UpdateResult | T>;

  /**
   * Deletes entities by a give criteria
   * Does not check if entity exist in the database
   *
   * @param id
   * @param options
   */
  delete(id: any, ...options: any[]): Promise<DeleteResult>;
}
