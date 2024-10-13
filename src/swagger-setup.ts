import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerSetup = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('API OnePad Dao API Docs')
    .setDescription('The One Pad API description')
    .setVersion('1.0.1')
    .addTag('OnePad Dao')
    .setBasePath('api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
};
