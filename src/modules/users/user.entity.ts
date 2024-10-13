import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../commons/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  USER = 'user',
}
@Entity()
export class Users extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  verify: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  version: number;
}
