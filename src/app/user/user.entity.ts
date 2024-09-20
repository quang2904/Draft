import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAscii, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from '@/app/core/entities/internal';
import { IUser } from '@/contracts';
import { Role } from '../role';

@Entity('user')
export class User extends BaseEntity implements IUser {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  thirdPartyId?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  firstName?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  lastName?: string;

  @ApiPropertyOptional({ type: String, minLength: 3, maxLength: 100 })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ type: String, minLength: 3, maxLength: 20 })
  @IsAscii()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  @Column({ nullable: true })
  username?: string;

  @ApiPropertyOptional({ type: Role })
  @ManyToOne((type) => Role, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  role?: Role;

  @ApiPropertyOptional({ type: String, readOnly: true })
  @RelationId((user: User) => user.role)
  readonly roleId?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @Column()
  @IsOptional()
  @Column({ nullable: true })
  hash?: string;

  @ApiPropertyOptional({ type: String, maxLength: 500 })
  @IsOptional()
  @Column({ length: 500, nullable: true })
  imageUrl?: string;
}
