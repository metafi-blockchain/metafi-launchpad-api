import { Injectable } from '@nestjs/common';
import { ActivityLogDto } from './activelogDtos/create.active.dto';
import { ActivityLog } from './activity-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../commons/base.service';
@Injectable()
export class ActivitylogsService extends BaseService<ActivityLog>{
    constructor(
        @InjectRepository(ActivityLog)
        private repository: Repository<ActivityLog>,
      ) {
        super(repository)
    }
}
