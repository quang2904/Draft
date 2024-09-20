import { IRole } from './role.model';
import { BaseEntityModel as IBaseEntityModel } from './base-entity.model';

export interface IUser extends IBaseEntityModel {
  thirdPartyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: IRole;
  roleId?: string;
  hash?: string;
  imageUrl?: string;
  startedWorkOn?: string;
}

export interface UserFindInput extends IBaseEntityModel {
  thirdPartyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: IRole;
  roleId?: string;
  hash?: string;
  imageUrl?: string;
}

export interface IUserRegistrationInput {
  user: IUser;
  password?: string;
  confirmPassword?: string;
  originalUrl?: string;
  organizationId?: string;
  isImporting?: boolean;
  sourceId?: string;
  inviteId?: string;
}

export interface IUserEmailInput {
  email: string;
}

export interface IUserCreateInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  role?: IRole;
  roleId?: string;
  hash?: string;
  imageUrl?: string;
  timeZone?: string;
}
