import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: config.CLIENT_ORIGIN_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(port, async () => {
    console.log(`🚀 Server started at ${await app.getUrl()}`);
  });
}
bootstrap();
