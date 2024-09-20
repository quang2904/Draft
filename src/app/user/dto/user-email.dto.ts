import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IUserEmailInput } from '@/contracts';

export class UserEmailDto implements IUserEmailInput {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
