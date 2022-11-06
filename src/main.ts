import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO:
// * make better validatios to DTO
// * Please, do a better documentation.
// * modified any transaction to database adding a try catch

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('KAEM')
    .setDescription('The KAEM-app API description')
    .setVersion('1.0')
    .addTag('subjecs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || '');
}

bootstrap();
