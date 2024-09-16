import { Column, Entity, Index, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsAscii, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { Base } from '../core/entities/base';
import { User as IUser } from '@/contracts';
import { Role } from '../role';

@Entity('user')
export class User extends Base implements IUser {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  thirdPartyId?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  firstName?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @Index()
  @IsOptional()
  @Column({ nullable: true })
  lastName?: string;

  @ApiPropertyOptional({ type: String, minLength: 3, maxLength: 100 })
  @IsEmail()
  @IsNotEmpty()
  @Index({ unique: true })
  @IsOptional()
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ type: String, minLength: 3, maxLength: 20 })
  @IsAscii()
  @MinLength(3)
  @MaxLength(20)
  @Index({ unique: true })
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
