import { Injectable } from '@nestjs/common';
import { User, UserService } from '../user';
import * as bcrypt from 'bcrypt';

// have to combine the two imports
import { IUserRegistrationInput } from '@/contracts';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 'cdscbndjcbdcjdbcj');
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
