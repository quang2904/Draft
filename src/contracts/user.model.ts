import { IRole } from './role.model';
import { IBasePerTenantEntityModel } from './base-entity.model';

export interface IRelationalUser {
  user?: IUser;
  userId?: IUser['id'];
}

export interface IUser extends IBasePerTenantEntityModel {
  thirdPartyId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  timeZone?: string;
  role?: IRole;
  roleId?: IRole['id'];
  hash?: string;
  imageUrl?: string;
  fullName?: string;
  isImporting?: boolean;
  sourceId?: string;
  code?: string;
  codeExpireAt?: Date;
  emailVerifiedAt?: Date;
  isEmailVerified?: boolean;
  emailToken?: string;
}

export interface IUserFindInput extends IBasePerTenantEntityModel {
  thirdPartyId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  role?: IRole;
  roleId?: string;
  hash?: string;
}

export interface IUserRegistrationInput {
  user: IUser;
  password?: string;
  confirmPassword?: string;
  originalUrl?: string;
  organizationId?: string;
  createdById?: string;
  isImporting?: boolean;
  sourceId?: string;
  inviteId?: string;
}

/**
 * email verification token payload
 */
export interface IVerificationTokenPayload extends IUserEmailInput {
  id: string;
}

export interface IUserEmailInput {
  email: string;
}

export interface IUserPasswordInput {
  password: string;
}

export interface IUserTokenInput {
  token: string;
}

export interface IUserCodeInput {
  code: string;
}

export interface IUserLoginInput extends IUserEmailInput, IUserPasswordInput {}

export interface IWorkspaceResponse extends IUserTokenInput {
  user: IUser;
}

export interface IUserSigninWorkspaceResponse {
  workspaces: IWorkspaceResponse[];
  confirmed_email: string;
  show_popup: boolean;
  total_workspaces: number;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  refresh_token?: string;
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
  timeZone?: string;
}

export interface IUserUpdateInput extends IUserCreateInput {
  id?: string;
}

export interface IUserViewModel extends IBasePerTenantEntityModel {
  fullName: string;
  email: string;
  bonus?: number;
  endWork?: any;
  id: string;
  roleName?: string;
  role?: string;
  userOrganizationId?: string;
}
