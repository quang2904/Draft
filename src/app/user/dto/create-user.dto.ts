import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from '@nestjs/swagger';
import { UserEmailDto } from './user-email.dto';
import { RoleFeatureDto } from '@/app/role/dto';
import { IUserCreateInput } from '@/contracts';
import { IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateUserDto
  extends IntersectionType(UserEmailDto, PartialType(RoleFeatureDto))
  implements IUserCreateInput
{
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @Transform((params: TransformFnParams) => (params.value ? params.value.trim() : null))
  readonly firstName?: string;

  @ApiProperty({ type: () => String })
  @ApiPropertyOptional()
  @Transform((params: TransformFnParams) => (params.value ? params.value.trim() : null))
  readonly lastName?: string;

  @ApiProperty({ type: () => String })
  @ApiPropertyOptional()
  readonly imageUrl?: string;
}
