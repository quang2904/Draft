import { Injectable } from '@nestjs/common';
import { ConfigService, IEnvironment } from '@/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SocialAuthService {
  protected readonly configService: ConfigService;
  protected readonly saltRounds: number;
  protected readonly clientBaseUrl: string;

  constructor() {
    this.configService = new ConfigService();
    this.saltRounds = this.configService.get('USER_PASSWORD_BCRYPT_SALT_ROUNDS') as number;
    this.clientBaseUrl = this.configService.get('clientBaseUrl') as keyof IEnvironment;
  }

  public async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  // Redirect frontend
  public async routeRedirect(
    success: boolean,
    auth: {
      jwt: string;
      userId: string;
    },
    res: any,
  ) {
    const { userId, jwt } = auth;
    if (success) {
      return res.redirect(`${this.clientBaseUrl}/#/sign-in/success?jwt=${jwt}&userId=${userId}`);
    } else {
      return res.redirect(`${this.clientBaseUrl}/#/auth/register`);
    }
  }
}
