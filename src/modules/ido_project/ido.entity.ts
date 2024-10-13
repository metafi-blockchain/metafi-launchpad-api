import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../commons/base.entity';

//@Exclude() //hide property when get info

@Entity()
export class IDOProject extends BaseEntity {
  @Column({ unique: true })
  contract: string;
  @Column({ default: '1.0' })
  contractVersion: string;
  @Column({ default: 0 })
  rate: number;
  @Column({ default: '' })
  raiseTokenAddress: string;
  @Column({ default: '' })
  raiseTokenSymbol: string;
  @Column({ default: 9 })
  raiseTokenDecimals: number;
  @Column({ default: '' })
  releaseTokenAddress: string;
  @Column({ default: '' })
  releaseTokenSymbol: string;
  @Column({ default: 0 })
  releaseTokenDecimals: number;
  @Column()
  logo: string;
  @Column({ nullable: false })
  name: string;
  @Column({ default: true })
  isPrivate: boolean;
  @Column()
  description: string;
  @Column()
  telegram: string;
  @Column()
  totalSupply: number;
  @Column({ default: 'P' })
  state: string;
  @Column()
  medium: string;
  @Column()
  twitter: string;
  @Column()
  website: string;
  @Column()
  youtube: string;
}
