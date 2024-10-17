import { IsEnum } from 'class-validator';
import { Network } from '../event.entity';

export class QueryEventDTO {
  @IsEnum(Network)
  srcNetwork: Network;

  @IsEnum(Network)
  dstNetwork?: Network;

  txid: string;
}
