import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //*Elimina campos que no estan en el DTO.
      forbidNonWhitelisted: true, //* Si mandas campos extra, rechaza la petición.
      transform: true, //*Convierte datos al tipo correcto cuando puede.
    }),
  );

  const port = process.env.API_PORT ?? 3001;
  
  await app.listen(port);
}

bootstrap();
