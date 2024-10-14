import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { JWTAuthModule } from './modules/authentication/jwt.auth.module';
import { ActivityLogsModule } from './modules/activitylogs/activity-logs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { CustomMiddleware } from './custom.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/user.entity';
import { ActivityLog } from './modules/activitylogs/activity-log.entity';
import { ProjectModule } from './modules/ido_project/ido.module';
import { IDOProject } from './modules/ido_project/ido.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [Users, ActivityLog, IDOProject],
          // synchronize: config.get<string>('MODE') == 'dev', // set true for dev mode only, it will auto create table for you
          synchronize: false,
        };
      },
    }),
    UsersModule,
    HealthModule,
    JWTAuthModule,
    ProjectModule,
    ActivityLogsModule,
  ],
  controllers: [],
  providers: [
    ConfigService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMiddleware).forRoutes('*');
  }
}
