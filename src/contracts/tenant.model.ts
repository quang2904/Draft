export interface ITenant {
  id?: string;
  name?: string;
  logo?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface ITenantCreateInput extends ITenantUpdateInput {
  isImporting?: boolean;
  sourceId?: string;
  userSourceId?: string;
}

export interface ITenantUpdateInput {
  name: string;
  logo?: string;
}
