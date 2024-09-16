import { Role } from './role.model';
import { BaseEntityModel as IBaseEntityModel } from './base-entity.model';

export interface User extends IBaseEntityModel {
  thirdPartyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: Role;
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
  role?: Role;
  roleId?: string;
  hash?: string;
  imageUrl?: string;
}

export interface UserRegistrationInput {
  user: User;
  password?: string;
}
