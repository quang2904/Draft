import { Column, Entity, Index, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { IRole, IUser } from '@/contracts';
import { BaseEntity, Role } from '@/app/core/entities/internal';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends BaseEntity implements IUser {
  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Index()
  @Column({ nullable: true })
  thirdPartyId?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Index()
  @Column({ nullable: true })
  firstName?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Index()
  @Column({ nullable: true })
  lastName?: string;

  @ApiPropertyOptional({ type: () => String, minLength: 3, maxLength: 100 })
  @IsOptional()
  @IsEmail()
  @Index({ unique: false })
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ type: () => String, minLength: 4, maxLength: 12 })
  @IsOptional()
  @IsString()
  @Index()
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiPropertyOptional({ type: () => String, minLength: 3, maxLength: 20 })
  @IsOptional()
  @IsString()
  @Index({ unique: false })
  @Column({ nullable: true })
  username?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  timeZone?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  hash?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Exclude({ toPlainOnly: true })
  @Column({ insert: false, nullable: true })
  public refreshToken?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsString()
  @Exclude({ toPlainOnly: true })
  @Column({ insert: false, nullable: true })
  public code?: string;

  @ApiPropertyOptional({ type: () => Date })
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @Column({ insert: false, nullable: true })
  public codeExpireAt?: Date;

  @ApiPropertyOptional({ type: () => Date })
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @Column({ insert: false, nullable: true })
  public emailVerifiedAt?: Date;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @Exclude({ toPlainOnly: true })
  @Column({ insert: false, nullable: true })
  public emailToken?: string;

  name?: string;
  isEmailVerified?: boolean;

  /*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

  /**
   * Role
   */
  @ManyToOne(() => Role, {
    /** Indicates if relation column value can be nullable or not. */
    nullable: true,

    /** Database cascade action on delete. */
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  role?: IRole;

  @ApiPropertyOptional({ type: () => String })
  @IsOptional()
  @IsUUID()
  @RelationId((it: User) => it.role)
  @Index()
  @Column({ nullable: true })
  roleId?: string;
}
