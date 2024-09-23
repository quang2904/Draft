import { Column, Entity, Index, OneToMany } from 'typeorm';
import { IRole, IRolePermission, RolesEnum } from '@/contracts';
import { BaseEntity, RolePermission } from '@/app/core/entities/internal';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@Entity('role')
export class Role extends BaseEntity implements IRole {
  @ApiProperty({ type: () => String, enum: RolesEnum })
  @IsNotEmpty()
  @Index()
  @Column()
  name: string;

  @ApiProperty({ type: () => Boolean })
  @Column()
  isSystem: boolean;

  /*
	|--------------------------------------------------------------------------
	| @OneToMany
	|--------------------------------------------------------------------------
	*/

  /**
   * Role Permissions
   */
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    cascade: true,
  })
  rolePermissions?: IRolePermission[];
}
