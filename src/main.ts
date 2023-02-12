import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://movie-generator.onrender.com',
    credentials: true,
    methods: ['GET', 'DELETE'],
    preflightContinue: false,
    maxAge: 86400
  });
  await app.listen(process.env.PORT);
}
bootstrap();
