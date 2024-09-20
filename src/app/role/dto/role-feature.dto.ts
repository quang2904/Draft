import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IRelationalRole, IRole } from '@/contracts';

export class RoleFeatureDto implements IRelationalRole {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  readonly roleId: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  readonly role: IRole;
}
