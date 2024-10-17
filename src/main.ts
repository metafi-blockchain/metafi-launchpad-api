import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { swaggerSetup } from './swagger-setup';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      stopAtFirstError: false,
    }),
  );
  // app.useGlobalInterceptors(new ResponseFormatterInterceptor());
  app.enableCors();
  swaggerSetup(app);

  await app.listen(process.env.PORT || 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
