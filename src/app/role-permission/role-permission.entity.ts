import { Column, Entity, Index, ManyToOne, RelationId } from 'typeorm';
import { IRolePermission, PermissionsEnum } from '@/contracts';
import { BaseEntity, Role } from '@/app/core/entities/internal';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('role-permission')
export class RolePermission extends BaseEntity implements IRolePermission {
  @ApiProperty({ type: () => String, enum: PermissionsEnum })
  @Index()
  @Column()
  permission: string;

  @ApiPropertyOptional({ type: () => Boolean, default: false })
  @Column({ nullable: true, default: false })
  enabled: boolean;

  @ApiPropertyOptional({ type: () => String })
  @Column({ nullable: true })
  description: string;

  /*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/
  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  role: Role;

  @ApiProperty({ type: () => String })
  @RelationId((it: RolePermission) => it.role)
  @Index()
  @Column()
  roleId: string;
}
