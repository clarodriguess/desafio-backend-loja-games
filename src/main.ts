import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //hora local
  process.env.TZ = '-03:00';

  //validar biblioteca
  app.useGlobalPipes(new ValidationPipe());
  
  //para aceitar requisições de outros domínios
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
