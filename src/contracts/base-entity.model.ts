import { ITenant } from './tenant.model';

export interface IBaseEntityModel {
  id?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IBasePerTenantEntityModel extends IBaseEntityModel {
  tenantId?: ITenant['id']; // Identifier of the associated tenant
  tenant?: ITenant; // Reference to the associated tenant
}
