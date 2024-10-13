import { User } from './user.entity';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogsModule } from 'src/modules/activitylogs/activity-logs.module';
import { ConfigService } from '@nestjs/config';
import { OtpService } from './opt.service';
@Module({
  imports:[ TypeOrmModule.forFeature([User]), ActivityLogsModule],
  providers: [UsersService, ConfigService, OtpService
    // UsersService,
    // {
    //   provide: APP_INTERCEPTOR, 
    //   useClass: CurrentUserInterceptor 
    // } //config use all app 
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
// export class UsersModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UserMiddleware).forRoutes({ path: 'user/*', method: RequestMethod.ALL });
//   }
// }
