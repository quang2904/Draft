import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject, IsObject, MinLength, ValidateNested } from 'class-validator';
import { IUserRegistrationInput } from '@/contracts';
import { CreateUserDto } from '@/app/user/dto';
import { Type } from 'class-transformer';
import { Match } from '@/app/shared/validators';

export class RegisterUserDto implements IUserRegistrationInput {
  @ApiProperty({ type: () => String })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(4, { message: 'Password should be at least 4 characters long' })
  readonly password: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Match(RegisterUserDto, (it) => it.password, {
    message: 'The password and confirmation password must match.',
  })
  readonly confirmPassword: string;

  @ApiProperty({ type: () => CreateUserDto })
  @IsObject()
  @IsNotEmptyObject()
  @IsNotEmpty()
  @ValidateNested({ message: 'User should not be empty' })
  @Type(() => CreateUserDto)
  readonly user: CreateUserDto;
}
