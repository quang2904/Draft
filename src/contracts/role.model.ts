import { BaseEntityModel as IBaseEntityModel } from './base-entity.model';

export interface IRole extends IBaseEntityModel {
  name: string;
}

export enum RolesEnum {
  ADMIN = 'ADMIN',
  DATA_ENTRY = 'DATA_ENTRY',
  EMPLOYEE = 'EMPLOYEE',
}

export interface IRelationalRole {
  readonly role?: IRole;
  readonly roleId?: IRole['id'];
}
