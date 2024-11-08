import { BadRequestException, Injectable } from '@nestjs/common';
import { Network, Events, EventStatus } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXPLORERS } from 'src/common/enums/explorer';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  async findOne(srcNetwork: Network, dstNetwork: Network, txid: string) {
    if (srcNetwork === dstNetwork) {
      throw new BadRequestException('Query invalid');
    }

    const event = await this.eventsRepository.findOne({
      where: { srcNetwork, dstNetwork, txHash: txid },
    });

    let receiptHash;
    if (event) receiptHash = `${EXPLORERS[dstNetwork]}/${event.receiptHash}`;

    const result =
      event && event.status !== EventStatus.PENDING
        ? {
            srcNetwork: srcNetwork,
            dstNetwork: dstNetwork,
            txId: event.txHash,
            receiptHash: receiptHash,
            status: event.status,
          }
        : {
            srcNetwork: srcNetwork,
            dstNetwork: dstNetwork,
            txId: txid,
            status: EventStatus.PENDING,
          };

    return result;
  }
}
