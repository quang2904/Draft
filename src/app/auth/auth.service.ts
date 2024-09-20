import { Injectable } from '@nestjs/common';
import { IUserRegistrationInput } from '@/contracts';
import { SocialAuthService } from '@/auth';
import { User, UserService } from '@/app/user';

@Injectable()
export class AuthService extends SocialAuthService {
  constructor(private readonly userService: UserService) {
    super();
  }

  async register(input: IUserRegistrationInput): Promise<User> {
    return this.userService.create({
      ...input.user,
      ...(input.password
        ? {
            hash: await this.getPasswordHash(input.password),
          }
        : {}),
    });
  }
}
