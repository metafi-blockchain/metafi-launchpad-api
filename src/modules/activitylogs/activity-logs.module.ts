import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './activity-log.entity';
import { ActivitylogsService } from './activitylogs.service';

@Module({
  imports:[TypeOrmModule.forFeature([ActivityLog])],
  providers: [ActivitylogsService],
  exports: [ActivitylogsService],
})
export class ActivityLogsModule {

}
