import { IBasePerTenantEntityModel } from './base-entity.model';
import { IRole } from './role.model';

export interface IRolePermission extends IBasePerTenantEntityModel {
  roleId: string;
  permission: string;
  role: IRole;
  enabled: boolean;
  description: string;
}

export interface IRolePermissionMigrateInput extends IBasePerTenantEntityModel {
  permission: string;
  role: string;
  isImporting: boolean;
  sourceId: string;
  description: string;
}

export interface IRolePermissionCreateInput extends IBasePerTenantEntityModel {
  role?: IRole;
  roleId: string;
  permission: string;
  enabled: boolean;
}

export interface IRolePermissionUpdateInput extends IRolePermissionCreateInput {
  enabled: boolean;
}

export enum PermissionsEnum {
  ADMIN_DASHBOARD_VIEW = 'ADMIN_DASHBOARD_VIEW',
}

export const PermissionGroups = {
  //Permissions which can be given to any role
  GENERAL: [PermissionsEnum.ADMIN_DASHBOARD_VIEW],

  //Readonly permissions, are only enabled for Super Admin/Admin role
  ADMINISTRATION: [],
};
