import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://movie-generator.onrender.com',
    credentials: true,
    methods: ['GET', 'DELETE', 'POST', 'PUT'],
    preflightContinue: false,
    maxAge: 86400,
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  await app.listen(process.env.PORT);
}
bootstrap();
