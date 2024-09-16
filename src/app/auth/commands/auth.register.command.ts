import { ICommand } from '@nestjs/cqrs';
import { UserRegistrationInput as IUserRegistrationInput } from '@/contracts';

export class AuthRegisterCommand implements ICommand {
  static readonly type = '[Auth] Register';

  constructor(public readonly input: IUserRegistrationInput) {}
}
