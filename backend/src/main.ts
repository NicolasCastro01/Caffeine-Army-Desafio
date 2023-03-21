import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.enableCors({ methods: ['GET', 'POST'], origin: '*' });
  await app.listen(port);
}
bootstrap();
