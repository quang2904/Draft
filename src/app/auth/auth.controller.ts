import { Body, Controller, Headers, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/common';
import { IUser } from '@/contracts';
import { RegisterUserDto } from '@/app/user/dto';
import { CommandBus } from '@nestjs/cqrs';
import { AuthRegisterCommand } from './commands';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() input: RegisterUserDto, @Headers('origin') origin: string): Promise<IUser> {
    return await this.commandBus.execute(
      new AuthRegisterCommand({
        originalUrl: origin,
        ...input,
      }),
    );
  }
}
