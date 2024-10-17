import { Users } from './user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { OtpService } from './opt.service';
import { ActivityLogsModule } from 'src/modules/activitylogs/activity-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), ActivityLogsModule],
  providers: [UsersService, ConfigService, OtpService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
// export class UsersModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UserMiddleware).forRoutes({ path: 'user/*', method: RequestMethod.ALL });
//   }
// }
