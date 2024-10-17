import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../commons/base.entity';

export enum Network {
  AVAL = 'AVAL',
  ETH = 'ETH',
  BSC = 'BSC',
}

export enum EventStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Events {
  @PrimaryColumn()
  txHash: string;

  @Column({ default: '' })
  srcNetwork: Network;

  @Column({ default: '' })
  dstNetwork: Network;

  @Column()
  blockNumber: Number;

  @Column({ default: false })
  srcAddress: boolean;

  @Column({ default: '' })
  dstAddress: string;

  @Column({ default: '' })
  amount: string;

  @Column({ default: '' })
  srcTokenAddress: string;

  @Column({ default: '' })
  dstTokenAddress: string;

  @Column({ default: false })
  isProcessed: boolean;

  @Column({ default: '' })
  receiptHash: string;

  @Column({ default: '' })
  status: EventStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
