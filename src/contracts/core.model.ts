/**
 * Generic pagination interface
 */
export interface IPagination<T> {
  /**
   * Items included in the current listing
   */
  readonly items: T[];

  /**
   * Total number of available items
   */
  readonly total: number;
}

/**
 * Generic try request interface
 */

export interface ITryRequest<T> {
  success: boolean;
  record?: T;
  error?: any;
}
