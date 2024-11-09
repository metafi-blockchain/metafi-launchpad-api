
import { IDOProject } from './ido.entity';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IdoService } from './ido.service';
import { IdoController } from './ido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogsModule } from 'src/modules/activitylogs/activity-logs.module';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[ TypeOrmModule.forFeature([IDOProject]), ActivityLogsModule, UsersModule],
  providers: [IdoService, ConfigService

  ],
  controllers: [IdoController],
  exports: [IdoService]
})
export class ProjectModule {}
// export class ProjectModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UserMiddleware).forRoutes({ path: 'user/*', method: RequestMethod.ALL });
//   }
// }
