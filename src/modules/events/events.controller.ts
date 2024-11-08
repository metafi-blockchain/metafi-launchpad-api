import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { Network } from './event.entity';
import { QueryEventDTO } from './dto/query.event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findOne(
    // @Query('srcNetwork') srcNetwork: Network,
    // @Query('dstNetwork') dstNetwork: Network,
    // @Query('txid') txid: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: QueryEventDTO,
  ) {
    const { srcNetwork, dstNetwork, txid } = query
    
    return this.eventsService.findOne(srcNetwork, dstNetwork, txid);
  }
}
