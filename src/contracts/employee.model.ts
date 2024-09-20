import { IUser } from './';
import { Organization, OrganizationFindInput } from './organization.model';
import { BaseEntityModel as IBaseEntityModel } from './base-entity.model';
import { UserFindInput } from './user.model';

export interface Employee extends IBaseEntityModel {
  endWork?: any;
  user: IUser;
  userId: string;
  organization: Organization;
  orgId: string;
  valueDate?: Date;
  isActive: boolean;
}

export interface EmployeeFindInput extends IBaseEntityModel {
  organization?: OrganizationFindInput;
  user?: UserFindInput;
  valueDate?: Date;
  orgId?: string;
}

export interface EmployeeCreateInput {
  user: IUser;
  organization: Organization;
}
