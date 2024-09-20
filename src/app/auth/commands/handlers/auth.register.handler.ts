import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRegisterCommand } from '@/app/auth/commands';
import { AuthService } from '@/app/auth';
import { IUser } from '@/contracts';

@CommandHandler(AuthRegisterCommand)
export class AuthRegisterHandler implements ICommandHandler<AuthRegisterCommand> {
  constructor(private readonly authService: AuthService) {}

  public async execute(command: AuthRegisterCommand): Promise<IUser> {
    const { input } = command;

    return await this.authService.register(input);
  }
}
