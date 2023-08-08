import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignorar datos que no esten en los DTO
      forbidNonWhitelisted: true, // Lanzar error si existen datos prohibidos
      disableErrorMessages: true, // Desabilitar mensajes de error (producción)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Market manage service')
    .setDescription('Documentacion Market manage service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
